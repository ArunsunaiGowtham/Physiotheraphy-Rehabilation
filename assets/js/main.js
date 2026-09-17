/**
 * PhysioLife - Main Interactive JavaScript
 * Author: Antigravity
 * Version: 1.0.0
 */

/* ==========================================================================
   PhysioLife Centralized Form Validation Engine
   Standardized rules for Name, Email, Phone across all forms
   ========================================================================== */
const PhysioValidator = {
  // 1. Name: Min 2 letters, alphabetic characters and spaces only, no numbers or special chars. Trimmed.
  validateName(val) {
    const trimmed = (val || '').trim();
    if (!trimmed) {
      return { valid: false, message: 'Please enter your full name.' };
    }
    // Disallow numbers and special characters; only allow letters and normal spaces
    if (!/^[A-Za-z]+(?:\s+[A-Za-z]+)*$/.test(trimmed)) {
      return { valid: false, message: 'Name must contain only alphabetic letters and spaces (no numbers or special characters).' };
    }
    const alphaCount = trimmed.replace(/[^A-Za-z]/g, '').length;
    if (alphaCount < 2) {
      return { valid: false, message: 'Name must contain at least 2 alphabetic characters.' };
    }
    return { valid: true, message: '', value: trimmed };
  },

  // 2. Email: Valid complete email with domain and valid TLD (>=2 chars). Case-insensitive. Rejects invalid uppercase domain without TLD like GMAIL.
  validateEmail(val) {
    const trimmed = (val || '').trim();
    if (!trimmed) {
      return { valid: false, message: 'Please enter your email address.' };
    }
    // Strict email regex with TLD requirement
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(trimmed)) {
      return { valid: false, message: 'Please enter a complete and valid email address (e.g. name@example.com).' };
    }
    return { valid: true, message: '', value: trimmed };
  },

  // 3. Phone: No alphabets, no arbitrary special chars, valid 10-15 digits. Supports 10-digit mobile, +91 country code, +1 US format.
  validatePhone(val) {
    const trimmed = (val || '').trim();
    if (!trimmed) {
      return { valid: false, message: 'Please enter your phone number.' };
    }
    if (/[a-zA-Z]/.test(trimmed)) {
      return { valid: false, message: 'Phone number cannot contain alphabetic letters.' };
    }
    if (!/^[0-9+\s\-()]+$/.test(trimmed)) {
      return { valid: false, message: 'Phone number contains invalid special characters.' };
    }
    const digits = trimmed.replace(/\D/g, '');
    if (digits.length < 10) {
      return { valid: false, message: 'Phone number must be at least 10 digits (e.g. 9876543210 or +1 (555) 000-0000).' };
    }
    if (digits.length > 15) {
      return { valid: false, message: 'Phone number cannot exceed 15 digits.' };
    }
    return { valid: true, message: '', value: trimmed };
  },

  // Helper to validate a specific input element
  validateField(input) {
    if (!input) return true;
    const val = input.value;
    const type = (input.getAttribute('type') || '').toLowerCase();
    const id = (input.id || '').toLowerCase();
    const name = (input.name || '').toLowerCase();
    const placeholder = (input.placeholder || '').toLowerCase();

    let res = { valid: true, message: '' };

    const isName = id.includes('name') || name.includes('name') || placeholder.includes('name') || input.dataset.validate === 'name';
    const isEmail = type === 'email' || id.includes('email') || name.includes('email') || input.dataset.validate === 'email';
    const isPhone = type === 'tel' || id.includes('phone') || name.includes('phone') || placeholder.includes('phone') || input.dataset.validate === 'phone';

    if (isName) {
      res = this.validateName(val);
    } else if (isEmail) {
      res = this.validateEmail(val);
    } else if (isPhone) {
      res = this.validatePhone(val);
    } else if (input.required && !val.trim()) {
      res = { valid: false, message: 'This field is required.' };
    }

    // Locate or create .invalid-feedback
    let feedback = input.parentNode.querySelector('.invalid-feedback');
    if (!feedback && input.closest('.mb-3, .col-md-6, .col-12, .col-sm-6, .input-group')) {
      const container = input.closest('.mb-3, .col-md-6, .col-12, .col-sm-6') || input.parentNode;
      feedback = container.querySelector('.invalid-feedback');
      if (!feedback) {
        feedback = document.createElement('div');
        feedback.className = 'invalid-feedback';
        if (input.closest('.input-group')) {
          input.closest('.input-group').after(feedback);
        } else {
          input.after(feedback);
        }
      }
    }

    if (!res.valid) {
      input.classList.add('is-invalid');
      input.classList.remove('is-valid');
      if (feedback) {
        feedback.textContent = res.message;
        feedback.style.display = 'block';
      }
      input.setCustomValidity(res.message);
      return false;
    } else {
      input.classList.remove('is-invalid');
      input.classList.add('is-valid');
      if (feedback) {
        feedback.textContent = '';
        feedback.style.display = '';
      }
      input.setCustomValidity('');
      return true;
    }
  },

  // Attach live and submit listeners to any form
  attachFormValidation(form) {
    if (!form || form.__physioValidationAttached) return;
    form.__physioValidationAttached = true;

    const inputs = form.querySelectorAll('input:not([type="hidden"]):not([type="submit"]):not([type="button"]):not([type="checkbox"]):not([type="radio"]), select, textarea');

    inputs.forEach((input) => {
      input.addEventListener('blur', () => {
        if (input.value.trim() || input.required) {
          PhysioValidator.validateField(input);
        }
      });
      input.addEventListener('input', () => {
        if (input.classList.contains('is-invalid')) {
          PhysioValidator.validateField(input);
        }
      });
    });

    form.addEventListener('submit', (e) => {
      let isFormValid = true;
      let firstInvalid = null;

      inputs.forEach((input) => {
        const ok = PhysioValidator.validateField(input);
        if (!ok && isFormValid) {
          isFormValid = false;
          firstInvalid = input;
        }
      });

      if (!isFormValid) {
        e.preventDefault();
        e.stopPropagation();
        form.classList.add('was-validated');
        if (firstInvalid) {
          firstInvalid.focus();
        }
        return false;
      }
      return true;
    });
  }
};

