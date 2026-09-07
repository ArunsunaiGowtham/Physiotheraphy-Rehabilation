/**
 * Comprehensive Verification for Modern Reference Blog Transformation
 * Strictly using Node.js (No Python)
 */
const fs = require('fs');
const path = require('path');
const http = require('http');

console.log('===========================================================');
console.log('Verifying Blog Reference Layout & Engine (Node.js)');
console.log('===========================================================');

let passCount = 0;
let failCount = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
    passCount++;
  } else {
    console.error(`[FAIL] ${message}`);
    failCount++;
  }
}

// 1. Check blog.html markup
const blogHtml = fs.readFileSync('blog.html', 'utf8');

assert(blogHtml.includes('class="blog-ref-hero"'), 'blog.html has hero sub-header banner');
assert(blogHtml.includes('class="blog-ref-tagline"'), 'blog.html has centered tagline');
assert(blogHtml.includes('class="blog-filters-row"'), 'blog.html has filters row');
assert(blogHtml.includes('class="category-pill active"'), 'blog.html has active category pill');
assert(blogHtml.includes('class="blog-search-pill"'), 'blog.html has pill search input');
assert(blogHtml.includes('id="articleCountDisplay"'), 'blog.html has article count display element');
assert(blogHtml.includes('id="blogGridContainer"'), 'blog.html has grid container');
assert(blogHtml.includes('id="blogPagination"'), 'blog.html has pagination nav');
assert(!blogHtml.includes('id="featuredSection"'), 'blog.html successfully removed the clunky split featured hero block');

// 2. Check CSS rules in style.css
const styleCss = fs.readFileSync('assets/css/style.css', 'utf8');
assert(styleCss.includes('.blog-ref-hero'), 'style.css contains .blog-ref-hero styles');
assert(styleCss.includes('.category-pill'), 'style.css contains .category-pill styles');
assert(styleCss.includes('.blog-search-pill'), 'style.css contains .blog-search-pill styles');
assert(styleCss.includes('.article-counter-strip'), 'style.css contains .article-counter-strip styles');
assert(styleCss.includes('.blog-card-ref'), 'style.css contains 3-column .blog-card-ref styles');
assert(styleCss.includes('.blog-pagination-ref'), 'style.css contains .blog-pagination-ref styles');
assert(styleCss.includes('.navbar-nav .nav-link.active::after'), 'style.css has active navbar indicator line');

// 3. Check blog-engine.js data and logic
// Direct code parsing of blog-engine.js
const engineCode = fs.readFileSync('assets/js/blog-engine.js', 'utf8');
const slugMatches = engineCode.match(/slug:\s*['"]([^'"]+)['"]/g) || [];
const slugs = slugMatches.map(s => s.match(/slug:\s*['"]([^'"]+)['"]/)[1]);

assert(slugs.length === 28, `Total clinical articles in blog-engine.js is exactly 28 (found: ${slugs.length})`);

// 4. Verify all referenced images exist on disk
const imageMatches = engineCode.match(/image:\s*['"]([^'"]+)['"]/g) || [];
let allImagesFound = true;
imageMatches.forEach(imgLine => {
  const imgPath = imgLine.match(/image:\s*['"]([^'"]+)['"]/)[1];
  if (!fs.existsSync(imgPath)) {
    console.error(`Missing image: ${imgPath}`);
    allImagesFound = false;
  }
});
assert(allImagesFound, 'All 27 article images exist in local assets directory');

// 5. Test mock DOM execution
const mockWindow = {
  location: { search: '', href: 'http://localhost:8080/blog.html' },
  sessionStorage: { getItem: () => null, setItem: () => {} },
  addEventListener: () => {},
  dispatchEvent: () => {},
  PhysioLifeBlog: {}
};
const mockDocument = {
  readyState: 'complete',
  title: '',
  addEventListener: () => {},
  querySelector: () => null,
  querySelectorAll: () => [],
  getElementById: (id) => {
    if (id === 'articleCountDisplay') return { textContent: '' };
    if (id === 'blogGridContainer') return { innerHTML: '' };
    if (id === 'blogPagination') return { classList: { add: () => {}, remove: () => {} }, innerHTML: '', addEventListener: () => {} };
    return null;
  }
};

// Evaluate in sandbox
try {
  const vm = require('vm');
  const context = {
    window: mockWindow,
    document: mockDocument,
    sessionStorage: mockWindow.sessionStorage,
    URLSearchParams: URLSearchParams,
    URL: URL,
    console: console,
    Math: Math,
    parseInt: parseInt,
    isNaN: isNaN,
    String: String
  };
  vm.createContext(context);
  vm.runInContext(engineCode, context);

  const blog = context.window.PhysioLifeBlog;
  assert(typeof blog === 'object', 'PhysioLifeBlog object successfully exposed on window');
  assert(blog.articles && blog.articles.length === 28, `PhysioLifeBlog.articles contains all 28 articles (found: ${blog.articles.length})`);
  assert(blog.gridPosts && blog.gridPosts.length === 28, `PhysioLifeBlog.gridPosts contains all 28 catalog posts (found: ${blog.gridPosts.length})`);

  // Test getArticle for original and new articles
  const art1 = blog.getArticle('5-proven-exercises-for-sciatica');
  assert(art1 && art1.title.includes('Sciatica'), 'getArticle works for original articles');

  const art2 = blog.getArticle('plantar-fasciitis-shockwave-therapy');
  assert(art2 && art2.title.includes('Plantar Fasciitis'), 'getArticle works for new articles');

  const art3 = blog.getArticle('vestibular-rehabilitation-vertigo');
  assert(art3 && art3.category === 'Neurological', 'getArticle works for Neurological category');

} catch (err) {
  assert(false, `Sandbox execution error: ${err.message}`);
}

// 6. Test HTTP 200 Status on local server
function checkUrl(url, done) {
  http.get(url, (res) => {
    assert(res.statusCode === 200, `${url} responds with HTTP 200 OK`);
    done();
  }).on('error', (e) => {
    assert(false, `${url} error: ${e.message}`);
    done();
  });
}

checkUrl('http://localhost:8080/blog.html', () => {
  checkUrl('http://localhost:8080/blog-details.html?slug=plantar-fasciitis-shockwave-therapy', () => {
    console.log('===========================================================');
    console.log(`TOTAL TESTS: ${passCount + failCount} | PASSED: ${passCount} | FAILED: ${failCount}`);
    console.log('===========================================================');
    if (failCount > 0) {
      process.exit(1);
    }
  });
});
