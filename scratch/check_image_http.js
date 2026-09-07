const http = require('http');

const testImages = [
  'assets/images/blog-sciatica.jpg',
  'assets/images/blog-knee-osteo.jpg',
  'assets/images/blog-dry-needling.jpg',
  'assets/images/exercise-floss.jpg',
  'assets/images/blog-plantar-fasciitis.jpg',
  'assets/images/blog-tennis-elbow.jpg'
];

let pending = testImages.length;

testImages.forEach(img => {
  http.get(`http://localhost:8080/${img}`, (res) => {
    console.log(`${img} -> HTTP ${res.statusCode}, content-length: ${res.headers['content-length']}`);
    pending--;
    if (pending === 0) console.log('All images checked!');
  }).on('error', (err) => {
    console.error(`${img} -> Error: ${err.message}`);
    pending--;
  });
});
