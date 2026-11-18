/**
 * ATELIER Interior Design Studio - Theme Manager
 */

(function () {
  'use strict';

  const THEME_KEY = 'atelier-theme';

  // Apply theme immediately to avoid flash
  function applyInitialTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme ? savedTheme === 'dark' : prefersDark;

    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Always enforce clean LTR direction and remove any stale RTL flags
    document.documentElement.setAttribute('dir', 'ltr');
    try {
      localStorage.removeItem('atelier-rtl');
    } catch (e) {}
  }

  applyInitialTheme();

  document.addEventListener('DOMContentLoaded', () => {
    updateThemeUI();

    // Attach theme toggle listeners
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      btn.addEventListener('click', toggleTheme);
    });
  });

  function toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
    updateThemeUI();
  }

  function updateThemeUI() {
    const isDark = document.documentElement.classList.contains('dark');
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      btn.setAttribute('aria-label', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
      const sunIcon = btn.querySelector('.icon-sun');
      const moonIcon = btn.querySelector('.icon-moon');
      if (sunIcon && moonIcon) {
        if (isDark) {
          sunIcon.classList.remove('hidden');
          moonIcon.classList.add('hidden');
        } else {
          sunIcon.classList.add('hidden');
          moonIcon.classList.remove('hidden');
        }
      }
    });

    // Update logos if available
    document.querySelectorAll('.brand-logo-img').forEach(img => {
      if (img.dataset.darkSrc && img.dataset.lightSrc) {
        img.src = isDark ? img.dataset.darkSrc : img.dataset.lightSrc;
      }
    });
  }

  // Expose globally
  window.atelierTheme = {
    toggleTheme
  };
})();
