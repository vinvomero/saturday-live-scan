import type { APIRoute } from 'astro';
import { cityEntries, pageUrl } from '../lib/site-urls';

export const GET: APIRoute = async ({ site }) => {
  const cities = await cityEntries();
  const home = pageUrl(site);
  const faq = pageUrl(site, 'faq');
  const cityLines = cities
    .map(
      (city) => {
        const prefix = city.data.title.split(':')[0]?.trim() ?? city.data.title;
        return `- [${prefix}](${pageUrl(site, city.id)}): Hours, walk-in vs appointment, rolling fees, Saturday options.`;
      },
    )
    .join('\n');
  const body = `# Saturday Live Scan: California Live Scan locations

> California Live Scan sites from the CA DOJ list, by city: hours, walk-in vs appointment, rolling fees, and Saturday options. Confirm before you go.

## Pages

- [California Live Scan locations: hours, walk-ins, Saturday options](${home}): Index of California cities with DOJ-listed Live Scan sites. Includes FAQ.
${cityLines}
- [California Live Scan FAQ](${faq}): Links to the home FAQ and each city FAQ section.
`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
