const fs = require('fs');
const content = fs.readFileSync('assets/js/blog-engine.js', 'utf8');

const vm = require('vm');
const context = { window: {}, document: { addEventListener: () => {} } };
vm.createContext(context);

const start = content.indexOf('const ALL_ARTICLES = [');
const end = content.indexOf('];', start);
const articlesCode = content.substring(start, end + 2);
vm.runInContext(articlesCode + '; this.ALL_ARTICLES = ALL_ARTICLES;', context);

context.ALL_ARTICLES.forEach((a, i) => {
  if (a.image.includes('knee') || a.image.includes('postop') || a.image.includes('shoulder')) {
    console.log(`Article [${i+1}] ID: ${a.id}, Category: ${a.category}, Image: ${a.image}`);
  }
});
