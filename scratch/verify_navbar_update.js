const fs = require('fs');
const path = require('path');

const publicPages = [
  'index.html',
  'about.html',
  'services.html',
  'service-details.html',
  'insurance.html',
  'pricing.html',
  'blog.html',
  'blog-details.html',
  'contact.html',
  'home-2.html',
  'therapists.html',
  'therapist-details.html'
];

let allPassed = true;

for (const page of publicPages) {
  const filePath = path.join(__dirname, '..', page);
  if (!fs.existsSync(filePath)) {
    console.error(`[FAIL] ${page} does not exist!`);
    allPassed = false;
    continue;
  }

  const content = fs.readFileSync(filePath, 'utf-8');

  // Extract <header class="site-header"...</header>
  const headerMatch = content.match(/<header[\s\S]*?<\/header>/i);
  if (!headerMatch) {
    console.error(`[FAIL] ${page}: Site header not found!`);
    allPassed = false;
    continue;
  }

  const header = headerMatch[0];

  // 1. Check Therapists in navbar
  if (header.includes('therapists.html') || /Therapists/i.test(header)) {
    console.error(`[FAIL] ${page}: Header still contains 'Therapists' link or text!`);
    allPassed = false;
  }

  // 2. Check Book Appointment in navbar
  if (header.includes('btn-nav-book') || /Book\s*Appointment/i.test(header)) {
    console.error(`[FAIL] ${page}: Header still contains 'Book Appointment' button or text!`);
    allPassed = false;
  }

  // 3. Check preserved nav links
  const requiredNavKeywords = ['Home', 'About', 'Services', 'Insurance', 'Pricing', 'Blog', 'Contact'];
  for (const item of requiredNavKeywords) {
    if (!header.includes(item)) {
      console.error(`[FAIL] ${page}: Header missing '${item}' link!`);
      allPassed = false;
    }
  }

  // 4. Check action items
  const requiredActionClasses = ['theme-toggle-btn', 'rtl-toggle-btn', 'btn-nav-login', 'btn-nav-signup'];
  for (const cls of requiredActionClasses) {
    if (!header.includes(cls)) {
      console.error(`[FAIL] ${page}: Header missing action class '${cls}'!`);
      allPassed = false;
    }
  }

  // 5. Verify booking modal still exists on page (if it had it originally)
  if (['index.html', 'home-2.html', 'services.html', 'service-details.html'].includes(page)) {
    if (!content.includes('id="bookingModal"')) {
      console.error(`[FAIL] ${page}: bookingModal was accidentally deleted!`);
      allPassed = false;
    }
  }

  console.log(`[PASS] ${page}: Clean navbar verified.`);
}

if (allPassed) {
  console.log('\n>>> ALL 12 PUBLIC PAGES PASSED NAVBAR AUDIT! <<<');
} else {
  console.error('\n>>> SOME PAGES FAILED AUDIT <<<');
  process.exit(1);
}
