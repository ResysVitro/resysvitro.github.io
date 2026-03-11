interface PageHeaderProps {
  title: string
  titleEn?: string
  description?: string
}

export default function PageHeader({ title, titleEn, description }: PageHeaderProps) {
  return (
    <div className="bg-cream-100 py-16 lg:py-24">
      <div className="container-custom">
        <div className="divider mb-6" />
        <h1 className="font-serif text-3xl lg:text-5xl font-semibold text-ink-900 mb-2">{title}</h1>
        {titleEn && <p className="text-ink-400 text-sm mb-4">{titleEn}</p>}
        {description && <p className="text-ink-600 max-w-2xl">{description}</p>}
      </div>
    </div>
  )
}
