const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

async function main() {
  const ROOT_DIR = path.resolve(__dirname, '..');
  const PORT = 3480;
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
  console.log(`Test server running at http://localhost:${PORT}`);

  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9238',
    '--disable-gpu',
    '--window-size=1280,1000',
    '--no-first-run',
    '--no-default-browser-check'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  const target = await new Promise((resolve, reject) => {
    const req = http.request({
      host: '127.0.0.1',
      port: 9238,
      path: `/json/new?http://localhost:${PORT}/index.html`,
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

  await new Promise(r => { ws.onopen = r; });
  await sendCmd('Page.enable');
  await sendCmd('Runtime.enable');

  const pagesToTest = ['index.html', 'services.html', 'blog.html', 'contact.html'];
  const testResults = [];

  for (const page of pagesToTest) {
    console.log(`\n========================================`);
    console.log(`Testing page: ${page}`);
    console.log(`========================================`);

    await sendCmd('Page.navigate', { url: `http://localhost:${PORT}/${page}` });
    await sendCmd('Runtime.evaluate', { awaitPromise: true, expression: `document.fonts.ready` });
    await new Promise(r => setTimeout(r, 600));

    // 1. Switch to RTL first to simulate user having RTL active
    console.log(`[${page}] Switching dynamically to RTL...`);
    await sendCmd('Runtime.evaluate', { expression: `PhysioTheme.setDirection('rtl');` });
    await new Promise(r => setTimeout(r, 400));

    // Check RTL state
    const rtlEval = await sendCmd('Runtime.evaluate', {
      returnByValue: true,
      expression: `(() => {
        const dir = document.documentElement.getAttribute('dir');
        const footer = document.querySelector('.site-footer');
        if (!footer) return { hasFooter: false };
        const cols = Array.from(footer.querySelectorAll('.footer-main-row > div'));
        const colBoxes = cols.map(c => c.getBoundingClientRect());
        const brandBox = colBoxes[0];
        const infoBox = colBoxes[3];

        const contactLis = Array.from(footer.querySelectorAll('.footer-contact-info li')).map(li => {
          const icon = li.querySelector('i').getBoundingClientRect();
          const span = li.querySelector('span').getBoundingClientRect();
          return { iconLeft: icon.left, spanLeft: span.left, isIconRightOfSpan: icon.left > span.left };
        });

        return {
          hasFooter: true,
          dir,
          isBrandRightOfInfo: brandBox.left > infoBox.left,
          allContactIconsRightOfSpan: contactLis.length > 0 ? contactLis.every(c => c.isIconRightOfSpan) : true
        };
      })()`
    });
    console.log(`[${page}] RTL verification:`, rtlEval.result.value);

    // 2. Dynamically switch to LTR by clicking the toggle button (or setDirection)
    console.log(`[${page}] Dynamically switching RTL -> LTR via toggle button...`);
    await sendCmd('Runtime.evaluate', {
      expression: `(() => {
        const btn = document.querySelector('.rtl-toggle-btn');
        if (btn) btn.click();
        else PhysioTheme.setDirection('ltr');
      })()`
    });
    await new Promise(r => setTimeout(r, 400));

    // 3. Detailed LTR verification
    const ltrEval = await sendCmd('Runtime.evaluate', {
      returnByValue: true,
      expression: `(() => {
        const dir = document.documentElement.getAttribute('dir');
        const footer = document.querySelector('.site-footer');
        if (!footer) return { hasFooter: false };

        const cols = Array.from(footer.querySelectorAll('.footer-main-row > div'));
        const colBoxes = cols.map((c, i) => {
          const h5 = c.querySelector('h5');
          const brandText = c.querySelector('.footer-brand-text');
          return {
            index: i,
            title: h5 ? h5.textContent.trim() : (brandText ? 'Brand Info' : 'Col ' + i),
            left: Math.round(c.getBoundingClientRect().left),
            right: Math.round(c.getBoundingClientRect().right),
            width: Math.round(c.getBoundingClientRect().width)
          };
        });

        // 1. Column order strictly left to right:
        // Col 0 (Brand) < Col 1 (Quick Links) < Col 2 (Services) < Col 3 (Clinic Info)
        const orderCorrect = colBoxes.length === 4 &&
          colBoxes[0].left < colBoxes[1].left &&
          colBoxes[1].left < colBoxes[2].left &&
          colBoxes[2].left < colBoxes[3].left;

        // 2. Left alignment of logo, description, social media icons
        const brandText = footer.querySelector('.footer-brand-text');
        const brandTextStyle = brandText ? window.getComputedStyle(brandText).textAlign : null;
        const brandH5 = footer.querySelector('.footer-widget h5');
        const h5Style = brandH5 ? window.getComputedStyle(brandH5).textAlign : null;

        // 3. Contact info icons strictly before (to left of) text
        const contactLis = Array.from(footer.querySelectorAll('.footer-contact-info li')).map(li => {
          const icon = li.querySelector('i').getBoundingClientRect();
          const span = li.querySelector('span').getBoundingClientRect();
          return {
            iconLeft: Math.round(icon.left),
            spanLeft: Math.round(span.left),
            isIconBeforeSpan: icon.left < span.left
          };
        });
        const allIconsBeforeSpan = contactLis.length > 0 && contactLis.every(c => c.isIconBeforeSpan);

        // 4. Copyright & Legal Links
        const copyright = footer.querySelector('.footer-copyright');
        const links = footer.querySelector('.footer-bottom-links');
        const copyrightBox = copyright ? copyright.getBoundingClientRect() : null;
        const linksBox = links ? links.getBoundingClientRect() : null;
        const copyrightLeftOfLinks = copyrightBox && linksBox ? copyrightBox.left < linksBox.left : false;

        // 5. Navbar alignment
        const navBrand = document.querySelector('.navbar-brand');
        const navActions = document.querySelector('.navbar-actions');
        const navBrandBox = navBrand ? navBrand.getBoundingClientRect() : null;
        const navActionsBox = navActions ? navActions.getBoundingClientRect() : null;
        const navbarOrderCorrect = navBrandBox && navActionsBox ? navBrandBox.left < navActionsBox.left : true;

        // 6. Horizontal overflow check
        const scrollWidth = document.documentElement.scrollWidth;
        const clientWidth = document.documentElement.clientWidth;
        const hasNoHorizontalOverflow = scrollWidth <= clientWidth + 2;

        return {
          hasFooter: true,
          dir,
          colBoxes,
          orderCorrect,
          brandTextStyle,
          h5Style,
          allIconsBeforeSpan,
          contactItemsCount: contactLis.length,
          copyrightLeftOfLinks,
          navbarOrderCorrect,
          hasNoHorizontalOverflow,
          scrollWidth,
          clientWidth
        };
      })()`
    });

    console.log(`[${page}] LTR verification:`, JSON.stringify(ltrEval.result.value, null, 2));
    testResults.push({ page, result: ltrEval.result.value });
  }

  // Visual screenshots on index.html across responsive viewports
  console.log(`\n========================================`);
  console.log(`Capturing responsive screenshots in LTR mode...`);
  console.log(`========================================`);

  await sendCmd('Page.navigate', { url: `http://localhost:${PORT}/index.html` });
  await sendCmd('Runtime.evaluate', { awaitPromise: true, expression: `document.fonts.ready` });
  await new Promise(r => setTimeout(r, 600));

  // Switch RTL -> LTR
  await sendCmd('Runtime.evaluate', { expression: `PhysioTheme.setDirection('rtl');` });
  await new Promise(r => setTimeout(r, 300));
  await sendCmd('Runtime.evaluate', {
    expression: `(() => {
      const btn = document.querySelector('.rtl-toggle-btn');
      if (btn) btn.click();
      else PhysioTheme.setDirection('ltr');
    })()`
  });
  await new Promise(r => setTimeout(r, 400));

  // Desktop (1280px)
  await sendCmd('Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });
  await new Promise(r => setTimeout(r, 300));
  const desktopClip = await sendCmd('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      const b = document.querySelector('.site-footer').getBoundingClientRect();
      return { x: b.left + window.scrollX, y: b.top + window.scrollY, width: b.width, height: b.height, scale: 1 };
    })()`
  });
  let shot = await sendCmd('Page.captureScreenshot', { format: 'png', clip: desktopClip.result.value, captureBeyondViewport: true });
  fs.writeFileSync(path.join(ROOT_DIR, 'scratch', 'ltr_footer_desktop.png'), shot.data, 'base64');
  console.log('Saved scratch/ltr_footer_desktop.png');

  // Tablet (768px)
  await sendCmd('Emulation.setDeviceMetricsOverride', { width: 768, height: 1024, deviceScaleFactor: 1, mobile: false });
  await new Promise(r => setTimeout(r, 300));
  const tabletClip = await sendCmd('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      const b = document.querySelector('.site-footer').getBoundingClientRect();
      return { x: b.left + window.scrollX, y: b.top + window.scrollY, width: b.width, height: b.height, scale: 1 };
    })()`
  });
  shot = await sendCmd('Page.captureScreenshot', { format: 'png', clip: tabletClip.result.value, captureBeyondViewport: true });
  fs.writeFileSync(path.join(ROOT_DIR, 'scratch', 'ltr_footer_tablet.png'), shot.data, 'base64');
  console.log('Saved scratch/ltr_footer_tablet.png');

  // Mobile (375px)
  await sendCmd('Emulation.setDeviceMetricsOverride', { width: 375, height: 812, deviceScaleFactor: 2, mobile: true });
  await new Promise(r => setTimeout(r, 300));
  const mobileClip = await sendCmd('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      const b = document.querySelector('.site-footer').getBoundingClientRect();
      return { x: b.left + window.scrollX, y: b.top + window.scrollY, width: b.width, height: b.height, scale: 1 };
    })()`
  });
  shot = await sendCmd('Page.captureScreenshot', { format: 'png', clip: mobileClip.result.value, captureBeyondViewport: true });
  fs.writeFileSync(path.join(ROOT_DIR, 'scratch', 'ltr_footer_mobile.png'), shot.data, 'base64');
  console.log('Saved scratch/ltr_footer_mobile.png');

  ws.close();
  chrome.kill();
  server.close();

  // Summary
  console.log(`\n========================================`);
  console.log(`SUMMARY OF ALL VERIFICATIONS`);
  console.log(`========================================`);
  let allPassed = true;
  for (const t of testResults) {
    const r = t.result;
    const ok = r.dir === 'ltr' && r.orderCorrect && r.allIconsBeforeSpan && r.copyrightLeftOfLinks && r.navbarOrderCorrect && r.hasNoHorizontalOverflow;
    console.log(`Page: ${t.page.padEnd(16)} -> ${ok ? 'PASSED ✅' : 'FAILED ❌'}`);
    if (!ok) allPassed = false;
  }
  console.log(`\nOverall test status: ${allPassed ? 'ALL TESTS PASSED ✅' : 'SOME TESTS FAILED ❌'}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
