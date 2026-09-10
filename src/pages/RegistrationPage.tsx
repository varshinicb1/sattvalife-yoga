import { useState } from 'react'
import { Link } from 'react-router'
import { Reveal } from '@/components/motion-primitives'
import { REGISTRATION_FORM } from '@/data/content'
import { CheckCircle2 } from 'lucide-react'

export default function RegistrationPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const painAreas = formData.getAll('pain').map(String)
    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string

    const payload = {
      name: [firstName, lastName].filter(Boolean).join(' '),
      firstName,
      lastName,
      dob: formData.get('dob') as string,
      occupation: formData.get('occupation') as string,
      address: formData.get('address') as string,
      city: formData.get('city') as string,
      postCode: formData.get('postCode') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      emergencyContact: formData.get('emergencyContact') as string,
      regType: formData.get('regType') as string,
      experience: formData.get('experience') as string,
      experienceDetail: formData.get('experienceDetail') as string,
      painAreas,
      surgeries: formData.get('surgeries') as string,
      notes: formData.get('notes') as string,
    }

    try {
      const res = await fetch('https://sattvalife-cms.cbvarshini1.workers.dev/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error('Registration failed')
      setSubmitted(true)
    } catch (err) {
      console.error('Registration submission failed', err)
      setError('We could not submit your registration — please check your connection and try again, or email us directly.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-3xl px-5">
        <Reveal>
          <h1 className="font-serif text-5xl text-forest-900 mb-4">Registration</h1>
          <p className="text-forest-700/75 mb-10">Fill in the form below and we'll get back to you with class details, fees, and venue information.</p>
        </Reveal>

        <Reveal delay={0.1}>
          {submitted ? (
            <div className="glass rounded-3xl p-8 md:p-12 shadow-xl text-center space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/10 text-amber-600">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-forest-900">Registration Received!</h2>
              <p className="text-forest-700/85 max-w-md mx-auto leading-relaxed">
                Thank you for registering! Your booking confirmation, calendar invite, and preparation guidelines have been triggered.
              </p>
              <div className="pt-4">
                <Link
                  to="/"
                  className="rounded-xl gold-click bg-forest-600 px-7 py-3 font-semibold text-cream-50 hover:bg-forest-500 transition-all inline-block"
                >
                  Return to Home
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="glass rounded-3xl p-8 md:p-10 shadow-xl space-y-6">
              {error && (
                <div className="rounded-xl bg-red-50 p-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              {/* Personal Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-forest-800 mb-1">First Name *</label>
                  <input
                    name="firstName"
                    required
                    placeholder="Jane"
                    className="w-full rounded-xl border border-forest-200 px-4 py-3 text-sm outline-none focus:border-forest-500 focus:ring-2 focus:ring-forest-500/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-forest-800 mb-1">Last Name *</label>
                  <input
                    name="lastName"
                    required
                    placeholder="Doe"
                    className="w-full rounded-xl border border-forest-200 px-4 py-3 text-sm outline-none focus:border-forest-500 focus:ring-2 focus:ring-forest-500/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-forest-800 mb-1">Date of Birth</label>
                  <input
                    name="dob"
                    type="date"
                    className="w-full rounded-xl border border-forest-200 px-4 py-3 text-sm outline-none focus:border-forest-500 focus:ring-2 focus:ring-forest-500/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-forest-800 mb-1">Occupation</label>
                  <input
                    name="occupation"
                    placeholder="Occupation"
                    className="w-full rounded-xl border border-forest-200 px-4 py-3 text-sm outline-none focus:border-forest-500 focus:ring-2 focus:ring-forest-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-forest-800 mb-1">Address</label>
                <input
                  name="address"
                  placeholder="Address"
                  className="w-full rounded-xl border border-forest-200 px-4 py-3 text-sm outline-none focus:border-forest-500 focus:ring-2 focus:ring-forest-500/20"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-forest-800 mb-1">City</label>
                  <input
                    name="city"
                    placeholder="City"
                    className="w-full rounded-xl border border-forest-200 px-4 py-3 text-sm outline-none focus:border-forest-500 focus:ring-2 focus:ring-forest-500/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-forest-800 mb-1">Post Code</label>
                  <input
                    name="postCode"
                    placeholder="Post Code"
                    className="w-full rounded-xl border border-forest-200 px-4 py-3 text-sm outline-none focus:border-forest-500 focus:ring-2 focus:ring-forest-500/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-forest-800 mb-1">Mobile</label>
                  <input
                    name="phone"
                    type="tel"
                    placeholder="+44 7700 900077"
                    className="w-full rounded-xl border border-forest-200 px-4 py-3 text-sm outline-none focus:border-forest-500 focus:ring-2 focus:ring-forest-500/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-forest-800 mb-1">Emergency Contact Number</label>
                  <input
                    name="emergencyContact"
                    type="tel"
                    placeholder="Emergency Contact Number"
                    className="w-full rounded-xl border border-forest-200 px-4 py-3 text-sm outline-none focus:border-forest-500 focus:ring-2 focus:ring-forest-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-forest-800 mb-1">E-mail Address *</label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="jane@example.com"
                  className="w-full rounded-xl border border-forest-200 px-4 py-3 text-sm outline-none focus:border-forest-500 focus:ring-2 focus:ring-forest-500/20"
                />
              </div>

              {/* Registration type */}
              <div>
                <p className="text-sm font-semibold text-forest-800 mb-3">Registering for:</p>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 text-sm text-forest-700"><input type="radio" name="regType" value="self" defaultChecked className="text-forest-600" /> Self</label>
                  <label className="flex items-center gap-2 text-sm text-forest-700"><input type="radio" name="regType" value="someone-else" className="text-forest-600" /> Someone else</label>
                </div>
              </div>

            {/* Experience */}
            <div>
              <p className="text-sm font-semibold text-forest-800 mb-3">Have you practiced yoga before?</p>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 text-sm text-forest-700"><input type="radio" name="experience" value="yes" className="text-forest-600" /> Yes</label>
                <label className="flex items-center gap-2 text-sm text-forest-700"><input type="radio" name="experience" value="no" defaultChecked className="text-forest-600" /> No</label>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-forest-800 mb-1">If yes, specify when and how long for? (years)</label>
              <input name="experienceDetail" type="number" min="0" placeholder="Years" className="w-full rounded-xl border border-forest-200 px-4 py-3 text-sm outline-none focus:border-forest-500 focus:ring-2 focus:ring-forest-500/20" />
            </div>

            {/* Pain areas */}
            <div>
              <p className="text-sm font-semibold text-forest-800 mb-1">Limitations / Injuries:</p>
              <p className="text-sm text-forest-700/80 mb-3">Do you have numbness/pain in (click all that apply):</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {REGISTRATION_FORM.painAreas.map((area) => (
                  <label key={area} className="flex items-center gap-2 text-sm text-forest-700">
                    <input type="checkbox" name="pain" value={area} className="text-forest-600 rounded" />
                    {area}
                  </label>
                ))}
              </div>
            </div>

            <input name="surgeries" placeholder="Any past surgeries or any illness that is not mentioned in our existing options" className="w-full rounded-xl border border-forest-200 px-4 py-3 text-sm outline-none focus:border-forest-500 focus:ring-2 focus:ring-forest-500/20" />

            <textarea name="notes" rows={3} placeholder="Additional notes / information" className="w-full rounded-xl border border-forest-200 px-4 py-3 text-sm outline-none focus:border-forest-500 focus:ring-2 focus:ring-forest-500/20 resize-none" />

            {/* Waiver */}
            <div className="rounded-xl bg-forest-50 p-5 text-sm text-forest-700/80 leading-relaxed space-y-3">
              <p className="font-semibold text-forest-800">Waiver</p>
              {REGISTRATION_FORM.waiver.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
              <label className="mt-1 flex items-start gap-3">
                <input type="checkbox" required className="mt-1 text-forest-600 rounded" />
                <span>I have read and agree to the <Link to="/terms" className="text-amber-500 underline">Terms & Conditions</Link></span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-forest-600 py-3.5 font-semibold text-cream-50 hover:bg-forest-500 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Submitting Registration...' : 'Submit Registration'}
            </button>
            <p className="text-center text-xs text-forest-700/50">You will receive an email with all the details regarding fees, venue and payment details.</p>
          </form>
          )}
        </Reveal>
      </div>
    </div>
  )
}
