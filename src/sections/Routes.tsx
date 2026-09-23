import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/motion-primitives'
import Photo from '@/components/Photo'
import type { PhotoKey } from '@/data/photos'

/** The three things people come here for. One click from the homepage to each. */
const ROUTES: { to: string; title: string; text: string; photo: PhotoKey }[] = [
  {
    to: '/classes',
    title: 'Classes & timetable',
    text: 'Small evening classes in Oadby and Thurnby. See the week and book from £10.',
    photo: 'classTue',
  },
  {
    to: '/experiences',
    title: 'Celebrations & experiences',
    text: 'Baby showers, birthdays and hen parties, hosted as a wellness experience.',
    photo: 'celebration',
  },
  {
    to: '/corporate',
    title: 'Workplace wellbeing',
    text: 'Desk yoga, wellbeing mornings and regular on-site sessions for teams.',
    photo: 'heroInset',
  },
]

export default function Routes() {
  return (
    <section className="py-16 sm:py-20" aria-label="Where to start">
      <div className="container-page grid gap-5 md:grid-cols-3">
        {ROUTES.map((r, i) => (
          <Reveal key={r.to} delay={i * 0.07}>
            <Link
              to={r.to}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-forest-900/[0.08] bg-white/85 shadow-soft transition-colors hover:border-forest-600/40"
            >
              <div className="overflow-hidden">
                <Photo slot={r.photo} className="w-full transition-transform duration-700 group-hover:scale-[1.04]" />
              </div>
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <h2 className="text-2xl sm:text-[1.8rem]">{r.title}</h2>
                <p className="mt-2.5 flex-1 text-base leading-relaxed text-forest-800/80">{r.text}</p>
                <span className="mt-5 inline-flex items-center gap-2 font-semibold text-forest-800">
                  <span className="link-underline">Take a look</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
