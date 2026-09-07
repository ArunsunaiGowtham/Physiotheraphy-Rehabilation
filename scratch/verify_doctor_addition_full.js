const fs = require('fs');
const assert = require('assert');

console.log('================================================================');
console.log('   FULL END-TO-END VERIFICATION: ADD DOCTOR / CLINICIAN ROSTER  ');
console.log('================================================================\n');

// 1. Storage Mock
const localStorageStore = {};
global.localStorage = {
  getItem: (k) => localStorageStore[k] || null,
  setItem: (k, v) => { localStorageStore[k] = String(v); },
  removeItem: (k) => { delete localStorageStore[k]; },
  clear: () => { for (let k in localStorageStore) delete localStorageStore[k]; }
};

// 2. Element Mock
class MockElement {
  constructor(tagName, id = '') {
    this.tagName = tagName;
    this.id = id;
    this.value = '';
    this.textContent = '';
    this.innerHTML = '';
    this.style = {};
    this.options = [];
    this.classList = {
      _set: new Set(),
      add: function (c) { this._set.add(c); },
      remove: function (c) { this._set.delete(c); },
      contains: function (c) { return this._set.has(c); }
    };
    this.listeners = {};
  }
  setAttribute(k, v) {}
  removeAttribute(k) {}
  focus() {}
  scrollIntoView() {}
  reset() { this.value = ''; }
  addEventListener(event, fn) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(fn);
  }
  dispatchEvent(event) {
    if (this.listeners[event.type]) {
      this.listeners[event.type].forEach(fn => fn(event));
    }
  }
  querySelector(sel) {
    if (sel.includes('tr[data-id=')) return new MockElement('tr');
    if (sel.includes('[data-bs-dismiss="modal"]')) return new MockElement('button');
    return null;
  }
  querySelectorAll(sel) {
    return [];
  }
  appendChild(child) {
    this.options.push(child);
  }
  prepend(child) {}
}

const elements = {
  therapistsTableBody: new MockElement('tbody', 'therapistsTableBody'),
  therapistCount: new MockElement('span', 'therapistCount'),
  tableAlertSuccess: new MockElement('div', 'tableAlertSuccess'),
  tableAlertText: new MockElement('span', 'tableAlertText'),
  addTherapistModal: new MockElement('div', 'addTherapistModal'),
  addTherapistForm: new MockElement('form', 'addTherapistForm'),
  addTherapistAlert: new MockElement('div', 'addTherapistAlert'),
  newDocName: new MockElement('input', 'newDocName'),
  newDocEmail: new MockElement('input', 'newDocEmail'),
  newDocDept: new MockElement('select', 'newDocDept'),
  newDocQuals: new MockElement('input', 'newDocQuals'),
  newDocCaseload: new MockElement('input', 'newDocCaseload'),
  newDocRating: new MockElement('input', 'newDocRating'),
  newDocStatus: new MockElement('select', 'newDocStatus'),
  newDocLicense: new MockElement('input', 'newDocLicense'),
  newDocAvatar: new MockElement('select', 'newDocAvatar'),
  btnSaveDoctor: new MockElement('button', 'btnSaveDoctor')
};

global.document = {
  readyState: 'complete',
  getElementById: (id) => elements[id] || null,
  querySelector: (sel) => {
    if (sel === '#tableAlertSuccess') return elements.tableAlertSuccess;
    return null;
  },
  querySelectorAll: (sel) => [],
  body: {
    classList: { remove: () => {} },
    style: { removeProperty: () => {} }
  },
  addEventListener: (event, fn) => {
    if (event === 'DOMContentLoaded') fn();
  }
};

global.window = {
  document: global.document,
  location: { pathname: 'admin/therapists.html', search: '' },
  PhysioDashboard: {
    showToast: (msg) => console.log('   [Toast]:', msg)
  }
};

global.bootstrap = {
  Modal: {
    getInstance: () => ({ hide: () => {} }),
    getOrCreateInstance: () => ({ hide: () => {} })
  }
};

// 3. Load admin/therapists.html script
const adminHtml = fs.readFileSync('admin/therapists.html', 'utf8');
const scriptMatch = adminHtml.match(/<script>([\s\S]*?)<\/script>\s*<\/body>/);
assert(scriptMatch, 'Must locate inline script in admin/therapists.html');
eval(scriptMatch[1]);

