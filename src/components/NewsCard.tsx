import Link from 'next/link'
import { NewsItem } from '@/data/siteData'

interface NewsCardProps {
  item: NewsItem
  featured?: boolean
}

export default function NewsCard({ item, featured = false }: NewsCardProps) {
  const formattedDate = new Date(item.date).toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  if (featured) {
    return (
      <Link
        href={item.href}
        target={item.isExternal ? '_blank' : undefined}
        rel={item.isExternal ? 'noopener noreferrer' : undefined}
      >
        <article className="group relative bg-cream-100 rounded-2xl p-8 transition-all duration-500 hover:bg-cream-200 cursor-pointer">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="tag tag-default">{item.category}</span>
                <time className="text-sm text-ink-400">{formattedDate}</time>
              </div>
              <h3 className="font-serif text-xl lg:text-2xl font-semibold text-ink-900 mb-3 group-hover:text-accent-terracotta transition-colors">
                {item.title}
              </h3>
              {item.excerpt && (
                <p className="text-ink-500 leading-relaxed">{item.excerpt}</p>
              )}
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
    <Link
      href={item.href}
      target={item.isExternal ? '_blank' : undefined}
      rel={item.isExternal ? 'noopener noreferrer' : undefined}
    >
      <article className="group cursor-pointer">
        <div className="flex items-center gap-3 mb-3">
          <span className="tag tag-default">{item.category}</span>
          <time className="text-sm text-ink-400">{formattedDate}</time>
        </div>
        <h3 className="font-medium text-ink-900 mb-2 group-hover:text-accent-terracotta transition-colors line-clamp-2">
          {item.title}
        </h3>
        <div className="inline-flex items-center gap-1.5 text-sm text-ink-500 group-hover:text-accent-terracotta transition-colors">
          閱讀更多
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </article>
    </Link>
  )
}
