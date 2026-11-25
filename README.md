# Sattvalife Yoga website

The public website for **Sattvalife Yoga** (Amisha Soni, Leicester UK): classes, celebrations and events, corporate wellness, teachers, reviews, blog, registration and a browser-based Posture Lab.

| | |
| --- | --- |
| Live today | https://sattvalife-yoga.web.app (Firebase Hosting) |
| Target domain | https://sattvalife.yoga (still serves the old WordPress site until DNS is switched, see [DEPLOYMENT.md](DEPLOYMENT.md)) |
| Branch | `master` is the live site. Every merge into `master` deploys. |
| Stack | Vite 7, React 19, TypeScript 5.9, Tailwind CSS 3, shadcn/ui, framer-motion, React Router 7 |

## Quick start

Needs Node.js 22 (CI uses 22; 20 also works) and npm.

```bash
npm ci              # install exact locked dependencies
npm run dev         # dev server on http://localhost:3000
npm run check       # lint + type-check + production build (run before every PR)
npm run preview     # serve the built dist/ locally
```

No environment variables are required. Optional ones are listed in [.env.example](.env.example).

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Vite dev server with hot reload |
| `npm run lint` | ESLint (must be clean) |
| `npm run build` | `tsc -b` type-check, then Vite build into `dist/` |
| `npm run check` | `lint` then `build`. This is the project's test gate. |
| `npm run preview` | Serve `dist/` as production would |
| `npm run deploy` | Manual build + Firebase deploy from your machine (needs `firebase login`). Normally CI does this. |

There is no unit test suite yet. `npm run check` plus a click-through of the pages in `npm run preview` is the current verification.

## Deployment

Automatic through GitHub Actions ([.github/workflows/deploy-hosting.yml](.github/workflows/deploy-hosting.yml)):

- Pull request into `master`: build, then a 7-day Firebase preview URL posted on the PR.
- Push/merge into `master`: build, deploy to the live Firebase site, then smoke-test key pages.
- [.github/workflows/connect-domain.yml](.github/workflows/connect-domain.yml): manual "Run workflow" button that connects `sattvalife.yoga` to Firebase and prints the GoDaddy DNS records.

Both need the repository secret `FIREBASE_SERVICE_ACCOUNT_SATTVALIFE_YOGA`. Setup steps and the go-live checklist are in [DEPLOYMENT.md](DEPLOYMENT.md).

## Where things live

```
src/
  App.tsx            routes (React Router); pages other than Home are lazy-loaded
  config.ts          Stripe defaults (TEST-mode Payment Links)
  data/content.ts    all site copy: classes, timetable, reviews, FAQs, blog, contact
  data/photos.ts     photo slot registry (which real photo goes where)
  pages/             one file per route
  sections/          homepage and shared page sections, Navbar, Footer, Layout
  components/        site components; components/ui/ is vendored shadcn/ui
  components/posture-lab/  in-browser pose detection (TensorFlow.js MoveNet)
  hooks/useCmsContent.ts   overlays owner edits from the CMS Worker
  lib/api.ts         form submissions to the CMS Worker
public/              static files, images, sitemap.xml, rss.xml, sw.js (service worker)
firebase.json        hosting config, 301 redirects from old WordPress URLs, headers
```

For coding agents and new developers, read [AGENTS.md](AGENTS.md) next. It covers conventions, external services, history and open work.
