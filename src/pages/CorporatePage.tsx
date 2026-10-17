import { useId } from 'react'
import { Link } from 'react-router'
import { Check } from 'lucide-react'
import PageHero from '@/components/PageHero'
import { Reveal } from '@/components/motion-primitives'
import { ContactForm } from '@/sections/Contact'
import { CORPORATE, COURSES, REVIEWS } from '@/data/content'
import { openBooking } from '@/lib/bookingStore'

function TeamSizeField() {
  const id = useId()
  return (
    <>
      <div>
        <label htmlFor={`${id}-company`} className="field-label">Company</label>
        <input id={`${id}-company`} name="x_Company" autoComplete="organization" className="field" />
      </div>
      <div>
        <label htmlFor={`${id}-size`} className="field-label">Team size</label>
        <select id={`${id}-size`} name="x_Team_size" className="field" defaultValue="">
          <option value="" disabled>Choose…</option>
          <option>Under 10</option>
          <option>10 to 25</option>
          <option>25 to 50</option>
          <option>50+</option>
        </select>
      </div>
    </>
  )
}

export default function CorporatePage() {
  const plan = COURSES.find((c) => c.id === 'corporate')!
  const quotes = REVIEWS.filter((r) => r.author === 'Sally Cook' || r.author === 'Jiten Anand')
  const [photoA, photoB] = CORPORATE.images

  return (
    <>
      <PageHero
        eyebrow="Sattvalife@Work"
        title={
          <>
            Yoga that works <em className="font-normal text-forest-600">at work</em>
          </>
        }
        intro={CORPORATE.tagline}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link to="/corporate#enquire" className="btn-primary btn-lg">
            Request a proposal
          </Link>
          <button type="button" onClick={() => openBooking({ courseId: 'corporate' })} className="btn-outline btn-lg">
            Book at £{plan.price} a session
          </button>
        </div>
      </PageHero>

      <section className="section-pb">
        <div className="container-page grid gap-5 md:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <img
              src={photoA.small}
              srcSet={`${photoA.small} 800w, ${photoA.src} 1600w`}
              sizes="(min-width: 768px) 60vw, 100vw"
              width={photoA.w}
              height={photoA.h}
              alt={photoA.alt}
              className="h-full w-full rounded-3xl object-cover shadow-soft"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <img
              src={photoB.small}
              srcSet={`${photoB.small} 640w, ${photoB.src} 1024w`}
              sizes="(min-width: 768px) 40vw, 100vw"
              width={photoB.w}
              height={photoB.h}
              alt={photoB.alt}
              loading="lazy"
              className="h-full w-full rounded-3xl object-cover shadow-soft"
            />
          </Reveal>
        </div>
      </section>

      <section className="section-y border-t border-forest-900/[0.07]">
        <div className="container-page grid gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <h2 className="text-4xl leading-[1.08] sm:text-5xl">Healthier, happier teams</h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-700/85">{CORPORATE.body}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h3 className="text-3xl">{CORPORATE.offersTitle}</h3>
            <p className="mt-3 text-ink-700/80">{CORPORATE.offersIntro}</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {CORPORATE.offers.map((o) => (
                <li key={o} className="flex gap-3 rounded-2xl bg-white/80 p-4 text-base text-ink-900 shadow-soft">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-forest-600" strokeWidth={2.2} />
                  {o}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section-y bg-forest-900">
        <div className="container-page grid gap-10 md:grid-cols-2 md:gap-14">
          {quotes.map((q, i) => (
            <Reveal key={q.author} delay={i * 0.1}>
              <figure>
                <blockquote className="font-serif text-2xl italic leading-snug text-cream-50 sm:text-[1.7rem]">“{q.text}”</blockquote>
                <figcaption className="mt-5 text-cream-100/70">
                  <span className="font-semibold text-cream-50">{q.author}</span>, {q.context?.toLowerCase()}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="enquire" className="section-y scroll-mt-24">
        <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <h2 className="text-4xl leading-[1.08] sm:text-5xl">Plan a session for your team</h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-700/80">
              Tell us about your team, your space and what you would like to achieve. We will reply with ideas, dates and a quote.
            </p>
            <ul className="mt-8 space-y-3 text-ink-700/85">
              {plan.features.map((f) => (
                <li key={f} className="flex gap-3">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-forest-600" strokeWidth={2.2} />
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <ContactForm
              type="corporate"
              messageLabel="What would you like to achieve?"
              messagePlaceholder="For example: a weekly lunchtime class, a wellbeing morning, or desk yoga for a busy team."
              submitLabel="Send enquiry"
              extraFields={<TeamSizeField />}
            />
          </Reveal>
        </div>
      </section>
    </>
  )
}
