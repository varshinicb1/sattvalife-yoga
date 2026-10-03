import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import { CalendarPlus, Check, MapPin, Plus, Users } from 'lucide-react'
import PageHero from '@/components/PageHero'
import { Reveal, SectionHeading } from '@/components/motion-primitives'
import { PlanCards, PaymentNote } from '@/sections/Courses'
import { CLASSES, FAQS, TIMETABLE, type ClassEntry } from '@/data/content'
import Photo from '@/components/Photo'
import { PHOTOS } from '@/data/photos'
import { openBooking } from '@/lib/bookingStore'
import { downloadIcs, formatRange, formatSessionDate, nextSessions, relativeDay } from '@/lib/schedule'

/** Venue areas double as the filter. Online is deliberately absent: there are no online classes yet. */
const FILTERS = [{ id: 'all', label: 'All classes' }, ...TIMETABLE.venues.map((v) => ({ id: v.area, label: v.area }))]

function ClassRow({ entry, index }: { entry: ClassEntry; index: number }) {
  const venue = TIMETABLE.venues.find((v) => v.id === entry.venueId)!
  const sessions = useMemo(() => nextSessions(venue, 3), [venue])
  const slot = entry.id === 'tue' ? 'classTue' : 'classThu'
  /* No empty placeholder panel: the photo column only exists once a real photo does. */
  const hasPhoto = Boolean(PHOTOS[slot].src)

  return (
    <Reveal delay={index * 0.06}>
      <article
        className={`grid gap-7 overflow-hidden rounded-3xl border border-forest-900/[0.08] bg-white/85 shadow-soft lg:gap-0 ${
          hasPhoto ? 'lg:grid-cols-[0.8fr_1.4fr_1fr]' : 'lg:grid-cols-[1.3fr_1fr]'
        }`}
      >
        {hasPhoto && <Photo slot={slot} className="w-full lg:h-full" />}
        <div className="flex flex-col px-6 pt-6 sm:px-8 lg:py-8">
          <h2 className="text-3xl sm:text-[2.1rem]">{entry.name}</h2>
          <p className="mt-3 max-w-[56ch] text-base leading-relaxed text-ink-700/85">{entry.blurb}</p>
          <p className="mt-4 inline-flex items-center gap-2 self-start rounded-full bg-cream-100 px-3.5 py-1.5 text-sm font-medium text-ink-700">
            <Users className="h-4 w-4 text-amber-600" strokeWidth={1.8} />
            {entry.audience}
          </p>
          <p className="mt-6 rounded-2xl bg-cream-100/80 px-4 py-3 text-sm text-ink-700 lg:mt-auto">
            Next class <span className="font-semibold text-ink-900">{relativeDay(sessions[0])}</span>
            <span className="block text-ink-700/70">
              Then {sessions.slice(1).map((d) => formatSessionDate(d, { day: 'numeric', month: 'short' })).join(', ')}
            </span>
          </p>
        </div>

        <div className="grid gap-5 border-t border-forest-900/[0.07] px-6 pb-6 pt-6 sm:px-8 lg:border-l lg:border-t-0 lg:px-8 lg:py-8">
          <div className="grid gap-3 text-base">
            <p className="flex items-baseline justify-between gap-4">
              <span className="text-ink-700/70">When</span>
              <span className="text-right font-semibold text-ink-900">
                {venue.day}s, {formatRange(venue)}
              </span>
            </p>
            <p className="flex items-baseline justify-between gap-4">
              <span className="text-ink-700/70">Where</span>
              <a href={venue.mapsUrl} target="_blank" rel="noreferrer" className="group text-right font-semibold text-ink-900">
                <span className="group-hover:underline">{venue.hall}</span>
                <span className="block text-sm font-normal text-ink-700/75">
                  <MapPin className="mr-1 inline h-3.5 w-3.5 text-amber-600" strokeWidth={1.8} />
                  {venue.area}, {venue.postcode}
                </span>
              </a>
            </p>
            <p className="flex items-baseline justify-between gap-4">
              <span className="text-ink-700/70">Price</span>
              <span className="text-right">
                <span className="font-serif text-3xl font-semibold text-ink-900">£{entry.price}</span>
                <span className="block text-sm text-ink-700/75">{entry.priceNote}</span>
              </span>
            </p>
          </div>

          <div className="grid gap-2.5 sm:grid-cols-2">
            <button type="button" onClick={() => openBooking({ courseId: 'dropIn', venueId: venue.id })} className="btn-primary !tracking-[0.08em]">
              BOOK NOW
            </button>
            <button type="button" onClick={() => downloadIcs(venue, sessions[0])} className="btn-outline">
              <CalendarPlus className="h-4 w-4" strokeWidth={1.8} />
              Add to calendar
            </button>
          </div>
        </div>
      </article>
    </Reveal>
  )
}

