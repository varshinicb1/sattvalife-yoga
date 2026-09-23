import { PHOTOS, type PhotoKey } from '@/data/photos'

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
  const photo = PHOTOS[slot]
  const style = { aspectRatio: photo.ratio }

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
