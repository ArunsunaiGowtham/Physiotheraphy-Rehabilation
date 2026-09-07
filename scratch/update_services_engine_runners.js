const fs = require('fs');

let content = fs.readFileSync('assets/js/service-engine.js', 'utf8');

const runnersGaitCode = `    'runners-gait': {
      id: 'runners-gait',
      slug: 'runners-gait',
      badgeTag: 'Sports Biomechanics & Running Analysis',
      category: 'sports',
      metaDescription: 'Specialized running injury rehabilitation and computerized 3D gait analysis at PhysioLife. High-speed video kinematics, cadence retraining, and kinetic chain conditioning for runners.',
      title: 'Runner\\'s Injury & 3D Gait Analysis',
      subtitle: 'High-speed digital video motion analysis, kinetic stride retraining, and personalized recovery for endurance runners and athletes.',
      heroImage: 'assets/images/service-runners-gait.jpg',
      heroImg: 'assets/images/service-runners-gait.jpg',
      heroAlt: 'Computerized 3D running gait analysis and biomechanical assessment in sports medicine clinic',
      overview: [
        'Over 65% of runners and endurance athletes suffer repetitive overuse injuries each year, largely precipitated by subtle kinetic breakdown, overstriding, asymmetric foot-strike impact, or gluteal inhibition. At PhysioLife, our Sports Biomechanics Lab integrates high-speed digital motion cameras, infrared reflective joint tracking, and computerized ground force measurement.',
        'Rather than treating symptoms with passive rest alone, our sports physical therapists analyze your complete running gait cycle from initial contact to toe-off. We prescribe real-time metronome cadence retraining, eccentric posterior chain loading, shoe prescription optimization, and video biofeedback so you can run faster, pain-free, and injury-resilient.'
      ],
      symptoms: [
        'Patellofemoral Pain Syndrome (Runner\\'s Knee)',
        'Iliotibial (IT) Band Friction Syndrome & Lateral Knee Pain',
        'Medial Tibial Stress Syndrome (Shin Splints)',
        'Insertional & Midportion Achilles Tendinopathy',
        'Plantar Fasciitis & Calcaneal Heel Pain with Running',
        'Gluteal Amnesia, Pelvic Drop (Trendelenburg) & Overstriding'
      ],
      modalityImage: 'assets/images/service-runners-gait.jpg',
      modalitiesImg: 'assets/images/service-runners-gait.jpg',
      modalityAlt: '3D running gait analysis and biomechanical motion capture',
      modalities: [
        {
          icon: 'fas fa-video',
          title: 'High-Speed 3D Video Kinematics & Biofeedback',
          color: 'text-primary',
          desc: 'Multi-angle synchronized digital video capturing joint angles at 240fps to pinpoint overstriding, excessive pelvic drop, and medial knee collapse.'
        },
        {
          icon: 'fas fa-stopwatch',
          title: 'Real-Time Cadence & Stride Frequency Retraining',
          color: 'text-secondary',
          desc: 'Acoustic metronome drills increasing cadence by 5-10% to reduce peak ground reaction impact forces and patellofemoral joint loading.'
        },
        {
          icon: 'fas fa-dumbbell',
          title: 'Eccentric Kinetic Chain & Plyometric Loading',
          color: 'text-info',
          desc: 'Targeted eccentric calf, soleus, hamstring, and hip abductor conditioning with elastic energy return drills.'
        }
      ],
      packages: [
        {
          name: 'Comprehensive Runner\\'s Assessment',
          sessions: '3 Sessions (1-2 Weeks)',
          features: 'Full 3D video gait capture, digital joint angle report, footwear analysis, initial cadence correction protocol',
          price: '$340'
        },
        {
          name: 'Gait Retraining & Injury Resolution (Recommended)',
          sessions: '8 Sessions (4 Weeks)',
          features: 'Treadmill biofeedback retraining, eccentric kinetic loading, dry needling for tight calves/IT band, personalized mileage builder',
          price: '$780'
        },
        {
          name: 'Marathon & Endurance Performance Continuum',
          sessions: '14 Sessions (7 Weeks)',
          features: 'Race-specific pacing simulation, force-plate symmetry audits, periodized strength plan, pre-race taper consult',
          price: '$1,250'
        }
      ],
      faqs: [
        {
          question: 'How does changing my cadence help eliminate runner\\'s knee and shin splints?',
          answer: 'Clinical biomechanics research shows that increasing running cadence by just 5% to 7.5% brings your foot strike closer under your center of mass, decreasing peak braking forces and reducing patellofemoral stress by up to 20%.'
        },
        {
          question: 'What should I bring to my running gait evaluation?',
          answer: 'Please bring your current running shoes (and any orthotics), athletic shorts or running tights that allow clear visibility of your knees, and a fitted running top so tracking markers can be accurately positioned.'
        },
        {
          question: 'Do I need to be an elite marathon runner to benefit from this?',
          answer: 'Not at all! We work with all levels—from 5K beginners experiencing their first bout of shin splints to seasoned ultra-marathoners seeking marginal performance gains and injury longevity.'
        }
      ],
      specialist: {
        name: 'Dr. Marcus Vance',
        credentials: 'PT, DPT, SCS • Sports Clinical Specialist',
        bio: '10+ years working with collegiate and professional athletes, specializing in ACL reconstruction return-to-sport protocols and overhead thrower biomechanics.',
        image: 'assets/images/therapist-vance.jpg',
        link: 'therapist-details.html?id=vance'
      },
      relatedTherapies: [
        { name: 'Sports Injury Rehabilitation', id: 'sports-injury' },
        { name: 'Muscle & Mobility Therapy', id: 'muscle-mobility' },
        { name: 'Joint Rehabilitation', id: 'joint-rehab' },
        { name: 'Aquatic & Hydrotherapy Rehabilitation', id: 'aquatic-therapy' }
      ],
      relatedArticles: [
        {
          slug: 'plantar-fasciitis-shockwave-therapy',
          title: 'Plantar Fasciitis: Heel Pain Biomechanics & Extracorporeal Shockwave Therapy',
          readTime: '6 min read',
          badge: 'Modalities'
        },
        {
          slug: 'nerve-flossing-techniques',
          title: 'Nerve Flossing Techniques: Alleviating Peripheral Sciatic Tension',
          readTime: '5 min read',
          badge: 'Neurodynamics'
        },
        {
          slug: 'total-knee-arthroplasty-rehab',
          title: 'Total Knee Replacement: 12-Week Range of Motion & Gait Roadmap',
          readTime: '7 min read',
          badge: 'Post-Op Roadmap'
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

content = content.replace(closingTarget, '\n' + runnersGaitCode + closingTarget);

// Add aliases to aliasMap
const aliasAnchor = "      'ligament-reconstruction': 'postop-tendon'\n    };";
const newAliases = `      'ligament-reconstruction': 'postop-tendon',
      'runners-gait': 'runners-gait',
      'runners-clinic': 'runners-gait',
      'running': 'runners-gait',
      'gait-analysis': 'runners-gait',
      'runners-knee': 'runners-gait',
      'running-injury': 'runners-gait'
    };`;

if (!content.includes(aliasAnchor)) {
  console.error('Could not find aliasAnchor in content!');
  process.exit(1);
}

content = content.replace(aliasAnchor, newAliases);

fs.writeFileSync('assets/js/service-engine.js', content, 'utf8');
console.log('Successfully updated assets/js/service-engine.js with runners-gait and aliases!');
