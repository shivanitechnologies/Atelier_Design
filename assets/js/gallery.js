/**
 * ATELIER Interior Design Studio - Portfolio Gallery & Lightbox
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Portfolio Category Filtering
  const filterBtns = document.querySelectorAll('.portfolio-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Active button styles
        filterBtns.forEach(b => {
          b.classList.remove('bg-olive', 'text-ivory', 'active');
          b.classList.add('bg-transparent', 'text-charcoal-700', 'dark:text-neutral-300');
        });
        btn.classList.add('bg-olive', 'text-ivory', 'active');
        btn.classList.remove('bg-transparent', 'text-charcoal-700', 'dark:text-neutral-300');

        const filter = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter || (filter === 'residential' && category.includes('residential'))) {
            card.style.display = '';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0) scale(1)';
            }, 30);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(15px) scale(0.98)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 250);
          }
        });
      });
    });
  }

  // 2. Lightbox Modal Functionality
  const lightboxTriggers = document.querySelectorAll('.lightbox-trigger');
  let lightbox = document.getElementById('atelier-lightbox');

  // Create lightbox if not in DOM
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.id = 'atelier-lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', 'Project Image Lightbox');
    lightbox.innerHTML = `
      <button id="lightbox-close" aria-label="Close Lightbox" class="absolute top-6 right-6 text-ivory hover:text-olive transition p-2 bg-charcoal-900/60 rounded-full z-50">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>
      
      <button id="lightbox-prev" aria-label="Previous Image" class="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-ivory hover:text-olive transition p-3 bg-charcoal-900/70 rounded-full z-50 focus:outline-none">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
      </button>

      <button id="lightbox-next" aria-label="Next Image" class="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-ivory hover:text-olive transition p-3 bg-charcoal-900/70 rounded-full z-50 focus:outline-none">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
      </button>

      <div class="max-w-5xl w-full max-h-[88vh] flex flex-col items-center justify-center p-2 relative">
        <img id="lightbox-img" src="" alt="Project Preview" class="max-h-[72vh] max-w-full object-contain shadow-2xl rounded-sm transition duration-300">
        <div class="mt-4 text-center">
          <h3 id="lightbox-title" class="font-serif text-xl md:text-2xl text-ivory tracking-wide"></h3>
          <p id="lightbox-meta" class="text-xs uppercase tracking-widest text-olive mt-1"></p>
          <p id="lightbox-desc" class="text-sm text-neutral-300 max-w-xl mx-auto mt-2 hidden md:block"></p>
        </div>
      </div>
    `;
    document.body.appendChild(lightbox);
  }

  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxMeta = document.getElementById('lightbox-meta');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');

  let currentGalleryItems = [];
  let currentIndex = 0;

  function updateLightboxContent(index) {
    if (index < 0) index = currentGalleryItems.length - 1;
    if (index >= currentGalleryItems.length) index = 0;
    currentIndex = index;

    const item = currentGalleryItems[currentIndex];
    const src = item.getAttribute('data-image') || item.querySelector('img')?.src;
    const title = item.getAttribute('data-title') || item.querySelector('h3, h4')?.textContent || 'ATELIER Project';
    const meta = item.getAttribute('data-meta') || item.getAttribute('data-category') || 'Interior Architecture';
    const desc = item.getAttribute('data-desc') || '';

    lightboxImg.src = src;
    lightboxImg.alt = title;
    lightboxTitle.textContent = title;
    lightboxMeta.textContent = meta;
    lightboxDesc.textContent = desc;
  }

  function openLightbox(triggerEl) {
    currentGalleryItems = Array.from(document.querySelectorAll('.lightbox-trigger')).filter(el => {
      // only include visible ones
      return el.offsetParent !== null;
    });

    if (currentGalleryItems.length === 0) currentGalleryItems = [triggerEl];
    currentIndex = currentGalleryItems.indexOf(triggerEl);
    if (currentIndex === -1) currentIndex = 0;

    updateLightboxContent(currentIndex);
    lightbox.classList.add('active');
    document.body.classList.add('overflow-hidden');
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.classList.remove('overflow-hidden');
  }

  lightboxTriggers.forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      openLightbox(el);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', () => updateLightboxContent(currentIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => updateLightboxContent(currentIndex + 1));

  // Close when clicking outside image
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') updateLightboxContent(currentIndex - 1);
    if (e.key === 'ArrowRight') updateLightboxContent(currentIndex + 1);
  });
});
