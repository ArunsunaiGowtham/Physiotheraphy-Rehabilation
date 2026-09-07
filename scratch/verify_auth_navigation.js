const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('====================================================');
console.log('Verifying PhysioLife Login & Dashboard Navigation Flow');
console.log('====================================================');

// Mock browser environment for node testing
let storage = {};
global.localStorage = {
  getItem: (k) => (k in storage ? storage[k] : null),
  setItem: (k, v) => { storage[k] = String(v); },
  removeItem: (k) => { delete storage[k]; }
};
global.sessionStorage = {
  getItem: (k) => (k in storage ? storage[k] : null),
  setItem: (k, v) => { storage[k] = String(v); },
  removeItem: (k) => { delete storage[k]; }
};
global.window = global;

// Load auth.js
eval(fs.readFileSync(path.join(__dirname, '..', 'assets', 'js', 'auth.js'), 'utf8'));

// 1. Verify Default Accounts
console.log('\n[1] Verifying Default Accounts...');
const users = PhysioAuth.getUsers();
const defaultPatient = users.find(u => u.email === 'patient@physiolife.com');
const defaultAdmin = users.find(u => u.email === 'admin@physiolife.com');

assert(defaultPatient, 'Default patient must exist');
assert.strictEqual(defaultPatient.role, 'patient', 'Default patient role must be "patient"');
assert(defaultAdmin, 'Default admin must exist');
assert.strictEqual(defaultAdmin.role, 'admin', 'Default admin role must be "admin"');
console.log('PASS: Default accounts exist with correct roles.');

// 2. Verify Authentication & Role-based Redirection
console.log('\n[2] Verifying Authentication & Role-based Redirection...');
// Admin authentication
const adminLogin = PhysioAuth.loginUser('admin@physiolife.com', 'admin123');
assert(adminLogin.success, 'Admin login should succeed');
assert.strictEqual(adminLogin.user.role, 'admin', 'Admin role must be "admin"');
assert.strictEqual(adminLogin.redirectUrl, 'admin/dashboard.html', 'Admin redirectUrl must be admin/dashboard.html');
console.log('PASS: Admin authenticates and targets admin/dashboard.html.');

// Patient authentication
const patientLogin = PhysioAuth.loginUser('patient@physiolife.com', 'patient123');
assert(patientLogin.success, 'Patient login should succeed');
assert.strictEqual(patientLogin.user.role, 'patient', 'Patient role must be "patient"');
assert.strictEqual(patientLogin.redirectUrl, 'patient/dashboard.html', 'Patient redirectUrl must be patient/dashboard.html');
console.log('PASS: Patient authenticates and targets patient/dashboard.html.');

// Invalid password test
const invalidPass = PhysioAuth.loginUser('patient@physiolife.com', 'wrongpassword');
assert(!invalidPass.success, 'Invalid password should fail');
console.log('PASS: Invalid credentials correctly rejected.');

// Non-existent user test
const invalidUser = PhysioAuth.loginUser('nobody@nowhere.com', 'somepass');
assert(!invalidUser.success, 'Non-existent user should fail');
console.log('PASS: Non-existent user correctly rejected.');

// 3. Verify Session Persistence & Cleanup
console.log('\n[3] Verifying Session Persistence & Sign Out...');
PhysioAuth.loginUser('admin@physiolife.com', 'admin123', true);
const activeAdmin = PhysioAuth.getCurrentUser();
assert(activeAdmin && activeAdmin.role === 'admin', 'Active session must be admin');
PhysioAuth.logoutUser();
const clearedSession = PhysioAuth.getCurrentUser();
assert.strictEqual(clearedSession, null, 'Session must be null after logout');
console.log('PASS: Session persists and clears properly on logout.');

