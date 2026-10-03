import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router'
import { setConsent, useConsent } from '@/lib/consent'
import { ANALYTICS_ENABLED } from '@/hooks/usePostHog'

/**
 * Only shown when optional analytics is configured: the site sets no
 * non-essential cookies otherwise, so there is nothing to consent to (PECR).
 * "Reject" is given the same prominence as "Accept", per ICO guidance.
 */
export default function CookieConsent() {
  const consent = useConsent()
  const reduce = useReducedMotion()
  const show = ANALYTICS_ENABLED && consent === null

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="region"
          aria-label="Cookie preferences"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-3 bottom-[calc(0.75rem+env(safe-area-inset-bottom))] z-banner mx-auto max-w-xl sm:inset-x-5"
          data-print-hide
        >
          <div className="rounded-3xl border border-forest-900/10 bg-cream-50/95 p-5 shadow-lift backdrop-blur-xl sm:p-6">
            <p className="font-serif text-xl text-ink-900">Cookies</p>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-700/85">
              We would like to use analytics cookies to understand how visitors use this site so we can improve it. They are only set if you accept.{' '}
              <Link to="/privacy" className="link-underline">
                Privacy policy
              </Link>
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <button type="button" onClick={() => setConsent('essential_only')} className="btn-outline !py-2.5">
                Reject
              </button>
              <button type="button" onClick={() => setConsent('accepted')} className="btn-primary !py-2.5">
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
