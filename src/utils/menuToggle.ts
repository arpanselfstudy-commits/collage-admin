export const sideMenuToggle = () => {
  if (window.innerWidth < 1199) {
    document.body.classList.toggle('menu-open');

    if (document.body.classList.contains('menu-open')) {
      const overlay = document.createElement('div');
      overlay.className = 'menu-overlay';
      document.body.appendChild(overlay);
    } else {
      const overlay = document.querySelector('.menu-overlay');
      if (overlay) {
        overlay.remove();
      }
    }
  }
};
