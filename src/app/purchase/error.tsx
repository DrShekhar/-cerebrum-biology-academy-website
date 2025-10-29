'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { RefreshCw, Home, CreditCard, Phone, Mail, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { logError } from '@/lib/errors'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function PurchaseError({ error, reset }: ErrorProps) {
  useEffect(() => {
    const logPurchaseError = async () => {
      try {
        logError(error, {
          page: 'purchase',
          section: 'payment-flow',
          digest: error.digest,
          userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'unknown',
          url: typeof window !== 'undefined' ? window.location.href : 'unknown',
          timestamp: new Date().toISOString(),
          severity: 'critical',
          recoverable: true,
        })
      } catch (logError) {
        console.error('Failed to log purchase error:', logError)
      }
    }

    logPurchaseError()
    console.error('Purchase Page Error:', error)
  }, [error])

  const handleReset = () => {
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.removeItem('payment-state')
        sessionStorage.removeItem('razorpay-order')
      } catch (e) {
        console.warn('Could not clear payment cache:', e)
      }
    }
    reset()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="w-24 h-24 md:w-32 md:h-32 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <CreditCard className="w-12 h-12 md:w-16 md:h-16 text-red-500" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Payment Error</h1>
          <p className="text-xl text-gray-600 mb-4">
            We encountered an issue processing your payment.
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8">
            Don't worry - no charges have been made to your account. Please try again or contact our
            support team for assistance.
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
            Try Payment Again
          </Button>
          <Link href="/courses">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Back to Courses
            </Button>
          </Link>
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
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">What You Can Do</h2>
          <div className="grid grid-cols-1 gap-4 text-left">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">1. Check Your Connection</h3>
              <p className="text-sm text-gray-600">
                Ensure you have a stable internet connection before retrying the payment.
              </p>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">2. Verify Payment Details</h3>
              <p className="text-sm text-gray-600">
                Double-check your card details, billing address, and payment information.
              </p>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">
                3. Try a Different Payment Method
              </h3>
              <p className="text-sm text-gray-600">
                We accept multiple payment methods including credit/debit cards, UPI, and net
                banking.
              </p>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">4. Contact Support</h3>
              <p className="text-sm text-gray-600">
                Our team is available 24/7 to help you complete your enrollment.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-yellow-50 border border-yellow-200 rounded-2xl p-8 max-w-2xl mx-auto mb-12"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            <span className="text-2xl mr-2">⚠️</span>
            Important Notice
          </h3>
          <p className="text-gray-700 mb-4">
            If you see a charge on your account but the enrollment didn't complete, please don't
            retry the payment.
          </p>
          <p className="text-gray-700 font-medium">
            Contact us immediately at{' '}
            <a href="tel:+918826444334" className="text-primary-600 underline">
              +91 88264 44334
            </a>{' '}
            and we'll resolve this for you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gray-50 rounded-2xl p-8 max-w-2xl mx-auto"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Get Immediate Help</h3>
          <p className="text-gray-600 mb-6">
            Our payment support team is here to assist you 24/7. We'll help you complete your
            enrollment quickly.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+918826444334"
              className="flex items-center justify-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Payment Support
            </a>

            <Link
              href="/contact"
              className="flex items-center justify-center px-6 py-3 bg-white border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors font-medium"
            >
              <Mail className="w-5 h-5 mr-2 text-primary-600" />
              Email Support
            </Link>
          </div>

          <div className="mt-6 text-sm text-gray-500">
            Average response time: Less than 5 minutes
          </div>
        </motion.div>

        {error.digest && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="mt-8 text-center"
          >
            <div className="text-sm text-gray-500">
              Payment Error ID:{' '}
              <code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">
                {error.digest}
              </code>
            </div>
            <div className="text-xs text-gray-400 mt-1">
              Please share this ID when contacting support
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
