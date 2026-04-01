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
  var cameraTitle = document.getElementById('demoCameraTitle');
  var cameraLocation = document.getElementById('demoCameraLocation');
  var summaryOkBar = document.querySelector('.demo__sidebar-summary .demo__panel-bar-fill--green');
  var summaryWarnBar = document.querySelector('.demo__sidebar-summary .demo__panel-bar-fill--yellow');
  var summaryAlertBar = document.querySelector('.demo__sidebar-summary .demo__panel-bar-fill--red');

  var statusClasses = [
    'demo__panel-status--ok',
    'demo__panel-status--warn',
    'demo__panel-status--alert'
  ];

  var sites = [
    {
      id: 'site-001',
      title: 'Площадка #001',
      zone: 'Центр',
      status: 'Норма',
      statusClass: 'ok',
      confidence: '98%',
      updated: '12:14',
      camera: 'Камера A-12',
      coords: [44.6079, 40.1052]
    },
    {
      id: 'site-002',
      title: 'Площадка #002',
      zone: 'Восточный сектор',
      status: 'Норма',
      statusClass: 'ok',
      confidence: '96%',
      updated: '12:09',
      camera: 'Камера B-07',
      coords: [44.6048, 40.1254]
    },
    {
      id: 'site-003',
      title: 'Площадка #003',
      zone: 'Юго-запад',
      status: 'Проверка',
      statusClass: 'warn',
      confidence: '82%',
      updated: '11:58',
      camera: 'Камера C-03',
      coords: [44.5942, 40.0918]
    },
    {
      id: 'site-004',
      title: 'Площадка #004',
      zone: 'Черемушки',
      status: 'Сигнал',
      statusClass: 'alert',
      confidence: '91%',
      updated: '12:11',
      camera: 'Камера D-19',
      coords: [44.6167, 40.1294]
    },
    {
      id: 'site-005',
      title: 'Площадка #005',
      zone: 'Северный контур',
      status: 'Норма',
      statusClass: 'ok',
      confidence: '94%',
      updated: '12:06',
      camera: 'Камера E-05',
      coords: [44.6269, 40.1097]
    },
    {
      id: 'site-006',
      title: 'Площадка #006',
      zone: 'Западный сектор',
      status: 'Норма',
      statusClass: 'ok',
      confidence: '97%',
      updated: '12:02',
      camera: 'Камера F-02',
      coords: [44.6062, 40.0806]
    },
    {
      id: 'site-007',
      title: 'Площадка #007',
      zone: 'Северо-запад',
      status: 'Норма',
      statusClass: 'ok',
      confidence: '95%',
      updated: '12:12',
      camera: 'Камера G-08',
      coords: [44.6208, 40.0942]
    },
    {
      id: 'site-008',
      title: 'Площадка #008',
      zone: 'Восточный контур',
      status: 'Норма',
      statusClass: 'ok',
      confidence: '93%',
      updated: '12:04',
      camera: 'Камера H-14',
      coords: [44.6109, 40.1189]
    },
    {
      id: 'site-009',
      title: 'Площадка #009',
      zone: 'Южный центр',
      status: 'Проверка',
      statusClass: 'warn',
      confidence: '79%',
      updated: '11:55',
      camera: 'Камера J-03',
      coords: [44.5986, 40.1014]
    },
    {
      id: 'site-010',
      title: 'Площадка #010',
      zone: 'Юго-восток',
      status: 'Сигнал',
      statusClass: 'alert',
      confidence: '88%',
      updated: '12:08',
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
      '<strong>' + site.title + '</strong>' + site.zone + ' // ' + site.status,
      { className: 'demo__map-popup' }
    );

    marker.on('click', function () {
      selectSite(site.id, true);
    });

    marker.addTo(map);
    return marker;
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

    if (cameraTitle) {
      cameraTitle.textContent = site.camera;
    }

    if (cameraLocation) {
      cameraLocation.textContent = site.zone + ' // Майкоп';
    }
  }

  function selectSite(siteId, shouldPan) {
    var site = siteMap[siteId];
    var marker = markerMap[siteId];
    if (!site || !marker) return;

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
