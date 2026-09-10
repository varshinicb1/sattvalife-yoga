import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { ReactLenis } from 'lenis/react'
import './index.css'
import App from './App.tsx'
import { ErrorBoundary } from '@/components/ErrorBoundary'

/* Register service worker for PWA — force update on new deployments */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const reg = await navigator.serviceWorker.register('/sw.js')
      // Force update check on every load so stale caches don't persist on mobile
      reg.update()
    } catch {
      // SW registration failed — not fatal
    }
  })

  // When the new SW activates and sends SW_UPDATED, reload once to get fresh assets
  // This fixes users stuck on old pink-logo cached site without any manual action
  navigator.serviceWorker.addEventListener('message', (event) => {
    if (event.data?.type === 'SW_UPDATED') {
      // Small delay so the SW finishes claiming clients before we reload
      setTimeout(() => window.location.reload(), 200)
    }
  })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <ReactLenis root options={{ duration: 1.2, lerp: 0.06, wheelMultiplier: 1, touchMultiplier: 1.2 }}>
          <App />
        </ReactLenis>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
)
