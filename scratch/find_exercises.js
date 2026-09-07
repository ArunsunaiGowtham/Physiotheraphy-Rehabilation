const https = require('https');

const url = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json';
https.get(url, { headers: { 'User-Agent': 'PhysioLife/1.0' } }, res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    try {
      const list = JSON.parse(d);
      const targets = ['bridge', 'dog', 'cobra', 'superman', 'back extension', 'press up', 'glute'];
      targets.forEach(t => {
        const found = list.filter(e => e.name.toLowerCase().includes(t));
        console.log(`\nTarget '${t}' (${found.length}):`);
        found.forEach(f => console.log(`  - ${f.name} (id: ${f.id})`));
      });
    } catch (e) {
      console.log('Error:', e.message);
    }
  });
});
