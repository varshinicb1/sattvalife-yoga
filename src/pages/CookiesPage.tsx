import { Link } from 'react-router'
import PageHero from '@/components/PageHero'
import { Reveal } from '@/components/motion-primitives'

/**
 * Written to match what the site actually does today: no analytics key is
 * configured, so no non-essential cookies are set. Revisit if analytics is enabled.
 */
export default function CookiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Cookies"
        title="Cookies on this site"
        intro="The short version: we do not use advertising or tracking cookies, and nothing non-essential is stored without your say so."
      />
      <section className="pb-24 pt-2">
        <div className="container-page">
          <Reveal className="card mx-auto max-w-3xl space-y-8 p-7 text-lg leading-relaxed text-forest-800/90 sm:p-12">
            <div className="space-y-3">
              <h2 className="text-3xl">What we store</h2>
              <p>
                When you choose whether to accept optional analytics, we save that choice in your browser’s local storage so we do not ask again. It stays on your device, and we cannot read it from our side.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl">Analytics</h2>
              <p>
                Optional, privacy-friendly analytics help us see which pages are useful. They only load if you accept, and they are switched off entirely at the moment. If you accept and change your mind, clear this site’s data in your browser settings and you will be asked again.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl">Payments</h2>
              <p>
                Bookings are taken on Stripe’s own secure checkout pages. Stripe sets its own cookies there to process the payment and prevent fraud. We never see or store your card details. Stripe’s privacy notice explains what it collects.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl">Links to other sites</h2>
              <p>
                Buttons to WhatsApp, Instagram, Facebook and Google Maps take you to those services, which set their own cookies once you arrive. We have no control over those.
              </p>
            </div>

            <p className="border-t border-forest-900/[0.08] pt-6 text-base">
              Questions about any of this? <Link to="/contact" className="link-underline font-semibold">Contact us</Link>, or read our{' '}
              <Link to="/privacy" className="link-underline font-semibold">privacy policy</Link>. Last updated September 2026.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
