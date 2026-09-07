/**
 * PhysioLife - Client-Side Authentication Engine
 * Manages user registration, credential validation, duplicate detection, and sessions.
 * Author: Antigravity
 * Version: 1.0.0
 */

(function (global) {
  'use strict';

  const USERS_KEY = 'physiolife_users';
  const CURRENT_USER_KEY = 'physiolife_current_user';

  // Seed default accounts and ensure valid roles and dashboard targets
  function seedDefaultUsers() {
    let users = [];
    try {
      users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    } catch (e) {
      users = [];
    }

    let changed = false;

    // Ensure default patient exists and has valid role/dashboard
    let patient = users.find(u => u.email && u.email.toLowerCase() === 'patient@physiolife.com');
    if (!patient) {
      users.unshift({
        fullName: 'Sarah Connor',
        email: 'patient@physiolife.com',
        phone: '+1 (555) 234-5678',
        password: 'patient123',
        role: 'patient',
        dashboard: 'patient/dashboard.html',
        registeredAt: new Date().toISOString()
      });
      changed = true;
    } else {
      if (patient.role !== 'patient' || patient.dashboard !== 'patient/dashboard.html' || !patient.password) {
        patient.role = 'patient';
        patient.dashboard = 'patient/dashboard.html';
        patient.password = patient.password || 'patient123';
        changed = true;
      }
    }

    // Ensure default admin exists
    let admin = users.find(u => u.email && u.email.toLowerCase() === 'admin@physiolife.com');
    if (!admin) {
      users.push({
        fullName: 'Dr. Marcus Vance',
        email: 'admin@physiolife.com',
        phone: '+1 (555) 876-5432',
        password: 'admin123',
        role: 'admin',
        dashboard: 'admin/dashboard.html',
        registeredAt: new Date().toISOString()
      });
      changed = true;
    } else {
      if (admin.role !== 'admin' || admin.dashboard !== 'admin/dashboard.html' || !admin.password) {
        admin.role = 'admin';
        admin.dashboard = 'admin/dashboard.html';
        admin.password = admin.password || 'admin123';
        changed = true;
      }
    }

    // Ensure all non-admin users strictly have role='patient' and dashboard='patient/dashboard.html'
    users.forEach(u => {
      if (u.role !== 'admin') {
        if (u.role !== 'patient' || u.dashboard !== 'patient/dashboard.html') {
          u.role = 'patient';
          u.dashboard = 'patient/dashboard.html';
          changed = true;
        }
      }
    });

    if (changed || !localStorage.getItem(USERS_KEY)) {
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }
  }

  // Get all registered users
  function getUsers() {
    seedDefaultUsers();
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  // Save users array
  function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  /**
   * Register a new user account
   * Strictly creates an account; does NOT log in automatically.
   * Supports role specification: 'patient' or 'admin'.
   */
  function registerUser({ fullName, email, phone, password, role = 'patient' }) {
    if (!fullName || !fullName.trim()) {
      return { success: false, message: 'Please enter your full name.' };
    }
    if (!email || !email.trim()) {
      return { success: false, message: 'Please enter a valid email address.' };
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.trim())) {
      return { success: false, message: 'Please provide a valid email format (e.g. name@example.com).' };
    }
    if (!password || password.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters in length.' };
    }

    const cleanEmail = email.trim().toLowerCase();
    const users = getUsers();

    // Check for duplicate registration
    const isDuplicate = users.some(u => u.email.toLowerCase() === cleanEmail);
    if (isDuplicate) {
      return {
        success: false,
        message: 'This email address is already registered. Please log in instead or use a different email.'
      };
    }

    const assignedRole = (role === 'admin') ? 'admin' : 'patient';
    const assignedDashboard = (assignedRole === 'admin') ? 'admin/dashboard.html' : 'patient/dashboard.html';

    const newUser = {
      fullName: fullName.trim(),
      email: cleanEmail,
      phone: phone ? phone.trim() : '',
      password: password,
      role: assignedRole,
      dashboard: assignedDashboard,
      registeredAt: new Date().toISOString()
    };

    users.push(newUser);
    saveUsers(users);

    return {
      success: true,
      message: 'Account created successfully! You can now log in with your credentials.',
      user: { fullName: newUser.fullName, email: newUser.email, role: newUser.role, dashboard: newUser.dashboard }
    };
  }

  /**
   * Log in an existing user
   * Performs authentication only; does NOT create new accounts.
   * Optionally validates against expectedRole ('patient' or 'admin')
   */
  function loginUser(email, password, rememberMe = true, expectedRole = null) {
    if (!email || !email.trim()) {
      return { success: false, message: 'Please enter your email address.' };
    }
    if (!password) {
      return { success: false, message: 'Please enter your password.' };
    }

    const cleanEmail = email.trim().toLowerCase();
    const users = getUsers();

    const existingUser = users.find(u => u.email.toLowerCase() === cleanEmail);
    if (!existingUser) {
      return {
        success: false,
        code: 'USER_NOT_FOUND',
        message: 'No account found with this email address. Please check your email or Sign Up.'
      };
    }

    if (existingUser.password !== password) {
      return {
        success: false,
        code: 'INVALID_PASSWORD',
        message: 'Incorrect password. Please verify your credentials and try again.'
      };
    }

    // Role verification if an expected role was specified by the portal
    const userRole = (existingUser.role === 'admin') ? 'admin' : 'patient';
    if (expectedRole) {
      if (expectedRole === 'patient' && userRole !== 'patient') {
        return {
          success: false,
          code: 'ROLE_MISMATCH',
          message: 'Access denied: This account has Staff/Admin privileges. Please use the Admin Login.'
        };
      }
      if (expectedRole === 'admin' && userRole !== 'admin') {
        return {
          success: false,
          code: 'ROLE_MISMATCH',
          message: 'Access denied: This account is registered as a Patient. Please use the Patient Login.'
        };
      }
    }

    const userDashboard = (userRole === 'admin') ? 'admin/dashboard.html' : 'patient/dashboard.html';

    // Save session
    const sessionData = {
      fullName: existingUser.fullName,
      email: existingUser.email,
      role: userRole,
      dashboard: userDashboard,
      loggedInAt: new Date().toISOString()
    };

    if (rememberMe) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionData));
    } else {
      sessionStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionData));
    }

    return {
      success: true,
      user: sessionData,
      redirectUrl: sessionData.dashboard
    };
  }

  // Get current active session
  function getCurrentUser() {
    const sessionStr = sessionStorage.getItem(CURRENT_USER_KEY) || localStorage.getItem(CURRENT_USER_KEY);
    if (!sessionStr) return null;
    try {
      return JSON.parse(sessionStr);
    } catch (e) {
      return null;
    }
  }

  // Logout current session
  function logoutUser() {
    localStorage.removeItem(CURRENT_USER_KEY);
    sessionStorage.removeItem(CURRENT_USER_KEY);
  }

  /**
   * Social OAuth Simulation (Google / Apple)
   * Authenticates user and logs in directly with specified role
   */
  function socialLogin(provider, role = 'patient') {
    const provKey = (provider || 'google').toLowerCase();
    const providerLabel = provKey === 'apple' ? 'Apple' : 'Google';
    const isGoogle = provKey !== 'apple';
    
    const assignedRole = (role === 'admin') ? 'admin' : 'patient';
    const assignedDashboard = (assignedRole === 'admin') ? 'admin/dashboard.html' : 'patient/dashboard.html';
    
    const defaultName = isGoogle
      ? (assignedRole === 'admin' ? 'Dr. Marcus Vance' : 'Sarah Connor')
      : (assignedRole === 'admin' ? 'Dr. Sarah Jenkins' : 'Michael Scott');
      
    const defaultEmail = isGoogle
      ? (assignedRole === 'admin' ? 'marcus.vance@physiolife.com' : 'sarah.connor@gmail.com')
      : (assignedRole === 'admin' ? 'sarah.jenkins@appleid.com' : 'michael.scott@icloud.com');

    const sessionData = {
      fullName: defaultName,
      email: defaultEmail,
      role: assignedRole,
      dashboard: assignedDashboard,
      provider: providerLabel,
      loggedInAt: new Date().toISOString()
    };

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionData));
    sessionStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionData));

    return {
      success: true,
      user: sessionData,
      redirectUrl: sessionData.dashboard,
      provider: providerLabel
    };
  }

  /**
   * Display bottom-right toast notification explaining OAuth requirement.
   * Keeps user on the current login page, does not authenticate or redirect.
   * Includes a visible close (×) button for manual dismissal.
   */
  function showOAuthNotice(provider) {
    const isApple = (provider || '').toLowerCase() === 'apple';
    const providerName = isApple ? 'Apple' : 'Google';
    const message = `${providerName} Sign-In requires backend OAuth integration. This HTML template demonstrates the UI only.`;

    let container = document.getElementById('oauthToastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'oauthToastContainer';
      container.className = 'toast-container position-fixed bottom-0 end-0 p-3';
      container.style.zIndex = '99999';
      document.body.appendChild(container);
    }

    // Clean up existing toast for instant response
    container.innerHTML = '';

    const iconContent = isApple
      ? `<i class="fab fa-apple fa-lg text-body" style="font-size: 1.25rem;"></i>`
      : `<svg width="20" height="20" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
           <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.616z" fill="#4285F4"/>
           <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853"/>
           <path d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.347 2.825.957 4.039l3.007-2.332z" fill="#FBBC05"/>
           <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 7.293C4.672 5.166 6.656 3.58 9 3.58z" fill="#EA4335"/>
         </svg>`;

    const toast = document.createElement('div');
    toast.className = 'toast oauth-toast show border shadow-lg';
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');

    toast.innerHTML = `
      <div class="d-flex align-items-start p-3 gap-3">
        <div class="oauth-toast-icon">
          ${iconContent}
        </div>
        <div class="flex-grow-1 pt-1">
          <div class="d-flex align-items-center justify-content-between mb-1">
            <span class="fw-bold small text-primary" style="letter-spacing: 0.02em;">OAuth Integration Notice</span>
          </div>
          <div class="small fw-normal text-muted" style="line-height: 1.45;">
            ${message}
          </div>
        </div>
        <button type="button" class="btn-close ms-2 mt-1 flex-shrink-0" aria-label="Close" title="Dismiss notification"></button>
      </div>
    `;

    const closeBtn = toast.querySelector('.btn-close');
    const dismiss = () => {
      toast.classList.add('toast-hiding');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.remove();
        }
      }, 250);
    };

    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dismiss();
      });
    }

    // Auto dismiss after 8 seconds
    const timer = setTimeout(dismiss, 8000);
    toast.addEventListener('mouseenter', () => clearTimeout(timer));

    container.appendChild(toast);
  }

  // Initialize storage on load
  seedDefaultUsers();

  // Export to global scope
  global.PhysioAuth = {
    getUsers,
    registerUser,
    loginUser,
    socialLogin,
    showOAuthNotice,
    getCurrentUser,
    logoutUser
  };

})(window);
