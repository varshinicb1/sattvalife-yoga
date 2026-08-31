import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock, Sparkles, ExternalLink, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | Sattvalife Yoga",
  description: "Get in touch with Sattvalife Yoga. Find us at Trinity Methodist Church Oadby or Thurnby Memorial Hall. Email info@sattvalife.yoga or use our contact form.",
  openGraph: {
    title: "Contact Sattvalife Yoga",
    description: "Get in touch with Sattvalife Yoga in Leicester. Classes at Trinity Methodist Oadby and Thurnby Memorial Hall.",
    type: "website",
    locale: "en_GB",
    siteName: "Sattvalife Yoga",
  },
};

const locations = [
  {
    name: "Trinity Methodist Church",
    address: "The Parade, Oadby, Leicester LE2 5AB",
    day: "Tuesday",
    time: "6:30 PM - 7:30 PM",
    class: "Vinyasa Flow",
    mapsUrl: "https://maps.google.com/?q=Trinity+Methodist+Church+The+Parade+Oadby+Leicester+LE2+5AB",
  },
  {
    name: "Thurnby Memorial Hall",
    address: "Main Street, Thurnby, Leicester LE7 9PN",
    day: "Thursday",
    time: "7:00 PM - 8:00 PM",
    class: "Hatha Yoga",
    mapsUrl: "https://maps.google.com/?q=Thurnby+Memorial+Hall+Main+Street+Thurnby+Leicester+LE7+9PN",
  },
];

const faqs = [
  {
    q: "What is the best way to contact you?",
    a: "Email is the fastest way to reach us at info@sattvalife.yoga. We aim to respond within 24 hours. You can also use the contact form on this page.",
  },
  {
    q: "Can I visit a class before booking?",
    a: "Absolutely! You're welcome to come and observe a class before deciding to join. Just let us know in advance so we can prepare for you.",
  },
  {
    q: "Do you offer private sessions?",
    a: "Yes, we offer private one-on-one yoga sessions and small group sessions. Contact us with your requirements and we'll create a personalised plan for you.",
  },
  {
    q: "What should I wear to class?",
    a: "Wear comfortable, stretchy clothing that allows you to move freely. Yoga is practiced barefoot. Avoid wearing loose jewellery that might get in the way.",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary-50 via-background to-accent-50 pt-24">
          <div className="absolute inset-0 bg-[url(/hero-pattern.svg)] opacity-5" aria-hidden="true" />
          <div className="relative container mx-auto px-4 py-20">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
                <Sparkles className="h-4 w-4" />
                Get In Touch
              </div>
              <h1 className="font-display text-5xl md:text-7xl font-semibold tracking-tight text-foreground mb-6">
                Contact <span className="text-primary">Us</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Have a question? Want to book a private session? Interested in corporate wellness? We'd love to hear from you.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info + Form */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-start">
                {/* Contact Info */}
                <div className="space-y-6">
                  <h2 className="font-display text-3xl font-semibold text-foreground mb-6">Let's Connect</h2>

                  <div className="flex items-start gap-4 p-5 rounded-xl bg-primary/5 border border-primary/10">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary flex-shrink-0">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <a href="mailto:info@sattvalife.yoga" className="text-primary hover:underline">info@sattvalife.yoga</a>
                      <p className="text-sm text-muted-foreground mt-1">We aim to respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-5 rounded-xl bg-accent/5 border border-accent/10">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 text-accent flex-shrink-0">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Phone / WhatsApp</h3>
                      <a href="tel:+447xxx" className="text-primary hover:underline">+44 7xxx xxxxxx</a>
                      <p className="text-sm text-muted-foreground mt-1">Available during class times or leave a message</p>
                    </div>
                  </div>

                  {locations.map((location, index) => (
                    <div key={location.name} className={`flex items-start gap-4 p-5 rounded-xl border ${index === 0 ? 'bg-green-50/50 border-green-200' : 'bg-amber-50/50 border-amber-200'}`}>
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${index === 0 ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'} flex-shrink-0`}>
                        <MapPin className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{location.name}</h3>
                        <p className="text-sm text-muted-foreground">{location.address}</p>
                        <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {location.day}s {location.time}</span>
                        </div>
                        <a href={location.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-primary hover:underline mt-2">
                          <ExternalLink className="h-3.5 w-3.5" /> Open in Maps
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Form */}
                <Card className="border-primary/20">
                  <CardContent className="p-8">
                    <h2 className="font-display text-2xl font-semibold mb-6">Send Us a Message</h2>
                    <form className="space-y-5" action="/api/contact" method="POST">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium mb-1">First Name *</label>
                          <input id="firstName" name="firstName" type="text" required className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="John" />
                        </div>
                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium mb-1">Last Name *</label>
                          <input id="lastName" name="lastName" type="text" required className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Doe" />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">Email *</label>
                        <input id="email" name="email" type="email" required className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="john@example.com" />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone</label>
                        <input id="phone" name="phone" type="tel" className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="+44 7xxx xxxxxx" />
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-1">Message *</label>
                        <textarea id="message" name="message" rows={5} required className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none" placeholder="How can we help you? Tell us about your enquiry..." />
                      </div>
                      <Button type="submit" size="lg" className="w-full">
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Locations Map Placeholder */}
        <section className="py-20 md:py-28 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                  <MapPin className="h-4 w-4" />
                  Our Venues
                </div>
                <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-6">
                  Find Us in Leicester
                </h2>
              </div>

              <Card className="overflow-hidden border-primary/20">
                <div className="aspect-[21/9] bg-gradient-to-br from-primary/10 via-background to-accent/10 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-16 w-16 text-primary/40 mx-auto mb-4" />
                    <p className="text-muted-foreground">Map integration coming soon</p>
                    <p className="text-sm text-muted-foreground">Trinity Methodist Church, Oadby & Thurnby Memorial Hall</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                  <HelpCircle className="h-4 w-4" />
                  FAQ
                </div>
                <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-6">
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
                      <p className="text-muted-foreground">{faq.a}</p>
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
