import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import Hero from '@/sections/Hero'
import Practices from '@/sections/Practices'
import { Welcome } from '@/sections/About'
import FocusAreas from '@/sections/FocusAreas'
import { WeeklyClasses } from '@/sections/Timetable'
import { ReviewsShowcase } from '@/sections/Reviews'
import { CorporateTeaser } from '@/sections/Corporate'
import { ContactSection } from '@/sections/Contact'
import UpcomingClasses from '@/components/UpcomingClasses'
import { Reveal, SectionHeading } from '@/components/motion-primitives'

/**
 * The order the client's brief sets out: hero, find your practice, upcoming
 * classes, why Sattvalife, authentic reviews, corporate wellbeing, then one
 * place to get in touch. Book, Register and Enquire are each one click away.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Practices />

      <section className="section-y border-y border-forest-900/[0.07] bg-cream-100/60">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading title="Upcoming classes" intro="One small group, one friendly community hall, the same warm welcome every week." />
            <Reveal>
              <Link to="/classes" className="link-underline shrink-0 font-semibold text-ink-700">
                Classes &amp; timetable
              </Link>
            </Reveal>
          </div>
          <div className="mt-10">
            <WeeklyClasses />
          </div>
          <Reveal className="mt-6">
            <UpcomingClasses />
          </Reveal>
          <Reveal className="mt-6">
            <p className="text-base text-ink-700/85">
              New to Sattvalife?{' '}
              <Link to="/registration" className="link-underline font-semibold">
                Register before your first class
              </Link>{' '}
              so we know how to look after you.
              <ArrowRight className="ml-1 inline h-4 w-4 text-amber-600" />
            </p>
          </Reveal>
        </div>
      </section>

      <Welcome />
      <FocusAreas />
      <ReviewsShowcase />
      <CorporateTeaser />
      <ContactSection />
    </>
  )
}
