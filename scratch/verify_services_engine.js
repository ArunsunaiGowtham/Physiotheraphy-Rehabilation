const fs = require('fs');
const path = require('path');

console.log('=== VERIFYING SERVICES REDIRECTION & ENGINE ===\n');

let failed = false;

// 1. Verify services.html links
const servicesHtml = fs.readFileSync('services.html', 'utf8');
const expectedServices = [
  'sports-injury',
  'post-surgery',
  'chronic-pain',
  'spine-neck',
  'joint-rehab',
  'muscle-mobility',
  'neurological',
  'posture-correction',
  'senior-physio',
  'home-visit'
];

console.log('1. Checking services.html links for all 10 services...');
expectedServices.forEach(id => {
  const query = `service-details.html?service=${id}`;
  const count = (servicesHtml.split(query).length - 1);
  if (count >= 3) {
    console.log(`  [PASS] ${id}: found ${count} links (image, title, learn more)`);
  } else if (count > 0) {
    console.log(`  [WARN] ${id}: found ${count} link(s) (expected >= 3)`);
  } else {
    console.log(`  [FAIL] ${id}: missing links in services.html!`);
    failed = true;
  }
});

// Check if any old unparameterized service-details.html remain in services.html
const unparamLinks = (servicesHtml.match(/href="service-details\.html"/g) || []).length;
if (unparamLinks === 0) {
  console.log('  [PASS] Zero unparameterized service-details.html links found in services.html.');
} else {
  console.log(`  [FAIL] Found ${unparamLinks} unparameterized service-details.html link(s) in services.html!`);
  failed = true;
}

// 2. Verify service-engine.js data
console.log('\n2. Checking assets/js/service-engine.js dataset...');
const engineCode = fs.readFileSync('assets/js/service-engine.js', 'utf8');
const vm = require('vm');

// Create mock window environment
const mockWindow = {
  URLSearchParams: URLSearchParams,
  location: { search: '', pathname: '/service-details.html' },
  document: {
    readyState: 'complete',
    title: '',
    querySelector: () => null,
    getElementById: () => null,
    addEventListener: () => {}
  }
};
mockWindow.window = mockWindow;

const context = vm.createContext(mockWindow);
try {
  vm.runInContext(engineCode, context);
  const engine = mockWindow.PhysioLifeServices;
  if (!engine) {
    console.log('  [FAIL] PhysioLifeServices not exported on window!');
    failed = true;
  } else {
    const all = engine.getAllServices();
    console.log(`  [PASS] Loaded ${Object.keys(all).length} services from dataset.`);
    
    expectedServices.forEach(id => {
      const s = all[id];
      if (!s) {
        console.log(`  [FAIL] Missing service data for '${id}'`);
        failed = true;
        return;
      }
      
      // Validate image exists on disk
      const heroExists = fs.existsSync(s.heroImage);
      const modExists = fs.existsSync(s.modalityImage);
      const specExists = fs.existsSync(s.specialist.image);
      
      if (!heroExists) {
        console.log(`  [FAIL] ${id}: heroImage not found on disk: ${s.heroImage}`);
        failed = true;
      }
      if (!modExists) {
        console.log(`  [FAIL] ${id}: modalityImage not found on disk: ${s.modalityImage}`);
        failed = true;
      }
      if (!specExists) {
        console.log(`  [FAIL] ${id}: specialist image not found on disk: ${s.specialist.image}`);
        failed = true;
      }
      
      if (s.symptoms.length !== 6) {
        console.log(`  [WARN] ${id}: symptoms count is ${s.symptoms.length} (expected 6)`);
      }
      if (s.modalities.length !== 3) {
        console.log(`  [WARN] ${id}: modalities count is ${s.modalities.length} (expected 3)`);
      }
      if (s.packages.length !== 3) {
        console.log(`  [WARN] ${id}: packages count is ${s.packages.length} (expected 3)`);
      }
      if (s.faqs.length !== 3) {
        console.log(`  [WARN] ${id}: faqs count is ${s.faqs.length} (expected 3)`);
      }
      if (!s.relatedArticles || s.relatedArticles.length < 2) {
        console.log(`  [WARN] ${id}: relatedArticles count is ${s.relatedArticles ? s.relatedArticles.length : 0}`);
      }
      
      console.log(`  [PASS] ${id}: Title="${s.title}", Specialist="${s.specialist.name}", Assets OK`);
    });
  }
} catch (e) {
  console.log('  [FAIL] Error evaluating service-engine.js:', e);
  failed = true;
}

// 3. Verify service-details.html contains ID hooks and script tag
console.log('\n3. Checking service-details.html markup and hooks...');
const detailsHtml = fs.readFileSync('service-details.html', 'utf8');
const requiredHooks = [
  'assets/js/service-engine.js',
  'id="serviceBreadcrumb"',
  'id="serviceBadgeTag"',
  'id="serviceTitle"',
  'id="serviceSubtitle"',
  'id="serviceHeroImg"',
  'id="serviceOverviewContainer"',
  'id="serviceSymptomsContainer"',
  'id="serviceModalityImg"',
  'id="serviceModalitiesContainer"',
  'id="servicePricingHeading"',
  'id="servicePricingTbody"',
  'id="serviceFaqAccordion"',
  'id="serviceRelatedArticlesContainer"',
  'id="serviceSpecialistCard"',
  'id="serviceSpecialistImg"',
  'id="serviceSpecialistName"',
  'id="serviceSpecialistRole"',
  'id="serviceSpecialistBio"',
  'id="serviceSpecialistLink"',
  'id="serviceRelatedList"'
];

requiredHooks.forEach(hook => {
  if (detailsHtml.includes(hook)) {
    console.log(`  [PASS] Found hook: ${hook}`);
  } else {
    console.log(`  [FAIL] Missing required hook in service-details.html: ${hook}`);
    failed = true;
  }
});

// 4. Verify index.html services
console.log('\n4. Checking index.html services links...');
const indexHtml = fs.readFileSync('index.html', 'utf8');
const expectedIndexServices = [
  'spine-neck',
  'sports-injury',
  'post-surgery',
  'joint-rehab',
  'posture-correction',
  'home-visit'
];

expectedIndexServices.forEach(id => {
  const query = `service-details.html?service=${id}`;
  if (indexHtml.includes(query)) {
    console.log(`  [PASS] index.html links to ${query}`);
  } else {
    console.log(`  [FAIL] index.html missing link for ${query}`);
    failed = true;
  }
});

console.log('\n=== TEST SUMMARY ===');
if (failed) {
  console.log('RESULT: SOME CHECKS FAILED!');
  process.exit(1);
} else {
  console.log('RESULT: ALL CHECKS PASSED SUCCESSFULLY!');
}
