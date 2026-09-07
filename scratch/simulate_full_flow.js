const fs = require('fs');

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

eval(fs.readFileSync('assets/js/auth.js', 'utf8'));

// Step 1: Register new account
console.log('1. Registering new patient:');
const reg = PhysioAuth.registerUser({
  fullName: 'Test User',
  email: 'testuser@example.com',
  phone: '555-123-4567',
  password: 'mypassword',
  role: 'patient'
});
console.log('Reg result:', reg);

// Step 2: Check stored users
console.log('2. Stored users:');
console.log(PhysioAuth.getUsers());

// Step 3: Login with newly registered user
console.log('3. Logging in:');
const loginRes = PhysioAuth.loginUser('testuser@example.com', 'mypassword');
console.log('Login result:', loginRes);
