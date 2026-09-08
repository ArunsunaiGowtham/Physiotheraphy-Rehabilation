/**
 * PhysioLife - Centralized Blog Engine & Article Navigation Router
 * Manages post dataset, unique slug routing, real-time client-side filtering,
 * live keyword search, and dynamic single-article rendering on blog-details.html.
 * Author: Antigravity
 * Version: 3.0.0
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. Centralized Blog Articles Database (31 Unique Clinical Guides)
  // =========================================================================
  const ALL_ARTICLES = [
    // --- Featured Guides ---
    {
      id: 'sciatica-exercises',
      slug: '5-proven-exercises-for-sciatica',
      title: '5 Proven Exercises for Sciatica and Lower Back Pain Relief',
      category: 'Pain Relief',
      categorySlug: 'pain-relief',
      badge: 'Featured · Pain Relief',
      isFeaturedCategory: 'pain-relief', // also serves as default 'all' featured
      description: 'Learn the exact mechanical triggers behind piriformis compression and discover five clinical stretches designed to decompress the sciatic nerve safely from home.',
      image: 'assets/images/blog-sciatica.jpg',
      author: 'Dr. Sarah Jenkins',
      authorRole: 'Clinical Director & Orthopedic Spine Specialist',
      authorImg: 'assets/images/therapist-jenkins.jpg',
      date: 'Sep 2, 2026',
      readingTime: '6 min read',
      tags: 'sciatica lower back pain piriformis decompression nerve pain spine pain relief exercise',
      relatedSlugs: ['chronic-myofascial-pain-trigger-point', 'nerve-flossing-techniques', 'understanding-knee-osteoarthritis'],
      content: `
        <p class="lead text-main">
          Sciatica is not a distinct disease entity in itself, but rather a clinical symptom complex indicating mechanical compression or inflammatory irritation of the large sciatic nerve roots (L4 through S3).
        </p>
        <p>
          When a lower lumbar intervertebral disc herniates posteriorly or the overlying piriformis muscle spasms chronically, debilitating radiating pain, numbness, or lancinating tingling travels through the gluteal fold and down the posterior thigh. Fortunately, over 85% of acute sciatica cases resolve completely through targeted biomechanical decompression without surgical intervention.
        </p>

        <div class="p-4 bg-surface-alt border-start border-4 border-primary rounded-3 my-4">
          <p class="fst-italic mb-0 text-main fw-semibold">
            "Centralization is our primary clinical milestone: as you execute directional preference extensions, radiating calf and foot symptoms should retreat upward toward the lower back. This confirms true nerve root decompression."
          </p>
          <small class="text-muted d-block mt-2">— Dr. Sarah Jenkins, Clinical Director</small>
        </div>

        <h3 class="h3 mt-5 mb-3">1. The Prone Press-Up (McKenzie Extension)</h3>
        <img src="assets/images/blog-mckenzie-pressup.jpg" alt="Prone Press-Up McKenzie Extension Exercise" class="rounded-3 my-3 w-100 object-fit-cover shadow-sm" style="max-height: 280px;">
        <p>
          Lie prone on a firm treatment surface with palms positioned flat underneath your shoulders. Relax your glutes, pelvic girdle, and lumbar paraspinals entirely. Slowly press your upper chest away from the mat while keeping your pelvis anchored. Hold at maximum comfortable extension for 2 to 3 seconds while breathing out, then gently lower.
        </p>
        <p class="small text-muted"><strong>Clinical Dosage:</strong> 10 slow repetitions, performed 3 to 4 times per day.</p>

        <h3 class="h3 mt-4 mb-3">2. Sciatic Nerve Flossing (Neural Gliding)</h3>
        <img src="assets/images/exercise-floss.jpg" alt="Sciatic Nerve Flossing Technique" class="rounded-3 my-3 w-100 object-fit-cover shadow-sm" style="max-height: 280px;">
        <p>
          Seated on the edge of a chair, gently slump your thoracic spine and tuck your chin. As you extend the affected knee to straighten your lower leg, simultaneously dorsiflex your ankle and tilt your head backward. Then lower your foot while flexing your neck forward. This dynamic oscillating glide mobilizes the nerve through the fibrotic sheath without tension overload.
        </p>
        <p class="small text-muted"><strong>Clinical Dosage:</strong> 12 to 15 rhythmic glides. Discontinue if sharp peripheral symptoms spike.</p>

        <h3 class="h3 mt-4 mb-3">3. Supine Piriformis Figure-4 Stretch</h3>
        <p>
          Lie supine with both knees bent. Rest the ankle of your symptomatic limb over the contralateral knee. Interlace your fingers behind your unaffected hamstring and gently draw the knee toward your ipsilateral shoulder until an isolated stretch is experienced across the deep gluteal rotator cuff.
        </p>
        <p class="small text-muted"><strong>Clinical Dosage:</strong> Hold for 30 seconds; complete 3 repetitions per side twice daily.</p>

        <div class="my-5 p-4 bg-surface-alt rounded-4 border border-subtle">
          <h5 class="fw-bold mb-3"><i class="fas fa-bone text-primary me-2"></i> Anatomical Landmark: Lumbar Nerve Roots</h5>
          <img src="assets/images/anatomy-spine.svg" alt="Spine Anatomy Diagram" class="w-100 rounded-3 mb-3" style="max-height: 300px; object-fit: contain;">
          <p class="small text-muted mb-0">The sciatic nerve is formed by the convergence of the L4-S3 spinal nerve roots. Posterior disc protrusions in this corridor narrow the neuroforamen, triggering referred neurogenic pain.</p>
        </div>
      `
    },
    {
      id: 'acl-reconstruction',
      slug: 'acl-reconstruction-biomechanical-roadmap',
      title: 'ACL Reconstruction: The 9-Month Return-to-Sport Biomechanical Roadmap',
      category: 'Sports Injuries',
      categorySlug: 'sports-injuries',
      badge: 'Featured · Sports Recovery',
      isFeaturedCategory: 'sports-injuries',
      description: 'Evidence-based physical rehabilitation benchmarks, limb symmetry index (LSI) testing, and neuromuscular deceleration drills ensuring a safe return to high-impact athletics.',
      image: 'assets/images/home2-acl-protocol.jpg',
      author: 'Dr. Marcus Vance',
      authorRole: 'Head of Sports Rehabilitation & Kinetic Performance',
      authorImg: 'assets/images/therapist-vance.jpg',
      date: 'Aug 28, 2026',
      readingTime: '8 min read',
      tags: 'acl knee sports injuries ligament athlete return to sport surgery rehabilitation knee',
      relatedSlugs: ['patellofemoral-pain-runners-knee', 'rotator-cuff-tears-surgery-vs-therapy', 'throwers-shoulder-scapular-dyskinesis'],
      content: `
        <p class="lead text-main">
          Returning to cutting, pivoting sports after anterior cruciate ligament (ACL) reconstruction requires far more than mere chronological healing; it demands objective neuromuscular, kinetic, and psychological readiness.
        </p>
        <p>
          Historical protocols relied heavily on a standard 6-month timeline. Modern sports medicine evidence overwhelmingly shows that delaying high-risk competitive sport until at least 9 months—while achieving a minimum of 90% Limb Symmetry Index (LSI) across standardized hop testing—reduces secondary graft re-tear rates by up to 51%.
        </p>

        <div class="p-4 bg-surface-alt border-start border-4 border-primary rounded-3 my-4">
          <p class="fst-italic mb-0 text-main fw-semibold">
            "Athletes must demonstrate flawless frontal plane knee control during unexpected reactive deceleration drills before they receive medical clearance for unrestricted competition."
          </p>
          <small class="text-muted d-block mt-2">— Dr. Marcus Vance, Sports Performance Director</small>
        </div>

        <h3 class="h3 mt-5 mb-3">Phase 1: Terminal Knee Extension &amp; Quadriceps Activation (Weeks 0–6)</h3>
        <p>
          Achieving full passive knee hyperextension (0° matching the contralateral limb) within the initial 14 days post-op is critical to preventing permanent arthrofibrosis. Neuromuscular electrical stimulation (NMES) paired with high-volume quad sets overcomes arthrogenic muscle inhibition.
        </p>

        <h3 class="h3 mt-4 mb-3">Phase 2: Closed Kinetic Chain Hypertrophy &amp; Gait Normalization (Weeks 6–16)</h3>
        <img src="assets/images/home2-gait-runner.jpg" alt="Runner Gait Analysis and Knee Mechanics" class="rounded-3 my-3 w-100 object-fit-cover shadow-sm" style="max-height: 280px;">
        <p>
          Progression from bilateral squats to single-leg Romanian deadlifts, Bulgarian split squats, and leg presses restoring hamstring-to-quadriceps torque ratios. Running progression begins once single-leg quad index exceeds 75% without joint effusion.
        </p>

        <h3 class="h3 mt-4 mb-3">Phase 3: Reactive Agility &amp; Deceleration Mechanics (Months 5–9)</h3>
        <p>
          Training the eccentric deceleration phase using force plate telemetry. Athletes master 3-dimensional plant-and-cut tasks with an emphasis on preventing dynamic knee valgus collapse during unanticipated visual cues.
        </p>
      `
    },
    {
      id: 'cervical-radiculopathy',
      slug: 'cervical-radiculopathy-disc-herniation',
      title: 'Cervical Radiculopathy: Treating Disc Herniation Without Surgery',
      category: 'Spine Care',
      categorySlug: 'spine-care',
      badge: 'Featured · Spine Care',
      isFeaturedCategory: 'spine-care',
      description: 'Understanding mechanical traction, neural mobilization, and deep cervical flexor strengthening to relieve nerve impingement and radiating arm tingling without operative intervention.',
      image: 'assets/images/blog-cervical-spine.jpg',
      author: 'Dr. Sarah Jenkins',
      authorRole: 'Clinical Director & Orthopedic Spine Specialist',
      authorImg: 'assets/images/therapist-jenkins.jpg',
      date: 'Aug 20, 2026',
      readingTime: '7 min read',
      tags: 'cervical spine herniated disc neck pain decompression posture spine care radiculopathy back pain posture',
      relatedSlugs: ['forward-head-posture-tech-neck', 'lumbar-lordosis-pelvic-tilt', 'mckenzie-method-lumbar-disc-bulges'],
      content: `
        <p class="lead text-main">
          Cervical radiculopathy occurs when a cervical spinal nerve root (frequently C6 or C7) becomes inflamed or mechanically compressed by a herniated nucleus pulposus or uncovertebral osteophyte.
        </p>
        <p>
          Patients typically report sharp, burning pain traveling from the neck down the shoulder, lateral forearm, and into the fingers, frequently accompanied by localized parasthesia or triceps reflex depression. In over 90% of clinical cases, a conservative program integrating intermittent mechanical traction and deep cervical flexor endurance eliminates the need for surgical anterior cervical discectomy and fusion (ACDF).
        </p>

        <div class="p-4 bg-surface-alt border-start border-4 border-primary rounded-3 my-4">
          <p class="fst-italic mb-0 text-main fw-semibold">
            "By retraining the longus colli and longus capitis muscles, we create an internal muscular splint that stabilizes the cervical motion segments, relieving pressure on the exiting nerve root."
          </p>
          <small class="text-muted d-block mt-2">— Dr. Sarah Jenkins, Clinical Director</small>
        </div>

        <h3 class="h3 mt-5 mb-3">1. Supine Craniocervical Flexion (Chin Tucks)</h3>
        <img src="assets/images/service-posture.jpg" alt="Cervical Posture Correction Drill" class="rounded-3 my-3 w-100 object-fit-cover shadow-sm" style="max-height: 280px;">
        <p>
          Lying supine with head supported in neutral, perform a subtle nod as if saying 'yes'. The goal is to activate the deep cervical flexors without recruiting superficial sternocleidomastoid (SCM) tension.
        </p>
        <p class="small text-muted"><strong>Clinical Dosage:</strong> 10-second isometric holds for 10 repetitions, 3 times daily.</p>

        <h3 class="h3 mt-4 mb-3">2. Manual Intermittent Cervical Traction</h3>
        <p>
          Gentle clinical distraction creates negative intradiscal pressure, widening the neural foramen and facilitating resorption of herniated disc fragment material away from the sensitized spinal nerve root.
        </p>
      `
    },
    {
      id: 'desk-ergonomics-blueprint',
      slug: 'complete-ergonomic-workstation-blueprint',
      title: 'The Complete Ergonomic Workstation Blueprint for Remote Professionals',
      category: 'Ergonomics',
      categorySlug: 'ergonomics',
      badge: 'Featured · Ergonomics',
      isFeaturedCategory: 'ergonomics',
      description: 'How precision monitor elevation, 90-degree elbow positioning, and lumbar supports eliminate cervical tension headaches, shoulder impingement, and chronic lower back fatigue.',
      image: 'assets/images/blog-ergonomics.jpg',
      author: 'Dr. David Chen',
      authorRole: 'Ergonomics & Joint Biomechanics Consultant',
      authorImg: 'assets/images/therapist-chen.jpg',
      date: 'Aug 15, 2026',
      readingTime: '5 min read',
      tags: 'ergonomics remote work desk setup monitor height posture office chair tension headache desk',
      relatedSlugs: ['office-ergonomics-lumbar-support', 'standing-desk-vs-ergonomic-chair', 'carpal-tunnel-mouse-keyboard-ergonomics'],
      content: `
        <p class="lead text-main">
          Working 8 to 10 hours daily in poorly configured home office spaces places cumulative shear stress upon the cervical and lumbar spines, triggering tension headaches and postural fatigue.
        </p>
        <p>
          Optimizing your physical workspace requires aligning the desk and chair geometry directly with your anatomical joint angles rather than forcing your spine into sustained compensatory strain.
        </p>

        <div class="p-4 bg-surface-alt border-start border-4 border-primary rounded-3 my-4">
          <p class="fst-italic mb-0 text-main fw-semibold">
            "Your best posture is your next posture: the most advanced ergonomic chair in the world cannot compensate for 4 hours of completely static sedentary immobilization."
          </p>
          <small class="text-muted d-block mt-2">— Dr. David Chen, Biomechanics Specialist</small>
        </div>

        <h3 class="h3 mt-5 mb-3">Core Geometric Alignments</h3>
        <ul>
          <li><strong>Monitor Height:</strong> The top third of your display glass should sit exactly level with your natural horizontal eye gaze to prevent suboccipital cervical extension.</li>
          <li><strong>Elbow Position:</strong> Armrests should support elbows at a relaxed 90° to 100° angle with forearms parallel to desk height, preventing trapezius shrugging.</li>
          <li><strong>Lumbar Contact:</strong> The contour of your chair's lumbar support must seat snugly into the L2–L4 lordotic curvature, maintaining neutral pelvic tilt.</li>
          <li><strong>Foot Grounding:</strong> Soles should rest flat upon the floor or a firm footrest to unload hamstring and posterior knee popliteal pressure.</li>
        </ul>
      `
    },

    // --- Pain Relief Category Posts ---
    {
      id: 'knee-osteoarthritis',
      slug: 'understanding-knee-osteoarthritis',
      title: 'Understanding Knee Osteoarthritis: Movement as True Medicine',
      category: 'Pain Relief',
      categorySlug: 'pain-relief',
      badge: 'Pain Relief',
      description: 'Debunking the myth of "wear and tear" and using progressive joint loading to nourish articular cartilage and relieve joint stiffness.',
      image: 'assets/images/blog-knee-osteo.jpg',
      author: 'Dr. Elena Rostova',
      authorRole: 'Senior Physical Therapist & Pain Management Specialist',
      authorImg: 'assets/images/therapist-rostova.jpg',
      date: 'Aug 24, 2026',
      readingTime: '5 min read',
      tags: 'knee osteoarthritis joint pain cartilage loading pain relief arthritis movement exercise',
      relatedSlugs: ['chronic-myofascial-pain-trigger-point', 'nerve-flossing-techniques', '5-proven-exercises-for-sciatica'],
      content: `
        <p class="lead text-main">
          For decades, knee osteoarthritis was mischaracterized as an inevitable 'wear-and-tear' breakdown where resting the joint was thought to preserve articular cartilage. Modern rheumatology confirms the opposite: articular cartilage has no direct blood supply and relies strictly on dynamic joint loading and movement to circulate synovial fluid and stay healthy.
        </p>
        <p>
          Progressive, non-impact resistance training thickens the surrounding quadriceps, hamstrings, and hip abductors, transferring axial joint reaction forces away from degraded chondral surfaces and dampening inflammatory pain.
        </p>

        <h3 class="h3 mt-4 mb-3">Targeted Low-Load Strengthening Strategies</h3>
        <p>
          Begin with seated isometric quadriceps presses against a therapy strap, advancing to straight leg raises and closed-chain terminal knee extensions. Cycling with low cadence resistance for 20 minutes stimulates synovial perfusion and significantly reduces morning joint stiffness.
        </p>
      `
    },
    {
      id: 'chronic-myofascial-pain',
      slug: 'chronic-myofascial-pain',
      title: 'Chronic Myofascial Pain: Trigger Point Dry Needling vs Manual Therapy',
      category: 'Pain Relief',
      categorySlug: 'pain-relief',
      badge: 'Pain Relief',
      description: 'How intramuscular stimulation releases stubborn myofascial knots, desensitizes hyperactive neural pathways, and restores resting muscle length.',
      image: 'assets/images/blog-dry-needling.jpg',
      author: 'Dr. Elena Rostova',
      authorRole: 'Senior Physical Therapist & Pain Management Specialist',
      authorImg: 'assets/images/therapist-rostova.jpg',
      date: 'Aug 10, 2026',
      readingTime: '6 min read',
      tags: 'myofascial chronic pain trigger point dry needling manual therapy pain relief muscle tension',
      relatedSlugs: ['understanding-knee-osteoarthritis', 'nerve-flossing-techniques', '5-proven-exercises-for-sciatica'],
      content: `
        <p class="lead text-main">
          Myofascial pain syndrome involves persistent hyperirritable taut bands in skeletal muscle fibers known as trigger points. These tight knots cause focal aching, localized ischemia, and wide referred pain patterns that frequently mimic spinal disc issues.
        </p>
        <p>
          Trigger point dry needling utilizes ultra-fine monofilament needles inserted directly into dysfunctional motor endplates, eliciting a local twitch response that disrupts sustained acetylcholine release and restores normal tissue pH.
        </p>
      `
    },
    {
      id: 'nerve-flossing',
      slug: 'nerve-flossing-techniques',
      title: 'Nerve Flossing Techniques: Alleviating Peripheral Sciatic Tension',
      category: 'Pain Relief',
      categorySlug: 'pain-relief',
      badge: 'Pain Relief',
      description: 'Gentle neural mobilization movements that glide and release trapped peripheral nerves without triggering inflammatory flare-ups.',
      image: 'assets/images/exercise-floss.jpg',
      author: 'Dr. Sarah Jenkins',
      authorRole: 'Clinical Director & Orthopedic Spine Specialist',
      authorImg: 'assets/images/therapist-jenkins.jpg',
      date: 'Jul 29, 2026',
      readingTime: '4 min read',
      tags: 'nerve flossing neural mobilization sciatic nerve pain relief peripheral tension exercise back pain',
      relatedSlugs: ['5-proven-exercises-for-sciatica', 'understanding-knee-osteoarthritis', 'chronic-myofascial-pain-trigger-point'],
      content: `
        <p class="lead text-main">
          Peripheral nerves require unrestricted longitudinal excursion—gliding smoothly through fascial tunnels, muscle bellies, and joint crevices during normal limb movements. When surrounding soft tissues inflame or develop scar adhesions, the nerve becomes tethered, causing numbness and pins-and-needles sensations.
        </p>
        <p>
          Neural flossing elongates the nervous system at one anatomical joint while simultaneously releasing tension at an adjacent joint. This creates a harmless longitudinal excursion that clears fascial entrapments without provoking painful neurogenic inflammation.
        </p>
      `
    },

    // --- Sports Injuries Category Posts ---
    {
      id: 'rotator-cuff-tears',
      slug: 'rotator-cuff-tears-surgery-vs-therapy',
      title: 'Rotator Cuff Tears: Surgery vs Conservative Physical Therapy',
      category: 'Sports Injuries',
      categorySlug: 'sports-injuries',
      badge: 'Sports Injuries',
      description: 'Clinical comparisons between arthroscopic surgical repairs and targeted eccentric rotator cuff conditioning for overhead athletes.',
      image: 'assets/images/blog-rotator-cuff.jpg',
      author: 'Dr. Marcus Vance',
      authorRole: 'Head of Sports Rehabilitation & Kinetic Performance',
      authorImg: 'assets/images/therapist-vance.jpg',
      date: 'Aug 30, 2026',
      readingTime: '7 min read',
      tags: 'rotator cuff shoulder sports injuries surgery conditioning tendon recovery athlete exercise',
      relatedSlugs: ['patellofemoral-pain-runners-knee', 'throwers-shoulder-scapular-dyskinesis', 'acl-reconstruction-biomechanical-roadmap'],
      content: `
        <p class="lead text-main">
          Rotator cuff tendinopathy and partial-thickness tears are among the most prevalent causes of shoulder impairment in recreational and competitive athletes. Many individuals assume surgical re-anchoring is mandatory, but randomized controlled trials show conservative physical therapy produces equal functional scores and pain reduction in over 75% of non-traumatic tears.
        </p>
        <p>
          Conservative protocols prioritize eccentric supraspinatus and infraspinatus loading, coupled with lower trapezius and serratus anterior activation to stabilize the humeral head centrally in the glenoid fossa during active elevation.
        </p>
      `
    },
    {
      id: 'runners-knee',
      slug: 'patellofemoral-pain-runners-knee',
      title: 'Patellofemoral Pain & Runner\'s Knee: Cadence and Gait Mechanics',
      category: 'Sports Injuries',
      categorySlug: 'sports-injuries',
      badge: 'Sports Injuries',
      description: 'Analyzing stride length, ground reaction forces, and hip abductor weakness to eliminate anterior knee pain during marathon training.',
      image: 'assets/images/home2-gait-runner.jpg',
      author: 'Dr. Marcus Vance',
      authorRole: 'Head of Sports Rehabilitation & Kinetic Performance',
      authorImg: 'assets/images/therapist-vance.jpg',
      date: 'Aug 18, 2026',
      readingTime: '6 min read',
      tags: 'runners knee patellofemoral pain running cadence gait sports injuries biomechanics hip abductor knee',
      relatedSlugs: ['rotator-cuff-tears-surgery-vs-therapy', 'throwers-shoulder-scapular-dyskinesis', 'acl-reconstruction-biomechanical-roadmap'],
      content: `
        <p class="lead text-main">
          Patellofemoral pain syndrome (PFPS), commonly known as runner's knee, occurs when the retropatellar cartilage experiences excessive compressive contact pressure against the femoral trochlea during repetitive knee flexion cycles.
        </p>
        <p>
          Gait retraining that increases running cadence by just 5% to 7% substantially reduces stride length and braking forces at initial heel contact, unloading patellofemoral joint stress and rapidly alleviating anterior knee soreness.
        </p>
      `
    },
    {
      id: 'throwers-shoulder',
      slug: 'throwers-shoulder-scapular-dyskinesis',
      title: 'Thrower\'s Shoulder & Scapular Dyskinesis: Rotational Power Protocols',
      category: 'Sports Injuries',
      categorySlug: 'sports-injuries',
      badge: 'Sports Injuries',
      description: 'Scapulothoracic rhythmic stabilization and posterior capsule stretches that restore kinetic chain power for throwing athletes.',
      image: 'assets/images/home2-overhead-arm.jpg',
      author: 'Dr. Marcus Vance',
      authorRole: 'Head of Sports Rehabilitation & Kinetic Performance',
      authorImg: 'assets/images/therapist-vance.jpg',
      date: 'Jul 22, 2026',
      readingTime: '8 min read',
      tags: 'thrower shoulder scapular dyskinesis rotational power kinetic chain sports injuries athlete',
      relatedSlugs: ['rotator-cuff-tears-surgery-vs-therapy', 'patellofemoral-pain-runners-knee', 'acl-reconstruction-biomechanical-roadmap'],
      content: `
        <p class="lead text-main">
          Overhead throwing athletes subject the shoulder complex to angular velocities exceeding 7,000 degrees per second. When the scapula loses rhythmic upward rotation and posterior tilt (scapular dyskinesis), excessive tensile distraction stresses are transferred onto the labrum and rotator cuff.
        </p>
        <p>
          Restoring the kinetic chain through closed-chain quadruped rhythmic stabilizations, sleeper stretches to address Glenohumeral Internal Rotation Deficit (GIRD), and kinetic hip-to-trunk sequencing safeguards the throwing shoulder.
        </p>
      `
    },
    {
      id: 'post-concussion-baseline',
      slug: 'post-concussion-baseline-voms-protocol',
      title: 'Post-Concussion Baseline & VOMS Protocol: Multi-Stage Return-to-Play Physical Therapy',
      category: 'Sports Injuries',
      categorySlug: 'sports-injuries',
      badge: 'Sports Recovery · Protocol',
      isProtocolOnly: true,
      description: 'Vestibular ocular motor screening (VOMS), cervical spine stabilization, and graded cardiovascular exertion protocols for safe contact sport return-to-play clearance.',
      image: 'assets/images/blog-concussion-voms.jpg',
      author: 'Dr. Marcus Vance',
      authorRole: 'Head of Sports Rehabilitation & Kinetic Performance',
      authorImg: 'assets/images/therapist-vance.jpg',
      date: 'Aug 14, 2026',
      readingTime: '7 min read',
      tags: 'concussion vestibular voms sports injuries return to play cervical spine athlete athletics baseline',
      relatedSlugs: ['acl-reconstruction-biomechanical-roadmap', 'throwers-shoulder-scapular-dyskinesis', 'patellofemoral-pain-runners-knee'],
      content: `
        <p class="lead text-main">
          Concussion management in modern sports physical therapy has evolved from passive dark-room rest to proactive, multi-domain active rehabilitation incorporating vestibular, ocular-motor, and cervical spine therapies.
        </p>
        <p>
          Athletes participating in contact sports (soccer, football, lacrosse, rugby) require comprehensive baseline testing prior to competition. When mild traumatic brain injury (mTBI) occurs, Vestibular/Ocular Motor Screening (VOMS) enables physical therapists to identify specific sub-type impairments and prescribe targeted ocular convergence, saccade, and vestibular-ocular reflex (VOR) drills.
        </p>

        <div class="p-4 bg-surface-alt border-start border-4 border-primary rounded-3 my-4">
          <p class="fst-italic mb-0 text-main fw-semibold">
            "Return-to-play is never determined by a calendar; it is strictly criterion-based. Athletes must demonstrate symptom-free tolerance across sub-maximal exertion, dynamic vestibular perturbation, and sport-specific non-contact practice before medical contact clearance."
          </p>
          <small class="text-muted d-block mt-2">— Dr. Marcus Vance, Sports Performance Director</small>
        </div>

        <h3 class="h3 mt-5 mb-3">1. Vestibular Ocular Motor Screening (VOMS) Assessment</h3>
        <p>
          The VOMS tool measures symptom provocation (headache, dizziness, nausea, fogginess) following five ocular and vestibular challenges: Smooth Pursuit, Saccades (horizontal and vertical), Convergence (near point distance &lt; 5 cm), Vestibular-Ocular Reflex (horizontal and vertical VOR at 180 bpm), and Visual Motion Sensitivity (VMS).
        </p>

        <h3 class="h3 mt-4 mb-3">2. Cervical Spine Differential Diagnosis &amp; Stabilization</h3>
        <p>
          Up to 80% of sports-related concussions present with concomitant cervicogenic dysfunction. Whiplash forces transmitted to the suboccipital and upper cervical paraspinals trigger cervicogenic headaches and proprioceptive dizziness. Deep neck flexor retraining and manual mobilization of C1-C3 segments are initiated early.
        </p>

        <h3 class="h3 mt-4 mb-3">3. The 6-Stage Graduated Return-to-Play Progression</h3>
        <p>
          Following 24–48 hours of initial relative rest, the athlete progresses through symptom-limited sub-threshold cardiovascular exertion on a stationary bike, followed by sport-specific running drills, non-contact practice drills, full-contact practice upon medical clearance, and finally unrestricted return to competition.
        </p>
      `
    },

    // --- Spine Care Category Posts ---
    {
      id: 'forward-head-posture',
      slug: 'forward-head-posture-tech-neck',
      title: 'Forward Head Posture & Tech Neck: 4 Corrective Cervical Drills',
      category: 'Spine Care',
      categorySlug: 'spine-care',
      badge: 'Spine Care',
      description: 'Simple, evidence-based daily isometric chin tucks and thoracic extension exercises to reverse years of screen-slouching.',
      image: 'assets/images/service-posture.jpg',
      author: 'Dr. David Chen',
      authorRole: 'Ergonomics & Joint Biomechanics Consultant',
      authorImg: 'assets/images/therapist-chen.jpg',
      date: 'Aug 22, 2026',
      readingTime: '5 min read',
      tags: 'tech neck forward head posture cervical spine care desk neck pain drills alignment posture',
      relatedSlugs: ['lumbar-lordosis-pelvic-tilt', 'mckenzie-method-lumbar-disc-bulges', 'cervical-radiculopathy-disc-herniation'],
      content: `
        <p class="lead text-main">
          For every inch your head translates forward from plumb alignment, the effective gravitational load sustained by the cervical spine increases by roughly 10 pounds. At a 45-degree downward phone-tilt, your neck supports over 45 pounds of sustained tensile load.
        </p>
        <p>
          Reversing tech neck requires targeted elongation of tight suboccipital and pectoralis minor muscles combined with endurance training of deep cervical flexors and middle trapezius retractors.
        </p>
      `
    },
    {
      id: 'lumbar-lordosis',
      slug: 'lumbar-lordosis-pelvic-tilt',
      title: 'Lumbar Lordosis and Pelvic Tilt: Correcting Sagittal Spinal Alignment',
      category: 'Spine Care',
      categorySlug: 'spine-care',
      badge: 'Spine Care',
      description: 'Rebalancing anterior pelvic tilt through targeted glute bridge mechanics, hip flexor lengthening, and transverse abdominis bracing.',
      image: 'assets/images/blog-pelvic-tilt.jpg',
      author: 'Dr. Sarah Jenkins',
      authorRole: 'Clinical Director & Orthopedic Spine Specialist',
      authorImg: 'assets/images/therapist-jenkins.jpg',
      date: 'Aug 12, 2026',
      readingTime: '5 min read',
      tags: 'lumbar lordosis pelvic tilt spine care lower back posture core glute activation back pain posture',
      relatedSlugs: ['forward-head-posture-tech-neck', 'mckenzie-method-lumbar-disc-bulges', 'cervical-radiculopathy-disc-herniation'],
      content: `
        <p class="lead text-main">
          Anterior pelvic tilt (APT) occurs when tight iliopsoas and rectus femoris muscles pull the anterior iliac crests forward, exaggerating the natural inward curve of the lower spine (hyperlordosis) and overloading the posterior facet joints.
        </p>
        <p>
          Re-aligning the pelvis involves strengthening the gluteus maximus through posterior pelvic tilt bridge drills, dead bugs for deep abdominal bracing, and half-kneeling psoas mobility stretches.
        </p>
      `
    },
    {
      id: 'mckenzie-method',
      slug: 'mckenzie-method-lumbar-disc-bulges',
      title: 'McKenzie Method Extension Drills for Acute Lumbar Disc Bulges',
      category: 'Spine Care',
      categorySlug: 'spine-care',
      badge: 'Spine Care',
      description: 'How directional preference exercises centralize radiating nerve symptoms and restore spinal extension tolerance quickly.',
      image: 'assets/images/blog-mckenzie-pressup.jpg',
      author: 'Dr. Sarah Jenkins',
      authorRole: 'Clinical Director & Orthopedic Spine Specialist',
      authorImg: 'assets/images/therapist-jenkins.jpg',
      date: 'Jul 15, 2026',
      readingTime: '6 min read',
      tags: 'mckenzie method disc bulge lumbar spine care extension back pain centralization',
      relatedSlugs: ['forward-head-posture-tech-neck', 'lumbar-lordosis-pelvic-tilt', 'cervical-radiculopathy-disc-herniation'],
      content: `
        <p class="lead text-main">
          The McKenzie Method (Mechanical Diagnosis and Therapy) classifies acute mechanical back pain based on the phenomenon of directional preference—where repetitive movements in one specific plane rapidly abolish pain and restore lost spinal mobility.
        </p>
        <p>
          For posterolateral disc bulges, repetitive prone extensions encourage the displaced nuclear material to centralize away from the dorsal nerve roots, giving patients immediate relief and an active self-treatment tool.
        </p>
      `
    },

    // --- Ergonomics Category Posts ---
    {
      id: 'office-ergonomics',
      slug: 'office-ergonomics-lumbar-support',
      title: 'Office Ergonomics & Lumbar Support: Preventing Sedentary Back Fatigue',
      category: 'Ergonomics',
      categorySlug: 'ergonomics',
      badge: 'Ergonomics',
      description: 'How precision monitor elevation, lumbar contouring, and periodic postural resets protect the spine during 8-hour seated workdays.',
      image: 'assets/images/blog-lumbar-ergonomics.jpg',
      author: 'Dr. David Chen',
      authorRole: 'Ergonomics & Joint Biomechanics Consultant',
      authorImg: 'assets/images/therapist-chen.jpg',
      date: 'Sep 1, 2026',
      readingTime: '4 min read',
      tags: 'desk ergonomics posture remote workers cervical tension headaches office chair monitor height back pain desk',
      relatedSlugs: ['standing-desk-vs-ergonomic-chair', 'carpal-tunnel-mouse-keyboard-ergonomics', 'complete-ergonomic-workstation-blueprint'],
      content: `
        <p class="lead text-main">
          Prolonged static seating without adequate lumbar lordosis support triples intradiscal pressures in the L4–L5 motion segments compared to relaxed standing. When the lumbar curve flattens into posterior pelvic tilt, posterior annulus fibers endure chronic stretching.
        </p>
        <p>
          A contoured lumbar cushion combined with an active 45-minute microbreak schedule significantly reduces end-of-day spinal compression and enhances cognitive focus.
        </p>
      `
    },
    {
      id: 'standing-desk',
      slug: 'standing-desk-vs-ergonomic-chair',
      title: 'Standing Desk vs Ergonomic Chair: Biomechanics of Sit-to-Stand Intervals',
      category: 'Ergonomics',
      categorySlug: 'ergonomics',
      badge: 'Ergonomics',
      description: 'Discover optimal sit-to-stand ratios that optimize intervertebral disc pressure, enhance venous return, and reduce fatigue.',
      image: 'assets/images/blog-standing-desk.jpg',
      author: 'Dr. David Chen',
      authorRole: 'Ergonomics & Joint Biomechanics Consultant',
      authorImg: 'assets/images/therapist-chen.jpg',
      date: 'Aug 16, 2026',
      readingTime: '5 min read',
      tags: 'standing desk sit stand ergonomics biomechanics circulation posture office remote desk',
      relatedSlugs: ['office-ergonomics-lumbar-support', 'carpal-tunnel-mouse-keyboard-ergonomics', 'complete-ergonomic-workstation-blueprint'],
      content: `
        <p class="lead text-main">
          Adjustable height sit-to-stand workstations have revolutionized corporate wellness, yet many individuals replace static sitting with sustained, rigid standing—leading to plantar fasciitis and varicose vein congestion.
        </p>
        <p>
          Clinical biomechanics suggests an optimal ratio of 45 minutes seated followed by 15 minutes of dynamic standing with weight shifting, which maintains optimal venous blood flow and spinal disc hydration.
        </p>
      `
    },
    {
      id: 'repetitive-strain-injury',
      slug: 'carpal-tunnel-mouse-keyboard-ergonomics',
      title: 'Repetitive Strain Injury & Carpal Tunnel: Mouse & Keyboard Ergonomics',
      category: 'Ergonomics',
      categorySlug: 'ergonomics',
      badge: 'Ergonomics',
      description: 'Neutral wrist angles, mechanical switches, and vertical mouse designs that decompress the median nerve during long desk sessions.',
      image: 'assets/images/blog-carpal-tunnel.jpg',
      author: 'Dr. David Chen',
      authorRole: 'Ergonomics & Joint Biomechanics Consultant',
      authorImg: 'assets/images/therapist-chen.jpg',
      date: 'Aug 05, 2026',
      readingTime: '6 min read',
      tags: 'carpal tunnel wrist pain mouse keyboard ergonomics rsi typing office desk',
      relatedSlugs: ['office-ergonomics-lumbar-support', 'standing-desk-vs-ergonomic-chair', 'complete-ergonomic-workstation-blueprint'],
      content: `
        <p class="lead text-main">
          Carpal tunnel syndrome arises when repetitive wrist extension and sustained forearm pronation elevate hydrostatic pressure inside the rigid carpal tunnel, compressing the vulnerable median nerve against the flexor retinaculum.
        </p>
        <p>
          Switching to an ergonomic vertical mouse positions the forearm in a neutral 'handshake' posture, reducing pronator teres strain and lowering intracarpal pressures by up to 40%.
        </p>
      `
    },
// --- 10 Additional Clinical Guides (Total = 27) ---
    {
      id: 'plantar-fasciitis',
      slug: 'plantar-fasciitis-shockwave-therapy',
      title: 'Plantar Fasciitis: Heel Pain Biomechanics & Extracorporeal Shockwave Therapy',
      category: 'Pain Relief',
      categorySlug: 'pain-relief',
      badge: 'Pain Relief',
      description: 'Understanding windlass mechanism strain, calcaneal spurs, and how radial shockwave therapy triggers neovascularization to resolve chronic morning heel stiffness.',
      image: 'assets/images/blog-plantar-fasciitis.jpg',
      author: 'Dr. Sarah Jenkins',
      authorRole: 'Clinical Director & Orthopedic Spine Specialist',
      authorImg: 'assets/images/therapist-jenkins.jpg',
      date: 'Aug 12, 2026',
      readingTime: '6 min read',
      tags: 'plantar fasciitis heel pain foot arch shockwave therapy morning pain stretch',
      relatedSlugs: ['5-proven-exercises-for-sciatica', 'knee-osteoarthritis', 'patellofemoral-pain-runners-knee'],
      content: `
        <p class="lead text-main">Plantar fasciitis is one of the most prevalent causes of chronic heel pain, affecting millions of active individuals and occupational workers who spend long hours standing on rigid surfaces.</p>
        <p>The hallmark symptom is severe, sharp pain under the medial calcaneal tuberosity upon taking the very first steps in the morning. When the foot is unloaded during sleep, the plantar fascia contracts into a shortened state; sudden weight-bearing applies rapid tensile strain across the micro-damaged collagen fibers.</p>
        <h3 class="h3 mt-4 mb-3">Radial Shockwave Therapy (ESWT)</h3>
        <p>Modern clinical evidence highlights Extracorporeal Shockwave Therapy (ESWT) as a non-invasive treatment that delivers high-energy acoustic pulses directly into degenerated fascial tissue, breaking down chronic scar adhesions and promoting tissue regeneration.</p>
      `
    },
    {
      id: 'ankle-sprain-police',
      slug: 'ankle-sprain-police-protocol',
      title: 'Lateral Ankle Sprains: The Modern POLICE Protocol vs Outdated RICE',
      category: 'Sports Injuries',
      categorySlug: 'sports-injuries',
      badge: 'Sports Recovery',
      description: 'Why total immobilization delays ligament healing, and how Protection, Optimal Loading, and dynamic balance training restore ankle stability faster.',
      image: 'assets/images/blog-ankle-sprain.jpg',
      author: 'Dr. Marcus Vance',
      authorRole: 'Head of Sports Rehabilitation & Kinetic Performance',
      authorImg: 'assets/images/therapist-vance.jpg',
      date: 'Aug 08, 2026',
      readingTime: '5 min read',
      tags: 'ankle sprain ligament tear police protocol sports injuries proprioception balance',
      relatedSlugs: ['acl-reconstruction-biomechanical-roadmap', 'patellofemoral-pain-runners-knee'],
      content: `
        <p class="lead text-main">The traditional RICE protocol (Rest, Ice, Compression, Elevation) has been superseded in modern sports physical therapy by the evidence-based POLICE framework: Protection, Optimal Loading, Ice, Compression, and Elevation.</p>
        <p>Controlled mechanical loading stimulates collagen alignment in the anterior talofibular ligament (ATFL), accelerates lymphatic drainage, and preserves neuromuscular motor patterns in the lower extremity.</p>
      `
    },
    {
      id: 'tennis-elbow',
      slug: 'tennis-elbow-lateral-epicondylitis',
      title: 'Tennis Elbow (Lateral Epicondylitis): Eccentric Wrist Extensor Loading',
      category: 'Pain Relief',
      categorySlug: 'pain-relief',
      badge: 'Pain Relief',
      description: 'How isolated eccentric loading of the extensor carpi radialis brevis regenerates chronic tendinopathy without cortisone injections.',
      image: 'assets/images/blog-tennis-elbow.jpg',
      author: 'Dr. David Chen',
      authorRole: 'Senior Physical Therapist & Ergonomics Consultant',
      authorImg: 'assets/images/therapist-chen.jpg',
      date: 'Jul 26, 2026',
      readingTime: '5 min read',
      tags: 'tennis elbow lateral epicondylitis tendon wrist forearm eccentric grip pain',
      relatedSlugs: ['carpal-tunnel-mouse-keyboard-ergonomics', 'complete-ergonomic-workstation-blueprint'],
      content: `
        <p class="lead text-main">Lateral epicondylalgia, commonly known as tennis elbow, is a tendinopathy characterized by degenerative micro-tears in the tendon of the extensor carpi radialis brevis (ECRB) from repetitive wrist extension and forearm pronation.</p>
        <p>Progressive eccentric exercises using resistance bars stimulate fibroblast remodeling, gradually increasing tendon tensile tolerance while reducing local hyperalgesia.</p>
      `
    },
    {
      id: 'hip-impingement',
      slug: 'hip-impingement-fai-rehabilitation',
      title: 'Femoroacetabular Impingement (FAI): Hip Mobility & Deep Glute Activation',
      category: 'Joint Mobility',
      categorySlug: 'joint-mobility',
      badge: 'Joint Mobility',
      description: 'Cam and pincer morphological mechanics, anterior hip capsule mobilization, and pelvis control preventing early labral degeneration.',
      image: 'assets/images/blog-joint-hip.jpg',
      author: 'Dr. Elena Rostova',
      authorRole: 'Doctor of Physical Therapy & Neuromuscular Specialist',
      authorImg: 'assets/images/therapist-rostova.jpg',
      date: 'Jul 20, 2026',
      readingTime: '7 min read',
      tags: 'hip impingement fai labrum joint mobility groin pain glute strength cartilage',
      relatedSlugs: ['understanding-knee-osteoarthritis', 'lumbar-lordosis-pelvic-tilt'],
      content: `
        <p class="lead text-main">Femoroacetabular Impingement (FAI) results from abnormal osseous contact between the femoral head-neck junction and acetabular rim during terminal hip flexion and internal rotation.</p>
        <p>Physical therapy restores hip capsular accessory glide, optimizes anterior pelvic tilt, and strengthens the posterior gluteal cuff to maintain joint congruency and avoid impingement pinch points.</p>
      `
    },
    {
      id: 'total-knee-arthroplasty',
      slug: 'total-knee-arthroplasty-rehab',
      title: 'Total Knee Replacement: 12-Week Range of Motion & Gait Roadmap',
      category: 'Post-Op Rehab',
      categorySlug: 'post-op-rehab',
      badge: 'Post-Op Rehab',
      description: 'Step-by-step milestones to achieve 120-degree knee flexion, full terminal extension, and reciprocal stair climbing following joint replacement.',
      image: 'assets/images/postop-knee-rehab.jpg',
      author: 'Dr. Sarah Jenkins',
      authorRole: 'Clinical Director & Orthopedic Spine Specialist',
      authorImg: 'assets/images/therapist-jenkins.jpg',
      date: 'Jul 15, 2026',
      readingTime: '8 min read',
      tags: 'total knee replacement arthroplasty post op rehab joint surgery gait stairs',
      relatedSlugs: ['understanding-knee-osteoarthritis', 'acl-reconstruction-biomechanical-roadmap'],
      content: `
        <p class="lead text-main">Total Knee Arthroplasty (TKA) is a transformative procedure for advanced end-stage osteoarthritis, but long-term functional success hinges entirely on early, structured post-operative physical rehabilitation.</p>
        <p>Achieving 0 degrees of passive extension within the first 14 days and progressively expanding active knee flexion to 120 degrees ensures normal gait kinematics and pain-free stair descent.</p>
      `
    },
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
      content: `
        <p class="lead text-main">Following arthroscopic rotator cuff repair or subacromial decompression, balancing biological tendon-to-bone healing with early prevention of glenohumeral arthrofibrosis is the cornerstone of successful physical rehabilitation.</p>
        <p>In Phase 1 (Weeks 0 to 6), active supraspinatus contraction is contraindicated to protect suture anchor integrity. Physical therapy focuses on passive range of motion (PROM), Codman pendulum swings, and gentle periscapular stabilization.</p>
        <h3 class="h3 mt-4 mb-3">Phase 2: Active-Assisted Range of Motion (AAROM)</h3>
        <p>Between Weeks 6 and 10, overhead rope-and-pulley systems and wand exercises safely introduce active-assisted mobility, restoring full forward flexion and external rotation before resistance loading begins.</p>
      `
    },
    {
      id: 'total-hip-arthroplasty',
      slug: 'total-hip-replacement-post-op-rehabilitation',
      title: 'Total Hip Replacement: Phase-by-Phase Mobility & Dislocation Precautions',
      category: 'Post-Op Rehab',
      categorySlug: 'post-op-rehab',
      badge: 'Post-Op Rehab',
      description: 'Navigating posterior hip precautions, progressive weight-bearing milestones, and gluteus medius strengthening for rapid functional recovery after total hip arthroplasty.',
      image: 'assets/images/blog-postop-hip.jpg',
      altText: 'Post-Operative Rehabilitation Physical Therapy',
      author: 'Dr. Sarah Jenkins',
      authorRole: 'Clinical Director & Orthopedic Specialist',
      authorImg: 'assets/images/therapist-jenkins.jpg',
      date: 'Aug 25, 2026',
      readingTime: '7 min read',
      tags: 'total hip replacement arthroplasty post op rehab hip surgery gait retraining precautions gluteus medius recovery',
      relatedSlugs: ['total-knee-arthroplasty-rehab', 'post-op-rotator-cuff-arthroscopy-rehab'],
      content: `
        <p class="lead text-main">
          Total Hip Arthroplasty (THA) is one of the most clinically successful orthopedic interventions in modern medicine, providing immediate relief from debilitating joint degeneration and restoring independent mobility.
        </p>
        <p>
          Post-operative physical therapy begins within hours of surgical completion, prioritizing early protected weight-bearing, safe transfer biomechanics, and active thromboembolism prevention through targeted ankle pumps and quad sets.
        </p>

        <div class="p-4 bg-surface-alt border-start border-4 border-primary rounded-3 my-4">
          <p class="fst-italic mb-0 text-main fw-semibold">
            "Re-establishing pelvic stability through early gluteus medius activation prevents persistent Trendelenburg lurch and protects the prosthetic implant as patients transition to unassisted ambulation."
          </p>
          <small class="text-muted d-block mt-2">— Dr. Sarah Jenkins, Clinical Director</small>
        </div>

        <h3 class="h3 mt-4 mb-3">1. Posterior Dislocation Precautions &amp; Safe Transfers</h3>
        <p>
          For patients undergoing traditional posterior surgical approaches, avoiding hip flexion beyond 90 degrees, adduction past midline, and internal rotation protects the healing posterior capsule during the initial 6 to 8 weeks.
        </p>

        <h3 class="h3 mt-4 mb-3">2. Guided Step-Up Drills &amp; Stair Navigation</h3>
        <p>
          Guided step-up drills on calibrated clinical rehab platforms facilitate eccentric quadriceps control and symmetrical weight-shift, preparing patients for confident, reciprocal stair ascent and descent.
        </p>

        <h3 class="h3 mt-4 mb-3">3. Closed-Chain Abductor &amp; Core Strengthening</h3>
        <p>
          Between Weeks 6 and 12, closed-chain side-stepping, standing hip abductor resistance band drills, and single-leg balance tasks restore full functional gait symmetry.
        </p>
      `
    },
    {
      id: 'vestibular-vertigo',
      slug: 'vestibular-rehabilitation-vertigo',
      title: 'Vestibular Rehabilitation: Canalith Repositioning & Balance Retraining for BPPV',
      category: 'Neurological',
      categorySlug: 'neurological',
      badge: 'Neurological',
      description: 'Understanding benign paroxysmal positional vertigo (BPPV), the Epley maneuver, and gaze stabilization exercises that restore spatial equilibrium.',
      image: 'assets/images/service-vestibular.jpg',
      author: 'Dr. Elena Rostova',
      authorRole: 'Doctor of Physical Therapy & Neuromuscular Specialist',
      authorImg: 'assets/images/therapist-rostova.jpg',
      date: 'Jul 10, 2026',
      readingTime: '6 min read',
      tags: 'vestibular vertigo bppv dizziness balance epley neurological nystagmus',
      relatedSlugs: ['post-concussion-baseline-voms-protocol', 'forward-head-posture-tech-neck'],
      content: `
        <p class="lead text-main">Benign Paroxysmal Positional Vertigo (BPPV) occurs when microscopic calcium carbonate crystals (otoconia) detach from the utricular macula and migrate into the semicircular canals of the inner ear.</p>
        <p>Vestibular physical therapists perform precision canalith repositioning maneuvers (such as the Epley or Semont maneuvers) to guide otoconia back into the vestibule, resolving vertigo in up to 90% of patients within 1 to 2 clinical sessions.</p>
      `
    },
    {
      id: 'neuro-gait-rehab',
      slug: 'neurological-gait-balance-rehabilitation',
      title: 'Neurological Gait Rehabilitation: Restoring Walking Independence & Balance Dynamics',
      category: 'Neurological',
      categorySlug: 'neurological',
      badge: 'Neurological · Gait Rehab',
      description: 'How task-specific locomotor training, parallel bars gait retraining, and sensory weight-shifting re-educate central nervous pathways after neurological injury.',
      image: 'assets/images/blog-neuro-gait.jpg',
      author: 'Dr. Elena Rostova',
      authorRole: 'Doctor of Physical Therapy & Neuromuscular Specialist',
      authorImg: 'assets/images/therapist-rostova.jpg',
      date: 'Aug 15, 2026',
      readingTime: '7 min read',
      tags: 'neurological gait rehabilitation walking balance stroke recovery neuroplasticity parallel bars motor retraining',
      relatedSlugs: ['vestibular-rehabilitation-vertigo', 'post-concussion-baseline-voms-protocol', 'post-stroke-motor-control-coordination'],
      content: `
        <p class="lead text-main">
          Restoring independent ambulation and dynamic postural equilibrium is the paramount objective in neurological rehabilitation following stroke, incomplete spinal cord injury, or traumatic brain injury.
        </p>
        <p>
          Locomotor recovery is driven by activity-dependent neuroplasticity—the central nervous system's innate ability to reorganize synaptic architecture in response to intensive, repetitive, and task-specific sensory input.
        </p>

        <div class="p-4 bg-surface-alt border-start border-4 border-primary rounded-3 my-4">
          <p class="fst-italic mb-0 text-main fw-semibold">
            "Symmetrical weight transfer during the stance phase combined with active hip flexor facilitation across calibrated ground distances stimulates spinal central pattern generators (CPGs), converting guarded gait into fluid, confident walking."
          </p>
          <small class="text-muted d-block mt-2">— Dr. Elena Rostova, Neuromuscular Specialist</small>
        </div>

        <h3 class="h3 mt-4 mb-3">1. Task-Specific Parallel Bar Locomotor Progression</h3>
        <p>
          Parallel bar environments provide essential upper extremity security while allowing neurological physical therapists to manually facilitate pelvic lateral weight-shift, stance-limb knee stability, and swing-phase dorsiflexion without fear of falls.
        </p>

        <h3 class="h3 mt-4 mb-3">2. Visual Ground Targets &amp; Calibrated Cadence Cues</h3>
        <p>
          External spatial cues—such as calibrated floor distance markings and auditory metronomic pacing—bypass impaired basal ganglia pathways, dramatically normalizing step length symmetry and reducing gait freezing episodes.
        </p>

        <h3 class="h3 mt-4 mb-3">3. Perturbation &amp; Reactive Balance Training</h3>
        <p>
          Graded multidirectional manual perturbations challenge anticipatory postural adjustments (APAs), strengthening neuromuscular ankle and hip strategies vital for community ambulation.
        </p>
      `
    },
    {
      id: 'neuro-motor-control',
      slug: 'post-stroke-motor-control-coordination',
      title: 'Post-Stroke Motor Control & Coordination: Task-Specific Neuroplasticity Drills',
      category: 'Neurological',
      categorySlug: 'neurological',
      badge: 'Neurological · Coordination',
      description: 'Clinical evidence for constraint-induced movement therapy, bilateral arm training, and fine motor coordination exercises that stimulate cortical reorganization.',
      image: 'assets/images/blog-neuro-motor.jpg',
      author: 'Dr. Elena Rostova',
      authorRole: 'Doctor of Physical Therapy & Neuromuscular Specialist',
      authorImg: 'assets/images/therapist-rostova.jpg',
      date: 'Aug 02, 2026',
      readingTime: '6 min read',
      tags: 'stroke recovery motor control coordination neurological neuroplasticity upper extremity rehabilitation CIMT fine motor',
      relatedSlugs: ['neurological-gait-balance-rehabilitation', 'vestibular-rehabilitation-vertigo'],
      content: `
        <p class="lead text-main">
          Regaining functional dexterity and selective motor control of the upper extremity after a cerebrovascular accident requires structured, high-repetition neuromuscular retraining.
        </p>
        <p>
          Learned non-use occurs rapidly when patients compensate exclusively with their unaffected limb. Task-oriented training and graded sensory facilitation compel damaged cortical networks to re-establish efferent motor signals to paretic muscles.
        </p>

        <div class="p-4 bg-surface-alt border-start border-4 border-primary rounded-3 my-4">
          <p class="fst-italic mb-0 text-main fw-semibold">
            "Targeted reach-to-grasp tasks using tactile sensory cones and coordination blocks recruit proprioceptive feedback loops, dramatically speeding up cortical remapping and functional hand recovery."
          </p>
          <small class="text-muted d-block mt-2">— Dr. Elena Rostova, Neuromuscular Specialist</small>
        </div>

        <h3 class="h3 mt-4 mb-3">1. Graded Tactile Reaching &amp; Object Stacking</h3>
        <p>
          Progressing from large cylindrical grasps to fine sensory block manipulation builds agonist-antagonist co-activation, reducing spastic flexor synergies and restoring volitional finger extension.
        </p>

        <h3 class="h3 mt-4 mb-3">2. Proximal Scapular Stability for Distal Dexterity</h3>
        <p>
          Fine motor manipulation is impossible without proximal stabilization. Therapists pair table-top motor drills with serratus anterior and rhomboid activation to anchor the shoulder girdle during reaching cycles.
        </p>

        <h3 class="h3 mt-4 mb-3">3. High-Repetition Functional Task Practice</h3>
        <p>
          Engaging in 300+ purposeful reaching repetitions per therapy session induces long-term potentiation (LTP) at synaptic junctions, transferring clinical coordination gains into daily living independence.
        </p>
      `
    },
    {
      id: 'hamstring-strain',
      slug: 'hamstring-strain-nordic-protocol',
      title: 'Hamstring Strain Rehabilitation: High-Velocity Sprinting & Nordic Curls',
      category: 'Sports Injuries',
      categorySlug: 'sports-injuries',
      badge: 'Sports Recovery',
      description: 'Evidence-based eccentric protocols, biceps femoris fascicle lengthening, and high-speed running exposure to eliminate re-injury risks.',
      image: 'assets/images/home2-hero-athlete.jpg',
      author: 'Dr. Marcus Vance',
      authorRole: 'Head of Sports Rehabilitation & Kinetic Performance',
      authorImg: 'assets/images/therapist-vance.jpg',
      date: 'Jul 04, 2026',
      readingTime: '6 min read',
      tags: 'hamstring strain athlete sprinting running nordic curl sports injuries',
      relatedSlugs: ['acl-reconstruction-biomechanical-roadmap', 'patellofemoral-pain-runners-knee'],
      content: `
        <p class="lead text-main">Hamstring muscle strains are the single most frequent non-contact sports injury in sprinting disciplines. Over 75% involve the long head of the biceps femoris during late terminal swing phase.</p>
        <p>Progressive eccentric strength training with Nordic hamstring curls increases muscle fascicle length, shifting the peak torque angle toward longer muscle lengths where injuries typically occur.</p>
      `
    },
    {
      id: 'thoracic-mobility',
      slug: 'thoracic-mobility-rotational-sports',
      title: 'Thoracic Spine Extension & Rib Mobility for Rotational Athletes',
      category: 'Joint Mobility',
      categorySlug: 'joint-mobility',
      badge: 'Joint Mobility',
      description: 'Why a stiff mid-back causes shoulder impingement and lower back torque in golfers and tennis players, and 4 clinical rotational drills.',
      image: 'assets/images/blog-joint-thoracic.jpg',
      author: 'Dr. David Chen',
      authorRole: 'Senior Physical Therapist & Ergonomics Consultant',
      authorImg: 'assets/images/therapist-chen.jpg',
      date: 'Jun 28, 2026',
      readingTime: '5 min read',
      tags: 'thoracic spine mobility rotation golf tennis rib cage posture extension',
      relatedSlugs: ['throwers-shoulder-scapular-dyskinesis', 'lumbar-lordosis-pelvic-tilt'],
      content: `
        <p class="lead text-main">The thoracic spine is engineered for rotation and extension, but prolonged seated postures create kyphotic stiffness that forces the lumbar spine and shoulder complex to compensate abnormally during rotational sports.</p>
        <p>Restoring 40 to 45 degrees of isolated thoracic rotation protects the lumbar discs from destructive shear stresses and enhances rotational clubhead and racket velocity.</p>
      `
    },
    {
      id: 'glenohumeral-joint-mobility',
      slug: 'glenohumeral-joint-mobilization-shoulder-mobility',
      title: 'Glenohumeral Joint Mobilization: Restoring Overhead Shoulder Mobility',
      category: 'Joint Mobility',
      categorySlug: 'joint-mobility',
      badge: 'Joint Mobility',
      description: 'Maitland inferior and posterior capsular glides, rotator cuff centralization, and active-assisted protocols restoring pain-free overhead reach.',
      image: 'assets/images/blog-joint-shoulder.jpg',
      author: 'Dr. David Chen',
      authorRole: 'Senior Physical Therapist & Certified Manual Physical Therapist (CMPT)',
      authorImg: 'assets/images/therapist-chen.jpg',
      date: 'Jun 22, 2026',
      readingTime: '6 min read',
      tags: 'shoulder joint mobility glenohumeral capsular glide overhead reach impingement manual therapy',
      relatedSlugs: ['thoracic-mobility-rotational-sports', 'hip-impingement-fai-rehabilitation', 'rotator-cuff-tears-surgery-vs-therapy'],
      content: `
        <p class="lead text-main">Overhead shoulder mobility requires seamless arthrokinematic glide of the humeral head within the glenoid fossa. When the posterior or inferior joint capsule contracts, abnormal superior humeral migration pinches subacromial structures.</p>
        <p>Specific Maitland Grade III and IV oscillatory joint mobilizations restore caudal glide, instantly freeing overhead elevation and eliminating painful impingement arc symptoms.</p>
      `
    },
    {
      id: 'core-stability',
      slug: 'core-stability-transverse-abdominis',
      title: 'Deep Core Stability: Transverse Abdominis & Pelvic Floor Synchronization',
      category: 'Spine Care',
      categorySlug: 'spine-care',
      badge: 'Spine Care',
      description: 'Moving beyond sit-ups: how true neuromuscular intra-abdominal pressure bracing stabilizes the lumbar spine and prevents recurrent disc bulges.',
      image: 'assets/images/blog-core-birddog.jpg',
      author: 'Dr. Sarah Jenkins',
      authorRole: 'Clinical Director & Orthopedic Spine Specialist',
      authorImg: 'assets/images/therapist-jenkins.jpg',
      date: 'Jun 15, 2026',
      readingTime: '6 min read',
      tags: 'core stability transverse abdominis pelvic floor spine care back pain lumbar',
      relatedSlugs: ['5-proven-exercises-for-sciatica', 'lumbar-lordosis-pelvic-tilt'],
      content: `
        <p class="lead text-main">True core stability is not measured by six-pack superficial rectus abdominis strength, but by the anticipatory neuromuscular firing of the deep transverse abdominis, multifidus, and pelvic floor muscles.</p>
        <p>Co-contraction of these deep stabilizers forms a natural biomechanical corset that maintains intra-abdominal pressure, eliminating excessive micro-motion across sensitive lumbar facet joints.</p>
      `
    }
  ];

  // =========================================================================
  // 1b. Fast Lookup Maps & Alias Resolution
  // =========================================================================
  const ARTICLES_BY_SLUG = {};
  const ARTICLES_BY_ID = {};
  const ARTICLES_BY_ALIAS = {};

  ALL_ARTICLES.forEach(art => {
    ARTICLES_BY_SLUG[art.slug] = art;
    ARTICLES_BY_ID[art.id] = art;
    ARTICLES_BY_ALIAS[art.slug.toLowerCase()] = art;
    ARTICLES_BY_ALIAS[art.id.toLowerCase()] = art;
  });

  // Explicit aliases for query resilience
  const ALIAS_MAP = {
    'chronic-myofascial-pain': 'chronic-myofascial-pain',
    'chronic-myofascial-pain-trigger-point': 'chronic-myofascial-pain',
    'understanding-knee-osteoarthritis': 'knee-osteoarthritis',
    'knee-osteoarthritis': 'knee-osteoarthritis',
    'nerve-flossing-techniques': 'nerve-flossing',
    'nerve-flossing': 'nerve-flossing',
    '5-proven-exercises-for-sciatica': 'sciatica-exercises',
    'sciatica': 'sciatica-exercises',
    'sciatica-exercises': 'sciatica-exercises',
    'rotator-cuff-tears-surgery-vs-therapy': 'rotator-cuff-tears',
    'rotator-cuff-tears': 'rotator-cuff-tears',
    'patellofemoral-pain-runners-knee': 'runners-knee',
    'runners-knee': 'runners-knee',
    'throwers-shoulder-scapular-dyskinesis': 'throwers-shoulder',
    'throwers-shoulder': 'throwers-shoulder',
    'acl-reconstruction-biomechanical-roadmap': 'acl-reconstruction',
    'acl-reconstruction': 'acl-reconstruction',
    'forward-head-posture-tech-neck': 'forward-head-posture',
    'forward-head-posture': 'forward-head-posture',
    'lumbar-lordosis-pelvic-tilt': 'lumbar-lordosis',
    'lumbar-lordosis': 'lumbar-lordosis',
    'mckenzie-method-lumbar-disc-bulges': 'mckenzie-method',
    'mckenzie-method': 'mckenzie-method',
    'cervical-radiculopathy-disc-herniation': 'cervical-radiculopathy',
    'cervical-radiculopathy': 'cervical-radiculopathy',
    'office-ergonomics-lumbar-support': 'office-ergonomics',
    'office-ergonomics': 'office-ergonomics',
    'standing-desk-vs-ergonomic-chair': 'standing-desk',
    'standing-desk': 'standing-desk',
    'carpal-tunnel-mouse-keyboard-ergonomics': 'repetitive-strain-injury',
    'repetitive-strain-injury': 'repetitive-strain-injury',
    'carpal-tunnel': 'repetitive-strain-injury',
    'complete-ergonomic-workstation-blueprint': 'workstation-blueprint',
    'workstation-blueprint': 'workstation-blueprint',
    'post-concussion-baseline-voms-protocol': 'post-concussion-baseline',
    'post-concussion-baseline': 'post-concussion-baseline',
    'post-concussion': 'post-concussion-baseline',
    'concussion': 'post-concussion-baseline',
    'acl-return-to-play': 'acl-reconstruction',
    'overhead-athlete-arm-care': 'throwers-shoulder',
    'endurance-runner-gait-lab': 'runners-knee',
    'glenohumeral-joint-mobility': 'glenohumeral-joint-mobility',
    'glenohumeral-joint-mobilization-shoulder-mobility': 'glenohumeral-joint-mobility',
    'neurological-gait-balance-rehabilitation': 'neuro-gait-rehab',
    'neuro-gait-rehab': 'neuro-gait-rehab',
    'post-stroke-motor-control-coordination': 'neuro-motor-control',
    'neuro-motor-control': 'neuro-motor-control',
    'vestibular-rehabilitation-vertigo': 'vestibular-vertigo',
    'vestibular-vertigo': 'vestibular-vertigo',
    'total-hip-replacement-post-op-rehabilitation': 'total-hip-arthroplasty',
    'total-hip-arthroplasty': 'total-hip-arthroplasty'
  };

  // Featured Category mapping
  const CATEGORY_FEATURED = {
    all: ARTICLES_BY_SLUG['5-proven-exercises-for-sciatica'],
    'pain-relief': ARTICLES_BY_SLUG['5-proven-exercises-for-sciatica'],
    'sports-injuries': ARTICLES_BY_SLUG['acl-reconstruction-biomechanical-roadmap'],
    'spine-care': ARTICLES_BY_SLUG['cervical-radiculopathy-disc-herniation'],
    'ergonomics': ARTICLES_BY_SLUG['complete-ergonomic-workstation-blueprint'],
    'joint-mobility': ARTICLES_BY_SLUG['hip-impingement-fai-rehabilitation'],
    neurological: ARTICLES_BY_SLUG['vestibular-rehabilitation-vertigo'],
    'post-op-rehab': ARTICLES_BY_SLUG['total-knee-arthroplasty-rehab']
  };

  // Grid posts (12 items)
  const GRID_POSTS = ALL_ARTICLES;

  // Helper APIs exposed globally
  window.PhysioLifeBlog = {
    articles: ALL_ARTICLES,
    gridPosts: GRID_POSTS,
    categoryFeatured: CATEGORY_FEATURED,
    getArticle: function (slugOrId) {
      if (!slugOrId) return CATEGORY_FEATURED.all;
      const key = String(slugOrId).trim().toLowerCase();
      if (ARTICLES_BY_SLUG[key]) return ARTICLES_BY_SLUG[key];
      if (ARTICLES_BY_ID[key]) return ARTICLES_BY_ID[key];
      if (ARTICLES_BY_ALIAS[key]) return ARTICLES_BY_ALIAS[key];
      if (ALIAS_MAP[key] && ARTICLES_BY_ID[ALIAS_MAP[key]]) {
        return ARTICLES_BY_ID[ALIAS_MAP[key]];
      }
      // Resilient partial substring matching
      for (const art of ALL_ARTICLES) {
        if (key.includes(art.id) || art.slug.toLowerCase().includes(key) || key.includes(art.slug.toLowerCase())) {
          return art;
        }
      }
      return CATEGORY_FEATURED.all;
    },
    getRelatedArticles: function (slug, limit = 3) {
      const art = window.PhysioLifeBlog.getArticle(slug);
      if (art && art.relatedSlugs) {
        const related = art.relatedSlugs.map(s => window.PhysioLifeBlog.getArticle(s)).filter(Boolean);
        if (related.length) return related.slice(0, limit);
      }
      return ALL_ARTICLES.filter(a => a.slug !== (art ? art.slug : slug)).slice(0, limit);
    },
    searchArticles: function (query, limit = 5) {
      if (!query) return [];
      const q = query.toLowerCase().trim();
      return ALL_ARTICLES.filter(art => {
        const fullText = (art.title + ' ' + art.description + ' ' + art.category + ' ' + art.tags).toLowerCase();
        return fullText.includes(q);
      }).slice(0, limit);
    },
    getAuthorTherapistId: function (authorOrArticle) {
      return getAuthorTherapistId(authorOrArticle);
    }
  };

  /**
   * Helper: Resolves the therapist profile ID for any blog author
   */
  function getAuthorTherapistId(authorOrArticle) {
    if (!authorOrArticle) return 'jenkins';
    if (typeof authorOrArticle === 'object') {
      if (authorOrArticle.authorId) return authorOrArticle.authorId;
      authorOrArticle = authorOrArticle.author || '';
    }
    const name = String(authorOrArticle).toLowerCase();
    if (name.includes('vance') || name.includes('marcus')) return 'vance';
    if (name.includes('chen') || name.includes('david')) return 'chen';
    if (name.includes('rostova') || name.includes('elena')) return 'rostova';
    if (name.includes('jenkins') || name.includes('sarah')) return 'jenkins';
    return 'jenkins';
  }

  // =========================================================================
  // 2. Blog Listing Page Filter & Search Controller (Runs on blog.html)
  // =========================================================================
  function initBlogListingPage() {
    const categoryBtns = document.querySelectorAll('#blogCategoryFilters .category-pill, #blogCategoryFilters .filter-btn');
    const searchInput = document.getElementById('blogSearchInput');
    const clearSearchBtn = document.getElementById('clearBlogSearchBtn');
    const resetFiltersBtn = document.getElementById('resetFiltersBtn');
    const featuredContainer = document.getElementById('featuredSection');
    const gridContainer = document.getElementById('blogGridContainer');
    const noPostsFound = document.getElementById('noPostsFound');
    const pagination = document.getElementById('blogPagination');

    if (!gridContainer && !featuredContainer) {
      return; // Not on blog.html
    }

    let activeCategory = 'all';
    let currentPage = 1;
    const POSTS_PER_PAGE = 6;
    let currentFilteredPosts = [];

    /**
     * Ensure all cards on page have dynamic links bound from their unique ID/slug
     */
    function updateStaticCardLinks() {
      const staticCards = document.querySelectorAll('.blog-post-card');
      staticCards.forEach(card => {
        const pid = card.getAttribute('data-id');
        const article = window.PhysioLifeBlog.getArticle(pid);
        if (article) {
          const titleLink = card.querySelector('.blog-title a');
          const actionLink = card.querySelector('.service-link') || card.querySelector('a.mt-auto');
          const imgWrap = card.querySelector('.blog-img-wrap');

          if (titleLink) titleLink.href = `blog-details.html?slug=${article.slug}`;
          if (actionLink) actionLink.href = `blog-details.html?slug=${article.slug}`;
          if (imgWrap && !imgWrap.querySelector('a')) {
            const img = imgWrap.querySelector('img');
            if (img) {
              const imgAnchor = document.createElement('a');
              imgAnchor.href = `blog-details.html?slug=${article.slug}`;
              imgWrap.insertBefore(imgAnchor, img);
              imgAnchor.appendChild(img);
            }
          }
        }
      });
    }

    /**
     * Render the Category-Aware Featured Post Section
     */
    function renderFeatured(category, query) {
      if (!featuredContainer) return false;

      const post = CATEGORY_FEATURED[category] || CATEGORY_FEATURED.all;
      if (!post) {
        featuredContainer.innerHTML = '';
        featuredContainer.style.display = 'none';
        return false;
      }

      // Check search match
      let matchesSearch = true;
      if (query) {
        const fullText = (
          post.title + ' ' +
          post.description + ' ' +
          post.category + ' ' +
          post.author + ' ' +
          post.tags
        ).toLowerCase();
        matchesSearch = fullText.includes(query);
      }

      if (!matchesSearch) {
        featuredContainer.innerHTML = '';
        featuredContainer.style.display = 'none';
        return false;
      }

      featuredContainer.style.display = 'block';
      featuredContainer.innerHTML = `
        <div class="p-4 p-lg-5 bg-surface-alt rounded-4 border border-subtle featured-post-item" data-category="${post.categorySlug}" data-slug="${post.slug}">
          <div class="row align-items-center g-4">
            <div class="col-lg-6">
              <a href="blog-details.html?slug=${post.slug}">
                <img src="${post.image}" alt="${post.title}" class="rounded-4 w-100 shadow-sm object-fit-cover" style="max-height: 340px;">
              </a>
            </div>
            <div class="col-lg-6">
              <span class="badge-tag">${post.badge}</span>
              <div class="d-flex align-items-center gap-3 text-muted small mb-2">
                <a href="therapist-details.html?id=${getAuthorTherapistId(post)}" class="featured-author text-decoration-none text-muted" title="View Specialist Profile"><i class="fas fa-user-md me-1 text-primary"></i> ${post.author}</a>
                <span><i class="far fa-calendar-alt me-1"></i> ${post.date}</span>
                <span><i class="far fa-clock me-1"></i> ${post.readingTime}</span>
              </div>
              <h2 class="h2 mb-3">
                <a href="blog-details.html?slug=${post.slug}" class="text-heading">${post.title}</a>
              </h2>
              <p class="text-muted mb-4">${post.description}</p>
              <a href="blog-details.html?slug=${post.slug}" class="btn btn-primary">Read Full Guide <i class="fas fa-arrow-right ms-2"></i></a>
            </div>
          </div>
        </div>
      `;
      return true;
    }

    /**
     * Render the Blog Articles Grid (6 containers per view)
     */
    function renderGrid(posts) {
      if (!gridContainer) return;

      if (!posts || posts.length === 0) {
        gridContainer.innerHTML = '';
        return;
      }

      gridContainer.innerHTML = posts.map(post => `
        <div class="col-12 col-md-6 col-lg-4 blog-post-card" data-category="${post.categorySlug}" data-id="${post.id}" data-tags="${post.tags}">
          <div class="blog-card-ref" style="cursor: pointer;">
            <div class="card-img-container">
              <a href="blog-details.html?slug=${post.slug}">
                <img src="${post.image}" alt="${post.altText || post.title}" loading="lazy">
              </a>
            </div>
            <div class="card-body-ref">
              <div class="meta-row">
                <span class="category-tag-ref">${post.category}</span>
                <span class="read-time-ref"><i class="far fa-clock me-1"></i>${post.readingTime}</span>
              </div>
              <h4 class="title-ref">
                <a href="blog-details.html?slug=${post.slug}">${post.title}</a>
              </h4>
              <p class="excerpt-ref">${post.description}</p>
              <div class="card-footer-ref text-center mt-auto pt-2">
                <a href="blog-details.html?slug=${post.slug}" class="link-ref">
                  Read Full Guide <i class="fas fa-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      `).join('');
    }

    /**
     * Render Interactive Pagination Controls (Reference Spec)
     */
    function renderPagination(totalPages, activePage) {
      if (!pagination) return;

      if (totalPages <= 1) {
        pagination.classList.add('d-none');
        pagination.innerHTML = '';
        return;
      }

      pagination.classList.remove('d-none');

      let pagesHtml = '';
      for (let i = 1; i <= totalPages; i++) {
        pagesHtml += `
          <li class="page-item ${i === activePage ? 'active' : ''}">
            <a class="page-link" href="#" data-page="${i}" aria-label="Page ${i}">${i}</a>
          </li>
        `;
      }

      pagination.classList.add('blog-pagination-ref');
      pagination.innerHTML = `
        <ul class="pagination justify-content-center">
          <li class="page-item ${activePage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" data-page="${activePage - 1}" aria-label="Previous"><i class="fas fa-chevron-left me-1"></i> Prev</a>
          </li>
          ${pagesHtml}
          <li class="page-item ${activePage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" data-page="${activePage + 1}" aria-label="Next">Next <i class="fas fa-chevron-right ms-1"></i></a>
          </li>
        </ul>
      `;
    }

    /**
     * Render Current Page of Articles (6 containers per page)
     */
    function renderCurrentPage(shouldScroll = false) {
      const totalPosts = currentFilteredPosts.length;
      const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

      if (totalPages > 0 && currentPage > totalPages) {
        currentPage = 1;
      }

      const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
      const pagedPosts = currentFilteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

      renderGrid(pagedPosts);
      renderPagination(totalPages, currentPage);

      if (shouldScroll) {
        const scrollTarget = document.getElementById('blogGridContainer') || document.getElementById('blogCategoryFilters');
        if (scrollTarget) {
          scrollTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }

    /**
     * Filter Execution
     */
    function filterBlog() {
      const query = searchInput ? searchInput.value.trim().toLowerCase() : '';

      if (clearSearchBtn) {
        if (query.length > 0) {
          clearSearchBtn.classList.remove('d-none');
        } else {
          clearSearchBtn.classList.add('d-none');
        }
      }

      const featuredVisible = renderFeatured(activeCategory, query);

      currentFilteredPosts = GRID_POSTS.filter(post => {
        const matchCat = (activeCategory === 'all' || post.categorySlug === activeCategory);
        if (!matchCat) return false;

        if (query) {
          const fullText = (
            post.title + ' ' +
            post.description + ' ' +
            post.category + ' ' +
            post.author + ' ' +
            post.tags
          ).toLowerCase();
          return fullText.includes(query);
        }

        return true;
      });

      renderCurrentPage(false);

      // Update Live Article Counter (ArtCraft Reference Spec)
      const countDisplay = document.getElementById('articleCountDisplay') || document.getElementById('visibleArticleCount');
      if (countDisplay) {
        countDisplay.textContent = currentFilteredPosts.length;
      }

      const totalVisible = currentFilteredPosts.length;
      if (noPostsFound) {
        if (totalVisible === 0) {
          noPostsFound.classList.remove('d-none');
        } else {
          noPostsFound.classList.add('d-none');
        }
      }
    }

    // Category Button Event Listeners
    categoryBtns.forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        categoryBtns.forEach(b => {
          b.classList.remove('btn-primary', 'active');
          if (b.classList.contains('filter-btn')) b.classList.add('btn-outline-secondary');
        });
        if (this.classList.contains('filter-btn')) this.classList.remove('btn-outline-secondary');
        this.classList.add('active');
        if (this.classList.contains('filter-btn')) this.classList.add('btn-primary');

        activeCategory = this.getAttribute('data-category') || 'all';
        currentPage = 1;
        filterBlog();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', () => {
        currentPage = 1;
        filterBlog();
      });
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          const target = document.getElementById('blogGridContainer') || document.getElementById('blogSearchInput');
          if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }

    const blogSearchForm = document.getElementById('blogSearchForm');
    if (blogSearchForm) {
      blogSearchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const target = document.getElementById('blogGridContainer') || document.getElementById('blogSearchInput');
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }

    const searchIconBtn = document.getElementById('blogSearchIconBtn') || document.querySelector('.blog-search-pill .search-icon');
    if (searchIconBtn) {
      searchIconBtn.style.cursor = 'pointer';
      searchIconBtn.addEventListener('click', () => {
        if (searchInput) {
          searchInput.focus();
          const target = document.getElementById('blogGridContainer') || document.getElementById('blogSearchInput');
          if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }

    if (clearSearchBtn) {
      clearSearchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (searchInput) {
          searchInput.value = '';
          currentPage = 1;
          filterBlog();
          searchInput.focus();
        }
      });
    }

    if (resetFiltersBtn) {
      resetFiltersBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (searchInput) searchInput.value = '';
        activeCategory = 'all';
        currentPage = 1;

        categoryBtns.forEach(b => {
          b.classList.remove('btn-primary', 'active');
          b.classList.add('btn-outline-secondary');
          if (b.getAttribute('data-category') === 'all') {
            b.classList.remove('btn-outline-secondary');
            b.classList.add('btn-primary', 'active');
          }
        });

        filterBlog();
      });
    }

    // Interactive Pagination Event Delegation
    if (pagination) {
      pagination.addEventListener('click', (e) => {
        const link = e.target.closest('.page-link');
        if (!link) return;
        e.preventDefault();

        const parentItem = link.closest('.page-item');
        if (parentItem && parentItem.classList.contains('disabled')) return;

        const targetPage = parseInt(link.getAttribute('data-page'), 10);
        const totalPages = Math.ceil(currentFilteredPosts.length / POSTS_PER_PAGE);

        if (!isNaN(targetPage) && targetPage >= 1 && targetPage <= totalPages && targetPage !== currentPage) {
          currentPage = targetPage;
          renderCurrentPage(true);
        }
      });
    }

    // Expose programmatic pagination helpers for testing and external integrations
    window.PhysioLifeBlog.setPage = function(pageNumber) {
      const totalPages = Math.ceil(currentFilteredPosts.length / POSTS_PER_PAGE);
      if (pageNumber >= 1 && pageNumber <= totalPages) {
        currentPage = pageNumber;
        renderCurrentPage(false);
      }
    };
    window.PhysioLifeBlog.getPage = function() {
      return currentPage;
    };
    window.PhysioLifeBlog.getTotalPages = function() {
      return Math.ceil(currentFilteredPosts.length / POSTS_PER_PAGE);
    };
    window.PhysioLifeBlog.getVisiblePosts = function() {
      const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
      return currentFilteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
    };

    // Card Click & Link Delegation: Seamlessly records the selected article slug
    document.addEventListener('click', (e) => {
      const card = e.target.closest('.blog-post-card, .featured-post-item');
      if (!card) return;

      const link = e.target.closest('a');
      let targetHref = null;

      if (link && link.getAttribute('href') && link.getAttribute('href').includes('blog-details.html')) {
        targetHref = link.getAttribute('href');
      } else if (!link) {
        // Clicking directly on the card background
        const primaryLink = card.querySelector('h2 a, h4 a, .service-link, .btn-primary, .link-ref');
        if (primaryLink && primaryLink.getAttribute('href')) {
          targetHref = primaryLink.getAttribute('href');
        }
      }

      if (targetHref) {
        try {
          const match = targetHref.match(/[?&](?:slug|id)=([^&#]+)/);
          if (match && match[1]) {
            sessionStorage.setItem('physiolife_active_slug', decodeURIComponent(match[1]));
          }
        } catch (err) {}

        if (!link) {
          window.location.href = targetHref;
        }
      }
    });

    // Read and apply URL Search Parameters (e.g., ?q=knee or ?category=sports-injuries)
    const urlParams = new URLSearchParams(window.location.search);
    const urlQuery = urlParams.get('q') || urlParams.get('search') || urlParams.get('topic') || urlParams.get('query');
    const urlCategory = urlParams.get('category') || urlParams.get('cat');

    if (urlCategory) {
      const matchingBtn = Array.from(categoryBtns).find(b => b.getAttribute('data-category') === urlCategory);
      if (matchingBtn) {
        categoryBtns.forEach(b => {
          b.classList.remove('btn-primary', 'active');
          if (b.classList.contains('filter-btn')) b.classList.add('btn-outline-secondary');
        });
        if (matchingBtn.classList.contains('filter-btn')) matchingBtn.classList.remove('btn-outline-secondary');
        matchingBtn.classList.add('active');
        if (matchingBtn.classList.contains('filter-btn')) matchingBtn.classList.add('btn-primary');
        activeCategory = urlCategory;
      }
    }

    if (urlQuery && searchInput) {
      searchInput.value = urlQuery;
      if (clearSearchBtn) {
        clearSearchBtn.classList.remove('d-none');
      }
    }

    // Ensure links are bound on existing DOM cards and perform initial render
    updateStaticCardLinks();
    filterBlog();

    // Smoothly scroll to results if opened with query parameters
    if (urlQuery || (urlCategory && urlCategory !== 'all')) {
      setTimeout(() => {
        const scrollTarget = document.getElementById('blogSearchInput') || document.getElementById('blogGridContainer');
        if (scrollTarget) {
          scrollTarget.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 150);
    }
  }

  // =========================================================================
  // 3. Blog Details Page Controller (Runs on blog-details.html)
  // =========================================================================
  function initBlogDetailsPage() {
    const articleContainer = document.getElementById('articleBodyContainer');
    if (!articleContainer) {
      return; // Not on blog-details.html
    }

    // Read slug or id from URL query parameters or fallback to hash or sessionStorage
    const urlParams = new URLSearchParams(window.location.search);
    let slug = urlParams.get('slug') || urlParams.get('id') || urlParams.get('post');

    if (!slug && window.location.hash) {
      slug = window.location.hash.replace('#', '').trim();
    }

    if (!slug) {
      try {
        slug = sessionStorage.getItem('physiolife_active_slug');
      } catch (err) {}
    }

    const article = window.PhysioLifeBlog.getArticle(slug);

    if (article) {
      // 1. Update Document Metadata
      document.title = `${article.title} – PhysioLife Blog`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', article.description);
      }

      // 2. Update Breadcrumb
      const breadcrumb = document.getElementById('articleBreadcrumb');
      if (breadcrumb) {
        breadcrumb.textContent = article.title.length > 35 ? article.title.substring(0, 32) + '...' : article.title;
      }

      // 3. Update Category Badge Tag
      const badgeTag = document.getElementById('articleBadgeTag');
      if (badgeTag) {
        badgeTag.textContent = article.badge || article.category;
      }

      // 4. Update Article Title
      const titleEl = document.getElementById('articleTitle');
      if (titleEl) {
        titleEl.textContent = article.title;
      }

      // 5. Update Author Header Info
      const authorTherapistId = getAuthorTherapistId(article);
      const therapistProfileUrl = `therapist-details.html?id=${encodeURIComponent(authorTherapistId)}`;

      const authorImg = document.getElementById('articleAuthorImg');
      if (authorImg) {
        authorImg.src = article.authorImg;
        authorImg.alt = article.author;
      }
      const authorName = document.getElementById('articleAuthorName');
      if (authorName) {
        authorName.textContent = `${article.author}, PT, DPT`;
      }
      const authorHeaderLink = document.getElementById('articleAuthorHeaderLink');
      if (authorHeaderLink) {
        authorHeaderLink.href = therapistProfileUrl;
        authorHeaderLink.title = `View Specialist Profile of ${article.author}`;
      }
      const pubDate = document.getElementById('articleDate');
      if (pubDate) {
        pubDate.innerHTML = `<i class="far fa-calendar-alt text-primary me-1"></i> Published: ${article.date}`;
      }
      const readTime = document.getElementById('articleReadingTime');
      if (readTime) {
        readTime.innerHTML = `<i class="far fa-clock text-primary me-1"></i> ${article.readingTime}`;
      }

      // 6. Update Featured Hero Image
      const featuredImg = document.getElementById('articleFeaturedImg');
      if (featuredImg) {
        featuredImg.src = article.image;
        featuredImg.alt = article.altText || article.title;
      }

      // 7. Update Article Body Content
      articleContainer.innerHTML = article.content;

      // 8. Update Tags
      const tagsContainer = document.getElementById('articleTagsContainer');
      if (tagsContainer) {
        const tagList = article.tags.split(' ').filter(Boolean).slice(0, 4);
        tagsContainer.innerHTML = tagList.map(t => `<span class="badge bg-primary-subtle text-primary text-capitalize">${t}</span>`).join(' ');
      }

      // 9. Update Author Profile Box & Interactive Redirection
      const authorBoxImg = document.getElementById('authorBoxImg');
      if (authorBoxImg) {
        authorBoxImg.src = article.authorImg;
        authorBoxImg.alt = article.author;
      }
      const authorBoxImgLink = document.getElementById('authorBoxImgLink');
      if (authorBoxImgLink) {
        authorBoxImgLink.href = therapistProfileUrl;
        authorBoxImgLink.title = `View Specialist Profile of ${article.author}`;
      }
      const authorBoxName = document.getElementById('authorBoxName');
      if (authorBoxName) {
        authorBoxName.textContent = `Written by ${article.author}`;
      }
      const authorBoxNameLink = document.getElementById('authorBoxNameLink');
      if (authorBoxNameLink) {
        authorBoxNameLink.href = therapistProfileUrl;
        authorBoxNameLink.title = `View Specialist Profile of ${article.author}`;
      }
      const authorBoxBio = document.getElementById('authorBoxBio');
      if (authorBoxBio) {
        authorBoxBio.textContent = `${article.authorRole} at PhysioLife with extensive clinical experience in evidence-based rehabilitation protocols.`;
      }
      const authorBoxLink = document.getElementById('authorBoxLink');
      if (authorBoxLink) {
        authorBoxLink.href = therapistProfileUrl;
        authorBoxLink.title = `View Specialist Profile of ${article.author}`;
      }
      const authorBoxContainer = document.getElementById('authorBoxContainer');
      if (authorBoxContainer) {
        authorBoxContainer.setAttribute('data-href', therapistProfileUrl);
        authorBoxContainer.onclick = function (e) {
          if (e.target.closest('a')) return;
          window.location.href = therapistProfileUrl;
        };
      }

      // 10. Update Related Articles Widget
      const relatedContainer = document.getElementById('relatedArticlesList');
      if (relatedContainer) {
        const relatedPosts = window.PhysioLifeBlog.getRelatedArticles(article.slug, 3);
        relatedContainer.innerHTML = relatedPosts.map(rel => `
          <div class="d-flex align-items-center gap-3 border-bottom border-subtle pb-3">
            <a href="blog-details.html?slug=${rel.slug}">
              <img src="${rel.image}" alt="${rel.title}" class="rounded-3 object-fit-cover" width="70" height="70">
            </a>
            <div>
              <span class="badge bg-surface-alt text-muted small mb-1">${rel.category}</span>
              <h6 class="mb-1 fw-bold" style="font-size: 0.9rem; line-height: 1.3;">
                <a href="blog-details.html?slug=${rel.slug}" class="text-main">${rel.title}</a>
              </h6>
              <span class="text-muted small"><i class="far fa-clock me-1"></i> ${rel.readingTime}</span>
            </div>
          </div>
        `).join('');
      }

      // 11. Normalize URL query parameter if missing or different
      try {
        if (window.location.protocol !== 'file:' && window.history && window.history.replaceState && (!urlParams.get('slug') || urlParams.get('slug') !== article.slug)) {
          const cleanUrl = new URL(window.location.href);
          cleanUrl.searchParams.set('slug', article.slug);
          window.history.replaceState({ slug: article.slug }, article.title, cleanUrl.toString());
        }
      } catch (e) {}
    }

    // 12. Setup Sidebar "Search Blog" / "Search Topics" Widget
    setupBlogDetailsSearchWidget();
  }

  /**
   * Setup Interactive Search Widget on blog-details.html sidebar
   */
  function setupBlogDetailsSearchWidget() {
    const detailsSearchForm = document.getElementById('blogDetailsSearchForm');
    const detailsSearchInput = document.getElementById('blogSearchInput');
    const detailsSearchBtn = document.getElementById('blogSearchBtn');
    const suggestionsBox = document.getElementById('blogSearchSuggestions');

    function executeTopicSearch() {
      const q = detailsSearchInput ? detailsSearchInput.value.trim() : '';
      if (q) {
        window.location.href = 'blog.html?q=' + encodeURIComponent(q);
      } else {
        window.location.href = 'blog.html';
      }
    }

    window.PhysioLifeBlog.submitSearch = executeTopicSearch;

    if (detailsSearchForm) {
      detailsSearchForm.addEventListener('submit', function (e) {
        e.preventDefault();
        executeTopicSearch();
      });
    }

    if (detailsSearchBtn) {
      detailsSearchBtn.addEventListener('click', function (e) {
        e.preventDefault();
        executeTopicSearch();
      });
    }

    if (detailsSearchInput) {
      detailsSearchInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          executeTopicSearch();
        } else if (e.key === 'Escape') {
          if (suggestionsBox) suggestionsBox.classList.add('d-none');
        }
      });

      // Live search suggestions popup
      let debounceTimer = null;
      detailsSearchInput.addEventListener('input', function () {
        clearTimeout(debounceTimer);
        const val = this.value.trim().toLowerCase();
        if (!suggestionsBox) return;

        if (val.length < 2) {
          suggestionsBox.classList.add('d-none');
          suggestionsBox.innerHTML = '';
          return;
        }

        debounceTimer = setTimeout(() => {
          const matches = ALL_ARTICLES.filter(art => {
            const fullText = (art.title + ' ' + art.description + ' ' + art.category + ' ' + art.tags).toLowerCase();
            return fullText.includes(val);
          }).slice(0, 4);

          if (matches.length === 0) {
            suggestionsBox.innerHTML = `
              <div class="p-3 text-center text-muted small">
                No topics found matching "<strong>${escapeHtml(val)}</strong>".
                <a href="blog.html?q=${encodeURIComponent(val)}" class="d-block mt-2 text-primary fw-semibold">Search all on Blog &rarr;</a>
              </div>
            `;
            suggestionsBox.classList.remove('d-none');
            return;
          }

          suggestionsBox.innerHTML = `
            <div class="blog-suggestions-list">
              ${matches.map(m => `
                <a href="blog-details.html?slug=${m.slug}" class="blog-search-suggestion-item">
                  <img src="${m.image}" alt="${escapeHtml(m.title)}" class="blog-search-suggestion-img">
                  <div class="flex-grow-1 overflow-hidden">
                    <span class="badge bg-surface-alt text-muted" style="font-size: 0.7rem;">${m.category}</span>
                    <div class="blog-search-suggestion-title text-truncate">${highlightMatch(m.title, val)}</div>
                    <span class="blog-search-suggestion-meta"><i class="far fa-clock me-1"></i>${m.readingTime}</span>
                  </div>
                </a>
              `).join('')}
            </div>
            <a href="blog.html?q=${encodeURIComponent(val)}" class="blog-search-view-all">
              View all matching topics on blog &rarr;
            </a>
          `;
          suggestionsBox.classList.remove('d-none');
        }, 120);
      });

      // Close suggestions on outside click
      document.addEventListener('click', function (e) {
        if (suggestionsBox && !suggestionsBox.contains(e.target) && e.target !== detailsSearchInput && e.target !== detailsSearchBtn) {
          suggestionsBox.classList.add('d-none');
        }
      });
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function highlightMatch(text, query) {
    if (!query) return escapeHtml(text);
    const escapedText = escapeHtml(text);
    const safeQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp('(' + safeQuery + ')', 'gi');
    return escapedText.replace(regex, '<mark class="p-0 bg-warning-subtle fw-bold">$1</mark>');
  }

  // Expose init methods
  window.PhysioLifeBlog.initDetails = initBlogDetailsPage;
  window.PhysioLifeBlog.initListing = initBlogListingPage;

  // Resilient execution: triggers immediately if DOM is ready, or on DOMContentLoaded
  function initAll() {
    initBlogListingPage();
    initBlogDetailsPage();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

})();
