# Plan — Publish Oakland Saturday cash Live Scan

artifact_readiness: implementation-ready
repo: https://github.com/vinvomero/saturday-live-scan (public, GitHub Pages, custom domain saturdaylivescan.com)
date: 2026-08-31

## Goal
Ship Night 5 city page live at https://saturdaylivescan.com/oakland-saturday-cash-live-scan/ with crawl files HTTP 200. Do not invent hours/phones/fees/payment. Do not contact shops. Do not send featured emails. Never FoxyAI. Do not clone onto Startbot’s computer.

## Source (already drafted, do not rewrite facts)
- City markdown draft and FAQ export live under `/workspace/shared/outputs/mogul-site/` on Startbot’s box (`oakland-saturday-cash-live-scan.md`, `oakland-cash-faq.ts`). Research dump `oakland-cash-doj-notes.md` is NOT published.
- **CloudAgent cannot see `/workspace/shared`.** Startbot pastes the full city markdown (local-draft footer already stripped) and the `oaklandCashFaq` export into the CloudAgent prompt. CloudAgent must not try to read those shared paths; treat the pasted bodies as the source of truth.
- Strip footer line if still present in paste: `*Local draft for Startbot to publish. No affiliate links. No shops were paid or contacted.*`

## Implementation
1. Add city markdown to `src/content/cities/oakland-saturday-cash-live-scan.md` from the Startbot-pasted body (footer stripped).
2. Append `oaklandCashFaq` to `src/data/faq.ts` (same `q`/`a` keys as other cities). Export it.
3. In `src/pages/[slug].astro`, keep the existing `faqById` map and add `'oakland-saturday-cash-live-scan': oaklandCashFaq`. Import `oaklandCashFaq`. Map must include all five: oakland walk-in, berkeley, alameda Sunday, san-francisco, oakland cash. Not a ternary.
4. Update `homeFaq` “Do I need an appointment for Saturday Live Scan in California?” to also link the Oakland cash canonical (`https://saturdaylivescan.com/oakland-saturday-cash-live-scan/`), same pattern as Oakland walk-in / Berkeley / SF / Alameda Sunday already in that answer. Do not invent new home FAQ questions.
5. Skip `listings.ts` ItemList this round (FAQ JSON-LD required; ItemList optional).
6. Sitemap + `llms.txt` are generated from the city collection. Confirm the new URL is included after build. Canonical host is https://saturdaylivescan.com/ not github.io.
7. Homepage uses `getCollection('cities')` and picks the new page up automatically. Do not edit `src/pages/index.astro` for the city list.
8. Add an Oakland Saturday cash FAQ list item on `src/pages/faq.astro` (hardcoded hub), same pattern as other cities, linking `oakland-saturday-cash-live-scan/#faq`.
9. Live hosting is GitHub Pages **legacy** from branch `gh-pages` at `/`, custom domain saturdaylivescan.com (CNAME). There is no GitHub Actions workflow; do not add one. **`scripts/verify-seo.ts` fails if `.github/workflows` exists** — do not create that directory. Merge-to-main alone will not put the page on the live host.
   Publish path:
   - bun install, bun run build, bun scripts/verify-seo.ts
   - extend `scripts/verify-seo.ts` first so it asserts the Oakland cash URL in sitemap, llms, and per-page internal links; copy the Alameda/SF page check (FAQPage + BreadcrumbList, **no** shop ItemList). Assert FAQ hub links to Oakland cash, and run the existing shop-offer check on the new page. Title for checkPage: `Saturday cash Live Scan in Oakland`.
   - commit source to `main` (repo stays public)
   - orphan-publish the built `dist/` output to the `gh-pages` branch, keeping `public/CNAME` (`saturdaylivescan.com`) in the built output
   - wait until GitHub Pages status is `built`
   - **Do not call live from CloudAgent.** Startbot curls the live host independently and confirms HTTP 200 before anything is marked live. Do not treat merge-to-main as the deploy.

## Verification (Startbot owns live curls; CloudAgent must not hit live until Startbot reports HTTP 200)
- Startbot: https://saturdaylivescan.com/oakland-saturday-cash-live-scan/ HTTP 200
- Startbot: robots.txt, sitemap.xml, llms.txt HTTP 200 at host root
- sitemap + llms contain the Oakland cash URL
- page has unique meta description, canonical, visible FAQ matching FAQPage JSON-LD
- local-draft footer gone
- no affiliate links, no invented phones/hours/fees
- cross-link to oakland-saturday-walk-in-live-scan remains if present in draft
- Featured emails HOLD; never FoxyAI; repo is https://github.com/vinvomero/saturday-live-scan only

## Out of scope
- Featured listing emails (HOLD until measured traffic)
- Mail Boxes Plus
- GSC resubmit (separate)
- Calling/emailing shops
- Inventing Copy USA card surcharge dollars