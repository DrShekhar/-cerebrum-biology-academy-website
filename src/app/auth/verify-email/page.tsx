'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { CheckCircle2, XCircle, Loader2, Mail, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

function VerifyEmailContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get('token')

  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'expired'>('loading')
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [resending, setResending] = useState(false)

  useEffect(() => {
    if (token) {
      verifyEmail(token)
    } else {
      setStatus('error')
      setMessage('No verification token provided')
    }
  }, [token])

  const verifyEmail = async (verificationToken: string) => {
    try {
      const response = await fetch(`/api/auth/verify-email?token=${verificationToken}`)
      const data = await response.json()

      if (response.ok && data.success) {
        setStatus('success')
        setMessage(data.message)
        setEmail(data.email)
      } else {
        if (data.expired) {
          setStatus('expired')
          setEmail(data.email || '')
        } else {
          setStatus('error')
        }
        setMessage(data.message || data.error || 'Verification failed')
      }
    } catch (error) {
      console.error('Verification error:', error)
      setStatus('error')
      setMessage('An error occurred while verifying your email')
    }
  }

  const handleResendVerification = async () => {
    if (!email) return

    setResending(true)
    try {
      const response = await fetch('/api/auth/send-verification-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setMessage('A new verification email has been sent. Please check your inbox.')
        setStatus('loading')
        // Show a temporary success state
        setTimeout(() => {
          setStatus('error')
          setMessage('Verification email sent! Please check your inbox and click the new link.')
        }, 2000)
      } else {
        setMessage(data.error || 'Failed to resend verification email')
      }
    } catch (error) {
      setMessage('Failed to resend verification email')
    } finally {
      setResending(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* Logo */}
          <div className="mb-6">
            <Link href="/" className="inline-block">
              <h1 className="text-2xl font-bold text-green-600">Cerebrum Biology Academy</h1>
            </Link>
          </div>

          {/* Loading State */}
          {status === 'loading' && (
            <div className="py-8">
              <Loader2 className="w-16 h-16 text-green-600 animate-spin mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Verifying your email...</h2>
              <p className="text-gray-600">Please wait while we verify your email address.</p>
            </div>
          )}

          {/* Success State */}
          {status === 'success' && (
            <div className="py-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Email Verified!</h2>
              <p className="text-gray-600 mb-6">{message}</p>
              <Button
                onClick={() => router.push('/signin')}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                Sign In Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}

          {/* Error State */}
          {status === 'error' && (
            <div className="py-8">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <XCircle className="w-12 h-12 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Verification Failed</h2>
              <p className="text-gray-600 mb-6">{message}</p>
              <div className="space-y-3">
                <Button
                  onClick={() => router.push('/signin')}
                  variant="outline"
                  className="w-full"
                >
                  Go to Sign In
                </Button>
                <Link href="/" className="block text-green-600 hover:underline text-sm">
                  Return to Home
                </Link>
              </div>
            </div>
          )}

          {/* Expired State */}
          {status === 'expired' && (
            <div className="py-8">
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-12 h-12 text-yellow-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Link Expired</h2>
              <p className="text-gray-600 mb-6">{message}</p>
              {email && (
                <div className="space-y-3">
                  <Button
                    onClick={handleResendVerification}
                    disabled={resending}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    {resending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Mail className="w-4 h-4 mr-2" />
                        Resend Verification Email
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={() => router.push('/signin')}
                    variant="outline"
                    className="w-full"
                  >
                    Go to Sign In
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Need help?{' '}
          <a href="mailto:support@cerebrumbiologyacademy.com" className="text-green-600 hover:underline">
            Contact Support
          </a>
        </p>
      </div>
    </div>
  )
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-4">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-green-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  )
}
