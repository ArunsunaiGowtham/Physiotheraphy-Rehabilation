/**
 * PhysioLife - Centralized Service Engine & Clinical Article Router
 * Manages service dataset, dynamic URL query routing (?service=<id>),
 * and client-side rendering on service-details.html.
 * Author: Antigravity
 * Version: 1.0.0
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. Centralized Services Database (10 Comprehensive Clinical Programs)
  // =========================================================================
  const SERVICES_DATA = {
    'sports-injury': {
      id: 'sports-injury',
      slug: 'sports-injury',
      badgeTag: 'Sports Performance & Rehabilitation',
      category: 'sports',
      metaDescription: 'Specialized sports injury rehabilitation at PhysioLife. Targeted recovery for ACL tears, rotator cuff strains, meniscus tears, runner’s knee, and peak return-to-sport training.',
      title: 'Sports Injury Rehabilitation',
      subtitle: 'Targeted recovery for ligament sprains, muscle tears, and accelerated return to peak athletic performance.',
      heroImage: 'assets/images/service-sports.jpg',
      heroAlt: 'Sports injury physical therapy and athletic conditioning',
      overview: [
        'Sports injuries require a sophisticated, movement-specific rehabilitation protocol that extends far beyond baseline pain relief. At PhysioLife, our sports medicine clinicians utilize computerized motion analysis, force-plate symmetry testing, and targeted kinetic chain assessments to pinpoint the biomechanical breakdowns that precipitated your injury.',
        'Our multi-phase return-to-play continuum combines active release therapy, eccentric tendon loading, blood flow restriction (BFR) training, and high-velocity deceleration drills. We ensure athletes not only achieve full ligamentous and myofascial healing, but also build rotational power and neuromuscular resilience to guard against secondary re-injury.'
      ],
      symptoms: [
        'Anterior Cruciate Ligament (ACL) & MCL Sprains',
        'Rotator Cuff Strains & Shoulder Labral Tears',
        'Meniscus Tears & Patellofemoral Runner’s Knee',
        'Hamstring, Quad & Adductor Muscle Tears',
        'Lateral Ankle Inversion & Syndesmotic Sprains',
        'Medial & Lateral Epicondylitis (Tennis/Golfer’s Elbow)'
      ],
      modalityImage: 'assets/images/home2-acl-protocol.jpg',
      modalityAlt: 'Athletic kinetic training and return-to-sport physical therapy',
      modalities: [
        {
          icon: 'fas fa-stopwatch-20',
          title: 'Blood Flow Restriction (BFR) Conditioning',
          color: 'text-primary',
          desc: 'Induces robust muscular hypertrophy and tendon remodeling using low mechanical loads, safeguarding healing grafts and joints.'
        },
        {
          icon: 'fas fa-dumbbell',
          title: 'Eccentric Kinetic Chain Loading',
          color: 'text-secondary',
          desc: 'High-yield tendon reconditioning targeting patellar and Achilles tendinopathies to restore tensile shock absorption.'
        },
        {
          icon: 'fas fa-running',
          title: 'Return-to-Sport Biomechanical Testing',
          color: 'text-info',
          desc: 'Objective Limb Symmetry Index (LSI) hop battery and reactive agility tests confirming 90%+ neuromuscular readiness.'
        }
      ],
      packages: [
        {
          name: 'Acute Athletic Reset',
          sessions: '4 Sessions (2 Weeks)',
          features: 'Comprehensive sports injury evaluation, edema management, joint mobilization, initial home loading regimen',
          price: '$390'
        },
        {
          name: 'Return-to-Play Program (Recommended)',
          sessions: '10 Sessions (5 Weeks)',
          features: 'BFR training, kinetic chain strengthening, agility drills, custom app video training, weekly force symmetry audit',
          price: '$890'
        },
        {
          name: 'Elite Athlete Performance Continuum',
          sessions: '16 Sessions (8 Weeks)',
          features: 'Full biomechanical restoration, sport-specific reactive training, post-discharge maintenance protocol, 90-day progress check',
          price: '$1,350'
        }
      ],
      faqs: [
        {
          question: 'How soon after a sports injury should I start physical therapy?',
          answer: 'For acute soft tissue injuries (sprains, strains, contusions), initiating early therapeutic mobilization within 48 to 72 hours under our modernized POLICE (Protection, Optimal Loading, Ice, Compression, Elevation) protocol significantly accelerates collagen alignment and prevents arthrofibrosis compared to prolonged immobilization.'
        },
        {
          question: 'What is Limb Symmetry Index (LSI) testing and why does it matter?',
          answer: 'LSI testing objectively measures the strength, power, and hop distance of your injured limb compared to your healthy limb. Research shows that returning to cutting or pivoting sports before achieving at least 90% LSI dramatically increases the risk of secondary graft tears or contralateral injury.'
        },
        {
          question: 'Do you work with high school, collegiate, and recreational athletes?',
          answer: 'Yes. Our clinical sports physical therapists tailor protocols to your specific discipline—whether you are a marathon runner, competitive soccer player, crossfit athlete, or weekend tennis enthusiast.'
        }
      ],
      specialist: {
        name: 'Dr. Marcus Vance',
        credentials: 'PT, DPT, SCS • Sports Clinical Specialist',
        bio: '10+ years directing elite return-to-sport protocols, kinetic chain deceleration, and ACL reconstruction rehabilitation for competitive athletes.',
        image: 'assets/images/therapist-vance.jpg',
        link: 'therapist-details.html?id=vance'
      },
      relatedTherapies: [
        { name: 'Muscle & Mobility Therapy', id: 'muscle-mobility' },
        { name: 'Joint Rehabilitation', id: 'joint-rehab' },
        { name: 'Post-Surgery Rehabilitation', id: 'post-surgery' },
        { name: 'Posture Correction & Ergonomics', id: 'posture-correction' }
      ],
      relatedArticles: [
        {
          slug: 'acl-reconstruction-biomechanical-roadmap',
          title: 'ACL Reconstruction: The 9-Month Return-to-Sport Biomechanical Roadmap',
          readTime: '8 min read',
          badge: 'Sports Recovery'
        },
        {
          slug: 'patellofemoral-pain-runners-knee',
          title: 'Patellofemoral Pain & Runner’s Knee: Cadence and Gait Mechanics',
          readTime: '6 min read',
          badge: 'Gait Lab'
        },
        {
          slug: 'hamstring-strain-nordic-protocol',
          title: 'Hamstring Strain Rehabilitation: High-Velocity Sprinting & Nordic Curls',
          readTime: '5 min read',
          badge: 'Clinical Protocol'
        }
      ]
    },

    'post-surgery': {
      id: 'post-surgery',
      slug: 'post-surgery',
      badgeTag: 'Orthopedic Post-Operative Care',
      category: 'postop',
      metaDescription: 'Structured post-surgical physical rehabilitation at PhysioLife. Clinical recovery protocols for total knee, total hip, rotator cuff repair, and spinal fusion procedures.',
      title: 'Post-Surgery Rehabilitation',
      subtitle: 'Structured, phase-by-phase recovery protocols following joint replacement, ligament repair, and orthopedic surgery.',
      heroImage: 'assets/images/service-postop.jpg',
      heroAlt: 'Post-surgical physical therapy and joint mobilization',
      overview: [
        'Successful orthopedic surgery is only half the journey to full recovery; the post-operative rehabilitation phase dictates your permanent range of motion, muscle reactivation, and functional independence. At PhysioLife, our clinical directors coordinate directly with your orthopedic surgeon’s post-op protocol.',
        'We guide patients systematically through each physiological healing phase: acute swelling control and scar tissue mobilization in Phase 1, progressive active-assisted range of motion in Phase 2, functional multi-plane strengthening in Phase 3, and full lifestyle reintegration in Phase 4.'
      ],
      symptoms: [
        'Total Knee Arthroplasty (TKA) Replacement Recovery',
        'Total Hip Arthroplasty (Anterior & Posterior Approaches)',
        'Rotator Cuff Tendon & Biceps Tenodesis Repairs',
        'Lumbar Laminectomy, Discectomy & Spinal Fusions',
        'Achilles Tendon Repair & Ankle Ligament Reconstruction',
        'Post-Fracture Open Reduction Internal Fixation (ORIF)'
      ],
      modalityImage: 'assets/images/postop-knee-rehab.jpg',
      modalityAlt: 'Post-operative knee joint mobilization and rehabilitation',
      modalities: [
        {
          icon: 'fas fa-procedures',
          title: 'Early Scar & Soft Tissue Desensitization',
          color: 'text-primary',
          desc: 'Gentle manual lymphatic drainage and cross-friction scar mobilization to prevent adhesive joint contractures.'
        },
        {
          icon: 'fas fa-compass',
          title: 'Continuous Passive & Active Range of Motion',
          color: 'text-secondary',
          desc: 'Targeted goniometric restoration to achieve full anatomical extension and flexion without straining healing surgical sutures.'
        },
        {
          icon: 'fas fa-bolt',
          title: 'Neuromuscular Electrical Stimulation (NMES)',
          color: 'text-info',
          desc: 'Clinical pulsed electrical stimulation to overcome arthrogenic muscle inhibition and reactivate quadriceps or deltoid fibers.'
        }
      ],
      packages: [
        {
          name: 'Post-Op Early Mobilization',
          sessions: '6 Sessions (3 Weeks)',
          features: 'Surgeon protocol integration, surgical incision care, passive range restoration, crutch/walker gait retraining',
          price: '$540'
        },
        {
          name: 'Total Joint Restoration (Recommended)',
          sessions: '12 Sessions (6 Weeks)',
          features: 'Comprehensive manual therapy, progressive resisted strengthening, stair climbing mastery, NMES stimulation, digital home portal',
          price: '$990'
        },
        {
          name: 'Complete Post-Surgical Independence',
          sessions: '18 Sessions (9 Weeks)',
          features: 'End-range joint stretching, full functional dynamic stability, balance recalibration, long-term home maintenance blueprint',
          price: '$1,440'
        }
      ],
      faqs: [
        {
          question: 'When should I begin physical therapy after my surgery?',
          answer: 'Depending on your surgeon’s instructions, outpatient physical therapy typically commences between 3 to 7 days post-discharge. Early gentle movement is essential to prevent joint freezing and blood clot risks.'
        },
        {
          question: 'Will post-surgical therapy be painful?',
          answer: 'Our therapists prioritize patient comfort using gentle manual techniques, cryotherapy, and precise graded motion. We work strictly within the therapeutic tolerance zone to avoid excessive inflammation.'
        },
        {
          question: 'Do you communicate progress reports with my orthopedic surgeon?',
          answer: 'Yes. We provide formal clinical documentation including goniometric range-of-motion measurements, strength indexes, and functional milestones directly to your surgeon prior to your follow-up visits.'
        }
      ],
      specialist: {
        name: 'Dr. David Chen',
        credentials: 'PT, CMPT • Joint Arthroplasty & Manual Specialist',
        bio: '9+ years collaborating with orthopedic surgeons to deliver phase-based manual mobilization and scar tissue remodeling after total joint replacements.',
        image: 'assets/images/therapist-chen.jpg',
        link: 'therapist-details.html?id=chen'
      },
      relatedTherapies: [
        { name: 'Joint Rehabilitation', id: 'joint-rehab' },
        { name: 'Sports Injury Rehabilitation', id: 'sports-injury' },
        { name: 'Home Visit Physiotherapy', id: 'home-visit' },
        { name: 'Back & Neck Pain Therapy', id: 'spine-neck' }
      ],
      relatedArticles: [
        {
          slug: 'total-knee-arthroplasty-rehab',
          title: 'Total Knee Replacement: 12-Week Range of Motion & Gait Roadmap',
          readTime: '7 min read',
          badge: 'Post-Op Roadmap'
        },
        {
          slug: 'post-op-rotator-cuff-arthroscopy-rehab',
          title: 'Post-Op Rotator Cuff Repair: Phase-by-Phase Shoulder Arthroscopy Protocol',
          readTime: '8 min read',
          badge: 'Surgical Protocol'
        },
        {
          slug: 'rotator-cuff-tears-surgery-vs-therapy',
          title: 'Rotator Cuff Tears: Surgery vs Conservative Physical Therapy',
          readTime: '6 min read',
          badge: 'Clinical Evidence'
        }
      ]
    },

    'chronic-pain': {
      id: 'chronic-pain',
      slug: 'chronic-pain',
      badgeTag: 'Pain Science & Manual Therapy',
      category: 'spine',
      metaDescription: 'Evidence-based chronic pain management at PhysioLife. Multimodal non-opioid clinical solutions for fibromyalgia, chronic myofascial syndrome, and central sensitization.',
      title: 'Chronic Pain Management',
      subtitle: 'Multimodal clinical solutions for persistent musculoskeletal discomfort, fibromyalgia, and chronic nerve sensitivity.',
      heroImage: 'assets/images/service-chronic.jpg',
      heroAlt: 'Chronic pain relief and clinical manual therapy',
      overview: [
        'Persistent pain lasting beyond three months involves changes in how the central nervous system processes sensory input, a phenomenon known as central sensitization. Treating chronic pain requires a modern neuro-orthopedic framework combining therapeutic neuroscience education with graded manual therapy.',
        'At PhysioLife, our specialized therapists help quiet hyperactive pain pathways through myofascial dry needling, gentle joint articulation, graded motor imagery, and cardiovascular autonomic regulation. We empower patients to break the pain-spasm cycle and reclaim an active, fulfilling lifestyle without opioid dependence.'
      ],
      symptoms: [
        'Fibromyalgia Syndrome & Generalized Body Aches',
        'Chronic Myofascial Pain & Deep Muscular Trigger Points',
        'Persistent Cervicogenic & Tension Headaches',
        'Complex Regional Pain Syndrome (CRPS) Rehabilitation',
        'Post-Traumatic Chronic Whiplash Sensitivity',
        'Persistent Non-Specific Chronic Lower Back Discomfort'
      ],
      modalityImage: 'assets/images/blog-dry-needling.jpg',
      modalityAlt: 'Myofascial trigger point dry needling and chronic pain therapy',
      modalities: [
        {
          icon: 'fas fa-feather-alt',
          title: 'Myofascial Trigger Point Dry Needling',
          color: 'text-primary',
          desc: 'Direct mechanical deactivation of taut bands and ischemic knots to relieve referred pain patterns and restore local blood flow.'
        },
        {
          icon: 'fas fa-brain',
          title: 'Pain Neuroscience & Graded Motor Imagery',
          color: 'text-secondary',
          desc: 'Retrains cortical sensory maps and calms neural alarm systems through graded exposure and movement desensitization.'
        },
        {
          icon: 'fas fa-spa',
          title: 'Myofascial Release & Craniosacral Articulation',
          color: 'text-info',
          desc: 'Gentle sustained fascial mobilization to ease dura tension, quiet sympathetic tone, and relieve tension headaches.'
        }
      ],
      packages: [
        {
          name: 'Pain Desensitization Track',
          sessions: '4 Sessions (2 Weeks)',
          features: 'Comprehensive central pain evaluation, trigger point dry needling, autonomic breathwork coaching, home calm kit',
          price: '$380'
        },
        {
          name: 'Comprehensive Pain Reset (Recommended)',
          sessions: '10 Sessions (5 Weeks)',
          features: 'Integrated dry needling, myofascial release, graded movement conditioning, weekly pain sensitivity score tracking',
          price: '$860'
        },
        {
          name: 'Long-Term Vitality & Maintenance',
          sessions: '16 Sessions (8 Weeks)',
          features: 'Full neuro-muscular realignment, lifestyle pacing strategies, functional strength integration, monthly maintenance checks',
          price: '$1,300'
        }
      ],
      faqs: [
        {
          question: 'How is physical therapy different for chronic pain than acute injuries?',
          answer: 'In chronic pain, tissue damage has usually healed, but the nervous system remains sensitized. We emphasize gradual graded exposure, neural desensitization, and movement confidence rather than aggressive loading.'
        },
        {
          question: 'Does dry needling hurt and how does it work?',
          answer: 'Most patients feel only a brief dull twitch sensation as the needle releases the muscular trigger point. This twitch resets chemical imbalances, releases endogenous endorphins, and immediately lowers muscle tone.'
        },
        {
          question: 'Can physical therapy help if I have suffered from pain for years?',
          answer: 'Yes. Clinical studies show that combining modern pain neuroscience education with targeted manual therapy significantly improves function, sleep quality, and daily energy even in decades-long chronic conditions.'
        }
      ],
      specialist: {
        name: 'Dr. Chloe Bennett',
        credentials: 'PT, DPT, PRPC • Chronic Pain & Central Sensitization Specialist',
        bio: '11+ years pioneering non-opioid neuroplastic pain desensitization, graded motor imagery, and autonomic regulation for complex fibromyalgia.',
        image: 'assets/images/therapist-bennett.jpg',
        link: 'therapist-details.html?id=bennett'
      },
      relatedTherapies: [
        { name: 'Back & Neck Pain Therapy', id: 'spine-neck' },
        { name: 'Muscle & Mobility Therapy', id: 'muscle-mobility' },
        { name: 'Posture Correction & Ergonomics', id: 'posture-correction' },
        { name: 'Joint Rehabilitation', id: 'joint-rehab' }
      ],
      relatedArticles: [
        {
          slug: 'chronic-myofascial-pain',
          title: 'Chronic Myofascial Pain: Trigger Point Dry Needling vs Manual Therapy',
          readTime: '7 min read',
          badge: 'Pain Science'
        },
        {
          slug: 'nerve-flossing-techniques',
          title: 'Nerve Flossing Techniques: Alleviating Peripheral Sciatic Tension',
          readTime: '5 min read',
          badge: 'Neurodynamics'
        },
        {
          slug: 'plantar-fasciitis-shockwave-therapy',
          title: 'Plantar Fasciitis: Heel Pain Biomechanics & Extracorporeal Shockwave Therapy',
          readTime: '6 min read',
          badge: 'Modalities'
        }
      ]
    },

    'spine-neck': {
      id: 'spine-neck',
      slug: 'spine-neck',
      badgeTag: 'Orthopedic Spine Specialization',
      category: 'spine',
      metaDescription: 'Comprehensive Spine, Neck and Sciatica physical therapy at PhysioLife. Targeted non-surgical relief for disc herniation, stenosis, and chronic cervical tension.',
      title: 'Back & Neck Pain Therapy',
      subtitle: 'Non-surgical decompression, targeted manual mobilization, and postural realignment for spinal wellness.',
      heroImage: 'assets/images/service-spine.jpg',
      heroAlt: 'Spine, neck and lower back physical therapy and joint mobilization',
      overview: [
        'Spine and neck conditions represent over 40% of all musculoskeletal dysfunctions. At PhysioLife, our board-certified orthopedic physical therapists utilize a specialized diagnostic framework to distinguish whether your pain stems from disc herniation, facet joint arthrosis, neural tension, or postural muscle fatigue.',
        'Rather than merely addressing localized spasms with temporary hot packs, we apply progressive McKenzie spinal extension techniques, computerized axial traction, and stabilizing multifidus muscle retraining to decompress pinched nerves and permanently restore painless spinal mobility.'
      ],
      symptoms: [
        'Lumbar Disc Bulges & Herniations (L4-L5, L5-S1)',
        'Radiating Sciatica Leg Pain, Numbness & Tingling',
        'Cervical Radiculopathy & Arm Neural Sensitivity',
        'Chronic Postural Tension Headaches & Whiplash',
        'Lumbar Spinal Stenosis & Spondylolisthesis',
        'Post-Spinal Fusion & Discectomy Reconditioning'
      ],
      modalityImage: 'assets/images/therapist-treatment-jenkins.jpg',
      modalityAlt: 'Dr. Sarah Jenkins performing targeted cervical and spinal joint mobilization therapy',
      modalities: [
        {
          icon: 'fas fa-hands-helping',
          title: 'Hands-On Manual Joint Mobilization',
          color: 'text-primary',
          desc: 'Grade III & IV passive vertebral mobilizations to widen neural foramina and reduce facet restriction.'
        },
        {
          icon: 'fas fa-compress-arrows-alt',
          title: 'Computerized Spinal Decompression',
          color: 'text-secondary',
          desc: 'Gentle cyclical axial distraction creating negative intradiscal pressure to facilitate disc retraction.'
        },
        {
          icon: 'fas fa-feather-alt',
          title: 'Myofascial Trigger Point Dry Needling',
          color: 'text-info',
          desc: 'Deactivates deep muscular knots in the piriformis, quadratus lumborum, and cervical paraspinal muscles.'
        }
      ],
      packages: [
        {
          name: 'Acute Relief Track',
          sessions: '4 Sessions (2 Weeks)',
          features: 'Diagnostic evaluation, hands-on manual therapy, McKenzie directional preference drills, home ergonomics sheet',
          price: '$380'
        },
        {
          name: 'Complete Spine Reset (Recommended)',
          sessions: '10 Sessions (5 Weeks)',
          features: 'Decompression therapy, dry needling, deep core stabilization, patient app video portal, bi-weekly posture audit',
          price: '$850'
        },
        {
          name: 'Comprehensive Spinal Rehab',
          sessions: '16 Sessions (8 Weeks)',
          features: 'Full structural restoration track, functional mobility scoring, lifting ergonomics training, 6-month checkup',
          price: '$1,280'
        }
      ],
      faqs: [
        {
          question: 'Will physical therapy help me avoid spinal surgery?',
          answer: 'Yes. Clinical research consistently demonstrates that 85% to 90% of herniated disc and sciatica patients recover successfully through conservative physical therapy without undergoing invasive discectomy or spinal fusion surgery.'
        },
        {
          question: 'How many sessions will I need before feeling relief?',
          answer: 'Most patients report a noticeable decrease in acute pain and peripheral nerve tingling within 2 to 4 sessions. Full structural stabilization typically spans 6 to 8 weeks depending on chronicity.'
        },
        {
          question: 'Is physical therapy covered by my health insurance?',
          answer: 'PhysioLife is in-network with Medicare, BlueCross BlueShield, Aetna, Cigna, UnitedHealthcare, and worker’s compensation. Our intake billing team verifies your exact benefits before your first visit.'
        }
      ],
      specialist: {
        name: 'Dr. Sarah Jenkins',
        credentials: 'PT, DPT, OCS • Orthopedic Clinical Specialist',
        bio: '12+ years specializing exclusively in spinal disc disorders, computerized mechanical decompression, and cervical postural realignment.',
        image: 'assets/images/therapist-jenkins.jpg',
        link: 'therapist-details.html?id=jenkins'
      },
      relatedTherapies: [
        { name: 'Posture Correction & Ergonomics', id: 'posture-correction' },
        { name: 'Chronic Pain Management', id: 'chronic-pain' },
        { name: 'Muscle & Mobility Therapy', id: 'muscle-mobility' },
        { name: 'Joint Rehabilitation', id: 'joint-rehab' }
      ],
      relatedArticles: [
        {
          slug: '5-proven-exercises-for-sciatica',
          title: '5 Proven Exercises for Sciatica and Lower Back Pain Relief',
          readTime: '6 min read',
          badge: 'Spine Care'
        },
        {
          slug: 'cervical-radiculopathy-disc-herniation',
          title: 'Cervical Radiculopathy: Treating Disc Herniation Without Surgery',
          readTime: '7 min read',
          badge: 'Neck & Spine'
        },
        {
          slug: 'mckenzie-method-lumbar-disc-bulges',
          title: 'McKenzie Method Extension Drills for Acute Lumbar Disc Bulges',
          readTime: '6 min read',
          badge: 'Clinical Protocol'
        }
      ]
    },

    'joint-rehab': {
      id: 'joint-rehab',
      slug: 'joint-rehab',
      badgeTag: 'Joint Health & Arthritis Care',
      category: 'spine',
      metaDescription: 'Expert joint rehabilitation and arthritis therapy at PhysioLife. Restore pain-free articulation for shoulder impingement, frozen shoulder, hip bursitis, and knee osteoarthritis.',
      title: 'Joint Rehabilitation',
      subtitle: 'Comprehensive manual therapy and functional conditioning for osteoarthritis, bursitis, and joint mobility restrictions.',
      heroImage: 'assets/images/service-joint.jpg',
      heroAlt: 'Joint rehabilitation and arthritis physical therapy session',
      overview: [
        'Articular joints depend on healthy synovial fluid circulation, balanced capsular tension, and surrounding muscular shock absorption to function smoothly without grinding or inflammation. When cartilage wears or capsular adhesions develop, stiffness and deep joint pain severely restrict daily movement.',
        'Our joint preservation protocols employ Kaltenborn joint distraction, end-range capsular stretches, and non-impact closed-kinetic-chain strengthening. We help patients with osteoarthritis, impingement syndromes, and frozen shoulder regain frictionless motion and preserve their natural joint cartilage.'
      ],
      symptoms: [
        'Knee Osteoarthritis (Grade 1 through Grade 4)',
        'Shoulder Impingement & Adhesive Capsulitis (Frozen Shoulder)',
        'Femoroacetabular Impingement (FAI) & Hip Labral Irritation',
        'Trochanteric Hip Bursitis & Iliotibial Band Friction',
        'Acromioclavicular (AC) Joint Sprains & Glenohumeral Instability',
        'Rheumatoid Joint Morning Stiffness & Limited Articulation'
      ],
      modalityImage: 'assets/images/blog-knee-osteo.jpg',
      modalityAlt: 'Knee joint mobilization and osteoarthritis physical therapy',
      modalities: [
        {
          icon: 'fas fa-hand-holding-medical',
          title: 'Kaltenborn & Maitland Joint Mobilization',
          color: 'text-primary',
          desc: 'Oscillatory gliding and sustained traction techniques that stimulate synovial lubrication and stretch contracted joint capsules.'
        },
        {
          icon: 'fas fa-shield-alt',
          title: 'Joint Unloading & Biomechanical Rebalancing',
          color: 'text-secondary',
          desc: 'Custom gait adjustments and targeted neuromuscular cueing to redistribute peak ground reaction forces away from worn joint facets.'
        },
        {
          icon: 'fas fa-sync-alt',
          title: 'Progressive Closed-Kinetic-Chain Strengthening',
          color: 'text-info',
          desc: 'High-repetition, low-impact loading that reinforces dynamic joint stabilizing muscles without compressive shear stress.'
        }
      ],
      packages: [
        {
          name: 'Joint Relief Foundation',
          sessions: '4 Sessions (2 Weeks)',
          features: 'Comprehensive joint capsular assessment, manual distraction therapy, synovial mobility home exercises',
          price: '$380'
        },
        {
          name: 'Active Joint Restoration (Recommended)',
          sessions: '10 Sessions (5 Weeks)',
          features: 'Targeted joint mobilization, strengthening progression, gait retraining, custom unloader brace consultation',
          price: '$850'
        },
        {
          name: 'Lifelong Cartilage Protection Track',
          sessions: '16 Sessions (8 Weeks)',
          features: 'Complete multi-joint conditioning, functional sports/hiking simulation, quarterly maintenance booster checkups',
          price: '$1,290'
        }
      ],
      faqs: [
        {
          question: 'Can physical therapy really help bone-on-bone knee osteoarthritis?',
          answer: 'Absolutely. Research shows strengthening the surrounding quadriceps, hamstrings, and glutes reduces compressive forces transmitted directly to the joint surface by over 40%, significantly decreasing pain and improving walking endurance.'
        },
        {
          question: 'How long does frozen shoulder (adhesive capsulitis) therapy take?',
          answer: 'With targeted capsular stretching and gentle home mobilization, patients typically transition out of the freezing stage twice as fast as spontaneous recovery, regaining functional overhead reach within 8 to 12 weeks.'
        },
        {
          question: 'Will I need joint injections in addition to physical therapy?',
          answer: 'Many patients achieve complete relief through physical therapy alone. If severe acute swelling persists, we work closely with orthopedic physicians to time therapeutic injections so you gain maximum benefit from concurrent physical therapy.'
        }
      ],
      specialist: {
        name: 'Dr. Julian Reed',
        credentials: 'PT, DPT, RMSK • Musculoskeletal Ultrasound & Joint Lead',
        bio: '10+ years specializing in osteoarthritis joint preservation, cartilage protection loading, and ultrasound-guided manual therapy.',
        image: 'assets/images/therapist-reed.jpg',
        link: 'therapist-details.html?id=reed'
      },
      relatedTherapies: [
        { name: 'Post-Surgery Rehabilitation', id: 'post-surgery' },
        { name: 'Sports Injury Rehabilitation', id: 'sports-injury' },
        { name: 'Back & Neck Pain Therapy', id: 'spine-neck' },
        { name: 'Senior Physiotherapy & Balance', id: 'senior-physio' }
      ],
      relatedArticles: [
        {
          slug: 'understanding-knee-osteoarthritis',
          title: 'Understanding Knee Osteoarthritis: Movement as True Medicine',
          readTime: '6 min read',
          badge: 'Joint Health'
        },
        {
          slug: 'hip-impingement-fai-rehabilitation',
          title: 'Femoroacetabular Impingement (FAI): Hip Mobility & Deep Glute Activation',
          readTime: '7 min read',
          badge: 'Hip & Pelvis'
        },
        {
          slug: 'throwers-shoulder-scapular-dyskinesis',
          title: 'Thrower’s Shoulder & Scapular Dyskinesis: Rotational Power Protocols',
          readTime: '6 min read',
          badge: 'Shoulder Care'
        }
      ]
    },

    'muscle-mobility': {
      id: 'muscle-mobility',
      slug: 'muscle-mobility',
      badgeTag: 'Soft Tissue & Functional Movement',
      category: 'sports',
      metaDescription: 'Targeted muscle and mobility therapy at PhysioLife. Active Release Techniques (ART), IASTM instrument mobilization, and myofascial decompression to restore unrestricted movement.',
      title: 'Muscle & Mobility Therapy',
      subtitle: 'Active release techniques, instrument-assisted soft tissue mobilization (IASTM), and dynamic movement optimization.',
      heroImage: 'assets/images/service-mobility.jpg',
      heroAlt: 'Muscle release therapy, functional mobility and stretching',
      overview: [
        'Chronic muscular stiffness, fascial adhesions, and restricted joint ranges of motion place abnormal mechanical leverage on your joints and spine. When soft tissues become fibrotic through repetitive strain or micro-trauma, movement efficiency deteriorates rapidly.',
        'At PhysioLife, our mobility therapists utilize Active Release Techniques (ART), Instrument-Assisted Soft Tissue Mobilization (IASTM), and functional range conditioning (FRC) to break cross-linked scar tissue, hydrate collagen matrices, and build active motor control through every degree of human movement.'
      ],
      symptoms: [
        'Severe Hamstring & Hip Flexor Tightness',
        'Restricted Thoracic Spine Extension & Rib Stiffness',
        'Chronic Trapezius & Levator Scapulae Neck Spasms',
        'Iliotibial (IT) Band Tightness & Tensor Fasciae Latae Strain',
        'Deep Gluteal & Piriformis Compression Syndrome',
        'Plantar Fascia & Calf Gastrocnemius Contractures'
      ],
      modalityImage: 'assets/images/step-therapy.jpg',
      modalityAlt: 'Manual myofascial release and active mobility therapy',
      modalities: [
        {
          icon: 'fas fa-cut',
          title: 'Instrument-Assisted Soft Tissue Mobilization (IASTM)',
          color: 'text-primary',
          desc: 'Ergonomic stainless-steel tools that detect and break micro-adhesions, stimulating cellular fibroblast proliferation.'
        },
        {
          icon: 'fas fa-hands',
          title: 'Active Release Techniques (ART)',
          color: 'text-secondary',
          desc: 'Tension-applied manual contact combined with active patient joint excursion to release trapped peripheral nerves.'
        },
        {
          icon: 'fas fa-expand-arrows-alt',
          title: 'Functional Range Conditioning (FRC)',
          color: 'text-info',
          desc: 'Controlled Articular Rotations (CARs) and end-range isometric holds that turn passive flexibility into usable muscular strength.'
        }
      ],
      packages: [
        {
          name: 'Mobility Jumpstart',
          sessions: '4 Sessions (2 Weeks)',
          features: 'Full-body functional movement screen (FMS), IASTM soft tissue release, customized daily dynamic warm-up protocol',
          price: '$360'
        },
        {
          name: 'Total Fascial Reset (Recommended)',
          sessions: '10 Sessions (5 Weeks)',
          features: 'Complete ART & IASTM program, thoracic and hip mobility unlocking, strength integration, digital video portal access',
          price: '$820'
        },
        {
          name: 'Peak Kinetic Freedom',
          sessions: '16 Sessions (8 Weeks)',
          features: 'Full structural remodeling, rotational sports conditioning, athletic movement mastery, monthly check-in audits',
          price: '$1,250'
        }
      ],
      faqs: [
        {
          question: 'What is the difference between flexibility and mobility?',
          answer: 'Flexibility is simply the passive range of motion a muscle can stretch into. Mobility is your ability to actively produce and control force through that full range. We focus on building active, usable mobility to protect joints under load.'
        },
        {
          question: 'Does IASTM tool scraping leave bruises?',
          answer: 'When performed by our trained clinical physical therapists, IASTM creates transient micro-hyperemia (a healthy pink flush of blood flow) rather than deep bruising, immediately reducing muscle hypertonicity.'
        },
        {
          question: 'Can this therapy improve my athletic posture and gym lifts?',
          answer: 'Yes. Releasing tight anterior chains (pectorals, lats, hip flexors) and unlocking thoracic extension allows overhead squats, bench presses, and running gaits to feel effortlessly smooth and pain-free.'
        }
      ],
      specialist: {
        name: 'Dr. Liam Gallagher',
        credentials: 'PT, DPT, CSCS • Myofascial Release & Mobility Lead',
        bio: '8+ years integrating instrument-assisted soft tissue mobilization (IASTM), dry needling, and full-body rotational mobility patterns.',
        image: 'assets/images/therapist-gallagher.jpg',
        link: 'therapist-details.html?id=gallagher'
      },
      relatedTherapies: [
        { name: 'Sports Injury Rehabilitation', id: 'sports-injury' },
        { name: 'Posture Correction & Ergonomics', id: 'posture-correction' },
        { name: 'Back & Neck Pain Therapy', id: 'spine-neck' },
        { name: 'Chronic Pain Management', id: 'chronic-pain' }
      ],
      relatedArticles: [
        {
          slug: 'thoracic-mobility-rotational-sports',
          title: 'Thoracic Spine Extension & Rib Mobility for Rotational Athletes',
          readTime: '6 min read',
          badge: 'Mobility Lab'
        },
        {
          slug: 'core-stability-transverse-abdominis',
          title: 'Deep Core Stability: Transverse Abdominis & Pelvic Floor Synchronization',
          readTime: '5 min read',
          badge: 'Core Performance'
        },
        {
          slug: 'chronic-myofascial-pain',
          title: 'Chronic Myofascial Pain: Trigger Point Dry Needling vs Manual Therapy',
          readTime: '7 min read',
          badge: 'Soft Tissue'
        }
      ]
    },

    'neurological': {
      id: 'neurological',
      slug: 'neurological',
      badgeTag: 'Neurological Rehabilitation',
      category: 'neuro',
      metaDescription: 'Specialized neurological rehabilitation at PhysioLife. Neuroplasticity-driven physical therapy for stroke recovery, Parkinson’s, multiple sclerosis, and balance disorders.',
      title: 'Neurological Rehabilitation',
      subtitle: 'Neuroplasticity-based movement retraining for stroke survivors, Parkinson’s disease, multiple sclerosis, and peripheral neuropathy.',
      heroImage: 'assets/images/service-neuro.jpg',
      heroAlt: 'Neurological physical therapy and gait retraining',
      overview: [
        'The human central nervous system possesses a remarkable capacity to reorganize and forge new neural pathways following trauma or disease—a biological mechanism known as neuroplasticity. Effective neurological physical therapy leverages high-repetition, salient movement retraining to stimulate cortical adaptation.',
        'At PhysioLife, our neurological clinical specialists provide supportive, one-on-one therapy tailored for stroke recovery, Parkinson’s disease (including LSVT BIG principles), multiple sclerosis, and vestibular vertigo. We focus on functional balance, fall prevention, transfers, and regaining personal independence.'
      ],
      symptoms: [
        'Post-Stroke Hemiparesis, Spasticity & Gait Disturbance',
        'Parkinson’s Disease Bradykinesia & Freezing Episodes',
        'Multiple Sclerosis (MS) Fatigue & Ataxia Management',
        'Peripheral Neuropathy Balance Impairment & Foot Drop',
        'Benign Paroxysmal Positional Vertigo (BPPV) & Vestibular Hypofunction',
        'Traumatic Brain Injury (TBI) & Post-Concussion Syndrome'
      ],
      modalityImage: 'assets/images/home2-neuromuscular.jpg',
      modalityAlt: 'Neurological balance retraining and neuromuscular physical therapy',
      modalities: [
        {
          icon: 'fas fa-brain',
          title: 'Task-Specific Neuroplasticity Drills',
          color: 'text-primary',
          desc: 'High-repetition functional practice designed to stimulate cortical remapping for walking, reaching, and fine motor skills.'
        },
        {
          icon: 'fas fa-balance-scale',
          title: 'Vestibular Canalith Repositioning & Balance Board',
          color: 'text-secondary',
          desc: 'Targeted Epley maneuvers and dynamic perturbation balance platforms to eliminate dizziness and restore equilibrium.'
        },
        {
          icon: 'fas fa-shoe-prints',
          title: 'Gait Symmetry & Body-Weight Supported Training',
          color: 'text-info',
          desc: 'Safe harness-supported treadmill and overground gait retraining to rebuild natural stride cadence without fall apprehension.'
        }
      ],
      packages: [
        {
          name: 'Neuro Functional Baseline',
          sessions: '6 Sessions (3 Weeks)',
          features: 'Comprehensive neurological sensory-motor evaluation, Berg balance assessment, vestibular screening, home safety audit',
          price: '$570'
        },
        {
          name: 'Neuroplasticity Recovery Track (Recommended)',
          sessions: '12 Sessions (6 Weeks)',
          features: 'Task-specific gait training, spasticity management, dynamic balance therapy, family/caregiver transfer training',
          price: '$1,080'
        },
        {
          name: 'Comprehensive Neurological Mastery',
          sessions: '18 Sessions (9 Weeks)',
          features: 'Full independence protocol, community mobility excursions, dual-task cognitive-motor drills, 6-month maintenance plan',
          price: '$1,550'
        }
      ],
      faqs: [
        {
          question: 'Can someone still make progress years after having a stroke?',
          answer: 'Yes. While the fastest recovery occurs in the first six months, clinical neuroscience has proven that neuroplastic gains can be achieved even decades post-stroke through structured, high-intensity functional training.'
        },
        {
          question: 'What is LSVT BIG for Parkinson’s disease?',
          answer: 'LSVT BIG is an intensive, evidence-based therapy protocol that trains individuals with Parkinson’s to use larger movement amplitudes, counteracting the small, shuffled movements (hypokinesia) typical of the disease.'
        },
        {
          question: 'Can vestibular rehabilitation fix my room-spinning dizziness (vertigo)?',
          answer: 'In over 90% of BPPV cases, targeted canalith repositioning procedures (such as the Epley maneuver) performed in our clinic resolve vertigo symptoms completely within 1 to 2 sessions.'
        }
      ],
      specialist: {
        name: 'Dr. Elena Rostova',
        credentials: 'PT, NCS • Board-Certified Neurological Specialist',
        bio: '14+ years specializing in neuroplastic retraining, Parkinson\'s LSVT BIG therapy, multiple sclerosis mobility, and vestibular balance recovery.',
        image: 'assets/images/therapist-rostova.jpg',
        link: 'therapist-details.html?id=rostova'
      },
      relatedTherapies: [
        { name: 'Senior Physiotherapy & Balance', id: 'senior-physio' },
        { name: 'Home Visit Physiotherapy', id: 'home-visit' },
        { name: 'Muscle & Mobility Therapy', id: 'muscle-mobility' },
        { name: 'Chronic Pain Management', id: 'chronic-pain' }
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

    'posture-correction': {
      id: 'posture-correction',
      slug: 'posture-correction',
      badgeTag: 'Spinal Alignment & Ergonomics',
      category: 'spine',
      metaDescription: 'Posture correction physical therapy and ergonomic consulting at PhysioLife. Eliminate tech neck, kyphosis, anterior pelvic tilt, and office fatigue with spinal realignment.',
      title: 'Posture Correction & Ergonomics',
      subtitle: 'Biomechanical spinal alignment addressing text neck, kyphosis, anterior pelvic tilt, and modern desk ergonomics.',
      heroImage: 'assets/images/service-posture.jpg',
      heroAlt: 'Posture correction, spinal alignment and workstation ergonomic evaluation',
      overview: [
        'Prolonged sedentary screen time and forward-leaning postures impart immense strain on the cervical spine and posterior kinetic chain. For every inch your head drifts forward, an extra 10 pounds of mechanical shear is loaded onto delicate cervical discs and paraspinal muscles.',
        'At PhysioLife, our postural correction program analyzes your static sagittal alignment, seated desk ergonomics, and dynamic spinal mechanics. We combine cervical retraction retraining, thoracic mobilization, deep neck flexor strengthening, and ergonomic adjustments to eliminate fatigue and revitalize upright vitality.'
      ],
      symptoms: [
        'Forward Head Posture ("Tech Neck") & Cervical Strain',
        'Thoracic Hyper-Kyphosis ("Hunched Upper Back")',
        'Anterior Pelvic Tilt & Lower Crossed Syndrome',
        'Repetitive Strain Injury (RSI) & Carpal Tunnel Discomfort',
        'Interscapular Burning Pain Between Shoulder Blades',
        'Desk-Related Muscle Exhaustion & Lumbar Fatigue'
      ],
      modalityImage: 'assets/images/blog-ergonomics.jpg',
      modalityAlt: 'Workstation ergonomic assessment and spinal posture correction',
      modalities: [
        {
          icon: 'fas fa-street-view',
          title: 'Biomechanical Photogrammetry Posture Analysis',
          color: 'text-primary',
          desc: 'High-precision digital mapping of cranial plumb lines, shoulder tilt, and pelvic rotation to guide corrective exercises.'
        },
        {
          icon: 'fas fa-laptop-medical',
          title: 'Workstation Ergonomic Prescription',
          color: 'text-secondary',
          desc: 'Custom monitor height, lumbar curvature, elbow angles, and sit-stand interval recommendations tailored to your setup.'
        },
        {
          icon: 'fas fa-link',
          title: 'Deep Postural Stabilizer Muscle Conditioning',
          color: 'text-info',
          desc: 'Targeted strengthening of longus colli, lower trapezius, serratus anterior, and transverse abdominis to hold upright posture effortlessly.'
        }
      ],
      packages: [
        {
          name: 'Postural Screen & Quick Fix',
          sessions: '3 Sessions (2 Weeks)',
          features: 'Digital posture screen, ergonomic workstation audit checklist, 4 fundamental corrective desk drills',
          price: '$290'
        },
        {
          name: 'Complete Postural Realignment (Recommended)',
          sessions: '8 Sessions (4 Weeks)',
          features: 'Comprehensive manual thoracic mobilization, deep neck flexor training, pelvic realignment, custom app reminders',
          price: '$690'
        },
        {
          name: 'Ergonomic Mastery & Lifestyle Blueprint',
          sessions: '14 Sessions (7 Weeks)',
          features: 'Full structural remodeling, ergonomic virtual home office inspection, long-term posture endurance conditioning',
          price: '$1,120'
        }
      ],
      faqs: [
        {
          question: 'Can forward head posture and rounded shoulders really be reversed?',
          answer: 'Yes. With targeted manual thoracic extension, pectoral stretching, and deep cervical flexor strengthening, adult posture can be dramatically corrected and stabilized within a few short weeks.'
        },
        {
          question: 'Do posture braces or back correctors work?',
          answer: 'Passive posture braces can provide temporary awareness, but relying on them weakens your intrinsic postural muscles over time. Active muscle strengthening and ergonomic habit training provide true, lasting correction.'
        },
        {
          question: 'Do you offer remote ergonomic workstation evaluations?',
          answer: 'Yes. Our clinical team offers virtual ergonomic consultations where we review photos of your current desk, chair, monitor, and keyboard setup and provide a written optimization roadmap.'
        }
      ],
      specialist: {
        name: 'Dr. Maya Patel',
        credentials: 'PT, DPT, CEAS • Ergonomic Assessment & Biomechanics Lead',
        bio: '9+ years diagnosing modern postural syndromes, forward-head desk posture, ergonomic workstation redesign, and scapular stabilization.',
        image: 'assets/images/therapist-patel.jpg',
        link: 'therapist-details.html?id=patel'
      },
      relatedTherapies: [
        { name: 'Back & Neck Pain Therapy', id: 'spine-neck' },
        { name: 'Muscle & Mobility Therapy', id: 'muscle-mobility' },
        { name: 'Chronic Pain Management', id: 'chronic-pain' },
        { name: 'Sports Injury Rehabilitation', id: 'sports-injury' }
      ],
      relatedArticles: [
        {
          slug: 'complete-ergonomic-workstation-blueprint',
          title: 'The Complete Ergonomic Workstation Blueprint for Remote Professionals',
          readTime: '8 min read',
          badge: 'Ergonomics'
        },
        {
          slug: 'forward-head-posture-tech-neck',
          title: 'Forward Head Posture & Tech Neck: 4 Corrective Cervical Drills',
          readTime: '6 min read',
          badge: 'Postural Drills'
        },
        {
          slug: 'lumbar-lordosis-pelvic-tilt',
          title: 'Lumbar Lordosis and Pelvic Tilt: Correcting Sagittal Spinal Alignment',
          readTime: '6 min read',
          badge: 'Pelvic Alignment'
        }
      ]
    },

    'senior-physio': {
      id: 'senior-physio',
      slug: 'senior-physio',
      badgeTag: 'Geriatric Rehabilitation & Fall Prevention',
      category: 'home',
      metaDescription: 'Gentle, empowering senior physiotherapy at PhysioLife. Fall prevention, osteopenia conditioning, vestibular balance training, and joint mobility to support vibrant aging.',
      title: 'Senior Physiotherapy & Balance',
      subtitle: 'Gentle fall-prevention programs, bone-density conditioning, and vestibular balance training to empower elderly independence.',
      heroImage: 'assets/images/service-senior.jpg',
      heroAlt: 'Senior physical therapy, balance retraining and geriatric mobility',
      overview: [
        'Aging gracefully should never mean accepting loss of balance, chronic joint stiffness, or fear of falling. With age-appropriate, evidence-based physical conditioning, older adults can preserve bone mineral density, maintain leg strength, and navigate daily life with supreme confidence.',
        'At PhysioLife, our geriatric specialists conduct comprehensive fall-risk assessments, vestibular screening, and safe progressive resistance training. We prioritize functional activities like getting up from low chairs, climbing stairs safely, and stepping over obstacles without tripping.'
      ],
      symptoms: [
        'Unsteadiness While Walking & Fear of Falling',
        'Osteopenia & Osteoporosis Fracture Risk Management',
        'Age-Related Sarcopenia & Lower Extremity Weakness',
        'Post-Fall Confidence Loss & Mobility Avoidance',
        'Degenerative Joint Stiffness in Knees & Hips',
        'Difficulty Rising From Low Chairs or Stepping Curbs'
      ],
      modalityImage: 'assets/images/step-assessment.jpg',
      modalityAlt: 'Senior mobility assessment and gentle balance retraining',
      modalities: [
        {
          icon: 'fas fa-user-shield',
          title: 'Multi-Directional Fall-Prevention Drills',
          color: 'text-primary',
          desc: 'Reactive stepping strategies, tandem stance training, and obstacle clearance in a safe, therapist-spotted setting.'
        },
        {
          icon: 'fas fa-bone',
          title: 'Bone-Loading Progressive Resistance Training',
          color: 'text-secondary',
          desc: 'Safe axial load-bearing exercises proven to preserve bone mineral density and stimulate osteoblast remodeling.'
        },
        {
          icon: 'fas fa-chair',
          title: 'Functional Transfer Mastery (Sit-to-Stand)',
          color: 'text-info',
          desc: 'Quad and glute power development ensuring easy, unassisted rising from chairs, beds, and vehicles.'
        }
      ],
      packages: [
        {
          name: 'Senior Mobility Check',
          sessions: '4 Sessions (2 Weeks)',
          features: 'Timed Up and Go (TUG) testing, 30-second chair stand audit, personalized gentle home exercise booklet',
          price: '$360'
        },
        {
          name: 'Independence & Balance (Recommended)',
          sessions: '10 Sessions (5 Weeks)',
          features: 'Progressive balance platform work, osteo-safe strengthening, assistive device optimization, family counseling',
          price: '$820'
        },
        {
          name: 'Golden Years Vitality Continuum',
          sessions: '16 Sessions (8 Weeks)',
          features: 'Full community mobility mastery, outdoor walking endurance drills, 6-month quarterly fall-check maintenance',
          price: '$1,260'
        }
      ],
      faqs: [
        {
          question: 'Is it safe for someone in their 70s or 80s to do resistance exercises?',
          answer: 'Not only is it safe, it is clinically necessary! Medical guidelines strongly recommend progressive resistance training for seniors to counteract muscle loss (sarcopenia) and prevent devastating hip fractures.'
        },
        {
          question: 'Can Medicare cover senior physical therapy?',
          answer: 'Yes. Medicare Part B covers outpatient physical therapy when prescribed by a medical physician. Our administrative team assists with Medicare documentation and claims directly.'
        },
        {
          question: 'What if getting to the clinic is too difficult or tiring?',
          answer: 'We offer specialized Home Visit Physiotherapy where our licensed physical therapist travels directly to your residence with all necessary evaluation and rehabilitation equipment.'
        }
      ],
      specialist: {
        name: 'Dr. Robert Hayes',
        credentials: 'PT, DPT, GCS • Board-Certified Geriatric Specialist',
        bio: '15+ years specializing in senior fall prevention, proprioceptive balance conditioning, safe osteoporosis strengthening, and vital independent living.',
        image: 'assets/images/therapist-hayes.jpg',
        link: 'therapist-details.html?id=hayes'
      },
      relatedTherapies: [
        { name: 'Home Visit Physiotherapy', id: 'home-visit' },
        { name: 'Neurological Rehabilitation', id: 'neurological' },
        { name: 'Joint Rehabilitation', id: 'joint-rehab' },
        { name: 'Back & Neck Pain Therapy', id: 'spine-neck' }
      ],
      relatedArticles: [
        {
          slug: 'understanding-knee-osteoarthritis',
          title: 'Understanding Knee Osteoarthritis: Movement as True Medicine',
          readTime: '6 min read',
          badge: 'Joint Health'
        },
        {
          slug: 'vestibular-rehabilitation-vertigo',
          title: 'Vestibular Rehabilitation: Canalith Repositioning & Balance Retraining for BPPV',
          readTime: '7 min read',
          badge: 'Balance Care'
        },
        {
          slug: '5-proven-exercises-for-sciatica',
          title: '5 Proven Exercises for Sciatica and Lower Back Pain Relief',
          readTime: '6 min read',
          badge: 'Pain Relief'
        }
      ]
    },

    'home-visit': {
      id: 'home-visit',
      slug: 'home-visit',
      badgeTag: 'Concierge In-Home Physical Therapy',
      category: 'home',
      metaDescription: 'Personalized in-home physical therapy delivered directly to your residence by PhysioLife. Ideal for post-operative recovery, seniors, and acute pain patients unable to travel.',
      title: 'Home Visit Physiotherapy',
      subtitle: 'Complete physical therapy and mobility treatment delivered directly to your private home for comfort, safety, and convenience.',
      heroImage: 'assets/images/service-home.jpg',
      heroAlt: 'In-home physical therapy session and home rehabilitation visit',
      overview: [
        'Traveling to an outpatient clinic can be stressful or physically impossible following major surgery, acute spinal spasms, or severe mobility limitations. PhysioLife’s Home Visit service brings the full expertise of our licensed physical therapists directly to your living room.',
        'We arrive with all necessary clinical equipment—portable treatment plinths, resistance bands, neuromuscular stimulation devices, and balance aids. By evaluating and treating you in your real living environment, we solve actual home obstacles like bed transfers, bathroom accessibility, and stair navigation.'
      ],
      symptoms: [
        'Acute Post-Surgical Knee & Hip Replacement Recovery',
        'Severe Spinal Disc Flare-Ups Unable to Sit or Drive',
        'Elderly Individuals With Transportation Difficulties',
        'Neurological Stroke Patients Requiring Home Adaptation',
        'Busy Executives Demanding Concierge Care at Home',
        'Post-Fall Recovery Requiring Home Environment Safety Audit'
      ],
      modalityImage: 'assets/images/clinic-intro-consult.jpg',
      modalityAlt: 'Home therapy consultation and ergonomic home environment adaptation',
      modalities: [
        {
          icon: 'fas fa-house-user',
          title: 'Living Environment Accessibility & Safety Audit',
          color: 'text-primary',
          desc: 'Immediate identification and modification of throw rugs, lighting, and grab-bar locations to eliminate in-home fall risks.'
        },
        {
          icon: 'fas fa-hands-helping',
          title: 'One-on-One Manual Therapy in Your Home',
          color: 'text-secondary',
          desc: 'Uncompromised clinical manual articulation, scar mobilization, and stretching delivered in absolute privacy.'
        },
        {
          icon: 'fas fa-bed',
          title: 'Real-World Functional Transfer Training',
          color: 'text-info',
          desc: 'Direct practice of your specific bed, favorite armchair, shower entry, and front porch steps to build immediate self-reliance.'
        }
      ],
      packages: [
        {
          name: 'Home Evaluation & Relief Track',
          sessions: '3 In-Home Visits (1–2 Weeks)',
          features: 'Comprehensive in-home clinical diagnostic, home environment hazard survey, initial pain-relief treatment, caregiver training',
          price: '$450'
        },
        {
          name: 'Total Home Recovery Program (Recommended)',
          sessions: '8 In-Home Visits (4 Weeks)',
          features: 'Full post-op or balance recovery, portable equipment sessions, stair navigation mastery, weekly clinical documentation',
          price: '$1,120'
        },
        {
          name: 'Full Independence & Transition',
          sessions: '14 In-Home Visits (7 Weeks)',
          features: 'Comprehensive multi-week restoration, outpatient clinic transition coaching, lifelong home safety maintenance roadmap',
          price: '$1,890'
        }
      ],
      faqs: [
        {
          question: 'What areas does your home visit therapy service cover?',
          answer: 'Our home therapy team covers the entire metropolitan area and surrounding suburbs within a 25-mile radius of our main clinic. Contact our intake coordinator to verify your specific address.'
        },
        {
          question: 'Do I need to provide any equipment for the home visit?',
          answer: 'No. Our licensed physical therapist brings everything needed for a comprehensive clinical session, including treatment mats, sanitization supplies, exercise bands, and electrotherapy equipment.'
        },
        {
          question: 'Can I transition to clinic visits once my mobility improves?',
          answer: 'Yes! In fact, many of our post-op patients start with 2 to 3 weeks of home visits and seamlessly transition to our outpatient clinic once driving and walking become comfortable.'
        }
      ],
      specialist: {
        name: 'Dr. Hannah Al-Mansoor',
        credentials: 'PT, DPT • Mobile Physical Therapy & Home Care Director',
        bio: '9+ years bringing hospital-grade orthopedic and neuromuscular physical therapy directly into patients\' living rooms and private residences.',
        image: 'assets/images/therapist-almansoor.jpg',
        link: 'therapist-details.html?id=almansoor'
      },
      relatedTherapies: [
        { name: 'Senior Physiotherapy & Balance', id: 'senior-physio' },
        { name: 'Post-Surgery Rehabilitation', id: 'post-surgery' },
        { name: 'Neurological Rehabilitation', id: 'neurological' },
        { name: 'Back & Neck Pain Therapy', id: 'spine-neck' }
      ],
      relatedArticles: [
        {
          slug: 'total-knee-arthroplasty-rehab',
          title: 'Total Knee Replacement: 12-Week Range of Motion & Gait Roadmap',
          readTime: '7 min read',
          badge: 'Post-Op Care'
        },
        {
          slug: '5-proven-exercises-for-sciatica',
          title: '5 Proven Exercises for Sciatica and Lower Back Pain Relief',
          readTime: '6 min read',
          badge: 'Pain Relief'
        },
        {
          slug: 'understanding-knee-osteoarthritis',
          title: 'Understanding Knee Osteoarthritis: Movement as True Medicine',
          readTime: '6 min read',
          badge: 'Mobility'
        }
      ]
    },
    'pediatric-care': {
      id: 'pediatric-care',
      slug: 'pediatric-care',
      title: 'Pediatric Physical Therapy & Development',
      badgeTag: 'Pediatric Rehabilitation Specialization',
      subtitle: 'Gentle developmental motor retraining, congenital condition therapy, and pediatric coordination programs.',
      heroImage: 'assets/images/service-pediatric.jpg',
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
          answer: 'We evaluate your child\'s motor skills, joint mobility, muscle tone, primitive reflexes, and functional movement through gentle, playful games and standardized developmental screening tests in a relaxed environment.'
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
        name: 'Dr. Emily Watson',
        credentials: 'PT, DPT, PCS • Board-Certified Pediatric Specialist',
        bio: '11+ years helping infants, children, and adolescents overcome torticollis, gross motor delays, toe walking, and congenital movement disorders.',
        image: 'assets/images/therapist-watson.jpg',
        link: 'therapist-details.html?id=watson'
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
      id: 'aquatic-therapy',
      slug: 'aquatic-therapy',
      title: 'Aquatic & Hydrotherapy Rehabilitation',
      badgeTag: 'Hydrotherapy & Low-Impact Recovery',
      subtitle: 'Specialized heated aquatic physical therapy utilizing water buoyancy to eliminate joint loading and restore painless mobility.',
      heroImage: 'assets/images/service-aquatic.jpg',
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
        name: 'Dr. Tyler Brooks',
        credentials: 'PT, DPT, ATRI-C • Certified Aquatic Rehabilitation Director',
        bio: '8+ years utilizing hydrostatic buoyancy, fluid thermal dynamics, and zero-gravity water rehabilitation for weight-bearing restricted patients.',
        image: 'assets/images/therapist-brooks.jpg',
        link: 'therapist-details.html?id=brooks'
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

    'stroke-rehab': {
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
          answer: 'Physical therapy typically begins within 24 to 48 hours in the hospital, and outpatient neuro-rehab should initiate as soon as the patient is medically stable. Early, intensive movement training capitalizes on the brain\'s heightened neuroplastic potential during the first 3 to 6 months.'
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
        name: 'Dr. Alexei Voronov',
        credentials: 'PT, DPT, CBIS • Certified Brain Injury & Stroke Fellow',
        bio: '12+ years directing acute and chronic post-stroke neuroplasticity, hemiparetic gait retraining, constraint-induced movement therapy, and functional balance.',
        image: 'assets/images/therapist-voronov.jpg',
        link: 'therapist-details.html?id=voronov'
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
        name: 'Dr. Sophie Laurent',
        credentials: 'PT, DPT, VRT • Vestibular Oculomotor & Balance Specialist',
        bio: '10+ years treating benign paroxysmal positional vertigo (BPPV), persistent dizziness, vestibular neuritis, and post-concussion visual tracking.',
        image: 'assets/images/therapist-laurent.jpg',
        link: 'therapist-details.html?id=laurent'
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

    'postop-tendon': {
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
        name: 'Dr. James Sterling',
        credentials: 'PT, DPT, SCS, FAAOMPT • Tendon Reconstruction Fellow',
        bio: '13+ years guiding post-surgical tendon repairs (rotator cuff, Achilles, patellar tendon) through safe mechanical loading and tensile collagen alignment.',
        image: 'assets/images/therapist-sterling.jpg',
        link: 'therapist-details.html?id=sterling'
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

    'runners-gait': {
      id: 'runners-gait',
      slug: 'runners-gait',
      badgeTag: 'Sports Biomechanics & Running Analysis',
      category: 'sports',
      metaDescription: 'Specialized running injury rehabilitation and computerized 3D gait analysis at PhysioLife. High-speed video kinematics, cadence retraining, and kinetic chain conditioning for runners.',
      title: 'Runner\'s Injury & 3D Gait Analysis',
      subtitle: 'High-speed digital video motion analysis, kinetic stride retraining, and personalized recovery for endurance runners and athletes.',
      heroImage: 'assets/images/service-runners-gait.jpg',
      heroImg: 'assets/images/service-runners-gait.jpg',
      heroAlt: 'Computerized 3D running gait analysis and biomechanical assessment in sports medicine clinic',
      overview: [
        'Over 65% of runners and endurance athletes suffer repetitive overuse injuries each year, largely precipitated by subtle kinetic breakdown, overstriding, asymmetric foot-strike impact, or gluteal inhibition. At PhysioLife, our Sports Biomechanics Lab integrates high-speed digital motion cameras, infrared reflective joint tracking, and computerized ground force measurement.',
        'Rather than treating symptoms with passive rest alone, our sports physical therapists analyze your complete running gait cycle from initial contact to toe-off. We prescribe real-time metronome cadence retraining, eccentric posterior chain loading, shoe prescription optimization, and video biofeedback so you can run faster, pain-free, and injury-resilient.'
      ],
      symptoms: [
        'Patellofemoral Pain Syndrome (Runner\'s Knee)',
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
          name: 'Comprehensive Runner\'s Assessment',
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
          question: 'How does changing my cadence help eliminate runner\'s knee and shin splints?',
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
        name: 'Dr. Nathan Cross',
        credentials: 'PT, DPT, CSCS • 3D Running Kinematics & Biomechanics Lead',
        bio: '9+ years analyzing force-plate foot strike patterns, cadence optimization, and customized gait retraining to eliminate shin splints and runner\'s knee.',
        image: 'assets/images/therapist-cross.jpg',
        link: 'therapist-details.html?id=cross'
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

  };

  // =========================================================================
  // 2. Query Parameter Parser & Alias Normalization
  // =========================================================================
  function getRequestedServiceId() {
    let raw = '';

    // 1. Check window.location.search (?service=... or ?slug=... or ?id=...)
    try {
      if (typeof window !== 'undefined' && window.location && window.location.search) {
        const params = new URLSearchParams(window.location.search);
        raw = (params.get('service') || params.get('slug') || params.get('id') || params.get('protocol') || '').toLowerCase().trim();
      }
    } catch (e) {}

    // 2. Check window.location.hash (#sports-injury or #service=sports-injury)
    if (!raw && typeof window !== 'undefined' && window.location && window.location.hash) {
      const hash = window.location.hash.replace(/^#/, '').trim();
      if (hash.includes('=')) {
        try {
          const hashParams = new URLSearchParams(hash);
          raw = (hashParams.get('service') || hashParams.get('slug') || hashParams.get('id') || '').toLowerCase().trim();
        } catch (e) {}
      } else {
        raw = hash.toLowerCase();
      }
    }

    // 3. Check sessionStorage fallback (persists when navigating via local file:// protocol)
    if (!raw && typeof window !== 'undefined' && window.sessionStorage) {
      try {
        raw = (window.sessionStorage.getItem('physiolife_active_service') || '').toLowerCase().trim();
      } catch (e) {}
    }

    // 4. Check localStorage fallback
    if (!raw && typeof window !== 'undefined' && window.localStorage) {
      try {
        raw = (window.localStorage.getItem('physiolife_active_service') || '').toLowerCase().trim();
      } catch (e) {}
    }

    if (!raw) return 'spine-neck';

    // Direct key match
    if (SERVICES_DATA[raw]) {
      try {
        if (typeof window !== 'undefined' && window.sessionStorage) {
          window.sessionStorage.setItem('physiolife_active_service', raw);
        }
      } catch (e) {}
      return raw;
    }

    // Alias map for common variations or protocol slugs
    const aliasMap = {
      'pediatric': 'pediatric-care',
      'pediatrics': 'pediatric-care',
      'pediatric-care': 'pediatric-care',
      'child': 'pediatric-care',
      'children': 'pediatric-care',
      'aquatic': 'aquatic-therapy',
      'aquatics': 'aquatic-therapy',
      'aquatic-therapy': 'aquatic-therapy',
      'hydrotherapy': 'aquatic-therapy',
      'pool': 'aquatic-therapy',
      'sports': 'sports-injury',
      'sports-injuries': 'sports-injury',
      'sports-injury-rehabilitation': 'sports-injury',
      'acl': 'sports-injury',
      'postop': 'post-surgery',
      'post-op': 'post-surgery',
      'surgery': 'post-surgery',
      'post-surgical': 'post-surgery',
      'post-surgical-rehabilitation': 'post-surgery',
      'chronic': 'chronic-pain',
      'chronic-pain-management': 'chronic-pain',
      'pain': 'chronic-pain',
      'spine': 'spine-neck',
      'neck': 'spine-neck',
      'sciatica': 'spine-neck',
      'back-neck': 'spine-neck',
      'back-and-neck': 'spine-neck',
      'joint': 'joint-rehab',
      'joint-rehabilitation': 'joint-rehab',
      'joints': 'joint-rehab',
      'arthritis': 'joint-rehab',
      'mobility': 'muscle-mobility',
      'muscle': 'muscle-mobility',
      'muscle-mobility-therapy': 'muscle-mobility',
      'neuro': 'neurological',
      'neurology': 'neurological',
      'neurological-rehabilitation': 'neurological',
      'posture': 'posture-correction',
      'ergonomics': 'posture-correction',
      'posture-correction-ergonomics': 'posture-correction',
      'senior': 'senior-physio',
      'geriatric': 'senior-physio',
      'senior-physiotherapy': 'senior-physio',
      'senior-physiotherapy-balance': 'senior-physio',
      'home': 'home-visit',
      'home-visit-physiotherapy': 'home-visit',
      'in-home': 'home-visit',
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
      'balance': 'vestibular-rehab',
      'postop-tendon': 'postop-tendon',
      'post-op-tendon': 'postop-tendon',
      'tendon': 'postop-tendon',
      'tendon-repair': 'postop-tendon',
      'rotator-cuff': 'postop-tendon',
      'rotator-cuff-repair': 'postop-tendon',
      'ligament': 'postop-tendon',
      'ligament-reconstruction': 'postop-tendon',
      'runners-gait': 'runners-gait',
      'runners-clinic': 'runners-gait',
      'running': 'runners-gait',
      'gait-analysis': 'runners-gait',
      'runners-knee': 'runners-gait',
      'running-injury': 'runners-gait'
    };

    if (aliasMap[raw]) {
      const resolved = aliasMap[raw];
      try {
        if (typeof window !== 'undefined' && window.sessionStorage) {
          window.sessionStorage.setItem('physiolife_active_service', resolved);
        }
      } catch (e) {}
      return resolved;
    }

    // Check partial string matching
    for (const key of Object.keys(SERVICES_DATA)) {
      if (raw.includes(key) || key.includes(raw)) {
        try {
          if (typeof window !== 'undefined' && window.sessionStorage) {
            window.sessionStorage.setItem('physiolife_active_service', key);
          }
        } catch (e) {}
        return key;
      }
    }

    // Default fallback
    return 'spine-neck';
  }

  // =========================================================================
  // 3. Dynamic DOM Renderer on service-details.html
  // =========================================================================
  function renderServiceDetails() {
    // Only run on service-details.html
    const isServiceDetails =
      (typeof window !== 'undefined' && window.location && window.location.pathname.toLowerCase().includes('service-details')) ||
      (typeof window !== 'undefined' && window.location && window.location.href.toLowerCase().includes('service-details')) ||
      document.getElementById('serviceDetailsRoot') ||
      document.getElementById('serviceTitle') ||
      document.getElementById('serviceHeroImg');

    if (!isServiceDetails) return;

    const serviceId = getRequestedServiceId();
    const service = SERVICES_DATA[serviceId] || SERVICES_DATA['spine-neck'];

    // 1. Page Title & Meta
    document.title = `${service.title} – PhysioLife Clinic`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && service.metaDescription) {
      metaDesc.setAttribute('content', service.metaDescription);
    }

    // 2. Breadcrumb & Badge
    const breadcrumb = document.getElementById('serviceBreadcrumb');
    if (breadcrumb) {
      breadcrumb.textContent = service.title;
    }
    const badgeTag = document.getElementById('serviceBadgeTag');
    if (badgeTag) {
      badgeTag.textContent = service.badgeTag;
    }

    // 3. Hero Title & Subtitle
    const titleEl = document.getElementById('serviceTitle');
    if (titleEl) {
      titleEl.textContent = service.title;
    }
    const subtitleEl = document.getElementById('serviceSubtitle');
    if (subtitleEl) {
      subtitleEl.textContent = service.subtitle;
    }

    // 4. Hero Image
    const heroImg = document.getElementById('serviceHeroImg');
    if (heroImg) {
      heroImg.src = service.heroImage || service.heroImg || 'assets/images/service-spine.jpg';
      heroImg.alt = service.heroAlt || service.title;
    }

    // 5. Clinical Overview
    const overviewContainer = document.getElementById('serviceOverviewContainer');
    if (overviewContainer && Array.isArray(service.overview)) {
      overviewContainer.innerHTML = service.overview.map(p => `<p>${p}</p>`).join('');
    }

    // 6. Symptoms Addressed (6 items)
    const symptomsContainer = document.getElementById('serviceSymptomsContainer');
    if (symptomsContainer && Array.isArray(service.symptoms)) {
      symptomsContainer.innerHTML = service.symptoms.map(sym => `
        <div class="col-md-6">
          <div class="p-3 bg-surface-alt rounded-3 border border-subtle d-flex align-items-center gap-3 h-100">
            <i class="fas fa-check-circle text-primary fs-5 flex-shrink-0"></i>
            <span class="fw-semibold text-main">${sym}</span>
          </div>
        </div>
      `).join('');
    }

    // 7. Treatment Modalities
    const modalityImg = document.getElementById('serviceModalityImg');
    if (modalityImg) {
      modalityImg.src = service.modalityImage || service.modalitiesImg || 'assets/images/anatomy-spine.svg';
      modalityImg.alt = service.modalityAlt || `${service.title} treatment modalities`;
    }

    const modalitiesContainer = document.getElementById('serviceModalitiesContainer');
    if (modalitiesContainer && Array.isArray(service.modalities)) {
      modalitiesContainer.innerHTML = service.modalities.map(m => `
        <div class="mb-3">
          <h5 class="fw-bold ${m.color || 'text-primary'} mb-1"><i class="${m.icon || 'fas fa-check'} me-2"></i> ${m.title}</h5>
          <p class="small text-muted mb-0">${m.desc}</p>
        </div>
      `).join('');
    }

    // 8. Treatment Pricing Packages Table
    const pricingTableHeading = document.getElementById('servicePricingHeading');
    if (pricingTableHeading) {
      pricingTableHeading.textContent = `${service.title} Care Packages`;
    }
    const pricingTbody = document.getElementById('servicePricingTbody');
    if (pricingTbody && Array.isArray(service.packages)) {
      pricingTbody.innerHTML = service.packages.map(pkg => `
        <tr>
          <td><strong>${pkg.name}</strong></td>
          <td>${pkg.sessions}</td>
          <td>${pkg.features}</td>
          <td><strong class="text-primary fs-5">${pkg.price}</strong></td>
        </tr>
      `).join('');
    }

    // 9. FAQs Accordion
    const faqAccordion = document.getElementById('serviceFaqAccordion');
    if (faqAccordion && Array.isArray(service.faqs)) {
      faqAccordion.innerHTML = service.faqs.map((faq, idx) => {
        const isFirst = idx === 0;
        const collapseId = `serviceFaqCol${idx + 1}`;
        const headingId = `serviceFaqHead${idx + 1}`;
        return `
          <div class="accordion-item">
            <h2 class="accordion-header" id="${headingId}">
              <button class="accordion-button ${isFirst ? '' : 'collapsed'}" type="button" data-bs-toggle="collapse" data-bs-target="#${collapseId}" aria-expanded="${isFirst ? 'true' : 'false'}" aria-controls="${collapseId}">
                ${faq.question}
              </button>
            </h2>
            <div id="${collapseId}" class="accordion-collapse collapse ${isFirst ? 'show' : ''}" aria-labelledby="${headingId}" data-bs-parent="#serviceFaqAccordion">
              <div class="accordion-body">
                ${faq.answer}
              </div>
            </div>
          </div>
        `;
      }).join('');
    }

    // 10. Sidebar Specialist Card
    if (service.specialist) {
      const specImg = document.getElementById('serviceSpecialistImg');
      if (specImg && service.specialist.image) specImg.src = service.specialist.image;
      const specName = document.getElementById('serviceSpecialistName');
      if (specName) specName.textContent = service.specialist.name;
      const specRole = document.getElementById('serviceSpecialistRole');
      if (specRole) specRole.textContent = service.specialist.credentials;
      const specBio = document.getElementById('serviceSpecialistBio');
      if (specBio) specBio.textContent = service.specialist.bio;
      const specLink = document.getElementById('serviceSpecialistLink');
      if (specLink && service.specialist.link) specLink.href = service.specialist.link;
    }

    // 11. Related Therapies List
    const relatedList = document.getElementById('serviceRelatedList');
    if (relatedList && Array.isArray(service.relatedTherapies)) {
      relatedList.innerHTML = service.relatedTherapies.map((rel, idx) => {
        const isLast = idx === service.relatedTherapies.length - 1;
        return `
          <li class="py-2 ${isLast ? '' : 'border-bottom border-subtle'} d-flex justify-content-between align-items-center">
            <a href="service-details.html?service=${encodeURIComponent(rel.id)}" class="text-main fw-semibold text-decoration-none hover-primary">
              ${rel.name}
            </a>
            <i class="fas fa-chevron-right text-muted small"></i>
          </li>
        `;
      }).join('');
    }

    // 12. Related Clinical Articles (In-depth Blog Guides)
    const relatedArticlesSection = document.getElementById('serviceRelatedArticlesSection');
    const relatedArticlesContainer = document.getElementById('serviceRelatedArticlesContainer');
    if (relatedArticlesContainer && Array.isArray(service.relatedArticles) && service.relatedArticles.length > 0) {
      if (relatedArticlesSection) relatedArticlesSection.style.display = 'block';
      relatedArticlesContainer.innerHTML = service.relatedArticles.map(art => `
        <div class="col-md-6 col-lg-4">
          <div class="card h-100 border border-subtle shadow-sm p-3 rounded-3 bg-surface-alt">
            <span class="badge bg-primary-subtle text-primary w-auto align-self-start mb-2 px-2 py-1">${art.badge}</span>
            <h6 class="fw-bold text-main mb-2">
              <a href="blog-details.html?slug=${encodeURIComponent(art.slug)}" class="text-main text-decoration-none hover-primary">
                ${art.title}
              </a>
            </h6>
            <div class="mt-auto pt-2 d-flex align-items-center justify-content-between small text-muted">
              <span><i class="far fa-clock me-1"></i> ${art.readTime}</span>
              <a href="blog-details.html?slug=${encodeURIComponent(art.slug)}" class="text-primary fw-semibold text-decoration-none">
                Read Guide <i class="fas fa-arrow-right small ms-1"></i>
              </a>
            </div>
          </div>
        </div>
      `).join('');
    } else if (relatedArticlesSection) {
      relatedArticlesSection.style.display = 'none';
    }

    // 13. Pre-select in booking modal if available
    const serviceToModalVal = {
      'sports-injury': 'sports',
      'post-surgery': 'postop',
      'chronic-pain': 'chronic',
      'spine-neck': 'spine',
      'joint-rehab': 'joint',
      'muscle-mobility': 'mobility',
      'neurological': 'neuro',
      'posture-correction': 'posture',
      'senior-physio': 'senior',
      'home-visit': 'home',
      'pediatric-care': 'pediatric',
      'aquatic-therapy': 'aquatic',
      'stroke-rehab': 'neuro',
      'vestibular-rehab': 'neuro',
      'postop-tendon': 'postop',
      'runners-gait': 'sports'
    };
    const modalServiceSelect = document.getElementById('bookService');
    if (modalServiceSelect && serviceToModalVal[serviceId]) {
      modalServiceSelect.value = serviceToModalVal[serviceId];
    }

    const serviceToTherapistVal = {
      'sports-injury': 'vance',
      'post-surgery': 'chen',
      'chronic-pain': 'bennett',
      'spine-neck': 'jenkins',
      'joint-rehab': 'reed',
      'muscle-mobility': 'gallagher',
      'neurological': 'rostova',
      'posture-correction': 'jenkins',
      'senior-physio': 'hayes',
      'home-visit': 'almansoor',
      'pediatric-care': 'watson',
      'aquatic-therapy': 'brooks',
      'stroke-rehab': 'voronov',
      'vestibular-rehab': 'laurent',
      'postop-tendon': 'sterling',
      'runners-gait': 'cross'
    };
    const modalTherapistSelect = document.getElementById('bookTherapist');
    if (modalTherapistSelect && serviceToTherapistVal[serviceId]) {
      modalTherapistSelect.value = serviceToTherapistVal[serviceId];
    }
  }

  // =========================================================================
  // 4. Global Click Delegation & Active Service Storage
  // =========================================================================
  function initServiceClickDelegation() {
    document.addEventListener('click', function (e) {
      // 1. Any link to service-details.html
      const link = e.target.closest('a[href*="service-details.html"]');
      if (link) {
        const href = link.getAttribute('href') || '';
        const match = href.match(/[?&]service=([^&#]+)/i) || href.match(/#([^&#]+)/);
        if (match && match[1]) {
          try {
            if (typeof window !== 'undefined' && window.sessionStorage) {
              window.sessionStorage.setItem('physiolife_active_service', decodeURIComponent(match[1]));
            }
          } catch (err) {}
        }
        return;
      }

      // 2. Click anywhere on .service-card (card container)
      const card = e.target.closest('.service-card');
      if (card && !e.target.closest('a') && !e.target.closest('button')) {
        const targetLink = card.querySelector('a[href*="service-details.html"]');
        if (targetLink) {
          const href = targetLink.getAttribute('href');
          const match = href.match(/[?&]service=([^&#]+)/i);
          if (match && match[1]) {
            try {
              if (typeof window !== 'undefined' && window.sessionStorage) {
                window.sessionStorage.setItem('physiolife_active_service', decodeURIComponent(match[1]));
              }
            } catch (err) {}
          }
          window.location.href = href;
        }
      }
    });
  }

  // Auto-init on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      renderServiceDetails();
      initServiceClickDelegation();
    });
  } else {
    renderServiceDetails();
    initServiceClickDelegation();
  }

  // Listen for browser navigation / history events
  window.addEventListener('popstate', renderServiceDetails);
  window.addEventListener('hashchange', renderServiceDetails);

  // Export to global scope
  window.PhysioLifeServices = {
    getAllServices: () => SERVICES_DATA,
    getService: (id) => SERVICES_DATA[id],
    getRequestedServiceId: getRequestedServiceId,
    renderServiceDetails: renderServiceDetails
  };

})();
