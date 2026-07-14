# Sattvalife Yoga - Complete Migration Project

## 🎯 Project Overview
Complete migration of Sattvalife Yoga (WordPress + Anahata theme) to a modern, premium tech stack with zero backend costs.

**Live Site**: https://sattvalife.yoga  
**Location**: Leicester, UK  
**Founded**: 2016 (8+ years)  
**Instructors**: Amisha Soni & Nish Soni

---

## 🏗️ Tech Stack (July 2026)

### Frontend
- **Framework**: Next.js 15 (App Router) + React 19
- **Language**: TypeScript 5.5+ (strict mode)
- **Styling**: Tailwind CSS 4.0 + CSS Variables (Design Tokens)
- **Animations**: Framer Motion 12 + Motion One
- **Forms**: React Hook Form + Zod validation
- **UI Components**: Radix UI primitives (customized)
- **Icons**: Lucide React
- **Fonts**: Plus Jakarta Sans (UI), Fraunces (Display), JetBrains Mono (Code)

### Backend (All Free Tiers)
| Service | Provider | Free Tier Limits |
|---------|----------|------------------|
| **Database** | Cloudflare D1 (SQLite) | 5GB storage, 100K reads/day |
| **Auth** | NextAuth v5 (Edge) | Unlimited |
| **API/Edge** | Cloudflare Workers (Hono) | 100K requests/day |
| **Storage** | Cloudflare R2 | 10GB |
| **Queue/Jobs** | Cloudflare Queues | 1M messages/month |
| **AI Chat** | NVIDIA NIM (Gemma 4) | Free tier available |
| **Payments** | Stripe | Pay-per-transaction (1.4% + 20p UK) |
| **Calendar** | Google Calendar API | Free |
| **WhatsApp** | Meta Business API | 1K conversations/month |
| **Email** | Resend | 3K emails/month |
| **Analytics** | Cloudflare Web Analytics | Free |
| **Hosting** | Cloudflare Pages | Unlimited |
| **Search** | Meilisearch (on Workers) | Free |

### Admin Mobile App
- **Framework**: Flutter 3.24+ (Dart 3.5+)
- **State**: Riverpod
- **Offline**: Drift (SQLite) + custom sync engine
- **Charts**: FL Chart
- **Auth**: Biometric + PIN + JWT refresh

---

## 📁 Project Structure

