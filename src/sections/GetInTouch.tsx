import { useState } from 'react'
import { Reveal } from '@/components/motion-primitives'
import { CheckCircle2, Send } from 'lucide-react'

const CONTACT_ENDPOINT = 'https://sattvalife-cms.cbvarshini1.workers.dev/api/contact'

export default function GetInTouch() {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const body = { ...Object.fromEntries(data.entries()), type: 'contact' }
    setError(null)
    try {
      const res = await fetch(CONTACT_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      if (!res.ok) throw new Error(String(res.status))
      setSubmitted(true)
      form.reset()
    } catch (err) {
      console.error('Contact form submission failed', err)
      setError('We could not send your message — please check your connection and try again.')
    }
  }

  return (
    <section id="get-in-touch" className="relative py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-3xl px-5">
        <Reveal>
          <p className="text-center uppercase tracking-[0.3em] text-xs font-semibold text-amber-500 mb-3">Get in Touch</p>
          <h2 className="text-center font-serif text-4xl md:text-5xl text-forest-900 mb-12">We'd Love to Hear From You</h2>
        </Reveal>
        <Reveal delay={0.1}>
          {submitted ? (
            <div className="glass rounded-3xl p-8 md:p-10 shadow-xl text-center space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/10 text-amber-600">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="font-serif text-3xl text-forest-900">Thank You!</h3>
              <p className="text-forest-700/80 max-w-md mx-auto">
                We have received your message and will get back to you soon.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-4 rounded-xl gold-click bg-forest-600 px-6 py-2.5 text-sm font-semibold text-cream-50 hover:bg-forest-500 transition-all"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="glass rounded-3xl p-8 md:p-10 shadow-xl space-y-5">
              {error && (
                <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
              )}
              <div className="grid md:grid-cols-2 gap-5">
                <input name="firstName" required placeholder="First Name" autoComplete="given-name" enterKeyHint="next" className="rounded-xl border border-forest-200 px-4 py-3 text-sm outline-none focus:border-forest-500 focus:ring-2 focus:ring-forest-500/20" />
                <input name="lastName" required placeholder="Last Name" autoComplete="family-name" enterKeyHint="next" className="rounded-xl border border-forest-200 px-4 py-3 text-sm outline-none focus:border-forest-500 focus:ring-2 focus:ring-forest-500/20" />
              </div>
              <input name="email" type="email" required placeholder="Email Address" autoComplete="email" inputMode="email" enterKeyHint="next" className="w-full rounded-xl border border-forest-200 px-4 py-3 text-sm outline-none focus:border-forest-500 focus:ring-2 focus:ring-forest-500/20" />
              <input name="phone" type="tel" placeholder="Phone Number (optional)" autoComplete="tel" inputMode="tel" enterKeyHint="next" className="w-full rounded-xl border border-forest-200 px-4 py-3 text-sm outline-none focus:border-forest-500 focus:ring-2 focus:ring-forest-500/20" />
              <textarea name="message" rows={4} placeholder="Your Message..." enterKeyHint="send" className="w-full rounded-xl border border-forest-200 px-4 py-3 text-sm outline-none focus:border-forest-500 focus:ring-2 focus:ring-forest-500/20 resize-none" />
              <button type="submit" className="w-full rounded-xl gold-click bg-forest-600 py-3.5 font-semibold text-cream-50 hover:bg-forest-500 active:scale-[0.98] transition-all inline-flex items-center justify-center gap-2">
                <Send className="h-4 w-4" />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}
