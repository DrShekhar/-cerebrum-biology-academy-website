'use client'

// Force dynamic rendering to prevent Clerk auth issues during static build
export const dynamic = 'force-dynamic'

import { useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
import { Loader2, Shield } from 'lucide-react'

function CounselorLoginRedirect() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { isLoaded, isSignedIn } = useAuth()

  // DEV MODE: Bypass authentication
  const isBypassEnabled = process.env.NEXT_PUBLIC_BYPASS_CRM_AUTH === 'true'

  useEffect(() => {
    const callbackUrl = searchParams.get('callbackUrl') || '/counselor/leads'

    if (isBypassEnabled) {
      router.replace(callbackUrl)
      return
    }

    if (!isLoaded) return

    // If already signed in, go to intended destination
    if (isSignedIn) {
      router.replace(callbackUrl)
      return
    }

    // Redirect to Clerk sign-in (WhatsApp OTP is deprecated)
    router.replace(`/sign-in?redirect_url=${encodeURIComponent(callbackUrl)}`)
  }, [router, isLoaded, isSignedIn, searchParams, isBypassEnabled])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-blue-600 animate-pulse" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Counselor Login</h2>
          <p className="text-sm text-gray-600 mb-4">Redirecting to sign in...</p>
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Please wait...</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CounselorLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600 animate-pulse" />
              </div>
              <p className="text-gray-600">Loading...</p>
            </div>
          </div>
        </div>
      }
    >
      <CounselorLoginRedirect />
    </Suspense>
  )
}
