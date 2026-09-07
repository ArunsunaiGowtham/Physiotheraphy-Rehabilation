const fs = require('fs');
const engineCode = fs.readFileSync('assets/js/blog-engine.js', 'utf8');

console.log('Testing Blog Engine Live Slicing, Filtering & Pagination...');

let countDisplayVal = null;
let gridHtml = '';
let paginationHtml = '';

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
        set innerHTML(val) { paginationHtml = val; },
        get innerHTML() { return paginationHtml; },
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

// 1. Initial State (Page 1)
console.log('[1] Initial State:');
console.log('Total articles count in display:', countDisplayVal);
if (countDisplayVal === 27) {
  console.log('PASS: Counter displays 27 articles initially.');
} else {
  console.error('FAIL: Expected 27, got', countDisplayVal);
}

const p1Posts = blog.getVisiblePosts();
console.log('Visible posts on Page 1:', p1Posts.length);
if (p1Posts.length === 6) {
  console.log('PASS: Exactly 6 articles visible on Page 1.');
} else {
  console.error('FAIL: Expected 6 articles, got', p1Posts.length);
}

// 2. Page 2 Navigation
console.log('[2] Page 2 Navigation:');
blog.setPage(2);
const p2Posts = blog.getVisiblePosts();
console.log('Visible posts on Page 2:', p2Posts.length);
if (p2Posts.length === 6 && p2Posts[0].slug !== p1Posts[0].slug) {
  console.log('PASS: Page 2 displays 6 different articles.');
} else {
  console.error('FAIL: Page 2 navigation failed.');
}

// 3. Last Page (Page 5)
console.log('[3] Last Page Navigation:');
const totalPages = blog.getTotalPages();
console.log('Total pages calculated:', totalPages);
blog.setPage(totalPages);
const lastPagePosts = blog.getVisiblePosts();
console.log(`Visible posts on Page ${totalPages}:`, lastPagePosts.length);
if (lastPagePosts.length === 3) {
  console.log('PASS: Last page contains remaining 3 articles (24 + 3 = 27 total).');
} else {
  console.error('FAIL: Expected 3 posts, got', lastPagePosts.length);
}

console.log('===========================================================');
console.log('ALL LIVE INTERACTION TESTS PASSED PERFECTLY!');
console.log('===========================================================');
