import { Link } from 'react-router'
import { Reveal } from '@/components/motion-primitives'
import { Shield, Lock, Eye, FileText } from 'lucide-react'

export default function PrivacyPolicyPage() {
  return (
    <div className="relative py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-4xl px-5">
        <Reveal>
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-amber-600 mb-4">
            <Shield className="h-3.5 w-3.5" />
            <span>UK GDPR & Data Protection Act 2018 Compliant</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-forest-900 mb-4">Privacy Policy</h1>
          <p className="text-forest-700/75 mb-10 text-sm">Last updated: August 2026 · Sattvalife Yoga, Leicester, United Kingdom</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="glass rounded-3xl p-8 sm:p-12 shadow-xl space-y-10 text-forest-800/90 leading-relaxed">
            
            <section className="space-y-3">
              <h2 className="font-serif text-2xl text-forest-900 flex items-center gap-2">
                <FileText className="h-5 w-5 text-amber-500" />
                1. Introduction & Data Controller
              </h2>
              <p>
                Sattvalife Yoga ("we", "our", or "us") is committed to protecting and respecting your privacy in compliance with the <strong>UK General Data Protection Regulation (UK GDPR)</strong> and the <strong>Data Protection Act 2018</strong>.
              </p>
              <p>
                For the purposes of applicable UK data protection law, the Data Controller is <strong>Sattvalife Yoga</strong>, operating in Leicester, England, United Kingdom.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl text-forest-900 flex items-center gap-2">
                <Eye className="h-5 w-5 text-amber-500" />
                2. Information We Collect
              </h2>
              <p>We may collect and process the following categories of personal data:</p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-forest-800/80">
                <li><strong>Identity & Contact Information:</strong> Name, email address, telephone number, and emergency contact details.</li>
                <li><strong>Health & Fitness Declarations (Special Category Data):</strong> Relevant medical history, past injuries, surgeries, or pregnancy status provided voluntarily via our registration form to ensure safe practice. (Processed strictly under Explicit Consent, Article 9(2)(a) UK GDPR).</li>
                <li><strong>Transaction Data:</strong> Details of payments for classes, workshops, and memberships. Payment card details are tokenised and processed securely by <strong>Stripe Payments UK</strong>; we do not store full card numbers on our servers.</li>
                <li><strong>Technical & Usage Data:</strong> IP address, browser type, device information, and interaction logs via privacy-friendly analytics.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl text-forest-900 flex items-center gap-2">
                <Lock className="h-5 w-5 text-amber-500" />
                3. Lawful Bases for Processing
              </h2>
              <p>Under the UK GDPR, we rely on the following lawful bases:</p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-forest-800/80">
                <li><strong>Performance of a Contract:</strong> To register you for classes, fulfill course bookings, and manage your membership.</li>
                <li><strong>Explicit Consent:</strong> For health assessment questionnaires (PAR-Q) and marketing newsletters. You may withdraw consent at any time.</li>
                <li><strong>Legal Obligation:</strong> For maintaining accounting, tax, and insurance records required under UK law.</li>
                <li><strong>Legitimate Interests:</strong> To improve our studio services, manage customer relationships, and ensure site security.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl text-forest-900">4. Your Statutory Rights</h2>
              <p>Under UK data protection law, you have enforceable rights, including:</p>
              <ul className="list-disc list-inside space-y-1 pl-2 text-forest-800/80">
                <li><strong>The right of access:</strong> Request a copy of the personal data we hold about you (Subject Access Request).</li>
                <li><strong>The right to rectification:</strong> Request correction of inaccurate or incomplete information.</li>
                <li><strong>The right to erasure:</strong> Request deletion of your personal data ("right to be forgotten").</li>
                <li><strong>The right to restrict processing:</strong> Limit how we use your data in specific scenarios.</li>
                <li><strong>The right to data portability:</strong> Obtain and reuse your data for your own purposes.</li>
                <li><strong>The right to object:</strong> Object to processing based on legitimate interests or direct marketing.</li>
              </ul>
              <p className="pt-2 text-sm">
                To exercise any of these rights, please contact us at <a href="mailto:info@sattvalife.yoga" className="text-amber-600 underline font-medium">info@sattvalife.yoga</a>. We respond to all valid requests within 30 days free of charge.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl text-forest-900">5. Supervisory Authority (ICO)</h2>
              <p>
                If you have concerns about our information handling practices, you have the right to lodge a complaint with the UK supervisory authority:
              </p>
              <div className="rounded-2xl bg-forest-50 p-4 text-sm space-y-1">
                <p className="font-semibold text-forest-900">Information Commissioner's Office (ICO)</p>
                <p>Wycliffe House, Water Lane, Wilmslow, Cheshire, SK9 5AF</p>
                <p>Helpline: 0303 123 1113 · Website: <a href="https://ico.org.uk" target="_blank" rel="noreferrer" className="text-amber-600 underline">ico.org.uk</a></p>
              </div>
            </section>

            <div className="pt-6 border-t border-forest-100 flex items-center justify-between text-sm">
              <Link to="/" className="text-amber-600 hover:text-amber-700 underline">← Return to Home</Link>
              <Link to="/terms" className="text-forest-700 hover:text-forest-900 underline">Terms & Conditions →</Link>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
