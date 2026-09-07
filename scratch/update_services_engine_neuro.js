const fs = require('fs');

let content = fs.readFileSync('assets/js/service-engine.js', 'utf8');

const strokeAndVestibularCode = `    'stroke-rehab': {
      id: 'stroke-rehab',
      slug: 'stroke-rehab',
      badgeTag: 'Neuro-Motor Rehabilitation',
      category: 'neuro',
      metaDescription: 'Specialized stroke recovery and neuro-motor rehabilitation at PhysioLife. Constraint-induced movement therapy, parallel bar gait retraining, spasticity reduction, and functional independence.',
      title: 'Stroke & Neuro-Motor Recovery',
      subtitle: 'Intensive neuroplasticity therapy, functional ambulation retraining, and upper-extremity motor recovery following ischemic or hemorrhagic stroke.',
      heroImage: 'assets/images/service-stroke.jpg',
      heroImg: 'assets/images/service-stroke.jpg',
      heroAlt: 'Neurological physical therapist assisting stroke patient in walking retraining with parallel bars',
      overview: [
        'Ischemic and hemorrhagic strokes interrupt cortical signaling to peripheral muscle groups, leading to unilateral weakness (hemiparesis), hypertonia, and gait asymmetry. Our dedicated stroke rehabilitation program combines contemporary motor learning science with high-frequency functional repetition to re-establish neural connectivity through cortical remapping.',
        'Our neurological physical therapists utilize parallel bar ambulation training, functional electrical stimulation (FES), constraint-induced movement therapy (CIMT) for the upper extremity, and safe progressive transfers. We work directly with patients and family members to rebuild confidence, restore balance reflexes, and maximize functional independence at home and in the community.'
      ],
      symptoms: [
        'Post-Stroke Hemiplegia & Unilateral Upper/Lower Limb Weakness',
        'Spasticity, Hypertonia & Involuntary Muscle Rigidity',
        'Impaired Ambulation Cadence, Circumduction & Foot Drop',
        'Loss of Proprioception, Spatial Awareness & Postural Sway',
        'Difficulty with Bed Mobility, Sit-to-Stand & Wheelchair Transfers',
        'Central Facial Paresis & Coordinated Motor Fatigue'
      ],
      modalityImage: 'assets/images/service-stroke.jpg',
      modalitiesImg: 'assets/images/service-stroke.jpg',
      modalityAlt: 'Neurological physical therapy motor re-education and gait retraining',
      modalities: [
        {
          icon: 'fas fa-shoe-prints',
          title: 'Parallel Bar & Harness Gait Retraining',
          color: 'text-primary',
          desc: 'Controlled bilateral weight-bearing ambulation focusing on heel-strike kinematics, stance-phase stability, and swing-phase clearance.'
        },
        {
          icon: 'fas fa-hands',
          title: 'Constraint-Induced Movement Therapy (CIMT)',
          color: 'text-secondary',
          desc: 'Systematic task-oriented training that immobilizes the unaffected limb to force neuroplastic activation of the paretic arm and hand.'
        },
        {
          icon: 'fas fa-bolt',
          title: 'Neuromuscular Electrical Stimulation (NMES)',
          color: 'text-info',
          desc: 'Targeted pulsed electrical current applied to dorsiflexor and wrist extensor muscles to prevent atrophy and stimulate active neural motor firing.'
        }
      ],
      packages: [
        {
          name: 'Acute Stroke Transition',
          sessions: '6 Sessions (3 Weeks)',
          features: 'Functional independence measure (FIM), safe bed and chair transfer training, caregiver guidance, assistive device fitting',
          price: '$590'
        },
        {
          name: 'Intensive Neuro-Motor Recovery (Recommended)',
          sessions: '14 Sessions (7 Weeks)',
          features: 'Parallel bar ambulation re-education, CIMT upper limb therapy, NMES stimulation, weekly gait cadence analysis',
          price: '$1,290'
        },
        {
          name: 'Comprehensive Community Ambulation',
          sessions: '20 Sessions (10 Weeks)',
          features: 'Outdoor obstacle navigation, curb and stair ascent training, dynamic balance perturbations, post-discharge maintenance blueprint',
          price: '$1,750'
        }
      ],
      faqs: [
        {
          question: 'When should stroke physical therapy begin?',
          answer: 'Physical therapy typically begins within 24 to 48 hours in the hospital, and outpatient neuro-rehab should initiate as soon as the patient is medically stable. Early, intensive movement training capitalizes on the brain\\'s heightened neuroplastic potential during the first 3 to 6 months.'
        },
        {
          question: 'How do you treat foot drop after a stroke?',
          answer: 'We combine ankle-foot orthosis (AFO) fitting, neuromuscular electrical stimulation (NMES) to activate the tibialis anterior, and treadmill gait retraining to restore clearance and prevent tripping during the swing phase.'
        },
        {
          question: 'Can therapy help if a stroke occurred more than a year ago?',
          answer: 'Absolutely. Chronic stroke survivors regularly achieve substantial improvements in walking speed, hand dexterity, and balance when engaged in task-specific, high-repetition therapy.'
        }
      ],
      specialist: {
        name: 'Dr. Elena Rostova',
        credentials: 'PT, NCS • Board-Certified Neurological Specialist',
        bio: '14+ years specializing in stroke neuro-rehabilitation, Parkinson\\'s disease movement protocols, and complex vestibular inner-ear disorders.',
        image: 'assets/images/therapist-rostova.jpg',
        link: 'therapist-details.html?id=rostova'
      },
      relatedTherapies: [
        { name: 'Neurological Rehabilitation', id: 'neurological' },
        { name: 'Vestibular & Balance Rehabilitation', id: 'vestibular-rehab' },
        { name: 'Senior Physiotherapy & Balance', id: 'senior-physio' },
        { name: 'Home Visit Physiotherapy', id: 'home-visit' }
      ],
      relatedArticles: [
        {
          slug: 'vestibular-rehabilitation-vertigo',
          title: 'Vestibular Rehabilitation: Canalith Repositioning & Balance Retraining for BPPV',
          readTime: '7 min read',
          badge: 'Vestibular Care'
        },
        {
          slug: 'post-concussion-baseline-voms-protocol',
          title: 'Post-Concussion Baseline & VOMS Protocol: Multi-Stage Return-to-Play Physical Therapy',
          readTime: '8 min read',
          badge: 'Neurological'
        },
        {
          slug: 'nerve-flossing-techniques',
          title: 'Nerve Flossing Techniques: Alleviating Peripheral Sciatic Tension',
          readTime: '5 min read',
          badge: 'Neurodynamics'
        }
      ]
    },

    'vestibular-rehab': {
      id: 'vestibular-rehab',
      slug: 'vestibular-rehab',
      badgeTag: 'Vestibular & Oculomotor Care',
      category: 'neuro',
      metaDescription: 'Specialized vestibular physical therapy at PhysioLife. Comprehensive treatment for BPPV vertigo, labyrinthitis, vestibular hypofunction, gaze instability, and balance retraining.',
      title: 'Vestibular & Balance Rehabilitation',
      subtitle: 'Precision canalith repositioning, vestibular-ocular reflex (VOR) gaze stabilization, and dynamic computerized balance retraining for vertigo and disequilibrium.',
      heroImage: 'assets/images/service-vestibular.jpg',
      heroImg: 'assets/images/service-vestibular.jpg',
      heroAlt: 'Physical therapist conducting vestibular balance assessment and gaze stabilization exercises on balance platform',
      overview: [
        'The vestibular system in the inner ear coordinates with your visual system and proprioceptive sensors in the joints to maintain equilibrium and clear vision during head motion. When otolith crystals become displaced or inner ear viral inflammation occurs, patients experience debilitating spinning sensations (vertigo), motion sensitivity, unsteadiness, and nausea.',
        'Our vestibular rehabilitation therapy (VRT) is an evidence-based exercise program tailored to address the root neuro-vestibular dysfunction. Using infrared video oculography, Dix-Hallpike testing, and dynamic balance platforms, our certified vestibular therapists identify affected semicircular canals and guide rapid resolution of vertigo.'
      ],
      symptoms: [
        'Benign Paroxysmal Positional Vertigo (BPPV) & Room-Spinning Sensations',
        'Vestibular Neuritis, Labyrinthitis & Inner Ear Viral Sequelae',
        'Unilateral & Bilateral Vestibular Hypofunction',
        'Gaze Instability (Oscillopsia) & Difficulty Focusing While Walking',
        'Persistent Postural-Perceptual Dizziness (PPPD)',
        'Cervicogenic Dizziness & Motion Sensitivity in Crowded Environments'
      ],
      modalityImage: 'assets/images/service-vestibular.jpg',
      modalitiesImg: 'assets/images/service-vestibular.jpg',
      modalityAlt: 'Vestibular rehabilitation gaze stabilization and balance testing',
      modalities: [
        {
          icon: 'fas fa-sync-alt',
          title: 'Precision Canalith Repositioning (Epley & Semont)',
          color: 'text-primary',
          desc: 'Targeted rotational head maneuvers under infrared ocular observation that guide dislodged calcium carbonate crystals back into the utricle.'
        },
        {
          icon: 'fas fa-eye',
          title: 'Vestibulo-Ocular Reflex (VOR) Adaptation',
          color: 'text-secondary',
          desc: 'Gaze stabilization drills (VOR x1 and VOR x2) that train clear visual tracking during active cervical acceleration.'
        },
        {
          icon: 'fas fa-balance-scale-right',
          title: 'Sensory Organization & Dynamic Balance',
          color: 'text-info',
          desc: 'Multi-surface foam and perturbation platform drills that recalibrate proprioceptive reflexes and eliminate unsteadiness.'
        }
      ],
      packages: [
        {
          name: 'Acute Vertigo Relief',
          sessions: '3 Sessions (1-2 Weeks)',
          features: 'Diagnostic Dix-Hallpike and roll tests, canalith repositioning maneuvers, post-maneuver sleeping guidance',
          price: '$320'
        },
        {
          name: 'Vestibular Stabilization Track (Recommended)',
          sessions: '8 Sessions (4 Weeks)',
          features: 'VOR gaze adaptation, habituation drills for motion sensitivity, foam balance integration, home exercises app guide',
          price: '$760'
        },
        {
          name: 'Complex Equilibrium Mastery',
          sessions: '14 Sessions (7 Weeks)',
          features: 'Dynamic gait in busy visual environments, dual-task cognitive balance drills, cervicogenic alignment, 6-month stability audit',
          price: '$1,220'
        }
      ],
      faqs: [
        {
          question: 'How quickly does BPPV vertigo resolve with physical therapy?',
          answer: 'In over 90% of classic posterior canal BPPV cases, targeted repositioning maneuvers (such as the Epley maneuver) cure or dramatically improve symptoms within 1 to 2 treatment sessions.'
        },
        {
          question: 'Will vestibular rehabilitation make me feel dizzier initially?',
          answer: 'Brief symptom provocation during specific diagnostic tests and habituation exercises is normal, but our therapists closely monitor tolerance with resting intervals to ensure you remain safe and comfortable.'
        },
        {
          question: 'What is the difference between vestibular vertigo and lightheadedness?',
          answer: 'True vertigo is an illusion of motion where the room or patient feels as if it is spinning, tumbling, or tilting, whereas lightheadedness is a floating or faint sensation often linked to blood pressure or dehydration. Our thorough intake examination accurately differentiates the two.'
        }
      ],
      specialist: {
        name: 'Dr. Elena Rostova',
        credentials: 'PT, NCS • Board-Certified Neurological Specialist',
        bio: '14+ years specializing in stroke neuro-rehabilitation, Parkinson\\'s disease movement protocols, and complex vestibular inner-ear disorders.',
        image: 'assets/images/therapist-rostova.jpg',
        link: 'therapist-details.html?id=rostova'
      },
      relatedTherapies: [
        { name: 'Neurological Rehabilitation', id: 'neurological' },
        { name: 'Stroke & Neuro-Motor Recovery', id: 'stroke-rehab' },
        { name: 'Back & Neck Pain Therapy', id: 'spine-neck' },
        { name: 'Senior Physiotherapy & Balance', id: 'senior-physio' }
      ],
      relatedArticles: [
        {
          slug: 'vestibular-rehabilitation-vertigo',
          title: 'Vestibular Rehabilitation: Canalith Repositioning & Balance Retraining for BPPV',
          readTime: '7 min read',
          badge: 'Vestibular Care'
        },
        {
          slug: 'post-concussion-baseline-voms-protocol',
          title: 'Post-Concussion Baseline & VOMS Protocol: Multi-Stage Return-to-Play Physical Therapy',
          readTime: '8 min read',
          badge: 'Neurological'
        },
        {
          slug: 'nerve-flossing-techniques',
          title: 'Nerve Flossing Techniques: Alleviating Peripheral Sciatic Tension',
          readTime: '5 min read',
          badge: 'Neurodynamics'
        }
      ]
    },
`;

