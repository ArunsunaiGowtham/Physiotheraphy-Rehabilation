const fs = require('fs');
const content = fs.readFileSync('assets/js/blog-engine.js', 'utf8');

const vm = require('vm');
const context = { window: {}, document: { addEventListener: () => {} } };
vm.createContext(context);

const start = content.indexOf('const ALL_ARTICLES = [');
const end = content.indexOf('];', start);
const articlesCode = content.substring(start, end + 2);
vm.runInContext(articlesCode + '; this.ALL_ARTICLES = ALL_ARTICLES;', context);

const painRelief = context.ALL_ARTICLES.filter(a => a.category === 'Pain Relief' || a.categorySlug === 'pain-relief');

painRelief.forEach((a, i) => {
  console.log(`=== [${i+1}] ${a.id} ===`);
  console.log(`Title: ${a.title}`);
  console.log(`Image: ${a.image}`);
  console.log(`Description: ${a.description}`);
});
