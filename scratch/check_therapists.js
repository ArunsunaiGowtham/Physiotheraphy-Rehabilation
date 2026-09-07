const fs = require('fs');
const t = fs.readFileSync('therapists.html', 'utf8');
const lines = t.split('\n');
lines.forEach((l, i) => {
  if (l.includes('Dr.') || l.includes('therapist-')) {
    console.log(i + 1, l.trim());
  }
});
