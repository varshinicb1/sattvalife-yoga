import { Reveal } from '@/components/motion-primitives'
import { INSTRUCTORS, type Instructor } from '@/data/content'

function TeacherProfile({ teacher, flip }: { teacher: Instructor; flip: boolean }) {
  return (
    <article className="grid items-center gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
      <Reveal className={flip ? 'md:order-2' : ''}>
        <div className="arch mx-auto max-w-sm overflow-hidden bg-cream-200 shadow-lift">
          <img
            src={teacher.image}
            srcSet={`${teacher.imageSmall} 480w, ${teacher.image} 800w`}
            sizes="(min-width: 768px) 380px, 90vw"
            width={800}
            height={800}
            alt={`Portrait of ${teacher.name}`}
            loading="lazy"
            className="aspect-[4/5] w-full object-cover"
          />
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">{teacher.role}</p>
        <h2 className="mt-3 text-4xl sm:text-5xl">{teacher.name}</h2>
        <blockquote className="mt-6 border-l-2 border-amber-400 pl-5 font-serif text-2xl italic leading-snug text-forest-700">
          “{teacher.quote}”
        </blockquote>
        <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-forest-800/85">{teacher.bio}</p>
      </Reveal>
    </article>
  )
}

export function TeacherProfiles() {
  return (
    <div className="space-y-24 sm:space-y-32">
      {INSTRUCTORS.map((t, i) => (
        <TeacherProfile key={t.name} teacher={t} flip={i % 2 === 1} />
      ))}
    </div>
  )
}
