/* Source-led Sinyi leadership evidence, within the cross-period leadership chapter. */
(()=>{
 'use strict';
 const root=document.querySelector('#sy-leadership');if(!root)return;
 const q=s=>root.querySelector(s),qa=s=>[...root.querySelectorAll(s)],reduced=matchMedia('(prefers-reduced-motion:reduce)');
 const axes=[
 ['價值感知 / 品牌 → 用戶','認知，從理解使用者開始。','結合厚數據與運營脈絡，讓品牌主張能被使用者理解。以用戶認知回看產品定位，將洞察帶入設計決策。','領導重點：對齊品牌語言與使用者的真實理解。'],
 ['價值交換 / 用戶 → 資產','體驗，串起質量與流程。','以產品與服務設計為核心，檢視用戶在不同接觸點的操作與感受。讓每一段流程都有一致、可接續的體驗。','領導重點：用共同的體驗目標串連不同產品小隊。'],
 ['價值主張 / 模式 → 品牌','理念，定義定位與路徑。','把服務模式轉譯為產品定位與發展方向，回到品牌對使用者的承諾。讓設計選擇有共同判斷依據。','領導重點：先建立共同方向，再討論執行路徑。'],
 ['價值創造 / 資產 → 模式','商業，讓產品組合形成服務。','把產品視為服務的一個接觸點，思考產品組合、通路與商業模式如何彼此支持。從單點介面延伸到完整服務。','領導重點：將體驗架構與商業策略放在同一張圖上。']
 ];
 const teams=[['SA 小隊','以 Super Agent 為聚焦產品，連結 UI 組件、UX 文件與通路體驗規劃。'],['賣方小隊','以「我家有多夯」作為一對一專業指導的產品脈絡。'],['產品部','連結一站式找房／找房貸與內網潛賣等產品任務。'],['行銷科技部','納入虛擬團隊運作圖，透過共同資源串接不同接觸點。'],['關企幕僚','納入跨部門 UI/UX 專業協作網絡，共用設計資源與方法。'],['創新研發','在組織運作圖與 Super Agent 指導脈絡中，連接產品與研發協作。']];
 const layers=[['Foundations','把基本規則說清楚。','以版面斷點、視覺規格與基礎原則，作為跨裝置、跨產品的共同起點。','斷點 · 規格 · 基礎視覺'],['Components','把重複工作累積成元件。','輸入欄位、按鈕、切換、標籤與資訊卡等組件，共用結構與操作語言。','按鈕 · 表單 · 導覽 · 資訊卡'],['Layouts','讓資料與任務有清楚的位置。','理解資料結構與產品發展，把內容安排在可延伸的佈局中。','資料層級 · 區塊結構 · 版面規則'],['Pages','讓元件組成完整情境。','從空白 Frame 到完整 Page，讓團隊理解組件如何對應產品任務。','頁面組合 · 使用情境 · UX Writing'],['Workflows','把畫面接成可交付的流程。','依需求形成 Workflow Template，搭配命名、版本與協同機制，讓設計與開發接續工作。','流程模板 · 版本管理 · 交付規範']];
 const stages=[['01','2022–2023','建立共同基礎','專業線協作機制、SOP、一對一指導與教育訓練，並累積 UI 組件庫、UX 文件庫及設計資源。以 Super Agent 等產品作為推進脈絡。','短期規劃 / 機制與資源'],['02','2024','串起通路產品線','以共用資源與協同模式支持消費者 Web／App、內網 Web／App、LINE OA 等通路，將產品定位與體驗規則串連起來。','中期規劃 / 通路設計體系'],['03','2025 起','走向全接觸點體驗','由品牌價值、服務設計、產品定位與體驗機制向外整合，目標是讓使用者在不同接觸點感受到一致的品牌與服務。','長期願景 / 服務與品牌']];
 const evidence=[
 ['sinyi-goal.jpg','三年發展目標','發展目標','以通路設計體系實現品牌用戶體驗一致性。來源：2022 技術線藍圖。'],
 ['sinyi-vision.jpg','UIUX 願景架構','架構規劃','認知、體驗、商業與理念，串起品牌、用戶、資產與模式。'],
 ['sinyi-stages.jpg','技術線發展階段','分階段規劃','SOP、共用資源、通路設計體系與全接觸點體驗的發展路徑。'],
 ['sinyi-team.jpg','跨部門虛擬團隊','運作規劃','各單位 UIUX 成員連結共用文件、設計資源與 Design System Template。'],
 ['sinyi-library.jpg','信義設計資源庫','可見資源畫面','原始 Figma 資源庫畫面，包含品牌標誌、人物、建築與數位圖像等資源。'],
 ['sinyi-naming.jpg','檔案、畫布與版本命名','可見規範範例','以產品、模組、平台與版本，說明檔案位置及設計迭代的共同語言。'],
 ['sinyi-components.jpg','從 Frame 到 Page','可見組件與教學範例','用完整頁面與組件對照，說明 UI 實作與元件使用情境。'],
 ['sinyi-focus.jpg','聚焦機制與產品','2022 年當時進度','保留原表中的勾選與「即將開始」狀態；它們代表當時報告內容，並非目前完成狀態。'],
 ['sinyi-roadmap.jpg','核心引擎推進階段','2022 年發展藍圖','2022–2023、2024、2025 起的短中長期規劃，呈現當年的推進構想。'],
 ['sinyi-digitalcard.jpg','數位名片與個人頻道','產品與通路設計資料','SA、LINE、NFC、紙本 QR Code、Web／App 與社群串接個人數位頻道。圖中數字為原始介面內容，不作為本作品集的績效主張。']
 ];
 function animate(el){if(!reduced.matches)el.animate([{opacity:.35,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}],{duration:400,easing:'cubic-bezier(.2,.7,.2,1)'})}
 function select(attr,n,panel,render){const buttons=qa('['+attr+']');buttons.forEach((b,i)=>{b.setAttribute('aria-selected',i===n);b.tabIndex=i===n?0:-1});panel.setAttribute('aria-labelledby',buttons[n].id);render(n);animate(panel)}
 function bind(attr,count,set){qa('['+attr+']').forEach((b,i)=>{b.onclick=()=>set(i);b.onkeydown=e=>{if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End'].includes(e.key))return;e.preventDefault();const n=e.key==='Home'?0:e.key==='End'?count-1:(i+(['ArrowRight','ArrowDown'].includes(e.key)?1:-1)+count)%count;set(n);qa('['+attr+']')[n].focus()}});set(0)}
 function axis(n){select('data-sy-axis',n,q('#sy-axis-detail'),i=>{const a=axes[i];q('.sy-quadrants').dataset.active=i;q('#sy-axis-detail').innerHTML='<span class="sy-kicker">'+a[0]+'</span><h4>'+a[1]+'</h4><p>'+a[2]+'</p><strong>'+a[3]+'</strong>'})}bind('data-sy-axis',4,axis);
 function makeTabs(container,attr,items,label){q(container).innerHTML=items.map((x,i)=>'<button type="button" id="'+attr+'-'+i+'" '+attr+'="'+i+'" role="tab" aria-controls="'+container.slice(1).replace('tabs','detail')+'">'+label(x,i)+'</button>').join('')}
 makeTabs('#sy-team-tabs','data-sy-team',teams,x=>x[0]);bind('data-sy-team',6,n=>select('data-sy-team',n,q('#sy-team-detail'),i=>{q('#sy-team-detail').innerHTML='<strong>'+teams[i][0]+'</strong><p>'+teams[i][1]+'</p><small>依 2022 運作圖及聚焦機制表整理，不代表現行組織編制。</small>'}));
 makeTabs('#sy-layer-tabs','data-sy-layer',layers,(x,i)=>'<small>0'+(i+1)+'</small><strong>'+x[0]+'</strong>');bind('data-sy-layer',5,n=>select('data-sy-layer',n,q('#sy-layer-detail'),i=>{const x=layers[i];q('#sy-layer-detail').innerHTML='<span class="sy-kicker">'+x[0]+'</span><h4>'+x[1]+'</h4><p>'+x[2]+'</p><div class="sy-chips">'+x[3].split(' · ').map(s=>'<span>'+s+'</span>').join('')+'</div>'}));
 q('#sy-platform').onchange=()=>{q('#sy-file-name').textContent='SA_UIUX_社區_'+q('#sy-platform').value;animate(q('#sy-file-name'))};q('#sy-platform').onchange();
 makeTabs('#sy-stage-tabs','data-sy-stage',stages,x=>'<small>'+x[0]+' / '+x[1]+'</small><strong>'+x[2]+'</strong>');bind('data-sy-stage',3,n=>select('data-sy-stage',n,q('#sy-stage-detail'),i=>{const x=stages[i];q('#sy-stage-detail').dataset.stage=i;q('#sy-stage-detail').innerHTML='<span class="sy-stage-number">'+x[0]+'</span><div><span class="sy-kicker">'+x[4]+'</span><h4>'+x[2]+'</h4><p>'+x[3]+'</p><small>依 2022 年原始藍圖重整；此處為當年規劃，未作完成驗證。</small></div>'}));
 let current=0;
 evidence.forEach((x,i)=>{const option=document.createElement('option');option.value=i;option.textContent=String(i+1).padStart(2,'0')+' / '+x[1];q('#sy-gallery-select').append(option);const b=document.createElement('button');b.type='button';b.dataset.syEvidence=i;b.setAttribute('aria-label',x[1]);b.innerHTML='<img src="'+imgPath(x[0])+'" alt="" loading="lazy"><span>'+String(i+1).padStart(2,'0')+'</span>';b.onclick=()=>show(i);q('#sy-gallery-thumbs').append(b)});
 function show(n){current=(n+evidence.length)%evidence.length;const x=evidence[current];q('#sy-gallery-image').src=imgPath(x[0]);q('#sy-gallery-image').alt=x[1]+'：'+x[3];q('#sy-gallery-status').textContent=x[2];q('#sy-gallery-title').textContent=x[1];q('#sy-gallery-caption').textContent=x[3];q('#sy-gallery-position').textContent=String(current+1).padStart(2,'0')+' / '+evidence.length;q('#sy-gallery-select').value=String(current);qa('[data-sy-evidence]').forEach((b,i)=>b.setAttribute('aria-pressed',i===current));animate(q('#sy-gallery-image'))}
 q('#sy-gallery-select').onchange=()=>show(+q('#sy-gallery-select').value);q('#sy-gallery-prev').onclick=()=>show(current-1);q('#sy-gallery-next').onclick=()=>show(current+1);
 const enlarge=()=>zoom(imgPath(evidence[current][0]),evidence[current][1]+' / '+evidence[current][2]);q('#sy-gallery-zoom').onclick=enlarge;q('#sy-gallery-image-open').onclick=enlarge;
 show(0);
})();
