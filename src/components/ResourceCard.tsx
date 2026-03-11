import Link from 'next/link'
import { ResourceItem } from '@/data/siteData'

interface ResourceCardProps {
  item: ResourceItem
}

export default function ResourceCard({ item }: ResourceCardProps) {
  return (
    <Link
      href={item.pdfUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4 p-5 bg-white border border-cream-200 rounded-xl transition-all duration-300 hover:border-accent-terracotta/30 hover:shadow-sm"
    >
      <div className="flex-shrink-0 w-10 h-10 bg-cream-200 text-ink-500 rounded-lg flex items-center justify-center group-hover:bg-accent-terracotta group-hover:text-white transition-colors">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-sm text-ink-900 group-hover:text-accent-terracotta transition-colors truncate">
          {item.title}
        </h3>
        <p className="text-xs text-ink-400 mt-0.5">{item.category}</p>
      </div>
      <div className="flex-shrink-0 text-ink-300 group-hover:text-accent-terracotta transition-colors">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      </div>
    </Link>
  )
}