window.PhysioValidator = PhysioValidator;

function initMain() {
  'use strict';

  /* ==========================================================================
     Navbar Auth State Synchronization (Login/Signup vs Dashboard/Logout)
     ========================================================================== */
  function syncNavbarAuthState() {
    let user = null;
    try {
      const sessionStr = sessionStorage.getItem('physiolife_current_user') || localStorage.getItem('physiolife_current_user');
      if (sessionStr) {
        user = JSON.parse(sessionStr);
      }
    } catch (e) {
      user = null;
    }

    if (!user || !user.email || !user.role) {
      return;
    }

    const isAdmin = (user.role === 'admin');
    const isSubdir = window.location.pathname.includes('/patient/') || window.location.pathname.includes('/admin/');
    const targetDashboard = isAdmin
      ? (isSubdir ? '../admin/dashboard.html' : 'admin/dashboard.html')
      : (isSubdir ? '../patient/dashboard.html' : 'patient/dashboard.html');
    const roleLabel = isAdmin ? 'Admin Dashboard' : 'Dashboard';
    const shortLabel = isAdmin ? 'Admin' : 'Dashboard';

    // 1. Desktop Navbar Actions (>= 1200px)
    const desktopActions = document.querySelector('.navbar-actions');
    if (desktopActions) {
      const loginBtn = desktopActions.querySelector('.btn-nav-login');
      const signupBtn = desktopActions.querySelector('.btn-nav-signup');

      if (loginBtn) {
        loginBtn.outerHTML = `
          <a href="${targetDashboard}" class="btn-nav-dashboard" id="navDashboardBtn" title="Go to ${roleLabel}">
            <i class="fas fa-th-large"></i> <span>${roleLabel}</span>
          </a>
        `;
      }
      if (signupBtn) {
        signupBtn.outerHTML = `
          <a href="#" class="btn-nav-logout" id="navLogoutBtn" title="Sign Out">
            <i class="fas fa-sign-out-alt"></i> <span>Logout</span>
          </a>
        `;
      }

      const logoutBtn = document.getElementById('navLogoutBtn');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', function (e) {
          e.preventDefault();
          localStorage.removeItem('physiolife_current_user');
          sessionStorage.removeItem('physiolife_current_user');
          window.location.reload();
        });
      }
    }

    // 2. Mobile Header Bar (Directly visible beside Hamburger button on mobile screens)
    const toggler = document.querySelector('.navbar-toggler');
    if (toggler && !document.getElementById('mobileHeaderDashboardBtn')) {
      const mobileHeaderDash = document.createElement('a');
      mobileHeaderDash.href = targetDashboard;
      mobileHeaderDash.id = 'mobileHeaderDashboardBtn';
      mobileHeaderDash.className = 'btn-nav-dashboard-header d-xl-none';
      mobileHeaderDash.title = `Go to ${roleLabel}`;
      mobileHeaderDash.innerHTML = `<i class="fas fa-th-large"></i> <span class="d-none d-sm-inline">${shortLabel}</span>`;
      toggler.parentNode.insertBefore(mobileHeaderDash, toggler);
    }

    // 3. Mobile Drawer Actions (< 1200px)
    const mobileLoginBtn = document.querySelector('.mobile-nav-actions .btn-nav-login');
    const mobileSignupBtn = document.querySelector('.mobile-nav-actions .btn-nav-signup');

    if (mobileLoginBtn) {
      mobileLoginBtn.outerHTML = `
        <a href="${targetDashboard}" class="btn-nav-dashboard flex-fill justify-content-center" id="mobileNavDashboardBtn" title="Go to ${roleLabel}">
          <i class="fas fa-th-large"></i> <span>${roleLabel}</span>
        </a>
      `;
    }
    if (mobileSignupBtn) {
      mobileSignupBtn.outerHTML = `
        <a href="#" class="btn-nav-logout flex-fill justify-content-center" id="mobileNavLogoutBtn" title="Sign Out">
          <i class="fas fa-sign-out-alt"></i> <span>Logout</span>
        </a>
      `;
    }

    const mobileLogoutBtn = document.getElementById('mobileNavLogoutBtn');
    if (mobileLogoutBtn) {
      mobileLogoutBtn.addEventListener('click', function (e) {
        e.preventDefault();
        localStorage.removeItem('physiolife_current_user');
        sessionStorage.removeItem('physiolife_current_user');
        window.location.reload();
      });
    }
  }

  syncNavbarAuthState();

  /* ==========================================================================
     Navbar Dropdown Interactivity (Hover + Click Support)
     ========================================================================== */
  function initNavbarDropdowns() {
    const dropdownElements = document.querySelectorAll('.navbar-nav .dropdown');
    dropdownElements.forEach((dropdown) => {
      const toggleBtn = dropdown.querySelector('.dropdown-toggle');
      const menu = dropdown.querySelector('.dropdown-menu');
      if (!toggleBtn || !menu) return;

      // Desktop hover support (>= 1200px where navbar is expanded)
      dropdown.addEventListener('mouseenter', function () {
        if (window.innerWidth >= 1200) {
          dropdown.classList.add('show');
          menu.classList.add('show');
          toggleBtn.classList.add('show');
          toggleBtn.setAttribute('aria-expanded', 'true');
        }
      });

      dropdown.addEventListener('mouseleave', function () {
        if (window.innerWidth >= 1200) {
          dropdown.classList.remove('show');
          menu.classList.remove('show');
          toggleBtn.classList.remove('show');
          toggleBtn.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Close dropdown on click outside
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.navbar-nav .dropdown')) {
        document.querySelectorAll('.navbar-nav .dropdown').forEach((d) => {
          d.classList.remove('show');
          d.querySelector('.dropdown-menu')?.classList.remove('show');
          const toggle = d.querySelector('.dropdown-toggle');
          if (toggle) {
            toggle.classList.remove('show');
            toggle.setAttribute('aria-expanded', 'false');
          }
        });
      }
    });

    // Auto-close mobile navbar when clicking nav-link (non-dropdown)
    const mobileNavLinks = document.querySelectorAll('#navbarMain .nav-link:not(.dropdown-toggle), #navbarMain .dropdown-item');
    const navbarCollapseEl = document.getElementById('navbarMain');
    mobileNavLinks.forEach((link) => {
      link.addEventListener('click', function () {
        if (window.innerWidth < 1200 && navbarCollapseEl && navbarCollapseEl.classList.contains('show') && typeof bootstrap !== 'undefined' && bootstrap.Collapse) {
          const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapseEl) || new bootstrap.Collapse(navbarCollapseEl, { toggle: false });
          bsCollapse.hide();
        }
      });
    });
  }

  initNavbarDropdowns();

  /* ==========================================================================
     Sticky Header on Scroll
     ========================================================================== */
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('is-sticky');
      } else {
        header.classList.remove('is-sticky');
      }
    });
  }

  /* ==========================================================================
     Service Category Filter
     ========================================================================== */
  const serviceFilterBtns = document.querySelectorAll('.filter-btn[data-filter]');
  const serviceCards = document.querySelectorAll('.service-item[data-category]');

  if (serviceFilterBtns.length && serviceCards.length) {
    serviceFilterBtns.forEach((btn) => {
      btn.addEventListener('click', function () {
        serviceFilterBtns.forEach((b) => b.classList.remove('active'));
        this.classList.add('active');

        const filter = this.getAttribute('data-filter');

        serviceCards.forEach((card) => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = 'block';
            card.classList.add('animate__fadeIn');
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /* ==========================================================================
     Password Visibility Toggle
     ========================================================================== */
  const togglePasswordBtns = document.querySelectorAll('.toggle-password-btn');
  togglePasswordBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
      const targetInputId = this.getAttribute('data-target');
      const input = document.getElementById(targetInputId);
      if (input) {
        const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', type);
        const icon = this.querySelector('i');
        if (icon) {
          icon.classList.toggle('fa-eye');
          icon.classList.toggle('fa-eye-slash');
        }
      }
    });
  });

  /* ==========================================================================
     Booking Wizard / Modal Interactivity
     ========================================================================== */
  function initBookingModalTriggers() {
    const bookingTriggers = document.querySelectorAll(
      'button[data-bs-target="#bookingModal"], a[data-bs-target="#bookingModal"], #bookBiomechanicalBtn, #bookAthleticAssessmentBtn'
    );
    bookingTriggers.forEach((trigger) => {
      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        const modalEl = document.getElementById('bookingModal');
        if (!modalEl) return;

        // Auto-select sports/biomechanics if triggered from athletic pages/buttons
        const triggerText = (this.textContent || '').toLowerCase();
        const triggerId = this.id || '';
        const isBiomech = triggerText.includes('biomechanical') || triggerText.includes('athletic') || triggerId.includes('Biomechanical');
        const serviceSelect = modalEl.querySelector('#bookService');
        if (serviceSelect && isBiomech) {
          if (serviceSelect.querySelector('option[value="sports"]')) {
            serviceSelect.value = 'sports';
          }
        }

        if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
          const bsModal = bootstrap.Modal.getOrCreateInstance(modalEl);
          bsModal.show();
        } else {
          modalEl.classList.add('show');
          modalEl.style.display = 'block';
          modalEl.removeAttribute('aria-hidden');
          modalEl.setAttribute('aria-modal', 'true');
          modalEl.setAttribute('role', 'dialog');
          let backdrop = document.querySelector('.modal-backdrop');
          if (!backdrop) {
            backdrop = document.createElement('div');
            backdrop.className = 'modal-backdrop fade show';
            document.body.appendChild(backdrop);
            backdrop.addEventListener('click', () => {
              modalEl.classList.remove('show');
              modalEl.style.display = 'none';
              modalEl.setAttribute('aria-hidden', 'true');
              backdrop.remove();
              document.body.classList.remove('modal-open');
            });
          }
          document.body.classList.add('modal-open');
        }
      });
    });

    // Handle dismiss buttons
    document.querySelectorAll('#bookingModal [data-bs-dismiss="modal"]').forEach((btn) => {
      btn.addEventListener('click', function () {
        const modalEl = document.getElementById('bookingModal');
        if (modalEl) {
          if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
            const bsModal = bootstrap.Modal.getOrCreateInstance(modalEl);
            bsModal.hide();
          }
          modalEl.classList.remove('show');
          modalEl.style.display = 'none';
          modalEl.setAttribute('aria-hidden', 'true');
          modalEl.removeAttribute('aria-modal');
          document.querySelectorAll('.modal-backdrop').forEach((b) => b.remove());
          document.body.classList.remove('modal-open');
          document.body.style.removeProperty('overflow');
          document.body.style.removeProperty('padding-right');
        }
      });
    });
  }

  initBookingModalTriggers();

  const bookingForm = document.getElementById('appointmentBookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const nameInput = bookingForm.querySelector('#athleteFullName') || bookingForm.querySelector('#bookName') || bookingForm.querySelector('input[type="text"]');
      const emailInput = bookingForm.querySelector('#athleteEmail') || bookingForm.querySelector('#bookEmail') || bookingForm.querySelector('input[type="email"]');
      const phoneInput = bookingForm.querySelector('#bookPhone') || bookingForm.querySelector('input[type="tel"]');
      const submitBtn = bookingForm.querySelector('#requestAssessmentBtn') || bookingForm.querySelector('button[type="submit"]');

      let hasError = false;
      let firstErrorInput = null;

      if (nameInput) {
        if (!PhysioValidator.validateField(nameInput)) {
          hasError = true;
          if (!firstErrorInput) firstErrorInput = nameInput;
        }
      }

      if (emailInput) {
        if (!PhysioValidator.validateField(emailInput)) {
          hasError = true;
          if (!firstErrorInput) firstErrorInput = emailInput;
        }
      }

      if (phoneInput) {
        if (!PhysioValidator.validateField(phoneInput)) {
          hasError = true;
          if (!firstErrorInput) firstErrorInput = phoneInput;
        }
      }

      // Check remaining required fields in booking form (e.g. date, service)
      const otherInputs = bookingForm.querySelectorAll('select[required], input[type="date"][required]');
      otherInputs.forEach(input => {
        if (!PhysioValidator.validateField(input)) {
          hasError = true;
          if (!firstErrorInput) firstErrorInput = input;
        }
      });

      if (hasError) {
        if (firstErrorInput) firstErrorInput.focus();
        bookingForm.classList.add('was-validated');
        return;
      }

      const origBtnHtml = submitBtn ? submitBtn.innerHTML : '<i class="fas fa-check me-2"></i> Confirm';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Submitting...';
      }

      let feedbackDiv = document.getElementById('bookingConfirmationFeedback');
      if (!feedbackDiv) {
        feedbackDiv = document.createElement('div');
        feedbackDiv.id = 'bookingConfirmationFeedback';
        feedbackDiv.className = 'alert alert-success mb-4';
        feedbackDiv.setAttribute('role', 'alert');
        feedbackDiv.innerHTML = '<i class="fas fa-check-circle me-2"></i> Your session request has been received! Our patient care team will contact you shortly to confirm.';
        bookingForm.prepend(feedbackDiv);
      } else {
        feedbackDiv.classList.remove('d-none');
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.className = 'btn btn-success w-100 py-2 fw-semibold';
          submitBtn.innerHTML = '<i class="fas fa-check-circle me-2"></i> Request Confirmed!';
        }

        setTimeout(() => {
          const modalEl = document.getElementById('bookingModal');
          if (modalEl) {
            if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
              const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
              if (modal) modal.hide();
            }
            modalEl.classList.remove('show');
            modalEl.style.display = 'none';
            modalEl.setAttribute('aria-hidden', 'true');
            document.querySelectorAll('.modal-backdrop').forEach((b) => b.remove());
            document.body.classList.remove('modal-open');
            document.body.style.removeProperty('overflow');
            document.body.style.removeProperty('padding-right');
          }
          bookingForm.reset();
          if (nameInput) nameInput.classList.remove('is-invalid');
          if (emailInput) emailInput.classList.remove('is-invalid');
          if (feedbackDiv) feedbackDiv.classList.add('d-none');
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.className = 'btn btn-secondary w-100 py-2 fw-semibold';
            submitBtn.innerHTML = origBtnHtml;
          }
        }, 1800);
      }, 400);
    });
  }

  /* ==========================================================================
     Countdown Timer for Coming Soon Page
     ========================================================================== */
  const countdownContainer = document.getElementById('countdownTimer');
  if (countdownContainer) {
    // Target date 45 days in future
    const targetDate = new Date().getTime() + 45 * 24 * 60 * 60 * 1000;

    function updateCountdown() {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        countdownContainer.innerHTML = '<h4>We are now Live!</h4>';
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      const dEl = document.getElementById('cd-days');
      const hEl = document.getElementById('cd-hours');
      const mEl = document.getElementById('cd-minutes');
      const sEl = document.getElementById('cd-seconds');

      if (dEl) dEl.textContent = String(days).padStart(2, '0');
      if (hEl) hEl.textContent = String(hours).padStart(2, '0');
      if (mEl) mEl.textContent = String(minutes).padStart(2, '0');
      if (sEl) sEl.textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  /* ==========================================================================
     Animated Number Counters
     ========================================================================== */
  const counterEls = document.querySelectorAll('.counter-val[data-target]');
  if ('IntersectionObserver' in window && counterEls.length) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-target'), 10);
            animateCounter(entry.target, target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counterEls.forEach((el) => observer.observe(el));
  } else {
    counterEls.forEach((el) => {
      el.textContent = el.getAttribute('data-target');
    });
  }

  function animateCounter(el, target) {
    let current = 0;
    const duration = 1500;
    const step = Math.ceil(target / (duration / 25));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        el.textContent = target.toLocaleString() + (el.getAttribute('data-suffix') || '');
        clearInterval(timer);
      } else {
        el.textContent = current.toLocaleString() + (el.getAttribute('data-suffix') || '');
      }
    }, 25);
  }

  /* ==========================================================================
     Contact & General Form Validation Feedback
     ========================================================================== */
  const validatedForms = document.querySelectorAll('.needs-validation');
  Array.from(validatedForms).forEach((form) => {
    PhysioValidator.attachFormValidation(form);

    form.addEventListener('submit', (event) => {
      // If form passed validation and has a success alert, show it
      if (!event.defaultPrevented) {
        event.preventDefault();
        const alertSuccess = form.querySelector('.form-success-alert');
        if (alertSuccess) {
          alertSuccess.classList.remove('d-none');
          form.reset();
          form.classList.remove('was-validated');
          form.querySelectorAll('.is-valid, .is-invalid').forEach(el => {
            el.classList.remove('is-valid', 'is-invalid');
          });
        }
      }
    });
  });

  /* ==========================================================================
     Social Media Links Handler & Fallback Resolver
     ========================================================================== */
  function initSocialLinks() {
    const defaultClinicSocials = {
      facebook: 'https://www.facebook.com/physiolifeclinic',
      twitter: 'https://twitter.com/physiolifeclinic',
      linkedin: 'https://www.linkedin.com/company/physiolife-clinic',
      instagram: 'https://www.instagram.com/physiolifeclinic',
      youtube: 'https://www.youtube.com/@physiolifeclinic'
    };

    // 1. Article & Page Share Buttons
    document.querySelectorAll('.social-icon-btn[title*="Share"], .social-icon-btn[aria-label*="Share"]').forEach((btn) => {
      const label = (btn.getAttribute('title') || btn.getAttribute('aria-label') || '').toLowerCase();
      const currentUrl = encodeURIComponent(window.location.href);
      const currentTitle = encodeURIComponent(document.title);

      if (label.includes('facebook')) {
        btn.href = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
      } else if (label.includes('twitter')) {
        btn.href = `https://twitter.com/intent/tweet?url=${currentUrl}&text=${currentTitle}`;
      } else if (label.includes('linkedin')) {
        btn.href = `https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`;
      }
      btn.target = '_blank';
      btn.rel = 'noopener noreferrer';
    });

    // 2. Resolve Any Remaining Social Links with href="#"
    document.querySelectorAll('.social-icon-btn').forEach((btn) => {
      const href = btn.getAttribute('href');
      const aria = (btn.getAttribute('aria-label') || btn.getAttribute('title') || '').toLowerCase();
      const icon = btn.querySelector('i');
      const iconClasses = icon ? icon.className.toLowerCase() : '';

      if (!href || href === '#' || href === 'javascript:void(0)') {
        let destination = '';
        if (aria.includes('facebook') || iconClasses.includes('fa-facebook')) {
          destination = defaultClinicSocials.facebook;
        } else if (aria.includes('twitter') || iconClasses.includes('fa-twitter')) {
          destination = defaultClinicSocials.twitter;
        } else if (aria.includes('linkedin') || iconClasses.includes('fa-linkedin')) {
          destination = defaultClinicSocials.linkedin;
        } else if (aria.includes('instagram') || iconClasses.includes('fa-instagram')) {
          destination = defaultClinicSocials.instagram;
        } else if (aria.includes('youtube') || iconClasses.includes('fa-youtube')) {
          destination = defaultClinicSocials.youtube;
        }

        if (destination) {
          btn.href = destination;
        }
      }

      // Ensure all external social links open safely in a new tab
      if (btn.href && btn.href.startsWith('http')) {
        btn.target = '_blank';
        btn.rel = 'noopener noreferrer';
      }
    });
  }

  initSocialLinks();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMain);
} else {
  initMain();
}

