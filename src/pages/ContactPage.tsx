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

export default function ContactPage() {
  const { settings } = useCmsContent()

  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title="How can we help?"
        intro="Two ways to reach us: ask us anything, or register as a new student before your first class."
      />

      {/* The two routes, stated plainly */}
      <section className="pb-4 pt-2">
        <div className="container-page grid gap-5 lg:grid-cols-2">
          <Reveal>
            <a href="#enquiry" className="group flex h-full flex-col rounded-3xl border border-forest-900/[0.08] bg-white/85 p-7 shadow-soft transition-colors hover:border-forest-600/40 sm:p-9">
              <h2 className="text-3xl sm:text-4xl">General enquiry</h2>
              <p className="mt-3 flex-1 text-base leading-relaxed text-ink-700/85">
                Questions about classes, bespoke celebrations and events, workplace wellbeing, or working together. We reply personally, usually within a day or two.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 font-semibold text-ink-700">
                <span className="link-underline">Send us a message</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </a>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="flex h-full flex-col rounded-3xl border border-forest-600/25 bg-forest-600/[0.06] p-7 shadow-soft sm:p-9">
              <h2 className="text-3xl sm:text-4xl">Register for classes</h2>
              <p className="mt-3 flex-1 text-base leading-relaxed text-ink-700/85">
                New to Sattvalife? The registration form covers your details and a short health and consent section, so we can keep you safe and adapt each pose to you. It takes about three minutes.
              </p>
              <Link to="/registration" className="btn-primary mt-6 self-start">
                Register now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Direct channels */}
      <section className="py-16 sm:py-20">
        <div className="container-page grid gap-10 md:grid-cols-3">
          <Reveal>
            <h2 className="text-2xl">Message us</h2>
            <a
              href={whatsappHref(settings.whatsappNumber)}
              target="_blank"
              rel="noreferrer"
              className="mt-3 flex items-center gap-2.5 text-base font-semibold text-ink-900 hover:text-ink-600"
            >
              <BrandIcon name="whatsapp" className="h-5 w-5 text-[#1f9e4f]" />
              {settings.whatsappNumber}
            </a>
            <p className="mt-2 text-sm text-ink-700/75">WhatsApp is usually the quickest way to reach Amisha.</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="text-2xl">Email us</h2>
            <a href={`mailto:${settings.contactEmail}`} className="mt-3 flex items-center gap-2.5 break-all text-base font-semibold text-ink-900 hover:text-ink-600">
              <Mail className="h-5 w-5 shrink-0 text-amber-600" strokeWidth={1.8} />
              {settings.contactEmail}
            </a>
            <p className="mt-2 text-sm text-ink-700/75">For enquiries, quotes and anything you would rather put in writing.</p>
          </Reveal>
          <Reveal delay={0.12}>
            <h2 className="text-2xl">Follow along</h2>
            <SocialLinks className="mt-3" withGoogle />
            <p className="mt-2 text-sm text-ink-700/75">Class news, workshops and the occasional pose breakdown.</p>
          </Reveal>
        </div>
      </section>

      {/* Where to find us */}
      <section className="border-y border-forest-900/[0.07] bg-cream-100/60 py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading title="Where to find us" intro="We teach in two community halls in Leicester. Tap either one for directions." />
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {TIMETABLE.venues.map((v, i) => (
              <Reveal key={v.id} delay={i * 0.08}>
                <a
                  href={v.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group block h-full rounded-3xl border border-forest-900/[0.08] bg-white/85 p-7 shadow-soft transition-colors hover:border-forest-600/40"
                >
                  <h3 className="text-2xl group-hover:text-ink-600">{v.hall}</h3>
                  <p className="mt-2 flex items-start gap-2 text-base text-ink-700/85">
                    <MapPin className="mt-1 h-4 w-4 shrink-0 text-amber-600" strokeWidth={1.8} />
                    {v.area}, {v.postcode}
                  </p>
                  <p className="mt-3 text-base font-semibold text-ink-900">
                    {v.day}s, {formatRange(v)}
                  </p>
                  <span className="link-underline mt-4 inline-block text-sm font-semibold text-ink-700">Get directions</span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* The enquiry form itself */}
      <section id="enquiry" className="scroll-mt-28 py-20 sm:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <h2 className="text-4xl leading-[1.08] sm:text-5xl">Send us a message</h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-700/80">
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
