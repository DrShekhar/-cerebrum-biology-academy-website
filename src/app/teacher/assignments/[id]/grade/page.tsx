/**
 * Teacher Assignment Grading Page
 * View and grade all submissions for an assignment
 */

'use client'

import React, { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Clock,
  FileText,
  Search,
  CheckCircle,
  XCircle,
  AlertCircle,
  Users,
  Award,
  TrendingUp,
  Download,
  Filter,
} from 'lucide-react'
import { showToast } from '@/lib/toast'

interface GradingPageProps {
  params: Promise<{ id: string }>
}

interface Student {
  id: string
  name: string
  email: string
}

interface Submission {
  id: string
  status: string
  submittedAt: string | null
  grade: number | null
  feedback: string | null
  gradedAt: string | null
  isLate: boolean
  resubmissionCount: number
  submittedFiles: string[]
  submittedText: string | null
  student: Student
}

interface Assignment {
  id: string
  title: string
  description: string
  maxMarks: number
  dueDate: string
  status: string
  allowLateSubmission: boolean
  allowResubmission: boolean
  course: {
    id: string
    name: string
  } | null
}

interface Statistics {
  total: number
  notSubmitted: number
  submitted: number
  late: number
  graded: number
  resubmitRequired: number
  gradedCount: number
  averageGrade: number
  gradingProgress: number
}

interface GradingFormData {
  grade: string
  feedback: string
  requireResubmission: boolean
}

