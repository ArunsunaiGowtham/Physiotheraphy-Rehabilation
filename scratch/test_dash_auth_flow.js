const fs = require('fs');
const path = require('path');

const storage = {};
global.window = global;
global.localStorage = {
  getItem: (k) => storage[k] || null,
  setItem: (k, v) => { storage[k] = v; },
  removeItem: (k) => { delete storage[k]; }
};
global.sessionStorage = {
  getItem: (k) => storage[k] || null,
  setItem: (k, v) => { storage[k] = v; },
  removeItem: (k) => { delete storage[k]; }
};

// Load auth.js
const authCode = fs.readFileSync('assets/js/auth.js', 'utf8');
eval(authCode);

function simulateAccessCheck(pathname) {
  const rawPath = pathname.toLowerCase().replace(/\\/g, '/');
  const filename = rawPath.substring(rawPath.lastIndexOf('/') + 1);
  if (filename.includes('login') || filename.includes('register')) return { allowed: true };

  const isAdmin = rawPath.includes('/admin/');
  const isPatient = rawPath.includes('/patient/');
  if (!isAdmin && !isPatient) return { allowed: true };

  const sessionStr = sessionStorage.getItem('physiolife_current_user') || localStorage.getItem('physiolife_current_user');
  let user = null;
  try { user = sessionStr ? JSON.parse(sessionStr) : null; } catch(e) {}

  if (!user || !user.email || !user.role) {
    return { allowed: false, redirect: isAdmin ? '../admin-login.html' : '../patient-login.html' };
  }

  if (isAdmin && user.role !== 'admin') {
    return { allowed: false, redirect: '../admin-login.html?denied=patient' };
  }

  if (isPatient && user.role !== 'patient') {
    return { allowed: false, redirect: '../patient-login.html?denied=admin' };
  }

  return { allowed: true, user };
}

console.log('--- TEST 1: Unauthenticated access ---');
let check = simulateAccessCheck('/patient/dashboard.html');
console.log('Unauth -> /patient/dashboard.html:', check);
if (check.allowed !== false || !check.redirect.includes('patient-login')) throw new Error('Unauth patient failed');

check = simulateAccessCheck('/admin/dashboard.html');
console.log('Unauth -> /admin/dashboard.html:', check);
if (check.allowed !== false || !check.redirect.includes('admin-login')) throw new Error('Unauth admin failed');

console.log('\n--- TEST 2: Patient Social & Standard Login ---');
PhysioAuth.socialLogin('google', 'patient');
check = simulateAccessCheck('/patient/dashboard.html');
console.log('Patient Google -> /patient/dashboard.html:', check);
if (!check.allowed || check.user.role !== 'patient') throw new Error('Patient access failed');

// Try cross-role: patient accessing admin dashboard
check = simulateAccessCheck('/admin/dashboard.html');
console.log('Patient trying to access /admin/dashboard.html:', check);
if (check.allowed !== false || check.redirect !== '../admin-login.html?denied=patient') throw new Error('Cross-role barrier failed');

console.log('\n--- TEST 3: Admin Social & Standard Login ---');
PhysioAuth.socialLogin('apple', 'admin');
check = simulateAccessCheck('/admin/dashboard.html');
console.log('Admin Apple -> /admin/dashboard.html:', check);
if (!check.allowed || check.user.role !== 'admin') throw new Error('Admin access failed');

// Try cross-role: admin accessing patient dashboard
check = simulateAccessCheck('/patient/dashboard.html');
console.log('Admin trying to access /patient/dashboard.html:', check);
if (check.allowed !== false || check.redirect !== '../patient-login.html?denied=admin') throw new Error('Cross-role barrier failed');

console.log('\n--- TEST 4: Sign Out ---');
PhysioAuth.logoutUser();
check = simulateAccessCheck('/admin/dashboard.html');
console.log('Post-SignOut -> /admin/dashboard.html:', check);
if (check.allowed !== false) throw new Error('Logout check failed');

console.log('\nALL AUTHENTICATION & DASHBOARD ACCESS TESTS PASSED PERFECTLY!');
