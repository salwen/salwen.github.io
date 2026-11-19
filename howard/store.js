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
 const prototypes=[
 ['store-front.jpg','從街道開始的品牌接觸','落地實景','門面、招牌與立體材料整合，讓品牌從平面識別延伸到實體場域。來源：空間品牌識別資料。'],
 ['store-community.jpg','共享生活經營區','落地實景','以長桌、多元座位與服務內容，呈現社區生活經營與交流的空間。來源：空間品牌識別資料。'],
 ['store-plan.jpg','原型平面配置','設計配置圖','原始規劃串連共享生活、自由洽談、專業介紹與團隊辦公等區域。來源：空間品牌識別資料。'],
 ['store-zoning.jpg','對外服務與團隊工作','區域規劃圖','以不同使用區域整理客戶與住戶經營，以及團隊辦公之間的關係。來源：空間品牌識別資料。'],
 ['store-prototype-plan.jpg','共享與專業的空間組合','早期原型提案','原始空間介紹中的平面方案，呈現共享生活、商圈模型、洽談與辦公的組合。'],
 ['store-prototype-event.jpg','從日常洽談到展演講座','早期原型提案','透過座位配置轉換，探索同一場域支援不同服務與活動的可能。此為設計提案。'],
 ['store-prototype-interior.jpg','一般型門市的服務情境','2024 設計提案','以原始經營架構中的室內提案，說明門市服務空間的設計思考，非完工照片。'],
 ['store-prototype-room.jpg','共享與私密服務的界面','2024 設計提案','原始經營架構中的洽談與會議空間提案，呈現功能轉換與空間界面。'],
 ['store-meeting.jpg','多功能洽談空間','空間設計提案','以會議、洽談及共用設備，支持不同的專業服務情境。來源：品牌與空間資料，非完工照片。'],
 ['store-local-map.jpg','把生活圈帶進服務','服務情境提案','原始經營架構中的生活圈介紹情境，連結空間、資訊與專業服務，非已實裝功能宣稱。'],
 ['store-operating-model.jpg','生活服務經營架構','經營架構提案','以不動產服務為核心，探索社區生活、生活聯盟與多元經營的關係。來源：實驗店空間介紹。'],
 ['store-material-test.jpg','材料模型的測試與觀察','原始測試模型','觀察不同模型、色彩與光線下的立體表面，保留材料識別的發展脈絡。']
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
 let prototype=0;
 prototypes.forEach((x,i)=>{const o=document.createElement('option');o.value=i;o.textContent=x[1];q('#st-prototype-select').append(o);const b=document.createElement('button');b.type='button';b.dataset.stPrototype=i;b.setAttribute('aria-label',x[1]+'，'+x[2]);const img=document.createElement('img');img.src=imgPath(x[0]);img.alt='';img.loading='lazy';b.append(img);b.onclick=()=>showPrototype(i);q('#st-prototype-thumbs').append(b)});
 function showPrototype(n){prototype=wrap(n,prototypes.length);const x=prototypes[prototype];q('#st-prototype-image').src=imgPath(x[0]);q('#st-prototype-image').alt=x[1]+' / '+x[2];q('#st-prototype-type').textContent=x[2];q('#st-prototype-title').textContent=x[1];q('#st-prototype-caption').textContent=x[3];q('#st-prototype-select').value=String(prototype);q('#st-prototype-position').textContent=String(prototype+1).padStart(2,'0')+' / '+prototypes.length;qa('[data-st-prototype]').forEach((b,i)=>b.setAttribute('aria-pressed',i===prototype));animate(q('#st-prototype-image'))}
 q('#st-prototype-prev').onclick=()=>showPrototype(prototype-1);q('#st-prototype-next').onclick=()=>showPrototype(prototype+1);q('#st-prototype-select').onchange=()=>showPrototype(+q('#st-prototype-select').value);
 const zoomPrototype=()=>zoom(imgPath(prototypes[prototype][0]),prototypes[prototype][1]+' / '+prototypes[prototype][2]);q('#st-prototype-zoom').onclick=zoomPrototype;q('#st-prototype-enlarge').onclick=zoomPrototype;showPrototype(0);
 q('.st-prototype-stage').addEventListener('keydown',e=>{if(['INPUT','SELECT','TEXTAREA'].includes(e.target.tagName)||document.querySelector('#lightbox')?.open)return;if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();e.stopPropagation();showPrototype(prototype+(e.key==='ArrowRight'?1:-1))}});
 let swipe=null;q('#st-prototype-zoom').addEventListener('pointerdown',e=>{if(e.pointerType==='touch')swipe={x:e.clientX,y:e.clientY}});q('#st-prototype-zoom').addEventListener('pointerup',e=>{if(!swipe)return;const dx=e.clientX-swipe.x,dy=e.clientY-swipe.y;if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.4){e.preventDefault();suppressZoom=performance.now()+500;showPrototype(prototype+(dx<0?1:-1))}swipe=null});q('#st-prototype-zoom').addEventListener('pointercancel',()=>swipe=null);let suppressZoom=0;q('#st-prototype-zoom').onclick=()=>{if(performance.now()>suppressZoom)zoomPrototype()};
 const track=q('#st-pillar-track');let card=0,drag=null;
 function activateCard(n,scroll=false){card=wrap(n,5);qa('[data-st-card]').forEach((el,i)=>el.classList.toggle('is-active',i===card));if(scroll){const target=qa('[data-st-card]')[card];track.scrollTo({left:target.offsetLeft-track.offsetLeft,behavior:reduced.matches?'instant':'smooth'})}}
 qa('[data-st-card]').forEach((el,i)=>{el.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')activateCard(i)});el.addEventListener('focusin',()=>activateCard(i))});q('#st-cards-prev').onclick=()=>activateCard(card-1,true);q('#st-cards-next').onclick=()=>activateCard(card+1,true);
 track.addEventListener('keydown',e=>{if(e.target!==track)return;if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();activateCard(card+(e.key==='ArrowRight'?1:-1),true)}});
 track.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse'||e.button!==0||e.target.closest('button'))return;drag={x:e.clientX,left:track.scrollLeft};track.setPointerCapture?.(e.pointerId)});track.addEventListener('pointermove',e=>{if(drag){if(Math.abs(e.clientX-drag.x)>6)e.preventDefault();track.scrollLeft=drag.left-(e.clientX-drag.x)}});track.addEventListener('pointerup',()=>drag=null);track.addEventListener('pointercancel',()=>drag=null);
 let origin='#home',originScroll=0,focusBefore=null,observer=null,frame=0,navLock=0,currentSection=1;
 const sections=qa('[data-st-section]');
 function route(){if(location.hash.startsWith('#store/'))return clamp(+location.hash.slice(7)||1,1,6);if(location.hash.startsWith('#case/network'))return 2;if(location.hash.startsWith('#case/experiment'))return 6;return null}
 function activate(n){currentSection=n;qa('.st-header nav [data-st-jump]').forEach(b=>{const selected=+b.dataset.stJump===n;b.setAttribute('aria-current',selected?'location':'false')});if(view.open)history.replaceState({storeSection:n},'','#store/'+n)}
 function go(n,instant=false){n=clamp(+n||1,1,6);navLock=performance.now()+(instant||reduced.matches?120:1000);activate(n);const el=q('#st-section-'+n),top=el.getBoundingClientRect().top-root.getBoundingClientRect().top+root.scrollTop;root.scrollTo({top:Math.max(0,top),behavior:instant||reduced.matches?'instant':'smooth'})}
 function sync(){frame=0;if(!view.open)return;const rect=root.getBoundingClientRect(),travel=Math.max(1,root.scrollHeight-root.clientHeight),progress=clamp(root.scrollTop/travel,0,1);q('.st-progress span').style.transform='scaleX('+progress+')';if(!reduced.matches){const r=q('.st-space-scene').getBoundingClientRect();view.style.setProperty('--st-parallax',clamp((rect.top-r.top)*.09,-45,65)+'px');const lines=qa('.st-brand-values>div>p'),vr=q('.st-brand-values').getBoundingClientRect(),index=clamp(Math.floor((rect.height*.7-vr.top+rect.top)/Math.max(1,vr.height/4)),0,3);lines.forEach((p,i)=>p.classList.toggle('is-current',i===index))}if(performance.now()<navLock)return;let n=1;sections.forEach(s=>{if(s.getBoundingClientRect().top<rect.top+rect.height*.35)n=+s.dataset.stSection});if(n!==currentSection)activate(n)}
 function requestSync(){if(!frame)frame=requestAnimationFrame(sync)}root.addEventListener('scroll',requestSync,{passive:true});root.addEventListener('scrollend',()=>{navLock=0;requestSync()});window.addEventListener('resize',requestSync);qa('[data-st-jump]').forEach(b=>b.onclick=()=>go(b.dataset.stJump));
 function observe(){observer?.disconnect();if(reduced.matches)return;observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('st-is-visible');observer.unobserve(e.target)}}),{root,threshold:0});qa('.st-section-heading,.st-intro-columns,.st-store-explorer,.st-strategy-principles,.st-module-layout,.st-plan-block,.st-brand-values,.st-material-photos,.st-material-lab,.st-roadmap-grid,.st-credit').forEach(el=>{el.classList.add('st-reveal-ready');observer.observe(el)})}
 function open(source=null,options={}){if(!view.open){const hash=location.hash;origin=hash.startsWith('#store/')?'#home':hash.startsWith('#case/')?'#showcase':hash||'#home';originScroll=scrollY;focusBefore=source||document.activeElement;if(document.querySelector('#case-view')?.open)closeCase(true,true);if(document.querySelector('#case-index')?.open)document.querySelector('#case-index').close();view.showModal();document.body.classList.add('locked');if(!options.fromHistory)history.pushState({storeSection:1},'','#store/1');if(!reduced.matches)view.animate([{opacity:.1,clipPath:'inset(7% 7% 7% 7% round 20px)'},{opacity:1,clipPath:'inset(0% 0% 0% 0% round 0px)'}],{duration:620,easing:'cubic-bezier(.2,.7,.2,1)'});observe()}go(options.section||route()||1,true);q('#st-close').focus({preventScroll:true})}
 function close(fromHistory=false){if(!view.open)return;observer?.disconnect();if(frame)cancelAnimationFrame(frame);frame=0;drag=null;swipe=null;view.close();if(!['#case-view','#zyxel-view','#practice-reader'].some(s=>document.querySelector(s)?.open))document.body.classList.remove('locked');if(!fromHistory){history.replaceState(null,'',origin);window.scrollTo({top:originScroll,behavior:'instant'});if(focusBefore?.isConnected&&focusBefore.offsetParent!==null)focusBefore.focus({preventScroll:true});else document.querySelector('[data-store-entry]')?.focus({preventScroll:true})}}
 window.openStoreExperience=open;window.closeStoreExperience=close;qa('#st-close,#st-return').forEach(b=>b.onclick=()=>close());view.addEventListener('cancel',e=>{e.preventDefault();close()});
 document.querySelectorAll('[data-store-entry]').forEach(b=>b.onclick=()=>open(b));
 window.addEventListener('popstate',()=>{const n=route();if(n)open(null,{fromHistory:true,section:n});else if(view.open)close(true)});
 const initial=route();if(initial)open(null,{fromHistory:true,section:initial});
})();
