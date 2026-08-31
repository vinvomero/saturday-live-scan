# Saturday Walk-in Live Scan (California)

Directory of California Live Scan shops that the DOJ list marks as Saturday walk-in.

Live site: https://saturdaylivescan.com/

No affiliate links. No shop is featured or paid today. Shops can email about a $49/month Saturday featured-slot offer; that is an offer, not checkout. Confirm hours before you go.

## Add a city page

1. Copy `src/content/cities/oakland-saturday-walk-in-live-scan.md` to a new file in the same folder.
2. Name the file as the URL slug, for example `berkeley-saturday-walk-in-live-scan.md` becomes `/berkeley-saturday-walk-in-live-scan/`.
3. Set frontmatter:
   - `title` — page heading
   - `updated` — `YYYY-MM-DD`
   - `query` — optional, the search this page answers
4. Keep the Oakland structure: who it is for, how it was verified, go table, skip-Saturday table, source URLs, accessed date.
5. Do not invent hours or phones. If a cell is not on the DOJ page, mark it **UNVERIFIED**.
6. Operator sites may fill gotchas and blank phones. They do not create a row.
7. From this directory run the production build, then commit.

Home lists every file in `src/content/cities/` automatically. You do not edit `src/pages/index.astro` to add a city.

Berkeley is a collection city like Oakland. Dropping another `src/content/cities/*.md` file is enough for home, sitemap, and llms.txt to list it on the next production build. Sourced FAQ JSON-LD and ItemList names/addresses are still added per city when that copy exists.

`sitemap.xml` and `llms.txt` are generated at build from the cities collection plus home and FAQ (`src/pages/sitemap.xml.ts`, `src/pages/llms.txt.ts`). Do not put hand-edited copies in `public/` — those would overwrite the endpoints.

## Crawl files and robots.txt at the host root

This site uses a custom domain, so Google can fetch `robots.txt` at the **host root**:

https://saturdaylivescan.com/robots.txt

Sitemap: https://saturdaylivescan.com/sitemap.xml

llms.txt: https://saturdaylivescan.com/llms.txt

`public/CNAME` holds `saturdaylivescan.com` so the built `dist/CNAME` survives orphan `gh-pages` publishes. Do not put a `CNAME` at the repo root of `main`. The previous GitHub Pages project URL may break or redirect after this cutover.

## Local build

```sh
bun install
bun run build
bun scripts/verify-seo.ts
```

Requires Node 22 or newer.

## Config

`astro.config.mjs` sets `site` to `https://saturdaylivescan.com` and `base` to `/`. Keep `trailingSlash: 'always'`.