// Insert before the closing of SERVICES_DATA
const servicesDataClosing = '\n  };\n\n  // =========================================================================\n  // 2. Query Parameter Parser & Alias Normalization';
if (!content.includes(servicesDataClosing)) {
  console.error('Could not find SERVICES_DATA closing sequence!');
  process.exit(1);
}

content = content.replace(servicesDataClosing, '\n' + strokeAndVestibularCode + servicesDataClosing);

// Now add alias entries
const aliasAnchor = "      'in-home': 'home-visit'\n    };";
const newAliases = `      'in-home': 'home-visit',
      'stroke': 'stroke-rehab',
      'stroke-rehab': 'stroke-rehab',
      'stroke-rehabilitation': 'stroke-rehab',
      'cva': 'stroke-rehab',
      'hemiplegia': 'stroke-rehab',
      'hemiparesis': 'stroke-rehab',
      'vestibular': 'vestibular-rehab',
      'vestibular-rehab': 'vestibular-rehab',
      'vestibular-rehabilitation': 'vestibular-rehab',
      'vertigo': 'vestibular-rehab',
      'bppv': 'vestibular-rehab',
      'dizziness': 'vestibular-rehab',
      'balance': 'vestibular-rehab'
    };`;

if (!content.includes(aliasAnchor)) {
  console.error('Could not find aliasAnchor in content!');
  process.exit(1);
}

content = content.replace(aliasAnchor, newAliases);

// Ensure renderer checks both heroImage || heroImg and modalityImage || modalitiesImg
content = content.replace(
  "heroImg.src = service.heroImage;",
  "heroImg.src = service.heroImage || service.heroImg;"
);
content = content.replace(
  "modalityImg.src = service.modalityImage;",
  "modalityImg.src = service.modalityImage || service.modalitiesImg;"
);

fs.writeFileSync('assets/js/service-engine.js', content, 'utf8');
console.log('Successfully updated assets/js/service-engine.js with stroke-rehab and vestibular-rehab!');