export default function ClassesPage() {
  const [filter, setFilter] = useState('all')
  const visible = CLASSES.filter((c) => {
    if (filter === 'all') return true
    return TIMETABLE.venues.find((v) => v.id === c.venueId)?.area === filter
  })

  return (
    <>
      <PageHero
        eyebrow="Classes & Timetable"
        title={
          <>
            Yoga that fits <em className="font-normal text-forest-600">your</em> week
          </>
        }
        intro="Two small evening classes near you, with personal attention for every body. Pick a class, see the next date and book in under a minute."
      />

      <section className="section-pb pt-2">
        <div className="container-page">
          {/* Filter */}
          <div className="flex flex-wrap items-center gap-2.5 pb-8">
            <span className="mr-1 text-sm font-semibold text-ink-700/70">Where:</span>
            {FILTERS.map((f) => {
              const active = filter === f.id
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilter(f.id)}
                  aria-pressed={active}
                  className="chip"
                >
                  {f.label}
                </button>
              )
            })}
          </div>

          <p className="sr-only" aria-live="polite">
            {visible.length} {visible.length === 1 ? 'class' : 'classes'} shown
          </p>

          <div className="grid gap-5">
            {visible.map((c, i) => (
              <ClassRow key={c.id} entry={c} index={i} />
            ))}
          </div>

          <Reveal className="mt-10">
            <p className="rounded-3xl border border-forest-900/[0.08] bg-cream-100/70 px-6 py-5 text-base text-ink-700">
              New to Sattvalife? Please fill in the{' '}
              <Link to="/registration" className="link-underline font-semibold">
                short registration and health form
              </Link>{' '}
              before your first class. Private and small-group sessions are also available,{' '}
              <Link to="/experiences" className="link-underline font-semibold">
                tell us what you have in mind
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-y border-t border-forest-900/[0.07] bg-cream-100/50">
        <div className="container-page">
          <SectionHeading align="center" title="Ways to pay" intro="Drop in whenever it suits you, or practise every week with Monthly Flow and cancel any time." />
          <div className="mt-12">
            <PlanCards />
          </div>
          <PaymentNote className="mt-10" />
        </div>
      </section>

      <section className="section-y" id="faq">
        <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <SectionHeading title="Good to know" intro="Anything else? Message us on WhatsApp and we will get back to you." />
            <Reveal className="mt-8">
              <Link to="/contact" className="btn-outline">
                Contact us
              </Link>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="divide-y divide-forest-900/[0.08] border-y border-forest-900/[0.08]">
              {FAQS.map((f) => (
                <details key={f.q} className="group py-5 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-serif text-2xl text-ink-900">
                    {f.q}
                    <Plus className="h-5 w-5 shrink-0 text-amber-600 transition-transform duration-300 group-open:rotate-45" />
                  </summary>
                  <p className="mt-3 max-w-[60ch] text-base leading-relaxed text-ink-700/85">{f.a}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="band-y border-t border-forest-900/[0.07]">
        <div className="container-page flex flex-wrap items-center justify-center gap-x-10 gap-y-5 text-center sm:text-left">
          <p className="max-w-md text-lg text-ink-700/85">
            <Check className="mr-2 inline h-5 w-5 text-amber-600" strokeWidth={2.2} />
            Mats and props provided. Just bring water and clothes you can move in.
          </p>
          <button type="button" onClick={() => openBooking({ courseId: 'dropIn' })} className="btn-primary btn-lg !tracking-[0.08em]">
            BOOK NOW
          </button>
        </div>
      </section>
    </>
  )
}
