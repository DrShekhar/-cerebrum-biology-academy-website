'use client'

import { useState } from 'react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { Mail, Loader2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { getRoleDashboardUrl } from './PhoneSignIn'

interface EmailSignInProps {
  redirectUrl?: string
}

export function EmailSignIn({ redirectUrl = '/dashboard' }: EmailSignInProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await signIn('credentials', {
        email: email.trim(),
        password,
        redirect: false,
      })

      if (!result?.ok || result.error) {
        setError('Invalid email or password')
        setLoading(false)
        return
      }

      // Same post-login destination logic as PhoneSignIn: honor an explicit
      // redirect target, otherwise send the user to their role's dashboard.
      let role: string | undefined
      try {
        const response = await fetch('/api/auth/session', {
          credentials: 'include',
          cache: 'no-store',
        })
        const data = await response.json()
        role = data?.user?.role
      } catch {
        // Fall back to the default student dashboard
      }

      const target = redirectUrl === '/dashboard' ? getRoleDashboardUrl(role) : redirectUrl
      window.location.replace(target)
    } catch {
      setError('Invalid email or password')
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign In with Email</h2>
        <p className="text-gray-600">Use your email and password to continue</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start gap-2">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email-signin-email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email
          </label>
          <input
            id="email-signin-email"
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
          <div className="flex items-center justify-between mb-2">
            <label
              htmlFor="email-signin-password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <Link
              href="/auth/forgot-password"
              className="text-sm text-green-600 hover:text-green-700 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <input
            id="email-signin-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            autoComplete="current-password"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            disabled={loading}
          />
        </div>

        <Button
          type="submit"
          disabled={loading || !email.trim() || !password}
          variant="primary"
          className="w-full bg-green-600 hover:bg-green-700"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Signing In...
            </>
          ) : (
            'Sign In'
          )}
        </Button>
      </form>

      <p className="text-sm text-center text-gray-600">
        Don&apos;t have an account?{' '}
        <Link
          href="/sign-up"
          className="font-medium text-green-600 hover:text-green-700 hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  )
}
