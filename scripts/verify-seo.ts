import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = join(import.meta.dir, '..');
const dist = join(root, 'dist');
const failures: string[] = [];

function fail(msg: string) {
  failures.push(msg);
}

function read(rel: string): string {
  const path = join(dist, rel);
  if (!existsSync(path)) {
    fail(`missing dist file: ${rel}`);
    return '';
  }
  return readFileSync(path, 'utf8');
}

function readRepo(rel: string): string {
  return readFileSync(join(root, rel), 'utf8');
}

function attr(html: string, name: string, attrName = 'content'): string | null {
  const re = new RegExp(
    `<meta[^>]+(?:name|property)="${name}"[^>]*${attrName}="([^"]*)"|<meta[^>]+${attrName}="([^"]*)"[^>]*(?:name|property)="${name}"`,
  );
  const m = html.match(re);
  return m ? (m[1] ?? m[2] ?? null) : null;
}

function canonical(html: string): string | null {
  const m = html.match(/<link rel="canonical" href="([^"]+)"/);
  return m?.[1] ?? null;
}

function title(html: string): string | null {
  const m = html.match(/<title>([^<]+)<\/title>/);
  return m?.[1] ?? null;
}

function jsonLdBlocks(html: string): Record<string, unknown>[] {
  const blocks: Record<string, unknown>[] = [];
  const re = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    try {
      blocks.push(JSON.parse(m[1]) as Record<string, unknown>);
    } catch {
      fail(`invalid JSON-LD: ${m[1].slice(0, 80)}`);
    }
  }
  return blocks;
}

function types(blocks: Record<string, unknown>[]): string[] {
  return blocks.map((b) => String(b['@type'] ?? ''));
}

function hasType(blocks: Record<string, unknown>[], t: string): boolean {
  return types(blocks).includes(t);
}

function findType(blocks: Record<string, unknown>[], t: string): Record<string, unknown> | undefined {
  return blocks.find((b) => b['@type'] === t);
}

function stripMd(s: string): string {
  return s.replace(/\*\*/g, '').replace(/<[^>]+>/g, '').trim();
}

function goTableRows(md: string): { name: string; address: string }[] {
  const start = md.indexOf('| Name | Address |');
  const stop = md.indexOf('## Do not go here');
  if (start < 0) return [];
  const table = md.slice(start, stop > start ? stop : undefined);
  return table
    .split('\n')
    .filter((line) => line.startsWith('|') && !line.includes('| Name |') && !/^\|\s*---/.test(line))
    .map((line) => {
      const cells = line
        .split('|')
        .slice(1, -1)
        .map((c) => stripMd(c));
      return { name: cells[0] ?? '', address: cells[1] ?? '' };
    })
    .filter((row) => row.name);
}

function skipNames(md: string): string[] {
  const start = md.indexOf('## Do not go here');
  if (start < 0) return [];
  const section = md.slice(start);
  const stop = section.indexOf('\n## ', 10);
  const table = section.slice(0, stop > 0 ? stop : undefined);
  return table
    .split('\n')
    .filter((line) => line.startsWith('|') && !line.includes('| Place |') && !/^\|\s*---/.test(line))
    .map((line) => stripMd(line.split('|')[1] ?? ''))
    .filter(Boolean);
}

const host = 'https://saturdaylivescan.com';
const base = '/';
const origin = `${host}${base}`;
const ogUrl = `${origin}og.png`;

if (existsSync(join(root, 'public/sitemap.xml'))) fail('public/sitemap.xml must not remain as source of truth');
if (existsSync(join(root, 'public/llms.txt'))) fail('public/llms.txt must not remain as source of truth');
if (existsSync(join(root, 'CNAME'))) fail('repo-root CNAME must not exist on main');

const publicCnamePath = join(root, 'public/CNAME');
if (!existsSync(publicCnamePath)) {
  fail('public/CNAME missing');
} else {
  const cname = readFileSync(publicCnamePath, 'utf8').trim();
  if (cname !== 'saturdaylivescan.com') fail(`public/CNAME is ${JSON.stringify(cname)}`);
}

const astro = readRepo('astro.config.mjs');
if (!astro.includes("base: '/'")) fail('astro base must be /');
if (!astro.includes("site: 'https://saturdaylivescan.com'")) fail('astro site must be saturdaylivescan.com');

const robots = read('robots.txt');
if (!robots.includes('User-agent: *')) fail('robots.txt missing User-agent');
if (!robots.includes(`Sitemap: ${origin}sitemap.xml`)) fail('robots.txt Sitemap URL mismatch');

