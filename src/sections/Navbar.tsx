import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { motion, AnimatePresence, useMotionValueEvent, useScroll, useReducedMotion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { BrandIcon } from '@/components/BrandIcon'
import SocialLinks from '@/components/SocialLinks'
import { LotusMark } from '@/components/motion-primitives'
import { NAV_LINKS } from '@/lib/nav'
import { useCmsContent, whatsappHref } from '@/hooks/useCmsContent'
import { useScrollLock } from '@/lib/useScrollLock'

export function Logo({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
  return (
    <span className="flex items-center gap-2 sm:gap-3">
      <LotusMark className={`w-auto transition-all duration-300 ${compact ? 'h-6 xs:h-7 sm:h-8' : 'h-6 xs:h-8 sm:h-11'}`} />
      <span className="flex flex-col leading-none">
        <span
          className={`font-serif font-semibold tracking-[-0.01em] transition-all duration-300 ${
            compact ? 'text-[1.3rem] xs:text-[1.4rem] sm:text-[1.6rem]' : 'text-[1.3rem] xs:text-[1.75rem] sm:text-[2.1rem]'
          } ${light ? 'text-cream-50' : 'text-ink-900'}`}
        >
          Sattvalife
        </span>
        <span
          className={`mt-1 hidden whitespace-nowrap font-semibold uppercase transition-all duration-300 min-[360px]:block ${
            compact ? 'text-[0.55rem] tracking-[0.2em] sm:text-[0.6rem] sm:tracking-[0.3em]' : 'text-[0.52rem] tracking-[0.18em] xs:text-[0.58rem] xs:tracking-[0.24em] sm:text-[0.68rem] sm:tracking-[0.3em]'
          } ${light ? 'text-cream-100/70' : 'text-amber-600'}`}
        >
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
          solid
            ? 'border-b border-forest-900/[0.06] bg-cream-50/92 shadow-[0_8px_24px_-18px_rgb(30_34_21/0.25)] backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
      >
        {/* Slimmer ribbon once scrolled */}
        <div
          className={`container-page flex items-center justify-between gap-6 transition-[height] duration-300 ${
            scrolled ? 'h-[68px]' : 'h-[84px]'
          }`}
        >
          <Link to="/" aria-label="Sattvalife Yoga, home" className="shrink-0 rounded-lg">
            <Logo compact={scrolled} />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  /* Solid ink at rest; the capsule lights up gold on hover and for the current page. */
                  `rounded-full border px-3.5 py-2 text-[0.9rem] font-medium transition-colors duration-200 ${
                    isActive
                      ? 'border-amber-400/50 bg-amber-100 font-semibold text-amber-700'
                      : 'border-transparent text-ink-800 hover:border-amber-300/70 hover:bg-amber-50 hover:text-amber-700'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-3">
            <SocialLinks size="sm" className="hidden xl:flex" />
            <Link
              to="/checkout"
              className="btn-primary !px-3 !py-2.5 !text-[0.68rem] !tracking-[0.04em] xs:!px-5 xs:!text-[0.82rem] xs:!tracking-[0.08em] sm:!px-6 sm:!text-sm"
            >
              BOOK NOW
            </Link>
            <button
              ref={toggleRef}
              type="button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
              className="-mr-1.5 flex h-11 w-10 items-center justify-center rounded-full text-ink-900 transition-colors hover:bg-forest-900/5 sm:-mr-2 sm:w-11 lg:hidden"
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
            className="fixed inset-0 z-[39] overflow-y-auto overscroll-contain bg-cream-50 pt-[calc(84px+env(safe-area-inset-top))] lg:hidden"
            data-lenis-prevent
          >
            <nav aria-label="Mobile" className="container-page flex min-h-full flex-col pb-10 pt-4">
              <ul className="divide-y divide-forest-900/[0.07] border-y border-forest-900/[0.07]">
                {NAV_LINKS.map((l, i) => (
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
                        `flex items-center justify-between py-3.5 font-serif text-[1.8rem] leading-tight ${isActive ? 'text-amber-600' : 'text-ink-900'}`
                      }
                    >
                      {l.label}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-8 grid gap-3">
                <Link to="/checkout" className="btn-primary btn-lg w-full !tracking-[0.08em]">
                  BOOK NOW
                </Link>
                <a href={whatsappHref(settings.whatsappNumber)} target="_blank" rel="noreferrer" className="btn-outline btn-lg w-full">
                  <BrandIcon name="whatsapp" className="h-5 w-5" colored /> Message us on WhatsApp
                </a>
              </div>
              <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-10">
                <SocialLinks />
                <a href={`mailto:${settings.contactEmail}`} className="text-sm text-ink-700/80 underline-offset-4 hover:underline">
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
