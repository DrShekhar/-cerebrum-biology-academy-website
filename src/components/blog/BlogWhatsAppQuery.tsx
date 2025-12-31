'use client'

import { useState } from 'react'
import { MessageCircle, X, Send, Sparkles } from 'lucide-react'

interface BlogWhatsAppQueryProps {
  blogTitle: string
  blogSlug: string
  neetChapter?: string
}

export function BlogWhatsAppQuery({ blogTitle, blogSlug, neetChapter }: BlogWhatsAppQueryProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [customQuery, setCustomQuery] = useState('')

  const whatsappNumber = '918826444334'
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cerebrumbiologyacademy.com'

  const quickQueries = [
    {
      label: 'Ask a doubt',
      icon: '❓',
      message: `Hi! I'm reading "${blogTitle}" on your blog and I have a doubt about this topic. Can you help?`,
    },
    {
      label: 'Book demo class',
      icon: '📚',
      message: `Hi! I'm interested in learning more about ${neetChapter || 'NEET Biology'}. I found your blog "${blogTitle}" very helpful. Can I book a free demo class?`,
    },
    {
      label: 'Get study material',
      icon: '📖',
      message: `Hi! I read your article "${blogTitle}" and would like to get more study materials on ${neetChapter || 'this topic'}. Please share.`,
    },
    {
      label: 'Talk to faculty',
      icon: '👨‍🏫',
      message: `Hi! I'm preparing for NEET and have some questions about ${neetChapter || 'Biology'}. Can I speak with a faculty member?`,
    },
  ]

  const handleWhatsAppClick = (message: string) => {
    const encodedMessage = encodeURIComponent(`${message}\n\n📄 Blog: ${baseUrl}/blog/${blogSlug}`)
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
    trackBlogLead(blogTitle, blogSlug, neetChapter)
  }

  const handleCustomQuery = () => {
    if (customQuery.trim()) {
      handleWhatsAppClick(customQuery)
      setCustomQuery('')
      setIsOpen(false)
    }
  }

  const trackBlogLead = async (title: string, slug: string, chapter?: string) => {
    try {
      await fetch('/api/leads/blog-query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'blog_whatsapp_query',
          blogTitle: title,
          blogSlug: slug,
          neetChapter: chapter,
          timestamp: new Date().toISOString(),
        }),
      })
    } catch (error) {
      console.error('Failed to track blog lead:', error)
    }
  }

  return (
    <>
      {/* Floating WhatsApp Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-green-600 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 animate-fade-in"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="font-medium hidden sm:inline">Ask a Doubt</span>
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
      </button>

      {/* Query Modal */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-50 animate-fade-in"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal */}
          <div className="fixed bottom-20 right-4 sm:right-6 z-50 w-[calc(100%-2rem)] sm:w-96 bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
            {/* Header */}
            <div className="bg-[#4a5d4a] text-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Ask Your Doubt</h3>
                    <p className="text-xs text-green-100">Get instant help via WhatsApp</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              {/* AI Assistant Badge */}
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-4 bg-blue-50 p-2 rounded-lg">
                <Sparkles className="w-4 h-4 text-blue-500" />
                <span>AI-powered responses + Expert faculty support</span>
              </div>

              {/* Quick Query Options */}
              <p className="text-sm font-medium text-gray-700 mb-3">Quick options:</p>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {quickQueries.map((query, index) => (
                  <button
                    key={index}
                    onClick={() => handleWhatsAppClick(query.message)}
                    className="flex items-center gap-2 p-3 bg-gray-50 hover:bg-green-50 border border-gray-200 hover:border-green-300 rounded-xl text-sm text-gray-700 hover:text-green-700 transition-colors text-left"
                  >
                    <span className="text-lg">{query.icon}</span>
                    <span className="font-medium">{query.label}</span>
                  </button>
                ))}
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3 my-4">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-xs text-gray-400">or type your question</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              {/* Custom Query Input */}
              <div className="relative">
                <textarea
                  value={customQuery}
                  onChange={(e) => setCustomQuery(e.target.value)}
                  placeholder="Type your Biology doubt here..."
                  className="w-full p-3 pr-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent resize-none text-sm"
                  rows={3}
                />
                <button
                  onClick={handleCustomQuery}
                  disabled={!customQuery.trim()}
                  className="absolute bottom-3 right-3 w-8 h-8 bg-green-600 hover:bg-green-600 disabled:bg-gray-300 text-white rounded-full flex items-center justify-center transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>

              {/* Footer Info */}
              <p className="text-xs text-gray-500 mt-3 text-center">
                Response within 2 hours • Available 9 AM - 8 PM
              </p>
            </div>
          </div>
        </>
      )}
    </>
  )
}
