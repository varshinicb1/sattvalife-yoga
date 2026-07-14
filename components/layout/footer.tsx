import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 border-t border-border" role="contentinfo">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center space-x-2" aria-label="Sattvalife Yoga Home">
              <svg className="h-10 w-10 text-primary" viewBox="0 0 100 100" fill="none" aria-hidden="true">
                <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" strokeDasharray="90 270" />
                <path d="M50 15c-19.3 0-35 15.7-35 35s15.7 35 35 35 35-15.7 35-35-15.7-35-35-35z" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="M50 30v20M40 45h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span className="font-display text-xl font-semibold text-foreground">Sattvalife</span>
            </Link>
            <p className="text-muted-foreground max-w-xs text-base leading-relaxed">
              Stop Worrying, Start Living! Personalised yoga classes in Leicester for individuals, 
              small groups, and corporates. Vinyasa, Hatha, and meditation.
            </p>
            <div className="flex items-center space-x-6 pt-4">
              <a
                href="https://www.facebook.com/sattvalifeyoga"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Facebook"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/sattvalifeyoga/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="font-display text-lg font-semibold">Quick Links</h3>
            <nav className="flex flex-col space-y-3" aria-label="Footer navigation">
              <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link>
              <Link href="/schedule" className="text-muted-foreground hover:text-primary transition-colors">Class Schedule</Link>
              <Link href="/register" className="text-muted-foreground hover:text-primary transition-colors">Registration</Link>
              <Link href="/corporate" className="text-muted-foreground hover:text-primary transition-colors">Corporate Programme</Link>
              <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms & Conditions</Link>
            </nav>
          </div>

          <div className="space-y-6">
            <h3 className="font-display text-lg font-semibold">Contact Us</h3>
            <address className="not-italic space-y-3 text-muted-foreground">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="font-medium">Leicester, UK</p>
                  <p className="text-sm">Trinity Methodist Church, Oadby LE2 5AB</p>
                  <p className="text-sm">Thurnby Memorial Hall, LE7 9PN</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                <a href="tel:+447xxx" className="hover:text-primary transition-colors">+44 7xxx xxxxxx</a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                <a href="mailto:info@sattvalife.yoga" className="hover:text-primary transition-colors">info@sattvalife.yoga</a>
              </div>
            </address>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Sattvalife Yoga. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-primary transition-colors">Terms & Conditions</Link>
              <Link href="/cookies" className="hover:text-primary transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}