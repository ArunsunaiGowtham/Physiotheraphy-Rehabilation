const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

async function testMultiplePages() {
  const ROOT_DIR = path.resolve(__dirname, '..');
  const PORT = 3469;
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
    '--remote-debugging-port=9235',
    '--disable-gpu',
    '--window-size=1280,1000',
    '--no-first-run',
    '--no-default-browser-check'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  const pagesToTest = ['blog.html', 'services.html', 'about.html', 'contact.html'];
  for (const p of pagesToTest) {
    const pageUrl = `http://localhost:${PORT}/${p}`;
    const target = await new Promise((resolve, reject) => {
      const req = http.request({
        host: '127.0.0.1',
        port: 9235,
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
    await new Promise(r => setTimeout(r, 500));

    const check = await sendCmd('Runtime.evaluate', {
      returnByValue: true,
      expression: `(() => {
        const f = document.querySelector('.site-footer');
        const cols = f ? f.querySelectorAll('.footer-main-row > div').length : 0;
        const links = f ? f.querySelectorAll('.footer-bottom-link').length : 0;
        const brandHeader = f ? f.querySelector('.footer-brand-header').getBoundingClientRect() : null;
        const h5 = f ? f.querySelector('.footer-widget h5').getBoundingClientRect() : null;
        const topsMatch = brandHeader && h5 ? Math.abs(brandHeader.top - h5.top) < 1 : false;
        return { exists: !!f, cols, links, topsMatch };
      })()`
    });

    console.log(`Page ${p}:`, check.result.value);
    ws.close();
  }

  chrome.kill();
  server.close();
}

testMultiplePages().catch(console.error);
