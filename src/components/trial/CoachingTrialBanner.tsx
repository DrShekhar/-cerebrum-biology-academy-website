'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  X,
  Clock,
  Zap,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Crown,
  Star,
  Rocket,
} from 'lucide-react'

interface CoachingTrialStatusData {
  userId: string
  coachingTier: string
  isTrialActive: boolean
  trialStartDate: string | null
  trialEndDate: string | null
  daysRemaining: number
  urgencyLevel: 'info' | 'warning' | 'urgent' | 'expired'
  effectiveTier: string
  tierDisplayName: string
  baseTierDisplayName: string
  features: Record<string, any> | null
  isInTrial: boolean
  showUpgradePrompt: boolean
}

interface CoachingTrialBannerProps {
  trialStatus: CoachingTrialStatusData
  onUpgradeClick?: () => void
  onDismiss?: () => void
  onStartTrial?: () => void
}

export function CoachingTrialBanner({
  trialStatus,
  onUpgradeClick,
  onDismiss,
  onStartTrial,
}: CoachingTrialBannerProps) {
  const router = useRouter()
  const [isDismissed, setIsDismissed] = useState(false)
  const [showAnimation, setShowAnimation] = useState(false)
  const [isStartingTrial, setIsStartingTrial] = useState(false)

  useEffect(() => {
    const dismissedKey = `coaching-trial-banner-dismissed-${trialStatus.userId}`
    const dismissedDate = localStorage.getItem(dismissedKey)

    if (dismissedDate) {
      const lastDismissed = new Date(dismissedDate)
      const now = new Date()
      const hoursSinceDismissed = (now.getTime() - lastDismissed.getTime()) / (1000 * 60 * 60)

      if (hoursSinceDismissed < 12) {
        setIsDismissed(true)
      } else {
        localStorage.removeItem(dismissedKey)
      }
    }

    setShowAnimation(true)
  }, [trialStatus.userId])

  const handleDismiss = () => {
    setIsDismissed(true)
    const dismissedKey = `coaching-trial-banner-dismissed-${trialStatus.userId}`
    localStorage.setItem(dismissedKey, new Date().toISOString())
    onDismiss?.()
  }

  const handleStartTrial = async () => {
    if (isStartingTrial) return
    setIsStartingTrial(true)

    try {
      const response = await fetch('/api/trial/coaching-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'start' }),
      })

      if (response.ok) {
        onStartTrial?.()
        window.location.reload()
      }
    } catch (error) {
      console.error('Failed to start trial:', error)
    } finally {
      setIsStartingTrial(false)
    }
  }

  // Don't show banner for paid users
  if (trialStatus.coachingTier !== 'FREE') {
    return null
  }

  if (isDismissed) {
    return null
  }

  // User hasn't started trial yet - show start trial banner
  if (!trialStatus.trialStartDate && !trialStatus.isTrialActive) {
    return (
<>
{showAnimation && (
          <div
            className="relative bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white overflow-hidden animate-fadeInUp"
            role="alert"
            aria-live="polite"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                <div className="flex items-start sm:items-center gap-3 sm:gap-4 flex-1 min-w-0">
                  <div className="flex-shrink-0">
                    <Rocket className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-300" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base sm:text-lg font-bold truncate">
                        Start Your Free 7-Day Trial!
                      </h3>
                      <span className="flex items-center gap-1 text-xs bg-yellow-400/30 px-2 py-0.5 rounded-full text-yellow-100">
                        <Crown className="w-3 h-3" />
                        Pinnacle Access
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-white/90 line-clamp-2 sm:line-clamp-1">
                      Experience ALL premium features including AI Tutor, unlimited tests, and
                      personalized study plans - absolutely free for 7 days!
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                  <button
                    onClick={handleStartTrial}
                    disabled={isStartingTrial}
                    className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-semibold text-sm transition-all hover:shadow-lg active:scale-95 bg-yellow-400 text-gray-900 hover:bg-yellow-300 flex-1 sm:flex-initial min-h-[44px] focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 disabled:opacity-50"
                    aria-label="Start free trial"
                  >
                    {isStartingTrial ? (
                      <span className="animate-spin">⏳</span>
                    ) : (
                      <Sparkles className="w-4 h-4" />
                    )}
                    <span>{isStartingTrial ? 'Starting...' : 'Start Free Trial'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleDismiss}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                    aria-label="Dismiss banner"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
</>
)
  }

  // Get banner config based on trial status
  const getBannerConfig = () => {
    if (!trialStatus.isTrialActive) {
      return {
        bgGradient: 'from-red-600 to-red-700',
        icon: AlertTriangle,
        iconColor: 'text-red-100',
        title: 'Trial Expired',
        message: `Your 7-day Pinnacle trial has ended. Upgrade now to continue enjoying premium features.`,
        buttonText: 'Upgrade Now',
        buttonStyle: 'bg-white text-red-600 hover:bg-red-50',
        showDismiss: false,
      }
    }

    switch (trialStatus.urgencyLevel) {
      case 'urgent':
        return {
          bgGradient: 'from-orange-500 to-red-500',
          icon: Clock,
          iconColor: 'text-orange-100',
          title: `Only ${trialStatus.daysRemaining} Days Left!`,
          message: `Your Pinnacle trial expires soon! Upgrade now to keep all premium features.`,
          buttonText: 'Upgrade & Keep Features',
          buttonStyle: 'bg-white text-orange-600 hover:bg-orange-50',
          showDismiss: true,
        }
      case 'warning':
        return {
          bgGradient: 'from-yellow-500 to-orange-500',
          icon: Zap,
          iconColor: 'text-yellow-100',
          title: `${trialStatus.daysRemaining} Days Remaining`,
          message: `Enjoying your Pinnacle features? Upgrade now to keep unlimited access!`,
          buttonText: 'Upgrade Now',
          buttonStyle: 'bg-white text-yellow-700 hover:bg-yellow-50',
          showDismiss: true,
        }
      default:
        return {
          bgGradient: 'from-green-600 to-teal-600',
          icon: Star,
          iconColor: 'text-green-100',
          title: 'Pinnacle Trial Active',
          message: `${trialStatus.daysRemaining} days left to experience all premium features. Make the most of it!`,
          buttonText: 'View Plans',
          buttonStyle: 'bg-white text-green-600 hover:bg-green-50',
          showDismiss: true,
        }
    }
  }

  const config = getBannerConfig()
  const Icon = config.icon

  return (
<>
{showAnimation && (
        <div
          className={`relative bg-gradient-to-r ${config.bgGradient} text-white overflow-hidden`}
          role="alert"
          aria-live="polite"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-start sm:items-center gap-3 sm:gap-4 flex-1 min-w-0">
                <div className="flex-shrink-0">
                  <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${config.iconColor}`} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-base sm:text-lg font-bold truncate">{config.title}</h3>
                    <span className="flex items-center gap-1 text-xs bg-white/20 px-2 py-0.5 rounded-full">
                      <Crown className="w-3 h-3" />
                      {trialStatus.tierDisplayName}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-white/90 line-clamp-2 sm:line-clamp-1">
                    {config.message}
                  </p>

                  {trialStatus.isTrialActive && (
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-2 text-xs">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{trialStatus.daysRemaining} days left</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>All premium features unlocked</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                <button
                  onClick={onUpgradeClick || (() => router.push('/enrollment'))}
                  className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-semibold text-sm transition-all hover:shadow-lg active:scale-95 ${config.buttonStyle} flex-1 sm:flex-initial min-h-[44px] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2`}
                  aria-label={config.buttonText}
                >
                  <Crown className="w-4 h-4" />
                  <span className="hidden sm:inline">{config.buttonText}</span>
                  <span className="sm:hidden">Upgrade</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {config.showDismiss && (
                  <button
                    onClick={handleDismiss}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                    aria-label="Dismiss banner"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {trialStatus.isTrialActive && (
              <div className="mt-3">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-white/80">Trial Progress</span>
                  <span className="text-white/80">
                    {Math.round(((7 - trialStatus.daysRemaining) / 7) * 100)}% complete
                  </span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-white rounded-full animate-fadeInUp"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
</>
)
}

// Hook to fetch coaching trial status for authenticated users
export function useCoachingTrialStatus() {
  const [trialStatus, setTrialStatus] = useState<CoachingTrialStatusData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTrialStatus = async () => {
    try {
      const response = await fetch('/api/trial/coaching-status')
      if (response.ok) {
        const result = await response.json()
        if (result.success) {
          setTrialStatus(result.data)
        }
      } else if (response.status === 401) {
        // User not authenticated - this is expected, don't set error
        setTrialStatus(null)
      }
    } catch (err) {
      console.error('Failed to fetch coaching trial status:', err)
      setError('Failed to fetch trial status')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTrialStatus()

    // Refresh every 5 minutes
    const interval = setInterval(fetchTrialStatus, 5 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  return { trialStatus, isLoading, error, refetch: fetchTrialStatus }
}
