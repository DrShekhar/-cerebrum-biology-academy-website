'use client'

import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'
import { SEOLandingContent } from '@/data/seo-landing/types'

interface RelatedBlogPostsProps {
  posts: NonNullable<SEOLandingContent['relatedBlogPosts']>
}

export function RelatedBlogPosts({ posts }: RelatedBlogPostsProps) {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="text-center animate-fadeInUp"
        >
          <span className="inline-block rounded-full bg-green-100 px-4 py-1.5 text-sm font-semibold text-green-700">
            From Our Blog
          </span>
          <h2 className="mt-4 text-2xl font-bold text-gray-900 sm:text-3xl">
            Related Articles & Study Guides
          </h2>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <article
              key={index}
              className="group rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:border-blue-200 hover:shadow-md animate-fadeInUp"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 rounded-lg bg-blue-50 p-3">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">{post.excerpt}</p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
                  >
                    Read More
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3 font-medium text-gray-700 shadow-sm transition-all hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
          >
            View All Articles
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
