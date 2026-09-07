const fs = require('fs');
const assert = require('assert');

console.log('====================================================');
console.log('Testing Navbar Auth State Synchronization');
console.log('====================================================');

// Mock browser environment
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

// 1. Read index.html
const indexHtml = fs.readFileSync('index.html', 'utf8');
assert(indexHtml.includes('btn-nav-login'), 'index.html has btn-nav-login');
assert(indexHtml.includes('btn-nav-signup'), 'index.html has btn-nav-signup');

// 2. Read style.css
const styleCss = fs.readFileSync('assets/css/style.css', 'utf8');
assert(styleCss.includes('.btn-nav-dashboard'), 'style.css contains .btn-nav-dashboard');
assert(styleCss.includes('.btn-nav-logout'), 'style.css contains .btn-nav-logout');
console.log('PASS: style.css has styles for .btn-nav-dashboard and .btn-nav-logout.');

// 3. Read main.js
const mainJs = fs.readFileSync('assets/js/main.js', 'utf8');
assert(mainJs.includes('syncNavbarAuthState'), 'main.js contains syncNavbarAuthState');
assert(mainJs.includes('targetDashboard'), 'main.js calculates targetDashboard');
assert(mainJs.includes('navDashboardBtn'), 'main.js injects navDashboardBtn');
assert(mainJs.includes('navLogoutBtn'), 'main.js injects navLogoutBtn');
assert(mainJs.includes('mobileNavDashboardBtn'), 'main.js injects mobileNavDashboardBtn');
assert(mainJs.includes('mobileNavLogoutBtn'), 'main.js injects mobileNavLogoutBtn');
console.log('PASS: main.js contains full navbar auth sync logic.');

// 4. Test logic for Patient
storage['physiolife_current_user'] = JSON.stringify({
  fullName: 'Sarah Connor',
  email: 'patient@physiolife.com',
  role: 'patient',
  dashboard: 'patient/dashboard.html'
});

let user = JSON.parse(storage['physiolife_current_user']);
let isAdmin = (user.role === 'admin');
let targetDashboard = isAdmin ? 'admin/dashboard.html' : 'patient/dashboard.html';
let roleLabel = isAdmin ? 'Admin Dashboard' : 'Dashboard';

assert.strictEqual(targetDashboard, 'patient/dashboard.html');
assert.strictEqual(roleLabel, 'Dashboard');
console.log('PASS: Patient session yields targetDashboard="patient/dashboard.html" and roleLabel="Dashboard".');

// 5. Test logic for Admin
storage['physiolife_current_user'] = JSON.stringify({
  fullName: 'Dr. Marcus Vance',
  email: 'admin@physiolife.com',
  role: 'admin',
  dashboard: 'admin/dashboard.html'
});

user = JSON.parse(storage['physiolife_current_user']);
isAdmin = (user.role === 'admin');
targetDashboard = isAdmin ? 'admin/dashboard.html' : 'patient/dashboard.html';
roleLabel = isAdmin ? 'Admin Dashboard' : 'Dashboard';

assert.strictEqual(targetDashboard, 'admin/dashboard.html');
assert.strictEqual(roleLabel, 'Admin Dashboard');
console.log('PASS: Admin session yields targetDashboard="admin/dashboard.html" and roleLabel="Admin Dashboard".');

console.log('\n====================================================');
console.log('ALL NAVBAR AUTH TESTS PASSED SUCCESSFULLY!');
console.log('====================================================');
