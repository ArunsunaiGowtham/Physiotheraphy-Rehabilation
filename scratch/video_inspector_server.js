const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const PORT = 3456;

const videos = [
  'mckenzie-pressup.mp4',
  'sciatic-floss.mp4',
  'glute-bridge.mp4',
  'quadruped-birddog.mp4',
  'quad-sets.mp4',
  'romanian-deadlift.mp4'
];

const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Video Frame Inspector</title>
  <style>
    body { font-family: sans-serif; background: #111; color: #eee; padding: 20px; }
    .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
    .card { background: #222; border-radius: 8px; padding: 10px; }
    canvas, img { width: 100%; border-radius: 4px; display: block; }
    h3 { font-size: 14px; margin: 8px 0; color: #4ade80; }
    #status { font-size: 18px; margin-bottom: 20px; color: #60a5fa; }
  </style>
</head>
<body>
  <h1>Clinical Video Frame Inspector</h1>
  <div id="status">Initializing extraction...</div>
  <div class="grid" id="grid"></div>

  <script>
    const videos = ${JSON.stringify(videos)};
    const grid = document.getElementById('grid');
    const status = document.getElementById('status');

    async function extractFrame(videoName) {
      return new Promise((resolve) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = '<h3>' + videoName + '</h3><div class="loading">Loading video...</div>';
        grid.appendChild(card);

        const v = document.createElement('video');
        v.crossOrigin = 'anonymous';
        v.muted = true;
        v.playsInline = true;
        v.preload = 'auto';
        v.src = '/assets/videos/' + videoName;

        v.onloadedmetadata = () => {
          // seek to 25% of duration or 2s
          const targetTime = Math.min(2.0, v.duration * 0.3);
          v.currentTime = targetTime;
        };

        v.onseeked = () => {
          const canvas = document.createElement('canvas');
          canvas.width = v.videoWidth || 640;
          canvas.height = v.videoHeight || 360;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(v, 0, 0, canvas.width, canvas.height);

          const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
          card.querySelector('.loading').remove();
          const img = document.createElement('img');
          img.src = dataUrl;
          card.appendChild(img);

          // Post to server
          fetch('/save-frame', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: videoName, image: dataUrl, duration: v.duration, width: v.videoWidth, height: v.videoHeight })
          }).then(() => resolve({ name: videoName, success: true, duration: v.duration }))
            .catch(err => resolve({ name: videoName, success: false, err: err.message }));
        };

        v.onerror = (e) => {
          card.innerHTML += '<p style="color:red">Error loading video</p>';
          resolve({ name: videoName, success: false, err: 'video load error' });
        };
      });
    }

    async function run() {
      for (let i = 0; i < videos.length; i++) {
        status.textContent = 'Extracting frame for ' + videos[i] + ' (' + (i + 1) + '/' + videos.length + ')...';
        await extractFrame(videos[i]);
      }
      status.textContent = 'Extraction complete! All ' + videos.length + ' video frames saved.';
      status.style.color = '#4ade80';
    }

    run();
  </script>
</body>
</html>`;

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && (req.url === '/' || req.url === '/inspect.html')) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
    return;
  }

  if (req.method === 'POST' && req.url === '/save-frame') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const base64Data = data.image.replace(/^data:image\/jpeg;base64,/, '');
        const filename = 'frame_' + data.name.replace('.mp4', '.jpg');
        const savePath = path.join(__dirname, filename);
        fs.writeFileSync(savePath, base64Data, 'base64');
        console.log(`Saved frame for ${data.name} (Duration: ${data.duration}s, ${data.width}x${data.height}) -> ${filename}`);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true }));
      } catch (err) {
        console.error('Error saving frame:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // Serve static files (video files etc.)
  const reqPath = decodeURI(req.url.split('?')[0]);
  const filePath = path.join(ROOT_DIR, reqPath);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    let contentType = 'application/octet-stream';
    if (ext === '.mp4') contentType = 'video/mp4';
    else if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
    else if (ext === '.png') contentType = 'image/png';
    else if (ext === '.html') contentType = 'text/html';
    else if (ext === '.js') contentType = 'application/javascript';
    else if (ext === '.css') contentType = 'text/css';

    const stat = fs.statSync(filePath);
    const range = req.headers.range;

    if (range && ext === '.mp4') {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : stat.size - 1;
      const chunksize = (end - start) + 1;
      const file = fs.createReadStream(filePath, { start, end });
      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${stat.size}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': contentType
      });
      file.pipe(res);
    } else {
      res.writeHead(200, {
        'Content-Length': stat.size,
        'Content-Type': contentType,
        'Accept-Ranges': 'bytes'
      });
      fs.createReadStream(filePath).pipe(res);
    }
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(PORT, () => {
  console.log(`Video inspector server running at http://localhost:${PORT}/inspect.html`);
});
