const http = require('http');

const pages = [
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

async function checkPage(page) {
  return new Promise((resolve) => {
    http.get(`http://127.0.0.1:8080/${page}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const header = (data.match(/<header[\s\S]*?<\/header>/i) || [''])[0];
        const hasTherapistsInHeader = header.includes('therapists.html') || /Therapists/i.test(header);
        const hasBookInHeader = header.includes('btn-nav-book') || /Book\s*Appointment/i.test(header);
        const hasNavLinks = ['Home', 'About Us', 'Services', 'Insurance', 'Pricing', 'Blog', 'Contact'].every(l => header.includes(l));
        const hasAuth = header.includes('btn-nav-login') && header.includes('btn-nav-signup');
        const hasToggles = header.includes('theme-toggle-btn') && header.includes('rtl-toggle-btn');
        
        resolve({
          page,
          status: res.statusCode,
          hasTherapistsInHeader,
          hasBookInHeader,
          hasNavLinks,
          hasAuth,
          hasToggles,
          passed: res.statusCode === 200 && !hasTherapistsInHeader && !hasBookInHeader && hasNavLinks && hasAuth && hasToggles
        });
      });
    }).on('error', (err) => {
      resolve({ page, error: err.message, passed: false });
    });
  });
}

(async () => {
  let allOk = true;
  for (const p of pages) {
    const res = await checkPage(p);
    if (!res.passed) {
      allOk = false;
      console.error(`FAILED: ${p}`, res);
    } else {
      console.log(`PASS: ${p} (HTTP 200, clean navbar, all 7 links + auth + dark/rtl intact)`);
    }
  }

  if (allOk) {
    console.log('\n>>> ALL 12 PAGES SERVED PERFECTLY OVER HTTP! <<<');
  } else {
    process.exit(1);
  }
})();
