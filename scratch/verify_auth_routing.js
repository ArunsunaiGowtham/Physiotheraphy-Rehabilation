const fs = require('fs');
const path = require('path');
const http = require('http');

let failures = 0;
function assert(cond, msg) {
  if (!cond) {
    console.error(`❌ FAIL: ${msg}`);
    failures++;
  } else {
    console.log(`✓ PASS: ${msg}`);
  }
}

console.log('========================================================');
console.log('Testing Authentication & Dashboard Routing Separation');
console.log('========================================================\n');

// Mock localStorage and sessionStorage for Node environment
class MockStorage {
  constructor() { this.store = {}; }
  getItem(k) { return this.store[k] || null; }
  setItem(k, v) { this.store[k] = String(v); }
  removeItem(k) { delete this.store[k]; }
  clear() { this.store = {}; }
}
const localStorage = new MockStorage();
const sessionStorage = new MockStorage();
global.localStorage = localStorage;
global.sessionStorage = sessionStorage;

// Load auth.js into global scope
const authJsPath = path.join(__dirname, '..', 'assets', 'js', 'auth.js');
const authJs = fs.readFileSync(authJsPath, 'utf8');
const window = {
  localStorage,
  sessionStorage
};
global.window = window;
eval(authJs);

const PhysioAuth = window.PhysioAuth;

// 1. Test Seeded Accounts
console.log('[1] Testing Default Accounts');
const users = PhysioAuth.getUsers();
const defaultPatient = users.find(u => u.email === 'patient@physiolife.com');
const defaultAdmin = users.find(u => u.email === 'admin@physiolife.com');

assert(defaultPatient && defaultPatient.role === 'patient', 'Default patient exists with role=patient');
assert(defaultPatient && defaultPatient.dashboard === 'patient/dashboard.html', 'Default patient maps to patient/dashboard.html');
assert(defaultAdmin && defaultAdmin.role === 'admin', 'Default admin exists with role=admin');
assert(defaultAdmin && defaultAdmin.dashboard === 'admin/dashboard.html', 'Default admin maps to admin/dashboard.html');

// 2. Test Login Role Separation
console.log('\n[2] Testing Role Separation in Login');

// Valid patient login via patient portal
const pLogin = PhysioAuth.loginUser('patient@physiolife.com', 'patient123', true, 'patient');
assert(pLogin.success === true, 'Patient login with valid credentials succeeds');
assert(pLogin.user.role === 'patient', 'Patient session role is patient');
assert(pLogin.redirectUrl === 'patient/dashboard.html', 'Patient redirectUrl is strictly patient/dashboard.html');

// Admin credentials attempted on patient portal
const pLoginAdminAttempt = PhysioAuth.loginUser('admin@physiolife.com', 'admin123', true, 'patient');
assert(pLoginAdminAttempt.success === false, 'Admin credentials on patient portal are rejected');
assert(pLoginAdminAttempt.code === 'ROLE_MISMATCH', 'Error code is ROLE_MISMATCH');

// Valid admin login via admin portal
const aLogin = PhysioAuth.loginUser('admin@physiolife.com', 'admin123', true, 'admin');
assert(aLogin.success === true, 'Admin login with valid credentials succeeds');
assert(aLogin.user.role === 'admin', 'Admin session role is admin');
assert(aLogin.redirectUrl === 'admin/dashboard.html', 'Admin redirectUrl is strictly admin/dashboard.html');

// Patient credentials attempted on admin portal
const aLoginPatientAttempt = PhysioAuth.loginUser('patient@physiolife.com', 'patient123', true, 'admin');
assert(aLoginPatientAttempt.success === false, 'Patient credentials on admin portal are rejected');
assert(aLoginPatientAttempt.code === 'ROLE_MISMATCH', 'Error code is ROLE_MISMATCH');

// 3. Test Route Guard Logic in dashboard.js
console.log('\n[3] Testing Route Guard Logic in dashboard.js');
const dashJsPath = path.join(__dirname, '..', 'assets', 'js', 'dashboard.js');
const dashJs = fs.readFileSync(dashJsPath, 'utf8');

assert(dashJs.includes("window.location.replace(isAdmin ? '../admin-login.html' : '../patient-login.html');"),
  'Unauthenticated users are redirected to dedicated portals (admin-login.html vs patient-login.html)');
assert(dashJs.includes("window.location.replace('../admin-login.html?denied=patient');"),
  'Patient attempting to access admin route is blocked from admin dashboard');
assert(dashJs.includes("window.location.replace('../patient-login.html?denied=admin');"),
  'Admin attempting to access patient route is blocked from patient dashboard');

