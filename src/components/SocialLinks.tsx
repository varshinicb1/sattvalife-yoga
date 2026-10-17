import { SOCIALS, RATING } from '@/data/content'
import { BrandIcon, type BrandName } from '@/components/BrandIcon'
import { GoogleG } from '@/components/motion-primitives'

type Tone = 'light' | 'dark'

/**
 * The one social row used site-wide: every live account in its original brand
 * colours, then the Google reviews link. Accounts without a URL are skipped, so
 * TikTok and YouTube appear everywhere at once when their links are added to
 * SOCIALS.
 *
 * On cream the coloured marks stand on their own, so there is no disc behind
 * them. On the dark footer they would sink into the green, so there the disc
 * stays. Either way the <a> keeps a 44px box: the circle is what goes, not the
 * touch target.
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
  const icon = size === 'sm' ? 'h-[20px] w-[20px]' : 'h-6 w-6'
  const disc = `flex ${box} items-center justify-center rounded-full transition duration-200 hover:-translate-y-0.5 ${
    tone === 'dark'
      ? 'border border-transparent bg-cream-50 hover:border-amber-400 hover:shadow-soft'
      : 'hover:bg-amber-50'
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
