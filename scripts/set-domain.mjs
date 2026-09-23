#!/usr/bin/env node
/**
 * Switch the site's canonical address.
 *
 *   node scripts/set-domain.mjs https://sattvalife.yoga
 *
 * Updates every place the address is hard-coded: the CANONICAL_ORIGIN constant,
 * index.html (canonical, Open Graph, Twitter, JSON-LD), the sitemap, robots.txt
 * and the RSS feed. Run it only once DNS resolves to Firebase and the
 * certificate is issued, then rebuild and deploy.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const next = (process.argv[2] || '').replace(/\/$/, '')
if (!/^https:\/\/[a-z0-9.-]+$/i.test(next)) {
  console.error('Usage: node scripts/set-domain.mjs https://your-domain.tld')
  process.exit(1)
}

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const sitePath = join(root, 'src/lib/site.ts')
const current = (readFileSync(sitePath, 'utf8').match(/CANONICAL_ORIGIN = '([^']+)'/) || [])[1]
if (!current) {
  console.error('Could not read the current origin from src/lib/site.ts')
  process.exit(1)
}
if (current === next) {
  console.log(`Already set to ${next}`)
  process.exit(0)
}

const files = ['src/lib/site.ts', 'index.html', 'public/sitemap.xml', 'public/robots.txt', 'public/rss.xml']
let total = 0
for (const rel of files) {
  const path = join(root, rel)
  const before = readFileSync(path, 'utf8')
  const after = before.split(current).join(next)
  const hits = before.split(current).length - 1
  if (hits) {
    writeFileSync(path, after)
    total += hits
  }
  console.log(`${hits.toString().padStart(3)}  ${rel}`)
}

console.log(`\n${current}  ->  ${next}   (${total} replacements)`)
console.log('Next: npm run build && npx firebase-tools deploy --only hosting')
console.log('Then update the Stripe Payment Links to redirect to ' + next + '/?checkout=success')
