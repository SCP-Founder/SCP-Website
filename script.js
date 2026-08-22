(() => {
  const button = document.querySelector('#copy');
  const ip = document.querySelector('#ip');
  const copied = document.querySelector('#copied');
  if (button && ip) {
    button.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(ip.textContent.trim()); }
      catch (_) {
        const range = document.createRange(); range.selectNode(ip);
        const selection = window.getSelection(); selection.removeAllRanges(); selection.addRange(range);
        document.execCommand('copy'); selection.removeAllRanges();
      }
      button.textContent = 'ГОТОВО ✓';
      if (copied) { copied.style.display = 'block'; setTimeout(() => copied.style.display = 'none', 1800); }
      setTimeout(() => button.textContent = 'КОПИРОВАТЬ', 1800);
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) { event.preventDefault(); target.scrollIntoView({behavior:'smooth', block:'start'}); }
    });
  });

  const hero = document.querySelector('.hero');
  const art = document.querySelector('.hero-art');
  if (hero && art && window.matchMedia('(min-width: 851px)').matches) {
    hero.addEventListener('mousemove', e => {
      const r = hero.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      art.style.transform = `translate(${x * 8}px, ${y * 8}px)`;
    });
    hero.addEventListener('mouseleave', () => art.style.transform = '');
  }
})();
