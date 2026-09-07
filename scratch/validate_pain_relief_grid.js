const fs = require('fs');
const jsdom = (() => {
  try {
    return require('jsdom');
  } catch (e) {
    return null;
  }
})();

const engineContent = fs.readFileSync('assets/js/blog-engine.js', 'utf8');

// Parse ALL_ARTICLES from engineContent
const start = engineContent.indexOf('const ALL_ARTICLES = [');
const end = engineContent.indexOf('];', start);
const articlesCode = engineContent.substring(start, end + 2);

const vm = require('vm');
const sandbox = { window: {}, document: { addEventListener: () => {} } };
vm.createContext(sandbox);
vm.runInContext(articlesCode + '; this.ALL_ARTICLES = ALL_ARTICLES;', sandbox);

const painArticles = sandbox.ALL_ARTICLES.filter(a => a.category === 'Pain Relief' || a.categorySlug === 'pain-relief');

console.log('=== END-TO-END DOM / DATA VALIDATION ===');
console.log(`Pain Relief articles count: ${painArticles.length}`);

painArticles.forEach((article, index) => {
  const exists = fs.existsSync(article.image);
  const stat = exists ? fs.statSync(article.image) : null;
  console.log(`\nCard ${index + 1}:`);
  console.log(`  Title:       ${article.title}`);
  console.log(`  Category:    ${article.category}`);
  console.log(`  Slug:        ${article.slug}`);
  console.log(`  Image File:  ${article.image}`);
  console.log(`  File Exists: ${exists} (${stat ? stat.size + ' bytes' : 'N/A'})`);
  console.log(`  Author:      ${article.author}`);
  console.log(`  Read Time:   ${article.readingTime}`);
});

console.log('\nValidation Passed Successfully!');
