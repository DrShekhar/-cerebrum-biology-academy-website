'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, RefreshCw, Home, ArrowLeft, Mail } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { ErrorContext } from '@/lib/errors'

interface ErrorFallbackProps {
  error: Error
  reset: () => void
  showDetails?: boolean
  context?: Partial<ErrorContext>
}

export function ErrorFallback({ error, reset, showDetails = false, context }: ErrorFallbackProps) {
  const handleGoBack = () => {
    if (typeof window !== 'undefined') {
      window.history.back()
    }
  }

  return (
    <div className="min-h-[400px] bg-gradient-to-br bg-red-50 flex items-center justify-center px-4 py-8">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="w-20 h-20 md:w-24 md:h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-10 h-10 md:w-12 md:h-12 text-red-500" />
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Something went wrong
          </h2>

          <p className="text-lg text-gray-600 mb-6">
            {context?.component
              ? `An error occurred in ${context.component}`
              : "We're having trouble loading this section"}
          </p>

          {showDetails && process.env.NODE_ENV === 'development' && error.message && (
            <div className="bg-gray-100 rounded-lg p-4 mb-6 max-w-xl mx-auto">
              <details className="text-left">
                <summary className="cursor-pointer font-medium text-gray-700 mb-2">
                  Error Details (Development)
                </summary>
                <div className="text-sm text-gray-600 font-mono bg-white p-3 rounded border">
                  <div className="mb-2">
                    <strong>Message:</strong> {error.message}
                  </div>
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

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
            <Button size="lg" onClick={reset}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
            <Button size="lg" variant="outline" onClick={handleGoBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
            <Link href="/">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Button>
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 max-w-xl mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Need Help?</h3>
            <p className="text-gray-600 mb-4">
              If this issue persists, please contact our support team.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Mail className="w-4 h-4 mr-2" />
              Contact Support
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