// 4. Verify Auth Guard Logic
console.log('\n[4] Verifying Auth Guard Logic...');
const authGuardSource = fs.readFileSync(path.join(__dirname, '..', 'assets', 'js', 'auth-guard.js'), 'utf8');
assert(authGuardSource.includes('window.location.replace'), 'Auth guard must perform redirection');
assert(authGuardSource.includes('isAdminArea && user.role !== \'admin\''), 'Auth guard must protect admin area against non-admin');
assert(authGuardSource.includes('isPatientArea && user.role !== \'patient\''), 'Auth guard must protect patient area against non-patient');
assert(authGuardSource.includes('targetLogin'), 'Auth guard must direct unauthenticated users to login');
console.log('PASS: Auth guard correctly implements route protection and role boundaries.');

// 5. Verify HTML File Markup Requirements
console.log('\n[5] Verifying HTML File Markup...');
// login.html
const loginHtml = fs.readFileSync(path.join(__dirname, '..', 'login.html'), 'utf8');
assert(!loginHtml.includes('id="roleBtnPatient"'), 'login.html should not have manual Patient role button');
assert(loginHtml.includes('id="btnPatientDemo"'), 'login.html must have Patient demo button');
assert(loginHtml.includes('id="btnAdminDemo"'), 'login.html must have Admin demo button');
assert(loginHtml.includes('admin/dashboard.html'), 'login.html must redirect admin to admin/dashboard.html');
assert(loginHtml.includes('patient/dashboard.html'), 'login.html must redirect patient to patient/dashboard.html');
console.log('PASS: login.html provides unified login, demo autofill, and automatic role-based redirects.');

// admin/dashboard.html
const adminDashHtml = fs.readFileSync(path.join(__dirname, '..', 'admin', 'dashboard.html'), 'utf8');
assert(adminDashHtml.includes('auth-guard.js'), 'admin/dashboard.html must include auth-guard.js in head');
assert(adminDashHtml.includes('id="backToWebsiteBtn"'), 'admin/dashboard.html must have Back to Website button');
assert(adminDashHtml.includes('Back to') && adminDashHtml.includes('Website'), 'admin/dashboard.html button must say Back to Website');
assert(adminDashHtml.includes('href="../index.html"'), 'admin/dashboard.html Back to Website must link to ../index.html');
console.log('PASS: admin/dashboard.html has auth guard and Back to Website button linking to index.html.');

// patient/dashboard.html
const patientDashHtml = fs.readFileSync(path.join(__dirname, '..', 'patient', 'dashboard.html'), 'utf8');
assert(patientDashHtml.includes('auth-guard.js'), 'patient/dashboard.html must include auth-guard.js in head');
assert(patientDashHtml.includes('id="backToWebsiteBtn"'), 'patient/dashboard.html must have Back to Website button');
assert(patientDashHtml.includes('Back to') && patientDashHtml.includes('Website'), 'patient/dashboard.html button must say Back to Website');
assert(patientDashHtml.includes('href="../index.html"'), 'patient/dashboard.html Back to Website must link to ../index.html');
console.log('PASS: patient/dashboard.html has auth guard and Back to Website button linking to index.html.');

// 6. Verify Dashboard Subpages
console.log('\n[6] Verifying Dashboard Subpages...');
const adminFiles = ['appointments.html', 'users.html', 'services.html', 'treatment-plans.html', 'orders.html'];
adminFiles.forEach(file => {
  const content = fs.readFileSync(path.join(__dirname, '..', 'admin', file), 'utf8');
  assert(content.includes('auth-guard.js'), `admin/${file} must include auth-guard.js`);
  assert(content.includes('backToWebsiteBtn'), `admin/${file} must include backToWebsiteBtn`);
});
console.log('PASS: Admin subpages have auth guard and Back to Website button.');

const patientFiles = ['appointments.html', 'exercises.html', 'payments.html', 'profile.html', 'receipts.html'];
patientFiles.forEach(file => {
  const content = fs.readFileSync(path.join(__dirname, '..', 'patient', file), 'utf8');
  assert(content.includes('auth-guard.js'), `patient/${file} must include auth-guard.js`);
  assert(content.includes('backToWebsiteBtn'), `patient/${file} must include backToWebsiteBtn`);
});
console.log('PASS: Patient subpages have auth guard and Back to Website button.');

console.log('\n====================================================');
console.log('ALL UNIT & MARKUP VERIFICATIONS PASSED SUCCESSFULLY!');
console.log('====================================================');
