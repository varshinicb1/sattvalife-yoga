import { Reveal } from '@/components/motion-primitives'
import { FOCUS_AREAS } from '@/data/content'
import { Activity, Flame, Wind } from 'lucide-react'

const ICONS = [Activity, Flame, Wind]

export default function KeyFocusAreas() {
  return (
    <section className="relative py-12 md:py-16 lg:py-20 bg-gradient-to-b from-cream-50 to-cream-100">
      <div className="mx-auto max-w-5xl px-5 text-center">
        <Reveal>
          <p className="uppercase tracking-[0.3em] text-xs font-semibold text-amber-500 mb-3">Our Approach</p>
          <h2 className="font-serif text-4xl md:text-5xl text-forest-900">{FOCUS_AREAS.title}</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-12 grid md:grid-cols-3 gap-8">
            {FOCUS_AREAS.areas.map((area, i) => {
              const Icon = ICONS[i]
              return (
                <div key={area} className="glass rounded-3xl p-8 shadow-lg shadow-forest-900/5 flex flex-col items-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 shadow-inner">
                    <Icon className="h-8 w-8 stroke-[1.8]" />
                  </div>
                  <h3 className="mt-5 font-serif text-3xl text-forest-900">{area}</h3>
                  <p className="mt-3 text-sm text-forest-700/75 leading-relaxed">{FOCUS_AREAS.benefits[i]}</p>
                </div>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
