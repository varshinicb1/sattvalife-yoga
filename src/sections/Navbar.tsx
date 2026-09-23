import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { motion, AnimatePresence, useMotionValueEvent, useScroll, useReducedMotion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { BrandIcon } from '@/components/BrandIcon'
import { LotusMark } from '@/components/motion-primitives'
import { CONTACT } from '@/data/content'
import { NAV_LINKS } from '@/lib/nav'
import { useCmsContent, whatsappHref } from '@/hooks/useCmsContent'
import { useScrollLock } from '@/lib/useScrollLock'

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <LotusMark className="h-7 w-auto sm:h-8" />
      <span className="flex flex-col leading-none">
        <span className={`font-serif text-[1.55rem] font-semibold tracking-wide ${light ? 'text-cream-50' : 'text-forest-900'}`}>
          Sattvalife
        </span>
        <span className={`mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.28em] ${light ? 'text-cream-100/70' : 'text-forest-700/80'}`}>
          Yoga &amp; Wellness
        </span>
      </span>
    </span>
  )
}

export default function Navbar() {
  const { settings } = useCmsContent()
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const last = useRef(0)
  const { scrollY } = useScroll()
  const { pathname } = useLocation()
  const reduce = useReducedMotion()
  const toggleRef = useRef<HTMLButtonElement>(null)

  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(y > 12)
    const diff = y - last.current
    if (y < 160) setHidden(false)
    else if (diff > 8) setHidden(true)
    else if (diff < -8) setHidden(false)
    last.current = y
  })

  // Close the mobile menu on navigation (state adjusted during render, React's documented pattern)
  const [prevPath, setPrevPath] = useState(pathname)
  if (pathname !== prevPath) {
    setPrevPath(pathname)
    setOpen(false)
  }

  useScrollLock(open)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const solid = scrolled || open

  return (
    <>
    <motion.header
      animate={{ y: hidden && !open ? '-100%' : '0%' }}
      transition={{ duration: reduce ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-nav transition-[background-color,box-shadow,border-color] duration-300 ${
        solid ? 'border-b border-forest-900/[0.06] bg-cream-50/90 shadow-[0_8px_24px_-18px_rgb(30_34_21/0.25)] backdrop-blur-xl' : 'border-b border-transparent bg-transparent'
      }`}
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <div className="container-page flex h-[72px] items-center justify-between gap-6">
        <Link to="/" aria-label="Sattvalife Yoga, home" className="shrink-0 rounded-lg">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-6 lg:flex xl:gap-8">
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `relative py-2 text-[0.92rem] font-medium transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-amber-500 after:transition-transform after:duration-300 ${
                  isActive
                    ? 'text-forest-900 after:scale-x-100'
                    : 'text-forest-800/75 after:scale-x-0 hover:text-forest-900 hover:after:scale-x-100'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/courses" className="btn-primary hidden !px-5 !py-2.5 !text-sm sm:inline-flex">
            Book a class
          </Link>
          <button
            ref={toggleRef}
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
            className="flex h-11 w-11 items-center justify-center rounded-full text-forest-900 transition-colors hover:bg-forest-900/5 lg:hidden"
          >
            {open ? <X className="h-6 w-6" strokeWidth={1.6} /> : <Menu className="h-6 w-6" strokeWidth={1.6} />}
          </button>
        </div>
      </div>
    </motion.header>

      {/*
        The panel must live OUTSIDE <motion.header>: the header animates `y`, and a
        transformed ancestor becomes the containing block for fixed children, which
        collapsed this overlay to zero height (menu invisible on mobile).
      */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.25 }}
            className="fixed inset-0 z-[39] overflow-y-auto overscroll-contain bg-cream-50 pt-[calc(72px+env(safe-area-inset-top))] lg:hidden"
            data-lenis-prevent
          >
            <nav aria-label="Mobile" className="container-page flex min-h-full flex-col pb-10 pt-6">
              <ul className="divide-y divide-forest-900/[0.07] border-y border-forest-900/[0.07]">
                {[{ label: 'Home', to: '/' }, ...NAV_LINKS].map((l, i) => (
                  <motion.li
                    key={l.to}
                    initial={reduce ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <NavLink
                      to={l.to}
                      end={l.to === '/'}
                      className={({ isActive }) =>
                        `flex items-center justify-between py-3.5 font-serif text-[1.9rem] leading-tight ${isActive ? 'text-amber-700' : 'text-forest-900'}`
                      }
                    >
                      {l.label}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-8 grid gap-3">
                <Link to="/courses" className="btn-primary btn-lg w-full">
                  Book a class
                </Link>
                <a href={whatsappHref(settings.whatsappNumber)} target="_blank" rel="noreferrer" className="btn-outline btn-lg w-full">
                  <BrandIcon name="whatsapp" className="h-5 w-5" /> Message us on WhatsApp
                </a>
              </div>
              <div className="mt-auto flex items-center gap-3 pt-10">
                <a href={CONTACT.instagram} target="_blank" rel="noreferrer" aria-label="Sattvalife on Instagram" className="flex h-11 w-11 items-center justify-center rounded-full border border-forest-900/10 text-forest-800">
                  <BrandIcon name="instagram" className="h-5 w-5" />
                </a>
                <a href={CONTACT.facebook} target="_blank" rel="noreferrer" aria-label="Sattvalife on Facebook" className="flex h-11 w-11 items-center justify-center rounded-full border border-forest-900/10 text-forest-800">
                  <BrandIcon name="facebook" className="h-5 w-5" />
                </a>
                <a href={`mailto:${settings.contactEmail}`} className="ml-2 text-sm text-forest-800/80 underline-offset-4 hover:underline">
                  {settings.contactEmail}
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
