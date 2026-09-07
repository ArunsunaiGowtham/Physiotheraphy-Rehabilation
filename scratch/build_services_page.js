const fs = require('fs');
const path = require('path');

const servicesContent = `<!DOCTYPE html>
<html lang="en" data-bs-theme="light" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="PhysioLife clinical rehabilitation services - evidence-based physical therapy, orthopedic rehabilitation, sports injury recovery, neurological care, pediatric therapy, and aquatic rehabilitation.">
  <title>Services – PhysioLife Clinic</title>
  <link rel="icon" type="image/svg+xml" href="assets/images/logo.svg">

  <!-- Bootstrap 5 CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <!-- Font Awesome 6 -->
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" rel="stylesheet">

  <!-- Core Design Tokens & Styles -->
  <link href="assets/css/variables.css" rel="stylesheet">
  <link href="assets/css/style.css" rel="stylesheet">
  <link href="assets/css/rtl.css" rel="stylesheet">
</head>
<body>

  <!-- Single Unified Navigation Header -->
  <header class="site-header">
    <div class="container-fluid px-lg-4 px-xl-5">
      <nav class="navbar navbar-expand-xl navbar-light">
        <!-- Left: Brand Logo & Clinic Subtitle -->
        <a class="navbar-brand" href="index.html">
          <img src="assets/images/logo.svg" alt="PhysioLife Clinic Logo" height="40" class="logo-light">
          <img src="assets/images/logo-dark.svg" alt="PhysioLife Clinic Logo" height="40" class="logo-dark">
        </a>

        <!-- Mobile Hamburger Toggle -->
        <button class="navbar-toggler border-0 shadow-none d-xl-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMain" aria-controls="navbarMain" aria-expanded="false" aria-label="Toggle navigation">
          <i class="fas fa-bars fs-4 text-main"></i>
        </button>

        <!-- Navigation Collapse Container -->
        <div class="collapse navbar-collapse" id="navbarMain">
          <!-- Center Navigation Links -->
          <ul class="navbar-nav mx-auto align-items-xl-center">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="homeDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Home <i class="fas fa-chevron-down dropdown-arrow ms-1"></i>
              </a>
              <ul class="dropdown-menu" aria-labelledby="homeDropdown">
                <li><a class="dropdown-item" href="index.html">Home 1</a></li>
                <li><a class="dropdown-item" href="home-2.html">Home 2</a></li>
              </ul>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="about.html">About Us</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" href="services.html">Services</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="insurance.html">Insurance</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="pricing.html">Pricing</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="blog.html">Blog</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="contact.html">Contact</a>
            </li>
          </ul>

          <!-- Right Actions (Desktop) -->
          <div class="navbar-actions d-none d-xl-flex">
            <button class="theme-toggle-btn" type="button" aria-label="Toggle theme">
              <i class="fas fa-moon"></i> <span class="theme-text">Dark</span>
            </button>
            <button class="rtl-toggle-btn" type="button" aria-label="Toggle RTL">
              <i class="fas fa-globe"></i> <span class="dir-text">RTL</span>
            </button>
            <a href="login.html" class="btn-nav-login">
              <i class="fas fa-sign-in-alt"></i> <span>Login</span>
            </a>
            <a href="register.html" class="btn-nav-signup">
              <i class="fas fa-user-plus"></i> <span>Sign Up</span>
            </a>
          </div>

          <!-- Mobile Action Drawer (<1200px) -->
          <div class="mobile-nav-actions d-xl-none">
            <div class="mobile-nav-controls">
              <button class="theme-toggle-btn flex-fill" type="button" aria-label="Toggle theme">
                <i class="fas fa-moon"></i> <span class="theme-text">Dark</span>
              </button>
              <button class="rtl-toggle-btn flex-fill" type="button" aria-label="Toggle RTL">
                <i class="fas fa-globe"></i> <span class="dir-text">RTL</span>
              </button>
            </div>
            <div class="d-flex gap-2">
              <a href="login.html" class="btn-nav-login flex-fill justify-content-center">
                <i class="fas fa-sign-in-alt"></i> <span>Login</span>
              </a>
              <a href="register.html" class="btn-nav-signup flex-fill justify-content-center">
                <i class="fas fa-user-plus"></i> <span>Sign Up</span>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </header>

  <!-- Page Banner -->
  <section class="py-5 bg-surface-alt border-bottom border-subtle">
    <div class="container">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb mb-2">
          <li class="breadcrumb-item"><a href="index.html">Home</a></li>
          <li class="breadcrumb-item active" aria-current="page">Services</li>
        </ol>
      </nav>
      <h1 class="display-5 fw-bold mb-2">Comprehensive Physical Rehabilitation Services</h1>
      <p class="lead text-muted mb-0">Explore our specialized therapeutic programs targeted to your exact clinical condition.</p>
    </div>
  </section>

  <!-- Filterable Services Grid -->
  <section class="section-padding bg-surface">
    <div class="container">
      <!-- Category Filters -->
      <div class="filter-btn-group">
        <button class="filter-btn active" data-filter="all">All Services (12)</button>
        <button class="filter-btn" data-filter="spine">Spine &amp; Orthopedic</button>
        <button class="filter-btn" data-filter="sports">Sports Injury</button>
        <button class="filter-btn" data-filter="postop">Post-Surgical</button>
        <button class="filter-btn" data-filter="neuro">Neurological</button>
        <button class="filter-btn" data-filter="home">Geriatric &amp; Home</button>
      </div>

      <div class="row g-4" id="servicesGridContainer">
        <!-- 1. Sports Injury Rehabilitation -->
        <div class="col-md-6 col-lg-4 service-item" data-category="sports">
          <div class="service-card">
            <a href="service-details.html?service=sports-injury" class="card-img-wrap d-block" aria-label="Learn more about Sports Injury Rehabilitation">
              <img src="assets/images/service-sports.jpg" alt="Sports Injury Rehabilitation and Athlete Physical Therapy">
            </a>
            <div class="service-icon-box">
              <i class="fas fa-running"></i>
            </div>
            <h4 class="service-title"><a href="service-details.html?service=sports-injury" class="text-reset text-decoration-none">Sports Injury Rehabilitation</a></h4>
            <p>Targeted recovery for ligament sprains, muscle tears, hamstring strains, runner's knee, and tennis elbow. Return to your peak athletic performance safely.</p>
            <a href="service-details.html?service=sports-injury" class="service-link">Learn More <i class="fas fa-arrow-right"></i></a>
          </div>
        </div>

        <!-- 2. Post-Surgery Rehabilitation -->
        <div class="col-md-6 col-lg-4 service-item" data-category="postop">
          <div class="service-card">
            <a href="service-details.html?service=post-surgery" class="card-img-wrap d-block" aria-label="Learn more about Post-Surgery Rehabilitation">
              <img src="assets/images/service-postop.jpg" alt="Post-Surgery Joint and Knee Rehabilitation">
            </a>
            <div class="service-icon-box">
              <i class="fas fa-procedures"></i>
            </div>
            <h4 class="service-title"><a href="service-details.html?service=post-surgery" class="text-reset text-decoration-none">Post-Surgery Rehabilitation</a></h4>
            <p>Phase-by-phase recovery protocols following total knee replacement, hip arthroplasty, rotator cuff repairs, and lumbar spine fusions to rebuild range of motion.</p>
            <a href="service-details.html?service=post-surgery" class="service-link">Learn More <i class="fas fa-arrow-right"></i></a>
          </div>
        </div>

        <!-- 3. Chronic Pain Management -->
        <div class="col-md-6 col-lg-4 service-item" data-category="spine">
          <div class="service-card">
            <a href="service-details.html?service=chronic-pain" class="card-img-wrap d-block" aria-label="Learn more about Chronic Pain Management">
              <img src="assets/images/service-chronic.jpg" alt="Chronic Pain Relief and Manual Therapy">
            </a>
            <div class="service-icon-box">
              <i class="fas fa-heartbeat"></i>
            </div>
            <h4 class="service-title"><a href="service-details.html?service=chronic-pain" class="text-reset text-decoration-none">Chronic Pain Management</a></h4>
            <p>Multimodal clinical solutions for fibromyalgia, chronic myofascial pain syndrome, tension headaches, and persistent nerve sensitivity without relying on opioids.</p>
            <a href="service-details.html?service=chronic-pain" class="service-link">Learn More <i class="fas fa-arrow-right"></i></a>
          </div>
        </div>

        <!-- 4. Back & Neck Pain Therapy -->
        <div class="col-md-6 col-lg-4 service-item" data-category="spine">
          <div class="service-card">
            <a href="service-details.html?service=spine-neck" class="card-img-wrap d-block" aria-label="Learn more about Back and Neck Pain Therapy">
              <img src="assets/images/service-spine.jpg" alt="Spinal Decompression and Cervical Neck Therapy">
            </a>
            <div class="service-icon-box">
              <i class="fas fa-bone"></i>
            </div>
            <h4 class="service-title"><a href="service-details.html?service=spine-neck" class="text-reset text-decoration-none">Back &amp; Neck Pain Therapy</a></h4>
            <p>Spinal decompression, manual joint mobilization, and postural re-education to eliminate lower back spasms, herniated discs, and cervical neck stiffness.</p>
            <a href="service-details.html?service=spine-neck" class="service-link">Learn More <i class="fas fa-arrow-right"></i></a>
          </div>
        </div>

        <!-- 5. Joint Rehabilitation -->
        <div class="col-md-6 col-lg-4 service-item" data-category="spine">
          <div class="service-card">
            <a href="service-details.html?service=joint-rehab" class="card-img-wrap d-block" aria-label="Learn more about Joint Rehabilitation">
              <img src="assets/images/service-joint.jpg" alt="Joint Mobilization and Arthritis Physical Therapy">
            </a>
            <div class="service-icon-box">
              <i class="fas fa-hand-holding-medical"></i>
            </div>
            <h4 class="service-title"><a href="service-details.html?service=joint-rehab" class="text-reset text-decoration-none">Joint Rehabilitation</a></h4>
            <p>Comprehensive therapy for shoulder impingement, frozen shoulder, hip bursitis, and knee osteoarthritis to restore joint lubrication and pain-free motion.</p>
            <a href="service-details.html?service=joint-rehab" class="service-link">Learn More <i class="fas fa-arrow-right"></i></a>
          </div>
        </div>

        <!-- 6. Muscle & Mobility Therapy -->
        <div class="col-md-6 col-lg-4 service-item" data-category="sports">
          <div class="service-card">
            <a href="service-details.html?service=muscle-mobility" class="card-img-wrap d-block" aria-label="Learn more about Muscle and Mobility Therapy">
              <img src="assets/images/service-mobility.jpg" alt="Muscle Release and Functional Mobility Therapy">
            </a>
            <div class="service-icon-box">
              <i class="fas fa-dumbbell"></i>
            </div>
            <h4 class="service-title"><a href="service-details.html?service=muscle-mobility" class="text-reset text-decoration-none">Muscle &amp; Mobility Therapy</a></h4>
            <p>Active release techniques, instrument-assisted soft tissue mobilization (IASTM), and myofascial trigger point dry needling to release chronic muscle tightness.</p>
            <a href="service-details.html?service=muscle-mobility" class="service-link">Learn More <i class="fas fa-arrow-right"></i></a>
          </div>
        </div>

        <!-- 7. Neurological Rehabilitation -->
        <div class="col-md-6 col-lg-4 service-item" data-category="neuro">
          <div class="service-card">
            <a href="service-details.html?service=neurological" class="card-img-wrap d-block" aria-label="Learn more about Neurological Rehabilitation">
              <img src="assets/images/service-neuro.jpg" alt="Neurological Rehabilitation and Balance Retraining">
            </a>
            <div class="service-icon-box">
              <i class="fas fa-brain"></i>
            </div>
            <h4 class="service-title"><a href="service-details.html?service=neurological" class="text-reset text-decoration-none">Neurological Rehabilitation</a></h4>
            <p>Neuroplasticity-based movement retraining for stroke survivors, Parkinson's disease, multiple sclerosis, and peripheral neuropathy to regain independence.</p>
            <a href="service-details.html?service=neurological" class="service-link">Learn More <i class="fas fa-arrow-right"></i></a>
          </div>
        </div>

        <!-- 8. Posture Correction -->
        <div class="col-md-6 col-lg-4 service-item" data-category="spine">
          <div class="service-card">
            <a href="service-details.html?service=posture-correction" class="card-img-wrap d-block" aria-label="Learn more about Posture Correction and Ergonomics">
              <img src="assets/images/service-posture.jpg" alt="Posture Correction and Ergonomic Assessment">
            </a>
            <div class="service-icon-box">
              <i class="fas fa-street-view"></i>
            </div>
            <h4 class="service-title"><a href="service-details.html?service=posture-correction" class="text-reset text-decoration-none">Posture Correction &amp; Ergonomics</a></h4>
            <p>Biomechanical spinal alignment addressing text neck, kyphosis, anterior pelvic tilt, and office ergonomics to alleviate spinal fatigue.</p>
            <a href="service-details.html?service=posture-correction" class="service-link">Learn More <i class="fas fa-arrow-right"></i></a>
          </div>
        </div>

        <!-- 9. Senior Physiotherapy & Balance -->
        <div class="col-md-6 col-lg-4 service-item" data-category="home">
          <div class="service-card">
            <a href="service-details.html?service=senior-physio" class="card-img-wrap d-block" aria-label="Learn more about Senior Physiotherapy and Balance">
              <img src="assets/images/service-senior.jpg" alt="Senior Physiotherapy and Fall-Prevention Therapy">
            </a>
            <div class="service-icon-box">
              <i class="fas fa-user-friends"></i>
            </div>
            <h4 class="service-title"><a href="service-details.html?service=senior-physio" class="text-reset text-decoration-none">Senior Physiotherapy &amp; Balance</a></h4>
            <p>Gentle fall-prevention programs, osteoporosis bone-density conditioning, and vestibular balance training to empower elderly independence and safety.</p>
            <a href="service-details.html?service=senior-physio" class="service-link">Learn More <i class="fas fa-arrow-right"></i></a>
          </div>
        </div>

        <!-- 10. Home Visit Physiotherapy -->
        <div class="col-md-6 col-lg-4 service-item" data-category="home">
          <div class="service-card">
            <a href="service-details.html?service=home-visit" class="card-img-wrap d-block" aria-label="Learn more about Home Visit Physiotherapy">
              <img src="assets/images/service-home.jpg" alt="In-Home Physical Therapy and Assisted Care">
            </a>
            <div class="service-icon-box">
              <i class="fas fa-house-user"></i>
            </div>
            <h4 class="service-title"><a href="service-details.html?service=home-visit" class="text-reset text-decoration-none">Home Visit Physiotherapy</a></h4>
            <p>Complete physical therapy and mobility treatment delivered directly to your private home for patients with limited transportation or acute postoperative care.</p>
            <a href="service-details.html?service=home-visit" class="service-link">Learn More <i class="fas fa-arrow-right"></i></a>
          </div>
        </div>

        <!-- 11. Pediatric Physical Therapy & Development -->
        <div class="col-md-6 col-lg-4 service-item" data-category="home">
          <div class="service-card">
            <a href="service-details.html?service=pediatric-care" class="card-img-wrap d-block" aria-label="Learn more about Pediatric Physical Therapy & Development">
              <img src="assets/images/service-pediatric.jpg" alt="Pediatric Physical Therapy and Childhood Motor Development">
            </a>
            <div class="service-icon-box">
              <i class="fas fa-child"></i>
            </div>
            <h4 class="service-title"><a href="service-details.html?service=pediatric-care" class="text-reset text-decoration-none">Pediatric Physical Therapy &amp; Development</a></h4>
            <p>Specialized pediatric motor retraining, developmental milestone conditioning, torticollis therapy, and juvenile athletic recovery in a nurturing clinical environment.</p>
            <a href="service-details.html?service=pediatric-care" class="service-link">Learn More <i class="fas fa-arrow-right"></i></a>
          </div>
        </div>

        <!-- 12. Aquatic & Hydrotherapy Rehabilitation -->
        <div class="col-md-6 col-lg-4 service-item" data-category="postop">
          <div class="service-card">
            <a href="service-details.html?service=aquatic-therapy" class="card-img-wrap d-block" aria-label="Learn more about Aquatic & Hydrotherapy Rehabilitation">
              <img src="assets/images/service-aquatic.jpg" alt="Aquatic and Hydrotherapy Rehabilitation in Heated Clinic Pool">
            </a>
            <div class="service-icon-box">
              <i class="fas fa-water"></i>
            </div>
            <h4 class="service-title"><a href="service-details.html?service=aquatic-therapy" class="text-reset text-decoration-none">Aquatic &amp; Hydrotherapy Rehabilitation</a></h4>
            <p>Heated water therapy utilizing gentle hydrodynamic buoyancy to offload joints, relieve severe arthritis, improve circulation, and accelerate early postsurgical mobility.</p>
            <a href="service-details.html?service=aquatic-therapy" class="service-link">Learn More <i class="fas fa-arrow-right"></i></a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Banner -->
  <section class="section-padding bg-primary text-white text-center">
    <div class="container">
      <h2 class="display-6 fw-bold text-white mb-3">Unsure Which Therapy Is Right for You?</h2>
      <p class="lead text-white opacity-75 mb-4">Our clinical intake director will review your symptoms and match you with the ideal specialist.</p>
      <a href="contact.html" class="btn btn-secondary btn-lg"><i class="fas fa-phone-alt me-2"></i> Schedule Free Phone Consultation</a>
    </div>
  </section>

  <!-- Footer -->
  <footer class="site-footer">
    <div class="container">
      <div class="row g-5">
        <div class="col-12 col-md-6 col-lg-4">
          <a href="index.html" class="d-inline-block mb-3" title="PhysioLife Home">
            <img src="assets/images/logo.svg" alt="PhysioLife Logo" height="42">
          </a>
          <p class="text-muted">
            PhysioLife is an internationally accredited physical therapy and comprehensive orthopedic rehabilitation clinic dedicated to helping individuals live active, pain-free lives.
          </p>
          <div class="d-flex gap-2 mt-4">
            <a href="#" class="social-icon-btn" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="social-icon-btn" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
            <a href="#" class="social-icon-btn" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
            <a href="#" class="social-icon-btn" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
            <a href="#" class="social-icon-btn" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
          </div>
        </div>

        <div class="col-6 col-md-3 col-lg-2">
          <div class="footer-widget">
            <h5>Quick Links</h5>
            <ul class="footer-links">
              <li><a href="about.html">About Clinic</a></li>
              <li><a href="services.html">Therapy Services</a></li>
              <li><a href="therapists.html">Our Specialists</a></li>
              <li><a href="insurance.html">Insurance &amp; Billing</a></li>
              <li><a href="pricing.html">Pricing Packages</a></li>
              <li><a href="contact.html">Contact Us</a></li>
            </ul>
          </div>
        </div>

        <div class="col-6 col-md-3 col-lg-2">
          <div class="footer-widget">
            <h5>Services</h5>
            <ul class="footer-links">
              <li><a href="service-details.html?service=spine-neck">Spine &amp; Neck Therapy</a></li>
              <li><a href="service-details.html?service=sports-injury">Sports Rehabilitation</a></li>
              <li><a href="service-details.html?service=post-surgery">Post-Surgical Care</a></li>
              <li><a href="service-details.html?service=joint-rehab">Joint Mobility</a></li>
              <li><a href="service-details.html?service=neurological">Neurological Rehab</a></li>
              <li><a href="service-details.html?service=home-visit">Home Physiotherapy</a></li>
            </ul>
          </div>
        </div>

        <div class="col-12 col-md-6 col-lg-4">
          <div class="footer-widget">
            <h5>Clinic Information</h5>
            <ul class="footer-links footer-contact-info">
              <li class="d-flex align-items-start gap-2">
                <i class="fas fa-map-marker-alt text-primary mt-1"></i>
                <span>742 Evergreen Healthcare Blvd, Suite 400, NY 10001</span>
              </li>
              <li class="d-flex align-items-center gap-2">
                <i class="fas fa-phone-alt text-primary"></i>
                <span>+1 (800) 555-REHAB (73422)</span>
              </li>
              <li class="d-flex align-items-center gap-2">
                <i class="fas fa-envelope text-primary"></i>
                <span>appointments@physiolifeclinic.com</span>
              </li>
              <li class="d-flex align-items-start gap-2">
                <i class="fas fa-clock text-primary mt-1"></i>
                <div>
                  <div>Monday – Friday: 7:00 AM – 8:00 PM</div>
                  <div>Saturday: 8:00 AM – 3:00 PM</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="footer-bottom d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
        <p class="mb-0 text-muted">&copy; 2026 PhysioLife Rehabilitation Clinic. All rights reserved.</p>
        <div class="d-flex flex-wrap gap-4 text-muted small align-items-center">
          <a href="documentation/index.html" class="text-muted"><i class="far fa-file-alt me-1"></i> Template Documentation</a>
          <a href="#" class="text-muted">Privacy Policy</a>
          <a href="#" class="text-muted">Terms of Care</a>
          <a href="404.html" class="text-muted">404 Demo</a>
        </div>
      </div>
    </div>
  </footer>

  <!-- Appointment Booking Modal -->
  <div class="modal fade" id="bookingModal" tabindex="-1" aria-labelledby="bookingModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <div>
            <h4 class="modal-title fw-bold" id="bookingModalLabel">Book Your Therapy Session</h4>
            <p class="small text-muted mb-0">Choose your preferred date, therapist, and clinical service.</p>
          </div>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form id="appointmentBookingForm" class="needs-validation" novalidate>
          <div class="modal-body p-4">
            <!-- Success alert shown dynamically by JS -->
            <div id="bookingConfirmationFeedback" class="alert alert-success d-none mb-4" role="alert">
              <i class="fas fa-check-circle me-2"></i> Your session request has been received! Our patient care team will contact you within 15 minutes to confirm.
            </div>

            <div class="row g-3">
              <div class="col-md-6">
                <label for="bookName" class="form-label">Full Name *</label>
                <input type="text" class="form-control" id="bookName" placeholder="e.g. John Doe" required>
              </div>
              <div class="col-md-6">
                <label for="bookEmail" class="form-label">Email Address *</label>
                <input type="email" class="form-control" id="bookEmail" placeholder="john@example.com" required>
              </div>
              <div class="col-md-6">
                <label for="bookPhone" class="form-label">Phone Number *</label>
                <input type="tel" class="form-control" id="bookPhone" placeholder="+1 (555) 000-0000" required>
              </div>
              <div class="col-md-6">
                <label for="bookService" class="form-label">Select Therapy Service *</label>
                <select class="form-select" id="bookService" required>
                  <option value="" selected disabled>Choose a service...</option>
                  <option value="sports">Sports Injury Rehabilitation</option>
                  <option value="postop">Post-Surgical Recovery</option>
                  <option value="chronic">Chronic Pain Management</option>
                  <option value="spine">Back &amp; Neck Pain Therapy</option>
                  <option value="joint">Joint Rehabilitation</option>
                  <option value="mobility">Muscle &amp; Mobility Therapy</option>
                  <option value="neuro">Neurological Rehabilitation</option>
                  <option value="posture">Posture Correction &amp; Ergonomics</option>
                  <option value="senior">Senior Physiotherapy &amp; Balance</option>
                  <option value="home">Home Visit Physiotherapy</option>
                  <option value="pediatric">Pediatric Physical Therapy &amp; Development</option>
                  <option value="aquatic">Aquatic &amp; Hydrotherapy Rehabilitation</option>
                </select>
              </div>
              <div class="col-md-6">
                <label for="bookTherapist" class="form-label">Preferred Specialist</label>
                <select class="form-select" id="bookTherapist">
                  <option value="any">First Available Doctor</option>
                  <option value="jenkins">Dr. Sarah Jenkins (Spine &amp; Ortho)</option>
                  <option value="vance">Dr. Marcus Vance (Sports Rehab)</option>
                  <option value="rostova">Dr. Elena Rostova (Neurology)</option>
                  <option value="chen">Dr. David Chen (Joint Replacement)</option>
                </select>
              </div>
              <div class="col-md-6">
                <label for="bookDate" class="form-label">Preferred Date *</label>
                <input type="date" class="form-control" id="bookDate" required>
              </div>
              <div class="col-12">
                <label for="bookNotes" class="form-label">Symptoms or Clinical Notes</label>
                <textarea class="form-control" id="bookNotes" rows="3" placeholder="Briefly describe your pain, recent injury, or surgical history..."></textarea>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="submit" class="btn btn-primary"><i class="fas fa-check me-2"></i> Confirm Booking Request</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script src="assets/js/theme.js"></script>
  <script src="assets/js/main.js"></script>
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, '..', 'services.html'), servicesContent, 'utf-8');
console.log('Successfully written services.html with 12 services!');
