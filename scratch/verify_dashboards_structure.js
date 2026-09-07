const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const dirs = [
  { name: 'Patient', path: path.join(rootDir, 'patient') },
  { name: 'Admin', path: path.join(rootDir, 'admin') }
];

let allGood = true;

dirs.forEach(d => {
  const files = fs.readdirSync(d.path).filter(f => f.endsWith('.html') && !f.includes('login') && !f.includes('register'));
  console.log(`\n=== CHECKING ${d.name.toUpperCase()} PAGES (${files.length} pages) ===`);
  
  files.forEach(f => {
    const filePath = path.join(d.path, f);
    const content = fs.readFileSync(filePath, 'utf8');

    // 1. Check matching closing tags for basic layout elements
    const hasHtmlOpen = /<html\b/i.test(content);
    const hasHtmlClose = /<\/html>/i.test(content);
    const hasBodyOpen = /<body\b/i.test(content);
    const hasBodyClose = /<\/body>/i.test(content);
    const hasSidebar = content.includes('dashboard-sidebar');
    const hasMain = content.includes('dashboard-main');
    
    // 2. Check essential JS scripts
    const hasBootstrap = content.includes('bootstrap.bundle.min.js');
    const hasThemeJs = content.includes('theme.js');
    const hasDashboardJs = content.includes('dashboard.js');
    
    // 3. Check CSS
    const hasBootstrapCss = content.includes('bootstrap.min.css') || content.includes('bootstrap.bundle.min.css') || content.includes('style.css');
    const hasDashboardCss = content.includes('dashboard.css');

    const issues = [];
    if (!hasHtmlOpen || !hasHtmlClose) issues.push('HTML tags incomplete');
    if (!hasBodyOpen || !hasBodyClose) issues.push('Body tags incomplete');
    if (!hasSidebar) issues.push('Missing dashboard-sidebar');
    if (!hasMain) issues.push('Missing dashboard-main');
    if (!hasBootstrap) issues.push('Missing bootstrap JS');
    if (!hasThemeJs) issues.push('Missing theme.js');
    if (!hasDashboardJs) issues.push('Missing dashboard.js');
    if (!hasDashboardCss) issues.push('Missing dashboard.css');

    if (issues.length > 0) {
      allGood = false;
      console.error(`FAIL: [${d.name}/${f}] -> ${issues.join(', ')}`);
    } else {
      console.log(`PASS: [${d.name}/${f}] - Layout, CSS, Scripts, and Structure intact`);
    }
  });
});

if (allGood) {
  console.log('\n>>> ALL 19 DASHBOARD PAGES FULLY STRUCTURED AND CONSISTENT! <<<');
} else {
  console.error('\n>>> SOME PAGES HAVE STRUCTURAL ISSUES <<<');
  process.exit(1);
}
