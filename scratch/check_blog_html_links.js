const fs = require('fs');
const content = fs.readFileSync('blog.html', 'utf8');
const links = [...content.matchAll(/href="([^"]+)"/g)].map(m => m[1]);
console.log(links);
