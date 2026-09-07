const http = require('http');

http.get('http://localhost:8080/patient/dashboard.html', (res) => {
  console.log('Status code:', res.statusCode);
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Length:', data.length);
    console.log('Has Patient Dashboard title:', data.includes('<title>Patient Dashboard'));
  });
}).on('error', (err) => {
  console.error('Error:', err.message);
});
