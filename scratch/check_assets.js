const fs = require('fs');

const therapistsHtml = fs.readFileSync('therapists.html', 'utf8');
const therapistCards = therapistsHtml.match(/<h[3-5][^>]*>Dr\.[^<]+<\/h[3-5]>/g) || [];
console.log('Therapists:', therapistCards);

const imgs = fs.readdirSync('assets/images').filter(f => f.includes('service') || f.includes('therapist'));
console.log('Images:', imgs);
