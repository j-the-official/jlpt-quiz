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
  {type:'mondai7',number:7,nameJa:'文章の文法',descriptionZh:'閱讀短文，為每個空格選出最適當的詞語或文法',section:'grammar',dataFile:'data/mondai7-passage-grammar.json',examCount:1},
  {type:'mondai8',number:8,nameJa:'内容理解（短文）',descriptionZh:'閱讀短文後，回答相關問題',section:'reading',dataFile:'data/mondai8-short-reading.json',examCount:4},
  {type:'mondai9',number:9,nameJa:'内容理解（中文）',descriptionZh:'閱讀中等長度的文章後，回答相關問題',section:'reading',dataFile:'data/mondai9-medium-reading.json',examCount:9},
  {type:'mondai10',number:10,nameJa:'内容理解（長文）',descriptionZh:'閱讀長篇文章後，回答相關問題',section:'reading',dataFile:'data/mondai10-long-reading.json',examCount:4},
  {type:'mondai11',number:11,nameJa:'統合理解',descriptionZh:'閱讀兩篇相關文章，比較並回答問題',section:'reading',dataFile:'data/mondai11-integrated-reading.json',examCount:3},
  {type:'mondai12',number:12,nameJa:'主張理解（長文）',descriptionZh:'閱讀長文，理解作者的主張與論點',section:'reading',dataFile:'data/mondai12-thematic-reading.json',examCount:3},
  {type:'mondai13',number:13,nameJa:'情報検索',descriptionZh:'從通知、廣告等文本中找出所需資訊',section:'reading',dataFile:'data/mondai13-information-retrieval.json',examCount:2},
];
function getTypeInfo(type){return QUESTION_TYPES.find(t=>t.type===type)}

