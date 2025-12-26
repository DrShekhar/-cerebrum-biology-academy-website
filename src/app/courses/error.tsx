'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { RefreshCw, Home, BookOpen, Phone, Mail, Search } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { logError } from '@/lib/errors'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function CoursesError({ error, reset }: ErrorProps) {
  useEffect(() => {
    const logCourseError = async () => {
      try {
        logError(error, {
          page: 'courses',
          section: 'course-browsing',
          digest: error.digest,
          userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'unknown',
          url: typeof window !== 'undefined' ? window.location.href : 'unknown',
          timestamp: new Date().toISOString(),
          severity: 'high',
          recoverable: true,
        })
      } catch (logError) {
        console.error('Failed to log course error:', logError)
      }
    }

    logCourseError()
    console.error('Courses Page Error:', error)
  }, [error])

  const handleReset = () => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('course-filters')
        localStorage.removeItem('course-search')
      } catch (e) {
        console.warn('Could not clear course cache:', e)
      }
    }
    reset()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="w-24 h-24 md:w-32 md:h-32 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <BookOpen className="w-12 h-12 md:w-16 md:h-16 text-blue-500" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Course Loading Error
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            We're having trouble loading the course catalog.
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8">
            This doesn't affect your enrollment or saved courses. Please try again or explore other
            sections.
          </p>

          {process.env.NODE_ENV === 'development' && error.message && (
            <div className="bg-gray-100 rounded-lg p-4 mb-8 max-w-2xl mx-auto">
              <details className="text-left">
                <summary className="cursor-pointer font-medium text-gray-700 mb-2">
                  Error Details (Development)
                </summary>
                <div className="text-sm text-gray-600 font-mono bg-white p-3 rounded border">
                  <div className="mb-2">
                    <strong>Message:</strong> {error.message}
                  </div>
                  {error.digest && (
                    <div className="mb-2">
                      <strong>Digest:</strong> {error.digest}
                    </div>
                  )}
                  {error.stack && (
                    <div>
                      <strong>Stack:</strong>
                      <pre className="mt-1 text-xs overflow-auto max-h-32">{error.stack}</pre>
                    </div>
                  )}
                </div>
              </details>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <Button size="lg" onClick={handleReset}>
            <RefreshCw className="w-5 h-5 mr-2" />
            Try Again
          </Button>
          <Link href="/">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              <Home className="w-5 h-5 mr-2" />
              Go Home
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto mb-12"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Explore Our Other Resources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/demo-booking"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors group"
            >
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-green-200">
                <BookOpen className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-900">Free Demo</div>
                <div className="text-sm text-gray-500">Try our teaching</div>
              </div>
            </Link>

            <Link
              href="/mock-tests"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors group"
            >
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-purple-200">
                <Search className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-900">Mock Tests</div>
                <div className="text-sm text-gray-500">Practice exams</div>
              </div>
            </Link>

            <Link
              href="/study-materials"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors group"
            >
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-orange-200">
                <BookOpen className="w-5 h-5 text-orange-600" />
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-900">Study Materials</div>
                <div className="text-sm text-gray-500">Download resources</div>
              </div>
            </Link>

            <Link
              href="/contact"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors group"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-blue-200">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-900">Contact Us</div>
                <div className="text-sm text-gray-500">Get help</div>
              </div>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gray-50 rounded-2xl p-8 max-w-2xl mx-auto"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Need Immediate Help?</h3>
          <p className="text-gray-600 mb-6">
            Our support team is here to help you find the right course for your NEET preparation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+918826444334"
              className="flex items-center justify-center px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors"
            >
              <Phone className="w-4 h-4 mr-2 text-primary-600" />
              <span className="font-medium">Call Now</span>
            </a>

            <Link
              href="/contact"
              className="flex items-center justify-center px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors"
            >
              <Mail className="w-4 h-4 mr-2 text-primary-600" />
              <span className="font-medium">Email Support</span>
            </Link>
          </div>
        </motion.div>

        {error.digest && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8 text-center"
          >
            <div className="text-sm text-gray-500">
              Error ID:{' '}
              <code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">
                {error.digest}
              </code>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
