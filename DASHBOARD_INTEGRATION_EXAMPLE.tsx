/**
 * Example Integration of Trial System into PersonalizedStudentDashboard
 *
 * This file shows how to integrate the trial system into the existing dashboard.
 * Copy the relevant sections into your PersonalizedStudentDashboard.tsx
 */

'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useTrialIntegration } from '@/lib/trial/useTrialIntegration'
import { TrialBanner } from '@/components/trial/TrialBanner'
import { TrialExpiredModal } from '@/components/trial/TrialExpiredModal'

export function PersonalizedStudentDashboardWithTrial() {
  const { user, isAuthenticated } = useAuth()

  // ========================================
  // TRIAL SYSTEM INTEGRATION
  // ========================================
  const {
    freeUserId,
    trialStatus,
    isLoading: isTrialLoading,
    showTrialExpiredModal,
    setShowTrialExpiredModal,
    handleUpgrade,
    handleModalClose,
    refreshTrialStatus,
  } = useTrialIntegration(isAuthenticated)

  // Update freeUserId usage in existing code
  const effectiveUserId = user?.id || freeUserId

  // Existing dashboard state
  const [activeTab, setActiveTab] = useState('overview')
  const [neetProgress, setNeetProgress] = useState({
    currentScore: 0,
    targetScore: 540,
    improvement: 0,
    rank: 0,
    percentile: 0,
    strongAreas: [],
    weakAreas: [],
  })

  // ========================================
  // MODIFIED: Fetch dashboard data with trial support
  // ========================================
  const fetchDashboardData = useCallback(async () => {
    if (!effectiveUserId) return

    try {
      // Use effectiveUserId (user.id or freeUserId) in API calls
      const attemptsResponse = await fetch(
        `/api/test-attempts?${isAuthenticated ? 'userId' : 'freeUserId'}=${effectiveUserId}`
      )
      const attemptsData = await attemptsResponse.json()

      // ... rest of your existing data fetching logic
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    }
  }, [effectiveUserId, isAuthenticated])

  useEffect(() => {
    if (effectiveUserId) {
      fetchDashboardData()
    }
  }, [effectiveUserId, fetchDashboardData])

  // ========================================
  // LOADING STATE
  // ========================================
  if (isTrialLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-4 mx-auto animate-pulse">
            <span className="text-white text-2xl">...</span>
          </div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  // ========================================
  // TRIAL EXPIRED BLOCKING
  // ========================================
  if (!isAuthenticated && trialStatus?.isExpired) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy-50 to-teal-50">
        <TrialExpiredModal isOpen={true} trialStatus={trialStatus} onUpgrade={handleUpgrade} />
      </div>
    )
  }

  // ========================================
  // MAIN DASHBOARD RENDER
  // ========================================
  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-50 via-teal-50 to-gold-50 pb-20 md:pb-0">
      {/* ========================================
          TRIAL BANNER - Add at the top
          ======================================== */}
      {!isAuthenticated && trialStatus && (
        <TrialBanner trialStatus={trialStatus} onUpgradeClick={handleUpgrade} />
      )}

      {/* Your existing header */}
      <div className="bg-white shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {user?.name || 'Guest'}!
            </h1>

            {/* ========================================
                TRIAL INFO IN HEADER (Optional)
                ======================================== */}
            {!isAuthenticated && trialStatus && (
              <div className="flex items-center gap-4 text-sm">
                <div className="text-center">
                  <div className="text-xs text-gray-600">Days Left</div>
                  <div className="text-lg font-bold text-blue-600">{trialStatus.daysRemaining}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-600">Tests Left</div>
                  <div className="text-lg font-bold text-green-600">
                    {trialStatus.testsRemaining}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Your existing dashboard content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* ... existing dashboard tabs and content ... */}
      </div>

      {/* ========================================
          TRIAL EXPIRED MODAL
          ======================================== */}
      {!isAuthenticated && trialStatus && (
        <TrialExpiredModal
          isOpen={showTrialExpiredModal}
          trialStatus={trialStatus}
          onClose={handleModalClose}
          onUpgrade={handleUpgrade}
        />
      )}
    </div>
  )
}

// ========================================
// EXAMPLE: Modified Test Start Function with Trial Check
// ========================================
import { canTakeTest, incrementTestCount } from '@/lib/trial/trialManager'
import { trackTrialEvent, TrialEvents } from '@/lib/trial/analytics'

async function handleStartTestWithTrialCheck(freeUserId: string, testTemplateId: string) {
  // Check if guest user can take test
  if (freeUserId && !isAuthenticated) {
    const access = await canTakeTest(freeUserId)

    if (!access.allowed) {
      // Show upgrade modal or alert
      alert(access.reason)
      setShowTrialExpiredModal(true)
      return
    }

    // Track test taken event
    await trackTrialEvent({
      eventName: TrialEvents.TEST_TAKEN,
      freeUserId,
      properties: {
        testTemplateId,
        testNumber: await incrementTestCount(freeUserId),
      },
    })
  }

  // Proceed with test creation
  const response = await fetch('/api/test/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      freeUserId: !isAuthenticated ? freeUserId : undefined,
      userId: isAuthenticated ? user.id : undefined,
      testTemplateId,
    }),
  })

  // ... rest of test creation logic
}

// ========================================
// EXAMPLE: Show Premium Feature Lock
// ========================================
function PremiumFeatureCard({ feature, isLocked }: { feature: string; isLocked: boolean }) {
  const { handleUpgrade } = useTrialIntegration(false)

  if (isLocked) {
    return (
      <div className="relative p-6 bg-gray-50 rounded-xl border-2 border-gray-300 opacity-60">
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-xl">
          <div className="text-center">
            <div className="text-2xl mb-2">🔒</div>
            <h3 className="font-bold text-gray-900 mb-2">Premium Feature</h3>
            <button
              onClick={handleUpgrade}
              className="px-4 py-2 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all"
            >
              Upgrade to Unlock
            </button>
          </div>
        </div>
        <div className="blur-sm">
          <h3 className="font-bold mb-2">{feature}</h3>
          <p className="text-sm text-gray-600">Advanced analytics and insights...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
      <h3 className="font-bold mb-2">{feature}</h3>
      <p className="text-sm text-gray-600">Full access to advanced analytics...</p>
    </div>
  )
}

// Usage in dashboard:
function DashboardWithPremiumFeatures() {
  const { isAuthenticated } = useAuth()
  const { trialStatus } = useTrialIntegration(isAuthenticated)

  const isPremiumLocked = !isAuthenticated || (trialStatus && trialStatus.isExpired)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <PremiumFeatureCard feature="Basic Analytics" isLocked={false} />
      <PremiumFeatureCard feature="Advanced Analytics" isLocked={isPremiumLocked} />
      <PremiumFeatureCard feature="Personalized Study Plans" isLocked={isPremiumLocked} />
      <PremiumFeatureCard feature="Priority Support" isLocked={isPremiumLocked} />
    </div>
  )
}

// ========================================
// EXAMPLE: Trial Status Hook Usage in Any Component
// ========================================
function AnyOtherComponent() {
  const { isAuthenticated } = useAuth()
  const { trialStatus, freeUserId } = useTrialIntegration(isAuthenticated)

  if (!isAuthenticated && trialStatus) {
    return (
      <div className="p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          You have {trialStatus.daysRemaining} days and {trialStatus.testsRemaining} tests remaining
          in your trial.
        </p>
      </div>
    )
  }

  return null
}

export default PersonalizedStudentDashboardWithTrial
