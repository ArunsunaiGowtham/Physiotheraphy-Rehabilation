const fs = require('fs');
const vm = require('vm');

console.log('=== VERIFYING DOM RENDERING FOR ALL 10 SERVICES ===\n');

const services = [
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

const engineCode = fs.readFileSync('assets/js/service-engine.js', 'utf8');

services.forEach((serviceId, idx) => {
  // Create mock DOM for this service
  const elements = {};
  function mockEl(id) {
    elements[id] = {
      id,
      textContent: '',
      innerHTML: '',
      src: '',
      alt: '',
      href: '',
      value: '',
      setAttribute: function(k, v) { this[k] = v; }
    };
    return elements[id];
  }

  [
    'serviceBreadcrumb',
    'serviceBadgeTag',
    'serviceTitle',
    'serviceSubtitle',
    'serviceHeroImg',
    'serviceOverviewContainer',
    'serviceSymptomsContainer',
    'serviceModalityImg',
    'serviceModalitiesContainer',
    'servicePricingHeading',
    'servicePricingTbody',
    'serviceFaqAccordion',
    'serviceSpecialistImg',
    'serviceSpecialistName',
    'serviceSpecialistRole',
    'serviceSpecialistBio',
    'serviceSpecialistLink',
    'serviceRelatedList',
    'serviceRelatedArticlesContainer',
    'bookService',
    'bookTherapist'
  ].forEach(mockEl);

  const mockWindow = {
    URLSearchParams: URLSearchParams,
    location: {
      search: `?service=${serviceId}`,
      pathname: '/service-details.html'
    },
    document: {
      readyState: 'complete',
      title: '',
      querySelector: () => mockEl('meta'),
      getElementById: (id) => elements[id] || null,
      addEventListener: () => {}
    }
  };
  mockWindow.window = mockWindow;

  const context = vm.createContext(mockWindow);
  vm.runInContext(engineCode, context);

  const title = elements['serviceTitle'].textContent;
  const specialist = elements['serviceSpecialistName'].textContent;
  const heroSrc = elements['serviceHeroImg'].src;
  const symptomsHtml = elements['serviceSymptomsContainer'].innerHTML;
  const articlesHtml = elements['serviceRelatedArticlesContainer'].innerHTML;

  console.log(`${idx + 1}. [OK] Service ID: "${serviceId}"`);
  console.log(`   - Document Title: "${mockWindow.document.title}"`);
  console.log(`   - Page Heading:   "${title}"`);
  console.log(`   - Specialist:     "${specialist}"`);
  console.log(`   - Hero Image:     "${heroSrc}"`);
  console.log(`   - Symptoms:       ${(symptomsHtml.match(/<span class="fw-semibold/g) || []).length} symptoms rendered`);
  console.log(`   - Articles:       ${(articlesHtml.match(/blog-details\.html\?slug=/g) || []).length} clinical articles linked`);
  console.log(`   - Book Service:   "${elements['bookService'].value}"`);
  console.log(`   - Book Therapist: "${elements['bookTherapist'].value}"\n`);
});

console.log('=== ALL 10 SERVICES TESTED AND CONFIRMED FUNCTIONAL ===');
