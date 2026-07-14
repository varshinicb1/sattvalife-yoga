# 🚀 CLOUDFLARE PAGES DEPLOYMENT GUIDE
## Sattvalife Yoga - Complete Production Deployment

---

## 📋 PREREQUISITES CHECKLIST

Before starting, ensure you have:

- [ ] **Cloudflare Account** with Pages, Workers, D1, R2, Queues enabled
- [ ] **Stripe Account** (test + live keys)
- [ ] **Google Cloud Project** (Calendar API + OAuth consent screen)
- [ ] **Meta Developer Account** (WhatsApp Business API)
- [ ] **NVIDIA NGC Account** (NIM API key for Gemma 4)
- [ ] **Resend Account** (email sending)
- [ ] **Sentry Account** (optional, error tracking)
- [ ] **GitHub Repository** with this code pushed

---

## 🔧 STEP 1: CLOUDFLARE RESOURCES SETUP

### 1.1 Create D1 Database
```bash
# Login to Cloudflare
wrangler login

# Create database
wrangler d1 create sattvalife-yoga

# Note the database_id from output, update wrangler.toml
# database_id = "your-database-id-here"
```

### 1.2 Create R2 Bucket
```bash
wrangler r2 bucket create sattvalife-assets
```

### 1.3 Create Queues
```bash
wrangler queues create email-queue
wrangler queues create whatsapp-queue
wrangler queues create calendar-queue
```

### 1.4 Verify Resources
```bash
wrangler d1 list
wrangler r2 bucket list
wrangler queues list
```

---

## 🔐 STEP 2: EXTERNAL SERVICES CONFIGURATION

### 2.1 Stripe Setup
1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. **API Keys**: Copy `STRIPE_SECRET_KEY` and `STRIPE_PUBLISHABLE_KEY`
3. **Webhooks**: Add endpoint `https://sattvalife.yoga/api/webhooks/stripe`
   - Events: `payment_intent.succeeded`, `payment_intent.payment_failed`, `checkout.session.completed`
   - Copy `STRIPE_WEBHOOK_SECRET`
4. **Products**: Create products for:
   - Vinyasa Tuesday (£15)
   - Hatha Thursday (£15)
   - 5-Class Pack (£65)
   - 10-Class Pack (£110)
   - Monthly Unlimited (£89/mo)

