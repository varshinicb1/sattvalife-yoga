import { useEffect, useMemo, useRef, useState } from 'react'
import { m, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router'
import { ArrowRight, Check, Lock, X } from 'lucide-react'
import { COURSES, TIMETABLE, type Venue } from '@/data/content'
import { useCmsContent, whatsappHref } from '@/hooks/useCmsContent'
import { closeBooking, type BookingRequest } from '@/lib/bookingStore'
import { paymentLinkFor } from '@/lib/booking'
import { formatTime, nextSessions, relativeDay, sessionId } from '@/lib/schedule'
import { useScrollLock } from '@/lib/useScrollLock'

interface SessionOption {
  id: string
  venue: Venue
  date: Date
}

function upcomingSessions(count = 6): SessionOption[] {
  return TIMETABLE.venues
    .flatMap((venue) => nextSessions(venue, Math.ceil(count / 2)).map((date) => ({ id: sessionId(venue, date), venue, date })))
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, count)
}

export default function BookingSheet({ request }: { request: BookingRequest }) {
  const { stripe, settings } = useCmsContent()
  const reduce = useReducedMotion()
  const course = COURSES.find((c) => c.id === request.courseId) ?? COURSES[0]
  const sessions = useMemo(() => upcomingSessions(), [])
  const [selected, setSelected] = useState(() => {
    const preferred = request.venueId ? sessions.find((s) => s.venue.id === request.venueId) : undefined
    return (preferred ?? sessions[0]).id
  })
  const [redirecting, setRedirecting] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  const needsSession = course.id !== 'corporate'
  const reference = needsSession ? (course.id === 'monthly' ? `monthly-from-${selected}` : `dropin-${selected}`) : 'corporate-session'
  const link = paymentLinkFor(stripe.paymentLinks, course.id, { reference })

  useScrollLock(true)

  // Focus the dialog, close on Escape, keep Tab inside, restore focus on close
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeBooking()
      if (e.key !== 'Tab' || !panelRef.current) return
      const focusables = panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled])')
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      previouslyFocused?.focus?.()
    }
  }, [])

  // Returning with the browser back button restores this page from bfcache; reset the button
  useEffect(() => {
    const onShow = () => setRedirecting(false)
    window.addEventListener('pageshow', onShow)
    return () => window.removeEventListener('pageshow', onShow)
  }, [])

  const pay = () => {
    if (!link) return
    setRedirecting(true)
    window.location.assign(link)
  }

  return (
    <m.div
      className="fixed inset-0 z-sheet flex items-end justify-center bg-forest-950/55 backdrop-blur-sm sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduce ? 0 : 0.2 }}
      onClick={closeBooking}
    >
      <m.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        onClick={(e) => e.stopPropagation()}
        initial={reduce ? false : { y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 320, damping: 32 }}
        className="relative flex max-h-[92dvh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-cream-50 shadow-lift sm:rounded-3xl"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-forest-900/[0.07] px-6 pb-5 pt-6 sm:px-8">
          <div>
            <p className="eyebrow">Book online</p>
            <h2 id="booking-title" className="mt-2 text-3xl">
              {course.name}
            </h2>
            <p className="mt-1 text-ink-700/80">
              <span className="font-semibold text-ink-900">£{course.price}</span> {course.unit}
            </p>
          </div>
          <button ref={closeRef} type="button" onClick={closeBooking} aria-label="Close booking" className="-mr-2 -mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-ink-700 hover:bg-forest-900/5">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8" data-lenis-prevent>
          {needsSession ? (
            <fieldset>
              <legend className="text-sm font-semibold text-ink-900">
                {course.id === 'monthly' ? 'When would you like to start?' : 'Which class would you like to join?'}
              </legend>
              <div className="mt-3 grid gap-2">
                {sessions.map((s) => {
                  const active = s.id === selected
                  return (
                    <label
                      key={s.id}
                      className={`flex cursor-pointer items-center gap-4 rounded-2xl border px-4 py-3 transition-colors ${
                        active ? 'border-amber-400 bg-amber-50 shadow-soft' : 'border-forest-900/10 hover:border-amber-300/70 hover:bg-amber-50/60'
                      }`}
                    >
                      <input type="radio" name="session" value={s.id} checked={active} onChange={() => setSelected(s.id)} className="sr-only" />
                      <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${active ? 'border-amber-400 bg-amber-300' : 'border-forest-900/25'}`}>
                        {active && <span className="h-2 w-2 rounded-full bg-ink-950" />}
                      </span>
                      <span className="flex-1">
                        <span className="block font-semibold text-ink-900">
                          {relativeDay(s.date)}, {formatTime(s.venue.start)}
                        </span>
                        <span className="block text-sm text-ink-700/75">
                          {s.venue.hall}, {s.venue.area}
                        </span>
                      </span>
                    </label>
                  )
                })}
              </div>
            </fieldset>
          ) : (
            <p className="text-ink-700/85">
              Most teams start with a short chat so we can shape the session around your people and space. You can also pay for a session now and we will contact you to arrange the date.
            </p>
          )}

          <div className="mt-6">
            <p className="text-sm font-semibold text-ink-900">Included</p>
            <ul className="mt-3 space-y-2">
              {course.features.map((f) => (
                <li key={f} className="flex gap-3 text-base text-ink-700/85">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-forest-600" strokeWidth={2.2} />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {needsSession && (
            <p className="mt-6 rounded-2xl bg-forest-600/[0.06] px-4 py-3 text-sm leading-relaxed text-ink-700">
              First time with us? After booking, please fill in the{' '}
              <Link to="/registration" onClick={closeBooking} className="link-underline font-semibold">
                short health form
              </Link>{' '}
              so we can keep you safe in class.
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-forest-900/[0.07] bg-white/70 px-6 pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-5 sm:px-8 sm:pb-6">
          {link ? (
            <>
              <button type="button" onClick={pay} disabled={redirecting} className="btn-primary btn-lg w-full">
                {redirecting ? 'Opening secure checkout…' : (
                  <>
                    Continue to payment, £{course.price}
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
              <p className="mt-3 flex items-center justify-center gap-2 text-center text-sm text-ink-700/70">
                <Lock className="h-3.5 w-3.5" />
                Secure checkout by Stripe. Card, Apple Pay or Google Pay.
              </p>
              {course.id === 'corporate' && (
                <Link to="/corporate#enquire" onClick={closeBooking} className="btn-outline mt-3 w-full">
                  Talk to us first
                </Link>
              )}
            </>
          ) : (
            <>
              <p className="text-[0.95rem] text-ink-700/85">Online booking is paused at the moment. Message us and we will reserve your place.</p>
              <a href={whatsappHref(settings.whatsappNumber, `Hi! I'd like to book: ${course.name}.`)} target="_blank" rel="noreferrer" className="btn-primary btn-lg mt-4 w-full">
                Book on WhatsApp
              </a>
            </>
          )}
        </div>
      </m.div>
    </m.div>
  )
}
