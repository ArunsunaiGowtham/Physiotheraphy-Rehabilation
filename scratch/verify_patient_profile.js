/**
 * Comprehensive Verification Test for Patient Hub -> My Profile Page
 * Validates update functionality, localStorage persistence, input validation,
 * toast feedback, UI consistency across pages, Emergency Contact isolation,
 * and Change Password independence.
 * Strictly Node.js - NO Python
 */

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
console.log('Testing Patient Hub -> My Profile Implementation');
console.log('========================================================\n');

// 1. Inspect patient/profile.html content
const profileHtmlPath = path.join(__dirname, '..', 'patient', 'profile.html');
const profileHtml = fs.readFileSync(profileHtmlPath, 'utf8');

assert(profileHtml.includes('id="profileForm"'), 'profileForm exists in patient/profile.html');
assert(profileHtml.includes('id="profileFullName"'), 'Field #profileFullName exists');
assert(profileHtml.includes('id="profileDob"'), 'Field #profileDob exists');
assert(profileHtml.includes('id="profileEmail"'), 'Field #profileEmail exists');
assert(profileHtml.includes('id="profilePhone"'), 'Field #profilePhone exists');
assert(profileHtml.includes('id="profileAddress"'), 'Field #profileAddress exists');
assert(profileHtml.includes('id="saveProfileBtn"'), 'Button #saveProfileBtn exists');

// Validate invalid-feedback containers
const feedbackCount = (profileHtml.match(/class="invalid-feedback"/g) || []).length;
assert(feedbackCount >= 5, `At least 5 .invalid-feedback elements exist (found: ${feedbackCount})`);

// Emergency contact isolation
assert(profileHtml.includes('id="emergencyContactName"') && profileHtml.includes('Clara Sterling'), 'Emergency contact Clara Sterling exists and is isolated');
assert(profileHtml.includes('id="changePasswordForm"'), 'Independent changePasswordForm exists');

// Scripts in profile.html
assert(profileHtml.includes('src="../assets/js/auth.js"'), 'auth.js included in profile.html');
assert(profileHtml.includes('src="../assets/js/dashboard.js"'), 'dashboard.js included in profile.html');

// 2. Check patient/dashboard.html and patient/receipts.html consistency targets
const dashHtmlPath = path.join(__dirname, '..', 'patient', 'dashboard.html');
const dashHtml = fs.readFileSync(dashHtmlPath, 'utf8');
assert(dashHtml.includes('id="patientGreeting"'), 'patientGreeting target exists in patient/dashboard.html');

const receiptHtmlPath = path.join(__dirname, '..', 'patient', 'receipts.html');
const receiptHtml = fs.readFileSync(receiptHtmlPath, 'utf8');
assert(receiptHtml.includes('id="receiptPatientName"'), 'receiptPatientName target exists in patient/receipts.html');

// 3. Inspect assets/js/dashboard.js content
const dashJsPath = path.join(__dirname, '..', 'assets', 'js', 'dashboard.js');
const dashJs = fs.readFileSync(dashJsPath, 'utf8');

assert(dashJs.includes("const PROFILE_STORAGE_KEY = 'physiolife_patient_profile'"), 'PROFILE_STORAGE_KEY defined');
assert(dashJs.includes('function getStoredPatientProfile()'), 'getStoredPatientProfile function exists');
assert(dashJs.includes('function savePatientProfile('), 'savePatientProfile function exists');
assert(dashJs.includes('function validatePatientProfile('), 'validatePatientProfile function exists');
assert(dashJs.includes('function applyPatientProfileToUI('), 'applyPatientProfileToUI function exists');
assert(dashJs.includes('function initProfilePage()'), 'initProfilePage function exists');
assert(dashJs.includes('window.PhysioProfile ='), 'window.PhysioProfile is exported');

// 4. Interactive DOM & State Simulation (Simulating Flow 10)
console.log('\n--- Running Interactive Flow Simulation ---');

// Mock localStorage
const localStorageStore = {};
const mockLocalStorage = {
  getItem: (k) => localStorageStore[k] || null,
  setItem: (k, v) => { localStorageStore[k] = String(v); },
  removeItem: (k) => { delete localStorageStore[k]; }
};

