const https = require('https');

function getPhotoDirectUrl(slug) {
  const url = `https://unsplash.com/photos/${slug}`;
  https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, res => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      const match = data.match(/https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9\-_?=;&]+/g);
      if (match) {
        console.log(`Found image for ${slug}:`, match[0]);
      } else {
        console.log(`No direct match found for ${slug}`);
      }
    });
  });
}

getPhotoDirectUrl('5mowRsGE6ec');
getPhotoDirectUrl('aRtkknsuLsw');