```
sattvalife-yoga/
├── app/
│   ├── (marketing)/          # Public pages
│   │   ├── page.tsx          # Home page
│   │   ├── about/page.tsx    # About Us
│   │   ├── schedule/page.tsx # Class timetable
│   │   ├── register/page.tsx # Registration + payment
│   │   ├── corporate/page.tsx # Corporate programmes
│   │   ├── blog/             # Blog posts
│   │   ├── contact/page.tsx  # Contact form
│   │   ├── terms/page.tsx    # Terms & Conditions
│   │   └── layout.tsx        # Marketing layout
│   ├── (auth)/               # Auth pages
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   └── layout.tsx
│   ├── (dashboard)/          # Student dashboard
│   │   ├── dashboard/page.tsx
│   │   ├── bookings/page.tsx
│   │   ├── profile/page.tsx
│   │   └── layout.tsx
│   ├── admin/                # Admin panel
│   │   ├── page.tsx          # Dashboard
│   │   ├── courses/          # Course management
│   │   ├── bookings/         # Booking management
│   │   ├── students/         # Student management
│   │   ├── instructors/      # Instructor management
│   │   ├── corporate/        # Corporate enquiries
│   │   ├── blog/             # Blog management
│   │   ├── analytics/        # Revenue & analytics
│   │   ├── settings/         # Site settings
│   │   └── layout.tsx
│   ├── api/                  # API routes
│   │   ├── auth/             # NextAuth endpoints
│   │   ├── chat/             # AI chat endpoint
│   │   ├── webhooks/
│   │   │   ├── stripe/route.ts
│   │   │   └── whatsapp/route.ts
│   │   ├── courses/          # Course CRUD
│   │   ├── bookings/         # Booking CRUD
│   │   ├── calendar/         # Google Calendar sync
│   │   ├── whatsapp/         # WhatsApp messaging
│   │   ├── analytics/        # Analytics events
│   │   └── admin/            # Admin-only endpoints
│   ├── globals.css           # Design tokens + Tailwind
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Home page (redirects to marketing)
│   ├── providers.tsx         # React Query + Theme + Toaster
│   ├── robots.ts             # robots.txt
│   ├── sitemap.ts            # sitemap.xml
│   └── middleware.ts         # Auth protection
├── components/
│   ├── ui/                   # Base UI components (Radix-based)
│   ├── layout/               # Header, Footer, etc.
│   ├── forms/                # Form components
│   ├── sections/             # Page sections
│   ├── admin/                # Admin-specific components
│   ├── chat/                 # AI chat widget
│   └── booking/              # Booking flow components
├── lib/
│   ├── db/                   # Database (Drizzle + D1)
│   │   ├── index.ts
│   │   ├── schema.ts         # Complete schema
│   │   └── migrations/
│   ├── auth/                 # NextAuth v5 config
│   ├── stripe/               # Stripe helpers
│   ├── calendar/             # Google Calendar API
│   ├── whatsapp/             # WhatsApp Business API
│   ├── ai/                   # NVIDIA NIM (Gemma 4) integration
│   ├── analytics/            # Analytics tracking
│   ├── crypto/               # Encryption utilities
│   ├── session.ts            # Iron Session config
│   ├── types.ts              # TypeScript types
│   └── utils.ts              # Utility functions
├── scripts/
│   ├── seed.ts               # Database seeding
│   └── deploy.ts             # Deployment script
├── admin_app/                # Flutter admin mobile app
├── public/                   # Static assets
├── .env.example              # Environment template
├── biome.json                # Linting/formatting config
├── tailwind.config.ts        # Tailwind + design tokens
├── next.config.mjs           # Next.js config
├── tsconfig.json             # TypeScript config
├── package.json
├── drizzle.config.ts         # Drizzle config
├── wrangler.toml             # Cloudflare Workers config
└── README.md
```

---

## 🎨 Design System

### Color Palette (CSS Variables)
```css
/* Semantic Colors */
--color-bg-primary: #FAFAF9;      /* Warm off-white */
--color-bg-secondary: #F5F3F0;    /* Subtle warmth */
--color-bg-tertiary: #EDEAE6;     /* Cards, inputs */
--color-bg-inverse: #1A1A18;      /* Dark surfaces */

--color-text-primary: #1A1A18;    /* Near black */
--color-text-secondary: #4A4845;  /* Medium */
--color-text-tertiary: #8A8782;   /* Muted */
--color-text-inverse: #FAFAF9;    /* On dark */

--color-brand-500: #5A8D5E;       /* PRIMARY - Sage */
--color-brand-600: #48754B;       /* Hover */
--color-brand-700: #3A5E3D;       /* Active */

--color-accent-500: #F0851A;      /* ACCENT - Terracotta */
--color-accent-600: #E06B12;      /* Hover */
```

### Typography
- **Display**: Fraunces (Variable, 300-900) - Headlines, hero text
- **UI**: Plus Jakarta Sans (Variable, 200-800) - Body, buttons, forms
- **Mono**: JetBrains Mono (400-700) - Code, technical

### Spacing Scale (8px base)
`0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128px`

### Shadows (Layered)
`xs → sm → md → lg → xl → 2xl` with subtle opacity

---

## 🔄 User Flows

### 1. Booking Flow
```
Home → Schedule → Course Card → Course Details → 
Terms Checkbox (required) → Stripe Payment → 
Success → Google Calendar (OAuth multi-account) → 
WhatsApp Confirmation → Email Receipt
```

### 2. Multi-Account Google Calendar
```
User clicks "Add to Calendar" → 
If not connected → OAuth consent (offline + prompt=consent) → 
Store encrypted tokens → 
If multiple accounts → Account chooser UI → 
Create event with 30min/1day reminders
```

