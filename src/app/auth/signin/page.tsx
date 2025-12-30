'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
import { Loader2, LogIn } from 'lucide-react'

export default function SignInPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { isLoaded, isSignedIn } = useAuth()

  useEffect(() => {
    if (!isLoaded) return

    const redirectUrl = searchParams.get('redirect_url') || '/dashboard'

    // If already signed in, go to intended destination
    if (isSignedIn) {
      router.replace(redirectUrl)
      return
    }

    // Redirect to Clerk sign-in
    router.replace(`/sign-in?redirect_url=${encodeURIComponent(redirectUrl)}`)
  }, [router, isLoaded, isSignedIn, searchParams])

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <LogIn className="w-8 h-8 text-blue-600 animate-pulse" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Redirecting to Sign In</h2>
        <div className="flex items-center justify-center gap-2 text-gray-600">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Please wait...</span>
        </div>
      </div>
    </div>
  )
}
