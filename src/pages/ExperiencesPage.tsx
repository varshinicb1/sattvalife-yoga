import { useId } from 'react'
import { Link } from 'react-router'
import PageHero from '@/components/PageHero'
import { Reveal } from '@/components/motion-primitives'
import { ContactForm } from '@/sections/Contact'
import { EVENT_OFFERINGS } from '@/data/content'

function EventFields() {
  const id = useId()
  return (
    <>
      <div>
        <label htmlFor={`${id}-kind`} className="field-label">What are you planning?</label>
        <select id={`${id}-kind`} name="x_Session_type" className="field" defaultValue="">
          <option value="" disabled>Choose…</option>
          {EVENT_OFFERINGS.map((o) => (
            <option key={o.title}>{o.title}</option>
          ))}
          <option>Something else</option>
        </select>
      </div>
      <div>
        <label htmlFor={`${id}-where`} className="field-label">Where?</label>
        <input id={`${id}-where`} name="x_Location" placeholder="Town or venue" className="field" />
      </div>
    </>
  )
}

export default function ExperiencesPage() {
  return (
    <>
      <PageHero
        eyebrow="Private sessions & events"
        title="Yoga, wherever you gather"
        intro="Beyond our weekly classes, we bring yoga to offices, homes, gardens and community spaces across Leicestershire. Every session is shaped around your group."
      >
        <Link to="/experiences#enquire" className="btn-primary btn-lg">
          Tell us your idea
        </Link>
      </PageHero>

      <section className="pb-20 sm:pb-28">
        <div className="container-page grid gap-5 sm:grid-cols-2">
          {EVENT_OFFERINGS.map((o, i) => (
            <Reveal key={o.title} delay={(i % 2) * 0.08}>
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-forest-900/[0.07] bg-white/85 shadow-soft">
                {o.image && (
                  <div className="overflow-hidden">
                    <img src={o.image} alt="" loading="lazy" className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-7 sm:p-8">
                  <h2 className="text-3xl">{o.title}</h2>
                  <p className="mt-3 flex-1 text-lg leading-relaxed text-forest-800/80">{o.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="enquire" className="scroll-mt-24 border-t border-forest-900/[0.07] bg-cream-100/60 py-20 sm:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <h2 className="text-4xl leading-[1.08] sm:text-5xl">Let us plan it together</h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-forest-800/80">
              Share a few details and we will come back with ideas, availability and a price. No obligation.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ContactForm
              type="event"
              messageLabel="Tell us more"
              messagePlaceholder="Group size, preferred dates, and anything we should know."
              submitLabel="Send enquiry"
              extraFields={<EventFields />}
            />
          </Reveal>
        </div>
      </section>
    </>
  )
}
