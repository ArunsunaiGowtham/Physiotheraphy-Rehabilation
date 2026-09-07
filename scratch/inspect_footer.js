const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

async function inspectFooter() {
  const ROOT_DIR = path.resolve(__dirname, '..');
  const PORT = 3459;

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
  console.log(`Server listening on port ${PORT}`);

  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9224',
    '--disable-gpu',
    '--window-size=1280,900',
    '--no-first-run',
    '--no-default-browser-check'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  const pageUrl = `http://localhost:${PORT}/index.html`;
  const target = await new Promise((resolve, reject) => {
    const req = http.request({
      host: '127.0.0.1',
      port: 9224,
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
  await new Promise(r => setTimeout(r, 2000));

  // Scroll to footer
  await sendCmd('Runtime.evaluate', {
    expression: `document.querySelector('.site-footer').scrollIntoView();`
  });
  await new Promise(r => setTimeout(r, 500));

  // Desktop screenshot
  let shot = await sendCmd('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(__dirname, 'current_footer_desktop.png'), shot.data, 'base64');
  console.log('Saved current_footer_desktop.png');

  // Measure columns and elements
  const metrics = await sendCmd('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      const footer = document.querySelector('.site-footer');
      const container = footer.querySelector('.container');
      const row = footer.querySelector('.row');
      const cols = Array.from(row.children);
      const h5s = cols.map(c => {
        const h = c.querySelector('h5') || c.querySelector('.footer-brand-header');
        return {
          tag: h ? h.tagName : null,
          rect: h ? h.getBoundingClientRect() : null,
          text: h ? h.textContent.trim() : null
        };
      });
      const colRects = cols.map((c, i) => ({
        index: i,
        rect: c.getBoundingClientRect(),
        className: c.className
      }));
      const bottom = footer.querySelector('.footer-bottom');
      return {
        footerRect: footer.getBoundingClientRect(),
        containerRect: container.getBoundingClientRect(),
        rowRect: row.getBoundingClientRect(),
        colRects,
        h5s,
        bottomRect: bottom ? bottom.getBoundingClientRect() : null
      };
    })()`
  });
  console.log('Metrics:', JSON.stringify(metrics.result.value, null, 2));

  // Tablet screenshot
  await sendCmd('Emulation.setDeviceMetricsOverride', {
    width: 768,
    height: 1024,
    deviceScaleFactor: 1,
    mobile: false
  });
  await new Promise(r => setTimeout(r, 500));
  await sendCmd('Runtime.evaluate', {
    expression: `document.querySelector('.site-footer').scrollIntoView();`
  });
  shot = await sendCmd('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(__dirname, 'current_footer_tablet.png'), shot.data, 'base64');
  console.log('Saved current_footer_tablet.png');

  // Mobile screenshot
  await sendCmd('Emulation.setDeviceMetricsOverride', {
    width: 375,
    height: 812,
    deviceScaleFactor: 1,
    mobile: true
  });
  await new Promise(r => setTimeout(r, 500));
  await sendCmd('Runtime.evaluate', {
    expression: `document.querySelector('.site-footer').scrollIntoView();`
  });
  shot = await sendCmd('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(__dirname, 'current_footer_mobile.png'), shot.data, 'base64');
  console.log('Saved current_footer_mobile.png');

  ws.close();
  chrome.kill();
  server.close();
}

inspectFooter().catch(console.error);