const sitemap = read('sitemap.xml');
for (const loc of [
  origin,
  `${origin}oakland-saturday-walk-in-live-scan/`,
  `${origin}oakland-saturday-cash-live-scan/`,
  `${origin}oakland-saturday-teacher-credential-live-scan/`,
  `${origin}berkeley-saturday-walk-in-live-scan/`,
  `${origin}san-francisco-saturday-walk-in-live-scan/`,
  `${origin}alameda-county-sunday-live-scan/`,
  `${origin}san-jose-saturday-walk-in-live-scan/`,
  `${origin}fremont-saturday-walk-in-live-scan/`,
  `${origin}concord-saturday-walk-in-live-scan/`,
  `${origin}hayward-saturday-walk-in-live-scan/`,
  `${origin}walnut-creek-saturday-walk-in-live-scan/`,
  `${origin}richmond-saturday-walk-in-live-scan/`,
  `${origin}oakland-saturday-downtown-vs-fruitvale-live-scan/`,
  `${origin}santa-clara-saturday-walk-in-live-scan/`,
  `${origin}sunnyvale-saturday-walk-in-live-scan/`,
  `${origin}daly-city-saturday-walk-in-live-scan/`,
  `${origin}south-san-francisco-saturday-walk-in-live-scan/`,
  `${origin}redwood-city-saturday-walk-in-live-scan/`,
  `${origin}burlingame-saturday-walk-in-live-scan/`,
  `${origin}san-leandro-saturday-walk-in-live-scan/`,
  `${origin}union-city-saturday-walk-in-live-scan/`,
  `${origin}san-ramon-saturday-walk-in-live-scan/`,
  `${origin}newark-saturday-walk-in-live-scan/`,
  `${origin}antioch-saturday-walk-in-live-scan/`,
  `${origin}vallejo-saturday-walk-in-live-scan/`,
  `${origin}fairfield-saturday-walk-in-live-scan/`,
  `${origin}alameda-saturday-walk-in-live-scan/`,
  `${origin}pittsburg-saturday-walk-in-live-scan/`,
  `${origin}santa-rosa-saturday-walk-in-live-scan/`,
  `${origin}san-rafael-saturday-walk-in-live-scan/`,
  `${origin}faq/`,
]) {
  if (!sitemap.includes(`<loc>${loc}</loc>`)) fail(`sitemap missing ${loc}`);
}
if (sitemap.includes('github.io') || sitemap.includes('/saturday-live-scan/')) {
  fail('sitemap loc values must be apex host-root URLs');
}

const llms = read('llms.txt');
for (const loc of [
  origin,
  `${origin}oakland-saturday-walk-in-live-scan/`,
  `${origin}oakland-saturday-cash-live-scan/`,
  `${origin}oakland-saturday-teacher-credential-live-scan/`,
  `${origin}berkeley-saturday-walk-in-live-scan/`,
  `${origin}san-francisco-saturday-walk-in-live-scan/`,
  `${origin}alameda-county-sunday-live-scan/`,
  `${origin}san-jose-saturday-walk-in-live-scan/`,
  `${origin}fremont-saturday-walk-in-live-scan/`,
  `${origin}concord-saturday-walk-in-live-scan/`,
  `${origin}hayward-saturday-walk-in-live-scan/`,
  `${origin}walnut-creek-saturday-walk-in-live-scan/`,
  `${origin}richmond-saturday-walk-in-live-scan/`,
  `${origin}oakland-saturday-downtown-vs-fruitvale-live-scan/`,
  `${origin}santa-clara-saturday-walk-in-live-scan/`,
  `${origin}sunnyvale-saturday-walk-in-live-scan/`,
  `${origin}daly-city-saturday-walk-in-live-scan/`,
  `${origin}south-san-francisco-saturday-walk-in-live-scan/`,
  `${origin}redwood-city-saturday-walk-in-live-scan/`,
  `${origin}burlingame-saturday-walk-in-live-scan/`,
  `${origin}san-leandro-saturday-walk-in-live-scan/`,
  `${origin}union-city-saturday-walk-in-live-scan/`,
  `${origin}san-ramon-saturday-walk-in-live-scan/`,
  `${origin}newark-saturday-walk-in-live-scan/`,
  `${origin}antioch-saturday-walk-in-live-scan/`,
  `${origin}vallejo-saturday-walk-in-live-scan/`,
  `${origin}fairfield-saturday-walk-in-live-scan/`,
  `${origin}alameda-saturday-walk-in-live-scan/`,
  `${origin}pittsburg-saturday-walk-in-live-scan/`,
  `${origin}santa-rosa-saturday-walk-in-live-scan/`,
  `${origin}san-rafael-saturday-walk-in-live-scan/`,
  `${origin}faq/`,
]) {
  if (!llms.includes(loc)) fail(`llms.txt missing ${loc}`);
}
if (!llms.includes('California Live Scan sites from the CA DOJ list, by city: hours, walk-in vs appointment, rolling fees, and Saturday options. Confirm before you go.')) {
  fail('llms.txt missing one-line site description');
}

