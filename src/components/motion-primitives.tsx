import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useInView, useReducedMotion } from 'framer-motion'

/** Lazily computed once — never re-runs matchMedia on re-renders */
const IS_TOUCH_DEVICE =
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: none) and (pointer: coarse)').matches

/** Card that tilts in 3D following the cursor — disabled on touch devices */
export function TiltCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rx = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 160, damping: 20 })
  const ry = useSpring(useTransform(mx, [0, 1], [-6, 6]), { stiffness: 160, damping: 20 })

  // On touch devices just render a plain div — no GPU-heavy 3D transforms
  if (IS_TOUCH_DEVICE) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d', perspective: 900 }}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect()
        mx.set((e.clientX - r.left) / r.width)
        my.set((e.clientY - r.top) / r.height)
      }}
      onMouseLeave={() => { mx.set(0.5); my.set(0.5) }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/** Organic Zen reveal — content floats upward with a gentle drift */
export function Reveal({
  children, className = '', delay = 0,
}: { children: ReactNode; className?: string; delay?: number }) {
  const prefersReduced = useReducedMotion()
  const skip = IS_TOUCH_DEVICE || prefersReduced
  return (
    <motion.div
      initial={skip ? {} : { opacity: 0, y: 48 }}
      whileInView={skip ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}


/** Section eyebrow + heading with drawn underline */
export function SectionHeading({
  eyebrow, title, dark = false,
}: { eyebrow: string; title: string; dark?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const prefersReduced = useReducedMotion()
  return (
    <div ref={ref} className="text-center mb-14">
      <motion.p
        initial={{ opacity: 0, letterSpacing: prefersReduced ? '0.3em' : '0.6em' }}
        animate={inView ? { opacity: 1, letterSpacing: '0.3em' } : {}}
        transition={{ duration: 0.8 }}
        className={`uppercase text-xs font-semibold tracking-[0.3em] mb-3 ${dark ? 'text-amber-200/80' : 'text-amber-500'}`}
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1 }}
        className={`font-serif text-4xl md:text-5xl ${dark ? 'text-cream-50' : 'text-forest-800'}`}
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: prefersReduced ? 0 : 0.8, delay: 0.3 }}
        className="mx-auto mt-5 h-[3px] w-24 origin-center rounded-full bg-gradient-to-r from-amber-300 via-amber-400 to-forest-400"
      />
    </div>
  )
}

export function Stars({ n = 5, className = 'h-4 w-4' }: { n?: number; className?: string }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: n }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" fill="#FBBC04" className={className}>
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  )
}

export function GoogleG({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38z" />
    </svg>
  )
}
