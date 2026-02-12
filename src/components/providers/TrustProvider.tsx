'use client'

import React, { createContext, useContext, useEffect, useState, lazy, Suspense } from 'react'
import { Shield, Star, Award, Users, CheckCircle } from 'lucide-react'

// Lazy-load heavy components to reduce initial bundle
const RealTimeSocialProof = lazy(() =>
  import('@/components/trust/RealTimeSocialProof').then((mod) => ({
    default: mod.RealTimeSocialProof,
  }))
)

interface TrustMetrics {
  totalStudents: number
  successRate: number
  averageRating: number
  verifiedReviews: number
  facultyCount: number
  yearsEstablished: number
  aimsQualified: number
  liveStudents: number
}

interface TrustContextType {
  metrics: TrustMetrics
  showSocialProof: boolean
  showTrustBadges: boolean
  enableRealTimeUpdates: boolean
  trustLevel: 'high' | 'medium' | 'low'
  updateMetrics: (newMetrics: Partial<TrustMetrics>) => void
  toggleSocialProof: (show: boolean) => void
}

const TrustContext = createContext<TrustContextType | undefined>(undefined)

export function useTrust() {
  const context = useContext(TrustContext)
  if (!context) {
    throw new Error('useTrust must be used within TrustProvider')
  }
  return context
}

interface TrustProviderProps {
  children: React.ReactNode
  enableSocialProof?: boolean
  enableTrustBadges?: boolean
  enableRealTimeUpdates?: boolean
}

// PERFORMANCE: Default static metrics - avoid useState when features are disabled
const DEFAULT_METRICS: TrustMetrics = {
  totalStudents: 10247,
  successRate: 98,
  averageRating: 4.9,
  verifiedReviews: 4500,
  facultyCount: 25,
  yearsEstablished: 5,
  aimsQualified: 1289,
  liveStudents: 3456,
}

// PERFORMANCE: Static context value for when features are disabled
const DISABLED_CONTEXT_VALUE: TrustContextType = {
  metrics: DEFAULT_METRICS,
  showSocialProof: false,
  showTrustBadges: false,
  enableRealTimeUpdates: false,
  trustLevel: 'high',
  updateMetrics: () => {},
  toggleSocialProof: () => {},
}

export function TrustProvider({
  children,
  enableSocialProof = true,
  enableTrustBadges = true,
  enableRealTimeUpdates = true,
}: TrustProviderProps) {
  // PERFORMANCE: When all features are disabled, skip all state and effects
  // This significantly reduces hydration overhead in the critical path
  const allDisabled = !enableSocialProof && !enableTrustBadges && !enableRealTimeUpdates

  if (allDisabled) {
    return (
      <TrustContext.Provider value={DISABLED_CONTEXT_VALUE}>
        {children}
      </TrustContext.Provider>
    )
  }

  // Full provider implementation when features are enabled
  return (
    <TrustProviderFull
      enableSocialProof={enableSocialProof}
      enableTrustBadges={enableTrustBadges}
      enableRealTimeUpdates={enableRealTimeUpdates}
    >
      {children}
    </TrustProviderFull>
  )
}

