const fs = require('fs');
const path = require('path');

const enginePath = path.join(__dirname, '..', 'assets', 'js', 'blog-engine.js');
let code = fs.readFileSync(enginePath, 'utf8');

// 1. Fix plantar-fasciitis-shockwave-therapy image
code = code.replace(
  `slug: 'plantar-fasciitis-shockwave-therapy',\n      title: 'Plantar Fasciitis: Heel Pain Biomechanics & Extracorporeal Shockwave Therapy',\n      category: 'Pain Relief',\n      categorySlug: 'pain-relief',\n      badge: 'Pain Relief',\n      description: 'Understanding windlass mechanism strain, calcaneal spurs, and how radial shockwave therapy triggers neovascularization to resolve chronic morning heel stiffness.',\n      image: 'assets/images/exercise-bridge.jpg',`,
  `slug: 'plantar-fasciitis-shockwave-therapy',\n      title: 'Plantar Fasciitis: Heel Pain Biomechanics & Extracorporeal Shockwave Therapy',\n      category: 'Pain Relief',\n      categorySlug: 'pain-relief',\n      badge: 'Pain Relief',\n      description: 'Understanding windlass mechanism strain, calcaneal spurs, and how radial shockwave therapy triggers neovascularization to resolve chronic morning heel stiffness.',\n      image: 'assets/images/blog-plantar-fasciitis.jpg',`
);

// 2. Fix total-knee-arthroplasty-rehab image to dedicated post-op knee photo
code = code.replace(
  `slug: 'total-knee-arthroplasty-rehab',\n      title: 'Total Knee Replacement: 12-Week Range of Motion & Gait Roadmap',\n      category: 'Post-Op Rehab',\n      categorySlug: 'post-op-rehab',\n      badge: 'Post-Op Rehab',\n      description: 'Step-by-step milestones to achieve 120-degree knee flexion, full terminal extension, and reciprocal stair climbing following joint replacement.',\n      image: 'assets/images/service-postop.jpg',`,
  `slug: 'total-knee-arthroplasty-rehab',\n      title: 'Total Knee Replacement: 12-Week Range of Motion & Gait Roadmap',\n      category: 'Post-Op Rehab',\n      categorySlug: 'post-op-rehab',\n      badge: 'Post-Op Rehab',\n      description: 'Step-by-step milestones to achieve 120-degree knee flexion, full terminal extension, and reciprocal stair climbing following joint replacement.',\n      image: 'assets/images/postop-knee-rehab.jpg',`
);

// 3. Fix tmj-dysfunction-jaw-therapy image to dedicated TMJ photo
code = code.replace(
  `slug: 'tmj-dysfunction-jaw-therapy',\n      title: 'TMJ Disorders: Masseter Release, Pterygoid Gliding & Cervical Alignment',\n      category: 'Pain Relief',\n      categorySlug: 'pain-relief',\n      badge: 'Pain Relief',\n      description: 'Targeted intraoral manual therapy, mandibular stabilization, and cervical posture corrections for temporomandibular joint clicking and clenching pain.',\n      image: 'assets/images/step-assessment.jpg',`,
  `slug: 'tmj-dysfunction-jaw-therapy',\n      title: 'TMJ Disorders: Masseter Release, Pterygoid Gliding & Cervical Alignment',\n      category: 'Pain Relief',\n      categorySlug: 'pain-relief',\n      badge: 'Pain Relief',\n      description: 'Targeted intraoral manual therapy, mandibular stabilization, and cervical posture corrections for temporomandibular joint clicking and clenching pain.',\n      image: 'assets/images/blog-tmj-therapy.jpg',`
);

// 4. Add the second Post-Op Rehab article right after total-knee-arthroplasty-rehab
const targetPostop = `slug: 'total-knee-arthroplasty-rehab',`;
if (!code.includes(targetPostop)) {
  console.error('Could not find total-knee-arthroplasty-rehab in blog-engine.js!');
  process.exit(1);
}

const secondPostopArticle = `
    {
      id: 'postop-shoulder-arthroscopy',
      slug: 'post-op-rotator-cuff-arthroscopy-rehab',
      title: 'Post-Op Rotator Cuff Repair: Phase-by-Phase Shoulder Arthroscopy Protocol',
      category: 'Post-Op Rehab',
      categorySlug: 'post-op-rehab',
      badge: 'Post-Op Rehab',
      description: 'Passive pendulum exercises, subscapularis tendon healing timelines, and safe active-assisted pulley progression following arthroscopic rotator cuff repair.',
      image: 'assets/images/postop-shoulder-rehab.jpg',
      author: 'Dr. Marcus Vance',
      authorRole: 'Head of Sports Rehabilitation & Kinetic Performance',
      authorImg: 'assets/images/therapist-vance.jpg',
      date: 'Aug 19, 2026',
      readingTime: '7 min read',
      tags: 'rotator cuff surgery post op rehab arthroscopy shoulder pulley passive range repair',
      relatedSlugs: ['total-knee-arthroplasty-rehab', 'rotator-cuff-tears-surgery-vs-therapy', 'throwers-shoulder-scapular-dyskinesis'],
      content: \`
        <p class="lead text-main">Following arthroscopic rotator cuff repair or subacromial decompression, balancing biological tendon-to-bone healing with early prevention of glenohumeral arthrofibrosis is the cornerstone of successful physical rehabilitation.</p>
        <p>In Phase 1 (Weeks 0 to 6), active supraspinatus contraction is contraindicated to protect suture anchor integrity. Physical therapy focuses on passive range of motion (PROM), Codman pendulum swings, and gentle periscapular stabilization.</p>
        <h3 class="h3 mt-4 mb-3">Phase 2: Active-Assisted Range of Motion (AAROM)</h3>
        <p>Between Weeks 6 and 10, overhead rope-and-pulley systems and wand exercises safely introduce active-assisted mobility, restoring full forward flexion and external rotation before resistance loading begins.</p>
      \`
    },`;

// Find where total-knee-arthroplasty-rehab ends and insert secondPostopArticle
const kneeEnd = code.indexOf(`slug: 'total-knee-arthroplasty-rehab'`);
const nextClosingBrace = code.indexOf('    },', kneeEnd);
if (nextClosingBrace !== -1) {
  code = code.slice(0, nextClosingBrace + 6) + secondPostopArticle + code.slice(nextClosingBrace + 6);
}

fs.writeFileSync(enginePath, code, 'utf8');
console.log('Successfully updated blog-engine.js with dedicated Post-Op Rehab images and second article!');
