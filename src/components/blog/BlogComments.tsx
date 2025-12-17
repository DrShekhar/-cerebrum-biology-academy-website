'use client'

import { useEffect, useRef, useState } from 'react'
import { MessageSquare, Send, ThumbsUp, Users } from 'lucide-react'
import { motion } from 'framer-motion'

interface BlogCommentsProps {
  slug: string
  title: string
}

// Giscus configuration from environment variables
const GISCUS_REPO = process.env.NEXT_PUBLIC_GISCUS_REPO
const GISCUS_REPO_ID = process.env.NEXT_PUBLIC_GISCUS_REPO_ID
const GISCUS_CATEGORY = process.env.NEXT_PUBLIC_GISCUS_CATEGORY || 'Blog Comments'
const GISCUS_CATEGORY_ID = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID

const isGiscusConfigured = GISCUS_REPO && GISCUS_REPO_ID && GISCUS_CATEGORY_ID

export function BlogComments({ slug, title }: BlogCommentsProps) {
  const commentsRef = useRef<HTMLDivElement>(null)
  const [question, setQuestion] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!commentsRef.current || !isGiscusConfigured) return

    commentsRef.current.innerHTML = ''

    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.setAttribute('data-repo', GISCUS_REPO!)
    script.setAttribute('data-repo-id', GISCUS_REPO_ID!)
    script.setAttribute('data-category', GISCUS_CATEGORY)
    script.setAttribute('data-category-id', GISCUS_CATEGORY_ID!)
    script.setAttribute('data-mapping', 'pathname')
    script.setAttribute('data-strict', '0')
    script.setAttribute('data-reactions-enabled', '1')
    script.setAttribute('data-emit-metadata', '0')
    script.setAttribute('data-input-position', 'top')
    script.setAttribute('data-theme', 'light')
    script.setAttribute('data-lang', 'en')
    script.setAttribute('data-loading', 'lazy')
    script.crossOrigin = 'anonymous'
    script.async = true

    commentsRef.current.appendChild(script)

    return () => {
      if (commentsRef.current) {
        commentsRef.current.innerHTML = ''
      }
    }
  }, [slug])

  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!question.trim()) return

    setIsSubmitting(true)

    const whatsappMessage = `Hi! I have a question about the blog post "${title}":\n\n${question}`
    const whatsappUrl = `https://wa.me/918826444334?text=${encodeURIComponent(whatsappMessage)}`

    window.open(whatsappUrl, '_blank')
    setQuestion('')
    setIsSubmitting(false)
  }

  return (
    <section className="py-12 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Discussion & Questions</h2>
            <p className="text-sm text-gray-600">
              Share your thoughts, ask questions, or help fellow NEET aspirants
            </p>
          </div>
        </div>

        {isGiscusConfigured ? (
          <div
            ref={commentsRef}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 min-h-[200px]"
          />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Stats bar */}
            <div className="flex items-center justify-center gap-6 py-4 bg-blue-50 rounded-xl">
              <div className="flex items-center gap-2 text-blue-700">
                <Users className="w-5 h-5" />
                <span className="font-semibold">2.4K+ students</span>
                <span className="text-blue-600">joined the discussion</span>
              </div>
              <div className="flex items-center gap-2 text-green-700">
                <ThumbsUp className="w-5 h-5" />
                <span className="font-semibold">98%</span>
                <span className="text-green-600">found this helpful</span>
              </div>
            </div>

            {/* Question form */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Have a doubt about this topic?
              </h3>
              <form onSubmit={handleQuestionSubmit} className="space-y-4">
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Type your question here... Our faculty will respond within 24 hours on WhatsApp!"
                  className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-32 text-gray-700"
                  style={{ fontSize: '16px' }}
                />
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">Get expert answers from our AIIMS faculty</p>
                  <button
                    type="submit"
                    disabled={isSubmitting || !question.trim()}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                  >
                    <Send className="w-4 h-4" />
                    Ask on WhatsApp
                  </button>
                </div>
              </form>
            </div>

            {/* Sample questions */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Popular Questions from Students
              </h3>
              <div className="space-y-4">
                {[
                  {
                    q: 'How many hours should I study Biology daily for NEET?',
                    a: 'For NEET Biology, aim for 3-4 hours of focused study daily. Quality matters more than quantity!',
                    likes: 124,
                  },
                  {
                    q: 'Is NCERT enough for Biology in NEET?',
                    a: 'Yes! NCERT covers 95% of NEET Biology questions. Master it completely before any reference book.',
                    likes: 89,
                  },
                  {
                    q: 'Which chapters have maximum weightage?',
                    a: 'Human Physiology (20%), Genetics (18%), and Ecology (12%) are the highest-scoring areas.',
                    likes: 156,
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 transition-colors"
                  >
                    <p className="font-medium text-gray-900 mb-2">{item.q}</p>
                    <p className="text-sm text-gray-600 mb-2">{item.a}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <ThumbsUp className="w-4 h-4 text-blue-500" />
                      <span>{item.likes} found this helpful</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        <noscript>
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
            <p className="text-yellow-800">
              Enable JavaScript to view and participate in comments.
            </p>
          </div>
        </noscript>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Need personalized guidance?{' '}
            <a
              href={`https://wa.me/918826444334?text=Hi! I need help with: ${encodeURIComponent(title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:text-green-700 font-medium underline"
            >
              Chat with our expert faculty
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
