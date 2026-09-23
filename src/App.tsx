import { lazy, Suspense, type ReactNode } from 'react'
import { Routes, Route } from 'react-router'
import Layout from '@/sections/Layout'
import HomePage from '@/pages/HomePage'

// Home ships in the main bundle; every other page loads on demand
const CoursesPage = lazy(() => import('@/pages/CoursesPage'))
const TimetablePage = lazy(() => import('@/pages/TimetablePage'))
const TeachersPage = lazy(() => import('@/pages/TeachersPage'))
const CorporatePage = lazy(() => import('@/pages/CorporatePage'))
const ExperiencesPage = lazy(() => import('@/pages/ExperiencesPage'))
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
        <Route path="courses" element={page(<CoursesPage />)} />
        <Route path="timetable" element={page(<TimetablePage />)} />
        <Route path="teachers" element={page(<TeachersPage />)} />
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
