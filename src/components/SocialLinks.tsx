import { SOCIALS, RATING } from '@/data/content'
import { BrandIcon } from '@/components/BrandIcon'
import { GoogleG } from '@/components/motion-primitives'

type Tone = 'light' | 'dark'

/**
 * Renders only the accounts that have a URL, so TikTok and YouTube appear
 * everywhere at once when their links are added to SOCIALS.
 */
export default function SocialLinks({
  tone = 'light',
  size = 'md',
  withGoogle = false,
  className = '',
}: {
  tone?: Tone
  size?: 'sm' | 'md'
  withGoogle?: boolean
  className?: string
}) {
  const live = SOCIALS.filter((s) => s.url)
  const box = size === 'sm' ? 'h-9 w-9' : 'h-11 w-11'
  const icon = size === 'sm' ? 'h-4 w-4' : 'h-[18px] w-[18px]'
  const skin =
    tone === 'dark'
      ? 'border-cream-50/15 text-cream-100 hover:border-amber-300 hover:text-amber-300'
      : 'border-forest-900/10 text-forest-800 hover:border-amber-500 hover:text-amber-600'

  return (
    <ul className={`flex items-center gap-2 ${className}`}>
      {live.map((s) => (
        <li key={s.id}>
          <a
            href={s.url!}
            target="_blank"
            rel="noreferrer"
            aria-label={`Sattvalife on ${s.label}`}
            className={`flex ${box} items-center justify-center rounded-full border transition-colors ${skin}`}
          >
            <BrandIcon name={s.id as 'instagram' | 'facebook' | 'tiktok' | 'youtube'} className={icon} />
          </a>
        </li>
      ))}
      {withGoogle && (
        <li>
          <a
            href={RATING.googleUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`Sattvalife on Google, rated ${RATING.value} from ${RATING.total} reviews`}
            className={`flex ${box} items-center justify-center rounded-full border transition-colors ${skin}`}
          >
            <GoogleG className={icon} />
          </a>
        </li>
      )}
    </ul>
  )
}