// Mock Document and Elements
class MockElement {
  constructor(tag, id = '') {
    this.tagName = tag.toUpperCase();
    this.id = id;
    this.className = '';
    this.value = '';
    this.textContent = '';
    this.innerHTML = '';
    this.style = {};
    this.attributes = {};
    this.classList = {
      classes: new Set(),
      add: (c) => {
        this.classList.classes.add(c);
        this.className = Array.from(this.classList.classes).join(' ');
      },
      remove: (c) => {
        this.classList.classes.delete(c);
        this.className = Array.from(this.classList.classes).join(' ');
      },
      contains: (c) => this.classList.classes.has(c)
    };
    this.children = [];
    this.parentElement = null;
    this.listeners = {};
  }
  setAttribute(k, v) { this.attributes[k] = v; }
  getAttribute(k) { return this.attributes[k] || null; }
  appendChild(child) { this.children.push(child); child.parentElement = this; }
  remove() {
    if (this.parentElement) {
      const idx = this.parentElement.children.indexOf(this);
      if (idx !== -1) this.parentElement.children.splice(idx, 1);
    }
  }
  addEventListener(evt, fn) {
    if (!this.listeners[evt]) this.listeners[evt] = [];
    this.listeners[evt].push(fn);
  }
  dispatchEvent(evt) {
    if (this.listeners[evt]) {
      this.listeners[evt].forEach(fn => fn.call(this, { target: this, preventDefault: () => {} }));
    }
  }
  focus() { this._focused = true; }
  reset() {
    this.value = '';
    this.children.forEach(c => { if (c.reset) c.reset(); else c.value = ''; });
  }
  querySelector(sel) {
    for (let ch of this.children) {
      if (sel.startsWith('.') && (ch.className.includes(sel.slice(1)) || ch.classList.contains(sel.slice(1)))) return ch;
      if (ch.children) {
        const found = ch.querySelector(sel);
        if (found) return found;
      }
    }
    return null;
  }
  querySelectorAll(sel) {
    let res = [];
    for (let ch of this.children) {
      if (sel.startsWith('.') && (ch.className.includes(sel.slice(1)) || ch.classList.contains(sel.slice(1)))) res.push(ch);
      if (ch.children) res = res.concat(ch.querySelectorAll(sel));
    }
    return res;
  }
}

const mockDoc = {
  elements: {},
  getElementById(id) { return this.elements[id] || null; },
  querySelectorAll(sel) {
    let res = [];
    Object.values(this.elements).forEach(el => {
      if (sel.startsWith('.') && el.className.includes(sel.slice(1))) {
        res.push(el);
      } else if (sel.includes(el.tagName.toLowerCase())) {
        res.push(el);
      } else if (sel.includes('#' + el.id)) {
        res.push(el);
      }
    });
    return res;
  },
  createElement(tag) { return new MockElement(tag); },
  body: new MockElement('body')
};

// Create mock elements for Profile Page
const profileForm = new MockElement('form', 'profileForm');
const nameInput = new MockElement('input', 'profileFullName');
const dobInput = new MockElement('input', 'profileDob');
const emailInput = new MockElement('input', 'profileEmail');
const phoneInput = new MockElement('input', 'profilePhone');
const addressInput = new MockElement('input', 'profileAddress');
const saveBtn = new MockElement('button', 'saveProfileBtn');

// Invalid feedback elements
[nameInput, dobInput, emailInput, phoneInput, addressInput].forEach(inp => {
  const wrapper = new MockElement('div');
  const fb = new MockElement('div');
  fb.className = 'invalid-feedback';
  wrapper.children.push(inp, fb);
  inp.parentElement = wrapper;
});

profileForm.children.push(nameInput.parentElement, dobInput.parentElement, emailInput.parentElement, phoneInput.parentElement, addressInput.parentElement, saveBtn);

const userNameSidebar = new MockElement('div');
userNameSidebar.className = 'user-name';
userNameSidebar.textContent = 'Robert Sterling';

const avatarEl = new MockElement('img');
avatarEl.className = 'user-avatar';
avatarEl.setAttribute('alt', 'Robert Sterling');

const greetingEl = new MockElement('h2', 'patientGreeting');
greetingEl.className = 'dashboard-greeting';
greetingEl.textContent = 'Good Morning, Robert! 👋';

const receiptNameEl = new MockElement('h6', 'receiptPatientName');
receiptNameEl.textContent = 'Robert Sterling';

