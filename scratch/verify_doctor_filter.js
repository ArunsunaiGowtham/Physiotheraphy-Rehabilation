const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

console.log('--- Verifying Filter By Doctor Functionality in admin/appointments.html ---');

const htmlPath = path.join(__dirname, '..', 'admin', 'appointments.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Load HTML in JSDOM with script execution enabled
const dom = new JSDOM(htmlContent, {
  runScripts: 'dangerously',
  resources: 'usable',
  url: 'http://localhost:3000/admin/appointments.html'
});

const window = dom.window;
const document = window.document;

function assert(condition, message) {
  if (!condition) {
    console.error('FAIL: ' + message);
    process.exit(1);
  } else {
    console.log('PASS: ' + message);
  }
}

// 1. Verify key DOM elements exist
const filterBtn = document.getElementById('doctorFilterBtn');
assert(!!filterBtn, '#doctorFilterBtn exists');

const filterMenu = document.getElementById('doctorFilterMenu');
assert(!!filterMenu, '#doctorFilterMenu exists');

const countBadge = document.getElementById('appointmentCountBadge');
assert(!!countBadge, '#appointmentCountBadge exists');

const activeFilterPill = document.getElementById('activeFilterPillContainer');
assert(!!activeFilterPill, '#activeFilterPillContainer exists');

const tbody = document.getElementById('appointmentsTableBody');
assert(!!tbody, '#appointmentsTableBody exists');

// 2. Initial state: All appointments should be rendered
let rows = tbody.querySelectorAll('tr');
console.log(`Initial rows count: ${rows.length}`);
assert(rows.length === 10, 'Initial table displays all 10 scheduled appointments');
assert(countBadge.textContent.includes('10 Appointments'), 'Count badge displays 10 Appointments');
assert(activeFilterPill.classList.contains('d-none'), 'Active filter pill is hidden initially');

// 3. Verify dropdown options rendered
const menuItems = filterMenu.querySelectorAll('a.dropdown-item');
console.log(`Doctor filter menu items count: ${menuItems.length}`);
assert(menuItems.length >= 6, 'Filter menu contains All Doctors + Specialist Doctors');

// 4. Test filtering by Dr. Marcus Vance
console.log('Filtering schedule by Dr. Marcus Vance...');
window.filterScheduleByDoctor('Dr. Marcus Vance');

rows = tbody.querySelectorAll('tr');
console.log(`Rows after filtering by Dr. Marcus Vance: ${rows.length}`);
assert(rows.length === 3, 'Filtered to exactly 3 appointments for Dr. Marcus Vance');

// Verify all rows belong to Dr. Marcus Vance
rows.forEach((row, i) => {
  const docText = row.children[2].textContent;
  assert(docText.includes('Dr. Marcus Vance'), `Row ${i+1} has treating doctor Dr. Marcus Vance`);
});

assert(!activeFilterPill.classList.contains('d-none'), 'Active filter pill is now visible');
assert(document.getElementById('activeFilterPillText').textContent === 'Dr. Marcus Vance', 'Active filter pill displays Dr. Marcus Vance');
assert(countBadge.textContent.includes('3 of 10'), 'Count badge reflects 3 of 10 appointments');
assert(document.getElementById('currentDoctorFilterLabel').textContent.includes('Dr. Marcus Vance'), 'Filter button label updated to Dr. Marcus Vance');

// 5. Test filtering by Dr. Sarah Jenkins
console.log('Filtering schedule by Dr. Sarah Jenkins...');
window.filterScheduleByDoctor('Dr. Sarah Jenkins');
rows = tbody.querySelectorAll('tr');
console.log(`Rows after filtering by Dr. Sarah Jenkins: ${rows.length}`);
assert(rows.length === 2, 'Filtered to exactly 2 appointments for Dr. Sarah Jenkins');
rows.forEach((row, i) => {
  const docText = row.children[2].textContent;
  assert(docText.includes('Dr. Sarah Jenkins'), `Row ${i+1} has treating doctor Dr. Sarah Jenkins`);
});

// 6. Test clearing the filter
console.log('Clearing doctor filter (view all)...');
window.filterScheduleByDoctor('all');
rows = tbody.querySelectorAll('tr');
assert(rows.length === 10, 'Reset back to all 10 appointments');
assert(activeFilterPill.classList.contains('d-none'), 'Active filter pill is hidden again');
assert(document.getElementById('currentDoctorFilterLabel').textContent === 'Filter By Doctor', 'Button label reset to Filter By Doctor');

// 7. Test appointment approval
const pendingRowBefore = Array.from(tbody.querySelectorAll('tr')).find(r => r.textContent.includes('Pending Approval'));
assert(!!pendingRowBefore, 'Found a pending appointment');
const aptIdToApprove = pendingRowBefore.getAttribute('data-id');
console.log(`Approving appointment: ${aptIdToApprove}`);
window.approveAppointment(aptIdToApprove);

const approvedRow = tbody.querySelector(`tr[data-id="${aptIdToApprove}"]`);
assert(approvedRow.textContent.includes('Confirmed'), 'Appointment status changed to Confirmed');

// 8. Test Search functionality
console.log('Testing table search...');
const searchInput = document.getElementById('dashTableSearch');
searchInput.value = 'Gait Lab';
searchInput.dispatchEvent(new window.Event('input'));

rows = tbody.querySelectorAll('tr');
console.log(`Rows matching "Gait Lab": ${rows.length}`);
assert(rows.length === 2, 'Search for "Gait Lab" matched 2 appointments');

console.log('ALL TESTS PASSED SUCCESSFULLY!');
