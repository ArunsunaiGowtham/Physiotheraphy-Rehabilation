const fs = require('fs');

let html = fs.readFileSync('therapist-details.html', 'utf8');

// 1. Breadcrumb & banner
html = html.replace(
  '<li class="breadcrumb-item active" aria-current="page">Dr. Sarah Jenkins</li>',
  '<li class="breadcrumb-item active" aria-current="page" id="therapistBreadcrumb">Dr. Sarah Jenkins</li>'
);

html = html.replace(
  '<h1 class="display-5 fw-bold mb-2">Dr. Sarah Jenkins, PT, DPT, OCS</h1>',
  '<h1 class="display-5 fw-bold mb-2" id="therapistBannerTitle">Dr. Sarah Jenkins, PT, DPT, OCS</h1>'
);

html = html.replace(
  '<p class="lead text-muted mb-0">Board-Certified Orthopedic Clinical Specialist &amp; Clinical Director</p>',
  '<p class="lead text-muted mb-0" id="therapistBannerSubtitle">Board-Certified Orthopedic Clinical Specialist &amp; Clinical Director</p>'
);

// 2. Sidebar profile
html = html.replace(
  '<img src="assets/images/therapist-jenkins.jpg" alt="Dr. Sarah Jenkins - Board-Certified Physical Therapist" class="rounded-4 mb-4 w-100 shadow-sm object-fit-cover" style="max-height: 380px;">',
  '<img id="therapistProfileImg" src="assets/images/therapist-jenkins.jpg" alt="Dr. Sarah Jenkins - Board-Certified Physical Therapist" class="rounded-4 mb-4 w-100 shadow-sm object-fit-cover" style="max-height: 380px;">'
);

html = html.replace(
  '<h4 class="fw-bold mb-1">Dr. Sarah Jenkins</h4>',
  '<h4 class="fw-bold mb-1" id="therapistSidebarName">Dr. Sarah Jenkins</h4>'
);

html = html.replace(
  '<p class="text-primary fw-bold mb-3">Orthopedic &amp; Spine Lead</p>',
  '<p class="text-primary fw-bold mb-3" id="therapistSidebarSpecialty">Orthopedic &amp; Spine Lead</p>'
);

// 3. Sidebar stats
html = html.replace(
  '<span class="fw-semibold">Doctor of Physical Therapy</span>',
  '<span class="fw-semibold" id="therapistDegree">Doctor of Physical Therapy</span>'
);

html = html.replace(
  '<span class="fw-semibold">Spine &amp; Sciatica (OCS)</span>',
  '<span class="fw-semibold" id="therapistSpecialtyTag">Spine &amp; Sciatica (OCS)</span>'
);

html = html.replace(
  '<span class="fw-semibold">12+ Years Clinical</span>',
  '<span class="fw-semibold" id="therapistExperience">12+ Years Clinical</span>'
);

html = html.replace(
  '<span class="fw-semibold">4.9 / 5.0 (340 Reviews)</span>',
  '<span class="fw-semibold" id="therapistRating">4.9 / 5.0 (340 Reviews)</span>'
);

html = html.replace(
  '<span class="fw-semibold">English, Spanish</span>',
  '<span class="fw-semibold" id="therapistLanguages">English, Spanish</span>'
);

// 4. Hours
html = html.replace(
  '<span class="fw-semibold">7:30 AM – 3:30 PM</span>',
  '<span class="fw-semibold" id="therapistHoursMonWed">7:30 AM – 3:30 PM</span>'
);

html = html.replace(
  '<span class="fw-semibold">11:00 AM – 7:00 PM</span>',
  '<span class="fw-semibold" id="therapistHoursThuFri">11:00 AM – 7:00 PM</span>'
);

html = html.replace(
  '<span class="fw-semibold text-primary">By Appointment Only</span>',
  '<span class="fw-semibold text-primary" id="therapistHoursSat">By Appointment Only</span>'
);

