'use client'

import { useState } from 'react'
import { SignIn } from '@clerk/nextjs'
import { PhoneSignIn } from '@/components/auth/PhoneSignIn'
import { MessageCircle, Mail } from 'lucide-react'

type AuthMethod = 'phone' | 'email'

export default function SignInPage() {
  const [authMethod, setAuthMethod] = useState<AuthMethod>('phone')

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-slate-900">Welcome Back</h1>
          <p className="mt-2 text-slate-600">Sign in to access your dashboard</p>
        </div>

        {/* Auth method toggle */}
        <div className="flex gap-2 mb-6">
          <button
            type="button"
            onClick={() => setAuthMethod('phone')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
              authMethod === 'phone'
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            <MessageCircle className="w-5 h-5" />
            <span>WhatsApp</span>
          </button>
          <button
            type="button"
            onClick={() => setAuthMethod('email')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
              authMethod === 'email'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            <Mail className="w-5 h-5" />
            <span>Email</span>
          </button>
        </div>

        {/* Auth content */}
        <div className="bg-white rounded-xl shadow-xl border border-slate-200 p-6">
          {authMethod === 'phone' ? (
            <PhoneSignIn redirectUrl="/dashboard" />
          ) : (
            <SignIn
              appearance={{
                elements: {
                  rootBox: 'w-full',
                  card: 'shadow-none border-0 p-0',
                  headerTitle: 'text-slate-900 text-xl',
                  headerSubtitle: 'text-slate-600',
                  formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white font-medium',
                  footerActionLink: 'text-blue-600 hover:text-blue-700',
                  formFieldInput: 'border-slate-300 focus:border-blue-500 focus:ring-blue-500',
                  identityPreviewEditButton: 'text-blue-600 hover:text-blue-700',
                  socialButtonsBlockButton: 'border-slate-300 hover:bg-slate-50',
                  dividerLine: 'bg-slate-200',
                  dividerText: 'text-slate-500',
                },
              }}
              routing="path"
              path="/sign-in"
              signUpUrl="/sign-up"
              forceRedirectUrl="/dashboard"
            />
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            Don&apos;t have an account?{' '}
            <a href="/sign-up" className="text-blue-600 hover:underline font-medium">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
