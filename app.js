// === THEME ===
const sunIcon='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>';
const moonIcon='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>';
function initTheme(){
  let dark=false;
  try{const saved=localStorage.getItem('jlpt-n1-theme');if(saved)dark=saved==='dark'}catch(e){}
  document.documentElement.classList.toggle('dark',dark);
  document.getElementById('themeBtn').innerHTML=dark?sunIcon:moonIcon;
}
function toggleTheme(){
  const isDark=document.documentElement.classList.toggle('dark');
  try{localStorage.setItem('jlpt-n1-theme',isDark?'dark':'light')}catch(e){}
  document.getElementById('themeBtn').innerHTML=isDark?sunIcon:moonIcon;
}
initTheme();

// === QUESTION TYPES ===
const QUESTION_TYPES=[
  {type:'mondai1',number:1,nameJa:'漢字読み',descriptionZh:'看句子中畫底線的漢字，選出正確的平假名讀音',section:'vocabulary',dataFile:'data/mondai1-kanji-reading.json',examCount:6},
  {type:'mondai2',number:2,nameJa:'文脈規定',descriptionZh:'根據句子前後文，從四個選項中選出最適合填入空格的詞彙',section:'vocabulary',dataFile:'data/mondai2-context-vocab.json',examCount:7},
  {type:'mondai3',number:3,nameJa:'言い換え類義',descriptionZh:'選出與畫底線詞語意思最接近的選項',section:'vocabulary',dataFile:'data/mondai3-synonyms.json',examCount:6},
  {type:'mondai4',number:4,nameJa:'用法',descriptionZh:'給定一個詞彙，從四個句子中選出正確使用該詞彙的句子',section:'vocabulary',dataFile:'data/mondai4-word-usage.json',examCount:6},
  {type:'mondai5',number:5,nameJa:'文の文法1（文法形式の判断）',descriptionZh:'選出最適合填入句子空格的文法選項',section:'grammar',dataFile:'data/mondai5-grammar.json',examCount:5},
  {type:'mondai6',number:6,nameJa:'文の文法2（文の組み立て）',descriptionZh:'將四個選項排列成正確順序，選出放在★位置的選項',section:'grammar',dataFile:'data/mondai6-arrangement.json',examCount:4},
  {type:'mondai7',number:7,nameJa:'文章の文法',descriptionZh:'閱讀短文，為每個空格選出最適當的詞語或文法',section:'grammar',dataFile:'data/mondai7-passage-grammar.json',examCount:4},
  {type:'mondai8',number:8,nameJa:'内容理解（短文）',descriptionZh:'閱讀短文後，回答相關問題',section:'reading',dataFile:'data/mondai8-short-reading.json',examCount:4},
  {type:'mondai9',number:9,nameJa:'内容理解（中文）',descriptionZh:'閱讀中等長度的文章後，回答相關問題',section:'reading',dataFile:'data/mondai9-medium-reading.json',examCount:9},
  {type:'mondai10',number:10,nameJa:'内容理解（長文）',descriptionZh:'閱讀長篇文章後，回答相關問題',section:'reading',dataFile:'data/mondai10-long-reading.json',examCount:4},
  {type:'mondai11',number:11,nameJa:'統合理解',descriptionZh:'閱讀兩篇相關文章，比較並回答問題',section:'reading',dataFile:'data/mondai11-integrated-reading.json',examCount:3},
  {type:'mondai12',number:12,nameJa:'主張理解（長文）',descriptionZh:'閱讀長文，理解作者的主張與論點',section:'reading',dataFile:'data/mondai12-thematic-reading.json',examCount:3},
  {type:'mondai13',number:13,nameJa:'情報検索',descriptionZh:'從通知、廣告等文本中找出所需資訊',section:'reading',dataFile:'data/mondai13-information-retrieval.json',examCount:2},
];
function getTypeInfo(type){return QUESTION_TYPES.find(t=>t.type===type)}

// === TIPS DATA ===
const TIPS={
  mondai1:{title:'問題1 漢字讀音 — 解題技巧',tips:[
    {heading:'注意長短音陷阱',content:'選項常常只差一個長音符號。例如「趨勢」的「趨」讀「すう」（長音），而非「す」。遇到不確定的漢字，先回想有沒有長音版本。'},
    {heading:'促音・濁音・半濁音',content:'N1 最愛考的三大陷阱。例如「潔白」是「けっぱく」（促音+半濁音），而非「けつはく」。建議用筆記本專門記錄這類容易混淆的讀音。'},
    {heading:'訓讀動詞必背',content:'「報われる（むくわれる）」「培う（つちかう）」「携わる（たずさわる）」等訓讀動詞是常客。這些字的音讀和訓讀差異很大，只能靠累積。'},
    {heading:'平時養成查讀音習慣',content:'看日文文章時，遇到不確定讀音的漢字就查。N1 考的就是你有沒有真的「知道怎麼念」而不只是「看得懂意思」。'},
  ]},
  mondai2:{title:'問題2 文意推斷 — 解題技巧',tips:[
    {heading:'先看空格前後的關鍵字',content:'不要急著看選項。先把空格前後的 2-3 個關鍵字抓出來，理解語境需要「正面還是負面」「程度強還是弱」的詞。'},
    {heading:'辨別近似詞的「精確語意」',content:'選項常出現中文意思幾乎一樣的詞。例如「抜本的」vs「根本的」，前者強調「連根拔起式的改革」，後者比較中性。'},
    {heading:'注意固定搭配',content:'日文有很多固定搭配（コロケーション），例如「法律を施行する」「計画を抜本的に見直す」。多讀多記這些搭配比背單字更有效。'},
  ]},
  mondai3:{title:'問題3 近義詞替換 — 解題技巧',tips:[
    {heading:'擴充同義詞資料庫',content:'這題考的就是你的同義詞量。建議用「一個詞帶三個近義詞」的方式學習，例如「たちまち＝すぐに＝直ちに＝即座に」。'},
    {heading:'外來語 → 和語/漢語 的轉換',content:'N1 常考外來語替換成日語固有表達，或反過來。例如「キャンセルする」→「取り消す」。'},
    {heading:'代入法驗證',content:'把選項代入原句，看看句子通不通順、語氣對不對。有時候意思接近但語域（正式/口語）不同。'},
  ]},
  mondai4:{title:'問題4 單字用法 — 解題技巧',tips:[
    {heading:'不能只背中文意思',content:'這題的關鍵在於「搭配詞」和「使用情境」。例如「おびただしい」只用在形容「數量多」，不能用在形容性格或天氣。'},
    {heading:'判斷正面/負面語感',content:'很多詞有正面或負面的傾向。「あっけない」帶有「令人失望」的負面語感，所以不能用在正面的句子裡。'},
    {heading:'排除法最有效',content:'四個句子中，先把明顯不通順的排除掉。通常能排除 2 個，再從剩下 2 個細細比較。'},
    {heading:'多讀例句',content:'背單字時一定要看 2-3 個例句，記住這個字「通常跟什麼一起用」。辭書例句比自己造句更可靠。'},
  ]},
  mondai5:{title:'問題5 句子文法 — 解題技巧',tips:[
    {heading:'記住接續規則',content:'每個 N1 句型都有固定的接續方式。例如「からには」接動詞た形，「をもってしても」接名詞。先看空格前面是什麼形式，就能排除不符合接續的選項。'},
    {heading:'古文殘留句型要硬背',content:'「～を禁じ得ない」「～たるもの」「～べからず」這些帶有古文色彩的句型，沒有規律可循，只能多看多記。'},
    {heading:'注意語氣和前後邏輯',content:'空格填入後，整句的邏輯要通順。「からには」表示決心，「ものなら」表示假設，語氣完全不同。'},
  ]},
  mondai6:{title:'問題6 排列組合 — 解題技巧',tips:[
    {heading:'先找「必定相連」的組合',content:'四個選項中，一定有兩個必須相鄰的。例如「動詞原形」一定接在「名詞＋を」後面，「につれて」一定接在「動詞辞書形」後面。先把這些鎖定。'},
    {heading:'從句首和句尾往中間推',content:'看空格前後已有的文字，確定第一格和最後一格能接上去，然後往中間推理。'},
    {heading:'只需要答★位置',content:'記住：你只需要回答★位置的選項。如果你能確定★位置的答案，其他位置不確定也沒關係。'},
    {heading:'注意助詞的接續',content:'「は」「が」「を」「に」等助詞是排列的重要線索。主語一定在「は/が」前面，動詞的受詞在「を」前面。'},
  ]},
  mondai7:{title:'問題7 文章文法 — 解題技巧',tips:[
    {heading:'這是披著文法皮的閱讀測驗',content:'問題7 其實在考你理不理解文章的脈絡。先快速讀完整篇文章掌握大意，再回來看每個空格。'},
    {heading:'接續詞是重點',content:'「したがって（因此）」「ところが（然而）」「むしろ（不如說）」「ただし（但是）」——先判斷前後文的邏輯關係（因果/轉折/補充），就能選對接續詞。'},
    {heading:'語氣表達看文末',content:'空格在句尾時，要判斷作者的態度：肯定？推測？主張？建議？不同的語氣詞表達完全不同的立場。'},
  ]},
};

