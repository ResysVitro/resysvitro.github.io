export const siteConfig = {
  name: 'TNUA 導師系統',
  nameEn: 'TNUA Mentor System',
  description: '國立臺北藝術大學導師輔導資源網站',
  contact: {
    unit: '學生事務處生活輔導組',
    phone: '（02）2896-1000分機1312',
    email: 'mentor@tnua.edu.tw',
    address: '112臺北市北投區學園路1號',
  },
}

export interface NavItem {
  label: string
  href?: string
  children?: NavItem[]
}

export const navigation: NavItem[] = [
  { label: '首頁', href: '/' },
  { label: '最新消息', href: '/news/' },
  { label: '關渡心四季', href: '/seasons/' },
  {
    label: '導師輔導資源',
    children: [
      { label: '導師輔導手冊', href: '/handbook/' },
      { label: '輔導資源懶人包', href: '/resources/' },
      { label: '導師紓壓', href: '/relaxation/' },
      { label: '校外資源', href: '/external/' },
    ],
  },
  {
    label: '研習與系統',
    children: [
      { label: '導師輔導知能研習', href: '/workshop/' },
      { label: '導師常用系統', href: '/systems/' },
    ],
  },
  {
    label: '相關法規',
    href: '/regulations/',
  },
]

export interface NewsItem {
  id: string
  title: string
  date: string
  category: string
  excerpt?: string
  href: string
  isExternal?: boolean
}

export const newsItems: NewsItem[] = [
  {
    id: 'news-1',
    title: '這是一則範例公告標題',
    date: '2025-02-15',
    category: '公告',
    excerpt: '這是範例內容，用於測試版面配置與文字呈現效果。',
    href: '#',
    isExternal: true,
  },
  {
    id: 'news-2',
    title: '測試用消息標題範例',
    date: '2025-01-20',
    category: '活動',
    excerpt: '此為測試文字，實際內容請依正式公告為準。',
    href: '#',
  },
  {
    id: 'news-3',
    title: '範例標題文字展示',
    date: '2025-01-10',
    category: '系統',
    excerpt: '這段文字僅供版面測試使用，非正式內容。',
    href: '#',
  },
]

export interface SeasonArticle {
  id: string
  title: string
  year: number
  date: string
  tags?: string[]
  thumbnail?: string
  posterUrl?: string
  content?: string
  images?: { url: string; caption?: string }[]
}

export const seasonArticles: SeasonArticle[] = [
  {
    id: 's-2026',
    title: '第五則關渡心四季',
    year: 2026,
    date: '2026-01-01',
    tags: ['春季', '心理健康'],
    thumbnail: '/images/seasons/2026-thumb.webp',
    posterUrl: '/images/seasons/2026-poster.webp',
    content: '這是第五則關渡心四季的文章內容範例。內容會包含完整的文章段落，介紹該期的主題與相關資訊。',
    images: [
      { url: '/images/seasons/2026-1.webp', caption: '圖片說明文字' }
    ]
  },
  {
    id: 's-2025',
    title: '第四則關渡心四季',
    year: 2025,
    date: '2025-01-01',
    tags: ['冬季', '生活適應'],
    thumbnail: '/images/seasons/2025-thumb.webp',
    posterUrl: '/images/seasons/2025-poster.webp',
    content: '這是第四則關渡心四季的文章內容範例。',
    images: [
      { url: '/images/seasons/2025-1.webp' }
    ]
  },
  {
    id: 's-2024',
    title: '第三則年關渡心四季',
    year: 2024,
    date: '2024-01-01',
    tags: ['秋季'],
    thumbnail: '/images/seasons/2024-thumb.webp',
    posterUrl: '/images/seasons/2024-poster.webp',
    content: '這是第三則關渡心四季的文章內容範例。',
  },
  {
    id: 's-2023',
    title: '第二則年關渡心四季',
    year: 2023,
    date: '2023-01-01',
    tags: ['夏季', '人際關係'],
    thumbnail: '/images/seasons/2023-thumb.webp',
    posterUrl: '/images/seasons/2023-poster.webp',
    content: '這是第二則關渡心四季的文章內容範例。',
  },
  {
    id: 's-2022',
    title: '第一則關渡心四季',
    year: 2022,
    date: '2022-01-01',
    tags: ['春季'],
    thumbnail: '/images/seasons/2022-thumb.webp',
    posterUrl: '/images/seasons/2022-poster.webp',
    content: '這是第一則關渡心四季的文章內容範例。',
  },
  {
    id: 's-2021',
    title: '第六則關渡心四季',
    year: 2021,
    date: '2021-01-01',
    tags: ['春季'],
    thumbnail: '/images/seasons/2021-thumb.webp',
    posterUrl: '/images/seasons/2021-poster.webp',
    content: '這是第六則關渡心四季的文章內容範例。',
  },
]

export interface HandbookItem {
  id: string
  title: string
  semester: string
  pdfUrl: string
}

export const handbooks: HandbookItem[] = [
  { id: 'hb-1151', title: '115-1學期導師輔導手冊', semester: '115-1', pdfUrl: '#' },
  { id: 'hb-1142', title: '114-2學期導師輔導手冊', semester: '114-2', pdfUrl: '#' },
]

export interface ResourceItem {
  id: string
  title: string
  category: string
  pdfUrl: string
  icon: string
}

