import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { ReactLenis } from 'lenis/react'
import '@fontsource-variable/cormorant-garamond/wght.css'
import '@fontsource-variable/cormorant-garamond/wght-italic.css'
import '@fontsource-variable/raleway/wght.css'
import './index.css'
import App from './App.tsx'
import { ErrorBoundary } from '@/components/ErrorBoundary'

/*
 * Service worker (offline fallback + fresh deploys). Only reload when a *new*
 * worker replaces an existing one; a first-time visitor must never be reloaded.
 */
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  const hadController = !!navigator.serviceWorker.controller
  let reloaded = false
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!hadController || reloaded) return
    reloaded = true
    window.location.reload()
  })
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((reg) => reg.update())
      .catch(() => {
        /* not fatal: the site works without a service worker */
      })
  })
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <ReactLenis root options={{ lerp: 0.1, smoothWheel: !prefersReducedMotion, wheelMultiplier: 1 }}>
          <App />
        </ReactLenis>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
)
