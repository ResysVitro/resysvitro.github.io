import { GetStaticProps, GetStaticPaths } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { siteConfig } from '@/data/siteData'
import { getNewsBySlug, getAllNews, News } from '@/lib/markdown'

interface NewsPageProps {
  news: News
}

export default function NewsDetailPage({ news }: NewsPageProps) {
  return (
    <>
      <Head>
        <title>{`${news.title} | ${siteConfig.name}`}</title>
        <meta name="description" content={news.title} />
      </Head>

      <article className="py-12 lg:py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/news/"
              className="inline-flex items-center gap-2 text-ink-500 hover:text-accent-terracotta transition-colors mb-8"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              返回最新消息
            </Link>

            <div className="divider mb-6" />

            <h1 className="font-serif text-3xl lg:text-4xl font-semibold text-ink-900 mb-4">
              {news.title}
            </h1>

            <div className="mb-8 pb-8 border-b border-cream-200">
              <time className="text-ink-500 block">
                {new Date(news.date).toLocaleDateString('zh-TW', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>

            <div
              className="prose prose-lg max-w-none
                prose-headings:font-serif prose-headings:text-ink-900 prose-headings:mb-6 prose-headings:mt-10
                prose-h1:text-3xl prose-h1:font-semibold prose-h1:mb-8
                prose-h2:text-2xl prose-h2:font-semibold prose-h2:border-b prose-h2:border-cream-300 prose-h2:pb-3
                prose-h3:text-xl prose-h3:font-medium
                prose-p:text-ink-700 prose-p:leading-loose prose-p:mb-6 prose-p:text-lg
                prose-a:text-accent-terracotta prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                prose-strong:text-ink-900 prose-strong:font-semibold
                prose-ul:my-6 prose-ul:space-y-2
                prose-ol:my-6 prose-ol:space-y-2
                prose-li:text-ink-700 prose-li:leading-relaxed prose-li:text-lg
                prose-img:rounded-xl prose-img:my-10 prose-img:shadow-lg
                prose-hr:border-cream-300 prose-hr:my-12
                first:prose-p:text-xl first:prose-p:leading-relaxed first:prose-p:text-ink-800"
              dangerouslySetInnerHTML={{ __html: news.content }}
            />

            <div className="mt-12 pt-8 border-t border-cream-200">
              <Link
                href="/news/"
                className="btn-outline"
              >
                返回消息列表
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allNews = getAllNews()
  const paths = allNews.map((news) => ({
    params: { id: news.id },
  }))

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const news = await getNewsBySlug(params?.id as string)

  if (!news) {
    return { notFound: true }
  }

  return {
    props: {
      news: {
        id: news.id,
        title: news.title,
        date: news.date ? news.date.toString() : new Date().toISOString(),
        category: news.category || null,
        content: news.content,
      },
    },
  }
}
