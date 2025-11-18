'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, MessageCircle, Shield } from 'lucide-react'

export default function AdminLogin() {
  const router = useRouter()

  useEffect(() => {
    // DEV MODE: Skip authentication and go directly to admin dashboard
    if (process.env.NEXT_PUBLIC_BYPASS_CRM_AUTH === 'true') {
      console.log('[DEV MODE] Bypassing admin login, redirecting to students page')
      router.replace('/admin/students')
      return
    }

    // Redirect to WhatsApp login
    router.replace('/auth/whatsapp')
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-primary-100 to-indigo-100 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="w-8 h-8 text-blue-600 animate-pulse" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Admin Login via WhatsApp</h2>
        <div className="flex items-center justify-center gap-2 text-gray-600">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Redirecting...</span>
        </div>
        <p className="text-sm text-gray-500 mt-4">All authentication now uses WhatsApp OTP</p>
      </div>
    </div>
  )
}
