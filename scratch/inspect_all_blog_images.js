const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const code = fs.readFileSync(path.join(rootDir, 'assets', 'js', 'blog-engine.js'), 'utf8');

// Mock window and navigator for loading blog-engine.js
global.window = global;
global.document = {
  addEventListener: () => {},
  getElementById: () => null,
  querySelectorAll: () => []
};

eval(code);

const articles = window.PhysioLifeBlog && window.PhysioLifeBlog.articles ? window.PhysioLifeBlog.articles : [];
console.log(`Loaded ${articles.length} articles from blog-engine.js\n`);

const results = [];

articles.forEach((a, idx) => {
  const imgPath = a.image;
  const fullPath = path.join(rootDir, imgPath);
  const exists = fs.existsSync(fullPath);
  const size = exists ? fs.statSync(fullPath).size : 0;
  
  results.push({
    index: idx + 1,
    slug: a.slug,
    title: a.title,
    category: a.category,
    image: a.image,
    exists: exists,
    sizeBytes: size,
    excerpt: a.excerpt ? a.excerpt.substring(0, 80) + '...' : ''
  });
});

console.log(JSON.stringify(results, null, 2));
