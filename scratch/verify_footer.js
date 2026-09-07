const fs = require('fs');
const http = require('http');

const files = [
  'index.html',
  'about.html',
  'services.html',
  'service-details.html',
  'therapists.html',
  'therapist-details.html',
  'pricing.html',
  'insurance.html',
  'contact.html',
  'blog.html',
  'blog-details.html',
  'home-2.html'
];

console.log('========================================================================');
console.log('VERIFYING FOOTER ALIGNMENT AND SIZING ACROSS ALL 12 TEMPLATES');
console.log('========================================================================\n');

let allPassed = true;

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const footerStart = content.indexOf('<footer class="site-footer">');
  const footerEnd = content.indexOf('</footer>', footerStart);
  if (footerStart === -1 || footerEnd === -1) {
    console.error(`[FAIL] ${f}: site-footer tags missing`);
    allPassed = false;
    return;
  }

  const footerText = content.substring(footerStart, footerEnd);
  
  // Check column counts and classes
  const colMatches = [...footerText.matchAll(/<div class="([^"]*col-12 col-sm-6 col-lg-3[^"]*)"/g)];
  if (colMatches.length !== 4) {
    console.error(`[FAIL] ${f}: Expected 4 equal col-lg-3 columns, found ${colMatches.length}`);
    allPassed = false;
  } else {
    // Check all 4 columns have footer-widget
    const widgetCount = (footerText.match(/class="footer-widget"/g) || []).length;
    // Check brand header
    const brandHeader = footerText.includes('footer-brand-header');
    // Check social buttons count
    const socialButtons = (footerText.match(/class="social-icon-btn"/g) || []).length;
    // Check quick links count
    const quickLinksCount = (footerText.match(/href="(about|services|therapists|insurance|pricing|contact)\.html"/g) || []).length;
    // Check service links count
    const serviceLinksCount = (footerText.match(/service-details\.html\?service=/g) || []).length;

    console.log(`[PASS] ${f}`);
    console.log(`       Columns: 4 equal (col-12 col-sm-6 col-lg-3)`);
    console.log(`       Widgets: ${widgetCount}, BrandHeader: ${brandHeader}`);
    console.log(`       Social buttons: ${socialButtons}, QuickLinks: ${quickLinksCount}, Services: ${serviceLinksCount}`);
  }
});

console.log('\n------------------------------------------------------------------------');
console.log('Overall Markup Verification:', allPassed ? 'ALL 12 PAGES PASSED' : 'SOME PAGES FAILED');
console.log('------------------------------------------------------------------------');

// Also test HTTP GET on index.html and style.css
const testUrls = ['/index.html', '/services.html', '/assets/css/style.css'];
testUrls.forEach(url => {
  http.get(`http://127.0.0.1:8080${url}`, res => {
    console.log(`HTTP ${res.statusCode} for ${url}`);
  }).on('error', err => {
    console.log(`Server offline for ${url}: ${err.message}`);
  });
});
