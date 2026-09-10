import { Reveal, SectionHeading } from '@/components/motion-primitives'
import { INSTRUCTORS } from '@/data/content'

export default function Instructors() {
  return (
    <section id="teachers" className="relative py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading eyebrow="About Us" title="Who We Are & What We Stand For" />
        <div className="space-y-20">
          {INSTRUCTORS.map((t, i) => (
            <TeacherRow key={t.name} teacher={t} flip={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TeacherRow({
  teacher,
  flip,
}: {
  teacher: (typeof INSTRUCTORS)[number]
  flip: boolean
}) {
  return (
    <div className={`grid md:grid-cols-2 gap-10 items-center ${flip ? 'md:[&>*:first-child]:order-2' : ''}`}>
      <div className="relative mx-auto w-64 sm:w-72 md:w-80">
        <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-amber-300/40 via-amber-200/30 to-forest-200/40 blur-xl" />
        <div className="relative aspect-square w-full rounded-full p-2 bg-white shadow-2xl shadow-forest-900/20">
          <img
            src={teacher.image}
            alt={teacher.name}
            loading="lazy"
            decoding="async"
            className="aspect-square w-full rounded-full object-cover"
          />
        </div>
        <img src="/images/lotus.png" alt="" className="absolute -bottom-4 -right-4 w-16 sm:w-20 rotate-12 drop-shadow-xl pointer-events-none" />
      </div>
      <div>
        <Reveal>
          <p className="uppercase tracking-[0.3em] text-xs font-semibold text-amber-600">{teacher.role}</p>
          <h3 className="mt-2 font-serif text-3xl sm:text-4xl text-forest-900">{teacher.name}</h3>
          <div className="mt-4 h-[3px] w-16 rounded-full gold-click bg-gradient-to-r from-amber-400 to-forest-400" />
          <p className="mt-5 leading-relaxed text-forest-800/85 text-sm sm:text-base">{teacher.bio}</p>
        </Reveal>
      </div>
    </div>
  )
}