### 2.2 Google Cloud OAuth
1. [Google Cloud Console](https://console.cloud.google.com)
2. Enable **Google Calendar API**
3. **OAuth Consent Screen**: External, add scopes:
   - `https://www.googleapis.com/auth/calendar.events`
3. **Credentials**: Create OAuth 2.0 Client ID (Web application)
   - Authorized redirect URIs: `https://sattvalife.yoga/api/auth/callback/google`
   - Copy `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`

### 2.3 WhatsApp Business API
1. [Meta Developer Portal](https://developers.facebook.com)
2. Create Business App → Add WhatsApp Business API
3. **Configuration**: 
   - Phone Number ID → `WHATSAPP_PHONE_NUMBER_ID`
   - WABA ID → `WHATSAPP_WABA_ID`
   - Access Token → `WHATSAPP_ACCESS_TOKEN`
4. **Webhook**: `https://sattvalife.yoga/api/webhooks/whatsapp`
   - Verify Token → `WHATSAPP_VERIFY_TOKEN`
   - Subscribe to: `messages`, `message_template_status_update`
5. **Templates**: Submit these for approval:
   - `booking_confirmation`
   - `reminder_24h`
   - `reminder_1h`
   - `payment_receipt`
   - `welcome`
   - `cancellation_confirmation`

### 2.4 NVIDIA NIM (Gemma 4)
1. [NVIDIA NGC](https://ngc.nvidia.com)
2. Search for "Gemma 4" or "google/gemma-4-27b"
3. Get API key → `NVIDIA_NIM_API_KEY`

### 2.5 Resend Email
1. [Resend Dashboard](https://resend.com)
2. Add domain `sattvalife.yoga` (verify DNS)
3. Create API key → `RESEND_API_KEY`
4. Set `EMAIL_FROM=noreply@sattvalife.yoga`

---

## 🌐 STEP 3: GITHUB REPOSITORY

### 3.1 Push Code
```bash
git init
git add .
git commit -m "Initial commit: Complete Sattvalife Yoga migration"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/sattvalife-yoga.git
git push -u origin main
```

### 3.2 GitHub Secrets (Repository Settings → Secrets → Actions)
Add these secrets:
| Secret Name | Value |
|-------------|-------|
| `CLOUDFLARE_API_TOKEN` | From Cloudflare Profile → API Tokens |
| `CLOUDFLARE_ACCOUNT_ID` | From Cloudflare Dashboard (right sidebar) |
| `DATABASE_URL` | `libsql://your-db-id.your-account.turso.io` (if using Turso) or Cloudflare D1 binding |
| `DATABASE_AUTH_TOKEN` | D1 auth token if needed |
| `STRIPE_SECRET_KEY` | `sk_live_...` |
| `STRIPE_PUBLISHABLE_KEY` | `pk_live_...` |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` |
| `GOOGLE_CLIENT_ID` | `...apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | `GOCSPX-...` |
| `WHATSAPP_ACCESS_TOKEN` | `EAA...` |
| `WHATSAPP_PHONE_NUMBER_ID` | `123456789` |
| `WHATSAPP_WABA_ID` | `123456789` |
| `WHATSAPP_VERIFY_TOKEN` | `sattvalife-verify-token` |
| `NVIDIA_NIM_API_KEY` | `nvapi-...` |
| `RESEND_API_KEY` | `re_...` |
| `EMAIL_FROM` | `noreply@sattvalife.yoga` |
| `ENCRYPTION_PASSWORD` | `sattvalife-yoga-encryption-key-2024-min-32-chars-long!!` |
| `ENCRYPTION_SALT` | `sattvalife-yoga-salt-2024` |
| `SESSION_PASSWORD` | `sattvalife-yoga-session-password-2024-min-32-chars-long!!` |
| `NEXT_PUBLIC_APP_URL` | `https://sattvalife.yoga` |
| `SENTRY_DSN` | `https://...@o123456.ingest.sentry.io/123456` |

---

## ☁️ STEP 4: CLOUDFLARE PAGES PROJECT

### 4.1 Create Pages Project
1. Go to [Cloudflare Pages](https://dash.cloudflare.com/pages)
2. **Create a project** → Connect to Git → Select your repo
2. **Build settings**:
   - Framework preset: **Next.js (Static HTML Export)** or **None**
   - Build command: `pnpm run build`
   - Build output directory: `.vercel/output/static`
   - Root directory: `/`
4. **Environment variables** (add ALL from Step 3.2)
5. **Deploy**!

### 4.2 Custom Domain
1. In Pages project → **Custom domains**
2. Add `sattvalife.yoga` and `www.sattvalife.yoga`
3. Update DNS records as instructed (CNAME to `sattvalife-yoga.pages.dev`)
4. Wait for SSL certificate

---

## 🗄️ STEP 5: DATABASE MIGRATION

### 5.1 Apply Schema
```bash
# Set DATABASE_URL for Cloudflare D1
export DATABASE_URL="libsql://your-db-id.your-account.turso.io"
# OR use Cloudflare D1 binding directly

# Run migrations
pnpm db:migrate

# Seed initial data
pnpm db:seed
```

### 5.2 Verify Data
```bash
# Check tables
wrangler d1 execute sattvalife-yoga --command "SELECT * FROM users;"
wrangler d1 execute sattvalife-yoga --command "SELECT * FROM courses;"
wrangler d1 execute sattvalife-yoga --command "SELECT * FROM locations;"
```

---

## 🔄 STEP 6: WEBHOOK CONFIGURATION

### 6.1 Stripe Webhook
In Stripe Dashboard → Webhooks:
- URL: `https://sattvalife.yoga/api/webhooks/stripe`
- Events: `payment_intent.succeeded`, `payment_intent.payment_failed`, `checkout.session.completed`

### 6.2 WhatsApp Webhook
In Meta Developer Portal → WhatsApp → Configuration:
- Callback URL: `https://sattvalife.yoga/api/webhooks/whatsapp`
- Verify Token: `sattvalife-verify-token`
- Fields: `messages`, `message_template_status_update`

### 6.3 Google OAuth
In Google Cloud Console → Credentials:
- Authorized redirect URI: `https://sattvalife.yoga/api/auth/callback/google`

---

## ✅ STEP 7: VERIFICATION CHECKLIST

### 7.1 Core Features
- [ ] Homepage loads with all sections
- [ ] About page shows instructors
- [ ] Schedule shows 2 locations with times
- [ ] Registration form submits → Stripe checkout
- [ ] Payment succeeds → Booking confirmed
- [ ] Google Calendar event created
- [ ] WhatsApp confirmation sent
- [ ] Email receipt sent

### 7.2 Admin Panel
- [ ] `/admin` accessible with admin account
- [ ] Dashboard shows revenue, bookings, students
- [ ] Courses CRUD works
- [ ] Bookings management (check-in, cancel, refund)
- [ ] Students list with export
- [ ] Analytics charts render

### 7.3 Mobile Admin App
- [ ] Build iOS: `flutter build ios --release`
- [ ] Build Android: `flutter build appbundle --release`
- [ ] Test on device: Login, Dashboard, Courses, Bookings

### 7.4 AI Chat
- [ ] Chat widget opens on all pages
- [ ] Ask about schedules → correct response
- [ ] Ask about pricing → correct response
- [ ] Ask about booking → generates link
- [ ] Handoff to WhatsApp works

---

## 🚨 STEP 8: PRODUCTION HARDENING

### 8.1 Security Headers
Verify in browser DevTools → Network → Response Headers:
- `Content-Security-Policy`
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: origin-when-cross-origin`

### 8.2 Rate Limiting
Configure in Cloudflare WAF:
- Login: 5 req/min
- Registration: 3 req/min
- API: 100 req/min
- Chat: 30 req/min

### 8.3 Monitoring
- [ ] Sentry alerts configured
- [ ] Cloudflare Analytics enabled
- [ ] Uptime monitoring (UptimeRobot/Pingdom)

---

## 🎯 STEP 9: GO LIVE!

### 9.1 Final Checks
```bash
# Run full test suite
pnpm test
pnpm test:e2e

# Build production
pnpm build

# Deploy
./scripts/deploy.ps1 -Environment production
# OR
./scripts/deploy.sh production
```

### 9.2 DNS Cutover
1. Update `sattvalife.yoga` A record to Cloudflare Pages
2. Enable **Always Use HTTPS** in Cloudflare SSL/TLS
3. Enable **Automatic HTTPS Rewrites**

### 9.4 Post-Launch (First 48 Hours)
- Monitor error rates in Sentry
- Check booking flow end-to-end
- Verify WhatsApp messages delivering
- Confirm Google Calendar events created
- Check email deliverability

---

## 📞 SUPPORT CONTACTS

| Issue | Contact |
|-------|---------|
| Cloudflare Pages | Cloudflare Dashboard → Support |
| Stripe Payments | Stripe Dashboard → Support |
| WhatsApp API | Meta Developer Support |
| Google Calendar | Google Cloud Support |
| NVIDIA NIM | NVIDIA Developer Forum |
| Sentry Errors | Sentry Dashboard |

---

## 📋 QUICK COMMANDS REFERENCE

```bash
# Local development
pnpm dev

# Build
pnpm build

# Database
pnpm db:generate   # Generate types
pnpm db:push       # Push schema to D1
pnpm db:migrate    # Run migrations
pnpm db:seed       # Seed data
pnpm db:studio     # Open Drizzle Studio

# Deploy preview
./scripts/deploy.ps1 -Environment preview

# Deploy production
./scripts/deploy.ps1 -Environment production

# Admin app
cd admin_app
flutter pub get
flutter run -d chrome  # Web
flutter run            # Mobile
flutter build web      # Build web
flutter build apk      # Build Android
flutter build ios      # Build iOS
```

---

## 🎉 DONE!

Your Sattvalife Yoga platform is now live on Cloudflare Pages with:
- ✅ Zero backend costs (all free tiers)
- ✅ Global edge performance
- ✅ Premium Apple-style UI
- ✅ Full booking + payment + calendar + WhatsApp automation
- ✅ AI chat assistant (Gemma 4)
- ✅ Admin mobile app
- ✅ Complete analytics

**Total monthly cost: ~£40 (Stripe fees only)** 🚀