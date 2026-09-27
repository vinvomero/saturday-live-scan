import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import * as faqData from '../src/data/faq.ts';

const root = join(import.meta.dir, '..');

// Map slug to FAQ export name
const slugToFaqKey: Record<string, string> = {
  'oakland-saturday-walk-in-live-scan': 'oaklandFaq',
  'berkeley-saturday-walk-in-live-scan': 'berkeleyFaq',
  'san-francisco-saturday-walk-in-live-scan': 'sanFranciscoFaq',
  'oakland-saturday-cash-live-scan': 'oaklandCashFaq',
  'oakland-saturday-teacher-credential-live-scan': 'oaklandTeacherFaq',
  'oakland-saturday-downtown-vs-fruitvale-live-scan': 'oaklandDowntownFruitvaleFaq',
  'san-jose-saturday-walk-in-live-scan': 'sanJoseFaq',
  'fremont-saturday-walk-in-live-scan': 'fremontFaq',
  'concord-saturday-walk-in-live-scan': 'concordFaq',
  'hayward-saturday-walk-in-live-scan': 'haywardFaq',
  'walnut-creek-saturday-walk-in-live-scan': 'walnutCreekFaq',
  'richmond-saturday-walk-in-live-scan': 'richmondFaq',
  'santa-clara-saturday-walk-in-live-scan': 'santaClaraFaq',
  'sunnyvale-saturday-walk-in-live-scan': 'sunnyvaleFaq',
  'daly-city-saturday-walk-in-live-scan': 'dalyCityFaq',
  'south-san-francisco-saturday-walk-in-live-scan': 'southSanFranciscoFaq',
  'redwood-city-saturday-walk-in-live-scan': 'redwoodCityFaq',
  'burlingame-saturday-walk-in-live-scan': 'burlingameFaq',
  'san-mateo-saturday-walk-in-live-scan': 'sanMateoFaq',
  'belmont-saturday-walk-in-live-scan': 'belmontFaq',
  'foster-city-saturday-walk-in-live-scan': 'fosterCityFaq',
  'millbrae-saturday-walk-in-live-scan': 'millbraeFaq',
  'mountain-view-saturday-walk-in-live-scan': 'mountainViewFaq',
  'palo-alto-saturday-walk-in-live-scan': 'paloAltoFaq',
  'milpitas-saturday-walk-in-live-scan': 'milpitasFaq',
  'pleasanton-saturday-walk-in-live-scan': 'pleasantonFaq',
  'campbell-saturday-walk-in-live-scan': 'campbellFaq',
  'alameda-county-sunday-live-scan': 'alamedaSundayFaq',
};

function syncFaqsToMarkdown(slug: string): number {
  const faqKey = slugToFaqKey[slug];
  if (!faqKey) {
    console.log(`  ! ${slug}: No FAQ mapping found`);
    return 0;
  }
  
  const faqs = (faqData as any)[faqKey] || [];
  if (faqs.length === 0) {
    console.log(`  ! ${slug}: No FAQs in faq.ts`);
    return 0;
  }
  
  const mdPath = join(root, 'src/content/cities', `${slug}.md`);
  let content = readFileSync(mdPath, 'utf8');
  
  if (!content.includes('## FAQ')) {
    console.log(`  ! ${slug}: No FAQ section in markdown`);
    return 0;
  }
  
  let added = 0;
  
  // For each FAQ, check if it exists in markdown
  for (const faq of faqs) {
    // Check if question text appears in markdown (not just the heading)
    if (!content.includes(faq.q) || !content.includes(faq.a)) {
      // Add this FAQ before the first existing ### or at the end of FAQ section
      const faqSectionStart = content.indexOf('## FAQ');
      let afterFaqHeading = content.indexOf('\n', faqSectionStart) + 1;
      
      // Skip any intro text until we hit a ### or another ##
      while (afterFaqHeading < content.length) {
        const nextLine = content.slice(afterFaqHeading);
        if (nextLine.startsWith('###') || nextLine.startsWith('## ') && !nextLine.startsWith('## FAQ')) {
          break;
        }
        const nextNewline = content.indexOf('\n', afterFaqHeading);
        if (nextNewline === -1) break;
        afterFaqHeading = nextNewline + 1;
      }
      
      const faqText = `\n### ${faq.q}\n\n${faq.a}\n`;
      content = content.slice(0, afterFaqHeading) + faqText + content.slice(afterFaqHeading);
      added++;
    }
  }
  
  if (added > 0) {
    writeFileSync(mdPath, content);
    console.log(`  ✓ ${slug}: Added ${added} missing FAQs`);
  }
  
  return added;
}

console.log('Syncing FAQs from faq.ts to markdown files...\n');

let totalAdded = 0;
for (const slug of Object.keys(slugToFaqKey)) {
  totalAdded += syncFaqsToMarkdown(slug);
}

console.log(`\nTotal FAQs added: ${totalAdded}`);
