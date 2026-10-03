import { Link } from 'react-router'
import { ArrowRight, Building2, CalendarDays, Sparkles, type LucideIcon } from 'lucide-react'
import { Reveal } from '@/components/motion-primitives'
import { COURSES, TIMETABLE } from '@/data/content'
import { formatTime } from '@/lib/schedule'

/**
 * The three things people come here for. One click from the homepage to each.
 *
 * Deliberately text-led: an image band here would have to be the same height in
 * all three cards, and two of the three photographs do not exist yet (see
 * src/data/photos.ts). Icon, title, blurb and facts give every card the same
 * skeleton, so the row stays level whatever the copy length.
 */
interface Route {
  to: string
  title: string
  text: string
  meta: string[]
  Icon: LucideIcon
}

function useRoutes(): Route[] {
  const [tue, thu] = TIMETABLE.venues
  const from = Math.min(...COURSES.filter((c) => c.id !== 'corporate').map((c) => c.price))

  return [
    {
      to: '/classes',
      title: 'Classes & timetable',
      text: 'Small evening classes in two friendly community halls, with personal attention for every age and ability.',
      meta: [`${tue.day}s ${formatTime(tue.start)}, ${tue.area}`, `${thu.day}s ${formatTime(thu.start)}, ${thu.area}`, `From £${from}`],
      Icon: CalendarDays,
    },
    {
      to: '/experiences',
      title: 'Celebrations & experiences',
      text: 'Baby showers, birthdays and hen parties, hosted as a wellness experience in your space or a hall we book.',
      meta: ['Bollywood yoga & dance', 'Soundbath & breathwork', 'Mocktails & nibbles'],
      Icon: Sparkles,
    },
    {
      to: '/corporate',
      title: 'Workplace wellbeing',
      text: 'Desk yoga, wellbeing mornings and regular on-site sessions for teams across Leicestershire.',
      meta: ['On-site or hybrid', 'One-off or regular', 'Tailored to your team'],
      Icon: Building2,
    },
  ]
}

export default function Routes() {
  const routes = useRoutes()

  return (
    <section className="py-16 sm:py-20" aria-label="Where to start">
      <div className="container-page grid gap-5 md:grid-cols-3 md:gap-6">
        {routes.map((r, i) => (
          <Reveal key={r.to} delay={i * 0.07} className="h-full">
            <Link
              to={r.to}
              className="group flex h-full flex-col rounded-3xl border border-ink-900/[0.08] bg-white/85 p-6 shadow-soft transition duration-300 hover:-translate-y-0.5 hover:border-amber-400/50 hover:shadow-lift sm:p-7"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-50 ring-1 ring-amber-400/25 transition-colors group-hover:bg-amber-100">
                <r.Icon className="h-5 w-5 text-amber-600" strokeWidth={1.7} aria-hidden="true" />
              </span>
              <h2 className="mt-5 text-[1.6rem] leading-[1.15] sm:text-[1.75rem]">{r.title}</h2>
              <p className="mt-3 text-base leading-relaxed text-ink-700/85">{r.text}</p>
              {/* flex-1 parks the facts under the blurb and keeps "Take a look" on the bottom edge of every card */}
              <ul className="mt-5 flex flex-1 flex-wrap content-start gap-2">
                {r.meta.map((m) => (
                  <li key={m} className="rounded-full bg-cream-100 px-3 py-1 text-xs font-medium text-ink-700">
                    {m}
                  </li>
                ))}
              </ul>
              <span className="mt-6 inline-flex items-center gap-2 font-semibold text-ink-800">
                <span className="link-underline">Take a look</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
