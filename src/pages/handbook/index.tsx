import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { siteConfig, handbooks } from '@/data/siteData'
import PageHeader from '@/components/PageHeader'

export default function HandbookPage() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <Head>
        <title>{`導師輔導手冊 | ${siteConfig.name}`}</title>
      </Head>
      <PageHeader
        title="導師輔導手冊"
        titleEn="Mentor Handbook"
        description="各學期導師輔導資訊手冊下載"
      />
      <section className="py-16 lg:py-20">
        <div className="container-custom">
          <div className="max-w-2xl">
            <div className="space-y-4">
              {handbooks.map((item) => {
                const isPlaceholder = item.pdfUrl === '#'

                const content = (
                  <>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-accent-terracotta/10 text-accent-terracotta rounded-xl flex items-center justify-center group-hover:bg-accent-terracotta group-hover:text-white transition-colors">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-ink-900 group-hover:text-accent-terracotta transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-sm text-ink-400">PDF 檔案</p>
                      </div>
                    </div>
                    <div className="text-ink-300 group-hover:text-accent-terracotta transition-colors">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </div>
                  </>
                )

                return isPlaceholder ? (
                  <button
                    key={item.id}
                    onClick={() => setShowModal(true)}
                    className="group flex items-center justify-between p-6 bg-white border border-cream-200 rounded-xl transition-all duration-300 hover:border-accent-terracotta/30 hover:shadow-sm w-full text-left"
                  >
                    {content}
                  </button>
                ) : (
                  <Link
                    key={item.id}
                    href={item.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between p-6 bg-white border border-cream-200 rounded-xl transition-all duration-300 hover:border-accent-terracotta/30 hover:shadow-sm"
                  >
                    {content}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-cream-50 rounded-2xl p-8 max-w-md w-full shadow-lg border border-cream-200"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold text-ink-900 text-center mb-3">
              此區塊資料更新中
            </h3>
            <p className="text-ink-600 text-center mb-6">
              相關資料正在整理中，敬請期待
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="w-full bg-ink-900 text-cream-50 py-3 px-6 rounded-full font-medium hover:bg-ink-700 transition-colors"
            >
              確認
            </button>
          </div>
        </div>
      )}
    </>
  )
}
