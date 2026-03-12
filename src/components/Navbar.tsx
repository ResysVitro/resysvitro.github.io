'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { navigation, siteConfig, NavItem } from '@/data/siteData'

function NavDropdown({ item }: { item: NavItem }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="flex items-center gap-1 px-4 py-2 text-ink-600 hover:text-ink-900 transition-colors text-sm">
        {item.label}
        <svg className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && item.children && (
        <div className="absolute top-full left-0 min-w-[200px] bg-white rounded-lg shadow-lg border border-cream-200 py-2 z-50">
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={child.href || '#'}
              className="block px-5 py-2.5 text-sm text-ink-600 hover:bg-cream-100 hover:text-ink-900 transition-colors"
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    )
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-x-0 top-16 bottom-0 bg-ink-900/50 backdrop-blur-md" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-80 max-w-full bg-cream-50 shadow-2xl">
        <div className="flex items-center justify-between px-6 py-[14px] border-b border-cream-200">
          <span className="font-serif font-semibold text-lg text-ink-900">選單</span>
          <button onClick={onClose} className="p-2 hover:bg-cream-200 rounded-full transition-colors">
            <svg className="w-5 h-5 text-ink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="px-6 pb-6 bg-cream-50">
          {navigation.map((item, index) => (
            <div key={item.label} className={index > 0 ? 'border-t border-cream-200' : ''}>
              {item.children ? (
                <div>
                  <button
                    onClick={() => toggleExpand(item.label)}
                    className="flex items-center justify-between w-full py-4 text-ink-700 text-sm"
                  >
                    {item.label}
                    <svg
                      className={`w-4 h-4 transition-transform text-ink-400 ${expandedItems.includes(item.label) ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {expandedItems.includes(item.label) && (
                    <div className="pl-4 pb-3">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href || '#'}
                          onClick={onClose}
                          className="block py-2.5 text-sm text-ink-500 hover:text-accent-terracotta transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href || '#'}
                  onClick={onClose}
                  className="block py-4 text-sm text-ink-700 hover:text-accent-terracotta transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  )
}

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-cream-50/90 backdrop-blur-md border-b border-cream-200">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="group flex items-center gap-4">
            <div className="relative h-10 w-auto">
              <Image
                src="/images/stable/tnua-logo.png"
                alt="國立臺北藝術大學"
                width={280}
                height={40}
                className="h-10 w-auto object-contain"
                priority
                fetchPriority="high"
              />
            </div>
            <span className="font-serif font-semibold text-ink-900 group-hover:text-accent-terracotta transition-colors whitespace-nowrap">
              導師系統
            </span>
          </Link>

          <nav className="hidden lg:flex items-center">
            {navigation.map((item) =>
              item.children ? (
                <NavDropdown key={item.label} item={item} />
              ) : (
                <Link
                  key={item.label}
                  href={item.href || '#'}
                  className="px-4 py-2 text-sm text-ink-600 hover:text-ink-900 transition-colors"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 hover:bg-cream-200 rounded-full transition-colors"
          >
            <svg className="w-5 h-5 text-ink-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </header>
  )
}
