import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { useCmsContent } from '@/hooks/useCmsContent'

export const SITE_URL = 'https://sattvalife-yoga.web.app'

const ROUTE_META: Record<string, { title: string; desc: string }> = {
  '/': {
    title: 'Sattvalife Yoga | Vinyasa Yoga Classes in Leicester',
    desc: 'Small-group Vinyasa yoga in Oadby and Thurnby, Leicester. Personal attention for every age and ability, plus workplace wellbeing sessions. Rated 5.0 on Google.',
  },
  '/classes': {
    title: 'Classes & Timetable | Sattvalife Yoga Leicester',
    desc: 'Tuesdays 6:30pm in Oadby and Thursdays 7pm in Thurnby. See what each class involves, who it suits and what it costs, then book online from £10.',
  },
  '/contact': {
    title: 'Contact Us | Sattvalife Yoga Leicester',
    desc: 'Ask us anything about classes, celebrations or workplace wellbeing, or register as a new student before your first class.',
  },
  '/cookies': {
    title: 'Cookies | Sattvalife Yoga Leicester',
    desc: 'How Sattvalife Yoga uses cookies and local storage. No advertising or tracking cookies.',
  },
  '/accessibility': {
    title: 'Accessibility | Sattvalife Yoga Leicester',
    desc: 'Our accessibility statement: what we have done, where we fall short, and how to tell us about a problem.',
  },
  '/teachers': {
    title: 'Our Teachers | Sattvalife Yoga Leicester',
    desc: 'Meet Amisha Soni and Nish Soni, the teachers behind Sattvalife Yoga in Leicester.',
  },
  '/corporate': {
    title: 'Corporate Yoga in Leicester | Sattvalife@Work',
    desc: 'On-site and online yoga for workplaces: seated desk yoga, wellbeing mornings and tailored programmes for teams across Leicestershire.',
  },
  '/experiences': {
    title: 'Wellness Celebrations & Experiences | Sattvalife Yoga Leicester',
    desc: 'Baby showers, birthdays, hen parties and special occasions hosted as a wellness experience: Bollywood yoga and dance, Pilates, soundbath, breathwork, plus healthy nibbles and mocktails.',
  },
  '/reviews': {
    title: 'Reviews | Sattvalife Yoga Leicester',
    desc: 'Rated 5.0 on Google from 62 reviews. Read what students and teams say about Sattvalife Yoga.',
  },
  '/blog': {
    title: 'Journal | Sattvalife Yoga Leicester',
    desc: 'Yoga tips, wellbeing insights and class news from Sattvalife Yoga in Leicester.',
  },
  '/registration': {
    title: 'Registration & Health Form | Sattvalife Yoga Leicester',
    desc: 'New to Sattvalife? Complete the short registration and health form before your first class.',
  },
  '/privacy': {
    title: 'Privacy Policy | Sattvalife Yoga Leicester',
    desc: 'How Sattvalife Yoga collects, uses and protects your personal data under UK GDPR.',
  },
  '/terms': {
    title: 'Terms & Conditions | Sattvalife Yoga Leicester',
    desc: 'Booking, payment, cancellation and safety terms for Sattvalife Yoga classes in Leicester.',
  },
}

const NOT_FOUND = { title: 'Page not found | Sattvalife Yoga', desc: ROUTE_META['/'].desc }

function setMeta(key: string, content: string) {
  const isProperty = key.startsWith('og:')
  const selector = isProperty ? `meta[property="${key}"]` : `meta[name="${key}"]`
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(isProperty ? 'property' : 'name', key)
    document.head.appendChild(el)
  }
  el.content = content
}

function setCanonical(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.rel = 'canonical'
    document.head.appendChild(link)
  }
  link.href = href
}

/** Keeps <title>, description, canonical and social tags in sync with the route. */
export function usePageMeta() {
  const { pathname } = useLocation()
  const { blogPosts } = useCmsContent()

  useEffect(() => {
    const path = pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname
    let info = ROUTE_META[path]
    let image = `${SITE_URL}/og-image.jpg`
    const post = path.startsWith('/blog/') ? blogPosts.find((p) => `/blog/${p.slug}` === path) : undefined
    if (post) {
      info = { title: `${post.title} | Sattvalife Journal`, desc: post.excerpt }
      if (post.image.startsWith('/')) image = SITE_URL + post.image
    }
    if (!info) info = NOT_FOUND

    document.title = info.title
    setMeta('description', info.desc)
    setMeta('og:title', info.title)
    setMeta('og:description', info.desc)
    setMeta('og:url', SITE_URL + (path === '/' ? '/' : path))
    setMeta('og:image', image)
    setMeta('twitter:title', info.title)
    setMeta('twitter:description', info.desc)
    setMeta('twitter:image', image)
    setMeta('robots', info === NOT_FOUND ? 'noindex, follow' : 'index, follow')
    setCanonical(SITE_URL + (path === '/' ? '/' : path))
  }, [pathname, blogPosts])
}
