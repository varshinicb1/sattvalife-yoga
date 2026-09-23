/**
 * PostHog analytics, loaded only after the visitor accepts cookies (UK GDPR / PECR).
 *
 * Set VITE_POSTHOG_KEY in `.env.local` to a *project* API key (starts with `phc_`).
 * Never use a personal API key (`phx_`) here: it grants account access and would be
 * shipped to every visitor's browser.
 */
import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'
import { useConsent } from '@/lib/consent'

export const POSTHOG_KEY: string = import.meta.env.VITE_POSTHOG_KEY ?? ''
/** Must match the region the PostHog project was created in (US or EU). */
const POSTHOG_HOST: string = import.meta.env.VITE_POSTHOG_HOST ?? 'https://us.i.posthog.com'
export const ANALYTICS_ENABLED = POSTHOG_KEY.startsWith('phc_')

type PostHog = typeof import('posthog-js').default

export function usePostHog() {
  const { pathname } = useLocation()
  const consent = useConsent()
  const client = useRef<PostHog | null>(null)

  useEffect(() => {
    if (!ANALYTICS_ENABLED || consent !== 'accepted' || client.current) return
    let cancelled = false
    import('posthog-js').then(({ default: posthog }) => {
      if (cancelled) return
      posthog.init(POSTHOG_KEY, {
        api_host: POSTHOG_HOST,
        person_profiles: 'identified_only',
        capture_pageview: false,
        persistence: 'localStorage+cookie',
      })
      client.current = posthog
      posthog.capture('$pageview')
    })
    return () => {
      cancelled = true
    }
  }, [consent])

  useEffect(() => {
    client.current?.capture('$pageview')
  }, [pathname])
}
