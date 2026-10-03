import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/motion-primitives'
import { CORPORATE, REVIEWS } from '@/data/content'

/** Home: the one deep-forest band on the page, for Sattvalife@Work. */
export function CorporateTeaser() {
  const photo = CORPORATE.images[0]
  const quote = REVIEWS.find((r) => r.author === 'Sally Cook')

  return (
    <section className="section-y relative overflow-hidden bg-forest-900 text-cream-50">
      <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <img
            src={photo.small}
            srcSet={`${photo.small} 800w, ${photo.src} 1600w`}
            sizes="(min-width: 1024px) 600px, 100vw"
            width={photo.w}
            height={photo.h}
            alt={photo.alt}
            loading="lazy"
            className="aspect-[4/3] w-full rounded-3xl object-cover shadow-lift"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="eyebrow !text-amber-300">Sattvalife@Work</p>
          <h2 className="mt-4 text-4xl leading-[1.08] !text-cream-50 sm:text-5xl">Yoga for busy teams</h2>
          <p className="mt-6 max-w-[55ch] text-lg leading-relaxed text-cream-100/80">
            Seated desk yoga, wellbeing mornings and regular on-site sessions that help desk-bound teams ease aches, lower stress and come back focused.
          </p>
          {quote && (
            <figure className="mt-8 border-l-2 border-amber-300/60 pl-5">
              <blockquote className="font-serif text-xl italic leading-snug text-cream-50">“{quote.text}”</blockquote>
              <figcaption className="mt-3 text-sm text-cream-100/70">
                {quote.author}, {quote.context?.toLowerCase()}
              </figcaption>
            </figure>
          )}
          <Link to="/corporate" className="btn-primary btn-lg mt-10">
            Explore Sattvalife@Work
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
