/**
 * Student Attendance Page
 * Main page for viewing attendance records, statistics, and upcoming sessions
 */

'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { AttendanceStatusBadge } from '@/components/student/AttendanceStatusBadge'
import { AttendanceStatisticsWidget } from '@/components/student/AttendanceStatisticsWidget'
import { UpcomingSessionsWidget } from '@/components/student/UpcomingSessionsWidget'
import {
  Calendar,
  Clock,
  Filter,
  X,
  Download,
  BookOpen,
  MapPin,
  User,
  TrendingUp,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { showToast } from '@/lib/toast'
import { cn } from '@/lib/utils'
import type { StudentAttendance, AttendanceFilter } from '@/types/attendance'

export default function AttendancePage() {
  const [attendance, setAttendance] = useState<StudentAttendance[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)

  const [filters, setFilters] = useState<AttendanceFilter>({
    status: 'ALL',
    sessionType: 'ALL',
  })

  useEffect(() => {
    fetchAttendance()
  }, [filters])

  const fetchAttendance = async () => {
    try {
      setIsLoading(true)
      const params = new URLSearchParams()
      if (filters.status && filters.status !== 'ALL') params.append('status', filters.status)
      if (filters.sessionType && filters.sessionType !== 'ALL')
        params.append('sessionType', filters.sessionType)
      if (filters.dateFrom) params.append('dateFrom', filters.dateFrom.toString())
      if (filters.dateTo) params.append('dateTo', filters.dateTo.toString())
      if (filters.courseId) params.append('courseId', filters.courseId)

      const response = await fetch(`/api/student/attendance?${params}`)
      const data = await response.json()

      if (data.success) {
        setAttendance(data.data.attendance)
      } else {
        showToast.error(data.error || 'Failed to fetch attendance')
      }
    } catch (error) {
      console.error('Error fetching attendance:', error)
      showToast.error('Failed to load attendance records')
    } finally {
      setIsLoading(false)
    }
  }

  const handleFilterChange = (key: keyof AttendanceFilter, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      status: 'ALL',
      sessionType: 'ALL',
    })
  }

  const hasActiveFilters =
    filters.status !== 'ALL' ||
    filters.sessionType !== 'ALL' ||
    filters.dateFrom ||
    filters.dateTo ||
    filters.courseId

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const formatTime = (time: Date | string) => {
    return new Date(time).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Attendance Tracking</h1>
          <p className="text-gray-600">
            View your attendance records, statistics, and upcoming class sessions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <AttendanceStatisticsWidget />
          </div>
          <div>
            <UpcomingSessionsWidget showViewAll={false} />
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Attendance Records
              </CardTitle>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="gap-2"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                  {hasActiveFilters && (
                    <span className="ml-1 px-1.5 py-0.5 bg-blue-100 text-blue-700 text-xs font-bold rounded">
                      Active
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </CardHeader>

          {showFilters && (
            <div className="px-6 pb-4">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Filters</h3>
                  {hasActiveFilters && (
                    <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1">
                      <X className="w-4 h-4" />
                      Clear All
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={filters.status}
                      onChange={(e) => handleFilterChange('status', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="ALL">All Statuses</option>
                      <option value="PRESENT">Present</option>
                      <option value="ABSENT">Absent</option>
                      <option value="LATE">Late</option>
                      <option value="EXCUSED">Excused</option>
                      <option value="HALF_DAY">Half Day</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Session Type
                    </label>
                    <select
                      value={filters.sessionType}
                      onChange={(e) => handleFilterChange('sessionType', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="ALL">All Types</option>
                      <option value="REGULAR">Regular Class</option>
                      <option value="DOUBT_CLEARING">Doubt Clearing</option>
                      <option value="REVISION">Revision</option>
                      <option value="TEST">Test</option>
                      <option value="PRACTICAL">Practical</option>
                      <option value="WORKSHOP">Workshop</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-24 bg-gray-200 rounded-lg"></div>
                  </div>
                ))}
              </div>
            ) : attendance.length > 0 ? (
              <div className="space-y-3">
                {attendance.map((record, index) => (
                  <motion.div
                    key={record.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Card className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-900">
                                  {record.session?.title}
                                </h4>
                                {record.session?.course && (
                                  <p className="text-sm text-gray-600">
                                    {record.session.course.name}
                                  </p>
                                )}
                              </div>
                              <AttendanceStatusBadge status={record.status} />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{formatDate(record.markedAt)}</span>
                              </div>
                              {record.checkInTime && (
                                <div className="flex items-center gap-2">
                                  <Clock className="w-4 h-4" />
                                  <span>{formatTime(record.checkInTime)}</span>
                                  {record.isLate && record.lateBy && (
                                    <span className="text-xs text-orange-600 font-medium">
                                      ({record.lateBy} min late)
                                    </span>
                                  )}
                                </div>
                              )}
                              {record.session?.topic && (
                                <div className="flex items-center gap-2">
                                  <BookOpen className="w-4 h-4" />
                                  <span className="truncate">{record.session.topic}</span>
                                </div>
                              )}
                              {record.session?.location && (
                                <div className="flex items-center gap-2">
                                  <MapPin className="w-4 h-4" />
                                  <span>{record.session.location}</span>
                                </div>
                              )}
                            </div>

                            {record.notes && (
                              <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
                                <strong>Note:</strong> {record.notes}
                              </div>
                            )}
                          </div>

                          {record.participationScore !== null && (
                            <div className="text-center md:border-l md:pl-4">
                              <div className="text-xs text-gray-600 mb-1">Participation</div>
                              <div className="text-2xl font-bold text-blue-600">
                                {record.participationScore}
                                <span className="text-sm text-gray-600">/10</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  {hasActiveFilters
                    ? 'No attendance records match your filters'
                    : 'No attendance records found'}
                </p>
                {hasActiveFilters && (
                  <Button variant="outline" size="sm" onClick={clearFilters} className="mt-4">
                    Clear Filters
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
