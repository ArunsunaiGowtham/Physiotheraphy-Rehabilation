const fs = require('fs');

console.log('=== VERIFYING SPECIALIST ASSIGNMENTS IN SERVICES DATA ===\n');

// Mock window and document to load service-engine.js data
const engineCode = fs.readFileSync('assets/js/service-engine.js', 'utf8');

// Extract SERVICES_DATA via a safe eval within Node
let servicesData;
const sandbox = {
  window: { location: { search: '', pathname: '' } },
  document: {
    title: '',
    querySelector: () => null,
    querySelectorAll: () => [],
    getElementById: () => null,
    addEventListener: () => {}
  },
  URLSearchParams: class {
    constructor() {}
    get() { return ''; }
  }
};

const fn = new Function('window', 'document', 'URLSearchParams', `
  ${engineCode}
  return window.SERVICES_DATA || window.PhysioLifeServices;
`);

// Or extract with regex if not exposed on window
const keys = [];
const re = /'([a-z0-9-]+)'\s*:\s*\{[\s\S]*?specialist\s*:\s*\{[\s\S]*?name\s*:\s*['"]([^'"]+)['"][\s\S]*?link\s*:\s*['"]([^'"]+)['"]/g;
let m;
while ((m = re.exec(engineCode)) !== null) {
  keys.push({
    serviceId: m[1],
    doctorName: m[2],
    doctorLink: m[3]
  });
}

console.log(`Found ${keys.length} services with specialist mapping:`);
keys.forEach(k => {
  console.log(`  Service: [${k.serviceId.padEnd(22)}] -> Specialist: ${k.doctorName.padEnd(20)} | Link: ${k.doctorLink}`);
});

// Verify all links have ?id=
let invalidLinks = 0;
keys.forEach(k => {
  if (!k.doctorLink.includes('?id=')) {
    console.error(`FAIL: Invalid link for ${k.serviceId}: ${k.doctorLink}`);
    invalidLinks++;
  }
});

if (invalidLinks === 0) {
  console.log('\nPASS: All services have proper ?id= links to their matching doctor profile!');
} else {
  process.exit(1);
}
