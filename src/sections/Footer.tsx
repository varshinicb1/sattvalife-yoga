import { Link } from 'react-router'
import { Instagram, Facebook, Youtube, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative bg-forest-950 text-cream-50 pt-20 pb-12 overflow-hidden border-t border-amber-400/20">
      <div className="mx-auto max-w-7xl px-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-16 border-b border-white/10">
        
        {/* Brand & Slogan */}
        <div className="lg:col-span-1 space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400/20 to-cream-50/10 p-2 border border-amber-400/40">
              <img src="/images/lotus.png" alt="Sattvalife" className="h-full w-full object-contain" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-serif text-2xl font-semibold text-cream-50">Sattvalife</span>
              <span className="font-sans text-xs font-medium tracking-[0.15em] uppercase text-cream-100/60">Yoga & Wellness</span>
            </div>
          </div>
          <p className="text-xs md:text-sm text-cream-100/70 max-w-sm leading-relaxed">
            Traditional Hatha, dynamic Vinyasa flow, gentle Yin, and sound meditation across the UK. Rooted in authentic practice and mindful living.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-white/5 hover:bg-amber-400/20 hover:text-amber-300 transition-colors">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-white/5 hover:bg-amber-400/20 hover:text-amber-300 transition-colors">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-white/5 hover:bg-amber-400/20 hover:text-amber-300 transition-colors">
              <Youtube className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Classes & Experiences */}
        <div className="space-y-3">
          <p className="font-serif text-sm font-semibold text-amber-300 tracking-wide uppercase">Classes & Events</p>
          <ul className="space-y-2 text-xs text-cream-100/80">
            <li><Link to="/courses" className="hover:text-amber-400 transition-colors">Studio & Online Classes</Link></li>
            <li><Link to="/timetable" className="hover:text-amber-400 transition-colors">Live Weekly Timetable</Link></li>
            <li><Link to="/experiences" className="hover:text-amber-400 transition-colors">Pop-Ups & UK Retreats</Link></li>
            <li><Link to="/corporate" className="hover:text-amber-400 transition-colors">Workplace Wellbeing</Link></li>
          </ul>
        </div>

        {/* Studio & Community */}
        <div className="space-y-3">
          <p className="font-serif text-sm font-semibold text-amber-300 tracking-wide uppercase">Studio & Lineage</p>
          <ul className="space-y-2 text-xs text-cream-100/80">
            <li><Link to="/teachers" className="hover:text-amber-400 transition-colors">Our Teachers & Lineage</Link></li>
            <li><Link to="/reviews" className="hover:text-amber-400 transition-colors">Google Reviews & Stories</Link></li>
            <li><Link to="/blog" className="hover:text-amber-400 transition-colors">Wellness Journal & Articles</Link></li>
            <li><Link to="/registration" className="hover:text-amber-400 transition-colors">Health & Consent Form</Link></li>
          </ul>
        </div>

        {/* Direct Contact */}
        <div className="space-y-3">
          <p className="font-serif text-sm font-semibold text-amber-300 tracking-wide uppercase">Direct Contact</p>
          <div className="space-y-2 text-xs text-cream-100/80">
            <p className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-amber-400 shrink-0" /> London & UK Wide Pop-ups</p>
            <p className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-amber-400 shrink-0" /> info@sattvalife.yoga</p>
            <p className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-amber-400 shrink-0" /> +44 7921 549320</p>
            <div className="pt-2">
              <span className="inline-block px-2.5 py-1 rounded bg-amber-400/15 text-amber-300 text-xs font-semibold border border-amber-400/30">
                UK GDPR & SSL Protected
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="mx-auto max-w-7xl px-5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream-100/50">
        <p>© {new Date().getFullYear()} Sattvalife Yoga & Wellness. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <Link to="/privacy" className="hover:text-cream-100 transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-cream-100 transition-colors">Terms of Service</Link>
          <a href="https://sattvalife.yoga" className="hover:text-cream-100 transition-colors">sattvalife.yoga</a>
        </div>
      </div>
    </footer>
  )
}
