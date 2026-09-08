/**
 * PhysioLife - Main Interactive JavaScript
 * Author: Antigravity
 * Version: 1.0.0
 */

document.addEventListener('DOMContentLoaded', function () {
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
    const targetDashboard = isAdmin ? 'admin/dashboard.html' : 'patient/dashboard.html';
    const roleLabel = isAdmin ? 'Admin Dashboard' : 'Dashboard';

    // 1. Desktop Navbar Actions
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

    // 2. Mobile Drawer Actions
    const mobileActionGroup = document.querySelector('.mobile-nav-actions .d-flex.gap-2');
    if (mobileActionGroup) {
      const mobileLoginBtn = mobileActionGroup.querySelector('.btn-nav-login');
      const mobileSignupBtn = mobileActionGroup.querySelector('.btn-nav-signup');

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

      // Click handler to toggle dropdown without page reload
      toggleBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        const isOpen = menu.classList.contains('show');

        // Close any other open dropdowns
        document.querySelectorAll('.navbar-nav .dropdown-menu.show').forEach((m) => {
          if (m !== menu) {
            m.classList.remove('show');
            const otherToggle = m.closest('.dropdown')?.querySelector('.dropdown-toggle');
            if (otherToggle) otherToggle.setAttribute('aria-expanded', 'false');
          }
        });

        if (isOpen) {
          menu.classList.remove('show');
          toggleBtn.setAttribute('aria-expanded', 'false');
        } else {
          menu.classList.add('show');
          toggleBtn.setAttribute('aria-expanded', 'true');
        }
      });

      // Desktop hover support (>= 1200px where navbar is expanded)
      dropdown.addEventListener('mouseenter', function () {
        if (window.innerWidth >= 1200) {
          menu.classList.add('show');
          toggleBtn.setAttribute('aria-expanded', 'true');
        }
      });

      dropdown.addEventListener('mouseleave', function () {
        if (window.innerWidth >= 1200) {
          menu.classList.remove('show');
          toggleBtn.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Close dropdown on click outside
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.navbar-nav .dropdown')) {
        document.querySelectorAll('.navbar-nav .dropdown-menu.show').forEach((menu) => {
          menu.classList.remove('show');
          const toggle = menu.closest('.dropdown')?.querySelector('.dropdown-toggle');
          if (toggle) toggle.setAttribute('aria-expanded', 'false');
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
  const bookingForm = document.getElementById('appointmentBookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const feedbackDiv = document.getElementById('bookingConfirmationFeedback');
      if (feedbackDiv) {
        feedbackDiv.classList.remove('d-none');
        bookingForm.reset();
        setTimeout(() => {
          const modalEl = document.getElementById('bookingModal');
          if (modalEl && window.bootstrap) {
            const modal = bootstrap.Modal.getInstance(modalEl);
            if (modal) modal.hide();
            feedbackDiv.classList.add('d-none');
          }
        }, 2500);
      }
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
    form.addEventListener(
      'submit',
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        } else {
          event.preventDefault();
          const alertSuccess = form.querySelector('.form-success-alert');
          if (alertSuccess) {
            alertSuccess.classList.remove('d-none');
            form.reset();
            form.classList.remove('was-validated');
          }
        }
        form.classList.add('was-validated');
      },
      false
    );
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
});

