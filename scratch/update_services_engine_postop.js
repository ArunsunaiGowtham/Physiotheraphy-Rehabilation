const fs = require('fs');

let content = fs.readFileSync('assets/js/service-engine.js', 'utf8');

const postopTendonCode = `    'postop-tendon': {
      id: 'postop-tendon',
      slug: 'postop-tendon',
      badgeTag: 'Post-Operative Orthopedic Protocol',
      category: 'postop',
      metaDescription: 'Specialized post-surgical tendon and ligament recovery at PhysioLife. Structured protocol for rotator cuff repairs, ACL reconstructions, Achilles repairs, and surgical anchor protection.',
      title: 'Post-Surgical Tendon & Ligament Recovery',
      subtitle: 'Phase-gated passive-to-active protocols protecting surgical repairs, restoring joint biomechanics, and rebuilding tensile load capacity.',
      heroImage: 'assets/images/service-postop-shoulder.jpg',
      heroImg: 'assets/images/service-postop-shoulder.jpg',
      heroAlt: 'Physical therapist conducting post-surgical shoulder rotator cuff passive mobilization',
      overview: [
        'Orthopedic tendon and ligament reconstructions require a meticulous biological healing timeline. Unlike muscle tissue which has abundant blood supply, repaired tendons and reconstructed ligaments rely on gradual collagen maturation and anchor fixation to withstand tensile stress without re-tearing.',
        'Our board-certified orthopedic physical therapists utilize evidence-based criteria—not just elapsed weeks—to advance patients through phase-gated milestones. We emphasize early protected passive motion, scapulothoracic kinematics, controlled isometric activation, and progressive kinetic loading to restore full painless function while safeguarding your surgical repair.'
      ],
      symptoms: [
        'Rotator Cuff Repair (Supraspinatus, Infraspinatus & Subscapularis)',
        'Anterior Cruciate Ligament (ACL) Reconstruction & Meniscal Repair',
        'Shoulder Labral Repair (SLAP & Bankart Stabilization)',
        'Achilles Tendon Repair & Post-Surgical Cast Weaning',
        'Biceps Tenodesis & Subpectoral Fixation Recovery',
        'Patellar & Quadriceps Tendon Surgical Re-Attachment'
      ],
      modalityImage: 'assets/images/service-postop-shoulder.jpg',
      modalitiesImg: 'assets/images/service-postop-shoulder.jpg',
      modalityAlt: 'Post-operative tendon physical therapy and passive range of motion',
      modalities: [
        {
          icon: 'fas fa-hands',
          title: 'Passive Range-of-Motion & Joint Centration',
          color: 'text-primary',
          desc: 'Strict therapist-guided passive motion in the scapular plane to prevent arthrofibrosis without activating surgically repaired tendons.'
        },
        {
          icon: 'fas fa-dumbbell',
          title: 'Submaximal Isometric & Scapular Stabilization',
          color: 'text-secondary',
          desc: 'Pain-free isometric contractions and periscapular kinetic chain drills that preserve neuromuscular firing without graft strain.'
        },
        {
          icon: 'fas fa-snowflake',
          title: 'Cryocompression & Surgical Scar Mobilization',
          color: 'text-info',
          desc: 'Cyclical pneumatic cold compression and cross-fiber scar release to diminish joint effusions and prevent subcutaneous adhesions.'
        }
      ],
      packages: [
        {
          name: 'Surgical Protection Phase',
          sessions: '6 Sessions (3 Weeks)',
          features: 'Sling/brace weaning guidance, gentle passive mobilization, edema control, cryo-compression, home safety protocol',
          price: '$560'
        },
        {
          name: 'Active-Assisted Restoration (Recommended)',
          sessions: '12 Sessions (6 Weeks)',
          features: 'AAROM progression, rotator cuff neuromuscular re-education, resistance band loading, weekly goniometric tracking',
          price: '$1,040'
        },
        {
          name: 'Advanced Kinetic Return-to-Activity',
          sessions: '18 Sessions (9 Weeks)',
          features: 'Dynamic plyometric loading, rotational strength indexing, sport or occupational task training, 6-month surgical audit',
          price: '$1,490'
        }
      ],
      faqs: [
        {
          question: 'Why must I wear my sling or brace even when resting?',
          answer: 'During the initial 4 to 6 weeks, repaired tendons are held solely by surgical sutures and bone anchors. Wearing your prescribed brace maintains an unweighted position, preventing premature tendon stretching or anchor pullout.'
        },
        {
          question: 'When can I start active lifting after a rotator cuff or ACL repair?',
          answer: 'Active unassisted movement begins only after adequate biological healing (typically week 6 for shoulders, week 4-6 for ACLs) under strict therapist supervision to ensure optimal scapular mechanics and graft safety.'
        },
        {
          question: 'How do you know when it is safe to progress to the next phase?',
          answer: 'We use objective clinical criteria including pain-free passive range benchmarks, minimal resting effusion, and stable motor recruitment rather than arbitrary calendar dates alone.'
        }
      ],
      specialist: {
        name: 'Dr. David Chen',
        credentials: 'PT, CMPT • Joint Arthroplasty & Post-Surgical Specialist',
        bio: '9+ years specializing in post-surgical joint replacement rehabilitation, complex rotator cuff reconstructions, and orthopedic manual therapy.',
        image: 'assets/images/therapist-chen.jpg',
        link: 'therapist-details.html?id=chen'
      },
      relatedTherapies: [
        { name: 'Post-Surgery Rehabilitation', id: 'post-surgery' },
        { name: 'Aquatic & Hydrotherapy Rehabilitation', id: 'aquatic-therapy' },
        { name: 'Sports Injury Rehabilitation', id: 'sports-injury' },
        { name: 'Joint Rehabilitation', id: 'joint-rehab' }
      ],
      relatedArticles: [
        {
          slug: 'post-op-rotator-cuff-arthroscopy-rehab',
          title: 'Post-Op Rotator Cuff Repair: Phase-by-Phase Shoulder Arthroscopy Protocol',
          readTime: '8 min read',
          badge: 'Surgical Protocol'
        },
        {
          slug: 'total-knee-arthroplasty-rehab',
          title: 'Total Knee Replacement: 12-Week Range of Motion & Gait Roadmap',
          readTime: '7 min read',
          badge: 'Post-Op Roadmap'
        },
        {
          slug: 'rotator-cuff-tears-surgery-vs-therapy',
          title: 'Rotator Cuff Tears: Surgery vs Conservative Physical Therapy',
          readTime: '6 min read',
          badge: 'Clinical Evidence'
        }
      ]
    },
`;

