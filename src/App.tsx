import { lazy, Suspense, type ReactNode } from 'react'
import { Routes, Route, Navigate } from 'react-router'
import Layout from '@/sections/Layout'
import HomePage from '@/pages/HomePage'

// Home ships in the main bundle; every other page loads on demand
const ClassesPage = lazy(() => import('@/pages/ClassesPage'))
const ContactPage = lazy(() => import('@/pages/ContactPage'))
const CookiesPage = lazy(() => import('@/pages/CookiesPage'))
const AccessibilityPage = lazy(() => import('@/pages/AccessibilityPage'))
const TeachersPage = lazy(() => import('@/pages/TeachersPage'))
const CorporatePage = lazy(() => import('@/pages/CorporatePage'))
const ExperiencesPage = lazy(() => import('@/pages/ExperiencesPage'))
const PostureLabPage = lazy(() => import('@/pages/PostureLabPage'))
const CheckoutPage = lazy(() => import('@/pages/CheckoutPage'))
const ReviewsPage = lazy(() => import('@/pages/ReviewsPage'))
const BlogPage = lazy(() => import('@/pages/BlogPage'))
const BlogPostPage = lazy(() => import('@/pages/BlogPostPage'))
const RegistrationPage = lazy(() => import('@/pages/RegistrationPage'))
const PrivacyPolicyPage = lazy(() => import('@/pages/PrivacyPolicyPage'))
const TermsPage = lazy(() => import('@/pages/TermsPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

const page = (el: ReactNode) => <Suspense fallback={<div className="min-h-[100dvh]" aria-busy="true" />}>{el}</Suspense>

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="classes" element={page(<ClassesPage />)} />
        {/* Classes and Timetable merged into /classes; keep old links working */}
        <Route path="courses" element={<Navigate to="/classes" replace />} />
        <Route path="timetable" element={<Navigate to="/classes" replace />} />
        <Route path="contact" element={page(<ContactPage />)} />
        <Route path="cookies" element={page(<CookiesPage />)} />
        <Route path="accessibility" element={page(<AccessibilityPage />)} />
        <Route path="teachers" element={page(<TeachersPage />)} />
        <Route path="posture-lab" element={page(<PostureLabPage />)} />
        <Route path="checkout" element={page(<CheckoutPage />)} />
        <Route path="join" element={<Navigate to="/checkout" replace />} />
        <Route path="book" element={<Navigate to="/checkout" replace />} />
        <Route path="experiences" element={page(<ExperiencesPage />)} />
        <Route path="corporate" element={page(<CorporatePage />)} />
        <Route path="reviews" element={page(<ReviewsPage />)} />
        <Route path="blog" element={page(<BlogPage />)} />
        <Route path="blog/:slug" element={page(<BlogPostPage />)} />
        <Route path="registration" element={page(<RegistrationPage />)} />
        <Route path="privacy" element={page(<PrivacyPolicyPage />)} />
        <Route path="terms" element={page(<TermsPage />)} />
        <Route path="*" element={page(<NotFoundPage />)} />
      </Route>
    </Routes>
  )
}
