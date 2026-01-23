/**
 * Teacher Attendance Overview Page
 * View all sessions requiring attendance marking
 */

'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import {
  Calendar,
  Clock,
  Users,
  CheckCircle,
  AlertCircle,
  Search,
  UserCheck,
} from 'lucide-react'
import { showToast } from '@/lib/toast'
import { cn } from '@/lib/utils'
import type { ClassSession } from '@/types/attendance'

export default function TeacherAttendancePage() {
  const router = useRouter()
  const [sessions, setSessions] = useState<ClassSession[]>([])
  const [filteredSessions, setFilteredSessions] = useState<ClassSession[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState({
    status: 'ALL',
    markedStatus: 'ALL',
    searchQuery: '',
  })

  useEffect(() => {
    fetchSessions()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [sessions, filters])

  const fetchSessions = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/teacher/sessions')
      const data = await response.json()

      if (data.success) {
        setSessions(data.data.sessions || [])
      } else {
        showToast.error(data.error || 'Failed to fetch sessions')
      }
    } catch (error) {
      console.error('Error fetching sessions:', error)
      showToast.error('Failed to fetch sessions')
    } finally {
      setIsLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = [...sessions]

    if (filters.status !== 'ALL') {
      filtered = filtered.filter((s) => s.status === filters.status)
    }

    if (filters.markedStatus === 'MARKED') {
      filtered = filtered.filter((s) => s.attendanceMarked)
    } else if (filters.markedStatus === 'UNMARKED') {
      filtered = filtered.filter((s) => !s.attendanceMarked)
    }

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      filtered = filtered.filter(
        (s) =>
          s.title.toLowerCase().includes(query) ||
          s.course?.name.toLowerCase().includes(query) ||
          s.topic?.toLowerCase().includes(query)
      )
    }

    const sortedByDate = filtered.sort(
      (a, b) => new Date(b.scheduledDate).getTime() - new Date(a.scheduledDate).getTime()
    )

    setFilteredSessions(sortedByDate)
  }

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date)
  }

  const formatTime = (dateString: string | Date) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(date)
  }

  const isPastSession = (session: ClassSession) => {
    return new Date(session.endTime) < new Date()
  }

  const statistics = {
    total: sessions.length,
    marked: sessions.filter((s) => s.attendanceMarked).length,
    unmarked: sessions.filter((s) => !s.attendanceMarked && isPastSession(s)).length,
    completed: sessions.filter((s) => s.status === 'COMPLETED').length,
  }

  const pendingSessions = filteredSessions.filter((s) => !s.attendanceMarked && isPastSession(s))

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading sessions...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Attendance Management</h1>
          <p className="text-gray-600 mt-1">Mark and manage student attendance for your sessions</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Sessions</p>
                  <p className="text-2xl font-bold text-gray-900">{statistics.total}</p>
                </div>
                <Calendar className="w-8 h-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Marked</p>
                  <p className="text-2xl font-bold text-green-600">{statistics.marked}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-orange-600">{statistics.unmarked}</p>
                </div>
                <AlertCircle className="w-8 h-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-blue-600">{statistics.completed}</p>
                </div>
                <UserCheck className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Attention */}
        {pendingSessions.length > 0 && (
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-900">
                <AlertCircle className="w-5 h-5" />
                Attention Required
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-orange-800 mb-3">
                You have {pendingSessions.length} past session(s) with unmarked attendance.
              </p>
              <div className="space-y-2">
                {pendingSessions.slice(0, 3).map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center justify-between p-3 bg-white rounded-lg border border-orange-200"
                  >
                    <div>
                      <p className="font-semibold text-gray-900">{session.title}</p>
                      <p className="text-sm text-gray-600">
                        {formatDate(session.scheduledDate)} at {formatTime(session.startTime)}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/teacher/attendance/${session.id}`)}
                      className="border-orange-300 text-orange-700 hover:bg-orange-100"
                    >
                      Mark Now
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search sessions..."
                    value={filters.searchQuery}
                    onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="ALL">All Status</option>
                  <option value="SCHEDULED">Scheduled</option>
                  <option value="ONGOING">Ongoing</option>
                  <option value="COMPLETED">Completed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Attendance Status
                </label>
                <select
                  value={filters.markedStatus}
                  onChange={(e) => setFilters({ ...filters, markedStatus: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="ALL">All</option>
                  <option value="MARKED">Marked</option>
                  <option value="UNMARKED">Unmarked</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sessions List */}
        <Card>
          <CardHeader>
            <CardTitle>All Sessions ({filteredSessions.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredSessions.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No sessions found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredSessions.map((session) => {
                  const isPast = isPastSession(session)
                  const canMarkAttendance = isPast

                  return (
                    <div
                      key={session.id}
                      className={cn(
                        'border rounded-lg p-4 hover:border-blue-300 transition-colors',
                        !session.attendanceMarked && isPast
                          ? 'border-orange-200 bg-orange-50'
                          : 'border-gray-200'
                      )}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-lg text-gray-900">{session.title}</h3>
                            {session.attendanceMarked ? (
                              <Badge className="bg-green-100 text-green-800 border-green-200">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Marked
                              </Badge>
                            ) : isPast ? (
                              <Badge className="bg-orange-100 text-orange-800 border-orange-200">
                                <AlertCircle className="w-3 h-3 mr-1" />
                                Pending
                              </Badge>
                            ) : null}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              {formatDate(session.scheduledDate)}
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              {formatTime(session.startTime)} - {formatTime(session.endTime)}
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4" />
                              {session.course?.name}
                            </div>
                          </div>

                          {session.attendanceMarked && (
                            <div className="mt-2 text-sm text-gray-700">
                              {session.presentCount} of {session.totalStudents} students present
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-2 ml-4">
                          {canMarkAttendance && (
                            <Button
                              variant={session.attendanceMarked ? 'outline' : 'primary'}
                              size="sm"
                              onClick={() => router.push(`/teacher/attendance/${session.id}`)}
                              className="flex items-center gap-1"
                            >
                              <UserCheck className="w-4 h-4" />
                              {session.attendanceMarked ? 'View' : 'Mark'} Attendance
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
