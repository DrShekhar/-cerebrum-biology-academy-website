/**
 * Teacher Session Detail Page
 * View and manage individual session details
 */

'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import {
  ArrowLeft,
  Calendar,
  Clock,
  Video,
  MapPin,
  BookOpen,
  Users,
  Edit,
  Trash2,
  Copy,
  CheckCircle,
  XCircle,
  AlertCircle,
  PlayCircle,
  UserCheck,
} from 'lucide-react'
import { SessionForm } from '@/components/teacher/SessionForm'
import { showToast } from '@/lib/toast'
import { cn } from '@/lib/utils'
import type { ClassSession } from '@/types/attendance'

interface SessionDetailPageProps {
  params: {
    id: string
  }
}

export default function SessionDetailPage({ params }: SessionDetailPageProps) {
  const router = useRouter()
  const [session, setSession] = useState<ClassSession | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    fetchSession()
  }, [params.id])

  const fetchSession = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/teacher/sessions/${params.id}`)
      const data = await response.json()

      if (data.success) {
        setSession(data.data.session)
      } else {
        showToast.error(data.error || 'Failed to fetch session')
        router.push('/teacher/sessions')
      }
    } catch (error) {
      console.error('Error fetching session:', error)
      showToast.error('Failed to fetch session')
      router.push('/teacher/sessions')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this session?')) {
      return
    }

    try {
      const response = await fetch(`/api/teacher/sessions/${params.id}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (data.success) {
        showToast.success(data.message || 'Session deleted successfully')
        router.push('/teacher/sessions')
      } else {
        showToast.error(data.error || 'Failed to delete session')
      }
    } catch (error) {
      console.error('Error deleting session:', error)
      showToast.error('Failed to delete session')
    }
  }

  const handleCopyMeetingLink = () => {
    if (session?.meetingLink) {
      navigator.clipboard.writeText(session.meetingLink)
      showToast.success('Meeting link copied to clipboard')
    }
  }

  const handleFormSuccess = () => {
    setIsEditing(false)
    fetchSession()
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
      weekday: 'long',
      day: 'numeric',
      month: 'long',
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

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading session...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <p className="text-gray-600">Session not found</p>
          <Button
            onClick={() => router.push('/teacher/sessions')}
            variant="outline"
            className="mt-4"
          >
            Back to Sessions
          </Button>
        </div>
      </div>
    )
  }

  if (isEditing) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <SessionForm
          session={session}
          onSuccess={handleFormSuccess}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    )
  }

  const statusConfig = getStatusConfig(session.status)
  const StatusIcon = statusConfig.icon

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => router.push('/teacher/sessions')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Sessions
          </Button>

          <div className="flex items-center gap-3">
            {session.status === 'SCHEDULED' && (
              <>
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  onClick={handleDelete}
                  className="flex items-center gap-2 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Session Title & Status */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-gray-900">{session.title}</h1>
            <Badge className={statusConfig.className}>
              <StatusIcon className="w-4 h-4 mr-1" />
              {statusConfig.label}
            </Badge>
            <Badge variant="outline" className="text-sm">
              {session.sessionType.replace('_', ' ')}
            </Badge>
          </div>
          {session.description && <p className="text-gray-600 text-lg">{session.description}</p>}
        </div>

        {/* Main Details Card */}
        <Card>
          <CardHeader>
            <CardTitle>Session Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Date</p>
                    <p className="font-medium text-gray-900">{formatDate(session.scheduledDate)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Time</p>
                    <p className="font-medium text-gray-900">
                      {formatTime(session.startTime)} - {formatTime(session.endTime)}
                    </p>
                    <p className="text-sm text-gray-600">Duration: {session.duration} minutes</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Course</p>
                    <p className="font-medium text-gray-900">{session.course?.name}</p>
                    <p className="text-sm text-gray-600">Class {session.course?.class}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {session.meetingLink && (
                  <div className="flex items-start gap-3">
                    <Video className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">Meeting Link</p>
                      <div className="flex items-center gap-2">
                        <a
                          href={session.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-blue-600 hover:underline break-all"
                        >
                          Join Meeting
                        </a>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleCopyMeetingLink}
                          className="flex items-center gap-1"
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                      {session.meetingPassword && (
                        <p className="text-sm text-gray-600 mt-1">
                          Password: <span className="font-mono">{session.meetingPassword}</span>
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {session.location && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="font-medium text-gray-900">{session.location}</p>
                    </div>
                  </div>
                )}

                {session.topic && (
                  <div className="flex items-start gap-3">
                    <BookOpen className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Topic</p>
                      <p className="font-medium text-gray-900">{session.topic}</p>
                      {session.chapter && (
                        <p className="text-sm text-gray-600">{session.chapter}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Attendance Summary */}
        {session.attendance && session.attendance.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-blue-600" />
                Attendance Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Total Students</p>
                  <p className="text-2xl font-bold text-gray-900">{session.attendance.length}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Present</p>
                  <p className="text-2xl font-bold text-green-600">
                    {session.attendance.filter((a) => a.status === 'PRESENT').length}
                  </p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Absent</p>
                  <p className="text-2xl font-bold text-red-600">
                    {session.attendance.filter((a) => a.status === 'ABSENT').length}
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Attendance Rate</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {Math.round(
                      (session.attendance.filter(
                        (a) => a.status === 'PRESENT' || a.status === 'LATE'
                      ).length /
                        session.attendance.length) *
                        100
                    )}
                    %
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900 mb-3">Student List</h4>
                {session.attendance.map((record: any) => (
                  <div
                    key={record.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{record.student?.name}</p>
                      <p className="text-sm text-gray-600">{record.student?.email}</p>
                    </div>
                    <Badge
                      className={cn(
                        record.status === 'PRESENT' &&
                          'bg-green-100 text-green-800 border-green-200',
                        record.status === 'ABSENT' && 'bg-red-100 text-red-800 border-red-200',
                        record.status === 'LATE' &&
                          'bg-orange-100 text-orange-800 border-orange-200',
                        record.status === 'EXCUSED' && 'bg-blue-100 text-blue-800 border-blue-200'
                      )}
                    >
                      {record.status}
                    </Badge>
                  </div>
                ))}
              </div>

              <Button
                variant="primary"
                onClick={() => router.push(`/teacher/attendance/${session.id}`)}
                className="w-full mt-4"
              >
                Mark Attendance
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Cancellation Info */}
        {session.status === 'CANCELLED' && session.cancelReason && (
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-800 flex items-center gap-2">
                <XCircle className="w-5 h-5" />
                Cancellation Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-red-700">
                <span className="font-medium">Reason:</span> {session.cancelReason}
              </p>
              {session.cancelledAt && (
                <p className="text-red-600 text-sm mt-1">
                  Cancelled on {formatDate(session.cancelledAt)} at{' '}
                  {formatTime(session.cancelledAt)}
                </p>
              )}
            </CardContent>
          </Card>
        )}

        {/* Teacher Info */}
        <Card>
          <CardHeader>
            <CardTitle>Teacher Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold text-lg">
                  {session.teacher?.name?.charAt(0) || 'T'}
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-900">{session.teacher?.name}</p>
                <p className="text-sm text-gray-600">{session.teacher?.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
