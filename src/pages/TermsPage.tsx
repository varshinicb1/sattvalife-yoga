import { Link } from 'react-router'
import { Reveal } from '@/components/motion-primitives'
import { Scale, CheckCircle2, AlertCircle } from 'lucide-react'

export default function TermsPage() {
  return (
    <div className="relative py-20 md:py-24 lg:py-28">
      <div className="mx-auto max-w-4xl px-5">
        <Reveal>
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-amber-600 mb-4">
            <Scale className="h-3.5 w-3.5" />
            <span>UK Consumer Rights Act 2015 Compliant</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-forest-900 mb-4">Terms & Conditions</h1>
          <p className="text-forest-700/75 mb-10 text-sm">Last updated: August 2026 · Governed by the Laws of England & Wales</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="glass rounded-3xl p-8 sm:p-12 shadow-xl space-y-10 text-forest-800/90 leading-relaxed">
            
            <section className="space-y-3">
              <h2 className="font-serif text-2xl text-forest-900">1. Agreement to Terms</h2>
              <p>
                These terms and conditions govern your use of the Sattvalife Yoga website and participation in our classes, courses, and corporate wellness sessions in Leicester, UK. By booking a class, purchasing a membership, or submitting a registration form, you agree to be bound by these terms.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl text-forest-900">2. Bookings, Payments & Pricing</h2>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-forest-800/80">
                <li>All prices are quoted in <strong>Pound Sterling (GBP, £)</strong>.</li>
                <li>Online transactions are processed securely via <strong>Stripe</strong>.</li>
                <li><strong>Drop-in passes:</strong> Valid only for the designated scheduled session.</li>
                <li><strong>Monthly memberships:</strong> Billed on a recurring 30-day basis and can be cancelled at any time before the next billing cycle.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl text-forest-900">3. Cancellation & Refund Policy (UK Regulations)</h2>
              <p>
                Under the Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013:
              </p>
              <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5 space-y-2 text-sm text-forest-900">
                <p className="font-semibold flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-600" />
                  Class Cancellation Policy:
                </p>
                <p>
                  Cancellations made with at least <strong>24 hours notice</strong> prior to class start time are eligible for a full credit or re-booking. Cancellations made with less than 24 hours notice or non-attendance are non-refundable.
                </p>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl text-forest-900">4. Health, Safety & Physical Disclaimer</h2>
              <div className="rounded-2xl bg-forest-50 p-5 space-y-3 text-sm">
                <p className="font-semibold flex items-center gap-2 text-forest-900">
                  <AlertCircle className="h-4 w-4 text-forest-700" />
                  Physical Activity Readiness (PAR-Q):
                </p>
                <p>
                  Yoga involves physical exertion. You should consult a physician prior to commencing any physical fitness regime. If at any time during class you feel pain, discomfort, or dizziness, please stop immediately and notify the instructor.
                </p>
                <p>
                  You agree that you participate in classes at your own risk and accept full responsibility for your physical wellbeing during sessions.
                </p>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl text-forest-900">5. Governing Law & Jurisdiction</h2>
              <p>
                These Terms and any dispute or claim arising out of or in connection with them shall be governed by and construed in accordance with the laws of <strong>England and Wales</strong>. The courts of England and Wales shall have exclusive jurisdiction.
              </p>
            </section>

            <div className="pt-6 border-t border-forest-100 flex items-center justify-between text-sm">
              <Link to="/" className="text-amber-600 hover:text-amber-700 underline">← Return to Home</Link>
              <Link to="/privacy" className="text-forest-700 hover:text-forest-900 underline">Privacy Policy →</Link>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
