import type { ReactNode } from 'react'
import { Reveal } from '@/components/motion-primitives'

/** Top of every inner page: clears the fixed nav, sets the H1 and a short lead. */
export default function PageHero({
  eyebrow,
  title,
  intro,
  children,
  aside,
}: {
  eyebrow?: string
  title: ReactNode
  intro?: ReactNode
  children?: ReactNode
  aside?: ReactNode
}) {
  return (
    <section className="relative overflow-hidden pt-[calc(72px+env(safe-area-inset-top))]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(50rem_30rem_at_90%_0%,rgb(203_208_173/0.35),transparent_60%)]" />
      <div className={`container-page relative grid gap-10 pb-12 pt-12 sm:pb-16 sm:pt-16 ${aside ? 'lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16' : ''}`}>
        <Reveal className="max-w-3xl">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1 className={`${eyebrow ? 'mt-4' : ''} pb-1 text-[2.9rem] leading-[1.05] tracking-[-0.015em] sm:text-6xl lg:text-7xl`}>{title}</h1>
          {intro && <p className="lead mt-6 max-w-[58ch]">{intro}</p>}
          {children && <div className="mt-8">{children}</div>}
        </Reveal>
        {aside && <Reveal delay={0.1}>{aside}</Reveal>}
      </div>
    </section>
  )
}
