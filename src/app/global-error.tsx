'use client'

import React, { useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { AlertTriangle, RefreshCw, Home, Phone } from 'lucide-react'

interface GlobalErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Log the global error
    const logGlobalError = async () => {
      try {
        const { logError } = await import('@/lib/errors')

        logError(error, {
          page: 'global-error',
          digest: error.digest,
          userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'unknown',
          url: typeof window !== 'undefined' ? window.location.href : 'unknown',
          timestamp: new Date().toISOString(),
          severity: 'critical',
        })
      } catch (logError) {
        console.error('Failed to log global error:', logError)
      }
    }

    logGlobalError()
    console.error('Global Application Error:', error)
  }, [error])

  const handleReload = () => {
    if (typeof window !== 'undefined') {
      // Clear all storage and reload
      try {
        localStorage.clear()
        sessionStorage.clear()
      } catch (e) {
        console.warn('Could not clear storage:', e)
      }
      window.location.href = '/'
    }
  }

  return (
    <html>
      <body>
        <div className="min-h-screen bg-red-50 flex items-center justify-center px-6">
          <div className="max-w-lg w-full bg-white rounded-2xl shadow-lg p-8 text-center">
            <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-6" />

            <h1 className="text-2xl font-bold text-gray-900 mb-4">Critical System Error</h1>

            <p className="text-gray-600 mb-6">
              A critical error occurred that prevented the application from loading. Please try
              refreshing the page or contact our support team.
            </p>

            {error.digest && (
              <div className="bg-gray-100 rounded-lg p-3 mb-6">
                <p className="text-sm text-gray-600">
                  Error ID: <code className="font-mono text-gray-800">{error.digest}</code>
                </p>
              </div>
            )}

            <div className="flex flex-col gap-3 justify-center mb-6">
              <Button
                variant="primary"
                onClick={reset}
                className="flex items-center justify-center w-full"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>

              <Button
                variant="outline"
                onClick={handleReload}
                className="flex items-center justify-center w-full"
              >
                <Home className="w-4 h-4 mr-2" />
                Reload Application
              </Button>

              <a
                href="tel:+918826444334"
                className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                <Phone className="w-4 h-4 mr-2" />
                Emergency Support
              </a>
            </div>

            {/* Development error details */}
            {process.env.NODE_ENV === 'development' && (
              <details className="text-left mt-6">
                <summary className="cursor-pointer text-sm font-medium text-gray-700 mb-2">
                  Error Details (Development Only)
                </summary>
                <div className="bg-gray-100 rounded-lg p-4 overflow-auto">
                  <pre className="text-xs text-gray-800 whitespace-pre-wrap">
                    <strong>Message:</strong> {error.message}
                    {'\n\n'}
                    <strong>Stack:</strong> {error.stack}
                    {error.digest && '\n\n'}
                    <strong>Digest:</strong> {error.digest}
                  </pre>
                </div>
              </details>
            )}

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">Cerebrum Biology Academy Technical Support</p>
              <p className="text-xs text-gray-400 mt-1">Available 24/7 for critical issues</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
