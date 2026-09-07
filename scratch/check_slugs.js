const fs = require('fs');

const files = ['blog.html', 'blog-details.html', 'home-2.html', 'index.html'];
const searchSlugs = [
  '5-proven-exercises-for-sciatica',
  'understanding-knee-osteoarthritis',
  'chronic-myofascial-pain',
  'nerve-flossing',
  'plantar-fasciitis',
  'tennis-elbow'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    const text = fs.readFileSync(file, 'utf8');
    searchSlugs.forEach(slug => {
      if (text.includes(slug)) {
        console.log(`Found ${slug} in ${file}`);
      }
    });
  }
});
