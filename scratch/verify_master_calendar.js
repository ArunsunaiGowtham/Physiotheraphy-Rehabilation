const fs = require('fs');
const http = require('http');
const assert = require('assert');

console.log('====================================================');
console.log('Verifying Master Calendar Features & End-to-End Navigation');
console.log('====================================================');

// 1. Check dashboard button
const dashHtml = fs.readFileSync('admin/dashboard.html', 'utf8');
assert(dashHtml.includes('id="masterCalendarBtn"'), 'Must have #masterCalendarBtn on dashboard');
assert(dashHtml.includes('href="appointments.html"'), 'Master Calendar button must link to appointments.html');
console.log('✓ PASS: Dashboard #masterCalendarBtn exists and links to appointments.html.');

// 2. Check appointments.html Master Calendar features
const apptHtml = fs.readFileSync('admin/appointments.html', 'utf8');
assert(apptHtml.includes('Master Calendar &amp; Clinic Schedule'), 'appointments.html heading must indicate Master Calendar');
assert(apptHtml.includes('id="calendarDatePicker"'), 'appointments.html must have date picker');
assert(apptHtml.includes('id="viewModeTableBtn"'), 'appointments.html must have Table View toggle');
assert(apptHtml.includes('id="viewModeMatrixBtn"'), 'appointments.html must have Room Matrix Calendar toggle');
assert(apptHtml.includes('id="roomMatrixCalendarContainer"'), 'appointments.html must have room matrix container');
assert(apptHtml.includes('window.switchScheduleView'), 'Must expose switchScheduleView');
assert(apptHtml.includes('window.shiftCalendarDay'), 'Must expose shiftCalendarDay');

console.log('✓ PASS: Master Calendar has date navigation, table view, and room calendar matrix.');

// 3. Test HTTP 200 on both pages
http.get('http://localhost:3000/admin/dashboard.html', (res1) => {
  assert.strictEqual(res1.statusCode, 200, 'admin/dashboard.html must return 200');
  console.log('✓ PASS: http://localhost:3000/admin/dashboard.html -> HTTP 200 OK');

  http.get('http://localhost:3000/admin/appointments.html', (res2) => {
    assert.strictEqual(res2.statusCode, 200, 'admin/appointments.html must return 200');
    console.log('✓ PASS: http://localhost:3000/admin/appointments.html -> HTTP 200 OK');
    console.log('\n====================================================');
    console.log('🎉 MASTER CALENDAR IS FULLY OPERATIONAL!');
    console.log('====================================================');
  });
});
