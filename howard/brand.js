/* Original brand sources, native scrolling, keyboard interaction and local media. */
(()=>{
 'use strict';
 const view=document.querySelector('#brand-experience');if(!view)return;
 const q=s=>view.querySelector(s),qa=s=>[...view.querySelectorAll(s)];
 const root=q('#br-scroll'),reduced=matchMedia('(prefers-reduced-motion:reduce)'),clamp=(v,a,b)=>Math.max(a,Math.min(b,v)),wrap=(n,l)=>(n%l+l)%l;
 const systems=[
 {k:'MI / MEANING',title:'以人為本，是所有設計的起點。',copy:'從人、家、信與義的原始精神出發，將關懷、專業、信任與持續成長整理為共同的品牌語意，讓後續的視覺與空間選擇都有依據。',tags:['品牌核心','人與家的關係','共同設計原則'],image:'store-oneness.jpg',caption:'理念識別 / 原始連結與交流概念圖'},
 {k:'VI / RECOGNITION',title:'把共同精神，變成共同的規則。',copy:'梳理標誌、標準字與色彩的比例及組合。從一個基準單位出發，讓招牌、圖文與不同接觸點遵循一致的辨識邏輯。',tags:['標誌比例','標準字','色彩與組合'],image:'store-logo-grid.jpg',caption:'視覺識別 / 原始標誌組合與比例規範'},
 {k:'MATERIAL / EXPRESSION',title:'讓識別從平面，走進真實的尺度。',copy:'將「人」的形體與竹的精神化為客製立體單元。讓排列、紋理與光影累積成品牌專屬的材料表情，形成門店更新的新識別層次。',tags:['品牌專屬材料','立體形體','模組與排列'],image:'store-material-study.jpg',caption:'材料識別 / 原始磁磚模型與排列測試'},
 {k:'SPACE / EXPERIENCE',title:'從城市到室內，串起完整的體驗。',copy:'以遠距街景、步行騎樓與室內使用三個層次，整合招牌、入口、專屬材料及服務場域。讓品牌在不同距離與情境中，自然延續。',tags:['城市街景','騎樓入口','室內接觸點'],image:'store-front.jpg',caption:'空間識別 / 實驗店完整門面實景'}
 ];
 const visuals=[
 {title:'建立比例的依據。',copy:'以基準單位整理標誌與標準字的相互關係，讓大小、位置與組合有共同的使用依據。',image:'store-logo-grid.jpg',caption:'標誌結構 / 原始組合比例規範'},
 {title:'在熟悉中，調整精準度。',copy:'從字形比例、筆畫、字距與光學平衡，整理中文標準字的調整。延續既有辨識，也建立更一致的使用方式。',image:'store-wordmark.jpg',caption:'標準字 / 原始字形調整資料'},
 {title:'用色彩，承接品牌的精神。',copy:'信義紅表達熱忱、關懷與溫暖；信義綠連結自然、信賴與安全；白色維持清楚的識別留白。以標準色定義共同語言。',image:'store-colours.jpg',caption:'品牌色彩 / 原始標準色規範'}
 ];
 const documents=[
 {title:'工程時機，決定重作與協調的成本。',copy:'原簡報對照「原工程一併執行」與「完工後變更施作」兩種路徑。把材料識別在工程階段對齊，可減少再申請、拆改與現場復原的重複工序。',image:'brand-rollout-workflow.png',caption:'本次上傳資料 / 執行時機之工序差異：隱形成本的來源'},
 {title:'把品牌更新，放進可比較的決策。',copy:'原簡報案例列出原工程直接執行 NT$70,200，完工後變更總額 NT$251,460，差額 NT$181,260（約增加 258%）。此為原稿的情境比較，呈現提早整合的成本邏輯。',image:'brand-rollout-cost.png',caption:'本次上傳資料 / 財務對比矩陣，金額為原簡報案例估算'},
 {title:'把設計、營運與工程放在同一張圖上。',copy:'原稿提出在施工階段同步導入識別磁磚，並以品牌一致性、降低二次施工干擾與成本紀律，作為決策依據。圖中的門店數量為原簡報提案範圍，不代表已完成數量。',image:'brand-rollout-decision.png',caption:'本次上傳資料 / 導入決策提案；現況與導入後合成示意'}
 ];
 const scenes=[
 {image:'store-front.jpg',caption:'城市街景 / 實驗店門面實景'},
 {image:'store-entry.jpg',caption:'騎樓入口 / 專屬材料與入口界面實景'},
 {image:'store-community.jpg',caption:'室內空間 / 實驗店共享交流區實景'}
 ];
 const gallery=[
 ['視覺','store-logo-grid.jpg','標誌組合與基準','原始視覺規範','以基準單位整理標誌與標準字。'],
 ['視覺','store-wordmark.jpg','中文標準字調整','原始視覺規範','字形、筆畫與間距的系統整理。'],
 ['視覺','store-colours.jpg','品牌標準色','原始視覺規範','信義紅、信義綠與白色的共同語言。'],
 ['材料','tile-real.jpg','立體材料與自然光','原始材料測試','綠色單元在自然光下的形體與表面。'],
 ['材料','store-material-test.jpg','色彩與光線的驗證','原始測試模型','透過不同色彩觀察立體表面的變化。'],
 ['材料','store-patterns.jpg','模組排列的可能','原始設計方案','同一單元延伸出多種組合節奏。'],
 ['材料','brand-material-model.jpg','從品牌精神到形體','原始材料模型','「人」與竹的語意化為客製材料。'],
 ['空間','store-front.jpg','城市中的品牌輪廓','落地實景','招牌、材料與門面共同構成識別。'],
 ['空間','store-entry.jpg','步行尺度的入口','落地實景','騎樓、入口與專屬立體材料的連結。'],
 ['空間','store-community.jpg','走進共享的日常','落地實景','品牌由視覺延伸至交流與服務情境。'],
 ['空間','brand-store-existing.jpg','既有門面條件','既有門面實景','識別磁磚導入資料中的現場基礎。'],
 ['空間','brand-store-proposed.jpg','門店材料導入','設計合成示意','客製磁磚應用於同一門面，非完工照片。']
 ];
 let systemIndex=0,visualIndex=0,sceneIndex=0,origin='#home',originScroll=0,focusBefore=null,frame=0,observer=null,videoObserver=null,navLock=0,sceneLock=0,currentSection=1;
 const animations=new Set();
 function animate(el,frames,options={}){if(reduced.matches||!el?.animate)return;const a=el.animate(frames,{duration:500,easing:'cubic-bezier(.2,.7,.2,1)',...options});animations.add(a);a.finished.then(()=>animations.delete(a),()=>animations.delete(a));}
 function tabset(attr,panel,render){const buttons=qa('['+attr+']');function set(n,motion=true){n=clamp(n,0,buttons.length-1);buttons.forEach((b,i)=>{b.setAttribute('aria-selected',String(i===n));b.setAttribute('tabindex',i===n?'0':'-1')});q(panel).setAttribute('aria-labelledby',buttons[n].id);render(n);if(motion)animate(q(panel),[{opacity:.4,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}]);}buttons.forEach((b,i)=>{b.onclick=()=>set(i);b.onkeydown=e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();e.stopPropagation();const n=e.key==='Home'?0:e.key==='End'?buttons.length-1:wrap(i+(e.key==='ArrowRight'?1:-1),buttons.length);set(n);buttons[n].focus({preventScroll:true})}});set(0,false);return set}
 tabset('data-br-system','#br-system-panel',n=>{systemIndex=n;const x=systems[n];q('#br-system-kicker').textContent=x.k;q('#br-system-title').textContent=x.title;q('#br-system-copy').textContent=x.copy;q('#br-system-image').src=imgPath(x.image);q('#br-system-image').alt=x.caption;q('#br-system-caption').textContent=x.caption;q('#br-system-tags').replaceChildren(...x.tags.map(t=>{const s=document.createElement('span');s.textContent=t;return s}))});
 q('#br-system-zoom').onclick=()=>zoom(imgPath(systems[systemIndex].image),systems[systemIndex].caption);
 tabset('data-br-visual','#br-visual-panel',n=>{visualIndex=n;const x=visuals[n];q('#br-visual-title').textContent=x.title;q('#br-visual-copy').textContent=x.copy;q('#br-visual-image').src=imgPath(x.image);q('#br-visual-image').alt=x.caption;q('#br-visual-caption').textContent=x.caption});
 q('#br-visual-zoom').onclick=()=>zoom(imgPath(visuals[visualIndex].image),visuals[visualIndex].caption);
 let documentIndex=0;
 tabset('data-br-document','#br-document-panel',n=>{documentIndex=n;const x=documents[n];q('#br-document-title').textContent=x.title;q('#br-document-copy').textContent=x.copy;q('#br-document-image').src=imgPath(x.image);q('#br-document-image').alt=x.caption;q('#br-document-caption').textContent=x.caption});
 q('#br-document-zoom').onclick=()=>zoom(imgPath(documents[documentIndex].image),documents[documentIndex].caption);

 qa('[data-br-source]').forEach(b=>b.onclick=()=>zoom(imgPath(b.dataset.brSource),b.dataset.brCaption));
 for(let n=0;n<16;n++){const cell=document.createElement('span'),image=document.createElement('img');image.src=imgPath('store-tile.jpg');image.alt='';image.loading='lazy';cell.append(image);q('#br-tile-grid').append(cell)}
 const patterns={aligned:'同向連續：讓單元的折面累積成有秩序的線條。',alternate:'交錯轉向：相鄰單元形成開合與交織的節奏。',rotate:'四向聚合：由同一單元形成向心與展開的圖形。'};
 function setPattern(name){if(!Object.hasOwn(patterns,name))return;qa('[data-br-pattern]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.brPattern===name)));qa('#br-tile-grid img').forEach((img,i)=>{const r=Math.floor(i/4),c=i%4,angle=name==='aligned'?0:name==='alternate'?(r+c)%2*180:((r%2)*2+c%2)*90;img.style.setProperty('--br-angle',angle+'deg')});q('#br-pattern-copy').textContent=patterns[name];q('#br-tile-grid').setAttribute('aria-label','四乘四原始材料單元的排列示意。'+patterns[name]);}qa('[data-br-pattern]').forEach(b=>b.onclick=()=>setPattern(b.dataset.brPattern));setPattern('aligned');
 function setScene(n,motion=true){n=clamp(n,0,2);const changed=n!==sceneIndex;sceneIndex=n;const x=scenes[n];if(changed){q('#br-scene-image').src=imgPath(x.image);q('#br-scene-image').alt=x.caption;q('#br-scene-caption').textContent=x.caption;}q('.br-scene-count').textContent=String(n+1).padStart(2,'0')+' / 03';qa('[data-br-scene]').forEach((el,i)=>el.classList.toggle('is-current',i===n));qa('[data-br-scene-jump]').forEach((b,i)=>b.setAttribute('aria-pressed',String(i===n)));if(changed&&motion)animate(q('#br-scene-image'),[{opacity:.35,transform:'scale(1.025)'},{opacity:1,transform:'scale(1)'}],{duration:650})}
 q('#br-scene-zoom').onclick=()=>zoom(imgPath(scenes[sceneIndex].image),scenes[sceneIndex].caption);
 qa('[data-br-scene-jump]').forEach((b,i)=>b.onclick=()=>{setScene(i);sceneLock=performance.now()+1100;activate(5);const el=qa('[data-br-scene]')[i],mobile=matchMedia('(max-width:700px)').matches,offset=mobile?q('.br-spatial-sticky').getBoundingClientRect().height+24:Math.max(20,(root.clientHeight-el.getBoundingClientRect().height)/2);root.scrollTo({top:el.getBoundingClientRect().top-root.getBoundingClientRect().top+root.scrollTop-offset,behavior:reduced.matches?'instant':'smooth'})});
 function compare(){const v=clamp(Number(q('#br-compare').value)||0,0,100);q('.br-comparison').style.setProperty('--br-compare',v+'%');q('#br-compare-value').textContent=v+'%';q('#br-compare').setAttribute('aria-valuetext','材料導入示意顯示 '+v+'%')}q('#br-compare').addEventListener('input',compare);compare();
 function renderGallery(filter){qa('[data-br-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.brFilter===filter)));const items=gallery.filter(x=>filter==='全部'||x[0]===filter);q('#br-gallery-count').textContent='顯示 '+items.length+' / '+gallery.length+' 件資料 · 點擊放大原圖';q('#br-gallery').replaceChildren(...items.map(x=>{const b=document.createElement('button');b.type='button';b.className='br-gallery-card';b.dataset.kind=x[0];b.setAttribute('aria-label','放大 '+x[2]+'，'+x[3]);const photo=document.createElement('span');photo.className='br-gallery-photo';const img=document.createElement('img');img.src=imgPath(x[1]);img.alt=x[2]+' / '+x[3];img.loading='lazy';const arrow=document.createElement('b');arrow.textContent='↗';arrow.setAttribute('aria-hidden','true');photo.append(img,arrow);const meta=document.createElement('small');meta.textContent=x[0]+' / '+x[3];const title=document.createElement('strong');title.textContent=x[2];const copy=document.createElement('p');copy.textContent=x[4];b.append(photo,meta,title,copy);b.onclick=()=>zoom(imgPath(x[1]),x[2]+' / '+x[3]+'。'+x[4]);return b}));}qa('[data-br-filter]').forEach(b=>b.onclick=()=>renderGallery(b.dataset.brFilter));renderGallery('全部');
 function route(){const hash=location.hash;if(/^#brand\/[1-6]$/.test(hash))return +hash.slice(7);if(/^#case\/identity(?:\/\d+)?$/.test(hash))return 1;if(/^#case\/material(?:\/\d+)?$/.test(hash))return 1;return null}
 function activate(n){currentSection=n;qa('.br-header [data-br-jump]').forEach(b=>b.setAttribute('aria-current',+b.dataset.brJump===n?'location':'false'));if(view.open)history.replaceState({brandSection:n},'','#brand/'+n)}
 function go(n,instant=false){n=clamp(+n||1,1,6);navLock=performance.now()+(instant||reduced.matches?100:1000);activate(n);const el=q('#br-section-'+n);root.scrollTo({top:Math.max(0,el.getBoundingClientRect().top-root.getBoundingClientRect().top+root.scrollTop),behavior:instant||reduced.matches?'instant':'smooth'})}
 qa('[data-br-jump]').forEach(b=>b.onclick=()=>go(b.dataset.brJump));
 function sync(){frame=0;if(!view.open)return;const rect=root.getBoundingClientRect(),height=root.clientHeight||rect.height||1;const progress=clamp(root.scrollTop/Math.max(1,root.scrollHeight-height),0,1);q('.br-progress span').style.transform='scaleX('+progress+')';if(!reduced.matches){view.style.setProperty('--br-hero-shift',clamp(root.scrollTop*.13,0,100)+'px');const list=qa('.br-manifesto>p'),area=q('.br-manifesto').getBoundingClientRect(),step=clamp(Math.floor((rect.top+height*.75-area.top)/Math.max(1,area.height/4)),0,3);list.forEach((p,i)=>p.classList.toggle('is-current',i===step));}if(performance.now()>=sceneLock){const mobile=matchMedia('(max-width:700px)').matches,line=rect.top+height*(mobile?.78:.5);let n=0;qa('[data-br-scene]').forEach((el,i)=>{if(el.getBoundingClientRect().top<line)n=i});setScene(n)}if(performance.now()>=navLock){let n=1;qa('[data-br-section]').forEach(el=>{if(el.getBoundingClientRect().top<rect.top+height*.3)n=+el.dataset.brSection});if(n!==currentSection)activate(n)}}
 function requestSync(){if(!frame)frame=requestAnimationFrame(sync)}root.addEventListener('scroll',requestSync,{passive:true});root.addEventListener('scrollend',()=>{navLock=0;sceneLock=0;requestSync()});window.addEventListener('resize',()=>{if(view.open)requestSync()});
 function reveal(){observer?.disconnect();if(reduced.matches||typeof IntersectionObserver==='undefined'){qa('.br-reveal-ready').forEach(el=>el.classList.add('br-visible'));return}observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('br-visible');observer.unobserve(e.target)}}),{root,threshold:.04});qa('.br-heading,.br-role,.br-system-tabs,.br-visual-workbench,.br-material-story,.br-material-lab,.br-rollout-cards,.br-credits').forEach(el=>{el.classList.add('br-reveal-ready');observer.observe(el)});}
 const video=q('#br-material-video');if(typeof IntersectionObserver!=='undefined'){videoObserver=new IntersectionObserver(entries=>{if(entries.some(e=>!e.isIntersecting)&&!video.paused)video.pause()},{root,threshold:0});videoObserver.observe(video)}
 function open(source=null,options={}){if(!view.open){const hash=location.hash;origin=/^#(?:brand\/|case\/)/.test(hash)?'#showcase':hash||'#home';originScroll=window.scrollY||0;focusBefore=source||document.activeElement;if(document.querySelector('#case-view')?.open)closeCase(true,true);if(document.querySelector('#case-index')?.open)document.querySelector('#case-index').close();if(document.querySelector('#store-experience')?.open)window.closeStoreExperience?.(true);view.showModal();document.body.classList.add('locked');if(!options.fromHistory)history.pushState({brandSection:options.section||1},'','#brand/'+(options.section||1));view.dataset.motion=reduced.matches?'reduce':'full';animate(view,[{opacity:.2,clipPath:'inset(5% 5% 5% 5%)'},{opacity:1,clipPath:'inset(0 0 0 0)'}],{duration:600});animate(q('.br-network-lines'),[{strokeDashoffset:1600},{strokeDashoffset:0}],{duration:1600,fill:'forwards'});reveal();}go(options.section||route()||1,true);q('#br-close').focus({preventScroll:true});requestSync()}
 function close(fromHistory=false){if(!view.open)return;observer?.disconnect();if(frame)cancelAnimationFrame(frame);frame=0;animations.forEach(a=>a.cancel());animations.clear();video.pause();view.close();if(!['#case-view','#store-experience','#zyxel-view','#practice-reader'].some(s=>document.querySelector(s)?.open))document.body.classList.remove('locked');if(!fromHistory){history.replaceState(null,'',origin);window.scrollTo({top:originScroll,behavior:'instant'});const target=focusBefore?.isConnected?focusBefore:document.querySelector('[data-brand-entry]');target?.focus({preventScroll:true})}}
 window.openBrandExperience=open;window.closeBrandExperience=close;document.querySelectorAll('[data-brand-entry]').forEach(b=>b.onclick=()=>open(b));q('#br-close').onclick=()=>close();q('#br-return').onclick=()=>close();view.addEventListener('cancel',e=>{e.preventDefault();close()});
 window.addEventListener('popstate',()=>{const n=route();if(n)open(null,{fromHistory:true,section:n});else if(view.open)close(true)});
 reduced.addEventListener?.('change',()=>{view.dataset.motion=reduced.matches?'reduce':'full';if(reduced.matches){animations.forEach(a=>a.cancel());animations.clear();qa('.br-reveal-ready').forEach(el=>el.classList.add('br-visible'))}else if(view.open)reveal()});
 const initial=route();if(initial)open(null,{fromHistory:true,section:initial});
})();
