import { Reveal } from '@/components/motion-primitives'
import SocialLinks from '@/components/SocialLinks'
import { COMMUNITY_POSTS, SOCIALS } from '@/data/content'

/**
 * Pre-footer community banner. The post grid renders as soon as images are added
 * to COMMUNITY_POSTS; until then the section stands on the follow links alone.
 */
export default function Community() {
  const handles = SOCIALS.filter((s) => s.url)
    .map((s) => s.label)
    .join(' and ')

  return (
    <section className="border-t border-forest-900/[0.07] bg-cream-100/70 py-16 sm:py-20" aria-labelledby="community-title">
      <div className="container-page">
        <Reveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 id="community-title" className="text-4xl leading-[1.1] sm:text-5xl">
              Join the Sattvalife community
            </h2>
            <p className="mt-4 max-w-[46ch] text-lg leading-relaxed text-forest-800/85">
              Class news, workshops and moments from the mat. Come and say hello on {handles}.
            </p>
          </div>
          <SocialLinks withGoogle className="shrink-0" />
        </Reveal>

        {COMMUNITY_POSTS.length > 0 && (
          <Reveal delay={0.1}>
            <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {COMMUNITY_POSTS.slice(0, 4).map((post) => (
                <li key={post.url}>
                  <a href={post.url} target="_blank" rel="noreferrer" className="group block overflow-hidden rounded-2xl bg-cream-200">
                    <img
                      src={post.image}
                      alt={post.alt}
                      loading="lazy"
                      className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </section>
  )
}
