import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Check, Shield, CreditCard, Calendar, Users, Leaf, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Register & Book | Sattvalife Yoga",
  description: "Book your yoga class in Leicester. Single class, multi-class passes, and monthly unlimited memberships. Vinyasa and Hatha yoga with Amisha & Nish Soni.",
  openGraph: {
    title: "Book a Yoga Class | Sattvalife Yoga",
    description: "Choose from flexible pricing plans and book your spot today.",
    type: "website",
    locale: "en_GB",
    siteName: "Sattvalife Yoga",
  },
};

const pricingTiers = [
  {
    name: "Single Class",
    price: "£10",
    description: "Perfect for trying out a class",
    features: ["One drop-in class", "All levels welcome", "Choose Vinyasa or Hatha", "Valid for selected date"],
    popular: false,
    color: "border-primary/20",
  },
  {
    name: "5-Class Pass",
    price: "£45",
    description: "Save £5 with our flexible pass",
    features: ["5 classes total", "£9 per class", "No expiry date", "Share with family member", "Both class types valid"],
    popular: true,
    color: "border-primary",
  },
  {
    name: "10-Class Pass",
    price: "£80",
    description: "Best value for regular practitioners",
    features: ["10 classes total", "£8 per class", "No expiry date", "Share with family member", "Both class types valid", "Priority booking"],
    popular: false,
    color: "border-accent/20",
  },
  {
    name: "Monthly Unlimited",
    price: "£55",
    description: "For dedicated yogis",
    features: ["Unlimited classes per month", "Both Vinyasa & Hatha", "Priority booking", "Free guest pass (1/month)", "10% off workshops", "Cancel anytime"],
    popular: false,
    color: "border-accent",
  },
];

export default function RegisterPage() {
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
                Join Sattvalife
              </div>
              <h1 className="font-display text-5xl md:text-7xl font-semibold tracking-tight text-foreground mb-6">
                Book Your <span className="text-primary">Class</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Choose a pricing plan that works for you and take the first step on your yoga journey.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <CreditCard className="h-4 w-4" />
                Pricing Plans
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-6">
                Choose Your Plan
              </h2>
              <p className="text-lg text-muted-foreground">Flexible options to suit your practice. All prices include access to both Vinyasa and Hatha classes.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {pricingTiers.map((tier) => (
                <Card key={tier.name} className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl ${tier.color} border-2 ${tier.popular ? 'scale-105 shadow-lg' : ''}`}>
                  {tier.popular && (
                    <div className="absolute top-0 right-0">
                      <div className="bg-primary text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-bl-xl">Most Popular</div>
                    </div>
                  )}
                  <CardContent className="p-6">
                    <h3 className="font-display text-xl font-semibold mb-2">{tier.name}</h3>
                    <div className="mb-4">
                      <span className="font-display text-4xl font-bold text-foreground">{tier.price}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-6">{tier.description}</p>
                    <ul className="space-y-2 mb-8">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full" variant={tier.popular ? "primary" : "outline"} size="lg">
                      Select Plan
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Booking Form */}
        <section className="py-20 md:py-28 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                  <Calendar className="h-4 w-4" />
                  Book a Class
                </div>
                <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-6">
                  Complete Your Booking
                </h2>
              </div>

              <Card className="overflow-hidden border-primary/20">
                <CardContent className="p-8 md:p-12">
                  <form className="space-y-8" action="/api/bookings" method="POST">
                    {/* Personal Details */}
                    <div>
                      <h3 className="font-display text-xl font-semibold mb-4">Your Details</h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium mb-1">First Name *</label>
                          <input id="firstName" name="firstName" type="text" required className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Your first name" />
                        </div>
                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium mb-1">Last Name *</label>
                          <input id="lastName" name="lastName" type="text" required className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Your last name" />
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4 mt-4">
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium mb-1">Email *</label>
                          <input id="email" name="email" type="email" required className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="you@example.com" />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone *</label>
                          <input id="phone" name="phone" type="tel" required className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="+44 7xxx xxxxxx" />
                        </div>
                      </div>
                    </div>

                    {/* Class Selection */}
                    <div>
                      <h3 className="font-display text-xl font-semibold mb-4">Class Selection</h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="classType" className="block text-sm font-medium mb-1">Class Type *</label>
                          <select id="classType" name="classType" required className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                            <option value="">Select a class</option>
                            <option value="vinyasa">Tuesday Vinyasa Flow (6:30 PM)</option>
                            <option value="hatha">Thursday Hatha Yoga (7:00 PM)</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="date" className="block text-sm font-medium mb-1">Preferred Date *</label>
                          <input id="date" name="date" type="date" required className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
                        </div>
                      </div>
                    </div>

                    {/* Pricing Plan */}
                    <div>
                      <h3 className="font-display text-xl font-semibold mb-4">Pricing Plan</h3>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {["Single Class (£10)", "5-Class Pass (£45)", "10-Class Pass (£80)", "Monthly Unlimited (£55)"].map((plan) => (
                          <label key={plan} className="flex items-center gap-3 p-4 rounded-xl border border-border bg-background hover:border-primary/50 cursor-pointer transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                            <input type="radio" name="plan" value={plan} className="accent-primary" />
                            <span className="text-sm font-medium">{plan}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Health Screening */}
                    <div>
                      <h3 className="font-display text-xl font-semibold mb-4">Health Screening</h3>
                      <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-warning/5 border border-warning/20">
                          <p className="text-sm text-muted-foreground">
                            Please consult your doctor before starting any exercise programme. If you have any injuries, 
                            medical conditions, or are pregnant, please let us know so we can offer appropriate modifications.
                          </p>
                        </div>
                        <div>
                          <label htmlFor="conditions" className="block text-sm font-medium mb-1">Medical Conditions or Injuries</label>
                          <textarea id="conditions" name="conditions" rows={3} className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none" placeholder="Please list any injuries, medical conditions, or concerns..." />
                        </div>
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input type="checkbox" name="waiver" required className="mt-1 accent-primary" />
                          <span className="text-sm text-muted-foreground">
                            I confirm that I have read and agree to the <Link href="/terms" className="text-primary hover:underline">Terms & Conditions</Link> and 
                            acknowledge the physical nature of yoga. I understand that I participate at my own risk and have 
                            disclosed any relevant medical conditions. *
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* Payment */}
                    <div>
                      <h3 className="font-display text-xl font-semibold mb-4 flex items-center gap-2">
                        <CreditCard className="h-5 w-5 text-primary" />
                        Payment
                      </h3>
                      <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 mb-4">
                        <p className="text-sm text-muted-foreground">
                          Secure payment will be processed via Stripe. Your payment details are encrypted and never stored on our servers.
                        </p>
                        <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                          <Shield className="h-4 w-4 text-primary" />
                          <span>256-bit SSL encryption | PCI compliant</span>
                        </div>
                      </div>
                    </div>

                    <Button type="submit" size="xl" className="w-full">
                      Proceed to Payment <ChevronRight className="h-5 w-5" />
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
