const https = require('https');

const title = 'File:US Navy 080812-N-9774H-128 Lt. Cmdr. Louis Cimoreli onducts a neurological exam on a patient at Juan Comenius High School during a humanitarian assistance project.jpg';
const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=imageinfo&iiprop=url|size&format=json`;

https.get(url, { headers: { 'User-Agent': 'PhysioAudit/1.0' } }, res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    const data = JSON.parse(d);
    console.log(Object.values(data.query.pages)[0].imageinfo[0]);
  });
});
