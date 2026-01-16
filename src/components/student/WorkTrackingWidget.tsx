'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { motion } from 'framer-motion'
import {
  FileText,
  ClipboardCheck,
  BookOpen,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Calendar,
  Target,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { showToast } from '@/lib/toast'
import Link from 'next/link'

interface WorkTrackingSummary {
  period: {
    from: string
    to: string
    days: number
  }
  totals: {
    assignmentsAssigned: number
    assignmentsSubmitted: number
    assignmentsChecked: number
    testsAssigned: number
    testsAttempted: number
    testsChecked: number
    worksheetsAssigned: number
    worksheetsSubmitted: number
    worksheetsChecked: number
    classesScheduled: number
    classesAttended: number
    studyMinutes: number
  }
  completionRates: {
    assignments: number
    tests: number
    worksheets: number
    attendance: number
    overall: number
  }
  pending: {
    assignments: number
    tests: number
    worksheets: number
    total: number
  }
  studyHours: number
}

interface WorkTrackingWidgetProps {
  className?: string
  period?: string
  compact?: boolean
}

export function WorkTrackingWidget({ className, period = '7', compact = false }: WorkTrackingWidgetProps) {
  const [summary, setSummary] = useState<WorkTrackingSummary | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchWorkTracking()
  }, [period])

  const fetchWorkTracking = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/student/work-tracking?period=${period}`)
      const data = await response.json()

      if (data.success) {
        setSummary(data.data.summary)
      } else {
        showToast.error(data.error || 'Failed to fetch work tracking')
      }
    } catch (error) {
      console.error('Error fetching work tracking:', error)
      showToast.error('Failed to load work tracking data')
    } finally {
      setIsLoading(false)
    }
  }

  const getCompletionColor = (rate: number) => {
    if (rate >= 80) return 'text-green-600 bg-green-50'
    if (rate >= 60) return 'text-yellow-600 bg-yellow-50'
    return 'text-red-600 bg-red-50'
  }

  const getProgressBarColor = (rate: number) => {
    if (rate >= 80) return 'bg-green-500'
    if (rate >= 60) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Target className="w-5 h-5 text-blue-600" />
            Work Tracking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-12 bg-gray-200 rounded-lg" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!summary) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Target className="w-5 h-5 text-blue-600" />
            Work Tracking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <Target className="w-10 h-10 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-500 text-sm">No tracking data available</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Target className="w-5 h-5 text-blue-600" />
            Work Tracking
          </CardTitle>
          <Link href="/student/reports">
            <Button variant="ghost" size="sm">
              View Details
            </Button>
          </Link>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Last {summary.period.days} days
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Overall Completion Score */}
          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-100">
            <div className={cn(
              'text-3xl font-bold mb-1',
              summary.completionRates.overall >= 80 ? 'text-green-600' :
              summary.completionRates.overall >= 60 ? 'text-yellow-600' : 'text-red-600'
            )}>
              {summary.completionRates.overall}%
            </div>
            <div className="text-sm text-gray-600">Overall Completion</div>
          </div>

          {/* Pending Work Alert */}
          {summary.pending.total > 0 && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <span className="font-medium text-red-800">
                  {summary.pending.total} pending tasks
                </span>
                <div className="text-xs text-red-600 mt-0.5">
                  {summary.pending.assignments > 0 && `${summary.pending.assignments} assignments`}
                  {summary.pending.tests > 0 && ` • ${summary.pending.tests} tests`}
                  {summary.pending.worksheets > 0 && ` • ${summary.pending.worksheets} worksheets`}
                </div>
              </div>
            </div>
          )}

          {!compact && (
            <>
              {/* Category Progress */}
              <div className="space-y-3">
                <ProgressRow
                  icon={<FileText className="w-4 h-4" />}
                  label="Assignments"
                  completed={summary.totals.assignmentsSubmitted}
                  total={summary.totals.assignmentsAssigned}
                  rate={summary.completionRates.assignments}
                />
                <ProgressRow
                  icon={<ClipboardCheck className="w-4 h-4" />}
                  label="Tests"
                  completed={summary.totals.testsAttempted}
                  total={summary.totals.testsAssigned}
                  rate={summary.completionRates.tests}
                />
                <ProgressRow
                  icon={<BookOpen className="w-4 h-4" />}
                  label="Worksheets"
                  completed={summary.totals.worksheetsSubmitted}
                  total={summary.totals.worksheetsAssigned}
                  rate={summary.completionRates.worksheets}
                />
                <ProgressRow
                  icon={<Calendar className="w-4 h-4" />}
                  label="Attendance"
                  completed={summary.totals.classesAttended}
                  total={summary.totals.classesScheduled}
                  rate={summary.completionRates.attendance}
                />
              </div>

              {/* Study Hours */}
              <div className="pt-3 border-t">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    Study Hours
                  </span>
                  <span className="font-semibold text-gray-900">
                    {summary.studyHours}h
                  </span>
                </div>
              </div>
            </>
          )}

          {compact && (
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-500" />
                <span>{summary.completionRates.assignments}% Assignments</span>
              </div>
              <div className="flex items-center gap-2">
                <ClipboardCheck className="w-4 h-4 text-green-500" />
                <span>{summary.completionRates.tests}% Tests</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function ProgressRow({
  icon,
  label,
  completed,
  total,
  rate,
}: {
  icon: React.ReactNode
  label: string
  completed: number
  total: number
  rate: number
}) {
  const getBarColor = (r: number) => {
    if (r >= 80) return 'bg-green-500'
    if (r >= 60) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          {icon}
          <span>{label}</span>
        </div>
        <span className="text-xs text-gray-500">
          {completed}/{total} ({rate}%)
        </span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${rate}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={cn('h-full rounded-full', getBarColor(rate))}
        />
      </div>
    </div>
  )
}

export default WorkTrackingWidget
