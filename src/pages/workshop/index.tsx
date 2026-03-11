import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import { siteConfig } from '@/data/siteData'
import PageHeader from '@/components/PageHeader'
import { workshops } from '@/data/workshops'

export default function WorkshopPage() {
  const [selectedPoster, setSelectedPoster] = useState<{ url: string; title: string } | null>(null)
  const [imageOrientations, setImageOrientations] = useState<Record<string, 'portrait' | 'landscape'>>({})
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  // 依照 order 排序，數字大的在前面（新的在上面）
  const sortedWorkshops = [...workshops].sort((a, b) => b.order - a.order)

  const handleImageLoad = (id: string, event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget
    const isLandscape = img.naturalWidth > img.naturalHeight
    setImageOrientations(prev => ({
      ...prev,
      [id]: isLandscape ? 'landscape' : 'portrait'
    }))
  }

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.3, 3))
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.3, 0.5))
  const handleResetZoom = () => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    if (e.deltaY < 0) {
      handleZoomIn()
    } else {
      handleZoomOut()
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true)
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const closePoster = () => {
    setSelectedPoster(null)
    setZoom(1)
    setPan({ x: 0, y: 0 })
    setIsDragging(false)
  }
  return (
    <>
      <Head>
        <title>導師輔導知能研習 | {siteConfig.name}</title>
      </Head>
      <PageHeader
        title="導師輔導知能研習"
        titleEn="Mentor Training Workshops"
        description="歷年研習活動海報與報名資訊"
      />
      <section className="py-16 lg:py-20">
        <div className="container-custom">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {sortedWorkshops.map((item) => {
              const orientation = imageOrientations[item.id] || 'portrait'
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedPoster({ url: item.poster, title: item.title })}
                  className="block w-full cursor-pointer group break-inside-avoid mb-6"
                >
                  <div
                    className={`relative bg-cream-200 rounded-xl overflow-hidden transition-all group-hover:bg-cream-300 group-hover:shadow-lg ${
                      orientation === 'landscape' ? 'aspect-[16/10]' : 'aspect-[3/4]'
                    }`}
                  >
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="lazy"
                      className="object-cover transition-transform group-hover:scale-105"
                      onLoad={(e) => handleImageLoad(item.id, e)}
                    />
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {selectedPoster && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={closePoster}
        >
          <div className="relative max-w-6xl max-h-[90vh] w-full h-full flex items-center justify-center">
            {/* 關閉按鈕 */}
            <button
              onClick={closePoster}
              className="absolute top-4 right-4 text-white hover:text-cream-200 z-10 bg-black bg-opacity-50 rounded-full p-2"
              aria-label="關閉"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* 縮放控制按鈕 */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
              <button
                onClick={(e) => { e.stopPropagation(); handleZoomIn(); }}
                className="bg-black bg-opacity-50 text-white hover:bg-opacity-70 rounded-full p-2 transition-colors"
                aria-label="放大"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleZoomOut(); }}
                className="bg-black bg-opacity-50 text-white hover:bg-opacity-70 rounded-full p-2 transition-colors"
                aria-label="縮小"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleResetZoom(); }}
                className="bg-black bg-opacity-50 text-white hover:bg-opacity-70 rounded-full p-2 transition-colors text-xs font-medium"
                aria-label="重設縮放"
              >
                1:1
              </button>
            </div>

            {/* 縮放提示 */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white text-sm px-4 py-2 rounded-full">
              {Math.round(zoom * 100)}% | 滾輪縮放 {zoom > 1 && '| 拖曳移動'}
            </div>

            <div
              className="relative w-full h-full max-w-5xl max-h-[85vh] overflow-hidden select-none"
              style={{ cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
              onClick={(e) => e.stopPropagation()}
              onWheel={handleWheel}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <div
                style={{
                  transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                  transition: isDragging ? 'none' : 'transform 0.2s ease-out',
                  transformOrigin: 'center center',
                }}
                className="w-full h-full flex items-center justify-center"
              >
                <Image
                  src={selectedPoster.url}
                  alt={selectedPoster.title}
                  width={2000}
                  height={2000}
                  className="max-w-full max-h-full object-contain pointer-events-none"
                  priority
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
