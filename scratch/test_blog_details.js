const fs = require('fs');

const blogEngineCode = fs.readFileSync('assets/js/blog-engine.js', 'utf8');

// Test slug retrieval
const slugs = [
  '5-proven-exercises-for-sciatica',
  'rotator-cuff-tears-surgery-vs-therapy',
  'complete-ergonomic-workstation-blueprint',
  'acl-reconstruction-biomechanical-roadmap',
  'post-concussion-baseline-voms-protocol'
];

global.window = global;
global.document = {
  readyState: 'complete',
  addEventListener: () => {},
  getElementById: (id) => null,
  querySelector: () => null,
  querySelectorAll: () => []
};

eval(blogEngineCode);

slugs.forEach(slug => {
  const art = window.PhysioLifeBlog.getArticle(slug);
  if (art) {
    console.log(`[FOUND] ${slug} -> "${art.title}" by ${art.author} (${art.category})`);
  } else {
    console.log(`[MISSING] ${slug}`);
  }
});
