'use client'

import { useEffect, useState } from 'react'
import { signIn } from 'next-auth/react'
import { Loader2 } from 'lucide-react'

interface SocialSignInButtonsProps {
  redirectUrl?: string
  /** Where the divider sits relative to the phone box this renders next to */
  dividerPosition?: 'top' | 'bottom'
}

interface ProvidersAvailable {
  google: boolean
  facebook: boolean
}

function GoogleIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.85-.08-1.66-.22-2.45H12v4.64h6.46a5.52 5.52 0 0 1-2.4 3.62v3h3.88c2.27-2.09 3.58-5.17 3.58-8.81z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.88-3.01c-1.07.72-2.45 1.15-4.06 1.15-3.13 0-5.78-2.11-6.72-4.95H1.27v3.11A12 12 0 0 0 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.28A7.22 7.22 0 0 1 4.9 12c0-.79.14-1.56.38-2.28V6.61H1.27a12 12 0 0 0 0 10.78l4.01-3.11z"
      />
      <path
        fill="#EA4335"
        d="M12 4.77c1.76 0 3.34.61 4.59 1.8l3.44-3.44A11.97 11.97 0 0 0 12 0 12 12 0 0 0 1.27 6.61l4.01 3.11C6.22 6.88 8.87 4.77 12 4.77z"
      />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#1877F2"
        d="M24 12a12 12 0 1 0-13.88 11.85v-8.38H7.08V12h3.04V9.36c0-3.01 1.79-4.67 4.53-4.67 1.31 0 2.68.23 2.68.23v2.95H15.8c-1.49 0-1.95.92-1.95 1.87V12h3.32l-.53 3.47h-2.79v8.38A12 12 0 0 0 24 12z"
      />
    </svg>
  )
}

export function SocialSignInButtons({
  redirectUrl = '/dashboard',
  dividerPosition = 'bottom',
}: SocialSignInButtonsProps) {
  const [available, setAvailable] = useState<ProvidersAvailable | null>(null)
  const [loadingProvider, setLoadingProvider] = useState<'google' | 'facebook' | null>(null)

  useEffect(() => {
    let cancelled = false
    fetch('/api/auth/providers-available')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data) {
          setAvailable({ google: Boolean(data.google), facebook: Boolean(data.facebook) })
        }
      })
      .catch(() => {
        // No social buttons if the check fails — phone sign-in still works
      })
    return () => {
      cancelled = true
    }
  }, [])

  if (!available || (!available.google && !available.facebook)) {
    return null
  }

  const handleSignIn = (provider: 'google' | 'facebook') => {
    setLoadingProvider(provider)
    signIn(provider, { callbackUrl: redirectUrl })
  }

  const divider = (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-px bg-slate-200" />
      <span className="text-xs uppercase tracking-wide text-slate-400">or</span>
      <div className="flex-1 h-px bg-slate-200" />
    </div>
  )

  return (
    <div className="space-y-4">
      {dividerPosition === 'top' && divider}
      <div className="space-y-3">
        {available.google && (
          <button
            type="button"
            onClick={() => handleSignIn('google')}
            disabled={loadingProvider !== null}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white border border-slate-300 rounded-xl font-medium text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loadingProvider === 'google' ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <GoogleIcon />
            )}
            <span>Continue with Google</span>
          </button>
        )}
        {available.facebook && (
          <button
            type="button"
            onClick={() => handleSignIn('facebook')}
            disabled={loadingProvider !== null}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white border border-slate-300 rounded-xl font-medium text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loadingProvider === 'facebook' ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <FacebookIcon />
            )}
            <span>Continue with Facebook</span>
          </button>
        )}
      </div>
      {dividerPosition === 'bottom' && divider}
    </div>
  )
}
