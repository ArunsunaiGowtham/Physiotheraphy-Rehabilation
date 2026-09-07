const fs = require('fs');

console.log('=== VERIFYING POSTURE CORRECTION REMOVAL ===\n');

const html = fs.readFileSync('services.html', 'utf8');

// 1. Check filter button
const filterBtnMatch = html.match(/<button class="filter-btn active" data-filter="all">All Services \((\d+)\)<\/button>/);
console.log(`Filter Button: ${filterBtnMatch ? filterBtnMatch[0] : 'NOT FOUND'}`);
if (!filterBtnMatch || filterBtnMatch[1] !== '14') {
  console.error('FAIL: Expected All Services (14)');
  process.exit(1);
} else {
  console.log('PASS: Filter button correctly shows All Services (14).');
}

// 2. Check cards in grid
const cardRegex = /<div class="[^"]*service-item[^"]*" data-category="([^"]+)">([\s\S]*?)<\/div>\s*<\/div>/g;
const cards = [];
let match;
while ((match = cardRegex.exec(html)) !== null) {
  const category = match[1];
  const inner = match[2];
  const titleMatch = inner.match(/<h4 class="service-title">[\s\S]*?<a[^>]*>([\s\S]*?)<\/a><\/h4>/i);
  const imgMatch = inner.match(/<img\s+src="([^"]+)"/i);
  cards.push({
    category,
    title: titleMatch ? titleMatch[1].trim() : null,
    img: imgMatch ? imgMatch[1] : null
  });
}

console.log(`Total service cards: ${cards.length}`);
if (cards.length !== 14) {
  console.error(`FAIL: Expected 14 cards, found ${cards.length}`);
  process.exit(1);
} else {
  console.log('PASS: Exactly 14 service cards found.');
}

// Check Posture Correction is gone
const postureCard = cards.find(c => c.title && c.title.toLowerCase().includes('posture'));
if (postureCard) {
  console.error('FAIL: Posture Correction card still present:', postureCard);
  process.exit(1);
} else {
  console.log('PASS: Posture Correction & Ergonomics card successfully removed.');
}

// Check category breakdown
const counts = {};
cards.forEach(c => counts[c.category] = (counts[c.category] || 0) + 1);
console.log('\nCategory breakdown:', counts);

if (counts.spine !== 3) {
  console.error(`FAIL: Expected 3 spine cards, got ${counts.spine}`);
  process.exit(1);
} else {
  console.log('PASS: Spine & Orthopedic now has exactly 3 cards (1 complete row).');
}

// Duplicate checks
const imgs = cards.map(c => c.img);
const dupImgs = imgs.filter((item, idx) => imgs.indexOf(item) !== idx);
if (dupImgs.length > 0) {
  console.error('FAIL: Duplicate images found:', dupImgs);
  process.exit(1);
} else {
  console.log('PASS: Zero duplicate images across all 14 cards.');
}

const titles = cards.map(c => c.title);
const dupTitles = titles.filter((item, idx) => titles.indexOf(item) !== idx);
if (dupTitles.length > 0) {
  console.error('FAIL: Duplicate titles found:', dupTitles);
  process.exit(1);
} else {
  console.log('PASS: Zero duplicate titles across all 14 cards.');
}

console.log('\nAll checks PASSED!');
