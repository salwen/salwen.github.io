/* Interactive portfolio: circular selection, reversible reading and source-aware images. */
'use strict';
let coverVisible=false;
const motionReduced=matchMedia('(prefers-reduced-motion:reduce)');
const mod=(a,n)=>((a%n)+n)%n;
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fan=$('#fan');
const wheel={list:cases,position:0,target:0,velocity:0,frame:0,selected:-1,grid:false,drag:null,suppressUntil:0,source:0};
function wheelDelta(i){return mod(i-wheel.position+wheel.list.length/2,wheel.list.length)-wheel.list.length/2}
function wheelCurrent(){return wheel.list[mod(Math.round(wheel.position),wheel.list.length)]}
function drawWheel(){
 const n=wheel.list.length,w=fan.clientWidth,small=w<700,radius=small?790:Math.max(1050,w*.86);
 [...fan.children].forEach((card,i)=>{
  const d=wheelDelta(i),angle=d*.188,x=Math.sin(angle)*radius,y=(1-Math.cos(angle))*radius*.65;
  const visible=wheel.grid||Math.abs(d)<3.7;
  card.style.visibility=visible?'visible':'hidden';card.setAttribute('aria-hidden',!visible);
  card.style.transform=wheel.grid?'none':`translate(-50%,-50%) translate3d(${x}px,${y}px,${-Math.abs(d)*30}px) rotate(${d*9.2}deg) scale(${1-Math.min(Math.abs(d),5)*.045})`;
  card.style.opacity=wheel.grid?'1':String(Math.max(.18,1-Math.abs(d)*.19));card.style.zIndex=String(30-Math.round(Math.abs(d)*3));
  card.tabIndex=wheel.grid||Math.abs(d)<.51?0:-1;card.classList.toggle('is-selected',Math.abs(d)<.51);
  card.setAttribute('aria-label',`第 ${i+1} 個，共 ${n} 個：${wheel.list[i].short||wheel.list[i].title}。${Math.abs(d)<.51||wheel.grid?'開啟案例':'點選置中'}`);
 });
 const active=mod(Math.round(wheel.position),n),c=wheel.list[active];
 if(wheel.selected!==active){wheel.selected=active;$('#wheel-position').textContent=String(active+1).padStart(2,'0')+' / '+String(n).padStart(2,'0')+' · '+c.cat;$('#wheel-title').textContent=c.short||c.title;$('#wheel-summary').textContent=c.contribution||c.summary;$('#wheel-open').setAttribute('aria-label','深入閱讀：'+c.title);$('#wheel-announce').textContent='目前專案：'+c.short;}
}
function settleWheel(){
 wheel.frame=0;
 if(wheel.drag?.moving)return;
 const gap=wheel.target-wheel.position;
 wheel.velocity=(wheel.velocity+gap*.11)*.72;wheel.position+=wheel.velocity;
 if(Math.abs(gap)<.001&&Math.abs(wheel.velocity)<.001){wheel.position=wheel.target;wheel.velocity=0;drawWheel();return}
 drawWheel();wheel.frame=requestAnimationFrame(settleWheel);
}
function rotateWheel(target,immediate=false){wheel.target=target;if(motionReduced.matches||immediate){cancelAnimationFrame(wheel.frame);wheel.frame=0;wheel.position=target;wheel.velocity=0;drawWheel()}else if(!wheel.frame)wheel.frame=requestAnimationFrame(settleWheel)}
function renderWheel(category='全部'){
 const old=wheelCurrent()?.id;wheel.list=cases.filter(c=>category==='全部'||c.cat===category);wheel.selected=-1;fan.replaceChildren();
 wheel.list.forEach((c,i)=>{const b=document.createElement('button');b.className='wheel-card';b.type='button';b.style.setProperty('--tone',tone[c.cat]);b.innerHTML=`<span class="card-surface"><span class="card-meta">${String(cases.indexOf(c)+1).padStart(2,'0')} / ${esc(c.cat)}</span><strong>${esc(c.short||c.title)}</strong><span class="card-photo"><img src="${imgPath(imageFor(c))}" alt="${esc(captions[imageFor(c)]||c.title)}" loading="lazy"></span><span class="card-foot">${esc(c.tag)} <b>↗</b></span></span>`;b.onclick=()=>{if(performance.now()<wheel.suppressUntil)return;const d=wheelDelta(i);if(!wheel.grid&&Math.abs(d)>.18)rotateWheel(wheel.position+d);else openCase(c.id,b)};fan.append(b)});
 $('#wheel-total').textContent=wheel.list.length+' 個專案';rotateWheel(Math.max(0,wheel.list.findIndex(c=>c.id===old)),true);
}
function setWheelMode(grid){wheel.grid=grid;fan.classList.toggle('is-grid',grid);fan.classList.toggle('is-wheel',!grid);$('#fan-toggle').setAttribute('aria-pressed',grid);$('#fan-toggle').textContent=grid?'切換動態轉盤 ◇':'切換全部卡牌總覽 ▦';fan.setAttribute('aria-roledescription',grid?'專案總覽':'carousel');drawWheel()}
$('#fan-toggle').onclick=()=>setWheelMode(!wheel.grid);
$('#wheel-filter').onchange=e=>renderWheel(e.target.value);
$('#wheel-prev').onclick=()=>rotateWheel(Math.round(wheel.target)-1);$('#wheel-next').onclick=()=>rotateWheel(Math.round(wheel.target)+1);$('#wheel-open').onclick=()=>openCase(wheelCurrent().id,$('#wheel-open'));
fan.addEventListener('keydown',e=>{if(wheel.grid)return;if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();rotateWheel(e.key==='Home'?0:e.key==='End'?wheel.list.length-1:Math.round(wheel.target)+(e.key==='ArrowRight'?1:-1))}else if(e.key==='Enter'&&e.target===fan){e.preventDefault();openCase(wheelCurrent().id,fan)}});
fan.addEventListener('pointerdown',e=>{if(wheel.grid||e.button!==0)return;cancelAnimationFrame(wheel.frame);wheel.frame=0;wheel.velocity=0;wheel.drag={x:e.clientX,y:e.clientY,start:wheel.position,lastX:e.clientX,lastTime:performance.now(),vx:0,id:e.pointerId,moving:false};});
fan.addEventListener('pointermove',e=>{const d=wheel.drag;if(!d)return;const dx=e.clientX-d.x,dy=e.clientY-d.y;if(!d.moving&&Math.abs(dx)>7&&Math.abs(dx)>Math.abs(dy)){d.moving=true;fan.setPointerCapture(e.pointerId);fan.classList.add('dragging')}if(!d.moving)return;const now=performance.now();d.vx=(e.clientX-d.lastX)/Math.max(1,now-d.lastTime);d.lastX=e.clientX;d.lastTime=now;wheel.position=d.start-dx/(fan.clientWidth<700?145:210);wheel.target=wheel.position;drawWheel();});
function releaseWheel(e){const d=wheel.drag;if(!d)return;if(d.moving){wheel.suppressUntil=performance.now()+400;const momentum=Math.max(-2,Math.min(2,-d.vx*.8));wheel.drag=null;rotateWheel(Math.round(wheel.position+momentum));fan.classList.remove('dragging');if(fan.hasPointerCapture(e.pointerId))fan.releasePointerCapture(e.pointerId)}else{wheel.drag=null;rotateWheel(Math.round(wheel.position))}}
fan.addEventListener('pointerup',releaseWheel);fan.addEventListener('pointercancel',releaseWheel);
window.addEventListener('pointerup',e=>{if(wheel.drag&&!wheel.drag.moving)releaseWheel(e)});
fan.addEventListener('wheel',e=>{if(wheel.grid||e.ctrlKey)return;const horizontal=Math.abs(e.deltaX)>Math.abs(e.deltaY)*.65||e.shiftKey;if(!horizontal)return;e.preventDefault();const delta=e.shiftKey?e.deltaY:e.deltaX;rotateWheel(wheel.target+Math.max(-1.7,Math.min(1.7,delta*.006)));clearTimeout(wheel.wheelTimer);wheel.wheelTimer=setTimeout(()=>rotateWheel(Math.round(wheel.target)),130)},{passive:false});
window.addEventListener('resize',drawWheel,{passive:true});renderWheel();

