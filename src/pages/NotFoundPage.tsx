import { Link } from 'react-router'
import { LotusMark } from '@/components/motion-primitives'

export default function NotFoundPage() {
  return (
    <section className="container-page flex min-h-[85dvh] flex-col items-center justify-center pt-[calc(84px+env(safe-area-inset-top))] text-center">
      <LotusMark className="h-12 w-auto" />
      <h1 className="mt-8 text-5xl sm:text-6xl">This page has drifted off</h1>
      <p className="lead mx-auto mt-5 max-w-md">The link may be old or mistyped. Take a breath and try one of these instead.</p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link to="/" className="btn-primary btn-lg">Back to home</Link>
        <Link to="/classes" className="btn-outline btn-lg">See the timetable</Link>
      </div>
    </section>
  )
}
