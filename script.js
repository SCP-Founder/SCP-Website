(() => {
  const clock = document.querySelector('#clock');
  const updateClock = () => {
    if (!clock) return;
    clock.textContent = new Date().toISOString().slice(11, 19);
  };
  updateClock();
  setInterval(updateClock, 1000);

  const terminal = document.querySelector('.hero-terminal');
  if (terminal) {
    terminal.addEventListener('mousemove', (event) => {
      const r = terminal.getBoundingClientRect();
      const x = ((event.clientX - r.left) / r.width - .5) * 4;
      const y = ((event.clientY - r.top) / r.height - .5) * -4;
      terminal.style.transform = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg)`;
    });
    terminal.addEventListener('mouseleave', () => {
      terminal.style.transform = '';
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
