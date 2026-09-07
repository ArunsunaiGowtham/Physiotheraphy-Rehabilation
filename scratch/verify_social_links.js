const fs = require('fs');
const path = require('path');

const files = [
  'about.html',
  'blog.html',
  'blog-details.html',
  'contact.html',
  'home-2.html',
  'index.html',
  'insurance.html',
  'pricing.html',
  'service-details.html',
  'services.html',
  'therapist-details.html',
  'therapists.html'
];

let totalIcons = 0;
let hashHrefs = 0;

files.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  const content = fs.readFileSync(filePath, 'utf8');

  // Match all <a ...class="...social-icon-btn..."...>
  const regex = /<a\s+[^>]*class="[^"]*social-icon-btn[^"]*"[^>]*>/gi;
  let match;
  console.log(`\n--- ${file} ---`);
  while ((match = regex.exec(content)) !== null) {
    totalIcons++;
    const tag = match[0];
    const hrefMatch = tag.match(/href="([^"]*)"/);
    const href = hrefMatch ? hrefMatch[1] : '(none)';
    const ariaMatch = tag.match(/aria-label="([^"]*)"/) || tag.match(/title="([^"]*)"/);
    const label = ariaMatch ? ariaMatch[1] : '(no label)';
    const hasTarget = tag.includes('target="_blank"');

    if (href === '#' || href === 'javascript:void(0)') {
      hashHrefs++;
      console.warn(`  [HASH HREF] Label: "${label}", Tag: ${tag}`);
    } else {
      console.log(`  [OK] Label: "${label}" -> ${href} (target="_blank": ${hasTarget})`);
    }
  }
});

console.log(`\n========================================`);
console.log(`Total social icons checked: ${totalIcons}`);
console.log(`Remaining hash hrefs: ${hashHrefs}`);
console.log(`========================================`);
