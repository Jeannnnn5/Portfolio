/* ===================== Particles (cute sparkles) ===================== */
const canvas = document.getElementById('particles');
if(canvas){
  const ctx = canvas.getContext('2d');
  let w = canvas.width = innerWidth, h = canvas.height = innerHeight;
  window.addEventListener('resize', ()=>{ w = canvas.width = innerWidth; h = canvas.height = innerHeight; });

  function rand(min,max){ return Math.random()*(max-min)+min; }
  let particles = [];
  function createParticles(n=140){
    particles = [];
    for(let i=0;i<n;i++){
      particles.push({ x: rand(0,w), y: rand(0,h), r: rand(0.6,2.6), vx: rand(-0.2,0.2), vy: rand(0.05,0.6), opacity: rand(0.2,0.95) });
    }
  }
  createParticles();

  function drawParticles(){
    ctx.clearRect(0,0,w,h);
    for(let p of particles){
      p.x += p.vx; p.y += p.vy;
      if(p.y > h) { p.y = -10; p.x = rand(0,w); }
      ctx.beginPath();
      ctx.fillStyle = `rgba(255,255,255,${p.opacity})`;
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fill();
    }
    requestAnimationFrame(drawParticles);
  }
  drawParticles();
}

/* ================= Magic cursor trail ================= */
window.addEventListener('mousemove', e => {
  const el = document.createElement('div');
  el.className = 'spark';
  el.style.left = e.clientX + 'px';
  el.style.top = e.clientY + 'px';
  document.body.appendChild(el);
  setTimeout(()=>{ el.style.opacity = 0; el.style.transform = 'translateY(-20px) scale(0.6)'; }, 50);
  setTimeout(()=> el.remove(), 800);
});

/* ================= Hero Glitch Typing ================= */
const heroTitleEl = document.querySelector('.hero-title span');
if(heroTitleEl){
  const heroName = "Jean Grace Samalburo";
  let hIdx = 0;
  function glitchHero(){
    let displayName = "";
    for(let i=0;i<heroName.length;i++){
      if(Math.random()<0.05) displayName += String.fromCharCode(33+Math.floor(Math.random()*94));
      else if(i<hIdx) displayName += heroName[i];
    }
    heroTitleEl.textContent = displayName;
    hIdx++; if(hIdx>heroName.length) hIdx=0;
    setTimeout(glitchHero, 120);
  }
  glitchHero();
}

/* ================= Hero Lead Typing ================= */
const heroLeadEl = document.getElementById('hero-lead');
if(heroLeadEl){
  const heroLead = "A Computer Science student building interactive web experiences.";
  let leadIdx = 0;
  function typeHeroLead() {
    if(leadIdx < heroLead.length){
      heroLeadEl.textContent += heroLead.charAt(leadIdx);
      leadIdx++;
      setTimeout(typeHeroLead, 35);
    }
  }
  window.addEventListener('load', typeHeroLead);
}

/* ================= About Me Typewriter ================= */
const aboutTextEl = document.getElementById('about-text');
const aboutSection = document.getElementById('about');
if(aboutTextEl && aboutSection){
  const aboutText = "Hi! I'm Jean Grace, a Computer Science student passionate about creating interactive web experiences, exploring new tech, and bringing ideas to life in colorful, dynamic ways!";
  let aIdx = 0;
  const observer = new IntersectionObserver(entries => {
    if(entries[0].isIntersecting){
      function typeAbout(){
        aboutTextEl.textContent = aboutText.substring(0,aIdx);
        aIdx++;
        if(aIdx<=aboutText.length) setTimeout(typeAbout,35);
      }
      typeAbout();
      observer.disconnect();
    }
  }, { threshold: 0.5 });
  observer.observe(aboutSection);
}

/* ================= Skills Hover ================= */
document.querySelectorAll('.chips span').forEach(span=>{
  span.addEventListener('mouseenter', ()=>span.style.transform="translateY(-6px) scale(1.08)");
  span.addEventListener('mouseleave', ()=>span.style.transform="translateY(0) scale(1)");
});

/* ================= Contact Copy Email ================= */
const copyBtn = document.getElementById('copy-btn');
const emailEl = document.getElementById('email');
if(copyBtn && emailEl){
  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(emailEl.textContent).then(() => {
      copyBtn.textContent = "Copied! ✅";
      for(let i=0;i<12;i++){
        const spark = document.createElement('div');
        spark.className='contact-spark';
        document.body.appendChild(spark);
        const rect = copyBtn.getBoundingClientRect();
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random()*60+20;
        spark.style.left = rect.left + rect.width/2 + 'px';
        spark.style.top = rect.top + rect.height/2 + 'px';
        spark.style.setProperty('--x', Math.cos(angle)*distance + 'px');
        spark.style.setProperty('--y', Math.sin(angle)*distance + 'px');
        setTimeout(()=> spark.remove(),800);
      }
      setTimeout(()=>{ copyBtn.textContent = "Copy Email 📋"; },1500);
    });
  });
}