const ogPath = join(dist, 'og.png');
if (!existsSync(ogPath)) {
  fail('missing dist/og.png');
} else {
  const buf = readFileSync(ogPath);
  if (buf.length < 100) fail('og.png is too small');
  if (buf[0] !== 0x89 || buf[1] !== 0x50 || buf[2] !== 0x4e || buf[3] !== 0x47) {
    fail('og.png is not a PNG');
  }
}

function checkPage(
  rel: string,
  expect: {
    title?: string;
    canonical: string;
    robots?: string;
    types: string[];
    faq?: boolean;
    noindex?: boolean;
  },
) {
  const html = read(rel);
  if (!html) return html;
  const desc = attr(html, 'description');
  if (!desc) fail(`${rel}: missing meta description`);
  const can = canonical(html);
  if (can !== expect.canonical) fail(`${rel}: canonical ${can} !== ${expect.canonical}`);
  const og = attr(html, 'og:url');
  if (og !== can) fail(`${rel}: og:url ${og} !== canonical ${can}`);
  if (attr(html, 'og:type') !== 'website') fail(`${rel}: og:type is not website`);
  if (attr(html, 'twitter:card') !== 'summary_large_image') fail(`${rel}: twitter:card mismatch`);
  if (attr(html, 'og:image') !== ogUrl) fail(`${rel}: og:image ${attr(html, 'og:image')} !== ${ogUrl}`);
  if (attr(html, 'twitter:image') !== ogUrl) fail(`${rel}: twitter:image mismatch`);
  const robotsContent = attr(html, 'robots');
  const wantRobots = expect.robots ?? (expect.noindex ? 'noindex,follow' : 'index,follow');
  if (robotsContent !== wantRobots) fail(`${rel}: robots ${robotsContent} !== ${wantRobots}`);
  if (expect.title && title(html) !== expect.title) fail(`${rel}: title ${title(html)} !== ${expect.title}`);
  const blocks = jsonLdBlocks(html);
  for (const t of expect.types) {
    if (!hasType(blocks, t)) fail(`${rel}: missing JSON-LD ${t}`);
  }
  if (expect.faq) {
    const faq = findType(blocks, 'FAQPage');
    if (!faq) fail(`${rel}: missing FAQPage`);
    else {
      const entities = (faq.mainEntity as { name: string; acceptedAnswer: { text: string } }[]) ?? [];
      const htmlNoScripts = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
      const decodeSimple = (s: string) => s
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, '&')
        .replace(/&apos;/g, "'")
        .replace(/[\u2018\u2019]/g, "'")
        .replace(/[\u201C\u201D]/g, '"')
        .replace(/\s+/g, ' ')
        .trim();
      const decodedHtml = decodeSimple(htmlNoScripts);
      for (const item of entities) {
        const decodedQ = decodeSimple(item.name);
        const decodedAnswerStart = decodeSimple(item.acceptedAnswer.text.slice(0, 40));
        if (!decodedHtml.includes(decodedQ)) {
          fail(`${rel}: FAQPage question not visible: ${item.name}`);
        }
        if (!decodedHtml.includes(decodedAnswerStart)) {
          fail(`${rel}: FAQPage answer not visible: ${item.name}`);
        }
      }
    }
  }
  if (html.includes('SearchAction')) fail(`${rel}: SearchAction must not appear`);
  if (html.includes('"@type":"LocalBusiness"') || html.includes('"@type": "LocalBusiness"')) {
    fail(`${rel}: LocalBusiness JSON-LD is forbidden`);
  }
  const headerOk = /<header[\s>]/.test(html) && /<nav[\s>]/.test(html) && /<main[\s>]/.test(html) && /<footer[\s>]/.test(html);
  if (!headerOk) fail(`${rel}: missing semantic header/nav/main/footer`);
  for (const href of [
    base,
    `${base}oakland-saturday-walk-in-live-scan/`,
    `${base}oakland-saturday-cash-live-scan/`,
    `${base}oakland-saturday-teacher-credential-live-scan/`,
    `${base}berkeley-saturday-walk-in-live-scan/`,
    `${base}san-francisco-saturday-walk-in-live-scan/`,
    `${base}alameda-county-sunday-live-scan/`,
    `${base}san-jose-saturday-walk-in-live-scan/`,
    `${base}fremont-saturday-walk-in-live-scan/`,
    `${base}concord-saturday-walk-in-live-scan/`,
    `${base}hayward-saturday-walk-in-live-scan/`,
    `${base}walnut-creek-saturday-walk-in-live-scan/`,
    `${base}richmond-saturday-walk-in-live-scan/`,
    `${base}oakland-saturday-downtown-vs-fruitvale-live-scan/`,
    `${base}santa-clara-saturday-walk-in-live-scan/`,
    `${base}sunnyvale-saturday-walk-in-live-scan/`,
    `${base}daly-city-saturday-walk-in-live-scan/`,
    `${base}south-san-francisco-saturday-walk-in-live-scan/`,
    `${base}redwood-city-saturday-walk-in-live-scan/`,
    `${base}burlingame-saturday-walk-in-live-scan/`,
    `${base}san-leandro-saturday-walk-in-live-scan/`,
    `${base}union-city-saturday-walk-in-live-scan/`,
    `${base}san-ramon-saturday-walk-in-live-scan/`,
    `${base}newark-saturday-walk-in-live-scan/`,
    `${base}antioch-saturday-walk-in-live-scan/`,
    `${base}vallejo-saturday-walk-in-live-scan/`,
    `${base}fairfield-saturday-walk-in-live-scan/`,
    `${base}alameda-saturday-walk-in-live-scan/`,
    `${base}pittsburg-saturday-walk-in-live-scan/`,
    `${base}santa-rosa-saturday-walk-in-live-scan/`,
    `${base}san-rafael-saturday-walk-in-live-scan/`,
    `${base}faq/`,
  ]) {
    if (!html.includes(`href="${href}"`)) fail(`${rel}: missing internal link ${href}`);
  }
  return html;
}

