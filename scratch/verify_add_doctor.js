const fs = require('fs');
const http = require('http');
const assert = require('assert');

console.log('====================================================');
console.log('Verifying Add Doctor Feature in Admin Portal');
console.log('====================================================');

// 1. Verify admin/therapists.html markup & logic
const html = fs.readFileSync('admin/therapists.html', 'utf8');

assert(html.includes('id="addTherapistModal"'), 'Must have #addTherapistModal');
assert(html.includes('id="addTherapistForm"'), 'Must have #addTherapistForm');
assert(html.includes('id="newDocName"'), 'Must have #newDocName input');
assert(html.includes('id="newDocEmail"'), 'Must have #newDocEmail input');
assert(html.includes('id="newDocDept"'), 'Must have #newDocDept select');
assert(html.includes('id="newDocQuals"'), 'Must have #newDocQuals input');
assert(html.includes('id="newDocCaseload"'), 'Must have #newDocCaseload input');
assert(html.includes('id="newDocRating"'), 'Must have #newDocRating input');
assert(html.includes('id="newDocStatus"'), 'Must have #newDocStatus select');
assert(html.includes('id="newDocLicense"'), 'Must have #newDocLicense input');
assert(html.includes('id="newDocAvatar"'), 'Must have #newDocAvatar select');
assert(html.includes('id="therapistsTableBody"'), 'Must have #therapistsTableBody');
assert(html.includes('id="therapistCount"'), 'Must have #therapistCount');
assert(html.includes('STORAGE_KEY = \'physiolife_admin_therapists\''), 'Must use localStorage for persistence');
assert(html.includes('window.removeDoctor'), 'Must support removing doctors');

console.log('✓ PASS: admin/therapists.html has complete modal form, inputs, and persistence logic.');

// 2. Verify HTTP 200 on dev server
http.get('http://127.0.0.1:8080/admin/therapists.html', (res) => {
  assert.strictEqual(res.statusCode, 200, 'admin/therapists.html must return HTTP 200');
  console.log('✓ PASS: http://127.0.0.1:8080/admin/therapists.html -> HTTP 200 OK');
  console.log('\n====================================================');
  console.log('🎉 ALL ADD DOCTOR VERIFICATIONS PASSED!');
  console.log('====================================================');
}).on('error', (err) => {
  console.error('FAIL: HTTP request error:', err);
  process.exit(1);
});
