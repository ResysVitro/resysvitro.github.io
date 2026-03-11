import Link from 'next/link'
import Image from 'next/image'
import { SeasonArticle } from '@/data/siteData'

interface SeasonCardProps {
  item: SeasonArticle
  priority?: boolean // For above-the-fold images
}

export default function SeasonCard({ item, priority = false }: SeasonCardProps) {
  return (
    <Link href={`/seasons/${item.id}`} className="group block">
      <article className="h-full">
        <div className="relative aspect-[16/10] bg-cream-200 rounded-xl overflow-hidden mb-4">
          {item.thumbnail ? (
            <Image
              src={item.thumbnail}
              alt={item.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading={priority ? 'eager' : 'lazy'}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-cream-200" />
          )}
        </div>
        <div className="flex flex-wrap gap-2 mb-2">
          {item.tags?.map((tag) => (
            <span key={tag} className="tag tag-default text-xs">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="font-medium text-ink-900 group-hover:text-accent-terracotta transition-colors line-clamp-2">
          {item.title}
        </h3>
        <time className="text-sm text-ink-400 mt-1 block">
          {new Date(item.date).toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric' })}
        </time>
      </article>
    </Link>
  )
}