const home = checkPage('index.html', {
  title: 'Live Scan Open Saturday: Bay Area Walk-In Shops by City',
  canonical: origin,
  types: ['WebPage', 'WebSite', 'FAQPage'],
  faq: true,
});
if (home && !home.includes('id="faq"')) fail('home: missing id=faq');

const oakland = checkPage('oakland-saturday-walk-in-live-scan/index.html', {
  title: 'Live Scan Oakland: 7 Saturday Walk-In Shops From $23',
  canonical: `${origin}oakland-saturday-walk-in-live-scan/`,
  types: ['WebPage', 'FAQPage', 'BreadcrumbList', 'ItemList'],
  faq: true,
});
const berkeley = checkPage('berkeley-saturday-walk-in-live-scan/index.html', {
  title: 'Live Scan in Berkeley: hours, walk-ins, Saturday options',
  canonical: `${origin}berkeley-saturday-walk-in-live-scan/`,
  types: ['WebPage', 'FAQPage', 'BreadcrumbList', 'ItemList'],
  faq: true,
});
const alameda = checkPage('alameda-county-sunday-live-scan/index.html', {
  title: 'Sunday Live Scan in Alameda County: 13 Walk-In Shops',
  canonical: `${origin}alameda-county-sunday-live-scan/`,
  types: ['WebPage', 'FAQPage', 'BreadcrumbList'],
  faq: true,
});
if (alameda) {
  if (!alameda.includes('UNVERIFIED')) fail('alameda: UNVERIFIED strings missing from HTML');
  if (!alameda.includes('id="faq"')) fail('alameda: missing id=faq');
  if (!alameda.includes('Sunday')) fail('alameda HTML missing Sunday');
}
const sanFrancisco = checkPage('san-francisco-saturday-walk-in-live-scan/index.html', {
  title: 'Live Scan San Francisco: Saturday Walk-In Options',
  canonical: `${origin}san-francisco-saturday-walk-in-live-scan/`,
  types: ['WebPage', 'FAQPage', 'BreadcrumbList'],
  faq: true,
});
if (sanFrancisco) {
  if (!sanFrancisco.includes('UNVERIFIED')) fail('san-francisco: UNVERIFIED strings missing from HTML');
  if (!sanFrancisco.includes('id="faq"')) fail('san-francisco: missing id=faq');
}

const oaklandCash = checkPage('oakland-saturday-cash-live-scan/index.html', {
  title: 'Cash Live Scan in Oakland: hours, walk-ins, Saturday options',
  canonical: `${origin}oakland-saturday-cash-live-scan/`,
  types: ['WebPage', 'FAQPage', 'BreadcrumbList'],
  faq: true,
});
if (oaklandCash) {
  if (!oaklandCash.includes('UNVERIFIED')) fail('oakland-cash: UNVERIFIED strings missing from HTML');
  if (!oaklandCash.includes('id="faq"')) fail('oakland-cash: missing id=faq');
}

