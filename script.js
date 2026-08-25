(() => {
  const button = document.querySelector('#copy');
  const ip = document.querySelector('#ip');
  const copied = document.querySelector('#copied');

  if (button && ip) {
    button.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(ip.textContent.trim()); } catch (_) {}
      button.textContent = 'ГОТОВО ✓';
      if (copied) {
        copied.style.display = 'block';
        setTimeout(() => copied.style.display = 'none', 1800);
      }
      setTimeout(() => button.textContent = 'КОПИРОВАТЬ', 1800);
    });
  }

  const host = 'd2.atlantix.me:25035';
  const statusUrl = `https://api.mcstatus.io/v2/status/java/${encodeURIComponent(host)}?query=false&timeout=10`;
  const status = document.querySelector('#serverStatus');
  const title = document.querySelector('#statusTitle');
  const text = document.querySelector('#statusText');
  const players = document.querySelector('#players');
  const dot = document.querySelector('#statusDot');

  function setState(state, message = '', count = '—', mode = '') {
    if (status) status.textContent = state;
    if (title) title.textContent = state;
    if (text) text.textContent = message;
    if (players) players.textContent = count;
    if (dot) dot.className = `status-dot ${mode}`;
  }

  async function checkServer() {
    try {
      const response = await fetch(statusUrl, { method: 'GET', cache: 'no-store' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();

      if (!data.online) {
        setState('СЕРВЕР ОФФЛАЙН', '', '—', 'offline');
        return;
      }

      const online = Number(data.players?.online ?? 0);
      const max = Number(data.players?.max ?? 0);
      setState('СЕРВЕР ОНЛАЙН', `Игроков онлайн: ${online} / ${max}`, online, 'online');
    } catch (error) {
      console.warn('SCP Founder server status error:', error);
      // Не показываем пользователю технические ошибки внешнего API.
      setState('СЕРВЕР', '', '—', '');
    }
  }

  checkServer();
  setInterval(checkServer, 30000);

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