// Full implementation - only used when features are enabled
function TrustProviderFull({
  children,
  enableSocialProof,
  enableTrustBadges,
  enableRealTimeUpdates,
}: TrustProviderProps) {
  const [metrics, setMetrics] = useState<TrustMetrics>(DEFAULT_METRICS)
  const [showSocialProof, setShowSocialProof] = useState(enableSocialProof)
  const [showTrustBadges, setShowTrustBadges] = useState(enableTrustBadges)
  const [trustLevel, setTrustLevel] = useState<'high' | 'medium' | 'low'>('high')

  // Calculate trust level based on metrics
  useEffect(() => {
    const calculateTrustLevel = () => {
      const score =
        (metrics.successRate >= 90 ? 30 : metrics.successRate >= 80 ? 20 : 10) +
        (metrics.averageRating >= 4.5 ? 25 : metrics.averageRating >= 4.0 ? 15 : 5) +
        (metrics.verifiedReviews >= 2000 ? 25 : metrics.verifiedReviews >= 1000 ? 15 : 5) +
        (metrics.totalStudents >= 10000 ? 20 : metrics.totalStudents >= 5000 ? 10 : 5)

      if (score >= 80) setTrustLevel('high')
      else if (score >= 60) setTrustLevel('medium')
      else setTrustLevel('low')
    }

    calculateTrustLevel()
  }, [metrics])

  // Simulate real-time updates
  useEffect(() => {
    if (!enableRealTimeUpdates) return

    const interval = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        totalStudents: prev.totalStudents + Math.floor(Math.random() * 3),
        liveStudents: prev.liveStudents + Math.floor(Math.random() * 5) - 2,
        verifiedReviews: prev.verifiedReviews + (Math.random() > 0.7 ? 1 : 0),
      }))
    }, 30000)

    return () => clearInterval(interval)
  }, [enableRealTimeUpdates])

  const updateMetrics = (newMetrics: Partial<TrustMetrics>) => {
    setMetrics((prev) => ({ ...prev, ...newMetrics }))
  }

  const toggleSocialProof = (show: boolean) => {
    setShowSocialProof(show)
  }

  const value: TrustContextType = {
    metrics,
    showSocialProof,
    showTrustBadges,
    enableRealTimeUpdates: enableRealTimeUpdates ?? false,
    trustLevel,
    updateMetrics,
    toggleSocialProof,
  }

  return (
    <TrustContext.Provider value={value}>
      {children}

      {/* Global Trust Components - Lazy loaded */}
      {showSocialProof && (
        <Suspense fallback={null}>
          <RealTimeSocialProof />
        </Suspense>
      )}
      {showTrustBadges && <FloatingTrustIndicators />}

      {/* Trust Analytics */}
      <TrustAnalytics />
    </TrustContext.Provider>
  )
}

// Floating trust indicators that appear on scroll and auto-hide after 7 seconds
function FloatingTrustIndicators() {
  const [isVisible, setIsVisible] = useState(false)
  const [hasAutoHidden, setHasAutoHidden] = useState(false)
  const { metrics, trustLevel } = useTrust()

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight

      // Show after scrolling 50% of the viewport (only if not auto-hidden)
      if (!hasAutoHidden) {
        setIsVisible(scrollPosition > windowHeight * 0.5)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [hasAutoHidden])

  // Auto-hide after 7 seconds of being visible
  useEffect(() => {
    if (isVisible && !hasAutoHidden) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        setHasAutoHidden(true)
      }, 7000)
      return () => clearTimeout(timer)
    }
  }, [isVisible, hasAutoHidden])

  if (!isVisible) return null

  const trustIndicators = [
    {
      icon: Star,
      value: metrics.averageRating.toFixed(1),
      label: '★ Rating',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      icon: CheckCircle,
      value: `${metrics.successRate}%`,
      label: 'Success Rate',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: Users,
      value: `${Math.floor(metrics.totalStudents / 1000)}K+`,
      label: 'Students',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
  ]

  return (
    <div className="fixed right-1 top-1/3 transform -translate-y-1/2 z-20 space-y-1.5 hidden lg:block animate-fade-in-right">
      {trustIndicators.map((indicator, index) => (
        <div
          key={indicator.label}
          className={`${indicator.bgColor} border border-gray-200 rounded-lg p-2 shadow-md backdrop-blur-sm bg-opacity-95 animate-fade-in-right`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-center space-x-1.5">
            <indicator.icon className={`w-3 h-3 ${indicator.color}`} />
            <div>
              <div className={`font-bold ${indicator.color} text-xs`}>{indicator.value}</div>
              <div className="text-[10px] text-gray-600">{indicator.label}</div>
            </div>
          </div>
        </div>
      ))}

      {/* Trust Level Indicator */}
      <div
        className={`rounded-full p-2 animate-scale-in ${
          trustLevel === 'high'
            ? 'bg-green-600'
            : trustLevel === 'medium'
              ? 'bg-yellow-500'
              : 'bg-red-500'
        }`}
        style={{ animationDelay: '300ms' }}
      >
        <Shield className="w-4 h-4 text-white" />
      </div>
    </div>
  )
}

// Trust analytics and tracking
function TrustAnalytics() {
  const { metrics, trustLevel, showSocialProof } = useTrust()

  useEffect(() => {
    // Track trust metrics for optimization
    if (typeof window !== 'undefined' && 'gtag' in window) {
      ;(window as any).gtag('event', 'trust_metrics_view', {
        trust_level: trustLevel,
        success_rate: metrics.successRate,
        rating: metrics.averageRating,
        social_proof_enabled: showSocialProof,
        total_students: metrics.totalStudents,
      })
    }

    // Send trust metrics to analytics
    if (process.env.NODE_ENV === 'production') {
      fetch('/api/analytics/trust-metrics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          metrics,
          trustLevel,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
        }),
      }).catch(() => {
        // Fail silently for analytics
      })
    }
  }, [metrics, trustLevel, showSocialProof])

  return null // This component only handles analytics
}