/* ================= Assistant Bot ================= */
const assistantBtn = document.getElementById('assistant');
const assistantPanel = document.getElementById('assistant-panel');
const assistantBody = document.getElementById('assistant-body');
const assistantForm = document.getElementById('assistant-form');
const assistantInput = document.getElementById('assistant-input');
const assistantClose = document.getElementById('assistant-close');

if(assistantBtn && assistantPanel && assistantBody){
  function openAssistant(){ 
    assistantPanel.style.display='flex';
    assistantPanel.setAttribute('aria-hidden','false');
    assistantBody.innerHTML='';
    botReply("Hi! I'm Jean's assistant. Try: 'Who is Jean?', 'Show skills', 'Show projects'.");
    assistantInput?.focus();
  }
  function closeAssistant(){ 
    assistantPanel.style.display='none';
    assistantPanel.setAttribute('aria-hidden','true'); 
  }
  assistantBtn.addEventListener('click', ()=>{ assistantPanel.style.display==='flex'?closeAssistant():openAssistant(); });
  assistantClose?.addEventListener('click', closeAssistant);
  function appendMsg(text, who='bot'){
    const d = document.createElement('div');
    d.className = 'msg ' + (who==='user'?'u':'b');
    d.textContent = text;
    assistantBody.appendChild(d);
    assistantBody.scrollTop = assistantBody.scrollHeight;
  }
  function botReply(text){ setTimeout(()=> appendMsg(text,'bot'),200); }
  assistantForm?.addEventListener('submit', e=>{
    e.preventDefault();
    const q = assistantInput.value.trim();
    if(!q) return;
    appendMsg(q,'user'); assistantInput.value='';
    const lc = q.toLowerCase();
    if(lc.includes('who') && lc.includes('jean')) botReply('Jean Grace Samalburo — Computer Science student and aspiring web developer.');
    else if(lc.includes('skill')) botReply('Skills: HTML, CSS, JavaScript, Java, Python, Networking.');
    else if(lc.includes('project')) botReply('Projects: Clinic Appointment System, Pastel To-Do App, PetCare+, Calculator App.');
    else if(lc.includes('email') || lc.includes('contact')) botReply('You can reach Jean at samalburo.jeangrace@gmail.com');
    else botReply("Sorry, I don't understand yet. Try 'Who is Jean?' or 'Show skills'.");
  });
  window.addEventListener('keydown', e=>{
    if(e.key==='/' && !e.target.matches('input')) { e.preventDefault(); openAssistant(); }
  });
}
/* ================= Magic Cursor Trail ================= */
const trail = document.getElementById('magic-trail');

function spawnSpark(x, y){
  const spark = document.createElement('div');
  spark.className = 'spark';
  spark.style.left = x + 'px';
  spark.style.top = y + 'px';
  document.body.appendChild(spark);

  // Animate fade & move
  setTimeout(()=>{
    spark.style.opacity = 0;
    spark.style.transform = 'translateY(-20px) scale(0.6)';
  }, 50);

  // Remove after animation
  setTimeout(()=>{
    spark.remove();
  }, 800);
}

// Track mouse movement
window.addEventListener('mousemove', e => spawnSpark(e.clientX, e.clientY));

/* ================= Spark CSS ================= */
const sparkStyle = document.createElement('style');
sparkStyle.innerHTML = `
.spark {
  position: fixed;
  pointer-events: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: radial-gradient(circle, #fff, #ffd6ea);
  mix-blend-mode: screen;
  opacity: 0.95;
  transform: translate(-50%, -50%) scale(1);
  transition: all 0.7s ease;
}
`;
document.head.appendChild(sparkStyle);

const avatar = document.querySelector('.avatar');
let isDragging = false;
let offsetX, offsetY;

window.addEventListener("load", () => {
  const savedX = localStorage.getItem("avatarX");
  const savedY = localStorage.getItem("avatarY");

  if (savedX !== null && savedY !== null) {
    avatar.style.position = "fixed"; 
    avatar.style.left = savedX + "px";
    avatar.style.top = savedY + "px";
  }
});

avatar.addEventListener('mousedown', e => {
  isDragging = true;

  avatar.style.position = "fixed"; 
  avatar.style.cursor = "grabbing";

  offsetX = e.clientX - avatar.offsetLeft;
  offsetY = e.clientY - avatar.offsetTop;
});

window.addEventListener('mousemove', e => {
  if (!isDragging) return;

  const x = e.clientX - offsetX;
  const y = e.clientY - offsetY;

  avatar.style.left = x + "px";
  avatar.style.top = y + "px";
});

window.addEventListener('mouseup', () => {
  if (!isDragging) return;

  isDragging = false;
  avatar.style.cursor = "grab";

  localStorage.setItem("avatarX", avatar.offsetLeft);
  localStorage.setItem("avatarY", avatar.offsetTop);
});