const http = require('http');

http.get('http://localhost:8080/blog.html', (res) => {
  console.log(`blog.html HTTP status: ${res.statusCode}`);
  let data = '';
  res.on('data', chunk => { data += chunk; });
  res.on('end', () => {
    console.log(`Page length: ${data.length} characters`);
  });
}).on('error', (err) => {
  console.error(`HTTP request error: ${err.message}`);
});
