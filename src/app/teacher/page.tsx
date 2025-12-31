'use client'

// Force dynamic rendering to prevent Clerk auth issues during static build
export const dynamic = 'force-dynamic'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import { useOwnerAccess } from '@/hooks/useOwnerAccess'
import Link from 'next/link'
import {
  FileText,
  Users,
  CheckCircle,
  Clock,
  Calendar,
  BarChart3,
  MessageCircle,
  BookOpen,
  TrendingUp,
  AlertCircle,
  Play,
  Bell,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

interface DashboardStats {
  totalAssignments: number
  pendingSubmissions: number
  upcomingClasses: number
  studentDoubts: number
  averageScore: number
  activeStudents: number
}

interface RecentActivity {
  id: string
  type: 'submission' | 'doubt' | 'class' | 'grade'
  title: string
  studentName?: string
  timestamp: string
}

interface UpcomingClass {
  id: string
  title: string
  batch: string
  time: string
  studentsCount: number
}

export default function TeacherDashboardPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth()
  const { isOwner, isCheckingOwner } = useOwnerAccess()
  const [stats, setStats] = useState<DashboardStats>({
    totalAssignments: 0,
    pendingSubmissions: 0,
    upcomingClasses: 0,
    studentDoubts: 0,
    averageScore: 0,
    activeStudents: 0,
  })
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([])
  const [upcomingClasses, setUpcomingClasses] = useState<UpcomingClass[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Allow access if owner OR teacher role
  const hasTeacherAccess = isOwner || (isAuthenticated && user?.role === 'TEACHER')

  useEffect(() => {
    if (!authLoading && !isCheckingOwner && !hasTeacherAccess) {
      window.location.href = '/auth/signin'
      return
    }
  }, [authLoading, isCheckingOwner, hasTeacherAccess])

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setIsLoading(true)
        const response = await fetch('/api/teacher/dashboard')
        const data = await response.json()

        if (response.ok && data.success) {
          setStats(data.stats)
          setRecentActivities(data.recentActivities || [])
          setUpcomingClasses(data.upcomingClasses || [])
        }
      } catch (error) {
        console.error('Error fetching teacher dashboard:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (hasTeacherAccess) {
      fetchDashboardData()
    }
  }, [hasTeacherAccess])

  if (authLoading || isCheckingOwner || isLoading) {
    return <LoadingSkeleton />
  }

  if (!hasTeacherAccess) {
    return null
  }

  const quickStats = [
    {
      label: 'Active Students',
      value: stats.activeStudents,
      icon: Users,
      color: 'text-blue-600 bg-blue-50',
      href: '/teacher/attendance',
    },
    {
      label: 'Pending Submissions',
      value: stats.pendingSubmissions,
      icon: FileText,
      color: 'text-orange-600 bg-orange-50',
      href: '/teacher/assignments',
    },
    {
      label: 'Student Doubts',
      value: stats.studentDoubts,
      icon: MessageCircle,
      color: 'text-purple-600 bg-purple-50',
      href: '/teacher/doubts',
    },
    {
      label: 'Average Score',
      value: `${stats.averageScore}%`,
      icon: TrendingUp,
      color: 'text-green-600 bg-green-50',
      href: '/teacher/analytics',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Welcome, {user?.name || 'Teacher'}!
              </h1>
              <p className="text-gray-600 mt-1">
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
              <Link href="/teacher/assignments/create">
                <Button variant="primary" size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  New Assignment
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Quick Stats */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link href={stat.href}>
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                          </div>
                          <div className={`p-3 rounded-lg ${stat.color}`}>
                            <stat.icon className="w-5 h-5" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Quick Actions & Upcoming Classes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Quick Actions */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                <QuickActionCard
                  icon={FileText}
                  title="Create Assignment"
                  description="New homework or test"
                  href="/teacher/assignments/create"
                  color="from-blue-500 to-blue-600"
                />
                <QuickActionCard
                  icon={Users}
                  title="Take Attendance"
                  description="Mark today's attendance"
                  href="/teacher/attendance"
                  color="bg-green-600"
                />
                <QuickActionCard
                  icon={MessageCircle}
                  title="Answer Doubts"
                  description={`${stats.studentDoubts} pending`}
                  href="/teacher/doubts"
                  color="from-purple-500 to-purple-600"
                />
                <QuickActionCard
                  icon={BookOpen}
                  title="Question Bank"
                  description="Manage questions"
                  href="/teacher/questions"
                  color="from-orange-500 to-orange-600"
                />
              </div>
            </section>

            {/* Upcoming Classes */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Today's Schedule</h2>
              <Card>
                <CardContent className="p-6">
                  {upcomingClasses.length > 0 ? (
                    <div className="space-y-4">
                      {upcomingClasses.map((cls) => (
                        <div
                          key={cls.id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                              <Play className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{cls.title}</p>
                              <p className="text-sm text-gray-600">
                                {cls.batch} • {cls.studentsCount} students
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-blue-600">{cls.time}</p>
                            <Link href={`/teacher/sessions/${cls.id}`}>
                              <Button variant="ghost" size="sm">
                                Start →
                              </Button>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-600">No classes scheduled for today</p>
                      <Link href="/teacher/sessions">
                        <Button variant="outline" size="sm" className="mt-3">
                          View Schedule
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </section>
          </div>

          {/* Recent Activity */}
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
                  <div className="text-center py-8">
                    <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-600">No recent activity</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </section>

          {/* Performance Summary */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">This Week's Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalAssignments}</p>
                  <p className="text-sm text-gray-600">Assignments Created</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{stats.activeStudents}</p>
                  <p className="text-sm text-gray-600">Students Taught</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <MessageCircle className="w-6 h-6 text-purple-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{stats.studentDoubts}</p>
                  <p className="text-sm text-gray-600">Doubts Resolved</p>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

function QuickActionCard({
  icon: Icon,
  title,
  description,
  href,
  color,
}: {
  icon: React.ElementType
  title: string
  description: string
  href: string
  color: string
}) {
  return (
    <Link href={href}>
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
          <CardContent className="p-6">
            <div
              className={`w-12 h-12 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center text-white mb-4`}
            >
              <Icon className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  )
}

function ActivityItem({ activity }: { activity: RecentActivity }) {
  const getIcon = () => {
    switch (activity.type) {
      case 'submission':
        return <FileText className="w-5 h-5 text-blue-600" />
      case 'doubt':
        return <MessageCircle className="w-5 h-5 text-purple-600" />
      case 'class':
        return <Play className="w-5 h-5 text-green-600" />
      case 'grade':
        return <CheckCircle className="w-5 h-5 text-orange-600" />
      default:
        return <Clock className="w-5 h-5 text-gray-600" />
    }
  }

  const getTypeColor = () => {
    switch (activity.type) {
      case 'submission':
        return 'bg-blue-50'
      case 'doubt':
        return 'bg-purple-50'
      case 'class':
        return 'bg-green-50'
      case 'grade':
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
      <div className={`p-2 rounded-lg ${getTypeColor()}`}>{getIcon()}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{activity.title}</p>
        {activity.studentName && <p className="text-xs text-gray-500">by {activity.studentName}</p>}
      </div>
      <p className="text-xs text-gray-500">{timeAgo(activity.timestamp)}</p>
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
