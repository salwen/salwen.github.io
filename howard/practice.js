/* Scroll-led product stories with synchronized, animated original PDF pages. */
(()=>{
 'use strict';
 const practiceData=window.HOWARD_PRACTICE,reader=document.querySelector('#practice-reader'),entry=document.querySelector('[data-practice]');
 const q=s=>reader.querySelector(s),root=q('#practice-scroll'),reduced=matchMedia('(prefers-reduced-motion:reduce)');
 const sections=[],groupButtons=[],original=q('#practice-original');
 const practiceMeta={
  title:q('#practice-reader-title').textContent,
  subtitle:q('.pr-header p').textContent,
  original:original.getAttribute('href'),
  originalLabel:original.textContent,
  footer:q('.pr-source').textContent
 };
 let data,total,groups,storeSource=null;
 const clamp=n=>Math.max(1,Math.min(total,Math.trunc(Number(n))||1));
 const groupFor=n=>groups.findIndex(g=>n>=g.start&&n<=g.end);
 let page=0,group=-1,origin='#home',sourceFocus=entry,sourceScroll=0,scrollLock=0,scrollFrame=0,visualToken=0,animations=[],swipe=null,suppressClick=0;
 function cleanAnimation(){animations.forEach(a=>a.cancel());animations=[];q('#practice-page-image').querySelectorAll('.pr-outgoing').forEach(el=>el.remove())}
 function buildReader(content){
  data=content;total=data.pages.length;groups=data.groups;
  sections.length=0;groupButtons.length=0;
  for(const selector of ['#practice-outline','#practice-page-select','#practice-narrative','#practice-filmstrip'])q(selector).replaceChildren();
  q('#practice-image').removeAttribute('src');
  delete q('#practice-image').dataset.page;
  const meta=storeSource?{
   title:data.title,subtitle:data.edition+' ・ '+total+' 頁',original:data.original,
   originalLabel:data.originalLabel||'開啟原始 Keynote ↗',footer:'捲動切換・點擊放大'
  }:practiceMeta;
  q('#practice-reader-title').textContent=meta.title;
  q('.pr-header p').textContent=meta.subtitle;
  original.hidden=!meta.original;
  if(meta.original)original.href=meta.original;
  else original.removeAttribute('href');
  original.textContent=meta.originalLabel;
  q('.pr-source').textContent=meta.footer;
  reader.classList.toggle('pr-store-document',Boolean(storeSource));
  groups.forEach((g,i)=>{
   const button=document.createElement('button');button.type='button';button.dataset.group=i;button.innerHTML='<span>'+String(i+1).padStart(2,'0')+'</span><strong></strong>';button.querySelector('strong').textContent=g.label;button.onclick=()=>go(g.start);q('#practice-outline').append(button);groupButtons.push(button);
  });
  data.pages.forEach(p=>{
   const option=document.createElement('option');option.value=p.number;option.textContent=String(p.number).padStart(2,'0')+' / '+p.title;q('#practice-page-select').append(option);
   const section=document.createElement('section');section.id='practice-step-'+p.number;section.className='pr-step';section.dataset.page=p.number;section.setAttribute('aria-labelledby','practice-heading-'+p.number);
   section.innerHTML='<span class="pr-step-kicker"></span><h3 id="practice-heading-'+p.number+'"></h3><p></p><button type="button" class="pr-view-source">查看完整原圖 ↗</button>';
   section.querySelector('.pr-step-kicker').textContent=String(p.number).padStart(2,'0')+' / '+groups[groupFor(p.number)].label;
   section.querySelector('h3').textContent=p.heading;section.querySelector('p').textContent=p.body;
   if(p.video){
    const video=document.createElement('video');
    video.controls=true;video.playsInline=true;video.preload='none';
    video.src=imgPath(p.video);video.poster=imgPath(p.image);
    video.setAttribute('aria-label',p.title);section.append(video);
   }
   if(data.sources&&p.number===total){
    const links=document.createElement('ul');links.className='pr-document-sources';
    for(const [label,url] of Object.entries(data.sources)){
     const li=document.createElement('li'),link=document.createElement('a');
     link.href=url;link.target='_blank';link.rel='noopener';link.textContent=label+' · PDF ↗';
     li.append(link);links.append(li);
    }
    section.append(links);
   }
   section.querySelector('button').onclick=()=>{go(p.number,true);enlarge()};q('#practice-narrative').append(section);sections.push(section);
  });
 }
 function animateVisual(p,direction){
  const image=q('#practice-image'),button=q('#practice-page-image'),token=++visualToken;
  button.setAttribute('aria-busy','true');
  const commit=()=>{
   if(token!==visualToken||!reader.open)return;
   cleanAnimation();const previous=image.getAttribute('src');
   if(previous&&image.dataset.page!==String(p.number)&&!reduced.matches){
    const ghost=document.createElement('img');ghost.src=previous;ghost.alt='';ghost.className='pr-outgoing';ghost.setAttribute('aria-hidden','true');button.append(ghost);
    const a=ghost.animate([{opacity:1,transform:'translateY(0) scale(1)'},{opacity:0,transform:`translateY(${-direction*15}%) scale(.94)`}],{duration:580,easing:'cubic-bezier(.22,.7,.2,1)',fill:'forwards'});animations.push(a);a.finished.then(()=>ghost.remove()).catch(()=>ghost.remove());
    const b=image.animate([{opacity:0,transform:`translateY(${direction*18}%) scale(.96)`},{opacity:1,transform:'translateY(0) scale(1)'}],{duration:680,easing:'cubic-bezier(.22,.7,.2,1)'});animations.push(b);
   }
   image.src=imgPath(p.image);image.dataset.page=String(p.number);image.alt='第 '+p.number+' 頁，共 '+total+' 頁：'+p.title;button.setAttribute('aria-busy','false');
  };
  const incoming=new Image();let committed=false;const once=()=>{if(!committed){committed=true;commit()}};incoming.onload=once;incoming.onerror=()=>{if(token===visualToken)button.setAttribute('aria-busy','false')};incoming.src=imgPath(p.image);if(incoming.complete&&incoming.naturalWidth)once();
 }
 function updateFilmstrip(index){
  q('#practice-filmstrip').replaceChildren();const g=groups[index];
  for(let n=g.start;n<=g.end;n++){
   const p=data.pages[n-1],button=document.createElement('button');button.type='button';button.dataset.page=n;button.setAttribute('aria-label','第 '+n+' 頁：'+p.title);
   const image=document.createElement('img');image.src=imgPath(p.image);image.alt='';image.loading='lazy';button.append(image);const label=document.createElement('span');label.textContent=String(n).padStart(2,'0');button.append(label);button.onclick=()=>go(n);q('#practice-filmstrip').append(button);
  }
 }
 function paint(number){
  const next=clamp(number);if(next===page)return;const direction=next>=page?1:-1;sections[page-1]?.querySelector('video')?.pause();page=next;const p=data.pages[page-1],index=groupFor(page);
  q('#practice-caption').textContent=p.title;q('#practice-page-select').value=String(page);q('#practice-text').textContent=p.text||'本頁以圖像呈現，請查看完整原圖。';q('.pr-transcript').open=false;
  q('#practice-position').textContent=String(page).padStart(2,'0')+' / '+total;q('#practice-prev').disabled=page===1;q('#practice-next').disabled=page===total;
  reader.style.setProperty('--pr-progress',page/total);sections.forEach((el,i)=>el.classList.toggle('active',i+1===page));groupButtons.forEach((b,i)=>b.setAttribute('aria-current',i===index?'page':'false'));
  if(index!==group){group=index;updateFilmstrip(index);const side=q('.pr-index'),nav=q('#practice-outline'),button=groupButtons[index];if(matchMedia('(max-width:760px)').matches){const a=button.getBoundingClientRect(),b=nav.getBoundingClientRect();nav.scrollTo({left:nav.scrollLeft+a.left-b.left-(b.width-a.width)/2,behavior:reduced.matches?'instant':'smooth'})}else if(button.offsetTop<side.scrollTop||button.offsetTop+button.offsetHeight>side.scrollTop+side.clientHeight){side.scrollTo({top:Math.max(0,button.offsetTop-side.clientHeight*.4),behavior:reduced.matches?'instant':'smooth'})}}q('#practice-filmstrip').querySelectorAll('button').forEach(b=>b.setAttribute('aria-current',+b.dataset.page===page?'page':'false'));
  const preview=q('#practice-next-preview');preview.src=imgPath(data.pages[Math.min(page,total-1)].image);q('.pr-next-card').hidden=page===total;
  animateVisual(p,direction);if(reader.open&&!storeSource)history.replaceState({practicePage:page},'','#practice/'+page);
 }
 function syncScroll(){
  scrollFrame=0;if(!reader.open||performance.now()<scrollLock)return;
  const rect=root.getBoundingClientRect(),small=matchMedia('(max-width:760px)').matches;
  const visualBottom=small?q('.pr-visual').getBoundingClientRect().bottom:rect.top;
  const line=small?Math.min(rect.bottom-35,visualBottom+Math.max(15,rect.bottom-visualBottom)*.35):rect.top+rect.height*.46;
  let nearest=1,distance=Infinity;
  sections.forEach((el,i)=>{const r=el.getBoundingClientRect();const d=line>=r.top&&line<=r.bottom?0:Math.min(Math.abs(line-r.top),Math.abs(line-r.bottom));if(d<distance){distance=d;nearest=i+1}});paint(nearest);
 }
 function requestSync(){if(!scrollFrame)scrollFrame=requestAnimationFrame(syncScroll)}
 function go(number,instant=false){
  const n=clamp(number);paint(n);scrollLock=performance.now()+(instant||reduced.matches?100:900);
  const rect=root.getBoundingClientRect(),small=matchMedia('(max-width:760px)').matches;
  const offset=small?q('.pr-index').offsetHeight+q('.pr-visual').offsetHeight+24:Math.min(80,rect.height*.12);
  const top=sections[n-1].getBoundingClientRect().top-rect.top+root.scrollTop-offset;
  root.scrollTo({top:Math.max(0,top),behavior:instant||reduced.matches?'instant':'smooth'});
 }
 function open(number=1,fromHistory=false,source=null,documentData=null){
  if(!reader.open){storeSource=source;
   const content=documentData||(source?window.HOWARD_STORE_DOCUMENTS[source.dataset.storeDocument]:practiceData);
   if(content!==data)buildReader(content);
   origin=location.hash.startsWith('#practice/')?'#home':location.hash||'#home';sourceFocus=source||document.activeElement;sourceScroll=scrollY;reader.showModal();document.body.classList.add('locked');if(!fromHistory&&!source)history.pushState({practicePage:number},'','#practice/'+number);page=0;group=-1;
   if(!reduced.matches)reader.animate([{opacity:0,clipPath:'inset(9% 9% 9% 9% round 18px)'},{opacity:1,clipPath:'inset(0% 0% 0% 0% round 0px)'}],{duration:580,easing:'cubic-bezier(.22,.7,.2,1)'});
  }
  go(number,true);q('#practice-close').focus({preventScroll:true});
 }
 function close(fromHistory=false){
  if(!reader.open)return;++visualToken;cleanAnimation();sections[page-1]?.querySelector('video')?.pause();if(scrollFrame)cancelAnimationFrame(scrollFrame);scrollFrame=0;reader.close();if(!document.querySelector('#store-experience')?.open)document.body.classList.remove('locked');if(!fromHistory&&!storeSource)history.replaceState(null,'',origin);storeSource=null;window.scrollTo({top:sourceScroll,behavior:'instant'});if(sourceFocus?.isConnected)sourceFocus.focus({preventScroll:true});
 }
 function enlarge(){const p=data.pages[page-1];zoom(imgPath(p.image),'第 '+page+' / '+total+' 頁 · '+p.title)}
 document.querySelectorAll('[data-store-document]').forEach(link=>{
  link.addEventListener('click',event=>{
   if(event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
   if(!window.HOWARD_STORE_DOCUMENTS?.[link.dataset.storeDocument])return;
   event.preventDefault();
   open(1,false,link);
  });
 });
 const windowEntry=document.querySelector('[data-window-entry]');
 if(windowEntry)windowEntry.onclick=()=>open(1,false,windowEntry,window.HOWARD_WINDOW_DOCUMENT);
 const lipoEntry=document.querySelector('[data-lipo-entry]');
 if(lipoEntry){
  const openLipo=source=>open(1,false,source,window.HOWARD_LIPO_DOCUMENT);
  lipoEntry.onclick=()=>openLipo(lipoEntry);
  const techImage=document.querySelector('#tech-image-open'),openExisting=techImage.onclick;
  techImage.onclick=()=>techImage.dataset.open==='lipo'?openLipo(techImage):openExisting.call(techImage);
 }
 entry.onclick=()=>open(1);q('#practice-close').onclick=()=>close();reader.addEventListener('cancel',e=>{e.preventDefault();close()});
 q('#practice-prev').onclick=()=>go(page-1);q('#practice-next').onclick=()=>go(page+1);q('#practice-page-select').onchange=e=>go(e.target.value);q('#practice-page-image').onclick=()=>{if(performance.now()>suppressClick)enlarge()};q('#practice-enlarge').onclick=enlarge;
 root.addEventListener('scroll',requestSync,{passive:true});root.addEventListener('scrollend',()=>{scrollLock=0;requestSync()});window.addEventListener('resize',requestSync);
 const surface=q('#practice-page-image');
 surface.addEventListener('pointerdown',e=>{swipe={x:e.clientX,y:e.clientY,type:e.pointerType}});
 surface.addEventListener('pointerup',e=>{if(!swipe)return;const dx=e.clientX-swipe.x,dy=e.clientY-swipe.y;if(swipe.type==='touch'&&Math.abs(dx)>65&&Math.abs(dx)>Math.abs(dy)*1.5){suppressClick=performance.now()+450;go(page+(dx<0?1:-1))}swipe=null});
 surface.addEventListener('pointercancel',()=>{swipe=null});
 surface.addEventListener('pointermove',e=>{if(reduced.matches||e.pointerType!=='mouse')return;const r=surface.getBoundingClientRect();q('.pr-card-stage').style.setProperty('--tilt-x',((e.clientY-r.top)/r.height-.5)*-3+'deg');q('.pr-card-stage').style.setProperty('--tilt-y',((e.clientX-r.left)/r.width-.5)*3+'deg')});
 surface.addEventListener('pointerleave',()=>{q('.pr-card-stage').style.setProperty('--tilt-x','0deg');q('.pr-card-stage').style.setProperty('--tilt-y','0deg')});
 reader.addEventListener('keydown',e=>{if(document.querySelector('#lightbox').open||/SELECT|INPUT|TEXTAREA|VIDEO/.test(e.target.tagName))return;if(['ArrowRight','PageDown','ArrowLeft','PageUp','Home','End'].includes(e.key)){e.preventDefault();e.stopPropagation();go(e.key==='Home'?1:e.key==='End'?total:page+(['ArrowRight','PageDown'].includes(e.key)?1:-1))}});
 window.addEventListener('popstate',()=>{if(location.hash.startsWith('#practice/'))open(location.hash.slice(10),true);else if(reader.open)close(true)});
 if(location.hash.startsWith('#practice/'))open(location.hash.slice(10),true);
})();
