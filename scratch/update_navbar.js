const fs = require('fs');
const path = require('path');

const publicFiles = [
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

let updatedCount = 0;

publicFiles.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${file}`);
    return;
  }

  let html = fs.readFileSync(filePath, 'utf8');
  let original = html;

  // 1. Remove Therapists from navbar-nav
  // Matches: <li class="nav-item">...<a ... href="therapists.html">Therapists</a>...</li>
  const therapistsNavRegex = /\s*<li class="nav-item">\s*<a class="nav-link[^"]*" href="therapists\.html">Therapists<\/a>\s*<\/li>/gi;
  html = html.replace(therapistsNavRegex, '');

  // 2. Remove desktop Book Appointment button from navbar-actions
  // Matches: <button type="button" class="btn-nav-book" data-bs-toggle="modal" data-bs-target="#bookingModal">...Book Appointment...</button>
  const desktopBookRegex = /\s*<button type="button" class="btn-nav-book" data-bs-toggle="modal" data-bs-target="#bookingModal">\s*<i class="fas fa-calendar-check"><\/i>\s*<span>Book Appointment<\/span>\s*<\/button>/gi;
  html = html.replace(desktopBookRegex, '');

  // 3. Remove mobile Book Appointment button from mobile-nav-actions
  // Matches: <button type="button" class="btn-nav-book w-100 justify-content-center py-2" data-bs-toggle="modal" data-bs-target="#bookingModal">...Book Appointment...</button>
  const mobileBookRegex = /\s*<button type="button" class="btn-nav-book w-100 justify-content-center py-2" data-bs-toggle="modal" data-bs-target="#bookingModal">\s*<i class="fas fa-calendar-check"><\/i>\s*<span>Book Appointment<\/span>\s*<\/button>/gi;
  html = html.replace(mobileBookRegex, '');

  if (html !== original) {
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`✓ Updated navbar in ${file}`);
    updatedCount++;
  } else {
    console.log(`- No changes needed in ${file}`);
  }
});

console.log(`\nUpdated ${updatedCount} of ${publicFiles.length} files.`);
