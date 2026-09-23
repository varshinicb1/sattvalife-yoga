import { useRef } from 'react'
import { Link } from 'react-router'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useCmsContent } from '@/hooks/useCmsContent'

const EASE = [0.22, 1, 0.36, 1] as const

/** Splits the CMS tagline ("Stop Worrying, Start Living") so the second clause can be set in italic. */
function splitTagline(tagline: string): [string, string] {
  const i = tagline.indexOf(',')
  if (i === -1) return [tagline, '']
  return [tagline.slice(0, i + 1), tagline.slice(i + 1).trim()]
}

const sentenceCase = (s: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : s)

export default function Hero() {
  const { brand } = useCmsContent()
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '8%'])
  const [lead, rest] = splitTagline(brand.tagline)

  const enter = (delay: number) =>
    reduce
      ? {}
      : { initial: { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay, ease: EASE } }

  return (
    <section ref={ref} className="relative overflow-hidden pt-[calc(72px+env(safe-area-inset-top))]">
      {/* Soft sage & brass light */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(60rem_40rem_at_85%_10%,rgb(203_208_173/0.45),transparent_60%),radial-gradient(40rem_30rem_at_0%_100%,rgb(237_224_196/0.6),transparent_60%)]" />

      <div className="container-page relative grid items-center gap-12 pb-16 pt-10 sm:pt-14 lg:min-h-[min(calc(100dvh-72px),860px)] lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:py-16">
        <div className="max-w-2xl">
          <motion.p {...enter(0.05)} className="eyebrow">
            Vinyasa yoga in Oadby &amp; Thurnby, Leicester
          </motion.p>
          <motion.h1
            {...enter(0.15)}
            className="mt-5 pb-2 text-[3.1rem] font-medium leading-[1.04] tracking-[-0.02em] sm:text-7xl lg:text-[5.25rem] lg:leading-[1.02]"
          >
            {sentenceCase(lead)}
            {rest && (
              <>
                <br />
                <em className="font-normal text-forest-600">{rest.toLowerCase()}</em>
              </>
            )}
          </motion.h1>
          <motion.p {...enter(0.28)} className="lead mt-6 max-w-xl">
            Small-group classes with personal attention for every body, whatever your age or ability.
          </motion.p>
          <motion.div {...enter(0.4)} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link to="/courses" className="btn-primary btn-lg">
              Book a class
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/timetable" className="btn-outline btn-lg">
              See the timetable
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.1, ease: EASE }}
          className="relative mx-auto w-full max-w-[440px] lg:max-w-[460px]"
        >
          <img
            src="/images/opt/lotus-mark-900.webp"
            alt=""
            aria-hidden="true"
            width={900}
            height={484}
            className="pointer-events-none absolute -left-[18%] top-[6%] -z-0 w-[136%] max-w-none opacity-[0.12]"
          />
          <motion.div style={{ y: imageY }} className="relative">
            <img
              src="/images/opt/studio-triangle-portrait-900.webp"
              srcSet="/images/opt/studio-triangle-portrait-560.webp 560w, /images/opt/studio-triangle-portrait-900.webp 614w"
              sizes="(min-width: 1024px) 460px, 80vw"
              width={614}
              height={768}
              alt="A student holding triangle pose in a calm, sunlit studio"
              fetchPriority="high"
              className="arch aspect-[4/5] w-full object-cover shadow-lift"
            />
            <img
              src="/images/opt/garden-3-500.webp"
              alt="Seated meditation during an outdoor Sattvalife class"
              width={500}
              height={500}
              loading="lazy"
              className="absolute -bottom-8 -left-6 h-32 w-32 rounded-full border-[6px] border-cream-50 object-cover shadow-lift sm:-left-10 sm:h-40 sm:w-40"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
