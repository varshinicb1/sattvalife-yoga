import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Reveal, SectionHeading, TiltCard, Stars, GoogleG } from '@/components/motion-primitives'
import { useGoogleReviews } from '@/hooks/useGoogleReviews'
import { GOOGLE_REVIEWS_CONFIG } from '@/config'
import type { Review } from '@/data/content'

const AVATAR_COLORS = ['#F08080', '#557c46', '#D9B36C', '#7A9B6A', '#e86363', '#c69c4d']

function Avatar({ name, i }: { name: string; i: number }) {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
  return (
    <div
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white shadow-md"
      style={{ background: AVATAR_COLORS[i % AVATAR_COLORS.length] }}
    >
      {initials}
    </div>
  )
}

function ReviewCard({ review, i }: { review: Review; i: number }) {
  return (
    <TiltCard className="h-full">
      <div className="flex h-full flex-col rounded-3xl glass p-6 shadow-lg shadow-forest-900/5">
        <div className="flex items-center gap-3">
          <Avatar name={review.author} i={i} />
          <div className="min-w-0">
            <p className="truncate font-semibold text-forest-900">{review.author}</p>
            <p className="text-xs text-forest-700/60">{review.time} · posted on Google</p>
          </div>
          <GoogleG className="ml-auto h-5 w-5 shrink-0" />
        </div>
        <div className="mt-3">
          <Stars n={review.rating} />
        </div>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-forest-800/85">{review.text}</p>
      </div>
    </TiltCard>
  )
}

export default function Reviews() {
  const { reviews, rating, total, live, lastSync } = useGoogleReviews()
  const [page, setPage] = useState(0)
  const perPage = 3
  const pages = Math.max(1, Math.ceil(reviews.length / perPage))

  // auto-rotate the carousel for a "live feed" feel
  useEffect(() => {
    const id = setInterval(() => setPage((p) => (p + 1) % pages), 5000)
    return () => clearInterval(id)
  }, [pages])

  const visible = reviews.slice(page * perPage, page * perPage + perPage)

  return (
    <section id="reviews" className="relative py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading eyebrow="Testimonials" title="What Our Students Say" />

        {/* Google summary banner */}
        <Reveal>
          <div className="mx-auto max-w-2xl rounded-3xl glass p-7 shadow-xl shadow-forest-900/10 text-center">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
              <div>
                <p className="font-serif text-6xl text-forest-900">{rating.toFixed(1)}</p>
                <div className="mt-1 flex justify-center">
                  <Stars n={5} className="h-5 w-5" />
                </div>
              </div>
              <div className="text-left">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-500">Excellent</p>
                <p className="mt-1 text-sm text-forest-800/80">
                  Based on <span className="font-bold text-forest-900">{total} reviews</span>
                </p>
                <div className="mt-1.5 flex items-center gap-2">
                  <GoogleG />
                  <span className="text-sm font-medium text-forest-800">Google Reviews</span>
                  <span
                    className={`ml-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider ${
                      live ? 'bg-forest-100 text-forest-700' : 'bg-amber-300/40 text-amber-500'
                    }`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${live ? 'bg-forest-500' : 'bg-amber-500'} animate-pulse`} />
                    {live ? 'Live' : 'Auto-updating'}
                  </span>
                </div>
              </div>
            </div>
            <p className="mt-4 text-xs text-forest-700/50">
              Synced {lastSync.toLocaleTimeString()} · refreshes every{' '}
              {GOOGLE_REVIEWS_CONFIG.refreshInterval / 1000}s
            </p>
          </div>
        </Reveal>

        {/* rotating review cards */}
        <div className="mt-12 grid md:grid-cols-3 gap-6 min-h-[240px]">
          <AnimatePresence mode="popLayout">
            {visible.map((r, i) => (
              <motion.div
                key={`${r.author}-${i}-${page}`}
                initial={{ opacity: 0, y: 40, rotateX: -14 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, y: -30, rotateX: 10 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <ReviewCard review={r} i={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* dots + link */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              aria-label={`Reviews page ${i + 1}`}
              className={`h-2.5 rounded-full transition-all ${
                i === page ? 'w-8 bg-lotus-400' : 'w-2.5 bg-forest-600/25 hover:bg-forest-600/50'
              }`}
            />
          ))}
        </div>
        <Reveal className="mt-8 text-center">
          <a
            href={GOOGLE_REVIEWS_CONFIG.googleMapsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full gold-click border-2 border-forest-600/30 px-6 py-2.5 text-sm font-semibold text-forest-700 hover:border-forest-600 hover:bg-forest-600 hover:text-cream-50 transition-all"
          >
            <GoogleG className="h-4 w-4" />
            Read all {total} reviews on Google
          </a>
        </Reveal>
      </div>
    </section>
  )
}
