const fs = require('fs');
const content = fs.readFileSync('assets/js/blog-engine.js', 'utf8');

// Use node vm to run the script or parse ALL_ARTICLES
const vm = require('vm');
const context = { window: {}, document: { addEventListener: () => {} } };
vm.createContext(context);

// Let's extract ALL_ARTICLES text
const start = content.indexOf('const ALL_ARTICLES = [');
const end = content.indexOf('];', start);
if (start !== -1 && end !== -1) {
  const articlesCode = content.substring(start, end + 2);
  vm.runInContext(articlesCode + '; this.ALL_ARTICLES = ALL_ARTICLES;', context);
  const painRelief = context.ALL_ARTICLES.filter(a => a.category === 'Pain Relief' || a.categorySlug === 'pain-relief');
  console.log('Total Pain Relief articles found:', painRelief.length);
  painRelief.forEach((a, i) => {
    console.log(`[${i+1}] ID: ${a.id}`);
    console.log(`    Title: ${a.title}`);
    console.log(`    Image: ${a.image}`);
    console.log(`    Exists: ${fs.existsSync(a.image)}`);
  });
} else {
  console.log('Could not find ALL_ARTICLES array bounds.');
}
