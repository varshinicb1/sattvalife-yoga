import { Link } from 'react-router'
import PageHero from '@/components/PageHero'
import { RatingSummary, ReviewWall } from '@/sections/Reviews'

export default function ReviewsPage() {
  return (
    <>
      <PageHero
        eyebrow="Reviews"
        title="Kind words from our students"
        intro="From first-timers to busy office teams, here is what people say after class. Every review below was left on Google."
        aside={<RatingSummary />}
      />
      <section className="pb-20 pt-4 sm:pb-28">
        <div className="container-page">
          <ReviewWall />
          <div className="mt-16 text-center">
            <Link to="/classes" className="btn-primary btn-lg">
              Book a class
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
