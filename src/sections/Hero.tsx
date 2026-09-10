import { useRef } from 'react'
import { Link } from 'react-router'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useCmsContent } from '@/hooks/useCmsContent'

export default function Hero() {
  const { brand } = useCmsContent()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section id="home" ref={ref} className="relative min-h-svh lg:min-h-0 lg:py-32 xl:py-40 flex items-center justify-center overflow-hidden bg-gradient-to-b from-cream-50 via-cream-50 to-cream-100">
      {/* Lotus frame — sized to cradle the headline rather than sprawl the whole viewport */}
      <motion.img
        src="/images/lotus-element.png"
        alt=""
        loading="lazy"
        decoding="async"
        style={{ opacity: useTransform(scrollYProgress, [0, 0.5], [0.4, 0.15]) }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] max-w-md sm:max-w-xl md:max-w-2xl h-auto object-contain pointer-events-none"
      />

      <motion.div
        style={{ opacity }}
        className="relative z-10 w-full max-w-2xl mx-auto px-6 text-center"
      >

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-forest-900 text-balance"
        >
          {brand.tagline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 sm:mt-6 text-sm sm:text-lg text-forest-700/80 max-w-xl mx-auto leading-relaxed"
        >
          Vinyasa flow classes for small groups, individuals and workplaces — tailored to your schedule, needs and abilities.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center gap-3 sm:gap-5"
        >
          <Link
            to="/courses"
            className="w-full sm:w-auto text-center rounded-full gold-click bg-forest-600 px-7 sm:px-9 py-3.5 font-semibold text-cream-50 shadow-xl shadow-forest-600/30 hover:bg-forest-500 active:scale-[0.97] transition-all"
          >
            Explore Courses →
          </Link>
          <Link
            to="/timetable"
            className="w-full sm:w-auto text-center rounded-full gold-click border-2 border-forest-600/30 px-7 sm:px-9 py-3.5 font-semibold text-forest-700 hover:border-forest-600 hover:bg-forest-600 hover:text-cream-50 active:scale-[0.97] transition-all"
          >
            Class Timetable
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        style={{ opacity: useTransform(scrollYProgress, [0, 0.3], [0.6, 0]) }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
          className="h-9 w-5 rounded-full gold-click border-2 border-forest-500/30 flex justify-center pt-2"
        >
          <motion.div className="h-2 w-1 rounded-full gold-click bg-amber-400" />
        </motion.div>
      </motion.div>
    </section>
  )
}
