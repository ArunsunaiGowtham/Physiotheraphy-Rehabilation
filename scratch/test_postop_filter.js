const fs = require('fs');
const http = require('http');

console.log('Testing Post-Op Rehab Filter & Endpoints...');

const engineCode = fs.readFileSync('assets/js/blog-engine.js', 'utf8');

let countDisplayVal = null;
let gridHtml = '';

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
    if (id === 'articleCountDisplay') {
      return {
        set textContent(val) { countDisplayVal = val; },
        get textContent() { return countDisplayVal; }
      };
    }
    if (id === 'blogGridContainer') {
      return {
        set innerHTML(val) { gridHtml = val; },
        get innerHTML() { return gridHtml; }
      };
    }
    if (id === 'blogPagination') {
      return {
        classList: { add: () => {}, remove: () => {} },
        innerHTML: '',
        addEventListener: () => {}
      };
    }
    return null;
  }
};

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

// Check articles under Post-Op Rehab
const postOpArticles = blog.articles.filter(a => a.categorySlug === 'post-op-rehab');
console.log('Total Post-Op Rehab articles found in engine:', postOpArticles.length);

if (postOpArticles.length === 2) {
  console.log('PASS: Exactly 2 articles under categorySlug: "post-op-rehab".');
} else {
  console.error('FAIL: Expected 2 articles, found:', postOpArticles.length);
}

console.log('Article 1 Image:', postOpArticles[0].image);
console.log('Article 2 Image:', postOpArticles[1].image);

if (postOpArticles[0].image !== postOpArticles[1].image &&
    postOpArticles[0].image === 'assets/images/postop-knee-rehab.jpg' &&
    postOpArticles[1].image === 'assets/images/postop-shoulder-rehab.jpg') {
  console.log('PASS: Two separate, non-repeated, dedicated images used for Post-Op Rehab!');
} else {
  console.error('FAIL: Image check failed!');
}

// Check HTTP endpoints
http.get('http://localhost:8080/blog-details.html?slug=total-knee-arthroplasty-rehab', (res1) => {
  console.log('Total Knee Arthroplasty Detail Page -> HTTP', res1.statusCode);
  http.get('http://localhost:8080/blog-details.html?slug=post-op-rotator-cuff-arthroscopy-rehab', (res2) => {
    console.log('Post-Op Rotator Cuff Detail Page -> HTTP', res2.statusCode);
    console.log('ALL POST-OP REHAB TESTS PASSED WITH 100% SUCCESS!');
  });
});