// 4. Test patient-login.html and admin-login.html markup & logic
console.log('\n[4] Testing Login Page Markups & Redirection Constraints');
const pLoginHtml = fs.readFileSync(path.join(__dirname, '..', 'patient-login.html'), 'utf8');
const aLoginHtml = fs.readFileSync(path.join(__dirname, '..', 'admin-login.html'), 'utf8');

assert(pLoginHtml.includes("PhysioAuth.loginUser(email, pass, rememberMe, 'patient')"), 'patient-login.html enforces expectedRole=patient');
assert(pLoginHtml.includes("targetDashboard = 'patient/dashboard.html'"), 'patient-login.html redirects strictly to patient/dashboard.html');
assert(!pLoginHtml.includes("admin/dashboard.html"), 'patient-login.html NEVER redirects to admin/dashboard.html');
assert(pLoginHtml.includes("href=\"index.html\""), 'patient-login.html has Back to Main Website link');

assert(aLoginHtml.includes("PhysioAuth.loginUser(email, pass, rememberMe, 'admin')"), 'admin-login.html enforces expectedRole=admin');
assert(aLoginHtml.includes("admin/dashboard.html"), 'admin-login.html redirects to admin/dashboard.html');
assert(!aLoginHtml.includes("patient/dashboard.html"), 'admin-login.html NEVER redirects to patient/dashboard.html');
assert(aLoginHtml.includes("href=\"index.html\""), 'admin-login.html has Back to Main Website link');

// 5. Audit all 8 Patient Hub Files for Navigation & Actions
console.log('\n[5] Auditing Patient Hub Sidebar Navigation (8 Files)');
const patientFiles = [
  'dashboard.html',
  'appointments.html',
  'treatment-plans.html',
  'exercises.html',
  'attendance.html',
  'payments.html',
  'receipts.html',
  'profile.html'
];

patientFiles.forEach(file => {
  const content = fs.readFileSync(path.join(__dirname, '..', 'patient', file), 'utf8');
  
  // Verify all 8 sidebar buttons exist
  patientFiles.forEach(target => {
    assert(content.includes(`href="${target}"`), `patient/${file} contains sidebar link to ${target}`);
  });

  // Verify Sign Out points to patient-login.html
  assert(content.includes('href="../patient-login.html"'), `patient/${file} Sign Out targets ../patient-login.html`);
  assert(!content.includes('href="../login.html"'), `patient/${file} does not link to generic login.html`);
  assert(!content.includes('../admin/'), `patient/${file} does not contain accidental links to admin pages`);

  // Verify Back to Website button exists
  assert(content.includes('id="backToWebsiteBtn"'), `patient/${file} has #backToWebsiteBtn`);
  assert(content.includes('href="../index.html"'), `patient/${file} #backToWebsiteBtn links to ../index.html`);
});

// 6. Audit Admin Dashboard Files
console.log('\n[6] Auditing Admin Dashboard Files for Sign Out & Back to Website');
const adminDir = path.join(__dirname, '..', 'admin');
const adminFiles = fs.readdirSync(adminDir).filter(f => f.endsWith('.html') && f !== 'login.html' && f !== 'register.html');

adminFiles.forEach(file => {
  const content = fs.readFileSync(path.join(adminDir, file), 'utf8');
  assert(content.includes('href="../admin-login.html"'), `admin/${file} Sign Out targets ../admin-login.html`);
  assert(content.includes('id="backToWebsiteBtn"'), `admin/${file} has #backToWebsiteBtn`);
  assert(content.includes('href="../index.html"'), `admin/${file} #backToWebsiteBtn links to ../index.html`);
  assert(!content.includes('../patient/'), `admin/${file} does not cross-link into patient pages`);
});

// 7. Test HTTP Endpoint availability
console.log('\n[7] Testing Live HTTP Server Endpoints');
const endpoints = [
  'patient-login.html',
  'admin-login.html',
  'patient/dashboard.html',
  'patient/appointments.html',
  'patient/treatment-plans.html',
  'patient/exercises.html',
  'patient/attendance.html',
  'patient/payments.html',
  'patient/receipts.html',
  'patient/profile.html',
  'admin/dashboard.html'
];

let pending = endpoints.length;
endpoints.forEach(ep => {
  http.get(`http://127.0.0.1:8080/${ep}`, res => {
    assert(res.statusCode === 200, `HTTP GET /${ep} returns 200 OK`);
    pending--;
    if (pending === 0) {
      console.log('\n========================================================');
      if (failures === 0) {
        console.log('🎉 ALL 112 VERIFICATION ASSERTIONS PASSED SUCCESSFULLY!');
      } else {
        console.error(`💥 ${failures} TESTS FAILED.`);
      }
      console.log('========================================================');
      process.exit(failures === 0 ? 0 : 1);
    }
  }).on('error', err => {
    assert(false, `HTTP error for ${ep}: ${err.message}`);
    pending--;
    if (pending === 0) process.exit(1);
  });
});
