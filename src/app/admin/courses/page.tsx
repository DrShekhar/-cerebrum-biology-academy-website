'use client'

/**
 * Course Management — honest list over real DB fields. Every card opens the
 * course workspace (/admin/courses/[id]) where curriculum, pricing, settings,
 * students and analytics live. No fabricated ratings/capacity/trends.
 */

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import {
  BookOpen,
  Users,
  Clock,
  Star,
  TrendingUp,
  Plus,
  Search,
  BarChart3,
  Globe,
  FileEdit,
} from 'lucide-react'
import { paiseToRupees, formatPaiseToINR } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { PageHeader } from '@/components/admin/kit'
import { CreateCourseForm } from '@/components/admin/CreateCourseForm'
import { showToast } from '@/lib/toast'

interface Course {
  id: string
  name: string
  type: string
  class: string
  duration: number
  chapters: number
  enrollments: number
  instructor: string | null
  status: string // DRAFT | PUBLISHED | ARCHIVED
  price: number // paise
  description: string
  topics: string[]
  scheduleInfo: string | null
  startDate: string | null
}

const STATUS_STYLE: Record<string, string> = {
  PUBLISHED: 'bg-green-100 text-green-800',
  DRAFT: 'bg-yellow-100 text-yellow-800',
  ARCHIVED: 'bg-gray-200 text-gray-600',
}

