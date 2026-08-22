(() => {
  const button=document.querySelector('#copy'),ip=document.querySelector('#ip'),copied=document.querySelector('#copied');
  if(button&&ip){button.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(ip.textContent.trim())}catch(_){const r=document.createRange();r.selectNode(ip);const s=window.getSelection();s.removeAllRanges();s.addRange(r);document.execCommand('copy');s.removeAllRanges()}button.textContent='ГОТОВО ✓';if(copied){copied.style.display='block';setTimeout(()=>copied.style.display='none',1800)}setTimeout(()=>button.textContent='КОПИРОВАТЬ',1800)})}
  document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',e=>{const t=document.querySelector(link.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth',block:'start'})}}));
  const status=document.querySelector('#serverStatus'),dot=document.querySelector('#statusDot'),title=document.querySelector('#statusTitle'),text=document.querySelector('#statusText'),players=document.querySelector('#players');
  async function checkServer(){
    try{
      const response=await fetch('https://api.mcstatus.io/v2/status/java/d2.atlantix.me:25035',{cache:'no-store'});
      if(!response.ok)throw new Error('status');
      const data=await response.json();
      if(data.online){
        const online=data.players?.online??0,max=data.players?.max??0;
        if(status)status.textContent='СЕРВЕР ОНЛАЙН';
        if(title)title.textContent='СЕРВЕР ОНЛАЙН';
        if(text)text.textContent=`Сервер доступен • ${online} / ${max} игроков`;
        if(players)players.textContent=online;
        if(dot)dot.className='status-dot online';
      }else throw new Error('offline');
    }catch(e){
      if(status)status.textContent='СЕРВЕР ОФЛАЙН';
      if(title)title.textContent='СЕРВЕР НЕДОСТУПЕН';
      if(text)text.textContent='Не удалось получить ответ от сервера';
      if(players)players.textContent='0';
      if(dot)dot.className='status-dot offline';
    }
  }
  checkServer();setInterval(checkServer,30000);
  const hero=document.querySelector('.hero'),art=document.querySelector('.hero-art');
  if(hero&&art&&window.matchMedia('(min-width:851px)').matches){hero.addEventListener('mousemove',e=>{const r=hero.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;art.style.transform=`translate(${x*8}px,${y*8}px)`});hero.addEventListener('mouseleave',()=>art.style.transform='')}
})();
