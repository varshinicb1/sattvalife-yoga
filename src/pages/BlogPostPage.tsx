import { useParams, Link } from 'react-router'
import { Reveal } from '@/components/motion-primitives'
import { useCmsContent } from '@/hooks/useCmsContent'

export default function BlogPostPage() {
  const { slug } = useParams()
  const { blogPosts, loading } = useCmsContent()
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post && !loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-5 text-center">
        <h1 className="font-serif text-5xl text-forest-900 mb-4">Post not found</h1>
        <Link to="/blog" className="text-amber-500 hover:text-amber-600 underline">← Back to blog</Link>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-forest-600 border-t-transparent" />
      </div>
    )
  }

  return (
    <article className="relative py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-3xl px-5">
        <Link to="/blog" className="text-sm text-forest-700/60 hover:text-amber-500 transition-colors mb-8 inline-block">← Back to blog</Link>

        <Reveal>
          <div className="flex gap-2 mb-4">
            {post.tags.map((t) => (
              <span key={t} className="rounded-full bg-forest-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-forest-700">{t}</span>
            ))}
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-forest-900 leading-tight">{post.title}</h1>
          <p className="mt-3 text-sm text-forest-700/50">{post.date} · {post.author}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <img src={post.image} alt={post.title} className="mt-10 w-full rounded-3xl shadow-2xl" />
        </Reveal>

        <div className="mt-12 space-y-6">
          {post.content.map((p, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <p className="text-lg leading-relaxed text-forest-800/85">{p}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </article>
  )
}
