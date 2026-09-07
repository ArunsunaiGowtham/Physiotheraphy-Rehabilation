const fs = require('fs');

const SPECIALISTS_MAP = {
  'sports-injury': {
    name: 'Dr. Marcus Vance',
    credentials: 'PT, DPT, SCS • Sports Clinical Specialist',
    bio: '10+ years directing elite return-to-sport protocols, kinetic chain deceleration, and ACL reconstruction rehabilitation for competitive athletes.',
    image: 'assets/images/therapist-vance.jpg',
    link: 'therapist-details.html?id=vance'
  },
  'post-surgery': {
    name: 'Dr. David Chen',
    credentials: 'PT, CMPT • Joint Arthroplasty & Manual Specialist',
    bio: '9+ years collaborating with orthopedic surgeons to deliver phase-based manual mobilization and scar tissue remodeling after total joint replacements.',
    image: 'assets/images/therapist-chen.jpg',
    link: 'therapist-details.html?id=chen'
  },
  'chronic-pain': {
    name: 'Dr. Chloe Bennett',
    credentials: 'PT, DPT, PRPC • Chronic Pain & Central Sensitization Specialist',
    bio: '11+ years pioneering non-opioid neuroplastic pain desensitization, graded motor imagery, and autonomic regulation for complex fibromyalgia.',
    image: 'assets/images/therapist-bennett.jpg',
    link: 'therapist-details.html?id=bennett'
  },
  'spine-neck': {
    name: 'Dr. Sarah Jenkins',
    credentials: 'PT, DPT, OCS • Orthopedic Clinical Specialist',
    bio: '12+ years specializing exclusively in spinal disc disorders, computerized mechanical decompression, and cervical postural realignment.',
    image: 'assets/images/therapist-jenkins.jpg',
    link: 'therapist-details.html?id=jenkins'
  },
  'joint-rehab': {
    name: 'Dr. Julian Reed',
    credentials: 'PT, DPT, RMSK • Musculoskeletal Ultrasound & Joint Lead',
    bio: '10+ years specializing in osteoarthritis joint preservation, cartilage protection loading, and ultrasound-guided manual therapy.',
    image: 'assets/images/therapist-reed.jpg',
    link: 'therapist-details.html?id=reed'
  },
  'muscle-mobility': {
    name: 'Dr. Liam Gallagher',
    credentials: 'PT, DPT, CSCS • Myofascial Release & Mobility Lead',
    bio: '8+ years integrating instrument-assisted soft tissue mobilization (IASTM), dry needling, and full-body rotational mobility patterns.',
    image: 'assets/images/therapist-gallagher.jpg',
    link: 'therapist-details.html?id=gallagher'
  },
  'neurological': {
    name: 'Dr. Elena Rostova',
    credentials: 'PT, NCS • Board-Certified Neurological Specialist',
    bio: '14+ years specializing in neuroplastic retraining, Parkinson\'s LSVT BIG therapy, multiple sclerosis mobility, and vestibular balance recovery.',
    image: 'assets/images/therapist-rostova.jpg',
    link: 'therapist-details.html?id=rostova'
  },
  'posture-correction': {
    name: 'Dr. Maya Patel',
    credentials: 'PT, DPT, CEAS • Ergonomic Assessment & Biomechanics Lead',
    bio: '9+ years diagnosing modern postural syndromes, forward-head desk posture, ergonomic workstation redesign, and scapular stabilization.',
    image: 'assets/images/therapist-patel.jpg',
    link: 'therapist-details.html?id=patel'
  },
  'senior-physio': {
    name: 'Dr. Robert Hayes',
    credentials: 'PT, DPT, GCS • Board-Certified Geriatric Specialist',
    bio: '15+ years specializing in senior fall prevention, proprioceptive balance conditioning, safe osteoporosis strengthening, and vital independent living.',
    image: 'assets/images/therapist-hayes.jpg',
    link: 'therapist-details.html?id=hayes'
  },
  'home-visit': {
    name: 'Dr. Hannah Al-Mansoor',
    credentials: 'PT, DPT • Mobile Physical Therapy & Home Care Director',
    bio: '9+ years bringing hospital-grade orthopedic and neuromuscular physical therapy directly into patients\' living rooms and private residences.',
    image: 'assets/images/therapist-almansoor.jpg',
    link: 'therapist-details.html?id=almansoor'
  },
  'pediatric-care': {
    name: 'Dr. Emily Watson',
    credentials: 'PT, DPT, PCS • Board-Certified Pediatric Specialist',
    bio: '11+ years helping infants, children, and adolescents overcome torticollis, gross motor delays, toe walking, and congenital movement disorders.',
    image: 'assets/images/therapist-watson.jpg',
    link: 'therapist-details.html?id=watson'
  },
  'aquatic-therapy': {
    name: 'Dr. Tyler Brooks',
    credentials: 'PT, DPT, ATRI-C • Certified Aquatic Rehabilitation Director',
    bio: '8+ years utilizing hydrostatic buoyancy, fluid thermal dynamics, and zero-gravity water rehabilitation for weight-bearing restricted patients.',
    image: 'assets/images/therapist-brooks.jpg',
    link: 'therapist-details.html?id=brooks'
  },
  'stroke-rehab': {
    name: 'Dr. Alexei Voronov',
    credentials: 'PT, DPT, CBIS • Certified Brain Injury & Stroke Fellow',
    bio: '12+ years directing acute and chronic post-stroke neuroplasticity, hemiparetic gait retraining, constraint-induced movement therapy, and functional balance.',
    image: 'assets/images/therapist-voronov.jpg',
    link: 'therapist-details.html?id=voronov'
  },
  'vestibular-rehab': {
    name: 'Dr. Sophie Laurent',
    credentials: 'PT, DPT, VRT • Vestibular Oculomotor & Balance Specialist',
    bio: '10+ years treating benign paroxysmal positional vertigo (BPPV), persistent dizziness, vestibular neuritis, and post-concussion visual tracking.',
    image: 'assets/images/therapist-laurent.jpg',
    link: 'therapist-details.html?id=laurent'
  },
  'postop-tendon': {
    name: 'Dr. James Sterling',
    credentials: 'PT, DPT, SCS, FAAOMPT • Tendon Reconstruction Fellow',
    bio: '13+ years guiding post-surgical tendon repairs (rotator cuff, Achilles, patellar tendon) through safe mechanical loading and tensile collagen alignment.',
    image: 'assets/images/therapist-sterling.jpg',
    link: 'therapist-details.html?id=sterling'
  },
  'runners-gait': {
    name: 'Dr. Nathan Cross',
    credentials: 'PT, DPT, CSCS • 3D Running Kinematics & Biomechanics Lead',
    bio: '9+ years analyzing force-plate foot strike patterns, cadence optimization, and customized gait retraining to eliminate shin splints and runner\'s knee.',
    image: 'assets/images/therapist-cross.jpg',
    link: 'therapist-details.html?id=cross'
  }
};

