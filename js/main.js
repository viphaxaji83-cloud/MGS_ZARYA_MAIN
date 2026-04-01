/* ============================================
   ZARYA Main - Entry point, global utilities
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
  var mapCanvas = document.getElementById('demoLeafletMap');
  if (!demoMap || !mapCanvas || typeof L === 'undefined') return;

  var sidebarItems = Array.prototype.slice.call(document.querySelectorAll('.demo__sidebar-item[data-site-id]'));
  var statusValue = document.getElementById('demoStatusValue');
  var confidenceValue = document.getElementById('demoConfidenceValue');
  var updatedValue = document.getElementById('demoUpdatedValue');
  var totalValue = document.getElementById('demoTotalValue');
  var selectedValue = document.getElementById('demoSelectedValue');
  var summaryOkBar = document.querySelector('.demo__sidebar-summary .demo__panel-bar-fill--green');
  var summaryWarnBar = document.querySelector('.demo__sidebar-summary .demo__panel-bar-fill--yellow');
  var summaryAlertBar = document.querySelector('.demo__sidebar-summary .demo__panel-bar-fill--red');
  var activeSiteId = null;

  var statusClasses = [
    'demo__panel-status--ok',
    'demo__panel-status--warn',
    'demo__panel-status--alert'
  ];

  var markerClasses = [
    'demo__map-marker--ok',
    'demo__map-marker--warn',
    'demo__map-marker--alert'
  ];

  var sidebarDotClasses = [
    'demo__sidebar-dot--green',
    'demo__sidebar-dot--yellow',
    'demo__sidebar-dot--red'
  ];

  var demoRefreshMs = 10000;

  var sites = [
    {
      id: 'site-001',
      title: 'Площадка #001',
      zone: 'Центр',
      fillLevel: 41,
      trend: 1,
      camera: 'Камера A-12',
      coords: [44.6079, 40.1052]
    },
    {
      id: 'site-002',
      title: 'Площадка #002',
      zone: 'Восточный сектор',
      fillLevel: 47,
      trend: 1,
      camera: 'Камера B-07',
      coords: [44.6048, 40.1254]
    },
    {
      id: 'site-003',
      title: 'Площадка #003',
      zone: 'Юго-запад',
      fillLevel: 72,
      trend: -1,
      camera: 'Камера C-03',
      coords: [44.5942, 40.0918]
    },
    {
      id: 'site-004',
      title: 'Площадка #004',
      zone: 'Черемушки',
      fillLevel: 93,
      trend: -1,
      camera: 'Камера D-19',
      coords: [44.6167, 40.1294]
    },
    {
      id: 'site-005',
      title: 'Площадка #005',
      zone: 'Северный контур',
      fillLevel: 36,
      trend: 1,
      camera: 'Камера E-05',
      coords: [44.6269, 40.1097]
    },
    {
      id: 'site-006',
      title: 'Площадка #006',
      zone: 'Западный сектор',
      fillLevel: 52,
      trend: -1,
      camera: 'Камера F-02',
      coords: [44.6062, 40.0806]
    },
    {
      id: 'site-007',
      title: 'Площадка #007',
      zone: 'Северо-запад',
      fillLevel: 57,
      trend: 1,
      camera: 'Камера G-08',
      coords: [44.6208, 40.0942]
    },
    {
      id: 'site-008',
      title: 'Площадка #008',
      zone: 'Восточный контур',
      fillLevel: 58,
      trend: 1,
      camera: 'Камера H-14',
      coords: [44.6109, 40.1189]
    },
    {
      id: 'site-009',
      title: 'Площадка #009',
      zone: 'Южный центр',
      fillLevel: 76,
      trend: -1,
      camera: 'Камера J-03',
      coords: [44.5986, 40.1014]
    },
    {
      id: 'site-010',
      title: 'Площадка #010',
      zone: 'Юго-восток',
      fillLevel: 88,
      trend: -1,
      camera: 'Камера K-21',
      coords: [44.6009, 40.1218]
    }
  ];

  var siteMap = {};
  var markerMap = {};

  var map = L.map(mapCanvas, {
    zoomControl: false,
    attributionControl: true
  }).setView([44.6078, 40.1058], 12.7);

  L.control.zoom({
    position: 'bottomleft'
  }).addTo(map);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  map.attributionControl.setPrefix(false);

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function padTime(value) {
    return String(value).padStart(2, '0');
  }

  function formatTime(date) {
    return padTime(date.getHours()) + ':' + padTime(date.getMinutes());
  }

  function getStatusMeta(fillLevel) {
    if (fillLevel >= 85) {
      return {
        label: 'Критический',
        statusClass: 'alert',
        dotClass: 'demo__sidebar-dot--red'
      };
    }

    if (fillLevel >= 60) {
      return {
        label: 'Средний',
        statusClass: 'warn',
        dotClass: 'demo__sidebar-dot--yellow'
      };
    }

    return {
      label: 'Нормальный',
      statusClass: 'ok',
      dotClass: 'demo__sidebar-dot--green'
    };
  }

  function getPopupContent(site) {
    return (
      '<strong>' + site.title + '</strong>' +
      site.zone + ' // ' + site.status + ' // ' + site.confidence
    );
  }

  function syncSiteState(site, updatedAt) {
    var timestamp = updatedAt || site.updatedAt || new Date();
    var statusMeta = getStatusMeta(site.fillLevel);

    site.updatedAt = timestamp;
    site.status = statusMeta.label;
    site.statusClass = statusMeta.statusClass;
    site.dotClass = statusMeta.dotClass;
    site.confidence = String(site.fillLevel) + '%';
    site.updated = formatTime(timestamp);
  }

  function getMarkerElement(marker) {
    var markerNode = marker && marker.getElement();
    return markerNode ? markerNode.querySelector('.demo__map-marker') : null;
  }

  function createMarker(site) {
    var marker = L.marker(site.coords, {
      icon: L.divIcon({
        className: 'demo__map-marker-wrap',
        html: '<span class="demo__map-marker demo__map-marker--' + site.statusClass + '"></span>',
        iconSize: [16, 16],
        iconAnchor: [8, 8],
        popupAnchor: [0, -12]
      })
    });

    marker.bindPopup(
      getPopupContent(site),
      { className: 'demo__map-popup' }
    );

    marker.on('click', function () {
      selectSite(site.id, true);
    });

    marker.addTo(map);
    return marker;
  }

  function updateSidebarDot(site) {
    var sidebarItem = document.querySelector('.demo__sidebar-item[data-site-id="' + site.id + '"]');
    var sidebarDot = sidebarItem ? sidebarItem.querySelector('.demo__sidebar-dot') : null;

    if (!sidebarDot) return;

    sidebarDotClasses.forEach(function (className) {
      sidebarDot.classList.remove(className);
    });
    sidebarDot.classList.add(site.dotClass);
  }

  function updateMarkerState(site) {
    var marker = markerMap[site.id];
    var markerElement = getMarkerElement(marker);

    if (markerElement) {
      markerClasses.forEach(function (className) {
        markerElement.classList.remove(className);
      });
      markerElement.classList.add('demo__map-marker--' + site.statusClass);
    }

    if (marker) {
      marker.setPopupContent(getPopupContent(site));
    }
  }

  function refreshSiteVisuals(site) {
    updateSidebarDot(site);
    updateMarkerState(site);
  }

  function setActiveMarker(siteId) {
    Object.keys(markerMap).forEach(function (id) {
      var markerElement = getMarkerElement(markerMap[id]);
      if (markerElement) {
        markerElement.classList.toggle('is-active', id === siteId);
      }
    });
  }

  function updatePanel(site) {
    if (!site) return;

    var statusClass = 'demo__panel-status--' + site.statusClass;

    if (statusValue) {
      statusValue.textContent = site.status;
      statusClasses.forEach(function (className) {
        statusValue.classList.remove(className);
      });
      statusValue.classList.add(statusClass);
    }

    if (confidenceValue) {
      confidenceValue.textContent = site.confidence;
    }

    if (updatedValue) {
      updatedValue.textContent = site.updated;
    }

    if (selectedValue) {
      var markerIndex = site.title.indexOf('#');
      selectedValue.textContent = markerIndex !== -1 ? site.title.slice(markerIndex) : site.title;
    }
  }

  function selectSite(siteId, shouldPan) {
    var site = siteMap[siteId];
    var marker = markerMap[siteId];
    if (!site || !marker) return;

    activeSiteId = siteId;
    setActiveMarker(siteId);

    sidebarItems.forEach(function (item) {
      item.classList.toggle('demo__sidebar-item--active', item.getAttribute('data-site-id') === siteId);
    });

    updatePanel(site);
    marker.openPopup();

    if (shouldPan) {
      map.flyTo(site.coords, Math.max(map.getZoom(), 13), {
        duration: 0.45
      });
    }
  }

  function updateSiteMetrics(site, updatedAt) {
    syncSiteState(site, updatedAt);
    refreshSiteVisuals(site);
  }

  function evolveSite(site) {
    var step = randomInt(2, 8);
    var jitter = randomInt(-3, 3);
    var nextFill = site.fillLevel + (site.trend * step) + jitter;

    if (site.fillLevel >= 86 && Math.random() < 0.65) {
      site.trend = -1;
    } else if (site.fillLevel <= 35 && Math.random() < 0.55) {
      site.trend = 1;
    } else if (Math.random() < 0.22) {
      site.trend *= -1;
    }

    nextFill = clamp(nextFill, 18, 98);

    if (nextFill >= 96) {
      site.trend = -1;
    } else if (nextFill <= 24) {
      site.trend = 1;
    }

    site.fillLevel = nextFill;
    updateSiteMetrics(site, new Date());
  }

  function updateSummaryBars() {
    var total = sites.length || 1;
    var counts = {
      ok: 0,
      warn: 0,
      alert: 0
    };

    sites.forEach(function (site) {
      if (counts[site.statusClass] !== undefined) {
        counts[site.statusClass] += 1;
      }
    });

    if (summaryOkBar) {
      summaryOkBar.style.width = ((counts.ok / total) * 100).toFixed(1) + '%';
    }

    if (summaryWarnBar) {
      summaryWarnBar.style.width = ((counts.warn / total) * 100).toFixed(1) + '%';
    }

    if (summaryAlertBar) {
      summaryAlertBar.style.width = ((counts.alert / total) * 100).toFixed(1) + '%';
    }
  }

  sites.forEach(function (site, index) {
    updateSiteMetrics(site, new Date(Date.now() - index * 17000));
  });

  if (totalValue) {
    totalValue.textContent = String(sites.length);
  }

  updateSummaryBars();

  sites.forEach(function (site) {
    siteMap[site.id] = site;
    markerMap[site.id] = createMarker(site);
  });

  sidebarItems.forEach(function (item) {
    item.addEventListener('click', function () {
      selectSite(item.getAttribute('data-site-id'), true);
    });
  });

  window.setInterval(function () {
    sites.forEach(function (site) {
      evolveSite(site);
    });

    updateSummaryBars();

    if (activeSiteId) {
      updatePanel(siteMap[activeSiteId]);
    }
  }, demoRefreshMs);

  map.whenReady(function () {
    window.setTimeout(function () {
      map.invalidateSize();
      selectSite('site-001', false);
    }, 0);
  });

  window.addEventListener('resize', function () {
    map.invalidateSize();
  });
})();
