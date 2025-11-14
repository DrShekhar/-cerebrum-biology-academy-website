'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, MessageCircle } from 'lucide-react'

export default function SignInPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to WhatsApp login
    router.replace('/auth/whatsapp')
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-primary-100 to-indigo-100 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageCircle className="w-8 h-8 text-green-600 animate-pulse" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Redirecting to WhatsApp Login</h2>
        <div className="flex items-center justify-center gap-2 text-gray-600">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Please wait...</span>
        </div>
      </div>
    </div>
  )
}
