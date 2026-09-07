const fs = require('fs');
const http = require('http');

console.log('===========================================================');
console.log('Verifying Registration Page Updates & Flow (Node.js)');
console.log('===========================================================');

// 1. Verify register.html content
const regHtml = fs.readFileSync('register.html', 'utf8');

if (regHtml.includes('auth-panel-bg.jpg') || regHtml.includes('auth-side-photo')) {
  console.error('FAIL: register.html still contains photo side panel!');
  process.exit(1);
}
console.log('PASS: 1. Photos removed from register.html.');

if (!regHtml.includes('<i class="fas fa-user-plus me-2"></i> Create Account')) {
  console.error('FAIL: register.html submit button does not say "Create Account"');
  process.exit(1);
}
console.log('PASS: 2. Submit button text changed to "Create Account".');

if (!regHtml.includes('Login Page')) {
  console.error('FAIL: register.html does not link to "Login Page"');
  process.exit(1);
}
console.log('PASS: 3. Link updated to "Login Page".');

if (!regHtml.includes('window.location.href = loginTarget') && !regHtml.includes('proceedBtn.href = loginTarget')) {
  console.error('FAIL: register.html does not redirect to login page after creating account');
  process.exit(1);
}
console.log('PASS: 4. Account creation strictly redirects to login page.');

// 2. Verify patient-register.html content
const patRegHtml = fs.readFileSync('patient-register.html', 'utf8');
if (patRegHtml.includes('auth-panel-bg.jpg') || patRegHtml.includes('auth-side-photo')) {
  console.error('FAIL: patient-register.html still contains photo side panel!');
  process.exit(1);
}
console.log('PASS: 5. Photos removed from patient-register.html.');

if (!patRegHtml.includes('<i class="fas fa-user-plus me-2"></i> Create Account')) {
  console.error('FAIL: patient-register.html submit button does not say "Create Account"');
  process.exit(1);
}
console.log('PASS: 6. Submit button text in patient-register.html changed to "Create Account".');

// 3. Verify login.html redirection
const loginHtml = fs.readFileSync('login.html', 'utf8');
if (!loginHtml.includes("window.location.href = targetDashboard")) {
  console.error('FAIL: login.html does not redirect to patient dashboard');
  process.exit(1);
}
console.log('PASS: 7. login.html strictly redirects to patient dashboard.');

// 4. Test HTTP Status 200
const urls = [
  'http://localhost:8080/register.html',
  'http://localhost:8080/patient-register.html',
  'http://localhost:8080/login.html'
];

let pending = urls.length;
urls.forEach(url => {
  http.get(url, (res) => {
    if (res.statusCode !== 200) {
      console.error(`FAIL: ${url} returned ${res.statusCode}`);
      process.exit(1);
    }
    console.log(`PASS: ${url} -> HTTP ${res.statusCode}`);
    pending--;
    if (pending === 0) {
      console.log('===========================================================');
      console.log('ALL REGISTRATION PAGE VERIFICATIONS PASSED SUCCESSFULLY!');
      console.log('===========================================================');
    }
  }).on('error', (err) => {
    console.error(`ERROR:`, err.message);
    process.exit(1);
  });
});
