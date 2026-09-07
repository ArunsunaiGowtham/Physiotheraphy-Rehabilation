const https = require('https');

function searchCommons(query) {
  return new Promise((resolve, reject) => {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srnamespace=6&format=json`;
    https.get(url, { headers: { 'User-Agent': 'PhysioLifeClinic/1.0 (contact@physiolife.com)' } }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json.query ? json.query.search : []);
        } catch (e) {
          resolve([]);
        }
      });
    }).on('error', reject);
  });
}

function getFileUrl(title) {
  return new Promise((resolve, reject) => {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=imageinfo&iiprop=url|size|mime|derivatives&format=json`;
    https.get(url, { headers: { 'User-Agent': 'PhysioLifeClinic/1.0 (contact@physiolife.com)' } }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query.pages;
          const page = Object.values(pages)[0];
          if (page && page.imageinfo && page.imageinfo[0]) {
            resolve(page.imageinfo[0]);
          } else {
            resolve(null);
          }
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', reject);
  });
}

async function run() {
  const queries = [
    'McKenzie exercise filetype:video',
    'prone press up filetype:video',
    'cobra pose filetype:video',
    'bhujangasana filetype:video',
    'glute bridge filetype:video',
    'bridge exercise filetype:video',
    'pelvic tilt filetype:video',
    'bird dog exercise filetype:video',
    'quadruped filetype:video',
    'nerve flossing filetype:video',
    'leg raise filetype:video',
    'stretch exercise filetype:video',
    'extension exercise filetype:video',
    'physiotherapy exercise filetype:video',
    'rehabilitation exercise filetype:video'
  ];

  for (const q of queries) {
    const results = await searchCommons(q);
    console.log(`\n=== Query: "${q}" (found ${results.length}) ===`);
    for (const r of results.slice(0, 5)) {
      console.log(` - ${r.title}`);
      const info = await getFileUrl(r.title);
      if (info) {
        console.log(`   URL: ${info.url}`);
        console.log(`   Mime: ${info.mime}, Size: ${info.size}`);
      }
    }
  }
}

run();
