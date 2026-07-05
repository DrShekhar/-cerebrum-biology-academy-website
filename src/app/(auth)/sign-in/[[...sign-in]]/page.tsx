'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Phone, Mail, ArrowLeft } from 'lucide-react'
import { PhoneSignIn } from '@/components/auth/PhoneSignIn'
import { EmailSignIn } from '@/components/auth/EmailSignIn'
import { SocialSignInButtons } from '@/components/auth/SocialSignInButtons'

type SignInMethod = 'phone' | 'email'

export default function SignInPage() {
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get('redirect_url') || '/dashboard'
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
