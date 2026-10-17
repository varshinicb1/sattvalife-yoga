import { useSyncExternalStore } from 'react'
import {
  BRAND as DEFAULT_BRAND,
  WELCOME as DEFAULT_WELCOME,
  VINYASA as DEFAULT_VINYASA,
  BLOG_POSTS as DEFAULT_BLOG_POSTS,
  CONTACT,
  type BlogPost,
} from '@/data/content'
import { STRIPE_CONFIG } from '@/config'

export const CMS_API_BASE = 'https://sattvalife-cms.cbvarshini1.workers.dev'

export interface CmsContentState {
  brand: {
    name: string
    tagline: string
    location: string
    copyright: string
  }
  welcome: {
    title: string
    body: string
  }
  aboutVinyasa: {
    title: string
    body: string
    pillars: Array<{ title: string; text: string }>
  }
  images: {
    poseImage: string
    aboutBgImage: string
    heroBgImage: string
    logoImage: string
  }
  blogPosts: BlogPost[]
  settings: {
    primaryColor: string
    accentColor: string
    fontHeading: string
    fontBody: string
    whatsappNumber: string
    whatsappTemplate: string
    contactEmail: string
  }
  stripe: {
    publishableKey: string
    paymentLinks: {
      dropIn: string
      monthly: string
      corporate: string
    }
    currency: string
  }
  loading: boolean
}

const defaultState: CmsContentState = {
  brand: { ...DEFAULT_BRAND },
  welcome: { ...DEFAULT_WELCOME },
  aboutVinyasa: {
    title: DEFAULT_VINYASA.title,
    body: DEFAULT_VINYASA.body,
    pillars: DEFAULT_VINYASA.pillars,
  },
  images: {
    poseImage: '/images/opt/garden-1-500.webp',
    aboutBgImage: '/images/opt/daisies-1200.webp',
    heroBgImage: '/images/opt/lotus-mark-900.webp',
    logoImage: '/images/logo.png',
  },
  blogPosts: DEFAULT_BLOG_POSTS,
  settings: {
    primaryColor: '#4B5338',
    accentColor: '#A9834C',
    fontHeading: 'Cormorant Garamond',
    fontBody: 'Raleway',
    whatsappNumber: CONTACT.whatsapp,
    whatsappTemplate: CONTACT.whatsappMessage,
    contactEmail: CONTACT.email,
  },
  stripe: {
    publishableKey: STRIPE_CONFIG.publishableKey,
    paymentLinks: {
      dropIn: STRIPE_CONFIG.paymentLinks.dropIn,
      monthly: STRIPE_CONFIG.paymentLinks.monthly,
      corporate: STRIPE_CONFIG.paymentLinks.corporate,
    },
    currency: 'GBP',
  },
  loading: true,
}

type RawPost = {
  slug?: string; id?: string; title?: string; excerpt?: string
  date?: string; createdAt?: string; author?: string; image?: string
  tags?: string[] | string; content?: string[] | string
}

const isHttpUrl = (v: unknown): v is string => typeof v === 'string' && /^https:\/\//.test(v)
const nonEmpty = (v: unknown): v is string => typeof v === 'string' && v.trim().length > 0

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function mapPost(p: RawPost): BlogPost {
  const tags = Array.isArray(p.tags)
    ? p.tags
    : typeof p.tags === 'string' && p.tags.trim()
      ? p.tags.split(',').map((t) => t.trim()).filter(Boolean)
      : ['Yoga']
  const contentLines = Array.isArray(p.content)
    ? p.content
    : typeof p.content === 'string'
      ? p.content.split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean)
      : [p.excerpt || p.title || '']
  return {
    slug: p.slug || p.id || slugify(p.title || 'untitled'),
    title: p.title || 'Untitled',
    excerpt: p.excerpt || (contentLines[0] ? contentLines[0].slice(0, 140).trimEnd() + '…' : ''),
    date: p.createdAt ? p.createdAt.split('T')[0] : p.date || new Date().toISOString().split('T')[0],
    author: p.author || 'Amisha Soni',
    image: p.image || '/images/opt/garden-2-500.webp',
    tags,
    content: contentLines,
  }
}

/*
 * Module-level store: the CMS is fetched once per page load and shared by every
 * component that calls useCmsContent(), instead of each component re-fetching.
 */
let state: CmsContentState = defaultState
let started = false
const listeners = new Set<() => void>()

