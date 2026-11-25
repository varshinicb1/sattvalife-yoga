import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { BrandIcon } from '@/components/BrandIcon'
import { COURSES, TIMETABLE } from '@/data/content'
import { useCmsContent, whatsappHref } from '@/hooks/useCmsContent'
import { useConsent } from '@/lib/consent'
import { ANALYTICS_ENABLED } from '@/hooks/usePostHog'
import { openBooking } from '@/lib/bookingStore'
import { formatTime } from '@/lib/schedule'

/**
 * The mobile sticky booking action the brief asks us to consider. Below lg it
 * also carries WhatsApp, so it and the floating button never fight for the same
 * corner. It appears once the hero is behind you and steps aside at the footer,
 * where the newsletter field and footer links live.
 */
export default function StickyBook() {
  const { settings } = useCmsContent()
  const consent = useConsent()
  const [past, setPast] = useState(false)
  const [atFooter, setAtFooter] = useState(false)
  const [tue] = TIMETABLE.venues
  const from = Math.min(...COURSES.filter((c) => c.id !== 'corporate').map((c) => c.price))

  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > 520)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const footer = document.querySelector('footer')
    if (!footer || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(([entry]) => setAtFooter(entry.isIntersecting), { threshold: 0 })
    io.observe(footer)
    return () => io.disconnect()
  }, [])

  if (ANALYTICS_ENABLED && consent === null) return null
  const shown = past && !atFooter

  return (
    <div
      data-print-hide
      aria-hidden={!shown}
      className={`fixed inset-x-0 bottom-0 z-float border-t border-forest-900/10 bg-cream-50/95 px-4 pb-[calc(0.7rem+env(safe-area-inset-bottom))] pt-3 shadow-[0_-8px_24px_-16px_rgb(30_34_21/0.5)] backdrop-blur-xl transition-transform duration-300 lg:hidden ${
        shown ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-ink-900">
            {tue.day}s {formatTime(tue.start)}, {tue.area}
          </p>
          <p className="truncate text-xs text-ink-700/80">From £{from} · mats provided</p>
        </div>
        <a
          href={whatsappHref(settings.whatsappNumber)}
          target="_blank"
          rel="noreferrer"
          tabIndex={shown ? undefined : -1}
          aria-label="Chat with Sattvalife on WhatsApp"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white transition-transform active:scale-95"
        >
          <BrandIcon name="whatsapp" className="h-6 w-6" />
        </a>
        <button
          type="button"
          tabIndex={shown ? undefined : -1}
          onClick={() => openBooking({ courseId: 'dropIn', venueId: tue.id })}
          className="btn-primary shrink-0 !px-5"
        >
          Book
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
