const fs = require('fs');

// 1. Update therapists.html
let therapistsHtml = fs.readFileSync('therapists.html', 'utf8');

// Replace Jenkins
therapistsHtml = therapistsHtml.replace(
  '<h4 class="therapist-name"><a href="therapist-details.html">Dr. Sarah Jenkins</a></h4>',
  '<h4 class="therapist-name"><a href="therapist-details.html?id=jenkins">Dr. Sarah Jenkins</a></h4>'
);
// Replace Vance
therapistsHtml = therapistsHtml.replace(
  '<h4 class="therapist-name"><a href="therapist-details.html">Dr. Marcus Vance</a></h4>',
  '<h4 class="therapist-name"><a href="therapist-details.html?id=vance">Dr. Marcus Vance</a></h4>'
);
// Replace Rostova
therapistsHtml = therapistsHtml.replace(
  '<h4 class="therapist-name"><a href="therapist-details.html">Dr. Elena Rostova</a></h4>',
  '<h4 class="therapist-name"><a href="therapist-details.html?id=rostova">Dr. Elena Rostova</a></h4>'
);
// Replace Chen
therapistsHtml = therapistsHtml.replace(
  '<h4 class="therapist-name"><a href="therapist-details.html">Dr. David Chen</a></h4>',
  '<h4 class="therapist-name"><a href="therapist-details.html?id=chen">Dr. David Chen</a></h4>'
);

// Replace the 4 View Profile buttons in order
const buttonOld = '<a href="therapist-details.html" class="btn btn-sm btn-primary ms-auto">View Profile</a>';
const doctorIds = ['jenkins', 'vance', 'rostova', 'chen'];
doctorIds.forEach(id => {
  therapistsHtml = therapistsHtml.replace(
    buttonOld,
    `<a href="therapist-details.html?id=${id}" class="btn btn-sm btn-primary ms-auto">View Profile</a>`
  );
});

fs.writeFileSync('therapists.html', therapistsHtml, 'utf8');
console.log('Successfully updated therapists.html with matching ?id= links!');

// 2. Update index.html
let indexHtml = fs.readFileSync('index.html', 'utf8');

indexHtml = indexHtml.replace(
  '<h4 class="therapist-name"><a href="therapist-details.html">Dr. Sarah Jenkins</a></h4>',
  '<h4 class="therapist-name"><a href="therapist-details.html?id=jenkins">Dr. Sarah Jenkins</a></h4>'
);
indexHtml = indexHtml.replace(
  '<h4 class="therapist-name"><a href="therapist-details.html">Dr. Marcus Vance</a></h4>',
  '<h4 class="therapist-name"><a href="therapist-details.html?id=vance">Dr. Marcus Vance</a></h4>'
);
indexHtml = indexHtml.replace(
  '<h4 class="therapist-name"><a href="therapist-details.html">Dr. Elena Rostova</a></h4>',
  '<h4 class="therapist-name"><a href="therapist-details.html?id=rostova">Dr. Elena Rostova</a></h4>'
);
indexHtml = indexHtml.replace(
  '<h4 class="therapist-name"><a href="therapist-details.html">Dr. David Chen</a></h4>',
  '<h4 class="therapist-name"><a href="therapist-details.html?id=chen">Dr. David Chen</a></h4>'
);

const indexButtonOld = '<a href="therapist-details.html" class="btn btn-sm btn-outline-primary ms-auto">Book</a>';
doctorIds.forEach(id => {
  indexHtml = indexHtml.replace(
    indexButtonOld,
    `<a href="therapist-details.html?id=${id}" class="btn btn-sm btn-outline-primary ms-auto">Book</a>`
  );
});

fs.writeFileSync('index.html', indexHtml, 'utf8');
console.log('Successfully updated index.html with matching ?id= links!');
