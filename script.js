(() => {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', link.getAttribute('href'));
      }
    });
  });

  const hero = document.querySelector('.hero');
  const art = document.querySelector('.hero-art');
  if (hero && art && window.matchMedia('(min-width: 851px)').matches) {
    hero.addEventListener('mousemove', e => {
      const r = hero.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      art.style.transform = `translate(${x * 8}px, ${y * 8}px)`;
    });
    hero.addEventListener('mouseleave', () => art.style.transform = '');
  }
})();
