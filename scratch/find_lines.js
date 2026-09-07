const fs = require('fs');
const lines = fs.readFileSync('assets/js/blog-engine.js', 'utf8').split('\n');

lines.forEach((line, index) => {
  if (line.includes('chronic-myofascial-pain') || line.includes('tennis-elbow') || line.includes('service-chronic.jpg') || line.includes('step-therapy.jpg') || line.includes('Trigger Point')) {
    console.log(`Line ${index + 1}: ${line.trim()}`);
  }
});
