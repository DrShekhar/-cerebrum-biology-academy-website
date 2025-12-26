'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  BookOpen,
  Clock,
  CheckCircle,
  Play,
  Calendar,
  Trophy,
  ArrowLeft,
  GraduationCap,
  Loader2,
  Video,
  FileText,
  Download,
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
  enrolledAt: string
  validUntil: string
  status: 'ACTIVE' | 'EXPIRED' | 'CANCELLED'
  progress: number
  modules: CourseModule[]
  features: string[]
}

interface CourseModule {
  id: string
  title: string
  description: string
  order: number
  isLocked: boolean
  isCompleted: boolean
  lessons: ModuleLesson[]
}

interface ModuleLesson {
  id: string
  title: string
  type: 'video' | 'document' | 'quiz' | 'assignment'
  duration?: number
  isCompleted: boolean
  isLocked: boolean
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

  const isExpired = course.status === 'EXPIRED' || new Date(course.validUntil) < new Date()
  const daysRemaining = Math.ceil(
    (new Date(course.validUntil).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  )

  // Mock data for demonstration if no modules exist
  const displayModules: CourseModule[] =
    course.modules?.length > 0
      ? course.modules
      : [
          {
            id: '1',
            title: 'Introduction to Biology',
            description: 'Get started with the fundamentals',
            order: 1,
            isLocked: false,
            isCompleted: true,
            lessons: [
              {
                id: '1a',
                title: 'Welcome to the Course',
                type: 'video',
                duration: 10,
                isCompleted: true,
                isLocked: false,
              },
              {
                id: '1b',
                title: 'Course Overview',
                type: 'document',
                isCompleted: true,
                isLocked: false,
              },
              {
                id: '1c',
                title: 'Introduction Quiz',
                type: 'quiz',
                isCompleted: false,
                isLocked: false,
              },
            ],
          },
          {
            id: '2',
            title: 'Cell Biology',
            description: 'Understanding cellular structures',
            order: 2,
            isLocked: false,
            isCompleted: false,
            lessons: [
              {
                id: '2a',
                title: 'Cell Structure',
                type: 'video',
                duration: 25,
                isCompleted: false,
                isLocked: false,
              },
              {
                id: '2b',
                title: 'Cell Organelles',
                type: 'video',
                duration: 30,
                isCompleted: false,
                isLocked: false,
              },
              {
                id: '2c',
                title: 'Practice Questions',
                type: 'quiz',
                isCompleted: false,
                isLocked: false,
              },
            ],
          },
          {
            id: '3',
            title: 'Genetics',
            description: 'DNA, RNA and inheritance',
            order: 3,
            isLocked: true,
            isCompleted: false,
            lessons: [
              {
                id: '3a',
                title: 'DNA Structure',
                type: 'video',
                duration: 35,
                isCompleted: false,
                isLocked: true,
              },
              {
                id: '3b',
                title: 'Genetic Inheritance',
                type: 'video',
                duration: 40,
                isCompleted: false,
                isLocked: true,
              },
            ],
          },
        ]

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
              <span className="font-medium text-gray-900">{course.progress || 0}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-500 to-green-600 h-3 rounded-full transition-all"
                style={{ width: `${course.progress || 0}%` }}
              />
            </div>
          </div>

          {/* Course Meta */}
          <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Enrolled: {new Date(course.enrolledAt).toLocaleDateString('en-IN')}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              {isExpired
                ? 'Subscription expired'
                : daysRemaining > 0
                  ? `${daysRemaining} days remaining`
                  : 'Expires today'}
            </div>
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

            {displayModules.map((module, index) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className={cn(module.isLocked && 'opacity-75')}>
                  <CardContent className="p-0">
                    <button
                      onClick={() => setActiveModule(activeModule === module.id ? null : module.id)}
                      className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                      disabled={module.isLocked}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={cn(
                            'w-10 h-10 rounded-lg flex items-center justify-center',
                            module.isCompleted
                              ? 'bg-green-100'
                              : module.isLocked
                                ? 'bg-gray-100'
                                : 'bg-blue-100'
                          )}
                        >
                          {module.isLocked ? (
                            <Lock className="w-5 h-5 text-gray-500" />
                          ) : module.isCompleted ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <BookOpen className="w-5 h-5 text-blue-600" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            Module {module.order}: {module.title}
                          </h3>
                          <p className="text-sm text-gray-600">{module.description}</p>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">{module.lessons.length} lessons</div>
                    </button>

                    {activeModule === module.id && !module.isLocked && (
                      <div className="border-t bg-gray-50 p-4 space-y-2">
                        {module.lessons.map((lesson) => (
                          <LessonItem key={lesson.id} lesson={lesson} isExpired={isExpired} />
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
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
                  <span className="text-gray-600">Completed Modules</span>
                  <span className="font-semibold">
                    {displayModules.filter((m) => m.isCompleted).length}/{displayModules.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Lessons</span>
                  <span className="font-semibold">
                    {displayModules.reduce((acc, m) => acc + m.lessons.length, 0)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Time Spent</span>
                  <span className="font-semibold">12h 30m</span>
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

function LessonItem({ lesson, isExpired }: { lesson: ModuleLesson; isExpired: boolean }) {
  const getIcon = () => {
    switch (lesson.type) {
      case 'video':
        return <Video className="w-4 h-4" />
      case 'document':
        return <FileText className="w-4 h-4" />
      case 'quiz':
        return <Target className="w-4 h-4" />
      case 'assignment':
        return <Download className="w-4 h-4" />
      default:
        return <BookOpen className="w-4 h-4" />
    }
  }

  return (
    <div
      className={cn(
        'flex items-center justify-between p-3 rounded-lg',
        lesson.isCompleted ? 'bg-green-50' : 'bg-white',
        (lesson.isLocked || isExpired) && 'opacity-60'
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            'w-8 h-8 rounded-full flex items-center justify-center',
            lesson.isCompleted ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
          )}
        >
          {lesson.isLocked || isExpired ? <Lock className="w-4 h-4" /> : getIcon()}
        </div>
        <div>
          <p className="font-medium text-gray-900 text-sm">{lesson.title}</p>
          {lesson.duration && <p className="text-xs text-gray-500">{lesson.duration} min</p>}
        </div>
      </div>

      {!lesson.isLocked && !isExpired && (
        <Button variant="ghost" size="sm" className="text-blue-600">
          {lesson.isCompleted ? 'Review' : 'Start'}
        </Button>
      )}
    </div>
  )
}
