# 🚀 QUICK START: DEPLOY TO CLOUDFLARE PAGES NOW

## ⚡ ONE-COMMAND DEPLOYMENT

```bash
# Windows PowerShell
.\scripts\deploy.ps1 -Environment production

# OR Linux/Mac
chmod +x scripts/deploy.sh
./scripts/deploy.sh production
```

---

## 📋 PRE-REQUISITES (5 min setup)

### 1. Cloudflare Account
```bash
# Login to Cloudflare
wrangler login
```

### 2. Create D1 Database
```bash
wrangler d1 create sattvalife-yoga
# Copy the database_id and update wrangler.toml
```

### 3. Required API Keys (Get these first!)
| Service | What You Need |
|---------|---------------|
| **Stripe** | `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET` |
| **Google** | `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` (Calendar API) |
| **WhatsApp** | `WHATSAPP_ACCESS_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_VERIFY_TOKEN` |
| **NVIDIA NIM** | `NVIDIA_NIM_API_KEY` (Gemma 4 free tier) |
| **Resend** | `RESEND_API_KEY`, `EMAIL_FROM` |
| **Cloudflare** | `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID` |

---

## 🏗️ BUILD & DEPLOY

```bash
# 1. Install dependencies
pnpm install

# 2. Generate database types
pnpm db:generate

# 3. Run tests
pnpm test

# 4. Build (creates .vercel/output/static)
pnpm build

# 5. Deploy to Cloudflare Pages
wrangler pages deploy .vercel/output/static \
  --project-name=sattvalife-yoga \
  --branch=main
```

---

## 🔐 CLOUDFLARE PAGES ENVIRONMENT VARIABLES

**Add ALL of these in Cloudflare Dashboard → Pages → Settings → Environment Variables:**

```bash
# Core
NEXT_PUBLIC_APP_URL=https://sattvalife.yoga
SESSION_PASSWORD=sattvalife-yoga-session-password-2024-min-32-chars-long!!

# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Google Calendar
GOOGLE_CLIENT_ID=...apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-...

# WhatsApp Business API
WHATSAPP_ACCESS_TOKEN=EAA...
WHATSAPP_PHONE_NUMBER_ID=123456789
WHATSAPP_WABA_ID=123456789
WHATSAPP_VERIFY_TOKEN=sattvalife-verify-token

# AI Chat (Gemma 4 via NVIDIA NIM)
NVIDIA_NIM_API_KEY=nvapi-...

# Email
RESEND_API_KEY=re_...
EMAIL_FROM=noreply@sattvalife.yoga

# Encryption
ENCRYPTION_PASSWORD=sattvalife-yoga-encryption-key-2024-min-32-chars-long!!
ENCRYPTION_SALT=sattvalife-yoga-salt-2024

# Analytics (optional)
SENTRY_DSN=https://...@o123456.ingest.sentry.io/123456
```

---

## 🗄️ DATABASE SETUP (Post-Deploy)

```bash
# Apply migrations
pnpm db:migrate

# Seed initial data (admin, instructors, courses, locations)
pnpm db:seed

# Verify
wrangler d1 execute sattvalife-yoga --command "SELECT * FROM users;"
```

---

## ✅ VERIFY DEPLOYMENT

```bash
# Check homepage
curl -I https://sattvalife.yoga

# Test booking flow
# 1. Visit https://sattvalife.yoga
# 2. Click "Book a Class"
# 3. Fill registration → Stripe checkout
# 4. Confirm → Check WhatsApp + Email + Google Calendar
```

---

## 🎯 DONE!

Your site is live at: **https://sattvalife.yoga**

**Monthly Cost: ~£40** (only Stripe transaction fees)

---

## 🆘 NEED HELP?

| Issue | Solution |
|-------|----------|
| Build fails | Check `pnpm build` locally first |
| DB errors | Verify D1 binding in `wrangler.toml` |
| Stripe webhook 404 | Check URL: `https://sattvalife.yoga/api/webhooks/stripe` |
| WhatsApp not sending | Verify templates approved in Meta dashboard |
| Calendar not syncing | Check Google OAuth consent screen published |

---

**Built with:** Next.js 15 + React 19 + TypeScript + Tailwind 4 + Cloudflare D1/R2/Workers + Stripe + Google Calendar + WhatsApp + NVIDIA NIM (Gemma 4) + Flutter Admin App