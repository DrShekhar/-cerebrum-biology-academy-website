'use client'

import { BlogPostMeta, BlogCategory, TableOfContentsItem } from '@/types/blog'
import {
  Clock,
  Eye,
  Calendar,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  Share2,
  Phone,
  Sparkles,
  ArrowRight,
  CheckCircle,
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { ReadingProgressBar } from './ReadingProgressBar'
import { TableOfContents } from './TableOfContents'
import { KeyTakeaways } from './KeyTakeaways'
import { DifficultyBadge } from './DifficultyBadge'
import { NEETTopicBadge } from './NEETTopicBadge'
import { RelatedPosts } from './RelatedPosts'
import { RelatedResources } from './RelatedResources'
import { BlogComments } from './BlogComments'
import { BackToTop } from './BackToTop'
import { parseReadTime } from './utils'
import { BlogExitIntentWrapper } from './BlogExitIntentWrapper'
import { BlogWhatsAppQuery } from './BlogWhatsAppQuery'
import { BlogNewsletterSignup } from './BlogNewsletterSignup'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { BlogIllustrationLoader } from './BlogIllustrationLoader'
import { FAQSchema, extractFAQsFromContent, generateTopicFAQs } from './FAQSchema'
import { useBlogViews } from '@/hooks/useBlogViews'

// Animated counter component for view count
function AnimatedViewCount({ target }: { target: number }) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const counterRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (hasAnimated || target === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const duration = 2000 // 2 seconds
          const steps = 60
          const increment = target / steps
          let current = 0
          const timer = setInterval(() => {
            current += increment
            if (current >= target) {
              setCount(target)
              clearInterval(timer)
            } else {
              setCount(Math.floor(current))
            }
          }, duration / steps)
        }
      },
      { threshold: 0.5 }
    )

    if (counterRef.current) {
      observer.observe(counterRef.current)
    }

    return () => observer.disconnect()
  }, [target, hasAnimated])

  return (
    <span ref={counterRef} className="tabular-nums">
      {count.toLocaleString()}
    </span>
  )
}

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
  const [leadPhone, setLeadPhone] = useState('')
  const [leadSubmitting, setLeadSubmitting] = useState(false)
  const [leadSubmitted, setLeadSubmitted] = useState(false)
  const [leadError, setLeadError] = useState('')

  // Track views (adds real-time views to viral base count)
  const { views: totalViews } = useBlogViews({
    slug: meta.slug,
    initialViews: meta.views || 0,
    trackOnMount: true,
  })

  // Extract FAQs from content and generate topic-specific FAQs
  const extractedFaqs = extractFAQsFromContent(content)
  const topicFaqs = generateTopicFAQs(meta.title, meta.category, meta.tags)
  const allFaqs = [...extractedFaqs, ...topicFaqs].slice(0, 10)

  // Lead capture form validation and submission
  const validatePhone = (value: string): boolean => {
    const cleanPhone = value.replace(/[\s\-\+]/g, '')
    const indianPhoneRegex = /^(91)?[6-9]\d{9}$/
    return indianPhoneRegex.test(cleanPhone)
  }

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLeadError('')

    if (!validatePhone(leadPhone)) {
      setLeadError('Please enter a valid Indian mobile number (with or without +91)')
      return
    }

    setLeadSubmitting(true)

    try {
      const response = await fetch('/api/blog/capture-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: leadPhone,
          source: 'blog_inline',
          articleSlug: meta.slug,
          articleTitle: meta.title,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setLeadSubmitted(true)
      } else {
        setLeadError(data.message || 'Something went wrong. Please try again.')
      }
    } catch {
      setLeadError('Network error. Please try again.')
    } finally {
      setLeadSubmitting(false)
    }
  }

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
      {/* FAQ Schema (ArticleSchema + BreadcrumbSchema rendered by server page) */}
      {allFaqs.length > 0 && <FAQSchema faqs={allFaqs} pageTitle={meta.title} />}

      {/* Reading Progress Bar */}
      <ReadingProgressBar showPercentage showTimeRemaining readTime={meta.readTime} />

      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Main Content */}
            <article className="flex-1 min-w-0 max-w-4xl">
              {/* Article Header */}
              <div className="mb-10">
                <div className="animate-fade-in-up">
                  {/* Badges Row — simplified: category shown in nav, only show metadata badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {meta.difficulty && <DifficultyBadge difficulty={meta.difficulty} />}
                    {meta.neetChapter && meta.neetChapter !== 'General' && (
                      <NEETTopicBadge chapter={meta.neetChapter} weightage={meta.neetWeightage} />
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
                          {parseReadTime(meta.readTime)} min read
                        </div>
                        <div className="flex items-center text-orange-600 font-medium">
                          <Eye className="w-4 h-4 mr-1" />
                          <AnimatedViewCount target={totalViews} /> views
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
                        <div
                          className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-lg border p-2 z-50 animate-fade-in"
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
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Featured Image - Dynamically loaded for performance */}
              <div className="relative w-full aspect-[16/10] md:aspect-[16/9] bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 rounded-2xl md:rounded-3xl mb-8 overflow-hidden shadow-lg shadow-blue-100/50 animate-fade-in">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.08),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(139,92,246,0.06),transparent_50%)]" />
                <div className="absolute inset-0 p-6 md:p-10 lg:p-12 flex items-center justify-center">
                  <BlogIllustrationLoader
                    slug={meta.slug}
                    neetChapter={meta.neetChapter}
                    category={category?.slug}
                    title={meta.title}
                    className="w-full h-full max-w-4xl drop-shadow-sm"
                  />
                </div>
              </div>

              {/* Key Takeaways */}
              {meta.keyTakeaways && meta.keyTakeaways.length > 0 && (
                <div className="animate-fade-in-up">
                  <KeyTakeaways takeaways={meta.keyTakeaways} category={meta.category} />
                </div>
              )}

              {/* Article Content */}
              <div className="prose prose-lg max-w-none prose-headings:scroll-mt-24 animate-fade-in-up">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    h1: ({ children }) => {
                      // Skip duplicate h1 if it matches the article title (already rendered in header)
                      const headingText = String(children).trim()
                      if (headingText === meta.title.trim()) {
                        return null
                      }
                      return (
                        <h1
                          id={headingText
                            .toLowerCase()
                            .replace(/[^a-z0-9]+/g, '-')
                            .replace(/(^-|-$)/g, '')}
                          className="text-3xl font-bold text-gray-900 mb-6 mt-10"
                        >
                          {children}
                        </h1>
                      )
                    },
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
                    code: ({ children, className }) => {
                      // Check if it's a code block (has language class) or inline code
                      const isCodeBlock = className?.startsWith('language-')
                      if (isCodeBlock) {
                        return (
                          <div className="relative my-4 rounded-xl overflow-hidden bg-gray-900 shadow-lg">
                            <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
                              <span className="text-xs text-gray-400 font-medium uppercase">
                                {className?.replace('language-', '') || 'code'}
                              </span>
                            </div>
                            <pre className="overflow-x-auto p-4 text-sm">
                              <code className="text-gray-100 font-mono">{children}</code>
                            </pre>
                          </div>
                        )
                      }
                      return (
                        <code className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded text-sm font-mono border border-blue-100">
                          {children}
                        </code>
                      )
                    },
                    pre: ({ children }) => <>{children}</>,
                    table: ({ children }) => (
                      <div className="overflow-x-auto my-6 rounded-xl border border-gray-200 shadow-sm">
                        <table className="min-w-full divide-y divide-gray-200">{children}</table>
                      </div>
                    ),
                    thead: ({ children }) => <thead className="bg-gray-50">{children}</thead>,
                    th: ({ children }) => (
                      <th className="px-5 py-4 text-left text-sm font-bold text-gray-900 whitespace-nowrap">
                        {children}
                      </th>
                    ),
                    tbody: ({ children }) => (
                      <tbody className="divide-y divide-gray-100 bg-white">{children}</tbody>
                    ),
                    tr: ({ children }) => (
                      <tr className="hover:bg-gray-50 transition-colors even:bg-gray-50/50">
                        {children}
                      </tr>
                    ),
                    td: ({ children }) => (
                      <td className="px-5 py-4 text-sm text-gray-700">{children}</td>
                    ),
                    hr: () => <hr className="my-8 border-gray-200" />,
                    img: ({ src, alt }) => {
                      const imageSrc = typeof src === 'string' ? src : '/blog/default-image.jpg'
                      return (
                        <figure className="my-8">
                          <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-100">
                            <Image
                              src={imageSrc}
                              alt={alt || 'Blog image'}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
                            />
                          </div>
                          {alt && (
                            <figcaption className="mt-2 text-center text-sm text-gray-500 italic">
                              {alt}
                            </figcaption>
                          )}
                        </figure>
                      )
                    },
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
              </div>

              {/* Related Resources - Internal Linking for SEO */}
              <RelatedResources
                category={meta.category}
                neetChapter={meta.neetChapter}
                tags={meta.tags}
              />

              {/* Newsletter Signup - Email-first capture */}
              <BlogNewsletterSignup
                articleSlug={meta.slug}
                category={meta.category}
              />

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-gray-200 animate-fade-in">
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
              </div>

              {/* CTA Section - Context Aware */}
              {meta.category === 'olympiad' ? (
                <div className="mt-16 p-8 bg-[#3d4d3d] rounded-3xl text-white text-center animate-fade-in-up">
                  <h3 className="text-2xl font-bold mb-4">Ready to Excel at Biology Olympiad?</h3>
                  <p className="text-lg mb-6 opacity-90">
                    Get expert coaching from Olympiad medalists and compete at the international
                    level
                  </p>

                  {/* Lead Capture Form */}
                  {leadSubmitted ? (
                    <div className="p-4 bg-green-500/20 rounded-xl">
                      <div className="flex items-center justify-center gap-3 text-green-100">
                        <CheckCircle className="w-6 h-6" />
                        <div>
                          <p className="font-bold">Thank you for your interest!</p>
                          <p className="text-sm opacity-90">
                            Our Olympiad specialist will contact you within 24 hours.
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleLeadSubmit}
                      className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto"
                    >
                      <div className="relative flex-1">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          value={leadPhone}
                          onChange={(e) =>
                            setLeadPhone(e.target.value.replace(/[^\d+\-\s]/g, '').slice(0, 15))
                          }
                          placeholder="Mobile number"
                          required
                          className="w-full pl-12 pr-4 py-3.5 text-base bg-white text-gray-900 rounded-xl border-2 border-transparent focus:border-green-400 focus:ring-0 focus:outline-none shadow-lg placeholder:text-gray-400"
                          style={{ fontSize: '16px' }}
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={leadSubmitting || !leadPhone}
                        className="px-6 py-3.5 font-bold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-[1.02] bg-white hover:bg-gray-100 text-[#3d4d3d]"
                      >
                        {leadSubmitting ? (
                          <span className="flex items-center gap-2">
                            <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="none"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              />
                            </svg>
                            Processing...
                          </span>
                        ) : (
                          <>
                            <Sparkles className="w-5 h-5" />
                            Get Olympiad Guidance
                            <ArrowRight className="w-5 h-5" />
                          </>
                        )}
                      </button>
                    </form>
                  )}

                  {leadError && (
                    <p className="mt-3 text-red-300 text-sm bg-red-500/20 px-4 py-2 rounded-lg max-w-lg mx-auto">
                      {leadError}
                    </p>
                  )}
                </div>
              ) : (
                <div className="mt-16 p-8 bg-[#3d4d3d] rounded-3xl text-white text-center animate-fade-in-up">
                  <h3 className="text-2xl font-bold mb-4">Ready to Master NEET Biology?</h3>
                  <p className="text-lg mb-6 opacity-90">
                    Get personalized guidance from AIIMS experts and achieve your medical college
                    dreams
                  </p>

                  {/* Lead Capture Form */}
                  {leadSubmitted ? (
                    <div className="p-4 bg-green-500/20 rounded-xl">
                      <div className="flex items-center justify-center gap-3 text-green-100">
                        <CheckCircle className="w-6 h-6" />
                        <div>
                          <p className="font-bold">Thank you for your interest!</p>
                          <p className="text-sm opacity-90">
                            Our counselor will contact you within 24 hours.
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleLeadSubmit}
                      className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto"
                    >
                      <div className="relative flex-1">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          value={leadPhone}
                          onChange={(e) =>
                            setLeadPhone(e.target.value.replace(/[^\d+\-\s]/g, '').slice(0, 15))
                          }
                          placeholder="Mobile number"
                          required
                          className="w-full pl-12 pr-4 py-3.5 text-base bg-white text-gray-900 rounded-xl border-2 border-transparent focus:border-yellow-400 focus:ring-0 focus:outline-none shadow-lg placeholder:text-gray-400"
                          style={{ fontSize: '16px' }}
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={leadSubmitting || !leadPhone}
                        className="px-6 py-3.5 font-bold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-[1.02] bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-gray-900"
                      >
                        {leadSubmitting ? (
                          <span className="flex items-center gap-2">
                            <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="none"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              />
                            </svg>
                            Processing...
                          </span>
                        ) : (
                          <>
                            <Sparkles className="w-5 h-5" />
                            Get Free Counselling
                            <ArrowRight className="w-5 h-5" />
                          </>
                        )}
                      </button>
                    </form>
                  )}

                  {leadError && (
                    <p className="mt-3 text-red-300 text-sm bg-red-500/20 px-4 py-2 rounded-lg max-w-lg mx-auto">
                      {leadError}
                    </p>
                  )}
                </div>
              )}
            </article>

            {/* Sidebar with TOC */}
            <aside className="hidden lg:block w-72 lg:w-80 flex-shrink-0 relative">
              <div className="sticky top-16 space-y-6 z-10 max-h-[calc(100vh-5rem)] overflow-y-auto">
                <TableOfContents items={toc} />
                {/* Removed redundant "Need Expert Guidance?" CTA - already have header CTAs and floating buttons */}
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

        {/* Comments Section */}
        <BlogComments slug={meta.slug} title={meta.title} />
      </div>

      {/* WhatsApp Query Button */}
      <BlogWhatsAppQuery
        blogTitle={meta.title}
        blogSlug={meta.slug}
        neetChapter={meta.neetChapter}
      />

      {/* Exit Intent Popup */}
      <BlogExitIntentWrapper articleSlug={meta.slug} />

      {/* Back to Top Button */}
      <BackToTop readTime={meta.readTime} />
    </>
  )
}
