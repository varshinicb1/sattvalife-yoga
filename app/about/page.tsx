import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";

export const dynamic = 'force-dynamic';
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Heart, Users, Sparkles, Target, Award, Star, ChevronRight, PersonStanding, Quote } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Sattvalife Yoga",
  description: "Learn about Sattvalife Yoga's mission, our instructors Amisha & Nish Soni, our journey, and the values that drive our yoga practice in Leicester.",
  openGraph: {
    title: "About Sattvalife Yoga",
    description: "Personalised yoga classes in Leicester with experienced instructors Amisha & Nish Soni.",
    type: "website",
    locale: "en_GB",
    siteName: "Sattvalife Yoga",
  },
};

const values = [
  { icon: Heart, title: "Authenticity", description: "We teach yoga as it was traditionally meant to be — a holistic practice for mind, body, and soul. No gimmicks, no shortcuts." },
  { icon: Users, title: "Community", description: "We foster a welcoming, inclusive space where everyone feels they belong. Yoga is for every body, regardless of age, ability, or background." },
  { icon: Leaf, title: "Growth", description: "We believe in continuous learning and personal development. Every class is an opportunity to grow stronger, calmer, and more self-aware." },
  { icon: Sparkles, title: "Wellness", description: "Our approach prioritises long-term wellbeing over short-term goals. We build sustainable habits that transform lives." },
];

const timeline = [
  { year: "2017", title: "The Beginning", description: "Amisha completes her yoga teacher training and begins teaching small groups in Leicester, driven by a desire to share yoga's transformative power." },
  { year: "2018", title: "Sattvalife is Born", description: "Sattvalife Yoga is formally founded. The name 'Sattva' comes from the Sanskrit term for purity, harmony, and balance — the essence of our practice." },
  { year: "2019", title: "Expanding Reach", description: "Nish joins as co-instructor. We partner with Trinity Methodist Church in Oadby for our weekly Tuesday Vinyasa sessions." },
  { year: "2021", title: "Thurnby Memorial Hall", description: "We expand to Thurnby Memorial Hall for Thursday Hatha classes, growing our community across Leicester." },
  { year: "2023", title: "Corporate Wellness", description: "We launch Sattvalife @Work, partnering with companies like NEXT in Leicester to bring yoga into the workplace." },
  { year: "2025", title: "Growing Community", description: "Over 200 students guided, 50+ corporate sessions delivered, and a thriving community of practitioners across Leicester." },
];

