'use client'

import React from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Assignment, SubmissionStatus } from '@/types/assignment'
import { Clock, Calendar, FileText, CheckCircle, AlertCircle, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { format, formatDistanceToNow, isPast, isFuture } from 'date-fns'

interface AssignmentCardProps {
  assignment: Assignment & {
    submission?: {
      id: string
      status: SubmissionStatus
      submittedAt?: Date | string | null
      grade?: number | null
      isLate: boolean
    } | null
    isOverdue?: boolean
  }
}

export function AssignmentCard({ assignment }: AssignmentCardProps) {
  const dueDate = new Date(assignment.dueDate)
  const isOverdue = isPast(dueDate)
  const isDueSoon = isFuture(dueDate) && formatDistanceToNow(dueDate).includes('hour')

  const getStatusBadge = () => {
    const submission = assignment.submission

    if (!submission || submission.status === 'NOT_SUBMITTED') {
      if (isOverdue) {
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-700">
            <XCircle className="w-3 h-3" />
            Overdue
          </span>
        )
      }
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700">
          <AlertCircle className="w-3 h-3" />
          Pending
        </span>
      )
    }

    if (submission.status === 'SUBMITTED' || submission.status === 'LATE') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
          <CheckCircle className="w-3 h-3" />
          {submission.isLate ? 'Submitted (Late)' : 'Submitted'}
        </span>
      )
    }

    if (submission.status === 'GRADED') {
      const percentage = ((submission.grade || 0) / assignment.maxMarks) * 100
      return (
        <span
          className={cn(
            'inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full',
            percentage >= 90
              ? 'bg-green-100 text-green-700'
              : percentage >= 75
                ? 'bg-blue-100 text-blue-700'
                : percentage >= 60
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-red-100 text-red-700'
          )}
        >
          <CheckCircle className="w-3 h-3" />
          Graded: {submission.grade}/{assignment.maxMarks}
        </span>
      )
    }

    if (submission.status === 'RESUBMIT_REQUIRED') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-700">
          <AlertCircle className="w-3 h-3" />
          Resubmit Required
        </span>
      )
    }

    return null
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-lg text-gray-900">{assignment.title}</h3>
              {getStatusBadge()}
            </div>
            {assignment.course && <p className="text-sm text-gray-600">{assignment.course.name}</p>}
            {assignment.chapter && (
              <p className="text-xs text-gray-500">{assignment.chapter.title}</p>
            )}
          </div>
        </div>

        <p className="text-sm text-gray-700 mb-4 line-clamp-2">{assignment.description}</p>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>Due: {format(dueDate, 'MMM dd, yyyy')}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span
              className={cn(
                isDueSoon && 'text-orange-600 font-medium',
                isOverdue && 'text-red-600 font-medium'
              )}
            >
              {isOverdue
                ? `Overdue by ${formatDistanceToNow(dueDate)}`
                : `Due in ${formatDistanceToNow(dueDate)}`}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <FileText className="w-4 h-4" />
            <span>Max Marks: {assignment.maxMarks}</span>
          </div>
        </div>

        {assignment.submission?.submittedAt && (
          <div className="text-xs text-gray-500 mb-3">
            Submitted: {format(new Date(assignment.submission.submittedAt), 'MMM dd, yyyy hh:mm a')}
          </div>
        )}

        <div className="flex items-center gap-2">
          <Link href={`/student/assignments/${assignment.id}`} className="flex-1">
            <Button variant="primary" className="w-full">
              View Details
            </Button>
          </Link>
          {(!assignment.submission || assignment.submission.status === 'NOT_SUBMITTED') &&
            !isOverdue && (
              <Link href={`/student/assignments/${assignment.id}`}>
                <Button variant="outline">Submit Now</Button>
              </Link>
            )}
        </div>
      </CardContent>
    </Card>
  )
}
