const fs = require('fs');
const content = fs.readFileSync('assets/js/blog-engine.js', 'utf8');

// Check syntax
try {
  new Function(content);
  console.log('PASS: assets/js/blog-engine.js syntax OK!');
} catch (e) {
  console.error('FAIL: Syntax error:', e.message);
  process.exit(1);
}

// Extract articles
const regex = /slug:\s*'([^']+)'[\s\S]*?category:\s*'([^']+)'[\s\S]*?image:\s*'([^']+)'/g;
let match;
const articles = [];
const imageCounts = {};

while ((match = regex.exec(content)) !== null) {
  const item = { slug: match[1], category: match[2], image: match[3] };
  articles.push(item);
  imageCounts[item.image] = (imageCounts[item.image] || 0) + 1;
}

console.log('Total articles count in catalog:', articles.length);

console.log('\n--- Post-Op Rehab Articles ---');
const postOp = articles.filter(a => a.category === 'Post-Op Rehab');
postOp.forEach((a, i) => {
  console.log(`Article ${i + 1}: ${a.slug}`);
  console.log(`  Category: ${a.category}`);
  console.log(`  Image:    ${a.image}`);
  console.log(`  Exists:   ${fs.existsSync(a.image)} (${fs.statSync(a.image).size} bytes)`);
});

if (postOp.length === 2 && postOp[0].image !== postOp[1].image) {
  console.log('PASS: Post-Op Rehab has TWO distinct articles with TWO SEPARATE images!');
} else {
  console.error('FAIL: Post-Op Rehab does not have two distinct images!');
}

console.log('\n--- Whole-Catalog Repeated Images Check ---');
let hasRepeats = false;
Object.entries(imageCounts).forEach(([img, count]) => {
  if (count > 1) {
    hasRepeats = true;
    console.error(`Repeated image (${count} times): ${img}`);
    articles.filter(a => a.image === img).forEach(a => console.log('  -', a.slug));
  }
});

if (!hasRepeats) {
  console.log('PASS: ZERO repeated images found! Every article in the entire catalog has a unique image.');
} else {
  console.error('FAIL: Repeated images still exist!');
}
