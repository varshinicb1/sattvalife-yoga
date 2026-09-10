import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionHeading } from '@/components/motion-primitives'
import { Calendar, MapPin, Sparkles, ArrowRight, CheckCircle2, Send, AlertCircle } from 'lucide-react'

const CONTACT_ENDPOINT = 'https://sattvalife-cms.cbvarshini1.workers.dev/api/contact'

interface Experience {
  id: string
  title: string
  category: 'retreat' | 'pop-up' | 'sound-bath' | 'outdoor' | 'corporate'
  location: string
  date: string
  duration: string
  price: string
  spotsLeft: number
  image: string
  description: string
  highlights: string[]
}

const EXPERIENCES: Experience[] = [
  {
    id: 'cotswolds-autumn-retreat',
    title: 'Autumn Equinox Mindful Immersion',
    category: 'retreat',
    location: 'Cotswolds Sanctuary, Oxfordshire',
    date: '18 - 20 October 2026',
    duration: '3 Days / 2 Nights',
    price: '£385',
    spotsLeft: 4,
    image: '/images/hero-yoga.jpg',
    description: 'A deeply restorative weekend featuring dynamic morning flow, calming Yin sessions, guided breathwork, and organic Ayurvedic nourishment.',
    highlights: ['Daily Pranayama & Asana', 'Ayurvedic Chef Dinners', 'Sound Healing Ceremonies', 'Nature Walking Meditations'],
  },
  {
    id: 'london-sound-bath-popup',
    title: 'Full Moon Sound Bath & Candlelit Yoga',
    category: 'sound-bath',
    location: 'The Glasshouse, Shoreditch, London',
    date: '28 September 2026 · 18:30',
    duration: '2 Hours',
    price: '£35',
    spotsLeft: 8,
    image: '/images/class-meditation.jpg',
    description: 'An atmospheric sound journey with Tibetan singing bowls, gongs, and restorative gentle movement in a serene candlelit space.',
    highlights: ['Crystal Singing Bowls', 'Gentle Restorative Poses', 'Herbal Tea & Closing Circle', 'Take-home Affirmation Card'],
  },
  {
    id: 'bristol-rooftop-popup',
    title: 'Sunrise Flow & Mindful Brews Pop-Up',
    category: 'outdoor',
    location: 'Harbour View Rooftop, Bristol',
    date: '12 September 2026 · 07:30',
    duration: '75 Minutes',
    price: '£22',
    spotsLeft: 6,
    image: '/images/class-vinyasa.jpg',
    description: 'Energising Vinyasa sequence overlooking the waterfront, followed by artisanal matcha, chai, and mindful connection.',
    highlights: ['Panoramic City Views', 'All-levels Dynamic Flow', 'Matcha / Chai included', 'Community Networking'],
  },
  {
    id: 'manchester-workplace-wellness',
    title: 'Executive Focus & Desk-Mobility Immersion',
    category: 'corporate',
    location: 'Spinningfields, Manchester (or On-Site)',
    date: 'Custom Date / By Booking',
    duration: 'Half Day / Full Day',
    price: 'From £450',
    spotsLeft: 12,
    image: '/images/class-hatha.jpg',
    description: 'Tailored corporate wellness sessions designed to counteract screen fatigue, reduce stress, and improve physical spinal mobility.',
    highlights: ['Ergonomic Posture Workshop', 'Stress-Relief Breathwork', 'Custom Team Scheduling', 'Hybrid / In-Person Delivery'],
  },
  {
    id: 'lake-district-solstice-escape',
    title: 'Winter Solstice Rejuvenation Retreat',
    category: 'retreat',
    location: 'Ambleside, Lake District',
    date: '11 - 13 December 2026',
    duration: '3 Days / 2 Nights',
    price: '£420',
    spotsLeft: 5,
    image: '/images/hero-bg.jpg',
    description: 'Embrace the stillness of winter with warming fireplace yoga, mindful hiking, hot stone restorative classes, and guided stillness.',
    highlights: ['Private Woodland Spa', 'Fireside Evening Yoga', 'Hot Stone Restorative', 'Scenic Mindful Hikes'],
  },
  {
    id: 'edinburgh-breathwork-masterclass',
    title: 'The Alchemy of Breath: Pop-Up Masterclass',
    category: 'pop-up',
    location: 'Stockbridge Studio, Edinburgh',
    date: '24 October 2026 · 14:00',
    duration: '2.5 Hours',
    price: '£40',
    spotsLeft: 9,
    image: '/images/class-yin.jpg',
    description: 'Scientific and yogic exploration of Pranayama to regulate the nervous system, increase energy, and enter deep parasympathetic recovery.',
    highlights: ['Vagus Nerve Activation', 'Breath-holding Protocols', 'Live Biofeedback Tips', 'Digital Integration Guide'],
  },
]

