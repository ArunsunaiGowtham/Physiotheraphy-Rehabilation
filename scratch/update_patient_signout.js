const fs = require('fs');
const path = require('path');

const patientDir = path.join(__dirname, '..', 'patient');
const files = fs.readdirSync(patientDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(patientDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace href="../login.html" on Sign Out link
  // Pattern matches <a href="../login.html" class="menu-link text-danger"...>...Sign Out...</a>
  const oldPattern1 = /<a href="\.\.\/login\.html" class="menu-link text-danger"([^>]*)>([\s\S]*?Sign Out[\s\S]*?)<\/a>/g;
  const newLink1 = '<a href="../patient-login.html" class="menu-link text-danger" onclick="if(window.PhysioAuth)PhysioAuth.logoutUser();"$1>$2</a>';

  let updated = content.replace(oldPattern1, newLink1);

  // Also catch any simple href="../login.html" that might still remain in patient files
  // For instance in dashboard.html onclick="if(window.PhysioAuth)PhysioAuth.logoutUser();"
  updated = updated.replace(/href="\.\.\/login\.html"/g, 'href="../patient-login.html"');

  if (content !== updated) {
    fs.writeFileSync(filePath, updated, 'utf8');
    console.log(`Updated Sign Out in patient/${file}`);
  } else {
    console.log(`patient/${file} already up to date or no match`);
  }
});
