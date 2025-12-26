'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Users,
  Search,
  BookOpen,
  Calendar,
  TrendingUp,
  Award,
  Clock,
  Mail,
  Phone,
  MapPin,
  Star,
  MessageSquare,
  Edit,
  Eye,
  UserCheck,
  Activity,
  Target,
  CheckCircle,
} from 'lucide-react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { Button } from '@/components/ui/Button'

interface ActiveStudent {
  id: string
  name: string
  email: string
  phone: string
  class: string
  school: string
  city: string
  state: string
  coursesEnrolled: string[]
  joiningDate: string
  lastActivity: string
  totalPayments: number
  averageScore: number
  attendanceRate: number
  assignmentCompletion: number
  upcomingTests: number
  recentAchievements: string[]
  assignedCounselor: string
  nextClass: string
  strengths: string[]
  areasForImprovement: string[]
  parentSatisfaction: number
}

const mockActiveStudents: ActiveStudent[] = [
  {
    id: '1',
    name: 'Rahul Kumar',
    email: 'rahul.kumar@email.com',
    phone: '+91 9876543210',
    class: '12th',
    school: 'Delhi Public School',
    city: 'Delhi',
    state: 'Delhi',
    coursesEnrolled: ['NEET Biology Class 12', 'Foundation Biology'],
    joiningDate: '2024-01-15',
    lastActivity: '2025-01-16T10:30:00Z',
    totalPayments: 45000,
    averageScore: 88.5,
    attendanceRate: 92,
    assignmentCompletion: 95,
    upcomingTests: 2,
    recentAchievements: ['Scored 95% in Cell Biology test', 'Perfect attendance this month'],
    assignedCounselor: 'Dr. Priya Sharma',
    nextClass: 'Today 4:00 PM - Genetics',
    strengths: ['Cell Biology', 'Plant Physiology'],
    areasForImprovement: ['Ecology', 'Human Physiology'],
    parentSatisfaction: 9.5,
  },
  {
    id: '2',
    name: 'Priya Singh',
    email: 'priya.singh@email.com',
    phone: '+91 9876543212',
    class: '11th',
    school: 'Kendriya Vidyalaya',
    city: 'Mumbai',
    state: 'Maharashtra',
    coursesEnrolled: ['NEET Biology Class 11'],
    joiningDate: '2024-06-10',
    lastActivity: '2025-01-15T14:20:00Z',
    totalPayments: 25000,
    averageScore: 92.3,
    attendanceRate: 98,
    assignmentCompletion: 88,
    upcomingTests: 1,
    recentAchievements: ['Top scorer in monthly assessment', 'Completed all practice sets'],
    assignedCounselor: 'Dr. Rajesh Kumar',
    nextClass: 'Tomorrow 2:00 PM - Plant Kingdom',
    strengths: ['Botany', 'Biomolecules'],
    areasForImprovement: ['Animal Kingdom', 'Structural Organization'],
    parentSatisfaction: 9.2,
  },
  {
    id: '3',
    name: 'Sneha Reddy',
    email: 'sneha.reddy@email.com',
    phone: '+91 9876543216',
    class: 'Dropper',
    school: 'Narayana Junior College',
    city: 'Hyderabad',
    state: 'Telangana',
    coursesEnrolled: ['NEET Biology Dropper', 'Intensive Biology'],
    joiningDate: '2024-03-01',
    lastActivity: '2025-01-16T09:45:00Z',
    totalPayments: 65000,
    averageScore: 85.8,
    attendanceRate: 87,
    assignmentCompletion: 91,
    upcomingTests: 3,
    recentAchievements: ['Improved from 78% to 85%', 'Consistent performance'],
    assignedCounselor: 'Dr. Priya Sharma',
    nextClass: 'Today 6:00 PM - Human Physiology',
    strengths: ['Human Physiology', 'Reproduction'],
    areasForImprovement: ['Genetics', 'Evolution'],
    parentSatisfaction: 8.8,
  },
]

