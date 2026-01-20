'use client'

import Link from 'next/link'
import { Clock, ArrowRight } from 'lucide-react'
import { BlogPostMeta } from '@/types/blog'
import { DifficultyBadge } from './DifficultyBadge'
import { blogCategories } from '@/lib/blog/mdx'
import { parseReadTime } from './utils'

interface RelatedPostsProps {
  posts: BlogPostMeta[]
  title?: string
}

export function RelatedPosts({ posts, title = 'Continue Reading' }: RelatedPostsProps) {
  if (!posts || posts.length === 0) return null

  return (
    <section className="mt-12 pt-8 border-t border-gray-200">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">{title}</h3>

      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((post, index) => {
          const category = blogCategories[post.category]

          return (
            <article key={post.slug} className="group animate-fade-in">
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-blue-200 transition-all duration-300">
                  {/* Featured Image Placeholder */}
                  <div className="h-36 bg-indigo-100 relative">
                    {post.difficulty && (
                      <div className="absolute top-3 right-3">
                        <DifficultyBadge difficulty={post.difficulty} size="sm" showLabel={false} />
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    {category && (
                      <span className={`text-xs px-2 py-1 rounded-full ${category.color}`}>
                        {category.name}
                      </span>
                    )}

                    <h4 className="mt-2 text-base font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h4>

                    <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {parseReadTime(post.readTime)} min read
                      </span>
                      <span className="flex items-center gap-1 text-blue-600 font-medium group-hover:gap-2 transition-all">
                        Read
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          )
        })}
      </div>
    </section>
  )
}
