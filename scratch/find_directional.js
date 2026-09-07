const fs = require('fs');

const css = fs.readFileSync('assets/css/style.css', 'utf8');
const lines = css.split('\n');

const directionalProps = [];
lines.forEach((line, i) => {
  if (/(?:margin|padding|inset)-(?:left|right)|float:\s*(?:left|right)|text-align:\s*(?:left|right)/i.test(line)) {
    directionalProps.push({ line: i + 1, content: line.trim() });
  }
});

console.log(`Found ${directionalProps.length} directional properties:`);
directionalProps.slice(0, 30).forEach(p => console.log(`L${p.line}: ${p.content}`));
