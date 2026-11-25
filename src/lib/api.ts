import { CMS_API_BASE } from '@/hooks/useCmsContent'

/** Name of a hidden field real people never fill in. Bots usually do. */
export const HONEYPOT = 'company_website'

export class SubmitError extends Error {}

/**
 * POSTs a public form to the CMS Worker with a timeout.
 * Returns silently for honeypot hits so bots see "success".
 */
export async function submitForm(path: string, body: Record<string, unknown>, timeoutMs = 15000) {
  if (typeof body[HONEYPOT] === 'string' && body[HONEYPOT]) return
  const payload = { ...body }
  delete payload[HONEYPOT]

  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), timeoutMs)
  try {
    const res = await fetch(`${CMS_API_BASE}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: ctrl.signal,
    })
    if (!res.ok) {
      let message = ''
      try {
        message = ((await res.json()) as { error?: string }).error ?? ''
      } catch {
        /* non-JSON error body */
      }
      throw new SubmitError(message || `The server returned ${res.status}.`)
    }
  } catch (err) {
    if (err instanceof SubmitError) throw err
    throw new SubmitError(
      ctrl.signal.aborted
        ? 'This is taking longer than expected. Please check your connection and try again.'
        : 'We could not reach our server. Please check your connection and try again.',
    )
  } finally {
    clearTimeout(timer)
  }
}
