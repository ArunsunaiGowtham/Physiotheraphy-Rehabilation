const fs = require('fs');
const path = require('path');

const enginePath = path.join(__dirname, '..', 'assets', 'js', 'blog-engine.js');
let code = fs.readFileSync(enginePath, 'utf8');

// 1. The 10 new clinical articles to reach 27
const NEW_ARTICLES_CODE = `
    // --- 10 Additional Clinical Guides (Total = 27) ---
    {
      id: 'plantar-fasciitis',
      slug: 'plantar-fasciitis-shockwave-therapy',
      title: 'Plantar Fasciitis: Heel Pain Biomechanics & Extracorporeal Shockwave Therapy',
      category: 'Pain Relief',
      categorySlug: 'pain-relief',
      badge: 'Pain Relief',
      description: 'Understanding windlass mechanism strain, calcaneal spurs, and how radial shockwave therapy triggers neovascularization to resolve chronic morning heel stiffness.',
      image: 'assets/images/exercise-bridge.jpg',
      author: 'Dr. Sarah Jenkins',
      authorRole: 'Clinical Director & Orthopedic Spine Specialist',
      authorImg: 'assets/images/therapist-jenkins.jpg',
      date: 'Aug 12, 2026',
      readingTime: '6 min read',
      tags: 'plantar fasciitis heel pain foot arch shockwave therapy morning pain stretch',
      relatedSlugs: ['5-proven-exercises-for-sciatica', 'knee-osteoarthritis', 'patellofemoral-pain-runners-knee'],
      content: \`
        <p class="lead text-main">Plantar fasciitis is one of the most prevalent causes of chronic heel pain, affecting millions of active individuals and occupational workers who spend long hours standing on rigid surfaces.</p>
        <p>The hallmark symptom is severe, sharp pain under the medial calcaneal tuberosity upon taking the very first steps in the morning. When the foot is unloaded during sleep, the plantar fascia contracts into a shortened state; sudden weight-bearing applies rapid tensile strain across the micro-damaged collagen fibers.</p>
        <h3 class="h3 mt-4 mb-3">Radial Shockwave Therapy (ESWT)</h3>
        <p>Modern clinical evidence highlights Extracorporeal Shockwave Therapy (ESWT) as a non-invasive treatment that delivers high-energy acoustic pulses directly into degenerated fascial tissue, breaking down chronic scar adhesions and promoting tissue regeneration.</p>
      \`
    },
    {
      id: 'ankle-sprain-police',
      slug: 'ankle-sprain-police-protocol',
      title: 'Lateral Ankle Sprains: The Modern POLICE Protocol vs Outdated RICE',
      category: 'Sports Injuries',
      categorySlug: 'sports-injuries',
      badge: 'Sports Recovery',
      description: 'Why total immobilization delays ligament healing, and how Protection, Optimal Loading, and dynamic balance training restore ankle stability faster.',
      image: 'assets/images/home2-velocity-lab.jpg',
      author: 'Dr. Marcus Vance',
      authorRole: 'Head of Sports Rehabilitation & Kinetic Performance',
      authorImg: 'assets/images/therapist-vance.jpg',
      date: 'Aug 08, 2026',
      readingTime: '5 min read',
      tags: 'ankle sprain ligament tear police protocol sports injuries proprioception balance',
      relatedSlugs: ['acl-reconstruction-biomechanical-roadmap', 'patellofemoral-pain-runners-knee'],
      content: \`
        <p class="lead text-main">The traditional RICE protocol (Rest, Ice, Compression, Elevation) has been superseded in modern sports physical therapy by the evidence-based POLICE framework: Protection, Optimal Loading, Ice, Compression, and Elevation.</p>
        <p>Controlled mechanical loading stimulates collagen alignment in the anterior talofibular ligament (ATFL), accelerates lymphatic drainage, and preserves neuromuscular motor patterns in the lower extremity.</p>
      \`
    },
    {
      id: 'tennis-elbow',
      slug: 'tennis-elbow-lateral-epicondylitis',
      title: 'Tennis Elbow (Lateral Epicondylitis): Eccentric Wrist Extensor Loading',
      category: 'Pain Relief',
      categorySlug: 'pain-relief',
      badge: 'Pain Relief',
      description: 'How isolated eccentric loading of the extensor carpi radialis brevis regenerates chronic tendinopathy without cortisone injections.',
      image: 'assets/images/step-therapy.jpg',
      author: 'Dr. David Chen',
      authorRole: 'Senior Physical Therapist & Ergonomics Consultant',
      authorImg: 'assets/images/therapist-chen.jpg',
      date: 'Jul 26, 2026',
      readingTime: '5 min read',
      tags: 'tennis elbow lateral epicondylitis tendon wrist forearm eccentric grip pain',
      relatedSlugs: ['carpal-tunnel-mouse-keyboard-ergonomics', 'complete-ergonomic-workstation-blueprint'],
      content: \`
        <p class="lead text-main">Lateral epicondylalgia, commonly known as tennis elbow, is a tendinopathy characterized by degenerative micro-tears in the tendon of the extensor carpi radialis brevis (ECRB) from repetitive wrist extension and forearm pronation.</p>
        <p>Progressive eccentric exercises using resistance bars stimulate fibroblast remodeling, gradually increasing tendon tensile tolerance while reducing local hyperalgesia.</p>
      \`
    },
    {
      id: 'hip-impingement',
      slug: 'hip-impingement-fai-rehabilitation',
      title: 'Femoroacetabular Impingement (FAI): Hip Mobility & Deep Glute Activation',
      category: 'Joint Mobility',
      categorySlug: 'joint-mobility',
      badge: 'Joint Mobility',
      description: 'Cam and pincer morphological mechanics, anterior hip capsule mobilization, and pelvis control preventing early labral degeneration.',
      image: 'assets/images/service-joint.jpg',
      author: 'Dr. Elena Rostova',
      authorRole: 'Doctor of Physical Therapy & Neuromuscular Specialist',
      authorImg: 'assets/images/therapist-rostova.jpg',
      date: 'Jul 20, 2026',
      readingTime: '7 min read',
      tags: 'hip impingement fai labrum joint mobility groin pain glute strength cartilage',
      relatedSlugs: ['understanding-knee-osteoarthritis', 'lumbar-lordosis-pelvic-tilt'],
      content: \`
        <p class="lead text-main">Femoroacetabular Impingement (FAI) results from abnormal osseous contact between the femoral head-neck junction and acetabular rim during terminal hip flexion and internal rotation.</p>
        <p>Physical therapy restores hip capsular accessory glide, optimizes anterior pelvic tilt, and strengthens the posterior gluteal cuff to maintain joint congruency and avoid impingement pinch points.</p>
      \`
    },
    {
      id: 'total-knee-arthroplasty',
      slug: 'total-knee-arthroplasty-rehab',
      title: 'Total Knee Replacement: 12-Week Range of Motion & Gait Roadmap',
      category: 'Post-Op Rehab',
      categorySlug: 'post-op-rehab',
      badge: 'Post-Op Rehab',
      description: 'Step-by-step milestones to achieve 120-degree knee flexion, full terminal extension, and reciprocal stair climbing following joint replacement.',
      image: 'assets/images/service-postop.jpg',
      author: 'Dr. Sarah Jenkins',
      authorRole: 'Clinical Director & Orthopedic Spine Specialist',
      authorImg: 'assets/images/therapist-jenkins.jpg',
      date: 'Jul 15, 2026',
      readingTime: '8 min read',
      tags: 'total knee replacement arthroplasty post op rehab joint surgery gait stairs',
      relatedSlugs: ['understanding-knee-osteoarthritis', 'acl-reconstruction-biomechanical-roadmap'],
      content: \`
        <p class="lead text-main">Total Knee Arthroplasty (TKA) is a transformative procedure for advanced end-stage osteoarthritis, but long-term functional success hinges entirely on early, structured post-operative physical rehabilitation.</p>
        <p>Achieving 0 degrees of passive extension within the first 14 days and progressively expanding active knee flexion to 120 degrees ensures normal gait kinematics and pain-free stair descent.</p>
      \`
    },
    {
      id: 'vestibular-vertigo',
      slug: 'vestibular-rehabilitation-vertigo',
      title: 'Vestibular Rehabilitation: Canalith Repositioning & Balance Retraining for BPPV',
      category: 'Neurological',
      categorySlug: 'neurological',
      badge: 'Neurological',
      description: 'Understanding benign paroxysmal positional vertigo (BPPV), the Epley maneuver, and gaze stabilization exercises that restore spatial equilibrium.',
      image: 'assets/images/service-neuro.jpg',
      author: 'Dr. Elena Rostova',
      authorRole: 'Doctor of Physical Therapy & Neuromuscular Specialist',
      authorImg: 'assets/images/therapist-rostova.jpg',
      date: 'Jul 10, 2026',
      readingTime: '6 min read',
      tags: 'vestibular vertigo bppv dizziness balance epley neurological nystagmus',
      relatedSlugs: ['post-concussion-baseline-voms-protocol', 'forward-head-posture-tech-neck'],
      content: \`
        <p class="lead text-main">Benign Paroxysmal Positional Vertigo (BPPV) occurs when microscopic calcium carbonate crystals (otoconia) detach from the utricular macula and migrate into the semicircular canals of the inner ear.</p>
        <p>Vestibular physical therapists perform precision canalith repositioning maneuvers (such as the Epley or Semont maneuvers) to guide otoconia back into the vestibule, resolving vertigo in up to 90% of patients within 1 to 2 clinical sessions.</p>
      \`
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
      content: \`
        <p class="lead text-main">Hamstring muscle strains are the single most frequent non-contact sports injury in sprinting disciplines. Over 75% involve the long head of the biceps femoris during late terminal swing phase.</p>
        <p>Progressive eccentric strength training with Nordic hamstring curls increases muscle fascicle length, shifting the peak torque angle toward longer muscle lengths where injuries typically occur.</p>
      \`
    },
    {
      id: 'thoracic-mobility',
      slug: 'thoracic-mobility-rotational-sports',
      title: 'Thoracic Spine Extension & Rib Mobility for Rotational Athletes',
      category: 'Joint Mobility',
      categorySlug: 'joint-mobility',
      badge: 'Joint Mobility',
      description: 'Why a stiff mid-back causes shoulder impingement and lower back torque in golfers and tennis players, and 4 clinical rotational drills.',
      image: 'assets/images/service-mobility.jpg',
      author: 'Dr. David Chen',
      authorRole: 'Senior Physical Therapist & Ergonomics Consultant',
      authorImg: 'assets/images/therapist-chen.jpg',
      date: 'Jun 28, 2026',
      readingTime: '5 min read',
      tags: 'thoracic spine mobility rotation golf tennis rib cage posture extension',
      relatedSlugs: ['throwers-shoulder-scapular-dyskinesis', 'lumbar-lordosis-pelvic-tilt'],
      content: \`
        <p class="lead text-main">The thoracic spine is engineered for rotation and extension, but prolonged seated postures create kyphotic stiffness that forces the lumbar spine and shoulder complex to compensate abnormally during rotational sports.</p>
        <p>Restoring 40 to 45 degrees of isolated thoracic rotation protects the lumbar discs from destructive shear stresses and enhances rotational clubhead and racket velocity.</p>
      \`
    },
    {
      id: 'tmj-dysfunction',
      slug: 'tmj-dysfunction-jaw-therapy',
      title: 'TMJ Disorders: Masseter Release, Pterygoid Gliding & Cervical Alignment',
      category: 'Pain Relief',
      categorySlug: 'pain-relief',
      badge: 'Pain Relief',
      description: 'Targeted intraoral manual therapy, mandibular stabilization, and cervical posture corrections for temporomandibular joint clicking and clenching pain.',
      image: 'assets/images/step-assessment.jpg',
      author: 'Dr. Sarah Jenkins',
      authorRole: 'Clinical Director & Orthopedic Spine Specialist',
      authorImg: 'assets/images/therapist-jenkins.jpg',
      date: 'Jun 22, 2026',
      readingTime: '5 min read',
      tags: 'tmj temporomandibular jaw pain clenching teeth masseter headache neck',
      relatedSlugs: ['forward-head-posture-tech-neck', 'chronic-myofascial-pain'],
      content: \`
        <p class="lead text-main">Temporomandibular joint disorders (TMD) cause chronic jaw tenderness, clicking, locking, and radiating temporal tension headaches. TMD is closely linked to forward head posture and cervical spine dysfunction.</p>
        <p>Specialized physical therapy uses gentle intraoral masseter and lateral pterygoid myofascial releases, controlled condylar gliding exercises, and cervical retraction to normalize jaw mechanics.</p>
      \`
    },
    {
      id: 'core-stability',
      slug: 'core-stability-transverse-abdominis',
      title: 'Deep Core Stability: Transverse Abdominis & Pelvic Floor Synchronization',
      category: 'Spine Care',
      categorySlug: 'spine-care',
      badge: 'Spine Care',
      description: 'Moving beyond sit-ups: how true neuromuscular intra-abdominal pressure bracing stabilizes the lumbar spine and prevents recurrent disc bulges.',
      image: 'assets/images/exercise-birddog.jpg',
      author: 'Dr. Sarah Jenkins',
      authorRole: 'Clinical Director & Orthopedic Spine Specialist',
      authorImg: 'assets/images/therapist-jenkins.jpg',
      date: 'Jun 15, 2026',
      readingTime: '6 min read',
      tags: 'core stability transverse abdominis pelvic floor spine care back pain lumbar',
      relatedSlugs: ['5-proven-exercises-for-sciatica', 'lumbar-lordosis-pelvic-tilt'],
      content: \`
        <p class="lead text-main">True core stability is not measured by six-pack superficial rectus abdominis strength, but by the anticipatory neuromuscular firing of the deep transverse abdominis, multifidus, and pelvic floor muscles.</p>
        <p>Co-contraction of these deep stabilizers forms a natural biomechanical corset that maintains intra-abdominal pressure, eliminating excessive micro-motion across sensitive lumbar facet joints.</p>
      \`
    }
`;

