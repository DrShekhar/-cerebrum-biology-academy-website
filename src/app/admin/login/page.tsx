'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Shield } from 'lucide-react'
import { useAuth } from '@/lib/firebase/auth-context'

export default function AdminLogin() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [redirecting, setRedirecting] = useState(false)

  useEffect(() => {
    if (loading) return

    // SECURITY: Auth bypass removed from client-side code
    // Server-side bypass (BYPASS_CRM_AUTH) only works in non-production environments

    // If already signed in with Firebase, go to admin dashboard
    if (user) {
      setRedirecting(true)
      router.replace('/admin')
      return
    }

    // Redirect to Firebase sign-in with admin redirect
    setRedirecting(true)
    router.replace('/sign-in?redirect_url=/admin')
  }, [router, loading, user])

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
        <p className="text-sm text-gray-500 mt-4">Secure authentication via Firebase</p>
      </div>
    </div>
  )
}
