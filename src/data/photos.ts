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
    where: 'Homepage hero, the large arched photo',
    brief: 'Amisha or Nish mid-pose in a bright hall, full body, upright crop with space above the head',
    ratio: '4/5',
    supply: '1230 x 1536px',
    src: '/images/opt/studio-triangle-portrait-900.webp',
    srcSet: '/images/opt/studio-triangle-portrait-560.webp 560w, /images/opt/studio-triangle-portrait-900.webp 614w',
    sizes: '(min-width: 1024px) 460px, 80vw',
    alt: 'A student holding triangle pose in a calm, sunlit studio',
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
  classThu: {
    where: 'Classes page, Thursday row',
    brief: 'The Thursday class at Thurnby Memorial Hall, same idea as Tuesday',
    ratio: '4/3',
    supply: '1200 x 900px',
    src: null,
    alt: 'The Thursday evening class at Thurnby Memorial Hall',
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
