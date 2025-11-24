/**
 * Attendance Statistics Widget Component
 * Displays comprehensive attendance statistics for students
 */

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  Calendar,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Award,
  Flame,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { showToast } from '@/lib/toast'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import type { AttendanceStatistics } from '@/types/attendance'

interface AttendanceStatisticsWidgetProps {
  className?: string
  courseId?: string
  enrollmentId?: string
}

export function AttendanceStatisticsWidget({
  className,
  courseId,
  enrollmentId,
}: AttendanceStatisticsWidgetProps) {
  const [statistics, setStatistics] = useState<AttendanceStatistics | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchStatistics()
  }, [courseId, enrollmentId])

  const fetchStatistics = async () => {
    try {
      setIsLoading(true)
      const params = new URLSearchParams()
      if (courseId) params.append('courseId', courseId)
      if (enrollmentId) params.append('enrollmentId', enrollmentId)

      const response = await fetch(`/api/student/attendance/statistics?${params}`)
      const data = await response.json()

      if (data.success) {
        setStatistics(data.data.statistics)
      } else {
        showToast.error(data.error || 'Failed to fetch attendance statistics')
      }
    } catch (error) {
      console.error('Error fetching attendance statistics:', error)
      showToast.error('Failed to load attendance statistics')
    } finally {
      setIsLoading(false)
    }
  }

  const getWarningMessage = (level: string) => {
    switch (level) {
      case 'high':
        return {
          message: 'Your attendance is critically low. Please attend classes regularly.',
          color: 'text-red-600 bg-red-50 border-red-200',
          icon: AlertTriangle,
        }
      case 'medium':
        return {
          message: 'Your attendance is below the minimum requirement. Please improve.',
          color: 'text-orange-600 bg-orange-50 border-orange-200',
          icon: AlertTriangle,
        }
      case 'low':
        return {
          message: 'Your attendance is close to the minimum requirement. Keep it up!',
          color: 'text-yellow-600 bg-yellow-50 border-yellow-200',
          icon: Clock,
        }
      default:
        return {
          message: 'Great job! Your attendance is excellent.',
          color: 'text-green-600 bg-green-50 border-green-200',
          icon: CheckCircle2,
        }
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving':
        return <TrendingUp className="w-4 h-4 text-green-600" />
      case 'declining':
        return <TrendingDown className="w-4 h-4 text-red-600" />
      default:
        return <Minus className="w-4 h-4 text-gray-600" />
    }
  }

  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Attendance Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-16 bg-gray-200 rounded-lg"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!statistics) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Attendance Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 text-sm">No attendance data available</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const warning = getWarningMessage(statistics.warningLevel)
  const WarningIcon = warning.icon

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Attendance Statistics
          </CardTitle>
          <Link href="/student/attendance">
            <Button variant="ghost" size="sm">
              View Details
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Main Attendance Percentage */}
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-200">
            <div className="text-4xl font-bold text-blue-600 mb-1">
              {statistics.attendancePercentage}%
            </div>
            <div className="text-sm text-gray-600 flex items-center justify-center gap-2">
              <span>Overall Attendance</span>
              {getTrendIcon(statistics.recentTrend)}
            </div>
          </div>

          {/* Warning/Success Message */}
          <div className={cn('p-4 rounded-lg border flex items-start gap-3', warning.color)}>
            <WarningIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p className="text-sm font-medium">{warning.message}</p>
          </div>

          {/* Key Statistics */}
          <div className="grid grid-cols-2 gap-3">
            <StatCard
              label="Total Sessions"
              value={statistics.totalSessions}
              icon={<Calendar className="w-4 h-4" />}
              color="bg-blue-50 text-blue-600"
            />
            <StatCard
              label="Attended"
              value={statistics.attendedSessions}
              icon={<CheckCircle2 className="w-4 h-4" />}
              color="bg-green-50 text-green-600"
            />
            <StatCard
              label="Late Arrivals"
              value={statistics.lateSessions}
              icon={<Clock className="w-4 h-4" />}
              color="bg-orange-50 text-orange-600"
            />
            <StatCard
              label="Current Streak"
              value={`${statistics.currentStreak} days`}
              icon={<Flame className="w-4 h-4" />}
              color="bg-purple-50 text-purple-600"
            />
          </div>

          {/* Additional Metrics */}
          <div className="pt-4 border-t space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">On-Time Rate:</span>
              <span className="font-semibold text-gray-900">{statistics.onTimePercentage}%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Total Hours Attended:</span>
              <span className="font-semibold text-gray-900">{statistics.totalHoursAttended}h</span>
            </div>
            {statistics.averageParticipationScore && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Avg. Participation:</span>
                <span className="font-semibold text-gray-900">
                  {statistics.averageParticipationScore}/10
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function StatCard({
  label,
  value,
  icon,
  color,
}: {
  label: string
  value: string | number
  icon: React.ReactNode
  color: string
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="p-3 bg-white rounded-lg border hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-2 mb-1">
        <div className={cn('p-1.5 rounded', color)}>{icon}</div>
      </div>
      <div className="text-xl font-bold text-gray-900">{value}</div>
      <div className="text-xs text-gray-600">{label}</div>
    </motion.div>
  )
}
