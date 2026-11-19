/* Lightweight scroll narrative: no tracking or external animation dependencies. */
(()=>{
  'use strict';
  const q=s=>document.querySelector(s),qa=s=>[...document.querySelectorAll(s)];
  const reduced=matchMedia('(prefers-reduced-motion:reduce)');
  const hero=q('.hero'),poster=q('.poster-title'),rail=q('.chapter-rail');
  const chapters=qa('[data-chapter]'),links=qa('.chapter-rail>a');
  const drifting=qa('[data-drift]'),parallax=qa('.parallax-item');
  let frame=0,pointerX=0,pointerY=0;
  const clamp=(n,min=0,max=1)=>Math.max(min,Math.min(max,n));
  q('#rail-menu').onclick=openMenu;
  const textBlocks=qa('.reveal-text').map(el=>{
    const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);const nodes=[];
    while(walker.nextNode())nodes.push(walker.currentNode);
    const spans=[];
    nodes.forEach(node=>{
      if(!node.textContent.trim())return;
      const words=node.textContent.match(/[\u3400-\u9fff\u3000-\u303f\uff00-\uffef]{1,4}|[a-zA-Z]+[.,]?|[^\s]|\s+/g)||[];
      const fragment=document.createDocumentFragment();
      words.forEach(word=>{if(!word.trim()){fragment.append(document.createTextNode(word));return}const span=document.createElement('span');span.className='word';span.textContent=word;spans.push(span);fragment.append(span)});
      node.replaceWith(fragment);
    });
    // Visual word groups retain the original readable text and emphasis.
    return {el,spans};
  });
  function update(){
    frame=0;
    const vh=innerHeight,heroRect=hero.getBoundingClientRect();
    const progress=clamp(-heroRect.top/Math.max(hero.offsetHeight-vh,1));
    if(!reduced.matches){
      const travel=clamp(-heroRect.top,0,hero.offsetHeight);
      drifting.forEach(el=>{const speed=Number(el.dataset.drift);el.style.transform=`translate3d(${pointerX*speed*26}px,${travel*speed+pointerY*speed*16}px,0) scale(${1-progress*.06})`;el.style.opacity=String(1-progress*.25)});
      poster.style.transform=`translateY(${-progress*25}px)`;
      parallax.forEach(el=>{const rect=el.getBoundingClientRect();const offset=clamp((vh/2-rect.top),-vh,vh)*Number(el.dataset.speed);el.style.transform=`translateY(${offset}px)`});
    }else{drifting.forEach(el=>{el.style.transform='';el.style.opacity=''});poster.style.transform='';parallax.forEach(el=>el.style.transform='')}
    let active=0;
    chapters.forEach((el,i)=>{if(el.getBoundingClientRect().top<vh*.52)active=i});
    links.forEach((a,i)=>{if(i===active)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current')});
    q('#chapter-counter').value=String(active+1).padStart(2,'0')+' / 08';
    rail.classList.toggle('visible',scrollY>vh*.6);
    q('header').classList.toggle('scrolled',scrollY>vh*.6);
    textBlocks.forEach(({el,spans})=>{const rect=el.getBoundingClientRect();const p=reduced.matches?1:clamp((vh*.94-rect.top)/(vh*.55));spans.forEach((s,i)=>s.style.setProperty('--word-progress',clamp(p*(spans.length+2)-i,0,1)))});
  }
  function schedule(){if(!frame)frame=requestAnimationFrame(update)}
  window.addEventListener('scroll',schedule,{passive:true});
  window.addEventListener('resize',schedule,{passive:true});
  reduced.addEventListener('change',schedule);
  hero.addEventListener('pointermove',e=>{if(e.pointerType==='touch'||reduced.matches)return;pointerX=(e.clientX/innerWidth-.5);pointerY=(e.clientY/innerHeight-.5);schedule()},{passive:true});
  hero.addEventListener('pointerleave',()=>{pointerX=pointerY=0;schedule()});
  update();
  const scenes=[
    {id:'zyxel',image:'zyxel.jpg',alt:'ZyXEL 網通介面概念與設計資料',caption:'ZyXEL / UIUX ARCHITECTURE & HCI LEADERSHIP'},
    {id:'lipo',image:'lipo.png',alt:'PowerTech Lipo 智慧生活產品與品牌規劃',caption:'POWERTECH / HARDWARE × EXPERIENCE × MARKET'},
    {id:'bim',image:'anchor-large-model.jpg',alt:'AnchorGo 大模型檢視與雲端渲染介面，2021 產品資料',caption:'ANCHORTECH / MODEL → SHARED CONTEXT'}
  ];
  let scene=-1;
  function setScene(i){if(scene===i)return;scene=i;const x=scenes[i],img=q('#tech-image');img.src=imgPath(x.image);img.alt=x.alt;q('#tech-caption').textContent=x.caption;q('#tech-number').textContent=String(i+1).padStart(2,'0')+' / 03';q('#tech-image-open').dataset.open=x.id;q('#tech-image-open').setAttribute('aria-label','閱讀科技案例：'+x.caption);qa('.story-step').forEach((el,n)=>el.classList.toggle('active',n===i));if(!reduced.matches)img.animate([{opacity:.25,transform:'scale(.98)'},{opacity:1,transform:'scale(1)'}],{duration:550,easing:'ease-out'})}
  setScene(0);
  const sceneObserver=new IntersectionObserver(entries=>{const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio);if(visible.length)setScene(Number(visible[0].target.dataset.scene))},{threshold:[.15,.35,.6],rootMargin:'-25% 0px -15% 0px'});
  qa('.story-step').forEach(el=>sceneObserver.observe(el));
  const materials=[
    {title:'文化，從符號進入日常。',body:'人字與家的輪廓，連結以人為本；竹的虛心、挺立與節節相承，轉譯為傾聽、承諾與持續成長。',image:'tile-real.jpg',caption:'品牌材料實拍 · 表面與光影'},
    {title:'造型，建立可以延伸的秩序。',body:'以凹凸面、轉折與方向產生光影，透過旋轉與排列形成連續紋理。讓門面、牆面與室內轉角，保有共同的品牌語言。',image:'tile-modules.jpg',caption:'單元旋轉與排列 · 設計資料'},
    {title:'工藝，讓概念接受現實的檢驗。',body:'模型、模具、第一爐與顏色試樣，每一步都要回應成形、比對與施工的條件。把設計語言，變成可以導入的材料識別。',image:'tile-fire.jpg',caption:'玻璃材料製作 · 試製過程紀錄'}
  ];
  let materialIndex=0;
  function setMaterial(i){materialIndex=i;const x=materials[i];q('#material-panel h4').textContent=x.title;q('#material-panel p').textContent=x.body;q('#material-panel').setAttribute('aria-labelledby','material-tab-'+i);q('#material-image').src=imgPath(x.image);q('#material-image').alt=x.caption;q('#material-caption').textContent='0'+(i+1)+' / '+x.caption+' · 點擊放大 ↗';qa('[data-material]').forEach((b,n)=>{b.setAttribute('aria-selected',String(n===i));b.tabIndex=n===i?0:-1});if(!reduced.matches)q('#material-image').animate([{opacity:.25},{opacity:1}],{duration:400})}
  qa('[data-material]').forEach(b=>{b.onclick=()=>setMaterial(Number(b.dataset.material));b.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();let i=e.key==='Home'?0:e.key==='End'?2:(materialIndex+(e.key==='ArrowRight'?1:2))%3;setMaterial(i);qa('[data-material]')[i].focus()})});
  q('#material-image-open').onclick=()=>zoom(imgPath(materials[materialIndex].image),materials[materialIndex].caption);
  qa('.time-tabs [role=tab]').forEach((b,i)=>{b.id='future-tab-'+i;b.setAttribute('aria-controls','future-content')});
  const futureObserver=new MutationObserver(()=>{const b=q('.time-tabs [aria-selected=true]');q('#future-content').setAttribute('aria-labelledby',b.id)});
  futureObserver.observe(q('.time-tabs'),{subtree:true,attributes:true,attributeFilter:['aria-selected']});
  q('#future-content').setAttribute('aria-labelledby','future-tab-0');
})();
