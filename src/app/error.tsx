'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { RefreshCw, Home, AlertTriangle, BookOpen, Phone, Mail } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to our error handling service
    const logErrorToService = async () => {
      try {
        // Import logError dynamically to avoid SSR issues
        const { logError } = await import('@/lib/errors')

        logError(error, {
          page: 'global-error-page',
          digest: error.digest,
          userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'unknown',
          url: typeof window !== 'undefined' ? window.location.href : 'unknown',
          timestamp: new Date().toISOString(),
        })
      } catch (logError) {
        console.error('Failed to log error:', logError)
      }
    }

    logErrorToService()
    console.error('Application Error:', error)
  }, [error])

  const handleReset = () => {
    // Clear any cached data if needed
    if (typeof window !== 'undefined') {
      // Clear localStorage cache
      try {
        localStorage.removeItem('cached-data')
        localStorage.removeItem('user-session')
      } catch (e) {
        console.warn('Could not clear localStorage:', e)
      }
    }

    // Reset the error boundary
    reset()
  }

  const handleReload = () => {
    if (typeof window !== 'undefined') {
      window.location.reload()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          {/* Error Icon */}
          <div className="relative mb-8">
            <div className="w-32 h-32 md:w-40 md:h-40 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <AlertTriangle className="w-16 h-16 md:w-20 md:h-20 text-red-500" />
            </div>
          </div>

          {/* Main Message */}
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Something went wrong!
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-4">
            We encountered an unexpected error.
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8">
            Don't worry, this doesn't affect your NEET preparation journey. Our technical team has
            been notified and we're working to fix this issue.
          </p>

          {/* Error Details (Development) */}
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

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <Button size="lg" onClick={handleReset}>
            <RefreshCw className="w-5 h-5 mr-2" />
            Try Again
          </Button>
          <Button size="lg" variant="outline" onClick={handleReload}>
            <RefreshCw className="w-5 h-5 mr-2" />
            Reload Page
          </Button>
          <Link href="/">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              <Home className="w-5 h-5 mr-2" />
              Go Home
            </Button>
          </Link>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto mb-12"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Continue Your Learning</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/courses"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors group"
            >
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-primary-200">
                <BookOpen className="w-5 h-5 text-primary-600" />
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-900">Browse Courses</div>
                <div className="text-sm text-gray-500">Continue learning</div>
              </div>
            </Link>

            <Link
              href="/demo-booking"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors group"
            >
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-emerald-200">
                <BookOpen className="w-5 h-5 text-emerald-600" />
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
                <BookOpen className="w-5 h-5 text-purple-600" />
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
          </div>
        </motion.div>

        {/* Support Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gray-50 rounded-2xl p-8 max-w-2xl mx-auto"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Need Help?</h3>
          <p className="text-gray-600 mb-6">
            If this problem persists, please contact our technical support team. We're here to
            ensure your NEET preparation isn't interrupted.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+918826444334"
              className="flex items-center justify-center px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors"
            >
              <Phone className="w-4 h-4 mr-2 text-primary-600" />
              <span className="font-medium">Call Support</span>
            </a>

            <Link
              href="/contact"
              className="flex items-center justify-center px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors"
            >
              <Mail className="w-4 h-4 mr-2 text-primary-600" />
              <span className="font-medium">Email Support</span>
            </Link>
          </div>

          <div className="mt-6 text-sm text-gray-500">
            Our support team typically responds within 2-4 hours during business hours
          </div>
        </motion.div>

        {/* Error ID for Support */}
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
            <div className="text-xs text-gray-400 mt-1">
              Please include this ID when contacting support
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
