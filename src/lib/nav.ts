/**
 * Top-bar routes, in the order the client's brief names them. Home is an
 * explicit link as well as a clickable logo, so there is always an obvious way
 * back from an internal page. Reviews and Journal live in the footer to keep the
 * bar on one line.
 */
export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Classes', to: '/classes' },
  { label: 'Posture Lab', to: '/posture-lab' },
  { label: 'Experiences', to: '/experiences' },
  { label: 'Corporate Wellness', to: '/corporate' },
  { label: 'About', to: '/teachers' },
  { label: 'Contact', to: '/contact' },
]

/** Footer "Explore" column. */
export const FOOTER_EXPLORE = [
  { label: 'Classes & Timetable', to: '/classes' },
  { label: 'Online Wellness', to: '/classes#online' },
  { label: 'Workplace Wellbeing', to: '/corporate' },
  { label: 'Wellness Experiences & Celebrations', to: '/experiences' },
  { label: 'AI Posture Lab', to: '/posture-lab' },
  { label: 'Reviews', to: '/reviews' },
  { label: 'Journal', to: '/blog' },
]
