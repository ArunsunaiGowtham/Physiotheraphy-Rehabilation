// Test patient auth flow in node.js
const fs = require('fs');

// Mock localStorage and sessionStorage
const storage = {};
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
eval(fs.readFileSync('assets/js/auth.js', 'utf8'));

console.log('--- TEST 1: Default Patient Login ---');
const defaultLogin = PhysioAuth.loginUser('patient@physiolife.com', 'patient123');
console.log('Default login result:', defaultLogin.success, defaultLogin.redirectUrl);

console.log('--- TEST 2: Register New Patient and Login ---');
const regResult = PhysioAuth.registerUser({
  fullName: 'John Patient',
  email: 'newpatient@example.com',
  phone: '1234567890',
  password: 'mypassword123',
  role: 'patient'
});
console.log('Registration result:', regResult.success, regResult.user);

const newLogin = PhysioAuth.loginUser('newpatient@example.com', 'mypassword123');
console.log('New patient login result:', newLogin.success, newLogin.redirectUrl);
