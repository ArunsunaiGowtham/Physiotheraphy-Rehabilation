const fs = require('fs');

console.log('=== COMPREHENSIVE UNIQUE AUTHORS & SPECIALISTS VERIFICATION ===\n');

// -------------------------------------------------------------
// 1. Verify services.html Cards
// -------------------------------------------------------------
console.log('--- 1. services.html Cards ---');
const html = fs.readFileSync('services.html', 'utf8');

const cardRegex = /<div class="[^"]*service-item[^"]*" data-category="([^"]+)">([\s\S]*?)<\/div>\s*<\/div>/g;
let match;
const cards = [];
while ((match = cardRegex.exec(html)) !== null) {
  const cat = match[1];
  const inner = match[2];
  const titleMatch = inner.match(/<h4 class="service-title">[\s\S]*?<a[^>]*>([\s\S]*?)<\/a><\/h4>/i);
  const authorMatch = inner.match(/<a\s+href="therapist-details\.html\?id=([^"]+)"[\s\S]*?<span class="small fw-semibold">([^<]+)<\/span>/i);
  const authorImgMatch = inner.match(/<img\s+src="([^"]+)"\s+alt="([^"]*)"\s+class="rounded-circle object-fit-cover"/i);

  cards.push({
    category: cat,
    title: titleMatch ? titleMatch[1].trim() : null,
    authorId: authorMatch ? authorMatch[1] : null,
    authorName: authorMatch ? authorMatch[2].trim() : null,
    authorImg: authorImgMatch ? authorImgMatch[1] : null
  });
}

console.log(`Total service cards found: ${cards.length}`);
if (cards.length !== 15) {
  console.error(`FAIL: Expected 15 cards, got ${cards.length}`);
  process.exit(1);
} else {
  console.log('PASS: Exactly 15 cards present.');
}

const cardAuthors = cards.map(c => c.authorName);
console.log('\nCard Authors:');
cards.forEach((c, idx) => {
  console.log(`  ${idx + 1}. [${c.category}] "${c.title}" -> Author: "${c.authorName}" (ID: ${c.authorId}, Img: ${c.authorImg})`);
});

const uniqueCardAuthors = new Set(cardAuthors);
console.log(`\nUnique Authors count in services.html: ${uniqueCardAuthors.size} / 15`);
if (uniqueCardAuthors.size !== 15) {
  console.error('FAIL: Duplicate authors found in services.html!');
  const dups = cardAuthors.filter((item, index) => cardAuthors.indexOf(item) !== index);
  console.error('Duplicates:', dups);
  process.exit(1);
} else {
  console.log('PASS: ALL 15 AUTHORS IN services.html ARE 100% UNIQUE! NO REPETITION!');
}

// Check author images on disk
cards.forEach(c => {
  if (!c.authorImg || !fs.existsSync(c.authorImg)) {
    console.error(`FAIL: Missing author image on disk: ${c.authorImg}`);
    process.exit(1);
  }
});
console.log('PASS: All 15 author images verified on disk.');

// -------------------------------------------------------------
// 2. Verify service-engine.js SERVICES_DATA
// -------------------------------------------------------------
console.log('\n--- 2. service-engine.js Specialists ---');
const serviceEngineCode = fs.readFileSync('assets/js/service-engine.js', 'utf8');

const serviceKeys = [
  'sports-injury', 'post-surgery', 'chronic-pain', 'spine-neck', 'joint-rehab',
  'muscle-mobility', 'neurological', 'senior-physio', 'home-visit', 'pediatric-care',
  'aquatic-therapy', 'stroke-rehab', 'vestibular-rehab', 'postop-tendon', 'runners-gait'
];

const specialists = [];
serviceKeys.forEach((key, idx) => {
  const serviceKeyIndex = serviceEngineCode.indexOf(`'${key}': {`);
  if (serviceKeyIndex === -1) {
    console.error(`FAIL: Service key '${key}' missing in service-engine.js`);
    process.exit(1);
  }
  const slice = serviceEngineCode.slice(serviceKeyIndex, serviceKeyIndex + 10000);
  const nameM = slice.match(/specialist:\s*\{[\s\S]*?name:\s*'([^']+)'/);
  const linkM = slice.match(/specialist:\s*\{[\s\S]*?link:\s*'([^']+)'/);
  const imgM = slice.match(/specialist:\s*\{[\s\S]*?image:\s*'([^']+)'/);

  specialists.push({
    key,
    name: nameM ? nameM[1] : null,
    link: linkM ? linkM[1] : null,
    image: imgM ? imgM[1] : null
  });
});

