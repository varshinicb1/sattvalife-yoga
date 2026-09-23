/**
 * Stripe configuration defaults. The admin app can override every value
 * (Settings → Stripe), so switching to live-mode Payment Links needs no redeploy.
 *
 * NOTE: these defaults are TEST-MODE links (buy.stripe.com/test_...). Real cards
 * are declined in test mode; set live links in the admin app before launch.
 */
export const STRIPE_CONFIG = {
  /** Stripe publishable key (test mode) */
  publishableKey: 'pk_test_51TuhJDAlkjSuhXu6jKXDx3xInfPIS47pCkth3S4vp3iP6nWJt99MFeyzNGWWh3AGF8I0mN80XHsF4e44SLlWiKmu00X7CEpfZf',

  /** Payment Links: Buy buttons deep-link straight to Stripe-hosted checkout */
  paymentLinks: {
    dropIn: 'https://buy.stripe.com/test_6oUfZg5PJ5tJ2Hl3v09sk00',
    monthly: 'https://buy.stripe.com/test_bJe6oG91VcWb81F4z49sk01',
    corporate: 'https://buy.stripe.com/test_14A28qa5Z09pfu78Pk9sk02',
  } as Record<'dropIn' | 'monthly' | 'corporate', string>,

  currency: 'gbp',
}

/**
 * Configure each Payment Link in Stripe (After payment → Redirect) to:
 *   https://sattvalife-yoga.web.app/?checkout=success
 * The site shows a confirmation banner when it sees that parameter.
 */
export const CHECKOUT_RETURN_PARAM = 'checkout'
