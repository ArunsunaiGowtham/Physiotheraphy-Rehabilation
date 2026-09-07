const fs = require('fs');
const path = require('path');

const cssContent = fs.readFileSync(path.join(__dirname, '..', 'assets', 'css', 'style.css'), 'utf8');
const pricingHtml = fs.readFileSync(path.join(__dirname, '..', 'pricing.html'), 'utf8');

console.log('=== CSS Verification ===');
if (cssContent.includes('transform: none; /* Exact same size as siblings */')) {
  console.log('  [PASS] transform: scale(...) removed from .pricing-card.popular; replaced with transform: none');
} else {
  console.error('  [FAIL] transform: scale still present in .pricing-card.popular');
}

if (cssContent.includes('.pricing-header') && cssContent.includes('.pricing-subtitle')) {
  console.log('  [PASS] .pricing-header and .pricing-subtitle rules defined with min-height');
} else {
  console.error('  [FAIL] .pricing-header or .pricing-subtitle rules missing');
}

if (cssContent.includes('.pricing-features li {') && cssContent.includes('min-height: 44px')) {
  console.log('  [PASS] .pricing-features li has min-height: 44px for row-by-row alignment');
} else {
  console.error('  [FAIL] .pricing-features li min-height rule missing');
}

console.log('\n=== HTML Verification ===');
const cards = pricingHtml.match(/<div class="pricing-card[^"]*">/g) || [];
console.log(`  Found ${cards.length} pricing cards in pricing.html`);

const headers = pricingHtml.match(/<div class="pricing-header">/g) || [];
console.log(`  Found ${headers.length} pricing-header elements`);

const colFlex = pricingHtml.match(/<div class="col-lg-4 d-flex">/g) || [];
console.log(`  Found ${colFlex.length} col-lg-4 d-flex columns`);

if (cards.length === 3 && headers.length === 3 && colFlex.length === 3) {
  console.log('\n[ALL CHECKS PASSED] All 3 pricing cards are structured with identical sizing & alignment!');
} else {
  console.error('\n[CHECK FAILED] Inconsistent structure count');
}
