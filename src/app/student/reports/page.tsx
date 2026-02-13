/**
 * Student Reports Page
 * Comprehensive work tracking and progress reports
 */

'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  FileText,
  ClipboardCheck,
  BookOpen,
  Clock,
  AlertCircle,
  CheckCircle2,
  Calendar,
  Target,
  RefreshCw,
  MessageSquare,
  BarChart3,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { showToast } from '@/lib/toast'

interface DailyRecord {
  date: string
  assignments: { assigned: number; submitted: number; checked: number }
  tests: { assigned: number; attempted: number; checked: number }
  worksheets: { assigned: number; submitted: number; checked: number }
  classes: { scheduled: number; attended: number }
  studyMinutes: number
  remarks: string | null
  specialNotes: string | null
}

interface WorkTrackingData {
  summary: {
    period: { from: string; to: string; days: number }
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
  dailyData: DailyRecord[]
  recentRemarks: Array<{ date: string; remarks: string | null; specialNotes: string | null }>
  recordCount: number
}

export default function ReportsPage() {
  const [data, setData] = useState<WorkTrackingData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [period, setPeriod] = useState('7')
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    fetchData()
  }, [period])

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/student/work-tracking?period=${period}`)
      const result = await response.json()

      if (result.success) {
        setData(result.data)
      } else {
        showToast.error(result.error || 'Failed to fetch reports')
      }
    } catch (error) {
      console.error('Error fetching reports:', error)
      showToast.error('Failed to load report data')
    } finally {
      setIsLoading(false)
      setRefreshing(false)
    }
  }

  const handleRefresh = () => {
    setRefreshing(true)
    fetchData()
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  const getCompletionBadge = (rate: number) => {
    if (rate >= 80) {
      return (
        <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-700">
          Excellent
        </span>
      )
    }
    if (rate >= 60) {
      return (
        <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700">
          Good
        </span>
      )
    }
    return (
      <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-red-100 text-red-700">
        Needs Attention
      </span>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Work Tracking Reports</h1>
          <p className="text-gray-600">
            Track your assignments, tests, worksheets, and overall progress
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Period:</span>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="7">Last 7 days</option>
              <option value="14">Last 14 days</option>
              <option value="30">Last 30 days</option>
              <option value="60">Last 60 days</option>
              <option value="90">Last 90 days</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={refreshing}
              className="gap-2"
            >
              <RefreshCw className={cn('w-4 h-4', refreshing && 'animate-spin')} />
              Refresh
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-32 bg-gray-200 rounded-lg" />
              </div>
            ))}
          </div>
        ) : data ? (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <SummaryCard
                icon={<Target className="w-6 h-6" />}
                label="Overall Completion"
                value={`${data.summary.completionRates.overall}%`}
                badge={getCompletionBadge(data.summary.completionRates.overall)}
                color="bg-gradient-to-br from-blue-500 to-purple-600"
              />
              <SummaryCard
                icon={<AlertCircle className="w-6 h-6" />}
                label="Pending Tasks"
                value={data.summary.pending.total.toString()}
                subtext={`${data.summary.pending.assignments}A / ${data.summary.pending.tests}T / ${data.summary.pending.worksheets}W`}
                color={
                  data.summary.pending.total > 0
                    ? 'bg-gradient-to-br from-red-500 to-orange-600'
                    : 'bg-gradient-to-br from-green-500 to-teal-600'
                }
              />
              <SummaryCard
                icon={<Clock className="w-6 h-6" />}
                label="Study Hours"
                value={`${data.summary.studyHours}h`}
                subtext={`${Math.round((data.summary.studyHours / data.summary.period.days) * 10) / 10}h/day avg`}
                color="bg-gradient-to-br from-teal-500 to-cyan-600"
              />
              <SummaryCard
                icon={<Calendar className="w-6 h-6" />}
                label="Attendance Rate"
                value={`${data.summary.completionRates.attendance}%`}
                subtext={`${data.summary.totals.classesAttended}/${data.summary.totals.classesScheduled} classes`}
                color="bg-gradient-to-br from-green-500 to-emerald-600"
              />
            </div>

            {/* Detailed Progress */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Category Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    Category Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-5">
                    <CategoryProgress
                      icon={<FileText className="w-5 h-5 text-blue-600" />}
                      label="Assignments"
                      assigned={data.summary.totals.assignmentsAssigned}
                      submitted={data.summary.totals.assignmentsSubmitted}
                      checked={data.summary.totals.assignmentsChecked}
                      rate={data.summary.completionRates.assignments}
                    />
                    <CategoryProgress
                      icon={<ClipboardCheck className="w-5 h-5 text-green-600" />}
                      label="Tests"
                      assigned={data.summary.totals.testsAssigned}
                      submitted={data.summary.totals.testsAttempted}
                      checked={data.summary.totals.testsChecked}
                      rate={data.summary.completionRates.tests}
                      submittedLabel="Attempted"
                    />
                    <CategoryProgress
                      icon={<BookOpen className="w-5 h-5 text-purple-600" />}
                      label="Worksheets"
                      assigned={data.summary.totals.worksheetsAssigned}
                      submitted={data.summary.totals.worksheetsSubmitted}
                      checked={data.summary.totals.worksheetsChecked}
                      rate={data.summary.completionRates.worksheets}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Recent Remarks */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-orange-600" />
                    Teacher Remarks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {data.recentRemarks.length > 0 ? (
                    <div className="space-y-3">
                      {data.recentRemarks.map((remark, index) => (
                        <div
                          key={index}
                          className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                        >
                          <div className="text-xs text-gray-500 mb-1">
                            {formatDate(remark.date)}
                          </div>
                          {remark.remarks && (
                            <p className="text-sm text-gray-700">{remark.remarks}</p>
                          )}
                          {remark.specialNotes && (
                            <p className="text-sm text-orange-700 mt-1 flex items-start gap-1">
                              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                              {remark.specialNotes}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <MessageSquare className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                      <p className="text-gray-500 text-sm">No recent remarks</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Daily Records Table */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-indigo-600" />
                  Daily Records
                </CardTitle>
              </CardHeader>
              <CardContent>
                {data.dailyData.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-gray-50">
                          <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                          <th className="text-center py-3 px-4 font-medium text-gray-600">
                            Assignments
                          </th>
                          <th className="text-center py-3 px-4 font-medium text-gray-600">Tests</th>
                          <th className="text-center py-3 px-4 font-medium text-gray-600">
                            Worksheets
                          </th>
                          <th className="text-center py-3 px-4 font-medium text-gray-600">
                            Classes
                          </th>
                          <th className="text-center py-3 px-4 font-medium text-gray-600">
                            Study Time
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.dailyData.map((record, index) => (
                          <tr
                            key={record.date}
                            className="border-b hover:bg-gray-50"
                          >
                            <td className="py-3 px-4 font-medium">{formatDate(record.date)}</td>
                            <td className="py-3 px-4 text-center">
                              <ProgressPill
                                done={record.assignments.submitted}
                                total={record.assignments.assigned}
                              />
                            </td>
                            <td className="py-3 px-4 text-center">
                              <ProgressPill
                                done={record.tests.attempted}
                                total={record.tests.assigned}
                              />
                            </td>
                            <td className="py-3 px-4 text-center">
                              <ProgressPill
                                done={record.worksheets.submitted}
                                total={record.worksheets.assigned}
                              />
                            </td>
                            <td className="py-3 px-4 text-center">
                              <ProgressPill
                                done={record.classes.attended}
                                total={record.classes.scheduled}
                              />
                            </td>
                            <td className="py-3 px-4 text-center text-gray-600">
                              {Math.round((record.studyMinutes / 60) * 10) / 10}h
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No daily records for this period</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        ) : (
          <div className="text-center py-16">
            <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">No report data available</p>
          </div>
        )}
      </div>
    </div>
  )
}

function SummaryCard({
  icon,
  label,
  value,
  subtext,
  badge,
  color,
}: {
  icon: React.ReactNode
  label: string
  value: string
  subtext?: string
  badge?: React.ReactNode
  color: string
}) {
  return (
    <div
      className="bg-white rounded-xl shadow-lg overflow-hidden animate-fadeInUp"
    >
      <div className={cn('p-4 text-white', color)}>
        <div className="flex items-center justify-between">
          {icon}
          {badge}
        </div>
        <div className="mt-3">
          <div className="text-3xl font-bold">{value}</div>
          <div className="text-sm opacity-90">{label}</div>
        </div>
      </div>
      {subtext && <div className="px-4 py-2 bg-gray-50 text-xs text-gray-600">{subtext}</div>}
    </div>
  )
}

function CategoryProgress({
  icon,
  label,
  assigned,
  submitted,
  checked,
  rate,
  submittedLabel = 'Submitted',
}: {
  icon: React.ReactNode
  label: string
  assigned: number
  submitted: number
  checked: number
  rate: number
  submittedLabel?: string
}) {
  const getBarColor = (r: number) => {
    if (r >= 80) return 'bg-green-500'
    if (r >= 60) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 font-medium">
          {icon}
          <span>{label}</span>
        </div>
        <span
          className={cn(
            'text-sm font-semibold',
            rate >= 80 ? 'text-green-600' : rate >= 60 ? 'text-yellow-600' : 'text-red-600'
          )}
        >
          {rate}%
        </span>
      </div>
      <div className="h-3 bg-gray-100 rounded-full overflow-hidden mb-2">
        <div
          className={cn('h-full rounded-full', getBarColor(rate))}
        />
      </div>
      <div className="flex justify-between text-xs text-gray-500">
        <span>Assigned: {assigned}</span>
        <span>
          {submittedLabel}: {submitted}
        </span>
        <span>Checked: {checked}</span>
      </div>
    </div>
  )
}

function ProgressPill({ done, total }: { done: number; total: number }) {
  if (total === 0) {
    return <span className="text-gray-400">-</span>
  }

  const rate = Math.round((done / total) * 100)
  const isComplete = rate === 100

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium',
        isComplete
          ? 'bg-green-100 text-green-700'
          : rate >= 50
            ? 'bg-yellow-100 text-yellow-700'
            : 'bg-red-100 text-red-700'
      )}
    >
      {isComplete && <CheckCircle2 className="w-3 h-3" />}
      {done}/{total}
    </span>
  )
}
