const fs = require('fs');

const content = fs.readFileSync('services.html', 'utf-8');
const matches = content.match(/class="col-md-6 col-lg-4 service-item"/g);
console.log('Total service items in services.html:', matches ? matches.length : 0);

// Check unique images
const imgMatches = [...content.matchAll(/src="assets\/images\/(service-[^"]+)"/g)].map(m => m[1]);
console.log('Images found:', imgMatches);
const uniqueImgs = new Set(imgMatches);
console.log('Unique images count:', uniqueImgs.size);

// Check unique titles
const titleMatches = [...content.matchAll(/class="service-title"[^>]*><a[^>]*>([^<]+)<\/a>/g)].map(m => m[1]);
console.log('Titles found (' + titleMatches.length + '):', titleMatches);
const uniqueTitles = new Set(titleMatches);
console.log('Unique titles count:', uniqueTitles.size);

if (uniqueImgs.size === 12 && uniqueTitles.size === 12 && matches.length === 12) {
  console.log('\n>>> SUCCESS: EXACTLY 12 UNIQUE SERVICES WITH ZERO REPEATED IMAGES OR CONTENT! <<<');
} else {
  console.error('\n>>> VERIFICATION FAILED! <<<');
  process.exit(1);
}
