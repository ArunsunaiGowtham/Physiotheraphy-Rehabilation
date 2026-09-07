const fs = require('fs');

const AUTHORS_MAP = {
  'sports-injury': { id: 'vance', name: 'Dr. Marcus Vance' },
  'post-surgery': { id: 'chen', name: 'Dr. David Chen' },
  'chronic-pain': { id: 'bennett', name: 'Dr. Chloe Bennett' },
  'spine-neck': { id: 'jenkins', name: 'Dr. Sarah Jenkins' },
  'joint-rehab': { id: 'reed', name: 'Dr. Julian Reed' },
  'muscle-mobility': { id: 'gallagher', name: 'Dr. Liam Gallagher' },
  'neurological': { id: 'rostova', name: 'Dr. Elena Rostova' },
  'senior-physio': { id: 'hayes', name: 'Dr. Robert Hayes' },
  'home-visit': { id: 'almansoor', name: 'Dr. Hannah Al-Mansoor' },
  'pediatric-care': { id: 'watson', name: 'Dr. Emily Watson' },
  'aquatic-therapy': { id: 'brooks', name: 'Dr. Tyler Brooks' },
  'stroke-rehab': { id: 'voronov', name: 'Dr. Alexei Voronov' },
  'vestibular-rehab': { id: 'laurent', name: 'Dr. Sophie Laurent' },
  'postop-tendon': { id: 'sterling', name: 'Dr. James Sterling' },
  'runners-gait': { id: 'cross', name: 'Dr. Nathan Cross' }
};

let html = fs.readFileSync('services.html', 'utf8');

for (const [serviceSlug, author] of Object.entries(AUTHORS_MAP)) {
  // Find <a href="service-details.html?service=SLUG" class="service-link">Learn More <i class="fas fa-arrow-right"></i></a>
  const targetRegex = new RegExp(`<a href="service-details\\.html\\?service=${serviceSlug}" class="service-link">Learn More <i class="fas fa-arrow-right"><\\/i><\\/a>`);
  
  if (!targetRegex.test(html)) {
    console.error(`Target link not found for: ${serviceSlug}`);
    continue;
  }

  const replacement = `<div class="service-author-footer d-flex align-items-center justify-content-between pt-3 mt-auto border-top border-subtle">
              <a href="therapist-details.html?id=${author.id}" class="d-flex align-items-center gap-2 text-decoration-none text-main" title="View Doctor Profile">
                <img src="assets/images/therapist-${author.id}.jpg" alt="${author.name}" class="rounded-circle object-fit-cover" width="28" height="28">
                <span class="small fw-semibold">${author.name}</span>
              </a>
              <a href="service-details.html?service=${serviceSlug}" class="service-link m-0">Learn More <i class="fas fa-arrow-right"></i></a>
            </div>`;

  html = html.replace(targetRegex, replacement);
  console.log(`Updated card for [${serviceSlug}] with Author: ${author.name}`);
}

fs.writeFileSync('services.html', html, 'utf8');
console.log('services.html updated successfully.');