let content = fs.readFileSync('assets/js/service-engine.js', 'utf8');

for (const [key, spec] of Object.entries(SPECIALISTS_MAP)) {
  const serviceKeyIndex = content.indexOf(`'${key}': {`);
  if (serviceKeyIndex === -1) {
    console.warn(`Warning: Service key '${key}' not found in service-engine.js`);
    continue;
  }

  // Look up to 10,000 chars ahead from serviceKeyIndex
  const searchSlice = content.slice(serviceKeyIndex, serviceKeyIndex + 10000);
  const specStart = searchSlice.indexOf('specialist: {');
  if (specStart === -1) {
    console.warn(`Warning: specialist: { not found for '${key}'`);
    continue;
  }

  // Find the end of this specialist object: `      },`
  const specEnd = searchSlice.indexOf('},', specStart);
  if (specEnd === -1) {
    console.warn(`Warning: specialist end not found for '${key}'`);
    continue;
  }

  const oldBlock = searchSlice.slice(specStart, specEnd + 2);
  const newBlock = `specialist: {
        name: '${spec.name}',
        credentials: '${spec.credentials}',
        bio: '${spec.bio.replace(/'/g, "\\'")}',
        image: '${spec.image}',
        link: '${spec.link}'
      },`;

  const actualIndex = serviceKeyIndex + specStart;
  content = content.slice(0, actualIndex) + newBlock + content.slice(actualIndex + oldBlock.length);
  console.log(`Updated specialist for [${key}] -> ${spec.name} (${spec.link})`);
}

fs.writeFileSync('assets/js/service-engine.js', content, 'utf8');
console.log('Successfully updated assets/js/service-engine.js');