// Mini trust bar for page headers
export function MiniTrustBar() {
  const { metrics } = useTrust()

  const quickStats = [
    {
      icon: Users,
      value: `${Math.floor(metrics.totalStudents / 1000)}K+`,
      label: 'Students',
    },
    {
      icon: Star,
      value: metrics.averageRating.toFixed(1),
      label: 'Rating',
    },
    {
      icon: Award,
      value: `${metrics.successRate}%`,
      label: 'Success',
    },
  ]

  return (
    <div className="bg-white border border-gray-200 rounded-full px-4 py-2 shadow-sm">
      <div className="flex items-center space-x-4">
        {quickStats.map((stat, index) => (
          <div key={stat.label} className="flex items-center space-x-1">
            <stat.icon className="w-4 h-4 text-gray-600" />
            <span className="font-bold text-gray-900 text-sm">{stat.value}</span>
            <span className="text-gray-600 text-xs">{stat.label}</span>
            {index < quickStats.length - 1 && (
              <div className="w-1 h-1 bg-gray-300 rounded-full ml-2" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// Trust score widget
export function TrustScore({ showDetails = false }: { showDetails?: boolean }) {
  const { metrics, trustLevel } = useTrust()

  const trustScore = Math.round(
    (metrics.successRate / 100) * 25 +
      (metrics.averageRating / 5) * 25 +
      Math.min(metrics.verifiedReviews / 100, 25) +
      Math.min(metrics.totalStudents / 400, 25)
  )

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-50'
    if (score >= 60) return 'bg-yellow-50'
    return 'bg-red-50'
  }

  return (
    <div className={`${getScoreBg(trustScore)} border border-gray-200 rounded-xl p-4`}>
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Shield className={`w-6 h-6 ${getScoreColor(trustScore)}`} />
          <span className="text-lg font-bold text-gray-900">Trust Score</span>
        </div>

        <div className={`text-3xl font-bold ${getScoreColor(trustScore)} mb-2`}>
          {trustScore}/100
        </div>

        <div className="text-sm text-gray-600 capitalize mb-3">{trustLevel} Trust Level</div>

        {showDetails && (
          <div className="space-y-2 text-xs text-gray-600">
            <div className="flex justify-between">
              <span>Success Rate:</span>
              <span>{metrics.successRate}%</span>
            </div>
            <div className="flex justify-between">
              <span>Avg. Rating:</span>
              <span>{metrics.averageRating}/5</span>
            </div>
            <div className="flex justify-between">
              <span>Reviews:</span>
              <span>{metrics.verifiedReviews.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Students:</span>
              <span>{metrics.totalStudents.toLocaleString()}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Live enrollment counter
export function LiveEnrollmentCounter() {
  const { metrics } = useTrust()
  const [currentCount, setCurrentCount] = useState(metrics.liveStudents)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCount((prev) => prev + Math.floor(Math.random() * 3) - 1)
    }, 10000) // Update every 10 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
        <span className="text-sm font-medium text-green-800">
          {currentCount.toLocaleString()} students learning live
        </span>
      </div>
    </div>
  )
}

// Trust badge for CTAs
export function TrustBadgeForCTA() {
  const { metrics } = useTrust()

  return (
    <div className="flex items-center space-x-4 text-sm text-gray-600 mt-3">
      <div className="flex items-center space-x-1">
        <CheckCircle className="w-4 h-4 text-green-600" />
        <span>Trusted by {Math.floor(metrics.totalStudents / 1000)}K+ students</span>
      </div>
      <div className="flex items-center space-x-1">
        <Star className="w-4 h-4 text-yellow-500" />
        <span>{metrics.averageRating}/5 rating</span>
      </div>
      <div className="flex items-center space-x-1">
        <Award className="w-4 h-4 text-blue-500" />
        <span>{metrics.successRate}% success rate</span>
      </div>
    </div>
  )
}