const stats = [
  { value: "8+", label: "Years Experience", icon: Award },
  { value: "200+", label: "Students Guided", icon: Users },
  { value: "50+", label: "Corporate Sessions", icon: Target },
  { value: "62", label: "5-Star Google Reviews", icon: Star },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary-50 via-background to-accent-50 pt-24">
          <div className="absolute inset-0 bg-[url(/hero-pattern.svg)] opacity-5" aria-hidden="true" />
          <div className="relative container mx-auto px-4 py-20">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
                <Leaf className="h-4 w-4" />
                Our Story
              </div>
              <h1 className="font-display text-5xl md:text-7xl font-semibold tracking-tight text-foreground mb-6">
                About <span className="text-primary">Sattvalife</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                We believe yoga has the power to improve anyone's quality of life, regardless of age or physical ability.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center p-4">
                    <stat.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                    <div className="font-display text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-gradient-to-br from-primary/5 via-background to-accent/5 border-primary/20">
                <CardContent className="p-8 md:p-12 text-center">
                  <Quote className="h-10 w-10 text-primary/30 mx-auto mb-6" />
                  <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-6">
                    Our Mission
                  </h2>
                  <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                    At Sattvalife, we endeavour to learn more about our students and offer them a personalised yoga class 
                    that fits their schedule, needs, and abilities. Our core objective is to spread awareness among everyone 
                    and share yoga's boundless boon. We believe in the power of Back, Belly, and Breathing — the three pillars 
                    of holistic wellbeing.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Instructors */}
        <section className="py-20 md:py-28 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Users className="h-4 w-4" />
                Meet Your Guides
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-6">
                Experienced, Caring Instructors
              </h2>
              <p className="text-lg text-muted-foreground">
                Learn from certified professionals who genuinely care about your journey.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="overflow-hidden border-0 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                <CardContent className="p-8 md:p-12">
                  <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                    <div className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0 rounded-2xl overflow-hidden bg-primary/10">
                      <div className="absolute inset-0 flex items-center justify-center text-primary">
                        <PersonStanding className="h-16 w-16" />
                      </div>
                    </div>
                    <div className="text-center md:text-left">
                      <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
                        Yoga & Fitness Instructor
                      </div>
                      <h3 className="font-display text-2xl md:text-3xl font-bold mb-2">Amisha Soni</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        As a teenager I was already pondering upon the meaning of life. My curiosity towards life 
                        and a constant push from my father led me to learn yoga for my personal development. 
                        Little did I know that I will take it up as a full time profession immediately after completing my degree.
                        Yoga changed my life by helping me fall in love with my imperfect self, discover my inner strength 
                        and truly appreciate everything in and around me. With a strong desire to share this knowledge 
                        and to help people discover their inner strength, I created Sattvalife yoga where people can 
                        trek on a journey of self discovery like never before. Come and join me in this journey!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-0 bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
                <CardContent className="p-8 md:p-12">
                  <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                    <div className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0 rounded-2xl overflow-hidden bg-accent/10">
                      <div className="absolute inset-0 flex items-center justify-center text-accent">
                        <Heart className="h-16 w-16" />
                      </div>
                    </div>
                    <div className="text-center md:text-left">
                      <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-3">
                        Yoga Instructor
                      </div>
                      <h3 className="font-display text-2xl md:text-3xl font-bold mb-2">Nish Soni</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        I discovered my inner self through yoga amidst the hush life of a metro city. Yoga did not only 
                        help me overcome the everyday stress but also inspired me to continue spreading this great practice 
                        to help achieve solace with one's own being. Yoga is a complete alignment of mind body and soul 
                        through a series of physical postures, breathing techniques and meditation. I was inclined towards 
                        joining to teach Sattvalife yoga because it focuses on the emotional maturity that one can gain 
                        from practicing yoga which forms the basis of a healthy mind and body leading to overall wellbeing.
                      </p>
                      <p className="text-muted-foreground italic mt-4">
                        "Surrender yourself completely and discover the complete you."
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Award className="h-4 w-4" />
                Our Journey
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-6">
                The Sattvalife Story
              </h2>
              <p className="text-lg text-muted-foreground">From a single class in 2017 to a thriving Leicester yoga community.</p>
            </div>

            <div className="max-w-3xl mx-auto">
              {timeline.map((item, index) => (
                <div key={item.year} className="relative pl-12 pb-12 last:pb-0">
                  {index !== timeline.length - 1 && (
                    <div className="absolute left-[23px] top-12 bottom-0 w-0.5 bg-primary/20" />
                  )}
                  <div className="absolute left-0 top-1 w-12 h-12 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center">
                    <span className="font-display text-sm font-bold text-primary">{item.year}</span>
                  </div>
                  <div className="pt-1">
                    <h3 className="font-display text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 md:py-28 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 text-primary-foreground text-sm font-medium mb-6">
                <Star className="h-4 w-4" />
                Our Values
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight mb-6">
                What Guides Us
              </h2>
              <p className="text-lg opacity-90">The principles that shape every class we teach.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {values.map((value) => (
                <Card key={value.title} className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground">
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary-foreground/10 mb-4">
                      <value.icon className="h-7 w-7" />
                    </div>
                    <h3 className="font-display text-xl font-semibold mb-3">{value.title}</h3>
                    <p className="text-sm opacity-80">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-6">
                Ready to Join Our Community?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Whether you're a complete beginner or an experienced practitioner, there's a place for you at Sattvalife.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="xl" className="w-full sm:w-auto" asChild>
                  <Link href="/register">Book Your First Class</Link>
                </Button>
                <Button size="xl" variant="outline" className="w-full sm:w-auto" asChild>
                  <Link href="/contact">Get in Touch</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