const oaklandTeacher = checkPage('oakland-saturday-teacher-credential-live-scan/index.html', {
  title: 'Teacher Credential Live Scan Oakland: Form 41-LS',
  canonical: `${origin}oakland-saturday-teacher-credential-live-scan/`,
  types: ['WebPage', 'FAQPage', 'BreadcrumbList'],
  faq: true,
});
if (oaklandTeacher) {
  if (!oaklandTeacher.includes('UNVERIFIED')) fail('oakland-teacher: UNVERIFIED strings missing from HTML');
  if (!oaklandTeacher.includes('id="faq"')) fail('oakland-teacher: missing id=faq');
}

const oaklandDowntown = checkPage('oakland-saturday-downtown-vs-fruitvale-live-scan/index.html', {
  title: 'Oakland Live Scan: Downtown vs Fruitvale Saturday',
  canonical: `${origin}oakland-saturday-downtown-vs-fruitvale-live-scan/`,
  types: ['WebPage', 'FAQPage', 'BreadcrumbList'],
  faq: true,
});

const faqHub = checkPage('faq/index.html', {
  title: 'Live Scan FAQ: Walk-Ins, Saturday Hours and Fees',
  canonical: `${origin}faq/`,
  types: ['WebPage'],
});
if (faqHub) {
  if (!faqHub.includes(`href="${base}oakland-saturday-teacher-credential-live-scan/#faq"`)) {
    fail('faq hub: missing teacher credential FAQ link');
  }
}
checkPage('404.html', {
  title: 'Page not found',
  canonical: `${origin}404.html`,
  types: ['WebPage'],
  noindex: true,
});

function checkListings(html: string, mdRel: string, page: string, skipNeedles: string[]) {
  if (!html) return;
  const md = readRepo(mdRel);
  const rows = goTableRows(md);
  const blocks = jsonLdBlocks(html);
  const itemList = findType(blocks, 'ItemList');
  if (!itemList) {
    fail(`${page}: missing ItemList`);
    return;
  }
  const elements = (itemList.itemListElement as { item?: { name?: string; address?: string; telephone?: string } }[]) ?? [];
  const names = elements.map((el) => el.item?.name ?? '');
  if (elements.length !== rows.length) {
    fail(`${page}: ItemList has ${elements.length} rows, go table has ${rows.length}`);
  }
  for (const row of rows) {
    const found = elements.find((el) => el.item?.name === row.name);
    if (!found) fail(`${page}: ItemList missing ${row.name}`);
    else if (found.item?.address !== row.address) {
      fail(`${page}: address mismatch for ${row.name}: ${found.item?.address} !== ${row.address}`);
    }
    if (found?.item && 'telephone' in found.item) fail(`${page}: telephone on ${row.name}`);
  }
  const dump = JSON.stringify(itemList);
  if (dump.includes('telephone') || dump.includes('openingHours') || dump.includes('priceRange')) {
    fail(`${page}: ItemList must not include telephone/hours/fees`);
  }
  for (const needle of skipNeedles) {
    if (names.some((n) => n.includes(needle))) fail(`${page}: ItemList contains skip-Saturday ${needle}`);
  }
  for (const skip of skipNames(md)) {
    if (names.includes(skip)) fail(`${page}: ItemList contains skip row ${skip}`);
  }
  if (!html.includes('UNVERIFIED')) fail(`${page}: UNVERIFIED strings missing from HTML`);
  if (!html.includes('id="faq"')) fail(`${page}: missing id=faq`);
}

checkListings(
  oakland,
  'src/content/cities/oakland-saturday-walk-in-live-scan.md',
  'oakland',
  ['Certifix Oakland HQ', 'UPS #3357', "Aisha's Mobile Notary", 'A1 Live Scan', 'Essential Admin'],
);
checkListings(
  berkeley,
  'src/content/cities/berkeley-saturday-walk-in-live-scan.md',
  'berkeley',
  ['Berkeley Live Scan'],
);

const santaClara = checkPage('santa-clara-saturday-walk-in-live-scan/index.html', {
  title: 'Live Scan in Santa Clara: hours, walk-ins, Saturday options',
  canonical: `${origin}santa-clara-saturday-walk-in-live-scan/`,
  types: ['WebPage', 'FAQPage', 'BreadcrumbList', 'ItemList'],
  faq: true,
});
checkListings(
  santaClara,
  'src/content/cities/santa-clara-saturday-walk-in-live-scan.md',
  'santa-clara',
  [],
);

if (oakland) {
  for (const s of ['Allscan', 'Copy USA', '#7098', '#0243', '6th-floor', 'UNVERIFIED']) {
    if (!oakland.includes(s) && !oakland.toLowerCase().includes(s.toLowerCase())) {
      fail(`oakland HTML missing honesty string: ${s}`);
    }
  }
  // 6th-floor Saturday access is written "6th-floor **building access on Saturday is UNVERIFIED**"
  if (!oakland.includes('building access on Saturday is UNVERIFIED') && !oakland.includes('6th-floor')) {
    fail('oakland HTML missing 6th-floor Saturday UNVERIFIED access note');
  }
}