const emergencyName = new MockElement('h6', 'emergencyContactName');
emergencyName.textContent = 'Clara Sterling';

mockDoc.elements['profileForm'] = profileForm;
mockDoc.elements['profileFullName'] = nameInput;
mockDoc.elements['profileDob'] = dobInput;
mockDoc.elements['profileEmail'] = emailInput;
mockDoc.elements['profilePhone'] = phoneInput;
mockDoc.elements['profileAddress'] = addressInput;
mockDoc.elements['saveProfileBtn'] = saveBtn;
mockDoc.elements['patientGreeting'] = greetingEl;
mockDoc.elements['receiptPatientName'] = receiptNameEl;
mockDoc.elements['emergencyContactName'] = emergencyName;
mockDoc.elements['sidebarUserName'] = userNameSidebar;
mockDoc.elements['userAvatar'] = avatarEl;

// Change Password mock
const pwForm = new MockElement('form', 'changePasswordForm');
const curPw = new MockElement('input', 'currentPassword');
const newPw = new MockElement('input', 'newPassword');
const curPwWrap = new MockElement('div');
const curPwFb = new MockElement('div'); curPwFb.className = 'invalid-feedback';
curPwWrap.children.push(curPw, curPwFb); curPw.parentElement = curPwWrap;

const newPwWrap = new MockElement('div');
const newPwFb = new MockElement('div'); newPwFb.className = 'invalid-feedback';
newPwWrap.children.push(newPw, newPwFb); newPw.parentElement = newPwWrap;

pwForm.children.push(curPwWrap, newPwWrap);
mockDoc.elements['changePasswordForm'] = pwForm;
mockDoc.elements['currentPassword'] = curPw;
mockDoc.elements['newPassword'] = newPw;

// Capture toasts
let lastToast = null;
const mockWindow = {
  PhysioDashboard: {},
  PhysioProfile: {}
};

// Evaluate the dashboard.js functions within mock sandbox
const sandboxCode = `
  ${dashJs}
`;

let domLoadedHandler = null;
const sandboxDocument = {
  addEventListener(evt, fn) {
    if (evt === 'DOMContentLoaded') domLoadedHandler = fn;
  },
  getElementById: (id) => mockDoc.getElementById(id),
  querySelector: (sel) => {
    const list = mockDoc.querySelectorAll(sel);
    return list.length > 0 ? list[0] : null;
  },
  querySelectorAll: (sel) => mockDoc.querySelectorAll(sel),
  createElement: (tag) => mockDoc.createElement(tag),
  body: mockDoc.body
};

// Run dashboard script setup
const runSandbox = new Function('window', 'document', 'localStorage', 'sessionStorage', 'console', sandboxCode);
runSandbox(mockWindow, sandboxDocument, mockLocalStorage, mockLocalStorage, console);

// Execute DOMContentLoaded
if (domLoadedHandler) domLoadedHandler();

const PhysioProfile = mockWindow.PhysioProfile;
assert(typeof PhysioProfile === 'object' && PhysioProfile.getProfile, 'PhysioProfile successfully loaded in mock window');

// Flow Test 1: Initial Default Profile
const initialProfile = PhysioProfile.getProfile();
assert(initialProfile.fullName === 'Robert Sterling', `Default initial profile is Robert Sterling (Got: ${initialProfile.fullName})`);
assert(nameInput.value === 'Robert Sterling', `Input name field initialized to Robert Sterling (Got: ${nameInput.value})`);

// Flow Test 2: Validation on Invalid Input
nameInput.value = ''; // empty name
emailInput.value = 'invalid-email-format';
profileForm.dispatchEvent('submit');

assert(nameInput.classList.contains('is-invalid'), 'Empty full name marked is-invalid');
assert(emailInput.classList.contains('is-invalid'), 'Invalid email format marked is-invalid');
assert(mockLocalStorage.getItem('physiolife_patient_profile') === null, 'Invalid data was NOT saved to localStorage');

// Flow Test 3: Edit all required fields with valid data (Requirement 10)
nameInput.value = 'John Smith';
dobInput.value = '1990-05-15';
emailInput.value = 'john.smith@example.com';
phoneInput.value = '+1 (555) 111-2222';
addressInput.value = '789 Pine Street, Suite 200, Boston, MA 02116';

