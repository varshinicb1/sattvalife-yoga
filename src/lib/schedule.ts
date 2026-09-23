import type { Venue } from '@/data/content'

/** "18:30" → "6:30pm" */
export function formatTime(hhmm: string): string {
  const [h, m] = hhmm.split(':').map(Number)
  const suffix = h >= 12 ? 'pm' : 'am'
  const h12 = h % 12 || 12
  return m ? `${h12}:${String(m).padStart(2, '0')}${suffix}` : `${h12}${suffix}`
}

export function formatRange(v: Pick<Venue, 'start' | 'end'>): string {
  return `${formatTime(v.start)} to ${formatTime(v.end)}`
}

function atTime(date: Date, hhmm: string): Date {
  const [h, m] = hhmm.split(':').map(Number)
  const d = new Date(date)
  d.setHours(h, m, 0, 0)
  return d
}

/**
 * Upcoming class start times for a weekly venue. Today's class is included
 * until it has finished.
 */
export function nextSessions(venue: Venue, count = 4, from = new Date()): Date[] {
  const out: Date[] = []
  const cursor = new Date(from)
  cursor.setHours(0, 0, 0, 0)
  const diff = (venue.dayIndex - cursor.getDay() + 7) % 7
  cursor.setDate(cursor.getDate() + diff)
  if (atTime(cursor, venue.end) <= from) cursor.setDate(cursor.getDate() + 7)
  while (out.length < count) {
    out.push(atTime(cursor, venue.start))
    cursor.setDate(cursor.getDate() + 7)
  }
  return out
}

export function formatSessionDate(d: Date, opts: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long' }): string {
  return d.toLocaleDateString('en-GB', opts)
}

/** "Today", "Tomorrow" or "Tue 23 Sep" */
export function relativeDay(d: Date, now = new Date()): string {
  const a = new Date(d); a.setHours(0, 0, 0, 0)
  const b = new Date(now); b.setHours(0, 0, 0, 0)
  const days = Math.round((a.getTime() - b.getTime()) / 86_400_000)
  if (days === 0) return 'Today'
  if (days === 1) return 'Tomorrow'
  return formatSessionDate(d, { weekday: 'short', day: 'numeric', month: 'short' })
}

/** Stable, URL-safe id for a session, e.g. "tue-2026-09-22" (used as Stripe client_reference_id). */
export function sessionId(venue: Venue, d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${venue.id}-${y}-${m}-${day}`
}

const pad = (n: number) => String(n).padStart(2, '0')
const icsLocal = (d: Date) =>
  `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`
const icsEscape = (s: string) => s.replace(/[\\;,]/g, (c) => `\\${c}`)

/** Europe/London VTIMEZONE so calendar apps handle GMT/BST correctly. */
const LONDON_TZ = [
  'BEGIN:VTIMEZONE',
  'TZID:Europe/London',
  'BEGIN:DAYLIGHT',
  'TZOFFSETFROM:+0000',
  'TZOFFSETTO:+0100',
  'TZNAME:BST',
  'DTSTART:19700329T010000',
  'RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU',
  'END:DAYLIGHT',
  'BEGIN:STANDARD',
  'TZOFFSETFROM:+0100',
  'TZOFFSETTO:+0000',
  'TZNAME:GMT',
  'DTSTART:19701025T020000',
  'RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU',
  'END:STANDARD',
  'END:VTIMEZONE',
]

/** Builds an .ics file for a weekly recurring class starting on `first`. */
export function buildIcs(venue: Venue, first: Date): string {
  const end = atTime(first, venue.end)
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Sattvalife Yoga//Timetable//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    ...LONDON_TZ,
    'BEGIN:VEVENT',
    `UID:${sessionId(venue, first)}@sattvalife.yoga`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
    `DTSTART;TZID=Europe/London:${icsLocal(first)}`,
    `DTEND;TZID=Europe/London:${icsLocal(end)}`,
    'RRULE:FREQ=WEEKLY',
    `SUMMARY:${icsEscape(`Sattvalife Yoga: ${venue.day} Vinyasa flow`)}`,
    `LOCATION:${icsEscape(`${venue.hall}, ${venue.postcode}`)}`,
    `DESCRIPTION:${icsEscape('Bring water and comfortable clothes. Mats and props are provided. Book at https://sattvalife-yoga.web.app/courses')}`,
    'BEGIN:VALARM',
    'TRIGGER:-PT2H',
    'ACTION:DISPLAY',
    'DESCRIPTION:Yoga in 2 hours',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ]
  return lines.join('\r\n')
}

export function downloadIcs(venue: Venue, first: Date) {
  const blob = new Blob([buildIcs(venue, first)], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `sattvalife-${venue.day.toLowerCase()}-yoga.ics`
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
