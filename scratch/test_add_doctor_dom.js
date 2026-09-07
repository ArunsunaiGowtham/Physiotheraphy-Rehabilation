const fs = require('fs');
const assert = require('assert');

console.log('===========================================================');
console.log('Simulating Add Doctor DOM Submission & LocalStorage Sync');
console.log('===========================================================');

// Mock a browser environment
const localStorageStore = {};
global.localStorage = {
  getItem: (k) => localStorageStore[k] || null,
  setItem: (k, v) => { localStorageStore[k] = String(v); },
  removeItem: (k) => { delete localStorageStore[k]; },
  clear: () => { for (let k in localStorageStore) delete localStorageStore[k]; }
};

// Simple DOM element mock
class MockElement {
  constructor(tag, id = '') {
    this.tagName = tag;
    this.id = id;
    this.value = '';
    this.textContent = '';
    this.innerHTML = '';
    this.classList = {
      _classes: new Set(),
      add: function (c) { this._classes.add(c); },
      remove: function (c) { this._classes.delete(c); },
      contains: function (c) { return this._classes.has(c); }
    };
    this.listeners = {};
  }
  reset() {
    this.value = '';
  }
  addEventListener(event, handler) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(handler);
  }
  dispatchEvent(event) {
    if (this.listeners[event.type]) {
      this.listeners[event.type].forEach(h => h(event));
    }
  }
}

// Extract script from admin/therapists.html
const html = fs.readFileSync('admin/therapists.html', 'utf8');
const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>\s*<\/body>/);
assert(scriptMatch, 'Must find script block in admin/therapists.html');

const scriptContent = scriptMatch[1];

// Set up mock document
const elements = {
  'therapistsTableBody': new MockElement('tbody', 'therapistsTableBody'),
  'therapistCount': new MockElement('span', 'therapistCount'),
  'addTherapistModal': new MockElement('div', 'addTherapistModal'),
  'addTherapistForm': new MockElement('form', 'addTherapistForm'),
  'addTherapistAlert': new MockElement('div', 'addTherapistAlert'),
  'newDocName': new MockElement('input', 'newDocName'),
  'newDocEmail': new MockElement('input', 'newDocEmail'),
  'newDocDept': new MockElement('select', 'newDocDept'),
  'newDocQuals': new MockElement('input', 'newDocQuals'),
  'newDocCaseload': new MockElement('input', 'newDocCaseload'),
  'newDocRating': new MockElement('input', 'newDocRating'),
  'newDocStatus': new MockElement('select', 'newDocStatus'),
  'newDocLicense': new MockElement('input', 'newDocLicense'),
  'newDocAvatar': new MockElement('select', 'newDocAvatar')
};

global.document = {
  getElementById: (id) => elements[id] || null,
  addEventListener: (event, handler) => {
    if (event === 'DOMContentLoaded') handler();
  }
};
global.window = {
  document: global.document,
  PhysioDashboard: {
    showToast: (msg) => console.log('   Toast Notification:', msg)
  }
};
global.bootstrap = {
  Modal: {
    getInstance: () => ({ hide: () => console.log('   Bootstrap Modal closed successfully.') })
  }
};

// Execute therapists.html script
eval(scriptContent);

console.log('\n[1] Initial State:');
console.log('   Clinician Count:', elements.therapistCount.textContent);
assert.strictEqual(elements.therapistCount.textContent, '4 Clinicians');
assert(elements.therapistsTableBody.innerHTML.includes('Dr. Sarah Jenkins'));
assert(elements.therapistsTableBody.innerHTML.includes('Dr. Marcus Vance'));

console.log('\n[2] Filling & Submitting "Add Doctor" Form:');
elements.newDocName.value = 'Dr. Jessica Hayes';
elements.newDocEmail.value = 'jessica.hayes@physiolife.com';
elements.newDocDept.value = 'Sports Injury & Athletic Performance';
elements.newDocQuals.value = 'PT, DPT, SCS';
elements.newDocCaseload.value = '22 Patients';
elements.newDocRating.value = '5.0';
elements.newDocStatus.value = 'Available';
elements.newDocLicense.value = 'NY-PT-981245';
elements.newDocAvatar.value = '../assets/images/therapist-1.svg';

// Trigger form submission
const submitEvent = {
  type: 'submit',
  preventDefault: () => {}
};
elements.addTherapistForm.dispatchEvent(submitEvent);

console.log('\n[3] Verifying Post-Submission Table & LocalStorage State:');
console.log('   New Clinician Count:', elements.therapistCount.textContent);
assert.strictEqual(elements.therapistCount.textContent, '5 Clinicians');
assert(elements.therapistsTableBody.innerHTML.includes('Dr. Jessica Hayes'), 'Table must include Dr. Jessica Hayes');
assert(elements.therapistsTableBody.innerHTML.includes('jessica.hayes@physiolife.com'), 'Table must include doctor email');
assert(elements.therapistsTableBody.innerHTML.includes('22 Patients'), 'Table must include caseload');
assert(elements.therapistsTableBody.innerHTML.includes('Sports Injury &amp; Athletic Performance') || elements.therapistsTableBody.innerHTML.includes('Sports Injury & Athletic Performance'), 'Table must include department');

const stored = JSON.parse(global.localStorage.getItem('physiolife_admin_therapists'));
assert.strictEqual(stored.length, 5, 'LocalStorage must contain 5 therapists');
assert.strictEqual(stored[0].name, 'Dr. Jessica Hayes', 'First stored therapist must be newly added doctor');

console.log('\n===========================================================');
console.log('🎉 ADD DOCTOR DOM & STORAGE VERIFICATION PASSED PERFECTLY!');
console.log('===========================================================');
