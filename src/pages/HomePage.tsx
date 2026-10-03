import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import Hero from '@/sections/Hero'
import ProofBand from '@/sections/ProofBand'
import Routes from '@/sections/Routes'
import { Welcome } from '@/sections/About'
import FocusAreas from '@/sections/FocusAreas'
import { WeeklyClasses } from '@/sections/Timetable'
import { ReviewsShowcase } from '@/sections/Reviews'
import { ContactSection } from '@/sections/Contact'
import { Reveal, SectionHeading } from '@/components/motion-primitives'

/**
 * Kept deliberately short: hero, the three routes, who teaches, what a class
 * works on, this week's classes, proof, then one place to ask.
 * Book, Register and Enquire are each one click from here.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ProofBand />
      <Routes />
      <Welcome />
      <FocusAreas />

      <section className="border-t border-forest-900/[0.07] bg-cream-100/60 py-16 sm:py-20">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading title="This week" intro="Two friendly community halls, one small group, the same warm welcome." />
            <Reveal>
              <Link to="/classes" className="link-underline shrink-0 font-semibold text-ink-700">
                Classes &amp; timetable
              </Link>
            </Reveal>
          </div>
          <div className="mt-10">
            <WeeklyClasses />
          </div>
          <Reveal className="mt-8">
            <p className="text-base text-ink-700/80">
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

      <ReviewsShowcase />
      <ContactSection />
    </>
  )
}
