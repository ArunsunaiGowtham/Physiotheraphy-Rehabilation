const https = require('https');
const fs = require('fs');

// Test downloading a public domain / CC-BY medical rehabilitation / clinic reception image
const testUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Physical_therapy_session.jpg/1280px-Physical_therapy_session.jpg';

const req = https.get(testUrl, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, res => {
  console.log('Status code:', res.statusCode);
  if (res.statusCode === 200) {
    const file = fs.createWriteStream('scratch/test_download.jpg');
    res.pipe(file);
    file.on('finish', () => {
      console.log('Downloaded successfully! File size:', fs.statSync('scratch/test_download.jpg').size);
    });
  } else if (res.statusCode === 301 || res.statusCode === 302) {
    console.log('Redirect to:', res.headers.location);
  }
});
req.on('error', err => console.log('Error:', err.message));
