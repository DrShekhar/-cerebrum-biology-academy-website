'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { blogCategories } from '@/lib/blog/mdx'

const categories = Object.values(blogCategories)

export function BlogCategoryNav() {
  const pathname = usePathname()

  const isAllPosts = pathname === '/blog'
  const activeCategorySlug = pathname.startsWith('/blog/category/')
    ? pathname.replace('/blog/category/', '')
    : null

  return (
    <nav className="sticky top-16 lg:top-20 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-2 py-3 overflow-x-auto scrollbar-hide">
          <Link
            href="/blog"
            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              isAllPosts ? 'bg-[#4a5d4a] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All Posts
          </Link>
          {categories.map((cat) => {
            const isActive = activeCategorySlug === cat.slug
            return (
              <Link
                key={cat.slug}
                href={`/blog/category/${cat.slug}`}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  isActive ? cat.color : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat.name}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
