/**
 * Session Form Component
 * Form for creating and editing class sessions
 */

'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Calendar, Clock, Video, MapPin, BookOpen, Save, X } from 'lucide-react'
import { showToast } from '@/lib/toast'
import { cn } from '@/lib/utils'
import type { ClassSession } from '@/types/attendance'

interface SessionFormProps {
  session?: ClassSession
  onSuccess?: (session: ClassSession) => void
  onCancel?: () => void
}

export function SessionForm({ session, onSuccess, onCancel }: SessionFormProps) {
  const isEditing = !!session

  const [formData, setFormData] = useState({
    courseId: session?.courseId || '',
    title: session?.title || '',
    description: session?.description || '',
    sessionType: session?.sessionType || 'REGULAR',
    scheduledDate: session?.scheduledDate
      ? new Date(session.scheduledDate).toISOString().split('T')[0]
      : '',
    startTime: session?.startTime ? new Date(session.startTime).toISOString().slice(0, 16) : '',
    endTime: session?.endTime ? new Date(session.endTime).toISOString().slice(0, 16) : '',
    meetingLink: session?.meetingLink || '',
    meetingPassword: session?.meetingPassword || '',
    location: session?.location || '',
    topic: session?.topic || '',
    chapter: session?.chapter || '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [courses, setCourses] = useState<any[]>([])

  React.useEffect(() => {
    fetchCourses()
  }, [])

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const calculateDuration = () => {
    if (formData.startTime && formData.endTime) {
      const start = new Date(formData.startTime)
      const end = new Date(formData.endTime)
      const diff = end.getTime() - start.getTime()
      return Math.floor(diff / (1000 * 60))
    }
    return 60
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const duration = calculateDuration()

      const payload = {
        ...formData,
        duration,
      }

      const url = isEditing ? `/api/teacher/sessions/${session.id}` : '/api/teacher/sessions'
      const method = isEditing ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (data.success) {
        showToast.success(
          isEditing ? 'Session updated successfully' : 'Session created successfully'
        )
        if (onSuccess) {
          onSuccess(data.data.session)
        }
      } else {
        showToast.error(data.error || 'Failed to save session')
      }
    } catch (error) {
      console.error('Error saving session:', error)
      showToast.error('Failed to save session')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>{isEditing ? 'Edit Session' : 'Create New Session'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Basic Information</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course <span className="text-red-600">*</span>
                </label>
                <select
                  name="courseId"
                  value={formData.courseId}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a course</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.name} ({course.class})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title <span className="text-red-600">*</span>
                </label>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Cell Structure and Function"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Brief description of the session..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Session Type <span className="text-red-600">*</span>
                </label>
                <select
                  name="sessionType"
                  value={formData.sessionType}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="REGULAR">Regular Class</option>
                  <option value="DOUBT_CLEARING">Doubt Clearing</option>
                  <option value="REVISION">Revision</option>
                  <option value="TEST">Test</option>
                  <option value="PRACTICAL">Practical</option>
                  <option value="WORKSHOP">Workshop</option>
                  <option value="SEMINAR">Seminar</option>
                  <option value="GUEST_LECTURE">Guest Lecture</option>
                  <option value="EXTRA_CLASS">Extra Class</option>
                </select>
              </div>
            </div>

            {/* Schedule */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Schedule
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date <span className="text-red-600">*</span>
                  </label>
                  <Input
                    type="date"
                    name="scheduledDate"
                    value={formData.scheduledDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Time <span className="text-red-600">*</span>
                  </label>
                  <Input
                    type="datetime-local"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Time <span className="text-red-600">*</span>
                  </label>
                  <Input
                    type="datetime-local"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {formData.startTime && formData.endTime && (
                <div className="text-sm text-gray-600 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Duration: {calculateDuration()} minutes
                </div>
              )}
            </div>

            {/* Online/Location */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <Video className="w-5 h-5" />
                Meeting Details
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Link</label>
                <Input
                  name="meetingLink"
                  type="url"
                  value={formData.meetingLink}
                  onChange={handleChange}
                  placeholder="https://zoom.us/j/..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meeting Password
                </label>
                <Input
                  name="meetingPassword"
                  value={formData.meetingPassword}
                  onChange={handleChange}
                  placeholder="Optional password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Physical Location
                </label>
                <Input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g., Room 101, Building A"
                />
              </div>
            </div>

            {/* Content */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Content Details
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Topic</label>
                <Input
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  placeholder="e.g., Mitosis and Meiosis"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Chapter</label>
                <Input
                  name="chapter"
                  value={formData.chapter}
                  onChange={handleChange}
                  placeholder="e.g., Chapter 10"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-4 border-t">
              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting}
                className="flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {isSubmitting ? 'Saving...' : isEditing ? 'Update Session' : 'Create Session'}
              </Button>

              {onCancel && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  className="flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