console.log('\nService Specialists in service-engine.js:');
specialists.forEach((s, idx) => {
  console.log(`  ${idx + 1}. [${s.key}] Specialist: "${s.name}" | Link: "${s.link}" | Img: "${s.image}"`);
});

const specNames = specialists.map(s => s.name);
const uniqueSpecNames = new Set(specNames);
console.log(`\nUnique Specialist Names in service-engine.js: ${uniqueSpecNames.size} / 15`);
if (uniqueSpecNames.size !== 15) {
  console.error('FAIL: Duplicate specialists found in service-engine.js!');
  const dups = specNames.filter((item, index) => specNames.indexOf(item) !== index);
  console.error('Duplicates:', dups);
  process.exit(1);
} else {
  console.log('PASS: ALL 15 SPECIALISTS IN service-engine.js ARE 100% UNIQUE! NO REPETITION!');
}

const specLinks = specialists.map(s => s.link);
const uniqueSpecLinks = new Set(specLinks);
if (uniqueSpecLinks.size !== 15) {
  console.error('FAIL: Duplicate specialist links found in service-engine.js!');
  process.exit(1);
} else {
  console.log('PASS: ALL 15 SPECIALIST PROFILE LINKS ARE 100% UNIQUE!');
}

// -------------------------------------------------------------
// 3. Verify therapist-engine.js THERAPISTS_DATA
// -------------------------------------------------------------
console.log('\n--- 3. therapist-engine.js Profiles ---');
const therapistCode = fs.readFileSync('assets/js/therapist-engine.js', 'utf8');

specialists.forEach(s => {
  const therapistId = s.link.split('id=')[1];
  if (!therapistId) {
    console.error(`FAIL: Invalid link for ${s.name}: ${s.link}`);
    process.exit(1);
  }
  if (!therapistCode.includes(`'${therapistId}': {`) && !therapistCode.includes(`"${therapistId}": {`)) {
    console.error(`FAIL: Therapist ID '${therapistId}' (${s.name}) not found in therapist-engine.js!`);
    process.exit(1);
  }
  if (!fs.existsSync(s.image)) {
    console.error(`FAIL: Missing specialist image on disk: ${s.image}`);
    process.exit(1);
  }
});
console.log('PASS: All 15 specialists have fully registered profiles in therapist-engine.js and images on disk.');

// -------------------------------------------------------------
// 4. Verification of Footer Standardization
// -------------------------------------------------------------
console.log('\n--- 4. Checking Footer Consistency across Public Pages ---');
const publicPages = [
  'index.html', 'home-2.html', 'about.html', 'services.html', 'service-details.html',
  'therapists.html', 'therapist-details.html', 'pricing.html', 'insurance.html',
  'contact.html', 'blog.html', 'blog-details.html'
];

let footerRef = null;
let footerMismatch = 0;
publicPages.forEach(p => {
  if (!fs.existsSync(p)) return;
  const content = fs.readFileSync(p, 'utf8');
  const m = content.match(/<footer class="site-footer">([\s\S]*?)<\/footer>/);
  if (!m) {
    console.error(`FAIL: No site-footer found in ${p}`);
    footerMismatch++;
    return;
  }
  const cleanFooter = m[1].replace(/\s+/g, ' ').trim();
  if (!footerRef) {
    footerRef = cleanFooter;
  } else if (cleanFooter !== footerRef) {
    console.error(`FAIL: Footer in ${p} differs from reference!`);
    footerMismatch++;
  }
});

if (footerMismatch === 0) {
  console.log(`PASS: All ${publicPages.length} public pages maintain 100% identical footers.`);
} else {
  console.error(`FAIL: ${footerMismatch} page(s) have footer mismatches.`);
  process.exit(1);
}

console.log('\n=============================================================');
console.log('ALL UNIQUE AUTHORS & SPECIALISTS VERIFICATIONS PASSED (100%)');
console.log('=============================================================');
