# AGENTS.md

Guide for coding agents and developers picking up this repository. Read [README.md](README.md) first for setup and commands. Last reviewed: 2026-11-25.

## The one rule about branches

- **`master` is the live site.** It is the Vite + React SPA served from Firebase Hosting. Every push or merge to `master` deploys to production through `.github/workflows/deploy-hosting.yml`. Work on a feature branch and open a pull request into `master`.
- `legacy-nextjs-cloudflare` holds the earlier Next.js 15 + Cloudflare Workers rewrite (with a Flutter `admin_app/` and a `whatsapp-service/`). It was `master` until 2026-11-25. It is **not deployed and not maintained**; do not port code from it without asking the owner.
- `production-spa` was the live branch before 2026-11-25 and is now frozen. Its full history is merged into `master`. Do not push to it.

## Definition of done for any change

1. `npm run check` passes (ESLint clean, `tsc -b` clean, Vite build succeeds).
2. You looked at the affected pages in `npm run preview` at phone width (390px) and desktop width.
3. Copy follows the brand rules below. No stock photos, no invented reviews, prices or claims.
4. If you changed how static assets are cached or which files the app shell needs, bump `CACHE` in `public/sw.js` (for example `sattvalife-v8` to `sattvalife-v9`), otherwise returning visitors get stale files.
5. If you add or rename a route, update `src/App.tsx`, `public/sitemap.xml`, the nav in `src/lib/nav.ts` if it belongs there, and add a 301 in `firebase.json` for any URL that used to exist.

## Architecture

Static single-page app. No server code in this repo.

- **Routing:** `src/App.tsx` (React Router 7). Home is eager; other pages are `lazy()`. `firebase.json` rewrites everything to `index.html` and holds the 301 redirects from the old WordPress URLs (`/about-us`, blog posts, `/feed`, sitemaps). Keep those redirects, they preserve Google rankings.
- **Content:** almost all copy is plain data in `src/data/content.ts` (brand, contact, socials, timetable, classes, practices, instructors, reviews, FAQs, celebrations, blog posts). Change copy there, not in JSX.
- **Photos:** `src/data/photos.ts` is a registry of every image slot with its crop ratio and the shot it needs. Slots with `src: null` render a branded plate instead of a gap. Use `<Photo slot="..."/>` (`src/components/Photo.tsx`). Images live in `public/images/`; prefer WebP with a `srcSet`.
- **CMS overlay:** `src/hooks/useCmsContent.ts` fetches owner edits from the CMS Worker at `https://sattvalife-cms.cbvarshini1.workers.dev` and overlays them on the defaults in `content.ts` and `config.ts`. If the Worker is down, the bundled defaults show. Public forms (contact, newsletter, registration, events) POST to the same Worker via `src/lib/api.ts`, with a honeypot field and a timeout.
- **Payments:** Stripe Payment Links (hosted checkout), configured in `src/config.ts`. They are **test-mode** links; the admin app can override them without a redeploy. Successful checkout returns to `/?checkout=success`, which shows `CheckoutNotice`.
- **Analytics:** PostHog, loaded only after cookie consent (`src/lib/consent.ts`, `src/hooks/usePostHog.ts`). Off unless `VITE_POSTHOG_KEY` (a `phc_` project key) is set.
- **Posture Lab** (`/posture-lab`, `src/pages/PostureLabPage.tsx`, `src/components/posture-lab/`): TensorFlow.js MoveNet runs in the browser on the webcam feed; joint angles are compared with per-asana targets. No video leaves the device. It is a large lazy chunk (~1.5 MB), so keep it off other pages. Copy must present it as a free practice aid, not medical advice or a replacement for a teacher.
- **PWA:** `public/sw.js` (network-first navigations, stale-while-revalidate for same-origin assets, never touches API/Stripe/analytics) and `public/manifest.json`.
- **UI kit:** `src/components/ui/` is vendored shadcn/ui. ESLint relaxes two rules for that folder only so it can be re-synced with the shadcn CLI; hold the rest of `src/` to the full rules.

