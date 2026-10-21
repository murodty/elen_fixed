/* Small project-level fixes: no external services or API keys required. */
(function () {
  'use strict';

  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  ready(function () {
    var contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', function (event) {
        event.preventDefault();
        var status = document.getElementById('contact-form-status');
        var fields = Array.prototype.slice.call(contactForm.querySelectorAll('[required]'));
        var invalid = fields.find(function (field) {
          return !field.value.trim() || (field.type === 'email' && !field.validity.valid);
        });
        if (invalid) {
          status.textContent = invalid.type === 'email' && invalid.value.trim()
            ? 'Please enter a valid email address.'
            : 'Please complete all required fields.';
          invalid.focus();
          return;
        }
        status.textContent = 'Your message is validated, but this static website has no mail server connected. Connect a form service or backend to deliver messages.';
      });
    }

    document.querySelectorAll('form.search-form').forEach(function (form) {
      form.addEventListener('submit', function (event) {
        var input = form.querySelector('input[type="search"], input[name="s"], input[type="text"]');
        if (!input || !input.value.trim()) {
          event.preventDefault();
          if (input) input.focus();
        }
      });
    });

    document.querySelectorAll('a[href="#"]').forEach(function (link) {
      if (link.classList.contains('js-colorlib-nav-toggle')) return;
      if (link.closest('.social, .ftco-footer-social, .colorlib-footer-social')) {
        link.setAttribute('aria-label', link.getAttribute('aria-label') || 'Social link (not configured)');
      }
    });
  });
})();
