import { useSyncExternalStore } from 'react'

/** Cookie / analytics consent, persisted in localStorage and shared across components. */
export type Consent = 'accepted' | 'essential_only' | null

const KEY = 'sattvalife_cookie_consent'

function read(): Consent {
  try {
    const v = localStorage.getItem(KEY)
    return v === 'accepted' || v === 'essential_only' ? v : null
  } catch {
    return null
  }
}

let current: Consent = typeof window === 'undefined' ? null : read()
const listeners = new Set<() => void>()

export function getConsent(): Consent {
  return current
}

export function setConsent(value: Exclude<Consent, null>) {
  current = value
  try {
    localStorage.setItem(KEY, value)
  } catch {
    /* private mode: keep the in-memory choice for this visit */
  }
  listeners.forEach((l) => l())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function useConsent(): Consent {
  return useSyncExternalStore(subscribe, getConsent, getConsent)
}
