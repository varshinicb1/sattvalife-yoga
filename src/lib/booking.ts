import type { Course } from '@/data/content'

/**
 * Builds the Stripe Payment Link URL for a plan.
 *
 * Payment Links accept `client_reference_id` (shown on the payment in the Stripe
 * dashboard) and `prefilled_email`, so we can pass the chosen class date through
 * without any backend.
 */
export function paymentLinkFor(
  links: Record<Course['id'], string>,
  courseId: Course['id'],
  opts: { reference?: string; email?: string } = {},
): string | null {
  const base = links[courseId]
  if (!base || !/^https:\/\/(buy|checkout)\.stripe\.com\//.test(base)) return null
  const url = new URL(base)
  if (opts.reference && /^[\w-]{1,200}$/.test(opts.reference)) url.searchParams.set('client_reference_id', opts.reference)
  if (opts.email) url.searchParams.set('prefilled_email', opts.email)
  return url.toString()
}

export const isTestModeLink = (url: string | null) => !!url && url.includes('/test_')
