'use client'

import { BlogPostMeta, BlogCategory } from '@/types/blog'
import Link from 'next/link'
import { ArrowLeft, Clock, Eye, User, BookOpen, Folder } from 'lucide-react'
import { DifficultyBadge } from './DifficultyBadge'
import { NEETTopicBadge } from './NEETTopicBadge'
import { BlogThumbnail } from './BlogThumbnail'

interface CategoryArchivePageProps {
  category: BlogCategory
  posts: BlogPostMeta[]
}

export function CategoryArchivePage({ category, posts }: CategoryArchivePageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link
            href="/blog"
            className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6">
              <Folder className="w-5 h-5" />
              <span className="font-medium">Category</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">{category.name}</h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-6">{category.description}</p>

            <div className="inline-flex items-center gap-2 bg-white/20 px-6 py-3 rounded-full">
              <BookOpen className="w-5 h-5" />
              <span className="font-semibold">{posts.length} Articles</span>
            </div>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">No articles yet</h2>
              <p className="text-gray-600 mb-6">
                We're working on content for this category. Check back soon!
              </p>
              <Link
                href="/blog"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Browse All Articles
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-100 animate-fade-in"
                >
                  {/* Thumbnail */}
                  <Link href={`/blog/${post.slug}`}>
                    <BlogThumbnail
                      slug={post.slug}
                      title={post.title}
                      size="md"
                      className="rounded-none"
                    />
                  </Link>

                  <div className="p-6">
                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.difficulty && (
                        <DifficultyBadge difficulty={post.difficulty} size="sm" />
                      )}
                      {post.neetChapter && (
                        <NEETTopicBadge
                          chapter={post.neetChapter}
                          weightage={post.neetWeightage}
                          size="sm"
                        />
                      )}
                    </div>

                    {/* Title */}
                    <h2 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>

                    {/* Excerpt */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>

                    {/* Meta */}
                    <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {post.readTime}m
                        </span>
                        <span className="flex items-center">
                          <Eye className="w-3 h-3 mr-1" />
                          {post.views?.toLocaleString()}
                        </span>
                      </div>
                      <span className="flex items-center">
                        <User className="w-3 h-3 mr-1" />
                        {post.author.name}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Explore More Topics</h2>
          <p className="text-gray-600 mb-6">
            Discover more articles across different categories to boost your NEET preparation.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            View All Articles
          </Link>
        </div>
      </section>
    </div>
  )
}
