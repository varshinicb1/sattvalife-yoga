import { Link } from 'react-router'
import PageHero from '@/components/PageHero'
import { Reveal } from '@/components/motion-primitives'
import { TeacherProfiles } from '@/sections/Instructors'
import { JOURNEY } from '@/data/content'

export default function TeachersPage() {
  return (
    <>
      <PageHero
        eyebrow="Our teachers"
        title="Who we are & what we stand for"
        intro="Sattvalife was founded to share yoga as it changed our own lives: gently, personally, and with room for every body."
      />

      <section className="pb-24 pt-8 sm:pb-32">
        <div className="container-page">
          <TeacherProfiles />
        </div>
      </section>

      <section className="bg-forest-800 py-20 text-center sm:py-28">
        <div className="container-page">
          <Reveal>
            <blockquote className="mx-auto max-w-3xl font-serif text-3xl italic leading-snug text-cream-50 sm:text-4xl">“{JOURNEY.quote}”</blockquote>
            <Link to="/courses" className="btn-brass btn-lg mt-10">
              Book a class
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
