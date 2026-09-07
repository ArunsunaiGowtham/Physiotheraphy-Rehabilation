const fs = require('fs');
const path = require('path');

const html = fs.readFileSync('services.html', 'utf8');

// Find all service-item blocks inside servicesGridContainer
const gridMatch = html.match(/<div class="row g-4" id="servicesGridContainer">([\s\S]*?)<\/div>\s*<\/div>\s*<\/section>/);
if (!gridMatch) {
  console.log('Could not find servicesGridContainer');
  process.exit(1);
}

const gridContent = gridMatch[1];
const serviceBlocks = gridContent.split('<div class="col-md-6 col-lg-4 service-item"').slice(1);

console.log(`Found ${serviceBlocks.length} service items:\n`);

const services = [];

serviceBlocks.forEach((block, idx) => {
  const categoryMatch = block.match(/data-category="([^"]+)"/);
  const titleMatch = block.match(/<h4 class="service-title">[\s\S]*?<a[^>]*>(.*?)<\/a>/);
  const imgMatch = block.match(/<img src="([^"]+)" alt="([^"]+)"/);
  const hrefMatch = block.match(/href="(service-details\.html\?service=[^"]+)"/);
  const descMatch = block.match(/<p>(.*?)<\/p>/);

  const item = {
    index: idx + 1,
    category: categoryMatch ? categoryMatch[1] : 'unknown',
    title: titleMatch ? titleMatch[1].trim() : 'unknown',
    image: imgMatch ? imgMatch[1] : 'unknown',
    alt: imgMatch ? imgMatch[2] : 'unknown',
    link: hrefMatch ? hrefMatch[1] : 'unknown',
    desc: descMatch ? descMatch[1] : ''
  };

  services.push(item);

  // Check if image file exists and its size
  let fileStats = 'FILE MISSING';
  if (fs.existsSync(item.image)) {
    const stats = fs.statSync(item.image);
    fileStats = `${(stats.size / 1024).toFixed(1)} KB`;
  }

  console.log(`${item.index}. ${item.title}`);
  console.log(`   Category: ${item.category}`);
  console.log(`   Image: ${item.image} (${fileStats})`);
  console.log(`   Alt: ${item.alt}`);
  console.log(`   Link: ${item.link}`);
  console.log(`   Desc: ${item.desc.substring(0, 75)}...`);
  console.log('----------------------------------------------------');
});

// Also check service-engine.js and index.html for matching references
console.log('\nChecking service-engine.js...');
if (fs.existsSync('assets/js/service-engine.js')) {
  const engineJs = fs.readFileSync('assets/js/service-engine.js', 'utf8');
  console.log('service-engine.js length:', engineJs.length);
}
