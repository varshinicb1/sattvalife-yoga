import { useEffect, useState, useRef } from 'react'
import { Link, useLocation } from 'react-router'
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion'
import { useCmsContent } from '@/hooks/useCmsContent'

const LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Classes', to: '/courses' },
  { label: 'Timetable', to: '/timetable' },
  { label: 'Teachers', to: '/teachers' },
  { label: 'Pop-Ups & Retreats', to: '/experiences' },
  { label: 'Corporate', to: '/corporate' },
  { label: 'Reviews', to: '/reviews' },
  { label: 'Journal', to: '/blog' },
]

export default function Navbar() {
  const { brand } = useCmsContent()
  const [visible, setVisible] = useState(true)
  const [open, setOpen] = useState(false)
  const lastScroll = useRef(0)
  const { scrollY } = useScroll()
  const { pathname } = useLocation()

  useMotionValueEvent(scrollY, 'change', (curr) => {
    const diff = curr - lastScroll.current
    if (curr < 80) { setVisible(true); lastScroll.current = curr; return }
    if (diff > 12) setVisible(false)
    else if (diff < -12) setVisible(true)
    lastScroll.current = curr
  })

  // Close the mobile menu on navigation — adjusted during render (React's
  // documented pattern for resetting state on prop change) rather than in an
  // effect, so it doesn't trigger an extra commit.
  const [prevPathname, setPrevPathname] = useState(pathname)
  if (pathname !== prevPathname) {
    setPrevPathname(pathname)
    setOpen(false)
  }

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <motion.header
      animate={{ y: visible ? 0 : -120 }}
      initial={{ y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-4 inset-x-4 z-50"
    >
      <div className="mx-auto max-w-7xl rounded-2xl border border-white/40 bg-cream-50/85 backdrop-blur-2xl shadow-glow px-4 sm:px-6 py-2.5 flex items-center justify-between transition-all duration-500">
        <Link to="/" className="group flex items-center gap-3">
          <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400/20 via-cream-50 to-amber-500/15 p-2 shadow-sm border border-amber-400/40 transition-all duration-300 group-hover:scale-105 group-hover:border-amber-400/70">
            <img src="/images/lotus.png" alt={brand.name} className="h-full w-full object-contain drop-shadow-sm transition-transform duration-300 group-hover:rotate-6" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-serif text-xl font-semibold tracking-wide text-forest-900 transition-colors group-hover:text-amber-600">Sattvalife</span>
            <span className="font-sans text-xs font-medium tracking-[0.15em] uppercase text-forest-700/70">Yoga & Wellness</span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-5">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-xs xl:text-sm font-medium transition-colors ${
                pathname === l.to
                  ? 'text-forest-950 font-bold border-b-2 border-amber-400 pb-0.5'
                  : 'text-forest-800/80 hover:text-amber-600'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/courses"
            className="rounded-full gold-click bg-forest-600 px-5 py-2 text-xs xl:text-sm font-semibold text-cream-50 shadow-md hover:bg-forest-500 hover:shadow-lg transition-all ml-2"
          >
            Book a Class
          </Link>
        </nav>

        <button
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="lg:hidden relative z-50 flex h-10 w-10 items-center justify-center rounded-xl text-forest-800"
        >
          <div className="flex flex-col gap-1.5">
            <motion.span animate={open ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }} className="block h-0.5 w-6 rounded-full gold-click bg-forest-700" />
            <motion.span animate={open ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }} className="block h-0.5 w-6 rounded-full gold-click bg-forest-700" />
            <motion.span animate={open ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }} className="block h-0.5 w-6 rounded-full gold-click bg-forest-700" />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12, scaleY: 0.96 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -12, scaleY: 0.96 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden mx-auto max-w-7xl mt-2 rounded-2xl border border-white/40 bg-cream-50/98 backdrop-blur-2xl shadow-2xl overflow-hidden"
          >
            <nav className="flex flex-col gap-1 px-4 py-4">
              {LINKS.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <Link
                    to={l.to}
                    className={`block rounded-xl px-4 py-2.5 text-sm transition-colors ${
                      pathname === l.to ? 'bg-amber-100/70 text-forest-950 font-bold' : 'text-forest-800 hover:bg-forest-100/60'
                    }`}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-2 border-t border-cream-200/80">
                <Link to="/courses" className="block w-full rounded-xl gold-click bg-forest-600 px-4 py-3 text-center text-sm font-semibold text-cream-50 shadow">
                  Book a Class
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
