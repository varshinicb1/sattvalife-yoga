import { useRef } from 'react'
import { Link } from 'react-router'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Reveal, SectionHeading, TiltCard } from '@/components/motion-primitives'
import { CORPORATE } from '@/data/content'

export default function Corporate() {
  const stripRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: stripRef, offset: ['start end', 'end start'] })
  const x = useTransform(scrollYProgress, [0, 1], ['8%', '-28%'])

  return (
    <section id="corporate" className="relative py-16 md:py-20 lg:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading eyebrow="Corporate Programme" title={CORPORATE.title} />
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="font-serif italic text-2xl text-forest-700">“{CORPORATE.tagline}”</p>
          <p className="mt-5 leading-relaxed text-forest-800/85">{CORPORATE.body}</p>
        </Reveal>
      </div>

      {/* Image gallery — native horizontal scroll on mobile, scroll-driven on desktop */}
      <div className="mt-16">
        {/* Desktop: scroll-driven parallax */}
        <div ref={stripRef} className="hidden md:block overflow-visible" style={{ perspective: 1200 }}>
          <motion.div style={{ x }} className="flex gap-8 pl-[8vw] w-max">
            {CORPORATE.images.map((src, i) => (
              <TiltCard key={src}>
                <div className="relative h-80 w-80 shrink-0 overflow-hidden rounded-3xl border-4 border-white shadow-2xl shadow-forest-900/20">
                  <img src={src} alt={`Office yoga session ${i + 1}`} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-900/50 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 flex items-end p-5">
                    <p className="text-cream-50 font-serif text-lg">Yoga at the workplace</p>
                  </div>
                </div>
              </TiltCard>
            ))}
          </motion.div>
        </div>

        {/* Mobile: native horizontal swipe */}
        <div className="md:hidden overflow-x-auto px-5 pb-4 snap-x snap-mandatory scrollbar-none">
          <div className="flex gap-4 w-max">
            {CORPORATE.images.map((src, i) => (
              <div key={src} className="snap-center shrink-0">
                <div className="relative h-64 w-64 overflow-hidden rounded-2xl border-4 border-white shadow-xl shadow-forest-900/15">
                  <img src={src} alt={`Office yoga session ${i + 1}`} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-900/50 to-transparent flex items-end p-4">
                    <p className="text-cream-50 font-serif">Yoga at the workplace</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-5xl px-5 grid md:grid-cols-2 gap-10 items-start">
        <Reveal>
          <h3 className="font-serif text-3xl text-forest-900">{CORPORATE.offersTitle}</h3>
          <p className="mt-3 text-forest-800/80">{CORPORATE.offersIntro}</p>
          <Link
            to="/courses"
            className="mt-7 inline-block rounded-full gold-click bg-forest-600 px-7 py-3 font-semibold text-cream-50 shadow-lg shadow-forest-600/30 hover:bg-forest-500 transition-colors"
          >
            Bring Sattvalife to your workplace
          </Link>
        </Reveal>
        <Reveal delay={0.15}>
          <ul className="space-y-3">
            {CORPORATE.offers.map((o) => (
              <li key={o} className="flex items-start gap-3 glass rounded-xl px-4 py-3 text-sm text-forest-900 shadow-sm">
                <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full gold-click bg-lotus-400" />
                {o}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
