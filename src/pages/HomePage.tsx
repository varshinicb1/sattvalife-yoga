import Hero from '@/sections/Hero'
import { About, Journey } from '@/sections/About'
import KeyFocusAreas from '@/sections/KeyFocusAreas'
import GetInTouch from '@/sections/GetInTouch'
import Newsletter from '@/sections/Newsletter'

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Journey />
      <KeyFocusAreas />
      <GetInTouch />
      <Newsletter />
    </>
  )
}
