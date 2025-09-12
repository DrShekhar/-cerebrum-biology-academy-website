'use client'

import { useState } from 'react'
import { id } from '@/lib/db'
import type { Enrollment } from '@/lib/db'

export function useEnrollment() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const enrollInCourse = async (
    enrollmentData: Omit<Enrollment, 'id' | 'enrollmentDate' | 'paymentStatus'>
  ) => {
    try {
      setIsLoading(true)
      const enrollmentId = id()
      const newEnrollment: Enrollment = {
        ...enrollmentData,
        id: enrollmentId,
        paymentStatus: 'pending',
        enrollmentDate: Date.now(),
      }

      // In real implementation, use db.transact(tx.enrollments[enrollmentId].update(newEnrollment))
      console.log('Enrolling in course:', newEnrollment)
      setEnrollments((prev) => [...prev, newEnrollment])
      return newEnrollment
    } catch (error) {
      console.error('Course enrollment error:', error)
      setError('Failed to enroll in course')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const updatePaymentStatus = async (
    enrollmentId: string,
    paymentStatus: Enrollment['paymentStatus']
  ) => {
    try {
      // In real implementation, use db.transact(tx.enrollments[enrollmentId].update({ paymentStatus }))
      console.log('Updating payment status:', enrollmentId, paymentStatus)
      setEnrollments((prev) =>
        prev.map((enrollment) =>
          enrollment.id === enrollmentId ? { ...enrollment, paymentStatus } : enrollment
        )
      )
    } catch (error) {
      console.error('Update payment status error:', error)
      throw error
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
  }
}
