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

  // Безопасная проверка существования элементов меню
  if (!panel || !overlay) return;

  panel.classList.toggle('show');
  overlay.classList.toggle('show');

  if (panel.classList.contains('show')) {
    if (icon) icon.classList.replace('ri-menu-4-line', 'ri-close-large-line');
    if (wrapper) wrapper.setAttribute('aria-label', 'Close');
  } else {
    if (icon) icon.classList.replace('ri-close-large-line', 'ri-menu-4-line');
    if (wrapper) wrapper.setAttribute('aria-label', 'Menu');
  }
}

  window.toggleMenu = toggleMenu;

  const menuOverlay = document.getElementById('menuOverlay');
  if (menuOverlay) {
    menuOverlay.addEventListener('click', () => {
      const panel = document.getElementById('menuPanel');
      if (panel && panel.classList.contains('show')) {
        toggleMenu();
      }
    });
  }

  document.addEventListener('click', (e) => {
    const panel = document.getElementById('menuPanel');
    const icon = document.querySelector('.menu-icon');

    if (panel && icon && !panel.contains(e.target) && !icon.contains(e.target) && panel.classList.contains('show')) {
      toggleMenu();
    }
  });

  document.addEventListener('keydown', (e) => {
    const panel = document.getElementById('menuPanel');
    if (e.key === 'Escape' && panel && panel.classList.contains('show')) {
      toggleMenu();
    }
  });

});