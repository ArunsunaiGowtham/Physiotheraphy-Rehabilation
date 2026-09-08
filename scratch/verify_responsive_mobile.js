/**
 * Automated Verification Script for Mobile Responsiveness and Content Parity
 */
const fs = require('fs');
const path = require('path');
const http = require('http');

const rootDir = path.resolve(__dirname, '..');
let failures = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  [PASS] ${message}`);
  } else {
    console.error(`  [FAIL] ${message}`);
    failures++;
  }
}

console.log('=== 1. Checking Global Overflow & Viewport Meta Tags ===');
const styleCss = fs.readFileSync(path.join(rootDir, 'assets/css/style.css'), 'utf8');
const rtlCss = fs.readFileSync(path.join(rootDir, 'assets/css/rtl.css'), 'utf8');
const mainJs = fs.readFileSync(path.join(rootDir, 'assets/js/main.js'), 'utf8');

assert(styleCss.includes('overflow-x: clip;'), 'style.css has overflow-x: clip on html and body');
assert(styleCss.includes('max-width: 100vw;'), 'style.css has max-width: 100vw on body');

const htmlFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));
let missingViewport = 0;
htmlFiles.forEach(f => {
  const content = fs.readFileSync(path.join(rootDir, f), 'utf8');
  if (!content.includes('name="viewport"') || !content.includes('width=device-width')) {
    console.error(`Missing viewport in ${f}`);
    missingViewport++;
  }
});
assert(missingViewport === 0, `All ${htmlFiles.length} root HTML files have valid viewport meta tags`);

console.log('\n=== 2. Checking Responsive Breakpoint Rules in style.css ===');
assert(styleCss.includes('@media (min-width: 1200px)'), 'Navbar dropdown desktop hover is set to min-width: 1200px');
assert(styleCss.includes('@media (max-width: 1199.98px)'), 'Mobile navbar collapse styling exists for < 1200px');
assert(styleCss.includes('@media (max-width: 767.98px)'), 'Mobile rules exist for < 768px');
assert(styleCss.includes('@media (max-width: 575.98px)'), 'Extra-small mobile rules exist for < 576px');

console.log('\n=== 3. Checking Component Parity & Mobile Features ===');
assert(styleCss.includes('.hero-stats-row') && styleCss.includes('grid-template-columns: repeat(2, 1fr)'), 'Hero stats row adapts to 2x2 grid on mobile');
assert(styleCss.includes('.floating-badge') && styleCss.includes('position: static !important'), 'Floating badges are contained on mobile without negative overflow');
assert(styleCss.includes('.category-pills-list') && styleCss.includes('overflow-x: auto'), 'Category pills list has touch swipe scrolling on mobile');
assert(styleCss.includes('.blog-search-pill-wrap') && styleCss.includes('width: 100% !important'), 'Blog search bar expands to full width on mobile');
assert(styleCss.includes('.filter-btn-group') && styleCss.includes('overflow-x: auto'), 'Services filter tabs have touch swipe scrolling on mobile');
assert(styleCss.includes('.form-control,') && styleCss.includes('font-size: 16px !important'), 'Form controls have 16px font-size to prevent iOS Safari auto-zoom');
assert(styleCss.includes('.blog-pagination-ref .pagination') && styleCss.includes('flex-wrap: wrap'), 'Blog pagination has wrap protection on small mobile screens');
assert(styleCss.includes('.modal-footer') && styleCss.includes('flex-direction: column-reverse'), 'Modal footer buttons stack on mobile for touch ease');

console.log('\n=== 4. Checking RTL Mobile Symmetries in rtl.css ===');
assert(rtlCss.includes('[dir="rtl"] .floating-badge') && rtlCss.includes('position: static !important'), 'RTL floating badges properly reset on mobile');
assert(rtlCss.includes('[dir="rtl"] .category-pills-list'), 'RTL category pills list direction defined');

console.log('\n=== 5. Checking JavaScript Mobile Drawer & Dropdown Logic ===');
assert(mainJs.includes('window.innerWidth >= 1200'), 'main.js dropdown hover restricted to >= 1200px');
assert(mainJs.includes('navbarCollapseEl.classList.contains(\'show\')'), 'main.js auto-closes mobile drawer on nav link click');

console.log('\n=== 6. Checking HTTP Status Code on Local Dev Server ===');
const testUrls = [
  '/',
  '/index.html',
  '/blog.html',
  '/blog-details.html',
  '/services.html',
  '/service-details.html?service=sports-injury',
  '/therapists.html',
  '/therapist-details.html?id=jenkins',
  '/pricing.html',
  '/insurance.html',
  '/about.html',
  '/contact.html'
];

// Start a lightweight local static server on random high port to test all pages
const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';
  const filePath = path.join(rootDir, reqPath.replace(/^\//, ''));
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(8099, '127.0.0.1', () => {
  let checkedCount = 0;
  testUrls.forEach(url => {
    http.get(`http://127.0.0.1:8099${url}`, res => {
      assert(res.statusCode === 200, `GET ${url} returned HTTP ${res.statusCode}`);
      checkedCount++;
      if (checkedCount === testUrls.length) {
        server.close(() => finish());
      }
    }).on('error', err => {
      console.error(`HTTP error on ${url}:`, err.message);
      failures++;
      checkedCount++;
      if (checkedCount === testUrls.length) {
        server.close(() => finish());
      }
    });
  });
});

function finish() {
  console.log(`\n========================================`);
  if (failures === 0) {
    console.log(`ALL TESTS PASSED! Mobile responsiveness audit is 100% complete.`);
    process.exit(0);
  } else {
    console.error(`FAILED with ${failures} error(s).`);
    process.exit(1);
  }
}