// Real-time input clearing
nameInput.dispatchEvent('input');
assert(!nameInput.classList.contains('is-invalid'), 'is-invalid removed upon user input');

// Flow Test 4: Submit valid profile
profileForm.dispatchEvent('submit');

// Verify localStorage saved
const savedRaw = mockLocalStorage.getItem('physiolife_patient_profile');
assert(savedRaw !== null, 'Profile saved to localStorage under physiolife_patient_profile');
const savedData = JSON.parse(savedRaw);
assert(savedData.fullName === 'John Smith', `Saved fullName is John Smith (Got: ${savedData.fullName})`);
assert(savedData.phone === '+1 (555) 111-2222', `Saved phone is +1 (555) 111-2222 (Got: ${savedData.phone})`);
assert(savedData.email === 'john.smith@example.com', `Saved email is john.smith@example.com (Got: ${savedData.email})`);
assert(savedData.address.includes('Boston'), `Saved address contains Boston (Got: ${savedData.address})`);

// Flow Test 5: Immediate UI update on page
assert(userNameSidebar.textContent === 'John Smith', `Sidebar user-name immediately updated to John Smith (Got: ${userNameSidebar.textContent})`);
assert(avatarEl.getAttribute('alt') === 'John Smith', `Avatar alt attribute immediately updated to John Smith`);

// Flow Test 6: Navigate to Dashboard and verify greeting & sidebar
PhysioProfile.applyToUI();
assert(greetingEl.textContent.includes('John'), `Dashboard greeting updated with first name (Got: ${greetingEl.textContent})`);
assert(receiptNameEl.textContent === 'John Smith', `Receipts billed patient name updated to John Smith (Got: ${receiptNameEl.textContent})`);

// Flow Test 7: Navigate back to My Profile and verify inputs remain populated
// Clear input values to simulate clean DOM reload
nameInput.value = '';
phoneInput.value = '';
emailInput.value = '';
addressInput.value = '';
PhysioProfile.initProfilePage();

assert(nameInput.value === 'John Smith', `My Profile reloaded with saved full name John Smith (Got: ${nameInput.value})`);
assert(phoneInput.value === '+1 (555) 111-2222', `My Profile reloaded with saved phone (Got: ${phoneInput.value})`);
assert(emailInput.value === 'john.smith@example.com', `My Profile reloaded with saved email (Got: ${emailInput.value})`);

// Flow Test 8: Browser refresh simulation
const profileAfterRefresh = PhysioProfile.getProfile();
assert(profileAfterRefresh.fullName === 'John Smith', 'Data persists after simulated browser refresh');

// Flow Test 9: Verify Emergency Contact was untouched
assert(emergencyName.textContent === 'Clara Sterling', `Emergency contact remains untouched as Clara Sterling (Got: ${emergencyName.textContent})`);

// Flow Test 10: Verify Change Password works independently
curPw.value = '';
newPw.value = 'short';
pwForm.dispatchEvent('submit');
assert(curPw.classList.contains('is-invalid'), 'Empty current password triggers is-invalid on password form');

curPw.value = 'currentSecret123';
newPw.value = 'newStrongSecret2026';
pwForm.dispatchEvent('submit');
assert(!curPw.classList.contains('is-invalid'), 'Valid password submit clears is-invalid');

// Verify password submit did NOT alter the patient profile
const profileAfterPw = PhysioProfile.getProfile();
assert(profileAfterPw.fullName === 'John Smith', 'Password change did NOT overwrite patient profile');

// 5. Test Live HTTP Endpoint
const req = http.get('http://localhost:8080/patient/profile.html', res => {
  assert(res.statusCode === 200, `HTTP GET /patient/profile.html returns status 200 (Got: ${res.statusCode})`);
  let data = '';
  res.on('data', chunk => { data += chunk; });
  res.on('end', () => {
    assert(data.includes('id="profileForm"'), 'HTTP response contains profileForm');
    console.log('\n========================================================');
    if (failures === 0) {
      console.log('🎉 ALL PATIENT PROFILE TESTS PASSED SUCCESSFULLY!');
    } else {
      console.error(`💥 ${failures} TESTS FAILED.`);
    }
    console.log('========================================================');
    process.exit(failures === 0 ? 0 : 1);
  });
});

req.on('error', err => {
  assert(false, `HTTP request error: ${err.message}`);
  process.exit(1);
});
