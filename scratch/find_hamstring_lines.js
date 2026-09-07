const fs = require('fs');
const lines = fs.readFileSync('assets/js/blog-engine.js', 'utf8').split('\n');

lines.forEach((line, idx) => {
  if (line.includes('hamstring-strain') || line.includes('hamstring-strain-nordic-protocol') || line.includes('Hamstring Strain')) {
    console.log(`Line ${idx + 1}: ${line.trim()}`);
  }
});
