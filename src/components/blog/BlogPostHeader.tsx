import { BlogPostMeta, BlogCategory } from '@/types/blog'
import { Clock, Calendar, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { DifficultyBadge } from './DifficultyBadge'
import { NEETTopicBadge } from './NEETTopicBadge'

interface BlogPostHeaderProps {
  meta: BlogPostMeta
  category?: BlogCategory
}

export function BlogPostHeader({ meta, category }: BlogPostHeaderProps) {
  return (
    <>
      {/* Back Button - Server rendered */}
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

      {/* Hero Section - Server rendered for LCP */}
      <div className="max-w-7xl mx-auto px-4 pt-12">
        <div className="max-w-4xl">
          {/* Badges Row */}
          <div className="flex flex-wrap gap-3 mb-6">
            {category && (
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${category.color}`}>
                {category.name}
              </span>
            )}
            {meta.difficulty && <DifficultyBadge difficulty={meta.difficulty} />}
            {meta.neetChapter && (
              <NEETTopicBadge chapter={meta.neetChapter} weightage={meta.neetWeightage} />
            )}
            {meta.targetAudience && meta.targetAudience !== 'Both' && (
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                For {meta.targetAudience}s
              </span>
            )}
          </div>

          {/* Title - Critical LCP element, server rendered */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {meta.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">{meta.excerpt}</p>

          {/* Article Meta - Server rendered */}
          <div className="flex flex-col md:flex-row md:items-center gap-6 pb-8 border-b border-gray-200">
            <div className="flex items-center space-x-6">
              {/* Author */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium mr-4">
                  {meta.author.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{meta.author.name}</div>
                  <div className="text-gray-500 text-sm">{meta.author.role}</div>
                </div>
              </div>

              {/* Article Stats */}
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(meta.publishedAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {meta.readTime} min read
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}
