import { useState, useEffect } from 'react'
import {
  BRAND as DEFAULT_BRAND,
  WELCOME as DEFAULT_WELCOME,
  VINYASA as DEFAULT_VINYASA,
  BLOG_POSTS as DEFAULT_BLOG_POSTS,
  type BlogPost,
} from '@/data/content'

const CMS_API_BASE = 'https://sattvalife-cms.cbvarshini1.workers.dev'

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
    whatsappNumber?: string
    whatsappTemplate?: string
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
  brand: DEFAULT_BRAND,
  welcome: DEFAULT_WELCOME,
  aboutVinyasa: {
    title: DEFAULT_VINYASA.title,
    body: DEFAULT_VINYASA.body,
    pillars: DEFAULT_VINYASA.pillars,
  },
  images: {
    poseImage: '/images/pose.jpg',
    aboutBgImage: '/images/about-hero.jpg',
    heroBgImage: '/images/lotus-element.png',
    logoImage: '/images/logo.png',
  },
  blogPosts: DEFAULT_BLOG_POSTS,
  settings: {
    primaryColor: '#3C552D',
    accentColor: '#c4843e',
    fontHeading: 'Cormorant Garamond',
    fontBody: 'Raleway',
    whatsappNumber: '+44 7551 100218',
    whatsappTemplate: 'Hi! I would like to know more about Sattvalife Yoga classes in Leicester.',
  },
  stripe: {
    publishableKey: 'pk_test_51TuhJDAlkjSuhXu6jKXDx3xInfPIS47pCkth3S4vp3iP6nWJt99MFeyzNGWWh3AGF8I0mN80XHsF4e44SLlWiKmu00X7CEpfZf',
    paymentLinks: {
      dropIn: 'https://buy.stripe.com/test_6oUfZg5PJ5tJ2Hl3v09sk00',
      monthly: 'https://buy.stripe.com/test_bJe6oG91VcWb81F4z49sk01',
      corporate: 'https://buy.stripe.com/test_14A28qa5Z09pfu78Pk9sk02',
    },
    currency: 'GBP',
  },
  loading: true,
}

export function useCmsContent() {
  const [data, setData] = useState<CmsContentState>(defaultState)

  useEffect(() => {
    let isMounted = true

    async function loadCmsData() {
      try {
        const [contentRes, blogRes, settingsRes] = await Promise.allSettled([
          fetch(`${CMS_API_BASE}/api/content`),
          fetch(`${CMS_API_BASE}/api/blog`),
          fetch(`${CMS_API_BASE}/api/settings`),
        ])

        const updatedBrand = { ...DEFAULT_BRAND }
        const updatedWelcome = { ...DEFAULT_WELCOME }
        const updatedVinyasa = {
          title: DEFAULT_VINYASA.title,
          body: DEFAULT_VINYASA.body,
          pillars: DEFAULT_VINYASA.pillars,
        }
        const updatedImages = { ...defaultState.images }
        let updatedPosts = [...DEFAULT_BLOG_POSTS]
        const updatedSettings = { ...defaultState.settings }
        const updatedStripe = { ...defaultState.stripe }

        if (contentRes.status === 'fulfilled' && contentRes.value.ok) {
          const content = await contentRes.value.json()
          if (content.name) updatedBrand.name = content.name
          if (content.tagline) updatedBrand.tagline = content.tagline
          if (content.welcome) updatedWelcome.body = content.welcome
          if (content.aboutVinyasa) updatedVinyasa.body = content.aboutVinyasa
          if (content.poseImage) updatedImages.poseImage = content.poseImage
          if (content.aboutBgImage) updatedImages.aboutBgImage = content.aboutBgImage
          if (content.heroBgImage) updatedImages.heroBgImage = content.heroBgImage
          if (content.logoImage) updatedImages.logoImage = content.logoImage
        }

        if (blogRes.status === 'fulfilled' && blogRes.value.ok) {
          const posts = await blogRes.value.json()
          if (Array.isArray(posts) && posts.length > 0) {
            const mapped = posts.map((p: {
              slug?: string; id?: string; title?: string; excerpt?: string
              date?: string; createdAt?: string; author?: string; image?: string
              tags?: string[] | string; content?: string[] | string
            }) => {
              const tags = Array.isArray(p.tags)
                ? p.tags
                : typeof p.tags === 'string' && p.tags.trim()
                ? p.tags.split(',').map((t: string) => t.trim())
                : ['Yoga']
              const contentLines = Array.isArray(p.content)
                ? p.content
                : typeof p.content === 'string'
                ? p.content.split('\n\n').filter(Boolean)
                : [p.excerpt || p.title]

              return {
                slug: p.slug || p.id || (p.title || 'untitled').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                title: p.title || 'Untitled',
                excerpt: p.excerpt || (contentLines[0] ? contentLines[0].slice(0, 120) + '...' : ''),
                date: p.createdAt ? p.createdAt.split('T')[0] : p.date || new Date().toISOString().split('T')[0],
                author: p.author || 'Amisha Soni',
                image: p.image || '/images/pose.jpg',
                tags,
                content: contentLines,
              } as BlogPost
            })
            updatedPosts = [...mapped, ...DEFAULT_BLOG_POSTS.filter(dp => !mapped.some(mp => mp.slug === dp.slug))]
          }
        }

        if (settingsRes.status === 'fulfilled' && settingsRes.value.ok) {
          const settings = await settingsRes.value.json()
          if (settings.primaryColor) updatedSettings.primaryColor = settings.primaryColor
          if (settings.accentColor) updatedSettings.accentColor = settings.accentColor
          if (settings.fontHeading) updatedSettings.fontHeading = settings.fontHeading
          if (settings.fontBody) updatedSettings.fontBody = settings.fontBody
          if (settings.whatsappNumber) updatedSettings.whatsappNumber = settings.whatsappNumber
          if (settings.whatsappTemplate) updatedSettings.whatsappTemplate = settings.whatsappTemplate
          if (settings.stripePublishableKey) updatedStripe.publishableKey = settings.stripePublishableKey
          if (settings.stripePaymentLinkDropIn) updatedStripe.paymentLinks.dropIn = settings.stripePaymentLinkDropIn
          if (settings.stripePaymentLinkMonthly) updatedStripe.paymentLinks.monthly = settings.stripePaymentLinkMonthly
          if (settings.stripePaymentLinkCorporate) updatedStripe.paymentLinks.corporate = settings.stripePaymentLinkCorporate
          if (settings.stripeCurrency) updatedStripe.currency = settings.stripeCurrency
        }

        if (isMounted) {
          setData({
            brand: updatedBrand,
            welcome: updatedWelcome,
            aboutVinyasa: updatedVinyasa,
            images: updatedImages,
            blogPosts: updatedPosts,
            settings: updatedSettings,
            stripe: updatedStripe,
            loading: false,
          })
        }
      } catch (err) {
        console.error('Failed to load CMS content, using static defaults', err)
        if (isMounted) {
          setData((prev) => ({ ...prev, loading: false }))
        }
      }
    }

    loadCmsData()

    return () => {
      isMounted = false
    }
  }, [])

  return data
}
