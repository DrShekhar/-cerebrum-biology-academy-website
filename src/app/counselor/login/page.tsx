'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Users } from 'lucide-react'

export default function CounselorLogin() {
  const router = useRouter()

  useEffect(() => {
    // Counselors authenticate via the standard /sign-in (phone OTP).
    // PhoneSignIn's getRoleDashboardUrl routes COUNSELOR → /counselor
    // after successful auth.
    router.replace('/sign-in?redirect_url=/counselor')
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-primary-100 to-indigo-100 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Users className="w-8 h-8 text-purple-600 animate-pulse" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Counselor Login</h2>
        <div className="flex items-center justify-center gap-2 text-gray-600">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Redirecting to sign-in...</span>
        </div>
        <p className="text-sm text-gray-500 mt-4">Phone OTP authentication</p>
      </div>
    </div>
  )
}
