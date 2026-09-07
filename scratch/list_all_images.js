const fs = require('fs');

console.log('=== ASSETS/IMAGES FILES ===');
const assetImages = fs.readdirSync('assets/images');
assetImages.forEach(f => {
  const stat = fs.statSync(`assets/images/${f}`);
  console.log(`${f} (${stat.size} bytes)`);
});

console.log('\n=== ARTIFACT DIRECTORY IMAGES ===');
const artifactDir = 'C:/Users/aruns/.gemini/antigravity-ide/brain/293880fc-c9e2-4dfb-af46-5d6af8b3a249';
const artFiles = fs.readdirSync(artifactDir);
artFiles.filter(f => f.endsWith('.jpg') || f.endsWith('.png')).forEach(f => {
  const stat = fs.statSync(`${artifactDir}/${f}`);
  console.log(`${f} (${stat.size} bytes)`);
});
