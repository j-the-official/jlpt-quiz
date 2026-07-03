# 專案全面檢查報告（2026-07-03）

> **✅ 修正狀態（2026-07-03）：除下列項目外全部修正完畢。**
>
> **未修（需要你決定或屬大工程）：**
> 1. **H1 讀解全文補齊**（181 題）— 內容工程，需原文來源，建議分場次批次處理
> 2. **TIPS 解題技巧無入口** — 程式與資料都在但沒有按鈕（README 原本宣稱此功能）；要加入口還是整段刪除，請決定
> 3. **SRS 間隔重複模組只寫不讀** — 要接上錯題排序還是移除，請決定
> 4. **m7 的 localStorage 進度統計仍以「篇」為單位**（session 計分已改逐空）— 要改儲存格式需遷移舊資料，暫維持
> 5. **style.css 重新編譯** — 沙箱無法跑 Tailwind（缺 Linux 二進位），已改 build script 為不壓縮；請在你機器上跑一次 `npm run build` 確認輸出與現有檔案一致
> 6. 檢查報告（本檔與 data-review-report.md）仍在 git 中 — 已從部署排除（.assetsignore），要不要移出 repo 由你決定
>
> 其餘 H2、M1–M12、低 1–16 全數修正（低 12 死程式碼僅移除確定無用的 getExamCount／setSectionFilter／trophy／flame 圖示，TIPS 與 SRS 保留待決定）。

範圍：app.js、index.html、style.css、src/input.css、wrangler.json、package.json、README、.gitignore、資料↔程式碼契約。題庫內容（題目/答案/解說）上次已逐題檢查，不在此範圍。

**整體結論**：架構乾淨（單檔 vanilla JS SPA）、esc() 跳脫紀律良好、onclick 無資料注入面、640 題結構契約全數通過、JSON 全部有效、CSS class 無缺漏。真正的風險集中在兩個高嚴重度問題：**79% 的讀解題永遠不會出題**、**wrangler 會把 node_modules 與內部文件整包公開部署**。

---

## 高嚴重度（2）

### H1. 讀解題庫 79% 是「永不出題」的殭屍資料
`app.js:214` 的 `hasPassage()` 會過濾掉 `passageContext ≤ 100 字`（只有摘要、沒有全文）的讀解題——沒有原文本來就無法作答，過濾本身是對的，問題在資料：

| 題型 | 可出題 / 總數 |
|---|---|
| mondai8 | 8 / 40 |
| mondai9 | 16 / 84 |
| mondai10 | 6 / 32 |
| mondai11 | 4 / 21 |
| mondai12 | 6 / 33 |
| mondai13 | 9 / 20 |
| **合計** | **49 / 230（181 題被過濾）** |

影響：使用者實際能練的讀解題極少且很快重複；題庫數字虛胖。
建議：補齊全文（大工程、可分批），或短期先在 UI 誠實顯示可用題數、把 stub 題移到獨立待補清單。

### H2. wrangler 部署會上傳 node_modules 與內部文件
`wrangler.json` 的 `assets.directory: "."`，且無 `.assetsignore` → 部署時會把 **node_modules（18MB、458 檔）**、`data-review-report.md`、`package-lock.json`、`src/`、`README.md`、`wrangler.json` 本身全部上傳成可公開存取的 URL。
建議：新增 `.assetsignore`（`node_modules/`、`src/`、`*.md`、`package*.json`、`wrangler.json`、`.wrangler/`），或改用 `public/` 子目錄只放要上線的檔案。

---

## 中嚴重度（12）

