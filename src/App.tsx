import { Routes, Route } from 'react-router'
import Layout from '@/sections/Layout'
import HomePage from '@/pages/HomePage'
import CoursesPage from '@/pages/CoursesPage'
import TimetablePage from '@/pages/TimetablePage'
import TeachersPage from '@/pages/TeachersPage'
import CorporatePage from '@/pages/CorporatePage'
import ExperiencesPage from '@/pages/ExperiencesPage'
import ReviewsPage from '@/pages/ReviewsPage'
import BlogPage from '@/pages/BlogPage'
import BlogPostPage from '@/pages/BlogPostPage'
import RegistrationPage from '@/pages/RegistrationPage'
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage'
import TermsPage from '@/pages/TermsPage'
import ShopPage from '@/pages/ShopPage'
import PostureLabPage from '@/pages/PostureLabPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="courses" element={<CoursesPage />} />
        <Route path="timetable" element={<TimetablePage />} />
        <Route path="teachers" element={<TeachersPage />} />
        <Route path="experiences" element={<ExperiencesPage />} />
        <Route path="corporate" element={<CorporatePage />} />
        <Route path="reviews" element={<ReviewsPage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="blog/:slug" element={<BlogPostPage />} />
        <Route path="registration" element={<RegistrationPage />} />
        <Route path="privacy" element={<PrivacyPolicyPage />} />
        <Route path="terms" element={<TermsPage />} />
        <Route path="shop" element={<ShopPage />} />
        <Route path="posture-lab" element={<PostureLabPage />} />
      </Route>
    </Routes>
  )
}
