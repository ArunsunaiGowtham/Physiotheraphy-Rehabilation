const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

async function inspectLtrRtl() {
  const ROOT_DIR = path.resolve(__dirname, '..');
  const PORT = 3470;
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
    '--remote-debugging-port=9236',
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
      port: 9236,
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
  await sendCmd('Page.navigate', { url: pageUrl });
  await sendCmd('Runtime.evaluate', { awaitPromise: true, expression: `document.fonts.ready` });
  await new Promise(r => setTimeout(r, 1000));

  // Switch to RTL first
  await sendCmd('Runtime.evaluate', { expression: `PhysioTheme.setDirection('rtl');` });
  await new Promise(r => setTimeout(r, 500));
  let rtlEval = await sendCmd('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      const dir = document.documentElement.getAttribute('dir');
      const footer = document.querySelector('.site-footer');
      const cols = Array.from(footer.querySelectorAll('.footer-main-row > div'));
      const colBoxes = cols.map(c => c.getBoundingClientRect());
      const brandBox = colBoxes[0];
      const infoBox = colBoxes[3];
      return {
        dir,
        brandLeft: brandBox.left,
        infoLeft: infoBox.left,
        isBrandRightOfInfo: brandBox.left > infoBox.left
      };
    })()`
  });
  console.log('RTL state:', rtlEval.result.value);

  // Now dynamically switch to LTR by clicking the RTL toggle button or PhysioTheme.setDirection('ltr')
  await sendCmd('Runtime.evaluate', {
    expression: `(() => {
      const btn = document.querySelector('.rtl-toggle-btn');
      if (btn) btn.click();
      else PhysioTheme.setDirection('ltr');
    })()`
  });
  await new Promise(r => setTimeout(r, 500));

  let ltrEval = await sendCmd('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      const dir = document.documentElement.getAttribute('dir');
      const footer = document.querySelector('.site-footer');
      const cols = Array.from(footer.querySelectorAll('.footer-main-row > div'));
      const colBoxes = cols.map(c => c.getBoundingClientRect());
      const brandBox = colBoxes[0];
      const infoBox = colBoxes[3];

      // Check text alignment in footer
      const brandText = footer.querySelector('.footer-brand-text');
      const h5 = footer.querySelector('.footer-widget h5');
      const brandStyle = window.getComputedStyle(brandText);
      const h5Style = window.getComputedStyle(h5);

      // Contact info icon & span
      const contactItem = footer.querySelector('.footer-contact-info li');
      const icon = contactItem.querySelector('i').getBoundingClientRect();
      const span = contactItem.querySelector('span').getBoundingClientRect();

      // Navbar brand & links
      const navBrand = document.querySelector('.navbar-brand');
      const navBrandBox = navBrand ? navBrand.getBoundingClientRect() : null;
      const navActions = document.querySelector('.navbar-actions');
      const navActionsBox = navActions ? navActions.getBoundingClientRect() : null;

      // Copyright & links
      const copyright = footer.querySelector('.footer-copyright').getBoundingClientRect();
      const bottomLinks = footer.querySelector('.footer-bottom-links').getBoundingClientRect();

      return {
        dir,
        brandLeft: brandBox.left,
        infoLeft: infoBox.left,
        isBrandLeftOfInfo: brandBox.left < infoBox.left,
        brandTextAlign: brandStyle.textAlign,
        h5TextAlign: h5Style.textAlign,
        iconLeftOfSpan: icon.left < span.left,
        navBrandLeftOfActions: navBrandBox && navActionsBox ? navBrandBox.left < navActionsBox.left : null,
        copyrightLeftOfLinks: copyright.left < bottomLinks.left,
        bodyDirection: window.getComputedStyle(document.body).direction
      };
    })()`
  });
  console.log('LTR state after toggle:', ltrEval.result.value);

  // Capture footer screenshot after toggle to LTR
  const clipRes = await sendCmd('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      const b = document.querySelector('.site-footer').getBoundingClientRect();
      return { x: b.left + window.scrollX, y: b.top + window.scrollY, width: b.width, height: b.height, scale: 1 };
    })()`
  });
  let shot = await sendCmd('Page.captureScreenshot', { format: 'png', clip: clipRes.result.value, captureBeyondViewport: true });
  fs.writeFileSync(path.join(__dirname, 'toggled_ltr_footer.png'), shot.data, 'base64');

  // Also capture top of page (hero + navbar) after toggle to LTR
  await sendCmd('Runtime.evaluate', { expression: `window.scrollTo(0, 0);` });
  await new Promise(r => setTimeout(r, 400));
  shot = await sendCmd('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(__dirname, 'toggled_ltr_header.png'), shot.data, 'base64');

  ws.close();
  chrome.kill();
  server.close();
}

inspectLtrRtl().catch(console.error);