const distCnamePath = join(dist, 'CNAME');
if (!existsSync(distCnamePath)) {
  fail('missing dist/CNAME');
} else {
  const distCname = readFileSync(distCnamePath, 'utf8').trim();
  if (distCname !== 'saturdaylivescan.com') fail(`dist/CNAME is ${JSON.stringify(distCname)}`);
}

function checkShopOffer(html: string, rel: string, expect: boolean) {
  const needles = [
    'mailto:sls@agentmail.to',
    'Shops: feature this listing',
    '$19/month',
    'Saturday featured slot',
    'offer, not a live checkout',
    'directory listing stays free',
    'No shop is featured today',
  ];
  if (expect) {
    for (const n of needles) {
      if (!html.includes(n)) fail(`${rel}: missing shop offer: ${n}`);
    }
    if (!html.includes('sls@agentmail.to')) fail(`${rel}: email not visible`);
  } else if (html.includes('Shops: feature this listing')) {
    fail(`${rel}: shop offer should be omitted`);
  }
  if (/<article[\s\S]*?<td[^>]*>\s*Featured/.test(html)) {
    fail(`${rel}: Featured badge in a table cell`);
  }
  if (/gtag\(|googletagmanager|adsbygoogle|js.stripe.com|stripe.com\/v3/i.test(html)) {
    fail(`${rel}: analytics, ads, or Stripe markup is forbidden`);
  }
  if (/\b(utm_source|ref=|affid=|affiliate)/i.test(html) && /certifix|printscan|applicantservices|identogo/i.test(html)) {
    fail(`${rel}: affiliate-style outbound tracking is forbidden`);
  }
}

checkShopOffer(home, 'home', true);
checkShopOffer(oakland, 'oakland', true);
checkShopOffer(berkeley, 'berkeley', true);
checkShopOffer(alameda, 'alameda', true);
checkShopOffer(sanFrancisco, 'san-francisco', true);
checkShopOffer(oaklandCash, 'oakland-cash', true);
checkShopOffer(oaklandTeacher, 'oakland-teacher', true);
checkShopOffer(santaClara, 'santa-clara', true);
checkShopOffer(read('faq/index.html'), 'faq', true);
checkShopOffer(read('404.html'), '404', false);

const readme = readRepo('README.md');
if (!readme.includes('https://saturdaylivescan.com/robots.txt')) {
  fail('README must name host-root robots.txt URL');
}
if (!readme.toLowerCase().includes('host root')) {
  fail('README must document host-root robots.txt');
}
if (readme.includes('https://vinvomero.github.io/saturday-live-scan/')) {
  fail('README still names the github.io project URL as live origin');
}
if (!readme.includes('No affiliate links')) fail('README must say no affiliate links');
if (!readme.includes('No shop is featured or paid today')) {
  fail('README must say no shop is featured or paid today');
}
if (readme.includes('No shops were paid.') && !readme.includes('No shop is featured or paid today')) {
  fail('README still says unconditional No shops were paid');
}
if (!readme.includes('offer, not checkout') && !readme.includes('offer, not a live checkout')) {
  fail('README must label the featured slot as an offer not checkout');
}

// Check (a): Built sitemap URL set equals baseline
const baselineUrls = readFileSync('/tmp/baseline-sitemap-urls.txt', 'utf8')
  .trim()
  .split('\n')
  .map(line => line.trim().replace(/<\/?loc>/g, '').replace(/\s+/g, ''))
  .filter(Boolean);
const builtUrls = sitemap.match(/<loc>([^<]+)<\/loc>/g)?.map(m => m.replace(/<\/?loc>/g, '').trim()) ?? [];
const baselineSet = new Set(baselineUrls);
const builtSet = new Set(builtUrls);
if (baselineSet.size !== builtSet.size) {
  fail(`sitemap URL count mismatch: baseline ${baselineSet.size}, built ${builtSet.size}`);
}
for (const url of baselineSet) {
  if (!builtSet.has(url)) {
    fail(`sitemap missing baseline URL: ${url}`);
  }
}
for (const url of builtSet) {
  if (!baselineSet.has(url)) {
    fail(`sitemap has extra URL: ${url}`);
  }
}

// Check (b): Every city title and its part before colon is unique
const cityFiles = [
  'belmont-saturday-walk-in-live-scan', 'berkeley-saturday-walk-in-live-scan',
  'burlingame-saturday-walk-in-live-scan', 'campbell-saturday-walk-in-live-scan',
  'concord-saturday-walk-in-live-scan', 'daly-city-saturday-walk-in-live-scan',
  'dublin-saturday-walk-in-live-scan', 'foster-city-saturday-walk-in-live-scan',
  'fremont-saturday-walk-in-live-scan', 'hayward-saturday-walk-in-live-scan',
  'livermore-saturday-walk-in-live-scan', 'millbrae-saturday-walk-in-live-scan',
  'milpitas-saturday-walk-in-live-scan', 'mountain-view-saturday-walk-in-live-scan',
  'newark-saturday-walk-in-live-scan', 'oakland-saturday-walk-in-live-scan',
  'palo-alto-saturday-walk-in-live-scan',
  'pleasanton-saturday-walk-in-live-scan', 'redwood-city-saturday-walk-in-live-scan',
  'richmond-saturday-walk-in-live-scan', 'san-francisco-saturday-walk-in-live-scan',
  'san-jose-saturday-walk-in-live-scan', 'san-leandro-saturday-walk-in-live-scan',
  'san-mateo-saturday-walk-in-live-scan', 'san-ramon-saturday-walk-in-live-scan',
  'santa-clara-saturday-walk-in-live-scan',
  'south-san-francisco-saturday-walk-in-live-scan', 'sunnyvale-saturday-walk-in-live-scan',
  'union-city-saturday-walk-in-live-scan', 'walnut-creek-saturday-walk-in-live-scan',
  'antioch-saturday-walk-in-live-scan', 'vallejo-saturday-walk-in-live-scan',
  'fairfield-saturday-walk-in-live-scan', 'alameda-saturday-walk-in-live-scan',
  'pittsburg-saturday-walk-in-live-scan', 'santa-rosa-saturday-walk-in-live-scan',
  'san-rafael-saturday-walk-in-live-scan',
  'oakland-saturday-cash-live-scan', 'oakland-saturday-teacher-credential-live-scan',
  'oakland-saturday-downtown-vs-fruitvale-live-scan', 'alameda-county-sunday-live-scan',
];
const cityTitles: string[] = [];
const cityPrefixes: string[] = [];
for (const slug of cityFiles) {
  const html = read(`${slug}/index.html`);
  if (!html) continue;
  const t = title(html);
  if (t) {
    cityTitles.push(t);
    const prefix = t.split(':')[0]?.trim() ?? t;
    cityPrefixes.push(prefix);
  }
}
const uniqueTitles = new Set(cityTitles);
if (uniqueTitles.size !== cityTitles.length) {
  const dupes = cityTitles.filter((t, i, a) => a.indexOf(t) !== i);
  fail(`duplicate city titles: ${dupes.join(', ')}`);
}
const uniquePrefixes = new Set(cityPrefixes);
if (uniquePrefixes.size !== cityPrefixes.length) {
  const dupes = cityPrefixes.filter((p, i, a) => a.indexOf(p) !== i);
  fail(`duplicate city title prefixes: ${dupes.join(', ')}`);
}

// Check (c): Every city page has "Open Saturday" or "Open Sunday"
for (const slug of cityFiles) {
  const html = read(`${slug}/index.html`);
  if (!html) continue;
  if (slug === 'alameda-county-sunday-live-scan') {
    if (!html.includes('Open Sunday')) {
      fail(`${slug}: missing "Open Sunday" heading`);
    }
  } else {
    if (!html.includes('Open Saturday')) {
      fail(`${slug}: missing "Open Saturday" heading`);
    }
  }
}

// Check (d): FAQ parity - every FAQPage JSON-LD question and answer must appear in rendered HTML
for (const slug of cityFiles) {
  const html = read(`${slug}/index.html`);
  if (!html) continue;
  const blocks = jsonLdBlocks(html);
  const faq = findType(blocks, 'FAQPage');
  if (!faq) continue;
  const entities = (faq.mainEntity as { name: string; acceptedAnswer: { text: string } }[]) ?? [];
  
  // Check each question and answer appears in HTML (without script blocks)
  const htmlNoScripts = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  const decode = (s: string) => s
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&rdquo;/g, '"')
    .replace(/&ldquo;/g, '"')
    .replace(/[\u2018\u2019\u02BC\u2032]/g, "'") // All single quote variants
    .replace(/[\u201C\u201D\u2033]/g, '"') // All double quote variants
    .replace(/[""]/g, '"') // Catch any remaining smart quotes
    .replace(/['']/g, "'") // Catch any remaining smart single quotes
    .replace(/<[^>]+>/g, '') // Strip HTML tags
    .replace(/\*\*/g, '') // Strip markdown bold
    .replace(/\s+/g, ' ')
    .trim();
  
  const decodedHtml = decode(htmlNoScripts);
  for (const item of entities) {
    const decodedQ = decode(item.name);
    const decodedA = decode(item.acceptedAnswer.text);
    if (!decodedHtml.includes(decodedQ)) {
      fail(`${slug}: FAQ question not in HTML: ${item.name}`);
    }
    if (!decodedHtml.includes(decodedA)) {
      fail(`${slug}: FAQ answer not in HTML: ${item.name}`);
    }
  }
}

