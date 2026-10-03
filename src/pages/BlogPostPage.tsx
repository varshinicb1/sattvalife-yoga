import { useParams, Link } from 'react-router'
import { ArrowLeft } from 'lucide-react'
import { Reveal } from '@/components/motion-primitives'
import { useCmsContent } from '@/hooks/useCmsContent'
import { formatPostDate, readingMinutes } from '@/lib/posts'
import NotFoundPage from '@/pages/NotFoundPage'

/** Paragraphs starting "1. Title: body" render as a numbered heading + text. */
function Paragraph({ text }: { text: string }) {
  const m = text.match(/^(\d+)\.\s+([^:]{3,80}):\s+(.*)$/s)
  if (m) {
    return (
      <div className="grid grid-cols-[2.5rem_1fr] gap-x-2">
        <span className="font-serif text-3xl leading-none text-amber-600">{m[1]}</span>
        <div>
          <h2 className="text-2xl leading-snug sm:text-[1.7rem]">{m[2]}</h2>
          <p className="mt-2">{m[3]}</p>
        </div>
      </div>
    )
  }
  return <p>{text}</p>
}

export default function BlogPostPage() {
  const { slug } = useParams()
  const { blogPosts, loading } = useCmsContent()
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post && loading) {
    return (
      <div className="container-page min-h-[80dvh] pt-40" aria-busy="true">
        <div className="mx-auto max-w-3xl animate-pulse space-y-5">
          <div className="h-4 w-40 rounded-full bg-forest-900/10" />
          <div className="h-12 w-4/5 rounded-2xl bg-forest-900/10" />
          <div className="aspect-[16/9] rounded-3xl bg-forest-900/[0.07]" />
        </div>
      </div>
    )
  }
  if (!post) return <NotFoundPage />

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2)

  return (
    <article className="pt-[calc(84px+env(safe-area-inset-top))]">
      <header className="container-page pt-12 sm:pt-16">
        <div className="mx-auto max-w-3xl">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-ink-700/80 hover:text-ink-900">
            <ArrowLeft className="h-4 w-4" /> Journal
          </Link>
          <Reveal>
            <p className="mt-8 text-sm text-ink-700/70">
              {post.tags.join(', ')} · {readingMinutes(post)} min read
            </p>
            <h1 className="mt-3 text-[2.6rem] leading-[1.08] sm:text-6xl">{post.title}</h1>
            <p className="mt-5 text-ink-700/75">
              By <span className="font-semibold text-ink-900">{post.author}</span> · {formatPostDate(post.date)}
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="mx-auto mt-10 max-w-5xl">
          <img src={post.image} alt="" className="aspect-[16/9] w-full rounded-3xl object-cover shadow-soft" />
        </Reveal>
      </header>

      <div className="container-page py-14 sm:py-20">
        <div className="mx-auto max-w-[68ch] space-y-7 text-lg leading-[1.8] text-ink-900/85 sm:text-[1.2rem]">
          {post.content.map((p, i) => (
            <Paragraph key={i} text={p} />
          ))}
        </div>

        <aside className="mx-auto mt-16 max-w-3xl rounded-3xl bg-forest-800 p-8 text-center sm:p-12">
          <h2 className="text-3xl !text-cream-50 sm:text-4xl">Practise it with us</h2>
          <p className="mx-auto mt-3 max-w-md text-cream-100/80">Small classes in Oadby and Thurnby with guidance tailored to your body.</p>
          <Link to="/classes" className="btn-brass btn-lg mt-8">
            Book a class
          </Link>
        </aside>

        {related.length > 0 && (
          <nav aria-label="More from the journal" className="mx-auto mt-20 max-w-5xl">
            <h2 className="text-3xl">Keep reading</h2>
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              {related.map((r) => (
                <Link key={r.slug} to={`/blog/${r.slug}`} className="group">
                  <div className="overflow-hidden rounded-3xl bg-cream-200">
                    <img src={r.image} alt="" loading="lazy" className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                  </div>
                  <h3 className="mt-4 text-2xl leading-snug group-hover:text-ink-600">{r.title}</h3>
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </article>
  )
}
