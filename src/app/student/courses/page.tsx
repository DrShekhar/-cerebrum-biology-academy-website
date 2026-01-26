'use client'

// Force dynamic rendering to prevent auth issues during static build
export const dynamic = 'force-dynamic'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Clock, Play, Calendar, Trophy, GraduationCap, Loader2 } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface EnrolledCourse {
  id: string
  courseId: string
  courseName: string
  courseType: string
  enrolledAt: string
  validUntil: string
  status: 'ACTIVE' | 'EXPIRED' | 'CANCELLED'
  progress?: number
  lastAccessedAt?: string
}

export default function StudentCoursesPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth()
  const [courses, setCourses] = useState<EnrolledCourse[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchEnrolledCourses() {
      if (!user?.id) return

      try {
        setIsLoading(true)
        const response = await fetch(`/api/enrollments?userId=${user.id}`)
        const data = await response.json()

        if (data.success) {
          setCourses(data.enrollments || [])
        } else {
          setError(data.error || 'Failed to fetch courses')
        }
      } catch (err) {
        console.error('Error fetching courses:', err)
        setError('Failed to load your courses')
      } finally {
        setIsLoading(false)
      }
    }

    if (isAuthenticated && user?.id) {
      fetchEnrolledCourses()
    } else if (!authLoading && !isAuthenticated) {
      setIsLoading(false)
    }
  }, [user?.id, isAuthenticated, authLoading])

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading your courses...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <GraduationCap className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Please Log In</h2>
            <p className="text-gray-600 mb-6">
              Log in to view your enrolled courses and continue learning.
            </p>
            <Link href="/auth/whatsapp">
              <Button variant="primary" className="w-full">
                Log In to Continue
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Courses</h1>
              <p className="text-gray-600 mt-1">
                Access your enrolled courses and continue learning
              </p>
            </div>
            <Link href="/courses">
              <Button variant="outline">
                <BookOpen className="w-4 h-4 mr-2" />
                Browse More Courses
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error ? (
          <Card>
            <CardContent className="p-8">
              <EmptyState
                icon={BookOpen}
                title="Error Loading Courses"
                description={error}
                primaryAction={{
                  label: 'Try Again',
                  onClick: () => window.location.reload(),
                }}
                size="lg"
                variant="default"
              />
            </CardContent>
          </Card>
        ) : courses.length === 0 ? (
          <Card>
            <CardContent className="p-8">
              <EmptyState
                icon={GraduationCap}
                title="No Courses Yet"
                description="You haven't enrolled in any courses yet. Browse our courses and start your learning journey!"
                primaryAction={{
                  label: 'Browse Courses',
                  href: '/courses',
                }}
                secondaryAction={{
                  label: 'View Free Resources',
                  href: '/resources',
                }}
                size="lg"
                variant="default"
              />
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </div>
        )}

        {/* Quick Links */}
        {courses.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Links</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <QuickLinkCard
                icon={<Play className="w-6 h-6" />}
                title="Continue Learning"
                description="Resume where you left off"
                href="/dashboard"
                color="from-blue-500 to-blue-600"
              />
              <QuickLinkCard
                icon={<Trophy className="w-6 h-6" />}
                title="Practice Tests"
                description="Test your knowledge"
                href="/mock-tests"
                color="bg-green-600"
              />
              <QuickLinkCard
                icon={<BookOpen className="w-6 h-6" />}
                title="Study Materials"
                description="Access resources"
                href="/student/materials"
                color="from-purple-500 to-purple-600"
              />
              <QuickLinkCard
                icon={<Calendar className="w-6 h-6" />}
                title="Class Schedule"
                description="View upcoming classes"
                href="/student/attendance"
                color="from-orange-500 to-orange-600"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function CourseCard({ course, index }: { course: EnrolledCourse; index: number }) {
  const isExpired = course.status === 'EXPIRED' || new Date(course.validUntil) < new Date()
  const daysRemaining = Math.ceil(
    (new Date(course.validUntil).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card className={cn('h-full hover:shadow-lg transition-shadow', isExpired && 'opacity-75')}>
        <CardContent className="p-6">
          {/* Course Header */}
          <div className="flex items-start justify-between mb-4">
            <div
              className={cn(
                'w-12 h-12 rounded-lg flex items-center justify-center',
                isExpired ? 'bg-gray-100' : 'bg-blue-100'
              )}
            >
              <GraduationCap
                className={cn('w-6 h-6', isExpired ? 'text-gray-500' : 'text-blue-600')}
              />
            </div>
            <span
              className={cn(
                'px-3 py-1 rounded-full text-xs font-medium',
                course.status === 'ACTIVE' && !isExpired
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-600'
              )}
            >
              {isExpired ? 'Expired' : 'Active'}
            </span>
          </div>

          {/* Course Info */}
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.courseName}</h3>
          <p className="text-sm text-gray-600 mb-4">{course.courseType}</p>

          {/* Progress Bar */}
          {course.progress !== undefined && (
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-600">Progress</span>
                <span className="font-medium text-gray-900">{course.progress}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Course Meta */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="w-4 h-4 mr-2" />
              Enrolled: {new Date(course.enrolledAt).toLocaleDateString('en-IN')}
            </div>
            {!isExpired && (
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="w-4 h-4 mr-2" />
                {daysRemaining > 0 ? `${daysRemaining} days remaining` : 'Expires today'}
              </div>
            )}
          </div>

          {/* Action Button */}
          {isExpired ? (
            <Link href="/courses">
              <Button variant="outline" className="w-full">
                Renew Subscription
              </Button>
            </Link>
          ) : (
            <Link href={`/student/courses/${course.courseId}`}>
              <Button variant="primary" className="w-full">
                <Play className="w-4 h-4 mr-2" />
                Continue Learning
              </Button>
            </Link>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

function QuickLinkCard({
  icon,
  title,
  description,
  href,
  color,
}: {
  icon: React.ReactNode
  title: string
  description: string
  href: string
  color: string
}) {
  return (
    <Link href={href}>
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-4">
            <div
              className={cn(
                'w-10 h-10 rounded-lg bg-gradient-to-br flex items-center justify-center text-white mb-3',
                color
              )}
            >
              {icon}
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  )
}
