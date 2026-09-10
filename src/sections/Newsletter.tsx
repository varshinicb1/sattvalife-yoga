import { useState } from 'react'
import { motion } from 'framer-motion'
import { Reveal } from '@/components/motion-primitives'
import { CheckCircle2, Sparkles } from 'lucide-react'

const NEWSLETTER_ENDPOINT = 'https://sattvalife-cms.cbvarshini1.workers.dev/api/newsletter'

const INTEREST_SEGMENTS = [
  'Local Studio Classes',
  'Live Online Yoga',
  'UK Retreats & Pop-Ups',
  'Workplace & B2B Wellness'
]

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['Local Studio Classes'])
  const [status, setStatus] = useState<'idle' | 'sent' | 'error'>('idle')

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    )
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    try {
      const res = await fetch(NEWSLETTER_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          interests: selectedInterests,
          source: 'sattvalife-website-v2'
        }),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('sent')
    } catch (err) {
      console.error('Newsletter signup failed', err)
      setStatus('error')
    }
  }

  return (
    <section className="relative py-16 md:py-20 lg:py-24 bg-gradient-to-b from-forest-800 to-forest-900 overflow-hidden text-cream-50">
      <img
        src="/images/lotus.png"
        alt=""
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute -left-20 bottom-0 w-96 opacity-5 -rotate-12"
      />
      <div className="relative mx-auto max-w-3xl px-5 text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full bg-amber-400/20 px-3.5 py-1 text-xs font-semibold text-amber-300 border border-amber-400/30 mb-3">
            <Sparkles className="h-3.5 w-3.5" /> Mindful Community Newsletter
          </span>
          <p className="font-serif text-3xl md:text-4xl text-cream-50">Stay Connected to the Flow</p>
          <p className="mt-3 text-cream-100/70 text-sm max-w-lg mx-auto">
            Receive curated yogic insights, seasonal retreat announcements, online class schedules, and wellness articles tailored to your interests.
          </p>
        </Reveal>

        {status === 'sent' ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-6 rounded-2xl bg-amber-400/20 border border-amber-400/40 text-amber-300 inline-flex items-center gap-3 font-medium"
          >
            <CheckCircle2 className="h-6 w-6 text-amber-400 shrink-0" />
            <div className="text-left">
              <p className="font-semibold text-sm">Welcome to the Sattvalife Community!</p>
              <p className="text-xs text-cream-100/80 mt-0.5">We have registered your preferences: {selectedInterests.join(', ')}.</p>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={submit} className="mt-8 space-y-4 max-w-xl mx-auto">
            {status === 'error' && (
              <p className="text-sm text-amber-300 bg-amber-950/30 border border-amber-400/30 rounded-xl px-4 py-2">
                Something went wrong sending that — please try again in a moment.
              </p>
            )}
            {/* Interest Segment Chips */}
            <div className="text-left">
              <p className="text-xs font-semibold uppercase tracking-wider text-cream-100/60 mb-2 text-center">
                I am interested in (select all that apply):
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {INTEREST_SEGMENTS.map((seg) => {
                  const isChecked = selectedInterests.includes(seg)
                  return (
                    <button
                      type="button"
                      key={seg}
                      onClick={() => toggleInterest(seg)}
                      className={`text-xs px-3.5 py-1.5 rounded-full border transition-all ${
                        isChecked
                          ? 'bg-amber-400 text-forest-950 font-bold border-amber-300 shadow-sm'
                          : 'bg-white/10 text-cream-100/80 border-white/15 hover:bg-white/15'
                      }`}
                    >
                      {isChecked ? '✓ ' : '+ '}{seg}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 rounded-xl border border-cream-50/20 bg-cream-50/10 px-5 py-3 text-sm text-cream-50 placeholder-cream-100/50 outline-none focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/20 transition-all"
              />
              <button
                type="submit"
                className="rounded-xl gold-click bg-amber-400 px-7 py-3 font-semibold text-forest-900 hover:bg-amber-300 active:scale-[0.97] transition-all whitespace-nowrap shadow-md"
              >
                Join Community
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
