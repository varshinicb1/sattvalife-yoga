import { useState, useId } from 'react'
import {
  ShieldCheck,
  Lock,
  Check,
  Clock,
  Globe,
  Video,
  Users,
  ArrowRight,
  Sparkles,
  Phone,
  Mail,
  User,
  Tag
} from 'lucide-react'
import PageHero from '@/components/PageHero'
import { useCmsContent } from '@/hooks/useCmsContent'
import { STRIPE_CONFIG } from '@/config'

type CurrencyCode = 'GBP' | 'USD' | 'EUR' | 'INR'

interface CurrencyRate {
  code: CurrencyCode
  symbol: string
  label: string
  rate: number
}

const CURRENCIES: Record<CurrencyCode, CurrencyRate> = {
  GBP: { code: 'GBP', symbol: '£', label: 'GBP (£)', rate: 1 },
  USD: { code: 'USD', symbol: '$', label: 'USD ($)', rate: 1.28 },
  EUR: { code: 'EUR', symbol: '€', label: 'EUR (€)', rate: 1.17 },
  INR: { code: 'INR', symbol: '₹', label: 'INR (₹)', rate: 107.0 }
}

interface PlanOption {
  id: 'monthly' | 'pass5' | 'dropIn'
  name: string
  validity: string
  basePriceGbp: number
  badge?: string
  description: string
  features: string[]
}

const PLANS: PlanOption[] = [
  {
    id: 'monthly',
    name: '30-Day Global Pass',
    validity: '30-Day Full Access',
    basePriceGbp: 36,
    badge: 'Most Popular',
    description: 'Unlimited access to all live batches, 24/7 video archive, AI Posture Lab, and teacher mentoring.',
    features: [
      'All live interactive classes (Zoom / Google Meet)',
      '24/7 on-demand class replay archive',
      'Unlimited AI Posture Analysis Lab access',
      'Private WhatsApp mentorship circle with Amisha',
      'Priority renewal and wellness habit support'
    ]
  },
  {
    id: 'pass5',
    name: '5-Class Flexible Pass',
    validity: '60-Day Validity',
    basePriceGbp: 45,
    description: 'Flexible pass to join any 5 live sessions within two months, suited for busy schedules.',
    features: [
      'Valid for any 5 scheduled group sessions',
      'Join in-studio in Leicester or online globally',
      'Small group with personalized attention',
      'Mats and props provided in studio'
    ]
  },
  {
    id: 'dropIn',
    name: 'Single Class Drop-In',
    validity: 'Single Session',
    basePriceGbp: 10,
    description: 'Join a single live class to experience Sattvalife’s breath-led Vinyasa practice.',
    features: [
      'One live class entry (online or in-studio)',
      'Direct guidance from Amisha',
      'Full posture modifications provided'
    ]
  }
]

const TIMEZONES = [
  { region: 'United Kingdom', zone: 'GMT / BST', time: 'Tuesday 6:30 PM & Saturday 9:00 AM' },
  { region: 'North America (EST)', zone: 'US / Canada', time: 'Tuesday 1:30 PM & Saturday 8:00 AM' },
  { region: 'India (IST)', zone: 'India Standard', time: 'Tuesday 10:00 PM & Saturday 2:30 PM' },
  { region: 'Europe (CET)', zone: 'Central Europe', time: 'Tuesday 7:30 PM & Saturday 10:00 AM' }
]

const COUNTRY_CODES = [
  { code: '+44', country: 'United Kingdom' },
  { code: '+1', country: 'USA / Canada' },
  { code: '+91', country: 'India' },
  { code: '+971', country: 'UAE' },
  { code: '+61', country: 'Australia' },
  { code: '+49', country: 'Germany' },
  { code: '+33', country: 'France' },
  { code: '+353', country: 'Ireland' },
  { code: '+65', country: 'Singapore' },
  { code: '+27', country: 'South Africa' }
]

