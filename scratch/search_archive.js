const https = require('https');

function searchArchive(query) {
  return new Promise((resolve) => {
    const url = `https://archive.org/advancedsearch.php?q=${encodeURIComponent(query + ' AND mediatype:movies')}&fl[]=identifier,title,description&rows=5&page=1&output=json`;
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try {
          const json = JSON.parse(d);
          resolve(json.response ? json.response.docs : []);
        } catch (e) {
          resolve([]);
        }
      });
    }).on('error', () => resolve([]));
  });
}

function getFiles(identifier) {
  return new Promise((resolve) => {
    const url = `https://archive.org/metadata/${identifier}/files`;
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try {
          const json = JSON.parse(d);
          const mp4s = (json.result || []).filter(f => f.name && f.name.endsWith('.mp4'));
          resolve(mp4s.map(f => `https://archive.org/download/${identifier}/${encodeURIComponent(f.name)}`));
        } catch (e) {
          resolve([]);
        }
      });
    }).on('error', () => resolve([]));
  });
}

async function main() {
  const terms = ['glute bridge', 'bird dog', 'back extension', 'rehabilitation exercises', 'yoga cobra'];
  for (const t of terms) {
    const docs = await searchArchive(t);
    console.log(`\n=== Term: "${t}" (${docs.length}) ===`);
    for (const d of docs) {
      console.log(`Identifier: ${d.identifier} | Title: ${d.title}`);
      const files = await getFiles(d.identifier);
      if (files.length) {
        console.log(`  MP4: ${files[0]}`);
      }
    }
  }
}

main();
