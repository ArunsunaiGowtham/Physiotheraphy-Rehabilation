const fs = require('fs');

// Verify blog-details.html modification
let html = fs.readFileSync('blog-details.html', 'utf8');

// Check breadcrumb
console.log('Includes articleBreadcrumb:', html.includes('id="articleBreadcrumb"'));
console.log('Includes articleBodyContainer:', html.includes('id="articleBodyContainer"'));
console.log('Includes blog-engine.js:', html.includes('assets/js/blog-engine.js'));
