const fs = require('fs');

console.log('=== VERIFYING SPORTS INJURY SERVICE ADDITION ===\n');

const html = fs.readFileSync('services.html', 'utf8');

// 1. Filter button check
const filterBtnMatch = html.match(/<button class="filter-btn active" data-filter="all">All Services \((\d+)\)<\/button>/);
console.log(`Filter Button: ${filterBtnMatch ? filterBtnMatch[0] : 'NOT FOUND'}`);
if (!filterBtnMatch || filterBtnMatch[1] !== '15') {
  console.error('FAIL: Expected All Services (15)');
  process.exit(1);
} else {
  console.log('PASS: Filter button correctly shows All Services (15).');
}

// 2. Extract cards
const cardRegex = /<div class="[^"]*service-item[^"]*" data-category="([^"]+)">([\s\S]*?)<\/div>\s*<\/div>/g;
const cards = [];
let match;
while ((match = cardRegex.exec(html)) !== null) {
  const category = match[1];
  const inner = match[2];
  const titleMatch = inner.match(/<h4 class="service-title">[\s\S]*?<a[^>]*>([\s\S]*?)<\/a><\/h4>/i);
  const imgMatch = inner.match(/<img\s+src="([^"]+)"\s+alt="([^"]*)"/i);
  const linkMatch = inner.match(/<a\s+[^>]*class="[^"]*service-link[^"]*"[^>]*href="([^"]+)"|<a\s+[^>]*href="([^"]+)"[^>]*class="[^"]*service-link[^"]*"/i);
  cards.push({
    category,
    title: titleMatch ? titleMatch[1].trim() : null,
    img: imgMatch ? imgMatch[1] : null,
    alt: imgMatch ? imgMatch[2] : null,
    link: linkMatch ? (linkMatch[1] || linkMatch[2]) : null
  });
}

console.log(`Total service cards: ${cards.length}`);
if (cards.length !== 15) {
  console.error(`FAIL: Expected 15 cards, found ${cards.length}`);
  process.exit(1);
} else {
  console.log('PASS: Exactly 15 service cards found.');
}

// Category breakdown
const counts = {};
cards.forEach(c => counts[c.category] = (counts[c.category] || 0) + 1);
console.log('\nCategory breakdown:', counts);

// Check Sports cards
const sportsCards = cards.filter(c => c.category === 'sports');
console.log(`\nSports category cards: ${sportsCards.length}`);
sportsCards.forEach((c, i) => {
  console.log(`  [${i + 1}] Title: "${c.title}" | Img: "${c.img}" | Link: "${c.link}"`);
});

if (sportsCards.length !== 3) {
  console.error(`FAIL: Expected 3 sports cards, got ${sportsCards.length}`);
  process.exit(1);
} else {
  console.log('PASS: Exactly 3 sports cards present in data-category="sports".');
}

// Ensure every category has exactly 3 cards!
for (const [cat, count] of Object.entries(counts)) {
  if (count !== 3) {
    console.error(`FAIL: Category '${cat}' has ${count} cards instead of 3`);
    process.exit(1);
  }
}
console.log('PASS: Every single category (spine, sports, postop, neuro, home) has exactly 3 cards!');

// Check duplicate images
const imgs = cards.map(c => c.img);
const dupImgs = imgs.filter((item, idx) => imgs.indexOf(item) !== idx);
if (dupImgs.length > 0) {
  console.error('FAIL: Duplicate images found:', dupImgs);
  process.exit(1);
} else {
  console.log('PASS: Zero duplicate images across all 15 cards.');
}

// Check duplicate titles
const titles = cards.map(c => c.title);
const dupTitles = titles.filter((item, idx) => titles.indexOf(item) !== idx);
if (dupTitles.length > 0) {
  console.error('FAIL: Duplicate titles found:', dupTitles);
  process.exit(1);
} else {
  console.log('PASS: Zero duplicate titles across all 15 cards.');
}

// Check all images exist on disk
let missing = 0;
imgs.forEach(img => {
  if (!fs.existsSync(img)) {
    console.error(`FAIL: Missing image on disk: ${img}`);
    missing++;
  }
});
if (missing === 0) {
  console.log('PASS: All 15 images verified to exist on disk.');
} else {
  process.exit(1);
}

// Check engine
const engineCode = fs.readFileSync('assets/js/service-engine.js', 'utf8');
if (!engineCode.includes("'runners-gait'")) {
  console.error("FAIL: Missing 'runners-gait' in service-engine.js");
  process.exit(1);
} else {
  console.log("PASS: Found 'runners-gait' in service-engine.js");
}

['$340', '$780', '$1,250'].forEach(p => {
  if (!engineCode.includes(p)) {
    console.error(`FAIL: Price ${p} missing or corrupted in service-engine.js`);
    process.exit(1);
  }
});
console.log('PASS: Pricing packages intact.');

console.log('\nAll sports service checks PASSED!');
