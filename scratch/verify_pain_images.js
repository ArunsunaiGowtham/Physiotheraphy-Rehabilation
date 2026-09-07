const fs = require('fs');
const crypto = require('crypto');

const images = [
  { id: 'sciatica-exercises', path: 'assets/images/blog-sciatica.jpg', topic: 'Sciatica / Lower Back Relief' },
  { id: 'knee-osteoarthritis', path: 'assets/images/blog-knee-osteo.jpg', topic: 'Knee Osteoarthritis / Joint Movement' },
  { id: 'chronic-myofascial-pain', path: 'assets/images/blog-dry-needling.jpg', topic: 'Chronic Myofascial Pain / Dry Needling' },
  { id: 'nerve-flossing', path: 'assets/images/exercise-floss.jpg', topic: 'Sciatic Nerve Flossing / Neural Mobilization' },
  { id: 'plantar-fasciitis', path: 'assets/images/blog-plantar-fasciitis.jpg', topic: 'Plantar Fasciitis / Shockwave Therapy' },
  { id: 'tennis-elbow', path: 'assets/images/blog-tennis-elbow.jpg', topic: 'Tennis Elbow / Wrist Extensor Loading' }
];

console.log('=== VERIFYING PAIN RELIEF IMAGES ===');
const hashes = new Set();
let allValid = true;

images.forEach((img, i) => {
  const exists = fs.existsSync(img.path);
  if (!exists) {
    console.error(`[FAIL] ${img.id}: File does not exist: ${img.path}`);
    allValid = false;
    return;
  }
  const stat = fs.statSync(img.path);
  const buffer = fs.readFileSync(img.path);
  const hash = crypto.createHash('sha256').update(buffer).digest('hex').substring(0, 12);
  const isDuplicate = hashes.has(hash);
  hashes.add(hash);

  console.log(`[${i+1}] ${img.id}`);
  console.log(`    File: ${img.path}`);
  console.log(`    Size: ${stat.size} bytes`);
  console.log(`    Hash: ${hash}`);
  console.log(`    Duplicate: ${isDuplicate}`);
  console.log(`    Topic: ${img.topic}`);
  if (isDuplicate) allValid = false;
});

console.log('-----------------------------------');
console.log('All 6 images exist and unique:', allValid);
