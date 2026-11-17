/**
 * ATELIER Interior Design Studio - Form Validations & Auth Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Password Visibility Toggle
  document.querySelectorAll('.toggle-password-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const input = document.getElementById(targetId);
      if (!input) return;

      const eyeIcon = btn.querySelector('.eye-open');
      const eyeOffIcon = btn.querySelector('.eye-closed');

      if (input.type === 'password') {
        input.type = 'text';
        if (eyeIcon) eyeIcon.classList.add('hidden');
        if (eyeOffIcon) eyeOffIcon.classList.remove('hidden');
      } else {
        input.type = 'password';
        if (eyeIcon) eyeIcon.classList.remove('hidden');
        if (eyeOffIcon) eyeOffIcon.classList.add('hidden');
      }
    });
  });

  // 2. Consultation Form Validation (Contact page & CTA forms)
  const consultationForm = document.getElementById('consultation-form');
  if (consultationForm) {
    consultationForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;
      const fullName = document.getElementById('full-name');
      const email = document.getElementById('email-address');
      const phone = document.getElementById('phone-number');
      const service = document.getElementById('service-required');
      const message = document.getElementById('project-description');

      // Clear previous error messages
      consultationForm.querySelectorAll('.form-error').forEach(el => el.remove());
      consultationForm.querySelectorAll('input, select, textarea').forEach(el => {
        el.classList.remove('border-rose-500', 'focus:border-rose-500');
      });

      function showError(field, msg) {
        isValid = false;
        field.classList.add('border-rose-500', 'focus:border-rose-500');
        const err = document.createElement('p');
        err.className = 'form-error text-xs text-rose-500 mt-1 font-medium';
        err.textContent = msg;
        field.parentNode.appendChild(err);
      }

      if (fullName && !fullName.value.trim()) {
        showError(fullName, 'Please enter your full name.');
      }

      if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim()) {
          showError(email, 'Email address is required.');
        } else if (!emailRegex.test(email.value.trim())) {
          showError(email, 'Please provide a valid email address.');
        }
      }

      if (phone && !phone.value.trim()) {
        showError(phone, 'Phone number is required for consultation scheduling.');
      }

      if (service && !service.value) {
        showError(service, 'Please select a design service.');
      }

      if (message && message.value.trim().length < 10) {
        showError(message, 'Please provide brief details of your spatial vision (at least 10 characters).');
      }

      if (!isValid) return;

      // Simulate submission
      const submitBtn = consultationForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg> Processing Inquiry...
      `;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        consultationForm.reset();

        if (window.showToast) {
          window.showToast('Thank you. Our studio director will review your project and contact you within 24 hours.', 'success');
        }

        // Open Confirmation Dialog
        const modal = document.getElementById('consultation-success-modal');
        if (modal) {
          modal.classList.remove('hidden');
          modal.classList.add('flex');
        }
      }, 900);
    });
  }

  // Close consultation success modal
  const closeModalBtn = document.getElementById('close-success-modal');
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
      const modal = document.getElementById('consultation-success-modal');
      if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      }
    });
  }

  // 3. Newsletter Subscription Forms
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (!input || !input.value.trim() || !input.value.includes('@')) {
        if (window.showToast) window.showToast('Please enter a valid email address for our journal.', 'error');
        return;
      }

      input.value = '';
      if (window.showToast) {
        window.showToast('Welcome to ATELIER Gazette. You have been added to our private mailing circle.', 'success');
      }
    });
  });

  // 4. Login Form Validation & Simulation
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email');
      const pass = document.getElementById('login-password');

      if (!email.value || !pass.value) {
        if (window.showToast) window.showToast('Please enter both your email and password.', 'error');
        return;
      }

      const submitBtn = loginForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Authenticating...';

      setTimeout(() => {
        if (window.showToast) {
          window.showToast('Authentication successful. Welcome to ATELIER.', 'success');
        }
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 800);
      }, 700);
    });
  }

  // 5. Registration Form Validation
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('register-name');
      const email = document.getElementById('register-email');
      const pass = document.getElementById('register-password');
      const passConfirm = document.getElementById('register-password-confirm');
      const terms = document.getElementById('register-terms');

      if (!name.value.trim() || !email.value.trim() || !pass.value) {
        if (window.showToast) window.showToast('Please complete all required fields.', 'error');
        return;
      }

      if (pass.value !== passConfirm.value) {
        if (window.showToast) window.showToast('Passwords do not match. Please re-check.', 'error');
        return;
      }

      if (terms && !terms.checked) {
        if (window.showToast) window.showToast('Please accept the studio Terms & Privacy policy.', 'error');
        return;
      }

      const submitBtn = registerForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Creating Account...';

      setTimeout(() => {
        if (window.showToast) {
          window.showToast('Account created successfully! Welcome to ATELIER.', 'success');
        }
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 800);
      }, 800);
    });
  }

  // 6. Blog Comment Form
  const commentForm = document.getElementById('blog-comment-form');
  if (commentForm) {
    commentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const author = document.getElementById('comment-name');
      const text = document.getElementById('comment-text');

      if (!author.value.trim() || !text.value.trim()) {
        if (window.showToast) window.showToast('Please fill out both your name and thought.', 'error');
        return;
      }

      const list = document.getElementById('comments-list');
      if (list) {
        const item = document.createElement('div');
        item.className = 'p-6 bg-ivory-light dark:bg-charcoal-800 rounded-sm border border-neutral-200 dark:border-neutral-800 space-y-2';
        item.innerHTML = `
          <div class="flex items-center justify-between">
            <h4 class="font-semibold text-charcoal-900 dark:text-neutral-100">${escapeHtml(author.value.trim())}</h4>
            <span class="text-xs text-olive tracking-widest uppercase">Just now</span>
          </div>
          <p class="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">${escapeHtml(text.value.trim())}</p>
        `;
        list.prepend(item);
      }

      commentForm.reset();
      if (window.showToast) {
        window.showToast('Thank you for sharing your perspective on our journal entry.', 'success');
      }
    });
  }

  function escapeHtml(str) {
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
});
