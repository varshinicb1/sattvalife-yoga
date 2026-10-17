import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import { Reveal, SectionHeading } from '@/components/motion-primitives'
import Photo from '@/components/Photo'
import { PRACTICES } from '@/data/content'
import type { PhotoKey } from '@/data/photos'

/**
 * "Find your practice" — image-led cards, the way the client's homepage concept
 * draws them: a picture, the name under it, one line, one action.
 *
 * Every practice photo slot is 4/5, so the pictures are the same height and the
 * names sit on one line across the row. Slots still waiting on a real
 * photograph render a branded frame at that exact crop, so nothing moves when
 * the picture arrives. No stock or AI imagery stands in for a missing shot —
 * the brief rules it out, and the concept asks for real Sattvalife photography.
 */
export default function Practices() {
  return (
    <section className="section-y" aria-label="Find your practice">
      <div className="container-page">
        <SectionHeading
          title="Find your practice"
          intro="Whether you want a weekly class, a calmer celebration or something for your team, it starts in the same place."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {PRACTICES.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 0.06} className="h-full">
              <Link
                to={p.to}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-forest-900/[0.08] bg-white/85 shadow-soft transition duration-300 hover:-translate-y-0.5 hover:border-amber-400/50 hover:shadow-lift"
              >
                <div className="overflow-hidden">
                  <Photo
                    slot={p.photo as PhotoKey}
                    className="w-full transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="text-[1.45rem] leading-tight sm:text-[1.6rem]">{p.name}</h3>
                  <p className="mt-2 flex-1 text-base leading-relaxed text-ink-700/85">{p.text}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-[0.95rem] font-semibold text-ink-800">
                    <span className="link-underline">{p.cta}</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
