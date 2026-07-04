'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { Mail, ArrowLeft, Loader2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'

function RegisterForm() {
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get('redirect_url') || '/dashboard'

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [errorDetails, setErrorDetails] = useState<string[]>([])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setErrorDetails([])
    setLoading(true)

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
          phone: phone.trim(),
          role: 'STUDENT',
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to create account')
        if (Array.isArray(data.details)) {
          setErrorDetails(
            data.details.map((d: { message?: string } | string) =>
              typeof d === 'string' ? d : d.message || ''
            )
          )
        }
        setLoading(false)
        return
      }

      // Account created — sign in with the same credentials
      const signInResult = await signIn('credentials', {
        email: email.trim(),
        password,
        redirect: false,
      })

      if (!signInResult?.ok || signInResult.error) {
        // Account exists but auto-login failed; send them to sign-in
        window.location.assign(`/sign-in?redirect_url=${encodeURIComponent(redirectUrl)}`)
        return
      }

      window.location.replace(redirectUrl)
    } catch {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

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

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Create Account</h1>
          <p className="text-slate-400 mt-2">Sign up with your email address</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-4 bg-green-50 border-b border-green-100">
            <div className="flex items-center justify-center gap-2 text-green-700">
              <Mail className="w-5 h-5" />
              <span className="font-medium">Sign up with Email</span>
            </div>
          </div>

          <div className="p-6">
            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start gap-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p>{error}</p>
                  {errorDetails.length > 0 && (
                    <ul className="mt-1 list-disc list-inside">
                      {errorDetails.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="register-name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Full Name
                </label>
                <input
                  id="register-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  required
                  minLength={2}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  disabled={loading}
                />
              </div>

              <div>
                <label
                  htmlFor="register-email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email
                </label>
                <input
                  id="register-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  disabled={loading}
                />
              </div>

              <div>
                <label
                  htmlFor="register-phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Phone Number
                </label>
                <input
                  id="register-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  autoComplete="tel"
                  required
                  minLength={10}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  disabled={loading}
                />
                <p className="mt-1 text-xs text-gray-500">
                  Include your country code for numbers outside India
                </p>
              </div>

              <div>
                <label
                  htmlFor="register-password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <input
                  id="register-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  autoComplete="new-password"
                  required
                  minLength={8}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  disabled={loading}
                />
                <p className="mt-1 text-xs text-gray-500">
                  At least 8 characters with an uppercase letter, lowercase letter, number, and
                  special character
                </p>
              </div>

              <Button
                type="submit"
                disabled={loading || !name.trim() || !email.trim() || !phone.trim() || !password}
                variant="primary"
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </Button>
            </form>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
            <p className="text-center text-sm text-slate-600 mb-2">
              Prefer phone OTP?{' '}
              <Link
                href={`/sign-up?redirect_url=${encodeURIComponent(redirectUrl)}`}
                className="font-semibold text-[#4a5d4a] hover:text-[#3d4d3d] hover:underline"
              >
                Sign up with phone
              </Link>
            </p>
            <p className="text-center text-sm text-slate-600">
              Already have an account?{' '}
              <Link
                href={`/sign-in?redirect_url=${encodeURIComponent(redirectUrl)}`}
                className="font-semibold text-[#4a5d4a] hover:text-[#3d4d3d]"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Terms */}
        <p className="mt-4 text-center text-xs text-slate-500">
          By signing up, you agree to our{' '}
          <Link href="/terms-of-service" className="underline hover:text-slate-300">
            Terms
          </Link>{' '}
          &{' '}
          <Link href="/privacy-policy" className="underline hover:text-slate-300">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  )
}

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
          <Loader2 className="w-8 h-8 text-white animate-spin" />
        </div>
      }
    >
      <RegisterForm />
    </Suspense>
  )
}
