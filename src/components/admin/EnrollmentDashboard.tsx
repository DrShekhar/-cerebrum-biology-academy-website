'use client'

import { useState } from 'react'
import { useEnrollment } from '@/hooks/useEnrollment'
import { Button } from '@/components/ui/Button'
import {
  Users,
  Search,
  Download,
  CheckCircle,
  Clock,
  X,
  Phone,
  Mail,
  Calendar,
  User,
  AlertCircle,
} from 'lucide-react'
import { motion } from 'framer-motion'

interface EnrollmentDashboardProps {
  isAdmin?: boolean
}

export function EnrollmentDashboard({ isAdmin = false }: EnrollmentDashboardProps) {
  const { enrollments, updatePaymentStatus } = useEnrollment()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'paid' | 'failed'>('all')
  const [selectedEnrollment, setSelectedEnrollment] = useState<string | null>(null)

  if (!isAdmin) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h2>
        <p className="text-gray-600">You need admin privileges to view this dashboard.</p>
      </div>
    )
  }

  const filteredEnrollments = enrollments.filter((enrollment) => {
    const matchesSearch =
      enrollment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.phone.includes(searchTerm)

    const matchesStatus = statusFilter === 'all' || enrollment.paymentStatus === statusFilter

    return matchesSearch && matchesStatus
  })

  const stats = {
    total: enrollments.length,
    pending: enrollments.filter((e) => e.paymentStatus === 'pending').length,
    paid: enrollments.filter((e) => e.paymentStatus === 'paid').length,
    failed: enrollments.filter((e) => e.paymentStatus === 'failed').length,
  }

  const handleStatusUpdate = async (
    enrollmentId: string,
    newStatus: 'pending' | 'paid' | 'failed'
  ) => {
    try {
      await updatePaymentStatus(enrollmentId, newStatus)
    } catch (error) {
      console.error('Failed to update payment status:', error)
    }
  }

  const exportEnrollments = () => {
    const csvContent = [
      ['Student Name', 'Email', 'Phone', 'Course ID', 'Payment Status', 'Enrollment Date'].join(
        ','
      ),
      ...filteredEnrollments.map((enrollment) =>
        [
          enrollment.studentName,
          enrollment.email,
          enrollment.phone,
          enrollment.courseId,
          enrollment.paymentStatus,
          new Date(enrollment.enrollmentDate).toLocaleDateString(),
        ].join(',')
      ),
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `enrollments-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Enrollment Dashboard</h1>
        <p className="text-gray-600">Manage student enrollments and track payments</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{stats.total}</h3>
              <p className="text-gray-600">Total Enrollments</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-orange-600">{stats.pending}</h3>
              <p className="text-gray-600">Pending Payments</p>
            </div>
            <Clock className="w-8 h-8 text-orange-500" />
          </div>
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-green-600">{stats.paid}</h3>
              <p className="text-gray-600">Confirmed Payments</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-red-600">{stats.failed}</h3>
              <p className="text-gray-600">Failed Payments</p>
            </div>
            <X className="w-8 h-8 text-red-500" />
          </div>
        </motion.div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="failed">Failed</option>
            </select>

            <Button onClick={exportEnrollments} variant="outline" className="flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>
      </div>

      {/* Enrollments Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Student</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Contact</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Course</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Enrollment Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Payment Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredEnrollments.map((enrollment) => (
                <motion.tr
                  key={enrollment.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{enrollment.studentName}</div>
                        <div className="text-sm text-gray-600">ID: {enrollment.id.slice(0, 8)}</div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="w-4 h-4 mr-2" />
                        {enrollment.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="w-4 h-4 mr-2" />
                        {enrollment.phone}
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{enrollment.courseId}</div>
                    <div className="text-sm text-gray-600">
                      Starts: {new Date(enrollment.courseStartDate).toLocaleDateString()}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(enrollment.enrollmentDate).toLocaleDateString()}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <select
                      value={enrollment.paymentStatus}
                      onChange={(e) =>
                        handleStatusUpdate(
                          enrollment.id,
                          e.target.value as 'pending' | 'paid' | 'failed'
                        )
                      }
                      className={`px-3 py-1 rounded-full text-sm font-medium border-0 focus:ring-2 focus:ring-offset-2 ${
                        enrollment.paymentStatus === 'paid'
                          ? 'bg-green-100 text-green-800 focus:ring-green-600'
                          : enrollment.paymentStatus === 'pending'
                            ? 'bg-orange-100 text-orange-800 focus:ring-orange-500'
                            : 'bg-red-100 text-red-800 focus:ring-red-500'
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                      <option value="failed">Failed</option>
                    </select>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          setSelectedEnrollment(
                            selectedEnrollment === enrollment.id ? null : enrollment.id
                          )
                        }
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        {selectedEnrollment === enrollment.id ? 'Hide' : 'View Details'}
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>

          {filteredEnrollments.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No enrollments found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
            </div>
          )}
        </div>
      </div>

      {/* Enrollment Details Modal */}
      {selectedEnrollment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Enrollment Details</h3>
                <button
                  onClick={() => setSelectedEnrollment(null)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {(() => {
                const enrollment = enrollments.find((e) => e.id === selectedEnrollment)
                if (!enrollment) return null

                return (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Student Information</h4>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="text-gray-600">Name:</span>
                            <span className="ml-2 font-medium">{enrollment.studentName}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Email:</span>
                            <span className="ml-2">{enrollment.email}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Phone:</span>
                            <span className="ml-2">{enrollment.phone}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Course Information</h4>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="text-gray-600">Course ID:</span>
                            <span className="ml-2 font-medium">{enrollment.courseId}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Start Date:</span>
                            <span className="ml-2">
                              {new Date(enrollment.courseStartDate).toLocaleDateString()}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600">Batch:</span>
                            <span className="ml-2">
                              {enrollment.batchAssigned || 'Not assigned'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Payment Information</h4>
                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Payment Status:</span>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              enrollment.paymentStatus === 'paid'
                                ? 'bg-green-100 text-green-800'
                                : enrollment.paymentStatus === 'pending'
                                  ? 'bg-orange-100 text-orange-800'
                                  : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {enrollment.paymentStatus.charAt(0).toUpperCase() +
                              enrollment.paymentStatus.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button
                        onClick={() =>
                          handleStatusUpdate(enrollment.id, 'paid').then(() =>
                            setSelectedEnrollment(null)
                          )
                        }
                        variant="primary"
                        size="sm"
                        disabled={enrollment.paymentStatus === 'paid'}
                      >
                        Mark as Paid
                      </Button>
                      <Button
                        onClick={() => setSelectedEnrollment(null)}
                        variant="outline"
                        size="sm"
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                )
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
