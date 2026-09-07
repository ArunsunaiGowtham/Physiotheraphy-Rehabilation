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
  if (!fs.existsSync(p)) continue;
  let content = fs.readFileSync(p, 'utf-8');

  // Match the <li class="nav-item dropdown"> ... </li> block in navbar
  const dropdownRegex = /<li class="nav-item dropdown">[\s\S]*?<\/ul>\s*<\/li>/i;

  let replacement = '';
  if (f === 'index.html') {
    replacement = `<li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle active" href="#" id="homeDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Home <i class="fas fa-chevron-down dropdown-arrow ms-1"></i>
              </a>
              <ul class="dropdown-menu" aria-labelledby="homeDropdown">
                <li><a class="dropdown-item active" href="index.html">Home 1</a></li>
                <li><a class="dropdown-item" href="home-2.html">Home 2</a></li>
              </ul>
            </li>`;
  } else if (f === 'home-2.html') {
    replacement = `<li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle active" href="#" id="homeDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Home <i class="fas fa-chevron-down dropdown-arrow ms-1"></i>
              </a>
              <ul class="dropdown-menu" aria-labelledby="homeDropdown">
                <li><a class="dropdown-item" href="index.html">Home 1</a></li>
                <li><a class="dropdown-item active" href="home-2.html">Home 2</a></li>
              </ul>
            </li>`;
  } else {
    replacement = `<li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="homeDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Home <i class="fas fa-chevron-down dropdown-arrow ms-1"></i>
              </a>
              <ul class="dropdown-menu" aria-labelledby="homeDropdown">
                <li><a class="dropdown-item" href="index.html">Home 1</a></li>
                <li><a class="dropdown-item" href="home-2.html">Home 2</a></li>
              </ul>
            </li>`;
  }

  if (dropdownRegex.test(content)) {
    content = content.replace(dropdownRegex, replacement);
    fs.writeFileSync(p, content, 'utf-8');
    console.log(`[FIXED DROPDOWN] ${f}`);
  } else {
    console.error(`[NO MATCH] ${f}`);
  }
}
