const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

async function testAllFooters() {
  const ROOT_DIR = path.resolve(__dirname, '..');
  const PORT = 3465;

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
    '--remote-debugging-port=9230',
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
      port: 9230,
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

  const perfectCSS = `
    /* ==========================================================================
       Site Footer - Pixel-Perfect Responsive Layout System
       ========================================================================== */
    .site-footer {
      background-color: var(--bg-surface-alt);
      border-top: 1px solid var(--border-color);
      padding: 64px 0 28px;
      color: var(--text-muted);
      font-size: 0.925rem;
      position: relative;
      width: 100%;
      overflow: hidden;
    }

    .site-footer .container {
      width: 100%;
      max-width: 1240px;
      margin-left: auto;
      margin-right: auto;
      padding-left: 1.5rem;
      padding-right: 1.5rem;
    }

    .site-footer .footer-main-row {
      --bs-gutter-x: 2rem;
      --bs-gutter-y: 2.25rem;
    }

    @media (min-width: 1200px) {
      .site-footer .footer-main-row {
        --bs-gutter-x: 2.5rem;
      }
    }

    .site-footer .footer-widget {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      height: 100%;
    }

    /* Column Top Alignment System */
    .site-footer .footer-brand-header,
    .site-footer .footer-widget h5 {
      height: 36px;
      margin-top: 0;
      margin-bottom: 1.25rem;
      display: flex;
      align-items: center;
      padding: 0;
      box-sizing: border-box;
    }

    .site-footer .footer-logo-wrap {
      display: inline-flex;
      align-items: center;
      text-decoration: none;
      line-height: 1;
    }

    .site-footer .footer-logo-wrap img {
      height: 32px;
      width: auto;
      display: block;
      object-fit: contain;
    }

    [data-bs-theme="dark"] .site-footer .footer-logo-wrap img {
      content: url("assets/images/logo-dark.svg");
    }

    .site-footer .footer-widget h5 {
      color: var(--text-heading);
      font-family: var(--font-family-heading);
      font-size: 1.125rem;
      font-weight: 700;
      line-height: 1.2;
      letter-spacing: -0.01em;
    }

    /* Brand description */
    .site-footer .footer-brand-text {
      font-size: 0.925rem;
      line-height: 1.6;
      margin-bottom: 1.25rem;
      color: var(--text-muted);
      max-width: 320px;
    }

    /* Social icons: evenly spaced, aligned horizontally */
    .site-footer .footer-social-wrap {
      margin-top: 0;
      display: flex;
      align-items: center;
    }

    .site-footer .footer-social-wrap .social-icons-group {
      display: flex;
      align-items: center;
      gap: 0.625rem;
      flex-wrap: wrap;
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
      font-size: 0.875rem;
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

    /* Navigation Links */
    .site-footer .footer-links {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .site-footer .footer-links li {
      margin-bottom: 0.625rem;
      color: var(--text-muted);
      font-size: 0.925rem;
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
      font-size: 0.925rem;
    }

    .site-footer .footer-links a:hover {
      color: var(--primary);
      transform: translateX(4px);
    }

    [dir="rtl"] .site-footer .footer-links a:hover {
      transform: translateX(-4px);
    }

    /* Clinic Information list: pixel-perfect icons & text */
    .site-footer .footer-contact-info li {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      margin-bottom: 0.75rem;
      font-size: 0.925rem;
      line-height: 1.5;
    }

    .site-footer .footer-contact-info li:last-child {
      margin-bottom: 0;
    }

    .site-footer .footer-contact-info i {
      width: 18px;
      height: 22px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      flex-shrink: 0;
      color: var(--primary);
      font-size: 0.95rem;
      margin: 0;
      padding: 0;
    }

    .site-footer .footer-contact-info span {
      flex: 1;
      min-width: 0;
      word-break: break-word;
    }

    /* Bottom Copyright & Footer Links */
    .site-footer .footer-bottom {
      margin-top: 48px;
      padding-top: 24px;
      border-top: 1px solid var(--border-color);
    }

    .site-footer .footer-bottom-inner {
      display: flex;
      width: 100%;
    }

    .site-footer .footer-copyright {
      font-size: 0.875rem;
      line-height: 1.5;
      color: var(--text-muted);
      margin: 0;
    }

    .site-footer .footer-bottom-links {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 1.5rem;
      font-size: 0.875rem;
      line-height: 1.5;
    }

    .site-footer .footer-bottom-link {
      color: var(--text-muted);
      text-decoration: none;
      font-size: 0.875rem;
      line-height: 1.5;
      transition: var(--transition-base);
      display: inline-flex;
      align-items: center;
    }

    .site-footer .footer-bottom-link:hover {
      color: var(--primary);
    }

    @media (min-width: 992px) {
      .site-footer .footer-bottom-inner {
        flex-direction: row;
        justify-content: space-between;
        align-items: baseline;
      }
    }

    @media (min-width: 768px) and (max-width: 991.98px) {
      .site-footer .footer-bottom-inner {
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 0.875rem;
      }
      .site-footer .footer-bottom-links {
        justify-content: center;
      }
    }

    @media (max-width: 767.98px) {
      .site-footer .footer-bottom-inner {
        flex-direction: column;
        align-items: flex-start;
        text-align: left;
        gap: 0.875rem;
      }
      .site-footer .footer-bottom-links {
        justify-content: flex-start;
        gap: 0.75rem 1.25rem;
      }
    }
  `;

  // Inject updated HTML structure and CSS into index.html
  await sendCmd('Runtime.evaluate', {
    expression: `(() => {
      const style = document.createElement('style');
      style.id = 'perfect-footer-style';
      style.textContent = \`${perfectCSS}\`;
      document.head.appendChild(style);

      const footer = document.querySelector('.site-footer');
      footer.innerHTML = \`
    <div class="container">
      <div class="row footer-main-row">
        <!-- Col 1: Brand Info -->
        <div class="col-12 col-md-6 col-lg-3">
          <div class="footer-widget">
            <div class="footer-brand-header">
              <a href="index.html" class="footer-logo-wrap" title="PhysioLife Home">
                <img src="assets/images/logo.svg" alt="PhysioLife Logo" height="32">
              </a>
            </div>
            <p class="footer-brand-text">
              PhysioLife is an internationally accredited physical therapy and comprehensive orthopedic rehabilitation clinic dedicated to helping individuals live active, pain-free lives.
            </p>
            <div class="footer-social-wrap">
              <div class="social-icons-group">
                <a href="https://www.facebook.com/physiolifeclinic" class="social-icon-btn" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                <a href="https://twitter.com/physiolifeclinic" class="social-icon-btn" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                <a href="https://www.linkedin.com/company/physiolife-clinic" class="social-icon-btn" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
                <a href="https://www.instagram.com/physiolifeclinic" class="social-icon-btn" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                <a href="https://www.youtube.com/@physiolifeclinic" class="social-icon-btn" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
              </div>
            </div>
          </div>
        </div>

        <!-- Col 2: Quick Links -->
        <div class="col-12 col-md-6 col-lg-3">
          <div class="footer-widget">
            <h5>Quick Links</h5>
            <ul class="footer-links">
              <li><a href="about.html">About Clinic</a></li>
              <li><a href="services.html">Therapy Services</a></li>
              <li><a href="therapists.html">Our Specialists</a></li>
              <li><a href="insurance.html">Insurance &amp; Billing</a></li>
              <li><a href="pricing.html">Pricing Packages</a></li>
              <li><a href="contact.html">Contact Us</a></li>
            </ul>
          </div>
        </div>

        <!-- Col 3: Services -->
        <div class="col-12 col-md-6 col-lg-3">
          <div class="footer-widget">
            <h5>Services</h5>
            <ul class="footer-links">
              <li><a href="service-details.html?service=spine-neck">Spine &amp; Neck Therapy</a></li>
              <li><a href="service-details.html?service=sports-injury">Sports Rehabilitation</a></li>
              <li><a href="service-details.html?service=post-surgery">Post-Surgical Care</a></li>
              <li><a href="service-details.html?service=joint-rehab">Joint Mobility</a></li>
              <li><a href="service-details.html?service=neurological">Neurological Rehab</a></li>
              <li><a href="service-details.html?service=home-visit">Home Physiotherapy</a></li>
            </ul>
          </div>
        </div>

        <!-- Col 4: Clinic Information -->
        <div class="col-12 col-md-6 col-lg-3">
          <div class="footer-widget">
            <h5>Clinic Information</h5>
            <ul class="footer-links footer-contact-info">
              <li>
                <i class="fas fa-map-marker-alt"></i>
                <span>742 Evergreen Healthcare Blvd, Suite 400, NY 10001</span>
              </li>
              <li>
                <i class="fas fa-phone-alt"></i>
                <span>+1 (800) 555-REHAB (73422)</span>
              </li>
              <li>
                <i class="fas fa-envelope"></i>
                <span>appointments@physiolifeclinic.com</span>
              </li>
              <li>
                <i class="fas fa-clock"></i>
                <span>Monday – Friday: 7:00 AM – 8:00 PM</span>
              </li>
              <li>
                <i class="fas fa-calendar-check"></i>
                <span>Saturday: 8:00 AM – 3:00 PM</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="footer-bottom-inner">
          <p class="footer-copyright">&copy; 2026 PhysioLife Rehabilitation Clinic. All rights reserved.</p>
          <div class="footer-bottom-links">
            <a href="documentation/index.html" class="footer-bottom-link"><i class="far fa-file-alt me-1"></i> Template Documentation</a>
            <a href="#" class="footer-bottom-link">Privacy Policy</a>
            <a href="#" class="footer-bottom-link">Terms of Care</a>
            <a href="404.html" class="footer-bottom-link">404 Demo</a>
          </div>
        </div>
      </div>
    </div>
      \`;
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

  // 1. Desktop Light (1280px)
  await takeClip('perfect_desktop_light.png', 1280, 1000);

  // 2. Desktop Dark (1280px)
  await sendCmd('Runtime.evaluate', {
    expression: `document.documentElement.setAttribute('data-bs-theme', 'dark');`
  });
  await takeClip('perfect_desktop_dark.png', 1280, 1000);

  // 3. Tablet Light (768px)
  await sendCmd('Runtime.evaluate', {
    expression: `document.documentElement.setAttribute('data-bs-theme', 'light');`
  });
  await takeClip('perfect_tablet_light.png', 768, 1024);

  // 4. Mobile Light (375px)
  await takeClip('perfect_mobile_light.png', 375, 812);

  // Verify tops alignment programmatic check
  const topCheck = await sendCmd('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      const footer = document.querySelector('.site-footer');
      const logoBox = footer.querySelector('.footer-brand-header').getBoundingClientRect();
      const h5Boxes = Array.from(footer.querySelectorAll('.footer-widget h5')).map(h => {
        const b = h.getBoundingClientRect();
        return { text: h.textContent.trim(), top: b.top, height: b.height, bottom: b.bottom };
      });
      const copyright = footer.querySelector('.footer-copyright').getBoundingClientRect();
      const firstLink = footer.querySelector('.footer-bottom-link').getBoundingClientRect();
      return {
        logoHeader: { top: logoBox.top, height: logoBox.height, bottom: logoBox.bottom },
        h5Boxes,
        baselineDiff: Math.abs(copyright.top - firstLink.top)
      };
    })()`
  });

  console.log('Top Check Results:', JSON.stringify(topCheck.result.value, null, 2));

  ws.close();
  chrome.kill();
  server.close();
}

testAllFooters().catch(console.error);
