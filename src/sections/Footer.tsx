import { Link } from 'react-router'
import { Mail, MapPin } from 'lucide-react'
import NewsletterForm from '@/components/NewsletterForm'
import { BrandIcon } from '@/components/BrandIcon'
import SocialLinks from '@/components/SocialLinks'
import { Logo } from '@/sections/Navbar'
import { FOOTER_EXPLORE } from '@/lib/nav'
import { TIMETABLE } from '@/data/content'
import { useCmsContent, whatsappHref } from '@/hooks/useCmsContent'
import { formatRange } from '@/lib/schedule'

const LEGAL = [
  { label: 'Privacy', to: '/privacy' },
  { label: 'Cookies', to: '/cookies' },
  { label: 'Terms & Conditions', to: '/terms' },
  { label: 'Accessibility', to: '/accessibility' },
]

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
        <div className="grid gap-8 border-b border-cream-50/10 py-12 md:grid-cols-2 md:items-center md:py-14">
          <div>
            <h2 className="text-3xl !text-cream-50 sm:text-4xl">Stay in the flow</h2>
            <p className="mt-3 max-w-md text-cream-100/70">New classes, workshops and seasonal wellbeing tips from Amisha and Nish.</p>
          </div>
          <NewsletterForm />
        </div>

        {/* Four columns */}
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:py-14">
          {/* 1. Brand */}
          <div>
            <Link to="/" aria-label="Sattvalife Yoga, home" className="inline-block">
              <Logo light />
            </Link>
            <p className="mt-5 max-w-xs text-base leading-relaxed text-cream-100/70">
              Personalised yoga for small groups, individuals and workplaces in Leicester. You don’t have to fit yoga. We help yoga fit into your life.
            </p>
          </div>

          {/* 2. Explore */}
          <nav aria-label="Explore">
            <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] !text-amber-300">Explore</h2>
            <ul className="mt-5 space-y-2.5 text-base">
              {FOOTER_EXPLORE.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="inline-block py-1 text-cream-100/80 transition-colors hover:text-cream-50">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* 3. Join & contact */}
          <nav aria-label="Join and contact">
            <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] !text-amber-300">Join us</h2>
            <ul className="mt-5 space-y-2.5 text-base">
              <li>
                <Link to="/classes" className="inline-block py-1 text-cream-100/80 transition-colors hover:text-cream-50">Book a class</Link>
              </li>
              <li>
                <Link to="/registration" className="inline-block py-1 text-cream-100/80 transition-colors hover:text-cream-50">Register</Link>
              </li>
              <li>
                <Link to="/contact" className="inline-block py-1 text-cream-100/80 transition-colors hover:text-cream-50">Contact us</Link>
              </li>
              <li>
                <a href={whatsappHref(settings.whatsappNumber)} target="_blank" rel="noreferrer" className="flex items-center gap-2 py-1 text-cream-100/80 transition-colors hover:text-cream-50">
                  <BrandIcon name="whatsapp" className="h-4 w-4 text-amber-300" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={`mailto:${settings.contactEmail}`} className="flex items-center gap-2 break-all py-1 text-cream-100/80 transition-colors hover:text-cream-50">
                  <Mail className="h-4 w-4 shrink-0 text-amber-300" strokeWidth={1.6} />
                  {settings.contactEmail}
                </a>
              </li>
            </ul>
          </nav>

          {/* 4. Socials + where we teach */}
          <div>
            <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] !text-amber-300">Follow</h2>
            <SocialLinks tone="dark" className="mt-5" withGoogle />
            <h2 className="mt-8 font-sans text-xs font-semibold uppercase tracking-[0.2em] !text-amber-300">Weekly classes</h2>
            <ul className="mt-4 space-y-3 text-base">
              {TIMETABLE.venues.map((v) => (
                <li key={v.id}>
                  <a href={v.mapsUrl} target="_blank" rel="noreferrer" className="group block py-0.5 text-cream-100/80 hover:text-cream-50">
                    <span className="font-semibold text-cream-50">
                      {v.day}s, {formatRange(v)}
                    </span>
                    <span className="mt-0.5 flex items-start gap-1.5 text-sm">
                      <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-300" strokeWidth={1.6} />
                      {v.hall}, {v.postcode}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 border-t border-cream-50/10 py-7 text-sm text-cream-100/60 md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-wrap gap-x-6 gap-y-1">
            {LEGAL.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="inline-block py-1 hover:text-cream-50">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <p>© {year} Sattvalife Yoga &amp; Wellness</p>
        </div>
      </div>
    </footer>
  )
}
