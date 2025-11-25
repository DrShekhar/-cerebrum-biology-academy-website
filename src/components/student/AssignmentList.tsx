'use client'

import React, { useState } from 'react'
import { AssignmentCard } from './AssignmentCard'
import { Assignment, SubmissionStatus } from '@/types/assignment'
import { Search, Filter } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { NativeSelect } from '@/components/ui/NativeSelect'
import { EmptyState } from '@/components/ui/EmptyState'
import { FileText } from 'lucide-react'

interface AssignmentListProps {
  assignments: Array<
    Assignment & {
      submission?: {
        id: string
        status: SubmissionStatus
        submittedAt?: Date | string | null
        grade?: number | null
        isLate: boolean
      } | null
      isOverdue?: boolean
    }
  >
  loading?: boolean
}

export function AssignmentList({ assignments, loading }: AssignmentListProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [courseFilter, setCourseFilter] = useState<string>('all')

  const filteredAssignments = assignments.filter((assignment) => {
    const matchesSearch =
      assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'pending' &&
        (!assignment.submission || assignment.submission.status === 'NOT_SUBMITTED')) ||
      (statusFilter === 'submitted' &&
        assignment.submission &&
        (assignment.submission.status === 'SUBMITTED' ||
          assignment.submission.status === 'LATE')) ||
      (statusFilter === 'graded' &&
        assignment.submission &&
        assignment.submission.status === 'GRADED') ||
      (statusFilter === 'overdue' && assignment.isOverdue)

    const matchesCourse = courseFilter === 'all' || assignment.course?.id === courseFilter

    return matchesSearch && matchesStatus && matchesCourse
  })

  const uniqueCourses = Array.from(
    new Set(assignments.map((a) => a.course).filter(Boolean))
  ).filter((course): course is { id: string; name: string } => course !== null)

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search assignments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <NativeSelect value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="submitted">Submitted</option>
            <option value="graded">Graded</option>
            <option value="overdue">Overdue</option>
          </NativeSelect>

          <NativeSelect value={courseFilter} onChange={(e) => setCourseFilter(e.target.value)}>
            <option value="all">All Courses</option>
            {uniqueCourses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </NativeSelect>
        </div>
      </div>

      {filteredAssignments.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No assignments found"
          description={
            searchQuery || statusFilter !== 'all' || courseFilter !== 'all'
              ? 'Try adjusting your filters to see more results'
              : 'Your instructor will assign work soon'
          }
          size="lg"
          variant="default"
        />
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredAssignments.map((assignment) => (
            <AssignmentCard key={assignment.id} assignment={assignment} />
          ))}
        </div>
      )}
    </div>
  )
}