// === DATA LOADING ===
const questionBanks={};
async function loadQuestions(type){
  if(questionBanks[type]) return questionBanks[type];
  const info=getTypeInfo(type);if(!info) return [];
  try{
    const resp=await fetch(info.dataFile);
    const data=await resp.json();
    questionBanks[type]=(data.questions||[]).map(q=>({...q,_type:type}));
    return questionBanks[type];
  }catch(e){console.error('Failed to load',type,e);return[]}
}
async function preloadAll(){
  await Promise.all(QUESTION_TYPES.map(t=>loadQuestions(t.type)));
}

// === PROGRESS (localStorage: 'jlpt-n1-progress') ===
function createEmptyProgress(){
  const progress={};
  QUESTION_TYPES.forEach(t=>{progress[t.type]={type:t.type,totalAttempted:0,totalCorrect:0,attempts:[],wrongQuestionIds:[]}});
  return {version:1,lastActivity:Date.now(),progress};
}
function loadProgress(){
  try{const raw=localStorage.getItem('jlpt-n1-progress');if(raw)return JSON.parse(raw)}catch(e){}
  return createEmptyProgress();
}
function saveProgress(state){localStorage.setItem('jlpt-n1-progress',JSON.stringify(state))}

function recordAttempt(questionId,type,selectedIndex,correct){
  const state=loadProgress();
  const tp={...(state.progress[type]||{type,totalAttempted:0,totalCorrect:0,attempts:[],wrongQuestionIds:[]})};
  tp.totalAttempted++;
  if(correct){
    tp.totalCorrect++;
    tp.wrongQuestionIds=tp.wrongQuestionIds.filter(id=>id!==questionId);
    markReviewed(questionId,true);
  }else{
    if(!tp.wrongQuestionIds.includes(questionId)) tp.wrongQuestionIds=[...tp.wrongQuestionIds,questionId];
    addWrongAnswer(questionId,type);
  }
  tp.attempts=[...tp.attempts,{questionId,selectedIndex,correct,timestamp:Date.now()}];
  state.progress[type]=tp;
  state.lastActivity=Date.now();
  saveProgress(state);
}

// === REVIEW / SPACED REPETITION (localStorage: 'jlpt-n1-review') ===
const INTERVALS_MS=[3600000,14400000,86400000,172800000,345600000,604800000];
function loadReview(){
  try{const raw=localStorage.getItem('jlpt-n1-review');if(raw)return JSON.parse(raw)}catch(e){}
  return [];
}
function saveReview(entries){localStorage.setItem('jlpt-n1-review',JSON.stringify(entries))}
function addWrongAnswer(questionId,questionType){
  const entries=loadReview();
  const now=Date.now();
  const existing=entries.find(e=>e.questionId===questionId);
  if(existing){
    existing.wrongCount++;
    existing.lastWrong=now;
    existing.nextReview=now+INTERVALS_MS[0];
  }else{
    entries.push({questionId,questionType,wrongCount:1,lastWrong:now,lastReviewed:0,nextReview:now+INTERVALS_MS[0]});
  }
  saveReview(entries);
}
function markReviewed(questionId,correct){
  const entries=loadReview();
  const entry=entries.find(e=>e.questionId===questionId);
  if(!entry)return;
  const now=Date.now();
  if(correct){
    const currentInterval=entry.lastReviewed>0?now-entry.lastReviewed:INTERVALS_MS[0];
    const nextIdx=INTERVALS_MS.findIndex(i=>i>currentInterval);
    const nextInterval=nextIdx!==-1?INTERVALS_MS[nextIdx]:INTERVALS_MS[INTERVALS_MS.length-1]*2;
    entry.lastReviewed=now;
    entry.nextReview=now+nextInterval;
  }else{
    entry.wrongCount++;
    entry.lastWrong=now;
    entry.lastReviewed=now;
    entry.nextReview=now+INTERVALS_MS[0];
  }
  saveReview(entries);
}

// === SEEN QUESTION TRACKING ===
function loadSeen(){try{return JSON.parse(localStorage.getItem('jlpt-n1-seen'))||[]}catch(e){return[]}}
function saveSeen(list){localStorage.setItem('jlpt-n1-seen',JSON.stringify(list))}
function addSeen(qId){const list=loadSeen();if(!list.includes(qId)){list.push(qId);saveSeen(list)}}

