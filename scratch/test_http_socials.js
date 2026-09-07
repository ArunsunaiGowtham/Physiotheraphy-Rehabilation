const http = require('http');

function fetch(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function testAll() {
  console.log('Testing pages on http://127.0.0.1:8080...\n');

  // Test 1: therapists.html
  const therapistsHtml = await fetch('http://127.0.0.1:8080/therapists.html');
  console.log('=== Checking therapists.html ===');
  const expectedTherapistLinks = [
    'https://www.linkedin.com/in/sarah-jenkins-dpt',
    'https://twitter.com/DrSarahJenkins',
    'https://www.linkedin.com/in/marcus-vance-pt',
    'https://twitter.com/DrMarcusVance',
    'https://www.linkedin.com/in/elena-rostova-pt',
    'https://twitter.com/DrElenaRostova',
    'https://www.linkedin.com/in/david-chen-pt',
    'https://twitter.com/DrDavidChenPT'
  ];
  expectedTherapistLinks.forEach(link => {
    if (therapistsHtml.includes(link)) {
      console.log(`  [PASS] Found therapist link: ${link}`);
    } else {
      console.error(`  [FAIL] Missing therapist link: ${link}`);
    }
  });

  // Test 2: index.html
  const indexHtml = await fetch('http://127.0.0.1:8080/index.html');
  console.log('\n=== Checking index.html ===');
  expectedTherapistLinks.forEach(link => {
    if (indexHtml.includes(link)) {
      console.log(`  [PASS] Found therapist link: ${link}`);
    } else {
      console.error(`  [FAIL] Missing therapist link: ${link}`);
    }
  });

  // Test 3: Footer Clinic Social Links
  console.log('\n=== Checking Footer Social Links on index.html ===');
  const footerLinks = [
    'https://www.facebook.com/physiolifeclinic',
    'https://twitter.com/physiolifeclinic',
    'https://www.linkedin.com/company/physiolife-clinic',
    'https://www.instagram.com/physiolifeclinic',
    'https://www.youtube.com/@physiolifeclinic'
  ];
  footerLinks.forEach(link => {
    if (indexHtml.includes(link)) {
      console.log(`  [PASS] Found clinic footer link: ${link}`);
    } else {
      console.error(`  [FAIL] Missing clinic footer link: ${link}`);
    }
  });

  // Test 4: therapist-details.html
  const detailsHtml = await fetch('http://127.0.0.1:8080/therapist-details.html?id=jenkins');
  console.log('\n=== Checking therapist-details.html ===');
  if (detailsHtml.includes('id="therapistSocialLinkedIn"') && detailsHtml.includes('id="therapistSocialTwitter"') && detailsHtml.includes('id="therapistSocialEmail"')) {
    console.log('  [PASS] Found dynamic therapist social IDs: therapistSocialLinkedIn, therapistSocialTwitter, therapistSocialEmail');
  } else {
    console.error('  [FAIL] Missing dynamic therapist social IDs');
  }

  // Check no href="#" left on social buttons
  const regex = /<a\s+[^>]*class="[^"]*social-icon-btn[^"]*"[^>]*href="#"[^>]*>/i;
  if (!regex.test(therapistsHtml) && !regex.test(indexHtml) && !regex.test(detailsHtml)) {
    console.log('\n[PASS] No remaining href="#" found on social buttons across pages!');
  } else {
    console.error('\n[FAIL] Found lingering href="#" on social buttons!');
  }
}

testAll().catch(console.error);
