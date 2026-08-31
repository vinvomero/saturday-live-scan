import type { APIRoute } from 'astro';
import { cityEntries, latestUpdated, pageUrl } from '../lib/site-urls';

export const GET: APIRoute = async ({ site }) => {
  const cities = await cityEntries();
  const latest = latestUpdated(cities);
  const urls = [
    { loc: pageUrl(site), lastmod: latest, priority: '1.0' },
    ...cities.map((city) => ({
      loc: pageUrl(site, city.id),
      lastmod: city.data.updated,
      priority: '0.9',
    })),
    { loc: pageUrl(site, 'faq'), lastmod: latest, priority: '0.7' },
  ];
  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map(
        (u) =>
          `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`,
      )
      .join('\n') +
    `\n</urlset>\n`;
  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