// Insert before the closing of SERVICES_DATA
const closingTarget = '\n  };\n\n  // =========================================================================\n  // 2. Query Parameter Parser & Alias Normalization';
if (!content.includes(closingTarget)) {
  console.error('Could not find SERVICES_DATA closingTarget!');
  process.exit(1);
}

content = content.replace(closingTarget, '\n' + postopTendonCode + closingTarget);

// Add aliases to aliasMap
const aliasAnchor = "      'balance': 'vestibular-rehab'\n    };";
const newAliases = `      'balance': 'vestibular-rehab',
      'postop-tendon': 'postop-tendon',
      'post-op-tendon': 'postop-tendon',
      'tendon': 'postop-tendon',
      'tendon-repair': 'postop-tendon',
      'rotator-cuff': 'postop-tendon',
      'rotator-cuff-repair': 'postop-tendon',
      'ligament': 'postop-tendon',
      'ligament-reconstruction': 'postop-tendon'
    };`;

if (!content.includes(aliasAnchor)) {
  console.error('Could not find aliasAnchor in content!');
  process.exit(1);
}

content = content.replace(aliasAnchor, newAliases);

fs.writeFileSync('assets/js/service-engine.js', content, 'utf8');
console.log('Successfully updated assets/js/service-engine.js with postop-tendon and aliases!');
