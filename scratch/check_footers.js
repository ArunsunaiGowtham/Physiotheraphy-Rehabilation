const fs = require('fs');

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

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const footerStart = content.indexOf('<footer class="site-footer">');
  const footerEnd = content.indexOf('</footer>', footerStart);
  if (footerStart !== -1 && footerEnd !== -1) {
    const footerText = content.substring(footerStart, footerEnd);
    const rowMatch = footerText.match(/<div class="row g-5">([\s\S]*?)<\/div>\s*<div class="footer-bottom/);
    if (rowMatch) {
      console.log(`[OK] ${f}: length ${rowMatch[1].length}`);
    } else {
      console.log(`[FAIL] ${f}: row g-5 not matched`);
    }
  } else {
    console.log(`[FAIL] ${f}: footer tags not found`);
  }
});
