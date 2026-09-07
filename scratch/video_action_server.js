const fs = require('fs');
const path = require('path');

// We update inspect.html to seek to multiple timestamps: 5s, 15s, 30s for each video
const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Deep Video Action Inspector</title>
  <style>
    body { font-family: sans-serif; background: #111; color: #eee; padding: 20px; }
    .video-group { margin-bottom: 30px; border-bottom: 1px solid #333; padding-bottom: 20px; }
    .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; }
    .card { background: #222; border-radius: 8px; padding: 10px; }
    img { width: 100%; border-radius: 4px; display: block; }
    h2 { color: #60a5fa; margin-bottom: 10px; font-size: 18px; }
    h4 { color: #aaa; margin: 5px 0; font-size: 12px; }
  </style>
</head>
<body>
  <h1>Deep Clinical Video Action Inspector</h1>
  <div id="status" style="color:#4ade80; font-size: 18px; margin-bottom: 20px;">Extracting action frames...</div>
  <div id="container"></div>

  <script>
    const videos = [
      'mckenzie-pressup.mp4',
      'sciatic-floss.mp4',
      'glute-bridge.mp4',
      'quadruped-birddog.mp4'
    ];

    const container = document.getElementById('container');
    const status = document.getElementById('status');

    async function captureTime(videoName, timeSec) {
      return new Promise((resolve) => {
        const v = document.createElement('video');
        v.crossOrigin = 'anonymous';
        v.muted = true;
        v.playsInline = true;
        v.preload = 'auto';
        v.src = '/assets/videos/' + videoName;

        v.onloadedmetadata = () => {
          const t = Math.min(timeSec, Math.max(1, v.duration - 2));
          v.currentTime = t;
        };

        v.onseeked = () => {
          const canvas = document.createElement('canvas');
          canvas.width = v.videoWidth || 640;
          canvas.height = v.videoHeight || 360;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(v, 0, 0, canvas.width, canvas.height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
          resolve({ dataUrl, actualTime: v.currentTime, duration: v.duration });
        };

        v.onerror = () => resolve(null);
      });
    }

    async function run() {
      for (const vid of videos) {
        const group = document.createElement('div');
        group.className = 'video-group';
        group.innerHTML = '<h2>' + vid + '</h2><div class="grid" id="grid_' + vid.replace(/[^a-z0-9]/gi, '_') + '"></div>';
        container.appendChild(group);
        const grid = group.querySelector('.grid');

        // Capture at 5s, 15s, and 30s
        for (const sec of [6, 18, 32]) {
          const res = await captureTime(vid, sec);
          if (res) {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = '<h4>Time: ' + Math.round(res.actualTime) + 's / ' + Math.round(res.duration) + 's</h4><img src="' + res.dataUrl + '">';
            grid.appendChild(card);
          }
        }
      }
      status.textContent = 'All action frames extracted!';
    }

    run();
  </script>
</body>
</html>`;

const http = require('http');
const ROOT_DIR = path.resolve(__dirname, '..');

const server = http.createServer((req, res) => {
  if (req.url === '/' || req.url === '/inspect2.html') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
    return;
  }
  const reqPath = decodeURI(req.url.split('?')[0]);
  const filePath = path.join(ROOT_DIR, reqPath);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    let contentType = ext === '.mp4' ? 'video/mp4' : 'application/octet-stream';
    const stat = fs.statSync(filePath);
    const range = req.headers.range;
    if (range && ext === '.mp4') {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : stat.size - 1;
      const chunksize = (end - start) + 1;
      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${stat.size}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': contentType
      });
      fs.createReadStream(filePath, { start, end }).pipe(res);
    } else {
      res.writeHead(200, { 'Content-Length': stat.size, 'Content-Type': contentType, 'Accept-Ranges': 'bytes' });
      fs.createReadStream(filePath).pipe(res);
    }
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(3457, () => {
  console.log('Action inspector server running on port 3457');
});
