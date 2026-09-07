const fs = require('fs');
const http = require('http');

console.log('Verifying admin/dashboard.html structure and alignment...');

const html = fs.readFileSync('admin/dashboard.html', 'utf8');

// Check that Chart.js row is NOT inside stat-card
const metricRowStart = html.indexOf('<!-- Metric Counters Row -->');
const metricRowEnd = html.indexOf('<!-- Chart.js Visualizations Row -->');
const metricSection = html.slice(metricRowStart, metricRowEnd);

if (metricSection.includes('adminRevenueChart')) {
  console.error('FAIL: adminRevenueChart is still trapped inside Metric Counters Row!');
  process.exit(1);
} else {
  console.log('PASS: Chart row is separated from Metric Counters Row.');
}

// Count stat-cards
const statCards = (metricSection.match(/class="stat-card"/g) || []).length;
console.log('Stat cards count in Metric Row:', statCards);
if (statCards === 4) {
  console.log('PASS: All 4 stat cards exist.');
} else {
  console.error('FAIL: Expected 4 stat cards, found', statCards);
  process.exit(1);
}

// Check tag balance for div tags
let depth = 0;
const divRegex = /<\/?div\b[^>]*>/gi;
let match;
let isBalanced = true;
while ((match = divRegex.exec(html)) !== null) {
  if (match[0].startsWith('</')) {
    depth--;
    if (depth < 0) {
      console.error('Unmatched closing div at index', match.index);
      isBalanced = false;
      break;
    }
  } else {
    // ignore self-closing if any (rare in HTML)
    if (!match[0].endsWith('/>')) depth++;
  }
}

if (depth === 0 && isBalanced) {
  console.log('PASS: All <div> tags in admin/dashboard.html are perfectly balanced!');
} else {
  console.error('FAIL: <div> balance mismatch. Final depth:', depth);
  process.exit(1);
}

// Check HTTP 200
http.get('http://localhost:8080/admin/dashboard.html', (res) => {
  console.log('http://localhost:8080/admin/dashboard.html -> HTTP', res.statusCode);
  if (res.statusCode === 200) {
    console.log('ALL DASHBOARD ALIGNMENT TESTS PASSED PERFECTLY!');
  } else {
    process.exit(1);
  }
});
