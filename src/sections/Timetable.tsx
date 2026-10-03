import { useMemo } from 'react'
import { CalendarPlus, MapPin } from 'lucide-react'
import { Reveal } from '@/components/motion-primitives'
import { TIMETABLE, type Venue } from '@/data/content'
import { openBooking } from '@/lib/bookingStore'
import { downloadIcs, formatRange, formatSessionDate, nextSessions, relativeDay } from '@/lib/schedule'

function VenueRow({ venue, detailed, index }: { venue: Venue; detailed: boolean; index: number }) {
  const sessions = useMemo(() => nextSessions(venue, detailed ? 4 : 1), [venue, detailed])
  const next = sessions[0]

  return (
    <Reveal delay={index * 0.08}>
      <article className="grid gap-6 rounded-3xl border border-forest-900/[0.08] bg-white/85 p-6 shadow-soft sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-10">
        <div className="grid gap-5 sm:grid-cols-[14rem_1fr] sm:gap-8">
          <div>
            <h3 className="text-4xl sm:text-5xl">{venue.day}s</h3>
            <p className="mt-1 text-lg font-semibold text-ink-700">{formatRange(venue)}</p>
          </div>
          <div className="space-y-2">
            <a href={venue.mapsUrl} target="_blank" rel="noreferrer" className="group flex items-start gap-2.5 text-ink-900">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-amber-600" strokeWidth={1.8} />
              <span>
                <span className="block font-semibold group-hover:underline">{venue.hall}</span>
                <span className="block text-ink-700/75">
                  {venue.area}, {venue.postcode} · Directions
                </span>
              </span>
            </a>
            <p className="text-ink-700/80">
              Next class: <span className="font-semibold text-ink-900">{relativeDay(next)}</span>
            </p>
            {detailed && sessions.length > 1 && (
              <p className="text-sm text-ink-700/70">
                Then {sessions.slice(1).map((d) => formatSessionDate(d, { day: 'numeric', month: 'short' })).join(', ')}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2.5 sm:flex-row lg:flex-col">
          <button type="button" onClick={() => openBooking({ courseId: 'dropIn', venueId: venue.id })} className="btn-primary">
            Book this class
          </button>
          <button type="button" onClick={() => downloadIcs(venue, next)} className="btn-outline">
            <CalendarPlus className="h-4 w-4" strokeWidth={1.8} />
            Add to calendar
          </button>
        </div>
      </article>
    </Reveal>
  )
}

/** Weekly classes by venue with next dates. `detailed` shows the following sessions too. */
export function WeeklyClasses({ detailed = false }: { detailed?: boolean }) {
  return (
    <div className="grid gap-5">
      {TIMETABLE.venues.map((v, i) => (
        <VenueRow key={v.id} venue={v} detailed={detailed} index={i} />
      ))}
    </div>
  )
}
