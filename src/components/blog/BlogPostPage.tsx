'use client'

import { BlogPost } from '@/types/blog'
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
} from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'

interface BlogPostPageProps {
  post: BlogPost
}

export function BlogPostPage({ post }: BlogPostPageProps) {
  const [copied, setCopied] = useState(false)

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
    const title = encodeURIComponent(post.title)

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    }

    window.open(shareUrls[platform as keyof typeof shareUrls], '_blank', 'width=600,height=400')
  }

  // Format content with proper spacing and styling
  const formatContent = (content: string) => {
    return content
      .split('\n')
      .map((paragraph, index) => {
        // Handle headers
        if (paragraph.startsWith('# ')) {
          return (
            <h1 key={index} className="text-3xl font-bold text-gray-900 mb-6 mt-8">
              {paragraph.replace('# ', '')}
            </h1>
          )
        }
        if (paragraph.startsWith('## ')) {
          return (
            <h2 key={index} className="text-2xl font-bold text-gray-900 mb-4 mt-8">
              {paragraph.replace('## ', '')}
            </h2>
          )
        }
        if (paragraph.startsWith('### ')) {
          return (
            <h3 key={index} className="text-xl font-bold text-gray-900 mb-3 mt-6">
              {paragraph.replace('### ', '')}
            </h3>
          )
        }

        // Handle lists
        if (paragraph.startsWith('- ')) {
          return (
            <li key={index} className="text-gray-700 mb-2 ml-4">
              {paragraph.replace('- ', '')}
            </li>
          )
        }

        // Handle bold text
        if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
          return (
            <p key={index} className="font-bold text-gray-900 mb-4">
              {paragraph.replace(/\*\*/g, '')}
            </p>
          )
        }

        // Handle code blocks
        if (paragraph.startsWith('```')) {
          return null // Skip code block markers
        }
        if (paragraph.includes('`') && !paragraph.startsWith('#')) {
          const formattedText = paragraph.replace(
            /`([^`]+)`/g,
            '<code class="bg-gray-100 px-2 py-1 rounded text-sm">$1</code>'
          )
          return (
            <p
              key={index}
              className="text-gray-700 mb-4"
              dangerouslySetInnerHTML={{ __html: formattedText }}
            />
          )
        }

        // Regular paragraphs
        if (paragraph.trim() && !paragraph.startsWith('#') && !paragraph.startsWith('-')) {
          return (
            <p key={index} className="text-gray-700 mb-4 leading-relaxed">
              {paragraph}
            </p>
          )
        }

        return null
      })
      .filter(Boolean)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link
            href="/blog"
            className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Article Header */}
        <motion.header
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Category Badge */}
          <div
            className={`inline-block px-4 py-2 rounded-full text-sm font-medium mb-6 ${post.category.color}`}
          >
            {post.category.name}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">{post.excerpt}</p>

          {/* Article Meta */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-8 border-b border-gray-200">
            <div className="flex items-center space-x-6">
              {/* Author */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-medium mr-4">
                  {post.author.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{post.author.name}</div>
                  <div className="text-gray-500 text-sm">{post.author.role}</div>
                </div>
              </div>

              {/* Article Stats */}
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {post.readTime} min read
                </div>
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  {post.views?.toLocaleString()} views
                </div>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 mr-2">Share:</span>
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
                  copied ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                <Copy className="w-4 h-4" />
              </button>
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

        {/* Article Content */}
        <motion.div
          className="prose prose-lg max-w-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="text-lg leading-relaxed">{formatContent(post.content)}</div>
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
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
              >
                #{tag}
              </span>
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
            Get personalized guidance from AIIMS experts and achieve your medical college dreams
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary_cta"
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Book Free Demo Class
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              Download Study Notes
            </Button>
          </div>
        </motion.div>
      </article>

      {/* Related Articles */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Continue Reading</h2>
          <div className="text-center">
            <Link href="/blog">
              <Button variant="primary" size="lg">
                View All Articles
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
