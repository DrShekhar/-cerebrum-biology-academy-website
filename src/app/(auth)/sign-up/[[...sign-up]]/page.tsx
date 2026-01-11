'use client'

import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Phone, Mail, ArrowLeft, AlertCircle, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { PhoneSignIn } from '@/components/auth/PhoneSignIn'

type AuthMethod = 'email' | 'phone'

// Check if Clerk is configured (at build time for NEXT_PUBLIC_ vars)
const isClerkConfigured = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY)

// Dynamically import Clerk SignUp only when configured
const ClerkSignUp = isClerkConfigured
  ? dynamic(
      () => import('@clerk/nextjs').then((mod) => mod.SignUp),
      {
        loading: () => (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-[#4a5d4a]" />
          </div>
        ),
        ssr: false,
      }
    )
  : null

export default function SignUpPage() {
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get('redirect_url') || '/dashboard'
  // Default to phone auth if Clerk is not configured
  const [authMethod, setAuthMethod] = useState<AuthMethod>(isClerkConfigured ? 'email' : 'phone')

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
          <p className="text-slate-400 mt-2">Join thousands of NEET aspirants</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Auth Method Toggle - Only show if Clerk is configured */}
          {isClerkConfigured ? (
            <div className="p-4 bg-slate-50 border-b border-slate-100">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setAuthMethod('email')}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all ${
                    authMethod === 'email'
                      ? 'bg-[#4a5d4a] text-white shadow-lg'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <Mail className="w-5 h-5" />
                  <span>Email</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMethod('phone')}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all ${
                    authMethod === 'phone'
                      ? 'bg-[#4a5d4a] text-white shadow-lg'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <Phone className="w-5 h-5" />
                  <span>Phone</span>
                </button>
              </div>
              {authMethod === 'phone' && (
                <p className="text-xs text-green-600 mt-2 text-center">
                  ✓ Works with Indian phone numbers (+91)
                </p>
              )}
            </div>
          ) : (
            <div className="p-4 bg-green-50 border-b border-green-100">
              <div className="flex items-center justify-center gap-2 text-green-700">
                <Phone className="w-5 h-5" />
                <span className="font-medium">Sign up with Phone OTP</span>
              </div>
              <p className="text-xs text-green-600 mt-2 text-center">
                ✓ Works with Indian phone numbers (+91)
              </p>
            </div>
          )}

          {/* Auth Content */}
          <div className="p-6">
            {/* When Clerk not configured, always show phone auth */}
            {!isClerkConfigured ? (
              <PhoneSignIn redirectUrl={redirectUrl} />
            ) : authMethod === 'phone' ? (
              <PhoneSignIn redirectUrl={redirectUrl} />
            ) : ClerkSignUp ? (
              <ClerkSignUp
                appearance={{
                  elements: {
                    rootBox: 'w-full',
                    card: 'shadow-none border-0 p-0 w-full bg-transparent',
                    cardBox: 'shadow-none border-0',
                    headerTitle: 'hidden',
                    headerSubtitle: 'hidden',
                    socialButtonsBlockButton:
                      'bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium rounded-xl h-12',
                    socialButtonsBlockButtonText: 'font-medium',
                    dividerLine: 'bg-slate-200',
                    dividerText: 'text-slate-500 text-sm bg-white',
                    formFieldLabel: 'text-slate-700 font-medium text-sm mb-1',
                    formFieldInput:
                      'bg-white border border-slate-300 focus:ring-2 focus:ring-[#4a5d4a] focus:border-[#4a5d4a] rounded-xl h-12 text-slate-900',
                    formButtonPrimary:
                      'bg-[#4a5d4a] hover:bg-[#3d4d3d] text-white font-semibold rounded-xl h-12',
                    footerAction: 'hidden',
                    footerActionLink: 'text-[#4a5d4a] hover:text-[#3d4d3d] font-medium',
                    identityPreviewEditButton: 'text-[#4a5d4a] hover:text-[#3d4d3d]',
                    formFieldInputShowPasswordButton: 'text-slate-400 hover:text-slate-600',
                    otpCodeFieldInput: 'bg-white border-slate-300 focus:ring-[#4a5d4a] rounded-lg',
                    footer: 'hidden',
                    footerPages: 'hidden',
                    header: 'hidden',
                    main: 'gap-4',
                    form: 'gap-4',
                    internal: 'gap-4',
                    logoBox: 'hidden',
                    logoImage: 'hidden',
                    badge: 'hidden',
                    dividerRow: 'my-4',
                  },
                  layout: {
                    socialButtonsPlacement: 'top',
                    socialButtonsVariant: 'blockButton',
                    showOptionalFields: false,
                  },
                  variables: {
                    colorBackground: 'transparent',
                    colorInputBackground: '#ffffff',
                    colorInputText: '#1e293b',
                    borderRadius: '0.75rem',
                  },
                }}
                routing="path"
                path="/sign-up"
                signInUrl="/sign-in"
                forceRedirectUrl={redirectUrl}
              />
            ) : null}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
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

        {/* Benefits */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          <div className="bg-slate-800/50 rounded-xl p-3 text-center">
            <p className="text-lg font-bold text-white">10K+</p>
            <p className="text-xs text-slate-400">Questions</p>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-3 text-center">
            <p className="text-lg font-bold text-white">500+</p>
            <p className="text-xs text-slate-400">Videos</p>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-3 text-center">
            <p className="text-lg font-bold text-white">Free</p>
            <p className="text-xs text-slate-400">Trial</p>
          </div>
        </div>

        {/* Terms */}
        <p className="mt-4 text-center text-xs text-slate-500">
          By signing up, you agree to our{' '}
          <Link href="/terms" className="underline hover:text-slate-300">
            Terms
          </Link>{' '}
          &{' '}
          <Link href="/privacy" className="underline hover:text-slate-300">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  )
}
