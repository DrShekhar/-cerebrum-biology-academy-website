'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import { BookOpen, TrendingUp, Target, AlertTriangle, Calendar, BarChart3, Wrench, RefreshCw, XCircle } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useSwipeGesture, usePullToRefresh } from '@/hooks/useSwipeGesture'
import { FloatingActionButton, useDashboardFAB } from '@/components/mobile/FloatingActionButton'
import { BottomNavigation } from '@/components/mobile/MobileFullscreenMenu'
import { useBottomSheet } from '@/components/mobile/BottomSheet'
import { usePathname, useRouter } from 'next/navigation'
import { fetchWithRetry } from '@/lib/utils/fetchWithRetry'
import { useToast } from '@/components/ui/Toast'

// Import modular tab components
import {
  OverviewTab,
  StudySessionTab,
  ToolsHubTab,
  ProgressTab,
  WeakAreasTab,
  PracticeTab,
  ScheduleTab,
  WeakAreaBottomSheet,
  DashboardHeader,
  DashboardTabs,
  DashboardLoadingState,
  DashboardEmptyState,
  type WeakArea,
  type NEETProgress,
  type StudySession,
  type GamificationData,
  type Tab,
} from './tabs'

export function PersonalizedStudentDashboard() {
  const router = useRouter()
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

  const tabs: Tab[] = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'progress', label: 'Progress Tracking', icon: TrendingUp },
    { id: 'study', label: 'Study Session', icon: BookOpen },
    { id: 'tools', label: 'NEET Tools', icon: Wrench },
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
  const [gamificationData, setGamificationData] = useState<GamificationData | null>(null)

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
        if (!userId) {
          // No user ID available yet - stop loading and wait for auth to complete
          console.log('[Dashboard] No userId available, waiting for auth...')
          setIsLoading(false)
          return
        }

        // Parallel fetch for performance with retry logic
        const [attemptsResponse] = await Promise.allSettled([
          fetchWithRetry(`/api/test-attempts?freeUserId=${userId}`, {
            retryOptions: {
              maxRetries: 3,
              onRetry: (attempt) => {
                console.log(`Retrying attempts fetch (attempt ${attempt})`)
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
            const scores = attempts.map((a: { score: number }) => a.score)
            const avgScore = Math.round(
              scores.reduce((a: number, b: number) => a + b, 0) / scores.length
            )
            const latestScore = scores[0]
            const previousScore = scores.length > 1 ? scores[1] : latestScore
            const improvement = latestScore - previousScore

            // Collect all strength and weakness areas
            const allStrongAreas = new Set<string>()
            const allWeakAreas = new Map<string, { count: number; topics: Set<string> }>()

            attempts.forEach((attempt: { strengthAreas?: string[]; weaknessAreas?: string[] }) => {
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
            interface AttemptData {
              id: string
              score: number
              timeSpent: number
              createdAt: string
              rank?: number
              percentage?: number
              strengthAreas?: string[]
              weaknessAreas?: string[]
              testTemplate: {
                title: string
                type: string
              }
            }

            const transformedSessions = attempts.slice(0, 10).map((attempt: AttemptData) => ({
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
            })) as StudySession[]

            setRecentSessions(transformedSessions)
          }
        } else {
          console.error('Failed to fetch attempts:', attemptsResponse.reason)
          setError('Failed to load test history')
          showToast('error', 'Load Failed', 'Could not fetch your test history')
        }

        // Fetch gamification data
        const gamificationUserId = freeUserId || user?.id
        if (gamificationUserId) {
          try {
            const gamificationResponse = await fetchWithRetry(
              `/api/gamification?${freeUserId ? 'freeUserId' : 'userId'}=${gamificationUserId}`
            )
            if (gamificationResponse.ok) {
              const gamificationData = await gamificationResponse.json()
              setGamificationData(gamificationData)
            }
          } catch {
            console.error('Error fetching gamification data')
          }
        }

        setLastUpdated(new Date())
        setIsLoading(false)
        setIsRefreshing(false)

        if (!showLoadingState) {
          showToast('success', 'Refreshed', 'Dashboard data updated successfully')
        }
      } catch {
        console.error('Error fetching dashboard data')
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
  const { onTouchStart, onTouchMove, onTouchEnd } = pullToRefresh.handlers

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

  // Handle weak area selection
  const handleWeakAreaSelect = (area: WeakArea) => {
    setSelectedWeakArea(area)
    weakAreaSheet.open()
  }

  // Calculate derived stats
  const totalStudyTime = recentSessions.reduce((acc, session) => acc + session.duration, 0)
  const averageScore =
    recentSessions.length > 0
      ? Math.round(
          recentSessions.reduce((acc, session) => acc + (session.score || 0), 0) /
            recentSessions.length
        )
      : 0
  const testsCompleted = recentSessions.filter(
    (s) => s.type === 'test' || s.type === 'practice'
  ).length

  // Loading state
  if (isLoading) {
    return <DashboardLoadingState />
  }

  // Empty state
  if (recentSessions.length === 0 && !isLoading) {
    return <DashboardEmptyState userName={user?.name} />
  }

  return (
    <div
      ref={dashboardRef}
      className="min-h-screen bg-gradient-to-br from-navy-50 via-green-50 to-gold-50 pb-20 md:pb-0"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <DashboardHeader
        userName={user?.name}
        lastUpdated={getTimeSinceUpdate()}
        isRefreshing={isRefreshing}
        onRefresh={() => fetchDashboardData(false)}
      />

      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-3">
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
              <span className="text-sm text-red-700 truncate">{error}</span>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => fetchDashboardData(false)}
                className="flex items-center gap-1 px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 rounded-md text-xs font-medium transition-colors min-h-[32px]"
              >
                <RefreshCw className="w-3 h-3" />
                Retry
              </button>
              <button
                onClick={() => setError(null)}
                className="p-1 hover:bg-red-100 rounded text-red-400 transition-colors"
                aria-label="Dismiss error"
              >
                <XCircle className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      <DashboardTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onPrevious={goToPreviousTab}
        onNext={goToNextTab}
        swipeHandlers={swipeHandlers}
      />

      {/* Main Content */}
      <div role="tabpanel" aria-label={tabs.find(t => t.id === activeTab)?.label} className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <OverviewTab
              neetProgress={neetProgress}
              recentSessions={recentSessions}
              gamificationData={gamificationData}
              onWeakAreaSelect={handleWeakAreaSelect}
              totalStudyTime={totalStudyTime}
              averageScore={averageScore}
              testsCompleted={testsCompleted}
            />
          )}

          {activeTab === 'tools' && <ToolsHubTab />}

          {activeTab === 'progress' && (
            <ProgressTab
              neetProgress={neetProgress}
              recentSessions={recentSessions}
              gamificationData={gamificationData}
              totalStudyTime={totalStudyTime}
              averageScore={averageScore}
              testsCompleted={testsCompleted}
            />
          )}

          {activeTab === 'study' && (
            <StudySessionTab
              studyTimer={studyTimer}
              isStudying={isStudying}
              currentSession={currentSession}
              weakAreas={neetProgress.weakAreas}
              onStartSession={startStudySession}
              onPauseSession={pauseStudySession}
              onStopSession={stopStudySession}
              formatTime={formatTime}
            />
          )}

          {activeTab === 'weak-areas' && (
            <WeakAreasTab
              weakAreas={neetProgress.weakAreas}
              onStartStudy={(chapter) => {
                startStudySession(chapter)
                setActiveTab('study')
              }}
            />
          )}

          {activeTab === 'practice' && <PracticeTab />}

          {activeTab === 'schedule' && (
            <ScheduleTab
              weakAreas={neetProgress.weakAreas}
              studyStreak={gamificationData?.gamification?.studyStreak}
            />
          )}
        </AnimatePresence>
      </div>

      <FloatingActionButton actions={defaultActions} />

      <BottomNavigation currentPath={pathname || '/dashboard'} />

      <WeakAreaBottomSheet
        isOpen={weakAreaSheet.isOpen}
        onClose={weakAreaSheet.close}
        selectedWeakArea={selectedWeakArea}
        onStartStudy={(chapter) => {
          startStudySession(chapter)
          setActiveTab('study')
        }}
        onBrowse={() => {
          router.push('/practice')
        }}
      />
    </div>
  )
}
