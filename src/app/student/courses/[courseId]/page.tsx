'use client'

import React, { useState, useEffect } from 'react'
import {
  BookOpen,
  Clock,
  CheckCircle,
  Play,
  Calendar,
  ArrowLeft,
  GraduationCap,
  Loader2,
  Video,
  FileText,
  MessageCircle,
  Target,
  Brain,
  Lock,
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'

interface CourseDetails {
  id: string
  name: string
  description: string
  type: string
  enrollmentDate: string
  endDate: string | null
  status: 'ACTIVE' | 'EXPIRED' | 'CANCELLED'
  currentProgress: number
  modules: CourseModule[]
  features: string[]
}

// Shape returned by /api/enrollments/[courseId]: chapters -> topics + materials.
interface CourseModule {
  id: string
  title: string
  sortOrder: number
  topics: { id: string; title: string; orderIndex: number }[]
  materials: { id: string; title: string; materialType: string }[]
}

export default function CourseDetailPage() {
  const params = useParams()
  const router = useRouter()
  const courseId = params.courseId as string
  const { user, isAuthenticated, isLoading: authLoading } = useAuth()
  const [course, setCourse] = useState<CourseDetails | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeModule, setActiveModule] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCourseDetails() {
      if (!user?.id || !courseId) return

      try {
        setIsLoading(true)
        const response = await fetch(`/api/enrollments/${courseId}?userId=${user.id}`)
        const data = await response.json()

        if (data.success) {
          setCourse(data.course)
          if (data.course.modules?.length > 0) {
            setActiveModule(data.course.modules[0].id)
          }
        } else {
          setError(data.error || 'Failed to fetch course details')
        }
      } catch (err) {
        console.error('Error fetching course:', err)
        setError('Failed to load course details')
      } finally {
        setIsLoading(false)
      }
    }

    if (isAuthenticated && user?.id) {
      fetchCourseDetails()
    } else if (!authLoading && !isAuthenticated) {
      setIsLoading(false)
    }
  }, [user?.id, courseId, isAuthenticated, authLoading])

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading course...</p>
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
            <p className="text-gray-600 mb-6">Log in to access your course content.</p>
            <Link href="/whatsapp">
              <Button variant="primary" className="w-full">
                Log In to Continue
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto pt-8">
          <Card>
            <CardContent className="p-8">
              <EmptyState
                icon={BookOpen}
                title="Course Not Found"
                description={
                  error ||
                  "We couldn't find this course. It may have been removed or you may not have access."
                }
                primaryAction={{
                  label: 'View My Courses',
                  href: '/student/courses',
                }}
                secondaryAction={{
                  label: 'Browse All Courses',
                  href: '/courses',
                }}
                size="lg"
                variant="default"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const isExpired =
    course.status === 'EXPIRED' || (!!course.endDate && new Date(course.endDate) < new Date())
  const daysRemaining = course.endDate
    ? Math.ceil((new Date(course.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : null

  // Real curriculum only — no fabricated modules. Empty curriculum shows an
  // honest empty state below.
  const displayModules: CourseModule[] = course.modules ?? []
  const totalLessons = displayModules.reduce((acc, m) => acc + m.materials.length, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to My Courses
          </button>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span
                  className={cn(
                    'px-3 py-1 rounded-full text-xs font-medium',
                    isExpired ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                  )}
                >
                  {isExpired ? 'Expired' : 'Active'}
                </span>
                <span className="text-sm text-gray-600">{course.type}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{course.name}</h1>
              <p className="text-gray-600 mt-2">{course.description}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              {!isExpired && (
                <Button variant="primary" className="bg-green-600 hover:bg-green-700">
                  <Play className="w-4 h-4 mr-2" />
                  Continue Learning
                </Button>
              )}
              <Link href="/student/doubts">
                <Button variant="outline">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Ask a Doubt
                </Button>
              </Link>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-600">Course Progress</span>
              <span className="font-medium text-gray-900">
                {course.currentProgress || 0}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-500 to-green-600 h-3 rounded-full transition-all"
                style={{ width: `${course.currentProgress || 0}%` }}
              />
            </div>
          </div>

          {/* Course Meta */}
          <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Enrolled: {new Date(course.enrollmentDate).toLocaleDateString('en-IN')}
            </div>
            {(isExpired || daysRemaining !== null) && (
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {isExpired
                  ? 'Subscription expired'
                  : daysRemaining! > 0
                    ? `${daysRemaining} days remaining`
                    : 'Expires today'}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Expired Banner */}
      {isExpired && (
        <div className="bg-red-50 border-b border-red-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-red-600" />
                <span className="text-red-800 font-medium">
                  Your subscription has expired. Renew to continue learning.
                </span>
              </div>
              <Link href="/courses">
                <Button variant="primary" size="sm" className="bg-red-600 hover:bg-red-700">
                  Renew Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Course Modules */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Course Content</h2>

            {displayModules.length === 0 && (
              <Card>
                <CardContent className="p-8">
                  <EmptyState
                    icon={BookOpen}
                    title="Course content is being prepared"
                    description="Your lectures and study materials for this course are being uploaded. Meanwhile, you can practise with mock tests or ask the AI tutor."
                    primaryAction={{ label: 'Take a Practice Test', href: '/mock-tests' }}
                    secondaryAction={{ label: 'Ask the AI Tutor', href: '/student/ai-tutor' }}
                    size="md"
                    variant="default"
                  />
                </CardContent>
              </Card>
            )}

            {displayModules.map((module) => {
              const lessonCount = module.materials.length
              return (
                <div key={module.id} className="animate-fadeInUp">
                  <Card>
                    <CardContent className="p-0">
                      <button
                        onClick={() =>
                          setActiveModule(activeModule === module.id ? null : module.id)
                        }
                        className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-blue-100">
                            <BookOpen className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              Module {module.sortOrder}: {module.title}
                            </h3>
                            {module.topics.length > 0 && (
                              <p className="text-sm text-gray-600">
                                {module.topics.length} topic{module.topics.length === 1 ? '' : 's'}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">
                          {lessonCount} {lessonCount === 1 ? 'lesson' : 'lessons'}
                        </div>
                      </button>

                      {activeModule === module.id && (
                        <div className="border-t bg-gray-50 p-4 space-y-2">
                          {module.materials.length === 0 && (
                            <p className="text-sm text-gray-500 px-3 py-2">
                              {module.topics.length > 0
                                ? `Topics: ${module.topics.map((t) => t.title).join(', ')}`
                                : 'Materials for this module are being prepared.'}
                            </p>
                          )}
                          {module.materials.map((material) => (
                            <MaterialItem
                              key={material.id}
                              material={material}
                              isExpired={isExpired}
                            />
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )
            })}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Course Progress</span>
                  <span className="font-semibold">{course.currentProgress || 0}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Modules</span>
                  <span className="font-semibold">{displayModules.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Lessons</span>
                  <span className="font-semibold">{totalLessons}</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/mock-tests" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Target className="w-4 h-4 mr-2" />
                    Take Practice Test
                  </Button>
                </Link>
                <Link href="/student/ai-tutor" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Brain className="w-4 h-4 mr-2" />
                    Ask AI Tutor
                  </Button>
                </Link>
                <Link href="/student/doubts" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Ask a Doubt
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Course Features */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Course Includes</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {(
                    course.features || [
                      'Video Lectures',
                      'Practice Tests',
                      'Study Materials',
                      'Doubt Support',
                    ]
                  ).map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

function MaterialItem({
  material,
  isExpired,
}: {
  material: { id: string; title: string; materialType: string }
  isExpired: boolean
}) {
  const isVideo = material.materialType?.toUpperCase().includes('VIDEO')
  const icon = isVideo ? <Video className="w-4 h-4" /> : <FileText className="w-4 h-4" />
  // The entitlement-gated delivery endpoint resolves the real file/stream URL
  // server-side (it enforces enrollment), so opening it is safe.
  const href = `/api/student/materials/${material.id}/download`

  return (
    <div
      className={cn(
        'flex items-center justify-between p-3 rounded-lg bg-white',
        isExpired && 'opacity-60'
      )}
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 text-gray-600">
          {isExpired ? <Lock className="w-4 h-4" /> : icon}
        </div>
        <p className="font-medium text-gray-900 text-sm">{material.title}</p>
      </div>

      {!isExpired && (
        <a href={href} target="_blank" rel="noopener noreferrer">
          <Button variant="ghost" size="sm" className="text-blue-600">
            {isVideo ? 'Watch' : 'Open'}
          </Button>
        </a>
      )}
    </div>
  )
}
