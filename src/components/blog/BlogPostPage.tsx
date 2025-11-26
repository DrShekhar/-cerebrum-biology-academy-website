'use client'

import { BlogPostMeta, BlogCategory, TableOfContentsItem } from '@/types/blog'
import { Button } from '@/components/ui/Button'
import {
  Clock,
  Eye,
  Calendar,
  BookOpen,
  ArrowLeft,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  Share2,
} from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ReadingProgressBar } from './ReadingProgressBar'
import { TableOfContents } from './TableOfContents'
import { KeyTakeaways } from './KeyTakeaways'
import { DifficultyBadge } from './DifficultyBadge'
import { NEETTopicBadge } from './NEETTopicBadge'
import { RelatedPosts } from './RelatedPosts'
import { ArticleSchema, BreadcrumbSchema } from '@/components/seo/ArticleSchema'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface BlogPostPageProps {
  meta: BlogPostMeta
  content: string
  toc: TableOfContentsItem[]
  relatedPosts: BlogPostMeta[]
  category?: BlogCategory
}

export function BlogPostPage({ meta, content, toc, relatedPosts, category }: BlogPostPageProps) {
  const [copied, setCopied] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy URL:', err)
    }
  }

  const shareOnSocial = (platform: string) => {
    const url = encodeURIComponent(window.location.href)
    const title = encodeURIComponent(meta.title)

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    }

    window.open(shareUrls[platform as keyof typeof shareUrls], '_blank', 'width=600,height=400')
  }

  useEffect(() => {
    const handleClickOutside = () => setShowShareMenu(false)
    if (showShareMenu) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [showShareMenu])

  return (
    <>
      {/* SEO Schema */}
      <ArticleSchema
        title={meta.title}
        description={meta.excerpt}
        publishedAt={meta.publishedAt}
        updatedAt={meta.updatedAt}
        author={meta.author}
        featuredImage={meta.featuredImage}
        url={`https://cerebrumbiologyacademy.com/blog/${meta.slug}`}
        category={category?.name}
        tags={meta.tags}
        readTime={meta.readTime}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://cerebrumbiologyacademy.com' },
          { name: 'Blog', url: 'https://cerebrumbiologyacademy.com/blog' },
          {
            name: category?.name || 'Article',
            url: `https://cerebrumbiologyacademy.com/blog?category=${meta.category}`,
          },
          { name: meta.title, url: `https://cerebrumbiologyacademy.com/blog/${meta.slug}` },
        ]}
      />

      {/* Reading Progress Bar */}
      <ReadingProgressBar showPercentage showTimeRemaining readTime={meta.readTime} />

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

        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Content */}
            <article className="flex-1 max-w-4xl">
              {/* Article Header */}
              <motion.header
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Badges Row */}
                <div className="flex flex-wrap gap-3 mb-6">
                  {category && (
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-medium ${category.color}`}
                    >
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

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  {meta.title}
                </h1>

                {/* Excerpt */}
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">{meta.excerpt}</p>

                {/* Article Meta */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-8 border-b border-gray-200">
                  <div className="flex items-center space-x-6">
                    {/* Author */}
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-medium mr-4">
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
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {meta.views?.toLocaleString()} views
                      </div>
                    </div>
                  </div>

                  {/* Share Buttons */}
                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setShowShareMenu(!showShareMenu)
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                      Share
                    </button>

                    {showShareMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-lg border p-2 z-50"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => shareOnSocial('facebook')}
                            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            <Facebook className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => shareOnSocial('twitter')}
                            className="p-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors"
                          >
                            <Twitter className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => shareOnSocial('linkedin')}
                            className="p-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
                          >
                            <Linkedin className="w-4 h-4" />
                          </button>
                          <button
                            onClick={copyToClipboard}
                            className={`p-2 rounded-lg transition-colors ${
                              copied
                                ? 'bg-green-600 text-white'
                                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                            }`}
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.header>

              {/* Featured Image */}
              <motion.div
                className="aspect-video bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl mb-12 relative overflow-hidden"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <BookOpen className="w-16 h-16 text-white opacity-80" />
                </div>
              </motion.div>

              {/* Key Takeaways */}
              {meta.keyTakeaways && meta.keyTakeaways.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <KeyTakeaways takeaways={meta.keyTakeaways} />
                </motion.div>
              )}

              {/* Article Content */}
              <motion.div
                className="prose prose-lg max-w-none prose-headings:scroll-mt-20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ children }) => (
                      <h1
                        id={String(children)
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, '-')
                          .replace(/(^-|-$)/g, '')}
                        className="text-3xl font-bold text-gray-900 mb-6 mt-10"
                      >
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2
                        id={String(children)
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, '-')
                          .replace(/(^-|-$)/g, '')}
                        className="text-2xl font-bold text-gray-900 mb-4 mt-8"
                      >
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3
                        id={String(children)
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, '-')
                          .replace(/(^-|-$)/g, '')}
                        className="text-xl font-bold text-gray-900 mb-3 mt-6"
                      >
                        {children}
                      </h3>
                    ),
                    p: ({ children }) => (
                      <p className="text-gray-700 mb-4 leading-relaxed">{children}</p>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-700">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => <li className="ml-4">{children}</li>,
                    strong: ({ children }) => (
                      <strong className="font-semibold text-gray-900">{children}</strong>
                    ),
                    em: ({ children }) => <em className="italic text-gray-700">{children}</em>,
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-4 bg-blue-50 rounded-r-lg">
                        {children}
                      </blockquote>
                    ),
                    code: ({ children }) => (
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                        {children}
                      </code>
                    ),
                    table: ({ children }) => (
                      <div className="overflow-x-auto my-6">
                        <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
                          {children}
                        </table>
                      </div>
                    ),
                    thead: ({ children }) => <thead className="bg-gray-50">{children}</thead>,
                    th: ({ children }) => (
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                        {children}
                      </th>
                    ),
                    td: ({ children }) => (
                      <td className="px-4 py-3 text-sm text-gray-700 border-t">{children}</td>
                    ),
                    hr: () => <hr className="my-8 border-gray-200" />,
                    a: ({ href, children }) => (
                      <a
                        href={href}
                        className="text-blue-600 hover:text-blue-800 underline"
                        target={href?.startsWith('http') ? '_blank' : undefined}
                        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        {children}
                      </a>
                    ),
                  }}
                >
                  {content}
                </ReactMarkdown>
              </motion.div>

              {/* Tags */}
              <motion.div
                className="mt-12 pt-8 border-t border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {meta.tags.map((tag, index) => (
                    <Link
                      key={index}
                      href={`/blog?search=${encodeURIComponent(tag)}`}
                      className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-blue-100 hover:text-blue-700 transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </motion.div>

              {/* CTA Section */}
              <motion.div
                className="mt-16 p-8 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl text-white text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <h3 className="text-2xl font-bold mb-4">Ready to Master NEET Biology?</h3>
                <p className="text-lg mb-8 opacity-90">
                  Get personalized guidance from AIIMS experts and achieve your medical college
                  dreams
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/demo-booking">
                    <Button
                      variant="secondary_cta"
                      size="lg"
                      className="bg-white text-blue-600 hover:bg-gray-100"
                    >
                      Book Free Demo Class
                    </Button>
                  </Link>
                  <Link href="/resources">
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-white text-white hover:bg-white hover:text-blue-600"
                    >
                      Download Study Notes
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </article>

            {/* Sidebar with TOC */}
            <aside className="hidden lg:block w-80 flex-shrink-0">
              <div className="sticky top-24">
                <TableOfContents items={toc} />
              </div>
            </aside>
          </div>
        </div>

        {/* Mobile TOC */}
        <div className="lg:hidden">
          <TableOfContents items={toc} />
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && <RelatedPosts posts={relatedPosts} />}
      </div>
    </>
  )
}
