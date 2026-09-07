const fs = require('fs');

const files = ['index.html', 'home-2.html', 'about.html', 'services.html', 'service-details.html'];
files.forEach(f => {
  if (fs.existsSync(f)) {
    const c = fs.readFileSync(f, 'utf8');
    const matches = c.match(/href=["']service-details\.html[^"']*["']/g) || [];
    console.log(f, 'count:', matches.length, matches);
  }
});
