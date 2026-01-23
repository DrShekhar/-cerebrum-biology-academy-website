'use client'

// Force dynamic rendering to prevent auth issues during static build
export const dynamic = 'force-dynamic'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  BookOpen,
  TrendingUp,
  Target,
  Clock,
  Brain,
  BarChart3,
  MessageCircle,
  Video,
  Bell,
  ArrowUp,
  ArrowDown,
  FileText,
  Trophy,
  Activity,
  Flame,
  Lock,
  Crown,
} from 'lucide-react'
import { useUserFlow } from '@/hooks/useUserFlow'
import { UpgradeModal } from '@/components/UpgradeModal'
import {
  CoachingTrialBanner,
  useCoachingTrialStatus,
} from '@/components/trial/CoachingTrialBanner'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface QuickStat {
  label: string
  value: string | number
  icon: React.ReactNode
  trend?: number
  color: string
}

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
  const { user, isAuthenticated, isLoading: authLoading, isPaidUser, isGuestUser, freeUserId: userFlowFreeUserId } = useUserFlow()
  const { trialStatus: coachingTrialStatus, isLoading: trialLoading } = useCoachingTrialStatus()
  const [isLoading, setIsLoading] = useState(true)
  const [freeUserId, setFreeUserId] = useState<string | null>(null)
  const [testAttempts, setTestAttempts] = useState<TestAttempt[]>([])
  const [quickStats, setQuickStats] = useState<QuickStat[]>([])
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([])
  const [currentDate, setCurrentDate] = useState(new Date())
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)

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
        const userId = user?.id || freeUserId
        if (!userId) return

        // Fetch test attempts
        const attemptsResponse = await fetch(`/api/test-attempts?freeUserId=${userId}`)
        const attemptsData = await attemptsResponse.json()

        if (attemptsData.success && attemptsData.data.attempts.length > 0) {
          const attempts = attemptsData.data.attempts

          // Limit data for guest users (only last 5 tests)
          const displayAttempts = isGuestUser ? attempts.slice(0, 5) : attempts
          setTestAttempts(displayAttempts.slice(0, 5))

          // Calculate statistics
          const totalTests = attempts.length
          const scores = attempts.map((a: TestAttempt) => a.percentage)
          const avgScore = Math.round(
            scores.reduce((a: number, b: number) => a + b, 0) / scores.length
          )

          // Calculate study streak (simplified)
          const dates = attempts.map((a: TestAttempt) => new Date(a.createdAt).toDateString())
          const uniqueDates = new Set(dates)
          const studyStreak = uniqueDates.size

          // Calculate time until next class (mock data)
          const nextClassHours = 3

          // Build quick stats
          const stats: QuickStat[] = [
            {
              label: 'Tests Completed',
              value: totalTests,
              icon: <Target className="w-5 h-5" />,
              color: 'text-blue-600 bg-blue-50',
              trend: totalTests > 0 ? 10 : 0,
            },
            {
              label: 'Average Score',
              value: `${avgScore}%`,
              icon: <Trophy className="w-5 h-5" />,
              color: 'text-green-600 bg-green-50',
              trend: avgScore >= 75 ? 5 : -3,
            },
            {
              label: 'Study Streak',
              value: `${studyStreak} days`,
              icon: <Flame className="w-5 h-5" />,
              color: 'text-orange-600 bg-orange-50',
              trend: studyStreak > 0 ? 1 : 0,
            },
            {
              label: 'Next Class',
              value: `${nextClassHours}h`,
              icon: <Clock className="w-5 h-5" />,
              color: 'text-purple-600 bg-purple-50',
            },
          ]
          setQuickStats(stats)

          // Build recent activities
          const activities: RecentActivity[] = attempts.slice(0, 5).map((attempt: TestAttempt) => ({
            id: attempt.id,
            type: 'test',
            title: attempt.testTemplate.title,
            timestamp: attempt.createdAt,
            score: attempt.percentage,
            duration: Math.round(attempt.timeSpent / 60),
          }))
          setRecentActivities(activities)
        }

        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
        setIsLoading(false)
      }
    }

    if (user?.id || freeUserId) {
      fetchDashboardData()
    }
  }, [user?.id, freeUserId])

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
        <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-green-700 text-white py-3 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <Crown className="w-5 h-5" />
              <span className="font-medium">
                Sign up for free to save your progress and start your 7-day Pinnacle trial!
              </span>
            </div>
            <Button
              onClick={() => (window.location.href = '/enrollment')}
              variant="secondary"
              size="sm"
              className="bg-white text-blue-600 hover:bg-gray-100"
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
              <Button variant="outline" size="sm" className="hidden sm:flex">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
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
          {/* Quick Stats */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Stats</h2>
            {quickStats.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                            {stat.trend !== undefined && (
                              <div
                                className={cn(
                                  'flex items-center text-sm mt-2',
                                  stat.trend >= 0 ? 'text-green-600' : 'text-red-600'
                                )}
                              >
                                {stat.trend >= 0 ? (
                                  <ArrowUp className="w-3 h-3 mr-1" />
                                ) : (
                                  <ArrowDown className="w-3 h-3 mr-1" />
                                )}
                                <span>{Math.abs(stat.trend)}% from last week</span>
                              </div>
                            )}
                          </div>
                          <div className={cn('p-3 rounded-lg', stat.color)}>{stat.icon}</div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-6">
                  <EmptyState
                    icon={TrendingUp}
                    title="Your learning journey begins here"
                    description="Start taking tests and studying to track your progress. We'll show you detailed statistics and insights about your performance."
                    primaryAction={{
                      label: 'Start Learning',
                      href: '/mock-tests',
                    }}
                    size="md"
                    variant="info"
                  />
                </CardContent>
              </Card>
            )}
          </section>

          {/* Today's Focus & Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Today's Focus */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Today's Focus</h2>
              <div className="space-y-3">
                <FocusCard
                  icon={<BookOpen className="w-5 h-5 text-blue-600" />}
                  title="Recommended Study Topic"
                  description="Cell Structure and Function"
                  action="Start Learning"
                  href="/student/materials"
                  color="bg-blue-50"
                />
                <FocusCard
                  icon={<Target className="w-5 h-5 text-green-600" />}
                  title="Pending Test"
                  description="Chapter 5 Practice Test"
                  action="Take Test"
                  href="/mock-tests"
                  color="bg-green-50"
                />
                <FocusCard
                  icon={<Brain className="w-5 h-5 text-purple-600" />}
                  title="Practice Questions"
                  description="50 new questions available"
                  action="Practice Now"
                  href="/tests"
                  color="bg-purple-50"
                />
              </div>
            </section>

            {/* Performance Snapshot */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Performance Snapshot</h2>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">7-Day Progress</span>
                      <span className="text-sm font-medium text-green-600">+12%</span>
                    </div>

                    {/* Simple bar chart visualization */}
                    <div className="space-y-2">
                      {[85, 72, 90, 78, 88, 92, 95].map((score, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <span className="text-xs text-gray-500 w-8">Day {index + 1}</span>
                          <div className="flex-1 bg-gray-100 rounded-full h-2">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${score}%` }}
                              transition={{ duration: 0.8, delay: index * 0.1 }}
                              className={cn(
                                'h-2 rounded-full',
                                score >= 90
                                  ? 'bg-green-600'
                                  : score >= 75
                                    ? 'bg-blue-500'
                                    : 'bg-orange-500'
                              )}
                            />
                          </div>
                          <span className="text-xs font-medium text-gray-700 w-10">{score}%</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Strong Areas:</span>
                        <span className="font-medium text-gray-900">Genetics, Cell Biology</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Focus Areas:</span>
                        <span className="font-medium text-orange-600">Ecology, Evolution</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>

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
                icon={<MessageCircle className="w-6 h-6" />}
                title="Ask a Doubt"
                description="Get expert help"
                href="/student/doubts"
                color="bg-green-600"
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
                color="bg-green-600"
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
                      href: '/student/materials',
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

function FocusCard({
  icon,
  title,
  description,
  action,
  href,
  color,
}: {
  icon: React.ReactNode
  title: string
  description: string
  action: string
  href: string
  color: string
}) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <div className={cn('p-2 rounded-lg', color)}>{icon}</div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-sm">{title}</h3>
              <p className="text-sm text-gray-600 mt-0.5">{description}</p>
            </div>
          </div>
          <Link href={href}>
            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
              {action} →
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

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
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="h-full">
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
      </motion.div>
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
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="h-full cursor-pointer"
      onClick={onClick}
    >
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
        <div className="absolute inset-0 bg-indigo-100 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="text-sm font-semibold text-gray-900 bg-white px-4 py-2 rounded-lg shadow-lg">
            Click to Upgrade
          </span>
        </div>
      </Card>
    </motion.div>
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
