import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router'
import { CheckCircle2, X } from 'lucide-react'
import { CHECKOUT_RETURN_PARAM } from '@/config'

/**
 * Shown when Stripe redirects back with ?checkout=success or ?checkout=cancelled.
 * Reads the param once on load, then strips it from the URL.
 */
export default function CheckoutNotice() {
  const [status] = useState<'success' | 'cancelled' | null>(() => {
    const v = new URLSearchParams(window.location.search).get(CHECKOUT_RETURN_PARAM)
    return v === 'success' || v === 'cancelled' ? v : null
  })
  const [open, setOpen] = useState(status !== null)

  useEffect(() => {
    if (!status) return
    const url = new URL(window.location.href)
    url.searchParams.delete(CHECKOUT_RETURN_PARAM)
    window.history.replaceState(window.history.state, '', url.pathname + url.search + url.hash)
    const t = setTimeout(() => setOpen(false), status === 'success' ? 15000 : 8000)
    return () => clearTimeout(t)
  }, [status])

  return (
    <AnimatePresence>
      {open && status && (
        <motion.div
          role="status"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          className="fixed inset-x-3 top-[calc(96px+env(safe-area-inset-top))] z-toast mx-auto max-w-lg"
        >
          <div className="flex items-start gap-4 rounded-3xl border border-forest-900/10 bg-white p-5 shadow-lift">
            <CheckCircle2 className={`mt-0.5 h-6 w-6 shrink-0 ${status === 'success' ? 'text-forest-600' : 'text-amber-600'}`} />
            <div className="flex-1">
              {status === 'success' ? (
                <>
                  <p className="font-serif text-xl text-ink-900">Payment received. See you on the mat!</p>
                  <p className="mt-1 text-[0.95rem] text-ink-700/80">
                    Stripe has emailed your receipt. New to Sattvalife? Please complete the{' '}
                    <Link to="/registration" onClick={() => setOpen(false)} className="link-underline font-semibold">
                      registration form
                    </Link>{' '}
                    before your first class.
                  </p>
                </>
              ) : (
                <>
                  <p className="font-serif text-xl text-ink-900">Checkout cancelled</p>
                  <p className="mt-1 text-[0.95rem] text-ink-700/80">No payment was taken. You can book again whenever you are ready.</p>
                </>
              )}
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Dismiss" className="-m-1 rounded-full p-1 text-ink-600 hover:bg-forest-900/5">
              <X className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
