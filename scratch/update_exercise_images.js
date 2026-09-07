const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, '..', 'assets', 'images');

// Backup old mismatched files just in case
const backups = [
  ['exercise-pressup.jpg', 'exercise-pressup.yoga-backup.jpg'],
  ['exercise-bridge.jpg', 'exercise-bridge.yoga-backup.jpg'],
  ['exercise-birddog.jpg', 'exercise-birddog.yoga-backup.jpg']
];

backups.forEach(([src, dest]) => {
  const srcPath = path.join(imgDir, src);
  const destPath = path.join(imgDir, dest);
  if (fs.existsSync(srcPath) && !fs.existsSync(destPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Backed up ${src} to ${dest}`);
  }
});

// Copy authentic clinical images to match the exercise cards
const replacements = [
  ['blog-mckenzie-pressup.jpg', 'exercise-pressup.jpg'],
  ['blog-pelvic-tilt.jpg', 'exercise-bridge.jpg'],
  ['blog-core-birddog.jpg', 'exercise-birddog.jpg']
];

replacements.forEach(([clinicalImg, targetImg]) => {
  const srcPath = path.join(imgDir, clinicalImg);
  const destPath = path.join(imgDir, targetImg);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    const size = fs.statSync(destPath).size;
    console.log(`Updated ${targetImg} with clinical image ${clinicalImg} (${size} bytes)`);
  } else {
    console.error(`Source ${clinicalImg} does not exist!`);
  }
});
