/**
 * Node.js Verification Test for Patient Hub -> Home Exercises Page
 * Validates Grid, Alignment, Responsiveness, Video Mapping, and Modal Logic
 * Strictly Javascript/Node.js - NO Python
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

let failures = 0;
function assert(cond, msg) {
  if (!cond) {
    console.error(`❌ FAIL: ${msg}`);
    failures++;
  } else {
    console.log(`✓ PASS: ${msg}`);
  }
}

console.log('========================================================');
console.log('Testing Home Exercises Page (patient/exercises.html)');
console.log('========================================================\n');

// 1. Check local video files
const videoDir = path.join(__dirname, '..', 'assets', 'videos');
const expectedVideos = [
  'mckenzie-pressup.mp4',
  'sciatic-floss.mp4',
  'glute-bridge.mp4',
  'quadruped-birddog.mp4'
];

expectedVideos.forEach(v => {
  const fullPath = path.join(videoDir, v);
  const exists = fs.existsSync(fullPath);
  const size = exists ? fs.statSync(fullPath).size : 0;
  assert(exists && size > 100000, `Video file ${v} exists and has valid size (${size} bytes)`);
});

// 2. Check exercise images
const imgDir = path.join(__dirname, '..', 'assets', 'images');
const expectedImages = [
  'exercise-pressup.jpg',
  'exercise-floss.jpg',
  'exercise-bridge.jpg',
  'exercise-birddog.jpg'
];

expectedImages.forEach(img => {
  const fullPath = path.join(imgDir, img);
  const exists = fs.existsSync(fullPath);
  const size = exists ? fs.statSync(fullPath).size : 0;
  assert(exists && size > 10000, `Image ${img} exists and has valid size (${size} bytes)`);
});

// 3. Inspect patient/exercises.html content
const htmlPath = path.join(__dirname, '..', 'patient', 'exercises.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Check responsive grid column classes
const colMatches = htmlContent.match(/class="col-12 col-md-6 col-xl-3"/g);
assert(colMatches && colMatches.length === 4, `All 4 cards have responsive classes "col-12 col-md-6 col-xl-3" (Found: ${colMatches ? colMatches.length : 0})`);

// Check card flex classes
const cardMatches = htmlContent.match(/class="exercise-item-card dash-card h-100 mb-0[^"]*"/g);
assert(cardMatches && cardMatches.length >= 4, `All 4 exercise cards have .exercise-item-card .dash-card .h-100 (Found: ${cardMatches ? cardMatches.length : 0})`);

// Check image wrappers
const imgWrapperMatches = htmlContent.match(/class="exercise-img-wrapper[^"]*"/g);
assert(imgWrapperMatches && imgWrapperMatches.length >= 4, `All 4 exercise cards have .exercise-img-wrapper (Found: ${imgWrapperMatches ? imgWrapperMatches.length : 0})`);

// Check card badges inside body
assert(htmlContent.includes('Spine Extension') && htmlContent.includes('bg-primary'), 'Exercise 1 has Spine Extension badge');
assert(htmlContent.includes('Nerve Glide') && htmlContent.includes('bg-info'), 'Exercise 2 has Nerve Glide badge');
assert(htmlContent.includes('Core Stability') && htmlContent.includes('bg-secondary'), 'Exercise 3 has Core Stability badge');
assert(htmlContent.includes('Multifidus Focus') && htmlContent.includes('bg-success'), 'Exercise 4 has Multifidus Focus badge');

// Check unique video trigger buttons
assert(htmlContent.includes("openExerciseVideo('mckenzie')"), 'Exercise 1 triggers openExerciseVideo(mckenzie)');
assert(htmlContent.includes("openExerciseVideo('floss')"), 'Exercise 2 triggers openExerciseVideo(floss)');
assert(htmlContent.includes("openExerciseVideo('bridge')"), 'Exercise 3 triggers openExerciseVideo(bridge)');
assert(htmlContent.includes("openExerciseVideo('birddog')"), 'Exercise 4 triggers openExerciseVideo(birddog)');

// Check Video Player modal markup
assert(htmlContent.includes('id="videoPlayerModal"'), 'Video modal with id="videoPlayerModal" exists');
assert(htmlContent.includes('id="exerciseVideoPlayer"'), 'Video element id="exerciseVideoPlayer" exists');
assert(htmlContent.includes('controls'), 'Video element has controls attribute');
assert(htmlContent.includes('playsinline'), 'Video element has playsinline attribute');
assert(htmlContent.includes('id="videoErrorFallback"'), 'Video error fallback container exists');
assert(htmlContent.includes('Exercise video is currently unavailable.'), 'Fallback message text exists');

// Check EXERCISE_DATA registry
assert(htmlContent.includes('const EXERCISE_DATA = {'), 'EXERCISE_DATA registry is defined');
assert(htmlContent.includes('mckenzie-pressup.mp4'), 'mckenzie-pressup.mp4 mapped');
assert(htmlContent.includes('sciatic-floss.mp4'), 'sciatic-floss.mp4 mapped');
assert(htmlContent.includes('glute-bridge.mp4'), 'glute-bridge.mp4 mapped');
assert(htmlContent.includes('quadruped-birddog.mp4'), 'quadruped-birddog.mp4 mapped');

// Check pause/stop on modal hide
assert(htmlContent.includes('hidden.bs.modal') && htmlContent.includes('videoPlayer.pause()'), 'Video pauses on modal close');

// 4. Check CSS styling in assets/css/dashboard.css
const cssPath = path.join(__dirname, '..', 'assets', 'css', 'dashboard.css');
const cssContent = fs.readFileSync(cssPath, 'utf8');

assert(cssContent.includes('.exercise-item-card {') && cssContent.includes('display: flex !important;'), 'CSS enforces flex column layout on .exercise-item-card');
assert(cssContent.includes('.exercise-img-wrapper {') && cssContent.includes('height: 165px;'), 'CSS sets fixed image container height');
assert(cssContent.includes('.exercise-img-wrapper img {') && cssContent.includes('object-fit: cover;'), 'CSS sets object-fit: cover on images');
assert(cssContent.includes('.exercise-action-footer {') && cssContent.includes('margin-top: auto !important;'), 'CSS anchors action buttons to bottom with margin-top: auto');
assert(cssContent.includes('.exercise-title {') && cssContent.includes('min-height: 2.7rem;'), 'CSS aligns title heights');
assert(cssContent.includes('.exercise-desc {') && cssContent.includes('flex-grow: 1 !important;'), 'CSS aligns descriptions with flex-grow');

// 5. Test Live HTTP Endpoint and Video Stream Serving
const server = http.createServer((req, res) => {
  const reqUrl = req.url.split('?')[0];
  const filePath = path.join(__dirname, '..', reqUrl);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const mime = ext === '.mp4' ? 'video/mp4' : (ext === '.html' ? 'text/html' : 'text/plain');
    res.writeHead(200, { 'Content-Type': mime });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(0, () => {
  const port = server.address().port;
  http.get(`http://localhost:${port}/patient/exercises.html`, res => {
    assert(res.statusCode === 200, `HTTP GET /patient/exercises.html returns status 200 (Got: ${res.statusCode})`);
    let data = '';
    res.on('data', chunk => { data += chunk; });
    res.on('end', () => {
      assert(data.length > 5000, `HTTP response body received complete content (${data.length} bytes)`);

      // Test streaming one of the exercise videos
      http.get(`http://localhost:${port}/assets/videos/mckenzie-pressup.mp4`, vidRes => {
        assert(vidRes.statusCode === 200, `HTTP GET mckenzie-pressup.mp4 returns 200`);
        assert(vidRes.headers['content-type'] === 'video/mp4', 'Video returns video/mp4 Content-Type');
        vidRes.destroy();
        server.close(() => {
          console.log('\n========================================================');
          if (failures === 0) {
            console.log('🎉 ALL VERIFICATION TESTS PASSED SUCCESSFULLY!');
          } else {
            console.error(`💥 ${failures} TESTS FAILED.`);
          }
          console.log('========================================================');
          process.exit(failures === 0 ? 0 : 1);
        });
      });
    });
  }).on('error', err => {
    assert(false, `HTTP request error: ${err.message}`);
    server.close();
    process.exit(1);
  });
});
