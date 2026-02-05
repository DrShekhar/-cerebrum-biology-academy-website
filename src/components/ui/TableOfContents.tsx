'use client'

import { useState, useEffect } from 'react'
import { List, ChevronDown, ChevronUp } from 'lucide-react'

/**
 * TableOfContents Component
 * Auto-generates or displays a table of contents for long pages
 * Improves content structure and user navigation
 */

export interface TOCItem {
  id: string
  title: string
  level: number // 1 = h1, 2 = h2, 3 = h3
  children?: TOCItem[]
}

interface TableOfContentsProps {
  items?: TOCItem[]
  autoGenerate?: boolean // If true, will scan page for headings
  title?: string
  variant?: 'sidebar' | 'inline' | 'floating' | 'collapsible'
  maxLevel?: number // Maximum heading level to include (default: 3)
  className?: string
}

export function TableOfContents({
  items: providedItems,
  autoGenerate = false,
  title = 'Table of Contents',
  variant = 'inline',
  maxLevel = 3,
  className = '',
}: TableOfContentsProps) {
  const [items, setItems] = useState<TOCItem[]>(providedItems || [])
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [activeId, setActiveId] = useState<string>('')

  // Auto-generate TOC from page headings
  useEffect(() => {
    if (autoGenerate && typeof window !== 'undefined') {
      const headings = document.querySelectorAll('h1, h2, h3, h4')
      const tocItems: TOCItem[] = []

      headings.forEach((heading) => {
        const level = parseInt(heading.tagName.charAt(1))
        if (level <= maxLevel) {
          const id = heading.id || heading.textContent?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || ''

          // Add id to heading if not present
          if (!heading.id && id) {
            heading.id = id
          }

          tocItems.push({
            id,
            title: heading.textContent || '',
            level,
          })
        }
      })

      setItems(tocItems)
    }
  }, [autoGenerate, maxLevel])

  // Track active section on scroll
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleScroll = () => {
      const headings = items.map((item) => document.getElementById(item.id)).filter(Boolean)

      for (let i = headings.length - 1; i >= 0; i--) {
        const heading = headings[i]
        if (heading && heading.getBoundingClientRect().top <= 100) {
          setActiveId(heading.id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [items])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const yOffset = -80 // Account for fixed header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  if (items.length === 0) return null

  // Collapsible variant
  if (variant === 'collapsible') {
    return (
      <div className={`bg-gray-50 border border-gray-200 rounded-xl overflow-hidden ${className}`}>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-between p-4 hover:bg-gray-100 transition-colors"
        >
          <span className="flex items-center gap-2 font-semibold text-gray-900">
            <List className="w-5 h-5 text-blue-600" />
            {title}
          </span>
          {isCollapsed ? (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          )}
        </button>
        {!isCollapsed && (
          <nav className="px-4 pb-4">
            <ol className="space-y-1">
              {items.map((item, idx) => (
                <li key={item.id || idx} style={{ paddingLeft: `${(item.level - 1) * 16}px` }}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`text-left w-full py-1.5 px-3 rounded-lg text-sm transition-colors ${
                      activeId === item.id
                        ? 'bg-blue-100 text-blue-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    {item.title}
                  </button>
                </li>
              ))}
            </ol>
          </nav>
        )}
      </div>
    )
  }

  // Sidebar variant
  if (variant === 'sidebar') {
    return (
      <aside className={`sticky top-24 ${className}`}>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <List className="w-5 h-5 text-blue-600" />
            {title}
          </h3>
          <nav>
            <ol className="space-y-1 text-sm">
              {items.map((item, idx) => (
                <li key={item.id || idx} style={{ paddingLeft: `${(item.level - 1) * 12}px` }}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`text-left w-full py-1.5 px-2 rounded transition-colors ${
                      activeId === item.id
                        ? 'bg-blue-50 text-blue-700 font-medium border-l-2 border-blue-600'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    {item.title}
                  </button>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </aside>
    )
  }

  // Floating variant (fixed position)
  if (variant === 'floating') {
    return (
      <div className={`fixed right-4 top-1/3 z-40 hidden xl:block ${className}`}>
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-lg max-w-xs">
          <h3 className="font-bold text-gray-900 mb-3 text-sm flex items-center gap-2">
            <List className="w-4 h-4 text-blue-600" />
            {title}
          </h3>
          <nav>
            <ol className="space-y-1 text-xs">
              {items.slice(0, 8).map((item, idx) => (
                <li key={item.id || idx}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`text-left w-full py-1 px-2 rounded transition-colors truncate ${
                      activeId === item.id
                        ? 'bg-blue-50 text-blue-700 font-medium'
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                    title={item.title}
                  >
                    {item.title}
                  </button>
                </li>
              ))}
              {items.length > 8 && (
                <li className="text-gray-400 px-2 py-1">+{items.length - 8} more...</li>
              )}
            </ol>
          </nav>
        </div>
      </div>
    )
  }

  // Default: inline variant
  return (
    <div className={`bg-blue-50 border border-blue-100 rounded-xl p-5 my-6 ${className}`}>
      <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
        <List className="w-5 h-5 text-blue-600" />
        {title}
      </h3>
      <nav>
        <ol className="space-y-2">
          {items.map((item, idx) => (
            <li
              key={item.id || idx}
              className="flex items-start gap-2"
              style={{ paddingLeft: `${(item.level - 1) * 16}px` }}
            >
              <span className="text-blue-400 font-mono text-sm mt-0.5">
                {idx + 1}.
              </span>
              <button
                onClick={() => scrollToSection(item.id)}
                className="text-left text-gray-700 hover:text-blue-600 transition-colors"
              >
                {item.title}
              </button>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  )
}

// Pre-built TOC for common pages
export const NEET_PREPARATION_TOC: TOCItem[] = [
  { id: 'overview', title: 'Course Overview', level: 2 },
  { id: 'syllabus', title: 'NEET Syllabus Coverage', level: 2 },
  { id: 'schedule', title: 'Batch Schedule & Timings', level: 2 },
  { id: 'faculty', title: 'Expert Faculty', level: 2 },
  { id: 'fees', title: 'Fee Structure', level: 2 },
  { id: 'results', title: 'Results & Success Stories', level: 2 },
  { id: 'faq', title: 'Frequently Asked Questions', level: 2 },
  { id: 'enroll', title: 'How to Enroll', level: 2 },
]

export const BLOG_POST_TOC: TOCItem[] = [
  { id: 'introduction', title: 'Introduction', level: 2 },
  { id: 'key-points', title: 'Key Points', level: 2 },
  { id: 'detailed-analysis', title: 'Detailed Analysis', level: 2 },
  { id: 'tips', title: 'Expert Tips', level: 2 },
  { id: 'conclusion', title: 'Conclusion', level: 2 },
]

export default TableOfContents
