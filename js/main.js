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

(function () {
  var demoMap = document.getElementById('demoMap');
  if (!demoMap) return;

  var pins = Array.prototype.slice.call(demoMap.querySelectorAll('.demo__map-pin'));
  var sidebarItems = Array.prototype.slice.call(document.querySelectorAll('.demo__sidebar-item[data-site-id]'));
  var tooltip = document.getElementById('demoMapTooltip');
  var statusValue = document.getElementById('demoStatusValue');
  var confidenceValue = document.getElementById('demoConfidenceValue');
  var updatedValue = document.getElementById('demoUpdatedValue');
  var totalValue = document.getElementById('demoTotalValue');
  var selectedValue = document.getElementById('demoSelectedValue');
  var cameraTitle = document.getElementById('demoCameraTitle');
  var cameraLocation = document.getElementById('demoCameraLocation');

  var statusClasses = [
    'demo__panel-status--ok',
    'demo__panel-status--warn',
    'demo__panel-status--alert'
  ];

  function findPin(siteId) {
    var match = null;

    pins.forEach(function (pin) {
      if (pin.getAttribute('data-site-id') === siteId) {
        match = pin;
      }
    });

    return match;
  }

  function setTooltip(pin) {
    if (!tooltip || !pin) return;

    tooltip.textContent = pin.getAttribute('data-title') + ' // ' + pin.getAttribute('data-zone');
    tooltip.style.left = pin.offsetLeft + (pin.offsetWidth / 2) + 'px';
    tooltip.style.top = pin.offsetTop + 'px';
    tooltip.classList.add('is-visible');
    tooltip.setAttribute('aria-hidden', 'false');
  }

  function hideTooltip() {
    if (!tooltip) return;
    tooltip.classList.remove('is-visible');
    tooltip.setAttribute('aria-hidden', 'true');
  }

  function updatePanel(pin) {
    if (!pin) return;

    var statusClass = 'demo__panel-status--' + pin.getAttribute('data-status-class');

    if (statusValue) {
      statusValue.textContent = pin.getAttribute('data-status');
      statusClasses.forEach(function (className) {
        statusValue.classList.remove(className);
      });
      statusValue.classList.add(statusClass);
    }

    if (confidenceValue) {
      confidenceValue.textContent = pin.getAttribute('data-confidence');
    }

    if (updatedValue) {
      updatedValue.textContent = pin.getAttribute('data-updated');
    }

    if (selectedValue) {
      var title = pin.getAttribute('data-title');
      var markerIndex = title.indexOf('#');
      selectedValue.textContent = markerIndex !== -1 ? title.slice(markerIndex) : title;
    }

    if (cameraTitle) {
      cameraTitle.textContent = pin.getAttribute('data-camera');
    }

    if (cameraLocation) {
      cameraLocation.textContent = pin.getAttribute('data-zone') + ' // Майкоп';
    }
  }

  function selectSite(siteId) {
    var pin = findPin(siteId);
    if (!pin) return;

    pins.forEach(function (item) {
      item.classList.toggle('is-active', item === pin);
    });

    sidebarItems.forEach(function (item) {
      item.classList.toggle('demo__sidebar-item--active', item.getAttribute('data-site-id') === siteId);
    });

    updatePanel(pin);
    setTooltip(pin);
  }

  if (totalValue) {
    totalValue.textContent = String(pins.length);
  }

  pins.forEach(function (pin) {
    pin.addEventListener('click', function () {
      selectSite(pin.getAttribute('data-site-id'));
    });

    pin.addEventListener('mouseenter', function () {
      setTooltip(pin);
    });

    pin.addEventListener('focus', function () {
      setTooltip(pin);
    });

    pin.addEventListener('mouseleave', hideTooltip);
    pin.addEventListener('blur', hideTooltip);
  });

  sidebarItems.forEach(function (item) {
    item.addEventListener('click', function () {
      selectSite(item.getAttribute('data-site-id'));
    });
  });

  selectSite('site-001');
})();
