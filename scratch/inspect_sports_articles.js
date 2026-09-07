const fs = require('fs');
const content = fs.readFileSync('assets/js/blog-engine.js', 'utf8');

const vm = require('vm');
const context = { window: {}, document: { addEventListener: () => {} } };
vm.createContext(context);

const start = content.indexOf('const ALL_ARTICLES = [');
const end = content.indexOf('];', start);
const articlesCode = content.substring(start, end + 2);
vm.runInContext(articlesCode + '; this.ALL_ARTICLES = ALL_ARTICLES;', context);

const sportsArticles = context.ALL_ARTICLES.filter(a => a.category === 'Sports Injuries' || a.categorySlug === 'sports-injuries');

console.log(`Total Sports Injuries articles found: ${sportsArticles.length}`);
sportsArticles.forEach((a, i) => {
  console.log(`\n[${i+1}] ID: ${a.id}`);
  console.log(`    Slug: ${a.slug}`);
  console.log(`    Title: ${a.title}`);
  console.log(`    Image: ${a.image}`);
  console.log(`    Exists: ${fs.existsSync(a.image)}`);
  console.log(`    Description: ${a.description}`);
});
