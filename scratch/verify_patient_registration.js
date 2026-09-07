const fs = require('fs');
const http = require('http');
const assert = require('assert');

console.log('====================================================');
console.log('Verifying Register New Patient Feature in admin/users.html');
console.log('====================================================');

const html = fs.readFileSync('admin/users.html', 'utf8');

// 1. Verify markup
assert(html.includes('id="registerNewPatientBtn"'), 'Must have #registerNewPatientBtn');
assert(html.includes('id="addPatientModal"'), 'Must have #addPatientModal');
assert(html.includes('id="registerPatientForm"'), 'Must have #registerPatientForm');
assert(html.includes('id="newPatientFirstName"'), 'Must have #newPatientFirstName');
assert(html.includes('id="newPatientLastName"'), 'Must have #newPatientLastName');
assert(html.includes('id="newPatientEmail"'), 'Must have #newPatientEmail');
assert(html.includes('id="newPatientPhone"'), 'Must have #newPatientPhone');
assert(html.includes('id="newPatientCondition"'), 'Must have #newPatientCondition');
assert(html.includes('id="newPatientDoctor"'), 'Must have #newPatientDoctor');
assert(html.includes('id="submitRegisterPatientBtn"'), 'Must have #submitRegisterPatientBtn');
assert(html.includes('id="patientsTableBody"'), 'Must have #patientsTableBody');
assert(html.includes('id="patientTableCountBadge"'), 'Must have #patientTableCountBadge');
assert(html.includes('id="viewPatientChartModal"'), 'Must have #viewPatientChartModal');
assert(html.includes('id="editPatientModal"'), 'Must have #editPatientModal');

console.log('✓ PASS: All required patient registration and chart elements are present in markup.');

// 2. Verify JavaScript functionality
assert(html.includes('window.openRegisterPatientModal = function'), 'Must expose window.openRegisterPatientModal');
assert(html.includes('window.registerNewPatient = function'), 'Must expose window.registerNewPatient');
assert(html.includes('window.viewPatientChart = function'), 'Must expose window.viewPatientChart');
assert(html.includes('window.openEditPatientModal = function'), 'Must expose window.openEditPatientModal');
assert(html.includes('STORAGE_KEY = \'physiolife_admin_patients\''), 'Must persist patients in localStorage');

console.log('✓ PASS: JavaScript controllers for registration, EHR view, and edits are implemented.');

// 3. Test dev server HTTP status on port 3000
http.get('http://localhost:3000/admin/users.html', (res) => {
  assert.strictEqual(res.statusCode, 200, 'admin/users.html must return HTTP 200');
  console.log('✓ PASS: http://localhost:3000/admin/users.html -> HTTP 200 OK');
  console.log('\n====================================================');
  console.log('🎉 ALL REGISTER NEW PATIENT VERIFICATIONS PASSED!');
  console.log('====================================================');
}).on('error', (err) => {
  console.error('FAIL: HTTP request error:', err);
  process.exit(1);
});