### 3. AI Chat Assistant (Gemma 4 via NVIDIA NIM)
```
User opens chat → System prompt injected (course data, instructors, locations) →
Tool calls: getCourses, checkAvailability, createBookingLink, getInstructors, getTerms →
Streaming response with citations → Handoff to WhatsApp for complex queries
```

### 4. Admin Mobile App (Flutter)
```
Biometric/PIN login → JWT refresh → 
Offline-first (Drift SQLite) → Background sync →
Push notifications (FCM) for new bookings/cancellations
```

---

## 💾 Database Schema (Drizzle + D1)

### Core Tables
- **users** - Auth + profile + calendar tokens + WhatsApp opt-in
- **accounts/sessions/verificationTokens** - NextAuth
- **locations** - Venues (Trinity Methodist, Thurnby Hall)
- **instructors** - Amisha, Nish (linked to users)
- **courses** - Vinyasa, Hatha (schedule as RRULE)
- **course_sessions** - Individual class instances
- **bookings** - Student bookings + payment + calendar + WhatsApp status
- **waitlist** - Auto-promotion logic
- **blog_posts** - MDX content
- **corporate_enquiries** - B2B leads pipeline
- **analytics** - Event tracking

---

## 💳 Stripe Integration

### Products (Managed in Stripe Dashboard + Synced)
| Product | Price | Mode | Metadata |
|---------|-------|------|----------|
| Vinyasa Tuesday | £15 | payment | courseId, location |
| Hatha Thursday | £15 | payment | courseId, location |
| 5-Class Pack | £65 | payment | - |
| 10-Class Pack | £110 | payment | - |
| Monthly Unlimited | £89/mo | subscription | - |

### Webhooks Handled
- `payment_intent.succeeded` → Confirm booking, trigger Calendar + WhatsApp + Email
- `payment_intent.payment_failed` → Cancel booking
- `checkout.session.completed` → Handle subscriptions
- `customer.subscription.*` → Manage recurring access
- `invoice.payment_succeeded` → Renew subscription bookings

---

## 📱 WhatsApp Business API

### Templates (Pre-approved via Meta)
| Template | Language | Components |
|----------|----------|------------|
| `booking_confirmation` | en_GB | Header(text), Body(5 vars), Footer, Buttons(URL, QR) |
| `reminder_24h` | en_GB | Body(4 vars), Buttons(URL, QR) |
| `reminder_1h` | en_GB | Body(2 vars) |
| `payment_receipt` | en_GB | Header, Body(3 vars), Button(URL) |
| `welcome` | en_GB | Body(1 var) |
| `cancellation_confirmation` | en_GB | Body(4 vars) |

### Queue-Based Sending
- Cloudflare Queues for rate limiting (1K/day free)
- Exponential backoff retry
- Delivery status tracking

---

## 🤖 AI Chat Assistant (Gemma 4 27B)

### System Prompt Includes
- All current courses, schedules, pricing
- Instructor bios (Amisha, Nish)
- Locations with maps links
- Registration process + health screening
- Terms & conditions summary
- Corporate offerings

### Tools Available
```typescript
getCourses(filters?), getCourseDetails(id), checkAvailability(sessionId),
createBookingLink(courseId, sessionId, userId), getInstructors(),
getLocations(), getBlogPosts(category?), getTermsAndConditions()
```

---

## 🚀 Deployment

### Prerequisites
```bash
# Required accounts
- Cloudflare (Pages + Workers + D1 + R2 + Queues)
- Stripe (test + live)
- Google Cloud (Calendar API + OAuth)
- Meta Developer (WhatsApp Business)
- Resend (email)
- NVIDIA NGC (NIM API key)
```

### Environment Variables
See `.env.example` for all required variables.

### Deploy Commands
```bash
# Install dependencies
pnpm install

# Generate database migrations
pnpm db:generate

# Push to D1 (local)
pnpm db:push

# Seed database
pnpm db:seed

# Run locally
pnpm dev

# Build for production
pnpm build

# Deploy to Cloudflare Pages
wrangler pages deploy .vercel/output/static --project-name=sattvalife-yoga

# Deploy Workers (API + Queues)
wrangler deploy --env production
```

