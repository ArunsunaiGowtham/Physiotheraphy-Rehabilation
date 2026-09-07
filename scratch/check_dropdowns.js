const fs = require('fs');
const path = require('path');

const files = [
  'index.html',
  'about.html',
  'services.html',
  'service-details.html',
  'insurance.html',
  'pricing.html',
  'blog.html',
  'blog-details.html',
  'contact.html',
  'home-2.html',
  'therapists.html',
  'therapist-details.html'
];

for (const f of files) {
  const p = path.join(__dirname, '..', f);
  const content = fs.readFileSync(p, 'utf-8');
  const match = content.match(/<ul class="dropdown-menu" aria-labelledby="homeDropdown">[\s\S]*?<\/ul>/i);
  console.log(`=== ${f} ===`);
  console.log(match ? match[0] : 'NO MATCH');
}
