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
  Award,
  ClipboardList,
  Star,
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { cn } from '@/lib/utils'
import { showToast } from '@/lib/toast'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'

interface CourseDetails {
  id: string
  name: string
  description: string
  type: string
  enrollmentId: string
  enrollmentDate: string
  endDate: string | null
  status: 'ACTIVE' | 'EXPIRED' | 'CANCELLED'
  currentProgress: number
  nextCourseOffer?: { courseId: string; name: string; text: string | null } | null
  modules: CourseModule[]
  features: string[]
}

// Shape returned by /api/enrollments/[courseId]: chapters -> topics + materials.
interface CourseMaterial {
  id: string
  title: string
  materialType: string
  videoLectureId?: string | null
  videoReady?: boolean
  test?: {
    templateId: string
    timeLimit: number
    questionCount: number
    topics: unknown
    difficulty: string
    curriculum: string
    grade: string
    subject: string
  } | null
  completed?: boolean
  myRating?: number | null
}

interface CourseModule {
  id: string
  title: string
  sortOrder: number
  topics: { id: string; title: string; orderIndex: number }[]
  materials: CourseMaterial[]
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

  const [claiming, setClaiming] = useState(false)
  async function handleClaimCertificate() {
    if (!course?.enrollmentId || claiming) return
    setClaiming(true)
    try {
      const res = await fetch('/api/certificates/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enrollmentId: course.enrollmentId }),
      })
      const json = await res.json()
      if (res.ok && json.success !== false) {
        showToast.success('Certificate issued! Find it under My Certificates.')
      } else {
        // Server gates eligibility; show its friendly reason (e.g. complete more).
        showToast.error(json.detail || json.error || 'Not eligible for a certificate yet.')
      }
    } catch {
      showToast.error('Could not claim certificate. Please try again.')
    } finally {
      setClaiming(false)
    }
  }

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

          {/* Completion celebration + next-course offer */}
          {(course.currentProgress || 0) >= 100 && (
            <div className="mt-6 rounded-2xl border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-yellow-50 p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-lg font-bold text-amber-900">
                    🎉 Congratulations — you completed this course!
                  </p>
                  <p className="mt-1 text-sm text-amber-800">
                    Claim your certificate, and keep the momentum going.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href="/student/certificates"
                    className="rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-bold text-white hover:bg-amber-600"
                  >
                    Claim certificate
                  </Link>
                  {course.nextCourseOffer && (
                    <a
                      href={`https://wa.me/918826444334?text=${encodeURIComponent(`Hi! I just completed ${course.name} and I'm interested in ${course.nextCourseOffer.name}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl bg-green-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-green-700"
                    >
                      Next: {course.nextCourseOffer.name} →
                    </a>
                  )}
                </div>
              </div>
              {course.nextCourseOffer?.text && (
                <p className="mt-3 text-sm font-medium text-green-800">
                  {course.nextCourseOffer.text}
                </p>
              )}
            </div>
          )}

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
                <Button
                  variant="outline"
                  className="w-full justify-start border-green-300 text-green-700 hover:bg-green-50"
                  onClick={handleClaimCertificate}
                  disabled={claiming}
                >
                  <Award className="w-4 h-4 mr-2" />
                  {claiming ? 'Checking…' : 'Claim Certificate'}
                </Button>
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

function MaterialItem({ material, isExpired }: { material: CourseMaterial; isExpired: boolean }) {
  const router = useRouter()
  const isVideo = material.materialType?.toUpperCase().includes('VIDEO')
  const isTest = material.materialType === 'TEST' && !!material.test
  const isArticle = material.materialType === 'ARTICLE'
  const icon = isTest ? (
    <ClipboardList className="w-4 h-4" />
  ) : isVideo ? (
    <Video className="w-4 h-4" />
  ) : (
    <FileText className="w-4 h-4" />
  )
  const [done, setDone] = useState(!!material.completed)
  const [saving, setSaving] = useState(false)
  const [startingTest, setStartingTest] = useState(false)
  const [myRating, setMyRating] = useState<number | null>(material.myRating ?? null)

  async function rate(stars: number) {
    const prev = myRating
    setMyRating(stars) // optimistic
    try {
      const res = await fetch(`/api/student/materials/${material.id}/rate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating: stars }),
      })
      if (!res.ok) throw new Error()
    } catch {
      setMyRating(prev)
      showToast.error('Could not save your rating')
    }
  }

  // TEST lessons start a CBT session on the existing engine and open the
  // secure test player. Completion is marked when the session is submitted.
  async function startTest() {
    if (!material.test || startingTest) return
    setStartingTest(true)
    try {
      const t = material.test
      const res = await fetch('/api/test/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          testTemplateId: t.templateId,
          topics: Array.isArray(t.topics) && t.topics.length ? t.topics : ['General'],
          difficulty: t.difficulty || 'MEDIUM',
          questionCount: t.questionCount || 30,
          timeLimit: t.timeLimit || 60,
          curriculum: t.curriculum || 'NEET',
          grade: t.grade || 'CLASS_12',
          subject: t.subject || 'biology',
        }),
      })
      const json = await res.json()
      const sessionId = json?.data?.testSession?.id || json?.testSession?.id || json?.sessionId
      if (!res.ok || !sessionId) throw new Error(json?.error || 'Could not start the test')
      router.push(`/test/session/${sessionId}`)
    } catch (err) {
      showToast.error(err instanceof Error ? err.message : 'Could not start the test')
      setStartingTest(false)
    }
  }

  // Video lessons open in the secure /learn player (videoId = video_lectures.id);
  // documents stream via the entitlement-gated delivery endpoint. A video whose
  // lecture isn't READY yet shows a disabled "Processing" state.
  const isVideoLesson = isVideo && !!material.videoLectureId
  const videoProcessing = isVideo && material.videoLectureId && !material.videoReady
  const href = isVideoLesson
    ? `/learn/${material.videoLectureId}`
    : isArticle
      ? `/student/article/${material.id}`
      : `/api/student/materials/${material.id}/download`
  const isInternal = isVideoLesson || isArticle
  const label = isVideo ? 'Watch' : isArticle ? 'Read' : 'Open'

  async function toggleComplete() {
    if (saving) return
    const next = !done
    setSaving(true)
    setDone(next) // optimistic
    try {
      const res = await fetch(`/api/student/materials/${material.id}/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: next }),
      })
      if (!res.ok) throw new Error()
    } catch {
      setDone(!next) // revert
      showToast.error('Could not update progress')
    } finally {
      setSaving(false)
    }
  }

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
        <div>
          <p className="font-medium text-gray-900 text-sm">{material.title}</p>
          {!isExpired && (
            <div className="mt-0.5 flex items-center gap-0.5" aria-label="Rate this lesson">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  onClick={() => rate(s)}
                  title={`Rate ${s} star${s > 1 ? 's' : ''}`}
                  aria-label={`Rate ${s} star${s > 1 ? 's' : ''}`}
                  className="p-0.5"
                >
                  <Star
                    className={cn(
                      'w-3 h-3 transition-colors',
                      myRating && s <= myRating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-200 hover:text-yellow-300'
                    )}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1">
        {!isExpired && (
          <button
            onClick={toggleComplete}
            disabled={saving}
            title={done ? 'Mark as not done' : 'Mark complete'}
            className={cn(
              'p-1.5 rounded-full transition-colors',
              done ? 'text-green-600' : 'text-gray-300 hover:text-gray-500'
            )}
          >
            <CheckCircle className="w-5 h-5" />
          </button>
        )}
        {!isExpired &&
          (isTest ? (
            <Button
              variant="ghost"
              size="sm"
              className="text-blue-600"
              onClick={startTest}
              disabled={startingTest}
            >
              {startingTest ? 'Starting…' : 'Start test'}
            </Button>
          ) : videoProcessing ? (
            <span className="text-xs text-gray-400 px-3">Processing…</span>
          ) : isInternal ? (
            <Link href={href}>
              <Button variant="ghost" size="sm" className="text-blue-600">
                {label}
              </Button>
            </Link>
          ) : (
            <a href={href} target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="sm" className="text-blue-600">
                {label}
              </Button>
            </a>
          ))}
      </div>
    </div>
  )
}
