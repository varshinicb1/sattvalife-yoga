import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import { Reveal, SectionHeading } from '@/components/motion-primitives'
import { PRACTICES } from '@/data/content'

/**
 * "Find your practice" from the brief's homepage flow. Every card has the same
 * skeleton — name, one blurb, one action pinned to the bottom edge — so the row
 * stays level whatever the copy length, at two, three or six across.
 */
export default function Practices() {
  return (
    <section className="section-y" aria-label="Find your practice">
      <div className="container-page">
        <SectionHeading
          title="Find your practice"
          intro="Whether you want a weekly class, a calmer celebration or something for your team, it starts in the same place."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PRACTICES.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 0.06} className="h-full">
              <Link
                to={p.to}
                className={`group flex h-full flex-col rounded-3xl border border-forest-900/[0.07] p-6 transition duration-300 hover:-translate-y-0.5 hover:border-amber-400/50 hover:shadow-lift sm:p-7 ${p.tint}`}
              >
                <h3 className="text-[1.6rem] leading-tight sm:text-[1.75rem]">{p.name}</h3>
                <p className="mt-2.5 flex-1 text-base leading-relaxed text-ink-700/85">{p.text}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-[0.95rem] font-semibold text-ink-800">
                  <span className="link-underline">{p.cta}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
