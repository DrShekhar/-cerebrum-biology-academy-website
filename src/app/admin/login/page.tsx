'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { BookOpen, Lock, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function AdminLogin() {
  const [adminKey, setAdminKey] = useState('')
  const [showKey, setShowKey] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect') || '/admin'

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Simple admin key validation
    if (adminKey === 'admin-demo-2024' || adminKey === process.env.NEXT_PUBLIC_ADMIN_KEY) {
      // Set admin session cookie
      document.cookie = `admin-session=${adminKey}; path=/; max-age=${7 * 24 * 60 * 60}; secure; samesite=strict`
      
      // Redirect to admin dashboard
      router.push(redirectTo)
    } else {
      setError('Invalid admin access key')
    }
    
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-primary-100 to-indigo-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md"
        style={{ boxShadow: 'var(--shadow-premium)' }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-primary-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Access</h1>
          <p className="text-gray-600 mt-2">Cerebrum Biology Academy</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Lock className="w-4 h-4 inline mr-2" />
              Admin Access Key
            </label>
            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                placeholder="Enter admin access key"
                required
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            className="w-full py-3 font-semibold"
            disabled={isLoading}
          >
            {isLoading ? 'Accessing...' : 'Access Admin Panel'}
          </Button>
        </form>

        {/* Demo Credentials Info */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <p className="text-sm text-blue-700">
            <strong>Demo Access:</strong> Use key <code className="bg-blue-100 px-2 py-1 rounded">admin-demo-2024</code>
          </p>
          <p className="text-xs text-blue-600 mt-1">
            This is for development purposes only. Production will use secure authentication.
          </p>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-gray-500">
          Secure admin access for authorized personnel only
        </div>
      </motion.div>
    </div>
  )
}