// === TIPS DATA ===
// 以下技巧根據本題庫 640 題真題的實際統計與模式分析撰寫
const TIPS={
  mondai1:{title:'問題1 漢字讀音 — 解題技巧',tips:[
    {heading:'「整個讀音都不同」是最大宗陷阱',content:'本題庫 180 個干擾項中約八成是「另一個詞的完整讀音」（如「絶叫」的干擾項「せっきょう」其實是「説教」）。逐字拼讀最容易上當，背單字時要把「整個詞＋完整讀音」綁在一起記。'},
    {heading:'清濁音與長短音是第二層陷阱',content:'統計上清濁混淆最常見（か/が、と/ど），其次是長短音（よ/よう）、促音。像「余暇→よか」「賄う→まかなう」，不確定時把兩個版本都默唸一次，通常能喚起正確語感。'},
    {heading:'訓讀動詞・形容詞必背',content:'題庫中「裁く（さばく）」「戒める（いましめる）」「尊い（とうとい）」「粗い（あらい）」這類訓讀字每回穩定出 1-2 題。音讀規則完全幫不上忙，只能靠平時累積。'},
    {heading:'二字熟語用音讀規則縮小範圍',content:'「崇高（すうこう）」「遺憾（いかん）」等音讀詞，可先用常見音讀（高＝こう、憾＝かん）鎖定大概，再用清濁、長短音判斷細節。'},
  ]},
  mondai2:{title:'問題2 文脈規定 — 解題技巧',tips:[
    {heading:'固定搭配決勝負',content:'真題正解幾乎都是慣用搭配：「目標を掲げる」「不安を払拭する」「休日を返上する」「上位に食い込む」。背單字時連同「跟什麼詞搭配」一起背，比背中文意思有效得多。'},
    {heading:'先抓語境的正負與程度',content:'看空格前後判斷需要正面還是負面、程度強還是弱的詞，通常能先刪掉兩個選項再細比。'},
    {heading:'干擾項是「意思相近但搭配不合」',content:'例如該填「掲げて」的句子，「企てて」意思勉強通但搭配錯誤（企てる多用於陰謀、計畫）。把選項代入後唸唸看，不自然就刪。'},
    {heading:'外來語與擬態語穩定出題',content:'片假名詞和擬聲擬態詞每回必出。這類詞沒有漢字線索，平時遇到就連例句整句記下來。'},
  ]},
  mondai3:{title:'問題3 近義替換 — 解題技巧',tips:[
    {heading:'非漢字詞占近四成，是拉開差距的關鍵',content:'本題庫 60 題中純假名詞（副詞、擬態語、慣用語）有 17 題、片假名 6 題：「ことごとく＝すべて」「かねがね＝以前から」「お手上げ＝どうしようもない」。這些無法從漢字推義，必須專門累積。'},
    {heading:'片假名 ↔ 和語雙向互換',content:'「トレンド＝傾向」「リスク＝危険」「エキスパート＝専門家」「スケール＝規模」。考題兩個方向都出，背的時候也要雙向背。'},
    {heading:'用「方向」和「程度」比對',content:'干擾項常是方向相反（ずれ込む≠早くなる）或程度不同（若干≠かなり）。先確定底線詞的方向、程度，再逐一比對選項。'},
    {heading:'代入法驗證',content:'把選項放回原句，檢查通順度和語域（正式／口語）。意思接近但語感不合的就是干擾項。'},
  ]},
  mondai4:{title:'問題4 詞語用法 — 解題技巧',tips:[
    {heading:'記「搭配對象」而非中文翻譯',content:'錯誤選項的套路是把詞用在錯的對象上：「収容」用於容納觀眾正確、用於辭典收錄例句就錯（應為「収録」）；「怠る」用於疏忽注意正確、用於荒廢嗜好就錯。'},
    {heading:'順手想「這句該用哪個詞」',content:'每個錯誤句其實都有一個該用的正確詞（遮断→中止、要請→需要、改修→映画化）。練習時把它想出來，等於一題練四個詞。'},
    {heading:'正負語感與使用範圍',content:'「あっけない」帶失望感，「おびただしい」多形容血、蟲、傷亡等負面事物的大量。語感或範圍不合就能直接刪。'},
    {heading:'排除法最有效',content:'先刪兩個明顯不自然的句子，再細比剩下兩句的搭配對象和語境。'},
  ]},
  mondai5:{title:'問題5 句子文法 — 解題技巧',tips:[
    {heading:'100 題 100 個文法點，考的是廣度',content:'本題庫十回份的正解文法點完全零重複。與其鑽研冷僻用法，不如把 N1 句型清單全面過一遍，每個句型至少認得接續和核心語意。'},
    {heading:'接續是第一道篩子',content:'「〜てからというもの」接て形、「をもってすれば」接名詞、「からには」接常體（辞書形・た形皆可）。先看空格前面的形態，通常能直接刪掉 1-2 個選項。'},
    {heading:'敬語題必考「方向」',content:'每回固定 1 題敬語／會話題。授受方向是經典陷阱：主語用「が」時只能接「〜てくださる」（たくさんの方がおいでくださいました）；「〜ていただく」的動作者必須用「に」標示。'},
    {heading:'語氣與評價要前後一致',content:'正解要讓整句邏輯自洽：「〜てまで」配負面評價（我慢してまでする節約は続かない）、「〜てこそ」配正面結果。接續正確但語意矛盾的選項照樣是錯的。'},
  ]},
  mondai6:{title:'問題6 排列組合 — 解題技巧',tips:[
    {heading:'先鎖定「文法上必相連」的組合',content:'「〜たとたん」前面必是動詞た形、「かのような」後面必接名詞。四個片段中通常有一對可以先黏死，剩下的排列就簡單了。'},
    {heading:'從句尾往回推',content:'空格後的固定文字（「〜ことが判明しました」「〜ので注意が必要だ」）決定最後一格的形態。從後往前逆推常比順推快。'},
    {heading:'組出完整句再對★',content:'題庫中★位置的正解常是助詞結尾的片段或機能語（限り、反面、うえに），單憑感覺容易誤選。務必在腦中唸出整句，確認通順後再取★那格的片段。'},
    {heading:'助詞是排列的路標',content:'「は/が」前面是主語、「を」後面遲早接動詞、「の」連接名詞。先用助詞把片段分組，再決定順序。'},
  ]},
  mondai7:{title:'問題7 文章文法 — 解題技巧',tips:[
    {heading:'這是閱讀題，不是文法題',content:'本題庫 40 個空格中 23 個考「配合上下文的文法形式」。先把整段讀完、掌握筆者立場和語氣，再回頭填空，正確率會高很多。'},
    {heading:'文末語氣題看「筆者態度」',content:'句尾表達（〜ものです、〜わけです、〜でしょう）考的是該句在文中是斷定、推測還是一般論。判斷筆者這句話的功能再選。'},
    {heading:'接續詞題先預測邏輯關係',content:'順接（したがって）、逆接（それにもかかわらず）、追加（そればかりでなく）、話題引入（そういえば）。先自己判斷前後句關係，再找對應的接續詞，不要被選項牽著走。'},
    {heading:'指示詞題往前文找',content:'「そうした保育園」「それだけが」的指涉對象一定在前文。把候選內容代入指示詞的位置，能還原通順文意的才是正解。'},
  ]},
  mondai8:{title:'問題8 內容理解（短文）— 解題技巧',tips:[
    {heading:'一篇只問一件事，答案常在結尾',content:'短文題幾乎都問「筆者の考えに合うのはどれか」。200 字左右的文章，最後 1-2 句通常就是筆者的結論句，先讀懂它。'},
    {heading:'錯誤選項四大套路',content:'依本題庫統計，干擾項不外乎：①方向相反・因果顛倒 ②偏離重點（內容是真的但不是文章想說的）③偷換概念（把 A 的性質說成 B）④無中生有（文章根本沒提）。刪選項時對號入座。'},
    {heading:'別用常識答題',content:'「符合常識但文章沒說」是最陰險的陷阱。判斷依據永遠是文章寫了什麼，不是你知道什麼。'},
    {heading:'書信・通知題找「目的句」',content:'商業郵件題問的是「這封信要做什麼」，直接找徵詢或請託句（いかがいたしましょうか、ご返信お待ちしております）附近的內容。'},
  ]},
  mondai9:{title:'問題9 內容理解（中文）— 解題技巧',tips:[
    {heading:'依段落順序出題',content:'一篇 2-3 題，通常第一題對應前半段、最後一題問全文主旨或筆者主張。帶著題目讀，找到對應段落就能作答，不必反覆通讀。'},
    {heading:'劃線句題看前後一句',content:'問「①〜とはどういうことか」時，答案幾乎都在劃線句的前一句或後一句——作者自己會換句話說。'},
    {heading:'「筆者の考え」題找表態句',content:'尋找「〜のではないか」「〜べきだ」「〜と思う」「〜が重要だ」等筆者表態的句子，再與選項比對。'},
    {heading:'排除套路與問題8相同',content:'方向相反、偏離重點、偷換概念、無中生有——四招用到底，特別注意選項對原文「程度」的誇大或縮小。'},
  ]},
  mondai10:{title:'問題10 內容理解（長文）— 解題技巧',tips:[
    {heading:'先看題目再讀文章',content:'長文一篇 3-4 題。先掃過所有題幹，知道要找「理由」「指示內容」還是「主張」，邊讀邊標記，比讀完再回找省時得多。'},
    {heading:'理由題找因果標記',content:'問「なぜか」時，答案句幾乎都帶「から」「ため」「のだ」等因果標記，或緊跟在設問句之後。'},
    {heading:'主旨題留到最後作答',content:'做完前面的細節題，對文章結構已有把握，再回答「筆者が最も言いたいこと」，準確率更高。'},
    {heading:'提防「以偏概全」型干擾項',content:'長文的干擾項常拿文中某一段的真實內容冒充全文主旨。正解必須涵蓋結論段的立場，而不只是某個段落的細節。'},
  ]},
  mondai11:{title:'問題11 統合理解 — 解題技巧',tips:[
    {heading:'先用一句話總結 A、B 各自的立場',content:'本題庫 21 題中 18 題是「AとBはどのように述べているか」型。讀完先在心裡各用一句話概括 A、B 的主張，再看選項，不要邊看選項邊回找。'},
    {heading:'共通題與對比題的判法不同',content:'「AもBも〜」要兩篇都成立才對，只要一篇不符就刪；「Aは〜、Bは〜」要前後兩半各自對號入座，一半錯全錯。'},
    {heading:'最大陷阱是立場對調',content:'干擾項常把 B 的觀點安到 A 頭上。比對每個選項時，先確認「這句話到底是誰說的」。'},
    {heading:'書信往來題抓「請託與條件」',content:'邀請函與回信的題組，考點通常是「B 答應的前提條件」或「A 請託的具體內容」，注意條件句（〜なら、〜場合は）。'},
  ]},
  mondai12:{title:'問題12 主張理解（長文）— 解題技巧',tips:[
    {heading:'主張在結尾，前面都是鋪陳',content:'「筆者が最も言いたいこと」幾乎都濃縮在最後一段。前面的具體例子和讓步段落都是為結論鋪路，別被例子的細節帶走。'},
    {heading:'認出「讓步→反轉」結構',content:'筆者常先承認反方（たしかに／もちろん〜）再亮出真正主張（しかし／だが〜）。「讓步句的內容」做成選項就是陷阱。'},
    {heading:'理由題核對因果方向',content:'問「〜と考える理由」時，確認選項的因果鏈與文章一致——原因和結果對調的選項是常見干擾項。'},
    {heading:'偏離重點型選項最多',content:'干擾項常是「文章確實提過、但不是這一題要問的」。回到題幹確認問的是什麼，再檢查選項是否正面回答。'},
  ]},
  mondai13:{title:'問題13 情報檢索 — 解題技巧',tips:[
    {heading:'先讀題目條件，再回公告查證',content:'情報檢索是「帶著條件查表」：先把題目人物的條件列出來（年齡、日期、身分、預算），再逐一到公告中核對，不要先讀公告。'},
    {heading:'「ただし」後面藏答案',content:'本題庫 20 題中 8 題的關鍵在例外條款：「ただし年度内最終期限は3月24日」「1年以内に使用歴がある場合は不要」。看到ただし、なお、※就畫線。'},
    {heading:'期限取「較早、較嚴」者',content:'「活動後2個月內」和「最終期限3/24」並存時，取較早的那個；多份文件要配合最早的期限一併提出。日期題動手算，不要心算。'},
    {heading:'多人選擇題逐項打勾排除',content:'「誰能參加」型題目，把每個人的條件跟資格逐項比對（年齡→有效期限→地點→時間），逐一排除後剩下的就是答案。'},
  ]},
};