console.log('[TEST 1] Checking initial table rendering:');
console.log('   Clinician count badge:', elements.therapistCount.textContent);
assert.strictEqual(elements.therapistCount.textContent, '4 Clinicians');
assert(elements.therapistsTableBody.innerHTML.includes('Dr. Sarah Jenkins'));
assert(elements.therapistsTableBody.innerHTML.includes('Dr. Marcus Vance'));
assert(elements.therapistsTableBody.innerHTML.includes('Dr. Elena Rostova'));
assert(elements.therapistsTableBody.innerHTML.includes('Dr. David Chen'));
console.log('   ✓ Initial 4 clinicians rendered correctly.\n');

console.log('[TEST 2] Adding doctor with ONLY a name (smart fallbacks test):');
elements.newDocName.value = 'Dr. Gregory House';
elements.newDocEmail.value = '';     // Empty email -> must auto-generate
elements.newDocLicense.value = '';   // Empty license -> must auto-assign
elements.newDocDept.value = 'Neurological Rehabilitation';
elements.newDocQuals.value = '';     // Empty quals -> default PT, DPT, OCS
elements.newDocCaseload.value = '';  // Empty caseload -> default 15 Patients
elements.newDocRating.value = '';    // Empty rating -> default 5.0
elements.newDocStatus.value = 'Available';

assert(typeof window.saveNewDoctor === 'function', 'window.saveNewDoctor must be exposed globally');
window.saveNewDoctor();

console.log('   Clinician count after 1st addition:', elements.therapistCount.textContent);
assert.strictEqual(elements.therapistCount.textContent, '5 Clinicians');
assert(elements.therapistsTableBody.innerHTML.includes('Dr. Gregory House'), 'Table must contain Dr. Gregory House');
assert(elements.therapistsTableBody.innerHTML.includes('gregory.house@physiolife.com'), 'Email must be auto-generated');
const firstSaved = JSON.parse(localStorage.getItem('physiolife_admin_therapists'));
assert(firstSaved[0].license.includes('NY-PT-'), 'License must be auto-generated');
assert(!elements.tableAlertSuccess.classList._set.has('d-none'), 'tableAlertSuccess banner must be visible');
assert(elements.tableAlertText.innerHTML.includes('Dr. Gregory House'), 'Alert text must mention Dr. Gregory House');
console.log('   ✓ Smart fallback doctor addition passed!\n');

console.log('[TEST 3] Adding second doctor with full custom fields:');
elements.newDocName.value = 'Dr. Laura Miller';
elements.newDocEmail.value = 'laura.miller@physiolife.com';
elements.newDocLicense.value = 'NY-PT-889911';
elements.newDocDept.value = 'Sports Injury & Athletic Performance';
elements.newDocQuals.value = 'PT, DPT, SCS';
elements.newDocCaseload.value = '25 Patients';
elements.newDocRating.value = '4.9';
elements.newDocStatus.value = 'Available';

window.saveNewDoctor();

console.log('   Clinician count after 2nd addition:', elements.therapistCount.textContent);
assert.strictEqual(elements.therapistCount.textContent, '6 Clinicians');
assert(elements.therapistsTableBody.innerHTML.includes('Dr. Laura Miller'));
assert(elements.therapistsTableBody.innerHTML.includes('laura.miller@physiolife.com'));

const saved = JSON.parse(localStorage.getItem('physiolife_admin_therapists'));
assert.strictEqual(saved.length, 6, 'LocalStorage must contain 6 therapists');
assert.strictEqual(saved[0].name, 'Dr. Laura Miller');
assert.strictEqual(saved[1].name, 'Dr. Gregory House');
console.log('   ✓ Second doctor saved and persisted in localStorage!\n');

console.log('[TEST 4] Checking public therapists.html sync script:');
const publicHtml = fs.readFileSync('therapists.html', 'utf8');
assert(publicHtml.includes('id="therapistsGrid"'), 'therapists.html must have therapistsGrid ID');
assert(publicHtml.includes('physiolife_admin_therapists'), 'therapists.html must check physiolife_admin_therapists');
assert(publicHtml.includes('syncCustomTherapists'), 'therapists.html must contain syncCustomTherapists function');
console.log('   ✓ therapists.html contains dynamic sync hooks!\n');

console.log('[TEST 5] Checking therapist-engine.js custom profile lookup:');
const engineJs = fs.readFileSync('assets/js/therapist-engine.js', 'utf8');
assert(engineJs.includes('physiolife_admin_therapists'), 'therapist-engine.js must check custom therapists in storage');
assert(engineJs.includes('doc.specialty'), 'therapist-engine.js must populate specialty');
console.log('   ✓ therapist-engine.js contains custom therapist profile resolution!\n');

console.log('================================================================');
console.log('🎉 ALL 5 VERIFICATION CHECKS PASSED WITH 100% SUCCESS!');
console.log('================================================================');
