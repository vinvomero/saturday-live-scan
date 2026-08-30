# Saturday Walk-in Live Scan (California)

Directory of California Live Scan shops that the DOJ list marks as Saturday walk-in.

Live site: https://vinvomero.github.io/saturday-live-scan/

No affiliate links. No shops were paid. Confirm hours before you go.

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

## Local build

```sh
bun install
bun run build
```

Requires Node 22 or newer (GitHub Actions uses the Astro Pages action).

## Config

`astro.config.mjs` sets `site` to `https://vinvomero.github.io` and `base` to `/saturday-live-scan/`. Do not add a custom domain or a `CNAME` file.
