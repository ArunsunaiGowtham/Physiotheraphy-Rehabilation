const http = require('http');

http.get('http://localhost:3000/therapist-details.html?id=vance', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('HTTP Status:', res.statusCode);
    console.log('Has therapist-engine.js:', data.includes('assets/js/therapist-engine.js'));
    console.log('Has therapistBannerTitle id:', data.includes('id="therapistBannerTitle"'));
    console.log('Has therapistProfileImg id:', data.includes('id="therapistProfileImg"'));
    console.log('Has therapistSubmitBtn id:', data.includes('id="therapistSubmitBtn"'));
    console.log('Has therapistBioContainer id:', data.includes('id="therapistBioContainer"'));
    console.log('Has therapistCredentialsContainer id:', data.includes('id="therapistCredentialsContainer"'));
  });
});
