const https = require('https');

function testNapi(query) {
  const url = `https://unsplash.com/napi/search/photos?query=${encodeURIComponent(query)}&per_page=5`;
  https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, res => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      try {
        const json = JSON.parse(data);
        console.log(`\nResults for "${query}": ${json.results ? json.results.length : 0}`);
        if (json.results) {
          json.results.forEach((r, i) => {
            console.log(`[${i+1}] ID: ${r.id}`);
            console.log(`    Desc: ${r.description || r.alt_description}`);
            console.log(`    Raw:  ${r.urls.raw}`);
            console.log(`    Reg:  ${r.urls.regular}`);
          } );
        }
      } catch (e) {
        console.log(`Error parsing for ${query}:`, e.message);
      }
    });
  }).on('error', err => console.log('HTTP err:', err.message));
}

testNapi('ankle physical therapy');
testNapi('concussion physical therapy');
testNapi('balance board rehabilitation');
