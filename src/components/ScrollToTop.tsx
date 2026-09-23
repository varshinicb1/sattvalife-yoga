import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { useLenis } from 'lenis/react'

/**
 * React Router keeps the previous scroll position between pages; reset it on
 * navigation (or jump to #hash targets) and move focus to <main> for screen readers.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const lenis = useLenis()

  useEffect(() => {
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
    document.getElementById('main')?.focus({ preventScroll: true })
  }, [pathname, hash, lenis])

  return null
}
