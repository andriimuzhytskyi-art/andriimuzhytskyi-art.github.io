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

// Menu 
  
document.addEventListener('DOMContentLoaded', () => {

function toggleMenu() {
  const panel = document.getElementById('menuPanel');
  const overlay = document.getElementById('menuOverlay');
  const icon = document.querySelector('.menu-icon i');
  const wrapper = document.querySelector('.menu-icon');

  panel.classList.toggle('show');
  overlay.classList.toggle('show');

  if (panel.classList.contains('show')) {
    icon.classList.replace('ri-menu-4-line', 'ri-close-large-line');
    wrapper.setAttribute('aria-label', 'Close');
  } else {
    icon.classList.replace('ri-close-large-line', 'ri-menu-4-line');
    wrapper.setAttribute('aria-label', 'Menu');
  }
}

  window.toggleMenu = toggleMenu;

  document.getElementById('menuOverlay').addEventListener('click', () => {
    if (document.getElementById('menuPanel').classList.contains('show')) {
      toggleMenu();
    }
  });

  document.addEventListener('click', (e) => {
    const panel = document.getElementById('menuPanel');
    const icon = document.querySelector('.menu-icon');

    if (!panel.contains(e.target) && !icon.contains(e.target) && panel.classList.contains('show')) {
      toggleMenu();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.getElementById('menuPanel').classList.contains('show')) {
      toggleMenu();
    }
  });

});
