import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * Fades content up as it enters the viewport (once). Collapses to a plain div
 * under prefers-reduced-motion. `amount` is kept low so tall blocks still trigger.
 */
export function Reveal({
  children,
  className = '',
  delay = 0,
  y = 24,
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/** Section heading: optional eyebrow, serif title, optional intro. Left-aligned by default. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  dark = false,
  as: Tag = 'h2',
  className = '',
}: {
  eyebrow?: string
  title: ReactNode
  intro?: ReactNode
  align?: 'left' | 'center'
  dark?: boolean
  as?: 'h1' | 'h2'
  className?: string
}) {
  const centered = align === 'center'
  return (
    <Reveal className={`${centered ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      {eyebrow && <p className={`eyebrow mb-4 ${dark ? '!text-amber-300' : ''}`}>{eyebrow}</p>}
      <Tag
        className={`text-4xl leading-[1.08] sm:text-5xl lg:text-[3.5rem] ${dark ? '!text-cream-50' : ''}`}
      >
        {title}
      </Tag>
      {intro && (
        <p className={`mt-5 max-w-[60ch] text-lg leading-relaxed ${centered ? 'mx-auto' : ''} ${dark ? 'text-cream-100/80' : 'text-ink-700/80'}`}>
          {intro}
        </p>
      )}
    </Reveal>
  )
}

export function Stars({ n = 5, className = 'h-4 w-4', label }: { n?: number; className?: string; label?: string }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={label ?? `${n} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" aria-hidden="true" fill={i < n ? '#C2A066' : 'none'} stroke="#C2A066" strokeWidth={i < n ? 0 : 1.5} className={className}>
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  )
}

/** Official multicolour Google "G" mark (brand asset, used to attribute reviews). */
export function GoogleG({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38z" />
    </svg>
  )
}

/** Sacred Gold Shiva Trishul mark (Master Brand Asset). */
export function LotusMark({ className = 'h-6 w-auto' }: { className?: string }) {
  return (
    <img
      src="/images/opt/trishul-mark.png"
      width={180}
      height={220}
      alt="Sattvalife Gold Trishul"
      aria-hidden="true"
      className={`${className} object-contain`}
    />
  )
}

export const TrishulMark = LotusMark
