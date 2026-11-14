import { useId, useState } from 'react'
import { Link } from 'react-router'
import { ArrowRight, BellRing, Check } from 'lucide-react'
import { UPCOMING } from '@/data/content'
import { HONEYPOT, submitForm } from '@/lib/api'

/**
 * Stands in for the class nights we no longer run. Posts to the same Worker
 * endpoint as the newsletter but with its own `source`, so the studio can tell
 * "wants another class day" apart from "wants the newsletter" in the admin app.
 */
export default function UpcomingClasses({
  className = '',
  copy = UPCOMING,
}: {
  className?: string
  /** Swap the wording and sign-up source, e.g. for online-class interest. */
  copy?: typeof UPCOMING
}) {
  const id = useId()
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [error, setError] = useState('')

  const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>
    setStatus('sending')
    setError('')
    try {
      await submitForm('/api/newsletter', {
        email: data.email.trim(),
        source: copy.source,
        [HONEYPOT]: data[HONEYPOT],
      })
      setStatus('sent')
    } catch (err) {
      setError((err as Error).message)
      setStatus('error')
    }
  }

  return (
    <div className={`rounded-3xl border border-amber-400/30 bg-amber-50/70 p-6 sm:p-8 ${className}`}>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-10">
        <div className="lg:flex-1">
          <p className="eyebrow flex items-center gap-2">
            <BellRing className="h-4 w-4" strokeWidth={1.9} aria-hidden="true" />
            {copy.eyebrow}
          </p>
          <h2 className="mt-3 text-[1.9rem] leading-tight sm:text-4xl">{copy.title}</h2>
          <p className="mt-3 max-w-[52ch] text-base leading-relaxed text-ink-700/85">{copy.text}</p>
        </div>

        <div className="lg:w-[25rem] lg:shrink-0">
          {status === 'sent' ? (
            <p role="status" className="flex items-start gap-3 rounded-2xl border border-amber-400/40 bg-white/80 px-5 py-4 text-ink-800">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" strokeWidth={2.2} />
              Thank you — you are on the list. We will email you as soon as it opens.
            </p>
          ) : (
            <form onSubmit={onSubmit}>
              <label htmlFor={`${id}-email`} className="sr-only">
                Email address
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  id={`${id}-email`}
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  inputMode="email"
                  enterKeyHint="send"
                  placeholder="you@example.com"
                  className="field sm:flex-1"
                />
                <input type="text" name={HONEYPOT} tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
                <button type="submit" disabled={status === 'sending'} className="btn-primary shrink-0">
                  {status === 'sending' ? 'Sending…' : copy.cta}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              {status === 'error' && (
                <p role="alert" className="mt-3 text-sm font-medium text-red-700">
                  {error}
                </p>
              )}
              <p className="mt-3 text-sm text-ink-700/75">
                {copy.note}{' '}
                <Link to="/privacy" className="link-underline inline-block py-0.5 font-medium">
                  Privacy policy
                </Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
