  // Google Analytics
  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }

  function loadGoogleAnalytics() {
    try {
      const gaScript = document.createElement('script');
      gaScript.setAttribute('async', '');
      gaScript.src = "https://www.googletagmanager.com/gtag/js?id=G-2TP6MJ447Y";
      document.head.appendChild(gaScript);

      gtag('js', new Date());
      gtag('config', 'G-2TP6MJ447Y');
    } catch (e) {
      console.error('Error loading Google Analytics:', e);
    }
  }

  // Menu Toggle
  function toggleMenu() {
    const panel = document.getElementById('menuPanel');
    const overlay = document.getElementById('menuOverlay');
    const icon = document.querySelector('.menu-icon i');

    panel.classList.toggle('show');
    overlay.classList.toggle('show');

    // Andere Icons
    if (panel.classList.contains('show')) {
      icon.classList.replace('fa-bars', 'fa-xmark');
    } else {
      icon.classList.replace('fa-xmark', 'fa-bars');
    }
  }

  // Close Menu
  document.addEventListener('click', function (e) {
    const panel = document.getElementById('menuPanel');
    const icon = document.querySelector('.menu-icon');

    if (!panel.contains(e.target) && !icon.contains(e.target) && panel.classList.contains('show')) {
      toggleMenu();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && document.getElementById('menuPanel').classList.contains('show')) {
      toggleMenu();
    }
  });
