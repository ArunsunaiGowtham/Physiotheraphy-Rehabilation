const fs = require('fs');
const http = require('http');

console.log('=== VERIFYING NEUROLOGICAL SERVICES IN SERVICES.HTML & ENGINE ===\n');

// 1. Check services.html
const servicesHtml = fs.readFileSync('services.html', 'utf8');

// Match service items
const itemRegex = /<div class="[^"]*service-item[^"]*" data-category="([^"]+)">([\s\S]*?)<\/div>\s*<\/div>/g;
const cards = [];
let match;
while ((match = itemRegex.exec(servicesHtml)) !== null) {
  const category = match[1];
  const cardHtml = match[2];
  
  const imgMatch = cardHtml.match(/<img\s+src="([^"]+)"\s+alt="([^"]*)"/i);
  const titleMatch = cardHtml.match(/<h4 class="service-title">[\s\S]*?<a[^>]*>([\s\S]*?)<\/a><\/h4>/i);
  const linkMatch = cardHtml.match(/<a\s+href="([^"]+)"\s+class="service-link">/i);
  
  cards.push({
    category,
    img: imgMatch ? imgMatch[1] : null,
    alt: imgMatch ? imgMatch[2] : null,
    title: titleMatch ? titleMatch[1].trim() : null,
    link: linkMatch ? linkMatch[1] : null
  });
}

console.log(`Total service cards found in services.html: ${cards.length}`);
if (cards.length !== 14) {
  console.error(`FAIL: Expected 14 cards, got ${cards.length}`);
  process.exit(1);
} else {
  console.log('PASS: Exact 14 service cards found.');
}

const neuroCards = cards.filter(c => c.category === 'neuro');
console.log(`\nCards in 'neuro' category: ${neuroCards.length}`);
neuroCards.forEach((c, idx) => {
  console.log(`  [${idx + 1}] Title: "${c.title}" | Img: "${c.img}" | Link: "${c.link}"`);
});

if (neuroCards.length !== 3) {
  console.error(`FAIL: Expected 3 neurological cards, got ${neuroCards.length}`);
  process.exit(1);
} else {
  console.log('PASS: Exactly 3 neurological cards present in data-category="neuro".');
}

// Check category breakdown
const categories = {};
cards.forEach(c => {
  categories[c.category] = (categories[c.category] || 0) + 1;
});
console.log('\nCategory breakdown:', categories);

// Verify NO repeated images
const images = cards.map(c => c.img);
const duplicateImages = images.filter((item, index) => images.indexOf(item) !== index);
if (duplicateImages.length > 0) {
  console.error('FAIL: Found duplicate images:', duplicateImages);
  process.exit(1);
} else {
  console.log('PASS: Zero repeated images across all 14 service cards.');
}

// Verify all image files exist on disk
let missingImages = 0;
images.forEach(img => {
  if (!fs.existsSync(img)) {
    console.error(`FAIL: Image missing on disk: ${img}`);
    missingImages++;
  }
});
if (missingImages === 0) {
  console.log('PASS: All referenced service images exist on disk.');
} else {
  process.exit(1);
}

// Verify NO repeated titles
const titles = cards.map(c => c.title);
const duplicateTitles = titles.filter((item, index) => titles.indexOf(item) !== index);
if (duplicateTitles.length > 0) {
  console.error('FAIL: Found duplicate titles:', duplicateTitles);
  process.exit(1);
} else {
  console.log('PASS: Zero repeated titles across all 14 service cards.');
}

// 2. Check service-engine.js SERVICES_DATA
// We can evaluate or parse the file to extract SERVICES_DATA
const engineContent = fs.readFileSync('assets/js/service-engine.js', 'utf8');

const targetIds = ['neurological', 'stroke-rehab', 'vestibular-rehab'];
targetIds.forEach(id => {
  if (engineContent.includes(`'${id}'`)) {
    console.log(`PASS: Found '${id}' in service-engine.js`);
  } else {
    console.error(`FAIL: Missing '${id}' in service-engine.js`);
    process.exit(1);
  }
});

// Check prices inside stroke-rehab and vestibular-rehab are intact
['$590', '$1,290', '$1,750', '$320', '$760', '$1,220'].forEach(price => {
  if (engineContent.includes(price)) {
    console.log(`PASS: Price ${price} properly preserved`);
  } else {
    console.error(`FAIL: Price ${price} not found or corrupted`);
    process.exit(1);
  }
});

console.log('\nAll neurological service card and engine checks PASSED!');
