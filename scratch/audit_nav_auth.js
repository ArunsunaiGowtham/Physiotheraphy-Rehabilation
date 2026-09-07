const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const patientFiles = fs.readdirSync(path.join(rootDir, 'patient')).filter(f => f.endsWith('.html'));
const adminFiles = fs.readdirSync(path.join(rootDir, 'admin')).filter(f => f.endsWith('.html'));

console.log('--- PATIENT PAGES SIDEBAR AUDIT ---');
patientFiles.forEach(f => {
  const content = fs.readFileSync(path.join(rootDir, 'patient', f), 'utf8');
  const hasAuthGuard = content.includes('PhysioAuth') || content.includes('currentUser') || content.includes('auth.js');
  const hasSignOut = content.includes('logoutUser') || content.includes('signOut') || content.includes('Sign Out') || content.includes('Logout');
  const hasDarkToggle = content.includes('theme') || content.includes('Dark');
  const titleMatch = content.match(/<title>([^<]+)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : 'NO TITLE';
  console.log(`[patient/${f}] Title: "${title}" | Auth: ${hasAuthGuard} | SignOut: ${hasSignOut} | DarkToggle: ${hasDarkToggle}`);
});

console.log('\n--- ADMIN PAGES SIDEBAR AUDIT ---');
adminFiles.forEach(f => {
  const content = fs.readFileSync(path.join(rootDir, 'admin', f), 'utf8');
  const hasAuthGuard = content.includes('PhysioAuth') || content.includes('currentUser') || content.includes('auth.js');
  const hasSignOut = content.includes('logoutUser') || content.includes('signOut') || content.includes('Sign Out') || content.includes('Logout');
  const hasDarkToggle = content.includes('theme') || content.includes('Dark');
  const titleMatch = content.match(/<title>([^<]+)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : 'NO TITLE';
  console.log(`[admin/${f}] Title: "${title}" | Auth: ${hasAuthGuard} | SignOut: ${hasSignOut} | DarkToggle: ${hasDarkToggle}`);
});
