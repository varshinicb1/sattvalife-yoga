/**
 * ─────────────────────────────────────────────────────────────
 *  SATTIVALIFE — LIVE INTEGRATION CONFIG
 *  Stripe products & Payment Links are live in test mode.
 * ─────────────────────────────────────────────────────────────
 */

export const STRIPE_CONFIG = {
  /** Stripe publishable key (test mode) */
  publishableKey: 'pk_test_51TuhJDAlkjSuhXu6jKXDx3xInfPIS47pCkth3S4vp3iP6nWJt99MFeyzNGWWh3AGF8I0mN80XHsF4e44SLlWiKmu00X7CEpfZf',

  /** Price IDs for Stripe.js checkout (fallback if Payment Links ever change) */
  prices: {
    dropIn: 'price_1TukEeAlkjSuhXu6VclB8RS9',
    monthly: 'price_1TukEeAlkjSuhXu6KH26Ylvr',
    corporate: 'price_1TukEfAlkjSuhXu6WEQxl28w',
  } as Record<string, string>,

  /** Payment Links — Buy buttons deep-link straight to Stripe-hosted checkout */
  paymentLinks: {
    dropIn: 'https://buy.stripe.com/test_6oUfZg5PJ5tJ2Hl3v09sk00',
    monthly: 'https://buy.stripe.com/test_bJe6oG91VcWb81F4z49sk01',
    corporate: 'https://buy.stripe.com/test_14A28qa5Z09pfu78Pk9sk02',
  } as Record<string, string>,

  currency: 'gbp',
  successUrl: window.location.origin + '/?checkout=success',
  cancelUrl: window.location.origin + '/?checkout=cancelled',
}

export const GOOGLE_REVIEWS_CONFIG = {
  endpoint: 'https://sattvalife-cms.cbvarshini1.workers.dev/api/reviews',
  refreshInterval: 30_000,
  fallbackRating: 5.0,
  fallbackTotal: 62,
  googleMapsUrl:
    'https://www.google.com/maps/search/Sattvalife+Yoga+Leicester+reviews',
}
