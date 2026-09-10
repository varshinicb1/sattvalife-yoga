import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Reveal, SectionHeading, TiltCard } from '@/components/motion-primitives'
import { COURSES, type Course } from '@/data/content'
import { Zap, Check } from 'lucide-react'
import StripeOneClickCheckout from '@/components/StripeOneClickCheckout'
import { PaymentBadges } from '@/components/PaymentBadges'

const fmt = (n: number) => `£${n}`

export default function Courses() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)

  return (
    <section id="courses" className="relative py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading eyebrow="Wellness Courses" title="Choose Your Path to Wellbeing" />
        <p className="mx-auto -mt-8 mb-16 max-w-2xl text-center text-forest-800/75">
          3 key focus areas — Back, Belly & Breath. Every programme builds improved back strength,
          a toned belly with improved digestion, and deeper, relaxed, corrective breathing.
        </p>

        <div className="grid md:grid-cols-3 gap-8 items-stretch" style={{ perspective: 1400 }}>
          {COURSES.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.12} className="h-full">
              <TiltCard className="h-full">
                <div
                  className={`relative h-full rounded-3xl p-8 flex flex-col shadow-xl transition-shadow hover:shadow-2xl ${
                    c.popular
                      ? 'bg-gradient-to-b from-forest-700 via-forest-800 to-forest-900 text-cream-50 shadow-forest-900/30 ring-4 ring-amber-400/60'
                      : 'glass text-forest-900 shadow-forest-900/10'
                  }`}
                  style={{ transform: 'translateZ(30px)' }}
                >
                  {c.popular && (
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-forest-950 shadow-lg shadow-amber-500/40">
                      Most Popular
                    </span>
                  )}
                  <h3 className="font-serif text-3xl">{c.name}</h3>
                  <div className="mt-4 flex items-end gap-2">
                    <span className="font-serif text-5xl font-bold">{fmt(c.price)}</span>
                    <span className={`pb-1.5 text-sm ${c.popular ? 'text-cream-100/75' : 'text-forest-700/70'}`}>
                      {c.unit}
                    </span>
                  </div>
                  <p className={`mt-4 text-sm leading-relaxed ${c.popular ? 'text-cream-100/85' : 'text-forest-800/75'}`}>
                    {c.blurb}
                  </p>
                  <ul className="mt-6 space-y-3 flex-1">
                    {c.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm">
                        <Check className={`h-4 w-4 shrink-0 mt-0.5 ${c.popular ? 'text-amber-400' : 'text-forest-600'}`} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => setSelectedCourse(c)}
                    className={`mt-8 w-full rounded-xl py-3.5 font-bold transition-all hover:-translate-y-0.5 active:scale-[0.99] flex items-center justify-center gap-2 shadow-lg ${
                      c.popular
                        ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-forest-950 shadow-amber-500/30 hover:brightness-105'
                        : 'bg-forest-600 text-cream-50 shadow-forest-600/30 hover:bg-forest-500'
                    }`}
                  >
                    <Zap className="h-4 w-4 fill-current" />
                    <span>1-Click Checkout</span>
                  </button>
                  <div className="mt-4">
                    <PaymentBadges dark={c.popular} />
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <p className="text-sm text-forest-700/70">
            Registering for someone else? After purchase you'll receive an email with fees, venue
            and payment details. Under-18s require a parent or guardian's consent.
          </p>
        </Reveal>
      </div>

      <AnimatePresence>
        {selectedCourse && (
          <StripeOneClickCheckout
            course={selectedCourse}
            onClose={() => setSelectedCourse(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

