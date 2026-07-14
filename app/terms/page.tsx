import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms & Conditions | Sattvalife Yoga",
  description: "Sattvalife Yoga terms and conditions for class bookings, payments, cancellations, refunds, health & safety, and more.",
};

const sections = [
  {
    number: 1,
    title: "Introduction",
    content: "These Terms & Conditions govern your use of Sattvalife Yoga's services, including but not limited to yoga classes, workshops, corporate wellness programmes, and online sessions. By booking a class or using our services, you agree to be bound by these terms. Sattvalife Yoga is a trading name operated by Amisha Soni based in Leicester, United Kingdom.",
  },
  {
    number: 2,
    title: "Definitions",
    content: "'Sattvalife', 'we', 'us', 'our' refers to Sattvalife Yoga. 'Student', 'you', 'your' refers to any person attending our classes or using our services. 'Classes' includes all in-person and online yoga sessions, workshops, and wellness programmes offered by Sattvalife.",
  },
  {
    number: 3,
    title: "Classes & Booking",
    content: "All class bookings must be made through our website or by prior arrangement with the instructors. Class timetables are subject to change. We reserve the right to cancel or reschedule classes at any time. In such cases, students will be notified as soon as reasonably possible and offered an alternative class or full refund. Students are encouraged to arrive at least 5-10 minutes before the scheduled start time to allow for settling in.",
  },
  {
    number: 4,
    title: "Payment Terms",
    content: "All prices are listed in British Pounds Sterling (£) and include VAT where applicable. Payment is required at the time of booking unless otherwise agreed. We accept payment via debit/credit card through our secure Stripe payment gateway. Multi-class passes and memberships are non-refundable and non-transferable except as expressly stated in these terms.",
  },
  {
    number: 5,
    title: "Cancellation by Student",
    content: "Students may cancel a booked class up to 4 hours before the scheduled start time without penalty. Cancellations made less than 4 hours before class will result in the loss of that class credit. For multi-class passes, late cancellations count as a used class. To cancel, please use your account dashboard or contact us directly.",
  },
  {
    number: 6,
    title: "Cancellation by Sattvalife",
    content: "Sattvalife reserves the right to cancel a class due to insufficient bookings, instructor illness, venue issues, or circumstances beyond our reasonable control (including but not limited to severe weather, public health emergencies, or natural disasters). In such cases, students will be offered a full refund or class credit.",
  },
  {
    number: 7,
    title: "Refund Policy",
    content: "Single class bookings may be refunded if cancelled at least 48 hours before the scheduled class. Multi-class passes and monthly memberships are non-refundable but can be frozen for up to 3 months with written notice due to medical reasons (subject to a medical certificate) or pregnancy. No cash alternative will be offered for partially used passes.",
  },
  {
    number: 8,
    title: "Health & Safety",
    content: "Yoga is a physical activity. By attending our classes, you confirm that you are in good physical condition and do not have any medical condition that would make participation unsafe. You must inform the instructor before class of any injuries, medical conditions, or if you are pregnant. The instructor reserves the right to refuse or restrict participation if they believe it would be unsafe for you. Please consult your doctor before beginning any exercise programme.",
  },
  {
    number: 9,
    title: "Medical Waiver & Liability",
    content: "You participate in yoga classes entirely at your own risk. Sattvalife Yoga, its instructors, employees, and agents shall not be liable for any injury, loss, or damage sustained during or as a result of attending any class, workshop, or event. This includes but is not limited to physical injury, aggravation of existing conditions, loss of personal property, or any indirect or consequential loss. You acknowledge that yoga involves physical exertion and you voluntarily assume all risks associated with participation.",
  },
  {
    number: 10,
    title: "Pregnancy & Post-Natal",
    content: "If you are pregnant, have given birth within the last 3 months, or have had a Caesarean section within the last 6 months, you must notify the instructor before class. Some poses and practices may not be suitable. We reserve the right to request medical clearance before allowing participation. Post-natal students should have written clearance from their GP or midwife before attending.",
  },
  {
    number: 11,
    title: "Privacy & Data Protection",
    content: "We collect and process personal data in accordance with our Privacy Policy and the UK General Data Protection Regulation (UK GDPR). Personal information provided during booking is used solely for the purpose of managing your classes and communicating with you about your bookings. We do not share your data with third parties except as required for payment processing (Stripe) or legal obligations.",
  },
  {
    number: 12,
    title: "Intellectual Property",
    content: "All content provided during classes, including but not limited to sequences, instructions, materials, and handouts, is the intellectual property of Sattvalife Yoga. You may not record, reproduce, distribute, or commercially exploit any part of our classes without prior written consent. This includes photography, video, and audio recording during classes.",
  },
  {
    number: 13,
    title: "Photography & Video",
    content: "From time to time, we may take photographs or video footage during classes for promotional purposes on our website, social media, and marketing materials. If you do not wish to be photographed or filmed, please inform the instructor at the start of class. By attending class, you consent to the use of any general group shots that may include your likeness.",
  },
  {
    number: 14,
    title: "Code of Conduct",
    content: "Students are expected to behave respectfully towards instructors and fellow students. Disruptive, abusive, or inappropriate behaviour will not be tolerated. We reserve the right to refuse entry or ask any student to leave a class without refund if their behaviour is deemed unacceptable. Please keep noise to a minimum during class and turn off mobile phones.",
  },
  {
    number: 15,
    title: "Limitation of Liability",
    content: "To the maximum extent permitted by law, Sattvalife Yoga's total liability for any claim arising out of or relating to these terms or our services shall not exceed the amount paid by you for the specific class or service giving rise to the claim. We shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of income, loss of business, or loss of opportunity.",
  },
  {
    number: 16,
    title: "Gift Vouchers",
    content: "Gift vouchers are valid for 12 months from the date of purchase. They are non-refundable and cannot be exchanged for cash. Gift vouchers can be used towards any regular class booking unless otherwise stated.",
  },
  {
    number: 17,
    title: "Workshops & Events",
    content: "Special workshops and events may have separate terms and conditions, which will be communicated at the time of booking. Cancellation policies for workshops and events may differ from regular class policies. Please check the specific event details before booking.",
  },
  {
    number: 18,
    title: "Changes to Terms",
    content: "We reserve the right to update or modify these terms at any time without prior notice. Changes will be effective immediately upon posting on our website. Your continued use of our services after any changes constitutes acceptance of the new terms. We recommend reviewing these terms periodically.",
  },
  {
    number: 19,
    title: "Governing Law",
    content: "These terms and conditions shall be governed by and construed in accordance with the laws of England and Wales. Any disputes arising out of or relating to these terms shall be subject to the exclusive jurisdiction of the courts of England and Wales.",
  },
  {
    number: 20,
    title: "Contact Information",
    content: "For any questions, concerns, or complaints regarding these Terms & Conditions, please contact us at info@sattvalife.yoga. We will endeavour to respond to all enquiries within 48 hours during normal business hours.",
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Header />

      <main className="flex-1">
        <section className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                  <FileText className="h-4 w-4" />
                  Legal
                </div>
                <h1 className="font-display text-5xl md:text-6xl font-semibold tracking-tight text-foreground mb-6">
                  Terms & <span className="text-primary">Conditions</span>
                </h1>
                <p className="text-muted-foreground">Last updated: January 2025</p>
              </div>

              <Card className="border-primary/20 mb-8">
                <CardContent className="p-8">
                  <p className="text-muted-foreground">
                    Please read these Terms & Conditions carefully before booking any classes with Sattvalife Yoga. 
                    By booking a class, you agree to be bound by these terms.
                  </p>
                </CardContent>
              </Card>

              <div className="space-y-6">
                {sections.map((section) => (
                  <Card key={section.number} className="overflow-hidden border-border hover:border-primary/30 transition-colors">
                    <CardContent className="p-6 md:p-8">
                      <h2 className="font-display text-xl font-semibold mb-3 flex items-start gap-3">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm font-bold flex-shrink-0">
                          {section.number}
                        </span>
                        {section.title}
                      </h2>
                      <p className="text-muted-foreground leading-relaxed ml-11">{section.content}</p>
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
