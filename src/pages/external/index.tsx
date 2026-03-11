import Head from 'next/head'
import Link from 'next/link'
import { siteConfig, externalResources } from '@/data/siteData'
import PageHeader from '@/components/PageHeader'

export default function ExternalPage() {
  return (
    <>
      <Head>
        <title>校外資源 | {siteConfig.name}</title>
      </Head>
      <PageHeader
        title="校外資源"
        titleEn="External Resources"
        description="校外輔導相關資源連結"
      />
      <section className="py-16 lg:py-20">
        <div className="container-custom">
          <div className="max-w-2xl">
            {externalResources.pdfs.length > 0 && (
              <div className="mb-12">
                <h2 className="font-serif text-lg font-semibold text-ink-900 mb-4 pb-3 border-b border-cream-200">
                  PDF 文件下載
                </h2>
                <div className="space-y-4">
                  {externalResources.pdfs.map((item) => (
                    <Link
                      key={item.id}
                      href={item.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-6 bg-white border border-cream-200 rounded-xl transition-all duration-300 hover:border-accent-terracotta/30 hover:shadow-sm"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-accent-terracotta/10 text-accent-terracotta rounded-lg flex items-center justify-center group-hover:bg-accent-terracotta group-hover:text-white transition-colors">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
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
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {externalResources.links.length > 0 && (
              <div>
                <h2 className="font-serif text-lg font-semibold text-ink-900 mb-4 pb-3 border-b border-cream-200">
                  相關網站連結
                </h2>
                <div className="space-y-4">
                  {externalResources.links.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-6 bg-white border border-cream-200 rounded-xl transition-all duration-300 hover:border-accent-terracotta/30 hover:shadow-sm"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-cream-200 text-ink-500 rounded-lg flex items-center justify-center group-hover:bg-accent-terracotta group-hover:text-white transition-colors">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium text-ink-900 group-hover:text-accent-terracotta transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-sm text-ink-400">外部連結</p>
                        </div>
                      </div>
                      <div className="text-ink-300 group-hover:text-accent-terracotta transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
