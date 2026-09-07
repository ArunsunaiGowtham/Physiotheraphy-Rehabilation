const fs = require('fs');
const http = require('http');

const html = fs.readFileSync('services.html', 'utf8');

// Parse all 15 services from services.html
const gridMatch = html.match(/<div class="row g-4" id="servicesGridContainer">([\s\S]*?)<\/div>\s*<\/div>\s*<\/section>/);
if (!gridMatch) {
  console.error('servicesGridContainer not found');
  process.exit(1);
}

const serviceBlocks = gridMatch[1].split('<div class="col-md-6 col-lg-4 service-item"').slice(1);

console.log('========================================================================');
console.log(`VERIFYING ALL ${serviceBlocks.length} CLINICAL SERVICES IN SERVICES.HTML`);
console.log('========================================================================\n');

const serviceList = [];
let allExist = true;

serviceBlocks.forEach((block, idx) => {
  const catMatch = block.match(/data-category="([^"]+)"/);
  const titleMatch = block.match(/<h4 class="service-title">[\s\S]*?<a[^>]*>(.*?)<\/a>/);
  const imgMatch = block.match(/<img src="([^"]+)" alt="([^"]+)"/);
  const linkMatch = block.match(/href="(service-details\.html\?service=[^"]+)"/);

  const title = titleMatch ? titleMatch[1].replace(/&amp;/g, '&') : 'Unknown';
  const category = catMatch ? catMatch[1] : 'Unknown';
  const imgPath = imgMatch ? imgMatch[1] : '';
  const alt = imgMatch ? imgMatch[2] : '';
  const link = linkMatch ? linkMatch[1] : '';

  let exists = fs.existsSync(imgPath);
  let sizeKb = 0;
  if (exists) {
    sizeKb = (fs.statSync(imgPath).size / 1024).toFixed(1);
  } else {
    allExist = false;
  }

  serviceList.push({
    index: idx + 1,
    title,
    category,
    image: imgPath,
    alt,
    link,
    exists,
    sizeKb
  });

  console.log(`[Service ${idx + 1}] ${title}`);
  console.log(`   Category:   ${category}`);
  console.log(`   Image File: ${imgPath} (${exists ? sizeKb + ' KB' : 'MISSING!'})`);
  console.log(`   Alt Text:   ${alt}`);
  console.log(`   Link:       ${link}`);
  console.log('------------------------------------------------------------------------');
});

console.log('\nTotal services audited:', serviceList.length);
console.log('All image files present on disk:', allExist ? 'YES (15/15)' : 'NO - FAIL');

// Test HTTP server requests for all 15 images
const testUrls = serviceList.map(s => '/' + s.image);

// Check if local dev server is running or start lightweight check
const checkUrls = async () => {
  const httpTestResults = [];
  for (const item of serviceList) {
    try {
      const res = await new Promise((resolve, reject) => {
        const req = http.get(`http://127.0.0.1:8080/${item.image}`, (res) => {
          resolve(res.statusCode);
        });
        req.on('error', (err) => resolve('SERVER_OFFLINE'));
        req.setTimeout(1000, () => { req.destroy(); resolve('TIMEOUT'); });
      });
      httpTestResults.push({ image: item.image, status: res });
    } catch (e) {
      httpTestResults.push({ image: item.image, status: 'ERROR' });
    }
  }

  console.log('\nHTTP Server Status Checks (port 8080):');
  httpTestResults.forEach(r => {
    console.log(` - /${r.image}: ${r.status}`);
  });
};

checkUrls();
