# JLPT N1 考古題

JLPT N1 言語知識特訓 — 按題型刷題、解題技巧、進度追蹤。

## 功能

- 13 種題型（問題 1〜13）：漢字讀音、文脈語彙、同義詞、用法、文法、排列組合、文章文法、短文/中文/長文讀解、綜合理解、主題探究、情報檢索
- 分類篩選（文字・語彙 / 文法 / 読解）與題數選擇
- 作答後即時顯示正解與解析
- 錯題本：自動收集答錯的題目，可重複練習
- 學習進度追蹤：各題型正確率與完成度
- 深色模式
- 離線可用（純靜態檔案，資料以 JSON 載入）

## 技術

- 純 HTML + Vanilla JS（單一 `app.js`，無框架）
- Tailwind CSS v4（透過 `@tailwindcss/cli` 編譯）
- 部署於 Cloudflare Pages（Wrangler）

## 開發

```bash
npm install
npm run dev       # 監聽 CSS 變更，即時編譯
```

直接開啟 `index.html` 即可使用，或用任意靜態伺服器：

```bash
npx serve .
```

## 建置

```bash
npm run build     # 編譯並壓縮 CSS
```

## 專案結構

```
index.html          入口頁面
app.js              應用程式邏輯（路由、渲染、狀態管理）
src/input.css       Tailwind CSS 來源
style.css           編譯後的 CSS
data/               題庫 JSON（mondai1〜mondai13）
favicon.ico         網站圖示
wrangler.json       Cloudflare Pages 設定
```
