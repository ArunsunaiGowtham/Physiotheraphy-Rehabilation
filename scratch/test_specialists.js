const fs = require('fs');

const html = fs.readFileSync('services.html', 'utf8');
const cardRegex = /<div class="[^"]*service-item[^"]*" data-category="([^"]+)">([\s\S]*?)<\/div>\s*<\/div>/g;
let match;
let idx = 1;
const serviceList = [];
while ((match = cardRegex.exec(html)) !== null) {
  const cat = match[1];
  const inner = match[2];
  const titleMatch = inner.match(/<h4 class="service-title">[\s\S]*?<a[^>]*>([\s\S]*?)<\/a><\/h4>/i);
  const linkMatch = inner.match(/href="service-details\.html\?service=([^"&]+)"/i);
  const imgMatch = inner.match(/<img\s+src="([^"]+)"/i);
  serviceList.push({
    num: idx++,
    category: cat,
    serviceId: linkMatch ? linkMatch[1] : null,
    title: titleMatch ? titleMatch[1].trim() : null,
    img: imgMatch ? imgMatch[1] : null
  });
}

console.log('=== 15 CARDS IN SERVICES.HTML ===');
serviceList.forEach(s => {
  console.log(`${s.num}. Category: [${s.category}] | ID: "${s.serviceId}" | Title: "${s.title}"`);
});

// Now let's check service-engine.js for each of these 15 services:
const engineCode = fs.readFileSync('assets/js/service-engine.js', 'utf8');

console.log('\n=== CURRENT SPECIALIST FOR EACH SERVICE IN SERVICES_DATA ===');
serviceList.forEach(s => {
  // find 's.serviceId': {
  const id = s.serviceId;
  const regex = new RegExp(`'${id}':\\s*\\{([\\s\\S]*?)(?:\\n\\s{4}'[a-z0-9-]+':|\\n\\s{2}\\};)`);
  const m = engineCode.match(regex);
  if (!m) {
    console.log(`${s.num}. [${id}] -> NOT FOUND IN SERVICES_DATA`);
    return;
  }
  const specMatch = m[1].match(/specialist:\s*\{([\s\S]*?)\}/);
  if (!specMatch) {
    console.log(`${s.num}. [${id}] -> NO SPECIALIST FIELD`);
  } else {
    const nm = specMatch[1].match(/name:\s*'([^']+)'/);
    const cr = specMatch[1].match(/credentials:\s*'([^']+)'/);
    const lk = specMatch[1].match(/link:\s*'([^']+)'/);
    const im = specMatch[1].match(/image:\s*'([^']+)'/);
    console.log(`${s.num}. [${id}] -> Name: "${nm ? nm[1] : ''}" | Creds: "${cr ? cr[1] : ''}" | Link: "${lk ? lk[1] : ''}" | Img: "${im ? im[1] : ''}"`);
  }
});
