import { useId } from 'react'
import { siFacebook, siInstagram, siTiktok, siWhatsapp, siYoutube, type SimpleIcon } from 'simple-icons'

const ICONS = { instagram: siInstagram, facebook: siFacebook, tiktok: siTiktok, youtube: siYoutube, whatsapp: siWhatsapp } satisfies Record<string, SimpleIcon>

export type BrandName = keyof typeof ICONS

/** Original brand colours, chosen to read on cream or white. Instagram uses its own gradient. */
const BRAND_FILL: Record<Exclude<BrandName, 'instagram'>, string> = {
  facebook: '#1877F2',
  youtube: '#FF0000',
  tiktok: '#1F1510',
  whatsapp: '#1F9E4F',
}

/**
 * Official brand marks from Simple Icons. Pass `colored` to paint them in the
 * brand's own colours (the default is currentColor, for one-colour contexts).
 * WhatsApp brightens to its official green when `onDark` is set.
 */
export function BrandIcon({
  name,
  className = 'h-5 w-5',
  colored = false,
  onDark = false,
}: {
  name: BrandName
  className?: string
  colored?: boolean
  onDark?: boolean
}) {
  const gradientId = useId()
  let fill = 'currentColor'
  if (colored) {
    if (name === 'instagram') fill = `url(#${gradientId})`
    else fill = name === 'whatsapp' && onDark ? '#25D366' : BRAND_FILL[name]
  }

  return (
    <svg viewBox="0 0 24 24" fill={fill} aria-hidden="true" className={className}>
      {colored && name === 'instagram' && (
        <defs>
          <linearGradient id={gradientId} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#FEDA75" />
            <stop offset="0.25" stopColor="#FA7E1E" />
            <stop offset="0.5" stopColor="#D62976" />
            <stop offset="0.75" stopColor="#962FBF" />
            <stop offset="1" stopColor="#4F5BD5" />
          </linearGradient>
        </defs>
      )}
      <path d={ICONS[name].path} />
    </svg>
  )
}
