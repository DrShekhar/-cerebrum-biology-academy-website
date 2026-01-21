/**
 * Teacher Sessions Management Page
 * Main page for viewing and managing class sessions
 */

'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import {
  Calendar,
  Clock,
  Video,
  MapPin,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Users,
  CheckCircle,
  XCircle,
  AlertCircle,
  PlayCircle,
} from 'lucide-react'
import { SessionForm } from '@/components/teacher/SessionForm'
import { showToast } from '@/lib/toast'
import { cn } from '@/lib/utils'
import type { ClassSession } from '@/types/attendance'

interface SessionStatistics {
  total: number
  scheduled: number
  ongoing: number
  completed: number
  cancelled: number
}

export default function TeacherSessionsPage() {
  const [sessions, setSessions] = useState<ClassSession[]>([])
  const [filteredSessions, setFilteredSessions] = useState<ClassSession[]>([])
  const [statistics, setStatistics] = useState<SessionStatistics>({
    total: 0,
    scheduled: 0,
    ongoing: 0,
    completed: 0,
    cancelled: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingSession, setEditingSession] = useState<ClassSession | null>(null)
  const [filters, setFilters] = useState({
    status: 'ALL',
    courseId: 'ALL',
    searchQuery: '',
    startDate: '',
    endDate: '',
  })
  const [courses, setCourses] = useState<any[]>([])

  useEffect(() => {
    fetchSessions()
    fetchCourses()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [sessions, filters])

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/teacher/courses')
      const data = await response.json()
      if (data.success) {
        setCourses(data.data.courses || [])
      }
    } catch (error) {
      console.error('Error fetching courses:', error)
    }
  }

  const fetchSessions = async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams()
      if (filters.status !== 'ALL') params.append('status', filters.status)
      if (filters.courseId !== 'ALL') params.append('courseId', filters.courseId)
      if (filters.startDate) params.append('startDate', filters.startDate)
      if (filters.endDate) params.append('endDate', filters.endDate)

      const response = await fetch(`/api/teacher/sessions?${params}`)
      const data = await response.json()

      if (data.success) {
        setSessions(data.data.sessions || [])
        setStatistics(data.data.statistics || statistics)
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

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      filtered = filtered.filter(
        (session) =>
          session.title.toLowerCase().includes(query) ||
          session.topic?.toLowerCase().includes(query) ||
          session.chapter?.toLowerCase().includes(query) ||
          session.course?.name.toLowerCase().includes(query)
      )
    }

    setFilteredSessions(filtered)
  }

  const handleCreateSession = () => {
    setEditingSession(null)
    setShowCreateForm(true)
  }

  const handleEditSession = (session: ClassSession) => {
    setEditingSession(session)
    setShowCreateForm(true)
  }

  const handleDeleteSession = async (sessionId: string) => {
    if (!confirm('Are you sure you want to delete this session?')) {
      return
    }

    try {
      const response = await fetch(`/api/teacher/sessions/${sessionId}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (data.success) {
        showToast.success(data.message || 'Session deleted successfully')
        fetchSessions()
      } else {
        showToast.error(data.error || 'Failed to delete session')
      }
    } catch (error) {
      console.error('Error deleting session:', error)
      showToast.error('Failed to delete session')
    }
  }

  const handleFormSuccess = () => {
    setShowCreateForm(false)
    setEditingSession(null)
    fetchSessions()
  }

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'SCHEDULED':
        return {
          label: 'Scheduled',
          icon: Calendar,
          className: 'bg-blue-100 text-blue-800 border-blue-200',
        }
      case 'ONGOING':
        return {
          label: 'Ongoing',
          icon: PlayCircle,
          className: 'bg-green-100 text-green-800 border-green-200',
        }
      case 'COMPLETED':
        return {
          label: 'Completed',
          icon: CheckCircle,
          className: 'bg-gray-100 text-gray-800 border-gray-200',
        }
      case 'CANCELLED':
        return {
          label: 'Cancelled',
          icon: XCircle,
          className: 'bg-red-100 text-red-800 border-red-200',
        }
      case 'RESCHEDULED':
        return {
          label: 'Rescheduled',
          icon: AlertCircle,
          className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        }
      default:
        return {
          label: status,
          icon: AlertCircle,
          className: 'bg-gray-100 text-gray-800 border-gray-200',
        }
    }
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

  const isUpcoming = (session: ClassSession) => {
    const sessionDate = new Date(session.startTime)
    const now = new Date()
    return sessionDate > now && session.status === 'SCHEDULED'
  }

  const upcomingSessions = filteredSessions.filter(isUpcoming).slice(0, 3)

  if (showCreateForm) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <SessionForm
          session={editingSession || undefined}
          onSuccess={handleFormSuccess}
          onCancel={() => {
            setShowCreateForm(false)
            setEditingSession(null)
          }}
        />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Class Sessions</h1>
            <p className="text-gray-600 mt-1">Manage your class schedules and sessions</p>
          </div>
          <Button
            onClick={handleCreateSession}
            variant="primary"
            className="flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create Session
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total</p>
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
                  <p className="text-sm text-gray-600">Scheduled</p>
                  <p className="text-2xl font-bold text-blue-600">{statistics.scheduled}</p>
                </div>
                <Calendar className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Ongoing</p>
                  <p className="text-2xl font-bold text-green-600">{statistics.ongoing}</p>
                </div>
                <PlayCircle className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-600">{statistics.completed}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Cancelled</p>
                  <p className="text-2xl font-bold text-red-600">{statistics.cancelled}</p>
                </div>
                <XCircle className="w-8 h-8 text-red-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Sessions Widget */}
        {upcomingSessions.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                Upcoming Sessions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingSessions.map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{session.title}</p>
                      <p className="text-sm text-gray-600">
                        {session.course?.name} • {formatDate(session.scheduledDate)}
                      </p>
                      <p className="text-sm text-gray-600">
                        {formatTime(session.startTime)} - {formatTime(session.endTime)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {session.meetingLink && (
                        <a
                          href={session.meetingLink}
                          target="_blank" rel="noopener noreferrer"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Video className="w-5 h-5" />
                        </a>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditSession(session)}
                        className="flex items-center gap-1"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                  onChange={(e) => {
                    setFilters({ ...filters, status: e.target.value })
                    fetchSessions()
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="ALL">All Status</option>
                  <option value="SCHEDULED">Scheduled</option>
                  <option value="ONGOING">Ongoing</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                <select
                  value={filters.courseId}
                  onChange={(e) => {
                    setFilters({ ...filters, courseId: e.target.value })
                    fetchSessions()
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="ALL">All Courses</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                <div className="flex items-center gap-2">
                  <Input
                    type="date"
                    value={filters.startDate}
                    onChange={(e) => {
                      setFilters({ ...filters, startDate: e.target.value })
                      if (e.target.value && filters.endDate) {
                        fetchSessions()
                      }
                    }}
                  />
                </div>
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
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-gray-600 mt-4">Loading sessions...</p>
              </div>
            ) : filteredSessions.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No sessions found</p>
                <Button onClick={handleCreateSession} variant="outline" className="mt-4">
                  Create Your First Session
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredSessions.map((session) => {
                  const statusConfig = getStatusConfig(session.status)
                  const StatusIcon = statusConfig.icon

                  return (
                    <div
                      key={session.id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-lg text-gray-900">{session.title}</h3>
                            <Badge className={statusConfig.className}>
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {statusConfig.label}
                            </Badge>
                            <Badge variant="outline">{session.sessionType.replace('_', ' ')}</Badge>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              {formatDate(session.scheduledDate)}
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              {formatTime(session.startTime)} - {formatTime(session.endTime)} (
                              {session.duration} min)
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4" />
                              {session.course?.name} ({session.course?.class})
                            </div>
                            {session.meetingLink && (
                              <div className="flex items-center gap-2">
                                <Video className="w-4 h-4" />
                                <a
                                  href={session.meetingLink}
                                  target="_blank" rel="noopener noreferrer"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:underline"
                                >
                                  Join Meeting
                                </a>
                              </div>
                            )}
                            {session.location && (
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                {session.location}
                              </div>
                            )}
                          </div>

                          {session.topic && (
                            <p className="text-sm text-gray-700">
                              <span className="font-medium">Topic:</span> {session.topic}
                            </p>
                          )}
                          {session.description && (
                            <p className="text-sm text-gray-600 mt-1">{session.description}</p>
                          )}
                        </div>

                        <div className="flex items-center gap-2 ml-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditSession(session)}
                            className="flex items-center gap-1"
                          >
                            <Edit className="w-4 h-4" />
                            Edit
                          </Button>
                          {session.status === 'SCHEDULED' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteSession(session.id)}
                              className="flex items-center gap-1 text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete
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
