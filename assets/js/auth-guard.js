/**
 * PhysioLife - Route Protection & Authentication Guard
 * Protects dashboard pages against unauthorized access and enforces role isolation.
 * Author: Antigravity
 * Version: 1.0.0
 */

(function () {
  'use strict';

  const CURRENT_USER_KEY = 'physiolife_current_user';

  function getActiveSession() {
    try {
      const sessionStr = sessionStorage.getItem(CURRENT_USER_KEY) || localStorage.getItem(CURRENT_USER_KEY);
      if (!sessionStr) return null;
      return JSON.parse(sessionStr);
    } catch (e) {
      return null;
    }
  }

  function runGuard() {
    const rawPath = window.location.pathname.toLowerCase().replace(/\\/g, '/');
    const filename = rawPath.substring(rawPath.lastIndexOf('/') + 1);

    const isAdminArea = rawPath.includes('/admin/');
    const isPatientArea = rawPath.includes('/patient/');

    // Exempt login, registration pages, and public preview of patient exercise hub
    if (filename.includes('login') || filename.includes('register') || (isPatientArea && filename === 'exercises.html')) {
      return;
    }

    // Guard only applies to admin and patient protected areas
    if (!isAdminArea && !isPatientArea) {
      return;
    }

    const user = getActiveSession();

    // 1. Unauthenticated direct access check
    if (!user || !user.email || !user.role) {
      if (document.documentElement) {
        document.documentElement.style.display = 'none';
      }
      const targetLogin = isAdminArea ? '../login.html?role=admin' : '../login.html';
      window.location.replace(targetLogin);
      return;
    }

    // 2. Role-based isolation check
    if (isAdminArea && user.role !== 'admin') {
      if (document.documentElement) {
        document.documentElement.style.display = 'none';
      }
      // Redirect patient user to their own patient dashboard
      window.location.replace('../patient/dashboard.html');
      return;
    }

    if (isPatientArea && user.role !== 'patient') {
      if (document.documentElement) {
        document.documentElement.style.display = 'none';
      }
      // Redirect admin user to their admin dashboard
      window.location.replace('../admin/dashboard.html');
      return;
    }
  }

  // Execute immediately to prevent rendering flash
  runGuard();

  // Expose check helper to global scope
  window.PhysioAuthGuard = {
    getActiveSession,
    runGuard
  };
})();
