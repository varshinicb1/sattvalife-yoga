import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";

export const dynamic = 'force-dynamic';
import { Card, CardContent } from "@/components/ui/card";
import { PersonStanding, Sparkles, Heart, Leaf, Users, User, Building2, Calendar, MapPin, Clock, ChevronRight, Star, Award, Shield, Truck, Target, Mail, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Stop Worrying, Start Living! | Personalised Yoga Classes in Leicester",
  description: "Sattvalife offers personalised yoga classes in Leicester for individuals, small groups, and corporates. Vinyasa, Hatha, meditation & wellness programmes with Amisha & Nish Soni.",
  keywords: ["yoga Leicester", "vinyasa yoga Leicester", "hatha yoga Leicester", "meditation classes Leicester", "corporate wellness Leicester", "yoga teacher Amisha Soni", "private yoga classes Leicester"],
  openGraph: {
    title: "Sattvalife Yoga - Personalised Yoga Classes in Leicester",
    description: "Stop Worrying, Start Living! Personalised yoga for individuals, groups & corporates.",
    type: "website",
    locale: "en_GB",
    siteName: "Sattvalife Yoga",
    images: ["/og-default.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sattvalife Yoga",
    description: "Personalised yoga classes in Leicester for all levels.",
    images: ["/og-default.jpg"],
  },
};

const features = [
  {
    icon: PersonStanding,
    title: "Vinyasa Flow",
    description: "Dynamic, breath-synchronised movement building strength, flexibility and mindful awareness",
    benefits: ["Improves cardiovascular health", "Builds functional strength", "Enhances flexibility", "Reduces stress & anxiety"],
    color: "bg-primary/10 text-primary border-primary/20",
    iconColor: "text-primary",
  },
  {
    icon: Heart,
    title: "Hatha Yoga",
    description: "Traditional postures held with mindful awareness for deep release and alignment",
    benefits: ["Deep muscular release", "Improves posture & alignment", "Balances nervous system", "Suitable for all levels"],
    color: "bg-accent/10 text-accent border-accent/20",
    iconColor: "text-accent",
  },
  {
    icon: Sparkles,
    title: "Meditation & Breathwork",
    description: "Guided practices for mental clarity, stress reduction and inner peace",
    benefits: ["Reduces anxiety & stress", "Improves focus & clarity", "Better sleep quality", "Emotional regulation"],
    color: "bg-green-100 text-green-700 border-green-200",
    iconColor: "text-green-600",
  },
];

const focusAreas = [
  { icon: Leaf, title: "Back", benefit: "Improved back strength & posture", detail: "Targeted sequences for spinal health and core stability", color: "bg-primary/10 text-primary" },
  { icon: Sparkles, title: "Belly", benefit: "Toned core & improved digestion", detail: "Core engagement through bandhas and mindful movement", color: "bg-accent/10 text-accent" },
  { icon: Heart, title: "Breathing", benefit: "Deeper, relaxed, corrective breathing", detail: "Pranayama techniques for nervous system regulation", color: "bg-green-100 text-green-700" },
];

const schedule = [
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
    color: "bg-primary/10 text-primary border-primary/20",
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
    color: "bg-accent/10 text-accent border-accent/20",
  },
];

const stats = [
  { value: "8+", label: "Years Experience", icon: Award },
  { value: "200+", label: "Students Guided", icon: Users },
  { value: "50+", label: "Corporate Sessions", icon: Building2 },
  { value: "100%", label: "Client Satisfaction", icon: Star },
];

