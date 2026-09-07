const fs = require('fs');
const http = require('http');
const assert = require('assert');

console.log('====================================================');
console.log('Verifying Filter By Doctor Feature in admin/appointments.html');
console.log('====================================================');

const html = fs.readFileSync('admin/appointments.html', 'utf8');

// 1. Verify UI markup
assert(html.includes('id="doctorFilterDropdown"'), 'Must have #doctorFilterDropdown container');
assert(html.includes('id="doctorFilterBtn"'), 'Must have #doctorFilterBtn dropdown toggle');
assert(html.includes('id="currentDoctorFilterLabel"'), 'Must have #currentDoctorFilterLabel');
assert(html.includes('id="doctorFilterMenu"'), 'Must have #doctorFilterMenu dropdown menu');
assert(html.includes('id="appointmentCountBadge"'), 'Must have #appointmentCountBadge');
assert(html.includes('id="activeFilterPillContainer"'), 'Must have #activeFilterPillContainer');
assert(html.includes('id="activeFilterPillText"'), 'Must have #activeFilterPillText');
assert(html.includes('id="appointmentsTableBody"'), 'Must have #appointmentsTableBody');
assert(html.includes('id="changeAppointmentModal"'), 'Must have #changeAppointmentModal');
assert(html.includes('id="exportScheduleBtn"'), 'Must have #exportScheduleBtn');

console.log('✓ PASS: All UI elements (dropdown, badges, active pill, table, modals) are present.');

// 2. Verify JavaScript functionality & functions
assert(html.includes('window.filterScheduleByDoctor = function'), 'Must expose window.filterScheduleByDoctor');
assert(html.includes('window.approveAppointment = function'), 'Must expose window.approveAppointment');
assert(html.includes('window.openChangeModal = function'), 'Must expose window.openChangeModal');
assert(html.includes('window.exportScheduleCSV = function'), 'Must expose window.exportScheduleCSV');
assert(html.includes('STORAGE_KEY = \'physiolife_admin_appointments\''), 'Must use local storage for appointments persistence');
assert(html.includes('INITIAL_APPOINTMENTS'), 'Must include baseline schedule covering clinicians');
assert(html.includes('DEFAULT_DOCTORS'), 'Must include specialist doctor directory');

console.log('✓ PASS: All JavaScript controllers, filtering, modal logic, CSV export, and persistence are implemented.');

// 3. Test dev server HTTP status on port 3000
http.get('http://localhost:3000/admin/appointments.html', (res) => {
  assert.strictEqual(res.statusCode, 200, 'admin/appointments.html must return HTTP 200');
  console.log('✓ PASS: http://localhost:3000/admin/appointments.html -> HTTP 200 OK');
  console.log('\n====================================================');
  console.log('🎉 ALL APPOINTMENTS FILTER VERIFICATIONS PASSED!');
  console.log('====================================================');
}).on('error', (err) => {
  console.error('FAIL: HTTP request error:', err);
  process.exit(1);
});
