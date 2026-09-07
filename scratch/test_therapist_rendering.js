const fs = require('fs');

console.log('=== COMPREHENSIVE VERIFICATION: VIEW PROFILE & DOCTOR MATCHING ===\n');

const engineCode = fs.readFileSync('assets/js/therapist-engine.js', 'utf8');
const templateHtml = fs.readFileSync('therapist-details.html', 'utf8');
const adminTherapistsHtml = fs.readFileSync('admin/therapists.html', 'utf8');

// 1. Verify template HTML contains all required DOM IDs
const requiredIds = [
  'therapistBreadcrumb',
  'therapistBannerTitle',
  'therapistBannerSubtitle',
  'therapistProfileImg',
  'therapistSidebarName',
  'therapistSidebarSpecialty',
  'therapistDegree',
  'therapistSpecialtyTag',
  'therapistExperience',
  'therapistRating',
  'therapistLanguages',
  'therapistSocialLinkedIn',
  'therapistSocialTwitter',
  'therapistSocialEmail',
  'therapistHoursMonWed',
  'therapistHoursThuFri',
  'therapistHoursSat',
  'therapistHeroImg',
  'therapistBioTitle',
  'therapistBioContainer',
  'therapistCredentialsContainer',
  'therapistBookingHeader',
  'therapistBookingSubtitle',
  'therapistFormAlert',
  'therapistSubmitBtn'
];

console.log('1. Checking therapist-details.html DOM Element IDs:');
let missingIds = [];
requiredIds.forEach(id => {
  if (!templateHtml.includes(`id="${id}"`)) {
    missingIds.push(id);
  }
});

if (missingIds.length > 0) {
  console.error('FAIL: Missing element IDs in therapist-details.html:', missingIds);
  process.exit(1);
} else {
  console.log(`  ✓ All ${requiredIds.length} dynamic IDs verified in therapist-details.html!`);
}

// 2. Verify therapist-engine.js is included in therapist-details.html
if (templateHtml.includes('<script src="assets/js/therapist-engine.js"></script>')) {
  console.log('  ✓ <script src="assets/js/therapist-engine.js"></script> is included in therapist-details.html!');
} else {
  console.error('FAIL: therapist-engine.js script tag missing in therapist-details.html!');
  process.exit(1);
}

// 3. Verify admin/therapists.html has "View Profile" buttons for all clinicians
console.log('\n2. Checking admin/therapists.html View Profile Eye Buttons:');
const expectedDoctorIds = ['jenkins', 'vance', 'rostova', 'chen'];
expectedDoctorIds.forEach(id => {
  const pattern = `therapist-details.html?id=${id}`;
  if (adminTherapistsHtml.includes(pattern)) {
    console.log(`  ✓ admin/therapists.html links to ${pattern}`);
  } else {
    console.error(`FAIL: Missing link to ${pattern} in admin/therapists.html`);
    process.exit(1);
  }
});

if (adminTherapistsHtml.includes('title="View Profile"')) {
  console.log('  ✓ title="View Profile" attribute present on action buttons!');
}

// 4. Test dynamic rendering for all doctors and custom doctors
console.log('\n3. Testing Dynamic Profile Rendering with therapist-engine.js:');

function simulateRender(queryParam, customStorageData = null) {
  const elements = {};
  const mockDoc = {
    title: '',
    getElementById: (id) => {
      if (!elements[id]) {
        elements[id] = { id, textContent: '', innerHTML: '', src: '', href: '', alt: '', setAttribute: () => {} };
      }
      return elements[id];
    },
    querySelector: (sel) => {
      if (sel.includes('meta')) {
        return { setAttribute: (k, v) => {} };
      }
      return null;
    }
  };

  const mockStorage = {
    getItem: (key) => {
      if (key === 'physiolife_admin_therapists' && customStorageData) {
        return JSON.stringify(customStorageData);
      }
      return null;
    }
  };

  const mockWindow = {
    location: {
      pathname: 'therapist-details.html',
      href: `http://localhost:3000/therapist-details.html${queryParam}`,
      search: queryParam
    },
    localStorage: mockStorage,
    addEventListener: () => {}
  };

  const runFn = new Function('window', 'document', 'URLSearchParams', 'localStorage', `
    ${engineCode}
  `);

  runFn(mockWindow, mockDoc, URLSearchParams, mockStorage);

  return { mockDoc, elements };
}

