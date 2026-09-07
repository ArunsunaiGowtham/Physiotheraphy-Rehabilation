const fs = require('fs');
const path = require('path');

const files = [
  'admin-login.html',
  'patient-login.html',
  'admin/login.html',
  'login.html'
];

let allPassed = true;

files.forEach(relPath => {
  const fullPath = path.join(__dirname, '..', relPath);
  const content = fs.readFileSync(fullPath, 'utf8');

  // Check for placeholder attribute
  const hasPlaceholderAttr = /<input[^>]*placeholder/i.test(content);
  // Check for dynamic placeholder assignment
  const hasDynamicPlaceholder = /\.placeholder\s*=/i.test(content);
  // Check for hardcoded patient/admin email values in input values
  const hasPrefilledEmailValue = /value="[^"]*(patient|admin)@physiolife\.com"/i.test(content);
  // Check for hardcoded patient/admin password values
  const hasPrefilledPassValue = /value="[^"]*(patient123|admin123)"/i.test(content);

  console.log(`Checking ${relPath}:`);
  console.log(`  - Has placeholder attribute: ${hasPlaceholderAttr ? 'FAIL' : 'PASS (Removed)'}`);
  console.log(`  - Has dynamic .placeholder: ${hasDynamicPlaceholder ? 'FAIL' : 'PASS (None)'}`);
  console.log(`  - Has prefilled email value: ${hasPrefilledEmailValue ? 'FAIL' : 'PASS (Clean)'}`);
  console.log(`  - Has prefilled pass value: ${hasPrefilledPassValue ? 'FAIL' : 'PASS (Clean)'}`);

  // Also check that loginEmail and loginPassword inputs still exist
  const hasEmailInput = content.includes('id="loginEmail"');
  const hasPassInput = content.includes('id="loginPassword"');
  console.log(`  - Input IDs intact: ${hasEmailInput && hasPassInput ? 'PASS' : 'FAIL'}`);

  if (hasPlaceholderAttr || hasDynamicPlaceholder || hasPrefilledEmailValue || hasPrefilledPassValue || !hasEmailInput || !hasPassInput) {
    allPassed = false;
  }
});

if (allPassed) {
  console.log('\nSUCCESS: All login placeholders and prefilled values have been completely removed!');
} else {
  console.error('\nFAILURE: Some placeholders or values still remain.');
  process.exit(1);
}
