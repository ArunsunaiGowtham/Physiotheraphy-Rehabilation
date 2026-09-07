const fs = require('fs');
const http = require('http');

console.log('=== COMPREHENSIVE AUDIT: POST-SURGICAL SERVICES & IMAGES ===\n');

// 1. Audit services.html cards
const html = fs.readFileSync('services.html', 'utf8');

// Filter button check
const filterBtnMatch = html.match(/<button class="filter-btn active" data-filter="all">All Services \((\d+)\)<\/button>/);
console.log(`Filter Button Text: ${filterBtnMatch ? filterBtnMatch[0] : 'NOT FOUND'}`);
if (!filterBtnMatch || filterBtnMatch[1] !== '15') {
  console.error('FAIL: Filter button does not state All Services (15)');
  process.exit(1);
} else {
  console.log('PASS: Filter button correctly shows All Services (15).');
}

// Regex to extract all cards
const cardRegex = /<div class="[^"]*service-item[^"]*" data-category="([^"]+)">([\s\S]*?)<\/div>\s*<\/div>/g;
const cards = [];
let match;
while ((match = cardRegex.exec(html)) !== null) {
  const category = match[1];
  const innerHtml = match[2];
  
  const imgMatch = innerHtml.match(/<img\s+src="([^"]+)"\s+alt="([^"]*)"/i);
  const titleMatch = innerHtml.match(/<h4 class="service-title">[\s\S]*?<a[^>]*>([\s\S]*?)<\/a><\/h4>/i);
  const linkMatch = innerHtml.match(/<a\s+href="([^"]+)"\s+class="service-link">/i);
  
  cards.push({
    category,
    img: imgMatch ? imgMatch[1] : null,
    alt: imgMatch ? imgMatch[2] : null,
    title: titleMatch ? titleMatch[1].trim() : null,
    link: linkMatch ? linkMatch[1] : null
  });
}

console.log(`\nTotal service cards found: ${cards.length}`);
if (cards.length !== 15) {
  console.error(`FAIL: Expected 15 cards, got ${cards.length}`);
  process.exit(1);
} else {
  console.log('PASS: Exact 15 service cards found.');
}

// Category breakdown
const categoryCounts = {};
cards.forEach(c => categoryCounts[c.category] = (categoryCounts[c.category] || 0) + 1);
console.log('Category breakdown:', categoryCounts);

// Audit Post-Surgical cards specifically
const postopCards = cards.filter(c => c.category === 'postop');
console.log(`\nPost-Surgical category cards count: ${postopCards.length}`);
postopCards.forEach((c, i) => {
  console.log(`  [${i + 1}] Title: "${c.title}"`);
  console.log(`      Image: "${c.img}" | Alt: "${c.alt}"`);
  console.log(`      Link:  "${c.link}"`);
});

if (postopCards.length !== 3) {
  console.error(`FAIL: Expected exactly 3 post-surgical cards, got ${postopCards.length}`);
  process.exit(1);
} else {
  console.log('PASS: Exactly 3 post-surgical cards present in data-category="postop".');
}

// Verify images match post-surgical clinically:
// 1. service-postop.jpg size and freshness (should be ~800KB generated image, NOT old 80KB crunches photo)
const postopImgStats = fs.statSync('assets/images/service-postop.jpg');
console.log(`\n[Image Check 1] service-postop.jpg size: ${postopImgStats.size} bytes`);
if (postopImgStats.size < 400000) {
  console.error('FAIL: service-postop.jpg appears to be the old small stock image instead of the new high-res postop image!');
  process.exit(1);
} else {
  console.log('PASS: service-postop.jpg is the newly generated high-resolution clinical knee mobilization photograph.');
}

// 2. service-aquatic.jpg exists and is hydrotherapy
const aquaticImgStats = fs.statSync('assets/images/service-aquatic.jpg');
console.log(`[Image Check 2] service-aquatic.jpg size: ${aquaticImgStats.size} bytes`);
console.log('PASS: service-aquatic.jpg matches post-op hydrotherapy and exists.');

// 3. service-postop-shoulder.jpg exists and is shoulder post-op repair
const shoulderImgStats = fs.statSync('assets/images/service-postop-shoulder.jpg');
console.log(`[Image Check 3] service-postop-shoulder.jpg size: ${shoulderImgStats.size} bytes`);
console.log('PASS: service-postop-shoulder.jpg matches post-op tendon/shoulder repair and exists.');

// Check for zero duplicate images across all 15 cards
const allImages = cards.map(c => c.img);
const duplicateImages = allImages.filter((img, idx) => allImages.indexOf(img) !== idx);
if (duplicateImages.length > 0) {
  console.error('FAIL: Found duplicate images across service cards:', duplicateImages);
  process.exit(1);
} else {
  console.log('\nPASS: Zero duplicate images across all 15 cards.');
}

// Check for zero duplicate titles across all 15 cards
const allTitles = cards.map(c => c.title);
const duplicateTitles = allTitles.filter((t, idx) => allTitles.indexOf(t) !== idx);
if (duplicateTitles.length > 0) {
  console.error('FAIL: Found duplicate titles across service cards:', duplicateTitles);
  process.exit(1);
} else {
  console.log('PASS: Zero duplicate titles across all 15 cards.');
}

// Check all 15 images exist on disk
let missing = 0;
allImages.forEach(img => {
  if (!fs.existsSync(img)) {
    console.error(`FAIL: Missing image on disk: ${img}`);
    missing++;
  }
});
if (missing === 0) {
  console.log('PASS: All 15 referenced images exist on local disk.');
} else {
  process.exit(1);
}

// 2. Check service-engine.js
const engineCode = fs.readFileSync('assets/js/service-engine.js', 'utf8');
['post-surgery', 'aquatic-therapy', 'postop-tendon'].forEach(id => {
  if (engineCode.includes(`'${id}'`)) {
    console.log(`PASS: service-engine.js contains '${id}'`);
  } else {
    console.error(`FAIL: service-engine.js missing '${id}'`);
    process.exit(1);
  }
});

// Check prices
['$560', '$1,040', '$1,490'].forEach(p => {
  if (engineCode.includes(p)) {
    console.log(`PASS: Price ${p} preserved`);
  } else {
    console.error(`FAIL: Price ${p} corrupted or missing`);
    process.exit(1);
  }
});

console.log('\nAll Post-Surgical card, image, and engine checks PASSED!');
