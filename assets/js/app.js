/**
 * ATELIER Interior Design Studio - Core Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Header Scroll Effect
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }
    }, { passive: true });
  }

  // Home Dropdown Click & Touch Toggle
  const homeDropdownBtn = document.getElementById('home-dropdown-btn');
  const homeDropdownWrapper = document.getElementById('home-dropdown-wrapper');
  const homeDropdownMenu = document.querySelector('.home-dropdown-menu');

  if (homeDropdownBtn && homeDropdownMenu) {
    homeDropdownBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isOpen = homeDropdownMenu.classList.contains('dropdown-open');
      if (isOpen) {
        homeDropdownMenu.classList.remove('dropdown-open');
        if (homeDropdownWrapper) homeDropdownWrapper.classList.remove('is-open');
        homeDropdownBtn.setAttribute('aria-expanded', 'false');
      } else {
        homeDropdownMenu.classList.add('dropdown-open');
        if (homeDropdownWrapper) homeDropdownWrapper.classList.add('is-open');
        homeDropdownBtn.setAttribute('aria-expanded', 'true');
      }
    });

    document.addEventListener('click', (e) => {
      if (homeDropdownWrapper && !homeDropdownWrapper.contains(e.target)) {
        homeDropdownMenu.classList.remove('dropdown-open');
        homeDropdownWrapper.classList.remove('is-open');
        homeDropdownBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Mobile Navigation Drawer
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenuClose = document.getElementById('mobile-menu-close');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuBackdrop = document.getElementById('mobile-menu-backdrop');

  function openMobileMenu() {
    if (mobileMenu) {
      mobileMenu.classList.remove('translate-x-full', '-translate-x-full');
      mobileMenu.classList.remove('pointer-events-none', 'opacity-0');
      mobileMenu.classList.add('pointer-events-auto', 'opacity-100');
      document.body.classList.add('overflow-hidden');
      if (mobileMenuBackdrop) {
        mobileMenuBackdrop.classList.remove('opacity-0', 'pointer-events-none');
        mobileMenuBackdrop.classList.add('opacity-100', 'pointer-events-auto');
      }
    }
  }

  function closeMobileMenu() {
    if (mobileMenu) {
      const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
      mobileMenu.classList.add(isRTL ? '-translate-x-full' : 'translate-x-full');
      mobileMenu.classList.remove('pointer-events-auto', 'opacity-100');
      mobileMenu.classList.add('pointer-events-none', 'opacity-0');
      document.body.classList.remove('overflow-hidden');
      if (mobileMenuBackdrop) {
        mobileMenuBackdrop.classList.remove('opacity-100', 'pointer-events-auto');
        mobileMenuBackdrop.classList.add('opacity-0', 'pointer-events-none');
      }
    }
  }

  if (mobileMenuToggle) mobileMenuToggle.addEventListener('click', openMobileMenu);
  if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMobileMenu);
  if (mobileMenuBackdrop) mobileMenuBackdrop.addEventListener('click', closeMobileMenu);

  document.querySelectorAll('#mobile-menu nav a, #mobile-menu .pt-6 a').forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobileMenu();
  });

  // Highlight Current Navigation Link
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav > a, #mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('text-olive', 'dark:text-gold', 'font-semibold');
    }
  });

  // Reveal On Scroll (Intersection Observer)
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.12
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback if IntersectionObserver not supported
    revealElements.forEach(el => el.classList.add('is-visible'));
  }

  // Back to Top Button
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 450) {
        backToTopBtn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
        backToTopBtn.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');
      } else {
        backToTopBtn.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
        backToTopBtn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Global Toast Function
  window.showToast = function (message, type = 'success') {
    let container = document.getElementById('atelier-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'atelier-toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `atelier-toast ${type}`;
    
    // Icon
    const iconSvg = type === 'success' 
      ? `<svg class="w-5 h-5 text-olive shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`
      : `<svg class="w-5 h-5 text-rose-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`;

    toast.innerHTML = `
      ${iconSvg}
      <span class="text-sm font-medium tracking-wide">${message}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 20);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 350);
    }, 4000);
  };
});