export default function CheckoutPage() {
  const { stripe } = useCmsContent()
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>('GBP')
  const [selectedPlanId, setSelectedPlanId] = useState<'monthly' | 'pass5' | 'dropIn'>('monthly')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [countryCode, setCountryCode] = useState('+44')
  const [phone, setPhone] = useState('')
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const [discountPercent, setDiscountPercent] = useState(0)
  const [promoError, setPromoError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const nameInputId = useId()
  const emailInputId = useId()
  const countryCodeId = useId()
  const phoneInputId = useId()
  const promoInputId = useId()

  const currency = CURRENCIES[selectedCurrency]
  const plan = PLANS.find((p) => p.id === selectedPlanId) || PLANS[0]

  // Convert prices based on currency rate
  const formatPrice = (baseGbp: number) => {
    const raw = baseGbp * currency.rate
    if (currency.code === 'INR') {
      return Math.round(raw / 10) * 10
    }
    return Math.round(raw)
  }

  const basePriceFormatted = formatPrice(plan.basePriceGbp)
  const discountedPrice = promoApplied
    ? Math.round(basePriceFormatted * (1 - discountPercent / 100))
    : basePriceFormatted

  const handleApplyPromo = () => {
    setPromoError('')
    const clean = promoCode.trim().toUpperCase()
    if (clean === 'GLOBAL10' || clean === 'SATTVA10') {
      setPromoApplied(true)
      setDiscountPercent(10)
    } else if (clean === 'WELCOME15') {
      setPromoApplied(true)
      setDiscountPercent(15)
    } else {
      setPromoError('Invalid coupon code. Try GLOBAL10.')
      setPromoApplied(false)
      setDiscountPercent(0)
    }
  }

  const handleProceedToPayment = () => {
    if (!fullName.trim() || !email.trim()) {
      alert('Please enter your full name and email address before proceeding.')
      return
    }

    setIsSubmitting(true)

    // Lookup Stripe link from config or fallback
    const stripeLinks = stripe.paymentLinks || STRIPE_CONFIG.paymentLinks
    const linkKey = plan.id === 'monthly' ? 'monthly' : 'dropIn'
    const baseLink = stripeLinks[linkKey] || STRIPE_CONFIG.paymentLinks[linkKey]

    if (baseLink && baseLink.startsWith('https://')) {
      const url = new URL(baseLink)
      url.searchParams.set('prefilled_email', email)
      url.searchParams.set('client_reference_id', `${plan.id}-${selectedCurrency}-${Date.now()}`)
      window.location.assign(url.toString())
    } else {
      // Direct fallback
      setTimeout(() => {
        window.location.assign(
          `https://wa.me/447551100218?text=${encodeURIComponent(
            `Hi Amisha! I would like to confirm my registration for ${plan.name} (${currency.symbol}${discountedPrice} ${currency.code}). Name: ${fullName}, Email: ${email}, Phone: ${countryCode} ${phone}.`
          )}`
        )
      }, 600)
    }
  }

  return (
    <div className="min-h-screen bg-cream-50 text-ink-900">
      <PageHero
        eyebrow="Global Class Registration"
        title="Membership &amp; Class Booking"
        intro="Join live interactive sessions in Leicester or online across global time zones. Includes 30-day class replay vault and AI Posture Lab."
      />

      <section className="container-page py-10 md:py-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          
          {/* Left Column: Program Value & Global Inclusions (7 Cols) */}
          <div className="space-y-8 lg:col-span-7">
            
            {/* Header Badge Card */}
            <div className="rounded-3xl border border-forest-900/10 bg-white p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700">
                <Globe className="h-4 w-4" /> Global Online &amp; In-Studio Access
              </div>
              <h2 className="mt-2 font-serif text-3xl font-bold text-forest-950 sm:text-4xl">
                All-Level Vinyasa &amp; Breathwork Program
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-forest-900/80 sm:text-base">
                An authentic, breath-led yoga practice rooted in classical Indian tradition and tailored for modern bodies. 
                Whether you join us in Leicester or connect from anywhere across the globe, every session provides 
                individual alignment guidance and quiet mental stillness.
              </p>

              {/* Key Program Highlights Grid */}
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-cream-100/60 p-4 border border-forest-900/5">
                  <div className="flex items-center gap-2.5 font-serif font-bold text-forest-950">
                    <Video className="h-4 w-4 text-amber-600" />
                    <span>Live Interactive Classes</span>
                  </div>
                  <p className="mt-1.5 text-xs text-forest-900/75 leading-relaxed">
                    Live video stream with real-time feedback and alignment adjustments from Amisha.
                  </p>
                </div>

                <div className="rounded-2xl bg-cream-100/60 p-4 border border-forest-900/5">
                  <div className="flex items-center gap-2.5 font-serif font-bold text-forest-950">
                    <Clock className="h-4 w-4 text-amber-600" />
                    <span>24/7 Class Recordings</span>
                  </div>
                  <p className="mt-1.5 text-xs text-forest-900/75 leading-relaxed">
                    Missed a class or in a different time zone? Replay any session anytime during your 30-day pass.
                  </p>
                </div>

                <div className="rounded-2xl bg-cream-100/60 p-4 border border-forest-900/5">
                  <div className="flex items-center gap-2.5 font-serif font-bold text-forest-950">
                    <Sparkles className="h-4 w-4 text-amber-600" />
                    <span>AI Posture Lab Access</span>
                  </div>
                  <p className="mt-1.5 text-xs text-forest-900/75 leading-relaxed">
                    Unlimited biomechanical joint angle feedback and posture coaching right in your browser.
                  </p>
                </div>

                <div className="rounded-2xl bg-cream-100/60 p-4 border border-forest-900/5">
                  <div className="flex items-center gap-2.5 font-serif font-bold text-forest-950">
                    <Users className="h-4 w-4 text-amber-600" />
                    <span>Teacher Mentorship</span>
                  </div>
                  <p className="mt-1.5 text-xs text-forest-900/75 leading-relaxed">
                    Personal WhatsApp support for posture modifications, health questions, and accountability.
                  </p>
                </div>
              </div>
            </div>

            {/* Global Batches & Timezone Guide */}
            <div className="rounded-3xl border border-forest-900/10 bg-white p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between border-b border-forest-900/10 pb-4">
                <div>
                  <h3 className="font-serif text-xl font-bold text-forest-950">Live Class Schedule</h3>
                  <p className="text-xs text-forest-900/60 mt-0.5">Sessions are broadcast live and archived for all time zones.</p>
                </div>
                <Clock className="h-5 w-5 text-amber-700" />
              </div>

              <div className="mt-5 space-y-3">
                {TIMEZONES.map((tz) => (
                  <div key={tz.region} className="flex flex-col sm:flex-row sm:items-center justify-between rounded-2xl bg-cream-50 p-4 text-xs border border-forest-900/5">
                    <div>
                      <span className="font-serif font-bold text-forest-950 text-sm block">{tz.region}</span>
                      <span className="text-[0.7rem] uppercase tracking-wider text-amber-700 font-semibold">{tz.zone}</span>
                    </div>
                    <span className="mt-1.5 sm:mt-0 font-medium text-forest-900/85 bg-white px-3 py-1.5 rounded-xl border border-forest-900/5 self-start sm:self-auto">
                      {tz.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Teacher Profile & Credibility */}
            <div className="rounded-3xl border border-forest-900/10 bg-white p-6 sm:p-8 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-800 font-serif font-bold text-2xl border border-amber-600/20">
                  AS
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-forest-950">Led by Amisha Soni</h3>
                  <p className="text-xs text-amber-700 font-semibold">Founder &amp; Principal Teacher • Rated 5.0 on Google</p>
                  <p className="mt-3 text-xs leading-relaxed text-forest-900/80 sm:text-sm">
                    Amisha blends classical Indian yoga lineage with modern anatomy and mindful movement. 
                    Classes emphasize breath synchronicity (Vinyasa), nervous-system restoration, and personal 
                    encouragement for beginners and dedicated yogis alike.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Checkout Card (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 rounded-3xl border border-forest-900/15 bg-white p-6 sm:p-8 shadow-xl">
              
              {/* Currency Selector */}
              <div className="border-b border-forest-900/10 pb-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-forest-900/70">
                    Billing Currency
                  </span>
                  <span className="text-[0.7rem] text-forest-900/50">Auto-converts worldwide</span>
                </div>

                <div className="grid grid-cols-4 gap-1.5">
                  {(Object.keys(CURRENCIES) as CurrencyCode[]).map((c) => {
                    const isSelected = selectedCurrency === c
                    return (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setSelectedCurrency(c)}
                        className={`rounded-xl py-2 text-xs font-bold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-forest-950 text-cream-50 shadow-sm'
                            : 'bg-cream-100/70 text-forest-900 hover:bg-cream-100'
                        }`}
                      >
                        {CURRENCIES[c].label}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Pass Tier Selection */}
              <div className="mt-5 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-forest-900/70 block">
                  Select Program Tier
                </span>

                {PLANS.map((p) => {
                  const isSelected = selectedPlanId === p.id
                  const price = formatPrice(p.basePriceGbp)
                  return (
                    <label
                      key={p.id}
                      className={`relative flex flex-col rounded-2xl border p-4 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-amber-600 bg-amber-50/70 shadow-sm ring-1 ring-amber-600/30'
                          : 'border-forest-900/10 hover:border-forest-900/20 hover:bg-cream-50/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="plan"
                        value={p.id}
                        checked={isSelected}
                        onChange={() => setSelectedPlanId(p.id)}
                        className="sr-only"
                      />

                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-serif text-base font-bold text-forest-950">{p.name}</span>
                            {p.badge && (
                              <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[0.65rem] font-bold text-amber-900">
                                {p.badge}
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-forest-900/60 block mt-0.5">{p.validity}</span>
                        </div>

                        <div className="text-right">
                          <span className="font-serif text-xl font-bold text-forest-950">
                            {currency.symbol}{price}
                          </span>
                          <span className="text-[0.65rem] text-forest-900/60 block">{currency.code}</span>
                        </div>
                      </div>

                      <p className="mt-2 text-xs text-forest-900/75 leading-relaxed">{p.description}</p>
                    </label>
                  )
                })}
              </div>

              {/* Student Details Form */}
              <div className="mt-6 border-t border-forest-900/10 pt-5 space-y-3.5">
                <span className="text-xs font-bold uppercase tracking-wider text-forest-900/70 block">
                  Student Details
                </span>

                <div>
                  <label htmlFor={nameInputId} className="sr-only">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3 h-4 w-4 text-forest-900/40" />
                    <input
                      id={nameInputId}
                      type="text"
                      placeholder="Your Full Name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full rounded-xl border border-forest-900/15 bg-cream-50/50 pl-10 pr-3.5 py-2.5 text-xs text-forest-950 placeholder:text-forest-900/40 focus:border-amber-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-600/30"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor={emailInputId} className="sr-only">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3 h-4 w-4 text-forest-900/40" />
                    <input
                      id={emailInputId}
                      type="email"
                      placeholder="Email Address (for Zoom link)"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-forest-900/15 bg-cream-50/50 pl-10 pr-3.5 py-2.5 text-xs text-forest-950 placeholder:text-forest-900/40 focus:border-amber-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-600/30"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <label htmlFor={countryCodeId} className="sr-only">Country Code</label>
                  <select
                    id={countryCodeId}
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="w-24 shrink-0 rounded-xl border border-forest-900/15 bg-cream-50/50 px-2 py-2.5 text-xs text-forest-950 focus:border-amber-600 focus:bg-white focus:outline-none"
                  >
                    {COUNTRY_CODES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.code} ({c.country.slice(0, 8)})
                      </option>
                    ))}
                  </select>

                  <label htmlFor={phoneInputId} className="sr-only">WhatsApp Number</label>
                  <div className="relative flex-1">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-forest-900/40" />
                    <input
                      id={phoneInputId}
                      type="tel"
                      placeholder="WhatsApp Mobile Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-xl border border-forest-900/15 bg-cream-50/50 pl-9 pr-3.5 py-2.5 text-xs text-forest-950 placeholder:text-forest-900/40 focus:border-amber-600 focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Coupon Code Section */}
              <div className="mt-4 border-t border-forest-900/10 pt-4">
                <label htmlFor={promoInputId} className="sr-only">Promo Code</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-2.5 h-3.5 w-3.5 text-forest-900/40" />
                    <input
                      id={promoInputId}
                      type="text"
                      placeholder="Coupon Code (e.g. GLOBAL10)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="w-full rounded-xl border border-forest-900/15 bg-cream-50/50 pl-8 pr-3 py-2 text-xs uppercase text-forest-950 placeholder:text-forest-900/40 focus:border-amber-600 focus:bg-white focus:outline-none"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="rounded-xl border border-forest-900/20 bg-cream-100 px-4 py-2 text-xs font-bold text-forest-900 hover:bg-cream-200 transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {promoApplied && (
                  <p className="mt-1.5 text-xs text-emerald-700 font-semibold flex items-center gap-1">
                    <Check className="h-3 w-3" /> Coupon applied: {discountPercent}% discount!
                  </p>
                )}
                {promoError && (
                  <p className="mt-1.5 text-xs text-rose-600">{promoError}</p>
                )}
              </div>

              {/* Price Summary & Instant Checkout */}
              <div className="mt-5 rounded-2xl bg-cream-100/60 p-4 border border-forest-900/10">
                <div className="flex items-center justify-between text-xs text-forest-900/70">
                  <span>Plan Subtotal:</span>
                  <span className="font-mono">{currency.symbol}{basePriceFormatted}</span>
                </div>
                {promoApplied && (
                  <div className="mt-1 flex items-center justify-between text-xs text-emerald-700 font-medium">
                    <span>Discount ({discountPercent}%):</span>
                    <span className="font-mono">-{currency.symbol}{basePriceFormatted - discountedPrice}</span>
                  </div>
                )}
                <div className="mt-2.5 pt-2.5 border-t border-forest-900/10 flex items-baseline justify-between">
                  <span className="font-serif text-sm font-bold text-forest-950">Total Payable:</span>
                  <div className="text-right">
                    <span className="font-serif text-2xl font-bold text-forest-950">
                      {currency.symbol}{discountedPrice}
                    </span>
                    <span className="text-[0.68rem] text-forest-900/60 block">{currency.code} (Taxes included)</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={handleProceedToPayment}
                disabled={isSubmitting}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 py-3.5 text-sm font-bold text-forest-950 shadow-lg hover:from-amber-400 hover:to-amber-500 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
              >
                <Lock className="h-4 w-4" />
                <span>
                  {isSubmitting ? 'Opening Secure Gateway...' : `Complete Booking • ${currency.symbol}${discountedPrice}`}
                </span>
                <ArrowRight className="h-4 w-4" />
              </button>

              {/* Trust & Guarantee Notes */}
              <div className="mt-4 flex flex-col gap-2 text-center text-[0.7rem] text-forest-900/65">
                <div className="flex items-center justify-center gap-1.5 font-medium">
                  <ShieldCheck className="h-3.5 w-3.5 text-forest-800" />
                  <span>256-bit encrypted checkout via Stripe</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-forest-900/50">
                  <span>Apple Pay</span>
                  <span>•</span>
                  <span>Google Pay</span>
                  <span>•</span>
                  <span>Visa / Mastercard</span>
                  <span>•</span>
                  <span>UPI / Cards</span>
                </div>
                <p className="mt-1 text-[0.68rem] leading-tight">
                  Instant Zoom joining link and calendar invite delivered to your email upon confirmation.
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>
    </div>
  )
}
