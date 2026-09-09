/**
 * PhysioLife - Theme & RTL Engine
 * Controls Dark/Light Theme and RTL Mode with LocalStorage Persistence
 * Author: Antigravity
 * Version: 2.0.0
 */

(function () {
  'use strict';

  const THEME_KEY = 'physiolife_theme';
  const DIR_KEY = 'physiolife_direction';

  // Retrieve stored settings or system defaults
  function getPreferredTheme() {
    const storedTheme = localStorage.getItem(THEME_KEY);
    if (storedTheme) {
      return storedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function getPreferredDirection() {
    return localStorage.getItem(DIR_KEY) || 'ltr';
  }

  // Strip all title, tooltip, and accessibility notification popup triggers
  function sanitizeButton(btn) {
    if (!btn) return;
    btn.removeAttribute('title');
    btn.removeAttribute('aria-label');
    btn.removeAttribute('data-bs-toggle');
    btn.removeAttribute('data-bs-title');
    btn.removeAttribute('data-bs-original-title');
    btn.title = '';
  }

  // Apply Theme
  function setTheme(theme) {
    document.documentElement.setAttribute('data-bs-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    updateThemeButtons(theme);

    // Dispatch event for components like Chart.js
    window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
  }

  // Apply Direction (LTR / RTL)
  function setDirection(direction) {
    document.documentElement.setAttribute('dir', direction);
    localStorage.setItem(DIR_KEY, direction);
    updateDirectionButtons(direction);

    window.dispatchEvent(new CustomEvent('directionChanged', { detail: { direction } }));
  }

  // Update UI toggles without ever setting title or notification attributes
  function updateThemeButtons(theme) {
    const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
    toggleBtns.forEach((btn) => {
      sanitizeButton(btn);
      const icon = btn.querySelector('i');
      const text = btn.querySelector('.theme-text');
      if (theme === 'dark') {
        if (icon) icon.className = 'fas fa-sun text-warning';
        if (text) text.textContent = 'Light';
      } else {
        if (icon) icon.className = 'fas fa-moon text-secondary';
        if (text) text.textContent = 'Dark';
      }
    });
  }

  function updateDirectionButtons(direction) {
    const dirBtns = document.querySelectorAll('.rtl-toggle-btn');
    dirBtns.forEach((btn) => {
      sanitizeButton(btn);
      const text = btn.querySelector('.dir-text');
      if (direction === 'rtl') {
        if (text) text.textContent = 'LTR';
      } else {
        if (text) text.textContent = 'RTL';
      }
    });
  }

  // Initial Execution
  const currentTheme = getPreferredTheme();
  const currentDir = getPreferredDirection();
  setTheme(currentTheme);
  setDirection(currentDir);

  // Clean immediately on DOM availability
  function cleanAllToggles() {
    document.querySelectorAll('.theme-toggle-btn, .rtl-toggle-btn').forEach(sanitizeButton);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', cleanAllToggles);
  } else {
    cleanAllToggles();
  }

  // Bind Event Handlers
  document.addEventListener('DOMContentLoaded', () => {
    updateThemeButtons(getPreferredTheme());
    updateDirectionButtons(getPreferredDirection());

    // Proactively suppress any tooltip notifications on hover/focus
    document.addEventListener('mouseover', (e) => {
      const btn = e.target.closest('.theme-toggle-btn, .rtl-toggle-btn');
      if (btn) sanitizeButton(btn);
    }, true);

    // Listen for Theme Toggle clicks
    document.addEventListener('click', (e) => {
      const targetBtn = e.target.closest('.theme-toggle-btn');
      if (targetBtn) {
        e.preventDefault();
        sanitizeButton(targetBtn);
        const activeTheme = document.documentElement.getAttribute('data-bs-theme') || 'light';
        const nextTheme = activeTheme === 'dark' ? 'light' : 'dark';
        setTheme(nextTheme);
        sanitizeButton(targetBtn);
        targetBtn.blur();
      }

      const dirBtn = e.target.closest('.rtl-toggle-btn');
      if (dirBtn) {
        e.preventDefault();
        sanitizeButton(dirBtn);
        const activeDir = document.documentElement.getAttribute('dir') || 'ltr';
        const nextDir = activeDir === 'rtl' ? 'ltr' : 'rtl';
        setDirection(nextDir);
        sanitizeButton(dirBtn);
        dirBtn.blur();
      }
    });
  });

  // Expose global methods
  window.PhysioTheme = {
    setTheme,
    setDirection,
    getTheme: () => document.documentElement.getAttribute('data-bs-theme') || 'light',
    getDirection: () => document.documentElement.getAttribute('dir') || 'ltr'
  };
})();
