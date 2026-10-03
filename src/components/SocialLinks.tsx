import { SOCIALS, RATING } from '@/data/content'
import { BrandIcon, type BrandName } from '@/components/BrandIcon'
import { GoogleG } from '@/components/motion-primitives'

type Tone = 'light' | 'dark'

/**
 * The one social row used site-wide: every live account in its original brand
 * colours, then the Google reviews link. Accounts without a URL are skipped, so
 * TikTok and YouTube appear everywhere at once when their links are added to
 * SOCIALS. Each mark sits on a light disc so the brand colours read on cream and
 * on the dark footer alike.
 */
export default function SocialLinks({
  tone = 'light',
  size = 'md',
  className = '',
}: {
  tone?: Tone
  size?: 'sm' | 'md'
  className?: string
}) {
  const live = SOCIALS.filter((s) => s.url)
  const box = size === 'sm' ? 'h-9 w-9' : 'h-11 w-11'
  const icon = size === 'sm' ? 'h-[18px] w-[18px]' : 'h-5 w-5'
  const disc = `flex ${box} items-center justify-center rounded-full border transition duration-200 hover:-translate-y-0.5 hover:border-amber-400 hover:shadow-soft ${
    tone === 'dark' ? 'border-transparent bg-cream-50' : 'border-forest-900/10 bg-white'
  }`

  return (
    <ul className={`flex items-center gap-2 ${className}`}>
      {live.map((s) => (
        <li key={s.id}>
          <a href={s.url!} target="_blank" rel="noreferrer" aria-label={`Sattvalife on ${s.label}`} className={disc}>
            <BrandIcon name={s.id as BrandName} className={icon} colored />
          </a>
        </li>
      ))}
      <li>
        <a
          href={RATING.googleUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={`Sattvalife on Google, rated ${RATING.value} from ${RATING.total} reviews`}
          className={disc}
        >
          <GoogleG className={icon} />
        </a>
      </li>
    </ul>
  )
}
