'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  BookOpen,
  Users,
  Clock,
  Calendar,
  Star,
  TrendingUp,
  Edit,
  Eye,
  Plus,
  Filter,
  Search,
  Play,
  Pause,
  Settings,
  BarChart3,
  Award,
  Target,
} from 'lucide-react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { CreateCourseForm } from '@/components/admin/CreateCourseForm'

interface Course {
  id: string
  name: string
  type: 'class-11' | 'class-12' | 'foundation' | 'dropper'
  duration: string
  totalLessons: number
  enrolledStudents: number
  maxCapacity: number
  startDate: string
  endDate: string
  instructor: string
  status: 'active' | 'upcoming' | 'completed' | 'draft'
  price: number
  rating: number
  completionRate: number
  description: string
  topics: string[]
  schedule: string
}

const mockCourses: Course[] = [
  {
    id: '1',
    name: 'NEET Biology Class 12 - Complete Course',
    type: 'class-12',
    duration: '12 months',
    totalLessons: 180,
    enrolledStudents: 245,
    maxCapacity: 300,
    startDate: '2024-04-01',
    endDate: '2025-03-31',
    instructor: 'Dr. Priya Sharma',
    status: 'active',
    price: 45000,
    rating: 4.8,
    completionRate: 87,
    description:
      'Comprehensive NEET Biology preparation for Class 12 students covering all essential topics',
    topics: [
      'Human Physiology',
      'Plant Physiology',
      'Reproduction',
      'Genetics',
      'Evolution',
      'Ecology',
    ],
    schedule: 'Mon, Wed, Fri - 4:00 PM to 6:00 PM',
  },
  {
    id: '2',
    name: 'NEET Biology Class 11 - Foundation',
    type: 'class-11',
    duration: '10 months',
    totalLessons: 150,
    enrolledStudents: 189,
    maxCapacity: 250,
    startDate: '2024-06-01',
    endDate: '2025-03-31',
    instructor: 'Dr. Rajesh Kumar',
    status: 'active',
    price: 35000,
    rating: 4.7,
    completionRate: 92,
    description: 'Strong foundation building for NEET aspirants starting in Class 11',
    topics: [
      'Cell Biology',
      'Plant Kingdom',
      'Animal Kingdom',
      'Structural Organization',
      'Biomolecules',
    ],
    schedule: 'Tue, Thu, Sat - 3:00 PM to 5:00 PM',
  },
  {
    id: '3',
    name: 'NEET Biology Dropper Batch 2025',
    type: 'dropper',
    duration: '8 months',
    totalLessons: 200,
    enrolledStudents: 156,
    maxCapacity: 200,
    startDate: '2024-08-01',
    endDate: '2025-04-30',
    instructor: 'Dr. Priya Sharma',
    status: 'active',
    price: 65000,
    rating: 4.9,
    completionRate: 85,
    description: 'Intensive crash course for dropper students targeting NEET 2025',
    topics: ['Complete Syllabus', 'Mock Tests', 'Revision', 'Problem Solving', 'Exam Strategy'],
    schedule: 'Daily - 9:00 AM to 1:00 PM',
  },
  {
    id: '4',
    name: 'Foundation Biology - Grade 9 & 10',
    type: 'foundation',
    duration: '2 years',
    totalLessons: 120,
    enrolledStudents: 98,
    maxCapacity: 150,
    startDate: '2024-04-01',
    endDate: '2026-03-31',
    instructor: 'Dr. Rajesh Kumar',
    status: 'active',
    price: 25000,
    rating: 4.6,
    completionRate: 95,
    description: 'Early foundation building for future NEET aspirants',
    topics: ['Basic Biology', 'Scientific Method', 'Life Processes', 'Diversity of Life'],
    schedule: 'Sat, Sun - 10:00 AM to 12:00 PM',
  },
]

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>(mockCourses)
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(mockCourses)
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [isCreateCourseModalOpen, setIsCreateCourseModalOpen] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'upcoming':
        return 'bg-blue-100 text-blue-800'
      case 'completed':
        return 'bg-gray-100 text-gray-800'
      case 'draft':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'class-11':
        return 'bg-blue-100 text-blue-800'
      case 'class-12':
        return 'bg-purple-100 text-purple-800'
      case 'dropper':
        return 'bg-red-100 text-red-800'
      case 'foundation':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const statsData = [
    {
      label: 'Total Courses',
      value: courses.length,
      icon: BookOpen,
      color: 'bg-blue-100 text-blue-600',
      trend: '+2 this month',
    },
    {
      label: 'Active Students',
      value: courses.reduce((acc, course) => acc + course.enrolledStudents, 0),
      icon: Users,
      color: 'bg-green-100 text-green-600',
      trend: '+15% enrollment',
    },
    {
      label: 'Avg Completion Rate',
      value: `${Math.round(courses.reduce((acc, course) => acc + course.completionRate, 0) / courses.length)}%`,
      icon: Target,
      color: 'bg-purple-100 text-purple-600',
      trend: '+3% this month',
    },
    {
      label: 'Total Revenue',
      value: `₹${Math.round(courses.reduce((acc, course) => acc + course.price * course.enrolledStudents, 0) / 100000) / 10}L`,
      icon: TrendingUp,
      color: 'bg-orange-100 text-orange-600',
      trend: '+18% growth',
    },
  ]

  return (
    <AdminLayout>
      <div className="p-6 space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Course Management</h1>
            <p className="text-gray-600 mt-2">Manage courses, curriculum, and student enrollment</p>
          </div>
          <div className="flex space-x-3">
            <Button
              variant="outline"
              className="text-gray-700 border-gray-300"
              onClick={() => alert('Advanced filtering coming soon!')}
            >
              <Filter className="w-4 h-4 mr-2" />
              Advanced Filter
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => setIsCreateCourseModalOpen(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Course
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-green-600 mt-1">{stat.trend}</p>
                </div>
                <div
                  className={`h-12 w-12 rounded-lg flex items-center justify-center ${stat.color}`}
                >
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </motion.div>
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
                  placeholder="Search courses by name, instructor, or topics..."
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
              >
                <option value="all">All Types</option>
                <option value="class-11">Class 11</option>
                <option value="class-12">Class 12</option>
                <option value="dropper">Dropper</option>
                <option value="foundation">Foundation</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="upcoming">Upcoming</option>
                <option value="completed">Completed</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow"
            >
              {/* Course Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.name}</h3>
                  <div className="flex gap-2 mb-3">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(course.type)}`}
                    >
                      {course.type.replace('-', ' ').toUpperCase()}
                    </span>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(course.status)}`}
                    >
                      {course.status.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-900">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="text-gray-600 hover:text-gray-900">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="text-gray-600 hover:text-gray-900">
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Course Stats */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">{course.enrolledStudents}</div>
                  <div className="text-xs text-gray-600">Enrolled</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">{course.totalLessons}</div>
                  <div className="text-xs text-gray-600">Lessons</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">{course.rating}</div>
                  <div className="text-xs text-gray-600 flex items-center justify-center">
                    <Star className="w-3 h-3 mr-1 text-yellow-500" />
                    Rating
                  </div>
                </div>
              </div>

              {/* Course Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  Instructor: {course.instructor}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  Duration: {course.duration}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule: {course.schedule}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Price: ₹{course.price.toLocaleString()}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Completion Rate</span>
                  <span>{course.completionRate}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${course.completionRate}%` }}
                  ></div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2 pt-4 border-t border-gray-200">
                <Button variant="outline" size="sm" className="flex-1">
                  <BarChart3 className="w-3 h-3 mr-1" />
                  Analytics
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Users className="w-3 h-3 mr-1" />
                  Students
                </Button>
                <Button size="sm" className="flex-1">
                  {course.status === 'active' ? (
                    <>
                      <Pause className="w-3 h-3 mr-1" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3 mr-1" />
                      Start
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No courses found</h3>
            <p className="mt-1 text-sm text-gray-500">No courses match your current filters.</p>
          </div>
        )}
      </div>

      <Modal
        open={isCreateCourseModalOpen}
        onOpenChange={setIsCreateCourseModalOpen}
        title="Create New Course"
        description="Fill in the details below to create a new course with curriculum and pricing."
        size="xl"
      >
        <CreateCourseForm
          onSuccess={() => {
            setIsCreateCourseModalOpen(false)
            window.location.reload()
          }}
          onCancel={() => setIsCreateCourseModalOpen(false)}
        />
      </Modal>
    </AdminLayout>
  )
}
