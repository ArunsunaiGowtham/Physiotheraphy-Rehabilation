const https = require('https');

function searchWiki(term) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(term)}&format=json`;
  https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
    let d = '';
    res.on('data', c => d += c);
    res.on('end', () => {
      console.log(term, d.substring(0, 300));
    });
  });
}

searchWiki('Sprained ankle');
searchWiki('Vestibular ocular reflex');
