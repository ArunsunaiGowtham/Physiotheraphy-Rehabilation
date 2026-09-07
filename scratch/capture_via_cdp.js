const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

async function run() {
  console.log('Launching headless Chrome with CDP...');
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--autoplay-policy=no-user-gesture-required',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check'
  ]);

  chrome.on('error', err => console.error('Chrome spawn error:', err));

  // Wait 1.5s for Chrome to bind port 9222
  await new Promise(r => setTimeout(r, 1500));

  // Get new target page pointing to our inspect server
  console.log('Opening http://localhost:3456/patient/exercises.html via CDP...');
  const pageUrl = 'http://localhost:3456/patient/exercises.html';
  
  const target = await new Promise((resolve, reject) => {
    const req = http.request({
      host: '127.0.0.1',
      port: 9222,
      path: `/json/new?${encodeURIComponent(pageUrl)}`,
      method: 'PUT'
    }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          console.error('Raw response:', data);
          reject(e);
        }
      });
    });
    req.on('error', reject);
    req.end();
  });

  console.log('Target created:', target.id);
  const wsUrl = target.webSocketDebuggerUrl;

  const ws = new WebSocket(wsUrl);
  let id = 1;

  ws.onopen = () => {
    console.log('Connected to Chrome DevTools WebSocket.');
    ws.send(JSON.stringify({ id: id++, method: 'Page.enable' }));
    ws.send(JSON.stringify({ id: id++, method: 'Runtime.enable' }));
    ws.send(JSON.stringify({
      id: id++,
      method: 'Page.addScriptToEvaluateOnNewDocument',
      params: {
        source: `localStorage.setItem('physiolife_current_user', JSON.stringify({ email: 'robert@example.com', role: 'patient', name: 'Robert Sterling' }));`
      }
    }));
    // Now navigate to patient/exercises.html
    ws.send(JSON.stringify({
      id: id++,
      method: 'Page.navigate',
      params: { url: 'http://localhost:3456/patient/exercises.html' }
    }));
  };

  // Wait 3 seconds for page and images to load
  console.log('Waiting 3s for page to load...');
  await new Promise(r => setTimeout(r, 3000));

  // Request screenshot
  console.log('Capturing screenshot of inspect page...');
  const screenshotBase64 = await new Promise((resolve, reject) => {
    const shotId = id++;
    const onMessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        if (msg.id === shotId) {
          ws.removeEventListener('message', onMessage);
          if (msg.result && msg.result.data) {
            resolve(msg.result.data);
          } else {
            reject(new Error('No screenshot data in response: ' + JSON.stringify(msg)));
          }
        }
      } catch (e) {
        reject(e);
      }
    };
    ws.addEventListener('message', onMessage);
    ws.send(JSON.stringify({ id: shotId, method: 'Page.captureScreenshot', params: { format: 'png', captureBeyondViewport: true } }));
  });

  const outPath = path.join(__dirname, 'home_exercises_page_preview.png');
  fs.writeFileSync(outPath, screenshotBase64, 'base64');
  console.log('SUCCESS! Screenshot saved to:', outPath);

  ws.close();
  chrome.kill();
  process.exit(0);
}

run().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
