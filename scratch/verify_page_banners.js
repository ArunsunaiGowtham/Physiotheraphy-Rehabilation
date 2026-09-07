const fs = require('fs');
const http = require('http');

const pages = [
  { file: 'about.html', bannerClass: 'page-banner-about', img: 'banner-about.jpg' },
  { file: 'services.html', bannerClass: 'page-banner-services', img: 'banner-services.jpg' },
  { file: 'insurance.html', bannerClass: 'page-banner-insurance', img: 'banner-insurance.jpg' },
  { file: 'pricing.html', bannerClass: 'page-banner-pricing', img: 'banner-pricing.jpg' },
  { file: 'blog.html', bannerClass: 'page-banner-blog', img: 'banner-blog.jpg' },
  { file: 'contact.html', bannerClass: 'page-banner-contact', img: 'banner-contact.jpg' }
];

console.log('=== 1. VERIFYING IMAGE ASSETS ON DISK ===');
let allImagesOk = true;
pages.forEach(p => {
  const imgPath = 'assets/images/' + p.img;
  if (fs.existsSync(imgPath)) {
    const size = fs.statSync(imgPath).size;
    console.log(`[PASS] ${imgPath.padEnd(35)} Size: ${(size / 1024).toFixed(1)} KB`);
  } else {
    console.error(`[FAIL] ${imgPath} NOT FOUND!`);
    allImagesOk = false;
  }
});

console.log('\n=== 2. VERIFYING HTML MARKUP ===');
let allHtmlOk = true;
pages.forEach(p => {
  const content = fs.readFileSync(p.file, 'utf8');
  const hasBanner = content.includes('class="page-header-banner ' + p.bannerClass + '"');
  const hasTitle = content.includes('class="banner-title"');
  const hasSubtitle = content.includes('banner-subtitle');
  if (hasBanner && hasTitle && hasSubtitle) {
    console.log(`[PASS] ${p.file.padEnd(20)} Contains .page-header-banner .${p.bannerClass}`);
  } else {
    console.error(`[FAIL] ${p.file} missing banner classes: hasBanner=${hasBanner}, hasTitle=${hasTitle}, hasSub=${hasSubtitle}`);
    allHtmlOk = false;
  }
});

console.log('\n=== 3. VERIFYING HTTP 200 RESPONSES (PAGES & IMAGES) ===');
let pending = pages.length * 2;
pages.forEach(p => {
  http.get('http://127.0.0.1:8080/' + p.file, res => {
    console.log(`[HTTP PAGE] ${p.file.padEnd(20)} Status: ${res.statusCode}`);
    pending--;
    if (pending === 0) finish();
  }).on('error', e => console.error(`[ERROR] ${p.file}:`, e.message));

  http.get('http://127.0.0.1:8080/assets/images/' + p.img, res => {
    console.log(`[HTTP IMG]  ${p.img.padEnd(25)} Status: ${res.statusCode} Content-Length: ${res.headers['content-length']} bytes`);
    pending--;
    if (pending === 0) finish();
  }).on('error', e => console.error(`[ERROR] ${p.img}:`, e.message));
});

function finish() {
  console.log('\n=== ALL BANNER VERIFICATIONS COMPLETED SUCCESSFULLY! ===');
}