// Insert new articles right before the end of ALL_ARTICLES
const targetMarker = '    }\n  ];\n\n  // =========================================================================\n  // 1b. Fast Lookup Maps & Alias Resolution';
if (!code.includes(targetMarker)) {
  console.error('Could not find target marker in blog-engine.js!');
  process.exit(1);
}

code = code.replace(targetMarker, '    },\n' + NEW_ARTICLES_CODE.trim() + '\n  ];\n\n  // =========================================================================\n  // 1b. Fast Lookup Maps & Alias Resolution');

// Update GRID_POSTS definition to include all articles
code = code.replace(
  'const GRID_POSTS = ALL_ARTICLES.filter(a => !a.isFeaturedCategory && !a.isProtocolOnly);',
  'const GRID_POSTS = ALL_ARTICLES;'
);

// Update renderGrid template to modern 3-column cards
const oldRenderGridStart = 'function renderGrid(posts) {';
const oldRenderGridEnd = '    function renderPagination(totalPages, activePage) {';

const newRenderGrid = `function renderGrid(posts) {
      if (!gridContainer) return;

      if (!posts || posts.length === 0) {
        gridContainer.innerHTML = '';
        return;
      }

      gridContainer.innerHTML = posts.map(post => \`
        <div class="col-12 col-md-6 col-lg-4 blog-post-card" data-category="\${post.categorySlug}" data-id="\${post.id}" data-tags="\${post.tags}">
          <div class="blog-card-ref" style="cursor: pointer;">
            <div class="card-img-container">
              <a href="blog-details.html?slug=\${post.slug}">
                <img src="\${post.image}" alt="\${post.title}" loading="lazy">
              </a>
            </div>
            <div class="card-body-ref">
              <div class="meta-row">
                <span class="category-tag-ref">\${post.category}</span>
                <span class="read-time-ref"><i class="far fa-clock me-1"></i>\${post.readingTime}</span>
              </div>
              <h4 class="title-ref">
                <a href="blog-details.html?slug=\${post.slug}">\${post.title}</a>
              </h4>
              <p class="excerpt-ref">\${post.description}</p>
              <a href="blog-details.html?slug=\${post.slug}" class="link-ref">
                Read Full Guide <i class="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      \`).join('');
    }

    /**
     * Render Interactive Pagination Controls (Reference Spec)
     */
    function renderPagination(totalPages, activePage) {`;

