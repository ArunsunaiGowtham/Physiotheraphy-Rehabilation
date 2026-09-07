const fs = require('fs');

console.log('=== VERIFYING CARE PROTOCOLS MANAGE BUTTON & MODALS ===\n');

const html = fs.readFileSync('admin/treatment-plans.html', 'utf8');

// 1. Verify Modals and IDs exist in HTML
const requiredElements = [
  'id="manageProtocolModal"',
  'id="createProtocolModal"',
  'id="openCreateProtocolBtn"',
  'id="protocolsTableBody"',
  'id="protocolAlertSuccess"',
  'id="protocolAlertText"',
  'id="protocolCountBadge"',
  'id="dashTableSearch"',
  'id="manageProtoId"',
  'id="manageProtoName"',
  'id="manageProtoPathology"',
  'id="manageProtoDoctor"',
  'id="manageProtoDuration"',
  'id="manageProtoPhases"',
  'id="manageProtoPatients"',
  'id="manageProtoStatus"',
  'id="manageProtoDesc"',
  'id="manageProtoPhasesList"',
  'onclick="window.openManageProtocol(\'p1\')"',
  'onclick="window.openManageProtocol(\'p2\')"',
  'onclick="window.openManageProtocol(\'p3\')"',
  'onclick="window.openManageProtocol(\'p4\')"'
];

console.log('1. Checking HTML structure and modal bindings:');
let missing = [];
requiredElements.forEach(item => {
  if (!html.includes(item)) {
    missing.push(item);
  }
});

if (missing.length > 0) {
  console.error('FAIL: Missing elements in admin/treatment-plans.html:', missing);
  process.exit(1);
} else {
  console.log(`  ✓ All ${requiredElements.length} required modal elements and Manage click handlers found!`);
}

// 2. Extract and test controller script execution
console.log('\n2. Testing Care Protocol Controller Functions:');

const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>\s*<\/body>/);
if (!scriptMatch) {
  console.error('FAIL: Controller script not found in admin/treatment-plans.html');
  process.exit(1);
}

const scriptCode = scriptMatch[1];

// Setup mock environment
const storageData = {};
const mockStorage = {
  getItem: (k) => storageData[k] || null,
  setItem: (k, v) => { storageData[k] = v; },
  removeItem: (k) => { delete storageData[k]; }
};

const domElements = {};
const mockDoc = {
  getElementById: (id) => {
    if (!domElements[id]) {
      domElements[id] = {
        id,
        value: '',
        textContent: '',
        innerHTML: '',
        style: {},
        classList: {
          contains: () => false,
          add: () => {},
          remove: () => {}
        },
        querySelectorAll: () => [],
        querySelector: () => null,
        appendChild: () => {},
        scrollIntoView: () => {},
        addEventListener: () => {}
      };
    }
    return domElements[id];
  },
  querySelectorAll: () => [],
  addEventListener: () => {},
  createElement: () => ({ className: '', innerHTML: '', querySelectorAll: () => [] })
};

const mockWindow = {
  location: { pathname: '/admin/treatment-plans.html' },
  localStorage: mockStorage,
  PhysioDashboard: {
    showToast: (msg) => console.log(`   [Toast Notification]: "${msg}"`)
  },
  confirm: () => true
};

const mockBootstrap = {
  Modal: {
    getOrCreateInstance: () => ({
      show: () => console.log('   [Bootstrap Modal]: show() called'),
      hide: () => console.log('   [Bootstrap Modal]: hide() called')
    }),
    getInstance: () => null
  }
};

const runController = new Function('window', 'document', 'localStorage', 'bootstrap', `
  ${scriptCode}
`);

runController(mockWindow, mockDoc, mockStorage, mockBootstrap);

// Test openManageProtocol for p1 (Lumbar Disc)
console.log('\nTesting Manage button for "p1" (Lumbar Disc):');
mockWindow.openManageProtocol('p1');
console.log('  Loaded Protocol Name:   ', domElements['manageProtoName'].value);
console.log('  Loaded Target Pathology:', domElements['manageProtoPathology'].value);
console.log('  Loaded Doctor:          ', domElements['manageProtoDoctor'].value);
console.log('  Loaded Duration:        ', domElements['manageProtoDuration'].value);
console.log('  Loaded Patients:        ', domElements['manageProtoPatients'].value);

if (domElements['manageProtoName'].value !== 'Lumbar Disc Decompression & McKenzie') {
  console.error('FAIL: p1 did not load expected name!');
  process.exit(1);
}

// Test openManageProtocol for p2 (ACL)
console.log('\nTesting Manage button for "p2" (ACL Reconstruction):');
mockWindow.openManageProtocol('p2');
console.log('  Loaded Protocol Name:   ', domElements['manageProtoName'].value);
console.log('  Loaded Doctor:          ', domElements['manageProtoDoctor'].value);

if (domElements['manageProtoName'].value !== 'ACL Reconstruction Return-to-Sport') {
  console.error('FAIL: p2 did not load expected name!');
  process.exit(1);
}

// Test Saving Changes
console.log('\nTesting Save Changes to Protocol:');
domElements['manageProtoDuration'].value = '7 – 9 Weeks (Updated)';
domElements['manageProtoPatients'].value = '90 Patients';
mockWindow.saveProtocolChanges();

// Re-open to verify persistence
mockWindow.openManageProtocol('p2');
console.log('  Updated Duration in storage:', domElements['manageProtoDuration'].value);
console.log('  Updated Patients in storage:', domElements['manageProtoPatients'].value);

if (domElements['manageProtoDuration'].value !== '7 – 9 Weeks (Updated)') {
  console.error('FAIL: Protocol update did not persist!');
  process.exit(1);
}

console.log('\n=== ALL CARE PROTOCOL "MANAGE" BUTTON TESTS PASSED SUCCESSFULLY! ===');
