const fs = require('fs');
const path = require('path');
const http = require('http');

console.log('====================================================');
console.log('Verifying Patient Login & Registration Flow (Node.js)');
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
global.window = global;

// 1. Test Self-Healing with Corrupted/Legacy Stored Users
console.log('\n[1] Testing Self-Healing of Legacy Stored Users in localStorage...');
storage['physiolife_users'] = JSON.stringify([
  { fullName: 'Corrupted Patient', email: 'patient@physiolife.com', password: 'patient123', role: 'admin', dashboard: 'wrong/path.html' },
  { fullName: 'Legacy Patient', email: 'old@example.com', password: 'old123', role: 'other', dashboard: undefined }
]);

eval(fs.readFileSync('assets/js/auth.js', 'utf8'));

const seededUsers = PhysioAuth.getUsers();
const defaultPatient = seededUsers.find(u => u.email === 'patient@physiolife.com');
if (defaultPatient.role !== 'patient' || defaultPatient.dashboard !== 'patient/dashboard.html') {
  console.error('FAIL: defaultPatient not healed:', defaultPatient);
  process.exit(1);
}
console.log('PASS: default patient healed to role="patient" and dashboard="patient/dashboard.html".');

const legacyPatient = seededUsers.find(u => u.email === 'old@example.com');
if (legacyPatient.role !== 'patient' || legacyPatient.dashboard !== 'patient/dashboard.html') {
  console.error('FAIL: legacyPatient not healed:', legacyPatient);
  process.exit(1);
}
console.log('PASS: legacy user healed to role="patient" and dashboard="patient/dashboard.html".');

// 2. Test Default Patient Login
console.log('\n[2] Testing Default Patient Login...');
const defaultLogin = PhysioAuth.loginUser('patient@physiolife.com', 'patient123');
if (!defaultLogin.success || defaultLogin.redirectUrl !== 'patient/dashboard.html') {
  console.error('FAIL: Default patient login failed or wrong redirectUrl:', defaultLogin);
  process.exit(1);
}
console.log('PASS: Default patient login successfully returns redirectUrl="patient/dashboard.html".');

// 3. Test New Patient Registration & Login
console.log('\n[3] Testing New Patient Account Registration & Login...');
const testEmail = 'alex.morgan' + Date.now() + '@example.com';
const regRes = PhysioAuth.registerUser({
  fullName: 'Alex Morgan',
  email: testEmail,
  phone: '+1 (555) 987-6543',
  password: 'securePassword123',
  role: 'patient'
});

if (!regRes.success || regRes.user.dashboard !== 'patient/dashboard.html') {
  console.error('FAIL: Registration failed:', regRes);
  process.exit(1);
}
console.log('PASS: Account registered successfully with role="patient" and dashboard="patient/dashboard.html".');

// Login with newly created patient
const newLogin = PhysioAuth.loginUser(testEmail, 'securePassword123');
if (!newLogin.success || newLogin.redirectUrl !== 'patient/dashboard.html') {
  console.error('FAIL: Login with new account failed:', newLogin);
  process.exit(1);
}
console.log('PASS: Login with new account strictly returns redirectUrl="patient/dashboard.html".');

// Check session in localStorage
const currentSession = PhysioAuth.getCurrentUser();
if (!currentSession || currentSession.dashboard !== 'patient/dashboard.html') {
  console.error('FAIL: Session dashboard mismatch:', currentSession);
  process.exit(1);
}
console.log('PASS: Session correctly records active user with dashboard="patient/dashboard.html".');

// 4. Verify HTML Files
console.log('\n[4] Verifying HTML Files...');
const loginHtml = fs.readFileSync('login.html', 'utf8');
if (!loginHtml.includes('Patient Login') || !loginHtml.includes("targetDashboard = 'patient/dashboard.html'")) {
  console.error('FAIL: login.html missing strict patient dashboard redirection');
  process.exit(1);
}
console.log('PASS: login.html contains "Patient Login" title/button and strict patient dashboard target.');

const patientLoginHtml = fs.readFileSync('patient-login.html', 'utf8');
if (!patientLoginHtml.includes("targetDashboard = 'patient/dashboard.html'")) {
  console.error('FAIL: patient-login.html missing strict patient dashboard redirection');
  process.exit(1);
}
console.log('PASS: patient-login.html strictly targets patient/dashboard.html.');

const registerHtml = fs.readFileSync('register.html', 'utf8');
if (!registerHtml.includes("role: 'patient'") || !registerHtml.includes('login.html?registered=1')) {
  console.error('FAIL: register.html missing proper patient role or redirect');
  process.exit(1);
}
console.log('PASS: register.html registers role="patient" and proceeds to login.html?registered=1.');

const patientDashHtml = fs.readFileSync('patient/dashboard.html', 'utf8');
if (!patientDashHtml.includes('assets/js/auth.js')) {
  console.error('FAIL: patient/dashboard.html missing auth.js');
  process.exit(1);
}
console.log('PASS: patient/dashboard.html loads auth.js for session persistence.');

// 5. Test HTTP 200 on all endpoints
console.log('\n[5] Testing HTTP status 200 on server...');
const endpoints = [
  'http://localhost:8080/login.html',
  'http://localhost:8080/patient-login.html',
  'http://localhost:8080/register.html',
  'http://localhost:8080/patient-register.html',
  'http://localhost:8080/patient/dashboard.html'
];

let pending = endpoints.length;
endpoints.forEach(url => {
  http.get(url, (res) => {
    if (res.statusCode !== 200) {
      console.error(`FAIL: ${url} returned ${res.statusCode}`);
      process.exit(1);
    }
    console.log(`PASS: ${url} -> HTTP ${res.statusCode}`);
    pending--;
    if (pending === 0) {
      console.log('\n====================================================');
      console.log('ALL PATIENT LOGIN & REGISTRATION VERIFICATIONS PASSED!');
      console.log('====================================================');
    }
  }).on('error', (err) => {
    console.error(`ERROR fetching ${url}:`, err.message);
    process.exit(1);
  });
});
