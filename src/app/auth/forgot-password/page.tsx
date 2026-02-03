'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Mail, Loader2, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitted(true)
      } else if (response.status === 429) {
        setError('Too many requests. Please try again later.')
      } else {
        setError(data.message || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="mb-6">
              <Link href="/" className="inline-block">
                <h1 className="text-2xl font-bold text-green-600">Cerebrum Biology Academy</h1>
              </Link>
            </div>

            <div className="py-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Check Your Email</h2>
              <p className="text-gray-600 mb-6">
                If an account exists for <span className="font-medium">{email}</span>, we&apos;ve
                sent a password reset link. Please check your inbox and spam folder.
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 text-left">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> The reset link will expire in 1 hour. If you don&apos;t
                  receive an email, make sure you entered the correct email address.
                </p>
              </div>
              <div className="space-y-3">
                <Button
                  onClick={() => {
                    setSubmitted(false)
                    setEmail('')
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Try a different email
                </Button>
                <Link
                  href="/sign-in"
                  className="block text-green-600 hover:underline text-sm font-medium"
                >
                  Back to Sign In
                </Link>
              </div>
            </div>
          </div>

          <p className="text-center text-gray-500 text-sm mt-6">
            Need help?{' '}
            <a
              href="mailto:support@cerebrumbiologyacademy.com"
              className="text-green-600 hover:underline"
            >
              Contact Support
            </a>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link
          href="/sign-in"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to Sign In</span>
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Forgot Password?</h1>
          <p className="text-slate-400 mt-2">
            Enter your email and we&apos;ll send you a reset link
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-4 bg-green-50 border-b border-green-100">
            <div className="flex items-center justify-center gap-2 text-green-700">
              <Mail className="w-5 h-5" />
              <span className="font-medium">Password Reset</span>
            </div>
          </div>

          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={loading || !email}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send Reset Link'
                )}
              </Button>
            </form>
          </div>

          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
            <p className="text-center text-sm text-slate-600">
              Remember your password?{' '}
              <Link href="/sign-in" className="font-semibold text-[#4a5d4a] hover:text-[#3d4d3d]">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-6 text-slate-400 text-xs">
          <span>Secure Reset</span>
          <span>Email Verified</span>
          <span>Data Protected</span>
        </div>
      </div>
    </div>
  )
}
