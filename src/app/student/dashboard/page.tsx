'use client'

import React, { useState, useEffect } from 'react'
import {
  BookOpen,
  Target,
  Brain,
  BarChart3,
  MessageCircle,
  Video,
  GraduationCap,
  MonitorCheck,
  Layers,
  FileText,
  Activity,
  Lock,
  Crown,
} from 'lucide-react'
import { useUserFlow } from '@/hooks/useUserFlow'
import { UpgradeModal } from '@/components/UpgradeModal'
import { CoachingTrialBanner, useCoachingTrialStatus } from '@/components/trial/CoachingTrialBanner'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { PaymentReminderCard } from '@/components/payments/PaymentReminderCard'
import { DashboardHero, MasteryGrid } from '@/components/student/DashboardHero'
import { NextClassCard } from '@/components/student/NextClassCard'
import { AttendanceRing } from '@/components/student/AttendanceRing'
import { LibraryStrip } from '@/components/student/LibraryStrip'
import { StudyToolsSection } from '@/components/student/StudyToolsSection'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface TestAttempt {
  id: string
  testTemplate: {
    title: string
    type: string
  }
  score: number
  percentage: number
  timeSpent: number
  createdAt: string
  strengthAreas?: string[] | null
  weaknessAreas?: string[] | null
}

interface RecentActivity {
  id: string
  type: 'test' | 'study' | 'material' | 'class'
  title: string
  timestamp: string
  score?: number
  duration?: number
}

