'use client'

import { useState, useEffect, useCallback } from 'react'
import type { Enrollment } from '@/lib/db'

export function useEnrollment() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchEnrollments = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      const res = await fetch('/api/admin/enrollments?limit=100')
      const data = await res.json()
      if (data.success && data.data?.enrollments) {
        const mapped: Enrollment[] = data.data.enrollments.map((e: any) => ({
          id: e.id,
          userId: e.userId,
          courseId: e.courseId,
          studentName: e.users?.name || '',
          email: e.users?.email || '',
          phone: e.users?.phone || '',
          paymentStatus:
            e.status === 'ACTIVE' || e.status === 'COMPLETED'
              ? 'paid'
              : e.status === 'CANCELLED'
                ? 'failed'
                : 'pending',
          enrollmentDate: new Date(e.enrollmentDate).getTime(),
          courseStartDate: e.startDate
            ? new Date(e.startDate).toISOString().split('T')[0]
            : '',
          batchAssigned: undefined,
        }))
        setEnrollments(mapped)
      }
    } catch (err) {
      console.error('Fetch enrollments error:', err)
      setError('Failed to fetch enrollments')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchEnrollments()
  }, [fetchEnrollments])

  const enrollInCourse = async (
    enrollmentData: Omit<Enrollment, 'id' | 'enrollmentDate' | 'paymentStatus'>
  ) => {
    try {
      setIsLoading(true)
      const res = await fetch('/api/admin/enrollments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: enrollmentData.userId,
          courseId: enrollmentData.courseId,
          paymentPlan: 'FULL',
        }),
      })
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to enroll')
      }

      const newEnrollment: Enrollment = {
        ...enrollmentData,
        id: data.data.id,
        paymentStatus: 'pending',
        enrollmentDate: Date.now(),
      }

      setEnrollments((prev) => [...prev, newEnrollment])
      return newEnrollment
    } catch (err) {
      console.error('Course enrollment error:', err)
      setError('Failed to enroll in course')
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const updatePaymentStatus = async (
    enrollmentId: string,
    paymentStatus: Enrollment['paymentStatus']
  ) => {
    try {
      const statusMap: Record<string, string> = {
        paid: 'ACTIVE',
        pending: 'PENDING',
        failed: 'CANCELLED',
      }

      const res = await fetch(`/api/admin/enrollments/${enrollmentId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: statusMap[paymentStatus] || 'PENDING' }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to update')
      }

      setEnrollments((prev) =>
        prev.map((enrollment) =>
          enrollment.id === enrollmentId
            ? { ...enrollment, paymentStatus }
            : enrollment
        )
      )
    } catch (err) {
      console.error('Update payment status error:', err)
      throw err
    }
  }

  const getUserEnrollments = (userId: string) => {
    return enrollments.filter((enrollment) => enrollment.userId === userId)
  }

  const getCourseEnrollments = (courseId: string) => {
    return enrollments.filter((enrollment) => enrollment.courseId === courseId)
  }

  return {
    enrollments,
    isLoading,
    error,
    enrollInCourse,
    updatePaymentStatus,
    getUserEnrollments,
    getCourseEnrollments,
    refetch: fetchEnrollments,
  }
}
