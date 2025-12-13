'use client'

import { useEffect, useRef } from 'react'
import { MessageSquare } from 'lucide-react'

interface BlogCommentsProps {
  slug: string
  title: string
}

export function BlogComments({ slug, title }: BlogCommentsProps) {
  const commentsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!commentsRef.current) return

    // Clear any existing comments
    commentsRef.current.innerHTML = ''

    // Create Giscus script
    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.setAttribute('data-repo', 'cerebrumbiologyacademy/blog-comments')
    script.setAttribute('data-repo-id', 'R_placeholder') // Replace with actual repo ID
    script.setAttribute('data-category', 'Blog Comments')
    script.setAttribute('data-category-id', 'DIC_placeholder') // Replace with actual category ID
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
      // Cleanup on unmount
      if (commentsRef.current) {
        commentsRef.current.innerHTML = ''
      }
    }
  }, [slug])

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Discussion</h2>
            <p className="text-sm text-gray-600">
              Share your thoughts, ask questions, or help fellow NEET aspirants
            </p>
          </div>
        </div>

        {/* Giscus container */}
        <div
          ref={commentsRef}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 min-h-[200px]"
        />

        {/* Fallback if Giscus doesn't load */}
        <noscript>
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
            <p className="text-yellow-800">
              Enable JavaScript to view and participate in comments.
            </p>
          </div>
        </noscript>

        {/* Alternative contact */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Have a question about this topic?{' '}
            <a
              href={`https://wa.me/918826444334?text=Hi! I have a question about the blog post: ${encodeURIComponent(title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Ask on WhatsApp
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
