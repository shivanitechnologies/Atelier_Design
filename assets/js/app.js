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

  // Mobile Navigation Drawer (Strictly for mobile view < 1024px)
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenuClose = document.getElementById('mobile-menu-close');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuBackdrop = document.getElementById('mobile-menu-backdrop');

  function openMobileMenu() {
    // Strictly prevent opening on desktop view
    if (window.innerWidth >= 1024) return;

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
      mobileMenu.classList.add('translate-x-full');
      mobileMenu.classList.remove('pointer-events-auto', 'opacity-100');
      mobileMenu.classList.add('pointer-events-none', 'opacity-0');
      document.body.classList.remove('overflow-hidden');
      if (mobileMenuBackdrop) {
        mobileMenuBackdrop.classList.remove('opacity-100', 'pointer-events-auto');
        mobileMenuBackdrop.classList.add('opacity-0', 'pointer-events-none');
      }
    }
  }

  // Auto-close on resize to desktop view
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) {
      closeMobileMenu();
    }
  });

  if (mobileMenuToggle) mobileMenuToggle.addEventListener('click', openMobileMenu);
  if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMobileMenu);
  if (mobileMenuBackdrop) mobileMenuBackdrop.addEventListener('click', closeMobileMenu);

  document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobileMenu();
  });

  // Mobile Home Accordion Dropdown
  const mobileHomeBtn = document.getElementById('mobile-home-dropdown-btn');
  const mobileHomeSublist = document.getElementById('mobile-home-sublist');
  const mobileHomeChevron = document.getElementById('mobile-home-chevron');
  if (mobileHomeBtn && mobileHomeSublist) {
    mobileHomeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isHidden = mobileHomeSublist.classList.contains('hidden');
      if (isHidden) {
        mobileHomeSublist.classList.remove('hidden');
        if (mobileHomeChevron) mobileHomeChevron.classList.add('rotate-180');
        mobileHomeBtn.setAttribute('aria-expanded', 'true');
      } else {
        mobileHomeSublist.classList.add('hidden');
        if (mobileHomeChevron) mobileHomeChevron.classList.remove('rotate-180');
        mobileHomeBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

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

  // Interactive Architectural Transformation Slider (Before & After)
  const transformationSlider = document.getElementById('before-after-slider');
  const beforeLayer = document.getElementById('slider-before-layer');
  const handleLine = document.getElementById('slider-handle-line');

  if (transformationSlider && beforeLayer && handleLine) {
    let isDragging = false;
    let currentPercent = 50;

    function updateSlider(percent) {
      percent = Math.max(1, Math.min(99, percent));
      currentPercent = percent;
      transformationSlider.setAttribute('aria-valuenow', Math.round(percent));

      beforeLayer.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
      handleLine.style.left = `${percent}%`;
    }

    function getPercentFromEvent(e) {
      const rect = transformationSlider.getBoundingClientRect();
      const clientX = e.clientX ?? (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
      const offsetX = clientX - rect.left;
      return (offsetX / rect.width) * 100;
    }

    transformationSlider.addEventListener('pointerdown', (e) => {
      isDragging = true;
      transformationSlider.setPointerCapture(e.pointerId);
      updateSlider(getPercentFromEvent(e));
    });

    transformationSlider.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      updateSlider(getPercentFromEvent(e));
    });

    const stopDrag = (e) => {
      if (isDragging) {
        isDragging = false;
        try {
          transformationSlider.releasePointerCapture(e.pointerId);
        } catch (err) {}
      }
    };

    transformationSlider.addEventListener('pointerup', stopDrag);
    transformationSlider.addEventListener('pointercancel', stopDrag);

    // Keyboard navigation
    transformationSlider.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        updateSlider(currentPercent - 3);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        updateSlider(currentPercent + 3);
      } else if (e.key === 'Home') {
        e.preventDefault();
        updateSlider(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        updateSlider(100);
      }
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

  // Footer Studio Appreciation / Like Button
  document.querySelectorAll('.studio-like-btn').forEach(btn => {
    if (localStorage.getItem('atelier-studio-liked') === 'true') {
      btn.classList.add('liked');
    }
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const isLiked = btn.classList.toggle('liked');
      localStorage.setItem('atelier-studio-liked', isLiked ? 'true' : 'false');
      if (isLiked && window.atelierToast) {
        window.atelierToast.show('Thank you for appreciating ATELIER Studio!', 'success', 2500);
      }
    });
  });

  // ==========================================================================
  // Bespoke Luxury Custom Select Component
  // Transforms native browser selects into editorial champagne gold dropdowns
  // ==========================================================================
  function initLuxurySelects() {
    const selects = document.querySelectorAll('select.luxury-select, #consultation-form select, .form-select');
    
    selects.forEach(select => {
      if (select.dataset.luxuryInit === 'true') return;
      select.dataset.luxuryInit = 'true';

      const wrapper = document.createElement('div');
      wrapper.className = 'luxury-select-wrapper relative w-full';

      select.parentNode.insertBefore(wrapper, select);
      wrapper.appendChild(select);

      select.classList.add('sr-only');
      select.tabIndex = -1;
      select.setAttribute('aria-hidden', 'true');
      select.style.position = 'absolute';
      select.style.width = '1px';
      select.style.height = '1px';
      select.style.padding = '0';
      select.style.margin = '-1px';
      select.style.overflow = 'hidden';
      select.style.clip = 'rect(0, 0, 0, 0)';
      select.style.border = '0';

      const selectedOption = select.options[select.selectedIndex] || select.options[0];
      const initialText = selectedOption ? selectedOption.text : 'Select...';

      const trigger = document.createElement('button');
      trigger.type = 'button';
      trigger.className = 'luxury-select-trigger';
      trigger.setAttribute('aria-haspopup', 'listbox');
      trigger.setAttribute('aria-expanded', 'false');
      trigger.innerHTML = `
        <span class="luxury-select-label truncate">${escapeHtml(initialText)}</span>
        <span class="luxury-select-chevron flex-shrink-0 ml-2">
          <svg class="w-4 h-4 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </span>
      `;
      wrapper.appendChild(trigger);

      const dropdown = document.createElement('div');
      dropdown.className = 'luxury-select-dropdown';
      dropdown.setAttribute('role', 'listbox');

      const list = document.createElement('div');
      list.className = 'luxury-select-list';

      Array.from(select.options).forEach((opt, idx) => {
        const optEl = document.createElement('div');
        const isSelected = idx === select.selectedIndex;
        optEl.className = 'luxury-select-option' + (isSelected ? ' is-selected' : '');
        optEl.setAttribute('role', 'option');
        optEl.setAttribute('data-value', opt.value);
        optEl.setAttribute('aria-selected', isSelected ? 'true' : 'false');
        
        optEl.innerHTML = `
          <span class="option-label truncate">${escapeHtml(opt.text)}</span>
          <span class="option-check flex-shrink-0">
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </span>
        `;

        optEl.addEventListener('click', (e) => {
          e.stopPropagation();
          select.value = opt.value;
          select.dispatchEvent(new Event('change', { bubbles: true }));
          
          trigger.querySelector('.luxury-select-label').textContent = opt.text;
          trigger.classList.remove('border-rose-500');
          
          list.querySelectorAll('.luxury-select-option').forEach(el => {
            el.classList.remove('is-selected');
            el.setAttribute('aria-selected', 'false');
          });
          optEl.classList.add('is-selected');
          optEl.setAttribute('aria-selected', 'true');

          closeDropdown();
          trigger.focus();
        });

        list.appendChild(optEl);
      });

      dropdown.appendChild(list);
      wrapper.appendChild(dropdown);

      function openDropdown() {
        document.querySelectorAll('.luxury-select-wrapper.is-open').forEach(w => {
          if (w !== wrapper) {
            w.classList.remove('is-open');
            const trig = w.querySelector('.luxury-select-trigger');
            if (trig) trig.setAttribute('aria-expanded', 'false');
          }
        });
        wrapper.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
      }

      function closeDropdown() {
        wrapper.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
      }

      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        if (wrapper.classList.contains('is-open')) {
          closeDropdown();
        } else {
          openDropdown();
        }
      });

      trigger.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          openDropdown();
        } else if (e.key === 'Escape') {
          closeDropdown();
        }
      });

      document.addEventListener('click', (e) => {
        if (!wrapper.contains(e.target)) {
          closeDropdown();
        }
      });

      select.addEventListener('change', () => {
        const curOpt = select.options[select.selectedIndex];
        if (curOpt) {
          trigger.querySelector('.luxury-select-label').textContent = curOpt.text;
          list.querySelectorAll('.luxury-select-option').forEach(el => {
            const match = el.getAttribute('data-value') === curOpt.value;
            el.classList.toggle('is-selected', match);
            el.setAttribute('aria-selected', match ? 'true' : 'false');
          });
        }
      });
    });

    document.querySelectorAll('form').forEach(form => {
      form.addEventListener('reset', () => {
        setTimeout(() => {
          form.querySelectorAll('.luxury-select-wrapper').forEach(wrapper => {
            const select = wrapper.querySelector('select');
            const trigger = wrapper.querySelector('.luxury-select-trigger');
            if (select && trigger) {
              const opt = select.options[select.selectedIndex] || select.options[0];
              if (opt) {
                trigger.querySelector('.luxury-select-label').textContent = opt.text;
                wrapper.querySelectorAll('.luxury-select-option').forEach(el => {
                  const match = el.getAttribute('data-value') === opt.value;
                  el.classList.toggle('is-selected', match);
                  el.setAttribute('aria-selected', match ? 'true' : 'false');
                });
              }
            }
          });
        }, 50);
      });
    });
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g,
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }

  window.initLuxurySelects = initLuxurySelects;
  initLuxurySelects();
});
