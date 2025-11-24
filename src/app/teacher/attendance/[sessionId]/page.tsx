/**
 * Teacher Attendance Marking Page
 * Mark attendance for a specific session
 */

'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { ArrowLeft, Calendar, Clock, Users, CheckCircle, BookOpen } from 'lucide-react'
import { AttendanceMarkingGrid } from '@/components/teacher/AttendanceMarkingGrid'
import { showToast } from '@/lib/toast'
import type { ClassSession } from '@/types/attendance'

interface AttendancePageProps {
  params: {
    sessionId: string
  }
}

interface Student {
  id: string
  name: string
  email: string
  phone?: string
  enrollmentId: string
  attendance: any | null
}

interface SessionData {
  session: ClassSession
  students: Student[]
  statistics: {
    totalStudents: number
    marked: number
    unmarked: number
    present: number
    absent: number
    late: number
    excused: number
  }
}

export default function AttendanceMarkingPage({ params }: AttendancePageProps) {
  const router = useRouter()
  const [data, setData] = useState<SessionData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetchSessionData()
  }, [params.sessionId])

  const fetchSessionData = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/teacher/attendance/${params.sessionId}`)
      const result = await response.json()

      if (result.success) {
        setData(result.data)
      } else {
        showToast.error(result.error || 'Failed to fetch session data')
        router.push('/teacher/sessions')
      }
    } catch (error) {
      console.error('Error fetching session data:', error)
      showToast.error('Failed to fetch session data')
      router.push('/teacher/sessions')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveAttendance = async (records: any[]) => {
    setIsSubmitting(true)
    try {
      const response = await fetch(`/api/teacher/attendance/${params.sessionId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ records }),
      })

      const result = await response.json()

      if (result.success) {
        showToast.success('Attendance saved successfully')
        await fetchSessionData()
      } else {
        showToast.error(result.error || 'Failed to save attendance')
      }
    } catch (error) {
      console.error('Error saving attendance:', error)
      showToast.error('Failed to save attendance')
    } finally {
      setIsSubmitting(false)
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

  if (!data) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
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

  const { session, students, statistics } = data

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
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

          {session.attendanceMarked && (
            <Badge className="bg-green-100 text-green-800 border-green-200">
              <CheckCircle className="w-4 h-4 mr-1" />
              Attendance Marked
            </Badge>
          )}
        </div>

        {/* Session Info Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              {session.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

              {session.topic && (
                <div className="flex items-start gap-3">
                  <BookOpen className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Topic</p>
                    <p className="font-medium text-gray-900">{session.topic}</p>
                    {session.chapter && <p className="text-sm text-gray-600">{session.chapter}</p>}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-blue-900 mb-2">Instructions</h3>
            <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
              <li>Click on the status buttons to mark each student's attendance</li>
              <li>Use "Mark All As" buttons for quick bulk marking</li>
              <li>Click "More" to add check-in time, participation score, and notes</li>
              <li>Don't forget to click "Save Attendance" when you're done</li>
            </ul>
          </CardContent>
        </Card>

        {/* Attendance Marking Grid */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              Mark Attendance
              <span className="text-sm font-normal text-gray-600">
                ({students.length} students enrolled)
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AttendanceMarkingGrid
              students={students}
              onSave={handleSaveAttendance}
              isSubmitting={isSubmitting}
            />
          </CardContent>
        </Card>

        {/* Current Statistics */}
        {statistics.marked > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Current Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{statistics.totalStudents}</p>
                  <p className="text-sm text-gray-600">Total</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{statistics.marked}</p>
                  <p className="text-sm text-gray-600">Marked</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{statistics.present}</p>
                  <p className="text-sm text-gray-600">Present</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-600">{statistics.absent}</p>
                  <p className="text-sm text-gray-600">Absent</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-600">{statistics.late}</p>
                  <p className="text-sm text-gray-600">Late</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
