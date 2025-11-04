'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BookOpen,
  TrendingUp,
  Target,
  Clock,
  Award,
  AlertTriangle,
  Brain,
  Calendar,
  CheckCircle,
  BarChart3,
  Zap,
  Users,
  MessageCircle,
  Video,
  Download,
  Bell,
  Settings,
  Star,
  Trophy,
  Timer,
  PieChart,
  Activity,
  Lightbulb,
  ArrowUp,
  ArrowDown,
  Play,
  Pause,
  RotateCcw,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useSwipeGesture, usePullToRefresh } from '@/hooks/useSwipeGesture'
import { useLongPress } from '@/hooks/useLongPress'
import { FloatingActionButton, useDashboardFAB } from '@/components/mobile/FloatingActionButton'
import { BottomSheet, useBottomSheet } from '@/components/mobile/BottomSheet'
import { BottomNavigation } from '@/components/mobile/MobileNavigation'
import { usePathname } from 'next/navigation'
import { fetchWithRetry } from '@/lib/utils/fetchWithRetry'
import { useToast } from '@/components/ui/Toast'
import { ProgressCardSkeleton } from '@/components/ai/skeletons/ProgressCardSkeleton'
import { MetricCardSkeleton } from '@/components/ai/skeletons/MetricsSkeleton'

interface StudySession {
  id: string
  subject: string
  chapter: string
  duration: number
  score?: number
  date: string
  type: 'study' | 'practice' | 'test'
}

interface WeakArea {
  chapter: string
  topic: string
  difficulty: 'low' | 'medium' | 'high'
  improvement: number
  recommendedStudyTime: number
}

interface NEETProgress {
  currentScore: number
  targetScore: number
  improvement: number
  rank: number
  percentile: number
  strongAreas: string[]
  weakAreas: WeakArea[]
}