const view=$('#case-view'),reading=$('.case-reading'),layout=$('.case-layout'),lightbox=$('#lightbox'),caseIndex=$('#case-index');
const chapterLabels=['問題命題','策略判斷','專業細節','角色與交付','價值與驗證','未來機會'];
let currentCase=0,currentImage=0,currentChapter=0,focusBefore=null,caseOrigin='#showcase',originScroll=0,originWasDeep=false,readerObserver=null,chapterLockUntil=0,closing=false;
let explorerSelection={};
function explorerMarkup(ch,i){
 if(!ch.explorer)return '';
 return `<div class="case-explorer ${ch.explorer.kind}"><div class="explorer-tabs" role="tablist" aria-label="${esc(ch.explorer.label)}">${ch.explorer.items.map((item,j)=>`<button type="button" role="tab" id="explorer-${i}-${j}" data-explorer="${i}" data-option="${j}" aria-controls="explorer-panel-${i}" aria-selected="${j===0}" tabindex="${j===0?0:-1}">${ch.explorer.kind==='workflow'?'<small>0'+(j+1)+'</small>':''}${esc(item.label)}</button>`).join('')}</div><div class="explorer-panel" role="tabpanel" id="explorer-panel-${i}" aria-labelledby="explorer-${i}-0" tabindex="0"></div></div>`;
}
function chooseExplorer(chapter,option,sync=true){
 const items=currentProject().chapters[chapter].explorer.items,item=items[option];explorerSelection[chapter]=option;
 $$(`[data-explorer="${chapter}"]`).forEach((b,j)=>{b.setAttribute('aria-selected',j===option?'true':'false');b.tabIndex=j===option?0:-1});
 const panel=$('#explorer-panel-'+chapter);panel.setAttribute('aria-labelledby',`explorer-${chapter}-${option}`);panel.innerHTML=`<span class="explorer-eyebrow">${esc(item.eyebrow)}</span><h4>${esc(item.title)}</h4><p>${esc(item.body)}</p><button class="explorer-image" type="button" aria-label="放大${esc(item.label)}圖像"><img src="${imgPath(item.image)}" alt="${esc(captions[item.image])}"></button><span class="explorer-source">${esc(item.source)}<br>圖像同步切換・點擊可放大 ↗</span>`;
 panel.querySelector('.explorer-image').onclick=()=>zoom(imgPath(item.image),captions[item.image]);
 if(sync)showImage(currentProject().images.indexOf(item.image));
}
function currentProject(){return cases[currentCase]}
function showImage(n){
 const c=currentProject();currentImage=mod(n,c.images.length);const name=c.images[currentImage],img=$('.case-image img');
 if(img.dataset.file!==name){img.dataset.file=name;img.src=imgPath(name);img.alt=captions[name]||c.title;if(!motionReduced.matches)img.animate([{opacity:.25,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],{duration:360,easing:'ease-out'})}
 $('.case-image figcaption').textContent=captions[name]||c.title;$('#image-position').textContent=`${currentImage+1} / ${c.images.length}`;$('#image-prev').disabled=$('#image-next').disabled=c.images.length===1;
 $$('#case-thumbnails button').forEach((b,i)=>b.setAttribute('aria-current',i===currentImage?'true':'false'));
}
function updateChapter(n,sync=true){
 const c=currentProject();currentChapter=Math.max(0,Math.min(c.chapters.length-1,n));
 $$('.chapter').forEach((el,i)=>el.classList.toggle('active',i===currentChapter));$$('#case-chapter-tabs button').forEach((b,i)=>{b.classList.toggle('active',i===currentChapter);b.setAttribute('aria-current',i===currentChapter?'step':'false')});
 $('#chapter-position').textContent=String(currentChapter+1).padStart(2,'0')+' / '+String(c.chapters.length).padStart(2,'0')+' · '+chapterLabels[currentChapter];$('#chapter-prev').disabled=currentChapter===0;$('#chapter-next').disabled=currentChapter===c.chapters.length-1;$('.case-progress span').style.width=(currentChapter+1)/c.chapters.length*100+'%';
 if(sync){const ch=c.chapters[currentChapter],name=ch.explorer?ch.explorer.items[explorerSelection[currentChapter]||0].image:ch.image||c.images[Math.min(currentChapter,c.images.length-1)];showImage(Math.max(0,c.images.indexOf(name)))}
 if(view.open)history.replaceState({portfolioCase:c.id},'','#case/'+c.id+'/'+(currentChapter+1));
}
function readerRoot(){return matchMedia('(max-width:760px)').matches?layout:reading}
function jumpChapter(n,instant=false){const c=currentProject();n=Math.max(0,Math.min(c.chapters.length-1,n));chapterLockUntil=performance.now()+(instant?100:650);updateChapter(n);const target=$$('.chapter')[n],root=readerRoot(),toolbar=$('.reader-toolbar');const offset=toolbar.offsetHeight+18;const y=target.getBoundingClientRect().top-root.getBoundingClientRect().top+root.scrollTop-offset;root.scrollTo({top:y,behavior:instant||motionReduced.matches?'instant':'smooth'})}
function observeReader(){
 if(readerObserver)readerObserver.disconnect();const ratios=new Map();readerObserver=new IntersectionObserver(entries=>{entries.forEach(e=>ratios.set(e.target,e.isIntersecting?e.intersectionRatio:0));if(performance.now()<chapterLockUntil)return;const visible=[...ratios].filter(([,r])=>r>0).sort((a,b)=>b[1]-a[1]);if(visible.length)updateChapter(+visible[0][0].dataset.caseChapter)},{root:readerRoot(),threshold:[0,.15,.35,.6,.8],rootMargin:'-105px 0px -24% 0px'});$$('.chapter').forEach(el=>readerObserver.observe(el));
}
function openCase(id,source=null,options={}){
 if(['network','experiment'].includes(id)&&window.openStoreExperience){window.openStoreExperience(source,{...options,section:id==='network'?2:6});return;}
 if(id==='zyxel'&&window.openZyxelExperience){window.openZyxelExperience(source,options);return;}
 const index=cases.findIndex(c=>c.id===id);if(index<0)return;
 if(caseIndex.open)caseIndex.close();
 const alreadyOpen=view.open;
 if(!alreadyOpen){focusBefore=source||document.activeElement;originScroll=scrollY;originWasDeep=location.hash.startsWith('#case/');caseOrigin=location.hash.startsWith('#case/')?'#showcase':location.hash||'#showcase'}
 currentCase=index;currentChapter=0;currentImage=0;explorerSelection={};closing=false;const c=currentProject();
 $('.case-meta').textContent=`${String(index+1).padStart(2,'0')} / ${cases.length} · ${c.cat} · ${c.status}`;$('#case-title').textContent=c.short||c.title;$('.case-summary').textContent=c.contribution||c.summary;$('.case-visual').style.setProperty('--case-tone',tone[c.cat]);view.style.setProperty('--case-tone',tone[c.cat]);$('.case-credits').textContent='協作與角色｜'+c.credit+'。';
 $('#case-deliverables').innerHTML='<span>HOWARD / 專業範圍</span><p>'+esc(c.role)+'</p>';
 $('#case-media').hidden=!c.media;if(c.media)$('#case-media').innerHTML='<span>WATCH THE PRODUCT</span><strong>▶ '+esc(c.media.title)+'</strong><small>'+esc(c.media.duration)+' / 原始官網影片</small>';
 $('#case-thumbnails').innerHTML=c.images.map((name,i)=>`<button aria-label="查看第 ${i+1} 張：${esc(captions[name]||c.title)}"><img src="${imgPath(name)}" alt="" loading="lazy"></button>`).join('');$$('#case-thumbnails button').forEach((b,i)=>b.onclick=()=>showImage(i));
 $('#case-chapter-tabs').innerHTML=c.chapters.map((ch,i)=>`<button data-reader-tab="${i}" aria-controls="reading-${c.id}-${i}" aria-current="${i===0?'step':'false'}"><small>0${i+1}</small>${chapterLabels[i]}</button>`).join('');$$('[data-reader-tab]').forEach((b,i)=>b.onclick=()=>jumpChapter(i));
 $('#chapter-list').innerHTML=c.chapters.map((ch,i)=>`<section id="reading-${c.id}-${i}" class="chapter ${i===0?'active':''} ${ch.hypothesis?'is-hypothesis':''}" data-case-chapter="${i}" aria-label="第${i+1}章 ${chapterLabels[i]}"><span class="chapter-kicker">0${i+1} / ${['CONTEXT','STRATEGY','CRAFT','CONTRIBUTION','VALUE','NEXT POSSIBILITY'][i]}</span><h3>${esc(ch.title)}</h3><p>${esc(ch.body)}</p>${explorerMarkup(ch,i)}${ch.items?'<ul class="chapter-items">'+ch.items.map(item=>'<li>'+esc(item)+'</li>').join('')+'</ul>':''}${ch.focus?'<p class="chapter-note">'+esc(ch.focus)+'</p>':''}<div class="chapter-next-line">${i<5?'<button class="underlink" data-next-chapter="'+(i+1)+'">下一章：'+chapterLabels[i+1]+' ↓</button>':'<div class="next-project"><span>WHAT’S NEXT / 下一個視角</span><button id="next-project-open"><img src="'+imgPath(cases[mod(index+1,cases.length)].images[0])+'" alt=""><strong>'+esc(cases[mod(index+1,cases.length)].short)+' <b>↗</b></strong></button><button class="underlink" id="reader-related">或查看所有專案 ▦</button></div>'}</div></section>`).join('');
 c.chapters.forEach((ch,i)=>{if(ch.explorer)chooseExplorer(i,0,false)});
 $$('[data-explorer]').forEach(b=>{b.onclick=()=>chooseExplorer(+b.dataset.explorer,+b.dataset.option);b.onkeydown=e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();e.stopPropagation();const ch=+b.dataset.explorer,len=c.chapters[ch].explorer.items.length,j=e.key==='Home'?0:e.key==='End'?len-1:mod(+b.dataset.option+(e.key==='ArrowRight'?1:-1),len);chooseExplorer(ch,j);$(`#explorer-${ch}-${j}`).focus({preventScroll:true})}});
 $$('[data-next-chapter]').forEach(b=>b.onclick=()=>jumpChapter(+b.dataset.nextChapter));$('#reader-related').onclick=openCaseIndex;$('#next-project-open').onclick=()=>openCase(cases[mod(index+1,cases.length)].id);
 const sourceBox=$('#case-sources');sourceBox.open=false;sourceBox.querySelector('div').innerHTML='<p>協作與角色：'+esc(c.credit)+'</p>'+c.sources.map(s=>'<p>— '+esc(s)+'</p>').join('')+(c.sourceLinks||[]).map(s=>'<p><a class="underlink" target="_blank" rel="noopener" href="'+esc(s.url)+'">'+esc(s.label)+' ↗</a></p>').join('');$('#case-external').hidden=c.id!=='oracle';$('#case-external').href='https://yijing-oracle-path.howardlo.chatgpt.site/19.html#home';
 $('#prev-case').setAttribute('aria-label','前一案：'+cases[mod(index-1,cases.length)].short);$('#next-case').setAttribute('aria-label','下一案：'+cases[mod(index+1,cases.length)].short);
 if(!alreadyOpen){view.showModal();document.body.classList.add('locked');if(!options.fromHistory)history.pushState({portfolioCase:c.id},'','#case/'+c.id+'/1');if(!motionReduced.matches){const rect=source?.getBoundingClientRect?.();const clip=rect&&rect.width&&rect.top>=0?`inset(${rect.top}px ${Math.max(0,innerWidth-rect.right)}px ${Math.max(0,innerHeight-rect.bottom)}px ${Math.max(0,rect.left)}px round 14px)`:'inset(8% 8% 8% 8% round 18px)';view.animate([{clipPath:clip,opacity:.4},{clipPath:'inset(0% 0% 0% 0% round 0px)',opacity:1}],{duration:530,easing:'cubic-bezier(.22,.7,.2,1)'})}}
 else if(!motionReduced.matches)layout.animate([{opacity:.3,transform:'translateX(16px)'},{opacity:1,transform:'translateX(0)'}],{duration:320,easing:'ease-out'});
 layout.scrollTop=0;reading.scrollTop=0;$('.case-visual').scrollTop=0;showImage(0);updateChapter(0);chapterLockUntil=performance.now()+200;observeReader();$('.case-close').focus({preventScroll:true});
 if(!options.skipCover)showCaseCover();else hideCaseCover(true);
 const wheelIndex=wheel.list.findIndex(x=>x.id===c.id);if(wheelIndex>=0)rotateWheel(wheel.position+wheelDelta(wheelIndex),true);
}
function closeCase(fromHistory=false,instant=false){
 if(closing||!view.open)return;coverVisible=false;closing=true;if(readerObserver)readerObserver.disconnect();
 const finish=()=>{if(caseIndex.open)caseIndex.close();view.close();document.body.classList.remove('locked');if(!fromHistory)history.replaceState(null,'',caseOrigin);if(originWasDeep)$('#showcase').scrollIntoView({behavior:'instant'});else window.scrollTo({top:originScroll,behavior:'instant'});focusBefore?.isConnected&&focusBefore.focus({preventScroll:true});closing=false;};
 if(motionReduced.matches||instant)finish();else view.animate([{opacity:1,transform:'translateY(0)'},{opacity:0,transform:'translateY(22px)'}],{duration:200,easing:'ease-in'}).finished.then(finish).catch(finish);
}
function zoom(src,caption){$('#lightbox img').src=src;$('#lightbox img').alt=caption;$('#lightbox p').textContent=caption;if(!lightbox.open)lightbox.showModal()}
function renderCaseIndex(){const query=$('#index-search').value.trim().toLowerCase(),cat=$('#index-filter').value,list=cases.filter(c=>(cat==='全部'||c.cat===cat)&&JSON.stringify(c).toLowerCase().includes(query));$('#index-grid').innerHTML=list.map(c=>`<button class="index-card" data-index-case="${c.id}" style="--tone:${tone[c.cat]}"><img src="${imgPath(c.images[0])}" alt="${esc(captions[c.images[0]]||c.title)}" loading="lazy"><small>${esc(c.cat)}</small><h3>${esc(c.short||c.title)}</h3><p>${esc(c.contribution||c.summary)}</p><span>${c.id===currentProject().id&&view.open?'正在閱讀':'閱讀案例'} ↗</span></button>`).join('');$$('[data-index-case]').forEach(b=>b.onclick=()=>openCase(b.dataset.indexCase));$('#index-count').textContent=list.length+' / '+cases.length+' 個專案';$('#index-empty').hidden=!!list.length;}
function openCaseIndex(){renderCaseIndex();caseIndex.showModal();$('#index-search').focus({preventScroll:true})}
$('.case-close').onclick=()=>closeCase();view.addEventListener('cancel',e=>{e.preventDefault();closeCase()});$('#all-cases').onclick=openCaseIndex;$('#index-close').onclick=()=>caseIndex.close();$('#index-search').oninput=renderCaseIndex;$('#index-filter').onchange=renderCaseIndex;
$('#prev-case').onclick=()=>openCase(cases[mod(currentCase-1,cases.length)].id);$('#next-case').onclick=()=>openCase(cases[mod(currentCase+1,cases.length)].id);$('#chapter-prev').onclick=()=>jumpChapter(currentChapter-1);$('#chapter-next').onclick=()=>jumpChapter(currentChapter+1);$('#image-prev').onclick=()=>showImage(currentImage-1);$('#image-next').onclick=()=>showImage(currentImage+1);$('#case-image-open').onclick=()=>zoom($('.case-image img').src,$('.case-image figcaption').textContent);$('#lightbox-close').onclick=()=>lightbox.close();lightbox.addEventListener('click',e=>{if(e.target===lightbox)lightbox.close()});
$$('[data-open]').forEach(b=>b.onclick=()=>openCase(b.dataset.open,b));
document.addEventListener('keydown',e=>{if(e.defaultPrevented||$('#media-view').open)return;if(e.key==='Escape'&&!menu.hidden){closeMenu();return}if(coverVisible&&['ArrowDown','PageDown',' '].includes(e.key)){e.preventDefault();hideCaseCover();return}if(!view.open||lightbox.open||caseIndex.open||/INPUT|TEXTAREA|SELECT/.test(e.target.tagName))return;if(e.key==='ArrowRight'){e.preventDefault();$('#next-case').click()}if(e.key==='ArrowLeft'){e.preventDefault();$('#prev-case').click()}if(e.key==='ArrowDown'){e.preventDefault();jumpChapter(currentChapter+1)}if(e.key==='ArrowUp'){e.preventDefault();jumpChapter(currentChapter-1)}});
let touchStart=null;layout.addEventListener('touchstart',e=>{touchStart={x:e.touches[0].clientX,y:e.touches[0].clientY}},{passive:true});layout.addEventListener('touchend',e=>{if(!touchStart||lightbox.open)return;const dx=e.changedTouches[0].clientX-touchStart.x,dy=e.changedTouches[0].clientY-touchStart.y;if(Math.abs(dx)>110&&Math.abs(dx)>Math.abs(dy)*1.6)(dx<0?$('#next-case'):$('#prev-case')).click();touchStart=null},{passive:true});
window.addEventListener('popstate',()=>{if(location.hash.startsWith('#case/')){const [id,n]=location.hash.slice(6).split('/');openCase(id,null,{fromHistory:true,skipCover:+n>1});if(!['zyxel','network','experiment'].includes(id)&&+n>1)requestAnimationFrame(()=>jumpChapter(+n-1,true))}else if(view.open)closeCase(true)});


