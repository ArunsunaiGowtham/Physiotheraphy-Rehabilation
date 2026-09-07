const fs = require('fs');
const path = require('path');

const brainDir = path.join('C:', 'Users', 'aruns', '.gemini', 'antigravity-ide', 'brain', '716a1067-0478-4de4-b1a2-53aee5505243');
const targetDir = path.join(__dirname, '..', 'assets', 'images');

// Locate latest generated image files
const files = fs.readdirSync(brainDir);
const hipImg = files.filter(f => f.startsWith('joint_hip_mobility_') && f.endsWith('.jpg')).sort().pop();
const thoracicImg = files.filter(f => f.startsWith('joint_thoracic_mobility_') && f.endsWith('.jpg')).sort().pop();
const shoulderImg = files.filter(f => f.startsWith('joint_shoulder_mobility_') && f.endsWith('.jpg')).sort().pop();

console.log('Hip image found:', hipImg);
console.log('Thoracic image found:', thoracicImg);
console.log('Shoulder image found:', shoulderImg);

if (!hipImg || !thoracicImg || !shoulderImg) {
  console.error('Missing one of the generated images!');
  process.exit(1);
}

// Copy to target locations
fs.copyFileSync(path.join(brainDir, hipImg), path.join(targetDir, 'blog-joint-hip.jpg'));
fs.copyFileSync(path.join(brainDir, hipImg), path.join(targetDir, 'service-joint.jpg'));
console.log('Saved blog-joint-hip.jpg and updated service-joint.jpg');

fs.copyFileSync(path.join(brainDir, thoracicImg), path.join(targetDir, 'blog-joint-thoracic.jpg'));
fs.copyFileSync(path.join(brainDir, thoracicImg), path.join(targetDir, 'service-mobility.jpg'));
console.log('Saved blog-joint-thoracic.jpg and updated service-mobility.jpg');

fs.copyFileSync(path.join(brainDir, shoulderImg), path.join(targetDir, 'blog-joint-shoulder.jpg'));
console.log('Saved blog-joint-shoulder.jpg');

console.log('All images copied successfully!');
