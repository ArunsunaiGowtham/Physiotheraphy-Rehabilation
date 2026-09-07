const fs = require('fs');
const path = require('path');

const artifactDir = 'C:/Users/aruns/.gemini/antigravity-ide/brain/293880fc-c9e2-4dfb-af46-5d6af8b3a249';

const copies = [
  {
    src: path.join(artifactDir, 'sciatica_rehab_exercise_1788548165971.jpg'),
    dest: 'assets/images/blog-sciatica.jpg'
  },
  {
    src: path.join(artifactDir, 'knee_osteoarthritis_rehab_1788548185535.jpg'),
    dest: 'assets/images/blog-knee-osteo.jpg'
  },
  {
    src: path.join(artifactDir, 'dry_needling_therapy_1788548204876.jpg'),
    dest: 'assets/images/blog-dry-needling.jpg'
  },
  {
    src: path.join(artifactDir, 'nerve_flossing_exercise_1788548222298.jpg'),
    dest: 'assets/images/exercise-floss.jpg'
  },
  {
    src: path.join(artifactDir, 'tennis_elbow_rehab_1788548239950.jpg'),
    dest: 'assets/images/blog-tennis-elbow.jpg'
  }
];

// Backup old files if needed
if (!fs.existsSync('assets/images/blog-sciatica-old.jpg') && fs.existsSync('assets/images/blog-sciatica.jpg')) {
  fs.copyFileSync('assets/images/blog-sciatica.jpg', 'assets/images/blog-sciatica-old.jpg');
}
if (!fs.existsSync('assets/images/blog-knee-osteo-old.jpg') && fs.existsSync('assets/images/blog-knee-osteo.jpg')) {
  fs.copyFileSync('assets/images/blog-knee-osteo.jpg', 'assets/images/blog-knee-osteo-old.jpg');
}
if (!fs.existsSync('assets/images/exercise-floss-old.jpg') && fs.existsSync('assets/images/exercise-floss.jpg')) {
  fs.copyFileSync('assets/images/exercise-floss.jpg', 'assets/images/exercise-floss-old.jpg');
}

copies.forEach(({ src, dest }) => {
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    const stat = fs.statSync(dest);
    console.log(`Successfully copied ${src} -> ${dest} (${stat.size} bytes)`);
  } else {
    console.error(`ERROR: Source file does not exist: ${src}`);
  }
});