export default function AssignmentGradingPage({ params }: GradingPageProps) {
  const resolvedParams = use(params)
  const router = useRouter()
  const [assignment, setAssignment] = useState<Assignment | null>(null)
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [statistics, setStatistics] = useState<Statistics | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [expandedSubmission, setExpandedSubmission] = useState<string | null>(null)
  const [gradingData, setGradingData] = useState<Record<string, GradingFormData>>({})
  const [isSubmitting, setIsSubmitting] = useState<string | null>(null)

  useEffect(() => {
    fetchSubmissions()
  }, [resolvedParams.id, statusFilter, searchQuery])

  const fetchSubmissions = async () => {
    setIsLoading(true)
    try {
      const queryParams = new URLSearchParams()
      if (statusFilter !== 'all') queryParams.append('status', statusFilter)
      if (searchQuery) queryParams.append('search', searchQuery)

      const response = await fetch(
        `/api/teacher/assignments/${resolvedParams.id}/submissions?${queryParams.toString()}`
      )
      const result = await response.json()

      if (result.success) {
        setAssignment(result.assignment)
        setSubmissions(result.submissions)
        setStatistics(result.statistics)
      } else {
        showToast.error(result.error || 'Failed to fetch submissions')
        router.push('/teacher/assignments')
      }
    } catch (error) {
      console.error('Error fetching submissions:', error)
      showToast.error('Failed to fetch submissions')
      router.push('/teacher/assignments')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGradeSubmission = async (submissionId: string) => {
    const data = gradingData[submissionId]
    if (!data || !data.grade) {
      showToast.error('Please enter a grade')
      return
    }

    const gradeValue = parseInt(data.grade)
    if (isNaN(gradeValue) || gradeValue < 0 || gradeValue > (assignment?.maxMarks || 0)) {
      showToast.error(`Grade must be between 0 and ${assignment?.maxMarks}`)
      return
    }

    setIsSubmitting(submissionId)
    try {
      const response = await fetch(
        `/api/teacher/assignments/${resolvedParams.id}/submissions/${submissionId}/grade`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            grade: gradeValue,
            feedback: data.feedback || null,
            requireResubmission: data.requireResubmission,
          }),
        }
      )

      const result = await response.json()

      if (result.success) {
        showToast.success('Submission graded successfully')
        setExpandedSubmission(null)
        setGradingData((prev) => {
          const updated = { ...prev }
          delete updated[submissionId]
          return updated
        })
        await fetchSubmissions()
      } else {
        showToast.error(result.error || 'Failed to grade submission')
      }
    } catch (error) {
      console.error('Error grading submission:', error)
      showToast.error('Failed to grade submission')
    } finally {
      setIsSubmitting(null)
    }
  }

  const updateGradingData = (submissionId: string, field: keyof GradingFormData, value: any) => {
    setGradingData((prev) => ({
      ...prev,
      [submissionId]: {
        ...prev[submissionId],
        grade: prev[submissionId]?.grade || '',
        feedback: prev[submissionId]?.feedback || '',
        requireResubmission: prev[submissionId]?.requireResubmission || false,
        [field]: value,
      },
    }))
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not submitted'
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  const getStatusBadge = (status: string, isLate: boolean) => {
    const badges: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
      NOT_SUBMITTED: {
        label: 'Not Submitted',
        color: 'bg-gray-100 text-gray-800 border-gray-200',
        icon: <XCircle className="w-3 h-3" />,
      },
      SUBMITTED: {
        label: isLate ? 'Late' : 'Submitted',
        color: isLate
          ? 'bg-orange-100 text-orange-800 border-orange-200'
          : 'bg-blue-100 text-blue-800 border-blue-200',
        icon: <AlertCircle className="w-3 h-3" />,
      },
      LATE: {
        label: 'Late',
        color: 'bg-orange-100 text-orange-800 border-orange-200',
        icon: <AlertCircle className="w-3 h-3" />,
      },
      GRADED: {
        label: 'Graded',
        color: 'bg-green-100 text-green-800 border-green-200',
        icon: <CheckCircle className="w-3 h-3" />,
      },
      RESUBMIT_REQUIRED: {
        label: 'Resubmit Required',
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        icon: <AlertCircle className="w-3 h-3" />,
      },
    }

    const badge = badges[status] || badges.NOT_SUBMITTED

    return (
      <Badge className={badge.color}>
        {badge.icon}
        <span className="ml-1">{badge.label}</span>
      </Badge>
    )
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading submissions...</p>
        </div>
      </div>
    )
  }

  if (!assignment || !statistics) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-gray-600">Assignment not found</p>
          <Button
            onClick={() => router.push('/teacher/assignments')}
            variant="outline"
            className="mt-4"
          >
            Back to Assignments
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => router.push('/teacher/assignments')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Assignments
          </Button>
        </div>

        {/* Assignment Info Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              {assignment.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {assignment.course && (
                <div className="flex items-start gap-3">
                  <BookOpen className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Course</p>
                    <p className="font-medium text-gray-900">{assignment.course.name}</p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Max Marks</p>
                  <p className="font-medium text-gray-900">{assignment.maxMarks}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Due Date</p>
                  <p className="font-medium text-gray-900">{formatDate(assignment.dueDate)}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Progress</p>
                  <p className="font-medium text-gray-900">{statistics.gradingProgress}% Graded</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="w-5 h-5 text-gray-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{statistics.total}</p>
                <p className="text-sm text-gray-600">Total</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <XCircle className="w-5 h-5 text-gray-600" />
                </div>
                <p className="text-2xl font-bold text-gray-600">{statistics.notSubmitted}</p>
                <p className="text-sm text-gray-600">Not Submitted</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-2xl font-bold text-blue-600">{statistics.submitted}</p>
                <p className="text-sm text-gray-600">Submitted</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                </div>
                <p className="text-2xl font-bold text-orange-600">{statistics.late}</p>
                <p className="text-sm text-gray-600">Late</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-2xl font-bold text-green-600">{statistics.graded}</p>
                <p className="text-sm text-gray-600">Graded</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Award className="w-5 h-5 text-purple-600" />
                </div>
                <p className="text-2xl font-bold text-purple-600">
                  {statistics.averageGrade.toFixed(1)}
                </p>
                <p className="text-sm text-gray-600">Avg Grade</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search by student name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="SUBMITTED">Submitted</option>
                  <option value="LATE">Late</option>
                  <option value="GRADED">Graded</option>
                  <option value="RESUBMIT_REQUIRED">Resubmit Required</option>
                  <option value="NOT_SUBMITTED">Not Submitted</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submissions List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Submissions
              <span className="text-sm font-normal text-gray-600">
                ({submissions.length} {submissions.length === 1 ? 'submission' : 'submissions'})
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {submissions.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">No submissions found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {submissions.map((submission) => (
                  <div
                    key={submission.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                  >
                    {/* Submission Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div>
                          <p className="font-medium text-gray-900">{submission.student.name}</p>
                          <p className="text-sm text-gray-600">{submission.student.email}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {getStatusBadge(submission.status, submission.isLate)}
                        {submission.status === 'GRADED' && submission.grade !== null && (
                          <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                            {submission.grade}/{assignment.maxMarks}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Submission Details */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3 text-sm">
                      <div>
                        <p className="text-gray-600">Submitted At</p>
                        <p className="font-medium text-gray-900">
                          {formatDate(submission.submittedAt)}
                        </p>
                      </div>

                      {submission.gradedAt && (
                        <div>
                          <p className="text-gray-600">Graded At</p>
                          <p className="font-medium text-gray-900">
                            {formatDate(submission.gradedAt)}
                          </p>
                        </div>
                      )}

                      {submission.submittedFiles.length > 0 && (
                        <div>
                          <p className="text-gray-600">Files</p>
                          <p className="font-medium text-gray-900">
                            {submission.submittedFiles.length} file(s)
                          </p>
                        </div>
                      )}

                      {submission.resubmissionCount > 0 && (
                        <div>
                          <p className="text-gray-600">Resubmissions</p>
                          <p className="font-medium text-gray-900">
                            {submission.resubmissionCount}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Submitted Text Preview */}
                    {submission.submittedText && (
                      <div className="mb-3">
                        <p className="text-sm text-gray-600 mb-1">Submitted Text:</p>
                        <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded line-clamp-2">
                          {submission.submittedText}
                        </p>
                      </div>
                    )}

                    {/* Submitted Files */}
                    {submission.submittedFiles.length > 0 && (
                      <div className="mb-3">
                        <p className="text-sm text-gray-600 mb-2">Submitted Files:</p>
                        <div className="space-y-1">
                          {submission.submittedFiles.map((file, index) => (
                            <a
                              key={index}
                              href={file}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
                            >
                              <Download className="w-4 h-4" />
                              {file.split('/').pop() || `File ${index + 1}`}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Existing Feedback */}
                    {submission.feedback && (
                      <div className="mb-3">
                        <p className="text-sm text-gray-600 mb-1">Feedback:</p>
                        <p className="text-sm text-gray-900 bg-green-50 p-3 rounded">
                          {submission.feedback}
                        </p>
                      </div>
                    )}

                    {/* Grading Section */}
                    {(submission.status === 'SUBMITTED' ||
                      submission.status === 'LATE' ||
                      submission.status === 'RESUBMIT_REQUIRED') && (
                      <>
                        {expandedSubmission === submission.id ? (
                          <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Grade (out of {assignment.maxMarks})
                                </label>
                                <Input
                                  type="number"
                                  min="0"
                                  max={assignment.maxMarks}
                                  placeholder={`Enter grade (0-${assignment.maxMarks})`}
                                  value={gradingData[submission.id]?.grade || ''}
                                  onChange={(e) =>
                                    updateGradingData(submission.id, 'grade', e.target.value)
                                  }
                                />
                              </div>

                              {assignment.allowResubmission && (
                                <div className="flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    id={`resubmit-${submission.id}`}
                                    checked={
                                      gradingData[submission.id]?.requireResubmission || false
                                    }
                                    onChange={(e) =>
                                      updateGradingData(
                                        submission.id,
                                        'requireResubmission',
                                        e.target.checked
                                      )
                                    }
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                  />
                                  <label
                                    htmlFor={`resubmit-${submission.id}`}
                                    className="text-sm font-medium text-gray-700"
                                  >
                                    Require Resubmission
                                  </label>
                                </div>
                              )}
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Feedback (Optional)
                              </label>
                              <Textarea
                                placeholder="Enter feedback for the student..."
                                rows={4}
                                value={gradingData[submission.id]?.feedback || ''}
                                onChange={(e) =>
                                  updateGradingData(submission.id, 'feedback', e.target.value)
                                }
                              />
                            </div>

                            <div className="flex gap-2">
                              <Button
                                onClick={() => handleGradeSubmission(submission.id)}
                                disabled={isSubmitting === submission.id}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                {isSubmitting === submission.id ? 'Saving...' : 'Save Grade'}
                              </Button>
                              <Button
                                variant="outline"
                                onClick={() => {
                                  setExpandedSubmission(null)
                                  setGradingData((prev) => {
                                    const updated = { ...prev }
                                    delete updated[submission.id]
                                    return updated
                                  })
                                }}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="mt-4">
                            <Button
                              variant="outline"
                              onClick={() => setExpandedSubmission(submission.id)}
                              className="w-full"
                            >
                              Grade Submission
                            </Button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
