import { useRef, useState } from 'react'
import { Link } from 'react-router'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Reveal, SectionHeading, TiltCard } from '@/components/motion-primitives'
import { TIMETABLE } from '@/data/content'

function nextDate(dayName: string): string {
  const days = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday']
  const idx = days.indexOf(dayName.toLowerCase())
  if (idx === -1) return ''
  const now = new Date()
  const currentDay = now.getDay()
  let diff = idx - currentDay
  if (diff <= 0) diff += 7
  const next = new Date(now)
  next.setDate(now.getDate() + diff)
  return next.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })
}

export default function Timetable() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])
  const [selectedDay, setSelectedDay] = useState<string | null>(null)

  return (
    <section id="timetable" ref={ref} className="relative py-12 md:py-16 lg:py-20 overflow-hidden">
      <motion.div style={{ y: bgY, willChange: 'transform' }} className="absolute inset-0 -z-0">
        <img src="/images/about-hero.jpg" alt="" className="h-[124%] w-full object-cover" />
        <div className="absolute inset-0 bg-forest-950/70" />
      </motion.div>

      <div className="relative mx-auto max-w-5xl px-5">
        <SectionHeading dark eyebrow={TIMETABLE.subtitle} title={TIMETABLE.title} />

        <div className="grid md:grid-cols-2 gap-8">
          {TIMETABLE.venues.map((v, i) => {
            const next = nextDate(v.day)
            const isSelected = selectedDay === v.day
            return (
              <Reveal key={v.day} delay={i * 0.15}>
                <TiltCard>
                  <div className="rounded-3xl border border-cream-50/20 bg-cream-50/10 backdrop-blur-xl p-8 text-cream-50 shadow-2xl">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-serif text-4xl">{v.day}s</h3>
                      <span className="rounded-full gold-click bg-lotus-400/90 px-3 py-1 text-xs font-bold uppercase tracking-wider">Weekly</span>
                    </div>
                    <div className="my-6 h-px bg-cream-50/20" />
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5 text-lotus-300"><path d="M12 21s-7-5.5-7-11a7 7 0 1 1 14 0c0 5.5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>
                        <div>
                          <p className="font-medium">{v.hall}</p>
                          <p className="text-sm text-cream-100/70">{v.postcode}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5 text-lotus-300"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>
                        <p className="font-medium">{v.start} – {v.end}</p>
                      </div>
                      <p className="text-sm text-cream-100/60">
                        Next class: <span className="text-cream-50 font-medium">{next}</span>
                      </p>
                    </div>

                    {/* Book with date picker */}
                    <button
                      onClick={() => setSelectedDay(isSelected ? null : v.day)}
                      className="mt-6 w-full rounded-xl gold-click bg-cream-50 py-3 text-center font-semibold text-forest-700 hover:bg-lotus-400 hover:text-white transition-colors"
                    >
                      {isSelected ? 'Cancel' : 'Book this class'}
                    </button>

                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4 space-y-3"
                      >
                        <p className="text-sm text-cream-100/70">
                          <span className="text-lotus-300">Next session:</span> {next}
                        </p>
                        <Link
                          to="/courses"
                          className="block rounded-xl gold-click bg-lotus-400 px-4 py-3 text-center font-semibold text-white hover:bg-lotus-500 transition-colors"
                        >
                          Pay & Reserve — £10
                        </Link>
                      </motion.div>
                    )}
                  </div>
                </TiltCard>
              </Reveal>
            )
          })}
        </div>

        <Reveal className="mt-10 text-center">
          <p className="text-cream-100/80 text-sm">
            Small groups & individuals · suitable for all ages and physical abilities · mats & props provided
          </p>
        </Reveal>
      </div>
    </section>
  )
}
