import { GetStaticProps } from 'next'
import Head from 'next/head'
import { siteConfig } from '@/data/siteData'
import PageHeader from '@/components/PageHeader'
import SeasonCard from '@/components/SeasonCard'
import { getAllArticles, ArticleMetadata } from '@/lib/markdown'

interface SeasonsPageProps {
  articles: ArticleMetadata[]
}

export default function SeasonsPage({ articles }: SeasonsPageProps) {
  return (
    <>
      <Head>
        <title>{`關渡心四季 | ${siteConfig.name}`}</title>
      </Head>
      <PageHeader
        title="關渡心四季"
        titleEn="Guandu Seasons of Heart"
        description="為因應學生樣態日益多元，提升導師輔導知能，本校建置「導師輔導知能電子報」，提供會議及研習以外之延伸資源，協助導師持續精進輔導專業，共同落實校園初級預防。"
      />
      <section className="py-16 lg:py-20">
        <div className="container-custom">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {articles.map((item) => (
              <SeasonCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const allArticles = getAllArticles()
  const articles = allArticles.map(article => ({
    id: article.id,
    title: article.title,
    year: article.year,
    date: article.date ? article.date.toString() : new Date().toISOString(),
    author: article.author || null,
    tags: article.tags || [],
    thumbnail: article.thumbnail || null,
    poster: article.poster || null,
  }))

  return {
    props: {
      articles,
    },
  }
}
