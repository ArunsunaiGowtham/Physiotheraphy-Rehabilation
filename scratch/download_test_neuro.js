const https = require('https');
const fs = require('fs');

// Wikimedia thumb URL for 1000px
const thumbUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/US_Navy_080812-N-9774H-128_Lt._Cmdr._Louis_Cimoreli_onducts_a_neurological_exam_on_a_patient_at_Juan_Comenius_High_School_during_a_humanitarian_assistance_project.jpg/1000px-US_Navy_080812-N-9774H-128_Lt._Cmdr._Louis_Cimoreli_onducts_a_neurological_exam_on_a_patient_at_Juan_Comenius_High_School_during_a_humanitarian_assistance_project.jpg';

const file = fs.createWriteStream('scratch/test_neuro.jpg');
https.get(thumbUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
  if (res.statusCode === 200) {
    res.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log('Downloaded test_neuro.jpg, size:', fs.statSync('scratch/test_neuro.jpg').size);
    });
  } else {
    console.log('HTTP status:', res.statusCode);
  }
});
