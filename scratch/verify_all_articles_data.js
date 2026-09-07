const fs = require('fs');
const content = fs.readFileSync('assets/js/blog-engine.js', 'utf8');

global.window = global;
global.document = {
  readyState: 'complete',
  addEventListener: () => {},
  getElementById: () => null,
  querySelector: () => null,
  querySelectorAll: () => []
};

eval(content);

const articles = window.PhysioLifeBlog.articles;
console.log(`Loaded ${articles.length} articles.`);
articles.forEach((a, i) => {
  console.log(`${i+1}. [${a.slug}] "${a.title}" | img: ${a.image} (exists: ${fs.existsSync(a.image)}) | authorImg: ${a.authorImg} (exists: ${fs.existsSync(a.authorImg)})`);
});
