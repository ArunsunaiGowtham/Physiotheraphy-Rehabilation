const fs = require('fs');
const content = fs.readFileSync('assets/js/blog-engine.js', 'utf8');
const images = [...content.matchAll(/assets\/images\/[^"'` \t\r\n<>]+/g)].map(m => m[0]);
const uniqueImages = [...new Set(images)];
const missing = uniqueImages.filter(img => !fs.existsSync(img));
console.log('Total unique images in blog-engine:', uniqueImages.length);
console.log('Missing images:', missing);
