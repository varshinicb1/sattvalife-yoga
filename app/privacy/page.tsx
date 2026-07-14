import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Sattvalife Yoga",
  description: "Sattvalife Yoga's privacy policy explains how we collect, use, and protect your personal data in compliance with UK GDPR.",
};

const sections = [
  {
    title: "1. Introduction",
    content: "Sattvalife Yoga ('we', 'our', 'us') is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal data when you visit our website, book classes, or use our services. We comply with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018. By using our services, you consent to the practices described in this policy.",
  },
  {
    title: "2. Information We Collect",
    content: "We collect personal information that you voluntarily provide to us when you book classes, register for an account, contact us, or sign up for our newsletter. This may include: your name, email address, phone number, billing address, payment information (processed securely through Stripe), health information relevant to your yoga practice (injuries, medical conditions, pregnancy status), emergency contact details, and correspondence history. We also automatically collect certain information when you visit our website, including your IP address, browser type, device information, and usage patterns through cookies and similar technologies.",
  },
  {
    title: "3. How We Use Your Information",
    content: "We use your personal data for the following purposes: to process and manage your class bookings and payments; to communicate with you about your bookings, schedule changes, and account-related matters; to provide personalised yoga instruction that is safe and appropriate for your health needs; to improve our services and website experience; to send you marketing communications (only with your explicit consent); to comply with legal obligations; and to protect our rights and interests. We will only use your health information to ensure your safety during classes and will not use it for any other purpose without your explicit consent.",
  },
  {
    title: "4. Legal Basis for Processing",
    content: "We process your personal data on the following legal bases: (a) Performance of a contract — processing necessary to fulfil our agreement to provide yoga classes and services to you; (b) Consent — where you have given explicit consent for marketing communications or processing of special category data such as health information; (c) Legitimate interests — for purposes such as improving our services and maintaining the security of our website; (d) Legal obligation — where we are required to process data by law.",
  },
  {
    title: "5. Data Sharing & Third Parties",
    content: "We do not sell, trade, or rent your personal data to third parties. We may share your information with trusted third-party service providers who assist us in operating our business, including: Stripe (payment processing — they handle your payment data in accordance with PCI DSS standards); email service providers for sending booking confirmations and updates; and analytics providers to help us understand website usage. All third parties are contractually bound to protect your data and may only use it for the specific purposes we instruct.",
  },
  {
    title: "6. Cookies",
    content: "Our website uses cookies and similar tracking technologies to enhance your browsing experience, analyse website traffic, and understand where our visitors come from. Essential cookies are necessary for the website to function properly. Analytics cookies help us understand how visitors interact with our site. We also use functional cookies to remember your preferences. You can control cookie preferences through your browser settings. Disabling certain cookies may affect your experience of our website. For more details, please see our Cookie Policy.",
  },
  {
    title: "7. Your Rights (GDPR)",
    content: "Under UK GDPR, you have the following rights regarding your personal data: (a) Right to access — request a copy of the personal data we hold about you; (b) Right to rectification — request correction of inaccurate or incomplete data; (c) Right to erasure — request deletion of your personal data, subject to certain legal obligations; (d) Right to restrict processing — request limitation of how we use your data; (e) Right to data portability — request transfer of your data to another service provider; (f) Right to object — object to processing based on legitimate interests or direct marketing. To exercise any of these rights, please contact us at info@sattvalife.yoga. We will respond to your request within 30 days.",
  },
  {
    title: "8. Data Retention",
    content: "We retain your personal data only for as long as necessary to fulfil the purposes for which it was collected, including any legal, accounting, or reporting requirements. Booking records are retained for 6 years following the date of your last class to comply with HMRC requirements. Health information is retained for the duration of your active membership and for 12 months after your last class. Marketing data is retained until you withdraw consent. When data is no longer required, it is securely deleted or anonymised.",
  },
  {
    title: "9. Data Security",
    content: "We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction. These measures include: SSL/TLS encryption for all data transmitted through our website; secure, encrypted storage of personal data; restricted access to personal data on a need-to-know basis; regular security assessments and updates; and PCI DSS compliant payment processing through Stripe. While we take every reasonable precaution, no method of electronic storage or transmission is 100% secure.",
  },
  {
    title: "10. International Data Transfers",
    content: "Your personal data is primarily stored and processed within the United Kingdom and the European Economic Area (EEA). Where we use third-party services that may involve data transfers outside the UK/EEA (such as Stripe), we ensure appropriate safeguards are in place, including Standard Contractual Clauses (SCCs) and the UK Addendum, to protect your data in accordance with UK GDPR requirements.",
  },
  {
    title: "11. Children's Privacy",
    content: "Our services are intended for individuals aged 16 and over. We do not knowingly collect personal data from children under 16. If we become aware that a child under 16 has provided us with personal data, we will take steps to delete such information. If you are a parent or guardian and believe your child has provided us with personal data, please contact us immediately.",
  },
  {
    title: "12. Changes to This Policy",
    content: "We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or operational needs. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically. Material changes will be notified to you via email where appropriate.",
  },
  {
    title: "13. Contact Us",
    content: "If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us: Email: info@sattvalife.yoga. We aim to respond to all enquiries within 48 hours. If you are not satisfied with our response, you have the right to lodge a complaint with the Information Commissioner's Office (ICO), the UK supervisory authority for data protection.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Header />

      <main className="flex-1">
        <section className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                  <Shield className="h-4 w-4" />
                  Privacy
                </div>
                <h1 className="font-display text-5xl md:text-6xl font-semibold tracking-tight text-foreground mb-6">
                  Privacy <span className="text-primary">Policy</span>
                </h1>
                <p className="text-muted-foreground">Last updated: January 2025</p>
              </div>

              <Card className="border-primary/20 mb-8">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <Lock className="h-8 w-8 text-primary" />
                    <p className="text-muted-foreground">
                      Your privacy matters to us. This policy explains how we handle your personal data.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                {sections.map((section, index) => (
                  <Card key={index} className="overflow-hidden border-border hover:border-primary/30 transition-colors">
                    <CardContent className="p-6 md:p-8">
                      <h2 className="font-display text-xl font-semibold mb-3">{section.title}</h2>
                      <p className="text-muted-foreground leading-relaxed">{section.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