function emit(next: CmsContentState) {
  state = next
  listeners.forEach((l) => l())
}

async function getJson(path: string): Promise<unknown> {
  const res = await fetch(`${CMS_API_BASE}${path}`)
  if (!res.ok) throw new Error(`${path} ${res.status}`)
  return res.json()
}

async function load() {
  const [contentRes, blogRes, settingsRes] = await Promise.allSettled([
    getJson('/api/content'),
    getJson('/api/blog'),
    getJson('/api/settings'),
  ])

  const next: CmsContentState = {
    ...defaultState,
    brand: { ...defaultState.brand },
    welcome: { ...defaultState.welcome },
    aboutVinyasa: { ...defaultState.aboutVinyasa },
    images: { ...defaultState.images },
    settings: { ...defaultState.settings },
    stripe: { ...defaultState.stripe, paymentLinks: { ...defaultState.stripe.paymentLinks } },
    loading: false,
  }

  if (contentRes.status === 'fulfilled' && contentRes.value && typeof contentRes.value === 'object') {
    const c = contentRes.value as Record<string, unknown>
    if (nonEmpty(c.name)) next.brand.name = c.name
    if (nonEmpty(c.tagline)) next.brand.tagline = c.tagline
    if (nonEmpty(c.welcome)) next.welcome.body = c.welcome
    if (nonEmpty(c.aboutVinyasa)) next.aboutVinyasa.body = c.aboutVinyasa
    if (nonEmpty(c.poseImage)) next.images.poseImage = c.poseImage
    if (nonEmpty(c.aboutBgImage)) next.images.aboutBgImage = c.aboutBgImage
    if (nonEmpty(c.heroBgImage)) next.images.heroBgImage = c.heroBgImage
    if (nonEmpty(c.logoImage)) next.images.logoImage = c.logoImage
  }

  if (blogRes.status === 'fulfilled' && Array.isArray(blogRes.value) && blogRes.value.length > 0) {
    const mapped = (blogRes.value as RawPost[]).map(mapPost)
    next.blogPosts = [...mapped, ...DEFAULT_BLOG_POSTS.filter((dp) => !mapped.some((mp) => mp.slug === dp.slug))]
  }

  if (settingsRes.status === 'fulfilled' && settingsRes.value && typeof settingsRes.value === 'object') {
    const s = settingsRes.value as Record<string, unknown>
    if (nonEmpty(s.primaryColor)) next.settings.primaryColor = s.primaryColor
    if (nonEmpty(s.accentColor)) next.settings.accentColor = s.accentColor
    if (nonEmpty(s.fontHeading)) next.settings.fontHeading = s.fontHeading
    if (nonEmpty(s.fontBody)) next.settings.fontBody = s.fontBody
    if (nonEmpty(s.whatsappNumber) && s.whatsappNumber.replace(/\D/g, '').length >= 10) next.settings.whatsappNumber = s.whatsappNumber
    // The admin template is a greeting *to* students ("Hi {name}!") so it is not used as the visitor's prefilled message.
    if (nonEmpty(s.contactEmail) && s.contactEmail.includes('@')) next.settings.contactEmail = s.contactEmail
    if (nonEmpty(s.stripePublishableKey)) next.stripe.publishableKey = s.stripePublishableKey
    if (isHttpUrl(s.stripePaymentLinkDropIn)) next.stripe.paymentLinks.dropIn = s.stripePaymentLinkDropIn
    if (isHttpUrl(s.stripePaymentLinkMonthly)) next.stripe.paymentLinks.monthly = s.stripePaymentLinkMonthly
    if (isHttpUrl(s.stripePaymentLinkCorporate)) next.stripe.paymentLinks.corporate = s.stripePaymentLinkCorporate
    if (nonEmpty(s.stripeCurrency)) next.stripe.currency = s.stripeCurrency
  }

  emit(next)
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  if (!started) {
    started = true
    load().catch((err) => {
      console.warn('CMS unavailable, using built-in content', err)
      emit({ ...state, loading: false })
    })
  }
  return () => {
    listeners.delete(listener)
  }
}

const getSnapshot = () => state

export function useCmsContent(): CmsContentState {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
}

/** wa.me link using the CMS-configured WhatsApp number. */
export function whatsappHref(number: string, message: string = CONTACT.whatsappMessage) {
  const digits = number.replace(/\D/g, '')
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
}
