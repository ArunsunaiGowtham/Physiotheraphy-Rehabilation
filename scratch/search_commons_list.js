const https = require('https');

function searchCommons(term) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(term)}&srnamespace=6&format=json`;
  https.get(url, { headers: { 'User-Agent': 'PhysioLife/1.0' } }, res => {
    let d = '';
    res.on('data', c => d += c);
    res.on('end', () => {
      try {
        const json = JSON.parse(d);
        console.log(`\nResults for "${term}": ${json.query.search.length}`);
        json.query.search.slice(0, 5).forEach(s => console.log(' - ' + s.title));
      } catch (e) {
        console.log(e.message);
      }
    });
  });
}

searchCommons('ankle physical therapy');
searchCommons('neurological exam');
searchCommons('concussion test');
searchCommons('balance board');
searchCommons('sprained ankle');
