const fs = require('fs');
const path = require('path');

const adminDir = path.join(__dirname, '..', 'admin');
const files = fs.readdirSync(adminDir).filter(f => f.endsWith('.html') && f !== 'login.html' && f !== 'register.html');

files.forEach(file => {
  const filePath = path.join(adminDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace href="../login.html" on Sign Out link
  let updated = content.replace(/href="\.\.\/login\.html"/g, 'href="../admin-login.html"');
  updated = updated.replace(/onclick="if\(window\.PhysioAuth\)PhysioAuth\.logoutUser\(\);"/g, '');
  updated = updated.replace(/(<a href="\.\.\/admin-login\.html" class="menu-link text-danger")>/g, '$1 onclick="if(window.PhysioAuth)PhysioAuth.logoutUser();">');

  if (content !== updated) {
    fs.writeFileSync(filePath, updated, 'utf8');
    console.log(`Updated Sign Out in admin/${file}`);
  } else {
    console.log(`admin/${file} already up to date`);
  }
});
