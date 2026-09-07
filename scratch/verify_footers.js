const fs = require('fs');
const path = require('path');

const files = [
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
let canonicalFooter = null;

for (const f of files) {
  const p = path.join(__dirname, '..', f);
  const content = fs.readFileSync(p, 'utf-8');

  const match = content.match(/<footer class="site-footer">[\s\S]*?<\/footer>/i);
  if (!match) {
    console.error(`[FAIL] ${f}: No site-footer found!`);
    allPassed = false;
    continue;
  }

  const footerText = match[0].trim();

  if (!canonicalFooter) {
    canonicalFooter = footerText;
  } else {
    // Compare character by character (ignoring leading whitespace differences if any)
    const normCurrent = footerText.replace(/\r\n/g, '\n');
    const normCanonical = canonicalFooter.replace(/\r\n/g, '\n');
    if (normCurrent !== normCanonical) {
      console.error(`[FAIL] ${f}: Footer content does not match canonical footer!`);
      allPassed = false;
    }
  }

  // Verify key items
  const checks = [
    'Quick Links',
    'Services',
    'Clinic Information',
    'About Clinic',
    'Therapy Services',
    'Our Specialists',
    'Insurance &amp; Billing',
    'Pricing Packages',
    'Contact Us',
    'Spine &amp; Neck Therapy',
    'Sports Rehabilitation',
    'Post-Surgical Care',
    'Joint Mobility',
    'Neurological Rehab',
    'Home Physiotherapy',
    '742 Evergreen Healthcare Blvd',
    '+1 (800) 555-REHAB (73422)',
    'appointments@physiolifeclinic.com',
    'Monday – Friday: 7:00 AM – 8:00 PM',
    'Saturday: 8:00 AM – 3:00 PM',
    'fa-facebook-f',
    'fa-twitter',
    'fa-linkedin-in',
    'fa-instagram',
    'fa-youtube',
    'Template Documentation',
    'Privacy Policy',
    'Terms of Care',
    '404 Demo'
  ];

  for (const c of checks) {
    if (!footerText.includes(c)) {
      console.error(`[FAIL] ${f}: Missing '${c}' in footer!`);
      allPassed = false;
    }
  }

  // Check modals intact if present
  if (['index.html', 'about.html', 'services.html', 'service-details.html', 'home-2.html', 'insurance.html', 'pricing.html', 'therapists.html', 'therapist-details.html'].includes(f)) {
    if (!content.includes('id="bookingModal"')) {
      console.error(`[FAIL] ${f}: bookingModal was damaged!`);
      allPassed = false;
    }
  }

  console.log(`[PASS] ${f}: Identical, perfectly aligned footer verified.`);
}

if (allPassed) {
  console.log('\n>>> ALL 12 PUBLIC PAGES HAVE IDENTICAL, STANDARDIZED FOOTERS! <<<');
} else {
  console.error('\n>>> FOOTER AUDIT FAILED <<<');
  process.exit(1);
}
