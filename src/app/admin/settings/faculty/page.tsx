'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  UserCog,
  UserPlus,
  Calendar,
  BookOpen,
  Award,
  Star,
  Edit,
  Trash2,
  Search,
  Mail,
  Phone,
  Clock,
  Users,
  TrendingUp,
  CheckCircle,
} from 'lucide-react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { AddFacultyForm } from '@/components/admin/AddFacultyForm'

interface Faculty {
  id: string
  name: string
  email: string
  phone: string
  specialization: string
  experience: number
  qualification: string
  joinedDate: string
  coursesAssigned: string[]
  activeStudents: number
  rating: number
  status: 'active' | 'onLeave' | 'inactive'
  availability: string
}

const mockFaculty: Faculty[] = [
  {
    id: '1',
    name: 'Dr. Priya Sharma',
    email: 'priya@cerebrumbiologyacademy.com',
    phone: '+91 98765 43211',
    specialization: 'Human Physiology, Genetics',
    experience: 12,
    qualification: 'PhD in Biology, M.Sc.',
    joinedDate: '2020-01-15',
    coursesAssigned: ['NEET Biology Class 12', 'NEET Dropper Batch'],
    activeStudents: 245,
    rating: 4.8,
    status: 'active',
    availability: 'Mon-Sat, 9 AM - 6 PM',
  },
  {
    id: '2',
    name: 'Dr. Rajesh Kumar',
    email: 'rajesh@cerebrumbiologyacademy.com',
    phone: '+91 98765 43212',
    specialization: 'Plant Physiology, Ecology',
    experience: 10,
    qualification: 'PhD in Botany, M.Sc.',
    joinedDate: '2021-03-10',
    coursesAssigned: ['NEET Biology Class 11', 'Foundation Biology'],
    activeStudents: 189,
    rating: 4.7,
    status: 'active',
    availability: 'Tue-Sun, 10 AM - 5 PM',
  },
  {
    id: '3',
    name: 'Dr. Anjali Verma',
    email: 'anjali@cerebrumbiologyacademy.com',
    phone: '+91 98765 43213',
    specialization: 'Cell Biology, Molecular Biology',
    experience: 8,
    qualification: 'PhD in Molecular Biology',
    joinedDate: '2022-06-01',
    coursesAssigned: ['Foundation Biology'],
    activeStudents: 98,
    rating: 4.9,
    status: 'active',
    availability: 'Mon-Fri, 2 PM - 7 PM',
  },
]

export default function FacultySettingsPage() {
  const [faculty, setFaculty] = useState<Faculty[]>(mockFaculty)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [isAddFacultyModalOpen, setIsAddFacultyModalOpen] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'onLeave':
        return 'bg-yellow-100 text-yellow-800'
      case 'inactive':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredFaculty = faculty.filter((f) => {
    const matchesSearch =
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.specialization.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || f.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalStudents = faculty.reduce((sum, f) => sum + f.activeStudents, 0)
  const avgRating = faculty.reduce((sum, f) => sum + f.rating, 0) / faculty.length
  const avgExperience = faculty.reduce((sum, f) => sum + f.experience, 0) / faculty.length

  return (
    <AdminLayout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Faculty Management</h1>
            <p className="text-gray-600">Manage faculty profiles, schedules, and assignments</p>
          </div>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => setIsAddFacultyModalOpen(true)}
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Add Faculty
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Faculty</p>
                <p className="text-2xl font-bold text-gray-900">{faculty.length}</p>
              </div>
              <UserCog className="w-8 h-8 text-blue-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-xl border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">{totalStudents}</p>
              </div>
              <Users className="w-8 h-8 text-green-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-xl border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                <p className="text-2xl font-bold text-gray-900">{avgRating.toFixed(1)}</p>
              </div>
              <Star className="w-8 h-8 text-yellow-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-6 rounded-xl border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Experience</p>
                <p className="text-2xl font-bold text-gray-900">{avgExperience.toFixed(1)}y</p>
              </div>
              <Award className="w-8 h-8 text-purple-500" />
            </div>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by name or specialization..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="onLeave">On Leave</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Faculty Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredFaculty.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow"
            >
              {/* Faculty Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {member.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                    <p className="text-sm text-gray-600">{member.qualification}</p>
                    <div className="flex items-center mt-1">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                          member.status
                        )}`}
                      >
                        {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                      </span>
                      <div className="flex items-center ml-2">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        <span className="text-sm font-semibold text-gray-900">{member.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-900">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  {member.email}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  {member.phone}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <BookOpen className="w-4 h-4 mr-2" />
                  {member.specialization}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  {member.availability}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b border-gray-200">
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900">{member.experience}y</p>
                  <p className="text-xs text-gray-600">Experience</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900">{member.coursesAssigned.length}</p>
                  <p className="text-xs text-gray-600">Courses</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900">{member.activeStudents}</p>
                  <p className="text-xs text-gray-600">Students</p>
                </div>
              </div>

              {/* Courses Assigned */}
              <div>
                <p className="text-xs font-medium text-gray-600 mb-2">Courses Assigned:</p>
                <div className="flex flex-wrap gap-2">
                  {member.coursesAssigned.map((course) => (
                    <span
                      key={course}
                      className="inline-block px-3 py-1 text-xs bg-blue-50 text-blue-600 rounded-full"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2 mt-4 pt-4 border-t border-gray-200">
                <Button variant="outline" size="sm" className="flex-1">
                  <Calendar className="w-3 h-3 mr-1" />
                  Schedule
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Users className="w-3 h-3 mr-1" />
                  Students
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Analytics
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredFaculty.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <UserCog className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No faculty found</h3>
            <p className="mt-1 text-sm text-gray-500">
              No faculty members match your current filters.
            </p>
          </div>
        )}
      </div>

      <Modal
        open={isAddFacultyModalOpen}
        onOpenChange={setIsAddFacultyModalOpen}
        title="Add New Faculty Member"
        description="Onboard a new faculty member with their credentials and professional details."
        size="lg"
      >
        <AddFacultyForm
          onSuccess={() => {
            setIsAddFacultyModalOpen(false)
            window.location.reload()
          }}
          onCancel={() => setIsAddFacultyModalOpen(false)}
        />
      </Modal>
    </AdminLayout>
  )
}
