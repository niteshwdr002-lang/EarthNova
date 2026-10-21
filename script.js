const pages = [...document.querySelectorAll('.page')];
const navItems = [...document.querySelectorAll('.nav-item')];
function showPage(id){
  const target = document.getElementById(id);
  if(!target) return;
  pages.forEach(p=>p.classList.toggle('active',p.id===id));
  navItems.forEach(b=>{const active=b.dataset.page===id;b.classList.toggle('active',active);b.setAttribute('aria-current',active?'page':'false')});
  document.getElementById('headerLinks').classList.remove('open');
  window.scrollTo({top:0,behavior:'smooth'});
  document.title = (id==='home'?'EarthNova':target.querySelector('h1')?.innerText.replace(/\s+/g,' ')||'EarthNova')+' | EarthNova';
  setTimeout(initReveal,80);
}
navItems.forEach(b=>b.addEventListener('click',()=>showPage(b.dataset.page)));
document.getElementById('menuToggle').addEventListener('click',()=>document.getElementById('headerLinks').classList.toggle('open'));
document.getElementById('year').textContent=new Date().getFullYear();
window.addEventListener('scroll',()=>{
 const max=document.documentElement.scrollHeight-window.innerHeight;
 document.getElementById('scrollLine').style.width=(max>0?window.scrollY/max*100:0)+'%';
},{passive:true});
let revealObserver;
function initReveal(){
 if(revealObserver) revealObserver.disconnect();
 revealObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');revealObserver.unobserve(e.target)}}),{threshold:.08});
 document.querySelectorAll('.page.active .reveal:not(.visible)').forEach(el=>revealObserver.observe(el));
}
initReveal();
// Lightweight pointer tilt on larger screens
if(window.matchMedia('(pointer:fine)').matches){
 document.querySelectorAll('.card').forEach(card=>{
  card.addEventListener('mousemove',e=>{
   const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
   card.style.transform=`translateY(-6px) perspective(900px) rotateX(${-y*2.4}deg) rotateY(${x*2.4}deg)`;
  });
  card.addEventListener('mouseleave',()=>card.style.transform='');
 });
}