function showCaseCover(){
 const c=currentProject();coverVisible=true;view.setAttribute('aria-labelledby','cover-title');const cover=$('#case-cover');cover.hidden=false;cover.style.pointerEvents='';$('#cover-meta').textContent='HOWARD LO / '+c.cat+' / '+String(currentCase+1).padStart(2,'0');$('#cover-title').textContent=c.title;$('#cover-line').textContent=c.contribution;$('#cover-role').textContent=c.role;$('#cover-image').src=imgPath(c.images[0]);$('#cover-image').alt=captions[c.images[0]]||c.title;$('#cover-caption').textContent=captions[c.images[0]]||c.title;$('#cover-tag').textContent=c.tag;$('.case-layout').inert=true;if(!motionReduced.matches)cover.animate([{opacity:0},{opacity:1}],{duration:300});$('#cover-start').focus({preventScroll:true});
}
function hideCaseCover(instant=false){
 const cover=$('#case-cover');coverVisible=false;view.setAttribute('aria-labelledby','case-title');$('.case-layout').inert=false;cover.style.pointerEvents='none';const done=()=>{cover.hidden=true;cover.style.pointerEvents='';};if(instant||motionReduced.matches||cover.hidden){done();return}cover.animate([{opacity:1,transform:'translateY(0)'},{opacity:0,transform:'translateY(-55px)'}],{duration:430,easing:'cubic-bezier(.2,.7,.2,1)'}).finished.then(done).catch(done);$('#case-chapter-tabs button').focus({preventScroll:true});
}
$('#cover-start').onclick=()=>hideCaseCover();$('#reader-cover').onclick=showCaseCover;$('#cover-index').onclick=openCaseIndex;
$('#case-cover').addEventListener('wheel',e=>{if(e.deltaY>8&&coverVisible){e.preventDefault();hideCaseCover()}},{passive:false});
$('#case-media').onclick=()=>{const m=currentProject().media;if(!m)return;const v=$('#media-view video');$('#media-title').textContent=m.title;v.poster=imgPath(m.poster);v.src=imgPath(m.file);$('#media-view').showModal();$('#media-close').focus()};
$('#media-close').onclick=()=>$('#media-view').close();$('#media-view').addEventListener('close',()=>{$('#media-view video').pause();$('#media-view video').removeAttribute('src');$('#media-view video').load();$('#case-media').focus({preventScroll:true})});
let coverTouchY=0;$('#case-cover').addEventListener('touchstart',e=>{coverTouchY=e.touches[0].clientY},{passive:true});$('#case-cover').addEventListener('touchend',e=>{if(coverTouchY-e.changedTouches[0].clientY>35)hideCaseCover()},{passive:true});

if(location.hash.startsWith('#case/')&&!['zyxel','network','experiment'].some(id=>location.hash.startsWith('#case/'+id))){const [id,n]=location.hash.slice(6).split('/');openCase(id,null,{fromHistory:true,skipCover:+n>1});if(!['zyxel','network','experiment'].includes(id)&&+n>1)requestAnimationFrame(()=>jumpChapter(+n-1,true))}

let readerResizeTimer;window.addEventListener('resize',()=>{if(!view.open)return;clearTimeout(readerResizeTimer);readerResizeTimer=setTimeout(()=>{observeReader();if(!coverVisible)jumpChapter(currentChapter,true)},120)},{passive:true});