// Test cases
const testCases = [
  { param: '?id=jenkins', expectedName: 'Dr. Sarah Jenkins', expectedRole: 'Orthopedic' },
  { param: '?id=vance', expectedName: 'Dr. Marcus Vance', expectedRole: 'Sports' },
  { param: '?id=rostova', expectedName: 'Dr. Elena Rostova', expectedRole: 'Neurological' },
  { param: '?id=chen', expectedName: 'Dr. David Chen', expectedRole: 'Joint' },
  { param: '?id=bennett', expectedName: 'Dr. Chloe Bennett', expectedRole: 'Chronic Pain' },
  { param: '?id=marcus', expectedName: 'Dr. Marcus Vance', expectedRole: 'Sports' }, // Alias test
  { param: '?id=dr-chen', expectedName: 'Dr. David Chen', expectedRole: 'Joint' } // Normalized prefix test
];

testCases.forEach(tc => {
  const { mockDoc, elements } = simulateRender(tc.param);
  const renderedName = elements['therapistSidebarName'] ? elements['therapistSidebarName'].textContent : '';
  const renderedRole = elements['therapistBannerSubtitle'] ? elements['therapistBannerSubtitle'].textContent : '';
  const renderedImg = elements['therapistProfileImg'] ? elements['therapistProfileImg'].src : '';
  const renderedSubmit = elements['therapistSubmitBtn'] ? elements['therapistSubmitBtn'].innerHTML : '';

  if (renderedName.includes(tc.expectedName) && renderedRole.includes(tc.expectedRole)) {
    console.log(`  ✓ ${tc.param.padEnd(16)} -> Rendered: "${renderedName}" (${renderedImg})`);
    console.log(`    Submit button: "${renderedSubmit.trim()}"`);
  } else {
    console.error(`FAIL: ${tc.param} did not match expected "${tc.expectedName}". Got "${renderedName}".`);
    process.exit(1);
  }
});

// Test 5: Custom doctor created from Admin
console.log('\n4. Testing Custom Doctor added via Admin Roster:');
const customAdminDocs = [
  {
    id: 'dr-arthur-pendelton',
    name: 'Dr. Arthur Pendelton',
    department: 'Geriatric Orthopedics & Osteoporosis',
    qualifications: 'PT, DPT, GCS',
    caseload: '22 Patients',
    rating: '5.0',
    reviewsCount: '24',
    avatar: '../assets/images/therapist-1.svg',
    license: 'NY-PT-889900'
  }
];

const customResult = simulateRender('?id=dr-arthur-pendelton', customAdminDocs);
const customName = customResult.elements['therapistSidebarName'].textContent;
const customRole = customResult.elements['therapistBannerSubtitle'].textContent;
const customDegree = customResult.elements['therapistDegree'].textContent;
const customAvatar = customResult.elements['therapistProfileImg'].src;

if (customName.includes('Dr. Arthur Pendelton') && customRole.includes('Geriatric Orthopedics')) {
  console.log(`  ✓ Custom Admin Doctor Rendered Perfectly!`);
  console.log(`    Name: "${customName}"`);
  console.log(`    Role: "${customRole}"`);
  console.log(`    Degree: "${customDegree}"`);
  console.log(`    Avatar: "${customAvatar}"`);
} else {
  console.error('FAIL: Custom doctor failed to render properly!');
  process.exit(1);
}

console.log('\n=== ALL TESTS PASSED! "View Profile" EXACT PROFILE MATCHING IS 100% FIXED! ===');
