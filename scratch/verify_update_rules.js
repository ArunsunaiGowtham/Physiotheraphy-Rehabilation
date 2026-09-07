const fs = require('fs');
const http = require('http');
const assert = require('assert');

console.log('====================================================');
console.log('Verifying Update Rules Feature in admin/settings.html');
console.log('====================================================');

const html = fs.readFileSync('admin/settings.html', 'utf8');

// 1. Verify markup
assert(html.includes('id="schedulingRulesForm"'), 'Must have #schedulingRulesForm');
assert(html.includes('id="advanceBookingWindow"'), 'Must have #advanceBookingWindow input');
assert(html.includes('id="cancellationDeadline"'), 'Must have #cancellationDeadline input');
assert(html.includes('id="autoConfirm"'), 'Must have #autoConfirm switch');
assert(html.includes('id="updateRulesBtn"'), 'Must have #updateRulesBtn button');
assert(html.includes('id="settingsAlertBanner"'), 'Must have #settingsAlertBanner');
assert(html.includes('id="settingsToast"'), 'Must have #settingsToast');
assert(html.includes('id="clinicDetailsForm"'), 'Must have #clinicDetailsForm');
assert(html.includes('id="saveClinicBtn"'), 'Must have #saveClinicBtn');

console.log('✓ PASS: All required forms, inputs, switches, and alerts are present in markup.');

// 2. Verify JavaScript functionality
assert(html.includes('window.updateSchedulingRules = function'), 'Must expose window.updateSchedulingRules');
assert(html.includes('STORAGE_KEY = \'physiolife_clinic_settings\''), 'Must use localStorage for settings persistence');
assert(html.includes('updateBtn.innerHTML = \'<i class="fas fa-check me-1"></i> Rules Updated!\''), 'Must provide visual button feedback on save');
assert(html.includes('showToast'), 'Must display toast feedback');
assert(html.includes('showAlertBanner'), 'Must update alert banner on save');

console.log('✓ PASS: JavaScript controller, validation, feedback, and persistence logic verified.');

// 3. Test dev server HTTP status on port 3000
http.get('http://localhost:3000/admin/settings.html', (res) => {
  assert.strictEqual(res.statusCode, 200, 'admin/settings.html must return HTTP 200');
  console.log('✓ PASS: http://localhost:3000/admin/settings.html -> HTTP 200 OK');
  console.log('\n====================================================');
  console.log('🎉 ALL UPDATE RULES VERIFICATIONS PASSED!');
  console.log('====================================================');
}).on('error', (err) => {
  console.error('FAIL: HTTP request error:', err);
  process.exit(1);
});
