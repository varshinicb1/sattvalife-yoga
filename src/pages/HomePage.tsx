import { Link } from 'react-router'
import Hero from '@/sections/Hero'
import ProofBand from '@/sections/ProofBand'
import { Welcome } from '@/sections/About'
import FocusAreas from '@/sections/FocusAreas'
import { PlanCards, PaymentNote } from '@/sections/Courses'
import { WeeklyClasses } from '@/sections/Timetable'
import { ReviewsShowcase } from '@/sections/Reviews'
import { CorporateTeaser } from '@/sections/Corporate'
import { ContactSection } from '@/sections/Contact'
import { SectionHeading } from '@/components/motion-primitives'

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProofBand />
      <Welcome />
      <FocusAreas />

      <section className="py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading
            align="center"
            title="Pay as you go, or make it a habit"
            intro="Drop in whenever it suits you, or practise every week with Monthly Flow and cancel any time."
          />
          <div className="mt-14">
            <PlanCards />
          </div>
          <PaymentNote className="mt-10" />
        </div>
      </section>

      <section className="border-t border-forest-900/[0.07] bg-cream-100/60 py-20 sm:py-28">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading title="Weekly classes" intro="Two friendly community halls, one small group, the same warm welcome." />
            <Link to="/classes" className="link-underline shrink-0 font-semibold text-forest-800">
              Full timetable
            </Link>
          </div>
          <div className="mt-12">
            <WeeklyClasses />
          </div>
        </div>
      </section>

      <ReviewsShowcase />
      <CorporateTeaser />
      <ContactSection />
    </>
  )
}
