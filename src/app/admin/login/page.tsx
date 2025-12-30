'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
import { Loader2, Shield } from 'lucide-react'

export default function AdminLogin() {
  const router = useRouter()
  const { isLoaded, isSignedIn } = useAuth()

  useEffect(() => {
    if (!isLoaded) return

    // DEV MODE: Skip authentication and go directly to admin dashboard
    if (process.env.NEXT_PUBLIC_BYPASS_CRM_AUTH === 'true') {
      console.log('[DEV MODE] Bypassing admin login, redirecting to students page')
      router.replace('/admin/students')
      return
    }

    // If already signed in, go to admin dashboard
    if (isSignedIn) {
      router.replace('/admin')
      return
    }

    // Redirect to Clerk sign-in with admin redirect
    router.replace('/sign-in?redirect_url=/admin')
  }, [router, isLoaded, isSignedIn])

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="w-8 h-8 text-blue-600 animate-pulse" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Admin Login</h2>
        <div className="flex items-center justify-center gap-2 text-gray-600">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Redirecting to sign in...</span>
        </div>
        <p className="text-sm text-gray-500 mt-4">Secure authentication via Clerk</p>
      </div>
    </div>
  )
}
