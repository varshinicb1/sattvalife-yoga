import { useId } from 'react'
import { Link } from 'react-router'
import { ArrowRight, Check } from 'lucide-react'
import PageHero from '@/components/PageHero'
import { Reveal, SectionHeading } from '@/components/motion-primitives'
import { ContactForm } from '@/sections/Contact'
import {
  CELEBRATION_INTERESTS,
  CELEBRATION_MENU,
  CELEBRATION_OCCASIONS,
  EVENT_OFFERINGS,
} from '@/data/content'

/** Event-specific fields. Names starting with x_ are appended to the enquiry message. */
function EventFields() {
  const id = useId()
  return (
    <>
      <div>
        <label htmlFor={`${id}-occasion`} className="field-label">Occasion</label>
        <select id={`${id}-occasion`} name="x_Occasion" className="field" defaultValue="">
          <option value="" disabled>Choose…</option>
          {CELEBRATION_OCCASIONS.map((o) => (
            <option key={o.title}>{o.title}</option>
          ))}
          <option>Private or small-group class</option>
          <option>Pop-up class or workshop</option>
          <option>Something else</option>
        </select>
      </div>
      <div>
        <label htmlFor={`${id}-date`} className="field-label">
          Preferred date <span className="font-normal text-forest-800/60">(optional)</span>
        </label>
        <input id={`${id}-date`} name="x_Preferred_date" type="date" className="field" />
      </div>
      <div>
        <label htmlFor={`${id}-guests`} className="field-label">Roughly how many guests</label>
        <select id={`${id}-guests`} name="x_Guests" className="field" defaultValue="">
          <option value="" disabled>Choose…</option>
          <option>Up to 10</option>
          <option>10 to 20</option>
          <option>20 to 40</option>
          <option>40+</option>
        </select>
      </div>
      <div>
        <label htmlFor={`${id}-where`} className="field-label">Where</label>
        <input id={`${id}-where`} name="x_Location" placeholder="Town, or the venue if you have one" className="field" />
      </div>
      <fieldset className="sm:col-span-2">
        <legend className="field-label">What are you drawn to?</legend>
        <p className="field-help !mt-0">Pick as many as you like, or leave it to us.</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {CELEBRATION_INTERESTS.map((item) => (
            <label key={item} className="cursor-pointer">
              <input type="checkbox" name="x_Interested_in" value={item} className="peer sr-only" />
              <span className="inline-flex rounded-full border border-forest-900/15 px-4 py-2 text-[0.95rem] text-forest-800 transition-colors peer-checked:border-forest-600 peer-checked:bg-forest-600 peer-checked:text-cream-50 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-amber-600">
                {item}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
    </>
  )
}

export default function ExperiencesPage() {
  return (
    <>
      <PageHero
        eyebrow="Wellness experiences & celebrations"
        title={
          <>
            Celebrate with <em className="font-normal text-forest-600">something calmer</em>
          </>
        }
        intro="Baby showers, birthdays, hen parties and special occasions, hosted as a wellness experience your guests will remember. We come to you, and shape the session around your group."
      >
        <Link to="/experiences#enquire" className="btn-primary btn-lg">
          Enquire about your event
          <ArrowRight className="h-4 w-4" />
        </Link>
      </PageHero>

      {/* Occasions */}
      <section className="pb-16 sm:pb-20">
        <div className="container-page grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CELEBRATION_OCCASIONS.map((o, i) => (
            <Reveal key={o.title} delay={i * 0.06}>
              <article className="flex h-full flex-col rounded-3xl border border-forest-900/[0.08] bg-white/85 p-6 shadow-soft">
                <h2 className="text-2xl sm:text-[1.7rem]">{o.title}</h2>
                <p className="mt-2.5 text-base leading-relaxed text-forest-800/85">{o.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* What we bring */}
      <section className="border-y border-forest-900/[0.07] bg-cream-100/60 py-20 sm:py-24">
        <div className="container-page">
          <SectionHeading
            title="Build your session"
            intro="Mix movement, stillness and something to share. Every event is put together with you, so nothing here is a fixed package."
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {CELEBRATION_MENU.map((group, i) => (
              <Reveal key={group.group} delay={i * 0.08}>
                <article className="flex h-full flex-col rounded-3xl border border-forest-900/[0.08] bg-white/90 p-7 shadow-soft sm:p-8">
                  <h3 className="text-3xl">{group.group}</h3>
                  <p className="mt-2 text-base text-forest-800/75">{group.note}</p>
                  <ul className="mt-6 space-y-3 border-t border-forest-900/[0.08] pt-6">
                    {group.items.map((item) => (
                      <li key={item} className="flex gap-3 text-base text-forest-900">
                        <Check className="mt-1 h-4 w-4 shrink-0 text-amber-600" strokeWidth={2.2} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-8">
            <p className="text-base text-forest-800/75">
              Tell us the occasion and roughly how long you have, and we will suggest a shape for the session, then send a quote.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Not a celebration */}
      <section className="py-20 sm:py-24">
        <div className="container-page">
          <SectionHeading title="Also available" intro="Not every booking is a celebration. These are the other ways people bring us in." />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {EVENT_OFFERINGS.map((o, i) => (
              <Reveal key={o.title} delay={i * 0.08}>
                <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-forest-900/[0.07] bg-white/85 shadow-soft">
                  {o.image && (
                    <div className="overflow-hidden">
                      <img src={o.image} alt="" loading="lazy" className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-7">
                    <h3 className="text-2xl sm:text-3xl">{o.title}</h3>
                    <p className="mt-3 flex-1 text-base leading-relaxed text-forest-800/80">{o.text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
            <Reveal delay={0.16}>
              <article className="flex h-full flex-col justify-between rounded-3xl bg-forest-800 p-7 text-cream-50 sm:p-8">
                <div>
                  <h3 className="text-2xl !text-cream-50 sm:text-3xl">Workplace wellbeing</h3>
                  <p className="mt-3 text-base leading-relaxed text-cream-100/85">
                    Wellbeing mornings, seated desk yoga and regular on-site sessions for teams. That has a page of its own.
                  </p>
                </div>
                <Link to="/corporate" className="btn-brass mt-8 self-start">
                  Sattvalife@Work
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Enquiry */}
      <section id="enquire" className="scroll-mt-28 border-t border-forest-900/[0.07] bg-cream-100/60 py-20 sm:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <h2 className="text-4xl leading-[1.08] sm:text-5xl">Tell us about your event</h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-forest-800/80">
              Every celebration is quoted individually, because they are all different. Share a few details and we will come back with ideas, availability and a price. No obligation.
            </p>
            <ul className="mt-8 space-y-3 text-base text-forest-800/85">
              {['We come to you, at home or a venue of your choice', 'Adapted for every guest, including complete beginners', 'We confirm what we bring and what the venue needs'].map((t) => (
                <li key={t} className="flex gap-3">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-forest-600" strokeWidth={2.2} />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <ContactForm
              type="event"
              messageLabel="Anything else we should know?"
              messagePlaceholder="The occasion, the people coming, and anything that would make the session right for them."
              submitLabel="Send enquiry"
              extraFields={<EventFields />}
            />
          </Reveal>
        </div>
      </section>
    </>
  )
}