// === DATA LOADING ===
const DATA_VERSION='5';
const questionBanks={};
const loadErrors=[];
async function loadQuestions(type){
  if(questionBanks[type]) return questionBanks[type];
  const info=getTypeInfo(type);if(!info) return [];
  try{
    const resp=await fetch(info.dataFile+'?v='+DATA_VERSION);
    if(!resp.ok) throw new Error('HTTP '+resp.status);
    const data=await resp.json();
    questionBanks[type]=(data.questions||[]).map(q=>({...q,_type:type}));
    return questionBanks[type];
  }catch(e){console.error('Failed to load',type,e);if(!loadErrors.includes(type))loadErrors.push(type);return[]}
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
  try{
    const raw=localStorage.getItem('jlpt-n1-progress');
    if(raw){
      const s=JSON.parse(raw);
      if(s&&typeof s==='object'&&s.progress&&typeof s.progress==='object'){
        QUESTION_TYPES.forEach(t=>{
          const tp=s.progress[t.type];
          if(!tp||typeof tp.totalAttempted!=='number'||typeof tp.totalCorrect!=='number'||!Array.isArray(tp.attempts)||!Array.isArray(tp.wrongQuestionIds)){
            s.progress[t.type]={type:t.type,totalAttempted:0,totalCorrect:0,attempts:[],wrongQuestionIds:[]};
          }
        });
        return s;
      }
    }
  }catch(e){}
  return createEmptyProgress();
}
function saveProgress(state){try{localStorage.setItem('jlpt-n1-progress',JSON.stringify(state))}catch(e){console.error('saveProgress failed',e)}}

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
  tp.attempts=[...tp.attempts,{questionId,selectedIndex,correct,timestamp:Date.now()}].slice(-500);
  state.progress[type]=tp;
  state.lastActivity=Date.now();
  saveProgress(state);
}