| # | 位置 | 問題 | 建議 |
|---|---|---|---|
| M1 | app.js:462-466 | mondai7 整篇 all-or-nothing 計 1 題（錯一空＝整篇錯），且 examCount:4 會抽 4 篇（≈16 空，真實考試 1 篇）→ 正確率與 70% 及格門檻雙重扭曲 | 以 blank 為計分單位；examCount 改 1 |
| M2 | app.js:344-356, 380-394 | 跳過 mondai6/7 後用「上一題」回看：skip 未快照 slots/blankAnswers，restoreAnswer 只在有快照時還原 → 顯示殘留的排序/作答（計分不受影響、顯示錯誤） | skip 時一併快照，或還原前先按題型重置 |
| M3 | app.js:99-128, 539 | localStorage JSON.parse 成功但形狀不符（缺 `progress` 鍵等）無任何驗證 → TypeError 白屏且永不自癒 | parse 後驗證，壞資料回退預設值 |
| M4 | app.js:103, 129, 165 | 儲存進度無 try/catch（quota 滿/私密模式擲例外）→ selectChoice 中斷：submitted=true 但未計分、未 render | 包 try/catch；狀態更新移到儲存前 |
| M5 | app.js:117, 139, 166 | attempts 每答永久追加、seen/review 只增不減 → localStorage 無上限膨脹，每次作答全量重寫 | attempts 保留最近 N 筆 |
| M6 | app.js:82-87 | fetch 不檢查 `resp.ok`（404 回 HTML 到 .json() 才炸）；載入失敗只 console.error → landing 顯示 0 題、開始按鈕靜默無反應，無錯誤 UI | 檢查 resp.ok；失敗顯示錯誤與重試 |
| M7 | index.html:9,14 | style.css 有 `?v=2`（且改過 CSS 後未升版），app.js 與 data/*.json 完全無版本參數 → 部署後 HTML/JS/資料快取錯配 | 三者統一版本 query 或檔名指紋；每次部署遞增 |
| M8 | app.js:657 | mondai2/5 空格底線寬度＝**正解選項字數** → 選項長短不一時可從寬度猜答案（洩題） | 固定寬度（如 4em） |
| M9 | app.js:187, 846-857 | 注釋 tooltip：mondai11 A/B 路徑的定義取自「未 esc 原文」直接插 innerHTML，與一般路徑（esc 後）語境不一致 → 潛在 XSS（現有資料無 `<>&"`，暫安全） | extractNoteDefs 一律吃 esc 後文字 |
| M10 | app.js 全域 | a11y：互動元素全是 div/span/無 href 的 `<a>`，無 tabindex/role/keydown → 鍵盤與螢幕閱讀器完全無法作答 | 改 `<button>` 或補 role+tabindex+鍵盤事件 |
| M11 | README.md | 「直接開啟 index.html 即可使用」「離線可用」不成立——`fetch('data/*.json')` 在 file:// 被瀏覽器擋下，題庫全載入失敗；「題數選擇」UI 不存在；實際是 Workers static assets 非 Cloudflare Pages | 修正文件 |
| M12 | data m8/m9（4題） | m8-202312-q1/q3、m9-202312-q1/q2 用半形 `(注1)`，程式只認全形 `（注N）` → tooltip 掛不上且文末定義被移除，注釋整組消失 | 資料改全形，或 regex 兼容半形 |

---

## 低嚴重度（16）

1. app.js:349-352 — 跳過同時計入 sessionWrong 與 skipCount，頂欄 ✗ 與 ⚠ 重複計數同一題
2. app.js:619 — 進度條用 currentIndex 計算，按「上一題」進度會倒退
3. app.js:955 — 答題回顧中被跳過的 mondai7 顯示空字串（其他題型顯示「跳過」）
4. app.js:280-283 — 讀解未看過的題不足 examCount 時不從已看過補足（非讀解有補足，邏輯不對稱）
5. app.js:259 vs 357 — groupByPassage 用前 80 字當 key、samePassage 比對全文，兩套標準（現資料無碰撞，屬隱患）
6. app.js:244 — S.slots 寫死 4 格，與 fragments 數隱性耦合
7. app.js:97 — progress 寫入 version:1 但從未讀取；資料檔 version 2→3 也無檢查（choiceExplanations 缺失有 fallback，僅降級）
8. app.js:711 — mondai4 用 exact-match 加底線，16/60 題選項句只含活用形（如 怠る→怠って）→ 部分選項無底線
9. data m7-2020dec-q1 — 內文有（注1）（注2）參照但無定義區塊，tooltip 靜默失效
10. data m11-202407-q1/q2 — 文末孤兒注釋「（注）尾を引く」，正文無參照，永不顯示
11. data mondai5（11 題對話題）— sentence 含 `\n` 但題句容器無 `white-space:pre-line`，換行塌成一行
12. app.js — 死程式碼：goTips/TIPS/renderTips 無入口、setSectionFilter/getExamCount 未呼叫、I.trophy/I.flame 未用；SRS 模組（nextReview/INTERVALS_MS）只寫不讀
13. app.js:223-236 — 錯題模式不套 hasPassage 過濾（stub 讀解題會以摘要卡出現）、不按 passage 分組，同文章反覆重捲動
14. app.js:197-199 — toggleNote 每次開啟都對 document 加 listener，關閉路徑有短暫殘留
15. 建置：repo 內 style.css 是未壓縮 dev 產物，build script 用 --minify → 下次 build 整檔翻新（diff 爆炸）；建議統一（提交前跑 build 或不提交產物）
16. 其他：favicon.svg 存在但 index.html 未引用（僅 .ico）、缺 og/canonical meta、.gitignore 缺 `.wrangler/`、`data-review-report.md` 被 track 且會隨部署公開（與本報告同）

---

## 建議處理順序

1. **H2**：加 `.assetsignore`（5 分鐘，立即止血）
2. **M6＋M7**：fetch 錯誤處理＋統一 cache-busting（部署可靠性）
3. **M8**：洩題的空格寬度（影響練習效度）
4. **M1＋低1-3**：計分語義（m7 逐空計分、跳過不重複計數）
5. **M3-M5**：localStorage 健壯性
6. **M2、M12、低8-11**：顯示類修正
7. **H1**：讀解全文補齊——工程最大，建議另開專案分批處理（每次補一個場次的原文）
8. 其餘低項與文件（M11、低12-16）順手清

檢查方法：程式化掃描（語法、JSON、契約、CSS class 對照、特殊字元）＋兩個獨立 AI 代理深度審查（app.js 邏輯／資料契約與部署）＋人工覆核全部高中嚴重度項目（H1 的 49/230、M6/M7/M8/M12 均已實測確認）。
