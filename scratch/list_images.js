const fs = require('fs');
const files = fs.readdirSync('assets/images');
console.log('Total files in assets/images:', files.length);
files.filter(f => f.endsWith('.jpg') || f.endsWith('.png') || f.endsWith('.webp') || f.endsWith('.svg')).forEach(f => {
  const stat = fs.statSync(`assets/images/${f}`);
  console.log(`${f} (${stat.size} bytes)`);
});