export function PersonalizedStudentDashboard() {
  const { user, isAuthenticated } = useAuth()
  const pathname = usePathname()
  const { showToast } = useToast()
  const [activeTab, setActiveTab] = useState('overview')
  const [studyTimer, setStudyTimer] = useState(0)
  const [isStudying, setIsStudying] = useState(false)
  const [currentSession, setCurrentSession] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [freeUserId, setFreeUserId] = useState<string | null>(null)
  const [selectedWeakArea, setSelectedWeakArea] = useState<WeakArea | null>(null)
  const dashboardRef = useRef<HTMLDivElement>(null)
  const { defaultActions } = useDashboardFAB()
  const weakAreaSheet = useBottomSheet()

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'progress', label: 'Progress Tracking', icon: TrendingUp },
    { id: 'study', label: 'Study Session', icon: BookOpen },
    { id: 'weak-areas', label: 'Weak Areas', icon: AlertTriangle },
    { id: 'practice', label: 'Practice Tests', icon: Target },
    { id: 'schedule', label: 'Study Schedule', icon: Calendar },
  ]

  // Real data from API
  const [neetProgress, setNeetProgress] = useState<NEETProgress>({
    currentScore: 0,
    targetScore: 540,
    improvement: 0,
    rank: 0,
    percentile: 0,
    strongAreas: [],
    weakAreas: [],
  })

  const [recentSessions, setRecentSessions] = useState<StudySession[]>([])

  // Get or create freeUserId for guest users
  useEffect(() => {
    if (!isAuthenticated) {
      let storedFreeUserId = localStorage.getItem('freeUserId')
      if (!storedFreeUserId) {
        storedFreeUserId = `free_${Date.now()}_${Math.random().toString(36).substring(7)}`
        localStorage.setItem('freeUserId', storedFreeUserId)
      }
      setFreeUserId(storedFreeUserId)
    }
  }, [isAuthenticated])

  const fetchDashboardData = useCallback(
    async (showLoadingState = true) => {
      try {
        if (showLoadingState) {
          setIsLoading(true)
        } else {
          setIsRefreshing(true)
        }
        setError(null)

        const userId = user?.id || freeUserId
        if (!userId) return

        // Parallel fetch for performance with retry logic
        const [attemptsResponse, dashboardStatsResponse] = await Promise.allSettled([
          fetchWithRetry(`/api/test-attempts?freeUserId=${userId}`, {
            retryOptions: {
              maxRetries: 3,
              onRetry: (attempt) => {
                console.log(`Retrying attempts fetch (attempt ${attempt})`)
              },
            },
          }),
          fetchWithRetry(`/api/analytics/dashboard?type=student&userId=${userId}`, {
            retryOptions: {
              maxRetries: 2,
              onRetry: (attempt) => {
                console.log(`Retrying dashboard stats fetch (attempt ${attempt})`)
              },
            },
          }),
        ])

        // Process attempts data
        if (attemptsResponse.status === 'fulfilled') {
          const attemptsData = await attemptsResponse.value.json()

          if (attemptsData.success && attemptsData.data.attempts.length > 0) {
            const attempts = attemptsData.data.attempts

            // Calculate average score and improvement
            const scores = attempts.map((a: any) => a.score)
            const avgScore = Math.round(
              scores.reduce((a: number, b: number) => a + b, 0) / scores.length
            )
            const latestScore = scores[0]
            const previousScore = scores.length > 1 ? scores[1] : latestScore
            const improvement = latestScore - previousScore

            // Collect all strength and weakness areas
            const allStrongAreas = new Set<string>()
            const allWeakAreas = new Map<string, { count: number; topics: Set<string> }>()

            attempts.forEach((attempt: any) => {
              attempt.strengthAreas?.forEach((area: string) => allStrongAreas.add(area))
              attempt.weaknessAreas?.forEach((area: string) => {
                if (!allWeakAreas.has(area)) {
                  allWeakAreas.set(area, { count: 0, topics: new Set() })
                }
                const weakArea = allWeakAreas.get(area)!
                weakArea.count++
              })
            })

            // Build weak areas with recommendations
            const weakAreas: WeakArea[] = Array.from(allWeakAreas.entries())
              .sort((a, b) => b[1].count - a[1].count)
              .slice(0, 5)
              .map(([chapter, data]) => ({
                chapter,
                topic: 'Multiple concepts',
                difficulty: data.count >= 3 ? 'high' : data.count >= 2 ? 'medium' : 'low',
                improvement: -data.count,
                recommendedStudyTime: data.count * 30,
              }))

            // Calculate Biology score (out of 360 for NEET Biology section)
            const biologyScore = Math.round(avgScore * 0.5)

            setNeetProgress({
              currentScore: biologyScore,
              targetScore: 360,
              improvement,
              rank: attempts[0]?.rank || 0,
              percentile: attempts[0]?.percentage || 0,
              strongAreas: Array.from(allStrongAreas).slice(0, 5),
              weakAreas,
            })

            // Transform sessions to study sessions format
            const transformedSessions = attempts.slice(0, 10).map((attempt: any) => ({
              id: attempt.id,
              subject: 'Biology',
              chapter: attempt.testTemplate.title,
              duration: Math.round(attempt.timeSpent / 60),
              score: attempt.percentage,
              date: attempt.createdAt,
              type:
                attempt.testTemplate.type === 'PRACTICE_TEST'
                  ? 'practice'
                  : attempt.testTemplate.type === 'MOCK_TEST'
                    ? 'test'
                    : 'study',
            }))

            setRecentSessions(transformedSessions)
          }
        } else {
          console.error('Failed to fetch attempts:', attemptsResponse.reason)
          setError('Failed to load test history')
          showToast('error', 'Load Failed', 'Could not fetch your test history')
        }

        // Process dashboard stats if available
        if (dashboardStatsResponse.status === 'fulfilled' && dashboardStatsResponse.value.ok) {
          const statsData = await dashboardStatsResponse.value.json()
          if (statsData.success) {
            console.log('Dashboard stats loaded:', statsData.data)
          }
        }

        setLastUpdated(new Date())
        setIsLoading(false)
        setIsRefreshing(false)

        if (!showLoadingState) {
          showToast('success', 'Refreshed', 'Dashboard data updated successfully')
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
        setError('Failed to load dashboard data')
        setIsLoading(false)
        setIsRefreshing(false)

        showToast('error', 'Load Failed', 'Unable to fetch dashboard data. Please try again.', 7000)
      }
    },
    [user?.id, freeUserId, showToast]
  )

  useEffect(() => {
    if (user?.id || freeUserId) {
      fetchDashboardData()
    }
  }, [user?.id, freeUserId, fetchDashboardData])

  // Auto-refresh every 5 minutes
  useEffect(() => {
    const AUTO_REFRESH_INTERVAL = 5 * 60 * 1000 // 5 minutes

    const interval = setInterval(() => {
      if (user?.id || freeUserId) {
        fetchDashboardData(false) // Don't show loading state on auto-refresh
      }
    }, AUTO_REFRESH_INTERVAL)

    return () => clearInterval(interval)
  }, [user?.id, freeUserId, fetchDashboardData])

  const pullToRefresh = usePullToRefresh(() => fetchDashboardData(false), 80)

  const goToPreviousTab = useCallback(() => {
    setActiveTab((current) => {
      const currentIndex = tabs.findIndex((t) => t.id === current)
      const previousIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1
      return tabs[previousIndex].id
    })
  }, [tabs])

  const goToNextTab = useCallback(() => {
    setActiveTab((current) => {
      const currentIndex = tabs.findIndex((t) => t.id === current)
      const nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0
      return tabs[nextIndex].id
    })
  }, [tabs])

  const swipeHandlers = useSwipeGesture({
    onSwipeLeft: goToNextTab,
    onSwipeRight: goToPreviousTab,
    threshold: 50,
  })

  useEffect(() => {
    const handleStartStudy = () => {
      setActiveTab('study')
      startStudySession('Quick Session')
    }

    window.addEventListener('dashboard:start-study', handleStartStudy)
    return () => window.removeEventListener('dashboard:start-study', handleStartStudy)
  }, [])

  // Study Timer Logic
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isStudying) {
      interval = setInterval(() => {
        setStudyTimer((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isStudying])

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const startStudySession = (chapter: string) => {
    setCurrentSession(chapter)
    setIsStudying(true)
    setStudyTimer(0)
  }

  const pauseStudySession = () => {
    setIsStudying(false)
  }

  const stopStudySession = () => {
    setIsStudying(false)
    setStudyTimer(0)
    setCurrentSession('')
  }

  // Helper function to get time since last update
  const getTimeSinceUpdate = () => {
    if (!lastUpdated) return ''
    const now = new Date()
    const diff = Math.floor((now.getTime() - lastUpdated.getTime()) / 1000 / 60) // minutes
    if (diff < 1) return 'Just now'
    if (diff < 60) return `${diff} min ago`
    const hours = Math.floor(diff / 60)
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`
    const days = Math.floor(hours / 24)
    return `${days} day${days > 1 ? 's' : ''} ago`
  }

  // Loading state - Mobile Optimized with Skeletons
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy-50 via-teal-50 to-gold-50 pb-20 md:pb-0">
        <div className="bg-white shadow-lg border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-teal-600 to-teal-700 rounded-xl flex items-center justify-center flex-shrink-0 animate-pulse">
                <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900">
                  Loading your dashboard...
                </h1>
                <p className="text-xs sm:text-sm text-gray-600">Please wait</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8 space-y-4 sm:space-y-8">
          <ProgressCardSkeleton />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            <MetricCardSkeleton />
            <MetricCardSkeleton />
            <MetricCardSkeleton />
            <MetricCardSkeleton />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
            <ProgressCardSkeleton />
            <ProgressCardSkeleton />
          </div>
        </div>
      </div>
    )
  }

  // Empty state - Mobile Optimized
  if (recentSessions.length === 0 && !isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy-50 via-teal-50 to-gold-50">
        <div className="bg-white shadow-lg border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-teal-600 to-teal-700 rounded-xl flex items-center justify-center flex-shrink-0">
                <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900 truncate">
                  Welcome, {user?.name || 'Student'}! 🎓
                </h1>
                <p className="text-xs sm:text-sm text-gray-600">
                  Start your NEET Biology mastery journey
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-12 text-center"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-teal-600 to-navy-700 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Target className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-sm sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Take your first practice test to unlock personalized insights, track your progress,
              and master NEET Biology concepts with our AI-powered learning platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center">
              <a
                href="/mock-tests"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-teal-600 to-navy-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all touch-action-manipulation min-h-touch active:scale-95"
              >
                <Target className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Take Your First Test
              </a>
              <a
                href="/practice"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-teal-600 hover:text-teal-600 transition-all touch-action-manipulation min-h-touch active:scale-95"
              >
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Browse Practice Questions
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={dashboardRef}
      className="min-h-screen bg-gradient-to-br from-navy-50 via-teal-50 to-gold-50 pb-20 md:pb-0"
      {...pullToRefresh.handlers}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg"
      >
        Skip to main content
      </a>

      {pullToRefresh.isRefreshing && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-blue-600 text-white text-center py-2 text-sm font-medium">
          <RefreshCw className="inline-block w-4 h-4 mr-2 animate-spin" />
          Refreshing dashboard...
        </div>
      )}

      {pullToRefresh.pullDistance > 0 && !pullToRefresh.isRefreshing && (
        <div
          className="fixed top-0 left-0 right-0 z-50 flex justify-center py-2"
          style={{ opacity: Math.min(pullToRefresh.pullDistance / 80, 1) }}
        >
          <RefreshCw
            className="w-6 h-6 text-blue-600"
            style={{
              transform: `rotate(${(pullToRefresh.pullDistance / 80) * 360}deg)`,
            }}
          />
        </div>
      )}

      {/* Header - Mobile Optimized */}
      <div className="bg-white shadow-lg border-b" id="main-content">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between flex-wrap gap-3 sm:gap-0 sm:flex-nowrap">
            <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-teal-600 to-teal-700 rounded-xl flex items-center justify-center flex-shrink-0">
                <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900 truncate">
                  Welcome back, {user.name || 'Student'}! 🎓
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">
                  Your NEET Biology mastery journey continues
                </p>
                {lastUpdated && (
                  <p className="text-xs text-gray-500 mt-0.5 sm:hidden">
                    Updated {getTimeSinceUpdate()}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto justify-between sm:justify-end">
              <div className="text-center sm:text-right">
                <div className="text-xs text-gray-600">Biology Score</div>
                <div className="text-lg sm:text-2xl font-bold text-blue-600">
                  {neetProgress.currentScore}/360
                </div>
                <div className="text-xs text-gray-500 hidden sm:block">
                  Total: {neetProgress.currentScore * 2}/720
                </div>
              </div>
              <div className="text-center sm:text-right">
                <div className="text-xs text-gray-600">Rank</div>
                <div className="text-lg sm:text-2xl font-bold text-green-600">
                  #{neetProgress.rank || '-'}
                </div>
                <div className="text-xs text-gray-500 hidden sm:block">
                  {neetProgress.percentile}th %ile
                </div>
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2">
                <button
                  onClick={() => fetchDashboardData(false)}
                  disabled={isRefreshing}
                  aria-label="Refresh dashboard"
                  title={lastUpdated ? `Last updated ${getTimeSinceUpdate()}` : 'Refresh'}
                  className="p-2 sm:p-2.5 bg-gray-100 rounded-lg hover:bg-gray-200 touch-action-manipulation active:scale-95 transition-transform min-h-[44px] min-w-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                >
                  <RefreshCw
                    className={`w-5 h-5 text-gray-600 ${isRefreshing ? 'animate-spin' : ''}`}
                  />
                </button>
                <button
                  aria-label="Notifications"
                  className="p-2 sm:p-2.5 bg-gray-100 rounded-lg hover:bg-gray-200 touch-action-manipulation active:scale-95 transition-transform min-h-[44px] min-w-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <Bell className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  aria-label="Settings"
                  className="p-2 sm:p-2.5 bg-gray-100 rounded-lg hover:bg-gray-200 touch-action-manipulation active:scale-95 transition-transform min-h-[44px] min-w-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <Settings className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
          {lastUpdated && (
            <div className="text-xs text-gray-500 mt-2 hidden sm:block">
              Last updated {getTimeSinceUpdate()}
            </div>
          )}
        </div>
      </div>

      {/* Navigation Tabs - Mobile Optimized with Horizontal Scroll and Swipe Indicators */}
      <div
        className="bg-white border-b sticky top-0 z-10"
        role="navigation"
        aria-label="Dashboard tabs"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <button
            onClick={goToPreviousTab}
            aria-label="Previous tab"
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors min-h-[44px] min-w-[44px] items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>

          <nav
            className="flex space-x-2 sm:space-x-8 overflow-x-auto scrollbar-hide"
            {...swipeHandlers}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                aria-label={tab.label}
                aria-current={activeTab === tab.id ? 'page' : undefined}
                className={`flex items-center space-x-1.5 sm:space-x-2 py-3 sm:py-4 px-3 sm:px-2 border-b-2 transition-all whitespace-nowrap flex-shrink-0 touch-action-manipulation min-h-[44px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-t-lg ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="font-medium text-xs sm:text-sm">{tab.label}</span>
              </button>
            ))}
          </nav>

          <button
            onClick={goToNextTab}
            aria-label="Next tab"
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors min-h-[44px] min-w-[44px] items-center justify-center"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>

          <div className="md:hidden absolute bottom-0 left-1/2 -translate-x-1/2 text-xs text-gray-400 pb-1">
            Swipe to navigate
          </div>
        </div>
      </div>

      {/* Main Content - Mobile Optimized */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4 sm:space-y-8"
            >
              {/* NEET Score Prediction Card - Mobile Optimized */}
              <div className="bg-gradient-to-r from-teal-600 to-navy-700 rounded-xl sm:rounded-2xl p-4 sm:p-8 text-white">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                      🎯 NEET Biology Score
                    </h3>
                    <div className="space-y-1.5 sm:space-y-2">
                      <div className="text-xs sm:text-sm text-blue-100">Current Score</div>
                      <div className="text-3xl sm:text-4xl font-bold">
                        {neetProgress.currentScore}/360
                      </div>
                      <div className="text-xs sm:text-sm text-blue-200 mb-2">
                        Total NEET: {neetProgress.currentScore * 2}/720
                      </div>
                      <div className="flex items-center space-x-1.5 sm:space-x-2">
                        {neetProgress.improvement >= 0 ? (
                          <ArrowUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-300" />
                        ) : (
                          <ArrowDown className="w-3 h-3 sm:w-4 sm:h-4 text-red-300" />
                        )}
                        <span
                          className={`text-xs sm:text-sm ${neetProgress.improvement >= 0 ? 'text-green-300' : 'text-red-300'}`}
                        >
                          {neetProgress.improvement >= 0 ? '+' : ''}
                          {neetProgress.improvement} from last test
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
                      Target Progress
                    </h4>
                    <div className="space-y-3 sm:space-y-4">
                      <div>
                        <div className="flex justify-between text-xs sm:text-sm mb-2">
                          <span>Progress to Target ({neetProgress.targetScore})</span>
                          <span>
                            {Math.round(
                              (neetProgress.currentScore / neetProgress.targetScore) * 100
                            )}
                            %
                          </span>
                        </div>
                        <div className="w-full bg-blue-400 rounded-full h-2 sm:h-3">
                          <div
                            className="bg-white h-2 sm:h-3 rounded-full transition-all duration-1000"
                            style={{
                              width: `${Math.min((neetProgress.currentScore / neetProgress.targetScore) * 100, 100)}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className="text-xs sm:text-sm text-blue-100">
                        {Math.max(0, neetProgress.targetScore - neetProgress.currentScore)} marks to
                        target
                      </div>
                      <div className="text-xs sm:text-sm text-blue-200">
                        Biology: Zoology + Botany (180 + 180)
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
                      Performance Metrics
                    </h4>
                    <div className="space-y-1.5 sm:space-y-2">
                      {neetProgress.rank > 0 && (
                        <>
                          <div className="text-2xl sm:text-3xl font-bold">#{neetProgress.rank}</div>
                          <div className="text-xs sm:text-sm text-blue-100">
                            {neetProgress.percentile}th percentile
                          </div>
                        </>
                      )}
                      <div className="text-xs sm:text-sm text-blue-100">
                        {recentSessions.length} tests completed
                      </div>
                      <div className="text-xs sm:text-sm text-blue-100">
                        {neetProgress.strongAreas.length} strong areas
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats Grid - Mobile Optimized (2 columns on mobile, 4 on tablet+) */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
                <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-2 sm:mb-4">
                    <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
                    <span className="text-xl sm:text-2xl font-bold text-gray-900">
                      {Math.round(recentSessions.reduce((acc, s) => acc + s.duration, 0) / 60)}h
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">Total Study Time</div>
                  <div className="text-xs sm:text-sm text-blue-600">
                    {recentSessions.length} sessions
                  </div>
                </div>

                <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-2 sm:mb-4">
                    <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500" />
                    <span className="text-xl sm:text-2xl font-bold text-gray-900">
                      {neetProgress.percentile}%
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">Average Score</div>
                  <div
                    className={`text-xs sm:text-sm ${neetProgress.improvement >= 0 ? 'text-green-600' : 'text-red-600'}`}
                  >
                    {neetProgress.improvement >= 0 ? '+' : ''}
                    {neetProgress.improvement} from last test
                  </div>
                </div>

                <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-2 sm:mb-4">
                    <Target className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
                    <span className="text-xl sm:text-2xl font-bold text-gray-900">
                      {recentSessions.length}
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">Tests Completed</div>
                  <div className="text-xs sm:text-sm text-green-600">
                    {neetProgress.strongAreas.length} strong areas
                  </div>
                </div>

                <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-2 sm:mb-4">
                    <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-teal-600" />
                    <span className="text-xl sm:text-2xl font-bold text-gray-900">
                      {neetProgress.rank || '-'}
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">National Rank</div>
                  <div className="text-xs sm:text-sm text-teal-600">
                    {neetProgress.percentile}th percentile
                  </div>
                </div>
              </div>

              {/* Strong Areas & Weak Areas - Mobile Optimized */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
                <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
                    <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500 mr-2" />
                    Strong Areas
                  </h3>
                  <div className="space-y-3 sm:space-y-4">
                    {neetProgress.strongAreas.map((area, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 sm:p-4 bg-green-50 rounded-lg"
                      >
                        <div className="flex items-center min-w-0 flex-1">
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                          <span className="font-medium text-sm sm:text-base text-gray-900 truncate">
                            {area}
                          </span>
                        </div>
                        <span className="text-xs sm:text-sm text-green-600 font-semibold ml-2 flex-shrink-0">
                          85%+
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
                    <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500 mr-2" />
                    Areas for Improvement
                  </h3>
                  <div className="space-y-3 sm:space-y-4">
                    {neetProgress.weakAreas.slice(0, 3).map((area, index) => {
                      const longPressHandlers = useLongPress({
                        onLongPress: () => {
                          setSelectedWeakArea(area)
                          weakAreaSheet.open()
                        },
                        onClick: () => {
                          setSelectedWeakArea(area)
                          weakAreaSheet.open()
                        },
                        threshold: 500,
                      })

                      return (
                        <motion.div
                          key={index}
                          whileTap={{ scale: 0.98 }}
                          {...longPressHandlers}
                          className="p-3 sm:p-4 bg-orange-50 rounded-lg cursor-pointer hover:bg-orange-100 transition-colors active:bg-orange-200"
                          role="button"
                          tabIndex={0}
                          aria-label={`View details for ${area.chapter}`}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault()
                              setSelectedWeakArea(area)
                              weakAreaSheet.open()
                            }
                          }}
                        >
                          <div className="flex items-center justify-between mb-2 gap-2">
                            <span className="font-medium text-sm sm:text-base text-gray-900 truncate flex-1">
                              {area.chapter}
                            </span>
                            <span
                              className={`text-xs px-2 py-1 rounded flex-shrink-0 ${
                                area.difficulty === 'high'
                                  ? 'bg-red-100 text-red-600'
                                  : area.difficulty === 'medium'
                                    ? 'bg-yellow-100 text-yellow-600'
                                    : 'bg-green-100 text-green-600'
                              }`}
                            >
                              {area.difficulty}
                            </span>
                          </div>
                          <div className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-2">
                            {area.topic}
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <span className="text-xs text-gray-500">
                              Recommended: {area.recommendedStudyTime} min/day
                            </span>
                            <span className="text-blue-600 text-xs sm:text-sm font-medium">
                              Tap for details →
                            </span>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Recent Activity - Mobile Optimized */}
              <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
                  <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 mr-2" />
                  Recent Study Sessions
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  {recentSessions.map((session) => (
                    <div
                      key={session.id}
                      className="flex items-center justify-between p-3 sm:p-4 border border-gray-200 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors gap-3"
                    >
                      <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
                        <div
                          className={`p-1.5 sm:p-2 rounded-lg flex-shrink-0 ${
                            session.type === 'study'
                              ? 'bg-blue-100'
                              : session.type === 'practice'
                                ? 'bg-green-100'
                                : 'bg-navy-100'
                          }`}
                        >
                          {session.type === 'study' ? (
                            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                          ) : session.type === 'practice' ? (
                            <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                          ) : (
                            <Target className="w-4 h-4 sm:w-5 sm:h-5 text-navy-600" />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-sm sm:text-base text-gray-900 truncate">
                            {session.chapter}
                          </div>
                          <div className="text-xs sm:text-sm text-gray-600">
                            {session.duration} min • {session.type} •{' '}
                            <span className="hidden sm:inline">
                              {new Date(session.date).toLocaleDateString()}
                            </span>
                            <span className="sm:hidden">
                              {new Date(session.date).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                      {session.score && (
                        <div className="text-right flex-shrink-0">
                          <div className="text-base sm:text-lg font-bold text-gray-900">
                            {session.score}%
                          </div>
                          <div className="text-xs sm:text-sm text-gray-600">Score</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'study' && (
            <motion.div
              key="study"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4 sm:space-y-8"
            >
              {/* Study Timer - Mobile Optimized */}
              <div className="bg-gradient-to-r from-navy-600 to-teal-600 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-white">
                <div className="text-center">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
                    🎯 Focus Study Session
                  </h2>
                  <div className="text-4xl sm:text-6xl font-mono font-bold mb-4 sm:mb-6">
                    {formatTime(studyTimer)}
                  </div>
                  {currentSession && (
                    <div className="text-sm sm:text-base text-teal-200 mb-4 sm:mb-6 truncate px-4">
                      Studying: {currentSession}
                    </div>
                  )}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                    <button
                      onClick={() => startStudySession('Current Chapter')}
                      disabled={isStudying}
                      aria-label="Start study session"
                      className="flex items-center justify-center space-x-2 bg-white text-navy-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed touch-action-manipulation min-h-[48px] w-full sm:w-auto active:scale-95 transition-transform focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-navy-600"
                    >
                      <Play className="w-5 h-5" />
                      <span>Start</span>
                    </button>
                    <button
                      onClick={pauseStudySession}
                      disabled={!isStudying}
                      aria-label="Pause study session"
                      className="flex items-center justify-center space-x-2 bg-white text-navy-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed touch-action-manipulation min-h-[48px] w-full sm:w-auto active:scale-95 transition-transform focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-navy-600"
                    >
                      <Pause className="w-5 h-5" />
                      <span>Pause</span>
                    </button>
                    <button
                      onClick={stopStudySession}
                      aria-label="Reset study session"
                      className="flex items-center justify-center space-x-2 bg-white text-navy-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 touch-action-manipulation min-h-[48px] w-full sm:w-auto active:scale-95 transition-transform focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-navy-600"
                    >
                      <RotateCcw className="w-5 h-5" />
                      <span>Reset</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Study Options - Mobile Optimized */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {neetProgress.weakAreas.map((area, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg"
                  >
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2 truncate">
                      {area.chapter}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-2">
                      {area.topic}
                    </p>
                    <div className="flex items-center justify-between mb-3 sm:mb-4 gap-2">
                      <span className="text-xs sm:text-sm text-gray-500">
                        Recommended: {area.recommendedStudyTime} min
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded flex-shrink-0 ${
                          area.difficulty === 'high'
                            ? 'bg-red-100 text-red-600'
                            : area.difficulty === 'medium'
                              ? 'bg-yellow-100 text-yellow-600'
                              : 'bg-green-100 text-green-600'
                        }`}
                      >
                        {area.difficulty}
                      </span>
                    </div>
                    <button
                      onClick={() => startStudySession(area.chapter)}
                      aria-label={`Start study session for ${area.chapter}`}
                      className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm sm:text-base touch-action-manipulation min-h-[48px] active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Start Session
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <FloatingActionButton actions={defaultActions} />

      <BottomNavigation currentPath={pathname || '/dashboard'} />

      <BottomSheet
        isOpen={weakAreaSheet.isOpen}
        onClose={weakAreaSheet.close}
        title={selectedWeakArea?.chapter || 'Weak Area Details'}
        showHandle
      >
        {selectedWeakArea && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{selectedWeakArea.chapter}</h3>
                <p className="text-sm text-gray-600 mt-1">{selectedWeakArea.topic}</p>
              </div>
              <span
                className={`px-3 py-1.5 rounded-full text-sm font-semibold ${
                  selectedWeakArea.difficulty === 'high'
                    ? 'bg-red-100 text-red-700'
                    : selectedWeakArea.difficulty === 'medium'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-green-100 text-green-700'
                }`}
              >
                {selectedWeakArea.difficulty.toUpperCase()}
              </span>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <h4 className="font-semibold text-gray-900">Recommended Study Time</h4>
                </div>
                <p className="text-gray-700">
                  {selectedWeakArea.recommendedStudyTime} minutes per day
                </p>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-green-600" />
                  <h4 className="font-semibold text-gray-900">Action Items</h4>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Review fundamental concepts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Practice 10-15 questions daily</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Take weekly topic tests</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  startStudySession(selectedWeakArea.chapter)
                  weakAreaSheet.close()
                  setActiveTab('study')
                }}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-teal-600 to-navy-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all min-h-[48px] touch-action-manipulation active:scale-95"
              >
                <Play className="w-5 h-5" />
                <span>Start Now</span>
              </button>

              <button
                onClick={() => {
                  weakAreaSheet.close()
                  window.location.href = '/practice'
                }}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-teal-600 hover:text-teal-600 transition-all min-h-[48px] touch-action-manipulation active:scale-95"
              >
                <BookOpen className="w-5 h-5" />
                <span>Browse</span>
              </button>
            </div>
          </div>
        )}
      </BottomSheet>
    </div>
  )
}
