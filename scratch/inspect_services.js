const fs = require('fs');
const content = fs.readFileSync('assets/js/service-engine.js', 'utf8');

// Find all keys defined inside SERVICES_DATA
const re = /['"]([a-z0-9-]+)['"]\s*:\s*\{\s*id\s*:/g;
let match;
const keys = [];
while ((match = re.exec(content)) !== null) {
  keys.push(match[1]);
}
console.log('Services in engine:', keys);

// Find aliasMap
const aliasIdx = content.indexOf('aliasMap');
if (aliasIdx !== -1) {
  console.log('aliasMap snippet:\n', content.substring(aliasIdx, aliasIdx + 500));
}
