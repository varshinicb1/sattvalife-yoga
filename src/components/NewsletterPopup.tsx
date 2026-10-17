import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { ArrowRight, Check, X } from 'lucide-react'
import { HONEYPOT, submitForm } from '@/lib/api'
import { useConsent } from '@/lib/consent'
import { ANALYTICS_ENABLED } from '@/hooks/usePostHog'

const KEY = 'sattvalife_newsletter_prompt'
/** Pages where the visitor is already filling something in; do not interrupt. */
const QUIET = ['/registration', '/contact', '/privacy', '/cookies', '/terms', '/accessibility']

function alreadyAnswered(): boolean {
  try {
    return Boolean(localStorage.getItem(KEY))
  } catch {
    // private mode or blocked storage: better to stay quiet than to nag every page
    return true
  }
}

function remember(value: 'dismissed' | 'subscribed') {
  try {
    localStorage.setItem(KEY, value)
  } catch {
    /* nothing to do: the prompt simply may reappear next visit */
  }
}

/**
 * The discreet, dismissible sign-up the brief asks for. It is deliberately not a
 * modal — it never traps focus or blocks the page — and it asks for marketing
 * consent explicitly with a required checkbox rather than treating the email
 * address as permission on its own (UK PECR).
 *
 * It waits for a real signal of interest (time on site or half the page) and
 * remembers the answer, so nobody is asked twice.
 */
export default function NewsletterPopup() {
  const id = useId()
  const { pathname } = useLocation()
  const consent = useConsent()
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [error, setError] = useState('')
  const closeRef = useRef<HTMLButtonElement>(null)

  const quiet = QUIET.some((p) => pathname.startsWith(p))
  const blockedByBanner = ANALYTICS_ENABLED && consent === null

  useEffect(() => {
    if (quiet || blockedByBanner || alreadyAnswered()) return
    let done = false
    const show = () => {
      if (done) return
      done = true
      setOpen(true)
    }
    const timer = window.setTimeout(show, 25_000)
    const onScroll = () => {
      const seen = window.scrollY + window.innerHeight
      if (seen / document.documentElement.scrollHeight > 0.5) show()
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
    }
  }, [quiet, blockedByBanner])

  /* Declared above the Escape handler so that handler cannot close over a stale copy. */
  const dismiss = useCallback(() => {
    remember('dismissed')
    setOpen(false)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismiss()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, dismiss])

  const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>
    setStatus('sending')
    setError('')
    try {
      await submitForm('/api/newsletter', {
        email: String(data.email).trim(),
        source: 'website-popup',
        [HONEYPOT]: data[HONEYPOT],
      })
      remember('subscribed')
      setStatus('sent')
      window.setTimeout(() => setOpen(false), 2600)
    } catch (err) {
      setError((err as Error).message)
      setStatus('error')
    }
  }

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-labelledby={`${id}-title`}
      data-print-hide
      className="fixed bottom-[calc(5.75rem+env(safe-area-inset-bottom))] left-4 right-4 z-banner w-auto rounded-3xl border border-forest-900/10 bg-cream-50 p-5 shadow-lift sm:left-6 sm:right-auto sm:w-[23rem] lg:bottom-[calc(1.5rem+env(safe-area-inset-bottom))]"
    >
      <button
        ref={closeRef}
        type="button"
        onClick={dismiss}
        aria-label="Close newsletter sign-up"
        className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-ink-700 transition-colors hover:bg-ink-900/5"
      >
        <X className="h-5 w-5" strokeWidth={1.8} />
      </button>

      {status === 'sent' ? (
        <p role="status" className="flex items-start gap-3 pr-8 text-ink-800">
          <Check className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" strokeWidth={2.2} />
          Thank you — you are on the list.
        </p>
      ) : (
        <>
          <h2 id={`${id}-title`} className="pr-8 text-2xl leading-tight">
            Stay in the flow
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-700/85">
            New classes, workshops and seasonal wellbeing tips from Amisha and Nish. A few emails a year, never more.
          </p>

          <form onSubmit={onSubmit} className="mt-4">
            <label htmlFor={`${id}-email`} className="sr-only">
              Email address
            </label>
            <input
              id={`${id}-email`}
              name="email"
              type="email"
              required
              autoComplete="email"
              inputMode="email"
              enterKeyHint="send"
              placeholder="you@example.com"
              className="field"
            />

            <label htmlFor={`${id}-consent`} className="mt-3 flex items-start gap-2.5 text-sm leading-relaxed text-ink-700">
              <input
                id={`${id}-consent`}
                name="consent"
                type="checkbox"
                required
                className="mt-0.5 h-5 w-5 shrink-0 accent-amber-500"
              />
              <span>
                Yes, email me class news and wellbeing tips. I can unsubscribe at any time.{' '}
                <Link to="/privacy" className="link-underline font-medium">
                  Privacy policy
                </Link>
              </span>
            </label>

            <input type="text" name={HONEYPOT} tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

            <div className="mt-4 flex items-center gap-3">
              <button type="submit" disabled={status === 'sending'} className="btn-primary">
                {status === 'sending' ? 'Joining…' : 'Subscribe'}
                <ArrowRight className="h-4 w-4" />
              </button>
              <button type="button" onClick={dismiss} className="py-2 text-sm font-medium text-ink-700 underline underline-offset-4 hover:text-ink-900">
                No thanks
              </button>
            </div>

            {status === 'error' && (
              <p role="alert" className="mt-3 text-sm font-medium text-red-700">
                {error}
              </p>
            )}
          </form>
        </>
      )}
    </div>
  )
}
