const fs = require('fs');
const path = require('path');

const videoDir = path.join(__dirname, '..', 'assets', 'videos');
const files = fs.readdirSync(videoDir).filter(f => f.endsWith('.mp4'));

files.forEach(f => {
  console.log('==============================================');
  console.log('File:', f);
  const filePath = path.join(videoDir, f);
  const buf = fs.readFileSync(filePath);
  console.log('Size:', buf.length, 'bytes');

  // Find printable strings of length >= 5 in the first 64KB and last 64KB
  const checkBuffers = [
    buf.slice(0, Math.min(buf.length, 65536)),
    buf.slice(Math.max(0, buf.length - 65536))
  ];

  const foundStrings = new Set();
  checkBuffers.forEach(chunk => {
    let current = '';
    for (let i = 0; i < chunk.length; i++) {
      const byte = chunk[i];
      if (byte >= 32 && byte <= 126) {
        current += String.fromCharCode(byte);
      } else {
        if (current.length >= 6) {
          // filter out common codecs/tech strings unless informative
          if (!current.match(/^(isom|mp42|avc1|dash|und|vide|soun|appl|core|stbl|vmhd|smhd|dinf|stts|stsc|stsz|stco|edts|elst|mdia|minf)/i)) {
            foundStrings.add(current);
          }
        }
        current = '';
      }
    }
  });

  console.log('Strings found:');
  Array.from(foundStrings).slice(0, 30).forEach(s => console.log('  -', s));
});
