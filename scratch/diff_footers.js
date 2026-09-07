const fs = require('fs');

const indexFooter = fs.readFileSync('index.html', 'utf8').match(/<footer class="site-footer">([\s\S]*?)<\/footer>/)[1];
const contactFooter = fs.readFileSync('contact.html', 'utf8').match(/<footer class="site-footer">([\s\S]*?)<\/footer>/)[1];

console.log('Index footer lines:', indexFooter.split('\n').length);
console.log('Contact footer lines:', contactFooter.split('\n').length);

const diff = [];
const lines1 = indexFooter.split('\n');
const lines2 = contactFooter.split('\n');

for (let i = 0; i < Math.max(lines1.length, lines2.length); i++) {
  if (lines1[i] !== lines2[i]) {
    diff.push({ line: i + 1, index: lines1[i], contact: lines2[i] });
  }
}
console.log('Differences count:', diff.length);
console.log('Sample differences:', diff.slice(0, 10));
