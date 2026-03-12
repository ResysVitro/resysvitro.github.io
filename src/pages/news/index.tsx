import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { siteConfig } from '@/data/siteData'
import PageHeader from '@/components/PageHeader'
import { getAllNews, NewsMetadata } from '@/lib/markdown'

interface NewsPageProps {
  news: NewsMetadata[]
}

export default function NewsPage({ news }: NewsPageProps) {
  return (
    <>
      <Head>
        <title>{`最新消息 | ${siteConfig.name}`}</title>
      </Head>
      <PageHeader
        title="最新消息"
        titleEn="News & Updates"
        description="導師系統最新公告與活動資訊"
      />
      <section className="py-16 lg:py-20">
        <div className="container-custom">
          <div className="max-w-4xl">
            <div className="space-y-6">
              {news.map((item, index) => {
                const formattedDate = new Date(item.date).toLocaleDateString('zh-TW', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })

                if (index === 0) {
                  return (
                    <Link key={item.id} href={`/news/${item.id}`}>
                      <article className="group relative bg-cream-100 rounded-2xl p-8 transition-all duration-500 hover:bg-cream-200 cursor-pointer">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-4">
                              {item.category && <span className="tag tag-default">{item.category}</span>}
                              <time className="text-sm text-ink-400">{formattedDate}</time>
                            </div>
                            <h3 className="font-serif text-xl text-ink-900 mb-3 group-hover:text-accent-terracotta transition-colors">
                              {item.title}
                            </h3>
                          </div>
                          <div className="inline-flex items-center gap-2 text-sm font-medium text-ink-600 group-hover:text-accent-terracotta transition-colors shrink-0">
                            閱讀更多
                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </div>
                        </div>
                      </article>
                    </Link>
                  )
                }

                return (
                  <Link key={item.id} href={`/news/${item.id}`}>
                    <article className="group relative bg-cream-100 rounded-2xl p-8 transition-all duration-500 hover:bg-cream-200 cursor-pointer">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            {item.category && <span className="tag tag-default">{item.category}</span>}
                            <time className="text-sm text-ink-400">{formattedDate}</time>
                          </div>
                          <h3 className="text-xl text-ink-900 mb-2 group-hover:text-accent-terracotta transition-colors">
                            {item.title}
                          </h3>
                        </div>
                        <div className="inline-flex items-center gap-2 text-sm text-ink-500 group-hover:text-accent-terracotta transition-colors shrink-0">
                          閱讀更多
                          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                    </article>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const allNews = getAllNews()
  const news = allNews.map(item => ({
    id: item.id,
    title: item.title,
    date: item.date ? item.date.toString() : new Date().toISOString(),
    category: item.category || null,
  }))

  return {
    props: {
      news,
    },
  }
}