// === REVIEW / SPACED REPETITION (localStorage: 'jlpt-n1-review') ===
const INTERVALS_MS=[3600000,14400000,86400000,172800000,345600000,604800000];
function loadReview(){
  try{const raw=localStorage.getItem('jlpt-n1-review');if(raw){const v=JSON.parse(raw);if(Array.isArray(v))return v}}catch(e){}
  return [];
}
function saveReview(entries){try{localStorage.setItem('jlpt-n1-review',JSON.stringify(entries))}catch(e){console.error('saveReview failed',e)}}
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
function loadSeen(){try{const v=JSON.parse(localStorage.getItem('jlpt-n1-seen'));return Array.isArray(v)?v:[]}catch(e){return[]}}
function saveSeen(list){try{localStorage.setItem('jlpt-n1-seen',JSON.stringify(list))}catch(e){console.error('saveSeen failed',e)}}
function addSeen(qId){const list=loadSeen();if(!list.includes(qId)){list.push(qId);saveSeen(list)}}

// === HELPERS ===
function shuffle(a){a=[...a];for(let i=a.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function underlineText(text){return text.replace(/__(.+?)__/g,'<span style="border-bottom:2px solid var(--color-primary);padding-bottom:1px" lang="ja">$1</span>')}
function highlightTarget(choiceHtml,tw){
  const wrap=s=>`<span style="border-bottom:2px solid var(--color-danger);padding-bottom:1px">${s}</span>`;
  if(tw&&choiceHtml.includes(tw)) return choiceHtml.replace(tw,wrap(tw));
  if(tw&&tw.length>=2){
    const stem=tw.slice(0,-1).replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
    const m=choiceHtml.match(new RegExp(stem+'[ぁ-ん]*'));
    if(m) return choiceHtml.replace(m[0],wrap(m[0]));
  }
  return choiceHtml;
}
function esc(s){const d=document.createElement('div');d.textContent=s;return d.innerHTML}
function fwDigit(s){return String(s).replace(/[0-9]/g,c=>'０１２３４５６７８９'[+c])}
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
let noteCloser=null;
function toggleNote(el){
  const wasActive=el.classList.contains('active');
  document.querySelectorAll('.note-ref.active').forEach(r=>r.classList.remove('active'));
  if(noteCloser){document.removeEventListener('click',noteCloser);noteCloser=null}
  if(!wasActive){
    el.classList.add('active');
    noteCloser=e=>{
      if(!el.contains(e.target)){
        el.classList.remove('active');
        document.removeEventListener('click',noteCloser);noteCloser=null;
      }
    };
    setTimeout(()=>{if(noteCloser)document.addEventListener('click',noteCloser)},0);
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
function getWrongQuestions(sectionId){
  const state=loadProgress();
  const review=loadReview();
  const wrong=[];
  getTypesForSection(sectionId||'全部').forEach(qt=>{
    const tp=state.progress[qt.type];
    if(!tp) return;
    const bank=questionBanks[qt.type]||[];
    tp.wrongQuestionIds.forEach(id=>{
      const q=bank.find(x=>x.id===id);
      if(q&&hasPassage(q)) wrong.push(q);
    });
  });
  // SRS：依下次複習時間排序（到期越久越優先；沒有紀錄的視為立即到期）
  const nextOf=id=>{const e=review.find(r=>r.questionId===id);return e?e.nextReview:0};
  wrong.sort((a,b)=>nextOf(a.id)-nextOf(b.id));
  return wrong;
}
function getDueCount(wrongList){
  const review=loadReview();
  const now=Date.now();
  return wrongList.filter(q=>{const e=review.find(r=>r.questionId===q.id);return !e||e.nextReview<=now}).length;
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
function setTypeFilter(type){S.typeFilter=S.typeFilter===type?'全部':type;render()}

// === QUIZ START ===
function isReadingType(type){return ['mondai8','mondai9','mondai10','mondai11','mondai12','mondai13'].includes(type)}
function groupByPassage(questions){
  const groups=[];const map=new Map();
  questions.forEach(q=>{
    const key=q._type+'|'+(q.passageContext||'');
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
      const rest=groups.filter(g=>!unseen.includes(g));
      const src=shuffle(unseen).concat(shuffle(rest));
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
  const wl=getWrongQuestions(S.sectionFilter);
  if(!wl.length) return;
  // 保持 SRS 到期順序，僅將同文章題目聚在一起
  S.questions=groupByPassage(wl).flat();
  initDrillState();
  S.mode='wrong';S.screen='drill';render();
}
function resetTypeState(q){
  const type=q?q._type:null;
  if(type==='mondai6'){
    S.slots=new Array(q&&Array.isArray(q.fragments)&&q.fragments.length?q.fragments.length:4).fill(null);
    S.activeSlot=null;
  }
  if(type==='mondai7'){
    S.blankAnswers=q&&q.blanks?new Array(q.blanks.length).fill(undefined):[];
    S.currentBlankIndex=-1;
  }
}
function initDrillState(){
  S.currentIndex=0;S.selectedIndex=-1;S.submitted=false;
  S.reviewChoice=-1;S.blankReview=-1;
  S.slots=[null,null,null,null];S.activeSlot=null;
  S.blankAnswers=[];S.currentBlankIndex=-1;
  S.sessionCorrect=0;S.sessionWrong=0;S.skipCount=0;S.answerHistory=[];
  resetTypeState(S.questions[0]);
}

// === QUIZ LOGIC ===
function selectChoice(index){
  if(S.submitted){
    const cq=S.questions[S.currentIndex];
    if(cq&&cq.choiceExplanations){S.reviewChoice=index;S._noScroll=true;render();}
    return;
  }
  S.selectedIndex=index;
  S.submitted=true;
  S.reviewChoice=index;
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
  S.submitted=true;S.selectedIndex=-1;S.reviewChoice=-1;
  const q=S.questions[S.currentIndex];
  const type=q._type||S.mondaiType;
  S.skipCount++;
  recordAttempt(q.id,type,-1,false);
  addSeen(q.id);
  const h={selected:-1,correct:false,skipped:true};
  if(type==='mondai6') h.slots=[...S.slots];
  if(type==='mondai7') h.blankAnswers=[...S.blankAnswers];
  S.answerHistory[S.currentIndex]=h;
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
  S.blankReview=-1;
  resetTypeState(S.questions[S.currentIndex]);
  if(a){
    S.submitted=true;
    S.selectedIndex=a.selected!==undefined?a.selected:-1;
    S.reviewChoice=S.selectedIndex>=0?S.selectedIndex:-1;
    if(a.slots) S.slots=[...a.slots];
    if(a.blankAnswers){S.blankAnswers=[...a.blankAnswers];S.currentBlankIndex=-1}
  }else{
    S.submitted=false;S.selectedIndex=-1;S.reviewChoice=-1;
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
  if(S.submitted){
    const cq=S.questions[S.currentIndex];
    const cb=cq&&cq.blanks&&cq.blanks[S.currentBlankIndex];
    if(cb&&cb.choiceExplanations){S.blankReview=choiceIndex;S._noScroll=true;render();}
    return;
  }
  S.blankAnswers=[...S.blankAnswers];
  S.blankAnswers[S.currentBlankIndex]=choiceIndex;
  const nextUnanswered=S.blankAnswers.findIndex((a,i)=>i>S.currentBlankIndex&&a===undefined);
  if(nextUnanswered!==-1) S.currentBlankIndex=nextUnanswered;
  S._noScroll=true;
  render();
}
function setBlankIndex(idx){S.currentBlankIndex=S.currentBlankIndex===idx?-1:idx;S.blankReview=-1;S._noScroll=true;render();if(S.currentBlankIndex===-1)return;const q=S.questions[S.currentIndex];const num=q.blanks[idx]?.blankNumber;const el=num&&document.getElementById('blank-'+num);if(el)el.scrollIntoView({behavior:'smooth',block:'center'})}
function submitMondai7(){
  if(!S.blankAnswers.every(a=>a!==undefined)||S.submitted)return;
  S.submitted=true;
  const q=S.questions[S.currentIndex];
  const type=q._type||S.mondaiType;
  const blanksCorrect=q.blanks.filter((b,i)=>S.blankAnswers[i]===b.correctIndex).length;
  const allCorrect=blanksCorrect===q.blanks.length;
  recordAttempt(q.id,type,-1,allCorrect);
  addSeen(q.id);
  S.sessionCorrect+=blanksCorrect;
  S.sessionWrong+=q.blanks.length-blanksCorrect;
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
    return `<div class="exam-card" role="button" tabindex="0" onclick="goStart('${sec.id}')" style="display:flex;align-items:center;justify-content:space-between;gap:12px">
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
    ${loadErrors.length?`<div class="card mb-4" style="border-color:var(--color-danger)">
      <div class="card-body" style="display:flex;align-items:center;gap:12px">
        <p class="text-sm" style="color:var(--color-danger-fg);flex:1">部分題庫載入失敗（${loadErrors.length} 個檔案），請檢查網路連線。</p>
        <button class="btn btn-primary btn-sm" onclick="location.reload()">重試</button>
      </div>
    </div>`:''}
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
  const wl=getWrongQuestions(S.sectionFilter);

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
      return `<div class="chip ${S.typeFilter===qt.type?'active':''}" role="button" tabindex="0" onclick="setTypeFilter('${qt.type}')">${qt.nameJa}</div>`;
    }).join('');

  const secLabel=SECTIONS.find(s=>s.id===S.sectionFilter)?.label||'全部';

  app.innerHTML=`
    <div class="breadcrumb"><a onclick="goHome()" role="button" tabindex="0">首頁</a><span class="bc-sep">›</span><span>${secLabel}</span></div>

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
        <div style="display:flex;justify-content:flex-end;gap:8px">
          ${S.typeFilter!=='全部'&&TIPS[S.typeFilter]?`<button class="btn btn-ghost btn-sm" onclick="goTips('${S.typeFilter}')">💡 解題技巧</button>`:''}
          <button class="btn btn-primary btn-sm" onclick="startQuiz()">${I.play} 開始測驗</button>
        </div>
      </div>
    </div>

    ${wl.length?`<div class="card mb-4">
      <div class="card-body flex-col gap-3" style="display:flex">
        <div class="flex items-center gap-2">
          <span class="font-medium text-sm">錯題本</span>
          <span class="text-xs text-fg-dim">${wl.length} 題${(()=>{const d=getDueCount(wl);return d?`・<span style="color:var(--color-skip)">${d} 題到期</span>`:''})()}</span>
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
  const answered=S.answerHistory.filter(Boolean).length;
  const prog=total>0?(answered/total*100).toFixed(1):'0';
  const secLabel=SECTIONS.find(s=>s.id===S.sectionFilter)?.label||'全部';
  return `<div class="breadcrumb">
    <a onclick="goHome()" role="button" tabindex="0">首頁</a><span class="bc-sep">›</span><a onclick="goConfig()" role="button" tabindex="0">${secLabel}</a><span class="bc-sep">›</span><span>${modeLabel}</span>
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
  if(['mondai2','mondai5'].includes(type)){sentenceHtml=sentenceHtml.replace(/（\s*）/g,`<span style="display:inline-block;width:4em;border-bottom:2px solid var(--color-danger);margin:0 2px"></span>`);}

  app.innerHTML=`
      ${renderDrillHeader(total)}
      <div class="card mb-3">
        ${renderCardHeader()}
        <div class="card-body">
          <div class="text-sm mb-4" style="line-height:1.7;white-space:pre-line" lang="ja">
            ${sentenceHtml}
          </div>
          <div class="flex-col gap-2" style="display:flex">
            ${q.choices.map((c,i)=>`
              <div class="${optClass(i,q.correctIndex)}" role="button" tabindex="0" onclick="selectChoice(${i})">
                <div class="opt-indicator">${optIndicator(i,q.correctIndex)}</div>
                <div class="opt-label"><span class="opt-letter">${i+1}.</span>${esc(c)}</div>
              </div>
            `).join('')}
          </div>
          ${S.submitted?renderFeedback(q):''}
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
              <div class="${optClass(i,q.correctIndex)}" role="button" tabindex="0" onclick="selectChoice(${i})">
                <div class="opt-indicator">${optIndicator(i,q.correctIndex)}</div>
                <div class="opt-label"><span class="opt-letter">${i+1}.</span><span lang="ja">${highlightTarget(esc(c),esc(q.targetWord))}</span></div>
              </div>
            `).join('')}
          </div>
          ${S.submitted?renderFeedback(q):''}
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
              let borderColor=p.isStar?'var(--color-primary)':'var(--color-sep)';
              let bg=p.isStar?'var(--color-primary-subtle)':'';
              let borderStyle='dashed';
              if(S.submitted&&filled){
                const ok=S.slots[p.slotIndex]===q.correctOrder[p.slotIndex];
                borderColor=ok?'var(--color-success)':'var(--color-danger)';
                bg=ok?'var(--color-success-subtle)':'var(--color-danger-subtle)';
                borderStyle='solid';
              }
              return `<span class="inline-flex min-w-[4rem] items-center justify-center px-2 py-1 text-base" role="button" tabindex="0" style="border:2px ${borderStyle} ${borderColor};border-radius:var(--radius);background:${bg};cursor:${S.submitted?'default':'pointer'}" onclick="selectSlot(${p.slotIndex})">
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
          ${S.submitted?renderFeedback(q):''}
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
    const numFw=fwDigit(num);
    let label, bg, color, border, shadow='none';
    if(isCurrent){
      label=`【${numFw}】`;
      bg='var(--color-primary)';color='var(--color-primary-fg)';border='var(--color-primary)';shadow='0 1px 3px rgba(0,0,0,.15)';
    }else if(answered&&S.submitted){
      const isCorrect=S.blankAnswers[i]===blank.correctIndex;
      label=`【${numFw}】 ${selectedText} ${isCorrect?'✓':'✗'}`;
      if(isCorrect){bg='var(--color-success-subtle)';color='var(--color-success-fg)';border='var(--color-success)'}
      else{bg='var(--color-danger-subtle)';color='var(--color-danger-fg)';border='var(--color-danger)'}
    }else if(answered){
      label=`【${numFw}】 ${selectedText}`;
      bg='var(--color-surface-hover)';color='var(--color-fg)';border='var(--color-sep-hover)';
    }else{
      label=`【${numFw}】`;
      bg='var(--color-primary-subtle)';color='var(--color-primary)';border='var(--color-primary-subtle)';
    }

    let html=`<span id="blank-${num}" role="button" tabindex="0" style="display:inline-flex;align-items:center;gap:4px;border-radius:4px;padding:1px 8px;font-size:.85rem;font-weight:500;cursor:pointer;transition:all 150ms;background:${bg};color:${color};border:1px solid ${border};box-shadow:${shadow};white-space:nowrap" onclick="setBlankIndex(${i})">${label}</span>`;

    if(isCurrent){
      html+=`<div style="display:flex;flex-direction:column;gap:6px;margin:12px 0 8px;padding:12px 14px;background:var(--color-surface);border:1px solid var(--color-sep);border-radius:var(--radius)">
        ${blank.choices.map((c,ci)=>`
          <div class="${blankOptClass(ci,blank)}" role="button" tabindex="0" onclick="selectBlankAnswer(${ci})">
            <div class="opt-indicator">${blankOptIndicator(ci,blank)}</div>
            <div class="opt-label"><span class="opt-letter">${ci+1}.</span>${esc(c)}</div>
          </div>`).join('')}
        ${S.submitted?renderBlankFeedback(blank):''}
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
  const abDefs=abMatch?extractNoteDefs(esc(q.passageContext)):{};
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
              <div class="${optClass(i,q.correctIndex)}" role="button" tabindex="0" onclick="selectChoice(${i})">
                <div class="opt-indicator">${optIndicator(i,q.correctIndex)}</div>
                <div class="opt-label"><span class="opt-letter">${i+1}.</span>${esc(c)}</div>
              </div>
            `).join('')}
          </div>
          ${S.submitted?renderFeedback(q):''}
          ${renderNavFooter(total)}
        </div>
      </div>`;
}

// === RESULT SCREEN ===
function scoreUnits(){
  return S.questions.reduce((s,q)=>s+((q._type==='mondai7'&&q.blanks)?q.blanks.length:1),0);
}
function renderResult(app){
  const total=scoreUnits();
  const pct=total>0?Math.round(S.sessionCorrect/total*100):0;
  const pass=pct>=70;
  const isWrongMode=S.mode==='wrong';
  const wrongStillLeft=getWrongQuestions(S.sectionFilter).length;

  app.innerHTML=`
      <div class="breadcrumb">
        <a onclick="goHome()" role="button" tabindex="0">首頁</a><span class="bc-sep">›</span><a onclick="goConfig()" role="button" tabindex="0">${SECTIONS.find(s=>s.id===S.sectionFilter)?.label||'全部'}</a><span class="bc-sep">›</span><span>結果</span>
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
              correctAns=q.blanks.map(b=>'【'+fwDigit(b.blankNumber)+'】'+b.choices[b.correctIndex]).join(' ');
              userAns=skipped?'跳過':a.blankAnswers?q.blanks.map((b,bi)=>'【'+fwDigit(b.blankNumber)+'】'+(a.blankAnswers[bi]!==undefined?b.choices[a.blankAnswers[bi]]:'?')).join(' '):'';
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
    const rIdx=S.reviewChoice>=0?S.reviewChoice:correctIndex;
    if(index===rIdx) cls+=' opt-reviewing';
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
    const rIdx=S.blankReview>=0?S.blankReview:blank.correctIndex;
    if(index===rIdx) cls+=' opt-reviewing';
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
function renderFeedback(q){
  const ce=q.choiceExplanations;
  const ch=q.choices||q.sentenceChoices;
  let text=q.explanation||'';
  if(ce&&ch){
    const idx=(S.reviewChoice>=0&&S.reviewChoice<ch.length)?S.reviewChoice:q.correctIndex;
    text=ce[idx]||text;
  }
  return `
    <div class="explanation">
      <h4>${I.info} 解析</h4>
      <p>${esc(text)}</p>
    </div>`;
}
function renderBlankFeedback(blank){
  const ce=blank.choiceExplanations;
  let text=blank.explanation||'';
  if(ce){
    const idx=(S.blankReview>=0&&S.blankReview<blank.choices.length)?S.blankReview:blank.correctIndex;
    text=ce[idx]||text;
  }
  return `<div class="explanation" style="margin-top:4px"><h4>${I.info} 解析</h4><p>${esc(text)}</p></div>`;
}

// === TIPS ===
function renderTips(app){
  const data=TIPS[S.mondaiType];
  const secLabel=SECTIONS.find(s=>s.id===S.sectionFilter)?.label||'全部';

  app.innerHTML=`
      <div class="breadcrumb">
        <a onclick="goHome()" role="button" tabindex="0">首頁</a><span class="bc-sep">›</span><a onclick="goConfig()" role="button" tabindex="0">${secLabel}</a><span class="bc-sep">›</span><span>解題技巧</span>
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
        <div class="flex gap-2 mt-4">
          <button class="btn btn-ghost btn-sm" onclick="goConfig()">${I.arrowLeft} 返回</button>
          <button class="btn btn-primary btn-sm" onclick="startQuiz()">${I.play} 開始測驗</button>
        </div>
      `:`<p class="text-fg-muted">找不到此題型的技巧資料。</p>`}`;
}

// === INIT ===
document.addEventListener('keydown',e=>{
  if((e.key==='Enter'||e.key===' ')&&e.target instanceof HTMLElement&&e.target.getAttribute('role')==='button'){
    e.preventDefault();e.target.click();
  }
});
render();
preloadAll().then(()=>{if(S.screen==='landing'||S.screen==='start')render()});
