import { useEffect, useState, lazy, Suspense } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const Scene3D = lazy(() => import('@/components/Scene3D'))
import Navbar from '@/sections/Navbar'
import Hero from '@/sections/Hero'
import { About, Journey } from '@/sections/About'
import Courses from '@/sections/Courses'
import Timetable from '@/sections/Timetable'
import Instructors from '@/sections/Instructors'
import Corporate from '@/sections/Corporate'
import Reviews from '@/sections/Reviews'
import Footer from '@/sections/Footer'

/** Toast shown when Stripe redirects back with ?checkout=success|cancelled */
function CheckoutToast() {
  const [msg, setMsg] = useState<string | null>(null)
  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get('checkout')
    if (p === 'success') setMsg('Payment successful — welcome to Sattvalife! Check your email for class details.')
    if (p === 'cancelled') setMsg('Checkout cancelled — no charge was made.')
    if (p) window.history.replaceState({}, '', window.location.pathname)
    if (p) setTimeout(() => setMsg(null), 6000)
  }, [])

  return (
    <AnimatePresence>
      {msg && (
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          className="fixed top-20 left-1/2 z-[90] -translate-x-1/2 rounded-2xl glass px-6 py-4 shadow-2xl text-sm font-medium text-forest-900"
        >
          {msg}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Home() {
  return (
    <div className="relative">
      <Suspense fallback={null}>
        <Scene3D />
      </Suspense>
      <Navbar />
      <CheckoutToast />
      <main>
        <Hero />
        <About />
        <Journey />
        <Courses />
        <Timetable />
        <Instructors />
        <Corporate />
        <Reviews />
      </main>
      <Footer />
    </div>
  )
}