code = code.replace(
  code.substring(code.indexOf(oldRenderGridStart), code.indexOf(oldRenderGridEnd) + '    function renderPagination(totalPages, activePage) {'.length),
  newRenderGrid
);

// Update pagination container class and template
const oldPaginationHtml = `pagination.innerHTML = \`
        <ul class="pagination justify-content-center">
          <li class="page-item \${activePage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" data-page="\${activePage - 1}" aria-label="Previous">Previous</a>
          </li>
          \${pagesHtml}
          <li class="page-item \${activePage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" data-page="\${activePage + 1}" aria-label="Next">Next</a>
          </li>
        </ul>
      \`;`;

const newPaginationHtml = `pagination.classList.add('blog-pagination-ref');
      pagination.innerHTML = \`
        <ul class="pagination justify-content-center">
          <li class="page-item \${activePage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" data-page="\${activePage - 1}" aria-label="Previous"><i class="fas fa-chevron-left me-1"></i> Prev</a>
          </li>
          \${pagesHtml}
          <li class="page-item \${activePage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" data-page="\${activePage + 1}" aria-label="Next">Next <i class="fas fa-chevron-right ms-1"></i></a>
          </li>
        </ul>
      \`;`;

code = code.replace(oldPaginationHtml, newPaginationHtml);

