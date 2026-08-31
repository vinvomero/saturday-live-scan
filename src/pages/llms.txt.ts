import type { APIRoute } from 'astro';
import { cityEntries, pageUrl } from '../lib/site-urls';

export const GET: APIRoute = async ({ site }) => {
  const cities = await cityEntries();
  const home = pageUrl(site);
  const faq = pageUrl(site, 'faq');
  const cityLines = cities
    .map(
      (city) =>
        `- [${city.data.title}](${pageUrl(site, city.id)}): DOJ-listed Saturday walk-in Live Scan shops. Hours, rolling fees, skip list, FAQ on the city page.`,
    )
    .join('\n');
  const body = `# Saturday Walk-in Live Scan (California)

> California Live Scan shops that the DOJ list marks as Saturday walk-in, city by city.

Confirm hours and fees with the shop before you go. DOJ says the public list can be stale. Nobody listed here was called.

## Pages

- [Saturday Walk-in Live Scan (California)](${home}): Index of California cities with DOJ-listed Saturday walk-in Live Scan shops. Includes FAQ.
${cityLines}
- [FAQ](${faq}): Links to the home FAQ and each city FAQ section.
`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
