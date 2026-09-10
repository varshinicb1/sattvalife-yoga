import { useEffect, lazy, Suspense } from 'react'
import { Outlet, useLocation } from 'react-router'

const Scene3D = lazy(() => import('@/components/Scene3D'))
import Navbar from '@/sections/Navbar'
import Footer from '@/sections/Footer'
import CookieConsent from '@/components/CookieConsent'

import { BLOG_POSTS } from '@/data/content'
import { usePostHog } from '@/hooks/usePostHog'
import WhatsAppButton from '@/components/WhatsAppButton'

/** Shared layout: 3D scene, nav, footer, cookie consent, and page-level meta updater */
export default function Layout() {
  usePostHog()
  const { pathname } = useLocation()

  /* Ensure dark class is removed from html document */
  useEffect(() => {
    document.documentElement.classList.remove('dark')
    localStorage.removeItem('theme')
  }, [])

  /* Update per-page meta tags */
  useEffect(() => {
    const meta: Record<string, { title: string; desc: string }> = {
      '/':          { title: 'Sattvalife Yoga — Wellness Courses in Leicester', desc: 'Personalised yoga classes in Leicester — Vinyasa flow for small groups, individuals and workplaces.' },
      '/courses':   { title: 'Courses — Sattvalife Yoga Leicester', desc: 'Choose from Drop-In classes (£10), Monthly Flow (£35/mo) or Corporate sessions (£250). Back, Belly & Breath focus.' },
      '/timetable': { title: 'Timetable — Sattvalife Yoga Leicester', desc: 'Tuesday at Trinity Methodist Church, Oadby (6:30PM) and Thursday at Thurnby Memorial Hall (7PM).' },
      '/teachers':  { title: 'Teachers — Sattvalife Yoga Leicester', desc: 'Meet Amisha Soni and Nish Soni — your yoga instructors at Sattvalife Yoga in Leicester.' },
      '/corporate': { title: 'Corporate Yoga — Sattvalife@Work Leicester', desc: 'Bring yoga to your workplace. On-site sessions, workshops, and desk-stretch routines for your team.' },
      '/registration': { title: 'Registration — Sattvalife Yoga Leicester', desc: 'Register for yoga classes in Leicester. Fill in your details and we will get back to you with class information.' },
      '/reviews':   { title: 'Reviews — Sattvalife Yoga Leicester', desc: 'See what our students say. Rated 5.0 on Google with 62+ verified reviews.' },
      '/blog':      { title: 'Blog — Sattvalife Yoga Leicester', desc: 'Yoga tips, wellness insights, and class updates from Sattvalife Yoga in Leicester.' },
      '/privacy':   { title: 'Privacy Policy (UK GDPR) — Sattvalife Yoga Leicester', desc: 'UK GDPR and Data Protection Act 2018 privacy policy for Sattvalife Yoga, Leicester.' },
      '/terms':     { title: 'Terms & Conditions — Sattvalife Yoga Leicester', desc: 'Terms and conditions for yoga classes, memberships, and bookings in Leicester, UK.' },
    }
    /* Handle blog post pages dynamically */
    const blogMatch = pathname.match(/^\/blog\/(.+)/)
    let info = meta[pathname] || meta['/']
    if (blogMatch) {
      const post = BLOG_POSTS.find((p) => p.slug === blogMatch[1])
      if (post) info = { title: `${post.title} — Sattvalife Blog`, desc: post.excerpt }
    }
    document.title = info.title
    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`) as HTMLMetaElement | null
      if (!el) { el = document.createElement('meta'); el.setAttribute(name.includes('og:') ? 'property' : 'name', name); document.head.appendChild(el) }
      el.content = content
    }
    setMeta('description', info.desc)
    setMeta('og:title', info.title)
    setMeta('og:description', info.desc)
  }, [pathname])

  return (
    <div className="relative">
      <Suspense fallback={null}>
        <Scene3D />
      </Suspense>
      <Navbar />
      <WhatsAppButton />
      <main>
        <Outlet />
      </main>
      <Footer />
      <CookieConsent />
    </div>
  )
}
