/* Next-generation store experience. Original sources, native scrolling and bounded state. */
(()=>{
 'use strict';
 const view=document.querySelector('#store-experience');if(!view)return;
 const q=s=>view.querySelector(s),qa=s=>[...view.querySelectorAll(s)],root=q('#st-scroll'),reduced=matchMedia('(prefers-reduced-motion:reduce)');
 const wrap=(n,len)=>(n%len+len)%len,clamp=(n,min,max)=>Math.max(min,Math.min(max,n));
 const types=[
 ['不動產店・快捷型','以精簡據點承接不動產專業服務，思考重劃區、賣場等場域的接觸需求。以介紹、洽談與必要工作組件，回應服務任務。','店型提案 / 原始架構包含快捷型與一般型，不在此固定各版草案的坪數。'],
 ['不動產店・一般型','提供日常不動產服務與團隊工作基地，整合專業介紹、公共洽談、私密會議、資訊展示及辦公等組件。','經營重點 / 讓客戶服務與同仁工作的動線，各自清楚又能協作。'],
 ['Plus 店','結合不動產專業與社區生活經營，串連共好廠商、專家達人、在地居民與集團資源，形成更完整的生活服務據點。','經營重點 / 在地生活媒合、共享舞台與多元服務的組合構想。'],
 ['社區店','以社區服務為核心，作為多個不動產據點可以共同使用的生活服務場域，支持小型講座、活動與住戶經營。','經營重點 / 讓分店與居民之間，產生買賣以外的連結。'],
 ['旗艦店','承接區域不動產服務、社區經營與異業合作，結合共享工作、洽談、會議及展覽等功能，作為區域型服務平台。','經營重點 / 用不同據點的分工，連結區域資源與完整服務。']
 ];
 const modules=[
 ['不動產服務模組','專業，從理解生活開始。','用生活圈介紹、需求探索與洽談等接觸點，讓專業不只表現在物件資訊，而是能協助客戶理解居住選擇。',['專業介紹','公共洽談','共享會議','私密服務']],
 ['社區經營模組','讓進店，有更多生活的理由。','以共享生活、展演、資訊與多功能空間，回應居民的日常需求，支持講座、活動與生態夥伴合作的經營構想。',['共享生活','展演交流','資訊展示','多功能空間']],
 ['辦公模組','支持一個團隊的日常。','從工作座位、事務與儲藏，到戰情討論與休憩，將不同工作任務放進合適的區域，提升協作與空間轉換的可能。',['辦公工作','戰情討論','個人置物','團隊休憩']],
 ['環境模組','把長期營運，也放進設計。','原始藍圖提出智慧環控、能源碳排管理與儲能設備等方向。這些屬規劃項目，需依預算、設備與實際方案評估。',['智慧環控規劃','能源與碳排規劃','儲能設備評估']]
 ];
 const journeys=[
 ['客戶服務','store-customer-path.jpg','從迎賓、需求探索到專業洽談，依服務任務安排接觸點。','2024 一般型店提案 / 原始客戶服務動線圖'],
 ['同仁工作','store-team-path.jpg','從進店、取用工作資料與設備，到選擇工作位置及戰情討論，支持團隊的日常運作。','2024 一般型店提案 / 原始同仁辦公動線圖'],
 ['空間轉換','store-prototype-event.jpg','以可移動座位與共享區域，思考平日洽談與展演講座之間的轉換。','空間原型 / 原始展演講座配置，屬提案圖']
 ];
 const brand=[
 ['標誌結構','store-logo-grid.jpg','以基準單位整理標誌與標準字的比例及組合，讓各種接觸點有共同的使用依據。','品牌識別 / 原始標誌組合規範'],
 ['標準字','store-wordmark.jpg','從字形比例、筆畫、間距與視覺平衡，整理中文標準字的調整與使用方式。','品牌識別 / 原始標準字調整資料'],
 ['品牌色彩','store-colours.jpg','原始資料以信義紅、信義綠與白色，表達熱忱關懷、信賴自然與誠信透明的品牌語意。','品牌識別 / 原始標準色資料'],
 ['門面應用','store-front.jpg','讓招牌、品牌字樣、專屬材料與空間入口共同構成可以辨認的品牌表情。','空間品牌 / 落地實驗店門面實景']
 ];
 function animate(el){if(!reduced.matches)el.animate([{opacity:.35,transform:'translateY(14px)'},{opacity:1,transform:'translateY(0)'}],{duration:420,easing:'cubic-bezier(.2,.7,.2,1)'})}
 function buildTabs(container,attr,panel,items,render){const parent=q(container);q(panel).setAttribute('role','tabpanel');q(panel).setAttribute('tabindex','0');items.forEach((item,i)=>{const b=document.createElement('button');b.type='button';b.id=attr+'-'+i;b.setAttribute(attr,i);b.setAttribute('role','tab');b.setAttribute('aria-controls',panel.slice(1));b.textContent=item[0];parent.append(b)});const set=n=>{qa('['+attr+']').forEach((b,i)=>{b.setAttribute('aria-selected',i===n);b.tabIndex=i===n?0:-1});q(panel).setAttribute('aria-labelledby',attr+'-'+n);render(items[n],n);animate(q(panel))};qa('['+attr+']').forEach((b,i)=>{b.onclick=()=>set(i);b.onkeydown=e=>{if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End'].includes(e.key))return;e.preventDefault();e.stopPropagation();const n=e.key==='Home'?0:e.key==='End'?items.length-1:wrap(i+(['ArrowRight','ArrowDown'].includes(e.key)?1:-1),items.length);set(n);qa('['+attr+']')[n].focus()}});set(0);return set}
 buildTabs('#st-type-tabs','data-st-type','#st-type-detail',types,(x,n)=>{q('#st-type-detail').innerHTML='<h3>'+x[0]+'</h3><p>'+x[1]+'</p><small>'+x[2]+'</small>';qa('[data-st-node]').forEach(el=>el.classList.toggle('is-selected',+el.dataset.stNode===n))});
 buildTabs('#st-module-tabs','data-st-module','#st-module-detail',modules,x=>{q('#st-module-detail').innerHTML='<h3>'+x[1]+'</h3><p>'+x[2]+'</p><div class="st-module-items">'+x[3].map(v=>'<span>'+v+'</span>').join('')+'</div>'});
 let journey=0;
 buildTabs('#st-journey-tabs','data-st-journey','#st-journey-description',journeys,(x,n)=>{journey=n;q('#st-journey-description').textContent=x[2];q('#st-journey-image').src=imgPath(x[1]);q('#st-journey-image').alt=x[3];q('#st-journey-caption').textContent=x[3];animate(q('#st-journey-image'))});
 q('#st-journey-zoom').onclick=()=>zoom(imgPath(journeys[journey][1]),journeys[journey][3]);
 let brandIndex=0;
 // A separately labelled panel contains both the original image and interpretation.
 q('.st-brand-workbench figure').id='st-brand-panel';q('#st-brand-panel').setAttribute('role','tabpanel');
 buildTabs('#st-brand-tabs','data-st-brand','#st-brand-panel',brand,(x,n)=>{brandIndex=n;q('#st-brand-image').src=imgPath(x[1]);q('#st-brand-image').alt=x[3];q('#st-brand-caption').textContent=x[3];q('#st-brand-description').textContent=x[2]});
 q('#st-brand-zoom').onclick=()=>zoom(imgPath(brand[brandIndex][1]),brand[brandIndex][3]);
 for(let i=0;i<16;i++){const span=document.createElement('span'),img=document.createElement('img');img.src=imgPath('store-tile.jpg');img.alt='';img.loading='lazy';span.append(img);q('#st-tile-grid').append(span)}
 const patternText={aligned:'所有單元朝向相同，形成連續而有秩序的線條。',alternate:'相鄰單元交替轉向，形成交錯的材料節奏。',rotate:'以四個方向重組單元，觀察聚合與展開的圖案。'};
 function pattern(name){if(!Object.hasOwn(patternText,name))return;qa('[data-st-pattern]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.stPattern===name));qa('#st-tile-grid img').forEach((img,i)=>{const r=Math.floor(i/4),c=i%4,angle=name==='aligned'?0:name==='alternate'?(r+c)%2*180:((r%2)*2+(c%2))*90;img.style.setProperty('--st-tile-angle',angle+'deg')});q('#st-pattern-description').textContent=patternText[name];q('#st-tile-grid').setAttribute('aria-label','四乘四原始識別單元；'+patternText[name])}qa('[data-st-pattern]').forEach(b=>b.onclick=()=>pattern(b.dataset.stPattern));pattern('aligned');
 qa('[data-st-source]').forEach(b=>b.onclick=()=>zoom(imgPath(b.dataset.stSource),b.dataset.stCaption));
 const track=q('#st-pillar-track');let card=0,drag=null;
 const cards=qa('[data-st-card]');
 function activateCard(n,scroll=false){card=wrap(n,cards.length);cards.forEach((el,i)=>el.classList.toggle('is-active',i===card));if(scroll){const target=cards[card];track.scrollTo({left:target.offsetLeft-track.offsetLeft,behavior:reduced.matches?'instant':'smooth'})}}
 cards.forEach((el,i)=>{el.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')activateCard(i)});el.addEventListener('focusin',()=>activateCard(i))});q('#st-cards-prev').onclick=()=>activateCard(card-1,true);q('#st-cards-next').onclick=()=>activateCard(card+1,true);
 track.addEventListener('keydown',e=>{if(e.target!==track)return;if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();activateCard(card+(e.key==='ArrowRight'?1:-1),true)}});
 track.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse'||e.button!==0||e.target.closest('button,a'))return;drag={x:e.clientX,left:track.scrollLeft};track.setPointerCapture?.(e.pointerId)});track.addEventListener('pointermove',e=>{if(drag){if(Math.abs(e.clientX-drag.x)>6)e.preventDefault();track.scrollLeft=drag.left-(e.clientX-drag.x)}});track.addEventListener('pointerup',()=>drag=null);track.addEventListener('pointercancel',()=>drag=null);
 let origin='#home',originScroll=0,focusBefore=null,observer=null,frame=0,navLock=0,currentSection=1;
 const sections=qa('[data-st-section]');
 function route(){if(location.hash.startsWith('#store/')){const n=+location.hash.slice(7);return n===6?3:clamp(n||1,1,sections.length);}if(location.hash.startsWith('#case/network'))return 2;if(location.hash.startsWith('#case/experiment'))return 3;return null}
 function activate(n){currentSection=n;qa('.st-header nav [data-st-jump]').forEach(b=>{const selected=+b.dataset.stJump===n;b.setAttribute('aria-current',selected?'location':'false')});if(view.open)history.replaceState({storeSection:n},'','#store/'+n)}
 function go(n,instant=false){n=clamp(+n||1,1,sections.length);navLock=performance.now()+(instant||reduced.matches?120:1000);activate(n);const el=q('#st-section-'+n),top=el.getBoundingClientRect().top-root.getBoundingClientRect().top+root.scrollTop;root.scrollTo({top:Math.max(0,top),behavior:instant||reduced.matches?'instant':'smooth'})}
 function sync(){frame=0;if(!view.open)return;const rect=root.getBoundingClientRect(),travel=Math.max(1,root.scrollHeight-root.clientHeight),progress=clamp(root.scrollTop/travel,0,1);q('.st-progress span').style.transform='scaleX('+progress+')';if(!reduced.matches){const r=q('.st-space-scene').getBoundingClientRect();view.style.setProperty('--st-parallax',clamp((rect.top-r.top)*.09,-45,65)+'px');const lines=qa('.st-brand-values>div>p'),vr=q('.st-brand-values').getBoundingClientRect(),index=clamp(Math.floor((rect.height*.7-vr.top+rect.top)/Math.max(1,vr.height/4)),0,3);lines.forEach((p,i)=>p.classList.toggle('is-current',i===index))}if(performance.now()<navLock)return;let n=1;sections.forEach(s=>{if(s.getBoundingClientRect().top<rect.top+rect.height*.35)n=+s.dataset.stSection});if(n!==currentSection)activate(n)}
 function requestSync(){if(!frame)frame=requestAnimationFrame(sync)}root.addEventListener('scroll',requestSync,{passive:true});root.addEventListener('scrollend',()=>{navLock=0;requestSync()});window.addEventListener('resize',requestSync);qa('[data-st-jump]').forEach(b=>b.onclick=()=>go(b.dataset.stJump));
 function observe(){observer?.disconnect();if(reduced.matches)return;observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('st-is-visible');observer.unobserve(e.target)}}),{root,threshold:0});qa('.st-section-heading,.st-intro-columns,.st-store-explorer,.st-strategy-principles,.st-module-layout,.st-plan-block,.st-brand-values,.st-material-photos,.st-material-lab,.st-roadmap-grid,.st-credit').forEach(el=>{el.classList.add('st-reveal-ready');observer.observe(el)})}
 function open(source=null,options={}){if(!view.open){const hash=location.hash;origin=hash.startsWith('#store/')?'#home':hash.startsWith('#case/')?'#showcase':hash||'#home';originScroll=scrollY;focusBefore=source||document.activeElement;if(document.querySelector('#case-view')?.open)closeCase(true,true);if(document.querySelector('#case-index')?.open)document.querySelector('#case-index').close();view.showModal();document.body.classList.add('locked');if(!options.fromHistory)history.pushState({storeSection:1},'','#store/1');if(!reduced.matches)view.animate([{opacity:.1,clipPath:'inset(7% 7% 7% 7% round 20px)'},{opacity:1,clipPath:'inset(0% 0% 0% 0% round 0px)'}],{duration:620,easing:'cubic-bezier(.2,.7,.2,1)'});observe()}go(options.section||route()||1,true);q('#st-close').focus({preventScroll:true})}
 function close(fromHistory=false){if(!view.open)return;observer?.disconnect();if(frame)cancelAnimationFrame(frame);frame=0;drag=null;view.close();if(!['#case-view','#zyxel-view','#practice-reader'].some(s=>document.querySelector(s)?.open))document.body.classList.remove('locked');if(!fromHistory){history.replaceState(null,'',origin);window.scrollTo({top:originScroll,behavior:'instant'});if(focusBefore?.isConnected&&focusBefore.offsetParent!==null)focusBefore.focus({preventScroll:true});else document.querySelector('[data-store-entry]')?.focus({preventScroll:true})}}
 window.openStoreExperience=open;window.closeStoreExperience=close;qa('#st-close,#st-return').forEach(b=>b.onclick=()=>close());view.addEventListener('cancel',e=>{e.preventDefault();close()});
 document.querySelectorAll('[data-store-entry]').forEach(b=>b.onclick=()=>open(b));
 window.addEventListener('popstate',()=>{const n=route();if(n)open(null,{fromHistory:true,section:n});else if(view.open)close(true)});
 const initial=route();if(initial)open(null,{fromHistory:true,section:initial});
})();
