import { useId, useState } from 'react'
import { Link } from 'react-router'
import { CheckCircle2 } from 'lucide-react'
import PageHero from '@/components/PageHero'
import { Reveal } from '@/components/motion-primitives'
import { REGISTRATION_FORM } from '@/data/content'
import { HONEYPOT, submitForm } from '@/lib/api'

function Field({ label, id, optional, children }: { label: string; id: string; optional?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label} {optional && <span className="font-normal text-ink-700/60">(optional)</span>}
      </label>
      {children}
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="border-t border-forest-900/[0.08] pt-8 first:border-t-0 first:pt-0">
      <legend className="float-left mb-6 w-full font-serif text-2xl text-ink-900">{title}</legend>
      <div className="clear-left grid gap-5 sm:grid-cols-2">{children}</div>
    </fieldset>
  )
}

export default function RegistrationPage() {
  const id = useId()
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [error, setError] = useState('')
  const [experienced, setExperienced] = useState(false)

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const get = (k: string) => String(fd.get(k) ?? '').trim()
    const photo = fd.get('photoConsent') === 'on'
    const notes = [get('notes'), `Photo/video consent: ${photo ? 'yes' : 'no'}`].filter(Boolean).join('\n\n')

    setStatus('sending')
    setError('')
    try {
      await submitForm('/api/register', {
        name: [get('firstName'), get('lastName')].filter(Boolean).join(' '),
        firstName: get('firstName'),
        lastName: get('lastName'),
        dob: get('dob'),
        occupation: get('occupation'),
        address: get('address'),
        city: get('city'),
        postCode: get('postCode'),
        email: get('email'),
        phone: get('phone'),
        emergencyContact: get('emergencyContact'),
        regType: get('regType'),
        experience: get('experience'),
        experienceDetail: get('experienceDetail'),
        painAreas: fd.getAll('pain').map(String),
        surgeries: get('surgeries'),
        notes,
        [HONEYPOT]: get(HONEYPOT),
      })
      setStatus('sent')
      window.scrollTo({ top: 0 })
    } catch (err) {
      setError((err as Error).message)
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <section className="container-page flex min-h-[80dvh] items-center justify-center pt-[calc(84px+env(safe-area-inset-top))]">
        <div role="status" className="max-w-lg py-16 text-center">
          <CheckCircle2 className="mx-auto h-14 w-14 text-forest-600" strokeWidth={1.4} />
          <h1 className="mt-6 text-5xl">Thank you for registering</h1>
          <p className="lead mx-auto mt-4">
            Your details are safely with us. If you have not booked yet, choose your first class below. We look forward to meeting you.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/classes" className="btn-primary btn-lg">Book a class</Link>
            <Link to="/" className="btn-outline btn-lg">Back to home</Link>
          </div>
        </div>
      </section>
    )
  }

  const f = (name: string) => `${id}-${name}`

  return (
    <>
      <PageHero
        eyebrow="New students"
        title="Registration & health form"
        intro="Please complete this once before your first class. It helps us understand your body and keep you safe. It takes about three minutes."
      />

      <section className="section-pb pt-2">
        <div className="container-page">
          <Reveal className="mx-auto max-w-3xl">
            <form onSubmit={handleSubmit} className="space-y-10 rounded-3xl border border-forest-900/[0.08] bg-white p-6 shadow-soft sm:p-10">
              <Section title="About you">
                <Field label="First name" id={f('first')}>
                  <input id={f('first')} name="firstName" required autoComplete="given-name" className="field" />
                </Field>
                <Field label="Last name" id={f('last')}>
                  <input id={f('last')} name="lastName" required autoComplete="family-name" className="field" />
                </Field>
                <Field label="Date of birth" id={f('dob')} optional>
                  <input id={f('dob')} name="dob" type="date" autoComplete="bday" className="field" />
                </Field>
                <Field label="Occupation" id={f('occupation')} optional>
                  <input id={f('occupation')} name="occupation" autoComplete="organization-title" className="field" />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Address" id={f('address')} optional>
                    <input id={f('address')} name="address" autoComplete="street-address" className="field" />
                  </Field>
                </div>
                <Field label="Town or city" id={f('city')} optional>
                  <input id={f('city')} name="city" autoComplete="address-level2" className="field" />
                </Field>
                <Field label="Postcode" id={f('postcode')} optional>
                  <input id={f('postcode')} name="postCode" autoComplete="postal-code" className="field uppercase" />
                </Field>
              </Section>

              <Section title="Contact">
                <Field label="Email" id={f('email')}>
                  <input id={f('email')} name="email" type="email" required autoComplete="email" inputMode="email" className="field" />
                </Field>
                <Field label="Mobile" id={f('phone')}>
                  <input id={f('phone')} name="phone" type="tel" required autoComplete="tel" inputMode="tel" className="field" />
                </Field>
                <Field label="Emergency contact number" id={f('emergency')}>
                  <input id={f('emergency')} name="emergencyContact" type="tel" required inputMode="tel" className="field" />
                </Field>
                <fieldset>
                  <legend className="field-label">Registering for</legend>
                  <div className="flex gap-6 pt-2">
                    {[['self', 'Myself'], ['someone-else', 'Someone else']].map(([v, l]) => (
                      <label key={v} className="flex items-center gap-2.5 text-ink-900">
                        <input type="radio" name="regType" value={v} defaultChecked={v === 'self'} className="h-5 w-5 accent-forest-600" />
                        {l}
                      </label>
                    ))}
                  </div>
                </fieldset>
              </Section>

              <Section title="Your practice & health">
                <fieldset className="sm:col-span-2">
                  <legend className="field-label">Have you practised yoga before?</legend>
                  <div className="flex gap-6 pt-2">
                    {[['yes', 'Yes'], ['no', 'No']].map(([v, l]) => (
                      <label key={v} className="flex items-center gap-2.5 text-ink-900">
                        <input
                          type="radio"
                          name="experience"
                          value={v}
                          defaultChecked={v === 'no'}
                          onChange={() => setExperienced(v === 'yes')}
                          className="h-5 w-5 accent-forest-600"
                        />
                        {l}
                      </label>
                    ))}
                  </div>
                </fieldset>
                {experienced && (
                  <div className="sm:col-span-2">
                    <Field label="When, and for how long?" id={f('expdetail')}>
                      <input id={f('expdetail')} name="experienceDetail" placeholder="e.g. On and off for two years" className="field" />
                    </Field>
                  </div>
                )}
                <fieldset className="sm:col-span-2">
                  <legend className="field-label">Do you have numbness or pain in any of these areas?</legend>
                  <p className="field-help !mt-0">Select all that apply.</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {REGISTRATION_FORM.painAreas.map((area) => (
                      <label key={area} className="cursor-pointer">
                        <input type="checkbox" name="pain" value={area} className="peer sr-only" />
                        <span className="chip !px-4">
                          {area}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                <div className="sm:col-span-2">
                  <Field label="Any past surgeries or illnesses we should know about?" id={f('surgeries')} optional>
                    <input id={f('surgeries')} name="surgeries" className="field" />
                  </Field>
                </div>
                <div className="sm:col-span-2">
                  <Field label="Anything else?" id={f('notes')} optional>
                    <textarea id={f('notes')} name="notes" rows={3} placeholder="Pregnancy, medication, goals, or anything that helps us teach you well." className="field resize-y" />
                  </Field>
                </div>
              </Section>

              <fieldset className="border-t border-forest-900/[0.08] pt-8">
                <legend className="float-left mb-4 w-full font-serif text-2xl text-ink-900">Waiver & consent</legend>
                <div className="clear-left max-h-64 space-y-3 overflow-y-auto rounded-2xl bg-cream-100 p-5 text-[0.95rem] leading-relaxed text-ink-700" data-lenis-prevent tabIndex={0} aria-label="Waiver text">
                  {REGISTRATION_FORM.waiver.map((p) => (
                    <p key={p.slice(0, 24)}>{p}</p>
                  ))}
                </div>
                <div className="mt-5 space-y-4">
                  <label className="flex items-start gap-3 text-ink-900">
                    <input type="checkbox" required className="mt-1 h-5 w-5 shrink-0 accent-forest-600" />
                    <span>
                      I have read and agree to the waiver above and the{' '}
                      <Link to="/terms" target="_blank" className="link-underline font-semibold">terms & conditions</Link>.
                    </span>
                  </label>
                  <label className="flex items-start gap-3 text-ink-900">
                    <input type="checkbox" required className="mt-1 h-5 w-5 shrink-0 accent-forest-600" />
                    <span>
                      I consent to Sattvalife Yoga storing the health information I have given, only to keep me safe in class. See our{' '}
                      <Link to="/privacy" target="_blank" className="link-underline font-semibold">privacy policy</Link>.
                    </span>
                  </label>
                  <label className="flex items-start gap-3 text-ink-900">
                    <input type="checkbox" name="photoConsent" className="mt-1 h-5 w-5 shrink-0 accent-forest-600" />
                    <span>
                      {REGISTRATION_FORM.photoConsent} <span className="text-ink-700/60">(optional)</span>
                    </span>
                  </label>
                </div>
              </fieldset>

              <input type="text" name={HONEYPOT} tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

              {status === 'error' && (
                <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-red-800">
                  {error} If it keeps happening, email us and we will register you by hand.
                </p>
              )}

              <button type="submit" disabled={status === 'sending'} className="btn-primary btn-lg w-full">
                {status === 'sending' ? 'Submitting…' : 'Submit registration'}
              </button>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  )
}
