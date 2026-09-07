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

async function runCompleteFooterSuite() {
  console.log('========================================================');
  console.log('Starting Footer Verification Test Suite');
  console.log('========================================================');

  const ROOT_DIR = path.resolve(__dirname, '..');
  const PORT = 3467;

  const server = http.createServer((req, res) => {
    const reqPath = decodeURI(req.url.split('?')[0]);
    const filePath = path.join(ROOT_DIR, reqPath === '/' ? 'index.html' : reqPath);
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

  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9232',
    '--disable-gpu',
    '--window-size=1280,1000',
    '--no-first-run',
    '--no-default-browser-check'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  const pageUrl = `http://localhost:${PORT}/index.html`;
  const target = await new Promise((resolve, reject) => {
    const req = http.request({
      host: '127.0.0.1',
      port: 9232,
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
  await sendCmd('Page.enable');
  await sendCmd('Runtime.enable');
  await sendCmd('Page.navigate', { url: pageUrl });
  await sendCmd('Runtime.evaluate', {
    expression: `(() => {
      localStorage.setItem('physiolife_theme', 'light');
      document.documentElement.setAttribute('data-bs-theme', 'light');
      document.documentElement.setAttribute('data-theme', 'light');
    })()`
  });
  await sendCmd('Runtime.evaluate', { awaitPromise: true, expression: `document.fonts.ready` });
  await new Promise(r => setTimeout(r, 1000));

  console.log('\n--- 1. Testing Desktop Layout (1280px) ---');
  await sendCmd('Emulation.setDeviceMetricsOverride', {
    width: 1280,
    height: 1000,
    deviceScaleFactor: 1,
    mobile: false
  });
  await new Promise(r => setTimeout(r, 600));

  const desktopData = await sendCmd('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      const footer = document.querySelector('.site-footer');
      const container = footer.querySelector('.container');
      const cRect = container.getBoundingClientRect();
      const row = footer.querySelector('.footer-main-row');
      const cols = Array.from(row.children);
      const colRects = cols.map(c => c.getBoundingClientRect());

      // Header tops
      const brandHeader = footer.querySelector('.footer-brand-header').getBoundingClientRect();
      const h5s = Array.from(footer.querySelectorAll('.footer-widget h5')).map(h => h.getBoundingClientRect());

      // Social icons
      const socialIcons = Array.from(footer.querySelectorAll('.social-icon-btn')).map(s => s.getBoundingClientRect());

      // Clinic Info items
      const contactLis = Array.from(footer.querySelectorAll('.footer-contact-info li')).map(li => {
        const icon = li.querySelector('i').getBoundingClientRect();
        const span = li.querySelector('span').getBoundingClientRect();
        return {
          iconTop: icon.top,
          spanTop: span.top,
          diff: Math.abs(icon.top - span.top)
        };
      });

      // Bottom baseline
      const copyright = footer.querySelector('.footer-copyright').getBoundingClientRect();
      const links = Array.from(footer.querySelectorAll('.footer-bottom-link')).map(l => l.getBoundingClientRect());

      // Horizontal overflow
      const hasHScroll = document.documentElement.scrollWidth > window.innerWidth;

      return {
        containerCentered: Math.abs(cRect.left - (document.documentElement.clientWidth - cRect.right)) < 2,
        colCount: cols.length,
        colTopsEqual: colRects.every(r => Math.abs(r.top - colRects[0].top) < 1),
        headerTopsEqual: h5s.every(h => Math.abs(h.top - brandHeader.top) < 1),
        headerHeightsEqual: h5s.every(h => Math.abs(h.height - brandHeader.height) < 1),
        socialIconsAligned: socialIcons.every(s => Math.abs(s.top - socialIcons[0].top) < 1),
        contactIconsAligned: contactLis.every(c => c.diff < 4),
        baselineDiff: Math.abs(copyright.top - links[0].top),
        hasHScroll
      };
    })()`
  });

  const d = desktopData.result.value;
  assert(d.containerCentered, 'Footer container is properly centered with equal left & right spacing');
  assert(d.colCount === 4, 'Desktop renders exactly 4 columns');
  assert(d.colTopsEqual, 'All 4 column wrappers start at identical top position');
  assert(d.headerTopsEqual, 'Logo header and Quick Links, Services, Clinic Information h5 headings share identical top position');
  assert(d.headerHeightsEqual, 'Brand header and h5 headings share identical height (36px)');
  assert(d.socialIconsAligned, 'Social media icons are aligned horizontally on the same baseline');
  assert(d.contactIconsAligned, 'Location, phone, email, hours icons are consistently aligned with text');
  assert(d.baselineDiff < 4, 'Copyright and footer links align on the same baseline (diff: ' + d.baselineDiff + 'px)');
  assert(!d.hasHScroll, 'No horizontal overflow detected on desktop');

  // Capture Desktop Screenshot
  let clipRes = await sendCmd('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      const b = document.querySelector('.site-footer').getBoundingClientRect();
      return { x: b.left + window.scrollX, y: b.top + window.scrollY, width: b.width, height: b.height, scale: 1 };
    })()`
  });
  let shot = await sendCmd('Page.captureScreenshot', { format: 'png', clip: clipRes.result.value, captureBeyondViewport: true });
  fs.writeFileSync(path.join(__dirname, 'verified_desktop_light.png'), shot.data, 'base64');
  console.log('Captured verified_desktop_light.png');

  console.log('\n--- 2. Testing Dark Mode Layout ---');
  await sendCmd('Runtime.evaluate', { expression: `document.documentElement.setAttribute('data-bs-theme', 'dark');` });
  await new Promise(r => setTimeout(r, 400));
  const darkModeCheck = await sendCmd('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      const darkLogo = document.querySelector('.site-footer .logo-dark');
      const lightLogo = document.querySelector('.site-footer .logo-light');
      return {
        darkLogoVisible: window.getComputedStyle(darkLogo).display !== 'none',
        lightLogoHidden: window.getComputedStyle(lightLogo).display === 'none'
      };
    })()`
  });
  assert(darkModeCheck.result.value.darkLogoVisible, 'Dark mode logo is visible in dark theme');
  assert(darkModeCheck.result.value.lightLogoHidden, 'Light mode logo is hidden in dark theme');
  shot = await sendCmd('Page.captureScreenshot', { format: 'png', clip: clipRes.result.value, captureBeyondViewport: true });
  fs.writeFileSync(path.join(__dirname, 'verified_desktop_dark.png'), shot.data, 'base64');
  console.log('Captured verified_desktop_dark.png');

  // Reset to light
  await sendCmd('Runtime.evaluate', { expression: `document.documentElement.setAttribute('data-bs-theme', 'light');` });

  console.log('\n--- 3. Testing Tablet Layout (768px) ---');
  await sendCmd('Emulation.setDeviceMetricsOverride', {
    width: 768,
    height: 1024,
    deviceScaleFactor: 1,
    mobile: false
  });
  await new Promise(r => setTimeout(r, 600));

  const tabletData = await sendCmd('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      const footer = document.querySelector('.site-footer');
      const cols = Array.from(footer.querySelectorAll('.footer-main-row > div'));
      const colRects = cols.map(c => c.getBoundingClientRect());
      const hasHScroll = document.documentElement.scrollWidth > window.innerWidth;
      const row1SameTop = Math.abs(colRects[0].top - colRects[1].top) < 1;
      const row2SameTop = Math.abs(colRects[2].top - colRects[3].top) < 1;
      const row2BelowRow1 = colRects[2].top > colRects[0].bottom;
      return {
        row1SameTop,
        row2SameTop,
        row2BelowRow1,
        hasHScroll
      };
    })()`
  });
  const t = tabletData.result.value;
  assert(t.row1SameTop, 'Tablet Row 1 (Brand Info & Quick Links) align at same top');
  assert(t.row2SameTop, 'Tablet Row 2 (Services & Clinic Information) align at same top');
  assert(t.row2BelowRow1, 'Tablet renders clean 2-column layout across 2 rows');
  assert(!t.hasHScroll, 'No horizontal overflow detected on tablet');

  clipRes = await sendCmd('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      const b = document.querySelector('.site-footer').getBoundingClientRect();
      return { x: b.left + window.scrollX, y: b.top + window.scrollY, width: b.width, height: b.height, scale: 1 };
    })()`
  });
  shot = await sendCmd('Page.captureScreenshot', { format: 'png', clip: clipRes.result.value, captureBeyondViewport: true });
  fs.writeFileSync(path.join(__dirname, 'verified_tablet_light.png'), shot.data, 'base64');
  console.log('Captured verified_tablet_light.png');

  console.log('\n--- 4. Testing Mobile Layout (375px) ---');
  await sendCmd('Emulation.setDeviceMetricsOverride', {
    width: 375,
    height: 812,
    deviceScaleFactor: 1,
    mobile: true
  });
  await new Promise(r => setTimeout(r, 600));

  const mobileData = await sendCmd('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      const footer = document.querySelector('.site-footer');
      const cols = Array.from(footer.querySelectorAll('.footer-main-row > div'));
      const colRects = cols.map(c => c.getBoundingClientRect());
      const stacked = colRects[1].top >= colRects[0].bottom &&
                      colRects[2].top >= colRects[1].bottom &&
                      colRects[3].top >= colRects[2].bottom;
      const leftAligned = colRects.every(c => Math.abs(c.left - colRects[0].left) < 1);
      const hasHScroll = document.documentElement.scrollWidth > window.innerWidth;
      return {
        stacked,
        leftAligned,
        hasHScroll
      };
    })()`
  });
  const m = mobileData.result.value;
  assert(m.stacked, 'Mobile renders single-column stacked layout');
  assert(m.leftAligned, 'Mobile columns are consistently aligned');
  assert(!m.hasHScroll, 'No horizontal overflow detected on mobile');

  clipRes = await sendCmd('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      const b = document.querySelector('.site-footer').getBoundingClientRect();
      return { x: b.left + window.scrollX, y: b.top + window.scrollY, width: b.width, height: b.height, scale: 1 };
    })()`
  });
  shot = await sendCmd('Page.captureScreenshot', { format: 'png', clip: clipRes.result.value, captureBeyondViewport: true });
  fs.writeFileSync(path.join(__dirname, 'verified_mobile_light.png'), shot.data, 'base64');
  console.log('Captured verified_mobile_light.png');

  console.log('\n--- 5. Testing RTL Mode ---');
  await sendCmd('Emulation.setDeviceMetricsOverride', {
    width: 1280,
    height: 1000,
    deviceScaleFactor: 1,
    mobile: false
  });
  await sendCmd('Runtime.evaluate', { expression: `document.documentElement.setAttribute('dir', 'rtl');` });
  await new Promise(r => setTimeout(r, 400));
  const rtlCheck = await sendCmd('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      const hasHScroll = document.documentElement.scrollWidth > window.innerWidth;
      return { hasHScroll };
    })()`
  });
  assert(!rtlCheck.result.value.hasHScroll, 'No horizontal overflow in RTL mode');

  clipRes = await sendCmd('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      const b = document.querySelector('.site-footer').getBoundingClientRect();
      return { x: b.left + window.scrollX, y: b.top + window.scrollY, width: b.width, height: b.height, scale: 1 };
    })()`
  });
  shot = await sendCmd('Page.captureScreenshot', { format: 'png', clip: clipRes.result.value, captureBeyondViewport: true });
  fs.writeFileSync(path.join(__dirname, 'verified_desktop_rtl.png'), shot.data, 'base64');
  console.log('Captured verified_desktop_rtl.png');

  console.log('\n--- 6. Testing Console Errors ---');
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

runCompleteFooterSuite().catch(console.error);
