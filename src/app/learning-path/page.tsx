'use client'

// Force dynamic rendering to prevent auth issues during static build
export const dynamic = 'force-dynamic'

import dynamicImport from 'next/dynamic'
import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { LogIn, UserPlus, Brain } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const PersonalizedLearningPath = dynamicImport(
  () =>
    import('@/components/learning/PersonalizedLearningPath').then((mod) => ({
      default: mod.PersonalizedLearningPath,
    })),
  {
    loading: () => (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mb-4 mx-auto animate-pulse">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-600">Loading Your AI-Powered Learning Path...</p>
        </div>
      </div>
    ),
    ssr: false,
  }
)

function AuthRequiredMessage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center"
      >
        <div className="w-20 h-20 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Brain className="w-10 h-10 text-white" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">AI Learning Path Access</h1>

        <p className="text-gray-600 mb-8">
          Sign in to unlock your personalized AI-powered NEET Biology learning path with adaptive
          algorithms and smart recommendations.
        </p>

        <div className="space-y-4">
          <Link href="/sign-in">
            <Button variant="primary" size="lg" className="w-full">
              <LogIn className="w-5 h-5 mr-2" />
              Sign In to Continue
            </Button>
          </Link>

          <Link href="/sign-up">
            <Button variant="outline" size="lg" className="w-full">
              <UserPlus className="w-5 h-5 mr-2" />
              Create Free Account
            </Button>
          </Link>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="space-y-2 text-sm text-gray-500">
            <p className="font-medium text-gray-700">Features you'll get access to:</p>
            <ul className="space-y-1">
              <li>• AI-powered study schedule generation</li>
              <li>• Personalized weak area identification</li>
              <li>• NEET score prediction & tracking</li>
              <li>• Adaptive learning recommendations</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function LearningPathPage() {
  const { user, isLoading, isAuthenticated } = useAuth()

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-indigo-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mb-4 mx-auto animate-pulse">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  // Show authentication required message if not signed in
  if (!isAuthenticated || !user) {
    return <AuthRequiredMessage />
  }

  // Show learning path for authenticated users
  return <PersonalizedLearningPath />
}
