import { useId, useState } from 'react'
import { Link } from 'react-router'
import { ArrowRight, Check } from 'lucide-react'
import { HONEYPOT, submitForm } from '@/lib/api'

/** Compact newsletter signup (dark background). Posts to the Worker's /api/newsletter. */
export default function NewsletterForm({ source = 'website-footer' }: { source?: string }) {
  const id = useId()
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [error, setError] = useState('')

  const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>
    setStatus('sending')
    setError('')
    try {
      await submitForm('/api/newsletter', { email: data.email.trim(), source, [HONEYPOT]: data[HONEYPOT] })
      setStatus('sent')
    } catch (err) {
      setError((err as Error).message)
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <p role="status" className="flex items-center gap-3 rounded-2xl border border-amber-300/30 bg-amber-300/10 px-5 py-4 text-cream-50">
        <Check className="h-5 w-5 shrink-0 text-amber-300" />
        Thank you, you are on the list. Look out for our next update.
      </p>
    )
  }

  return (
    <form onSubmit={onSubmit} className="w-full">
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
          placeholder="you@example.com"
          className="field-dark sm:flex-1"
        />
        <input type="text" name={HONEYPOT} tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
        <button type="submit" disabled={status === 'sending'} className="btn-primary">
          {status === 'sending' ? 'Joining…' : 'Subscribe'}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      {status === 'error' && (
        <p role="alert" className="mt-3 text-sm text-amber-200">
          {error}
        </p>
      )}
      <p className="mt-3 text-sm text-cream-100/60">
        Class news and gentle wellbeing tips, a few times a year. Unsubscribe any time.{' '}
        <Link to="/privacy" className="inline-block py-1 underline underline-offset-4 hover:text-cream-50">
          Privacy policy
        </Link>
      </p>
    </form>
  )
}
