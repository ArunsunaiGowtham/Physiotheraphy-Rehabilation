const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

async function auditLtrRtlPages() {
  const ROOT_DIR = path.resolve(__dirname, '..');
  const PORT = 3471;
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
    '--remote-debugging-port=9237',
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
      port: 9237,
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

  // Switch RTL -> LTR dynamic toggle
  console.log('Testing dynamic toggle RTL -> LTR...');
  await sendCmd('Runtime.evaluate', {
    expression: `(() => {
      // 1. Switch to RTL first
      PhysioTheme.setDirection('rtl');
    })()`
  });
  await new Promise(r => setTimeout(r, 400));

  // 2. Click the toggle button to switch back to LTR dynamically
  await sendCmd('Runtime.evaluate', {
    expression: `(() => {
      const dirBtn = document.querySelector('.rtl-toggle-btn');
      if (dirBtn) dirBtn.click();
    })()`
  });
  await new Promise(r => setTimeout(r, 400));

  // Inspect LTR properties
  const results = await sendCmd('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      const htmlDir = document.documentElement.getAttribute('dir');
      const footer = document.querySelector('.site-footer');
      const cols = Array.from(footer.querySelectorAll('.footer-main-row > div'));
      const colBoxes = cols.map((c, i) => ({
        index: i,
        title: c.querySelector('h5') ? c.querySelector('h5').textContent.trim() : 'Brand Info',
        left: c.getBoundingClientRect().left,
        width: c.getBoundingClientRect().width
      }));

      // Check contact icons order
      const contactLis = Array.from(footer.querySelectorAll('.footer-contact-info li')).map(li => {
        const icon = li.querySelector('i').getBoundingClientRect();
        const span = li.querySelector('span').getBoundingClientRect();
        return {
          iconLeft: icon.left,
          spanLeft: span.left,
          isIconBeforeSpan: icon.left < span.left
        };
      });

      // Check footer bottom
      const copyright = footer.querySelector('.footer-copyright').getBoundingClientRect();
      const links = footer.querySelector('.footer-bottom-links').getBoundingClientRect();

      // Check navbar
      const navBrand = document.querySelector('.navbar-brand').getBoundingClientRect();
      const navActions = document.querySelector('.navbar-actions').getBoundingClientRect();

      // Check hero CTA buttons
      const heroBtn = document.querySelector('.hero-actions .btn, .hero-btns .btn, .banner-actions .btn');
      const heroIcon = heroBtn ? heroBtn.querySelector('i') : null;
      let heroIconBefore = null;
      if (heroBtn && heroIcon) {
        const bRect = heroBtn.getBoundingClientRect();
        const iRect = heroIcon.getBoundingClientRect();
        heroIconBefore = iRect.left < (bRect.left + bRect.width / 2);
      }

      return {
        htmlDir,
        colBoxes,
        orderCorrect: colBoxes[0].left < colBoxes[1].left &&
                      colBoxes[1].left < colBoxes[2].left &&
                      colBoxes[2].left < colBoxes[3].left,
        allIconsBeforeSpan: contactLis.every(c => c.isIconBeforeSpan),
        copyrightLeftOfLinks: copyright.left < links.left,
        navBrandLeftOfActions: navBrand.left < navActions.left,
        heroIconBefore
      };
    })()`
  });

  console.log('Audit Results:', JSON.stringify(results.result.value, null, 2));

  ws.close();
  chrome.kill();
  server.close();
}

auditLtrRtlPages().catch(console.error);
