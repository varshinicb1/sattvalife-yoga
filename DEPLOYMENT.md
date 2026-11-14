# Deploying sattvalife.yoga

Deployment is automatic once the two one-time steps below are done.

| What happens | When |
| --- | --- |
| A preview URL is built and posted on the PR (expires after 7 days) | Every pull request into `production-spa` |
| The site goes live on https://sattvalife.yoga and https://sattvalife-yoga.web.app, then key pages are checked | Every merge into `production-spa` |
| A manual redeploy | Actions → "Deploy to Firebase Hosting" → Run workflow |

## One-time step 1: let GitHub deploy to Firebase

1. Open the Firebase console for the `sattvalife-yoga` project → Project settings → Service accounts → **Generate new private key**. This downloads a JSON file.
2. In GitHub: repository → Settings → Secrets and variables → Actions → **New repository secret**.
   - Name: `FIREBASE_SERVICE_ACCOUNT_SATTVALIFE_YOGA`
   - Value: paste the whole JSON file.
3. Delete the downloaded JSON from your computer. Never commit it or send it in chat.
4. Re-run the latest "Deploy to Firebase Hosting" run, or merge any PR.

## One-time step 2: point sattvalife.yoga at Firebase

The domain is registered at GoDaddy and currently serves the old WordPress site from Bluehost.

1. Firebase console → Hosting → **Add custom domain** → `sattvalife.yoga`. Tick "Redirect www.sattvalife.yoga to sattvalife.yoga" and add `www.sattvalife.yoga` as well.
2. Firebase shows a TXT record (ownership) and A record(s). In GoDaddy → My Products → sattvalife.yoga → **DNS**:
   - Add the TXT record exactly as Firebase shows it.
   - Replace the existing `@` **A** record(s) with the Firebase IP(s).
   - Change the `www` record to what Firebase shows.
   - **Do not change the nameservers, and do not touch the MX, SPF, DKIM or other email records.** `info@sattvalife.yoga` keeps working only if those stay as they are.
3. Click Verify in Firebase. DNS usually switches within an hour (up to 24h). Firebase then issues the HTTPS certificate on its own.
4. Keep the Bluehost plan until the new site has been live for a couple of weeks, so the old WordPress site can be restored by switching the A record back.

Old WordPress URLs (`/about-us`, `/terms-and-conditions`, the three blog posts, `/feed`, sitemaps) are already 301-redirected to their new pages in `firebase.json`, so Google rankings carry over.

## Before announcing the site

- **Stripe is still in test mode.** Create live Payment Links (Drop-in £10, Monthly Flow £35, Sattvalife@Work) in the Stripe dashboard, set each one's "After payment" redirect to `https://sattvalife.yoga/?checkout=success`, and paste them into the admin app (Settings → Stripe). Until then real cards are declined.
- **Forms** (contact, newsletter, registration, events) post to the CMS Worker `sattvalife-cms.cbvarshini1.workers.dev`. If that Worker restricts origins (CORS), add `https://sattvalife.yoga` and `https://www.sattvalife.yoga` to its allowed list, then send a test message from the live site.
- **Google Search Console:** add `sattvalife.yoga` and submit `https://sattvalife.yoga/sitemap.xml`.