// 5. Main Hero Img
html = html.replace(
  '<img src="assets/images/therapist-consult-jenkins.jpg" alt="Dr. Sarah Jenkins consulting with a patient in clinical private evaluation suite" class="w-100 object-fit-cover" style="max-height: 300px;">',
  '<img id="therapistHeroImg" src="assets/images/therapist-consult-jenkins.jpg" alt="Dr. Sarah Jenkins consulting with a patient in clinical private evaluation suite" class="w-100 object-fit-cover" style="max-height: 300px;">'
);

// 6. Bio Title & Container
html = html.replace(
  '<h2 class="h2 mb-3">Biography &amp; Clinical Philosophy</h2>',
  '<h2 class="h2 mb-3" id="therapistBioTitle">Biography &amp; Clinical Philosophy</h2>'
);

const bioOld = `            <p>
              Dr. Sarah Jenkins received her Doctorate in Physical Therapy (DPT) from Columbia University College of Physicians and Surgeons with highest clinical honors. She subsequently completed a rigorous 2-year clinical residency in Orthopedic Physical Therapy, earning her prestigious Board Certification as an Orthopedic Clinical Specialist (OCS).
            </p>
            <p>
              Dr. Jenkins believes in empowering patients through mechanical education: "When patients understand the anatomical mechanism of their disc or facet irritation, recovery shifts from passive waiting to proactive rehabilitation." Over her 12-year tenure, she has successfully guided more than 4,200 patients out of chronic lumbar and cervical pain.
            </p>`;

const bioNew = `            <div id="therapistBioContainer">
              <p>
                Dr. Sarah Jenkins received her Doctorate in Physical Therapy (DPT) from Columbia University College of Physicians and Surgeons with highest clinical honors. She subsequently completed a rigorous 2-year clinical residency in Orthopedic Physical Therapy, earning her prestigious Board Certification as an Orthopedic Clinical Specialist (OCS).
              </p>
              <p>
                Dr. Jenkins believes in empowering patients through mechanical education: "When patients understand the anatomical mechanism of their disc or facet irritation, recovery shifts from passive waiting to proactive rehabilitation." Over her 12-year tenure, she has successfully guided more than 4,200 patients out of chronic lumbar and cervical pain.
              </p>
            </div>`;

html = html.replace(bioOld, bioNew);

// 7. Credentials Container
html = html.replace(
  '<div class="row g-3">',
  '<div class="row g-3" id="therapistCredentialsContainer">'
);

// 8. Booking Form Header
html = html.replace(
  '<h3 class="h3 mb-3"><i class="fas fa-calendar-check text-primary me-2"></i> Request Appointment with Dr. Sarah Jenkins</h3>',
  '<h3 class="h3 mb-3" id="therapistBookingHeader"><i class="fas fa-calendar-check text-primary me-2"></i> Request Appointment with Dr. Sarah Jenkins</h3>'
);

html = html.replace(
  '<p class="text-muted small mb-4">Complete this form to reserve an evaluation block directly with Dr. Jenkins.</p>',
  '<p class="text-muted small mb-4" id="therapistBookingSubtitle">Complete this form to reserve an evaluation block directly with Dr. Jenkins.</p>'
);

html = html.replace(
  '<div class="alert alert-success d-none form-success-alert mb-4">',
  '<div class="alert alert-success d-none form-success-alert mb-4" id="therapistFormAlert">'
);

// 9. Include therapist-engine.js before </body>
if (!html.includes('therapist-engine.js')) {
  html = html.replace(
    '  <script src="assets/js/main.js"></script>',
    '  <script src="assets/js/main.js"></script>\n  <script src="assets/js/therapist-engine.js"></script>'
  );
}

fs.writeFileSync('therapist-details.html', html, 'utf8');
console.log('Successfully updated therapist-details.html with IDs and therapist-engine.js!');
