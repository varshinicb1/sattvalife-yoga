import { useId, useState } from 'react'
import { CheckCircle2, Mail } from 'lucide-react'
import { Reveal } from '@/components/motion-primitives'
import { BrandIcon } from '@/components/BrandIcon'
import { useCmsContent, whatsappHref } from '@/hooks/useCmsContent'
import { HONEYPOT, submitForm } from '@/lib/api'

/** Contact form. `type` is stored with the message so the admin app can filter enquiries. */
export function ContactForm({
  type = 'contact',
  messageLabel = 'How can we help?',
  messagePlaceholder = 'Tell us a little about yourself and what you are looking for.',
  submitLabel = 'Send message',
  extraFields,
}: {
  type?: 'contact' | 'corporate' | 'event'
  messageLabel?: string
  messagePlaceholder?: string
  submitLabel?: string
  extraFields?: React.ReactNode
}) {
  const id = useId()
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [error, setError] = useState('')

  const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    const data = Object.fromEntries(fd) as Record<string, string>
    // x_* fields are appended to the message; getAll keeps checkbox groups intact
    const extras = [...new Set([...fd.keys()])]
      .filter((k) => k.startsWith('x_'))
      .map((k) => {
        const values = fd.getAll(k).map(String).map((v) => v.trim()).filter(Boolean)
        return values.length ? `${k.slice(2).replace(/_/g, ' ')}: ${values.join(', ')}` : ''
      })
      .filter(Boolean)
    setStatus('sending')
    setError('')
    try {
      await submitForm('/api/contact', {
        firstName: data.firstName?.trim(),
        lastName: data.lastName?.trim(),
        email: data.email?.trim(),
        phone: data.phone?.trim(),
        message: [...extras, data.message?.trim()].filter(Boolean).join('\n'),
        type,
        [HONEYPOT]: data[HONEYPOT],
      })
      form.reset()
      setStatus('sent')
    } catch (err) {
      setError((err as Error).message)
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div role="status" className="rounded-3xl border border-forest-900/[0.08] bg-white p-8 text-center shadow-soft sm:p-10">
        <CheckCircle2 className="mx-auto h-12 w-12 text-forest-600" strokeWidth={1.5} />
        <h3 className="mt-4 text-3xl">Thank you</h3>
        <p className="mx-auto mt-2 max-w-sm text-forest-800/80">Your message is with us. Amisha or Nish will reply as soon as they can, usually within a day or two.</p>
        <button type="button" onClick={() => setStatus('idle')} className="btn-outline mt-6">
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="rounded-3xl border border-forest-900/[0.08] bg-white p-6 shadow-soft sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-first`} className="field-label">First name</label>
          <input id={`${id}-first`} name="firstName" required autoComplete="given-name" className="field" />
        </div>
        <div>
          <label htmlFor={`${id}-last`} className="field-label">Last name</label>
          <input id={`${id}-last`} name="lastName" autoComplete="family-name" className="field" />
        </div>
        <div>
          <label htmlFor={`${id}-email`} className="field-label">Email</label>
          <input id={`${id}-email`} name="email" type="email" required autoComplete="email" inputMode="email" className="field" />
        </div>
        <div>
          <label htmlFor={`${id}-phone`} className="field-label">
            Phone <span className="font-normal text-forest-800/60">(optional)</span>
          </label>
          <input id={`${id}-phone`} name="phone" type="tel" autoComplete="tel" inputMode="tel" className="field" />
        </div>
        {extraFields}
        <div className="sm:col-span-2">
          <label htmlFor={`${id}-message`} className="field-label">{messageLabel}</label>
          <textarea id={`${id}-message`} name="message" rows={4} required placeholder={messagePlaceholder} className="field resize-y" />
        </div>
      </div>
      <input type="text" name={HONEYPOT} tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      {status === 'error' && (
        <p role="alert" className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </p>
      )}
      <button type="submit" disabled={status === 'sending'} className="btn-primary btn-lg mt-6 w-full sm:w-auto">
        {status === 'sending' ? 'Sending…' : submitLabel}
      </button>
    </form>
  )
}

/** Home & timetable: a warm close with every way to reach us. */
export function ContactSection() {
  const { settings } = useCmsContent()
  return (
    <section id="get-in-touch" className="py-20 sm:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <Reveal>
          <h2 className="text-4xl leading-[1.08] sm:text-5xl">We would love to hear from you</h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-forest-800/80">
            Not sure which class suits you, or have an injury to mention? Ask us anything. We reply personally.
          </p>
          <div className="mt-8 grid gap-3 sm:max-w-sm">
            <a href={whatsappHref(settings.whatsappNumber)} target="_blank" rel="noreferrer" className="btn-outline justify-start">
              <BrandIcon name="whatsapp" className="h-5 w-5 text-[#1f9e4f]" />
              WhatsApp {settings.whatsappNumber}
            </a>
            <a href={`mailto:${settings.contactEmail}`} className="btn-outline justify-start">
              <Mail className="h-5 w-5" strokeWidth={1.6} />
              {settings.contactEmail}
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  )
}
