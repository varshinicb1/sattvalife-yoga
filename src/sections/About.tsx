import { Reveal, SectionHeading, TiltCard } from '@/components/motion-primitives'
import { JOURNEY } from '@/data/content'
import { useCmsContent } from '@/hooks/useCmsContent'

const PILLAR_ICONS = ['/images/icon-mindfulness.png', '/images/icon-discover.png', '/images/icon-meditation.png']

export function About() {
  const { welcome, aboutVinyasa, images } = useCmsContent()

  return (
    <section id="about" className="relative py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading eyebrow="Sattvalife" title={welcome.title} />
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-lg leading-relaxed text-forest-800/85">{welcome.body}</p>
        </Reveal>

        <div className="mt-24 grid lg:grid-cols-2 gap-14 items-center">
          <Reveal>
            <div className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-amber-300/30 to-forest-200/40 blur-2xl" />
              <img
                src={images.poseImage}
                alt="Vinyasa yoga pose"
                loading="lazy"
                decoding="async"
                className="relative rounded-[2rem] shadow-2xl shadow-forest-900/20 w-full object-cover border-4 border-white aspect-[16/10]"
              />
              <div className="absolute -bottom-6 -right-4 glass rounded-2xl px-5 py-3 shadow-xl">
                <p className="font-serif text-forest-800 text-lg leading-tight">Vinyasa = Flow</p>
                <p className="text-xs text-forest-700/70">poses run smoothly together</p>
              </div>
            </div>
          </Reveal>
          <div>
            <Reveal>
              <h3 className="font-serif text-4xl text-forest-900 mb-5">{aboutVinyasa.title}</h3>
              <p className="text-forest-800/85 leading-relaxed">{aboutVinyasa.body}</p>
            </Reveal>
            <div className="mt-9 grid gap-4">
              {aboutVinyasa.pillars.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.12}>
                  <TiltCard>
                    <div className="glass rounded-2xl p-5 flex gap-5 items-start shadow-lg shadow-forest-900/5 hover:shadow-xl transition-shadow">
                      <div className="shrink-0 rounded-xl gold-click bg-forest-600/10 p-3">
                        <img src={PILLAR_ICONS[i]} alt="" loading="lazy" decoding="async" className="h-9 w-9" />
                      </div>
                      <div>
                        <h4 className="font-serif text-2xl text-forest-900">{p.title}</h4>
                        <p className="mt-1 text-sm leading-relaxed text-forest-800/75">{p.text}</p>
                      </div>
                    </div>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Journey() {
  const { images } = useCmsContent()

  return (
    <section className="relative py-16 md:py-20 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-forest-600" />
      <div
        className="absolute inset-0 opacity-15 bg-cover bg-center"
        style={{ backgroundImage: `url(${images.aboutBgImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-forest-900/60 via-transparent to-forest-900/60" />
      <div className="relative mx-auto max-w-6xl px-5 text-center">
        <Reveal>
          <p className="font-serif italic text-2xl md:text-3xl text-cream-100/95 max-w-3xl mx-auto leading-snug">
            “{JOURNEY.quote}”
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <h3 className="mt-14 font-serif text-4xl md:text-5xl text-cream-50">{JOURNEY.title}</h3>
          {JOURNEY.body.map((t) => (
            <p key={t.slice(0, 20)} className="mt-5 max-w-3xl mx-auto text-cream-100/85 leading-relaxed">
              {t}
            </p>
          ))}
        </Reveal>
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-5">
          {JOURNEY.stats.map((s, i) => (
            <Reveal key={s} delay={i * 0.1}>
              <TiltCard>
                <div className="rounded-2xl border border-cream-50/25 bg-cream-50/10 backdrop-blur-md px-4 py-7 hover:bg-cream-50/20 transition-colors">
                  <div className="mx-auto mb-3 h-1.5 w-10 rounded-full gold-click bg-lotus-400" />
                  <p className="font-serif text-xl text-cream-50">{s}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