// === HELPERS ===
function shuffle(a){a=[...a];for(let i=a.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function underlineText(text){return text.replace(/__(.+?)__/g,'<span style="border-bottom:2px solid var(--color-primary);padding-bottom:1px" lang="ja">$1</span>')}
function esc(s){const d=document.createElement('div');d.textContent=s;return d.innerHTML}
function extractNoteDefs(text){
  const m=text.match(/\n\n(（注\d*）[\s\S]+)$/);
  if(!m) return {};
  const defs={};
  m[1].replace(/（注(\d*)）\s*([^（]*)/g,(_,num,def)=>{defs[num||'0']=def.trim()});
  return defs;
}
function applyNotes(html,defs){
  // Strip definitions block from end if present
  const m=html.match(/\n\n(（注\d*）[\s\S]+)$/);
  if(m) html=html.slice(0,m.index);
  // Replace inline （注N） with tooltip
  return html.replace(/（注(\d*?)）/g,(_,num)=>{
    const key=num||'0';
    const def=defs[key];
    if(def) return `<span class="note-ref" onclick="toggleNote(this)"><sup>注${num||''}</sup><span class="note-tip">${def}</span></span>`;
    return _;
  });
}
function processNotes(html){return applyNotes(html,extractNoteDefs(html))}
function toggleNote(el){
  const wasActive=el.classList.contains('active');
  document.querySelectorAll('.note-ref.active').forEach(r=>r.classList.remove('active'));
  if(!wasActive){
    el.classList.add('active');
    setTimeout(()=>document.addEventListener('click',function h(e){
      if(!el.contains(e.target)){el.classList.remove('active');document.removeEventListener('click',h)}
    }),0);
  }
}

// === SECTION / CATEGORY FILTERING ===
const SECTIONS=[
  {id:'全部',label:'全部'},
  {id:'vocabulary',label:'文字・語彙'},
  {id:'grammar',label:'文法'},
  {id:'reading',label:'読解'},
];
function getTypesForSection(sectionId){
  if(sectionId==='全部') return QUESTION_TYPES;
  return QUESTION_TYPES.filter(t=>t.section===sectionId);
}
function hasPassage(q){return !isReadingType(q._type)||q.passageContext&&q.passageContext.length>100}
function getSectionCount(sectionId){
  return getTypesForSection(sectionId).reduce((s,t)=>s+((questionBanks[t.type]||[]).filter(hasPassage)).length,0);
}
function getExamCount(typeName){
  const qt=getTypeInfo(typeName);
  const bank=(questionBanks[typeName]||[]).filter(hasPassage);
  return Math.min(qt.examCount||bank.length,bank.length);
}
function getWrongQuestions(){
  const state=loadProgress();
  const wrong=[];
  QUESTION_TYPES.forEach(qt=>{
    const tp=state.progress[qt.type];
    if(!tp) return;
    const bank=questionBanks[qt.type]||[];
    tp.wrongQuestionIds.forEach(id=>{
      const q=bank.find(x=>x.id===id);
      if(q) wrong.push(q);
    });
  });
  return wrong;
}

// === STATE ===
let S={screen:'landing',
  sectionFilter:'全部',typeFilter:'全部',mode:'normal',
  mondaiType:null,questions:[],currentIndex:0,selectedIndex:-1,submitted:false,
  slots:[null,null,null,null],activeSlot:null,
  blankAnswers:[],currentBlankIndex:-1,
  sessionCorrect:0,sessionWrong:0,skipCount:0,answerHistory:[]};

// === NAVIGATION ===
function goHome(){S.screen='landing';S.mode='normal';render()}
function goConfig(){S.screen='start';render()}
function goStart(section){S.sectionFilter=section;S.typeFilter='全部';S.screen='start';render()}
function goTips(type){S.mondaiType=type;S.screen='tips';render()}
function setSectionFilter(section){S.sectionFilter=section;S.typeFilter='全部';render()}
function setTypeFilter(type){S.typeFilter=S.typeFilter===type?'全部':type;render()}

// === QUIZ START ===
function isReadingType(type){return ['mondai8','mondai9','mondai10','mondai11','mondai12','mondai13'].includes(type)}
function groupByPassage(questions){
  const groups=[];const map=new Map();
  questions.forEach(q=>{
    const key=q._type+'|'+(q.passageContext||'').substring(0,80);
    if(map.has(key)) map.get(key).push(q);
    else{const g=[q];groups.push(g);map.set(key,g)}
  });
  return groups;
}
function startQuiz(){
  const types=S.typeFilter!=='全部'
    ?[S.typeFilter]
    :getTypesForSection(S.sectionFilter).map(t=>t.type);
  const seen=loadSeen();
  let nonReading=[],reading=[];

  types.forEach(typeName=>{
    const qt=getTypeInfo(typeName);
    const bank=(questionBanks[typeName]||[]).filter(hasPassage);
    if(!bank.length) return;
    const count=Math.min(qt.examCount||bank.length,bank.length);

    if(isReadingType(typeName)){
      const groups=groupByPassage(bank);
      const unseen=groups.filter(g=>g.some(q=>!seen.includes(q.id)));
      const src=unseen.length>0?shuffle(unseen):shuffle([...groups]);
      let flat=[];
      for(const g of src){if(flat.length>=count) break;flat=flat.concat(g)}
      reading=reading.concat(flat);
    }else{
      let unseen=bank.filter(q=>!seen.includes(q.id));
      if(unseen.length===0) unseen=[...bank];
      unseen=shuffle(unseen);
      let tp=unseen.slice(0,count);
      if(tp.length<count){
        const extra=shuffle(bank.filter(q=>!tp.find(p=>p.id===q.id)));
        tp=tp.concat(extra.slice(0,count-tp.length));
      }
      nonReading=nonReading.concat(tp);
    }
  });

  const picked=shuffle(nonReading).concat(reading);
  if(!picked.length) return;
  S.questions=picked;
  initDrillState();
  S.mode='normal';S.screen='drill';render();
}
function startWrongQuiz(){
  const wl=getWrongQuestions();
  if(!wl.length) return;
  S.questions=shuffle([...wl]);
  initDrillState();
  S.mode='wrong';S.screen='drill';render();
}
function initDrillState(){
  S.currentIndex=0;S.selectedIndex=-1;S.submitted=false;
  S.slots=[null,null,null,null];S.activeSlot=null;
  S.blankAnswers=[];S.currentBlankIndex=-1;
  S.sessionCorrect=0;S.sessionWrong=0;S.skipCount=0;S.answerHistory=[];
  const q=S.questions[0];
  if(q){
    const t=q._type;
    if(t==='mondai7'&&q.blanks) S.blankAnswers=new Array(q.blanks.length).fill(undefined);
  }
}

// === QUIZ LOGIC ===
function selectChoice(index){
  if(S.submitted)return;
  S.selectedIndex=index;
  S.submitted=true;
  const q=S.questions[S.currentIndex];
  const type=q._type||S.mondaiType;
  const correct=S.selectedIndex===q.correctIndex;
  recordAttempt(q.id,type,S.selectedIndex,correct);
  addSeen(q.id);
  if(correct) S.sessionCorrect++; else S.sessionWrong++;
  S.answerHistory[S.currentIndex]={selected:S.selectedIndex,correct};
  if(q.passageContext) S._noScroll=true;
  render();
}
function skipQuestion(){
  if(S.submitted)return;
  S.submitted=true;S.selectedIndex=-1;
  const q=S.questions[S.currentIndex];
  const type=q._type||S.mondaiType;
  S.skipCount++;
  recordAttempt(q.id,type,-1,false);
  addSeen(q.id);
  S.sessionWrong++;
  S.answerHistory[S.currentIndex]={selected:-1,correct:false,skipped:true};
  if(q.passageContext) S._noScroll=true;
  render();
}
function samePassage(i,j){
  const a=S.questions[i],b=S.questions[j];
  return a&&b&&a._type===b._type&&a.passageContext&&a.passageContext===b.passageContext;
}
function nextQuestion(){
  if(S.currentIndex+1>=S.questions.length){S.screen='result';render();return}
  const keep=samePassage(S.currentIndex,S.currentIndex+1);
  S.currentIndex++;
  restoreAnswer();
  if(keep) S._noScroll=true;
  render();
}
function prevQuestion(){
  if(S.currentIndex>0){
    const keep=samePassage(S.currentIndex,S.currentIndex-1);
    S.currentIndex--;restoreAnswer();
    if(keep) S._noScroll=true;
    render();
  }
}
function restoreAnswer(){
  const a=S.answerHistory[S.currentIndex];
  if(a){
    S.submitted=true;
    S.selectedIndex=a.selected!==undefined?a.selected:-1;
    if(a.slots) S.slots=[...a.slots];
    if(a.blankAnswers){S.blankAnswers=[...a.blankAnswers];S.currentBlankIndex=-1}
  }else{
    S.submitted=false;S.selectedIndex=-1;
    const q=S.questions[S.currentIndex];
    const type=q?q._type:null;
    if(type==='mondai6'){S.slots=[null,null,null,null];S.activeSlot=null}
    if(type==='mondai7'){
      if(q&&q.blanks) S.blankAnswers=new Array(q.blanks.length).fill(undefined);
      S.currentBlankIndex=-1;
    }
  }
}

// Mondai 6
function placeFragment(fragmentIndex){
  if(S.submitted)return;
  let targetSlot=S.activeSlot;
  if(targetSlot===null){
    const emptyIdx=S.slots.findIndex(s=>s===null);
    if(emptyIdx===-1)return;
    targetSlot=emptyIdx;
  }
  S.slots=[...S.slots];
  S.slots[targetSlot]=fragmentIndex;
  S.activeSlot=null;
  S._noScroll=true;
  render();
}
function selectSlot(slotIndex){
  if(S.submitted)return;
  if(S.slots[slotIndex]!==null){
    S.slots=[...S.slots];
    S.slots[slotIndex]=null;
    S.activeSlot=null;
  }else{
    S.activeSlot=slotIndex;
  }
  S._noScroll=true;
  render();
}
function isFragmentPlaced(idx){return S.slots.includes(idx)}
function submitMondai6(){
  if(!S.slots.every(s=>s!==null)||S.submitted)return;
  S.submitted=true;
  const q=S.questions[S.currentIndex];
  const type=q._type||S.mondaiType;
  const starSlotIndex=q.starPosition-1;
  const correct=S.slots[starSlotIndex]===q.correctStarIndex;
  recordAttempt(q.id,type,S.slots[starSlotIndex],correct);
  addSeen(q.id);
  if(correct) S.sessionCorrect++; else S.sessionWrong++;
  S.answerHistory[S.currentIndex]={selected:S.slots[starSlotIndex],correct,slots:[...S.slots]};
  S._noScroll=true;
  render();
}

// Mondai 7
function selectBlankAnswer(choiceIndex){
  if(S.submitted)return;
  S.blankAnswers=[...S.blankAnswers];
  S.blankAnswers[S.currentBlankIndex]=choiceIndex;
  const nextUnanswered=S.blankAnswers.findIndex((a,i)=>i>S.currentBlankIndex&&a===undefined);
  if(nextUnanswered!==-1) S.currentBlankIndex=nextUnanswered;
  S._noScroll=true;
  render();
}
function setBlankIndex(idx){S.currentBlankIndex=S.currentBlankIndex===idx?-1:idx;S._noScroll=true;render();if(S.currentBlankIndex===-1)return;const q=S.questions[S.currentIndex];const num=q.blanks[idx]?.blankNumber;const el=num&&document.getElementById('blank-'+num);if(el)el.scrollIntoView({behavior:'smooth',block:'center'})}
function submitMondai7(){
  if(!S.blankAnswers.every(a=>a!==undefined)||S.submitted)return;
  S.submitted=true;
  const q=S.questions[S.currentIndex];
  const type=q._type||S.mondaiType;
  const allCorrect=q.blanks.every((b,i)=>S.blankAnswers[i]===b.correctIndex);
  recordAttempt(q.id,type,-1,allCorrect);
  addSeen(q.id);
  if(allCorrect) S.sessionCorrect++; else S.sessionWrong++;
  S.answerHistory[S.currentIndex]={selected:-1,correct:allCorrect,blankAnswers:[...S.blankAnswers]};
  S._noScroll=true;
  render();
}

// === RENDER ===
function render(){
  const app=document.getElementById('app');
  document.getElementById('themeBtn').style.display=(S.screen==='landing'||S.screen==='start')?'flex':'none';
  switch(S.screen){
    case'landing':renderLanding(app);break;
    case'start':renderStart(app);break;
    case'drill':renderDrill(app);break;
    case'result':renderResult(app);break;
    case'tips':renderTips(app);break;
  }
  if(S._noScroll){S._noScroll=false}else{window.scrollTo({top:0,behavior:'smooth'})}
}

const I={
  languages:'<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/></svg>',
  info:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>',
  arrowLeft:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7M19 12H5"/></svg>',
  arrowRight:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>',
  trophy:'<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>',
  flame:'<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>',
  refresh:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>',
  play:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>',
};

// === LANDING PAGE (section cards) ===
const SECTION_META={
  vocabulary:{code:'問題 1-4',name:'文字・語彙'},
  grammar:{code:'問題 5-7',name:'文法'},
  reading:{code:'問題 8-13',name:'読解'},
};
function renderLanding(app){
  const sectionCards=SECTIONS.filter(s=>s.id!=='全部').map(sec=>{
    const m=SECTION_META[sec.id];
    const count=getSectionCount(sec.id);
    return `<div class="exam-card" onclick="goStart('${sec.id}')" style="display:flex;align-items:center;justify-content:space-between;gap:12px">
      <div style="min-width:0">
        <div class="text-xs font-semibold text-fg-muted" style="letter-spacing:.06em">${m.code}</div>
        <div class="font-medium text-sm mt-1" style="line-height:1.4">${m.name}</div>
      </div>
      <div style="flex-shrink:0;text-align:right">
        <span class="badge badge-primary">${count} 題</span>
      </div>
    </div>`;
  }).join('');

  app.innerHTML=`
    <div class="text-center" style="padding:32px 0 24px">
      <div style="font-size:2rem;margin-bottom:8px;display:flex;justify-content:center;color:var(--color-primary)">${I.languages}</div>
      <h1 style="font-size:1.35rem;font-weight:700;letter-spacing:-.02em">JLPT 考古題</h1>
    </div>
    <div class="mb-4">
      <div class="flex items-center gap-2 mb-3">
        <span class="badge badge-primary">N1</span>
        <div style="flex:1;height:1px;background:var(--color-sep)"></div>
      </div>
      <div class="grid grid-cols-2 gap-3">${sectionCards}</div>
    </div>
  `;
}

// === START PAGE (config page) ===
function renderStart(app){
  const wl=getWrongQuestions();

  // Per-type weaknesses (filtered to current section)
  const state=loadProgress();
  const sectionTypes=getTypesForSection(S.sectionFilter);
  const weaknesses=sectionTypes.map(qt=>{
    const tp=state.progress[qt.type]||{totalAttempted:0,totalCorrect:0};
    if(tp.totalAttempted===0) return null;
    return {type:qt.type,number:qt.number,nameJa:qt.nameJa,total:tp.totalAttempted,correct:tp.totalCorrect,pct:Math.round(tp.totalCorrect/tp.totalAttempted*100)};
  }).filter(Boolean).sort((a,b)=>a.pct-b.pct);
  const hasHistory=weaknesses.length>0;

  // Type chips for current section
  const types=getTypesForSection(S.sectionFilter);
  const typeChips=types.map(qt=>{
      return `<div class="chip ${S.typeFilter===qt.type?'active':''}" onclick="setTypeFilter('${qt.type}')">${qt.nameJa}</div>`;
    }).join('');

  const secLabel=SECTIONS.find(s=>s.id===S.sectionFilter)?.label||'全部';

  app.innerHTML=`
    <div class="breadcrumb"><a onclick="goHome()">首頁</a><span class="bc-sep">›</span><span>${secLabel}</span></div>

    <div class="card mb-4">
      <div class="card-header">
        <div>
          <div class="text-xs font-semibold text-fg-muted" style="letter-spacing:.06em">JLPT N1</div>
          <div class="font-semibold mt-1">${secLabel}</div>
        </div>
      </div>
      <div class="card-body flex-col gap-4" style="display:flex">
        <div>
          <div class="text-xs font-medium text-fg-dim mb-2" style="letter-spacing:.06em;text-transform:uppercase">類別</div>
          <div class="chip-group">${typeChips}</div>
        </div>
        <div style="display:flex;justify-content:flex-end">
          <button class="btn btn-primary btn-sm" onclick="startQuiz()">${I.play} 開始測驗</button>
        </div>
      </div>
    </div>

    ${wl.length?`<div class="card mb-4">
      <div class="card-body flex-col gap-3" style="display:flex">
        <div class="flex items-center gap-2">
          <span class="font-medium text-sm">錯題本</span>
          <span class="text-xs text-fg-dim">${wl.length} 題</span>
          <button class="btn btn-primary btn-sm" style="margin-left:auto" onclick="startWrongQuiz()">${I.play} 練習錯題</button>
        </div>
      </div>
    </div>`:''}

    ${hasHistory?`<div class="card mb-4">
      <div class="card-body flex-col gap-3" style="display:flex">
        <span class="font-medium text-sm">學習進度</span>
        <div style="display:flex;flex-direction:column;gap:8px">
          ${weaknesses.map(w=>`<div style="font-size:.75rem">
            <div class="flex items-center gap-2 mb-1">
              <span class="text-fg-muted">${w.nameJa}</span>
              <span class="text-fg-dim" style="margin-left:auto;white-space:nowrap">${w.correct}/${w.total} · ${w.pct}%</span>
            </div>
            <div style="height:6px;border-radius:3px;background:var(--color-sep);overflow:hidden">
              <div style="width:${w.pct}%;height:100%;border-radius:3px;background:${w.pct>=70?'var(--color-success-fg)':w.pct>=40?'var(--color-skip)':'var(--color-danger-fg)'}"></div>
            </div>
          </div>`).join('')}
        </div>
      </div>
    </div>`:''}
  `;
}

// === DRILL RENDERING ===
function renderDrill(app){
  const q=S.questions[S.currentIndex];
  if(!q){S.screen='result';renderResult(app);return}
  const type=q._type||S.mondaiType;
  if(type==='mondai4') return renderDrillMondai4(app);
  if(type==='mondai6') return renderDrillMondai6(app);
  if(type==='mondai7') return renderDrillMondai7(app);
  if(['mondai8','mondai9','mondai10','mondai11','mondai12','mondai13'].includes(type)) return renderDrillReading(app);
  return renderDrillStandard(app);
}

// Shared drill header
function renderDrillHeader(total){
  const modeLabel=S.mode==='wrong'?'錯題':'測驗';
  const prog=((S.currentIndex+(S.submitted?1:0))/total*100).toFixed(1);
  const secLabel=SECTIONS.find(s=>s.id===S.sectionFilter)?.label||'全部';
  return `<div class="breadcrumb">
    <a onclick="goHome()">首頁</a><span class="bc-sep">›</span><a onclick="goConfig()">${secLabel}</a><span class="bc-sep">›</span><span>${modeLabel}</span>
  </div>
  <div class="flex items-center gap-2 mb-2">
    <span class="text-xs text-fg-dim">${S.currentIndex+1} / ${total}</span>
    <div style="flex:1"></div>
    <span class="text-xs" style="color:var(--color-success-fg)">✓ ${S.sessionCorrect}</span>
    <span class="text-xs" style="color:var(--color-danger-fg)">✗ ${S.sessionWrong}</span>
    <span class="text-xs" style="color:var(--color-skip);display:inline-flex;align-items:center;gap:2px">⚠ ${S.skipCount}</span>
  </div>
  <div class="progress mb-3"><div class="progress-bar" style="width:${prog}%"></div></div>`;
}

function renderCardHeader(){
  const q=S.questions[S.currentIndex];
  const type=q._type||S.mondaiType;
  const info=getTypeInfo(type);
  return `<div class="card-header flex items-center justify-between">
    <div class="flex items-center gap-2">
      <span class="text-xs text-fg-dim font-semibold">Q${S.currentIndex+1}</span>
      <span class="badge badge-muted">${info?info.nameJa:''}</span>
    </div>
    <div class="flex items-center gap-2">
      <button class="btn btn-sm btn-skip" onclick="skipQuestion()" ${S.submitted?'style="visibility:hidden"':''}>${S.submitted?'':'⚠ '}跳過</button>
    </div>
  </div>`;
}

// Shared nav footer
function renderNavFooter(total){
  const hasPrev=S.currentIndex>0;
  const hasNext=S.submitted;
  if(!hasPrev&&!hasNext) return '';
  return `<div class="flex items-center mt-4" style="padding-top:12px;border-top:1px solid var(--color-sep)">
    ${hasPrev?`<button class="btn btn-ghost btn-sm" onclick="prevQuestion()">${I.arrowLeft} 上一題</button>`:''}
    <div style="flex:1"></div>
    ${hasNext?`<button class="btn btn-ghost btn-sm" onclick="nextQuestion()">${S.currentIndex+1>=total?'查看結果':'下一題 '+I.arrowRight}</button>`:''}
  </div>`;
}

// Standard drill: mondai 1,2,3,5
function renderDrillStandard(app){
  const q=S.questions[S.currentIndex];
  const type=q._type||S.mondaiType;
  const total=S.questions.length;

  const showUnderline=['mondai1','mondai3'].includes(type);
  let sentenceHtml=esc(q.sentence);
  if(showUnderline) sentenceHtml=underlineText(sentenceHtml);
  if(['mondai2','mondai5'].includes(type)){const ansLen=q.choices[q.correctIndex].length;sentenceHtml=sentenceHtml.replace(/（\s*）/g,`<span style="display:inline-block;width:${Math.max(2,ansLen)}em;border-bottom:2px solid var(--color-danger);margin:0 2px"></span>`);}

  app.innerHTML=`
      ${renderDrillHeader(total)}
      <div class="card mb-3">
        ${renderCardHeader()}
        <div class="card-body">
          <div class="text-sm mb-4" style="line-height:1.7" lang="ja">
            ${sentenceHtml}
          </div>
          <div class="flex-col gap-2" style="display:flex">
            ${q.choices.map((c,i)=>`
              <div class="${optClass(i,q.correctIndex)}" onclick="selectChoice(${i})">
                <div class="opt-indicator">${optIndicator(i,q.correctIndex)}</div>
                <div class="opt-label"><span class="opt-letter">${i+1}.</span>${esc(c)}</div>
              </div>
            `).join('')}
          </div>
          ${S.submitted?renderFeedback(q.explanation):''}
          ${renderNavFooter(total)}
        </div>
      </div>`;
}

// Mondai 4: target word + sentence choices
function renderDrillMondai4(app){
  const q=S.questions[S.currentIndex];
  const total=S.questions.length;

  app.innerHTML=`
      ${renderDrillHeader(total)}
      <div class="card mb-3">
        ${renderCardHeader()}
        <div class="card-body">
          <div class="text-center mb-4">
            <span class="text-2xl font-bold" lang="ja">${esc(q.targetWord)}</span>
          </div>
          <div class="flex-col gap-2" style="display:flex">
            ${q.sentenceChoices.map((c,i)=>`
              <div class="${optClass(i,q.correctIndex)}" onclick="selectChoice(${i})">
                <div class="opt-indicator">${optIndicator(i,q.correctIndex)}</div>
                <div class="opt-label"><span class="opt-letter">${i+1}.</span><span lang="ja">${esc(c).replace(esc(q.targetWord),`<span style="border-bottom:2px solid var(--color-danger);padding-bottom:1px">${esc(q.targetWord)}</span>`)}</span></div>
              </div>
            `).join('')}
          </div>
          ${S.submitted?renderFeedback(q.explanation):''}
          ${renderNavFooter(total)}
        </div>
      </div>`;
}

// Mondai 6: arrangement
function renderDrillMondai6(app){
  const q=S.questions[S.currentIndex];
  const total=S.questions.length;

  const parts=[];
  const regex=/(_\d_|★|＿{2,})/g;
  let lastIndex=0,match,slotCounter=0;
  const template=q.sentenceTemplate;
  while((match=regex.exec(template))!==null){
    if(match.index>lastIndex) parts.push({type:'text',value:template.slice(lastIndex,match.index)});
    const isStar=match[0]==='★'||slotCounter===q.starPosition-1;
    parts.push({type:'slot',slotIndex:slotCounter,isStar});
    slotCounter++;
    lastIndex=regex.lastIndex;
  }
  if(lastIndex<template.length) parts.push({type:'text',value:template.slice(lastIndex)});

  app.innerHTML=`
      ${renderDrillHeader(total)}
      <div class="card mb-3">
        ${renderCardHeader()}
        <div class="card-body">
          <div class="flex flex-wrap items-center gap-1 text-lg leading-loose mb-4" lang="ja">
            ${parts.map(p=>{
              if(p.type==='text') return `<span>${esc(p.value)}</span>`;
              const filled=S.slots[p.slotIndex]!==null;
              const borderColor=p.isStar?'var(--color-primary)':'var(--color-sep)';
              const bg=p.isStar?'var(--color-primary-subtle)':'';
              return `<span class="inline-flex min-w-[4rem] items-center justify-center px-2 py-1 text-base" style="border:2px dashed ${borderColor};border-radius:var(--radius);background:${bg};cursor:pointer" onclick="selectSlot(${p.slotIndex})">
                ${filled?`<span class="font-medium">${esc(q.fragments[S.slots[p.slotIndex]])}</span>`
                  :p.isStar?'<span style="color:var(--color-primary);font-weight:700">★</span>'
                  :'<span class="text-fg-dim text-sm">___</span>'}
              </span>`;
            }).join('')}
          </div>
          ${!S.submitted?`
            <div class="mb-3">
              <p class="mb-2 text-sm text-fg-muted">點擊選項放入空格（再點空格可移除）：</p>
              <div class="flex flex-wrap gap-2">
                ${q.fragments.map((f,i)=>`
                  <button class="btn btn-outline btn-sm" style="opacity:${isFragmentPlaced(i)?'.3':'1'}" ${isFragmentPlaced(i)?'disabled':''} onclick="placeFragment(${i})">
                    <span lang="ja">${esc(f)}</span>
                  </button>
                `).join('')}
              </div>
            </div>
            <button onclick="submitMondai6()" ${!S.slots.every(s=>s!==null)?'disabled':''} class="btn btn-primary w-full mt-3">確認答案</button>
          `:''}
          ${S.submitted?renderFeedback(q.explanation):''}
          ${renderNavFooter(total)}
        </div>
      </div>`;
}

// Mondai 7: passage with blanks
function renderDrillMondai7(app){
  const q=S.questions[S.currentIndex];
  const total=S.questions.length;

  const allAnswered=S.blankAnswers.every(a=>a!==undefined);
  const renderedPassage=esc(q.passage).replace(/【(\d+)】/g,(match,numStr)=>{
    const num=parseInt(numStr);
    const i=q.blanks.findIndex(b=>b.blankNumber===num);
    if(i===-1) return match;
    const blank=q.blanks[i];
    const answered=S.blankAnswers[i]!==undefined;
    const isCurrent=S.currentBlankIndex===i;
    const selectedText=answered?esc(blank.choices[S.blankAnswers[i]]):'';

    // Build marker label
    let label, bg, color, border, shadow='none';
    if(isCurrent){
      label=`【${num}】`;
      bg='var(--color-primary)';color='var(--color-primary-fg)';border='var(--color-primary)';shadow='0 1px 3px rgba(0,0,0,.15)';
    }else if(answered&&S.submitted){
      const isCorrect=S.blankAnswers[i]===blank.correctIndex;
      label=`【${num}】 ${selectedText} ${isCorrect?'✓':'✗'}`;
      if(isCorrect){bg='var(--color-success-subtle)';color='var(--color-success-fg)';border='var(--color-success)'}
      else{bg='var(--color-danger-subtle)';color='var(--color-danger-fg)';border='var(--color-danger)'}
    }else if(answered){
      label=`【${num}】 ${selectedText}`;
      bg='var(--color-surface-hover)';color='var(--color-fg)';border='var(--color-sep-hover)';
    }else{
      label=`【${num}】`;
      bg='var(--color-primary-subtle)';color='var(--color-primary)';border='var(--color-primary-subtle)';
    }

    let html=`<span id="blank-${num}" style="display:inline-flex;align-items:center;gap:4px;border-radius:4px;padding:1px 8px;font-size:.85rem;font-weight:500;cursor:pointer;transition:all 150ms;background:${bg};color:${color};border:1px solid ${border};box-shadow:${shadow};white-space:nowrap" onclick="setBlankIndex(${i})">${label}</span>`;

    if(isCurrent){
      html+=`<div style="display:flex;flex-direction:column;gap:6px;margin:12px 0 8px;padding:12px 14px;background:var(--color-surface);border:1px solid var(--color-sep);border-radius:var(--radius)">
        ${blank.choices.map((c,ci)=>`
          <div class="${blankOptClass(ci,blank)}" onclick="selectBlankAnswer(${ci})">
            <div class="opt-indicator">${blankOptIndicator(ci,blank)}</div>
            <div class="opt-label"><span class="opt-letter">${ci+1}.</span>${esc(c)}</div>
          </div>`).join('')}
        ${S.submitted?`<div class="explanation" style="margin-top:4px"><h4>${I.info} 解析</h4><p>${esc(blank.explanation)}</p></div>`:''}
      </div>`;
    }
    return html;
  });

  app.innerHTML=`
      ${renderDrillHeader(total)}
      <div class="card mb-3">
        ${renderCardHeader()}
        <div class="card-body">
          ${q.passageTitle?`<h3 class="font-semibold mb-3" lang="ja">${esc(q.passageTitle)}</h3>`:''}
          <div class="text-base leading-loose whitespace-pre-line" lang="ja">${processNotes(renderedPassage)}</div>

          ${!S.submitted?`<button onclick="submitMondai7()" ${!allAnswered?'disabled':''} class="btn btn-primary w-full mt-3">提交全部答案</button>`:''}
          ${renderNavFooter(total)}
        </div>
      </div>`;
}

// Mondai 8-13: reading comprehension
function renderDrillReading(app){
  const q=S.questions[S.currentIndex];
  const total=S.questions.length;
  const hasFullPassage=q.passageContext&&q.passageContext.length>100;

  // Split A/B passages for mondai11 (統合理解)
  const abMatch=hasFullPassage&&q.passageContext.match(/^[AＡ]\n\n([\s\S]+?)\n\n[BＢ]\n\n([\s\S]+)$/);
  const abDefs=abMatch?extractNoteDefs(q.passageContext):{};
  const passageCard=abMatch
    ?`<div class="card mb-3">
        <div class="card-header" style="padding:10px 20px"><span class="text-sm font-semibold">A</span></div>
        <div class="card-body" style="padding:20px">
          <div class="text-base leading-loose whitespace-pre-line" lang="ja">${applyNotes(esc(abMatch[1]),abDefs)}</div>
        </div>
      </div>
      <div class="card mb-3">
        <div class="card-header" style="padding:10px 20px"><span class="text-sm font-semibold">B</span></div>
        <div class="card-body" style="padding:20px">
          <div class="text-base leading-loose whitespace-pre-line" lang="ja">${applyNotes(esc(abMatch[2]),abDefs)}</div>
        </div>
      </div>`
    :hasFullPassage
    ?`<div class="card mb-3">
        <div class="card-body" style="padding:20px">
          <div class="text-base leading-loose whitespace-pre-line" lang="ja">${processNotes(esc(q.passageContext))}</div>
        </div>
      </div>`
    :`<div class="card mb-3" style="border-style:dashed;background:var(--color-primary-subtle)">
        <div class="card-body">
          <p class="text-xs font-medium mb-1" style="color:var(--color-fg-dim)">文章概要</p>
          <p class="text-sm leading-relaxed" lang="ja">${processNotes(esc(q.passageContext||''))}</p>
        </div>
      </div>`;

  app.innerHTML=`
      ${renderDrillHeader(total)}
      ${passageCard}

      <div class="card mb-3">
        ${renderCardHeader()}
        <div class="card-body">
          <div class="text-sm mb-4" style="line-height:1.7" lang="ja">${esc(q.question)}</div>
          <div class="flex-col gap-2" style="display:flex">
            ${q.choices.map((c,i)=>`
              <div class="${optClass(i,q.correctIndex)}" onclick="selectChoice(${i})">
                <div class="opt-indicator">${optIndicator(i,q.correctIndex)}</div>
                <div class="opt-label"><span class="opt-letter">${i+1}.</span>${esc(c)}</div>
              </div>
            `).join('')}
          </div>
          ${S.submitted?renderFeedback(q.explanation):''}
          ${renderNavFooter(total)}
        </div>
      </div>`;
}

// === RESULT SCREEN ===
function renderResult(app){
  const total=S.questions.length;
  const pct=total>0?Math.round(S.sessionCorrect/total*100):0;
  const pass=pct>=70;
  const isWrongMode=S.mode==='wrong';
  const wrongStillLeft=getWrongQuestions().length;

  app.innerHTML=`
      <div class="breadcrumb">
        <a onclick="goHome()">首頁</a><span class="bc-sep">›</span><a onclick="goConfig()">${SECTIONS.find(s=>s.id===S.sectionFilter)?.label||'全部'}</a><span class="bc-sep">›</span><span>結果</span>
      </div>
      <div class="card mb-4">
        <div class="card-body text-center" style="padding:32px 20px">
          <div style="position:relative;width:120px;height:120px;margin:0 auto 16px">
            <svg width="120" height="120" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="54" fill="none" stroke="var(--color-sep)" stroke-width="4"/>
              <circle cx="60" cy="60" r="54" fill="none" stroke="${pass?'var(--color-success)':'var(--color-danger)'}" stroke-width="4" stroke-linecap="round"
                stroke-dasharray="${(2*Math.PI*54).toFixed(1)}" stroke-dashoffset="${(2*Math.PI*54*(1-pct/100)).toFixed(1)}"
                transform="rotate(-90 60 60)" style="transition:stroke-dashoffset .6s ease"/>
            </svg>
            <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center">
              <span style="font-size:1.5rem;font-weight:700;letter-spacing:-.03em;color:${pass?'var(--color-success)':'var(--color-danger)'}">${pct}%</span>
            </div>
          </div>
          <div class="font-semibold text-lg">${pass?'恭喜通過！':'繼續加油！'}</div>
          <p class="text-sm text-fg-muted mt-2">${isWrongMode
            ?(wrongStillLeft>0?`錯題本還剩 ${wrongStillLeft} 題待加強`:'所有錯題都答對了！')
            :(pass?'已達 70% 通過門檻':'通過門檻為 70%，再多練習')}</p>
          <div class="flex gap-2 justify-center mt-4 flex-wrap">
            ${isWrongMode&&wrongStillLeft>0?`<button class="btn btn-primary btn-sm" onclick="startWrongQuiz()">再練錯題</button>`:''}
            <button class="btn btn-primary btn-sm" onclick="startQuiz()">${I.refresh} 全新測驗</button>
            <button class="btn btn-ghost btn-sm" onclick="goHome()">首頁</button>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><span class="font-medium text-sm">答題回顧</span></div>
        <div>
          ${S.answerHistory.map((a,i)=>{
            if(!a) return '';
            const q=S.questions[i];
            if(!q) return '';
            const qType=q._type||S.mondaiType;
            const info=getTypeInfo(qType);
            const skipped=a.skipped;
            const badgeCls=a.correct?'badge-success':skipped?'badge-skip':'badge-danger';
            const badgeText=a.correct?'✓ 正確':skipped?'⚠ 跳過':'✗ 錯誤';
            let qText='',correctAns='',userAns='';
            if(qType==='mondai4'){
              qText=q.targetWord;
              correctAns=q.sentenceChoices[q.correctIndex];
              userAns=skipped?'跳過':a.selected>=0?q.sentenceChoices[a.selected]:'';
            }else if(qType==='mondai6'){
              qText=q.sentenceTemplate.replace(/(_\d_|★)/g,'____');
              correctAns=q.fragments[q.correctStarIndex];
              userAns=skipped?'跳過':a.selected>=0?q.fragments[a.selected]:'';
            }else if(qType==='mondai7'){
              qText=q.passageTitle||'文章の文法';
              correctAns=q.blanks.map(b=>'【'+b.blankNumber+'】'+b.choices[b.correctIndex]).join(' ');
              userAns=a.blankAnswers?q.blanks.map((b,bi)=>'【'+b.blankNumber+'】'+(a.blankAnswers[bi]!==undefined?b.choices[a.blankAnswers[bi]]:'?')).join(' '):'';
            }else{
              qText=q.sentence||q.question||'';
              correctAns=q.choices?q.choices[q.correctIndex]:'';
              userAns=skipped?'跳過':a.selected>=0&&q.choices?q.choices[a.selected]:'';
            }
            return `<div class="review-item">
              <div class="flex items-center justify-between mb-1">
                <span class="text-xs text-fg-dim">Q${i+1} · ${info?info.nameJa:''}</span>
                <span class="badge ${badgeCls}">${badgeText}</span>
              </div>
              <div class="text-sm mb-1" style="line-height:1.5">${esc(qText.length>80?qText.slice(0,80)+'...':qText)}</div>
              <div class="text-xs text-fg-muted">${!a.correct?`<span style="color:var(--color-danger-fg)">你：${esc(userAns)}</span> · `:''}正確：${esc(correctAns)}</div>
            </div>`;
          }).join('')}
        </div>
      </div>`;
}

// === OPTION HELPERS ===
function optClass(index,correctIndex){
  let cls='opt opt-radio';
  if(!S.submitted){
    if(S.selectedIndex===index) cls+=' opt-selected';
  }else{
    cls+=' opt-disabled';
    if(index===correctIndex) cls+=' opt-correct';
    else if(index===S.selectedIndex) cls+=' opt-wrong';
  }
  return cls;
}
function optIndicator(index,correctIndex){
  if(!S.submitted) return S.selectedIndex===index?'✓':'';
  if(index===correctIndex) return '✓';
  if(index===S.selectedIndex) return '✗';
  return '';
}
function blankOptClass(index,blank){
  const answer=S.blankAnswers[S.currentBlankIndex];
  let cls='opt opt-radio';
  if(!S.submitted){
    if(answer===index) cls+=' opt-selected';
  }else{
    cls+=' opt-disabled';
    if(index===blank.correctIndex) cls+=' opt-correct';
    else if(index===answer) cls+=' opt-wrong';
  }
  return cls;
}
function blankOptIndicator(index,blank){
  const answer=S.blankAnswers[S.currentBlankIndex];
  if(!S.submitted) return answer===index?'✓':'';
  if(index===blank.correctIndex) return '✓';
  if(index===answer) return '✗';
  return '';
}

// === FEEDBACK PANEL ===
function renderFeedback(explanation){
  return `
    <div class="explanation">
      <h4>${I.info} 解析</h4>
      <p>${explanation?esc(explanation):''}</p>
    </div>`;
}

// === TIPS ===
function renderTips(app){
  const data=TIPS[S.mondaiType];

  app.innerHTML=`
      <div class="breadcrumb">
        <a onclick="goHome()">首頁</a><span class="bc-sep">›</span><span>解題技巧</span>
      </div>

      ${data?`
        <h1 class="text-xl font-bold mb-4">${data.title}</h1>
        <div class="flex flex-col gap-3">
          ${data.tips.map(tip=>`
            <div class="card" style="padding:20px">
              <h3 class="font-semibold">${tip.heading}</h3>
              <p class="mt-2 text-sm leading-relaxed text-fg-muted">${tip.content}</p>
            </div>
          `).join('')}
        </div>
      `:`<p class="text-fg-muted">找不到此題型的技巧資料。</p>`}`;
}

// === INIT ===
render();
preloadAll().then(()=>{if(S.screen==='landing')render()});
