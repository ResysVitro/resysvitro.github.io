import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import {
  siteConfig,
  resources,
  quickLinks,
} from '@/data/siteData'
import SeasonCard from '@/components/SeasonCard'
import ResourceCard from '@/components/ResourceCard'
import { getAllArticles, getAllNews, ArticleMetadata, NewsMetadata } from '@/lib/markdown'

interface HomeProps {
  latestSeasons: ArticleMetadata[]
  latestNews: NewsMetadata[]
}

export default function Home({ latestSeasons, latestNews }: HomeProps) {
  return (
    <>
      <Head>
        <title>{`首頁 | ${siteConfig.name}`}</title>
        <meta name="description" content={siteConfig.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <section className="py-16 lg:py-24 bg-gradient-to-b from-cream-100 to-cream-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="divider mb-8" />
            <p className="font-serif text-lg lg:text-xl text-ink-700 leading-relaxed mb-10">
              為因應目前學生生活日趨多元化與複雜化，落實校園輔導一級預防工作並提升導師輔導知能，本校安排「導師輔導知能專題講座」、「導師輔導知能電子報」、「導師輔導資源手冊」等三大系列增能項目，以提升各系所、主任導師、班級導師、助理導師及生活導師之輔導知能，盼藉由系列主題分享，落實校園輔導初級預防工作，增進學生生活適應能力。
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/handbook/" className="btn-primary w-full sm:w-auto">
                導師輔導手冊
              </Link>
              <Link href="/resources/" className="btn-outline flex-1 sm:flex-initial">
                <span className="inline-block">輔導資源</span><wbr /><span className="inline-block">懶人包</span>
              </Link>
              <Link href="/workshop/" className="btn-outline flex-1 sm:flex-initial">
                知能研習
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 border-y border-cream-300">
        <div className="container-custom">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-10">
            {quickLinks.map((link, index) => (
              <Link
                key={link.label}
                href={link.href}
                target={link.isExternal ? '_blank' : undefined}
                rel={link.isExternal ? 'noopener noreferrer' : undefined}
                className="group flex items-center gap-2 text-ink-500 hover:text-ink-900 transition-colors"
              >
                <span className="text-sm font-medium">{link.label}</span>
                {link.isExternal && (
                  <svg className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                )}
                {index < quickLinks.length - 1 && (
                  <span className="hidden sm:inline text-cream-300 ml-8">|</span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="container-custom">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-32">
                <div className="divider mb-6" />
                <h2 className="section-title">最新消息</h2>
                <p className="section-subtitle mb-6">News & Updates</p>
                <Link href="/news/" className="link-hover text-sm font-medium inline-flex items-center gap-2 group">
                  查看全部公告
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="lg:col-span-8">
              <div className="grid sm:grid-cols-2 gap-6">
                {latestNews.map((item, index) => {
                  const formattedDate = new Date(item.date).toLocaleDateString('zh-TW', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })

                  const isLatest = index === 0

                  return (
                    <div key={item.id} className={isLatest ? 'sm:col-span-2' : ''}>
                      <Link href={`/news/${item.id}`}>
                        <article className={`group relative rounded-2xl p-6 transition-all duration-500 cursor-pointer h-full ${
                          isLatest ? 'bg-cream-100 hover:bg-cream-200' : 'hover:bg-cream-50'
                        }`}>
                          <div className="flex items-center gap-3 mb-3">
                            {item.category && <span className="tag tag-default">{item.category}</span>}
                            <time className="text-sm text-ink-400">{formattedDate}</time>
                          </div>
                          <h3 className={`text-lg text-ink-900 mb-2 group-hover:text-accent-terracotta transition-colors line-clamp-2 ${
                            isLatest ? 'font-medium' : ''
                          }`}>
                            {item.title}
                          </h3>
                        </article>
                      </Link>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-cream-100">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="divider mx-auto mb-6" />
            <h2 className="section-title">關渡心四季</h2>
            <p className="section-subtitle">Guandu Seasons of Heart</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {latestSeasons.map((item, index) => (
              <SeasonCard key={item.id} item={item} priority={index < 2} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/seasons/" className="btn-outline">
              瀏覽全部文章
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12">
            <div>
              <div className="divider mb-6" />
              <h2 className="section-title"><span className="inline-block">輔導資源</span><wbr /><span className="inline-block">懶人包</span></h2>
              <p className="section-subtitle">Quick Reference Guides</p>
            </div>
            <Link href="/resources/" className="link-hover text-sm font-medium inline-flex items-center gap-2 group mt-6 lg:mt-0">
              查看全部資源
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {resources.slice(0, 6).map((item) => (
              <ResourceCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const allArticles = getAllArticles()
  const latestSeasons = allArticles.slice(0, 6).map(article => ({
    id: article.id,
    title: article.title,
    year: article.year,
    date: article.date ? article.date.toString() : new Date().toISOString(),
    author: article.author || null,
    tags: article.tags || [],
    thumbnail: article.thumbnail || null,
    poster: article.poster || null,
  }))

  const allNews = getAllNews()
  const latestNews = allNews.slice(0, 4).map(news => ({
    id: news.id,
    title: news.title,
    date: news.date ? news.date.toString() : new Date().toISOString(),
    category: news.category || null,
  }))

  return {
    props: {
      latestSeasons,
      latestNews,
    },
  }
}
