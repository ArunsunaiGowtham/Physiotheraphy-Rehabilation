const https = require('https');

function getImageURL(filename) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(filename)}&prop=imageinfo&iiprop=url|size&format=json`;
  https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
    let d = '';
    res.on('data', c => d += c);
    res.on('end', () => {
      const data = JSON.parse(d);
      const page = Object.values(data.query.pages)[0];
      console.log(filename, page.imageinfo[0]);
    });
  });
}

getImageURL('File:Rehabilitation Exercises for an ankle sprain.jpg');
getImageURL('File:Physical Therapists at work.jpg');
getImageURL('File:Physiotherapiebehandlung.jpg');
