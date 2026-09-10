import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  return (
    <button
      onClick={() => setDark(!dark)}
      className="fixed bottom-6 left-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-cream-50/80 backdrop-blur-md shadow-lg shadow-forest-900/10 border border-forest-200/50 hover:scale-105 transition-all"
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {dark ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5 text-amber-400">
          <circle cx="12" cy="12" r="4.5" /><path d="M12 2v2m0 16v2m-10-10H2m20 0h-2m-3.5-6.5l1.5-1.5m-12 12l1.5-1.5m0-9l-1.5-1.5m12 12l1.5 1.5" strokeLinecap="round" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5 text-forest-700">
          <path d="M21 12.8A9 9 0 1111.2 3a7 7 0 109.8 9.8z" />
        </svg>
      )}
    </button>
  )
}