export default function ActiveStudentsPage() {
  const [students, setStudents] = useState<ActiveStudent[]>(mockActiveStudents)
  const [filteredStudents, setFilteredStudents] = useState<ActiveStudent[]>(mockActiveStudents)
  const [searchTerm, setSearchTerm] = useState('')
  const [courseFilter, setCourseFilter] = useState<string>('all')

  useEffect(() => {
    let filtered = students

    if (searchTerm) {
      filtered = filtered.filter(
        (student) =>
          student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.phone.includes(searchTerm) ||
          student.school.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (courseFilter !== 'all') {
      filtered = filtered.filter((student) =>
        student.coursesEnrolled.some((course) =>
          course.toLowerCase().includes(courseFilter.toLowerCase())
        )
      )
    }

    setFilteredStudents(filtered)
  }, [students, searchTerm, courseFilter])

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100'
    if (score >= 80) return 'text-blue-600 bg-blue-100'
    if (score >= 70) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  const statsData = [
    {
      label: 'Active Students',
      value: students.length,
      icon: UserCheck,
      color: 'bg-green-100 text-green-600',
      trend: '+8%',
    },
    {
      label: 'Average Score',
      value: `${(students.reduce((acc, s) => acc + s.averageScore, 0) / students.length).toFixed(1)}%`,
      icon: Award,
      color: 'bg-blue-100 text-blue-600',
      trend: '+2.3%',
    },
    {
      label: 'Attendance Rate',
      value: `${(students.reduce((acc, s) => acc + s.attendanceRate, 0) / students.length).toFixed(1)}%`,
      icon: Calendar,
      color: 'bg-purple-100 text-purple-600',
      trend: '+1.5%',
    },
    {
      label: 'Assignment Completion',
      value: `${(students.reduce((acc, s) => acc + s.assignmentCompletion, 0) / students.length).toFixed(1)}%`,
      icon: CheckCircle,
      color: 'bg-orange-100 text-orange-600',
      trend: '+4.2%',
    },
  ]

  return (
    <AdminLayout>
      <div className="p-6 space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Active Students</h1>
            <p className="text-gray-600 mt-2">
              Monitor performance and engagement of enrolled students
            </p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Activity className="w-4 h-4 mr-2" />
            Performance Report
          </Button>
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
                  <p className="text-xs text-green-600 mt-1">{stat.trend} from last month</p>
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
                  placeholder="Search active students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Courses</option>
              <option value="class 11">Class 11</option>
              <option value="class 12">Class 12</option>
              <option value="dropper">Dropper</option>
              <option value="foundation">Foundation</option>
            </select>
          </div>
        </div>

        {/* Students Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredStudents.map((student, index) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow"
            >
              {/* Student Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{student.name}</h3>
                    <p className="text-sm text-gray-600">
                      {student.class} • {student.school}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-900">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="text-green-600 hover:text-green-900">
                    <MessageSquare className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div
                    className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getPerformanceColor(student.averageScore)}`}
                  >
                    {student.averageScore}%
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Average Score</p>
                </div>
                <div className="text-center">
                  <div
                    className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getPerformanceColor(student.attendanceRate)}`}
                  >
                    {student.attendanceRate}%
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Attendance</p>
                </div>
              </div>

              {/* Next Class */}
              <div className="bg-blue-50 p-3 rounded-lg mb-4">
                <div className="flex items-center text-blue-800">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">Next Class</span>
                </div>
                <p className="text-sm text-blue-700 mt-1">{student.nextClass}</p>
              </div>

              {/* Recent Achievements */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                  <Star className="w-4 h-4 mr-2 text-yellow-500" />
                  Recent Achievements
                </h4>
                <div className="space-y-1">
                  {student.recentAchievements.slice(0, 2).map((achievement, idx) => (
                    <p key={idx} className="text-xs text-gray-600 flex items-center">
                      <CheckCircle className="w-3 h-3 mr-2 text-green-600" />
                      {achievement}
                    </p>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 border-t border-gray-200 pt-4">
                <div className="flex items-center text-gray-600">
                  <Mail className="w-3 h-3 mr-2" />
                  <span className="text-xs">{student.email}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="w-3 h-3 mr-2" />
                  <span className="text-xs">{student.phone}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-3 h-3 mr-2" />
                  <span className="text-xs">
                    {student.city}, {student.state}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Target className="w-3 h-3 mr-1" />
                    Goals
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No active students found</h3>
            <p className="mt-1 text-sm text-gray-500">No students match your current filters.</p>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