### Admin Mobile App
```bash
cd admin_app
flutter pub get
flutter build ios --release
flutter build apk --release
flutter build appbundle --release
```

---

## 📊 Success Metrics (KPIs)

| Metric | Current | Target (6mo) |
|--------|---------|--------------|
| LCP | ~4s | <1.5s |
| Mobile PageSpeed | ~45 | 95+ |
| Booking Conversion | ~2% | 8%+ |
| Monthly Revenue | £X | 3x current |
| No-show Rate | ~15% | <3% |
| Google Position (Leicester yoga) | Page 2-3 | Top 3 |
| Student Retention (90-day) | Unknown | 40%+ |
| Admin Time Savings | Manual | 15h/week |

---

## 🔒 Security & Compliance

- **PCI DSS**: SAQ-A (Stripe Elements, no card data touches server)
- **GDPR**: Privacy policy, cookie consent, data export/delete endpoints
- **OWASP**: CSP headers, CSRF protection (NextAuth), XSS prevention (React)
- **Auth**: Argon2id password hashing, JWT with short expiry + refresh rotation
- **Encryption**: AES-256-GCM for Google tokens, PII at rest
- **Rate Limiting**: Cloudflare WAF + Workers rate limiting
- **Monitoring**: Sentry (free tier) + Cloudflare Analytics

---

## 📱 Admin Mobile App Features

### Dashboard
- Revenue (MTD/YTD) with charts
- Today's bookings + occupancy %
- New students this week
- Quick actions

### Course Management
- CRUD with offline support
- Image upload (R2)
- Schedule builder (RRULE)
- Stripe product sync

### Booking Management
- Calendar view + list view
- Check-in (QR code scanner)
- Cancel/refund with Stripe
- Waitlist management

### Student Management
- Search + filter
- Profile (health data, booking history, payments)
- Export CSV
- Bulk actions

### Analytics
- Revenue trends (daily/weekly/monthly)
- Class occupancy heatmap
- Student retention cohorts
- Instructor performance
- Location comparison

### Settings
- Biometric auth
- Push notification preferences
- Auto-sync interval
- Data export/import

---

## 📝 Content Migration Checklist

### From WordPress
- [x] Home page content (Hero, Welcome, Vinyasa, 3 Pillars, Journey, Find What Feels Good, Schedule, Focus Areas, Benefits, Contact, Reviews)
- [x] About Us (Mission, Amisha bio, Nish bio, photos)
- [x] Registration form (16 fields + health screening + waiver)
- [x] Corporate Programme (Story, offerings, photos, contact form)
- [x] Terms & Conditions (20+ sections)
- [x] Blog posts (3 posts with images)
- [x] All images (logos, heroes, team, classes, blog)
- [x] SEO metadata (AIOSEO → structured data)

### To Create New
- [ ] Privacy Policy page
- [ ] Cookie Policy page
- [ ] FAQ page
- [ ] Gift vouchers page
- [ ] Online course pages (future)

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Run linting (`pnpm lint`) and tests (`pnpm test`)
4. Commit changes (`git commit -m 'Add amazing feature'`)
5. Push to branch (`git push origin feature/amazing-feature`)
6. Open Pull Request

---

## 📄 License

MIT License - see LICENSE file for details.

---

## 🙏 Acknowledgments

- **Original Site**: WordPress + Anahata Theme + WPBakery
- **Design Inspiration**: Apple, InnSaei Studio, Alo Yoga, 10Web showcases
- **Case Studies**: Abhaya Yoga (5x SEO), Thrive Yoga ($10K MRR), Daya Yoga (50% growth)
- **Tech**: Next.js, Tailwind, Cloudflare, Stripe, Flutter, NVIDIA NIM

---

**Built with ❤️ for the Leicester yoga community**

*Last updated: July 2026*