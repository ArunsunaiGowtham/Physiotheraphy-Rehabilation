const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const patientDir = path.join(rootDir, 'patient');
const adminDir = path.join(rootDir, 'admin');

let issues = [];

function auditDir(dir, label) {
  console.log(`=== AUDITING ${label} ===`);
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const content = fs.readFileSync(fullPath, 'utf8');
    
    // Check script tags
    const scriptRegex = /<script[^>]+src=["']([^"']+)["']/gi;
    let match;
    while ((match = scriptRegex.exec(content)) !== null) {
      const src = match[1];
      if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('//') || src.includes('${')) continue;
      const resolved = path.resolve(dir, src);
      if (!fs.existsSync(resolved)) {
        issues.push({ file, type: 'SCRIPT_404', target: src, resolved });
        console.error(`[${file}] BROKEN SCRIPT: ${src} -> ${resolved}`);
      }
    }

    // Check link rel=stylesheet
    const linkRegex = /<link[^>]+href=["']([^"']+)["'][^>]*>/gi;
    while ((match = linkRegex.exec(content)) !== null) {
      const href = match[1];
      if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//') || href.startsWith('data:') || href.includes('${')) continue;
      const resolved = path.resolve(dir, href);
      if (!fs.existsSync(resolved)) {
        issues.push({ file, type: 'CSS_404', target: href, resolved });
        console.error(`[${file}] BROKEN CSS LINK: ${href} -> ${resolved}`);
      }
    }

    // Check img src
    const imgRegex = /<img[^>]+src=["']([^"']+)["']/gi;
    while ((match = imgRegex.exec(content)) !== null) {
      const src = match[1];
      if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('//') || src.startsWith('data:') || src.includes('${')) continue;
      const resolved = path.resolve(dir, src.split('?')[0]);
      if (!fs.existsSync(resolved)) {
        issues.push({ file, type: 'IMG_404', target: src, resolved });
        console.error(`[${file}] BROKEN IMAGE: ${src} -> ${resolved}`);
      }
    }

    // Check href in <a> tags
    const aRegex = /<a[^>]+href=["']([^"']+)["']/gi;
    while ((match = aRegex.exec(content)) !== null) {
      const href = match[1];
      if (href === '#' || href === 'javascript:void(0);' || href.startsWith('javascript:') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('http://') || href.startsWith('https://') || href.includes('${')) continue;
      const cleanHref = href.split('#')[0].split('?')[0];
      if (!cleanHref) continue;
      const resolved = path.resolve(dir, cleanHref);
      if (!fs.existsSync(resolved)) {
        issues.push({ file, type: 'HREF_404', target: href, resolved });
        console.error(`[${file}] BROKEN ANCHOR HREF: ${href} -> ${resolved}`);
      }
    }
  }
}

auditDir(patientDir, 'PATIENT DASHBOARD');
auditDir(adminDir, 'ADMIN DASHBOARD');

console.log('\n=======================================');
console.log(`REAL STATIC ASSET/LINK ISSUES FOUND: ${issues.length}`);
console.log('=======================================');
if (issues.length > 0) {
  console.log(JSON.stringify(issues, null, 2));
}
