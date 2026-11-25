import { useEffect } from 'react'
import { useLenis } from 'lenis/react'

/**
 * Locks page scrolling while an overlay is open.
 *
 * iOS Safari ignores `overflow: hidden` on <html>/<body> for touch scrolling, so the
 * page keeps moving behind modals. Pinning the body with `position: fixed` at the
 * current offset is the technique that actually holds, and the saved offset is
 * restored on close so the page does not jump to the top.
 *
 * Reference-counted so nested overlays cannot unlock each other.
 */
let locks = 0
let savedY = 0
let savedStyles: Partial<CSSStyleDeclaration> | null = null

export function useScrollLock(active: boolean) {
  const lenis = useLenis()

  useEffect(() => {
    if (!active) return
    locks += 1
    lenis?.stop()

    if (locks === 1) {
      savedY = window.scrollY || document.documentElement.scrollTop || 0
      const body = document.body.style
      savedStyles = { position: body.position, top: body.top, left: body.left, right: body.right, width: body.width, overflow: body.overflow, paddingRight: body.paddingRight }
      // Keep the layout width stable when the scrollbar disappears (desktop)
      const scrollbar = window.innerWidth - document.documentElement.clientWidth
      body.position = 'fixed'
      body.top = `-${savedY}px`
      body.left = '0'
      body.right = '0'
      body.width = '100%'
      body.overflow = 'hidden'
      if (scrollbar > 0) body.paddingRight = `${scrollbar}px`
    }

    return () => {
      locks = Math.max(0, locks - 1)
      if (locks === 0 && savedStyles) {
        const body = document.body.style
        body.position = savedStyles.position ?? ''
        body.top = savedStyles.top ?? ''
        body.left = savedStyles.left ?? ''
        body.right = savedStyles.right ?? ''
        body.width = savedStyles.width ?? ''
        body.overflow = savedStyles.overflow ?? ''
        body.paddingRight = savedStyles.paddingRight ?? ''
        savedStyles = null
        window.scrollTo(0, savedY)
        lenis?.scrollTo(savedY, { immediate: true, force: true })
      }
      lenis?.start()
    }
  }, [active, lenis])
}
