/**
 * PostHog analytics hook.
 * Drop your PostHog API key below and analytics will start flowing.
 * Get it at https://us.posthog.com/project/settings
 */
import { useEffect } from 'react'
import { useLocation } from 'react-router'

const POSTHOG_KEY = 'phx_Rko7QZZeshUper7vKWFznE5UDD8AdFfC4yiUHuvWUGTgyX85'

export function usePostHog() {
  const { pathname } = useLocation()

  useEffect(() => {
    if (!POSTHOG_KEY) return

    import('posthog-js').then((posthog) => {
      posthog.default.init(POSTHOG_KEY, {
        api_host: 'https://us.i.posthog.com',
        person_profiles: 'identified_only',
        loaded: () => posthog.default.capture('$pageview')
      })
    })
  }, [])

  /* Capture pageviews on route change */
  useEffect(() => {
    if (!POSTHOG_KEY) return
    import('posthog-js').then((posthog) => {
      posthog.default.capture('$pageview')
    })
  }, [pathname])
}
