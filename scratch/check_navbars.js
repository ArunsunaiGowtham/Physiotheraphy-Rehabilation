const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

console.log('=== NAVBAR AUDIT ACROSS ALL HTML FILES ===\n');

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const hasTopbar = content.includes('class="topbar');
  const hasSingleUnified = content.includes('Single Unified Navigation Header') || content.includes('btn-nav-login');
  const hasBookAppointmentBtn = content.includes('Book Appointment</a>') && content.includes('<header');
  console.log(`${f.padEnd(25)} : Topbar = ${hasTopbar ? 'YES (TWO BARS)' : 'NO '}, Modern Unified = ${hasSingleUnified ? 'YES' : 'NO '}, HeaderBookAppt = ${hasBookAppointmentBtn ? 'YES' : 'NO '}`);
});