const TYPE_STYLE: Record<string, string> = {
  CLASS_11: 'bg-blue-100 text-blue-800',
  CLASS_12: 'bg-purple-100 text-purple-800',
  DROPPER: 'bg-red-100 text-red-800',
  FOUNDATION: 'bg-green-100 text-green-800',
  NEET_COMPLETE: 'bg-teal-100 text-teal-800',
  CRASH_COURSE: 'bg-orange-100 text-orange-800',
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  const fetchCourses = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/courses?limit=100')
      const data = await res.json()
      if (data.success && data.data?.courses) {
        setCourses(
          data.data.courses.map(
            (c: {
              id: string
              name: string
              type: string
              class: string
              duration: number
              totalFees: number
              status?: string
              isActive: boolean
              description: string | null
              syllabus: unknown
              scheduleInfo?: string | null
              startDate?: string | null
              instructor?: { name: string } | null
              _count?: { chapters: number; enrollments: number }
            }) => ({
              id: c.id,
              name: c.name,
              type: c.type,
              class: c.class,
              duration: c.duration,
              chapters: c._count?.chapters || 0,
              enrollments: c._count?.enrollments || 0,
              instructor: c.instructor?.name || null,
              status: c.status || (c.isActive ? 'PUBLISHED' : 'DRAFT'),
              price: c.totalFees || 0,
              description: c.description || '',
              topics: Array.isArray(c.syllabus) ? (c.syllabus as string[]) : [],
              scheduleInfo: c.scheduleInfo || null,
              startDate: c.startDate || null,
            })
          )
        )
      }
    } catch {
      showToast.error('Failed to load courses')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCourses()
  }, [fetchCourses])

  const setStatus = async (course: Course, status: 'PUBLISHED' | 'DRAFT') => {
    const res = await fetch(`/api/admin/courses/${course.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    const json = await res.json()
    if (res.ok && json.success) {
      showToast.success(status === 'PUBLISHED' ? 'Course published' : 'Course unpublished')
      fetchCourses()
    } else {
      showToast.error(json.error || 'Status change failed')
    }
  }

  const filtered = courses.filter((c) => {
    if (
      searchTerm &&
      !c.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !(c.instructor || '').toLowerCase().includes(searchTerm.toLowerCase()) &&
      !c.topics.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()))
    )
      return false
    if (typeFilter !== 'all' && c.type !== typeFilter) return false
    if (statusFilter !== 'all' && c.status !== statusFilter) return false
    return true
  })

  const published = courses.filter((c) => c.status === 'PUBLISHED').length
  const totalStudents = courses.reduce((acc, c) => acc + c.enrollments, 0)
  const revenuePotential = courses.reduce((acc, c) => acc + c.price * c.enrollments, 0)

  return (
    <>
      <div className="p-6 space-y-8">
        <PageHeader
          title="Course Management"
          subtitle="Curriculum, pricing, students and analytics — open a course to manage everything."
          actions={
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => setIsCreateOpen(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Course
            </Button>
          }
        />

        {/* Stats — real fields only */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              label: 'Total Courses',
              value: courses.length,
              icon: BookOpen,
              color: 'bg-blue-100 text-blue-600',
            },
            {
              label: 'Published',
              value: published,
              icon: Globe,
              color: 'bg-green-100 text-green-600',
            },
            {
              label: 'Enrollments',
              value: totalStudents,
              icon: Users,
              color: 'bg-purple-100 text-purple-600',
            },
            {
              label: 'Enrolled value',
              value: `₹${(paiseToRupees(revenuePotential) / 100000).toFixed(1)}L`,
              icon: TrendingUp,
              color: 'bg-orange-100 text-orange-600',
            },
          ].map((stat) => (
            <div key={stat.label} className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div
                  className={`h-12 w-12 rounded-lg flex items-center justify-center ${stat.color}`}
                >
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by name, instructor, or syllabus topic…"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                aria-label="Filter by type"
              >
                <option value="all">All Types</option>
                <option value="NEET_COMPLETE">NEET Complete</option>
                <option value="CLASS_11">Class 11</option>
                <option value="CLASS_12">Class 12</option>
                <option value="DROPPER">Dropper</option>
                <option value="FOUNDATION">Foundation</option>
                <option value="CRASH_COURSE">Crash Course</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                aria-label="Filter by status"
              >
                <option value="all">All Status</option>
                <option value="PUBLISHED">Published</option>
                <option value="DRAFT">Draft</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-56 animate-pulse rounded-xl border border-gray-200 bg-gray-50"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filtered.map((course) => (
              <div
                key={course.id}
                className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/admin/courses/${course.id}`}
                      className="text-lg font-semibold text-gray-900 hover:text-blue-700"
                    >
                      {course.name}
                    </Link>
                    <div className="flex gap-2 mt-2 mb-1 flex-wrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${TYPE_STYLE[course.type] || 'bg-gray-100 text-gray-800'}`}
                      >
                        {course.type.replace(/_/g, ' ')}
                      </span>
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${STATUS_STYLE[course.status] || 'bg-gray-100 text-gray-800'}`}
                      >
                        {course.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">{course.enrollments}</div>
                    <div className="text-xs text-gray-600">Enrolled</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">{course.chapters}</div>
                    <div className="text-xs text-gray-600">Chapters</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">
                      {formatPaiseToINR(course.price)}
                    </div>
                    <div className="text-xs text-gray-600">Fee</div>
                  </div>
                </div>

                <div className="space-y-1.5 mb-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    {course.duration} months
                    {course.startDate
                      ? ` · starts ${new Date(course.startDate).toLocaleDateString('en-IN')}`
                      : ''}
                  </div>
                  {course.instructor && (
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-2" />
                      {course.instructor}
                    </div>
                  )}
                  {course.scheduleInfo && (
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      {course.scheduleInfo}
                    </div>
                  )}
                </div>

                <div className="flex space-x-2 pt-4 border-t border-gray-200">
                  <Link href={`/admin/courses/${course.id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      <BookOpen className="w-3 h-3 mr-1" />
                      Curriculum
                    </Button>
                  </Link>
                  <Link href={`/admin/courses/${course.id}?tab=students`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      <Users className="w-3 h-3 mr-1" />
                      Students
                    </Button>
                  </Link>
                  <Link href={`/admin/courses/${course.id}?tab=analytics`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      <BarChart3 className="w-3 h-3 mr-1" />
                      Analytics
                    </Button>
                  </Link>
                  {course.status === 'DRAFT' ? (
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={() => setStatus(course, 'PUBLISHED')}
                    >
                      <Globe className="w-3 h-3 mr-1" />
                      Publish
                    </Button>
                  ) : course.status === 'PUBLISHED' ? (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => setStatus(course, 'DRAFT')}
                    >
                      <FileEdit className="w-3 h-3 mr-1" />
                      Unpublish
                    </Button>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No courses found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {courses.length === 0
                ? 'Create your first course to get started.'
                : 'No courses match your current filters.'}
            </p>
          </div>
        )}
      </div>

      <Modal
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        title="Create New Course"
        description="Basics first — curriculum, pricing and publishing happen in the course workspace."
        size="xl"
      >
        <CreateCourseForm
          onSuccess={() => {
            setIsCreateOpen(false)
            fetchCourses()
          }}
          onCancel={() => setIsCreateOpen(false)}
        />
      </Modal>
    </>
  )
}
