/**
 * Photography registry.
 *
 * Every image slot on the site is listed here with the crop it needs and the
 * shot it is waiting for. To swap in a real photo: drop the file into
 * public/images/, then set `src` (and `srcSet` if you have two sizes).
 * Slots with src = null render a calm branded frame instead of a broken gap.
 */
export interface PhotoSlot {
  /** Where it appears, for the shot list */
  where: string
  /** What to photograph */
  brief: string
  /** Rendered aspect ratio, e.g. '4/5' */
  ratio: string
  /** Pixel width to supply (2x the largest rendered width) */
  supply: string
  src: string | null
  srcSet?: string
  sizes?: string
  alt: string
}

const slots = {
  heroPortrait: {
    where: 'Homepage hero — the motif column, once a real photograph exists',
    brief:
      'Amisha or Nish mid-pose at Trinity Methodist Church, full body, upright crop with space above the head. The stock image that used to sit here was removed: the client asked for genuine Sattvalife photography only.',
    ratio: '4/5',
    supply: '1230 x 1536px',
    src: null,
    alt: 'Amisha teaching at the Tuesday evening class in Oadby',
  },
  focusBack: {
    where: 'Homepage, the large "Back" panel in Back · Belly · Breath',
    brief: 'A backbend or spine-lengthening pose, landscape, shot wide enough to crop. Currently filled by a 500px garden photo that is softer than the panel deserves.',
    ratio: '16/10',
    supply: '1600 x 1000px',
    src: '/images/opt/garden-1-500.webp',
    alt: 'A deep backbend during a Sattvalife class',
  },
  heroInset: {
    where: 'Homepage hero, the small circle overlapping the photo',
    brief: 'A warm close-up: hands in prayer, a seated student smiling, or a teaching moment',
    ratio: '1/1',
    supply: '600 x 600px',
    src: '/images/opt/garden-3-500.webp',
    alt: 'Seated meditation during an outdoor Sattvalife class',
  },
  classTue: {
    where: 'Classes page, Tuesday row',
    brief: 'The Tuesday class at Trinity Methodist Church: the room, mats down, a few students mid-flow',
    ratio: '4/3',
    supply: '1200 x 900px',
    src: null,
    alt: 'The Tuesday evening class at Trinity Methodist Church, Oadby',
  },
  celebration: {
    where: 'Celebrations page, top of the occasions row',
    brief: 'A celebration session in progress: a group in a home or hall, candles or mats, people smiling',
    ratio: '16/9',
    supply: '1600 x 900px',
    src: null,
    alt: 'A Sattvalife wellness celebration in progress',
  },
  teacherAmisha: {
    where: 'Teachers page and homepage',
    brief: 'Amisha, upright portrait, natural light, plain background',
    ratio: '4/5',
    supply: '1000 x 1250px',
    src: '/images/opt/amisha-800.webp',
    srcSet: '/images/opt/amisha-480.webp 480w, /images/opt/amisha-800.webp 800w',
    sizes: '(min-width: 768px) 380px, 90vw',
    alt: 'Portrait of Amisha Soni',
  },
  teacherNish: {
    where: 'Teachers page and homepage',
    brief: 'Nish, matching the Amisha portrait for framing and light',
    ratio: '4/5',
    supply: '1000 x 1250px',
    src: '/images/opt/nish-800.webp',
    srcSet: '/images/opt/nish-480.webp 480w, /images/opt/nish-800.webp 800w',
    sizes: '(min-width: 768px) 380px, 90vw',
    alt: 'Portrait of Nish Soni',
  },
  community: {
    where: 'Pre-footer community band',
    brief: 'Four recent Instagram posts: class moments, the community, a pose breakdown',
    ratio: '1/1',
    supply: '800 x 800px each',
    src: null,
    alt: 'A recent post from the Sattvalife Instagram',
  },
} satisfies Record<string, PhotoSlot>

export type PhotoKey = keyof typeof slots
/** Widened so optional fields (srcSet, sizes) are visible on every slot. */
export const PHOTOS: Record<PhotoKey, PhotoSlot> = slots

/** Slots still waiting on real photography, used to generate the shot list. */
export const MISSING_PHOTOS = (Object.entries(PHOTOS) as [PhotoKey, PhotoSlot][])
  .filter(([, slot]) => slot.src === null)
  .map(([key, slot]) => ({ key, ...slot }))
