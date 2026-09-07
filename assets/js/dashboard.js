/**
 * PhysioLife - Patient & Admin Dashboard Controller
 * Author: Antigravity
 * Version: 1.1.0
 */

// Route protection check (defense-in-depth for all dashboard pages)
(function checkDashboardAccess() {
  const rawPath = window.location.pathname.toLowerCase().replace(/\\/g, '/');
  const filename = rawPath.substring(rawPath.lastIndexOf('/') + 1);
  if (filename.includes('login') || filename.includes('register')) return;

  const isAdmin = rawPath.includes('/admin/');
  const isPatient = rawPath.includes('/patient/');
  if (!isAdmin && !isPatient) return;

  const sessionStr = sessionStorage.getItem('physiolife_current_user') || localStorage.getItem('physiolife_current_user');
  let user = null;
  try { user = sessionStr ? JSON.parse(sessionStr) : null; } catch(e) {}

  // 1. Unauthenticated users -> redirect strictly to dedicated login portal
  if (!user || !user.email || !user.role) {
    if (document.documentElement) document.documentElement.style.display = 'none';
    window.location.replace(isAdmin ? '../admin-login.html' : '../patient-login.html');
    return;
  }

  // 2. Role boundary protection: Customer login must NEVER open Admin Dashboard
  if (isAdmin && user.role !== 'admin') {
    if (document.documentElement) document.documentElement.style.display = 'none';
    window.location.replace('../admin-login.html?denied=patient');
    return;
  }

  // 3. Role boundary protection: Admin login must NEVER open Customer Dashboard
  if (isPatient && user.role !== 'patient') {
    if (document.documentElement) document.documentElement.style.display = 'none';
    window.location.replace('../patient-login.html?denied=admin');
    return;
  }
})();

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  /* ==========================================================================
     Patient Profile Storage & State Management
     ========================================================================== */
  const PROFILE_STORAGE_KEY = 'physiolife_patient_profile';

  const DEFAULT_PATIENT_PROFILE = {
    fullName: 'Robert Sterling',
    dob: '1986-04-12',
    email: 'robert@example.com',
    phone: '+1 (555) 234-8901',
    address: '142 Lexington Avenue, Apt 4B, New York, NY 10016',
    patientId: '#PT-82910'
  };

  /**
   * Retrieve stored patient profile from localStorage or fallback to active auth session / defaults
   */
  function getStoredPatientProfile() {
    try {
      const saved = localStorage.getItem(PROFILE_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object' && parsed.fullName) {
          return Object.assign({}, DEFAULT_PATIENT_PROFILE, parsed);
        }
      }
    } catch (e) {
      console.warn('Error reading stored patient profile from localStorage:', e);
    }

    // Sync from active PhysioAuth user session if present
    if (typeof PhysioAuth !== 'undefined' && PhysioAuth.getCurrentUser) {
      const authUser = PhysioAuth.getCurrentUser();
      if (authUser && authUser.fullName && authUser.role === 'patient') {
        return {
          fullName: authUser.fullName,
          dob: '1986-04-12',
          email: authUser.email || 'robert@example.com',
          phone: authUser.phone || '+1 (555) 234-8901',
          address: '142 Lexington Avenue, Apt 4B, New York, NY 10016',
          patientId: '#PT-82910'
        };
      }
    }

    return Object.assign({}, DEFAULT_PATIENT_PROFILE);
  }

  /**
   * Save patient profile into localStorage and synchronize with session
   */
  function savePatientProfile(profileData) {
    if (!profileData || typeof profileData !== 'object') return false;
    try {
      const current = getStoredPatientProfile();
      const merged = Object.assign({}, current, profileData, {
        updatedAt: new Date().toISOString()
      });
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(merged));

      // Synchronize with active PhysioAuth user session if present
      if (typeof PhysioAuth !== 'undefined' && PhysioAuth.getCurrentUser) {
        const authUser = PhysioAuth.getCurrentUser();
        if (authUser) {
          authUser.fullName = merged.fullName;
          authUser.email = merged.email;
          if (merged.phone) authUser.phone = merged.phone;
          try {
            if (sessionStorage.getItem('physiolife_current_user')) {
              sessionStorage.setItem('physiolife_current_user', JSON.stringify(authUser));
            } else {
              localStorage.setItem('physiolife_current_user', JSON.stringify(authUser));
            }
          } catch (e) {}
        }
      }

      // Immediately propagate updated values to the current page's UI
      applyPatientProfileToUI(merged);
      return true;
    } catch (e) {
      console.error('Error saving patient profile:', e);
      return false;
    }
  }

  /**
   * Validate patient profile input data according to required rules
   */
  function validatePatientProfile(data) {
    const errors = {};

    // 1. Full Name: Required, non-empty, min 2 characters
    if (!data.fullName || !data.fullName.trim()) {
      errors.fullName = 'Full Name is required.';
    } else if (data.fullName.trim().length < 2) {
      errors.fullName = 'Full Name must be at least 2 characters.';
    }

    // 2. Date of Birth: Required, valid date
    if (!data.dob || !data.dob.trim()) {
      errors.dob = 'Date of Birth is required.';
    } else {
      const d = new Date(data.dob);
      if (isNaN(d.getTime())) {
        errors.dob = 'Please enter a valid date of birth.';
      } else if (d > new Date()) {
        errors.dob = 'Date of birth cannot be in the future.';
      }
    }

    // 3. Email Address: Required, valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !data.email.trim()) {
      errors.email = 'Email Address is required.';
    } else if (!emailRegex.test(data.email.trim())) {
      errors.email = 'Please provide a valid email format (e.g. name@example.com).';
    }

    // 4. Phone Number: Required, valid phone number (at least 7 digits)
    const digitsOnly = (data.phone || '').replace(/\D/g, '');
    if (!data.phone || !data.phone.trim()) {
      errors.phone = 'Phone Number is required.';
    } else if (digitsOnly.length < 7) {
      errors.phone = 'Please enter a valid phone number (at least 7 digits).';
    }

    // 5. Residential Address: Required
    if (!data.address || !data.address.trim()) {
      errors.address = 'Residential Address is required.';
    } else if (data.address.trim().length < 5) {
      errors.address = 'Please enter a complete residential address.';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  /**
   * Synchronize patient profile information across all Patient Hub UI components
   */
  function applyPatientProfileToUI(profile) {
    if (!profile) profile = getStoredPatientProfile();
    if (!profile || !profile.fullName) return;

    const fullName = profile.fullName.trim();
    const firstName = fullName.split(' ')[0] || 'Patient';

    // 1. Update all sidebar user-name elements
    const nameEls = document.querySelectorAll('.user-name');
    nameEls.forEach((el) => {
      el.textContent = fullName;
    });

    // 2. Update user avatar alt text
    const avatarEls = document.querySelectorAll('.user-avatar');
    avatarEls.forEach((el) => {
      el.setAttribute('alt', fullName);
    });

    // 3. Update topbar welcome titles
    const topbarTitles = document.querySelectorAll('.topbar-title');
    topbarTitles.forEach((el) => {
      el.textContent = `Welcome back, ${firstName}`;
    });

    // 4. Update dashboard greeting (e.g. "Good Morning, Robert! 👋" -> "Good Morning, John! 👋")
    const greetings = document.querySelectorAll('h2, .dashboard-greeting, #patientGreeting');
    greetings.forEach((el) => {
      const match = el.textContent.match(/^(Good\s+(?:Morning|Afternoon|Evening)),\s+[^!]+!?(.*)$/i);
      if (match) {
        const salutation = match[1];
        const suffix = match[2] || ' 👋';
        el.textContent = `${salutation}, ${firstName}!${suffix.trim() ? ' ' + suffix.trim() : ''}`;
      }
    });

    // 5. Update Billed To Patient in receipts.html
    const receiptName = document.getElementById('receiptPatientName');
    if (receiptName) {
      receiptName.textContent = fullName;
    } else {
      const billedContainers = document.querySelectorAll('.col-sm-6');
      billedContainers.forEach(container => {
        const smallLabel = container.querySelector('small');
        if (smallLabel && smallLabel.textContent.includes('Billed To Patient:')) {
          const h6 = container.querySelector('h6');
          if (h6) h6.textContent = fullName;
        }
      });
    }
  }

  /* ==========================================================================
     Profile Page Form Controller (patient/profile.html)
     ========================================================================== */
  function populateProfileForm() {
    const profileForm = document.getElementById('profileForm');
    if (!profileForm) return;

    const nameInput = document.getElementById('profileFullName');
    const dobInput = document.getElementById('profileDob');
    const emailInput = document.getElementById('profileEmail');
    const phoneInput = document.getElementById('profilePhone');
    const addressInput = document.getElementById('profileAddress');

    // Populate inputs from saved profile data
    const profile = getStoredPatientProfile();
    if (nameInput) nameInput.value = profile.fullName || '';
    if (dobInput) dobInput.value = profile.dob || '';
    if (emailInput) emailInput.value = profile.email || '';
    if (phoneInput) phoneInput.value = profile.phone || '';
    if (addressInput) addressInput.value = profile.address || '';
  }

  function initProfilePage() {
    const profileForm = document.getElementById('profileForm');
    if (!profileForm) return;

    // Populate or update fields with current profile data
    populateProfileForm();

    // Prevent duplicate event listener registration
    if (profileForm.getAttribute('data-initialized') === 'true') {
      return;
    }
    profileForm.setAttribute('data-initialized', 'true');

    const nameInput = document.getElementById('profileFullName');
    const dobInput = document.getElementById('profileDob');
    const emailInput = document.getElementById('profileEmail');
    const phoneInput = document.getElementById('profilePhone');
    const addressInput = document.getElementById('profileAddress');

    // Real-time error removal on input/change
    [nameInput, dobInput, emailInput, phoneInput, addressInput].forEach((input) => {
      if (!input) return;
      const clearError = () => {
        input.classList.remove('is-invalid');
      };
      input.addEventListener('input', clearError);
      input.addEventListener('change', clearError);
    });

    // Handle profile form submit
    profileForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Clear existing invalid states
      profileForm.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));

      const formData = {
        fullName: nameInput ? nameInput.value : '',
        dob: dobInput ? dobInput.value : '',
        email: emailInput ? emailInput.value : '',
        phone: phoneInput ? phoneInput.value : '',
        address: addressInput ? addressInput.value : ''
      };

      const validation = validatePatientProfile(formData);
      if (!validation.isValid) {
        let firstInvalidInput = null;
        Object.keys(validation.errors).forEach((fieldName) => {
          const fieldMap = {
            fullName: nameInput,
            dob: dobInput,
            email: emailInput,
            phone: phoneInput,
            address: addressInput
          };
          const inputEl = fieldMap[fieldName];
          if (inputEl) {
            inputEl.classList.add('is-invalid');
            const feedbackEl = inputEl.parentElement.querySelector('.invalid-feedback');
            if (feedbackEl) {
              feedbackEl.textContent = validation.errors[fieldName];
            }
            if (!firstInvalidInput) {
              firstInvalidInput = inputEl;
            }
          }
        });

        if (firstInvalidInput) {
          firstInvalidInput.focus();
        }
        return;
      }

      // Save valid data
      const saved = savePatientProfile(formData);
      if (saved) {
        showToast('Profile updated successfully.');
      }
    });

    // Handle Change Password form separately (isolated from profile updates)
    const passwordForm = document.getElementById('changePasswordForm');
    if (passwordForm) {
      const currentPw = document.getElementById('currentPassword');
      const newPw = document.getElementById('newPassword');

      [currentPw, newPw].forEach((inp) => {
        if (!inp) return;
        const clear = () => inp.classList.remove('is-invalid');
        inp.addEventListener('input', clear);
      });

      passwordForm.addEventListener('submit', function (e) {
        e.preventDefault();
        passwordForm.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
        let valid = true;

        if (!currentPw || !currentPw.value.trim()) {
          if (currentPw) {
            currentPw.classList.add('is-invalid');
            const fb = currentPw.parentElement.querySelector('.invalid-feedback');
            if (fb) fb.textContent = 'Please enter your current password.';
          }
          valid = false;
        }

        if (!newPw || newPw.value.length < 6) {
          if (newPw) {
            newPw.classList.add('is-invalid');
            const fb = newPw.parentElement.querySelector('.invalid-feedback');
            if (fb) fb.textContent = 'New password must be at least 6 characters.';
          }
          valid = false;
        }

        if (valid) {
          showToast('Password updated successfully.');
          passwordForm.reset();
          passwordForm.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
        }
      });
    }
  }

  /* ==========================================================================
     Sidebar Mobile Toggle & Responsive Overlay
     ========================================================================== */
  const sidebar = document.querySelector('.dashboard-sidebar');
  const sidebarToggleBtn = document.getElementById('sidebarToggleBtn');

  if (sidebar && sidebarToggleBtn) {
    sidebarToggleBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      sidebar.classList.toggle('sidebar-open');
    });

    // Close on click outside on mobile
    document.addEventListener('click', function (e) {
      if (window.innerWidth < 992) {
        if (!sidebar.contains(e.target) && !sidebarToggleBtn.contains(e.target)) {
          sidebar.classList.remove('sidebar-open');
        }
      }
    });
  }

  /* ==========================================================================
     Dashboard Live Table Search
     ========================================================================== */
  const dashSearchInput = document.getElementById('dashTableSearch');
  if (dashSearchInput) {
    dashSearchInput.addEventListener('input', function (e) {
      const query = e.target.value.toLowerCase().trim();
      const rows = document.querySelectorAll('.table-custom tbody tr');

      rows.forEach((row) => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(query) ? '' : 'none';
      });
    });
  }

  /* ==========================================================================
     Interactive Exercise Completion Checkboxes
     ========================================================================== */
  const exerciseCheckboxes = document.querySelectorAll('.exercise-check');
  exerciseCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', function () {
      const card = this.closest('.exercise-item-card');
      if (card) {
        if (this.checked) {
          card.classList.add('completed-exercise');
          showToast('Exercise marked as completed! Keep it up!');
        } else {
          card.classList.remove('completed-exercise');
        }
      }
    });
  });

  /* ==========================================================================
     Toast Notification Helper
     ========================================================================== */
  function showToast(message) {
    let toastContainer = document.getElementById('dashToastContainer');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'dashToastContainer';
      toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
      toastContainer.style.zIndex = '1090';
      document.body.appendChild(toastContainer);
    }

    const toastEl = document.createElement('div');
    toastEl.className = 'toast align-items-center text-bg-primary border-0 show';
    toastEl.setAttribute('role', 'alert');
    toastEl.innerHTML = `
      <div class="d-flex">
        <div class="toast-body"><i class="fas fa-check-circle me-2"></i>${message}</div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
      </div>
    `;
    toastContainer.appendChild(toastEl);

    setTimeout(() => {
      toastEl.remove();
    }, 3500);
  }

  // Initial execution: Apply profile to current page UI & initialize form if present
  applyPatientProfileToUI(getStoredPatientProfile());
  initProfilePage();

  // Apply admin profile if logged in as admin
  try {
    const sessionStr = sessionStorage.getItem('physiolife_current_user') || localStorage.getItem('physiolife_current_user');
    const authUser = sessionStr ? JSON.parse(sessionStr) : null;
    if (authUser && authUser.role === 'admin' && authUser.fullName) {
      document.querySelectorAll('.dashboard-sidebar .user-name').forEach(el => {
        el.textContent = authUser.fullName;
      });
      document.querySelectorAll('.dashboard-sidebar .user-avatar').forEach(el => {
        el.setAttribute('alt', authUser.fullName);
      });
    }
  } catch (e) {}

  // Wire up all sign out links to cleanly clear session
  document.querySelectorAll('a[href*="login.html"]').forEach(link => {
    if (link.textContent.toLowerCase().includes('sign out') || link.textContent.toLowerCase().includes('logout')) {
      link.addEventListener('click', function () {
        localStorage.removeItem('physiolife_current_user');
        sessionStorage.removeItem('physiolife_current_user');
      });
    }
  });

  // Export to global scope
  window.PhysioProfile = {
    getProfile: getStoredPatientProfile,
    saveProfile: savePatientProfile,
    validate: validatePatientProfile,
    applyToUI: applyPatientProfileToUI,
    initProfilePage: initProfilePage,
    populateForm: populateProfileForm
  };

  window.PhysioDashboard = {
    showToast,
    profile: window.PhysioProfile
  };
});


