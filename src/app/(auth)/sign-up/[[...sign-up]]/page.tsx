'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Phone, ArrowLeft } from 'lucide-react'
import { PhoneSignIn } from '@/components/auth/PhoneSignIn'

export default function SignUpPage() {
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get('redirect_url') || '/dashboard'

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
          {/* Phone Auth Header */}
          <div className="p-4 bg-green-50 border-b border-green-100">
            <div className="flex items-center justify-center gap-2 text-green-700">
              <Phone className="w-5 h-5" />
              <span className="font-medium">Sign up with Phone OTP</span>
            </div>
            <p className="text-xs text-green-600 mt-2 text-center">
              Works with Indian phone numbers (+91)
            </p>
          </div>

          {/* Auth Content */}
          <div className="p-6">
            <PhoneSignIn redirectUrl={redirectUrl} />
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
            <p className="text-lg font-bold text-white">67+</p>
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
          <Link href="/privacy-policy" className="underline hover:text-slate-300">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  )
}
