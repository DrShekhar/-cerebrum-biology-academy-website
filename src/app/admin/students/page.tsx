'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  Users,
  Search,
  UserPlus,
  Mail,
  Phone,
  MapPin,
  TrendingUp,
  Star,
  MessageSquare,
  Edit,
  Eye,
  UserCheck,
  Download,
  Upload,
  MoreHorizontal,
  Clock,
  Award,
  ArrowRightLeft,
  Loader2,
  RefreshCw,
} from 'lucide-react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { AddStudentForm } from '@/components/admin/AddStudentForm'
import { CreateStudentAccountForm } from '@/components/admin/CreateStudentAccountForm'
import { ConvertLeadForm } from '@/components/admin/ConvertLeadForm'
import { showToast } from '@/lib/toast'
import { EditStudentForm } from '@/components/admin/EditStudentForm'
import toast from 'react-hot-toast'

interface Student {
  id: string
  name: string
  email: string
  phone: string
  whatsappNumber?: string
  dateOfBirth: string
  class: string
  school: string
  city: string
  state: string
  status: 'lead' | 'active' | 'enrolled' | 'paused' | 'completed' | 'dropped'
  leadSource: 'website' | 'referral' | 'social_media' | 'advertisement' | 'direct'
  coursesEnrolled: string[]
  joiningDate: string
  lastActivity: string
  totalPayments: number
  averageScore: number
  parentName?: string
  parentPhone?: string
  notes?: string
  tags: string[]
  priority: 'high' | 'medium' | 'low'
  assignedCounselor?: string
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([])
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [priorityFilter, setPriorityFilter] = useState<string>('all')
  const [selectedStudents, setSelectedStudents] = useState<string[]>([])
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false)
  const [isCreateAccountModalOpen, setIsCreateAccountModalOpen] = useState(false)
  const [isEditStudentModalOpen, setIsEditStudentModalOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [activeTab, setActiveTab] = useState<'students' | 'leads'>('students')
  const [leads, setLeads] = useState<any[]>([])
  const [leadsLoading, setLeadsLoading] = useState(false)
  const [leadSearch, setLeadSearch] = useState('')
  const [isConvertModalOpen, setIsConvertModalOpen] = useState(false)
  const [selectedLead, setSelectedLead] = useState<any>(null)

  const fetchLeads = useCallback(async () => {
    try {
      setLeadsLoading(true)
      const params = new URLSearchParams()
      if (leadSearch) params.set('search', leadSearch)
      params.set('limit', '50')
      const res = await fetch(`/api/admin/leads?${params.toString()}`)
      const data = await res.json()
      if (data.success) {
        setLeads(data.data)
      }
    } catch {
      toast.error('Failed to load leads')
    } finally {
      setLeadsLoading(false)
    }
  }, [leadSearch])

  const fetchStudents = useCallback(async () => {
    try {
      const params = new URLSearchParams()
      if (searchTerm) params.set('search', searchTerm)
      params.set('limit', '100')
      const res = await fetch(`/api/admin/students?${params.toString()}`)
      const data = await res.json()
      if (data.success && data.data?.students) {
        const mapped: Student[] = data.data.students.map((s: any) => ({
          id: s.id,
          name: s.name || '',
          email: s.email || '',
          phone: s.phone || '',
          whatsappNumber: s.phone || '',
          dateOfBirth: '',
          class: s.coachingTier || '',
          school: '',
          city: '',
          state: '',
          status: s.enrollments?.some((e: any) => e.status === 'ACTIVE') ? 'enrolled' : 'active',
          leadSource: '',
          coursesEnrolled: s.enrollments?.map((e: any) => e.courses?.name).filter(Boolean) || [],
          joiningDate: s.createdAt || '',
          lastActivity: s.lastActiveAt || '',
          totalPayments: 0,
          averageScore: 0,
          tags: [],
          priority: 'medium' as const,
        }))
        setStudents(mapped)
      }
    } catch {
      console.error('Failed to fetch students')
    }
  }, [searchTerm])

  useEffect(() => {
    fetchStudents()
  }, [fetchStudents])

  useEffect(() => {
    if (activeTab === 'leads') {
      fetchLeads()
    }
  }, [activeTab, fetchLeads])

  useEffect(() => {
    let filtered = students

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (student) =>
          student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.phone.includes(searchTerm) ||
          student.school.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.city.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter((student) => student.status === statusFilter)
    }

    // Priority filter
    if (priorityFilter !== 'all') {
      filtered = filtered.filter((student) => student.priority === priorityFilter)
    }

    setFilteredStudents(filtered)
  }, [students, searchTerm, statusFilter, priorityFilter])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'lead':
        return 'bg-yellow-100 text-yellow-800'
      case 'active':
        return 'bg-blue-100 text-blue-800'
      case 'enrolled':
        return 'bg-green-100 text-green-800'
      case 'paused':
        return 'bg-orange-100 text-orange-800'
      case 'completed':
        return 'bg-purple-100 text-purple-800'
      case 'dropped':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'low':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const statsData = [
    {
      label: 'Total Students',
      value: students.length,
      icon: Users,
      color: 'bg-blue-100 text-blue-600',
      trend: '+12%',
    },
    {
      label: 'Active Leads',
      value: students.filter((s) => s.status === 'lead').length,
      icon: UserPlus,
      color: 'bg-yellow-100 text-yellow-600',
      trend: '+8%',
    },
    {
      label: 'Enrolled Students',
      value: students.filter((s) => s.status === 'enrolled').length,
      icon: UserCheck,
      color: 'bg-green-100 text-green-600',
      trend: '+15%',
    },
    {
      label: 'High Priority',
      value: students.filter((s) => s.priority === 'high').length,
      icon: Star,
      color: 'bg-red-100 text-red-600',
      trend: '+3%',
    },
  ]

  return (
    <AdminLayout>
      <div className="p-6 space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Student Management</h1>
            <p className="text-gray-600 mt-2">Manage students, leads, and customer relationships</p>
          </div>
          <div className="flex space-x-3">
            <Button
              variant="outline"
              className="text-gray-700 border-gray-300"
              onClick={() => showToast.info('Import functionality coming soon!')}
            >
              <Upload className="w-4 h-4 mr-2" />
              Import
            </Button>
            <Button
              variant="outline"
              className="text-gray-700 border-gray-300"
              onClick={() => showToast.info('Export functionality coming soon!')}
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={() => setIsCreateAccountModalOpen(true)}
            >
              <UserCheck className="w-4 h-4 mr-2" />
              Create Student Account
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => setIsAddStudentModalOpen(true)}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Add Student Lead
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('students')}
              className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'students'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Students & Accounts
            </button>
            <button
              onClick={() => setActiveTab('leads')}
              className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'leads'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              CRM Leads
            </button>
          </nav>
        </div>

        {activeTab === 'leads' ? (
          <>
            {/* Lead Search */}
            <div className="bg-white p-4 rounded-xl border border-gray-200">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search leads by name, email, or phone..."
                    value={leadSearch}
                    onChange={(e) => setLeadSearch(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <Button variant="outline" onClick={fetchLeads}>
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Leads Table */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden"
            >
              {leadsLoading ? (
                <div className="text-center py-12 text-gray-500">Loading leads...</div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Student Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Contact
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Course Interest
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Stage
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Priority
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {leads.map((lead: any) => (
                          <tr key={lead.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {lead.studentName}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              <div>{lead.email || 'No email'}</div>
                              <div className="text-gray-400">{lead.phone}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {lead.courseInterest}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                  lead.stage === 'ACTIVE_STUDENT'
                                    ? 'bg-green-100 text-green-800'
                                    : lead.stage === 'LOST'
                                      ? 'bg-red-100 text-red-800'
                                      : lead.stage === 'ENROLLED'
                                        ? 'bg-blue-100 text-blue-800'
                                        : 'bg-yellow-100 text-yellow-800'
                                }`}
                              >
                                {lead.stage?.replace(/_/g, ' ')}
                              </span>
                              {lead.convertedAt && (
                                <span className="ml-1 inline-flex px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-700">
                                  Converted
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                  lead.priority === 'HOT'
                                    ? 'bg-red-100 text-red-800'
                                    : lead.priority === 'WARM'
                                      ? 'bg-yellow-100 text-yellow-800'
                                      : 'bg-blue-100 text-blue-800'
                                }`}
                              >
                                {lead.priority}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {!lead.convertedAt ? (
                                <Button
                                  size="sm"
                                  className="bg-green-600 hover:bg-green-700 text-white text-xs"
                                  onClick={() => {
                                    setSelectedLead(lead)
                                    setIsConvertModalOpen(true)
                                  }}
                                >
                                  <ArrowRightLeft className="w-3 h-3 mr-1" />
                                  Convert
                                </Button>
                              ) : (
                                <span className="text-xs text-gray-400">
                                  Converted {new Date(lead.convertedAt).toLocaleDateString()}
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {leads.length === 0 && !leadsLoading && (
                    <div className="text-center py-12">
                      <Users className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No leads found</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Add leads via the CRM to see them here.
                      </p>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          </>
        ) : (
        <>
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
                  placeholder="Search by name, email, phone, school, or city..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="lead">Leads</option>
                <option value="active">Active</option>
                <option value="enrolled">Enrolled</option>
                <option value="paused">Paused</option>
                <option value="completed">Completed</option>
                <option value="dropped">Dropped</option>
              </select>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Priority</option>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
            </div>
          </div>
        </div>

        {/* Students Table */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-xl border border-gray-200 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact & Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status & Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Performance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Counselor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <Users className="h-5 w-5 text-blue-600" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{student.name}</div>
                          <div className="text-sm text-gray-500">
                            {student.class} • {student.school}
                          </div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {student.tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="inline-block px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="text-sm text-gray-900 flex items-center">
                          <Mail className="w-3 h-3 mr-2 text-gray-400" />
                          {student.email}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Phone className="w-3 h-3 mr-2 text-gray-400" />
                          {student.phone}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <MapPin className="w-3 h-3 mr-2 text-gray-400" />
                          {student.city}, {student.state}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-2">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                            student.status
                          )}`}
                        >
                          {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                        </span>
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(
                            student.priority
                          )}`}
                        >
                          {student.priority.charAt(0).toUpperCase() + student.priority.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="text-sm text-gray-900 flex items-center">
                          <Award className="w-3 h-3 mr-2 text-gray-400" />
                          {student.averageScore}% avg
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <TrendingUp className="w-3 h-3 mr-2 text-gray-400" />₹
                          {student.totalPayments.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Clock className="w-3 h-3 mr-2 text-gray-400" />
                          {new Date(student.lastActivity).toLocaleDateString()}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.assignedCounselor || 'Not assigned'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          className="text-gray-600 hover:text-gray-900"
                          onClick={() => {
                            setSelectedStudent(student)
                            setIsEditStudentModalOpen(true)
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          <MessageSquare className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredStudents.length === 0 && (
            <div className="text-center py-12">
              <Users className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No students found</h3>
              <p className="mt-1 text-sm text-gray-500">No students match your current filters.</p>
            </div>
          )}
        </motion.div>
        </>
        )}
      </div>

      {/* Convert Lead Modal */}
      {selectedLead && (
        <Modal
          open={isConvertModalOpen}
          onOpenChange={setIsConvertModalOpen}
          title="Convert Lead to Student Account"
          description={`Create a student account for "${selectedLead.studentName}"`}
          size="xl"
        >
          <ConvertLeadForm
            lead={selectedLead}
            onSuccess={() => {
              setIsConvertModalOpen(false)
              setSelectedLead(null)
              fetchLeads()
            }}
            onCancel={() => {
              setIsConvertModalOpen(false)
              setSelectedLead(null)
            }}
          />
        </Modal>
      )}

      {/* Create Student Account Modal */}
      <Modal
        open={isCreateAccountModalOpen}
        onOpenChange={setIsCreateAccountModalOpen}
        title="Create Student Account"
        description="Create a real student account with login credentials."
        size="xl"
      >
        <CreateStudentAccountForm
          onSuccess={() => {
            setIsCreateAccountModalOpen(false)
            window.location.reload()
          }}
          onCancel={() => setIsCreateAccountModalOpen(false)}
        />
      </Modal>

      {/* Add Student Lead Modal */}
      <Modal
        open={isAddStudentModalOpen}
        onOpenChange={setIsAddStudentModalOpen}
        title="Add Student Lead (CRM)"
        description="Fill in the details below to add a new student lead to the CRM system."
        size="xl"
      >
        <AddStudentForm
          onSuccess={() => {
            setIsAddStudentModalOpen(false)
            // TODO: Refresh student list from API
            window.location.reload()
          }}
          onCancel={() => setIsAddStudentModalOpen(false)}
        />
      </Modal>

      {/* Edit Student Modal */}
      {selectedStudent && (
        <Modal
          open={isEditStudentModalOpen}
          onOpenChange={setIsEditStudentModalOpen}
          title="Edit Student"
          description="Update student information and status."
          size="xl"
        >
          <EditStudentForm
            student={selectedStudent}
            onSuccess={() => {
              setIsEditStudentModalOpen(false)
              setSelectedStudent(null)
              window.location.reload()
            }}
            onCancel={() => {
              setIsEditStudentModalOpen(false)
              setSelectedStudent(null)
            }}
          />
        </Modal>
      )}
    </AdminLayout>
  )
}
