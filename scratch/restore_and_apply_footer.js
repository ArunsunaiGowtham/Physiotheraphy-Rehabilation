const fs = require('fs');

const recoveredFiles = [
  'service-details.html',
  'therapist-details.html',
  'insurance.html',
  'contact.html',
  'blog-details.html'
];

// 1. Restore the 5 recovered files
recoveredFiles.forEach(f => {
  const content = fs.readFileSync(`scratch/physio_${f}`, 'utf8');
  fs.writeFileSync(f, content, 'utf8');
  console.log(`[RESTORED] ${f} (${content.length} bytes)`);
});

// 2. Apply the therapist-details.html profile social link fix
let therapistHtml = fs.readFileSync('therapist-details.html', 'utf8');
const oldTherapistSocial = `<div class="d-flex justify-content-center gap-2">
              <a href="#" class="social-icon-btn"><i class="fab fa-linkedin-in"></i></a>
              <a href="#" class="social-icon-btn"><i class="fab fa-twitter"></i></a>
              <a href="#" class="social-icon-btn"><i class="fas fa-envelope"></i></a>
            </div>`;
const newTherapistSocial = `<div class="d-flex justify-content-center gap-2">
              <a href="https://www.linkedin.com/in/sarah-jenkins-dpt" id="therapistSocialLinkedIn" class="social-icon-btn" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile"><i class="fab fa-linkedin-in"></i></a>
              <a href="https://twitter.com/DrSarahJenkins" id="therapistSocialTwitter" class="social-icon-btn" target="_blank" rel="noopener noreferrer" aria-label="Twitter Profile"><i class="fab fa-twitter"></i></a>
              <a href="mailto:jenkins@physiolifeclinic.com" id="therapistSocialEmail" class="social-icon-btn" aria-label="Direct Email"><i class="fas fa-envelope"></i></a>
            </div>`;
if (therapistHtml.includes(oldTherapistSocial)) {
  therapistHtml = therapistHtml.replace(oldTherapistSocial, newTherapistSocial);
  fs.writeFileSync('therapist-details.html', therapistHtml, 'utf8');
  console.log('[UPDATED] therapist-details.html social buttons');
}

// 3. Apply the blog-details.html share button fix
let blogHtml = fs.readFileSync('blog-details.html', 'utf8');
const oldBlogShare = `<div class="d-flex align-items-center gap-2">
                <span class="text-muted small fw-bold">Share:</span>
                <a href="#" class="social-icon-btn" title="Share on Facebook"><i class="fab fa-facebook-f"></i></a>
                <a href="#" class="social-icon-btn" title="Share on Twitter"><i class="fab fa-twitter"></i></a>
                <a href="#" class="social-icon-btn" title="Share on LinkedIn"><i class="fab fa-linkedin-in"></i></a>
              </div>`;
const newBlogShare = `<div class="d-flex align-items-center gap-2">
                <span class="text-muted small fw-bold">Share:</span>
                <a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fphysiolifeclinic.com%2Fblog-details.html" target="_blank" rel="noopener noreferrer" class="social-icon-btn" title="Share on Facebook" aria-label="Share on Facebook"><i class="fab fa-facebook-f"></i></a>
                <a href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fphysiolifeclinic.com%2Fblog-details.html&text=Physical%20Therapy%20Guide" target="_blank" rel="noopener noreferrer" class="social-icon-btn" title="Share on Twitter" aria-label="Share on Twitter"><i class="fab fa-twitter"></i></a>
                <a href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fphysiolifeclinic.com%2Fblog-details.html" target="_blank" rel="noopener noreferrer" class="social-icon-btn" title="Share on LinkedIn" aria-label="Share on LinkedIn"><i class="fab fa-linkedin-in"></i></a>
              </div>`;
if (blogHtml.includes(oldBlogShare)) {
  blogHtml = blogHtml.replace(oldBlogShare, newBlogShare);
  fs.writeFileSync('blog-details.html', blogHtml, 'utf8');
  console.log('[UPDATED] blog-details.html share buttons');
}

// 4. Uniform footer row replacement strictly INSIDE <footer class="site-footer">
const all12Files = [
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

all12Files.forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  const footerStart = c.indexOf('<footer class="site-footer">');
  const footerEnd = c.indexOf('</footer>', footerStart);

  if (footerStart === -1 || footerEnd === -1) {
    console.error(`[ERROR] Footer tags not found in ${f}`);
    return;
  }

  const beforeFooter = c.substring(0, footerStart);
  const footerContent = c.substring(footerStart, footerEnd);
  const afterFooter = c.substring(footerEnd);

  // In footerContent, replace from <div class="row ..."> to right before <div class="footer-bottom
  const rowMatch = footerContent.match(/<div class="row[^"]*">[\s\S]*?<\/div>\s*(?=<div class="footer-bottom)/);
  if (rowMatch) {
    const updatedFooter = footerContent.replace(rowMatch[0], newFooterRow + '\n\n      ');
    c = beforeFooter + updatedFooter + afterFooter;
    fs.writeFileSync(f, c, 'utf8');
    console.log(`[FOOTER UPDATED SAFELY] in ${f}`);
  } else {
    console.error(`[ERROR] Row pattern not found inside footer of ${f}`);
  }
});