const trustSignals = [
  { icon: Shield, title: "Experienced Teachers", desc: "8+ years guiding students safely" },
  { icon: Users, title: "Small Group Sizes", desc: "Max 20 students for personal attention" },
  { icon: Award, title: "Qualified Instructors", desc: "Certified yoga & fitness professionals" },
  { icon: Star, title: "5-Star Reviews", desc: "62 Google reviews - EXCELLENT rating" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary-50 via-background to-accent-50">
          <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-5" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" aria-hidden="true" />
          
          <div className="relative container mx-auto px-4 py-20 md:py-32">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-fade-in">
                <Sparkles className="h-4 w-4" />
                New: Corporate Wellness Programmes Available
              </div>
              
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-foreground mb-6 animate-slide-up">
                Stop Worrying,<br />
                <span className="text-primary">Start Living!</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '100ms' }}>
                Personalised yoga classes in Leicester for individuals, small groups, and corporates. 
                Vinyasa, Hatha & meditation with experienced instructors Amisha & Nish Soni.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
                <Button size="xl" className="w-full sm:w-auto" asChild>
                  <Link href="/register">Book Your First Class</Link>
                </Button>
                <Button size="xl" variant="outline" className="w-full sm:w-auto" asChild>
                  <Link href="/schedule">View Schedule</Link>
                </Button>
              </div>

              <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in" style={{ animationDelay: '300ms' }}>
                {stats.map((stat, index) => (
                  <div key={stat.label} className="text-center" style={{ animationDelay: `${400 + index * 100}ms` }}>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <stat.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="font-display text-4xl md:text-5xl font-bold text-primary mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Trust Signals */}
        <section className="py-16 bg-background border-y border-border">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {trustSignals.map((signal, index) => (
                <div key={signal.title} className="text-center p-6 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary mb-4">
                    <signal.icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{signal.title}</h3>
                  <p className="text-sm text-muted-foreground">{signal.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Welcome Section */}
        <section className="py-20 md:py-28" id="welcome">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Leaf className="h-4 w-4" />
                Welcome to Sattvalife Yoga
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-6">
                Personalised Yoga for Every Body
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Sattvalife offers personalised yoga classes in Leicester, suitable for small groups and individuals. 
                We also work with companies and corporate to integrate wellness practices into the workplace. 
                We believe yoga has the power to improve anyone's quality of life, regardless of age or physical ability. 
                We endeavour to learn more about our students and offer them a personalised yoga class that fits their schedule, needs and abilities. 
                Our core objective is to spread awareness among everyone and share its boundless boon.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {features.map((feature, index) => (
                <Card key={feature.title} className={`overflow-hidden transition-all duration-300 hover:shadow-xl ${feature.color} border`} style={{ animationDelay: `${index * 100}ms` }}>
                  <CardContent className="p-6">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4" style={{ backgroundColor: feature.color.replace('bg-', 'bg-').replace('text-', 'bg-').replace('border-', 'bg-') }}>
                      <feature.icon className={`h-7 w-7 ${feature.iconColor}`} />
                    </div>
                    <h3 className="font-display text-2xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground mb-4">{feature.description}</p>
                    <ul className="space-y-2 text-sm">
                      {feature.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center gap-2 text-muted-foreground">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* About Vinyasa Section */}
        <section className="py-20 md:py-28 bg-primary text-primary-foreground" id="vinyasa">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 text-primary-foreground text-sm font-medium mb-6">
                  <PersonStanding className="h-4 w-4" />
                  About Vinyasa Yoga
                </div>
                <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight mb-6">
                  Flow with Your Breath
                </h2>
              </div>

              <div className="prose prose-invert max-w-none mb-12">
                <p className="text-lg leading-relaxed mb-6">
                  Vinyasa, also called flow because of the smooth way that the poses run together, 
                  is one of the most popular contemporary styles of yoga. It's a broad classification 
                  that encompasses many different types of yoga, including Ashtanga and power yoga.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  Yoga is a great activity for you if you have diabetes, high blood pressure, high cholesterol, or heart disease. 
                  It gives you strength, flexibility, and mind-body awareness.
                </p>
              </div>

              <div className="mt-12 grid md:grid-cols-3 gap-6">
                {focusAreas.map((area, index) => (
                  <Card key={area.title} className={`${area.color} border-0`} style={{ animationDelay: `${index * 100}ms` }}>
                    <CardContent className="p-6 text-center">
                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary-foreground/10 mb-4">
                        <area.icon className="h-7 w-7" />
                      </div>
                      <h3 className="font-display text-xl font-semibold mb-2">{area.title}</h3>
                      <p className="font-medium mb-1">{area.benefit}</p>
                      <p className="text-sm opacity-80">{area.detail}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Class Schedule */}
        <section className="py-20 md:py-28" id="schedule">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Calendar className="h-4 w-4" />
                Class Timetable
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-6">
                Join Our Programme
              </h2>
              <p className="text-lg text-muted-foreground">Two convenient locations in Leicester. All levels welcome.</p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              {schedule.map((session, index) => (
                <Card key={session.day} className={`overflow-hidden transition-all duration-300 hover:shadow-xl ${session.color} border`} style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-4xl">🧘</span>
                          <div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                              <Calendar className="h-4 w-4" />
                              <span>{session.day} <span className="text-primary font-medium">({session.date})</span></span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              <span>{session.time}</span>
                            </div>
                          </div>
                        </div>
                        <h3 className="font-display text-2xl font-semibold mb-2">{session.className}</h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                          <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {session.location}</span>
                          <span className="flex items-center gap-1"><User className="h-4 w-4" /> {session.instructor}</span>
                          <span className="flex items-center gap-1"><Award className="h-4 w-4" /> {session.level}</span>
                          <span className="flex items-center gap-1"><Users className="h-4 w-4" /> {session.capacity}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{session.address}</p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3 md:ml-8">
                        <Button size="lg" className="w-full sm:w-auto" asChild>
                          <Link href="/register">Book Now</Link>
                        </Button>
                        <Button size="lg" variant="outline" className="w-full sm:w-auto" asChild>
                          <Link href="/schedule">Details</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button variant="outline" size="lg" asChild>
                <Link href="/schedule">View Full Schedule &nbsp;<ChevronRight className="h-4 w-4 inline" /></Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Three Focus Areas */}
        <section className="py-20 md:py-28 bg-muted/30" id="focus">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Target className="h-4 w-4" />
                Our 3 Key Focus Areas
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-6">
                Back, Belly & Breathing
              </h2>
              <p className="text-lg text-muted-foreground">Every class is designed around these three pillars for holistic wellbeing.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {focusAreas.map((area, index) => (
                <Card key={area.title} className={`overflow-hidden transition-all duration-300 hover:shadow-xl ${area.color} border`} style={{ animationDelay: `${index * 100}ms` }}>
                  <CardContent className="p-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6" style={{ backgroundColor: area.color.replace('bg-', 'bg-').replace('text-', 'bg-') }}>
                      <area.icon className="h-8 w-8" />
                    </div>
                    <h3 className="font-display text-2xl font-semibold mb-3">{area.title}</h3>
                    <p className="font-medium text-lg mb-2">{area.benefit}</p>
                    <p className="text-sm opacity-80">{area.detail}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Instructors */}
        <section className="py-20 md:py-28" id="instructors">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Users className="h-4 w-4" />
                Meet Your Guides
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-6">
                Experienced, Caring Instructors
              </h2>
              <p className="text-lg text-muted-foreground">Learn from certified professionals who genuinely care about your journey.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl border-0 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
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
                        and truly appreciate/embrace everything in and around me. With a strong desire to share this knowledge 
                        and to help people discover their inner strength, I found/created Sattvalife yoga where people can 
                        trek on a journey of self discovery like never before. Come and join me in this journey!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl border-0 bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
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
                        through a series of physical postures, breathing techniques and meditation. It sums up the existence 
                        of a being. I was inclined towards joining to teach Sattvalife yoga because it focuses on the emotional 
                        maturity that one can gain from practicing yoga which forms the basis of a healthy mind and body 
                        leading to overall wellbeing. Sattvalife inspires one for a lifestyle change leading into a positive 
                        and enlightened life ahead and this pretty much sums my belief.
                        <br /><br />
                        <em>'Surrender yourself completely and discover the complete you.'</em>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Corporate Programme */}
        <section className="py-20 md:py-28 bg-primary text-primary-foreground" id="corporate">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 text-primary-foreground text-sm font-medium mb-6">
                  <Building2 className="h-4 w-4" />
                  Corporate Wellness
                </div>
                <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight mb-6">
                  Sattvalife @Work
                </h2>
                <p className="text-lg opacity-90 mb-8">
                  Get traditional with yoga. It works at the workplace too.
                </p>
              </div>

              <div className="prose prose-invert max-w-none mb-12">
                <p className="mb-4">
                  At Sattvalife we take great pride in helping companies embrace a fitness culture amongst their 
                  employees with the help of regular yoga sessions within the company premises. We empanel some of the 
                  most experienced and motivated fitness instructors. Our yoga instructors particularly are very popular 
                  with companies who want to have regular yoga sessions for their employees.
                </p>
                <p className="mb-4">
                  We recently started conducting yoga sessions for the employees of the UK based Company NEXT in Leicester. 
                  Our ace corporate yoga instructor Nitu always amps up her sessions with some hybrid stretches and 
                  relaxation techniques that not only help desk-bound employees banish all those aches and pains but 
                  also help the employees understand how to keep themselves fit through chair ergonomics and fitness tips 
                  that can be incorporated into their daily office routines.
                </p>
                <p className="mb-4">
                  Amisha's office yoga sessions are not just routine stretches and backbends. She always keeps the 
                  sessions entertaining, fun and humorous with the result that every employee looks forward to her 
                  sessions every time!
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-12">
                <div className="p-6 rounded-2xl bg-primary-foreground/10 border border-primary-foreground/20">
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <Sparkles className="h-5 w-5" /> What We Offer
                  </h3>
                  <ul className="space-y-2 text-sm">
                    {[
                      "Specialised online programmes for employees",
                      "Workshops & webinars with expert teachers from India",
                      "Well-tailored programmes for your organisation",
                      "Regular & traditional yoga practice",
                      "Attention to physical, mental & emotional well-being",
                      "Focus on long term habit-building, not short-term promises",
                      "Consistent, tangible results in workforce happiness & productivity"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-6 rounded-2xl bg-primary-foreground/10 border border-primary-foreground/20">
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <Users className="h-5 w-5" /> Perfect For
                  </h3>
                  <ul className="space-y-2 text-sm">
                    {["HR & Wellness Managers", "Team Leaders", "Remote/Hybrid Teams", "High-Stress Environments", "Companies Investing in Culture"].map((item, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-primary" />
                          {item}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>

              <div className="text-center">
                <Button size="xl" variant="secondary" className="w-full md:w-auto" asChild>
                  <Link href="/corporate">Enquire About Corporate Programmes</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials / Reviews */}
        <section className="py-20 md:py-28 bg-muted/30" id="reviews">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Star className="h-4 w-4" />
                Google Reviews
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-6">
                Loved by Our Community
              </h2>
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map((i) => <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />)}
                </div>
                <span className="text-2xl font-bold text-primary">EXCELLENT</span>
              </div>
              <p className="text-lg text-muted-foreground">Based on 62 Google reviews</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { name: "Sarah M.", text: "Amisha's classes are transformative. Her attention to detail and genuine care for each student is remarkable. I've seen huge improvements in my back pain and overall wellbeing.", rating: 5 },
                { name: "James T.", text: "The corporate sessions for our team at NEXT have been fantastic. Engaging, fun, and genuinely beneficial. Everyone looks forward to Thursday mornings now!", rating: 5 },
                { name: "Priya K.", text: "Nish creates such a welcoming space. As a complete beginner I felt completely at ease. The breathing techniques have helped my anxiety enormously.", rating: 5 },
              ].map((review, index) => (
                <Card key={index} className="p-6 transition-all duration-300 hover:shadow-xl">
                  <div className="flex items-center gap-1 mb-4">
                    {[1,2,3,4,5].map((i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 leading-relaxed">"{review.text}"</p>
                  <div className="font-medium">{review.name}</div>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button variant="outline" size="lg" asChild>
                <Link href="https://www.google.com/search?q=sattvalife+yoga+reviews" target="_blank" rel="noopener noreferrer">
                  View All Reviews &nbsp;<ChevronRight className="h-4 w-4 inline" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA / Contact */}
        <section className="py-20 md:py-28" id="contact">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 border-primary/20">
                <CardContent className="p-8 md:p-12">
                  <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="text-center md:text-left">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                        <Mail className="h-4 w-4" />
                        Get In Touch
                      </div>
                      <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-6">
                        Ready to Start Your Journey?
                      </h2>
                      <p className="text-lg text-muted-foreground mb-8">
                        Have questions? Want to book a private session? Interested in corporate wellness?
                        We'd love to hear from you.
                      </p>

                      <div className="space-y-4 text-left">
                        <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
                          <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
                            <Mail className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">Email Us</p>
                            <p className="text-sm text-muted-foreground">info@sattvalife.yoga</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
                          <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10 text-accent">
                            <Phone className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">Call / WhatsApp</p>
                            <p className="text-sm text-muted-foreground">+44 7xxx xxxxxx</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
                          <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-green-100 text-green-600">
                            <MapPin className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">Our Locations</p>
                            <p className="text-sm text-muted-foreground">Trinity Methodist (Oadby) & Thurnby Memorial Hall</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-primary/10 border border-primary/20">
                      <h3 className="font-semibold text-lg mb-4">Send Us a Message</h3>
                      <form className="space-y-4" action="/api/contact" method="POST">
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
                          <textarea id="message" name="message" rows={4} required className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none" placeholder="How can we help you?" />
                        </div>
                        <Button type="submit" className="w-full" size="lg">
                          Send Message
                        </Button>
                      </form>
                    </div>
                  </div>
              </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}