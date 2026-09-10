import { Link } from 'react-router'
import { Reveal, SectionHeading } from '@/components/motion-primitives'
import { useCmsContent } from '@/hooks/useCmsContent'

export default function Blog() {
  const { blogPosts } = useCmsContent()

  return (
    <section className="relative py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading eyebrow="Sattvalife Journal" title="Yoga Tips & Wellness Insights" />
        <p className="mx-auto -mt-8 mb-16 max-w-xl text-center text-sm text-forest-700/60">
          <a href="/rss.xml" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-amber-500 transition-colors">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5"><circle cx="5" cy="19" r="2.5"/><path d="M4 12v-2a10 10 0 0 1 10 10h-2a8 8 0 0 0-8-8z"/><path d="M4 4v-2a16 16 0 0 1 16 16h-2a14 14 0 0 0-14-14z"/></svg>
            RSS Feed
          </a>
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.1}>
              <Link to={`/blog/${post.slug}`} className="group block h-full">
                <div className="glass rounded-3xl overflow-hidden shadow-lg shadow-forest-900/5 hover:shadow-xl transition-all h-full flex flex-col">
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex gap-2 mb-3">
                      {post.tags.map((t) => (
                        <span key={t} className="rounded-full gold-click bg-forest-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-forest-700">
                          {t}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-serif text-2xl text-forest-900 group-hover:text-amber-600 transition-colors">{post.title}</h3>
                    <p className="mt-2 text-sm text-forest-700/75 flex-1">{post.excerpt}</p>
                    <p className="mt-4 text-xs text-forest-700/50">{post.date} · {post.author}</p>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
