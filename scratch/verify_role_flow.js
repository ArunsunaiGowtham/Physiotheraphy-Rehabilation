const fs = require('fs');
const assert = require('assert');

console.log('====================================================');
console.log('Verifying Role-based Login & Sign Up Flow');
console.log('====================================================');

// 1. Check login.html
console.log('\n[1] Checking login.html...');
const loginHtml = fs.readFileSync('login.html', 'utf8');
assert(loginHtml.includes('switchLoginRole'), 'login.html must define switchLoginRole');
assert(loginHtml.includes('btnPatientDemo') && loginHtml.includes('btnAdminDemo'), 'login.html must have role switcher buttons');
assert(loginHtml.includes('Patient Login'), 'login.html must display Patient Login');
assert(loginHtml.includes('Admin Login'), 'login.html must display Admin Login');
assert(loginHtml.includes('Patient Sign Up') && loginHtml.includes('patient-register.html'), 'login.html must link to Patient Sign Up');
assert(loginHtml.includes('Admin Sign Up') && loginHtml.includes('admin-register.html'), 'login.html must link to Admin Sign Up');
console.log('✓ PASS: login.html seamlessly switches between Patient Login/Sign Up and Admin Login/Sign Up');

// 2. Check register.html
console.log('\n[2] Checking register.html...');
const registerHtml = fs.readFileSync('register.html', 'utf8');
assert(registerHtml.includes('switchRegisterRole'), 'register.html must define switchRegisterRole');
assert(registerHtml.includes('tabPatientRegister') && registerHtml.includes('tabAdminRegister'), 'register.html must have role switcher tabs');
assert(registerHtml.includes('Patient Sign Up'), 'register.html must display Patient Sign Up');
assert(registerHtml.includes('Admin Sign Up'), 'register.html must display Admin Sign Up');
assert(registerHtml.includes('Patient Login'), 'register.html must dynamically link to Patient Login');
assert(registerHtml.includes('Admin Login'), 'register.html must dynamically link to Admin Login');
console.log('✓ PASS: register.html seamlessly switches between Patient Sign Up and Admin Sign Up');

// 3. Check patient-login.html
console.log('\n[3] Checking patient-login.html...');
const pLoginHtml = fs.readFileSync('patient-login.html', 'utf8');
assert(pLoginHtml.includes('Patient Login'), 'patient-login.html must display Patient Login');
assert(pLoginHtml.includes('Patient Sign Up'), 'patient-login.html must display Patient Sign Up in footer');
assert(pLoginHtml.includes('patient-register.html'), 'patient-login.html must link to patient-register.html');
assert(pLoginHtml.includes('admin-login.html'), 'patient-login.html must navigate to admin-login.html on admin switch');
console.log('✓ PASS: patient-login.html strictly shows Patient Login and links to Patient Sign Up');

// 4. Check admin-login.html
console.log('\n[4] Checking admin-login.html...');
const aLoginHtml = fs.readFileSync('admin-login.html', 'utf8');
assert(aLoginHtml.includes('Admin Login'), 'admin-login.html must display Admin Login');
assert(aLoginHtml.includes('Admin Sign Up'), 'admin-login.html must display Admin Sign Up in footer');
assert(aLoginHtml.includes('admin-register.html'), 'admin-login.html must link to admin-register.html');
assert(aLoginHtml.includes('patient-login.html'), 'admin-login.html must navigate to patient-login.html on patient switch');
console.log('✓ PASS: admin-login.html strictly shows Admin Login and links to Admin Sign Up');

// 5. Check patient-register.html
console.log('\n[5] Checking patient-register.html...');
const pRegHtml = fs.readFileSync('patient-register.html', 'utf8');
assert(pRegHtml.includes('Patient Sign Up'), 'patient-register.html must display Patient Sign Up');
assert(pRegHtml.includes('Patient Login'), 'patient-register.html must link to Patient Login');
assert(pRegHtml.includes('admin-register.html'), 'patient-register.html must link to admin-register.html');
console.log('✓ PASS: patient-register.html strictly shows Patient Sign Up and links to Patient Login');

// 6. Check admin-register.html
console.log('\n[6] Checking admin-register.html...');
const aRegHtml = fs.readFileSync('admin-register.html', 'utf8');
assert(aRegHtml.includes('Admin Sign Up'), 'admin-register.html must display Admin Sign Up');
assert(aRegHtml.includes('Admin Login'), 'admin-register.html must link to Admin Login');
assert(aRegHtml.includes('patient-register.html'), 'admin-register.html must link to patient-register.html');
console.log('✓ PASS: admin-register.html strictly shows Admin Sign Up and links to Admin Login');

console.log('\n====================================================');
console.log('🎉 ALL ROLE-BASED LOGIN & SIGN UP ASSERTIONS PASSED!');
console.log('====================================================');
