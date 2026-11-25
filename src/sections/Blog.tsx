import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/motion-primitives'
import type { BlogPost } from '@/data/content'
import { readingMinutes } from '@/lib/posts'

/** Journal index: first post featured large, the rest in a two-column list. */
export function JournalList({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) {
    return <p className="text-lg text-ink-700/80">New articles are on their way. Check back soon.</p>
  }
  const [featured, ...rest] = posts

  return (
    <div className="space-y-16">
      <Reveal>
        <Link to={`/blog/${featured.slug}`} className="group grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
          <div className="overflow-hidden rounded-3xl bg-cream-200 shadow-soft">
            <img src={featured.image} alt="" loading="lazy" className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
          </div>
          <div>
            <p className="text-sm text-ink-700/70">
              {featured.tags.join(', ')} · {readingMinutes(featured)} min read
            </p>
            <h2 className="mt-3 text-4xl leading-tight group-hover:text-ink-600 sm:text-5xl">{featured.title}</h2>
            <p className="mt-4 max-w-[55ch] text-lg leading-relaxed text-ink-700/80">{featured.excerpt}</p>
            <span className="mt-6 inline-flex items-center gap-2 font-semibold text-ink-700">
              <span className="link-underline">Read the article</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </Link>
      </Reveal>

      {rest.length > 0 && (
        <div className="grid gap-10 border-t border-forest-900/[0.08] pt-14 md:grid-cols-2">
          {rest.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.08}>
              <Link to={`/blog/${post.slug}`} className="group grid grid-cols-[7.5rem_1fr] gap-5 sm:grid-cols-[10rem_1fr]">
                <div className="overflow-hidden rounded-2xl bg-cream-200">
                  <img src={post.image} alt="" loading="lazy" className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                </div>
                <div>
                  <p className="text-sm text-ink-700/70">{readingMinutes(post)} min read</p>
                  <h3 className="mt-1 text-2xl leading-snug group-hover:text-ink-600 sm:text-[1.7rem]">{post.title}</h3>
                  <p className="mt-2 line-clamp-2 text-ink-700/75">{post.excerpt}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  )
}