// Check (e): Excluded cities
const excluded = ['San Bruno', 'Pacifica', 'Menlo Park', 'San Carlos', 'Los Altos', 'Cupertino', 'Los Gatos'];
for (const name of excluded) {
  if (sitemap.includes(name)) fail(`sitemap contains excluded city: ${name}`);
  if (llms.includes(name)) fail(`llms.txt contains excluded city: ${name}`);
  for (const slug of cityFiles) {
    const html = read(`${slug}/index.html`);
    if (!html) continue;
    const t = title(html);
    const desc = attr(html, 'description');
    const og = attr(html, 'og:title');
    if (t?.includes(name)) fail(`${slug} title contains excluded city: ${name}`);
    if (desc?.includes(name)) fail(`${slug} description contains excluded city: ${name}`);
    if (og?.includes(name)) fail(`${slug} og:title contains excluded city: ${name}`);
    const h1Match = html.match(/<h1[^>]*>([^<]+)<\/h1>/);
    if (h1Match?.[1]?.includes(name)) fail(`${slug} H1 contains excluded city: ${name}`);
  }
  if (home && title(home)?.includes(name)) fail(`home title contains excluded city: ${name}`);
  if (home && attr(home, 'description')?.includes(name)) fail(`home description contains excluded city: ${name}`);
}

