import { Link } from 'react-router'
import { Mail, MapPin } from 'lucide-react'
import NewsletterForm from '@/components/NewsletterForm'
import { BrandIcon } from '@/components/BrandIcon'
import { Logo } from '@/sections/Navbar'
import { NAV_LINKS } from '@/lib/nav'
import { CONTACT, TIMETABLE } from '@/data/content'
import { useCmsContent, whatsappHref } from '@/hooks/useCmsContent'
import { formatRange } from '@/lib/schedule'

export default function Footer() {
  const { settings } = useCmsContent()
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-forest-900 text-cream-100">
      <img
        src="/images/opt/lotus-mark-900.webp"
        alt=""
        aria-hidden="true"
        loading="lazy"
        width={900}
        height={484}
        className="pointer-events-none absolute -right-24 -top-10 w-[34rem] max-w-none opacity-[0.05]"
      />

      <div className="container-page relative">
        {/* Newsletter */}
        <div className="grid gap-8 border-b border-cream-50/10 py-14 md:grid-cols-2 md:items-center md:py-16">
          <div>
            <h2 className="text-3xl !text-cream-50 sm:text-4xl">Stay in the flow</h2>
            <p className="mt-3 max-w-md text-cream-100/70">New classes, workshops and seasonal wellbeing tips from Amisha and Nish.</p>
          </div>
          <NewsletterForm />
        </div>

        {/* Link columns */}
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1.2fr]">
          <div>
            <Link to="/" aria-label="Sattvalife Yoga, home" className="inline-block">
              <Logo light />
            </Link>
            <p className="mt-5 max-w-xs text-[0.95rem] leading-relaxed text-cream-100/70">
              Personalised Vinyasa yoga for small groups, individuals and workplaces in Leicester.
            </p>
            <div className="mt-6 flex gap-2">
              <a href={CONTACT.instagram} target="_blank" rel="noreferrer" aria-label="Sattvalife on Instagram" className="flex h-11 w-11 items-center justify-center rounded-full border border-cream-50/15 transition-colors hover:border-amber-300 hover:text-amber-300">
                <BrandIcon name="instagram" className="h-[18px] w-[18px]" />
              </a>
              <a href={CONTACT.facebook} target="_blank" rel="noreferrer" aria-label="Sattvalife on Facebook" className="flex h-11 w-11 items-center justify-center rounded-full border border-cream-50/15 transition-colors hover:border-amber-300 hover:text-amber-300">
                <BrandIcon name="facebook" className="h-[18px] w-[18px]" />
              </a>
              <a href={whatsappHref(settings.whatsappNumber)} target="_blank" rel="noreferrer" aria-label="Message Sattvalife on WhatsApp" className="flex h-11 w-11 items-center justify-center rounded-full border border-cream-50/15 transition-colors hover:border-amber-300 hover:text-amber-300">
                <BrandIcon name="whatsapp" className="h-[18px] w-[18px]" />
              </a>
            </div>
          </div>

          <nav aria-label="Footer">
            <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] !text-amber-300">Explore</h2>
            <ul className="mt-5 space-y-3 text-[0.95rem]">
              {NAV_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="inline-block py-1 text-cream-100/80 transition-colors hover:text-cream-50">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] !text-amber-300">Weekly classes</h2>
            <ul className="mt-5 space-y-5 text-[0.95rem]">
              {TIMETABLE.venues.map((v) => (
                <li key={v.id}>
                  <p className="font-semibold text-cream-50">
                    {v.day}s, {formatRange(v)}
                  </p>
                  <a href={v.mapsUrl} target="_blank" rel="noreferrer" className="mt-1 flex items-start gap-2 py-1 text-cream-100/75 hover:text-cream-50">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" strokeWidth={1.6} />
                    <span>
                      {v.hall}, {v.area} {v.postcode}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] !text-amber-300">Get in touch</h2>
            <ul className="mt-5 space-y-3 text-[0.95rem]">
              <li>
                <a href={whatsappHref(settings.whatsappNumber)} target="_blank" rel="noreferrer" className="flex items-center gap-2 py-1 text-cream-100/80 hover:text-cream-50">
                  <BrandIcon name="whatsapp" className="h-4 w-4 text-amber-300" />
                  {settings.whatsappNumber}
                </a>
              </li>
              <li>
                <a href={`mailto:${settings.contactEmail}`} className="flex items-center gap-2 break-all py-1 text-cream-100/80 hover:text-cream-50">
                  <Mail className="h-4 w-4 shrink-0 text-amber-300" strokeWidth={1.6} />
                  {settings.contactEmail}
                </a>
              </li>
              <li className="pt-2">
                <Link to="/registration" className="inline-block py-1 text-cream-100/80 underline decoration-amber-300/50 underline-offset-4 hover:text-cream-50">
                  New student registration form
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-cream-50/10 py-8 text-sm text-cream-100/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Sattvalife Yoga, Leicester. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="inline-block py-1 hover:text-cream-50">Privacy</Link>
            <Link to="/terms" className="inline-block py-1 hover:text-cream-50">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
