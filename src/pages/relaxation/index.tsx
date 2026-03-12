import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { siteConfig, relaxationResources } from '@/data/siteData'
import PageHeader from '@/components/PageHeader'

export default function RelaxationPage() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <Head>
        <title>{`導師紓壓 | ${siteConfig.name}`}</title>
      </Head>
      <PageHeader
        title="導師紓壓"
        titleEn="Self-Care for Mentors"
        description="導師身心調適資源"
      />
      <section className="py-16 lg:py-20">
        <div className="container-custom">
          <div className="max-w-6xl">
            <div className="bg-gradient-to-br from-accent-sage/10 to-accent-sage/20 rounded-2xl py-12 px-8 mb-10">
              <h2 className="font-serif text-xl font-semibold text-ink-900 mb-4">身心平衡小提醒</h2>
              <p className="text-ink-600 leading-relaxed">
                導師工作雖然充實有意義，但也需要適時照顧自己的身心狀態。
                以下資源提供紓壓方法與心理健康資訊，歡迎導師們參考運用。
              </p>
            </div>
            <div className="space-y-4">
              {relaxationResources.map((item) => {
                const hasArticle = item.articleUrl && item.articleUrl !== '#'
                const hasPoster = item.posterUrl && item.posterUrl !== '#'

                return (
                  <div key={item.id} className="p-6 bg-white border border-cream-200 rounded-xl">
                    <h3 className="font-medium text-ink-900 mb-4">{item.title}</h3>
                    <div className="flex gap-3">
                      {item.articleUrl && (
                        hasArticle ? (
                          <Link
                            href={item.articleUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-cream-100 text-ink-700 text-sm font-medium rounded-full hover:bg-cream-200 transition-colors"
                          >
                            閱讀文章
                          </Link>
                        ) : (
                          <button
                            onClick={() => setShowModal(true)}
                            className="px-4 py-2 bg-cream-100 text-ink-700 text-sm font-medium rounded-full hover:bg-cream-200 transition-colors"
                          >
                            閱讀文章
                          </button>
                        )
                      )}
                      {item.posterUrl && (
                        hasPoster ? (
                          <Link
                            href={item.posterUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 border border-cream-300 text-ink-600 text-sm font-medium rounded-full hover:bg-cream-100 transition-colors"
                          >
                            海報連結
                          </Link>
                        ) : (
                          <button
                            onClick={() => setShowModal(true)}
                            className="px-4 py-2 border border-cream-300 text-ink-600 text-sm font-medium rounded-full hover:bg-cream-100 transition-colors"
                          >
                            海報連結
                          </button>
                        )
                      )}
                    </div>
                  </div>
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
