import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router'
import { Cookie, ShieldCheck, X } from 'lucide-react'

export default function CookieConsent() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('sattvalife_cookie_consent')
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 1200)
      return () => clearTimeout(timer)
    }
  }, [])

  const acceptAll = () => {
    localStorage.setItem('sattvalife_cookie_consent', 'accepted')
    setShow(false)
  }

  const declineNonEssential = () => {
    localStorage.setItem('sattvalife_cookie_consent', 'essential_only')
    setShow(false)
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-5 left-5 right-5 z-50 mx-auto max-w-2xl"
        >
          <div className="rounded-3xl border border-cream-200/60 bg-cream-50/95 backdrop-blur-xl p-6 sm:p-7 shadow-2xl shadow-forest-950/20 text-forest-900">
            <div className="flex items-start gap-4">
              <div className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600">
                <Cookie className="h-6 w-6" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-xl text-forest-900 flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-forest-700 sm:hidden" />
                    Cookie & Privacy Preferences
                  </h3>
                  <button
                    onClick={declineNonEssential}
                    className="text-forest-700/50 hover:text-forest-900 transition-colors p-1 rounded-lg"
                    aria-label="Close"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-xs sm:text-sm text-forest-800/80 leading-relaxed">
                  We use cookies and privacy-friendly analytics to deliver our yoga class booking experience and improve our services under the <strong>UK GDPR</strong> and <strong>PECR</strong> regulations.
                </p>
                <div className="pt-3 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3 text-xs text-forest-700/70">
                    <Link to="/privacy" className="underline hover:text-amber-600 transition-colors">
                      Privacy Policy
                    </Link>
                    <span>·</span>
                    <Link to="/terms" className="underline hover:text-amber-600 transition-colors">
                      Terms of Service
                    </Link>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={declineNonEssential}
                      className="rounded-xl border border-forest-600/30 px-4 py-2 text-xs font-semibold text-forest-800 hover:bg-forest-600/10 active:scale-95 transition-all"
                    >
                      Essential Only
                    </button>
                    <button
                      type="button"
                      onClick={acceptAll}
                      className="rounded-xl gold-click bg-forest-600 px-5 py-2 text-xs font-semibold text-cream-50 hover:bg-forest-500 active:scale-95 shadow-md transition-all"
                    >
                      Accept All
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
