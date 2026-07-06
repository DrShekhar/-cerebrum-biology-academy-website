'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Phone, Mail, ArrowLeft, AlertCircle } from 'lucide-react'
import { PhoneSignIn } from '@/components/auth/PhoneSignIn'
import { EmailSignIn } from '@/components/auth/EmailSignIn'
import { SocialSignInButtons } from '@/components/auth/SocialSignInButtons'

type SignInMethod = 'phone' | 'email'

// Friendly copy for Auth.js ?error= codes. Previously these were silently
// discarded (pages.error pointed at /admin/login which dropped the param) —
// a failed Google/Facebook login looked like the button "did nothing".
const AUTH_ERROR_MESSAGES: Record<string, string> = {
  OAuthAccountNotLinked:
    'This email is already registered with a different sign-in method. Try the method you used originally (e.g. phone or email).',
  AccessDenied:
    'Sign-in was not completed. If you used Facebook, make sure your account has a verified email address, or try Google / phone OTP instead.',
  OAuthCallbackError: 'The sign-in was cancelled or timed out. Please try again.',
  OAuthSignInError: 'We could not start the sign-in. Please try again.',
  Configuration: 'Sign-in is temporarily unavailable. Please try again in a few minutes.',
  Verification: 'That sign-in link has expired. Please request a new one.',
  CredentialsSignin: 'Incorrect email or password. Please try again.',
  Default: 'Something went wrong during sign-in. Please try again.',
}

export default function SignInPage() {
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get('redirect_url') || '/dashboard'
  // Auth.js appends ?error=<code> on OAuth/credentials failures (pages.error
  // points here). Render it; dismissible so it doesn't nag past the retry.
  const authErrorCode = searchParams.get('error')
  const [dismissedError, setDismissedError] = useState(false)
  const authErrorMessage =
    authErrorCode && !dismissedError
      ? AUTH_ERROR_MESSAGES[authErrorCode] || AUTH_ERROR_MESSAGES.Default
      : null
  const [method, setMethod] = useState<SignInMethod>('phone')

  // Return visitors land on whichever method they used last (phone/email).
  useEffect(() => {
    try {
      const saved = localStorage.getItem('cba.loginMethod')
      if (saved === 'phone' || saved === 'email') setMethod(saved)
    } catch {
      /* ignore storage errors */
    }
  }, [])

  const selectMethod = (next: SignInMethod) => {
    setMethod(next)
    try {
      localStorage.setItem('cba.loginMethod', next)
    } catch {
      /* ignore storage errors */
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
          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
          <p className="text-slate-400 mt-2">Sign in to continue your NEET preparation</p>
        </div>

        {/* Auth error from a failed OAuth/credentials attempt (?error=) */}
        {authErrorMessage && (
          <div
            role="alert"
            className="mb-4 flex items-start gap-3 rounded-xl border border-red-400/40 bg-red-500/15 px-4 py-3 text-sm text-red-200"
          >
            <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-300" />
            <div className="flex-1">{authErrorMessage}</div>
            <button
              type="button"
              onClick={() => setDismissedError(true)}
              aria-label="Dismiss error"
              className="text-red-300 hover:text-red-100"
            >
              ×
            </button>
          </div>
        )}

        {/* Sign-in Method Toggle */}
        <div
          className="mb-4 grid grid-cols-2 gap-1 rounded-xl bg-slate-800/60 p-1"
          role="tablist"
          aria-label="Sign-in method"
        >
          <button
            type="button"
            role="tab"
            aria-selected={method === 'phone'}
            onClick={() => selectMethod('phone')}
            className={`py-2 rounded-lg text-sm font-medium transition-colors ${
              method === 'phone' ? 'bg-white text-slate-900' : 'text-slate-300 hover:text-white'
            }`}
          >
            Phone OTP
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={method === 'email'}
            onClick={() => selectMethod('email')}
            className={`py-2 rounded-lg text-sm font-medium transition-colors ${
              method === 'email' ? 'bg-white text-slate-900' : 'text-slate-300 hover:text-white'
            }`}
          >
            Email
          </button>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Auth Header */}
          <div className="p-4 bg-green-50 border-b border-green-100">
            <div className="flex items-center justify-center gap-2 text-green-700">
              {method === 'phone' ? <Phone className="w-5 h-5" /> : <Mail className="w-5 h-5" />}
              <span className="font-medium">
                {method === 'phone' ? 'Sign in with Phone OTP' : 'Sign in with Email'}
              </span>
            </div>
          </div>

          {/* Auth Content */}
          <div className="p-6">
            <div className="mb-4">
              <SocialSignInButtons redirectUrl={redirectUrl} dividerPosition="bottom" />
            </div>
            {method === 'phone' ? (
              <PhoneSignIn redirectUrl={redirectUrl} />
            ) : (
              <EmailSignIn redirectUrl={redirectUrl} />
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
            <p className="text-center text-sm text-slate-600 mb-2">
              <Link
                href="/auth/forgot-password"
                className="font-medium text-[#4a5d4a] hover:text-[#3d4d3d] hover:underline"
              >
                Forgot your password?
              </Link>
            </p>
            <p className="text-center text-sm text-slate-600">
              Don&apos;t have an account?{' '}
              <Link
                href={`/sign-up?redirect_url=${encodeURIComponent(redirectUrl)}`}
                className="font-semibold text-[#4a5d4a] hover:text-[#3d4d3d]"
              >
                Sign up for free
              </Link>
            </p>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-6 flex justify-center gap-6 text-slate-400 text-xs">
          <span>Secure Login</span>
          <span>OTP Verified</span>
          <span>Data Protected</span>
        </div>

        {/* Terms */}
        <p className="mt-4 text-center text-xs text-slate-500">
          By signing in, you agree to our{' '}
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
