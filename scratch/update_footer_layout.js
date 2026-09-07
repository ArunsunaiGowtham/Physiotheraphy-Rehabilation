const fs = require('fs');

const files = [
  'index.html',
  'about.html',
  'services.html',
  'service-details.html',
  'therapists.html',
  'therapist-details.html',
  'pricing.html',
  'insurance.html',
  'contact.html',
  'blog.html',
  'blog-details.html',
  'home-2.html'
];

const newFooterRow = `      <div class="row g-4 g-lg-5">
        <!-- Col 1: Brand Info -->
        <div class="col-12 col-sm-6 col-lg-3">
          <div class="footer-widget">
            <div class="footer-brand-header">
              <a href="index.html" class="footer-logo-wrap" title="PhysioLife Home">
                <img src="assets/images/logo.svg" alt="PhysioLife Logo" height="38">
              </a>
            </div>
            <p class="footer-brand-text">
              PhysioLife is an internationally accredited physical therapy and comprehensive orthopedic rehabilitation clinic dedicated to helping individuals live active, pain-free lives.
            </p>
            <div class="footer-social-wrap">
              <div class="d-flex gap-2">
                <a href="https://www.facebook.com/physiolifeclinic" class="social-icon-btn" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                <a href="https://twitter.com/physiolifeclinic" class="social-icon-btn" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                <a href="https://www.linkedin.com/company/physiolife-clinic" class="social-icon-btn" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
                <a href="https://www.instagram.com/physiolifeclinic" class="social-icon-btn" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                <a href="https://www.youtube.com/@physiolifeclinic" class="social-icon-btn" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
              </div>
            </div>
          </div>
        </div>

        <!-- Col 2: Quick Links -->
        <div class="col-12 col-sm-6 col-lg-3">
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

        <!-- Col 3: Services -->
        <div class="col-12 col-sm-6 col-lg-3">
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

        <!-- Col 4: Clinic Information -->
        <div class="col-12 col-sm-6 col-lg-3">
          <div class="footer-widget">
            <h5>Clinic Information</h5>
            <ul class="footer-links footer-contact-info">
              <li>
                <i class="fas fa-map-marker-alt"></i>
                <span>742 Evergreen Healthcare Blvd, Suite 400, NY 10001</span>
              </li>
              <li>
                <i class="fas fa-phone-alt"></i>
                <span>+1 (800) 555-REHAB (73422)</span>
              </li>
              <li>
                <i class="fas fa-envelope"></i>
                <span>appointments@physiolifeclinic.com</span>
              </li>
              <li>
                <i class="fas fa-clock"></i>
                <span>Monday – Friday: 7:00 AM – 8:00 PM</span>
              </li>
              <li>
                <i class="fas fa-calendar-check"></i>
                <span>Saturday: 8:00 AM – 3:00 PM</span>
              </li>
            </ul>
          </div>
        </div>
      </div>`;

// Regex to find <div class="row g-5">...</div> right before <div class="footer-bottom
const rowRegex = /<div class="row g-5">[\s\S]*?<\/div>\s*(?=<div class="footer-bottom)/;

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  if (rowRegex.test(content)) {
    const updated = content.replace(rowRegex, newFooterRow + '\n\n      ');
    fs.writeFileSync(f, updated, 'utf8');
    console.log(`[SUCCESS] Updated footer in ${f}`);
  } else {
    console.error(`[ERROR] Pattern not found in ${f}`);
  }
});
