import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";

import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, MapPin, User, Award, Users, ChevronRight, Leaf, Sparkles, HelpCircle, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Class Schedule | Sattvalife Yoga",
  description: "View our weekly yoga class schedule in Leicester. Tuesday Vinyasa at Trinity Methodist Oadby, Thursday Hatha at Thurnby Memorial Hall. All levels welcome.",
  openGraph: {
    title: "Yoga Class Schedule | Sattvalife Yoga",
    description: "Weekly Vinyasa and Hatha yoga classes in Leicester. Book your spot today.",
    type: "website",
    locale: "en_GB",
    siteName: "Sattvalife Yoga",
  },
};

const sessions = [
  {
    day: "Tuesday",
    date: "Weekly",
    time: "6:30 PM - 7:30 PM",
    className: "Vinyasa Flow",
    instructor: "Amisha Soni",
    location: "Trinity Methodist Church",
    address: "The Parade, Oadby, Leicester LE2 5AB",
    level: "All Levels",
    capacity: "20 spots",
    description: "Dynamic, breath-synchronised movement building strength, flexibility and mindful awareness. Each class flows through a sequence of postures linked by the breath, creating a moving meditation that strengthens the body and calms the mind.",
    benefits: ["Improves cardiovascular health", "Builds functional strength", "Enhances flexibility", "Reduces stress & anxiety"],
    color: "bg-primary/10 text-primary border-primary/20",
    iconColor: "text-primary",
    mapsUrl: "https://maps.google.com/?q=Trinity+Methodist+Church+The+Parade+Oadby+Leicester+LE2+5AB",
  },
  {
    day: "Thursday",
    date: "Weekly",
    time: "7:00 PM - 8:00 PM",
    className: "Hatha Yoga",
    instructor: "Nish Soni",
    location: "Thurnby Memorial Hall",
    address: "Main Street, Thurnby, Leicester LE7 9PN",
    level: "All Levels",
    capacity: "20 spots",
    description: "Traditional postures held with mindful awareness for deep release and alignment. Hatha yoga focuses on holding poses for longer durations, allowing for deeper muscular release and improved alignment.",
    benefits: ["Deep muscular release", "Improves posture & alignment", "Balances nervous system", "Suitable for all levels"],
    color: "bg-accent/10 text-accent border-accent/20",
    iconColor: "text-accent",
    mapsUrl: "https://maps.google.com/?q=Thurnby+Memorial+Hall+Main+Street+Thurnby+Leicester+LE7+9PN",
  },
];

const faqs = [
  {
    q: "Do I need to book in advance?",
    a: "Yes, we recommend booking in advance as classes are limited to 20 spots. You can book through our registration page.",
  },
  {
    q: "What should I bring to class?",
    a: "Please bring a yoga mat, comfortable clothing, and a water bottle. We have a limited number of spare mats available if needed.",
  },
  {
    q: "I'm a complete beginner. Can I join?",
    a: "Absolutely! Our classes are designed for all levels. Our instructors provide modifications for every pose, so you can practice at your own pace.",
  },
  {
    q: "What is the difference between Vinyasa and Hatha?",
    a: "Vinyasa is a dynamic, flow-based practice where poses are linked with breath. Hatha is gentler, with poses held for longer to develop alignment and deep release.",
  },
  {
    q: "What if I arrive late?",
    a: "Please try to arrive 5-10 minutes early to settle in. If you are late, enter quietly and join when you're ready.",
  },
  {
    q: "Is there parking available?",
    a: "Both venues have free parking available. Trinity Methodist has on-street parking, and Thurnby Memorial Hall has a dedicated car park.",
  },
];

