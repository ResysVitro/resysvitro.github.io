import Head from 'next/head'
import Link from 'next/link'
import { siteConfig, systemLinks } from '@/data/siteData'
import PageHeader from '@/components/PageHeader'

export default function SystemsPage() {
  return (
    <>
      <Head>
        <title>導師常用系統 | {siteConfig.name}</title>
      </Head>
      <PageHeader
        title="導師常用系統"
        titleEn="Frequently Used Systems"
        description="校內常用系統連結與操作說明"
      />
      <section className="py-16 lg:py-20">
        <div className="container-custom">
          <div className="max-w-2xl space-y-4">
            {systemLinks.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                target={item.isExternal ? '_blank' : undefined}
                rel={item.isExternal ? 'noopener noreferrer' : undefined}
                className="group flex items-center justify-between p-6 bg-white border border-cream-200 rounded-xl transition-all duration-300 hover:border-accent-terracotta/30 hover:shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-cream-200 text-ink-500 rounded-lg flex items-center justify-center group-hover:bg-accent-terracotta group-hover:text-white transition-colors">
                    {item.isExternal ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-ink-900 group-hover:text-accent-terracotta transition-colors">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-sm text-ink-400">{item.description}</p>
                    )}
                  </div>
                </div>
                <div className="text-ink-300 group-hover:text-accent-terracotta transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
