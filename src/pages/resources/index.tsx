import Head from 'next/head'
import { siteConfig, resources } from '@/data/siteData'
import PageHeader from '@/components/PageHeader'
import ResourceCard from '@/components/ResourceCard'

const categories = Array.from(new Set(resources.map((r) => r.category)))

export default function ResourcesPage() {
  return (
    <>
      <Head>
        <title>{`輔導資源懶人包 | ${siteConfig.name}`}</title>
      </Head>
      <PageHeader
        title={<><span className="inline-block">輔導資源</span><wbr /><span className="inline-block">懶人包</span></>}
        titleEn="Quick Reference Guides"
        description="13項導師輔導資源快速查詢"
      />
      <section className="py-16 lg:py-20">
        <div className="container-custom">
          {categories.map((category) => (
            <div key={category} className="mb-12 last:mb-0">
              <h2 className="font-serif text-lg font-semibold text-ink-900 mb-4 pb-3 border-b border-cream-200">
                {category}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {resources
                  .filter((r) => r.category === category)
                  .map((item) => (
                    <ResourceCard key={item.id} item={item} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
