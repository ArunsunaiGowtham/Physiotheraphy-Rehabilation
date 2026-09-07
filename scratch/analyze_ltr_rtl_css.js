const fs = require('fs');

const cssFiles = ['assets/css/style.css', 'assets/css/rtl.css', 'assets/css/dashboard.css'];

cssFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  console.log(`\n=== Analyzing ${file} ===`);
  const lines = content.split('\n');
  lines.forEach((l, i) => {
    if (/transform:\s*translateX\(/i.test(l) ||
        /float:\s*(?:left|right)/i.test(l) ||
        /text-align:\s*(?:left|right)/i.test(l) ||
        /(?:left|right):\s*-\d+/i.test(l)) {
      console.log(`L${i + 1}: ${l.trim()}`);
    }
  });
});
