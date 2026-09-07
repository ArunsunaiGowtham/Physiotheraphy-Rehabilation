const fs = require('fs');
const code = fs.readFileSync('assets/js/blog-engine.js', 'utf8');
global.window = global;
global.document = { addEventListener: () => {}, getElementById: () => null, querySelectorAll: () => [] };
eval(code);
const articles = window.PhysioLifeBlog.articles;
articles.forEach((a, i) => {
  console.log(`${i+1}. [${a.category}] ${a.title}`);
  console.log(`   Image: ${a.image}`);
});
