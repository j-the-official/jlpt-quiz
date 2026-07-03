# JLPT N1 考古題

JLPT N1 言語知識特訓 — 按題型刷題、進度追蹤。

## 功能

- 13 種題型（問題 1〜13）：漢字讀音、文脈語彙、同義詞、用法、文法、排列組合、文章文法、短文/中文/長文讀解、綜合理解、主張理解、情報檢索
- 分類篩選（文字・語彙 / 文法 / 読解）
- 作答後即時顯示正解與逐選項解析（點選項切換）
- 錯題本：自動收集答錯的題目，可重複練習
- 學習進度追蹤：各題型正確率與完成度
- 深色模式

註：讀解題（問題 8〜13）僅有附原文全文的題目會出題；只有摘要的題目暫不納入。

## 技術

- 純 HTML + Vanilla JS（單一 `app.js`，無框架）
- Tailwind CSS v4（透過 `@tailwindcss/cli` 編譯）
- 部署於 Cloudflare Workers 靜態資源（Wrangler）

## 開發

```bash
npm install
npm run dev       # 監聽 CSS 變更，即時編譯
```

需透過靜態伺服器開啟（題庫以 `fetch` 載入，`file://` 直接開啟會被瀏覽器阻擋）：

```bash
npx serve .
```

## 建置與部署

```bash
npm run build     # 編譯 CSS
npx wrangler deploy
```

部署範圍由 `.assetsignore` 控制（node_modules、原始碼、文件等不會上傳）。
更新 `app.js`、`style.css` 或題庫後，記得同步遞增 `index.html` 與 `app.js` 內的版本參數（cache busting）。

## 專案結構

```
index.html          入口頁面
app.js              應用程式邏輯（路由、渲染、狀態管理）
src/input.css       Tailwind CSS 來源
style.css           編譯後的 CSS
data/               題庫 JSON（mondai1〜mondai13）
favicon.ico         網站圖示
wrangler.json       Cloudflare Workers 靜態資源設定
.assetsignore       部署排除清單
```
