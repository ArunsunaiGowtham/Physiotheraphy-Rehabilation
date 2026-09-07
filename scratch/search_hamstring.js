const fs = require('fs');

function search(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = `${dir}/${entry.name}`;
    if (entry.isDirectory() && entry.name !== 'node_modules' && entry.name !== '.git') {
      search(fullPath);
    } else if (entry.isFile() && (entry.name.endsWith('.html') || entry.name.endsWith('.js'))) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('hamstring-strain') || content.includes('hamstring-strain-nordic-protocol')) {
        console.log(`Found hamstring reference in: ${fullPath}`);
      }
    }
  }
}

search('.');
