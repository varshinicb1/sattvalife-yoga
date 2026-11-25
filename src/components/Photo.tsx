import { PHOTOS, type PhotoKey, type PlateArt } from '@/data/photos'

/**
 * Renders a photo slot. While a slot is waiting on real photography it shows a
 * calm branded frame at the right crop, so the layout never shifts when the
 * picture arrives and the page never shows a broken gap.
 */
export default function Photo({
  slot,
  className = '',
  imgClassName = '',
  priority = false,
}: {
  slot: PhotoKey
  className?: string
  imgClassName?: string
  priority?: boolean
}) {
  /*
   * A slot that is not in the registry would otherwise blow up on `.ratio` and
   * take the whole page with it. Fall back to the waiting frame instead: a
   * missing picture should never be worse than a missing page.
   */
  const photo = PHOTOS[slot]
  if (!photo) {
    if (import.meta.env.DEV) console.warn(`Photo: no slot named "${slot}" in PHOTOS`)
    return <div className={className} style={{ aspectRatio: '4/5' }} aria-hidden="true" />
  }
  const style = { aspectRatio: photo.ratio }

  if (!photo.src && photo.art) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-forest-700 via-forest-800 to-forest-900 px-6 text-center ${className}`}
        style={style}
        role="img"
        aria-label={photo.alt}
      >
        {/* Soft gold glow and a watermark lotus, so the plate has depth rather than a flat fill. */}
        <div className="pointer-events-none absolute -top-1/4 left-1/2 h-3/4 w-[140%] -translate-x-1/2 rounded-full bg-amber-300/15 blur-3xl" aria-hidden="true" />
        <img
          src="/images/opt/lotus-192.png"
          alt=""
          aria-hidden="true"
          width={192}
          height={103}
          className="pointer-events-none absolute -bottom-6 -right-8 w-48 opacity-[0.07]"
        />
        <span className="relative flex h-28 w-28 items-center justify-center rounded-full border border-amber-300/40 bg-cream-50/[0.06] sm:h-32 sm:w-32">
          <PlateIllustration art={photo.art} />
        </span>
        {photo.plateLine && (
          <p className="relative mt-6 max-w-[15rem] font-serif text-lg italic leading-snug text-cream-100/90 sm:text-xl">
            {photo.plateLine}
          </p>
        )}
      </div>
    )
  }

  if (!photo.src) {
    return (
      <div
        className={`flex items-center justify-center overflow-hidden bg-gradient-to-br from-cream-100 to-cream-200 ${className}`}
        style={style}
        role="img"
        aria-label={photo.alt}
      >
        <img
          src="/images/opt/lotus-192.png"
          alt=""
          aria-hidden="true"
          width={192}
          height={103}
          className="w-16 opacity-25 sm:w-20"
        />
      </div>
    )
  }

  return (
    <img
      src={photo.src}
      srcSet={photo.srcSet}
      sizes={photo.sizes}
      alt={photo.alt}
      style={style}
      loading={priority ? undefined : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      className={`object-cover ${className} ${imgClassName}`}
    />
  )
}

/** Gold line drawings for the plates, drawn to match the flyer's service roundels. */
function PlateIllustration({ art }: { art: PlateArt }) {
  const common = {
    viewBox: '0 0 64 64',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className: 'h-16 w-16 text-amber-300 sm:h-[4.5rem] sm:w-[4.5rem]',
    'aria-hidden': true,
  }
  if (art === 'bowl') {
    return (
      <svg {...common}>
        {/* Singing bowl on its cushion, with the mallet and three rising sound lines */}
        <path d="M14 34h36c0 9.5-8 16-18 16s-18-6.5-18-16z" />
        <path d="M14 34c0-1.6 8-3 18-3s18 1.4 18 3" />
        <path d="M20 53c3 2 7.5 3 12 3s9-1 12-3" />
        <path d="M44 22l9-9" />
        <circle cx="54.5" cy="11.5" r="2" />
        <path d="M24 24c-2-2.5-2-5 0-7.5" />
        <path d="M32 24c-2-3-2-6.5 0-9.5" />
        <path d="M40 24c-2-2.5-2-5 0-7.5" opacity="0.6" />
      </svg>
    )
  }
  if (art === 'mat') {
    return (
      <svg {...common}>
        {/* A rolled mat beside a small lotus: the one-to-one roundel on the flyer */}
        <ellipse cx="22" cy="40" rx="8" ry="8" />
        <ellipse cx="22" cy="40" rx="3.5" ry="3.5" />
        <path d="M22 32h22a8 8 0 0 1 0 16H22" />
        <path d="M30 48h14" />
        <path d="M44 22c-2.2-2.4-2.2-5.6 0-8 2.2 2.4 2.2 5.6 0 8z" />
        <path d="M44 22c-3.6.2-6.2-1.4-7.4-4.4 3.4-.4 5.9 1.1 7.4 4.4z" />
        <path d="M44 22c3.6.2 6.2-1.4 7.4-4.4-3.4-.4-5.9 1.1-7.4 4.4z" />
      </svg>
    )
  }
  return (
    <svg {...common}>
      <path d="M32 44c-5-5-5-13 0-20 5 7 5 15 0 20z" />
      <path d="M32 44c-8 .5-14-3-16-10 7-1 12.5 2.5 16 10z" />
      <path d="M32 44c8 .5 14-3 16-10-7-1-12.5 2.5-16 10z" />
    </svg>
  )
}
