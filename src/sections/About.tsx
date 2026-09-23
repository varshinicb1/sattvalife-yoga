import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/motion-primitives'
import { INSTRUCTORS } from '@/data/content'
import { useCmsContent } from '@/hooks/useCmsContent'

const PILLAR_ICONS = ['/images/icon-mindfulness.png', '/images/icon-discover.png', '/images/icon-meditation.png']

/** Home: who we are, the three pillars, and the two teachers. */
export function Welcome() {
  const { welcome, aboutVinyasa } = useCmsContent()

  return (
    <section className="py-20 sm:py-28">
      <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <Reveal>
            <h2 className="text-4xl leading-[1.08] sm:text-5xl lg:text-[3.5rem]">{welcome.title}</h2>
            <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-forest-800/85">{welcome.body}</p>
          </Reveal>

          <ul className="mt-12 grid gap-8 sm:grid-cols-3 sm:gap-6">
            {aboutVinyasa.pillars.map((p, i) => (
              <li key={p.title}>
                <Reveal delay={i * 0.08}>
                  <img src={PILLAR_ICONS[i % PILLAR_ICONS.length]} alt="" aria-hidden="true" width={48} height={48} loading="lazy" className="h-11 w-auto" />
                  <h3 className="mt-4 text-2xl">{p.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-forest-800/75">{p.text}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-5">
          <div className="grid grid-cols-2 gap-5 sm:gap-6 lg:mt-4">
            {INSTRUCTORS.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.12} className={i === 1 ? 'mt-12 sm:mt-16' : ''}>
                <Link to="/teachers" className="group block">
                  <div className="arch overflow-hidden bg-cream-200 shadow-soft">
                    <img
                      src={t.imageSmall}
                      srcSet={`${t.imageSmall} 480w, ${t.image} 800w`}
                      sizes="(min-width: 1024px) 220px, 45vw"
                      width={480}
                      height={480}
                      alt={`Portrait of ${t.name}`}
                      loading="lazy"
                      className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  <p className="mt-4 font-serif text-xl text-forest-900 sm:text-2xl">{t.name}</p>
                  <p className="text-sm text-forest-800/70">{t.role}</p>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10">
            <Link to="/teachers" className="group inline-flex items-center gap-2 font-semibold text-forest-800 hover:text-forest-900">
              <span className="link-underline">Meet your teachers</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
