const https = require('https');

function searchCommonsFiles(query) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=5&prop=imageinfo&iiprop=url|size|mime&format=json`;
  https.get(url, { headers: { 'User-Agent': 'PhysioAudit/1.0 (contact: info@physiolife.com)' } }, res => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', () => {
      try {
        const json = JSON.parse(data);
        const pages = json.query ? Object.values(json.query.pages) : [];
        console.log(`\nQuery: "${query}" -> ${pages.length} results:`);
        pages.forEach(p => {
          if (p.imageinfo && p.imageinfo[0]) {
            const info = p.imageinfo[0];
            console.log(`  Title: ${p.title} (${info.width}x${info.height}, ${info.mime})`);
            console.log(`  URL:   ${info.url}`);
          }
        });
      } catch (e) {
        console.error(e.message);
      }
    });
  });
}

searchCommonsFiles('physical therapy ankle');
searchCommonsFiles('neurological examination');
searchCommonsFiles('balance board physiotherapy');
