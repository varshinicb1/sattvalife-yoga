import { Link } from 'react-router'
import PageHero from '@/components/PageHero'
import { Reveal } from '@/components/motion-primitives'
import { useCmsContent, whatsappHref } from '@/hooks/useCmsContent'

const DONE = [
  'Text and buttons meet WCAG 2.2 AA contrast on every background.',
  'The whole site can be used with a keyboard, and focus is always visible.',
  'Headings, landmarks and form labels are marked up for screen readers.',
  'Animation is reduced automatically if your device asks for less motion.',
  'Tap targets are at least 24px, and the site is built for phones first.',
  'Images that carry meaning have text alternatives.',
]

const LIMITS = [
  'Payment is completed on Stripe’s own checkout pages, which we do not control.',
  'We have not yet published step-free access details for each venue.',
  'The site has been tested in Chrome and in Safari’s engine, but not yet with a screen reader end to end.',
]

export default function AccessibilityPage() {
  const { settings } = useCmsContent()

  return (
    <>
      <PageHero
        eyebrow="Accessibility"
        title="Accessibility statement"
        intro="Yoga here is for every body, and the website should be too. This is where we are, honestly, and how to tell us when we fall short."
      />
      <section className="section-pb pt-2">
        <div className="container-page">
          <Reveal className="card mx-auto max-w-3xl space-y-8 p-7 text-lg leading-relaxed text-ink-700/90 sm:p-12">
            <div className="space-y-3">
              <h2 className="text-3xl">What we have done</h2>
              <ul className="space-y-2">
                {DONE.map((d) => (
                  <li key={d} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl">Where we fall short</h2>
              <ul className="space-y-2">
                {LIMITS.map((d) => (
                  <li key={d} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-forest-400" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl">In class</h2>
              <p>
                Every pose is adapted for the person in front of us, and props are provided. If you have an injury, a condition, or anything that would make a class easier for you, tell us on the{' '}
                <Link to="/registration" className="link-underline font-semibold">registration form</Link> or message us before you come.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl">Tell us about a problem</h2>
              <p>
                If something on this site is hard to use, we want to know.{' '}
                <a href={`mailto:${settings.contactEmail}`} className="link-underline font-semibold">
                  {settings.contactEmail}
                </a>{' '}
                or{' '}
                <a href={whatsappHref(settings.whatsappNumber)} target="_blank" rel="noreferrer" className="link-underline font-semibold">
                  message us on WhatsApp
                </a>
                . We aim to reply within a few days and will tell you what we can fix and when.
              </p>
            </div>

            <p className="border-t border-forest-900/[0.08] pt-6 text-base">Last reviewed September 2026.</p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
