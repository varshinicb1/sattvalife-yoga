import { Reveal, SectionHeading } from '@/components/motion-primitives'
import { FOCUS_AREAS } from '@/data/content'
import { useCmsContent } from '@/hooks/useCmsContent'

/** Back · Belly · Breath: three cells, three different surfaces (photo, sage, brass). */
export default function FocusAreas() {
  const { images } = useCmsContent()
  const [back, belly, breath] = FOCUS_AREAS.areas
  const [backText, bellyText, breathText] = FOCUS_AREAS.benefits

  return (
    <section className="section-y bg-cream-100">
      <div className="container-page">
        <SectionHeading
          title={
            <>
              Back, belly <em className="font-normal text-forest-600">&amp;</em> breath
            </>
          }
          intro="Every class is built around our three key focus areas, so each flow leaves you stronger, lighter and calmer."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.35fr_1fr] lg:grid-rows-2">
          <Reveal className="lg:row-span-2">
            <article className="relative flex h-full min-h-[22rem] flex-col justify-end overflow-hidden rounded-3xl bg-forest-800 p-7 sm:min-h-[28rem] sm:p-10">
              <img
                src={images.poseImage}
                srcSet={images.poseImage.includes('/opt/studio-triangle') ? '/images/opt/studio-triangle-800.webp 800w, /images/opt/studio-triangle-1376.webp 1376w' : undefined}
                sizes="(min-width: 1024px) 700px, 100vw"
                width={1376}
                height={768}
                alt="Triangle pose, lengthening the spine and side body"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover object-[60%_center]"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-forest-950/25 to-transparent" />
              <div className="relative">
                <h3 className="text-5xl !text-cream-50 sm:text-6xl">{back}</h3>
                <p className="mt-2 max-w-sm text-lg text-cream-100/90">{backText}. Lengthen and strengthen the spine that carries you all day.</p>
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.08}>
            <article className="flex h-full flex-col justify-between gap-10 rounded-3xl bg-forest-600 p-7 text-cream-50 sm:p-10">
              <img
                src="/images/opt/garden-4-500.webp"
                alt="Core work on the mat during an outdoor class"
                width={500}
                height={500}
                loading="lazy"
                className="h-24 w-24 rounded-full border-4 border-forest-500/50 object-cover sm:h-28 sm:w-28"
              />
              <div>
                <h3 className="text-4xl !text-cream-50 sm:text-5xl">{belly}</h3>
                <p className="mt-2 text-lg text-cream-100/85">{bellyText}.</p>
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.16}>
            <article className="relative flex h-full min-h-[15rem] flex-col justify-end overflow-hidden rounded-3xl bg-amber-200 p-7 sm:p-10">
              <img
                src="/images/opt/lotus-mark-900.webp"
                alt=""
                aria-hidden="true"
                loading="lazy"
                width={900}
                height={484}
                className="pointer-events-none absolute -right-10 -top-6 w-64 max-w-none opacity-40 sm:w-72"
              />
              <div className="relative">
                <h3 className="text-4xl sm:text-5xl">{breath}</h3>
                <p className="mt-2 text-lg text-ink-900/80">{breathText}.</p>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
