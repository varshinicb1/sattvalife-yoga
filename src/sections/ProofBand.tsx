import { Link } from 'react-router'
import { GoogleG, Stars } from '@/components/motion-primitives'
import { RATING, TIMETABLE, COURSES } from '@/data/content'
import { formatTime } from '@/lib/schedule'

/** The essentials at a glance, directly under the hero. */
export default function ProofBand() {
  const [tue, thu] = TIMETABLE.venues
  const from = Math.min(...COURSES.filter((c) => c.id !== 'corporate').map((c) => c.price))

  const items = [
    {
      key: 'rating',
      content: (
        <a href={RATING.googleUrl} target="_blank" rel="noreferrer" className="group flex items-center gap-3">
          <GoogleG className="h-6 w-6 shrink-0" />
          <span>
            <span className="flex items-center gap-2">
              <span className="font-serif text-2xl font-semibold leading-none text-ink-900">{RATING.value.toFixed(1)}</span>
              <Stars className="h-3.5 w-3.5" label={`Rated ${RATING.value} out of 5 on Google`} />
            </span>
            <span className="mt-1 block text-sm text-ink-700/75 group-hover:text-ink-900">{RATING.total} Google reviews</span>
          </span>
        </a>
      ),
    },
    {
      key: 'tue',
      content: (
        <Link to="/classes" className="block hover:text-ink-900">
          <span className="block font-semibold text-ink-900">{tue.day}s, {formatTime(tue.start)}</span>
          <span className="mt-1 block text-sm text-ink-700/75">{tue.hall}, {tue.area}</span>
        </Link>
      ),
    },
    {
      key: 'thu',
      content: (
        <Link to="/classes" className="block hover:text-ink-900">
          <span className="block font-semibold text-ink-900">{thu.day}s, {formatTime(thu.start)}</span>
          <span className="mt-1 block text-sm text-ink-700/75">{thu.hall}</span>
        </Link>
      ),
    },
    {
      key: 'price',
      content: (
        <Link to="/classes" className="block">
          <span className="block font-semibold text-ink-900">Classes from £{from}</span>
          <span className="mt-1 block text-sm text-ink-700/75">Mats and props provided</span>
        </Link>
      ),
    },
  ]

  return (
    <section aria-label="At a glance" className="relative border-y border-forest-900/[0.07] bg-white/60">
      <ul className="container-page grid grid-cols-2 lg:grid-cols-4">
        {items.map((it, i) => (
          <li
            key={it.key}
            className={`py-6 pr-4 sm:py-7 lg:px-8 lg:first:pl-0 ${i % 2 === 1 ? 'pl-4 lg:pl-8' : ''} ${
              i > 0 ? 'lg:border-l lg:border-forest-900/[0.07]' : ''
            } ${i % 2 === 1 ? 'border-l border-forest-900/[0.07]' : ''} ${i > 1 ? 'border-t border-forest-900/[0.07] lg:border-t-0' : ''}`}
          >
            {it.content}
          </li>
        ))}
      </ul>
    </section>
  )
}
