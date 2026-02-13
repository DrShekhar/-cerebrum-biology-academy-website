'use client'

import React, { useEffect, useState, use } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { FileText, Calendar, User, BookOpen, Download, AlertCircle, Trash2 } from 'lucide-react'
import { format, isPast } from 'date-fns'
import { cn } from '@/lib/utils'
import { uploadFile, formatFileSize, getFileIcon } from '@/lib/fileUpload'
import { Assignment, SubmissionStatus } from '@/types/assignment'

export default function AssignmentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const { user, isAuthenticated, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const [assignment, setAssignment] = useState<
    Assignment & {
      submission?: {
        id: string
        status: SubmissionStatus
        submittedAt?: Date | string | null
        grade?: number | null
        feedback?: string | null
        isLate: boolean
        submittedFiles: string[]
        submittedText?: string | null
      } | null
      isOverdue?: boolean
      canSubmit?: boolean
    }
  >()
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
  const [submissionText, setSubmissionText] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/sign-in')
      return
    }

    if (isAuthenticated && user?.role !== 'STUDENT') {
      router.push('/dashboard')
      return
    }
  }, [authLoading, isAuthenticated, user, router])

  useEffect(() => {
    async function fetchAssignment() {
      try {
        setLoading(true)
        const response = await fetch(`/api/student/assignments/${resolvedParams.id}`)
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch assignment')
        }

        setAssignment(data.assignment)
        if (data.assignment.submission?.submittedText) {
          setSubmissionText(data.assignment.submission.submittedText)
        }
      } catch (err) {
        console.error('Error fetching assignment:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch assignment')
      } finally {
        setLoading(false)
      }
    }

    if (isAuthenticated && user?.role === 'STUDENT') {
      fetchAssignment()
    }
  }, [isAuthenticated, user, resolvedParams.id])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setSelectedFiles((prev) => [...prev, ...files])
  }

  const handleRemoveFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (selectedFiles.length === 0 && uploadedFiles.length === 0) {
      setError('Please select at least one file to submit')
      return
    }

    try {
      setSubmitting(true)
      setError(null)
      setSuccess(null)

      const filesToUpload = [...uploadedFiles]

      for (const file of selectedFiles) {
        const result = await uploadFile(file)
        if (result.success && result.fileUrl) {
          filesToUpload.push(result.fileUrl)
        } else {
          throw new Error(result.error || 'File upload failed')
        }
      }

      const response = await fetch(`/api/student/assignments/${resolvedParams.id}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          submittedFiles: filesToUpload,
          submittedText: submissionText || null,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Submission failed')
      }

      setSuccess('Assignment submitted successfully!')
      setSelectedFiles([])
      setUploadedFiles(filesToUpload)

      setTimeout(() => {
        window.location.reload()
      }, 1500)
    } catch (err) {
      console.error('Submission error:', err)
      setError(err instanceof Error ? err.message : 'Failed to submit assignment')
    } finally {
      setSubmitting(false)
    }
  }

  if (authLoading || loading) {
    return <LoadingSkeleton />
  }

  if (error && !assignment) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <Card className="border-red-200">
            <CardContent className="p-6 text-center">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Error</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <Button onClick={() => router.push('/student/assignments')}>
                Back to Assignments
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (!assignment) return null

  const dueDate = new Date(assignment.dueDate)
  const isOverdue = isPast(dueDate)
  const hasSubmission = assignment.submission && assignment.submission.status !== 'NOT_SUBMITTED'

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button
          variant="ghost"
          onClick={() => router.push('/student/assignments')}
          className="mb-4"
        >
          ← Back to Assignments
        </Button>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700">{success}</p>
          </div>
        )}

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-start justify-between">
                <span>{assignment.title}</span>
                {hasSubmission && (
                  <span
                    className={cn(
                      'text-sm font-medium px-3 py-1 rounded-full',
                      assignment.submission?.status === 'GRADED'
                        ? 'bg-green-100 text-green-700'
                        : assignment.submission?.status === 'RESUBMIT_REQUIRED'
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-blue-100 text-blue-700'
                    )}
                  >
                    {assignment.submission?.status === 'GRADED'
                      ? `Graded: ${assignment.submission.grade}/${assignment.maxMarks}`
                      : assignment.submission?.status.replace(/_/g, ' ')}
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoItem icon={<Calendar className="w-4 h-4" />} label="Due Date">
                  <span className={cn(isOverdue && 'text-red-600 font-medium')}>
                    {format(dueDate, 'MMMM dd, yyyy hh:mm a')}
                  </span>
                </InfoItem>
                <InfoItem icon={<FileText className="w-4 h-4" />} label="Max Marks">
                  {assignment.maxMarks}
                </InfoItem>
                {assignment.course && (
                  <InfoItem icon={<BookOpen className="w-4 h-4" />} label="Course">
                    {assignment.course.name}
                  </InfoItem>
                )}
                {assignment.teacher && (
                  <InfoItem icon={<User className="w-4 h-4" />} label="Instructor">
                    {assignment.teacher.name}
                  </InfoItem>
                )}
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700 whitespace-pre-wrap">{assignment.description}</p>
              </div>

              {assignment.instructions && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Instructions</h3>
                  <p className="text-gray-700 whitespace-pre-wrap">{assignment.instructions}</p>
                </div>
              )}

              {assignment.attachments && assignment.attachments.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Assignment Files</h3>
                  <div className="space-y-2">
                    {assignment.attachments.map((file, index) => (
                      <a
                        key={index}
                        href={file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <Download className="w-4 h-4 text-blue-600" />
                        <span className="text-sm text-gray-700">{file.split('/').pop()}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {assignment.submission?.feedback && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Teacher Feedback</h3>
                  <p className="text-gray-700">{assignment.submission.feedback}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {hasSubmission && assignment.submission && (
            <Card>
              <CardHeader>
                <CardTitle>Your Submission</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">
                    Submitted:{' '}
                    {format(new Date(assignment.submission.submittedAt!), 'MMM dd, yyyy hh:mm a')}
                    {assignment.submission.isLate && (
                      <span className="ml-2 text-orange-600">(Late Submission)</span>
                    )}
                  </p>
                </div>

                {assignment.submission.submittedFiles.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Submitted Files</h4>
                    <div className="space-y-2">
                      {assignment.submission.submittedFiles.map((file, index) => (
                        <a
                          key={index}
                          href={file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
                        >
                          <Download className="w-4 h-4 text-blue-600" />
                          <span className="text-sm">{file.split('/').pop()}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {assignment.submission.submittedText && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Submission Text</h4>
                    <p className="text-gray-700 whitespace-pre-wrap p-3 bg-gray-50 rounded-lg">
                      {assignment.submission.submittedText}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {assignment.canSubmit &&
            (!hasSubmission || assignment.submission?.status === 'RESUBMIT_REQUIRED') && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {hasSubmission ? 'Resubmit Assignment' : 'Submit Assignment'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload Files (PDF, DOC, DOCX, TXT, JPG, PNG - Max 10MB each)
                      </label>
                      <Input
                        type="file"
                        accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                        multiple
                        onChange={handleFileChange}
                        className="mb-2"
                      />
                      {selectedFiles.length > 0 && (
                        <div className="space-y-2 mt-3">
                          {selectedFiles.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-2 bg-gray-50 rounded"
                            >
                              <span className="text-sm">
                                {getFileIcon(file.type)} {file.name} ({formatFileSize(file.size)})
                              </span>
                              <button
                                type="button"
                                onClick={() => handleRemoveFile(index)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Additional Notes (Optional)
                      </label>
                      <textarea
                        value={submissionText}
                        onChange={(e) => setSubmissionText(e.target.value)}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Add any notes or comments about your submission..."
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      disabled={submitting}
                      className="w-full"
                    >
                      {submitting
                        ? 'Submitting...'
                        : hasSubmission
                          ? 'Resubmit Assignment'
                          : 'Submit Assignment'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
        </div>
      </div>
    </div>
  )
}

function InfoItem({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-start gap-2">
      <div className="text-gray-500 mt-0.5">{icon}</div>
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        <p className="font-medium text-gray-900">{children}</p>
      </div>
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse space-y-6">
          <div className="h-10 bg-gray-200 rounded w-1/4"></div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
