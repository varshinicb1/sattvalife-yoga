import { NextResponse } from 'next/server';

const staticRoutes = [
  { path: '', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/schedule', priority: '0.9', changefreq: 'weekly' },
  { path: '/register', priority: '0.8', changefreq: 'monthly' },
  { path: '/login', priority: '0.5', changefreq: 'monthly' },
  { path: '/corporate', priority: '0.7', changefreq: 'monthly' },
  { path: '/blog', priority: '0.8', changefreq: 'weekly' },
  { path: '/contact', priority: '0.6', changefreq: 'monthly' },
  { path: '/terms', priority: '0.3', changefreq: 'yearly' },
  { path: '/privacy', priority: '0.3', changefreq: 'yearly' },
];

const blogSlugs = [
  '/blog/3-quick-yoga-asanas-to-get-relief-from-back-pain',
  '/blog/conclusion-empowering-children-through-yoga',
  '/blog/yoga-and-meditation',
];

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://sattvalife.yoga';
  const now = new Date().toISOString();

  const urls = [
    ...staticRoutes.map(
      (r) => `  <url>
    <loc>${baseUrl}${r.path}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
    ),
    ...blogSlugs.map(
      (slug) => `  <url>
    <loc>${baseUrl}${slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
    ),
  ].join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
