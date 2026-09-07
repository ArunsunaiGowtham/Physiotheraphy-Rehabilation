const fs = require('fs');
const path = require('path');

const brainDir = 'C:\\Users\\aruns\\.gemini\\antigravity-ide\\brain\\716a1067-0478-4de4-b1a2-53aee5505243';

const replacements = [
  {
    src: path.join(brainDir, 'service_sports_pt_1788715538732.jpg'),
    dest: 'assets/images/service-sports.jpg',
    name: '1. Sports Injury Rehabilitation'
  },
  {
    src: path.join(brainDir, 'service_chronic_pt_1788715555857.jpg'),
    dest: 'assets/images/service-chronic.jpg',
    name: '3. Chronic Pain Management'
  },
  {
    src: path.join(brainDir, 'service_spine_pt_1788715577533.jpg'),
    dest: 'assets/images/service-spine.jpg',
    name: '4. Back & Neck Pain Therapy'
  },
  {
    src: path.join(brainDir, 'service_neuro_pt_1788715597448.jpg'),
    dest: 'assets/images/service-neuro.jpg',
    name: '7. Neurological Rehabilitation'
  },
  {
    src: path.join(brainDir, 'service_senior_pt_1788715619621.jpg'),
    dest: 'assets/images/service-senior.jpg',
    name: '8. Senior Physiotherapy & Balance'
  },
  {
    src: path.join(brainDir, 'service_home_pt_1788715742406.jpg'),
    dest: 'assets/images/service-home.jpg',
    name: '9. Home Visit Physiotherapy'
  }
];

replacements.forEach(item => {
  if (fs.existsSync(item.src)) {
    fs.copyFileSync(item.src, item.dest);
    const stat = fs.statSync(item.dest);
    console.log(`[SUCCESS] Copied ${item.name} -> ${item.dest} (${(stat.size / 1024).toFixed(1)} KB)`);
  } else {
    console.error(`[ERROR] Source file not found: ${item.src}`);
  }
});
