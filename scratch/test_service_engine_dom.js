const fs = require('fs');

const engineCode = fs.readFileSync('assets/js/service-engine.js', 'utf-8');

// Mock browser DOM
const documentMock = {
  getElementById: (id) => ({
    textContent: '',
    innerHTML: '',
    src: '',
    alt: '',
    classList: { add: () => {}, remove: () => {}, contains: () => false },
    setAttribute: () => {},
    addEventListener: () => {}
  }),
  querySelector: () => ({ textContent: '', innerHTML: '' }),
  querySelectorAll: () => [],
  addEventListener: () => {}
};

const windowMock = {
  location: { search: '?service=aquatic-therapy', pathname: '/service-details.html' },
  addEventListener: () => {}
};

try {
  const fn = new Function('window', 'document', 'URLSearchParams', engineCode);
  fn(windowMock, documentMock, URLSearchParams);
  console.log('[PASS] service-engine.js initialized successfully in mock browser environment!');
} catch (e) {
  console.error('[FAIL] Error evaluating service-engine.js:', e);
  process.exit(1);
}
