const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

async function testFooterRevamp() {
  const ROOT_DIR = path.resolve(__dirname, '..');
  const PORT = 3463;

  // Let's create a test CSS snippet or test against a temporary file first
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
    '--remote-debugging-port=9228',
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
      port: 9228,
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

  // Inject revised CSS to evaluate before making permanent edits
  const revisedCSS = `
    .site-footer {
      background-color: var(--bg-surface-alt);
      border-top: 1px solid var(--border-color);
      padding: 60px 0 28px;
      color: var(--text-muted);
      font-size: 0.935rem;
    }
    .site-footer .container {
      max-width: 1240px;
      margin-left: auto;
      margin-right: auto;
      padding-left: 1.5rem;
      padding-right: 1.5rem;
    }
    .site-footer .footer-widget {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }
    /* Uniform Top Heading Alignment */
    .site-footer .footer-brand-header,
    .site-footer .footer-widget h5 {
      height: 38px;
      margin-top: 0;
      margin-bottom: 1.25rem;
      display: flex;
      align-items: center;
      padding: 0;
    }
    .site-footer .footer-logo-wrap {
      display: inline-flex;
      align-items: center;
      text-decoration: none;
    }
    .site-footer .footer-logo-wrap img {
      height: 34px;
      width: auto;
      display: block;
    }
    .site-footer .footer-widget h5 {
      color: var(--text-heading);
      font-family: var(--font-family-heading);
      font-size: 1.125rem;
      font-weight: 700;
      line-height: 1.2;
      letter-spacing: -0.01em;
    }
    .site-footer .footer-brand-text {
      font-size: 0.935rem;
      line-height: 1.6;
      margin-bottom: 1.25rem;
      color: var(--text-muted);
    }
    /* Social Icons: compact, evenly spaced, aligned horizontally */
    .site-footer .footer-social-wrap {
      margin-top: 0;
      display: flex;
      align-items: center;
    }
    .site-footer .social-icon-btn {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: var(--bg-surface);
      color: var(--text-muted);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 0.9rem;
      border: 1px solid var(--border-color);
      transition: var(--transition-base);
      text-decoration: none;
      flex-shrink: 0;
    }
    .site-footer .social-icon-btn:hover {
      background: var(--primary);
      color: #ffffff;
      border-color: var(--primary);
      transform: translateY(-2px);
      box-shadow: 0 4px 10px rgba(15, 118, 110, 0.25);
    }
    /* Links list */
    .site-footer .footer-links {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .site-footer .footer-links li {
      margin-bottom: 0.625rem;
      color: var(--text-muted);
      font-size: 0.935rem;
      line-height: 1.5;
    }
    .site-footer .footer-links li:last-child {
      margin-bottom: 0;
    }
    .site-footer .footer-links a {
      color: var(--text-muted);
      display: inline-flex;
      align-items: center;
      text-decoration: none;
      transition: var(--transition-base);
    }
    .site-footer .footer-links a:hover {
      color: var(--primary);
      transform: translateX(4px);
    }
    /* Clinic Information list */
    .site-footer .footer-contact-info li {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      margin-bottom: 0.75rem;
      font-size: 0.935rem;
      line-height: 1.5;
    }
    .site-footer .footer-contact-info li:last-child {
      margin-bottom: 0;
    }
    .site-footer .footer-contact-info i {
      width: 20px;
      height: 22px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      flex-shrink: 0;
      color: var(--primary);
      font-size: 0.95rem;
      margin-top: 0;
    }
    .site-footer .footer-contact-info span {
      flex: 1;
      min-width: 0;
      word-break: break-word;
    }
    /* Bottom bar */
    .site-footer .footer-bottom {
      margin-top: 40px;
      padding-top: 24px;
      border-top: 1px solid var(--border-color);
      font-size: 0.875rem;
      line-height: 1.5;
    }
    .site-footer .footer-bottom p {
      font-size: 0.875rem;
      line-height: 1.5;
      margin: 0;
    }
    .site-footer .footer-bottom a {
      color: var(--text-muted);
      text-decoration: none;
      font-size: 0.875rem;
      line-height: 1.5;
      transition: var(--transition-base);
      display: inline-flex;
      align-items: center;
    }
    .site-footer .footer-bottom a:hover {
      color: var(--primary);
    }
    @media (min-width: 768px) {
      .site-footer .footer-bottom {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
      }
    }
    @media (max-width: 767.98px) {
      .site-footer .footer-bottom {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 1rem;
      }
      .site-footer .footer-bottom > div {
        justify-content: center;
      }
    }
  `;

  await sendCmd('Runtime.evaluate', {
    expression: `(() => {
      const style = document.createElement('style');
      style.id = 'revised-footer-style';
      style.textContent = \`${revisedCSS}\`;
      document.head.appendChild(style);

      // Also ensure the column classes are col-12 col-md-6 col-lg-3
      const cols = document.querySelectorAll('.site-footer .row > [class*="col-"]');
      cols.forEach(col => {
        col.className = 'col-12 col-md-6 col-lg-3';
      });
    })()`
  });

  async function takeClip(filename, w, h) {
    await sendCmd('Emulation.setDeviceMetricsOverride', {
      width: w,
      height: h,
      deviceScaleFactor: 1,
      mobile: w < 600
    });
    await new Promise(r => setTimeout(r, 600));

    const clipRes = await sendCmd('Runtime.evaluate', {
      returnByValue: true,
      expression: `(() => {
        const footer = document.querySelector('.site-footer');
        const box = footer.getBoundingClientRect();
        return {
          x: Math.max(0, box.left + window.scrollX),
          y: Math.max(0, box.top + window.scrollY),
          width: box.width,
          height: box.height,
          scale: 1
        };
      })()`
    });

    const clip = clipRes.result.value;
    const shot = await sendCmd('Page.captureScreenshot', {
      format: 'png',
      clip: clip,
      captureBeyondViewport: true
    });

    fs.writeFileSync(path.join(__dirname, filename), shot.data, 'base64');
    console.log(`Saved ${filename}`);
  }

  // Test light mode
  await takeClip('revised_desktop_light.png', 1280, 1000);
  await takeClip('revised_tablet_light.png', 768, 1024);
  await takeClip('revised_mobile_light.png', 375, 812);

  // Test dark mode
  await sendCmd('Runtime.evaluate', {
    expression: `document.documentElement.setAttribute('data-bs-theme', 'dark');`
  });
  await takeClip('revised_desktop_dark.png', 1280, 1000);

  ws.close();
  chrome.kill();
  server.close();
}

testFooterRevamp().catch(console.error);
