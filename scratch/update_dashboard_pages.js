const fs = require('fs');
const path = require('path');

const adminDir = path.join(__dirname, '..', 'admin');
const patientDir = path.join(__dirname, '..', 'patient');

const backBtnHtml = `<a href="../index.html" class="btn-topbar-back" id="backToWebsiteBtn" title="Back to Main PhysioLife Website Home">
            <i class="fas fa-arrow-left"></i> <span class="d-none d-sm-inline">Back to </span>Website
          </a>`;

function updatePage(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // 1. Add auth-guard.js to head if missing
  if (!content.includes('auth-guard.js')) {
    content = content.replace(
      /(<link href="\.\.\/assets\/css\/rtl\.css" rel="stylesheet">)/i,
      `$1\n  <script src="../assets/js/auth-guard.js"></script>`
    );
    changed = true;
  }

  // 2. Update class to btn-topbar-back if needed
  if (content.includes('class="btn btn-sm btn-outline-primary fw-semibold d-inline-flex align-items-center gap-1" id="backToWebsiteBtn"')) {
    content = content.replace(
      /class="btn btn-sm btn-outline-primary fw-semibold d-inline-flex align-items-center gap-1" id="backToWebsiteBtn"/g,
      'class="btn-topbar-back" id="backToWebsiteBtn"'
    );
    changed = true;
  }

  // 2. Add or update Back to Website in topbar-actions
  if (content.includes('Clinic Home') || content.includes('Live Site')) {
    content = content.replace(
      /<a href="\.\.\/index\.html" class="btn btn-sm btn-outline-secondary[^>]*>[\s\S]*?<\/a>/i,
      backBtnHtml
    );
    changed = true;
  } else if (content.includes('class="topbar-actions"')) {
    if (!content.includes('backToWebsiteBtn') && !content.includes('Back to Website')) {
      content = content.replace(
        /(<div class="topbar-actions">[\s\S]*?)(<\/div>)/i,
        (match, p1, p2) => {
          return `${p1}          ${backBtnHtml}\n        ${p2}`;
        }
      );
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated:', filePath);
  } else {
    console.log('Already up to date:', filePath);
  }
}

// Update Admin subpages
fs.readdirSync(adminDir).forEach(file => {
  if (file.endsWith('.html') && file !== 'login.html' && file !== 'register.html') {
    updatePage(path.join(adminDir, file));
  }
});

// Update Patient subpages
fs.readdirSync(patientDir).forEach(file => {
  if (file.endsWith('.html')) {
    updatePage(path.join(patientDir, file));
  }
});

console.log('All dashboard pages processed.');
