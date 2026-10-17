import { Link } from 'react-router'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { RATING, TIMETABLE } from '@/data/content'
import { useCmsContent } from '@/hooks/useCmsContent'
import { openBooking } from '@/lib/bookingStore'
import { formatTime } from '@/lib/schedule'
import { GoogleG, Stars } from '@/components/motion-primitives'

const EASE = [0.22, 1, 0.36, 1] as const

/** Splits the CMS tagline ("Stop Worrying, Start Living") so the second clause can be set in italic. */
function splitTagline(tagline: string): [string, string] {
  const i = tagline.indexOf(',')
  if (i === -1) return [tagline, '']
  return [tagline.slice(0, i + 1), tagline.slice(i + 1).trim()]
}

const sentenceCase = (s: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : s)

/**
 * Built to the hero on page 3 of the client's brief: a soft sage panel, the
 * benefit-led tagline, and the two actions it names — Explore classes and Book
 * now. There is deliberately no photograph. The brief rules out stock and
 * AI-looking imagery, and the only genuine photographs we hold are either
 * headshots or phone snaps too soft for a panel this size, so the gold lotus
 * carries the panel until a real shoot lands. Drop a <Photo> into the motif
 * column when it does; nothing else needs to move.
 */
export default function Hero() {
  const { brand } = useCmsContent()
  const reduce = useReducedMotion()
  const [lead, rest] = splitTagline(brand.tagline)
  const [tue] = TIMETABLE.venues

  const enter = (delay: number) =>
    reduce
      ? {}
      : { initial: { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay, ease: EASE } }

  return (
    <section className="relative pt-[calc(84px+env(safe-area-inset-top))]">
      <div className="container-page pb-10 pt-5 sm:pb-12 sm:pt-7">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-forest-100/80 via-cream-100/70 to-cream-200/60 px-6 py-12 sm:rounded-[2.5rem] sm:px-10 sm:py-16 lg:px-16 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
            <div>
              <motion.p {...enter(0.05)} className="eyebrow">
                Vinyasa yoga in Oadby, Leicester
              </motion.p>

              <motion.h1
                {...enter(0.15)}
                className="mt-4 pb-1 text-[2.9rem] font-medium leading-[1.04] tracking-[-0.02em] sm:text-6xl lg:text-[4.75rem] lg:leading-[1.03]"
              >
                {sentenceCase(lead)}
                {rest && (
                  <>
                    <br />
                    <em className="font-normal text-forest-600">{rest.toLowerCase()}</em>
                  </>
                )}
              </motion.h1>

              <motion.p {...enter(0.26)} className="lead mt-5 max-w-md">
                You don’t have to fit yoga. We help yoga fit into your life.
              </motion.p>

              <motion.div {...enter(0.36)} className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/classes" className="btn-primary btn-lg">
                  Explore classes
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <button
                  type="button"
                  onClick={() => openBooking({ courseId: 'dropIn', venueId: tue.id })}
                  className="btn-outline btn-lg"
                >
                  Book now
                </button>
              </motion.div>

              {/* Proof and the new-student route, both one line, both one click */}
              <motion.div {...enter(0.46)} className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                <a
                  href={RATING.googleUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2.5 text-sm font-medium text-ink-700"
                >
                  <GoogleG className="h-5 w-5" />
                  <Stars className="h-3.5 w-3.5" label={`Rated ${RATING.value} out of 5 on Google`} />
                  <span className="group-hover:text-amber-700">
                    {RATING.value.toFixed(1)} from {RATING.total} reviews
                  </span>
                </a>
                <p className="text-sm text-ink-700">
                  New here?{' '}
                  <Link to="/registration" className="link-underline font-semibold text-ink-800">
                    Register before your first class
                  </Link>
                </p>
              </motion.div>
            </div>

            {/* The motif from the brief's wireframe, in Sattvalife gold */}
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.15, ease: EASE }}
              aria-hidden="true"
              className="relative mx-auto hidden aspect-square w-full max-w-[22rem] lg:block"
            >
              <div className="absolute inset-0 rounded-full bg-forest-200/45" />
              <div className="absolute inset-[12%] rounded-full border border-amber-400/25" />
              <img
                src="/images/opt/lotus-mark-900.webp"
                alt=""
                width={900}
                height={484}
                className={`absolute left-1/2 top-1/2 w-[62%] -translate-x-1/2 -translate-y-1/2 ${reduce ? '' : 'animate-float'}`}
              />
            </motion.div>
          </div>

          {/* The one fact a first-time visitor needs, inside the panel */}
          <motion.p {...enter(0.56)} className="mt-10 text-sm font-medium text-ink-700 lg:mt-12">
            <span className="text-ink-900">
              {tue.day}s {formatTime(tue.start)}
            </span>{' '}
            · {tue.hall}, {tue.area} · Mats and props provided
          </motion.p>
        </div>
      </div>
    </section>
  )
}
