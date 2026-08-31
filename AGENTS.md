# AGENTS.md — Sattvalife Project Guide & System Status

> **Last updated:** 2026-08-31 | **Maintained by:** Automated pair-programming agent

Welcome to the **Sattvalife Yoga** codebase. This document is the single source of truth for any AI agent or developer working on this project — covering architecture, live feature status, known issues, and operational runbooks.

---

## 🏛️ Architecture Overview

```
sattvalife-yoga/
├── app/                  # Next.js 15 (App Router) Web Application
├── components/           # Shared UI Components (Tailwind v4, Radix, Lucide)
├── lib/                  # Backend utilities (DB, Auth, AI, Stripe, Sessions)
├── drizzle/              # Drizzle ORM migration files
├── public/               # Static assets for web
├── scripts/              # Utility/deployment scripts
├── admin_app/            # Flutter (Dart) Admin Mobile Application
│   ├── lib/
│   │   ├── main.dart             # Entry point — self-contained scaffold
│   │   └── core/
│   │       ├── router/app_router.dart
│   │       └── theme/app_theme.dart  # Full Material 3 light/dark theme
│   ├── android/app/build.gradle.kts  # Android Gradle config
│   └── assets/
│       ├── images/       # (placeholder — client must supply)
│       ├── fonts/        # (placeholder — client must supply)
│       └── lottie/       # (placeholder — client must supply)
└── whatsapp-service/     # Baileys WhatsApp automation service
```

---

## ⚡ Live Features & Status

### 1. Web Application (Next.js 15 + Tailwind CSS v4)

| Feature | Status | Notes |
|---|---|---|
| Homepage (/) | Live | Hero, reviews, focus pillars, instructors |
| Schedule (/schedule) | Live | Oadby & Thurnby studios, dynamic next-date |
| Online Yoga (/online) | Live | Zoom checklist, class passes |
| About / Corporate / Blog | Live | Static content pages |
| Register / Contact | Live | Forms wired |
| Admin Panel (/admin) | Live | Full management panel |
| SEO (sitemap, robots) | Live | app/sitemap.ts, app/robots.ts |
| Google Analytics 4 | Live | Uses NEXT_PUBLIC_GA_ID env var |
| AI Chat (/api/chat) | Live | NVIDIA NIM google/gemma-4-31b-it |
| WhatsApp Click-to-Chat | Live | Direct links in header & footer |
| Stripe Payments | Needs keys | Set STRIPE_PUBLISHABLE_KEY & STRIPE_SECRET_KEY |
| Resend Emails | Needs keys | Set RESEND_API_KEY |

### 2. Admin Mobile App (admin_app/ — Flutter/Dart)

| Feature | Status | Notes |
|---|---|---|
| Bottom nav scaffold | Built | Dashboard, Classes, Students, Check-in, Settings |
| Material 3 theme | Built | Full light/dark theme in app_theme.dart |
| Riverpod state | Wired | flutter_riverpod 2.5.1 |
| API client (Dio/Retrofit) | Wired | Structure only, needs API URL |
| Local DB (Drift/SQLite) | Wired | Schema structure |
| QR check-in (mobile_scanner) | Wired | Needs UI screens |
| Push notifications (Firebase) | Partial | Package included; no google-services.json yet |
| Local notifications | Fixed | Desugaring enabled in build.gradle.kts |
| Debug APK build | In Progress | Gradle assembling (2026-08-31) |

### Known Build Fixes Applied (2026-08-31)
- Missing asset directories -> Created assets/images/, assets/fonts/, assets/lottie/
- Core library desugaring -> Added isCoreLibraryDesugaringEnabled = true + desugar_jdk_libs:2.1.4 in android/app/build.gradle.kts

---

## 🛠️ Developer & Agent Runbook

### Running the Web Application
```bash
# From: sattvalife-yoga/
pnpm install
pnpm dev              # Dev server at http://localhost:3000
pnpm build            # Production build
pnpm db:push          # Push Drizzle schema to DB
pnpm db:studio        # Open Drizzle Studio
```

### Running the Admin Mobile App
```bash
# From: sattvalife-yoga/admin_app/
flutter pub get
flutter devices                      # List connected devices/emulators
flutter emulators --launch pub-test  # Launch the Android emulator (AVD id: pub-test)
flutter run -d <device_id>           # Run on a connected device
flutter build apk --debug            # Build debug APK
```

APK output: admin_app/build/app/outputs/flutter-apk/app-debug.apk

### Installing APK on Emulator
```bash
# After emulator is running:
flutter install -d <emulator_id>
# Or install manually:
adb install build/app/outputs/flutter-apk/app-debug.apk
```

### Database Management (SQLite / Cloudflare D1)
```bash
# Drizzle schema: lib/db/schema.ts
pnpm db:push      # Push migrations
pnpm db:studio    # Visual DB browser
```

---

## 🔑 Environment Configuration

All sensitive keys live in .env (gitignored). Set these to enable integrations:

### Web App (.env in project root)
| Variable | Purpose | Who provides |
|---|---|---|
| STRIPE_PUBLISHABLE_KEY | Stripe payments (client-facing) | Client |
| STRIPE_SECRET_KEY | Stripe payments (server-side) | Client |
| RESEND_API_KEY | Transactional email | Client |
| NEXT_PUBLIC_GA_ID | Google Analytics (G-XXXXXXXXXX) | Client |
| NVIDIA_NIM_API_KEY | AI chat assistant | Developer |

### Mobile App (Flutter)
| Config File | Purpose | Who provides |
|---|---|---|
| admin_app/android/app/google-services.json | Firebase push notifications | Client (from Firebase console) |

Client self-service: The admin panel at /admin allows the client to configure Resend, Stripe, and Google Analytics keys directly from the web UI — no code changes required.

---

## 📋 Pending Tasks

- [ ] google-services.json — Client must download from Firebase console and add to admin_app/android/app/
- [ ] Asset files — Client/designer must supply logo, fonts, and Lottie animations for the mobile app
- [ ] Admin app screens — Individual feature screens (check-in scanner, timetable editor, student list) need implementation
- [ ] API integration — Mobile app API base URL needs to be set (points to the web app's API routes)
- [ ] APK testing — Verify debug APK runs on emulator pub-test after Gradle build completes

---

## 🧑‍💻 Tech Stack Reference

| Layer | Technology |
|---|---|
| Web Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS v4 |
| UI Components | Radix UI, Lucide React |
| Database | Cloudflare D1 (SQLite via Drizzle ORM) |
| Auth | Cloudflare KV + JWT sessions |
| AI | NVIDIA NIM (google/gemma-4-31b-it) |
| Payments | Stripe |
| Email | Resend |
| Analytics | Google Analytics 4 |
| Hosting | Cloudflare Workers (via OpenNext) |
| Mobile | Flutter (Dart), Riverpod, Drift, Dio |
| Push Notifications | Firebase Messaging |
| WhatsApp | Baileys (Node.js) |

---

*Document generated and maintained for automated pair-programming and deployment.*
