'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Lock, Loader2, CheckCircle2, XCircle, Eye, EyeOff, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'

function ResetPasswordContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get('token')

  const [status, setStatus] = useState<'loading' | 'valid' | 'invalid' | 'success'>('loading')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [passwordRequirements, setPasswordRequirements] = useState<{
    minLength: number
    requireUppercase: boolean
    requireLowercase: boolean
    requireNumbers: boolean
    requireSpecialChars: boolean
  } | null>(null)

  useEffect(() => {
    if (token) {
      validateToken(token)
    } else {
      setStatus('invalid')
      setMessage('No reset token provided')
    }
  }, [token])

  const validateToken = async (resetToken: string) => {
    try {
      const response = await fetch(`/api/auth/reset-password?token=${resetToken}`)
      const data = await response.json()

      if (data.valid) {
        setStatus('valid')
        setEmail(data.email)
        setPasswordRequirements(data.passwordRequirements)
      } else {
        setStatus('invalid')
        setMessage(data.message || 'Invalid or expired reset link')
      }
    } catch (err) {
      setStatus('invalid')
      setMessage('Failed to validate reset link')
    }
  }

  const validatePassword = (pwd: string): string[] => {
    const errors: string[] = []
    if (!passwordRequirements) return errors

    if (pwd.length < passwordRequirements.minLength) {
      errors.push(`At least ${passwordRequirements.minLength} characters`)
    }
    if (passwordRequirements.requireUppercase && !/[A-Z]/.test(pwd)) {
      errors.push('One uppercase letter')
    }
    if (passwordRequirements.requireLowercase && !/[a-z]/.test(pwd)) {
      errors.push('One lowercase letter')
    }
    if (passwordRequirements.requireNumbers && !/\d/.test(pwd)) {
      errors.push('One number')
    }
    if (passwordRequirements.requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) {
      errors.push('One special character')
    }
    return errors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    const passwordErrors = validatePassword(password)
    if (passwordErrors.length > 0) {
      setError('Password must include: ' + passwordErrors.join(', '))
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password, confirmPassword }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setStatus('success')
      } else if (response.status === 429) {
        setError('Too many attempts. Please try again later.')
      } else {
        setError(data.message || 'Failed to reset password')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const passwordErrors = validatePassword(password)
  const isPasswordValid = password.length > 0 && passwordErrors.length === 0

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-6 text-center">
            <Link href="/" className="inline-block">
              <h1 className="text-2xl font-bold text-green-600">Cerebrum Biology Academy</h1>
            </Link>
          </div>

          {status === 'loading' && (
            <div className="py-8 text-center">
              <Loader2 className="w-16 h-16 text-green-600 animate-spin mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Validating reset link...</h2>
              <p className="text-gray-600">Please wait while we verify your reset link.</p>
            </div>
          )}

          {status === 'invalid' && (
            <div className="py-8 text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <XCircle className="w-12 h-12 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Invalid Reset Link</h2>
              <p className="text-gray-600 mb-6">{message}</p>
              <div className="space-y-3">
                <Link href="/auth/forgot-password">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    Request New Reset Link
                  </Button>
                </Link>
                <Link
                  href="/sign-in"
                  className="block text-green-600 hover:underline text-sm font-medium"
                >
                  Back to Sign In
                </Link>
              </div>
            </div>
          )}

          {status === 'valid' && (
            <div className="py-4">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Set New Password</h2>
                <p className="text-gray-600 text-sm">
                  Enter a new password for <span className="font-medium">{email}</span>
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter new password"
                      required
                      className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {password.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {passwordRequirements && (
                        <>
                          <PasswordCheck
                            label={`At least ${passwordRequirements.minLength} characters`}
                            passed={password.length >= passwordRequirements.minLength}
                          />
                          <PasswordCheck
                            label="One uppercase letter"
                            passed={/[A-Z]/.test(password)}
                          />
                          <PasswordCheck
                            label="One lowercase letter"
                            passed={/[a-z]/.test(password)}
                          />
                          <PasswordCheck label="One number" passed={/\d/.test(password)} />
                          <PasswordCheck
                            label="One special character"
                            passed={/[!@#$%^&*(),.?":{}|<>]/.test(password)}
                          />
                        </>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      required
                      className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {confirmPassword.length > 0 && password !== confirmPassword && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      Passwords do not match
                    </p>
                  )}
                  {confirmPassword.length > 0 && password === confirmPassword && (
                    <p className="mt-1 text-sm text-green-600 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      Passwords match
                    </p>
                  )}
                </div>

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={loading || !isPasswordValid || password !== confirmPassword}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Resetting Password...
                    </>
                  ) : (
                    'Reset Password'
                  )}
                </Button>
              </form>
            </div>
          )}

          {status === 'success' && (
            <div className="py-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Password Reset!</h2>
              <p className="text-gray-600 mb-6">
                Your password has been successfully reset. You can now sign in with your new
                password.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
                <p className="text-sm text-blue-800">
                  <strong>Security Note:</strong> For your protection, you have been logged out of
                  all devices. Please sign in again on each device.
                </p>
              </div>
              <Button
                onClick={() => router.push('/sign-in')}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                Sign In Now
              </Button>
            </div>
          )}
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

function PasswordCheck({ label, passed }: { label: string; passed: boolean }) {
  return (
    <div
      className={`flex items-center gap-2 text-xs ${passed ? 'text-green-600' : 'text-gray-500'}`}
    >
      {passed ? (
        <CheckCircle2 className="w-3.5 h-3.5" />
      ) : (
        <div className="w-3.5 h-3.5 rounded-full border border-gray-300" />
      )}
      <span>{label}</span>
    </div>
  )
}

export default function ResetPasswordPage() {
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
      <ResetPasswordContent />
    </Suspense>
  )
}
