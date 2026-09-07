const fs = require('fs');

const searchTerms = [
  'postop-knee-rehab.jpg',
  'blog-knee-osteo.jpg',
  'blog-sciatica.jpg',
  'service-chronic.jpg',
  'exercise-floss.jpg',
  'blog-plantar-fasciitis.jpg',
  'step-therapy.jpg',
  'exercise-pressup.jpg'
];

function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = `${dir}/${entry.name}`;
    if (entry.isDirectory() && entry.name !== 'node_modules' && entry.name !== '.git') {
      scanDir(fullPath);
    } else if (entry.isFile() && (entry.name.endsWith('.html') || entry.name.endsWith('.js'))) {
      const content = fs.readFileSync(fullPath, 'utf8');
      for (const term of searchTerms) {
        if (content.includes(term)) {
          console.log(`Found "${term}" in: ${fullPath}`);
        }
      }
    }
  }
}

scanDir('.');
