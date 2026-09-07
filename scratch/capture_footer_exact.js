const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

async function captureFooterExact() {
  const ROOT_DIR = path.resolve(__dirname, '..');
  const PORT = 3461;

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
    '--remote-debugging-port=9226',
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
      port: 9226,
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

  async function snapFooter(prefix, w, h) {
    if (w && h) {
      await sendCmd('Emulation.setDeviceMetricsOverride', {
        width: w,
        height: h,
        deviceScaleFactor: 1,
        mobile: w < 600
      });
      await new Promise(r => setTimeout(r, 500));
    }

    const evalRes = await sendCmd('Runtime.evaluate', {
      returnByValue: true,
      expression: `(() => {
        const footer = document.querySelector('.site-footer');
        footer.scrollIntoView({ block: 'start', inline: 'nearest' });
        const rect = footer.getBoundingClientRect();
        return {
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height,
          pageYOffset: window.pageYOffset,
          top: rect.top,
          bottom: rect.bottom
        };
      })()`
    });

    await new Promise(r => setTimeout(r, 600));

    // Capture screenshot of viewport or clipped to footer
    const shot = await sendCmd('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: true
    });
    fs.writeFileSync(path.join(__dirname, `${prefix}_viewport.png`), shot.data, 'base64');

    // Also get clipped if y is within bounds
    const box = evalRes.result.value;
    console.log(`${prefix} box:`, box);
  }

  await snapFooter('desktop_footer', 1280, 900);
  await snapFooter('tablet_footer', 768, 1024);
  await snapFooter('mobile_footer', 375, 812);

  ws.close();
  chrome.kill();
  server.close();
}

captureFooterExact().catch(console.error);