export default function SchedulePage() {
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
                <Calendar className="h-4 w-4" />
                Class Timetable
              </div>
              <h1 className="font-display text-5xl md:text-7xl font-semibold tracking-tight text-foreground mb-6">
                Weekly <span className="text-primary">Schedule</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Two convenient locations in Leicester. All levels welcome. Book your spot today.
              </p>
            </div>
          </div>
        </section>

        {/* Weekly Timetable */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                {sessions.map((session) => (
                  <Card key={session.day} className={`overflow-hidden transition-all duration-300 hover:shadow-xl ${session.color} border`}>
                    <CardContent className="p-0">
                      <div className="p-6 md:p-8">
                        <div className="flex items-center gap-2 mb-4">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                            {session.day}s
                          </span>
                          <span className="text-sm text-muted-foreground">{session.date}</span>
                        </div>

                        <h3 className="font-display text-2xl font-semibold mb-4">{session.className}</h3>

                        <div className="space-y-3 mb-6">
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <Clock className={`h-5 w-5 ${session.iconColor}`} />
                            <span className="font-medium">{session.time}</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <User className={`h-5 w-5 ${session.iconColor}`} />
                            <span>{session.instructor}</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <MapPin className={`h-5 w-5 ${session.iconColor}`} />
                            <div>
                              <span className="font-medium">{session.location}</span>
                              <br />
                              <span className="text-xs">{session.address}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <Award className={`h-5 w-5 ${session.iconColor}`} />
                            <span>{session.level}</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <Users className={`h-5 w-5 ${session.iconColor}`} />
                            <span>{session.capacity}</span>
                          </div>
                        </div>

                        <p className="text-muted-foreground mb-4">{session.description}</p>

                        <div className="mb-6">
                          <h4 className="font-semibold text-sm mb-2">Benefits:</h4>
                          <ul className="space-y-1">
                            {session.benefits.map((benefit) => (
                              <li key={benefit} className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Leaf className={`h-3 w-3 ${session.iconColor}`} />
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                          <Button size="lg" className="w-full" asChild>
                            <Link href="/register">Book This Class</Link>
                          </Button>
                          <Button size="lg" variant="outline" className="w-full" asChild>
                            <a href={session.mapsUrl} target="_blank" rel="noopener noreferrer">
                              <MapPin className="h-4 w-4" /> View on Maps
                            </a>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Location Info */}
        <section className="py-20 md:py-28 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <MapPin className="h-4 w-4" />
                Our Locations
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-6">
                Where to Find Us
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="overflow-hidden border-primary/20">
                <CardContent className="p-6">
                  <div className="aspect-video rounded-xl bg-primary/10 mb-4 flex items-center justify-center">
                    <MapPin className="h-12 w-12 text-primary/40" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-2">Trinity Methodist Church</h3>
                  <p className="text-muted-foreground text-sm mb-1">The Parade, Oadby</p>
                  <p className="text-muted-foreground text-sm mb-4">Leicester LE2 5AB</p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://maps.google.com/?q=Trinity+Methodist+Church+The+Parade+Oadby+Leicester+LE2+5AB" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" /> Open in Google Maps
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-accent/20">
                <CardContent className="p-6">
                  <div className="aspect-video rounded-xl bg-accent/10 mb-4 flex items-center justify-center">
                    <MapPin className="h-12 w-12 text-accent/40" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-2">Thurnby Memorial Hall</h3>
                  <p className="text-muted-foreground text-sm mb-1">Main Street, Thurnby</p>
                  <p className="text-muted-foreground text-sm mb-4">Leicester LE7 9PN</p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://maps.google.com/?q=Thurnby+Memorial+Hall+Main+Street+Thurnby+Leicester+LE7+9PN" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" /> Open in Google Maps
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <div className="text-center mb-16">
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
                      <h3 className="font-semibold text-lg mb-2 flex items-start gap-2">
                        <Sparkles className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        {faq.q}
                      </h3>
                      <p className="text-muted-foreground ml-7">{faq.a}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight mb-6">
              Ready to Join Us on the Mat?
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Book your first class and experience the transformative power of yoga.
            </p>
            <Button size="xl" variant="secondary" className="w-full sm:w-auto" asChild>
              <Link href="/register">Book Now</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
