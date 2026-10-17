import { Link } from 'react-router'
import { ArrowRight, Mail, MapPin } from 'lucide-react'
import PageHero from '@/components/PageHero'
import { Reveal, SectionHeading } from '@/components/motion-primitives'
import { ContactForm } from '@/sections/Contact'
import SocialLinks from '@/components/SocialLinks'
import { BrandIcon } from '@/components/BrandIcon'
import { TIMETABLE } from '@/data/content'
import { useCmsContent, whatsappHref } from '@/hooks/useCmsContent'
import { formatRange } from '@/lib/schedule'

/**
 * Two routes, then the direct channels, then the form. The two cards are built
 * from the same skeleton — heading, one short line, one button — so the row
 * stays level and neither side needs filler to match the other's height.
 */
function RouteCard({
  title,
  text,
  action,
  primary = false,
  delay = 0,
}: {
  title: string
  text: string
  action: { label: string; to?: string; href?: string }
  primary?: boolean
  delay?: number
}) {
  const inner = (
    <>
      <h2 className="text-[1.9rem] leading-tight sm:text-[2.2rem]">{title}</h2>
      <p className="mt-2.5 flex-1 text-base leading-relaxed text-ink-700/85">{text}</p>
      <span className={`${primary ? 'btn-primary' : 'btn-outline'} mt-5 self-start`}>
        {action.label}
        <ArrowRight className="h-4 w-4" />
      </span>
    </>
  )
  const shell = `flex h-full flex-col rounded-3xl border p-6 shadow-soft transition-colors sm:p-7 ${
    primary ? 'border-amber-400/35 bg-amber-50/60' : 'border-forest-900/[0.08] bg-white/85 hover:border-amber-400/50'
  }`

  return (
    <Reveal delay={delay} className="h-full">
      {action.to ? (
        <Link to={action.to} className={shell}>
          {inner}
        </Link>
      ) : (
        <a href={action.href} className={shell}>
          {inner}
        </a>
      )}
    </Reveal>
  )
}

export default function ContactPage() {
  const { settings } = useCmsContent()
  const venues = TIMETABLE.venues

  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title="How can we help?"
        intro="Ask us anything, or register as a new student before your first class."
      />

      <section className="pb-12 pt-2 sm:pb-14">
        <div className="container-page grid gap-5 lg:grid-cols-2">
          <RouteCard
            title="General enquiry"
            text="Classes, celebrations, workplace wellbeing or working together. We reply personally, usually within a day or two."
            action={{ label: 'Send us a message', href: '#enquiry' }}
          />
          <RouteCard
            title="Register for classes"
            text="New to Sattvalife? A short health and consent form so we can adapt every pose to you. Takes about three minutes."
            action={{ label: 'Register now', to: '/registration' }}
            primary
            delay={0.08}
          />
        </div>
      </section>

      {/* Direct channels, as a slim band rather than a tall section of mostly air */}
      <section aria-label="Ways to reach us" className="band-y border-y border-forest-900/[0.07] bg-white/60">
        <ul className="container-page grid gap-8 sm:gap-6 md:grid-cols-3">
          {[
            {
              key: 'whatsapp',
              heading: 'Message us',
              body: (
                <a
                  href={whatsappHref(settings.whatsappNumber)}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 flex items-center gap-2.5 text-base font-semibold text-ink-900 hover:text-amber-700"
                >
                  <BrandIcon name="whatsapp" className="h-5 w-5" colored />
                  {settings.whatsappNumber}
                </a>
              ),
              note: 'Usually the quickest way to reach Amisha.',
            },
            {
              key: 'email',
              heading: 'Email us',
              body: (
                <a
                  href={`mailto:${settings.contactEmail}`}
                  className="mt-2 flex items-center gap-2.5 break-all text-base font-semibold text-ink-900 hover:text-amber-700"
                >
                  <Mail className="h-5 w-5 shrink-0 text-amber-600" strokeWidth={1.8} />
                  {settings.contactEmail}
                </a>
              ),
              note: 'For enquiries, quotes and anything in writing.',
            },
            {
              key: 'social',
              heading: 'Follow along',
              body: <SocialLinks className="mt-2 -ml-2.5" />,
              note: 'Class news, workshops and the occasional pose breakdown.',
            },
          ].map((c, i) => (
            <li
              key={c.key}
              className={i > 0 ? 'md:border-l md:border-forest-900/[0.07] md:pl-8' : ''}
            >
              <h2 className="text-xl">{c.heading}</h2>
              {c.body}
              <p className="mt-1.5 text-sm text-ink-700/75">{c.note}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section-y bg-cream-100/60">
        <div className="container-page">
          <SectionHeading
            title="Where to find us"
            intro={
              venues.length > 1
                ? 'Tap a hall for directions.'
                : `Our weekly class is at ${venues[0].hall} in ${venues[0].area}. Tap for directions.`
            }
          />
          <div className={`mt-10 grid gap-5 ${venues.length > 1 ? 'sm:grid-cols-2' : ''}`}>
            {venues.map((v, i) => (
              <Reveal key={v.id} delay={i * 0.08}>
                <a
                  href={v.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-full flex-col gap-5 rounded-3xl border border-forest-900/[0.08] bg-white/85 p-6 shadow-soft transition-colors hover:border-amber-400/70 sm:flex-row sm:items-center sm:justify-between sm:p-7"
                >
                  <div>
                    <h3 className="text-2xl">{v.hall}</h3>
                    <p className="mt-2 flex items-start gap-2 text-base text-ink-700/85">
                      <MapPin className="mt-1 h-4 w-4 shrink-0 text-amber-600" strokeWidth={1.8} />
                      {v.area}, {v.postcode}
                    </p>
                    <p className="mt-3 text-base font-semibold text-ink-900">
                      {v.day}s, {formatRange(v)}
                    </p>
                  </div>
                  <span className="btn-outline shrink-0 group-hover:border-amber-400 group-hover:bg-amber-300 group-hover:text-ink-950">
                    Get directions
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="enquiry" className="section-y scroll-mt-28">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <h2 className="text-4xl leading-[1.08] sm:text-5xl">Send us a message</h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-ink-700/80">
              Tell us what you are looking for. If you have an injury or condition, mention it here and we will let you know how we would adapt the class.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  )
}
