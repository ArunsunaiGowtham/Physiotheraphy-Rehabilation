const http = require('http');

function checkUrl(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({ statusCode: res.statusCode, length: data.length });
      });
    }).on('error', reject);
  });
}

async function run() {
  const urls = [
    'http://127.0.0.1:8080/services.html',
    'http://127.0.0.1:8080/assets/images/service-stroke.jpg',
    'http://127.0.0.1:8080/assets/images/service-vestibular.jpg',
    'http://127.0.0.1:8080/service-details.html?service=stroke-rehab',
    'http://127.0.0.1:8080/service-details.html?service=vestibular-rehab'
  ];

  for (const u of urls) {
    try {
      const res = await checkUrl(u);
      console.log(`[HTTP ${res.statusCode}] ${u} (${res.length} bytes)`);
    } catch (e) {
      console.error(`[ERROR] ${u}:`, e.message);
    }
  }
}

run();
