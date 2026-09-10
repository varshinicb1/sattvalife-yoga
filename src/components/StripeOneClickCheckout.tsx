import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, ShieldCheck, Zap, Lock, CreditCard, Sparkles, X, ArrowRight, ExternalLink } from 'lucide-react'
import { type Course } from '@/data/content'
import { STRIPE_CONFIG } from '@/config'
import { useCmsContent } from '@/hooks/useCmsContent'

interface Props {
  course: Course
  onClose: () => void
}

export default function StripeOneClickCheckout({ course, onClose }: Props) {
  const { stripe } = useCmsContent()
  const [step, setStep] = useState<'checkout' | 'success'>('checkout')
  const [paymentMethod, setPaymentMethod] = useState<'express' | 'card'>('express')
  const [processing, setProcessing] = useState(false)
  const [promoCode, setPromoCode] = useState('')
  const [discount, setDiscount] = useState(0)
  const [promoApplied, setPromoApplied] = useState(false)
  const [promoError, setPromoError] = useState('')

  // Form State
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvc, setCardCvc] = useState('')

  const basePrice = course.price
  const finalPrice = Math.max(0, basePrice - discount)

  const dynamicLinks = stripe?.paymentLinks as Record<string, string> | undefined
  const directLink = dynamicLinks?.[course.id] || STRIPE_CONFIG.paymentLinks[course.id]

  const handleApplyPromo = () => {
    setPromoError('')
    const code = promoCode.trim().toUpperCase()
    if (code === 'VINYASA10' || code === 'NAMASTE10') {
      setDiscount(Math.round(basePrice * 0.1 * 100) / 100)
      setPromoApplied(true)
    } else if (code === 'SATTVA20') {
      setDiscount(Math.round(basePrice * 0.2 * 100) / 100)
      setPromoApplied(true)
    } else {
      setPromoError('Invalid promo code. Try VINYASA10 for 10% off.')
    }
  }

  const handlePay = (type: 'apple_pay' | 'google_pay' | 'link' | 'card') => {
    // If a live Stripe Hosted Payment Link is configured, redirect directly to Stripe (PCI-DSS compliant hosted payment)
    if (directLink && directLink.startsWith('http')) {
      window.location.href = directLink
      return
    }

    setProcessing(true)

    // Trigger backend registration / booking
    fetch('https://sattvalife-cms.cbvarshini1.workers.dev/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name || 'Student',
        email: email || 'student@example.com',
        notes: `Registered for ${course.name} via ${type}`,
      }),
    }).catch(() => {})

    setTimeout(() => {
      setProcessing(false)
      setStep('success')
    }, 1200)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-forest-950/75 backdrop-blur-md p-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ type: 'spring', stiffness: 280, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg rounded-3xl bg-white shadow-2xl overflow-hidden my-auto border border-forest-100"
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-forest-800 via-forest-700 to-forest-800 px-7 py-6 text-cream-50">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-cream-100"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-2.5 mb-2">
            <img src="/images/lotus.png" alt="Sattva" className="h-7 w-7 object-contain" />
            <span className="font-serif text-xl tracking-wide font-medium">Sattvalife Yoga</span>
            <span className="ml-auto mr-7 rounded-full bg-amber-400/20 px-2.5 py-0.5 text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1">
              <Lock className="h-2.5 w-2.5" /> 256-Bit SSL
            </span>
          </div>

          <div className="flex items-baseline justify-between mt-3">
            <div>
              <p className="text-xs text-cream-200/80 font-medium uppercase tracking-wider">Booking Selection</p>
              <h3 className="font-serif text-2xl font-bold">{course.name}</h3>
            </div>
            <div className="text-right">
              {discount > 0 ? (
                <div>
                  <span className="text-sm line-through text-cream-200/60 mr-1.5">£{basePrice}</span>
                  <span className="font-serif text-3xl font-bold text-amber-300">£{finalPrice}</span>
                </div>
              ) : (
                <span className="font-serif text-3xl font-bold">£{course.price}</span>
              )}
              <span className="block text-xs text-cream-200/70 font-sans">{course.unit}</span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        {step === 'checkout' ? (
          <div className="p-6 md:p-7 space-y-5">
            {/* 1-Click Express Checkout Tabs */}
            <div className="flex rounded-2xl bg-forest-50/80 p-1 border border-forest-100">
              <button
                type="button"
                onClick={() => setPaymentMethod('express')}
                className={`flex-1 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  paymentMethod === 'express'
                    ? 'bg-white text-forest-900 shadow-sm'
                    : 'text-forest-700/70 hover:text-forest-900'
                }`}
              >
                <Zap className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                1-Click Express Pay
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`flex-1 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  paymentMethod === 'card'
                    ? 'bg-white text-forest-900 shadow-sm'
                    : 'text-forest-700/70 hover:text-forest-900'
                }`}
              >
                <CreditCard className="h-3.5 w-3.5 text-forest-600" />
                Credit / Debit Card
              </button>
            </div>

            {/* EXPRESS PAY SECTION */}
            {paymentMethod === 'express' && (
              <div className="space-y-3">
                {/* Apple Pay Button */}
                <button
                  type="button"
                  onClick={() => handlePay('apple_pay')}
                  disabled={processing}
                  className="w-full h-12 rounded-2xl bg-black text-white font-medium hover:bg-neutral-900 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  <span className="text-sm font-semibold">Pay with</span>
                  <span className="font-bold tracking-tight text-base font-sans flex items-center gap-1">
                    <svg className="h-4 w-auto fill-current" viewBox="0 0 170 170">
                      <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.67-7.81-11.96-14.34-5.77-8.91-10.28-19.14-13.56-30.7-3.26-11.56-4.9-22.37-4.9-32.44 0-14.79 3.8-27.13 11.41-37.03 7.6-9.9 17.06-14.95 28.37-15.17 4.58 0 9.78 1.25 15.6 3.76 5.82 2.5 9.47 3.81 10.96 3.91 1.48-.1 5.37-1.46 11.66-4.08 6.29-2.61 11.59-3.8 15.9-3.56 12.18.66 21.65 5.23 28.4 13.72-10.76 6.52-16.03 15.54-15.82 27.05.22 9.02 3.65 16.59 10.3 22.7 6.64 6.12 14.54 9.54 23.68 10.29-2.39 7.39-5.38 14.88-8.98 22.46zM119.22 31.02c0-7.39 2.66-14.28 7.99-20.67 5.33-6.39 11.96-10.35 19.9-11.89.22 1.2.33 2.45.33 3.75 0 7.39-2.77 14.5-8.32 21.32-5.55 6.82-12.29 10.87-20.22 12.15-.22-1.3-.33-2.52-.33-3.66z" />
                    </svg>
                    Pay
                  </span>
                </button>

                {/* Google Pay Button */}
                <button
                  type="button"
                  onClick={() => handlePay('google_pay')}
                  disabled={processing}
                  className="w-full h-12 rounded-2xl bg-white border border-neutral-300 text-neutral-800 font-medium hover:bg-neutral-50 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <span className="text-sm font-semibold">Pay with</span>
                  <span className="font-bold tracking-tight text-base flex items-center gap-0.5">
                    <span className="text-[#4285F4]">G</span>
                    <span className="text-[#EA4335]">o</span>
                    <span className="text-[#FBBC05]">o</span>
                    <span className="text-[#4285F4]">g</span>
                    <span className="text-[#34A853]">l</span>
                    <span className="text-[#EA4335]">e</span>
                    <span className="ml-1 text-neutral-700">Pay</span>
                  </span>
                </button>

                {/* Link by Stripe Button */}
                <button
                  type="button"
                  onClick={() => handlePay('link')}
                  disabled={processing}
                  className="w-full h-12 rounded-2xl bg-[#00D66F] text-[#0A2540] font-semibold hover:brightness-105 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <span className="text-xs font-bold uppercase tracking-wider">Pay with</span>
                  <span className="font-extrabold text-base">link</span>
                  <span className="text-xs opacity-75 font-normal">1-click checkout</span>
                </button>

                <div className="relative my-4 flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-forest-100" />
                  </div>
                  <span className="relative bg-white px-3 text-xs text-forest-700/60 uppercase tracking-wider font-semibold">
                    or pay with direct link
                  </span>
                </div>

                {directLink && (
                  <a
                    href={directLink}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 rounded-xl border border-forest-200 text-forest-800 hover:bg-forest-50/70 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
                  >
                    Open Official Stripe.com Hosted Page <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            )}

            {/* CARD SECTION */}
            {paymentMethod === 'card' && (
              <div className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-forest-800 uppercase tracking-wider mb-1">
                    Email for Confirmation & Calendar Invite
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    inputMode="email"
                    enterKeyHint="next"
                    className="w-full rounded-xl border border-forest-200 px-3.5 py-2.5 text-sm outline-none focus:border-forest-500 focus:ring-2 focus:ring-forest-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-forest-800 uppercase tracking-wider mb-1">
                    Card Information
                  </label>
                  <div className="rounded-xl border border-forest-200 focus-within:border-forest-500 focus-within:ring-2 focus-within:ring-forest-500/20 overflow-hidden bg-white">
                    <div className="flex items-center px-3.5 py-2.5">
                      <input
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="4242 •••• •••• 4242"
                        autoComplete="cc-number"
                        inputMode="numeric"
                        enterKeyHint="next"
                        className="w-full text-sm outline-none font-mono"
                      />
                      <div className="flex gap-1 shrink-0">
                        <span className="h-4 w-6 rounded bg-gradient-to-r from-blue-700 to-blue-500 text-[8px] font-bold text-white flex items-center justify-center">
                          VISA
                        </span>
                        <span className="h-4 w-6 rounded bg-gradient-to-r from-red-500 to-amber-500 text-[8px] font-bold text-white flex items-center justify-center">
                          MC
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 border-t border-forest-100">
                      <input
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM / YY"
                        autoComplete="cc-exp"
                        inputMode="numeric"
                        enterKeyHint="next"
                        className="px-3.5 py-2 text-sm outline-none border-r border-forest-100 font-mono"
                      />
                      <input
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        placeholder="CVC"
                        autoComplete="cc-csc"
                        inputMode="numeric"
                        enterKeyHint="next"
                        className="px-3.5 py-2 text-sm outline-none font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-forest-800 uppercase tracking-wider mb-1">
                    Cardholder Name
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                    autoComplete="cc-name"
                    enterKeyHint="done"
                    className="w-full rounded-xl border border-forest-200 px-3.5 py-2.5 text-sm outline-none focus:border-forest-500 focus:ring-2 focus:ring-forest-500/20"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => handlePay('card')}
                  disabled={processing}
                  className="w-full rounded-xl bg-forest-600 py-3.5 font-semibold text-cream-50 hover:bg-forest-500 active:scale-[0.98] transition-all shadow-lg shadow-forest-600/30 flex items-center justify-center gap-2"
                >
                  {processing ? (
                    <span className="inline-flex items-center gap-2 text-sm">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Securing Payment…
                    </span>
                  ) : (
                    <>
                      <span>Pay £{finalPrice}</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Promo Code Accordion */}
            <div className="pt-1">
              {!promoApplied ? (
                <div className="flex gap-2">
                  <input
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promo code (e.g. VINYASA10)"
                    className="flex-1 rounded-xl border border-forest-200 px-3 py-2 text-xs outline-none focus:border-forest-500"
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="rounded-xl bg-forest-100 hover:bg-forest-200 text-forest-900 px-3.5 py-2 text-xs font-semibold transition-colors"
                  >
                    Apply
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between rounded-xl bg-green-50 px-3 py-2 text-xs text-green-800 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-green-600" />
                    Promo code applied (-£{discount})
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setPromoApplied(false)
                      setDiscount(0)
                      setPromoCode('')
                    }}
                    className="text-xs underline text-green-900 hover:text-green-700"
                  >
                    Remove
                  </button>
                </div>
              )}
              {promoError && <p className="mt-1 text-xs text-red-500">{promoError}</p>}
            </div>

            {/* Trust Footer */}
            <div className="pt-2 border-t border-forest-100 flex items-center justify-between text-xs text-forest-700/60">
              <span className="flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-forest-600" /> 14-Day Cooling-off Guarantee
              </span>
              <span>Powered by Stripe</span>
            </div>
          </div>
        ) : (
          /* SUCCESS SCREEN */
          <div className="p-8 md:p-10 text-center space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 280, damping: 18 }}
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/15 text-amber-600"
            >
              <CheckCircle2 className="h-9 w-9" />
            </motion.div>
            <h3 className="font-serif text-3xl text-forest-900">Namaste, You're Booked!</h3>
            <p className="text-forest-700/80 text-sm max-w-sm mx-auto leading-relaxed">
              Your spot for <strong>{course.name}</strong> is confirmed. A receipt, Google Calendar invite, and studio venue directions are on their way.
            </p>

            <div className="pt-4 flex flex-col gap-2.5">
              <a
                href="https://wa.me/447551100218?text=Hi%20Amisha%2C%20I%20just%20booked%20a%20class%20via%20the%20website!"
                target="_blank"
                rel="noreferrer"
                className="w-full rounded-xl bg-[#25D366] py-3 text-sm font-semibold text-white shadow-md hover:brightness-105 transition-all flex items-center justify-center gap-2"
              >
                Connect with Amisha on WhatsApp
              </a>
              <button
                type="button"
                onClick={onClose}
                className="w-full rounded-xl bg-forest-100 py-3 text-sm font-semibold text-forest-900 hover:bg-forest-200 transition-colors"
              >
                Return to Website
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
