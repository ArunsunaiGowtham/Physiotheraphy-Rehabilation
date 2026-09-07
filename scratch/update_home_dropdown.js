const fs = require('fs');
const path = require('path');

const files = [
  'index.html',
  'about.html',
  'services.html',
  'service-details.html',
  'insurance.html',
  'pricing.html',
  'blog.html',
  'blog-details.html',
  'contact.html',
  'home-2.html',
  'therapists.html',
  'therapist-details.html'
];

for (const f of files) {
  const p = path.join(__dirname, '..', f);
  let content = fs.readFileSync(p, 'utf-8');

  if (f === 'index.html') {
    content = content.replace(
      /<ul class="dropdown-menu" aria-labelledby="homeDropdown">[\s\S]*?<\/ul>/,
      `<ul class="dropdown-menu" aria-labelledby="homeDropdown">\n                <li><a class="dropdown-item active" href="index.html">Home 1</a></li>\n                <li><a class="dropdown-item" href="home-2.html">Home 2</a></li>\n              </ul>`
    );
  } else if (f === 'home-2.html') {
    content = content.replace(
      /<ul class="dropdown-menu" aria-labelledby="homeDropdown">[\s\S]*?<\/ul>/,
      `<ul class="dropdown-menu" aria-labelledby="homeDropdown">\n                <li><a class="dropdown-item" href="index.html">Home 1</a></li>\n                <li><a class="dropdown-item active" href="home-2.html">Home 2</a></li>\n              </ul>`
    );
  } else {
    content = content.replace(
      /<ul class="dropdown-menu" aria-labelledby="homeDropdown">[\s\S]*?<\/ul>/,
      `<ul class="dropdown-menu" aria-labelledby="homeDropdown">\n                <li><a class="dropdown-item" href="index.html">Home 1</a></li>\n                <li><a class="dropdown-item" href="home-2.html">Home 2</a></li>\n              </ul>`
    );
  }

  fs.writeFileSync(p, content, 'utf-8');
  console.log(`[UPDATED] ${f}`);
}
