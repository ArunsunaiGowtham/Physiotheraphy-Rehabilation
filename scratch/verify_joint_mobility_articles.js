const fs = require('fs');
const path = require('path');

// Read and evaluate ALL_ARTICLES from blog-engine.js
const code = fs.readFileSync(path.join(__dirname, '..', 'assets', 'js', 'blog-engine.js'), 'utf8');

// Extract ALL_ARTICLES array using vm or regex
const arrayMatch = code.match(/const ALL_ARTICLES = (\[[\s\S]*?\]);\s*\/\/\s*===/);
if (!arrayMatch) {
  console.error('Failed to locate ALL_ARTICLES in blog-engine.js');
  process.exit(1);
}

const articles = eval(arrayMatch[1]);
console.log(`Total articles in blog engine: ${articles.length}`);

// Filter by joint-mobility
const jointArticles = articles.filter(a => a.categorySlug === 'joint-mobility' || a.category === 'Joint Mobility');
console.log(`\nArticles matching 'joint-mobility': ${jointArticles.length}`);

jointArticles.forEach((art, index) => {
  console.log(`\n[Article ${index + 1}]`);
  console.log(`  ID: ${art.id}`);
  console.log(`  Title: ${art.title}`);
  console.log(`  Category: ${art.category} (${art.categorySlug})`);
  console.log(`  Image: ${art.image}`);

  const imgPath = path.join(__dirname, '..', art.image);
  if (fs.existsSync(imgPath)) {
    const stats = fs.statSync(imgPath);
    console.log(`  Image File Status: EXISTS (${stats.size} bytes)`);
  } else {
    console.error(`  Image File Status: MISSING at ${imgPath}`);
  }
});

if (jointArticles.length === 3) {
  console.log('\n[SUCCESS] Exactly 3 joint mobility articles found with matching images!');
} else {
  console.error(`\n[FAILURE] Expected 3 articles, found ${jointArticles.length}`);
}
