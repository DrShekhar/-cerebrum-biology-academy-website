'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { ArrowLeft, Plus, X, Upload, Calendar } from 'lucide-react'
import Link from 'next/link'
import { showToast } from '@/lib/toast'
import { AssignmentStatus } from '@/types/assignment'

interface Course {
  id: string
  name: string
  chapters?: Chapter[]
}

interface Chapter {
  id: string
  title: string
  topics?: Topic[]
}

interface Topic {
  id: string
  title: string
}

export default function CreateAssignmentPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth()
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [courses, setCourses] = useState<Course[]>([])

  const [formData, setFormData] = useState({
    courseId: '',
    chapterId: '',
    topicId: '',
    title: '',
    description: '',
    instructions: '',
    maxMarks: '',
    dueDate: '',
    allowLateSubmission: false,
    allowResubmission: false,
    latePenaltyPercentage: '0',
    status: AssignmentStatus.DRAFT,
    attachments: [] as string[],
  })

  const [attachmentInput, setAttachmentInput] = useState('')
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null)

  useEffect(() => {
    if (!authLoading && (!isAuthenticated || user?.role !== 'TEACHER')) {
      router.push('/sign-in')
      return
    }

    if (isAuthenticated && user?.role === 'TEACHER') {
      fetchCourses()
    }
  }, [authLoading, isAuthenticated, user, router])

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/teacher/courses')
      const data = await response.json()

      if (data.success) {
        setCourses(data.courses || [])
      }
    } catch (error) {
      console.error('Error fetching courses:', error)
    }
  }

  const handleCourseChange = async (courseId: string) => {
    setFormData((prev) => ({ ...prev, courseId, chapterId: '', topicId: '' }))
    setSelectedChapter(null)

    if (!courseId) {
      setSelectedCourse(null)
      return
    }

    const course = courses.find((c) => c.id === courseId)
    if (course && !course.chapters) {
      const response = await fetch(`/api/teacher/courses/${courseId}/chapters`)
      const data = await response.json()

      if (data.success) {
        const updatedCourse = { ...course, chapters: data.chapters }
        setSelectedCourse(updatedCourse)
        setCourses((prev) => prev.map((c) => (c.id === courseId ? updatedCourse : c)))
      }
    } else {
      setSelectedCourse(course || null)
    }
  }

  const handleChapterChange = async (chapterId: string) => {
    setFormData((prev) => ({ ...prev, chapterId, topicId: '' }))

    if (!chapterId || !selectedCourse) {
      setSelectedChapter(null)
      return
    }

    const chapter = selectedCourse.chapters?.find((c) => c.id === chapterId)
    if (chapter && !chapter.topics) {
      const response = await fetch(`/api/teacher/chapters/${chapterId}/topics`)
      const data = await response.json()

      if (data.success) {
        const updatedChapter = { ...chapter, topics: data.topics }
        setSelectedChapter(updatedChapter)

        setSelectedCourse({
          ...selectedCourse,
          chapters: selectedCourse.chapters?.map((c) => (c.id === chapterId ? updatedChapter : c)),
        })
      }
    } else {
      setSelectedChapter(chapter || null)
    }
  }

  const handleAddAttachment = () => {
    if (attachmentInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        attachments: [...prev.attachments, attachmentInput.trim()],
      }))
      setAttachmentInput('')
    }
  }

  const handleRemoveAttachment = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e: React.FormEvent, publishNow: boolean = false) => {
    e.preventDefault()

    if (!formData.title || !formData.description || !formData.maxMarks || !formData.dueDate) {
      showToast.error('Please fill in all required fields')
      return
    }

    const maxMarksNum = parseInt(formData.maxMarks)
    if (isNaN(maxMarksNum) || maxMarksNum <= 0) {
      showToast.error('Max marks must be a positive number')
      return
    }

    const penaltyNum = parseInt(formData.latePenaltyPercentage)
    if (isNaN(penaltyNum) || penaltyNum < 0 || penaltyNum > 100) {
      showToast.error('Late penalty must be between 0 and 100')
      return
    }

    try {
      setLoading(true)

      const payload = {
        ...formData,
        courseId: formData.courseId || undefined,
        chapterId: formData.chapterId || undefined,
        topicId: formData.topicId || undefined,
        instructions: formData.instructions || undefined,
        maxMarks: maxMarksNum,
        latePenaltyPercentage: penaltyNum,
        status: publishNow ? AssignmentStatus.PUBLISHED : formData.status,
      }

      const response = await fetch('/api/teacher/assignments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (data.success) {
        showToast.success(
          publishNow ? 'Assignment published successfully!' : 'Assignment created successfully!'
        )
        router.push('/teacher/assignments')
      } else {
        showToast.error(data.error || 'Failed to create assignment')
      }
    } catch (error) {
      console.error('Error creating assignment:', error)
      showToast.error('Failed to create assignment')
    } finally {
      setLoading(false)
    }
  }

  if (authLoading) {
    return <LoadingSkeleton />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <Link href="/teacher/assignments">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Create Assignment</h1>
              <p className="text-gray-600 mt-1">Create a new assignment for your students</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={(e) => handleSubmit(e, false)}>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course (Optional)
                  </label>
                  <select
                    value={formData.courseId}
                    onChange={(e) => handleCourseChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a course</option>
                    {courses.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.name}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedCourse &&
                  selectedCourse.chapters &&
                  selectedCourse.chapters.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Chapter (Optional)
                      </label>
                      <select
                        value={formData.chapterId}
                        onChange={(e) => handleChapterChange(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select a chapter</option>
                        {selectedCourse.chapters.map((chapter) => (
                          <option key={chapter.id} value={chapter.id}>
                            {chapter.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                {selectedChapter && selectedChapter.topics && selectedChapter.topics.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Topic (Optional)
                    </label>
                    <select
                      value={formData.topicId}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, topicId: e.target.value }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select a topic</option>
                      {selectedChapter.topics.map((topic) => (
                        <option key={topic.id} value={topic.id}>
                          {topic.title}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter assignment title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, description: e.target.value }))
                    }
                    placeholder="Enter assignment description"
                    rows={4}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Instructions (Optional)
                  </label>
                  <textarea
                    value={formData.instructions}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, instructions: e.target.value }))
                    }
                    placeholder="Enter detailed instructions for students"
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Assignment Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Max Marks <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="number"
                      min="1"
                      value={formData.maxMarks}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, maxMarks: e.target.value }))
                      }
                      placeholder="100"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Due Date <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Input
                        type="datetime-local"
                        value={formData.dueDate}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, dueDate: e.target.value }))
                        }
                        required
                        className="pr-10"
                      />
                      <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="allowLateSubmission"
                      checked={formData.allowLateSubmission}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, allowLateSubmission: e.target.checked }))
                      }
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="allowLateSubmission" className="text-sm text-gray-700">
                      Allow late submission
                    </label>
                  </div>

                  {formData.allowLateSubmission && (
                    <div className="ml-7">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Late Penalty (%)
                      </label>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={formData.latePenaltyPercentage}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            latePenaltyPercentage: e.target.value,
                          }))
                        }
                        placeholder="10"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Percentage of marks to deduct for late submissions
                      </p>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="allowResubmission"
                      checked={formData.allowResubmission}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, allowResubmission: e.target.checked }))
                      }
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="allowResubmission" className="text-sm text-gray-700">
                      Allow resubmission
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Attachments</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    type="url"
                    value={attachmentInput}
                    onChange={(e) => setAttachmentInput(e.target.value)}
                    placeholder="Enter file URL (e.g., https://example.com/file.pdf)"
                    className="flex-1"
                  />
                  <Button type="button" onClick={handleAddAttachment} variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Add
                  </Button>
                </div>

                {formData.attachments.length > 0 && (
                  <div className="space-y-2">
                    {formData.attachments.map((attachment, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <Upload className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <span className="text-sm text-gray-700 truncate">{attachment}</span>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveAttachment(index)}
                        >
                          <X className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                <p className="text-xs text-gray-500">
                  Add reference materials, documents, or resources for this assignment
                </p>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button
                type="submit"
                variant="outline"
                disabled={loading}
                className="flex-1"
                onClick={(e) => {
                  setFormData((prev) => ({ ...prev, status: AssignmentStatus.DRAFT }))
                }}
              >
                {loading ? 'Saving...' : 'Save as Draft'}
              </Button>
              <Button
                type="button"
                variant="primary"
                disabled={loading}
                className="flex-1"
                onClick={(e) => handleSubmit(e, true)}
              >
                {loading ? 'Publishing...' : 'Publish Now'}
              </Button>
            </div>
          </div>
        </form>
      </div>
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="space-y-3">
                  <div className="h-10 bg-gray-200 rounded"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
