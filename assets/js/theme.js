/**
 * ATELIER Interior Design Studio - Theme & RTL Manager
 */

(function () {
  'use strict';

  const THEME_KEY = 'atelier-theme';
  const RTL_KEY = 'atelier-rtl';

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

    const savedRTL = localStorage.getItem(RTL_KEY);
    if (savedRTL === 'rtl') {
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
    }
  }

  applyInitialTheme();

  document.addEventListener('DOMContentLoaded', () => {
    updateThemeUI();
    updateRTLUI();

    // Attach listeners
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      btn.addEventListener('click', toggleTheme);
    });

    document.querySelectorAll('.rtl-toggle-btn').forEach(btn => {
      btn.addEventListener('click', toggleRTL);
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

  function toggleRTL() {
    const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
    const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
    document.documentElement.setAttribute('dir', newDir);
    localStorage.setItem(RTL_KEY, newDir);
    updateRTLUI();
  }

  function updateRTLUI() {
    const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
    document.querySelectorAll('.rtl-toggle-btn').forEach(btn => {
      btn.setAttribute('aria-label', isRTL ? 'Switch to LTR' : 'Switch to RTL');
      const textSpan = btn.querySelector('.rtl-text');
      if (textSpan) {
        textSpan.textContent = isRTL ? 'LTR' : 'RTL';
      }
    });
  }

  // Expose globally
  window.atelierTheme = {
    toggleTheme,
    toggleRTL
  };
})();
