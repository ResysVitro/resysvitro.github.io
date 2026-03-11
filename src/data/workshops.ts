export interface WorkshopItem {
  id: string
  order: number  // 數字越小越舊，顯示在越下方
  title: string
  thumbnail: string  // 預覽縮圖路徑
  poster: string     // 點擊後顯示的大圖路徑
}

export const workshops: WorkshopItem[] = [
  {
    id: 'w-001',
    order: 1,
    title: '111-1學期導師輔導知能研習',
    thumbnail: '/images/workshops/1.png',
    poster: '/images/workshops/1.png',
  },
  {
    id: 'w-002',
    order: 2,
    title: '111-2學期導師輔導知能研習',
    thumbnail: '/images/workshops/2.png',
    poster: '/images/workshops/2.png',
  },
  {
    id: 'w-003',
    order: 3,
    title: '112-1學期導師輔導知能研習',
    thumbnail: '/images/workshops/3.png',
    poster: '/images/workshops/3.png',
  },
  {
    id: 'w-004',
    order: 4,
    title: '112-2學期導師輔導知能研習',
    thumbnail: '/images/workshops/4.png',
    poster: '/images/workshops/4.png',
  },
  {
    id: 'w-005',
    order: 5,
    title: '113-1學期導師輔導知能研習',
    thumbnail: '/images/workshops/5.jpg',
    poster: '/images/workshops/5.jpg',
  },
  {
    id: 'w-006',
    order: 6,
    title: '113-2學期導師輔導知能研習',
    thumbnail: '/images/workshops/6.jpg',
    poster: '/images/workshops/6.jpg',
  },
  {
    id: 'w-007',
    order: 7,
    title: '114-1學期導師輔導知能研習',
    thumbnail: '/images/workshops/7.jpg',
    poster: '/images/workshops/7.jpg',
  },
  {
    id: 'w-008',
    order: 8,
    title: '114-2學期導師輔導知能研習',
    thumbnail: '/images/workshops/8.jpg',
    poster: '/images/workshops/8.jpg',
  },
]
