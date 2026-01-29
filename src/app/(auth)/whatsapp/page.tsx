'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, MessageCircle, Loader2 } from 'lucide-react'

/**
 * WhatsApp Authentication Page
 *
 * This page redirects users to the sign-in page with WhatsApp method parameter.
 * Currently, the main authentication is phone OTP-based, but this page provides
 * a dedicated entry point for WhatsApp-based login flow.
 */
export default function WhatsAppAuthPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get('redirect_url') || '/dashboard'

  useEffect(() => {
    // Redirect to sign-in with WhatsApp method after a brief delay
    // This allows users to see the page and understand the flow
    const timer = setTimeout(() => {
      router.push(`/sign-in?method=whatsapp&redirect_url=${encodeURIComponent(redirectUrl)}`)
    }, 2000)

    return () => clearTimeout(timer)
  }, [router, redirectUrl])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to Home</span>
        </Link>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* WhatsApp Header */}
          <div className="p-4 bg-green-500">
            <div className="flex items-center justify-center gap-2 text-white">
              <MessageCircle className="w-6 h-6" />
              <span className="font-semibold text-lg">WhatsApp Login</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Loader2 className="w-8 h-8 text-green-600 animate-spin" />
            </div>

            <h2 className="text-xl font-semibold text-slate-800 mb-2">
              Redirecting to Login
            </h2>

            <p className="text-slate-600 mb-6">
              You&apos;ll be redirected to our secure login page where you can sign in with your phone number.
            </p>

            <div className="bg-green-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-green-800">
                <strong>Quick Login:</strong> Enter your phone number and receive an OTP instantly via SMS.
              </p>
            </div>

            {/* Manual redirect button */}
            <Link
              href={`/sign-in?method=whatsapp&redirect_url=${encodeURIComponent(redirectUrl)}`}
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Continue to Login
            </Link>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
            <p className="text-center text-sm text-slate-600">
              Need help?{' '}
              <a
                href="https://wa.me/918826444334?text=Hi%2C%20I%20need%20help%20with%20login"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-green-600 hover:text-green-700"
              >
                Chat with us on WhatsApp
              </a>
            </p>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-6 flex justify-center gap-6 text-slate-400 text-xs">
          <span>Secure Login</span>
          <span>OTP Verified</span>
          <span>24/7 Support</span>
        </div>
      </div>
    </div>
  )
}
