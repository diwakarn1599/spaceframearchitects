/* ── SPLASH ──────────────────────────────────────────────────────── */
(function(){
  var splash=document.getElementById('splash'),wm=document.getElementById('splash-wordmark'),main=document.getElementById('main-content');
  setTimeout(function(){wm.classList.add('show');},1800);
  setTimeout(function(){splash.classList.add('hide');main.classList.add('visible');setTimeout(function(){splash.style.display='none';},900);},2800);
})();

/* ── NAVBAR SCROLL ───────────────────────────────────────────────── */
(function(){
  var nb=document.getElementById('navbar');
  window.addEventListener('scroll',function(){nb.classList.toggle('scrolled',window.scrollY>60);},{passive:true});
})();

/* ── HAMBURGER / MOBILE NAV ──────────────────────────────────────── */
(function(){
  var hbg=document.getElementById('hamburger'),mnav=document.getElementById('mobile-nav'),cls=document.getElementById('mobile-close'),links=document.querySelectorAll('.mobile-link');
  function open(){hbg.classList.add('active');mnav.classList.add('open');document.body.style.overflow='hidden';}
  function close(){hbg.classList.remove('active');mnav.classList.remove('open');document.body.style.overflow='';}
  hbg.addEventListener('click',function(){mnav.classList.contains('open')?close():open();});
  cls.addEventListener('click',close);
  links.forEach(function(l){l.addEventListener('click',close);});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')close();});
})();

/* ── SCROLL REVEAL ───────────────────────────────────────────────── */
(function(){
  var obs=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target);}});},{threshold:0.1,rootMargin:'0px 0px -32px 0px'});
  document.querySelectorAll('.reveal').forEach(function(el){obs.observe(el);});
})();

/* ── COUNT-UP ────────────────────────────────────────────────────── */
(function(){
  var done=false,row=document.querySelector('.stats-row');
  if(!row)return;
  function go(el){var t=parseInt(el.getAttribute('data-target'),10),s=null,d=1600;function step(ts){if(!s)s=ts;var p=Math.min((ts-s)/d,1),e=1-Math.pow(1-p,3);el.textContent=Math.floor(e*t);if(p<1)requestAnimationFrame(step);else el.textContent=t;}requestAnimationFrame(step);}
  var so=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting&&!done){done=true;document.querySelectorAll('.count-up').forEach(go);so.disconnect();}});},{threshold:0.5});
  so.observe(row);
})();

/* ── PROJECT FILTER ──────────────────────────────────────────────── */
(function(){
  var btns=document.querySelectorAll('.filter-btn'),cards=document.querySelectorAll('.project-card');
  btns.forEach(function(btn){
    btn.addEventListener('click',function(){
      var f=this.getAttribute('data-filter');
      btns.forEach(function(b){b.classList.remove('active');});
      this.classList.add('active');
      cards.forEach(function(c){
        if(f==='all'||c.getAttribute('data-category')===f){
          c.style.display='';c.style.opacity='0';c.style.transform='translateY(14px)';
          requestAnimationFrame(function(){c.style.transition='opacity 0.38s ease,transform 0.38s ease';c.style.opacity='1';c.style.transform='translateY(0)';});
        } else {
          c.style.transition='opacity 0.24s ease';c.style.opacity='0';
          setTimeout(function(){c.style.display='none';},250);
        }
      });
    });
  });
})();

/* ── CAROUSEL ────────────────────────────────────────────────────── */
(function(){
  var track=document.getElementById('carousel-track'),dots=document.querySelectorAll('.carousel-dot'),prev=document.getElementById('prev-btn'),next=document.getElementById('next-btn'),total=dots.length,cur=0,timer;
  function goTo(i){cur=(i+total)%total;track.style.transform='translateX(-'+(cur*100)+'%)';dots.forEach(function(d,j){d.classList.toggle('active',j===cur);});}
  function resetAuto(){clearInterval(timer);timer=setInterval(function(){goTo(cur+1);},5000);}
  prev.addEventListener('click',function(){goTo(cur-1);resetAuto();});
  next.addEventListener('click',function(){goTo(cur+1);resetAuto();});
  dots.forEach(function(d,i){d.addEventListener('click',function(){goTo(i);resetAuto();});});
  var tx=0;
  track.addEventListener('touchstart',function(e){tx=e.changedTouches[0].screenX;},{passive:true});
  track.addEventListener('touchend',function(e){var diff=tx-e.changedTouches[0].screenX;if(Math.abs(diff)>42){goTo(diff>0?cur+1:cur-1);resetAuto();}},{passive:true});
  resetAuto();
})();

/* ── FLIP CARDS ──────────────────────────────────────────────────── */
(function(){
  document.querySelectorAll('.service-link').forEach(function(btn){
    btn.addEventListener('click',function(){
      btn.closest('.flip-card-inner').classList.add('flipped');
    });
  });
  document.querySelectorAll('.back-flip-btn').forEach(function(btn){
    btn.addEventListener('click',function(){
      btn.closest('.flip-card-inner').classList.remove('flipped');
    });
  });
})();

/* ── HERO PARALLAX ───────────────────────────────────────────────── */
(function(){
  var geo=document.querySelector('.hero-geo'),h=window.innerHeight;
  if(!geo)return;
  window.addEventListener('scroll',function(){
    if(window.scrollY<h)geo.style.transform='translateY('+(window.scrollY*0.14)+'px)';
  },{passive:true});
})();