## Outside this repo

- **CMS Worker** (`sattvalife-cms.cbvarshini1.workers.dev`) and the **admin app** that edits site content and Stripe links: their source is not in this repository. Ask the owner (GitHub `varshinicb1`) where they live before changing API contracts in `useCmsContent.ts` or `api.ts`.
- **Firebase project:** `sattvalife-yoga` (see `.firebaserc`). Hosting only.
- **Domain:** `sattvalife.yoga`, registered at GoDaddy. The old WordPress site is on Bluehost. Email (`info@sattvalife.yoga`) depends on the existing MX/SPF/DKIM records; never change those or the nameservers.

## Brand and content rules (from the client)

- Palette: warm cream background, olive green, one warm gold for logo, buttons and capsules (gold capsule on hover), dark brown text rather than black. Gold trident (trishul) logo; SVGs in `public/`.
- Positioning: "Mind-Body Mastery & Purposeful Living - Anywhere in the World". Guiding line: "You don't have to fit yoga. We help yoga fit into your life." Flyer lines: "Reset Lifestyle with Modern Yoga", "Move · Breathe · Be well". Do **not** use "Stop Worrying, Start Living".
- Classes: the Thursday Thurnby class is retired. The only weekly class is Oadby, Tuesday 6:30-7:30pm, Trinity Methodist Church. Elsewhere say new classes are coming soon and invite sign-ups.
- Real photos and real Google reviews only. No stock imagery, no made-up testimonials. No prices on celebration/event flyers.
- Social icons in their original brand colours, no white discs, no floating social sidebar. Include Google Reviews.
- Keep: dismissible newsletter popup with consent, sticky Book Now, a home link always reachable.
- Do not publish personal phone numbers. The public WhatsApp number is the one in `CONTACT` in `content.ts`.

## Deploy status (2026-11-25)

See [DEPLOYMENT.md](DEPLOYMENT.md) for the steps.

- The live site at `sattvalife-yoga.web.app` was deployed outside CI (from the owner's machine). CI deploys **fail** until the owner adds the repository secret `FIREBASE_SERVICE_ACCOUNT_SATTVALIFE_YOGA` (Firebase console, Service accounts, Generate new private key).
- GitHub Actions jobs on this repo were recently failing within seconds without a runner, which points at a GitHub billing or spending-limit setting the owner has to check.
- `sattvalife.yoga` is not yet connected to Firebase. Once the secret exists, run the "Connect custom domain" workflow and enter the printed records at GoDaddy.

## Open work

Needs the owner or client:

- Add the Firebase deploy secret, fix Actions billing if needed, connect the domain (above).
- Create live Stripe Payment Links (Drop-in £10, Monthly Flow £35, Sattvalife@Work) with redirect `https://sattvalife.yoga/?checkout=success`, and set them in the admin app.
- Allow `https://sattvalife.yoga` and `https://www.sattvalife.yoga` in the CMS Worker's CORS list, then send a test form from the live site.
- Add the domain to Google Search Console and submit `/sitemap.xml`.
- Content still missing: TikTok and YouTube URLs (`SOCIALS` in `content.ts`), Instagram grid images (`COMMUNITY_POSTS`), real photos for sound bath, private sessions and the Tuesday hall (slots with `src: null` in `photos.ts`).

Engineering backlog:

- No automated tests. A Playwright smoke test of the main routes, run in the PR workflow, would be the best first addition.
- Posture Lab chunk is ~1.5 MB; trimming the TensorFlow backends would speed it up.
- Premium Posture Lab tier (Firebase Auth + Stripe subscription) was assessed on 2026-11-14 and not started. The student-built posture code the client sent must not be deployed as-is, and needs a written IP licence from its authors before any commercial use.
- `take_screenshots.cjs` and `deploy.ps1` are the owner's local Windows helpers (hard-coded Windows paths). CI is the supported deploy path.
