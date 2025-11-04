'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Clock,
  Zap,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Crown,
} from 'lucide-react'
import { TrialStatus } from '@/lib/trial/trialManager'

interface TrialBannerProps {
  trialStatus: TrialStatus
  onUpgradeClick?: () => void
  onDismiss?: () => void
}

export function TrialBanner({ trialStatus, onUpgradeClick, onDismiss }: TrialBannerProps) {
  const [isDismissed, setIsDismissed] = useState(false)
  const [showAnimation, setShowAnimation] = useState(false)

  useEffect(() => {
    const dismissedKey = `trial-banner-dismissed-${trialStatus.freeUserId}`
    const dismissedDate = localStorage.getItem(dismissedKey)

    if (dismissedDate) {
      const lastDismissed = new Date(dismissedDate)
      const now = new Date()
      const hoursSinceDismissed = (now.getTime() - lastDismissed.getTime()) / (1000 * 60 * 60)

      if (hoursSinceDismissed < 24) {
        setIsDismissed(true)
      } else {
        localStorage.removeItem(dismissedKey)
      }
    }

    setShowAnimation(true)
  }, [trialStatus.freeUserId])

  const handleDismiss = () => {
    setIsDismissed(true)
    const dismissedKey = `trial-banner-dismissed-${trialStatus.freeUserId}`
    localStorage.setItem(dismissedKey, new Date().toISOString())
    onDismiss?.()
  }

  if (isDismissed || trialStatus.hasEverUpgraded) {
    return null
  }

  const getBannerConfig = () => {
    switch (trialStatus.urgencyLevel) {
      case 'expired':
        return {
          bgGradient: 'from-red-600 to-red-700',
          icon: AlertTriangle,
          iconColor: 'text-red-100',
          title: 'Trial Expired',
          message: `Your 15-day trial has ended. Upgrade now to continue accessing premium features.`,
          buttonText: 'Upgrade Now',
          buttonStyle: 'bg-white text-red-600 hover:bg-red-50',
          showDismiss: false,
        }
      case 'urgent':
        return {
          bgGradient: 'from-orange-600 to-red-600',
          icon: Clock,
          iconColor: 'text-orange-100',
          title: `Only ${trialStatus.daysRemaining} Days Left!`,
          message: `Your trial expires soon. Upgrade now to keep your progress and unlock all features.`,
          buttonText: 'Upgrade & Save Progress',
          buttonStyle: 'bg-white text-orange-600 hover:bg-orange-50',
          showDismiss: true,
        }
      case 'warning':
        return {
          bgGradient: 'from-yellow-500 to-orange-500',
          icon: Zap,
          iconColor: 'text-yellow-100',
          title: `${trialStatus.daysRemaining} Days Remaining`,
          message: `You have ${trialStatus.testsRemaining} tests left. Upgrade for unlimited access and premium features.`,
          buttonText: 'Upgrade Now',
          buttonStyle: 'bg-white text-yellow-700 hover:bg-yellow-50',
          showDismiss: true,
        }
      default:
        return {
          bgGradient: 'from-blue-600 to-teal-600',
          icon: CheckCircle,
          iconColor: 'text-blue-100',
          title: 'Trial Active',
          message: `${trialStatus.daysRemaining} days and ${trialStatus.testsRemaining} tests remaining. Enjoying your trial?`,
          buttonText: 'Upgrade for Full Access',
          buttonStyle: 'bg-white text-blue-600 hover:bg-blue-50',
          showDismiss: true,
        }
    }
  }

  const config = getBannerConfig()
  const Icon = config.icon

  return (
    <AnimatePresence>
      {showAnimation && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
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
                    {trialStatus.urgencyLevel === 'info' && (
                      <span className="flex items-center gap-1 text-xs bg-white/20 px-2 py-0.5 rounded-full">
                        <Sparkles className="w-3 h-3" />
                        Free Trial
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-white/90 line-clamp-2 sm:line-clamp-1">
                    {config.message}
                  </p>

                  {trialStatus.urgencyLevel !== 'expired' && (
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-2 text-xs">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{trialStatus.daysRemaining} days left</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5" />
                        <span>{trialStatus.testsRemaining} tests left</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                <button
                  onClick={onUpgradeClick || (() => (window.location.href = '/pricing'))}
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

            {trialStatus.urgencyLevel !== 'expired' && (
              <div className="mt-3">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-white/80">Trial Progress</span>
                  <span className="text-white/80">
                    {Math.round(((15 - trialStatus.daysRemaining) / 15) * 100)}% complete
                  </span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${((15 - trialStatus.daysRemaining) / 15) * 100}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-full bg-white rounded-full"
                  />
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function useTrialBanner(freeUserId: string | null) {
  const [trialStatus, setTrialStatus] = useState<TrialStatus | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!freeUserId) {
      setIsLoading(false)
      return
    }

    async function fetchTrialStatus() {
      try {
        const response = await fetch(`/api/trial/status?freeUserId=${freeUserId}`)
        if (response.ok) {
          const data = await response.json()
          setTrialStatus(data.trialStatus)
        }
      } catch (error) {
        console.error('Failed to fetch trial status:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTrialStatus()

    const interval = setInterval(fetchTrialStatus, 60000)

    return () => clearInterval(interval)
  }, [freeUserId])

  return { trialStatus, isLoading }
}
