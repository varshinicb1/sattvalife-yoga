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
    brief:
      'Amisha or Nish mid-pose at Trinity Methodist Church, full body, upright crop with space above the head. Currently filled with a portrait of Amisha: it is the highest-resolution genuine photograph we hold, and the brief asks for real images of the instructors. Replace it with a class photograph from the shoot.',
    ratio: '4/5',
    supply: '1230 x 1536px',
    src: '/images/opt/amisha-800.webp',
    srcSet: '/images/opt/amisha-480.webp 480w, /images/opt/amisha-800.webp 800w',
    sizes: '(min-width: 1024px) 420px, 78vw',
    alt: 'Amisha Soni, founder and teacher at Sattvalife Yoga',
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
  practiceYoga: {
    where: 'Homepage, "Find your practice" — Yoga card',
    brief: 'A pose from the Tuesday class in the hall, upright crop, room above the head',
    ratio: '4/5',
    supply: '760 x 950px',
    src: '/images/opt/garden-2-500.webp',
    alt: 'A standing pose during a Sattvalife class',
  },
  practicePilates: {
    where: 'Homepage, "Find your practice" — Pilates card',
    brief: 'Core work on the mat, upright crop',
    ratio: '4/5',
    supply: '760 x 950px',
    src: '/images/opt/garden-4-500.webp',
    alt: 'Core work on the mat during a Sattvalife session',
  },
  practiceBreathwork: {
    where: 'Homepage, "Find your practice" — Breathwork & Meditation card',
    brief: 'Seated breathing or candle meditation, eyes closed, calm light',
    ratio: '4/5',
    supply: '760 x 950px',
    src: '/images/opt/garden-3-500.webp',
    alt: 'Seated meditation during a Sattvalife session',
  },
  practiceSound: {
    where: 'Homepage, "Find your practice" — Sound Baths card',
    brief: 'Singing bowls with candles, warm low light, upright crop. No Sattvalife photograph of a sound bath exists yet.',
    ratio: '4/5',
    supply: '760 x 950px',
    src: null,
    alt: 'A Sattvalife sound bath',
  },
  practicePrivate: {
    where: 'Homepage, "Find your practice" — Private Sessions card',
    brief: 'A one-to-one moment: teacher adjusting a pose, in a home or small room',
    ratio: '4/5',
    supply: '760 x 950px',
    src: null,
    alt: 'A private Sattvalife session',
  },
  practiceCorporate: {
    where: 'Homepage, "Find your practice" — Corporate Wellness card',
    brief: 'A team session on site, upright crop of the wider office photograph',
    ratio: '4/5',
    supply: '760 x 950px',
    src: '/images/opt/office-session-1-1024.webp',
    alt: 'Amisha leading a workplace yoga session',
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
