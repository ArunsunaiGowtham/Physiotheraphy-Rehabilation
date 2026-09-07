const https = require('https');

function searchCommons(query, callback) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrlimit=10&prop=imageinfo&iiprop=url|size|extmetadata&format=json`;
  
  https.get(url, { headers: { 'User-Agent': 'PhysioLifeAudit/1.0 (medical-edu)' } }, (res) => {
    let data = '';
    res.on('data', chunk => { data += chunk; });
    res.on('end', () => {
      try {
        const json = JSON.parse(data);
        const pages = json.query ? Object.values(json.query.pages) : [];
        console.log(`\n=== Query: "${query}" (found ${pages.length}) ===`);
        pages.forEach(p => {
          if (p.imageinfo && p.imageinfo[0]) {
            const info = p.imageinfo[0];
            console.log(`- Title: ${p.title}`);
            console.log(`  URL:   ${info.url}`);
            console.log(`  Size:  ${info.width}x${info.height}`);
          }
        });
      } catch (e) {
        console.error('Parse error:', e.message);
      }
      if (callback) callback();
    });
  }).on('error', (err) => {
    console.error('Request error:', err.message);
    if (callback) callback();
  });
}

searchCommons('physical therapy ankle rehabilitation', () => {
  searchCommons('neurological exam concussion physical therapy', () => {
    searchCommons('vestibular physical therapy balance', () => {
      console.log('\nSearch completed.');
    });
  });
});
