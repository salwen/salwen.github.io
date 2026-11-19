'use strict';
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const cases=window.HOWARD_CASES;
const tone={'空間策略':'#e2e9c4','品牌文化':'#f1d5c1','材料識別':'#c7ddc7','數位產品':'#d1ddeb','智慧硬體':'#e7dbb5','AI與工具':'#d7cee5'};
const captions={
"zyxel-process-2012.jpg":"2012 UXD／GUI 原始協作流程｜GUI_introduce20120817.ppt",
"zyxel-workflow-2011.jpg":"2011 PM／UED／HCI／供應商協作與交付｜workflow_20110503.pdf",
"zyxel-brick.jpg":"原始網路地圖 GUI｜2012 ZyXEL 專案資料",
"zyxel-fantabox.jpg":"原始 NAS325 介面｜2012 ZyXEL 專案資料",
"zyxel-tube.jpg":"原始 TV／多媒體介面｜2012 ZyXEL 專案資料",
"zyxel-web2.jpg":"原始 ZyWALL USG 200 介面｜2012 ZyXEL 專案資料",
"zyxel-spider.jpg":"原始 ENC 1.0 網管介面｜2012 ZyXEL 專案資料",
"zyxel-responsive.jpg":"原始行動檢視範例｜2012 ZyXEL 專案資料",

"anchor-large-model.jpg":"AnchorGo 大模型檢視與雲端渲染｜2021 產品簡報 p.11",
"anchor-sdk.jpg":"Anchor SDK 格式支援｜2021 產品簡報 p.3",
"anchor-view.jpg":"Anchor View 跨裝置檢視｜2021 產品簡報 p.6",
"anchor-go.jpg":"AnchorGo 3D 檢視與工具｜2021 產品簡報 p.10",
"anchor-map.jpg":"AnchorMAP 管線地理定位｜2021 產品簡報 p.18",
"anchor-track.jpg":"AnchorTrack 追蹤資料檢視｜2021 產品簡報 p.25",
"anchor-projects.jpg":"專案、文件與成員管理介面｜2021 產品簡報 p.13",
"anchor-collaboration.jpg":"模型內容與影音協作情境示意｜2021 產品簡報 p.12",
"anchor-infonode.jpg":"InfoNode 類型與現場應用情境示意｜2021 產品簡報 p.14",
"anchor-work.jpg":"工作日常、團隊討論與產品交流紀錄｜使用者提供 jobphoto.jpg",
"anchor-navigate.jpg":"行動端 3D 模型操作｜操作教學 V1.4 / 06:27",
"anchor-section.jpg":"模型剖切與視角操作｜操作教學 V1.4 / 08:48",
"anchor-annotate.jpg":"模型與文字輸入操作｜操作教學 V1.4 / 09:58",
"anchor-compare.jpg":"模型視角操作示範｜操作教學 V1.4 / 12:19",

 'space.jpg':'內湖店完工實景｜品牌運行策略與機制／實驗店照片',
 'portrait.jpg':'Howard 於 AAMA 生態圈交流會｜2024 工作相簿',
 'aama.jpg':'AAMA 生態圈交流會・空間導覽｜2024 工作紀錄',
 'aama2.jpg':'AAMA 生態圈交流會・品牌空間說明｜2024 工作紀錄',
 'workshop.jpg':'工作坊與共同討論｜信義工作照片相簿',
 'meeting.jpg':'共同討論現場｜信義工作照片相簿',
 'team.jpg':'團隊合影與空間交流｜信義工作照片相簿',
 'daily.jpg':'想，享時光－日常紀實｜居民交流使用紀錄',
 'daily2.jpg':'想，享時光－日常紀實｜服務與使用現場',
 'daily3.jpg':'想，享時光－日常紀實｜工具與生活服務',
 'daily4.jpg':'想，享時光－日常紀實｜日常互動',
 'japan.jpg':'日本東京 IT 博覽會・BIMCloud 展示交流｜原始工作相簿',
 'belgium.jpg':'比利時 Oqton 技術工作交流｜原始工作相簿',
 'tile-real.jpg':'玻璃材料試樣實拍｜材料／馬賽克／設計資料',
 'tile-fire.jpg':'玻璃製作過程實拍｜材料／馬賽克／設計資料',
 'tile-mold.jpg':'造型試樣／模型紀錄｜非門市完工照片',
 'tile-sample.jpg':'材料造型比對紀錄｜原始設計資料',
 'tile-concept.jpg':'人字與竹的文化轉譯｜250816 設計簡報頁10',
 'tile-modules.jpg':'單一元件與排列組合｜250816 設計簡報頁11',
 'brand-color.jpg':'標準色與文化意義｜250820 品牌識別簡報頁81',
 'brand-culture.jpg':'融合：品牌、共享、社區與永續｜250820 簡報頁97',
 'brand-interior.jpg':'室內識別應用提案示意｜250820 簡報頁108・非實景',
 'anniversary.jpg':'45週年「綻放」確認版本｜260604 簡報頁4',
 'anniversary-system.jpg':'45週年符號構成與延伸｜260604 簡報頁7',
 'anniversary-explore.jpg':'45週年「共構」探索提案｜260604 簡報頁27・非確認版本',
 'planner.jpg':'2027 手帳設計情境示意｜原 Keynote 內嵌圖・非量產實拍',
 'calendar.jpg':'2027 桌曆設計情境示意｜原 Keynote 內嵌圖・非量產實拍',
 'planner-symbols.jpg':'2027 產品符號與圖騰設計示意｜原 Keynote 內嵌圖',
 'notebook-structure.jpg':'2027 手帳圖騰展開稿｜原 Keynote 內嵌設計圖',
 'planner-proposal.jpg':'2027 手帳方案情境示意｜原 Keynote 內嵌圖・非實拍',
 'uniform.jpg':'制服形象設計定案資料｜JAMIE WEI HUANG LTD. 設計・3D 示意',
 'uniform-detail.jpg':'制服細節設計資料｜JAMIE WEI HUANG LTD. 設計・3D 示意',
 'service-brand.jpg':'想，享時光品牌定義｜250528 識別簡報頁7',
 'service-story.jpg':'由品牌到交流路徑的故事｜250528 識別簡報頁3',
 'service-character.jpg':'逗號角色的設計探索｜250528 識別簡報頁9',
 'community-map.jpg':'社區配置圖設計資料｜230807 原始專案簡報內嵌圖',
 'kaohsiung.jpg':'高雄行政中心空間介紹資料｜230830 簡報頁4',
 'kaohsiung-plan.jpg':'高雄行政中心一樓規劃圖｜230830 簡報頁9',
 'taichung.jpg':'台中行政中心專案資料｜240620 進度報告頁3',
 'headquarters.jpg':'總部八樓規劃配置｜230717 空間介紹頁7',
 'b2.jpg':'原點 B2 功能分區規劃｜240910 簡報頁10',
 'b2-culture.jpg':'原點 B2 文化與空間定位｜240910 簡報頁5',
 'signing.jpg':'內湖代書所空間配置規劃｜250120 簡報頁8',
 'zyxel.jpg':'跨裝置 GUI 概念｜ZyXEL Router Concept 原始簡報頁10',
 'lipo.png':'Lipo 裝置產品圖｜Powertech／lipo 目錄',
 'o2o.jpg':'APP 功能與組件規範｜居然設計家原始 GUI 規範頁25',
 'model.png':'2D／3D 行動操作與檢視｜2022 作品簡報頁27',
 'aisure.jpg':'Ai-Sure 硬體產品圖｜01AnchorTech／04AiSure',
 'converter-preview.svg':'原始工具功能的重新繪製說明圖｜非操作截圖',
 'oracle-preview.svg':'依實際頁面結構整理的介面示意｜非原網站截圖'
};
function imgPath(n){return 'assets/'+n}
function imageFor(c){return c.images[0]}
let filter='全部',query='';
$$('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.filter==='全部'));
function renderProjects(){const list=cases.filter(c=>(filter==='全部'||c.cat===filter)&&JSON.stringify(c).toLowerCase().includes(query.toLowerCase()));$('#projects').replaceChildren();for(const c of list){const i=cases.indexOf(c);const b=document.createElement('button');b.className='project reveal';b.setAttribute('aria-label','閱讀案例：'+c.title);b.innerHTML=`<div class="project-image"><img src="${imgPath(imageFor(c))}" alt="${captions[imageFor(c)]}" loading="lazy"><span class="open-icon" aria-hidden="true">↗</span></div><div class="project-meta"><span>${String(i+1).padStart(2,'0')} / ${c.cat}</span><span>${c.status}</span></div><h3>${c.title}</h3><p>${c.summary}</p><div class="project-role">${c.role}</div>`;b.onclick=()=>openCase(c.id);$('#projects').append(b)}$('#work-count').textContent=`顯示 ${list.length} / ${cases.length} 個案例 · 每案六章・專業角色與資料依據`;$('#no-results').hidden=!!list.length}
$$('[data-filter]').forEach(b=>b.onclick=()=>{filter=b.dataset.filter;$$('[data-filter]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',x===b)});renderProjects()});$('#project-search').addEventListener('input',e=>{query=e.target.value.trim();renderProjects()});renderProjects();
const menu=$('#menu');
let menuFocus=null;
function closeMenu(){menu.hidden=true;$('#menu-toggle').setAttribute('aria-expanded','false');document.querySelector('main').inert=false;document.querySelector('header').inert=false;document.body.classList.remove('locked');if(menuFocus?.isConnected)menuFocus.focus({preventScroll:true})}
function openMenu(){menuFocus=document.activeElement;menu.hidden=false;$('#menu-toggle').setAttribute('aria-expanded','true');document.querySelector('main').inert=true;document.querySelector('header').inert=true;document.body.classList.add('locked');$('#menu-close').focus()}
$('#menu-toggle').onclick=()=>menu.hidden?openMenu():closeMenu();$('#menu-close').onclick=closeMenu;$$('#menu a').forEach(a=>a.onclick=closeMenu);
menu.addEventListener('keydown',e=>{if(e.key!=='Tab')return;const list=[...menu.querySelectorAll('button,a[href]')];const first=list[0],last=list[list.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}});
const futureData=[{date:'2026 → 2029',title:'專業知識，先變成可靠的小工具。',body:'從本機套版、報價差異整理及現場事件提醒開始，把高頻、可核對的任務變成工作流。AI 負責整理與提出候選，人保留覆核與決策。',base:'已有基礎：Layout Converter 本機封裝；工程資料與品牌版型；HCI 流程設計。',test:'今天要驗證：處理時間、人工修正率、重複使用意願與維護負擔。',chance:'機會假設：以產業小工具提供導入與持續維護服務。'}, {date:'2026 → 2031',title:'把工具、設備與空間，連成服務網絡。',body:'將門市內容、設備事件、會議資源與社區需求串接。從一間店的單點功能，逐步形成跨據點可共享的服務能力。',base:'已有基礎：三代店店型與模組策略；實驗店；AIoT 與協作平台經驗。',test:'今天要驗證：跨據點複製成本、資料一致性、服務採用率與交接可靠度。',chance:'機會假設：軟硬體與現場服務整合，形成可重複部署的解決方案。'}, {date:'2026 → 2036',title:'讓產業經驗，形成可延續的商業能力。',body:'當通用工具更容易取得，差異可能來自產業知識、在地服務與可信任的交付。讓資料、文化與工作方法成為可持續更新的服務。',base:'已有基礎：產品、品牌、專屬材料、實體據點與工程流程的跨域積累。',test:'今天要驗證：服務是否有長期需求、責任是否清楚，以及單位經濟能否持續。',chance:'機會假設：從交付單一工具，延伸至交付持續可衡量的服務。'}];
function future(i){const x=futureData[i];$('#future-content').innerHTML=`<div><span class="eyebrow">${x.date} / STRATEGIC EXPLORATION</span><h3>${x.title}</h3><p>${x.body}</p></div><div><p>${x.base}</p><p class="metric">${x.test}</p><p class="metric">${x.chance}</p></div>`;$$('[data-time]').forEach(b=>{b.setAttribute('aria-selected',+b.dataset.time===i);b.tabIndex=+b.dataset.time===i?0:-1})}$$('[data-time]').forEach(b=>{b.onclick=()=>future(+b.dataset.time);b.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();let n=(+b.dataset.time+(e.key==='ArrowRight'?1:2))%3;future(n);$$('[data-time]')[n].focus()}})});future(0);
const gallery={'日常服務':[['daily.jpg','想，享時光：居民交流與停留'],['daily2.jpg','從一件日常需求開始對話'],['daily3.jpg','工具與生活服務的實際使用'],['daily4.jpg','關係在小事裡慢慢形成']],'共做現場':[['anchor-work.jpg','AnchorTech／BIMCloud・團隊討論與工作紀錄'],['workshop.jpg','把需求攤開，一起討論'],['meeting.jpg','跨專業共同檢視與規劃'],['aama2.jpg','向來訪者分享品牌與空間脈絡'],['team.jpg','成果背後，是一起工作的人']],'國際交流':[['japan.jpg','日本東京 IT 博覽會・產品展示'],['belgium.jpg','比利時 Oqton・技術工作交流'],['aama.jpg','AAMA 生態圈交流會・空間導覽']]};function showGallery(key){$$('[data-gallery]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.gallery===key));$('#everyday-photos').replaceChildren();for(const [n,cap] of gallery[key]){const b=document.createElement('button');b.className='photo-card reveal';b.innerHTML=`<img src="${imgPath(n)}" alt="${cap}" loading="lazy"><span>${cap} ↗</span>`;b.onclick=()=>zoom(imgPath(n),cap+'｜'+captions[n]);$('#everyday-photos').append(b)}}$$('[data-gallery]').forEach(b=>b.onclick=()=>{$$('[data-gallery]').forEach(x=>x.classList.toggle('active',x===b));showGallery(b.dataset.gallery)});showGallery('日常服務');
const qa=[['多元經驗如何形成獨特的專業價值？','共同主軸是把複雜的能力，轉成可以被使用的價值。HCI 讓我理解人的操作；智慧硬體讓我連結製造與市場；BIM 平台讓我組織資訊與協作；空間及品牌則讓服務在現場發生。這些經驗讓我能同時看見產品、供應與營運之間的斷點。'],['空間與材料識別如何創造商業機會？','三代店先定義店型、區域與服務，再以空間模組支持使用。材料識別則把文化從符號轉成可以排列、觸摸與施工的單元。兩者相連，能讓品牌差異不只出現在宣傳，而是進入服務、供應與據點發展；商業價值仍需靠使用與經營資料驗證。'],['你看到的 AI 機會，和現有作品如何連結？','我關心的 AI，是能理解現場任務的工具。Layout Converter 證明高頻小任務值得被產品化；工程資料提供可整理的專業流程；三代店與 AIoT 經驗則提供設備與服務場景。未來三至十年的探索，是讓這些能力逐步接續，而不是一次承諾一個無所不能的平台。']];
function question(i){$('#qa-answer').textContent=qa[i][1];$$('[data-qa]').forEach(b=>b.classList.toggle('active',+b.dataset.qa===i));const prompt=`請根據以下 Howard Lo 個人作品集摘要，協助訪客理解他的產業思考。不得自行補寫客戶、營收或成果；區分已做的專案與未來策略假設。問題：${qa[i][0]}。編輯導覽：${qa[i][1]}。背景：ZyXEL HCI、PowerTech Lipo 智慧硬體、Leedian與AnchorTech 3D協作、信義三代店與空間、品牌文化及材料識別、本機Layout Converter。請從具體案例、跨域方法、商業價值及下一個可驗證的機會分析。資料不足請明示。`;$('#chat-link').href='https://chatgpt.com/?q='+encodeURIComponent(prompt)}$$('[data-qa]').forEach(b=>b.onclick=()=>question(+b.dataset.qa));question(0);
function updateDemo(){$('#demo-output-title').textContent=$('#demo-title').value||'你的物件名稱';$('#demo-output-subtitle').textContent=$('#demo-subtitle').value||'你的特色描述'}$('#demo-title').oninput=updateDemo;$('#demo-subtitle').oninput=updateDemo;$$('[data-demo]').forEach(b=>b.onclick=()=>{$('#demo-sheet').className='demo-sheet '+b.dataset.demo;$$('[data-demo]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',x===b)})});
window.addEventListener('scroll',()=>{const total=document.documentElement.scrollHeight-innerHeight;$('#page-progress').style.width=(total>0?scrollY/total*100:0)+'%'},{passive:true});

