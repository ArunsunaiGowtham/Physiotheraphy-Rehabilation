const fs = require('fs');
const path = require('path');

const files = [
  'index.html',
  'about.html',
  'services.html',
  'service-details.html',
  'insurance.html',
  'pricing.html',
  'blog.html',
  'blog-details.html',
  'contact.html',
  'home-2.html',
  'therapists.html',
  'therapist-details.html'
];

const unifiedFooter = `  <!-- Footer -->
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
  </footer>`;

for (const file of files) {
  const filePath = path.join(__dirname, '..', file);
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${file}`);
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf-8');

  // Replace any existing <footer class="site-footer">...</footer>
  // Note: match could also be preceded by <!-- Footer --> or similar
  const footerRegex = /(\s*<!--\s*Footer\s*-->)?\s*<footer class="site-footer">[\s\S]*?<\/footer>/i;

  if (footerRegex.test(content)) {
    content = content.replace(footerRegex, '\n\n' + unifiedFooter);
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`[UPDATED FOOTER] ${file}`);
  } else {
    console.error(`[NO FOOTER MATCH] ${file}`);
  }
}
