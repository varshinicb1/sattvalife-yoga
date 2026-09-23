import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/motion-primitives'
import Photo from '@/components/Photo'
import { INSTRUCTORS } from '@/data/content'
import { useCmsContent } from '@/hooks/useCmsContent'

const PILLAR_ICONS = ['/images/icon-mindfulness.png', '/images/icon-discover.png', '/images/icon-meditation.png']
const TEACHER_PHOTOS = ['teacherAmisha', 'teacherNish'] as const

/**
 * Homepage: short. The full welcome text and the three pillars live on the
 * Teachers and Classes pages, so the homepage stays scannable.
 */
export function Welcome() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
        <Reveal className="lg:col-span-6">
          <h2 className="text-4xl leading-[1.08] sm:text-5xl">Taught by two people, not a timetable</h2>
          <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-forest-800/85">
            Amisha and Nish teach every class themselves. Groups stay small, so each pose is adapted to the body in front of them, whatever your age or experience.
          </p>
          <Link to="/teachers" className="group mt-8 inline-flex items-center gap-2 font-semibold text-forest-800 hover:text-forest-900">
            <span className="link-underline">Meet your teachers</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>

        <div className="grid grid-cols-2 gap-5 sm:gap-6 lg:col-span-6">
          {INSTRUCTORS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1} className={i === 1 ? 'mt-10 sm:mt-14' : ''}>
              <Link to="/teachers" className="group block">
                <div className="arch overflow-hidden bg-cream-200 shadow-soft">
                  <Photo slot={TEACHER_PHOTOS[i]} className="w-full transition-transform duration-700 group-hover:scale-[1.03]" />
                </div>
                <p className="mt-4 font-serif text-xl text-forest-900 sm:text-2xl">{t.name}</p>
                <p className="text-sm text-forest-800/70">{t.role}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/** Teachers page: the full welcome copy and the three pillars. */
export function WelcomeFull() {
  const { welcome, aboutVinyasa } = useCmsContent()

  return (
    <section className="border-t border-forest-900/[0.07] bg-cream-100/50 py-20 sm:py-24">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-7">
          <h2 className="text-4xl leading-[1.08] sm:text-5xl">{welcome.title}</h2>
          <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-forest-800/85">{welcome.body}</p>
        </Reveal>
        <ul className="grid gap-8 sm:grid-cols-3 lg:col-span-5 lg:grid-cols-1 lg:gap-7">
          {aboutVinyasa.pillars.map((p, i) => (
            <li key={p.title}>
              <Reveal delay={i * 0.08}>
                <img src={PILLAR_ICONS[i % PILLAR_ICONS.length]} alt="" aria-hidden="true" width={48} height={48} loading="lazy" className="h-11 w-auto" />
                <h3 className="mt-3 text-2xl">{p.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-forest-800/75">{p.text}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
