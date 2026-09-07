const https = require('https');

function getImagesForPage(title) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=images&format=json`;
  https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
    let d = '';
    res.on('data', c => d += c);
    res.on('end', () => {
      const data = JSON.parse(d);
      const page = Object.values(data.query.pages)[0];
      console.log(`\nImages for "${title}":`);
      if (page.images) {
        page.images.forEach(img => console.log(' - ' + img.title));
      }
    });
  });
}

getImagesForPage('Sprained ankle');
getImagesForPage('Concussion');
getImagesForPage('Post-concussion syndrome');
getImagesForPage('Physical therapy');
