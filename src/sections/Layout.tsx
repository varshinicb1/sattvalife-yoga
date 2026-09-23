import { Outlet } from 'react-router'
import { AnimatePresence } from 'framer-motion'
import Navbar from '@/sections/Navbar'
import Footer from '@/sections/Footer'
import Community from '@/sections/Community'
import CookieConsent from '@/components/CookieConsent'
import WhatsAppButton from '@/components/WhatsAppButton'
import ScrollToTop from '@/components/ScrollToTop'
import CheckoutNotice from '@/components/CheckoutNotice'
import BookingSheet from '@/components/BookingSheet'
import { usePostHog } from '@/hooks/usePostHog'
import { usePageMeta } from '@/lib/seo'
import { useBookingRequest } from '@/lib/bookingStore'

/** Shared shell: nav, footer, booking sheet, consent, per-route meta. */
export default function Layout() {
  usePostHog()
  usePageMeta()
  const booking = useBookingRequest()

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <Outlet />
      </main>
      <Community />
      <Footer />
      <WhatsAppButton />
      <CheckoutNotice />
      <CookieConsent />
      <AnimatePresence>{booking && <BookingSheet key={booking.courseId + (booking.venueId ?? '')} request={booking} />}</AnimatePresence>
    </>
  )
}
