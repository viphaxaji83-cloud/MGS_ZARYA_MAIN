/* ============================================
   ZARYA Main — Entry point, global utilities
   ============================================ */

(function () {
  // Current year in footer
  var yearEl = document.querySelector('.footer__copy');
  if (yearEl) {
    var currentYear = new Date().getFullYear();
    yearEl.innerHTML = yearEl.innerHTML.replace('2025', currentYear);
  }
})();
