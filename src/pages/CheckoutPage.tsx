import { useMemo } from 'react'
import { Link } from 'react-router'
import { ArrowRight, CalendarDays, MapPin, ShieldCheck } from 'lucide-react'
import PageHero from '@/components/PageHero'
import { Reveal, SectionHeading } from '@/components/motion-primitives'
import { PlanCards, PaymentNote } from '@/sections/Courses'
import { TIMETABLE } from '@/data/content'
import { openBooking } from '@/lib/bookingStore'
import { formatRange, nextSessions, relativeDay } from '@/lib/schedule'

/**
 * Book & pay. Every plan, price and time here comes from content.ts, the same
 * source as the Classes page, so the two can never disagree.
 *
 * This page previously sold a "30-Day Global Pass", a 5-class pass, Saturday
 * classes, a replay archive and live-converted USD/EUR/INR prices. None of those
 * exist: Sattvalife runs one Tuesday class in Oadby, and the Stripe links charge
 * in GBP (the 5-class pass even fell through to the £10 drop-in link). It was
 * replaced before the site went live on the main domain.
 */
export default function CheckoutPage() {
  const [tue] = TIMETABLE.venues
  const next = useMemo(() => nextSessions(tue, 1)[0], [tue])

  return (
    <>
      <PageHero
        eyebrow="Book & pay"
        title={
          <>
            Save your <em className="font-normal text-forest-600">mat</em>
          </>
        }
        intro="Pick a drop-in or Monthly Flow, pay securely through Stripe, and we will see you on Tuesday."
      />

      <section className="section-pb pt-2">
        <div className="container-page">
          <Reveal>
            <div className="flex flex-col gap-6 rounded-3xl border border-forest-900/[0.08] bg-white/85 p-6 shadow-soft sm:p-8 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="eyebrow">Next class</p>
                <h2 className="mt-2 text-3xl sm:text-4xl">Restorative &amp; Vinyasa Yoga</h2>
                <div className="mt-4 flex flex-col gap-2 text-base text-ink-700 sm:flex-row sm:gap-6">
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-amber-600" strokeWidth={1.8} />
                    {relativeDay(next)}, {formatRange(tue)}
                  </span>
                  <a href={tue.mapsUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:underline">
                    <MapPin className="h-4 w-4 text-amber-600" strokeWidth={1.8} />
                    {tue.hall}, {tue.area} {tue.postcode}
                  </a>
                </div>
              </div>
              <button
                type="button"
                onClick={() => openBooking({ courseId: 'dropIn', venueId: tue.id })}
                className="btn-primary btn-lg self-start lg:self-auto"
              >
                Book this class
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </Reveal>

          <Reveal className="mt-5">
            <p className="rounded-3xl border border-forest-900/[0.08] bg-cream-100/70 px-6 py-5 text-base text-ink-700">
              First time with us? Please fill in the{' '}
              <Link to="/registration" className="link-underline font-semibold">
                short registration and health form
              </Link>{' '}
              before class, so we know how to look after you.
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
          <p className="mt-4 flex items-center justify-center gap-2 text-sm text-ink-700/70">
            <ShieldCheck className="h-4 w-4 text-amber-600" strokeWidth={1.8} />
            Card details go straight to Stripe. We never see or store them.
          </p>
        </div>
      </section>
    </>
  )
}
