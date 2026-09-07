const fs = require('fs');
const path = require('path');
const adminDir = path.join(__dirname, '..', 'admin');
const patientDir = path.join(__dirname, '..', 'patient');

console.log('=== ADMIN SIDEBAR ACTIVE CHECK ===');
const adminPages = ['dashboard.html', 'users.html', 'therapists.html', 'appointments.html', 'services.html', 'treatment-plans.html', 'exercises.html', 'orders.html', 'messages.html', 'blog.html', 'settings.html'];

for (const p of adminPages) {
  const file = path.join(adminDir, p);
  const content = fs.readFileSync(file, 'utf8');
  const aRegex = /<a\s+([^>]+)>/gi;
  const activeHrefs = [];
  let m;
  while ((m = aRegex.exec(content)) !== null) {
    const attrs = m[1];
    if (/class=["'][^"']*\bactive\b[^"']*["']/i.test(attrs)) {
      const hrefMatch = attrs.match(/href=["']([^"']+)["']/i);
      if (hrefMatch) activeHrefs.push(hrefMatch[1]);
    }
  }
  console.log(`${p.padEnd(22)} active in sidebar/page: ${activeHrefs.join(', ')}`);
}

console.log('\n=== PATIENT SIDEBAR ACTIVE CHECK ===');
const patientPages = ['dashboard.html', 'appointments.html', 'exercises.html', 'attendance.html', 'payments.html', 'receipts.html', 'profile.html', 'treatment-plans.html'];

for (const p of patientPages) {
  const file = path.join(patientDir, p);
  const content = fs.readFileSync(file, 'utf8');
  const aRegex = /<a\s+([^>]+)>/gi;
  const activeHrefs = [];
  let m;
  while ((m = aRegex.exec(content)) !== null) {
    const attrs = m[1];
    if (/class=["'][^"']*\bactive\b[^"']*["']/i.test(attrs)) {
      const hrefMatch = attrs.match(/href=["']([^"']+)["']/i);
      if (hrefMatch) activeHrefs.push(hrefMatch[1]);
    }
  }
  console.log(`${p.padEnd(22)} active in sidebar/page: ${activeHrefs.join(', ')}`);
}
