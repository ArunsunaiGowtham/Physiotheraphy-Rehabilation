const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

async function testModal() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--autoplay-policy=no-user-gesture-required',
    '--disable-gpu',
    '--window-size=1280,900',
    '--no-first-run',
    '--no-default-browser-check'
  ]);

  await new Promise(r => setTimeout(r, 1500));

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
  console.log('Connected to CDP');

  await sendCmd('Page.enable');
  await sendCmd('Runtime.enable');
  await sendCmd('Page.addScriptToEvaluateOnNewDocument', {
    source: `localStorage.setItem('physiolife_current_user', JSON.stringify({ email: 'robert@example.com', role: 'patient', name: 'Robert Sterling' }));`
  });

  await sendCmd('Page.navigate', { url: pageUrl });
  console.log('Navigated to patient/exercises.html');
  await new Promise(r => setTimeout(r, 3000));

  // Open McKenzie video modal
  console.log('Clicking video button for mckenzie...');
  await sendCmd('Runtime.evaluate', {
    expression: `openExerciseVideo('mckenzie');`
  });
  await new Promise(r => setTimeout(r, 2000));

  const shotRes = await sendCmd('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(__dirname, 'modal_mckenzie_preview.png'), shotRes.data, 'base64');
  console.log('Saved modal_mckenzie_preview.png');

  ws.close();
  chrome.kill();
}

testModal().then(() => process.exit(0)).catch(err => {
  console.error(err);
  process.exit(1);
});
