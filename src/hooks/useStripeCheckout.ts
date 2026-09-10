import { useState, useCallback } from 'react'
import { STRIPE_CONFIG } from '@/config'
import { useCmsContent } from '@/hooks/useCmsContent'

export type CheckoutState = 'idle' | 'demo' | 'error'

/**
 * Stripe checkout:
 * Dynamically uses the live Payment Link updated from the Mobile Admin App (via CMS),
 * falling back to config.ts defaults, or opening demo checkout if none configured.
 */
export function useStripeCheckout() {
  const { stripe } = useCmsContent()
  const [demoCourse, setDemoCourse] = useState<string | null>(null)

  const buy = useCallback((courseId: string) => {
    // Check dynamic CMS payment link first, then fallback to STRIPE_CONFIG
    const dynamicLinks = stripe?.paymentLinks as Record<string, string> | undefined
    const link = dynamicLinks?.[courseId] || STRIPE_CONFIG.paymentLinks[courseId]

    if (link && link.startsWith('http')) {
      window.location.href = link
      return
    }

    // No link configured → demo checkout
    setDemoCourse(courseId)
  }, [stripe])

  const closeDemo = useCallback(() => {
    setDemoCourse(null)
  }, [])

  return { buy, demoCourse, closeDemo }
}