// Check (g): No broken "Open Saturday" formatting (00 am):**)
for (const slug of cityFiles) {
  const html = read(`${slug}/index.html`);
  if (!html) continue;
  if (html.includes('00 am):**')) {
    fail(`${slug}: contains broken time format "00 am):**"`);
  }
}
if (home?.includes('00 am):**')) fail('home: contains broken time format "00 am):**"');

// Check (h): Title length ≤60 characters
for (const slug of cityFiles) {
  const html = read(`${slug}/index.html`);
  if (!html) continue;
  const t = title(html);
  if (t && t.length > 60) {
    fail(`${slug}: title is ${t.length} chars (max 60): ${t}`);
  }
}
const homeTitle = title(home);
if (homeTitle && homeTitle.length > 60) {
  fail(`home: title is ${homeTitle.length} chars (max 60): ${homeTitle}`);
}
const faqTitle = title(read('faq/index.html'));
if (faqTitle && faqTitle.length > 60) {
  fail(`faq: title is ${faqTitle.length} chars (max 60): ${faqTitle}`);
}

// Check (i): No excluded city names as city references (allow "San Carlos St"/"San Carlos Street")
const excludedCityNames = ['San Bruno', 'Pacifica', 'Menlo Park', 'Los Altos', 'Cupertino', 'Los Gatos'];
for (const slug of cityFiles) {
  const html = read(`${slug}/index.html`);
  if (!html) continue;
  // Remove script tags to focus on visible content
  const htmlNoScripts = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  
  for (const cityName of excludedCityNames) {
    // Check if the city name appears in the HTML
    if (htmlNoScripts.includes(cityName)) {
      fail(`${slug}: contains excluded city name "${cityName}" in visible content`);
    }
  }
  
  // Special check for "San Carlos" - only fail if it's NOT followed by "St" or "Street"
  const sanCarlosPattern = /San Carlos(?!\s+(?:St(?:reet)?|Street))/gi;
  if (sanCarlosPattern.test(htmlNoScripts)) {
    fail(`${slug}: contains "San Carlos" as a city reference (not as street name)`);
  }
}
if (home) {
  const homeNoScripts = home.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  for (const cityName of excludedCityNames) {
    if (homeNoScripts.includes(cityName)) {
      fail(`home: contains excluded city name "${cityName}"`);
    }
  }
  const sanCarlosPattern = /San Carlos(?!\s+(?:St(?:reet)?|Street))/gi;
  if (sanCarlosPattern.test(homeNoScripts)) {
    fail(`home: contains "San Carlos" as a city reference (not as street name)`);
  }
}

// Check (f): No "Local draft"
for (const slug of cityFiles) {
  const html = read(`${slug}/index.html`);
  if (!html) continue;
  if (html.includes('Local draft')) {
    fail(`${slug}: contains "Local draft"`);
  }
}
if (home?.includes('Local draft')) fail('home: contains "Local draft"');

if (failures.length) {
  console.error(`SEO smoke failed (${failures.length}):`);
  for (const f of failures) console.error(` - ${f}`);
  process.exit(1);
}
console.log('SEO smoke passed');
