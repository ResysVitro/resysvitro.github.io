你的角色： 資深前端架構師與 Next.js 專家。

任務： 根據附件 PDF 與截圖資訊，為國立臺北藝術大學（TNUA）導師系統建立一個現代、專業且精簡的網站。

技術規格：

- 框架： Next.js
- 部署模式： 靜態網站生成 (SSG)，必須支援 `output: 'export'`。
- 樣式： Tailwind CSS（追求極簡專業風格，嚴禁冗餘裝飾）。
- 語言： TypeScript。
- 架構： 內容與邏輯分離，所有文字與連結必須統一管理於 `src/data/siteData.ts`。

開發原則：

1. 程式碼精簡： 產出純淨、模組化的代碼。嚴禁任何註解、emoji 或多餘的說明文字。
2. 維護性： 使用者僅需修改一個 JSON/TS 物件即可更新每月文章與 PDF 連結。
3. 相容性： 靜態導出後的檔案必須能運行於 GitHub Pages 及校方舊式伺服器 。
4. 響應式設計： 必須完全符合 RWD 規範 。

資訊架構實作要求（詳見 PDF）：

1. 導覽系統： 實作多層級下拉選單，包含「導師輔導資源」、「研習與系統」、「相關法規」 。
2. 首頁區塊： 建立「最新消息」與「關渡心四季」卡片牆，並實作日期排序邏輯 。
3. 資源清單： 依據 PDF 內容，系統化排列 13 項輔導資源懶人包連結 。
4. 校級連結： 整合學生請假、校安通報等校內常用系統的導航 。

視覺與 UI/UX 偏好 (Visual & Design):

- 風格指南： 參考附件中「台師大」與「東海大學」的佈局。追求「精簡、現代、空氣感（留白）」。
- 元件質感： 使用微互動（Hover 效果）、圓角卡片（Rounded Cards）與細膩的陰影（Soft Shadows）。
- 參考網頁： 請分析附件截圖中的佈局邏輯，確保導覽列清晰且易於觸控。

功能需求清單 (Functional Requirements):

- 首頁動態卡片： - 「最新消息」與「關渡心四季」需以卡片（Card）呈現。
    - 需有日期標籤，並自動依時間由新到舊排序。
    - 實作「查看更多 (Read More)」邏輯（連結至內頁或外部連結）。
- 多層級導航 (Mega Menu)： 支援兩層以上選單，用以整理 PDF 中提到的海報連結、圖檔與子頁面。
- 資源下載區： PDF 中的 13 項懶人包需系統化排列，並有清楚的下載圖示與檔案類型標示。
- 內頁模版： - 靜態內容頁： 用於展示如法規清單、系統說明等文字內容。
    - 列表頁： 處理大量 PDF 下載的整齊清單。

請提供：

1. 完整的專案檔案目錄結構。
2. `next.config.mjs`（需包含靜態導出與 GitHub Pages 路徑配置）。
3. `src/data/siteData.ts`（請從 PDF 中提取所有標籤、連結與分類數據 ）。
4. 核心組件代碼（Navbar, Card, Footer, Layout, Page）。

參考網頁：

舊的網站：https://student.tnua.edu.tw/mentor/

1. 本校諮商中心：https://consultant.tnua.edu.tw/
2. 台師大導師網頁：https://assistance.sa.ntnu.edu.tw/ceremony-1/
3. 東海大學導師專區：https://eteacher.thu.edu.tw/

參考檔案：

- 導師輔導知能研習網頁改版.txt(核心內容要求)。[@導師輔導知能研習網頁改版.txt  ]
- 參考網站截圖 (台師大導師網頁、東海導師網頁) [D:\work-web\mentor-web\reference_img][ @reference_img/諮商中心1.png  @reference_img/諮商中心2.png  @reference_img/諮商中心3.png  @reference_img/台師大導師網頁1.png  @reference_img/台師大導師網頁2.png  @reference_img/東海大學導師專區1.png  @reference_img/東海大學導師專區2.png  @reference_img/東海大學導師專區3.png ] 