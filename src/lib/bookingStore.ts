import { useSyncExternalStore } from 'react'
import type { Course, Venue } from '@/data/content'

/** Which plan the booking sheet is open for (null = closed). Shared so any page can open it. */
export interface BookingRequest {
  courseId: Course['id']
  /** Preselect a venue's next session (from the timetable). */
  venueId?: Venue['id']
}

let current: BookingRequest | null = null
const listeners = new Set<() => void>()

export function openBooking(req: BookingRequest) {
  current = req
  listeners.forEach((l) => l())
}

export function closeBooking() {
  current = null
  listeners.forEach((l) => l())
}

function subscribe(l: () => void) {
  listeners.add(l)
  return () => {
    listeners.delete(l)
  }
}

export function useBookingRequest() {
  return useSyncExternalStore(subscribe, () => current, () => current)
}