export default function StudentDashboard() {
  const {
    user,
    isAuthenticated,
    isLoading: authLoading,
    isPaidUser,
    isGuestUser,
    freeUserId: userFlowFreeUserId,
  } = useUserFlow()
  const { trialStatus: coachingTrialStatus, isLoading: trialLoading } = useCoachingTrialStatus()
  const [isLoading, setIsLoading] = useState(true)
  const [freeUserId, setFreeUserId] = useState<string | null>(null)
  const [allAttempts, setAllAttempts] = useState<TestAttempt[]>([])
  const [streak, setStreak] = useState(0)
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([])
  const [currentDate, setCurrentDate] = useState(new Date())
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [loadError, setLoadError] = useState(false)
  const [reloadKey, setReloadKey] = useState(0)

  const motivationalQuotes = [
    'Success is the sum of small efforts repeated day in and day out.',
    'The expert in anything was once a beginner.',
    "Don't watch the clock; do what it does. Keep going.",
    'The future depends on what you do today.',
    "Believe you can and you're halfway there.",
  ]
  const [quote] = useState(
    motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]
  )

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

  // Fetch dashboard data
  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setIsLoading(true)
        setLoadError(false)
        const userId = user?.id || freeUserId
        if (!userId) {
          setIsLoading(false)
          return
        }

        // Fetch test attempts
        const attemptsResponse = await fetch(`/api/test-attempts?freeUserId=${userId}`)
        const attemptsData = await attemptsResponse.json()

        if (attemptsData.success && attemptsData.data.attempts.length > 0) {
          const attempts = attemptsData.data.attempts

          // Limit data for guest users (only last 5 tests)
          const displayAttempts = isGuestUser ? attempts.slice(0, 5) : attempts
          setAllAttempts(displayAttempts)

          // Study streak = consecutive days with at least one attempt, counted
          // back from today (or yesterday, so a streak isn't "broken" before
          // the student has had today to practice).
          const dayKeys = new Set(
            attempts.map((a: TestAttempt) => new Date(a.createdAt).toDateString())
          )
          let studyStreak = 0
          const cursor = new Date()
          if (!dayKeys.has(cursor.toDateString())) cursor.setDate(cursor.getDate() - 1)
          while (dayKeys.has(cursor.toDateString())) {
            studyStreak++
            cursor.setDate(cursor.getDate() - 1)
          }
          setStreak(studyStreak)

          // Build recent activities
          const activities: RecentActivity[] = attempts.slice(0, 5).map((attempt: TestAttempt) => ({
            id: attempt.id,
            type: 'test',
            title: attempt.testTemplate?.title || 'Practice Test',
            timestamp: attempt.createdAt,
            score: attempt.percentage,
            duration: Math.round(attempt.timeSpent / 60),
          }))
          setRecentActivities(activities)
        }

        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
        setLoadError(true)
        setIsLoading(false)
      }
    }

    if (user?.id || freeUserId) {
      fetchDashboardData()
    }
  }, [user?.id, freeUserId, reloadKey])

  // Update current date every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  if (authLoading || isLoading) {
    return <LoadingSkeleton />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Upgrade Modal */}
      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        feature="Premium Features"
      />

      {/* Coaching Trial Banner (for authenticated FREE tier users) */}
      {isAuthenticated && coachingTrialStatus && (
        <CoachingTrialBanner
          trialStatus={coachingTrialStatus}
          onUpgradeClick={() => setShowUpgradeModal(true)}
        />
      )}

      {/* Upgrade Banner (for guest users only) */}
      {isGuestUser && (
        <div className="bg-gradient-to-r from-green-700 to-green-600 text-white py-3 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <Crown className="w-5 h-5" />
              <span className="font-medium">
                Sign up for free to save your progress and start your 7-day Pinnacle trial!
              </span>
            </div>
            <Button
              onClick={() =>
                window.open(
                  'https://wa.me/918826444334?text=Hi!%20I%20want%20to%20enroll.%20Please%20share%20details.',
                  '_blank'
                )
              }
              variant="secondary"
              size="sm"
              className="bg-white text-green-700 hover:bg-gray-100"
            >
              Sign Up Free
            </Button>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Welcome back, {user?.name || 'Student'}! 👋
              </h1>
              <p className="text-gray-600 mt-1">
                {currentDate.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {isPaidUser ? (
                <Link href="/dashboard/student">
                  <Button variant="primary" size="sm">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Full Analytics
                  </Button>
                </Link>
              ) : (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setShowUpgradeModal(true)}
                  className="relative"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Full Analytics
                  <span className="ml-2 px-2 py-0.5 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full">
                    PRO
                  </span>
                </Button>
              )}
            </div>
          </div>

          {/* Motivational Quote */}
          <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
            <p className="text-sm text-gray-700 italic flex items-start">
              <Brain className="w-4 h-4 mr-2 mt-0.5 text-green-600 flex-shrink-0" />
              <span>{quote}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {loadError && (
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-orange-200 bg-orange-50 p-4">
              <p className="text-sm text-orange-800">
                We couldn&apos;t load your latest progress. Your data is safe — please try again.
              </p>
              <Button variant="outline" size="sm" onClick={() => setReloadKey((k) => k + 1)}>
                Retry
              </Button>
            </div>
          )}
          {/* Payment reminder — surfaces next/overdue installment */}
          <PaymentReminderCard mode="student" />
          {/* Need help? — raise a support/fees/tech/feature request */}
          <Link
            href="/student/requests"
            className="flex items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white p-4 hover:border-blue-300 hover:shadow-sm transition-colors"
          >
            <span className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-100 text-blue-600 text-lg">
                🎫
              </span>
              <span>
                <span className="block text-sm font-semibold text-gray-900">
                  Need help or have an idea?
                </span>
                <span className="block text-xs text-gray-500">
                  Raise a request — support, fees, a bug, or a feature
                </span>
              </span>
            </span>
            <span className="text-sm font-semibold text-blue-600">Raise a request →</span>
          </Link>
          {/* P1 hero — score ring, trajectory, today's plan (all real data) */}
          <DashboardHero
            attempts={allAttempts}
            streak={streak}
            userId={user?.id || freeUserId}
            isGuest={isGuestUser}
          />

          {/* Next class + attendance — real class_sessions / attendance data */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <NextClassCard />
            <AttendanceRing />
          </div>

          {/* Chapter mastery from real strengths/weak areas */}
          <MasteryGrid attempts={allAttempts} />

          {allAttempts.length > 0 && (
            <div className="-mt-4 flex items-center justify-end gap-4">
              <Link
                href="/student/syllabus"
                className="text-sm font-semibold text-green-700 hover:text-green-800"
              >
                View full mastery map →
              </Link>
              <Link
                href="/student/gradebook"
                className="text-sm font-semibold text-green-700 hover:text-green-800"
              >
                View full gradebook →
              </Link>
            </div>
          )}

          {/* Your library — recorded classes + recent study materials */}
          <LibraryStrip />

          {/* Study tools — timer, goals, schedule (folded from the retired /dashboard) */}
          <StudyToolsSection attempts={allAttempts} studyStreak={streak} />

          {/* Quick Actions */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <ActionButton
                icon={<Target className="w-6 h-6" />}
                title="Take Practice Test"
                description="Start a new test"
                href="/mock-tests"
                color="from-blue-500 to-blue-600"
              />
              <ActionButton
                icon={<GraduationCap className="w-6 h-6" />}
                title="My Courses"
                description="Continue learning"
                href="/student/courses"
                color="from-green-600 to-green-700"
              />
              <ActionButton
                icon={<Video className="w-6 h-6" />}
                title="Video Library"
                description="Free Biology lectures"
                href="/student/videos"
                color="from-teal-500 to-teal-600"
              />
              <ActionButton
                icon={<MessageCircle className="w-6 h-6" />}
                title="Ask a Doubt"
                description="Get expert help"
                href="/student/doubts"
                color="from-green-500 to-green-600"
              />
              {isPaidUser ? (
                <ActionButton
                  icon={<Brain className="w-6 h-6" />}
                  title="Ask AI Tutor"
                  description="Get instant help"
                  href="/student/ai-tutor"
                  color="from-purple-500 to-purple-600"
                />
              ) : (
                <LockedActionButton
                  icon={<Brain className="w-6 h-6" />}
                  title="Ask AI Tutor"
                  description="Get instant help"
                  color="from-purple-500 to-purple-600"
                  onClick={() => setShowUpgradeModal(true)}
                />
              )}
              <ActionButton
                icon={<FileText className="w-6 h-6" />}
                title="Browse Materials"
                description="Study resources"
                href="/student/materials"
                color="from-blue-600 to-blue-700"
              />
              <ActionButton
                icon={<MonitorCheck className="w-6 h-6" />}
                title="NEET Simulator"
                description="Full exam experience"
                href="/cbt"
                color="from-green-700 to-green-800"
              />
              <ActionButton
                icon={<Layers className="w-6 h-6" />}
                title="Flashcards"
                description="Smart daily revision"
                href="/flashcards"
                color="from-purple-600 to-purple-700"
              />
              {isPaidUser ? (
                <ActionButton
                  icon={<BarChart3 className="w-6 h-6" />}
                  title="View Analytics"
                  description="Track progress"
                  href="/dashboard/student"
                  color="from-orange-500 to-orange-600"
                />
              ) : (
                <LockedActionButton
                  icon={<BarChart3 className="w-6 h-6" />}
                  title="View Analytics"
                  description="Track progress"
                  color="from-orange-500 to-orange-600"
                  onClick={() => setShowUpgradeModal(true)}
                />
              )}
            </div>
          </section>

          {/* Recent Activity Feed */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
            <Card>
              <CardContent className="p-6">
                {recentActivities.length > 0 ? (
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <ActivityItem key={activity.id} activity={activity} />
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    icon={BookOpen}
                    title="Ready to start your NEET journey?"
                    description="Take your first practice test to see where you stand. Our AI will analyze your performance and create a personalized learning path just for you."
                    primaryAction={{
                      label: 'Take Your First Test',
                      href: '/mock-tests',
                    }}
                    secondaryAction={{
                      label: 'Explore Topics',
                      href: '/student/dashboard',
                    }}
                    size="lg"
                    variant="default"
                  />
                )}
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  )
}

// Helper Components

function ActionButton({
  icon,
  title,
  description,
  href,
  color,
}: {
  icon: React.ReactNode
  title: string
  description: string
  href: string
  color: string
}) {
  return (
    <Link href={href}>
      <div className="h-full animate-fadeInUp">
        <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div
              className={cn(
                'w-12 h-12 rounded-lg bg-gradient-to-br flex items-center justify-center text-white mb-4',
                color
              )}
            >
              {icon}
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </CardContent>
        </Card>
      </div>
    </Link>
  )
}

function LockedActionButton({
  icon,
  title,
  description,
  color,
  onClick,
}: {
  icon: React.ReactNode
  title: string
  description: string
  color: string
  onClick: () => void
}) {
  return (
    <div className="h-full cursor-pointer animate-fadeInUp" onClick={onClick}>
      <Card className="h-full hover:shadow-lg transition-shadow relative overflow-hidden">
        <CardContent className="p-6 relative">
          {/* Lock Badge */}
          <div className="absolute top-2 right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-md z-10">
            <Lock className="w-4 h-4 text-yellow-900" />
          </div>

          <div
            className={cn(
              'w-12 h-12 rounded-lg bg-gradient-to-br flex items-center justify-center text-white mb-4 opacity-75',
              color
            )}
          >
            {icon}
          </div>
          <h3 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
            {title}
            <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs font-bold rounded">
              PRO
            </span>
          </h3>
          <p className="text-sm text-gray-600">{description}</p>
        </CardContent>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-green-100/90 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="text-sm font-semibold text-gray-900 bg-white px-4 py-2 rounded-lg shadow-lg">
            Click to Upgrade
          </span>
        </div>
      </Card>
    </div>
  )
}

function ActivityItem({ activity }: { activity: RecentActivity }) {
  const getIcon = () => {
    switch (activity.type) {
      case 'test':
        return <Target className="w-5 h-5 text-blue-600" />
      case 'study':
        return <BookOpen className="w-5 h-5 text-green-600" />
      case 'material':
        return <FileText className="w-5 h-5 text-purple-600" />
      case 'class':
        return <Video className="w-5 h-5 text-orange-600" />
      default:
        return <Activity className="w-5 h-5 text-gray-600" />
    }
  }

  const getTypeColor = () => {
    switch (activity.type) {
      case 'test':
        return 'bg-blue-50'
      case 'study':
        return 'bg-green-50'
      case 'material':
        return 'bg-purple-50'
      case 'class':
        return 'bg-orange-50'
      default:
        return 'bg-gray-50'
    }
  }

  const timeAgo = (timestamp: string) => {
    const now = new Date()
    const past = new Date(timestamp)
    const diffInMinutes = Math.floor((now.getTime() - past.getTime()) / 60000)

    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }

  return (
    <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
      <div className={cn('p-2 rounded-lg', getTypeColor())}>{getIcon()}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{activity.title}</p>
        <p className="text-xs text-gray-500">{timeAgo(activity.timestamp)}</p>
      </div>
      {activity.score !== undefined && (
        <div className="text-right">
          <p
            className={cn(
              'text-sm font-semibold',
              activity.score >= 90
                ? 'text-green-600'
                : activity.score >= 75
                  ? 'text-blue-600'
                  : activity.score >= 60
                    ? 'text-orange-600'
                    : 'text-red-600'
            )}
          >
            {activity.score}%
          </p>
          {activity.duration && <p className="text-xs text-gray-500">{activity.duration} min</p>}
        </div>
      )}
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="h-12 bg-gray-200 rounded mb-4"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