export const resources: ResourceItem[] = [
  { id: 'r-1', title: '導生互動簡易指南', category: '基礎指南', pdfUrl: '#', icon: 'guide' },
  { id: 'r-2', title: '學習輔導', category: '學習', pdfUrl: '#', icon: 'learning' },
  { id: 'r-3', title: '經濟輔導', category: '經濟', pdfUrl: '#', icon: 'finance' },
  { id: 'r-4', title: '班級經營', category: '班級', pdfUrl: '#', icon: 'class' },
  { id: 'r-5', title: '身心輔導-學生諮商中心', category: '身心', pdfUrl: '#', icon: 'counseling' },
  { id: 'r-6', title: '身心輔導-衛生保健組', category: '身心', pdfUrl: '#', icon: 'health' },
  { id: 'r-7', title: '生活輔導-學生偏差行為輔導', category: '生活', pdfUrl: '#', icon: 'behavior' },
  { id: 'r-8', title: '生活輔導-校內外生活安全與課外活動輔導', category: '生活', pdfUrl: '#', icon: 'safety' },
  { id: 'r-9', title: '防制霸凌', category: '安全', pdfUrl: '#', icon: 'antibullying' },
  { id: 'r-10', title: '緊急事件處理', category: '緊急', pdfUrl: '#', icon: 'emergency' },
  { id: 'r-11', title: '車禍處理流程', category: '緊急', pdfUrl: '#', icon: 'accident' },
  { id: 'r-12', title: '法定通報事件參考對照表', category: '通報', pdfUrl: '#', icon: 'report' },
  { id: 'r-13', title: '性平事件通報流程', category: '通報', pdfUrl: '#', icon: 'gender' },
]

export interface WorkshopItem {
  id: string
  title: string
  semester: string
  registrationUrl?: string
  posterUrl?: string
}

export const workshops: WorkshopItem[] = [
  { id: 'w-1142', title: '114-2學期導師輔導知能研習', semester: '114-2', registrationUrl: '#', posterUrl: '#' },
  { id: 'w-1141', title: '114-1學期導師輔導知能研習', semester: '114-1', posterUrl: '#' },
  { id: 'w-1132', title: '113-2學期導師輔導知能研習', semester: '113-2', posterUrl: '#' },
  { id: 'w-1131', title: '113-1學期導師輔導知能研習', semester: '113-1', posterUrl: '#' },
  { id: 'w-1122', title: '112-2學期導師輔導知能研習', semester: '112-2', posterUrl: '#' },
  { id: 'w-1121', title: '112-1學期導師輔導知能研習', semester: '112-1', posterUrl: '#' },
  { id: 'w-1112', title: '111-2學期導師輔導知能研習', semester: '111-2', posterUrl: '#' },
  { id: 'w-1111', title: '111-1學期導師輔導知能研習', semester: '111-1', posterUrl: '#' },
]

export interface SystemLink {
  id: string
  title: string
  description?: string
  href: string
  isExternal: boolean
}

export const systemLinks: SystemLink[] = [
  { id: 'sys-1', title: '學生請假系統', href: '#', isExternal: true },
  { id: 'sys-2', title: '校內校安通報系統', href: '#', isExternal: true },
  { id: 'sys-3', title: '學習預警資訊系統-導師輔導操作說明', description: '操作說明文件', href: '#', isExternal: false },
  { id: 'sys-4', title: '導師輔導系統操作說明', description: '操作說明文件', href: '#', isExternal: false },
  { id: 'sys-5', title: '學生獎懲線上提報操作說明', description: '操作說明文件', href: '#', isExternal: false },
]

export interface RegulationItem {
  id: string
  title: string
  pdfUrl: string
}

export const regulations: RegulationItem[] = [
  { id: 'reg-1', title: '國立臺北藝術大學導師制實施辦法', pdfUrl: '#' },
  { id: 'reg-2', title: '國立臺北藝術大學學生學習成效預警實施辦法', pdfUrl: '#' },
  { id: 'reg-3', title: '國立臺北藝術大學學生學習預警與輔導流程圖', pdfUrl: '#' },
]

export const externalResources = {
  pdfs: [
    { id: 'ext-1', title: '校外輔導資源彙整', pdfUrl: '#' },
  ],
  links: [
    { id: 'ext-l1', title: '教育部學生輔導資訊網', href: 'https://www.guide.edu.tw/', isExternal: true },
    { id: 'ext-l2', title: '衛生福利部心理健康司', href: 'https://dep.mohw.gov.tw/', isExternal: true },
  ],
}

export const relaxationResources = [
  { id: 'relax-1', title: '導師紓壓專區', articleUrl: '#', posterUrl: '#' },
]

export const mentorInfo = {
  title: '本校導師制度說明',
  content: `國立臺北藝術大學導師制度旨在建立師生間良好的互動關係，協助學生在學業、生活及身心發展上獲得適當的輔導與關懷。每位學生入學後即分配導師，導師將定期與導生晤談，了解學生學習狀況與生活適應情形，並提供必要的協助與轉介服務。`,
}

export const quickLinks = [
  { label: '生活輔導組', href: 'https://student.tnua.edu.tw/student/guidance/', isExternal: true },
  { label: '學生諮商中心', href: 'https://consultant.tnua.edu.tw/', isExternal: true },
  { label: '課外活動指導組', href: 'https://student.tnua.edu.tw/student/activity/', isExternal: true },
  { label: '衛生保健組', href: 'https://student.tnua.edu.tw/student/health/', isExternal: true },
  { label: '體育中心', href: 'https://pe.tnua.edu.tw/main/', isExternal: true },
  { label: '原住民族學生資源中心', href: 'https://student.tnua.edu.tw/student/indigenous/', isExternal: true },
]
