import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";

export const dynamic = 'force-dynamic';
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Sparkles, Users, Star, Target, Heart, Briefcase, Clock, Zap, ChevronRight, Leaf, CheckCircle, Quote, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Corporate Wellness | Sattvalife @Work",
  description: "Bring yoga and wellness to your workplace. Sattvalife offers corporate yoga programmes in Leicester for companies of all sizes. Reduce stress, boost productivity, build team bonds.",
  openGraph: {
    title: "Corporate Wellness Programmes | Sattvalife @Work",
    description: "Get traditional with yoga. It works at the workplace too.",
    type: "website",
    locale: "en_GB",
    siteName: "Sattvalife Yoga",
  },
};

const offerings = [
  "Specialised online programmes for employees",
  "Workshops & webinars with expert teachers from India",
  "Well-tailored programmes for your organisation",
  "Regular & traditional yoga practice",
  "Attention to physical, mental & emotional well-being",
  "Focus on long term habit-building, not short-term promises",
  "Consistent, tangible results in workforce happiness & productivity",
];

const benefits = [
  {
    icon: Heart,
    title: "Reduced Stress & Burnout",
    description: "Regular yoga practice lowers cortisol levels, reduces anxiety, and helps employees manage workplace pressure more effectively.",
  },
  {
    icon: Zap,
    title: "Improved Productivity & Focus",
    description: "Employees who practice yoga report better concentration, clearer thinking, and higher energy levels throughout the workday.",
  },
  {
    icon: Users,
    title: "Stronger Team Bonds",
    description: "Group yoga sessions create shared experiences that build camaraderie and improve team dynamics beyond the mat.",
  },
  {
    icon: Target,
    title: "Reduced Absenteeism",
    description: "Fewer sick days thanks to improved physical health, better stress management, and enhanced immune function.",
  },
];

const testimonials = [
  {
    name: "HR Manager",
    company: "NEXT, Leicester",
    text: "Amisha's office yoga sessions are not just routine stretches and backbends. She always keeps the sessions entertaining, fun and humorous with the result that every employee looks forward to her sessions every time!",
    role: "HR Manager",
  },
  {
    name: "Operations Director",
    company: "Leicester-based Tech Firm",
    text: "The Sattvalife corporate programme has been transformative for our team. We've seen a noticeable improvement in workplace morale and a reduction in stress-related absences. Highly recommended.",
    role: "Operations Director",
  },
];

export default function CorporatePage() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary-50 via-background to-accent-50 pt-24">
          <div className="absolute inset-0 bg-[url(/hero-pattern.svg)] opacity-5" aria-hidden="true" />
          <div className="relative container mx-auto px-4 py-20">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
                <Building2 className="h-4 w-4" />
                Corporate Wellness
              </div>
              <h1 className="font-display text-5xl md:text-7xl font-semibold tracking-tight text-foreground mb-6">
                Sattvalife <span className="text-primary">@Work</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Get traditional with yoga. It works at the workplace too.
              </p>
              <Button size="xl" className="w-full sm:w-auto" asChild>
                <Link href="#enquire">Enquire About Corporate Programmes</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="prose max-w-none">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  At Sattvalife we take great pride in helping companies embrace a fitness culture amongst their 
                  employees with the help of regular yoga sessions within the company premises. We empanel some of the 
                  most experienced and motivated fitness instructors. Our yoga instructors particularly are very popular 
                  with companies who want to have regular yoga sessions for their employees.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We recently started conducting yoga sessions for the employees of the UK based Company NEXT in Leicester. 
                  Our ace corporate yoga instructor Nitu always amps up her sessions with some hybrid stretches and 
                  relaxation techniques that not only help desk-bound employees banish all those aches and pains but 
                  also help the employees understand how to keep themselves fit through chair ergonomics and fitness tips 
                  that can be incorporated into their daily office routines.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What We Offer */}
        <section className="py-20 md:py-28 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Sparkles className="h-4 w-4" />
                What We Offer
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-6">
                Tailored Wellness for Your Team
              </h2>
            </div>

            <div className="max-w-3xl mx-auto">
              <Card className="border-primary/20">
                <CardContent className="p-8">
                  <ul className="space-y-4">
                    {offerings.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefits for Employers */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Target className="h-4 w-4" />
                Benefits for Employers
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-6">
                Why Invest in Workplace Yoga?
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {benefits.map((benefit) => (
                <Card key={benefit.title} className="border-0 bg-gradient-to-br from-primary/5 to-accent/5">
                  <CardContent className="p-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
                      <benefit.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-display text-xl font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Case Study Placeholder */}
        <section className="py-20 md:py-28 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 text-primary-foreground text-sm font-medium mb-6">
                <Briefcase className="h-4 w-4" />
                Case Study
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight mb-6">
                Success Story
              </h2>
              <Card className="max-w-2xl mx-auto bg-primary-foreground/10 border-primary-foreground/20 text-left">
                <CardContent className="p-8">
                  <Quote className="h-8 w-8 opacity-50 mb-4" />
                  <p className="text-lg leading-relaxed mb-6">
                    "The Sattvalife corporate yoga programme has been a game-changer for our team. Employee 
                    wellbeing has improved significantly, and we've seen a real shift in our workplace culture. 
                    Amisha and Nish are professional, engaging, and tailor each session to our team's needs."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                      <Building2 className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-semibold">NEXT PLC</p>
                      <p className="text-sm opacity-80">Corporate Client, Leicester</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 md:py-28 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Star className="h-4 w-4" />
                What Our Clients Say
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-6">
                Client Testimonials
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="transition-all duration-300 hover:shadow-xl">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-1 mb-4">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-6 leading-relaxed">"{testimonial.text}"</p>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}, {testimonial.company}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Enquiry Form */}
        <section className="py-20 md:py-28" id="enquire">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                  <Mail className="h-4 w-4" />
                  Enquire Now
                </div>
                <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-6">
                  Interested in Corporate Yoga?
                </h2>
                <p className="text-lg text-muted-foreground">Fill in the form below and we'll get back to you within 24 hours.</p>
              </div>

              <Card className="border-primary/20">
                <CardContent className="p-8 md:p-10">
                  <form className="space-y-5" action="/api/contact" method="POST">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="companyName" className="block text-sm font-medium mb-1">Company Name *</label>
                        <input id="companyName" name="companyName" type="text" required className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Your company" />
                      </div>
                      <div>
                        <label htmlFor="employeeCount" className="block text-sm font-medium mb-1">Number of Employees</label>
                        <select id="employeeCount" name="employeeCount" className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                          <option value="">Select range</option>
                          <option value="1-10">1-10</option>
                          <option value="11-50">11-50</option>
                          <option value="51-200">51-200</option>
                          <option value="201-500">201-500</option>
                          <option value="500+">500+</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contactName" className="block text-sm font-medium mb-1">Contact Name *</label>
                        <input id="contactName" name="contactName" type="text" required className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Your name" />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">Email *</label>
                        <input id="email" name="email" type="email" required className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="you@company.com" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone</label>
                      <input id="phone" name="phone" type="tel" className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="+44 7xxx xxxxxx" />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-1">How can we help? *</label>
                      <textarea id="message" name="message" rows={5} required className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none" placeholder="Tell us about your requirements, preferred schedule, and any specific goals..." />
                    </div>
                    <input type="hidden" name="subject" value="Corporate Wellness Enquiry" />
                    <Button type="submit" size="xl" className="w-full">
                      Send Enquiry <ChevronRight className="h-5 w-5" />
                    </Button>
                  </form>
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
