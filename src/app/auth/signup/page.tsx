'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Loader2, UserPlus } from 'lucide-react'

export default function SignUpPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Redirect to new sign-up page with preserved query params
    const redirectUrl = searchParams.get('redirect_url') || '/dashboard'
    router.replace(`/sign-up?redirect_url=${encodeURIComponent(redirectUrl)}`)
  }, [router, searchParams])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <UserPlus className="w-8 h-8 text-green-600 animate-pulse" />
        </div>
        <h2 className="text-xl font-semibold text-white mb-2">
          Redirecting to Sign Up
        </h2>
        <div className="flex items-center justify-center gap-2 text-slate-400">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Please wait...</span>
        </div>
      </div>
    </div>
  )
}