// Update filterBlog to update counter
const filterBlogTarget = `      renderCurrentPage(false);

      const totalVisible = (featuredVisible ? 1 : 0) + currentFilteredPosts.length;`;

const filterBlogReplacement = `      renderCurrentPage(false);

      // Update Live Article Counter (ArtCraft Reference Spec)
      const countDisplay = document.getElementById('articleCountDisplay') || document.getElementById('visibleArticleCount');
      if (countDisplay) {
        countDisplay.textContent = currentFilteredPosts.length;
      }

      const totalVisible = currentFilteredPosts.length;`;

code = code.replace(filterBlogTarget, filterBlogReplacement);

// Update Category Buttons query selector to support .category-pill as well as .filter-btn
code = code.replace(
  `const categoryBtns = document.querySelectorAll('#blogCategoryFilters .filter-btn');`,
  `const categoryBtns = document.querySelectorAll('#blogCategoryFilters .category-pill, #blogCategoryFilters .filter-btn');`
);

// Update category button click listener to toggle classes on .category-pill
const oldCatListener = `        categoryBtns.forEach(b => {
          b.classList.remove('btn-primary', 'active');
          b.classList.add('btn-outline-secondary');
        });
        this.classList.remove('btn-outline-secondary');
        this.classList.add('btn-primary', 'active');`;

const newCatListener = `        categoryBtns.forEach(b => {
          b.classList.remove('btn-primary', 'active');
          if (b.classList.contains('filter-btn')) b.classList.add('btn-outline-secondary');
        });
        if (this.classList.contains('filter-btn')) this.classList.remove('btn-outline-secondary');
        this.classList.add('active');
        if (this.classList.contains('filter-btn')) this.classList.add('btn-primary');`;

code = code.replace(oldCatListener, newCatListener);

fs.writeFileSync(enginePath, code, 'utf8');
console.log('Successfully updated blog-engine.js!');
