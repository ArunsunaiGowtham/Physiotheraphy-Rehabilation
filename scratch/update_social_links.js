const fs = require('fs');
const path = require('path');

const files = [
  'about.html',
  'blog.html',
  'blog-details.html',
  'contact.html',
  'home-2.html',
  'index.html',
  'insurance.html',
  'pricing.html',
  'service-details.html',
  'services.html',
  'therapist-details.html',
  'therapists.html'
];

const oldFooter = `<div class="d-flex gap-2 mt-4">
            <a href="#" class="social-icon-btn" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="social-icon-btn" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
            <a href="#" class="social-icon-btn" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
            <a href="#" class="social-icon-btn" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
            <a href="#" class="social-icon-btn" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
          </div>`;

const newFooter = `<div class="d-flex gap-2 mt-4">
            <a href="https://www.facebook.com/physiolifeclinic" class="social-icon-btn" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
            <a href="https://twitter.com/physiolifeclinic" class="social-icon-btn" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
            <a href="https://www.linkedin.com/company/physiolife-clinic" class="social-icon-btn" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
            <a href="https://www.instagram.com/physiolifeclinic" class="social-icon-btn" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
            <a href="https://www.youtube.com/@physiolifeclinic" class="social-icon-btn" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
          </div>`;

files.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace regardless of line ending (\r\n vs \n)
  const normalizedOld = oldFooter.replace(/\r?\n/g, '\n');
  const normalizedContent = content.replace(/\r?\n/g, '\n');

  if (normalizedContent.includes(normalizedOld)) {
    content = normalizedContent.replace(normalizedOld, newFooter.replace(/\r?\n/g, '\n'));
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated footer in: ${file}`);
  } else {
    // Regex-based replacement
    const regex = /<div class="d-flex gap-2 mt-4">\s*<a href="#" class="social-icon-btn" aria-label="Facebook">[\s\S]*?<\/div>/;
    if (regex.test(content)) {
      content = content.replace(regex, newFooter);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated footer via regex in: ${file}`);
    } else {
      console.warn(`Footer pattern not found in: ${file}`);
    }
  }
});
