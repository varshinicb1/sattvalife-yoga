import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { GoogleG, Reveal, Stars } from '@/components/motion-primitives'
import { RATING, REVIEWS, type Review } from '@/data/content'

/** Short, punchy reviews read best as a hero quote. */
const FEATURED = REVIEWS.filter((r) => r.text.length > 60 && r.text.length < 200)

export function RatingSummary({ dark = false }: { dark?: boolean }) {
  return (
    <div>
      <div className="flex items-end gap-4">
        <span className={`font-serif text-7xl font-medium leading-none sm:text-8xl ${dark ? 'text-cream-50' : 'text-ink-900'}`}>{RATING.value.toFixed(1)}</span>
        <div className="pb-2">
          <Stars className="h-5 w-5" label={`Rated ${RATING.value} out of 5`} />
          <p className={`mt-1.5 flex items-center gap-2 text-sm ${dark ? 'text-cream-100/75' : 'text-ink-700/75'}`}>
            <GoogleG className="h-4 w-4" /> {RATING.total} Google reviews
          </p>
        </div>
      </div>
      <a href={RATING.googleUrl} target="_blank" rel="noreferrer" className={`mt-6 inline-flex items-center gap-2 font-semibold ${dark ? 'text-cream-50' : 'text-ink-700'}`}>
        <span className="link-underline">Read every review on Google</span>
        <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  )
}

/** Home: one large quote at a time with manual controls (no autoplay). */
export function ReviewsShowcase() {
  const [i, setI] = useState(0)
  const reduce = useReducedMotion()
  const r = FEATURED[i]
  const go = (d: number) => setI((p) => (p + d + FEATURED.length) % FEATURED.length)

  return (
    <section className="section-y bg-cream-100" aria-label="Reviews">
      <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal>
          <p className="eyebrow">Loved in Leicester</p>
          <h2 className="mt-4 text-4xl leading-[1.08] sm:text-5xl">What our students say</h2>
          <div className="mt-10">
            <RatingSummary />
          </div>
        </Reveal>

        <Reveal delay={0.1} className="flex flex-col justify-between">
          <div className="relative min-h-[15rem] sm:min-h-[13rem]" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.figure
                key={r.author}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <blockquote className="font-serif text-[1.75rem] italic leading-snug text-ink-900 sm:text-[2.1rem]">
                  “{r.text}”
                </blockquote>
                <figcaption className="mt-6">
                  <span className="block font-semibold text-ink-900">{r.author}</span>
                  {r.context && <span className="text-ink-700/70">{r.context}</span>}
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
          <div className="mt-10 flex items-center gap-3">
            <button type="button" onClick={() => go(-1)} aria-label="Previous review" className="flex h-12 w-12 items-center justify-center rounded-full border border-forest-900/15 text-ink-700 transition-colors hover:border-amber-400 hover:bg-amber-300 hover:text-ink-950">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next review" className="flex h-12 w-12 items-center justify-center rounded-full border border-forest-900/15 text-ink-700 transition-colors hover:border-amber-400 hover:bg-amber-300 hover:text-ink-950">
              <ArrowRight className="h-5 w-5" />
            </button>
            <p className="ml-3 text-sm text-ink-700/70">
              {i + 1} of {FEATURED.length}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="break-inside-avoid rounded-3xl border border-forest-900/[0.07] bg-white/85 p-7 shadow-soft">
      <Stars className="h-4 w-4" label={`${review.rating} out of 5 stars`} n={review.rating} />
      <blockquote className="mt-4 text-[1.05rem] leading-relaxed text-ink-900">“{review.text}”</blockquote>
      <figcaption className="mt-5 flex items-center justify-between gap-3 border-t border-forest-900/[0.07] pt-4">
        <span>
          <span className="block font-semibold text-ink-900">{review.author}</span>
          {review.context && <span className="text-sm text-ink-700/70">{review.context}</span>}
        </span>
        <GoogleG className="h-5 w-5 shrink-0" />
      </figcaption>
    </figure>
  )
}

/** Reviews page: every verified review in a masonry layout. */
export function ReviewWall() {
  return (
    <div className="columns-1 gap-5 space-y-5 md:columns-2 lg:columns-3">
      {REVIEWS.map((r) => (
        <ReviewCard key={r.author} review={r} />
      ))}
    </div>
  )
}
