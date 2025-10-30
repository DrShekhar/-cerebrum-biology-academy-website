'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Lock, AlertCircle, ArrowRight, CheckCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { UpgradeModal } from '@/components/UpgradeModal'
import { useUserFlow } from '@/hooks/useUserFlow'
import type { DashboardType } from '@/lib/userFlow'

interface DashboardAccessControlProps {
  dashboardType: DashboardType
  children: React.ReactNode
  fallbackRoute?: string
}

/**
 * Access Control Wrapper for Dashboards
 * Checks if user has access to the dashboard, shows upgrade modal if not
 */
export function DashboardAccessControl({
  dashboardType,
  children,
  fallbackRoute = '/student/dashboard',
}: DashboardAccessControlProps) {
  const router = useRouter()
  const { checkDashboardAccess, isLoading, isPaidUser, isGuestUser, user } = useUserFlow()
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [accessCheck, setAccessCheck] = useState<{
    hasAccess: boolean
    reason?: string
    upgradeRequired?: boolean
  } | null>(null)

  // Check access on mount and when user changes
  useEffect(() => {
    if (!isLoading) {
      const result = checkDashboardAccess(dashboardType)
      setAccessCheck(result)

      // Auto-show upgrade modal if access denied and upgrade required
      if (!result.hasAccess && result.upgradeRequired) {
        setShowUpgradeModal(true)
      }
    }
  }, [dashboardType, isLoading, checkDashboardAccess])

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-4 mx-auto animate-pulse">
            <div className="w-8 h-8 bg-white rounded-full" />
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Access granted - show dashboard
  if (accessCheck?.hasAccess) {
    return <>{children}</>
  }

  // Access denied - show upgrade screen
  const getDashboardName = () => {
    switch (dashboardType) {
      case 'NEET_PREP':
        return 'NEET Prep Center'
      case 'ANALYTICS':
        return 'Performance Analytics'
      case 'HOME':
        return 'Home Dashboard'
      default:
        return 'Dashboard'
    }
  }

  const dashboardName = getDashboardName()

  return (
    <>
      {/* Upgrade Modal */}
      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => {
          setShowUpgradeModal(false)
          // Redirect to fallback after closing
          router.push(fallbackRoute)
        }}
        feature={dashboardName}
      />

      {/* Access Denied Screen */}
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden"
        >
          {/* Header */}
          <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <Lock className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Premium Feature</h1>
                <p className="text-blue-100 mt-1">Upgrade to unlock {dashboardName}</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Message */}
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 mb-6 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-yellow-900">
                  {accessCheck?.reason || 'Access restricted'}
                </p>
                <p className="text-sm text-yellow-700 mt-1">
                  {isGuestUser
                    ? 'Create a free account to get started, or upgrade for full access.'
                    : 'Upgrade to a paid plan to unlock all premium features.'}
                </p>
              </div>
            </div>

            {/* Features List */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                What you'll get with {dashboardName}:
              </h3>
              <ul className="space-y-3">
                {dashboardType === 'NEET_PREP' && (
                  <>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        <strong>NEET Score Prediction:</strong> Track your predicted score out of
                        720
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        <strong>Study Timer:</strong> Smart session tracking and time management
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        <strong>Weak Area Analysis:</strong> AI-powered recommendations for
                        improvement
                      </span>
                    </li>
                  </>
                )}
                {dashboardType === 'ANALYTICS' && (
                  <>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        <strong>Advanced Charts:</strong> Visualize your performance trends
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        <strong>Comparative Analysis:</strong> See how you rank against peers
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        <strong>Export Reports:</strong> Download PDF/CSV performance reports
                      </span>
                    </li>
                  </>
                )}
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    <strong>Unlimited Access:</strong> All practice tests and study materials
                  </span>
                </li>
              </ul>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              {isGuestUser ? (
                <>
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => router.push('/auth/signup')}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    Sign Up Free
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => router.push(fallbackRoute)}
                    className="flex-shrink-0"
                  >
                    Go Back
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => router.push('/courses')}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    View Plans
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => router.push(fallbackRoute)}
                    className="flex-shrink-0"
                  >
                    Go Back
                  </Button>
                </>
              )}
            </div>

            {/* Trust Signals */}
            <div className="mt-6 pt-6 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-600">
                Join <strong className="text-gray-900">2,500+</strong> students with{' '}
                <strong className="text-green-600">98% success rate</strong>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  )
}

/**
 * Hook to check if a specific feature is accessible
 * Use this for individual feature locks within a dashboard
 */
export function useFeatureAccess() {
  const { isPaidUser, isGuestUser, getFeatureUpgradeMessage } = useUserFlow()

  const canAccessFeature = (featureName: string) => {
    return isPaidUser
  }

  const getUpgradePrompt = (featureName: string) => {
    return getFeatureUpgradeMessage(featureName)
  }

  return {
    isPaidUser,
    isGuestUser,
    canAccessFeature,
    getUpgradePrompt,
  }
}
