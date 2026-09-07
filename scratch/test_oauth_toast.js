const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

let failures = 0;
function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    failures++;
  } else {
    console.log(`✓ PASS: ${message}`);
  }
}

async function testOAuthButtons() {
  console.log('========================================================');
  console.log('Starting Static & HTTP Server for OAuth Button Tests');
  console.log('========================================================');

  const ROOT_DIR = path.resolve(__dirname, '..');
  const PORT = 3458;

  const server = http.createServer((req, res) => {
    const reqPath = decodeURI(req.url.split('?')[0]);
    const filePath = path.join(ROOT_DIR, reqPath);
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      let ct = 'text/plain';
      if (ext === '.html') ct = 'text/html';
      else if (ext === '.js') ct = 'application/javascript';
      else if (ext === '.css') ct = 'text/css';
      else if (ext === '.svg') ct = 'image/svg+xml';
      else if (ext === '.jpg') ct = 'image/jpeg';
      else if (ext === '.png') ct = 'image/png';
      res.writeHead(200, { 'Content-Type': ct });
      fs.createReadStream(filePath).pipe(res);
    } else {
      res.writeHead(404);
      res.end('Not found');
    }
  });

  await new Promise(r => server.listen(PORT, r));
  console.log(`Server listening on port ${PORT}`);

  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9223',
    '--disable-gpu',
    '--window-size=1280,900',
    '--no-first-run',
    '--no-default-browser-check'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  const pageUrl = `http://localhost:${PORT}/login.html`;
  const target = await new Promise((resolve, reject) => {
    const req = http.request({
      host: '127.0.0.1',
      port: 9223,
      path: `/json/new?${encodeURIComponent(pageUrl)}`,
      method: 'PUT'
    }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    });
    req.on('error', reject);
    req.end();
  });

  const ws = new WebSocket(target.webSocketDebuggerUrl);
  let id = 1;
  const consoleErrors = [];

  function sendCmd(method, params = {}) {
    return new Promise((resolve, reject) => {
      const curId = id++;
      const onMessage = (event) => {
        try {
          const msg = JSON.parse(event.data);
          if (msg.id === curId) {
            ws.removeEventListener('message', onMessage);
            resolve(msg.result);
          }
        } catch (e) {
          reject(e);
        }
      };
      ws.addEventListener('message', onMessage);
      ws.send(JSON.stringify({ id: curId, method, params }));
    });
  }

  ws.addEventListener('message', (event) => {
    try {
      const msg = JSON.parse(event.data);
      if (msg.method === 'Runtime.consoleAPICalled' && msg.params.type === 'error') {
        consoleErrors.push(msg.params.args.map(a => a.value).join(' '));
      }
      if (msg.method === 'Runtime.exceptionThrown') {
        consoleErrors.push(msg.params.exceptionDetails.text);
      }
    } catch (e) {}
  });

  await new Promise(r => { ws.onopen = r; });
  console.log('Connected to Chrome DevTools WebSocket.');

  await sendCmd('Page.enable');
  await sendCmd('Runtime.enable');
  await sendCmd('Page.navigate', { url: pageUrl });
  await new Promise(r => setTimeout(r, 2000));

  console.log('\n--- Testing Customer Login -> Continue with Google ---');
  // Click Google login button
  const resGoogle = await sendCmd('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      const btn = document.getElementById('btnGoogleLogin');
      btn.click();
      const container = document.getElementById('oauthToastContainer');
      const toast = container ? container.querySelector('.oauth-toast') : null;
      const text = toast ? toast.innerText : '';
      const closeBtn = toast ? toast.querySelector('.btn-close') : null;
      const url = window.location.href;
      const session = sessionStorage.getItem('physiolife_current_user') || localStorage.getItem('physiolife_current_user');
      return {
        hasContainer: !!container,
        hasToast: !!toast,
        toastVisible: toast && toast.classList.contains('show'),
        text: text,
        hasCloseBtn: !!closeBtn,
        url: url,
        session: session
      };
    })()`
  });

  const gData = resGoogle.result.value;
  assert(gData.hasToast, 'OAuth toast element is created');
  assert(gData.toastVisible, 'OAuth toast is visible (has .show)');
  assert(gData.text.includes('Google Sign-In requires backend OAuth integration. This HTML template demonstrates the UI only.'), 'Toast displays required Google OAuth message');
  assert(gData.hasCloseBtn, 'Toast has visible close (×) button');
  assert(gData.url.includes('login.html'), 'User remains on login.html (no redirection)');
  assert(!gData.session, 'User is NOT authenticated (no session created)');

  // Take screenshot of Google toast in bottom-right corner
  let shot = await sendCmd('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(__dirname, 'test_google_toast.png'), shot.data, 'base64');
  console.log('Captured test_google_toast.png');

  console.log('\n--- Testing Dismiss (×) Button ---');
  const resDismiss = await sendCmd('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      const closeBtn = document.querySelector('#oauthToastContainer .btn-close');
      if (closeBtn) closeBtn.click();
      return true;
    })()`
  });
  await new Promise(r => setTimeout(r, 400));
  const resDismissCheck = await sendCmd('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      const toast = document.querySelector('#oauthToastContainer .oauth-toast');
      return { exists: !!toast };
    })()`
  });
  assert(!resDismissCheck.result.value.exists, 'Toast is removed when close button is clicked');

  console.log('\n--- Testing Customer Login -> Continue with Apple ---');
  const resApple = await sendCmd('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      const btn = document.getElementById('btnAppleLogin');
      btn.click();
      const toast = document.querySelector('#oauthToastContainer .oauth-toast');
      const text = toast ? toast.innerText : '';
      const closeBtn = toast ? toast.querySelector('.btn-close') : null;
      const url = window.location.href;
      const session = sessionStorage.getItem('physiolife_current_user') || localStorage.getItem('physiolife_current_user');
      return {
        hasToast: !!toast,
        text: text,
        hasCloseBtn: !!closeBtn,
        url: url,
        session: session
      };
    })()`
  });

  const aData = resApple.result.value;
  assert(aData.hasToast, 'Apple OAuth toast element is created');
  assert(aData.text.includes('Apple Sign-In requires backend OAuth integration. This HTML template demonstrates the UI only.'), 'Toast displays required Apple OAuth message');
  assert(aData.hasCloseBtn, 'Apple toast has visible close button');
  assert(aData.url.includes('login.html'), 'User remains on login.html (no redirection)');
  assert(!aData.session, 'User is NOT authenticated');

  // Take screenshot of Apple toast
  shot = await sendCmd('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(__dirname, 'test_apple_toast.png'), shot.data, 'base64');
  console.log('Captured test_apple_toast.png');

  console.log('\n--- Testing Switch to Admin Login Tab ---');
  const resAdminTab = await sendCmd('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      switchLoginRole('admin');
      const title = document.getElementById('loginCardTitle').textContent;
      const btnGoogle = document.getElementById('btnGoogleLogin');
      btnGoogle.click();
      const toast = document.querySelector('#oauthToastContainer .oauth-toast');
      const text = toast ? toast.innerText : '';
      const url = window.location.href;
      const session = sessionStorage.getItem('physiolife_current_user') || localStorage.getItem('physiolife_current_user');
      return {
        title: title,
        toastText: text,
        url: url,
        session: session
      };
    })()`
  });

  const adminData = resAdminTab.result.value;
  assert(adminData.title === 'Admin Login', 'Switched to Admin Login tab successfully');
  assert(adminData.toastText.includes('Google Sign-In requires backend OAuth integration. This HTML template demonstrates the UI only.'), 'Google button works in Admin Login tab without redirecting');
  assert(adminData.url.includes('login.html'), 'Admin login stays on current page');
  assert(!adminData.session, 'Admin login does not automatically create session');

  console.log('\n--- Testing Normal Login Functionality (Form Credentials) ---');
  const resNormalLogin = await sendCmd('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      switchLoginRole('patient');
      document.getElementById('loginEmail').value = 'patient@physiolife.com';
      document.getElementById('loginPassword').value = 'patient123';
      const form = document.getElementById('loginForm');
      // Dispatch submit event
      form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      const user = PhysioAuth.getCurrentUser();
      return {
        hasUser: !!user,
        role: user ? user.role : null,
        dashboard: user ? user.dashboard : null
      };
    })()`
  });

  const normData = resNormalLogin.result.value;
  assert(normData.hasUser && normData.role === 'patient', 'Normal login form authenticates patient credentials correctly');
  assert(normData.dashboard === 'patient/dashboard.html', 'Normal login directs to patient dashboard');

  // Clear session after test
  await sendCmd('Runtime.evaluate', { expression: `PhysioAuth.logoutUser();` });

  // Also test Admin normal login
  const resAdminLogin = await sendCmd('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      switchLoginRole('admin');
      document.getElementById('loginEmail').value = 'admin@physiolife.com';
      document.getElementById('loginPassword').value = 'admin123';
      const form = document.getElementById('loginForm');
      form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      const user = PhysioAuth.getCurrentUser();
      return {
        hasUser: !!user,
        role: user ? user.role : null,
        dashboard: user ? user.dashboard : null
      };
    })()`
  });
  const adminNormData = resAdminLogin.result.value;
  assert(adminNormData.hasUser && adminNormData.role === 'admin', 'Normal login form authenticates admin credentials correctly');
  assert(adminNormData.dashboard === 'admin/dashboard.html', 'Normal admin login directs to admin dashboard');

  // Clear session after test
  await sendCmd('Runtime.evaluate', { expression: `PhysioAuth.logoutUser();` });

  console.log('\n--- Testing Dedicated Pages: patient-login.html & admin-login.html ---');
  // Navigate to patient-login.html
  await sendCmd('Page.navigate', { url: `http://localhost:${PORT}/patient-login.html` });
  await new Promise(r => setTimeout(r, 1000));
  const resPatientPage = await sendCmd('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      document.getElementById('btnGoogleLogin').click();
      const toast = document.querySelector('#oauthToastContainer .oauth-toast');
      const text = toast ? toast.innerText : '';
      return { toastText: text, url: window.location.href };
    })()`
  });
  assert(resPatientPage.result.value.toastText.includes('Google Sign-In requires backend OAuth integration'), 'patient-login.html Google button triggers OAuth notice');
  assert(resPatientPage.result.value.url.includes('patient-login.html'), 'patient-login.html stays on page');

  // Navigate to admin-login.html
  await sendCmd('Page.navigate', { url: `http://localhost:${PORT}/admin-login.html` });
  await new Promise(r => setTimeout(r, 1000));
  const resAdminPage = await sendCmd('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      document.getElementById('btnAppleLogin').click();
      const toast = document.querySelector('#oauthToastContainer .oauth-toast');
      const text = toast ? toast.innerText : '';
      return { toastText: text, url: window.location.href };
    })()`
  });
  assert(resAdminPage.result.value.toastText.includes('Apple Sign-In requires backend OAuth integration'), 'admin-login.html Apple button triggers OAuth notice');
  assert(resAdminPage.result.value.url.includes('admin-login.html'), 'admin-login.html stays on page');

  console.log('\n--- Console Errors Check ---');
  assert(consoleErrors.length === 0, `No console errors detected during tests (Found: ${consoleErrors.length})`);
  if (consoleErrors.length > 0) {
    console.error('Console errors:', consoleErrors);
  }

  console.log('\n========================================================');
  console.log(`Test Summary: ${failures === 0 ? 'ALL TESTS PASSED! 🎉' : failures + ' TESTS FAILED! ❌'}`);
  console.log('========================================================');

  ws.close();
  chrome.kill();
  server.close();
  process.exit(failures === 0 ? 0 : 1);
}

testOAuthButtons().catch(err => {
  console.error('Fatal test runner error:', err);
  process.exit(1);
});
