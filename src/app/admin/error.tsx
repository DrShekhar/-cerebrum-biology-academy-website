'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { RefreshCw, Home, Shield, Phone, Mail } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { logError } from '@/lib/errors'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function AdminError({ error, reset }: ErrorProps) {
  useEffect(() => {
    const logAdminError = async () => {
      try {
        logError(error, {
          page: 'admin',
          section: 'admin-panel',
          digest: error.digest,
          userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'unknown',
          url: typeof window !== 'undefined' ? window.location.href : 'unknown',
          timestamp: new Date().toISOString(),
          severity: 'critical',
          recoverable: true,
        })
      } catch (logError) {
        console.error('Failed to log admin error:', logError)
      }
    }

    logAdminError()
    console.error('Admin Panel Error:', error)
  }, [error])

  const handleReset = () => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('admin-filters')
        sessionStorage.removeItem('admin-state')
      } catch (e) {
        console.warn('Could not clear admin cache:', e)
      }
    }
    reset()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-50 flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8 border-2 border-gray-200">
            <Shield className="w-12 h-12 md:w-16 md:h-16 text-gray-600" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Admin Panel Error</h1>
          <p className="text-xl text-gray-600 mb-4">
            We encountered an error loading the admin panel.
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8">
            This is a critical system error. Please try refreshing the page or contact technical
            support immediately.
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
            Reload Panel
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
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Admin Quick Access</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/admin/students"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors group"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-blue-200">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-900">Students</div>
                <div className="text-sm text-gray-500">Manage students</div>
              </div>
            </Link>

            <Link
              href="/admin/courses"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors group"
            >
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-purple-200">
                <Shield className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-900">Courses</div>
                <div className="text-sm text-gray-500">Manage courses</div>
              </div>
            </Link>

            <Link
              href="/admin/payments"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors group"
            >
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-green-200">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-900">Payments</div>
                <div className="text-sm text-gray-500">View transactions</div>
              </div>
            </Link>

            <Link
              href="/admin/enrollments"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors group"
            >
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-orange-200">
                <Shield className="w-5 h-5 text-orange-600" />
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-900">Enrollments</div>
                <div className="text-sm text-gray-500">Track enrollments</div>
              </div>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-2xl mx-auto mb-12"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            <span className="text-2xl mr-2">🚨</span>
            Critical System Alert
          </h3>
          <p className="text-gray-700 mb-4">
            This error affects the admin panel which manages critical operations. Please report this
            immediately.
          </p>
          <div className="bg-white rounded-lg p-4 border border-red-200">
            <h4 className="font-semibold text-gray-900 mb-2">Immediate Actions Required:</h4>
            <ul className="text-left text-sm text-gray-700 space-y-2 list-disc list-inside">
              <li>Contact technical support with the error ID below</li>
              <li>Do not retry operations that involve data modification</li>
              <li>Check system status dashboard for known issues</li>
              <li>Verify database connection status</li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gray-50 rounded-2xl p-8 max-w-2xl mx-auto"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Technical Support</h3>
          <p className="text-gray-600 mb-6">
            For admin panel issues, contact our technical team immediately. We have 24/7 support for
            critical system errors.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+918826444334"
              className="flex items-center justify-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              <Phone className="w-5 h-5 mr-2" />
              Emergency Support
            </a>

            <Link
              href="/contact"
              className="flex items-center justify-center px-6 py-3 bg-white border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors font-medium"
            >
              <Mail className="w-5 h-5 mr-2 text-primary-600" />
              Email Technical Team
            </Link>
          </div>

          <div className="mt-6 text-sm text-red-600 font-medium">
            Priority Response: Immediate escalation for admin panel errors
          </div>
        </motion.div>

        {error.digest && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="mt-8 text-center"
          >
            <div className="text-sm font-medium text-gray-700 mb-2">CRITICAL ERROR ID:</div>
            <div className="text-lg">
              <code className="bg-red-100 border border-red-300 px-4 py-2 rounded text-red-700 font-mono">
                {error.digest}
              </code>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              This ID is required when reporting the issue to technical support
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
