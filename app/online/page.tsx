import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Video, 
  Wifi, 
  Sparkles, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Laptop, 
  Volume2, 
  ShieldCheck, 
  UserCheck,
  HeartHandshake
} from "lucide-react";

export const metadata: Metadata = {
  title: "Live Online Yoga Classes | Sattvalife Yoga",
  description: "Join Sattvalife's interactive live online yoga classes from anywhere. Personalised guidance in Vinyasa, Hatha, and Breathwork streamed directly to your home.",
  openGraph: {
    title: "Live Online Yoga Classes | Sattvalife Yoga",
    description: "Interactive live online yoga classes from Leicester's top instructors.",
    url: "https://sattvalife.yoga/online",
  },
};

const onlineClasses = [
  {
    title: "Morning Vinyasa Awakening",
    time: "Tuesdays & Thursdays · 7:00 AM - 7:45 AM GMT",
    instructor: "Amisha Soni",
    level: "All Levels",
    description: "Energising dynamic flow designed to awaken your body, improve mental focus, and prepare you for a productive day.",
    price: "£8 / session",
    featured: true,
  },
  {
    title: "Evening Wind-Down & Meditation",
    time: "Wednesdays · 8:00 PM - 8:45 PM GMT",
    instructor: "Nish Soni",
    level: "Beginner Friendly",
    description: "Gentle Hatha postures, mindful breathing (pranayama), and restorative guided meditation for stress release and deep sleep.",
    price: "£8 / session",
    featured: false,
  },
  {
    title: "1-on-1 Virtual Yoga & Alignment",
    time: "By Appointment · 60 Minutes",
    instructor: "Amisha / Nish Soni",
    level: "Tailored to You",
    description: "Bespoke private session focused on injury recovery, personalized posture alignment, and individual wellness goals.",
    price: "£35 / session",
    featured: false,
  },
];

const joiningSteps = [
  {
    step: "1",
    title: "Book Your Slot",
    desc: "Reserve your class online. You'll instantly receive a confirmation and direct session link via email and WhatsApp.",
    icon: Calendar,
  },
  {
    step: "2",
    title: "Prepare Your Space",
    desc: "Set up your mat in a quiet area with good lighting. Position your camera so the instructor can see your full body for posture adjustments.",
    icon: Laptop,
  },
  {
    step: "3",
    title: "Connect & Flow",
    desc: "Click the secure joining link 5 minutes before class. Enjoy real-time interaction and personalized modifications.",
    icon: Video,
  },
];

export default function OnlineYogaPage() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary-50 via-background to-accent-50 pt-24">
          <div className="relative container mx-auto px-4 py-16 md:py-24 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Video className="h-4 w-4" />
              Live Interactive Streaming
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-semibold tracking-tight text-foreground mb-6">
              Practice With Us, <span className="text-primary">Anywhere</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
              Experience the warmth, precision, and personal care of Sattvalife classes from the comfort of your home. Real-time feedback, small virtual group sizes, and friendly community.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-14 px-8 text-lg" asChild>
                <Link href="#classes">View Online Schedule</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg" asChild>
                <Link href="/register">Register to Join</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="py-16 bg-muted/20 border-y border-border">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="flex items-start gap-4 p-6 rounded-2xl bg-card border border-border">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <UserCheck className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Live Verbal Adjustments</h3>
                  <p className="text-sm text-muted-foreground">Unlike pre-recorded videos, our teachers watch and guide your posture in real time.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 rounded-2xl bg-card border border-border">
                <div className="p-3 rounded-xl bg-accent/10 text-accent">
                  <Wifi className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">HD Audio & Video</h3>
                  <p className="text-sm text-muted-foreground">Crystal-clear sound for guided breathing and meditation cues with no distractions.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 rounded-2xl bg-card border border-border">
                <div className="p-3 rounded-xl bg-green-100 text-green-700">
                  <HeartHandshake className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Warm & Inclusive</h3>
                  <p className="text-sm text-muted-foreground">Practice at your own pace in a supportive, judgment-free virtual studio.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Class Cards */}
        <section id="classes" className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Sparkles className="h-4 w-4" />
                Virtual Timetable
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-semibold mb-4">Live Stream Classes</h2>
              <p className="text-muted-foreground text-lg">Single session bookings and monthly pass packages available.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {onlineClasses.map((item, idx) => (
                <Card 
                  key={idx} 
                  className={`rounded-2xl flex flex-col justify-between transition-all duration-300 hover:shadow-lg ${
                    item.featured ? 'border-2 border-primary shadow-md relative' : 'border border-border'
                  }`}
                >
                  {item.featured && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                      Most Popular
                    </span>
                  )}
                  <CardContent className="p-6 md:p-8 flex flex-col justify-between h-full">
                    <div>
                      <div className="text-sm font-medium text-primary mb-2 flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {item.time}
                      </div>
                      <h3 className="font-display text-2xl font-bold mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">Instructor: <span className="font-medium text-foreground">{item.instructor}</span> · {item.level}</p>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6">{item.description}</p>
                    </div>

                    <div className="pt-6 border-t border-border mt-auto">
                      <div className="flex items-baseline justify-between mb-4">
                        <span className="text-2xl font-bold font-display text-foreground">{item.price}</span>
                        <span className="text-xs text-muted-foreground">Zoom link included</span>
                      </div>
                      <Button className="w-full h-12" asChild>
                        <Link href="/register">Book This Class</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How to Join Checklist */}
        <section className="py-20 bg-muted/30 border-t border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">How to Join Your Online Class</h2>
              <p className="text-muted-foreground text-lg">Simple 3-step setup to get started with zero hassle.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {joiningSteps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div key={idx} className="text-center p-6 bg-card rounded-2xl border border-border">
                    <div className="w-12 h-12 rounded-full bg-primary text-white font-bold flex items-center justify-center mx-auto mb-4 text-lg">
                      {step.step}
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Checklist Tips */}
            <div className="max-w-2xl mx-auto mt-12 p-6 rounded-2xl bg-card border border-border">
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                Quick Tips for the Best Session:
              </h4>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
                  Have a yoga mat and a water bottle nearby.
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
                  Wear comfortable, stretchable workout attire.
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
                  Ensure your audio/speakers are working to hear the instructions clearly.
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
                  Log in 5 minutes early so we can test audio and say hello!
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary text-primary-foreground text-center">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="font-display text-3xl md:text-5xl font-semibold mb-6">Ready to Start Living?</h2>
            <p className="text-lg opacity-90 mb-8">Sign up today and experience the benefits of regular guided yoga practice.</p>
            <Button size="lg" variant="secondary" className="h-14 px-8 text-lg" asChild>
              <Link href="/register">Register for Classes Now</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
