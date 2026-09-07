const fs = require('fs');

console.log('=== INSPECTING AUTHORS ACROSS CODEBASE ===');

// 1. service-engine.js specialists
const serviceCode = fs.readFileSync('assets/js/service-engine.js', 'utf8');
const specRegex = /'([a-z0-9-]+)'\s*:\s*\{[\s\S]*?specialist\s*:\s*\{[\s\S]*?name\s*:\s*['"]([^'"]+)['"]/g;
let m;
const serviceSpecialists = [];
while ((m = specRegex.exec(serviceCode)) !== null) {
  serviceSpecialists.push({ service: m[1], specialist: m[2] });
}
console.log('\n--- Service Specialists in service-engine.js ---');
serviceSpecialists.forEach(s => console.log(`  ${s.service.padEnd(20)}: ${s.specialist}`));

// Count occurrences
const specCounts = {};
serviceSpecialists.forEach(s => specCounts[s.specialist] = (specCounts[s.specialist] || 0) + 1);
console.log('\nSpecialist counts in service-engine.js:', specCounts);

// 2. blog-engine.js authors
const blogCode = fs.readFileSync('assets/js/blog-engine.js', 'utf8');
const blogRegex = /slug:\s*['"]([^'"]+)['"][\s\S]*?author:\s*['"]([^'"]+)['"]/g;
const blogAuthors = [];
while ((m = blogRegex.exec(blogCode)) !== null) {
  blogAuthors.push({ slug: m[1], author: m[2] });
}
console.log('\n--- Blog Authors in blog-engine.js ---');
blogAuthors.forEach(b => console.log(`  ${b.slug.padEnd(35)}: ${b.author}`));

const blogCounts = {};
blogAuthors.forEach(b => blogCounts[b.author] = (blogCounts[b.author] || 0) + 1);
console.log('\nBlog author counts:', blogCounts);
