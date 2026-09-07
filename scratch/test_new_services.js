const fs = require('fs');

const engineCode = fs.readFileSync('assets/js/service-engine.js', 'utf-8');

// Test that JavaScript parses with no syntax errors
try {
  eval(engineCode);
  console.log('[PASS] service-engine.js parsed and executed with 0 syntax errors!');
} catch (e) {
  console.error('[FAIL] Syntax error in service-engine.js:', e.message);
  process.exit(1);
}
