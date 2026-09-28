import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = join(import.meta.dir, '..');

// Import FAQ data
const faqModule = await import(join(root, 'src/data/faq.ts'));

// City configurations
const cities: Record<string, { m: number; county: string; countyEncoded: string }> = {
  'belmont-saturday-walk-in-live-scan': { m: 2, county: 'San Mateo', countyEncoded: 'San%20Mateo' },
  'berkeley-saturday-walk-in-live-scan': { m: 5, county: 'Alameda', countyEncoded: 'Alameda' },
  'burlingame-saturday-walk-in-live-scan': { m: 4, county: 'San Mateo', countyEncoded: 'San%20Mateo' },
  'concord-saturday-walk-in-live-scan': { m: 2, county: 'Contra Costa', countyEncoded: 'Contra%20Costa' },
  'daly-city-saturday-walk-in-live-scan': { m: 4, county: 'San Mateo', countyEncoded: 'San%20Mateo' },
  'foster-city-saturday-walk-in-live-scan': { m: 2, county: 'San Mateo', countyEncoded: 'San%20Mateo' },
  'fremont-saturday-walk-in-live-scan': { m: 6, county: 'Alameda', countyEncoded: 'Alameda' },
  'hayward-saturday-walk-in-live-scan': { m: 3, county: 'Alameda', countyEncoded: 'Alameda' },
  'millbrae-saturday-walk-in-live-scan': { m: 3, county: 'San Mateo', countyEncoded: 'San%20Mateo' },
  'milpitas-saturday-walk-in-live-scan': { m: 3, county: 'Santa Clara', countyEncoded: 'Santa%20Clara' },
  'mountain-view-saturday-walk-in-live-scan': { m: 4, county: 'Santa Clara', countyEncoded: 'Santa%20Clara' },
  'oakland-saturday-walk-in-live-scan': { m: 7, county: 'Alameda', countyEncoded: 'Alameda' },
  'palo-alto-saturday-walk-in-live-scan': { m: 3, county: 'Santa Clara', countyEncoded: 'Santa%20Clara' },
  'pleasanton-saturday-walk-in-live-scan': { m: 2, county: 'Alameda', countyEncoded: 'Alameda' },
  'redwood-city-saturday-walk-in-live-scan': { m: 4, county: 'San Mateo', countyEncoded: 'San%20Mateo' },
  'richmond-saturday-walk-in-live-scan': { m: 2, county: 'Contra Costa', countyEncoded: 'Contra%20Costa' },
  'san-francisco-saturday-walk-in-live-scan': { m: 13, county: 'San Francisco', countyEncoded: 'San%20Francisco' },
  'san-jose-saturday-walk-in-live-scan': { m: 19, county: 'Santa Clara', countyEncoded: 'Santa%20Clara' },
  'san-mateo-saturday-walk-in-live-scan': { m: 3, county: 'San Mateo', countyEncoded: 'San%20Mateo' },
  'santa-clara-saturday-walk-in-live-scan': { m: 4, county: 'Santa Clara', countyEncoded: 'Santa%20Clara' },
  'south-san-francisco-saturday-walk-in-live-scan': { m: 1, county: 'San Mateo', countyEncoded: 'San%20Mateo' },
  'sunnyvale-saturday-walk-in-live-scan': { m: 3, county: 'Santa Clara', countyEncoded: 'Santa%20Clara' },
  'walnut-creek-saturday-walk-in-live-scan': { m: 4, county: 'Contra Costa', countyEncoded: 'Contra%20Costa' },
};

function getCityName(slug: string): string {
  return slug
    .replace('-saturday-walk-in-live-scan', '')
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function ensureFaqsInMarkdown(slug: string): void {
  const mdPath = join(root, 'src/content/cities', `${slug}.md`);
  let content = readFileSync(mdPath, 'utf8');
  
  // Get FAQs for this slug
  const faqKey = slug.replace(/-/g, '_').replace(/_saturday_walk_in_live_scan/, 'Faq')
    .replace(/_/g, '')
    .replace(/([A-Z])/g, (m, p1, offset) => offset > 0 ? m : m.toLowerCase())
    .replace(/^(.)/, (m) => m.toLowerCase());
  
  const camelKey = slug.split('-').map((part, i) => 
    i === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)
  ).join('').replace(/SaturdayWalkInLiveScan$/, 'Faq');
  
  const faqs = faqModule[camelKey] || [];
  if (faqs.length === 0) return;
  
  // Check if FAQ section exists
  if (!content.includes('## FAQ')) {
    console.log(`  ! ${slug}: No FAQ section found`);
    return;
  }
  
  // Get existing FAQ section
  const faqSectionStart = content.indexOf('## FAQ');
  const existingFaqSection = content.slice(faqSectionStart);
  
  // Add missing FAQs
  let faqSection = existingFaqSection;
  let added = 0;
  
  for (const faq of faqs) {
    const questionHeader = `### ${faq.q}`;
    if (!existingFaqSection.includes(faq.q)) {
      // Add this FAQ
      const faqText = `\n${questionHeader}\n\n${faq.a}\n`;
      // Insert after ## FAQ heading
      const insertPoint = faqSection.indexOf('\n\n', faqSection.indexOf('## FAQ')) + 2;
      if (insertPoint > 1) {
        faqSection = faqSection.slice(0, insertPoint) + faqText + faqSection.slice(insertPoint);
        added++;
      }
    }
  }
  
  if (added > 0) {
    content = content.slice(0, faqSectionStart) + faqSection;
    writeFileSync(mdPath, content);
    console.log(`  ✓ ${slug}: Added ${added} missing FAQs`);
  } else {
    console.log(`  ✓ ${slug}: All FAQs already present`);
  }
}

console.log('Adding missing FAQs to all pages...\n');

for (const slug of Object.keys(cities)) {
  ensureFaqsInMarkdown(slug);
}

// Also handle facet pages
const facetPages = [
  'oakland-saturday-cash-live-scan',
  'oakland-saturday-teacher-credential-live-scan',
  'oakland-saturday-downtown-vs-fruitvale-live-scan',
  'alameda-county-sunday-live-scan'
];

for (const slug of facetPages) {
  ensureFaqsInMarkdown(slug);
}

console.log('\nDone!');
