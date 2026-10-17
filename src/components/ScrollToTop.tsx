import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'
import { useLenis } from 'lenis/react'

/**
 * React Router keeps the previous scroll position between pages; reset it on
 * navigation (or jump to #hash targets) and move focus to <main> for screen readers.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const lenis = useLenis()
  /*
   * Tracks the location we last handled. Moving focus into <main> is right after
   * a route change, but wrong on first load: it puts the skip link and the whole
   * header behind the visitor's first Tab, so a keyboard user can never reach the
   * navigation going forwards. Comparing against the last location also survives
   * this effect re-running when `lenis` arrives a tick after mount.
   */
  const lastLocation = useRef<string | null>(null)

  useEffect(() => {
    const location = pathname + hash
    const navigated = lastLocation.current !== null && lastLocation.current !== location
    lastLocation.current = location

    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (el) {
        // Wait a frame so the new page has rendered
        requestAnimationFrame(() => {
          if (lenis) lenis.scrollTo(el, { offset: -88 })
          else el.scrollIntoView()
        })
        return
      }
    }
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true })
    else window.scrollTo(0, 0)
    if (navigated) document.getElementById('main')?.focus({ preventScroll: true })
  }, [pathname, hash, lenis])

  return null
}
