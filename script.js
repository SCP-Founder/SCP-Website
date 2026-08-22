(() => {
  const button = document.querySelector('#copy');
  const ip = document.querySelector('#ip');
  const copied = document.querySelector('#copied');
  if (button && ip) {
    button.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(ip.textContent.trim()); } catch (_) {}
      button.textContent = 'ГОТОВО ✓';
      if (copied) { copied.style.display = 'block'; setTimeout(() => copied.style.display = 'none', 1800); }
      setTimeout(() => button.textContent = 'КОПИРОВАТЬ', 1800);
    });
  }

  // Проверка Minecraft Java-сервера через публичный статус API.
  // Используем mcstatus.io, чтобы браузеру не требовалось прямое подключение к Minecraft-порту.
  const host = 'd2.atlantix.me:25035';
  const statusUrl = `https://api.mcstatus.io/v2/status/java/${encodeURIComponent(host)}`;
  const status = document.querySelector('#serverStatus');
  const title = document.querySelector('#statusTitle');
  const text = document.querySelector('#statusText');
  const players = document.querySelector('#players');
  const dot = document.querySelector('#statusDot');

  async function checkServer() {
    try {
      const response = await fetch(statusUrl, { cache: 'no-store' });
      if (!response.ok) throw new Error('API error');
      const data = await response.json();
      if (data.online) {
        const online = data.players?.online ?? 0;
        const max = data.players?.max ?? 0;
        if (status) status.textContent = 'СЕРВЕР ОНЛАЙН';
        if (title) title.textContent = 'СЕРВЕР ОНЛАЙН';
        if (text) text.textContent = `Сейчас на сервере ${online} из ${max} игроков`;
        if (players) players.textContent = online;
        if (dot) dot.className = 'status-dot online';
      } else {
        throw new Error('offline');
      }
    } catch (_) {
      if (status) status.textContent = 'СЕРВЕР НЕДОСТУПЕН';
      if (title) title.textContent = 'СТАТУС НЕ ОПРЕДЕЛЁН';
      if (text) text.textContent = 'Не удалось получить информацию о сервере';
      if (players) players.textContent = '—';
      if (dot) dot.className = 'status-dot offline';
    }
  }
  checkServer();
  setInterval(checkServer, 30000);

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
