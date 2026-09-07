const fs = require('fs');
const lines = fs.readFileSync('assets/js/service-engine.js', 'utf8').split('\n');
lines.forEach((l, idx) => {
  const m = l.match(/^\s*['"]([a-z0-9-]+)['"]\s*:\s*\{/);
  if (m) {
    console.log(`Line ${idx + 1}: ${m[1]}`);
  }
});
