'use client'

import { useState } from 'react'
import { SignIn } from '@clerk/nextjs'
import { PhoneSignIn } from '@/components/auth/PhoneSignIn'
import { Phone, Mail } from 'lucide-react'

type AuthMethod = 'phone' | 'email'

export default function SignInPage() {
  const [authMethod, setAuthMethod] = useState<AuthMethod>('email')

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
                ? 'bg-[#4a5d4a] text-white shadow-lg'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            <Phone className="w-5 h-5" />
            <span>Phone</span>
          </button>
          <button
            type="button"
            onClick={() => setAuthMethod('email')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
              authMethod === 'email'
                ? 'bg-[#4a5d4a] text-white shadow-lg'
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
                  formButtonPrimary: 'bg-[#4a5d4a] hover:bg-[#3d4d3d] text-white font-medium',
                  footerActionLink: 'text-[#4a5d4a] hover:text-[#3d4d3d]',
                  formFieldInput: 'border-slate-300 focus:border-[#4a5d4a] focus:ring-[#4a5d4a]',
                  identityPreviewEditButton: 'text-[#4a5d4a] hover:text-[#3d4d3d]',
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
      </div>
    </div>
  )
}
