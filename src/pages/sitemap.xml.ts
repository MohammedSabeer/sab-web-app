---
import { SITE } from '@config/site';

const pages = [
  { url: '', priority: 1.0, changefreq: 'weekly' },
  { url: 'capabilities', priority: 0.9, changefreq: 'weekly' },
  { url: 'use-cases', priority: 0.8, changefreq: 'monthly' },
  { url: 'facilities', priority: 0.8, changefreq: 'monthly' },
  { url: 'rfq', priority: 0.9, changefreq: 'weekly' },
  { url: 'documentation', priority: 0.7, changefreq: 'monthly' },
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${pages.map(page => `  <url>
    <loc>${SITE.url}/${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>`).join('\n')}
</urlset>`;

return new Response(sitemap, {
  headers: {
    'Content-Type': 'application/xml',
    'Cache-Control': 'public, max-age=3600',
  },
});
---
