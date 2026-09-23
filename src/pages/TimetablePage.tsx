import PageHero from '@/components/PageHero'
import { Reveal } from '@/components/motion-primitives'
import { WeeklyClasses } from '@/sections/Timetable'
import { ContactSection } from '@/sections/Contact'

const TIPS = [
  { title: 'Arrive 5 minutes early', text: 'Especially for your first class, so we can say hello and ask about any injuries.' },
  { title: 'Bring water', text: 'Wear comfortable clothes you can stretch in. Mats and props are provided.' },
  { title: 'Every level welcome', text: 'Small groups mean each pose is adapted for you, whatever your age or ability.' },
]

export default function TimetablePage() {
  return (
    <>
      <PageHero
        eyebrow="Timetable"
        title="Two classes a week, close to home"
        intro="Join us in Oadby on Tuesday evenings or Thurnby on Thursdays. Book a single class or add your class to your calendar."
      />

      <section className="pb-20 pt-4 sm:pb-28">
        <div className="container-page">
          <WeeklyClasses detailed />
          <Reveal className="mt-16">
            <ul className="grid gap-8 border-t border-forest-900/[0.08] pt-12 md:grid-cols-3">
              {TIPS.map((t) => (
                <li key={t.title}>
                  <h2 className="text-2xl">{t.title}</h2>
                  <p className="mt-2 text-forest-800/80">{t.text}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <div className="bg-cream-100/60">
        <ContactSection />
      </div>
    </>
  )
}
