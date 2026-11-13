import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

/**
 * "Find your practice" from the October 2026 client brief: image-led cards,
 * a picture with the name under it, one line, one action.
 *
 * Every picture sits in the same 4/5 frame, so the cards are the same height
 * and the names line up across the row. Practices without a real Sattvalife
 * photograph yet (Sound Baths, Private Sessions) show a branded plate at that
 * exact crop instead of a stock image, so nothing moves when the photo arrives:
 * set `photo` and the plate is replaced.
 */
type Practice = {
  id: string;
  name: string;
  text: string;
  href: string;
  cta: string;
  /** Real Sattvalife photograph, or null while one is still to be shot. */
  photo: { src: string; alt: string } | null;
  /** Shown on the branded plate while `photo` is null. */
  plateLine?: string;
};

const practices: Practice[] = [
  {
    id: 'yoga',
    name: 'Yoga',
    text: 'Our weekly Vinyasa class in Oadby. Small groups, every ability welcome.',
    href: '/schedule',
    cta: 'See the timetable',
    photo: { src: '/images/practice/yoga.webp', alt: 'A standing pose during a Sattvalife class' },
  },
  {
    id: 'pilates',
    name: 'Pilates',
    text: 'Core strength, posture and controlled movement, for groups or one to one.',
    href: '/contact',
    cta: 'Enquire',
    photo: {
      src: '/images/practice/pilates.webp',
      alt: 'Core work on the mat during a Sattvalife session',
    },
  },
  {
    id: 'breathwork',
    name: 'Breathwork & Meditation',
    text: 'Guided breathing and candle meditation to settle a busy mind.',
    href: '/contact',
    cta: 'Enquire',
    photo: {
      src: '/images/practice/breathwork.webp',
      alt: 'Seated meditation during a Sattvalife session',
    },
  },
  {
    id: 'soundbath',
    name: 'Sound Baths',
    text: 'Deep rest with singing bowls, as part of a celebration or a wellbeing morning.',
    href: '/contact',
    cta: 'Enquire',
    photo: null,
    plateLine: 'Singing bowls · deep rest',
  },
  {
    id: 'private',
    name: 'Private Sessions',
    text: 'One to one or a small group, in your space or ours, shaped around you.',
    href: '/contact',
    cta: 'Enquire',
    photo: null,
    plateLine: 'One to one · at your pace',
  },
  {
    id: 'corporate',
    name: 'Corporate Wellness',
    text: 'Desk yoga and wellbeing mornings for teams across Leicestershire.',
    href: '/corporate',
    cta: 'Request a proposal',
    photo: {
      src: '/images/practice/corporate.webp',
      alt: 'Amisha leading a workplace yoga session',
    },
  },
];

function PracticePlate({ name, line }: { name: string; line?: string }) {
  return (
    <div
      role="img"
      aria-label={`${name} at Sattvalife`}
      className="relative flex h-full w-full flex-col items-center justify-center gap-4 bg-gradient-to-br from-primary-50 via-background to-accent-100 p-6 text-center"
    >
      {/* Inset hairline frame: reads as an editorial plate, not an empty slot */}
      <div
        className="pointer-events-none absolute inset-3 rounded-2xl border border-primary/15"
        aria-hidden="true"
      />
      <Image
        src="/brand/lotus.png"
        alt=""
        aria-hidden="true"
        width={96}
        height={96}
        className="h-16 w-16 opacity-60 sm:h-20 sm:w-20"
      />
      {line ? (
        <p className="font-display text-sm uppercase tracking-[0.18em] text-primary/80">{line}</p>
      ) : null}
    </div>
  );
}

export function FindYourPractice() {
  return (
    <section
      className="py-20 md:py-28 bg-muted/20"
      id="practices"
      aria-labelledby="practices-heading"
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2
            id="practices-heading"
            className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-4"
          >
            Find your practice
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Whether you want a weekly class, a calmer celebration or something for your team, it
            starts in the same place.
          </p>
        </div>

        <ul className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {practices.map((p) => (
            <li key={p.id} className="h-full">
              <Link
                href={p.href}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  {p.photo ? (
                    <Image
                      src={p.photo.src}
                      alt={p.photo.alt}
                      fill
                      sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <PracticePlate name={p.name} line={p.plateLine} />
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="font-display text-2xl font-semibold leading-tight">{p.name}</h3>
                  <p className="mt-2 flex-1 text-base leading-relaxed text-muted-foreground">
                    {p.text}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-[0.95rem] font-semibold text-primary">
                    {p.cta}
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
