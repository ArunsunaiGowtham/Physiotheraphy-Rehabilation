const fs = require('fs');
const css = fs.readFileSync('assets/css/style.css', 'utf8');

const matches = css.match(/\.blog[^{]*\{[^}]*\}/g);
if (matches) {
  matches.forEach(m => console.log(m));
} else {
  console.log('No direct .blog rules found, searching for card-img or similar');
  const cardMatches = css.match(/(\.article[^{]*|\.blog-card[^{]*|\.post-thumb[^{]*)\{[^}]*\}/g);
  if (cardMatches) cardMatches.forEach(m => console.log(m));
}
