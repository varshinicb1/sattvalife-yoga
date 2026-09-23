import { useEffect, useState } from 'react'
import { useCmsContent, whatsappHref } from '@/hooks/useCmsContent'
import { useConsent } from '@/lib/consent'
import { ANALYTICS_ENABLED } from '@/hooks/usePostHog'
import { BrandIcon } from '@/components/BrandIcon'

export default function WhatsAppButton() {
  const { settings } = useCmsContent()
  const consent = useConsent()
  const [atFooter, setAtFooter] = useState(false)

  // Step aside once the footer is on screen, so the button never sits on top of
  // the newsletter field, footer links or a form's submit button.
  useEffect(() => {
    const footer = document.querySelector('footer')
    if (!footer || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(([entry]) => setAtFooter(entry.isIntersecting), { threshold: 0 })
    io.observe(footer)
    return () => io.disconnect()
  }, [])

  // Stay out of the way while the cookie banner is asking for a decision
  if (ANALYTICS_ENABLED && consent === null) return null

  return (
    <a
      href={whatsappHref(settings.whatsappNumber)}
      target="_blank"
      rel="noreferrer"
      data-print-hide
      aria-hidden={atFooter}
      tabIndex={atFooter ? -1 : undefined}
      className={`fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom))] right-5 z-float flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_28px_-8px_rgb(37_211_102/0.55)] transition-all duration-300 hover:scale-105 active:scale-95 sm:right-6 ${
        atFooter ? 'pointer-events-none translate-y-24 opacity-0' : 'translate-y-0 opacity-100'
      }`}
      aria-label="Chat with Sattvalife on WhatsApp"
    >
      <BrandIcon name="whatsapp" className="h-7 w-7" />
    </a>
  )
}