const CATEGORIES = [
  { label: 'All Experiences', value: 'all' },
  { label: 'Retreats', value: 'retreat' },
  { label: 'Pop-Up Events', value: 'pop-up' },
  { label: 'Sound Baths', value: 'sound-bath' },
  { label: 'Outdoor & Rooftop', value: 'outdoor' },
  { label: 'Workplace & Private', value: 'corporate' },
]

export default function ExperiencesPage() {
  const [activeCat, setActiveCat] = useState('all')
  const [customEnquiryOpen, setCustomEnquiryOpen] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [enquiryData, setEnquiryData] = useState({
    name: '',
    email: '',
    experienceType: 'Pop-Up Workshop',
    location: '',
    groupSize: '10-25 people',
    notes: '',
  })
  const enquirySectionRef = useRef<HTMLDivElement>(null)

  const filtered = activeCat === 'all'
    ? EXPERIENCES
    : EXPERIENCES.filter((e) => e.category === activeCat)

  const reserveSpot = (exp: Experience) => {
    setEnquiryData((prev) => ({
      ...prev,
      experienceType: 'Pop-Up Workshop',
      location: exp.location,
      notes: `Reservation request for "${exp.title}" — ${exp.date} at ${exp.location}.`,
    }))
    setFormSubmitted(false)
    setSubmitError(null)
    setCustomEnquiryOpen(true)
    enquirySectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitError(null)
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: enquiryData.name,
          email: enquiryData.email,
          type: 'reservation',
          message: `Experience enquiry — ${enquiryData.experienceType} · ${enquiryData.groupSize} · Location: ${enquiryData.location || 'Not specified'}\n\n${enquiryData.notes}`,
        }),
      })
      if (!res.ok) throw new Error(String(res.status))
      setFormSubmitted(true)
    } catch (err) {
      console.error('Experience enquiry submission failed', err)
      setSubmitError('We could not send your request — please check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="pt-24 pb-20">
      {/* Hero Header */}
      <section className="relative py-16 px-5 bg-gradient-to-b from-cream-100/60 via-cream-50 to-transparent">
        <div className="mx-auto max-w-5xl text-center">
          <SectionHeading
            eyebrow="UK-Wide Experiences & Pop-Ups"
            title="Mindful Immersions Beyond the Studio"
          />
          <p className="mt-4 text-forest-800/80 max-w-2xl mx-auto text-sm md:text-base">
            From boutique weekend retreats in the countryside to urban pop-ups, sound journeys, and bespoke corporate events across the UK.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="mx-auto max-w-7xl px-5">
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map((c) => (
            <button
              key={c.value}
              onClick={() => setActiveCat(c.value)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                activeCat === c.value
                  ? 'bg-amber-400 text-forest-950 shadow-md font-semibold'
                  : 'bg-cream-100/80 text-forest-800 hover:bg-cream-200/80 border border-forest-900/10'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Experience Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((exp, idx) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="group flex flex-col justify-between rounded-3xl border border-cream-200/80 bg-white/90 shadow-lg shadow-forest-950/5 overflow-hidden hover:shadow-xl hover:border-amber-400/50 transition-all duration-300"
              >
                <div>
                  <div className="relative h-56 overflow-hidden bg-forest-900">
                    <img
                      src={exp.image}
                      alt={exp.title}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="rounded-full bg-forest-900/80 backdrop-blur-md px-3 py-1 text-xs font-semibold text-amber-300 border border-amber-400/30 capitalize">
                        {exp.category.replace('-', ' ')}
                      </span>
                    </div>
                    <div className="absolute bottom-4 right-4 text-right">
                      <span className="text-xs text-cream-100/80 block">Price</span>
                      <span className="text-xl font-serif font-bold text-cream-50">{exp.price}</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-4 text-xs text-forest-700/80 mb-2">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-amber-600" />
                        {exp.date}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-amber-600" />
                        {exp.location}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl font-semibold text-forest-900 group-hover:text-amber-700 transition-colors">
                      {exp.title}
                    </h3>
                    <p className="mt-2 text-sm text-forest-800/80 line-clamp-3">
                      {exp.description}
                    </p>

                    <div className="mt-4 pt-4 border-t border-cream-200/60">
                      <p className="text-xs font-semibold uppercase tracking-wider text-forest-900/60 mb-2">Highlights</p>
                      <ul className="space-y-1.5 text-xs text-forest-800">
                        {exp.highlights.slice(0, 3).map((h) => (
                          <li key={h} className="flex items-center gap-2">
                            <Sparkles className="h-3 w-3 text-amber-500 shrink-0" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <div className="flex items-center justify-between pt-4 border-t border-cream-200/60">
                    <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                      {exp.spotsLeft} spots available
                    </span>
                    <button
                      type="button"
                      onClick={() => reserveSpot(exp)}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest-900 group-hover:text-amber-600 transition-colors"
                    >
                      Reserve Spot <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Host a Pop-Up / Private Event Banner & Form */}
      <section ref={enquirySectionRef} className="mx-auto max-w-5xl px-5 mt-24">
        <div className="relative rounded-3xl bg-gradient-to-br from-forest-900 via-forest-850 to-forest-950 p-8 md:p-12 text-cream-50 overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-400/20 px-3.5 py-1 text-xs font-semibold text-amber-300 border border-amber-400/30 mb-4">
              <Sparkles className="h-3.5 w-3.5" /> Bespoke UK Events & Pop-Ups
            </span>
            <h3 className="font-serif text-3xl md:text-4xl text-cream-50 leading-tight">
              Host a Sattvalife Experience at Your Venue or Company
            </h3>
            <p className="mt-4 text-sm md:text-base text-cream-100/80">
              We curate private retreats, corporate wellness days, festival pop-ups, and studio guest workshops across London, Bristol, Manchester, and throughout the UK.
            </p>

            {!customEnquiryOpen ? (
              <button
                onClick={() => setCustomEnquiryOpen(true)}
                className="mt-8 inline-flex items-center gap-2 rounded-xl gold-click bg-amber-400 px-6 py-3.5 text-sm font-semibold text-forest-950 hover:bg-amber-300 transition-all shadow-lg"
              >
                <span>Request a Custom Experience</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : formSubmitted ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 rounded-xl bg-amber-400/20 border border-amber-400/40 text-amber-200 flex items-center gap-3 text-sm"
              >
                <CheckCircle2 className="h-5 w-5 text-amber-400 shrink-0" />
                <span>Thank you! Your experience request has been received. Our events team will contact you within 24 hours.</span>
              </motion.div>
            ) : (
              <form onSubmit={handleEnquirySubmit} className="mt-8 space-y-4 bg-forest-800/60 backdrop-blur-md p-6 rounded-2xl border border-white/10">
                {submitError && (
                  <p className="flex items-center gap-2 rounded-xl bg-red-950/40 border border-red-400/30 px-4 py-2.5 text-sm text-red-200">
                    <AlertCircle className="h-4 w-4 shrink-0" /> {submitError}
                  </p>
                )}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-cream-100/80 mb-1">Your Name</label>
                    <input
                      type="text" required
                      value={enquiryData.name}
                      onChange={(e) => setEnquiryData({ ...enquiryData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full rounded-xl bg-cream-50/10 border border-white/20 px-3.5 py-2.5 text-sm text-cream-50 placeholder-cream-100/40 outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-cream-100/80 mb-1">Email Address</label>
                    <input
                      type="email" required
                      value={enquiryData.email}
                      onChange={(e) => setEnquiryData({ ...enquiryData, email: e.target.value })}
                      placeholder="jane@company.com"
                      className="w-full rounded-xl bg-cream-50/10 border border-white/20 px-3.5 py-2.5 text-sm text-cream-50 placeholder-cream-100/40 outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-cream-100/80 mb-1">Event Type</label>
                    <select
                      value={enquiryData.experienceType}
                      onChange={(e) => setEnquiryData({ ...enquiryData, experienceType: e.target.value })}
                      className="w-full rounded-xl bg-forest-900 border border-white/20 px-3.5 py-2.5 text-sm text-cream-50 outline-none focus:border-amber-400"
                    >
                      <option>Pop-Up Workshop</option>
                      <option>Sound Healing Ceremony</option>
                      <option>Corporate Wellness Day</option>
                      <option>Private Group Retreat</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-cream-100/80 mb-1">City / Location</label>
                    <input
                      type="text"
                      value={enquiryData.location}
                      onChange={(e) => setEnquiryData({ ...enquiryData, location: e.target.value })}
                      placeholder="e.g. London / Cotswolds"
                      className="w-full rounded-xl bg-cream-50/10 border border-white/20 px-3.5 py-2.5 text-sm text-cream-50 placeholder-cream-100/40 outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-cream-100/80 mb-1">Estimated Guests</label>
                    <select
                      value={enquiryData.groupSize}
                      onChange={(e) => setEnquiryData({ ...enquiryData, groupSize: e.target.value })}
                      className="w-full rounded-xl bg-forest-900 border border-white/20 px-3.5 py-2.5 text-sm text-cream-50 outline-none focus:border-amber-400"
                    >
                      <option>Under 10 guests</option>
                      <option>10 - 25 guests</option>
                      <option>25 - 50 guests</option>
                      <option>50+ guests</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-cream-100/80 mb-1">Details & Special Requests</label>
                  <textarea
                    rows={3}
                    value={enquiryData.notes}
                    onChange={(e) => setEnquiryData({ ...enquiryData, notes: e.target.value })}
                    placeholder="Tell us about the occasion, ideal dates, or specific wellness goals..."
                    className="w-full rounded-xl bg-cream-50/10 border border-white/20 px-3.5 py-2.5 text-sm text-cream-50 placeholder-cream-100/40 outline-none focus:border-amber-400"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setCustomEnquiryOpen(false)}
                    className="px-4 py-2 text-sm text-cream-100/70 hover:text-cream-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 rounded-xl gold-click bg-amber-400 px-6 py-2.5 text-sm font-semibold text-forest-950 hover:bg-amber-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="h-4 w-4" /> {submitting ? 'Sending...' : 'Send Request'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
