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
if (existsSync(join(root, '.github/workflows'))) fail('.github/workflows must not exist');

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
  `${origin}faq/`,
]) {
  if (!llms.includes(loc)) fail(`llms.txt missing ${loc}`);
}
if (!llms.includes('California Live Scan shops that the DOJ list marks as Saturday walk-in')) {
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
      for (const item of entities) {
        if (!html.includes(item.name)) fail(`${rel}: FAQPage question not visible: ${item.name}`);
        if (!html.includes(item.acceptedAnswer.text.slice(0, 40))) {
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
    `${base}faq/`,
  ]) {
    if (!html.includes(`href="${href}"`)) fail(`${rel}: missing internal link ${href}`);
  }
  return html;
}

const home = checkPage('index.html', {
  title: 'Saturday Walk-in Live Scan (California)',
  canonical: origin,
  types: ['WebPage', 'WebSite', 'FAQPage'],
  faq: true,
});
if (home && !home.includes('id="faq"')) fail('home: missing id=faq');

const oakland = checkPage('oakland-saturday-walk-in-live-scan/index.html', {
  title: 'Saturday walk-in Live Scan in Oakland',
  canonical: `${origin}oakland-saturday-walk-in-live-scan/`,
  types: ['WebPage', 'FAQPage', 'BreadcrumbList', 'ItemList'],
  faq: true,
});
const berkeley = checkPage('berkeley-saturday-walk-in-live-scan/index.html', {
  title: 'Saturday walk-in Live Scan in Berkeley',
  canonical: `${origin}berkeley-saturday-walk-in-live-scan/`,
  types: ['WebPage', 'FAQPage', 'BreadcrumbList', 'ItemList'],
  faq: true,
});
const alameda = checkPage('alameda-county-sunday-live-scan/index.html', {
  title: 'Sunday Live Scan in Alameda County',
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
  title: 'Saturday walk-in Live Scan in San Francisco',
  canonical: `${origin}san-francisco-saturday-walk-in-live-scan/`,
  types: ['WebPage', 'FAQPage', 'BreadcrumbList'],
  faq: true,
});
if (sanFrancisco) {
  if (!sanFrancisco.includes('UNVERIFIED')) fail('san-francisco: UNVERIFIED strings missing from HTML');
  if (!sanFrancisco.includes('id="faq"')) fail('san-francisco: missing id=faq');
}

const oaklandCash = checkPage('oakland-saturday-cash-live-scan/index.html', {
  title: 'Saturday cash Live Scan in Oakland',
  canonical: `${origin}oakland-saturday-cash-live-scan/`,
  types: ['WebPage', 'FAQPage', 'BreadcrumbList'],
  faq: true,
});
if (oaklandCash) {
  if (!oaklandCash.includes('UNVERIFIED')) fail('oakland-cash: UNVERIFIED strings missing from HTML');
  if (!oaklandCash.includes('id="faq"')) fail('oakland-cash: missing id=faq');
}

const oaklandTeacher = checkPage('oakland-saturday-teacher-credential-live-scan/index.html', {
  title: 'Saturday Live Scan in Oakland for a teacher credential',
  canonical: `${origin}oakland-saturday-teacher-credential-live-scan/`,
  types: ['WebPage', 'FAQPage', 'BreadcrumbList'],
  faq: true,
});
if (oaklandTeacher) {
  if (!oaklandTeacher.includes('UNVERIFIED')) fail('oakland-teacher: UNVERIFIED strings missing from HTML');
  if (!oaklandTeacher.includes('id="faq"')) fail('oakland-teacher: missing id=faq');
}

const faqHub = checkPage('faq/index.html', {
  title: 'Saturday walk-in Live Scan FAQ',
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
    'mailto:vvomero@gmail.com',
    'Shops: feature this listing',
    '$49/month',
    'Saturday featured slot',
    'offer, not a live checkout',
    'directory listing stays free',
    'No shop is featured today',
  ];
  if (expect) {
    for (const n of needles) {
      if (!html.includes(n)) fail(`${rel}: missing shop offer: ${n}`);
    }
    if (!html.includes('vvomero@gmail.com')) fail(`${rel}: email not visible`);
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

if (failures.length) {
  console.error(`SEO smoke failed (${failures.length}):`);
  for (const f of failures) console.error(` - ${f}`);
  process.exit(1);
}
console.log('SEO smoke passed');
