import PageHero from '@/components/PageHero'
import { JournalList } from '@/sections/Blog'
import { useCmsContent } from '@/hooks/useCmsContent'

export default function BlogPage() {
  const { blogPosts } = useCmsContent()
  return (
    <>
      <PageHero
        eyebrow="Journal"
        title="Yoga tips & wellbeing insights"
        intro="Simple practices you can use at home and at your desk, from the Sattvalife teachers."
      >
        <a href="/rss.xml" className="link-underline inline-block py-1 text-sm font-semibold text-ink-700">
          Subscribe via RSS
        </a>
      </PageHero>
      <section className="pb-20 pt-4 sm:pb-28">
        <div className="container-page">
          <JournalList posts={blogPosts} />
        </div>
      </section>
    </>
  )
}
