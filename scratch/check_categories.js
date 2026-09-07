const fs = require('fs');

const content = fs.readFileSync('services.html', 'utf-8');
const items = [...content.matchAll(/class="col-md-6 col-lg-4 service-item"\s+data-category="([^"]+)"/g)].map(m => m[1]);
const counts = {};
items.forEach(c => counts[c] = (counts[c] || 0) + 1);
console.log('Category distribution in services.html:');
console.log(counts);
