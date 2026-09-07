const http = require('http');

function checkUrl(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      resolve({ url, statusCode: res.statusCode, contentType: res.headers['content-type'], length: res.headers['content-length'] });
    }).on('error', (err) => resolve({ url, error: err.message }));
  });
}

async function verifyAll() {
  const urls = [
    'http://127.0.0.1:8080/assets/images/blog-joint-hip.jpg',
    'http://127.0.0.1:8080/assets/images/blog-joint-thoracic.jpg',
    'http://127.0.0.1:8080/assets/images/blog-joint-shoulder.jpg',
    'http://127.0.0.1:8080/assets/images/service-joint.jpg',
    'http://127.0.0.1:8080/assets/js/blog-engine.js',
    'http://127.0.0.1:8080/blog.html'
  ];

  for (const u of urls) {
    const res = await checkUrl(u);
    console.log(`[HTTP ${res.statusCode}] ${res.url} (${res.contentType}, ${res.length} bytes)`);
  }
}

verifyAll();
