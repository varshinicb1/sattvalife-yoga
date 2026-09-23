import { Link } from 'react-router'
import { Plus } from 'lucide-react'
import PageHero from '@/components/PageHero'
import { Reveal, SectionHeading } from '@/components/motion-primitives'
import { PlanCards, PaymentNote } from '@/sections/Courses'
import FocusAreas from '@/sections/FocusAreas'
import { FAQS } from '@/data/content'
import { useCmsContent } from '@/hooks/useCmsContent'

export default function CoursesPage() {
  const { aboutVinyasa } = useCmsContent()

  return (
    <>
      <PageHero
        eyebrow="Classes & prices"
        title="Find the plan that fits your week"
        intro="Every class is small, friendly and personalised. Choose a plan, pick your first class and pay securely online in under a minute."
      />

      <section className="pb-20 pt-4 sm:pb-28">
        <div className="container-page">
          <PlanCards />
          <PaymentNote className="mt-10" />
        </div>
      </section>

      <section className="border-t border-forest-900/[0.07] py-20 sm:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <Reveal>
            <h2 className="text-4xl leading-[1.08] sm:text-5xl">{aboutVinyasa.title}</h2>
            <p className="mt-6 text-lg leading-relaxed text-forest-800/85">{aboutVinyasa.body}</p>
          </Reveal>
          {/* Two 500px originals shown at ~half column width, so neither is upscaled */}
          <Reveal delay={0.1} className="grid grid-cols-2 gap-4 self-start">
            <img
              src="/images/opt/garden-1-500.webp"
              width={500}
              height={500}
              alt="A backbend flow on the mat during an outdoor Sattvalife class"
              loading="lazy"
              className="aspect-[4/5] w-full rounded-3xl object-cover shadow-soft"
            />
            <img
              src="/images/opt/garden-2-500.webp"
              width={500}
              height={500}
              alt="A standing twist during an outdoor Sattvalife class"
              loading="lazy"
              className="mt-10 aspect-[4/5] w-full rounded-3xl object-cover shadow-soft"
            />
          </Reveal>
        </div>
      </section>

      <FocusAreas />

      <section className="py-20 sm:py-28" id="faq">
        <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <SectionHeading title="Good to know" intro="Anything else? Message us on WhatsApp and we will get back to you." />
            <Reveal className="mt-8">
              <Link to="/registration" className="btn-outline">
                New student registration
              </Link>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="divide-y divide-forest-900/[0.08] border-y border-forest-900/[0.08]">
              {FAQS.map((f) => (
                <details key={f.q} className="group py-5 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-serif text-2xl text-forest-900">
                    {f.q}
                    <Plus className="h-5 w-5 shrink-0 text-amber-700 transition-transform duration-300 group-open:rotate-45" />
                  </summary>
                  <p className="mt-3 max-w-[60ch] text-lg leading-relaxed text-forest-800/80">{f.a}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
