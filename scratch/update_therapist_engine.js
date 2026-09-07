const fs = require('fs');
const dataset = JSON.parse(fs.readFileSync('scratch/therapists_dataset.json', 'utf8'));

const code = `/**
 * PhysioLife - Centralized Therapist Engine & Doctor Profile Router
 * Manages doctor dataset (16 Unique Board-Certified Specialists), dynamic URL query routing (?id=<therapist-id>),
 * and client-side rendering on therapist-details.html.
 * Author: Antigravity
 * Version: 2.0.0
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. Centralized Doctors Database (16 Unique Board-Certified Clinical Leads)
  // =========================================================================
  const THERAPISTS_DATA = ${JSON.stringify(dataset, null, 4)};

  // =========================================================================
  // 2. Query Parameter Parser
  // =========================================================================
  function getRequestedTherapistId() {
    const params = new URLSearchParams(window.location.search);
    const raw = (params.get('id') || params.get('doctor') || params.get('therapist') || '').toLowerCase().trim();

    if (THERAPISTS_DATA[raw]) return raw;

    // Aliases
    const aliasMap = {
      'sarah': 'jenkins',
      'sarah-jenkins': 'jenkins',
      'marcus': 'vance',
      'marcus-vance': 'vance',
      'elena': 'rostova',
      'elena-rostova': 'rostova',
      'david': 'chen',
      'david-chen': 'chen',
      'chloe': 'bennett',
      'chloe-bennett': 'bennett',
      'julian': 'reed',
      'julian-reed': 'reed',
      'liam': 'gallagher',
      'liam-gallagher': 'gallagher',
      'robert': 'hayes',
      'robert-hayes': 'hayes',
      'hannah': 'almansoor',
      'hannah-almansoor': 'almansoor',
      'emily': 'watson',
      'emily-watson': 'watson',
      'tyler': 'brooks',
      'tyler-brooks': 'brooks',
      'alexei': 'voronov',
      'alexei-voronov': 'voronov',
      'sophie': 'laurent',
      'sophie-laurent': 'laurent',
      'james': 'sterling',
      'james-sterling': 'sterling',
      'nathan': 'cross',
      'nathan-cross': 'cross',
      'maya': 'patel',
      'maya-patel': 'patel'
    };

    if (aliasMap[raw]) return aliasMap[raw];

    // Default fallback
    return 'jenkins';
  }

  // =========================================================================
  // 3. Dynamic DOM Renderer on therapist-details.html
  // =========================================================================
  function renderTherapistDetails() {
    if (!window.location.pathname.includes('therapist-details.html')) return;

    const therapistId = getRequestedTherapistId();
    const doc = THERAPISTS_DATA[therapistId] || THERAPISTS_DATA['jenkins'];

    // Page title & meta
    document.title = \`\${doc.name} – PhysioLife Specialist Profile\`;

    // 1. Breadcrumb
    const breadcrumb = document.getElementById('therapistBreadcrumb');
    if (breadcrumb) breadcrumb.textContent = doc.name;

    // 2. Banner
    const bannerTitle = document.getElementById('therapistBannerTitle');
    if (bannerTitle) bannerTitle.textContent = doc.fullName;
    const bannerSubtitle = document.getElementById('therapistBannerSubtitle');
    if (bannerSubtitle) bannerSubtitle.textContent = doc.titleRole;

    // 3. Sidebar Profile Card
    const profileImg = document.getElementById('therapistProfileImg');
    if (profileImg) {
      profileImg.src = doc.image;
      profileImg.alt = \`\${doc.name} - Physical Therapy Specialist\`;
    }
    const sidebarName = document.getElementById('therapistSidebarName');
    if (sidebarName) sidebarName.textContent = doc.name;
    const sidebarRole = document.getElementById('therapistSidebarSpecialty');
    if (sidebarRole) sidebarRole.textContent = doc.sidebarRole;

    const degreeEl = document.getElementById('therapistDegree');
    if (degreeEl) degreeEl.textContent = doc.degree;
    const specialtyEl = document.getElementById('therapistSpecialtyTag');
    if (specialtyEl) specialtyEl.textContent = doc.specialty;
    const expEl = document.getElementById('therapistExperience');
    if (expEl) expEl.textContent = doc.experience;
    const ratingEl = document.getElementById('therapistRating');
    if (ratingEl) ratingEl.textContent = doc.rating;
    const langEl = document.getElementById('therapistLanguages');
    if (langEl) langEl.textContent = doc.languages;

    // 4. Hours
    const h1 = document.getElementById('therapistHoursMonWed');
    if (h1 && doc.hours) h1.textContent = doc.hours.monWed;
    const h2 = document.getElementById('therapistHoursThuFri');
    if (h2 && doc.hours) h2.textContent = doc.hours.thuFri;
    const h3 = document.getElementById('therapistHoursSat');
    if (h3 && doc.hours) h3.textContent = doc.hours.sat;

    // 5. Hero Consultation Image
    const heroImg = document.getElementById('therapistHeroImg');
    if (heroImg) {
      heroImg.src = doc.heroImage;
      heroImg.alt = doc.heroAlt || \`\${doc.name} consultation\`;
    }

    // 6. Bio
    const bioTitle = document.getElementById('therapistBioTitle');
    if (bioTitle) bioTitle.textContent = doc.bioTitle;
    const bioContainer = document.getElementById('therapistBioContainer');
    if (bioContainer && Array.isArray(doc.bioParagraphs)) {
      bioContainer.innerHTML = doc.bioParagraphs.map(p => \`<p>\${p}</p>\`).join('');
    }

    // 7. Credentials Cards
    const credContainer = document.getElementById('therapistCredentialsContainer');
    if (credContainer && Array.isArray(doc.credentials)) {
      credContainer.innerHTML = doc.credentials.map(c => \`
        <div class="col-md-6">
          <div class="p-3 bg-surface-alt rounded-3 border border-subtle h-100">
            <h6 class="fw-bold mb-1"><i class="\${c.icon} \${c.color} me-2"></i> \${c.title}</h6>
            <p class="small text-muted mb-0">\${c.desc}</p>
          </div>
        </div>
      \`).join('');
    }

    // 8. Direct Booking Form
    const bookHeading = document.getElementById('therapistBookingHeader');
    if (bookHeading) {
      bookHeading.innerHTML = \`<i class="fas fa-calendar-check text-primary me-2"></i> \${doc.bookingTitle}\`;
    }
    const bookSub = document.getElementById('therapistBookingSubtitle');
    if (bookSub) bookSub.textContent = doc.bookingSubtitle;
    const bookAlert = document.getElementById('therapistFormAlert');
    if (bookAlert) {
      bookAlert.innerHTML = \`<i class="fas fa-check-circle me-2"></i> \${doc.successMsg}\`;
    }

    // Preselect in booking modal if available
    const bookTherapistSelect = document.getElementById('bookTherapist');
    if (bookTherapistSelect) {
      // Check if option exists, if not add it
      if (!Array.from(bookTherapistSelect.options).some(opt => opt.value === doc.id)) {
        const newOpt = document.createElement('option');
        newOpt.value = doc.id;
        newOpt.textContent = \`\${doc.name} (\${doc.specialty})\`;
        bookTherapistSelect.appendChild(newOpt);
      }
      bookTherapistSelect.value = doc.id;
    }
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderTherapistDetails);
  } else {
    renderTherapistDetails();
  }

  // Export for external verification or manual testing
  window.PhysioLifeTherapists = {
    data: THERAPISTS_DATA,
    render: renderTherapistDetails,
    getRequestedTherapistId: getRequestedTherapistId
  };
})();
`;

fs.writeFileSync('assets/js/therapist-engine.js', code, 'utf8');
console.log('assets/js/therapist-engine.js successfully updated.');
