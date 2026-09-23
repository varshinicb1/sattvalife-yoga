/**
 * The address the site should be known by.
 *
 * Until sattvalife.yoga points at Firebase this stays on the web.app host, so
 * canonical tags and share links never point at a domain serving the old site.
 * Run `node scripts/set-domain.mjs https://sattvalife-yoga.web.app` at cutover: it
 * updates this constant, index.html, the sitemap, robots.txt and the RSS feed.
 */
export const CANONICAL_ORIGIN = 'https://sattvalife-yoga.web.app'

/** Firebase keeps serving the web.app address; send it to the real domain once there is one. */
export function redirectToCanonicalHost() {
  if (typeof window === 'undefined') return
  const { origin, pathname, search, hash } = window.location
  if (origin === CANONICAL_ORIGIN) return
  if (!/\.web\.app$|\.firebaseapp\.com$/.test(window.location.hostname)) return
  if (CANONICAL_ORIGIN.includes('web.app')) return // no custom domain yet
  window.location.replace(CANONICAL_ORIGIN + pathname + search + hash)
}
