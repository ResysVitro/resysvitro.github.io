import { GetStaticProps, GetStaticPaths } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { siteConfig } from '@/data/siteData'
import { getWorkshopBySlug, getAllWorkshops, Workshop } from '@/lib/markdown'

interface WorkshopPageProps {
  workshop: Workshop
}

export default function WorkshopDetailPage({ workshop }: WorkshopPageProps) {
  return (
    <>
      <Head>
        <title>{`${workshop.title} | ${siteConfig.name}`}</title>
        <meta name="description" content={workshop.title} />
      </Head>

      <article className="py-12 lg:py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/workshop/"
              className="inline-flex items-center gap-2 text-ink-500 hover:text-accent-terracotta transition-colors mb-8"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              返回導師輔導知能研習
            </Link>

            <div className="divider mb-6" />

            <h1 className="font-serif text-3xl lg:text-4xl font-semibold text-ink-900 mb-4">
              {workshop.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mb-8 pb-8 border-b border-cream-200">
              <time className="text-ink-500">
                {new Date(workshop.date).toLocaleDateString('zh-TW', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              <span className="px-3 py-1 bg-cream-200 text-ink-700 text-sm rounded-full">
                {workshop.semester}
              </span>
              {workshop.tags && workshop.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {workshop.tags.map((tag) => (
                    <span key={tag} className="tag tag-default">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {workshop.poster && (
              <div
                className={`relative rounded-2xl overflow-hidden mb-12 bg-cream-100 ${
                  workshop.orientation === 'landscape' ? 'aspect-[16/10]' : 'aspect-[3/4]'
                }`}
              >
                <Image
                  src={workshop.poster}
                  alt={workshop.title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            )}

            {workshop.registrationUrl && (
              <div className="mb-12 p-6 bg-cream-100 rounded-xl border border-cream-300">
                <h3 className="font-medium text-lg text-ink-900 mb-3">活動報名</h3>
                <Link
                  href={workshop.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  前往報名
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Link>
              </div>
            )}

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
              dangerouslySetInnerHTML={{ __html: workshop.content }}
            />

            <div className="mt-12 pt-8 border-t border-cream-200">
              <Link
                href="/workshop/"
                className="btn-outline"
              >
                返回研習列表
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const workshops = getAllWorkshops()
  const paths = workshops.map((workshop) => ({
    params: { id: workshop.id },
  }))

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const workshop = await getWorkshopBySlug(params?.id as string)

  if (!workshop) {
    return { notFound: true }
  }

  return {
    props: {
      workshop: {
        id: workshop.id,
        title: workshop.title,
        semester: workshop.semester,
        date: workshop.date ? workshop.date.toString() : new Date().toISOString(),
        orientation: workshop.orientation,
        tags: workshop.tags || [],
        thumbnail: workshop.thumbnail || null,
        poster: workshop.poster || null,
        registrationUrl: workshop.registrationUrl || null,
        content: workshop.content,
      },
    },
  }
}
