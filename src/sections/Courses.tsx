import { Check } from 'lucide-react'
import { Reveal } from '@/components/motion-primitives'
import { COURSES, type Course } from '@/data/content'
import { openBooking } from '@/lib/bookingStore'

const CTA: Record<Course['id'], string> = {
  dropIn: 'Book a drop-in',
  monthly: 'Start Monthly Flow',
  corporate: 'Book for your team',
}

/** The three plans. Monthly Flow is the featured (dark, raised) card. */
export function PlanCards() {
  // 3 columns only from lg: at tablet width they squeeze to ~230px and the copy cramps
  return (
    <div className="grid items-stretch gap-5 lg:grid-cols-3 lg:gap-6">
      {COURSES.map((c, i) => {
        const featured = !!c.popular
        return (
          <Reveal key={c.id} delay={i * 0.08} className={`h-full ${featured ? 'lg:-mt-4' : 'lg:mt-4'}`}>
            <article
              className={`relative flex h-full flex-col rounded-3xl p-7 sm:p-8 ${
                featured ? 'bg-forest-800 text-cream-50 shadow-lift' : 'border border-forest-900/[0.08] bg-white/85 shadow-soft'
              }`}
            >
              {featured && (
                <p className="absolute -top-3 left-7 rounded-full bg-amber-300 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-ink-950 sm:left-8">
                  Most popular
                </p>
              )}
              <h3 className={`text-3xl ${featured ? '!text-cream-50' : ''}`}>{c.name}</h3>
              <p className="mt-5 flex items-baseline gap-2">
                <span className={`font-serif text-6xl font-medium leading-none ${featured ? 'text-cream-50' : 'text-ink-900'}`}>£{c.price}</span>
                <span className={featured ? 'text-cream-100/75' : 'text-ink-700/70'}>{c.unit}</span>
              </p>
              <p className={`mt-5 leading-relaxed ${featured ? 'text-cream-100/85' : 'text-ink-700/80'}`}>{c.blurb}</p>
              <ul className={`mt-6 flex-1 space-y-3 border-t pt-6 ${featured ? 'border-cream-50/15' : 'border-forest-900/[0.08]'}`}>
                {c.features.map((f) => (
                  <li key={f} className="flex gap-3 text-base">
                    <Check className={`mt-0.5 h-4 w-4 shrink-0 ${featured ? 'text-amber-300' : 'text-forest-600'}`} strokeWidth={2.2} />
                    <span className={featured ? 'text-cream-100/90' : 'text-ink-700/85'}>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => openBooking({ courseId: c.id })}
                className="btn-primary mt-8 w-full"
              >
                {CTA[c.id]}
              </button>
            </article>
          </Reveal>
        )
      })}
    </div>
  )
}

export function PaymentNote({ className = '' }: { className?: string }) {
  return (
    <p className={`text-center text-[0.95rem] text-ink-700/70 ${className}`}>
      Secure online payment by card, Apple Pay or Google Pay through Stripe. Under-18s need a parent or guardian’s consent.
    </p>
  )
}
