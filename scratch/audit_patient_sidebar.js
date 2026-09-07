const fs = require('fs');
const path = require('path');

const pDir = path.join(__dirname, '..', 'patient');
const files = fs.readdirSync(pDir).filter(f => f.endsWith('.html'));

const expectedKeys = [
  'dashboard.html',
  'appointments.html',
  'treatment-plans.html',
  'exercises.html',
  'attendance.html',
  'payments.html',
  'receipts.html',
  'profile.html'
];

console.log('Patient files:', files);
files.forEach(file => {
  const content = fs.readFileSync(path.join(pDir, file), 'utf8');
  console.log(`=== ${file} ===`);
  expectedKeys.forEach(k => {
    const has = content.includes(`href="${k}"`);
    if (!has) console.log(`  MISSING LINK: ${k}`);
  });
  if (!content.includes('backToWebsiteBtn')) console.log('  MISSING: backToWebsiteBtn');
  const hasLogin = content.includes('href="../login.html"');
  const hasPatientLogin = content.includes('href="../patient-login.html"');
  console.log(`  Sign Out target: login.html=${hasLogin}, patient-login.html=${hasPatientLogin}`);
});
