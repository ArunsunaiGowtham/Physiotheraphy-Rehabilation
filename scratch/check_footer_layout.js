const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  if (content.includes('site-footer')) {
    const rowMatch = content.match(/<footer class="site-footer"[\s\S]*?<div class="row g-5">([\s\S]*?)<\/div>\s*<div class="footer-bottom/);
    if (rowMatch) {
      const cols = [...rowMatch[1].matchAll(/<div class="([^"]*col[^"]*)"/g)].map(m => m[1]);
      console.log(`${f}: ${cols.join(' | ')}`);
    } else {
      console.log(`${f}: footer found but row pattern didn't match`);
    }
  }
});
