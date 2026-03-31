/* ============================================
   ZARYA Navigation — Header scroll, Mobile menu
   ============================================ */

(function () {
  const header = document.getElementById('header');
  const navToggle = document.getElementById('navToggle');
  const navList = document.getElementById('navList');
  const hasHeroSection = Boolean(document.querySelector('.hero'));
  const forceScrolledHeader = Boolean(
    header && header.classList.contains('header--scrolled') && !hasHeroSection
  );
  const scrollTopButton = document.createElement('button');

  scrollTopButton.type = 'button';
  scrollTopButton.className = 'scroll-top';
  scrollTopButton.setAttribute('aria-label', 'Вернуться наверх');
  scrollTopButton.innerHTML = '<span class="scroll-top__icon" aria-hidden="true">↑</span>';

  document.body.appendChild(scrollTopButton);

  // Header scroll effect
  function onScroll() {
    const scrollY = window.scrollY;

    if (header && (forceScrolledHeader || scrollY > 60)) {
      header.classList.add('header--scrolled');
    } else if (header) {
      header.classList.remove('header--scrolled');
    }

    if (scrollY > 360) {
      scrollTopButton.classList.add('scroll-top--visible');
    } else {
      scrollTopButton.classList.remove('scroll-top--visible');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  scrollTopButton.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });

  // Mobile menu toggle
  if (navToggle && navList) {
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('active');
      navList.classList.toggle('active');
      document.body.style.overflow = navList.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu on link click
    navList.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.classList.remove('active');
        navList.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close menu on outside click
    document.addEventListener('click', function (e) {
      if (
        navList.classList.contains('active') &&
        !navList.contains(e.target) &&
        !navToggle.contains(e.target)
      ) {
        navToggle.classList.remove('active');
        navList.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var headerHeight = header ? header.offsetHeight : 0;
        var targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });
      }
    });
  });
})();
