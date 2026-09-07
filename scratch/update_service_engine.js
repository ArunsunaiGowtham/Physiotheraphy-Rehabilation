const fs = require('fs');
const path = require('path');

const enginePath = path.join(__dirname, '..', 'assets', 'js', 'service-engine.js');
let code = fs.readFileSync(enginePath, 'utf-8');

// Check if already added
if (code.includes("'pediatric-care':")) {
  console.log('service-engine.js already contains pediatric-care!');
  process.exit(0);
}

const newServicesCode = `    'pediatric-care': {
      title: 'Pediatric Physical Therapy & Development',
      badgeTag: 'Pediatric Rehabilitation Specialization',
      subtitle: 'Gentle developmental motor retraining, congenital condition therapy, and pediatric coordination programs.',
      heroImg: 'assets/images/service-pediatric.jpg',
      heroAlt: 'Pediatric physical therapist working with a young child on motor coordination and balance',
      overview: [
        'Pediatric physical therapy addresses movement and gross motor challenges in infants, children, and adolescents. Our certified pediatric specialists design engaging, play-based therapeutic interventions that motivate young patients while systematically addressing neuromuscular, congenital, and orthopedic deficits.',
        'Whether your child is navigating developmental delays, torticollis, toe walking, cerebral palsy, or recovering from juvenile sports fractures, we partner closely with parents and pediatricians to achieve age-appropriate physical milestones and instill lifelong movement confidence.'
      ],
      symptoms: [
        'Congenital Muscular Torticollis & Plagiocephaly',
        'Gross Motor Delays (Rolling, Sitting, Crawling, Walking)',
        'Idiopathic Toe Walking & Gait Asymmetries',
        'Pediatric Hypotonia (Low Muscle Tone) & Hypertonia',
        'Juvenile Sports Injuries & Growth Plate Apophysitis (Osgood-Schlatter)',
        'Cerebral Palsy, Spina Bifida & Neuromuscular Conditions'
      ],
      modalitiesImg: 'assets/images/service-pediatric.jpg',
      modalitiesAlt: 'Pediatric physical therapy session with child and therapist',
      modalities: [
        {
          icon: 'fas fa-child',
          title: 'Neurodevelopmental Facilitation (NDT)',
          color: 'text-primary',
          desc: 'Targeted therapeutic handling and sensory-motor facilitation techniques guiding infants and children into correct movement patterns.'
        },
        {
          icon: 'fas fa-cubes',
          title: 'Play-Based Dynamic Strengthening',
          color: 'text-success',
          desc: 'Creative, game-oriented exercises using balance beams, bolster rolls, and therapy balls that build core stability without feeling clinical.'
        },
        {
          icon: 'fas fa-shoe-prints',
          title: 'Gait Training & Orthotic Guidance',
          color: 'text-warning',
          desc: 'Objective foot alignment assessment and collaboration with pediatric orthotists for SMOs, AFOs, and corrective footwear.'
        },
        {
          icon: 'fas fa-home',
          title: 'Parent & Caregiver Home Coaching',
          color: 'text-info',
          desc: 'Practical, low-stress home activity plans empowering parents to integrate therapy into daily routines, diaper changes, and playtime.'
        }
      ],
      packages: [
        {
          name: 'Pediatric Milestone Assessment',
          sessions: 'Comprehensive Evaluation + 2 Sessions',
          features: 'Standardized gross motor scale audit (PDMS-2/AIMS), tone and reflex assessment, initial home exercise guide',
          price: '$380'
        },
        {
          name: 'Developmental Care Program (Recommended)',
          sessions: '10 Sessions (5 Weeks)',
          features: 'Bi-weekly hands-on motor facilitation, sensory integration, parent coaching modules, pediatric progress tracking report',
          price: '$890'
        },
        {
          name: 'Comprehensive Pediatric Continuum',
          sessions: '18 Sessions (9 Weeks)',
          features: 'Intensive milestone training, orthotic fitting support, school/daycare coordination, long-term developmental tracking',
          price: '$1,480'
        }
      ],
      faqs: [
        {
          question: 'What happens during a pediatric physical therapy evaluation?',
          answer: 'We evaluate your child\\\'s motor skills, joint mobility, muscle tone, primitive reflexes, and functional movement through gentle, playful games and standardized developmental screening tests in a relaxed environment.'
        },
        {
          question: 'What age groups do you treat in your pediatric program?',
          answer: 'We treat patients from newborns (0 months) presenting with torticollis or positional plagiocephaly up through adolescents and teenagers recovering from growth-related sports injuries.'
        },
        {
          question: 'How do you keep therapy fun and non-intimidating for children?',
          answer: 'Every exercise is disguised as purposeful play! We utilize colorful obstacle courses, therapy swings, textured balance boards, and sensory challenges so children stay motivated and excited for each visit.'
        }
      ],
      specialist: {
        name: 'Dr. Sarah Jenkins',
        credentials: 'PT, DPT, PCS • Pediatric Clinical Specialist',
        bio: 'Over 12 years of specialized clinical experience treating infants and children with developmental motor delays and juvenile orthopedic conditions.',
        image: 'assets/images/therapist-jenkins.jpg',
        link: 'therapist-details.html?id=jenkins'
      },
      relatedTherapies: [
        { name: 'Neurological Rehabilitation', id: 'neurological' },
        { name: 'Home Visit Physiotherapy', id: 'home-visit' },
        { name: 'Posture Correction & Ergonomics', id: 'posture-correction' },
        { name: 'Sports Injury Rehabilitation', id: 'sports-injury' }
      ],
      relatedArticles: [
        {
          slug: '5-proven-exercises-for-sciatica',
          title: 'Early Movement Milestones: A Pediatric Physiotherapy Guide',
          readTime: '6 min read',
          badge: 'Pediatrics'
        }
      ]
    },
    'aquatic-therapy': {
      title: 'Aquatic & Hydrotherapy Rehabilitation',
      badgeTag: 'Hydrotherapy & Low-Impact Recovery',
      subtitle: 'Specialized heated aquatic physical therapy utilizing water buoyancy to eliminate joint loading and restore painless mobility.',
      heroImg: 'assets/images/service-aquatic.jpg',
      heroAlt: 'Physical therapist guiding an adult patient through low-impact hydrotherapy exercises in a warm clinic pool',
      overview: [
        'Aquatic physical therapy harnesses the unique physical properties of water—buoyancy, hydrostatic pressure, viscosity, and thermal warmth (maintained at 92°F - 94°F)—to deliver rehabilitation that is simply impossible on dry land. Buoyancy reduces gravitational compressive forces on joints by up to 90%, enabling immediate, pain-free movement.',
        'Ideal for patients with severe osteoarthritis, acute postoperative joint replacements, fibromyalgia, and debilitating spinal stenosis, our certified aquatic physical therapists combine water-based resistance and closed-chain gait training to rebuild strength while totally shielding sensitive cartilage.'
      ],
      symptoms: [
        'Severe Hip, Knee & Ankle Osteoarthritis with Weight-Bearing Intolerance',
        'Early Postoperative Rehabilitation (Joint Replacement, Tendon Repair)',
        'Fibromyalgia & Chronic Widespread Musculoskeletal Pain',
        'Lumbar Spinal Stenosis with Severe Walking Impairment',
        'Balance Deficits, Vertigo & Elevated High-Fall-Risk Patients',
        'Complex Regional Pain Syndrome (CRPS) & Neuropathic Allodynia'
      ],
      modalitiesImg: 'assets/images/service-aquatic.jpg',
      modalitiesAlt: 'Hydrotherapy pool physical therapy session in warm water with therapist',
      modalities: [
        {
          icon: 'fas fa-water',
          title: 'Hydrostatic Buoyancy Offloading',
          color: 'text-primary',
          desc: 'Immersion to chest level relieves 85-90% of body weight, allowing acute post-surgical patients to walk and exercise without pain.'
        },
        {
          icon: 'fas fa-temperature-high',
          title: 'Therapeutic Warm-Water Vasodilation',
          color: 'text-danger',
          desc: 'Constant 93°F water warmth relaxes guarded muscles, increases microvascular circulation, and soothes hyperactive nerve pain receptors.'
        },
        {
          icon: 'fas fa-swimmer',
          title: 'Hydrodynamic Viscosity Resistance',
          color: 'text-info',
          desc: 'Multi-directional drag resistance smoothly increases with movement velocity, providing safe, accommodating strengthening with zero eccentric shock.'
        },
        {
          icon: 'fas fa-heartbeat',
          title: 'Hydrostatic Pressure Edema Reduction',
          color: 'text-success',
          desc: 'Natural gradient water pressure assists lymphatic return and swiftly dissipates lower-extremity postoperative swelling and venous pooling.'
        }
      ],
      packages: [
        {
          name: 'Aquatic Introduction & Mobility Reset',
          sessions: '3 Pool Sessions (1-2 Weeks)',
          features: 'Aquatic safety screening, initial unweighted joint decompression, water-walking gait pattern retraining',
          price: '$360'
        },
        {
          name: 'Intensive Hydrotherapy Program (Recommended)',
          sessions: '8 Pool Sessions (4 Weeks)',
          features: 'Progressive hydro-resistance protocols, deep-water buoyancy harness training, transition to dry-land home program',
          price: '$820'
        },
        {
          name: 'Aquatic & Land Combined Recovery Continuum',
          sessions: '14 Combined Sessions (7 Weeks)',
          features: 'Integrated water-to-land progression, functional strengthening, post-discharge community pool maintenance plan',
          price: '$1,290'
        }
      ],
      faqs: [
        {
          question: 'Do I need to know how to swim to participate in aquatic therapy?',
          answer: 'No swimming skills are required! All sessions take place in shallow, temperature-controlled water where your feet remain firmly on the floor or where comfortable safety flotation belts and handrails are utilized under direct therapist supervision.'
        },
        {
          question: 'What should I wear to an aquatic physical therapy session?',
          answer: 'A comfortable standard swimsuit, swim shorts with a rash guard, or athletic shorts and a lightweight synthetic t-shirt are all suitable. We provide clean private changing rooms and towel service.'
        },
        {
          question: 'How does warm water help with severe arthritis pain?',
          answer: 'Warm water (93°F) inhibits nociceptive pain signals while buoyancy removes compressive pressure from worn joint cartilage, allowing you to achieve full range of motion that is otherwise too painful on land.'
        }
      ],
      specialist: {
        name: 'Dr. Marcus Vance',
        credentials: 'PT, DPT, SCS, ATRI-C • Certified Aquatic Therapist',
        bio: 'Specialized in hydrodynamic rehabilitation for complex joint reconstructions, athlete non-impact conditioning, and severe degenerative conditions.',
        image: 'assets/images/therapist-vance.jpg',
        link: 'therapist-details.html?id=vance'
      },
      relatedTherapies: [
        { name: 'Joint Rehabilitation', id: 'joint-rehab' },
        { name: 'Post-Surgery Rehabilitation', id: 'post-surgery' },
        { name: 'Chronic Pain Management', id: 'chronic-pain' },
        { name: 'Senior Physiotherapy & Balance', id: 'senior-physio' }
      ],
      relatedArticles: [
        {
          slug: 'understanding-knee-osteoarthritis',
          title: 'Hydrotherapy vs Land Exercise for Knee Osteoarthritis: Clinical Outcomes',
          readTime: '7 min read',
          badge: 'Aquatics'
        }
      ]
    },
`;

// Insert before the closing of SERVICES_DATA
code = code.replace(/(\n\s*\}\s*;\s*\n\s*\/\/\s*={5,}\s*\n\s*\/\/\s*2\.\s*Query Parameter)/, newServicesCode + '$1');

// Add aliases to aliasMap
const newAliases = `      'pediatric': 'pediatric-care',
      'pediatrics': 'pediatric-care',
      'pediatric-care': 'pediatric-care',
      'child': 'pediatric-care',
      'aquatic': 'aquatic-therapy',
      'aquatics': 'aquatic-therapy',
      'aquatic-therapy': 'aquatic-therapy',
      'hydrotherapy': 'aquatic-therapy',
      'pool': 'aquatic-therapy',
`;

code = code.replace(/(const aliasMap = \{[\r\n]+)/, '$1' + newAliases);

fs.writeFileSync(enginePath, code, 'utf-8');
console.log('Successfully updated assets/js/service-engine.js with pediatric-care and aquatic-therapy!');
