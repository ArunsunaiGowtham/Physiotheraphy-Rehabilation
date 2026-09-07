const fs = require('fs');
const pages = [
  'about.html', 'blog-details.html', 'blog.html', 'contact.html',
  'home-2.html', 'index.html', 'insurance.html', 'pricing.html',
  'service-details.html', 'services.html', 'therapist-details.html', 'therapists.html'
];
pages.forEach(p => {
  const content = fs.readFileSync(p, 'utf8');
  const match = content.match(/<footer class="site-footer">([\s\S]*?)<\/footer>/);
  if (match) {
    console.log(`${p}: match found, length=${match[1].length}`);
  } else {
    console.log(`${p}: NO MATCH`);
  }
});
