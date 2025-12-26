'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChevronRight, ArrowLeft, BarChart3 } from 'lucide-react'
import { TopicAnalytics } from '@/components/mcq/TopicAnalytics'

export default function MCQAnalyticsPage() {
  const router = useRouter()
  const [freeUserId, setFreeUserId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUserId = localStorage.getItem('mcq_free_user_id')
    setFreeUserId(storedUserId)
    setIsLoading(false)
  }, [])

  const handleTopicSelect = (topic: string) => {
    if (topic === 'review') {
      // Navigate to MCQ page with review mode
      router.push('/neet-biology-mcq?mode=review')
    } else {
      // Navigate to MCQ page with topic filter
      router.push(`/neet-biology-mcq?topic=${encodeURIComponent(topic)}`)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      {/* Breadcrumb */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-green-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/neet-biology-mcq" className="hover:text-green-600 transition-colors">
              NEET Biology MCQ
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-green-600 font-medium">Analytics</span>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/neet-biology-mcq"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Practice
          </Link>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Your Analytics</h1>
              <p className="text-gray-600">Track your NEET Biology preparation progress</p>
            </div>
          </div>
        </div>

        {/* Analytics Component */}
        <TopicAnalytics freeUserId={freeUserId} onTopicSelect={handleTopicSelect} />

        {/* Tips Section */}
        <div className="mt-8 bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Tips to Improve</h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                1
              </span>
              <span>
                <strong>Focus on weak topics first.</strong> Improving from 40% to 60% accuracy is
                easier and more impactful than going from 80% to 90%.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                2
              </span>
              <span>
                <strong>Practice consistently.</strong> Even 20 questions daily is better than 100
                questions once a week.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                3
              </span>
              <span>
                <strong>Use Review Mode.</strong> Spaced repetition helps you retain information 3x
                longer than regular practice.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                4
              </span>
              <span>
                <strong>Read explanations carefully.</strong> Understanding why an answer is correct
                is more valuable than just knowing it.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
