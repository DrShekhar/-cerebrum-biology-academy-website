'use client'

// Force dynamic rendering to prevent auth issues during static build
export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  CreditCard,
  Search,
  Download,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  Eye,
  RefreshCw,
  Send,
  FileText,
} from 'lucide-react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { AddPaymentForm } from '@/components/admin/AddPaymentForm'

interface Payment {
  id: string
  studentName: string
  studentEmail: string
  course: string
  amount: number
  status: 'completed' | 'pending' | 'failed' | 'refunded' | 'partial'
  paymentMethod: 'card' | 'upi' | 'bank_transfer' | 'wallet'
  transactionId: string
  paymentDate: string
  dueDate?: string
  installmentNumber?: number
  totalInstallments?: number
  notes?: string
  refundAmount?: number
  refundReason?: string
}

const mockPayments: Payment[] = [
  {
    id: '1',
    studentName: 'Rahul Kumar',
    studentEmail: 'rahul.kumar@email.com',
    course: 'NEET Biology Class 12',
    amount: 45000,
    status: 'completed',
    paymentMethod: 'card',
    transactionId: 'TXN001234567',
    paymentDate: '2024-01-15T10:30:00Z',
    installmentNumber: 1,
    totalInstallments: 1,
    notes: 'Full payment completed successfully',
  },
  {
    id: '2',
    studentName: 'Priya Singh',
    studentEmail: 'priya.singh@email.com',
    course: 'NEET Biology Class 11',
    amount: 17500,
    status: 'completed',
    paymentMethod: 'upi',
    transactionId: 'UPI789012345',
    paymentDate: '2024-06-10T14:20:00Z',
    installmentNumber: 1,
    totalInstallments: 2,
    notes: 'First installment of 2-part payment plan',
  },
  {
    id: '3',
    studentName: 'Amit Patel',
    studentEmail: 'amit.patel@email.com',
    course: 'NEET Biology Dropper',
    amount: 65000,
    status: 'pending',
    paymentMethod: 'bank_transfer',
    transactionId: 'BANK345678901',
    paymentDate: '2024-08-01T16:45:00Z',
    dueDate: '2024-08-15T23:59:59Z',
    notes: 'Bank transfer verification pending',
  },
  {
    id: '4',
    studentName: 'Sneha Reddy',
    studentEmail: 'sneha.reddy@email.com',
    course: 'Foundation Biology',
    amount: 12500,
    status: 'failed',
    paymentMethod: 'card',
    transactionId: 'FAIL123456789',
    paymentDate: '2024-07-20T11:15:00Z',
    notes: 'Payment failed - insufficient funds',
  },
  {
    id: '5',
    studentName: 'Kavya Sharma',
    studentEmail: 'kavya.sharma@email.com',
    course: 'NEET Biology Class 11',
    amount: 5000,
    status: 'refunded',
    paymentMethod: 'wallet',
    transactionId: 'REF987654321',
    paymentDate: '2024-05-15T09:30:00Z',
    refundAmount: 5000,
    refundReason: 'Course cancellation by student',
  },
]

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>(mockPayments)
  const [filteredPayments, setFilteredPayments] = useState<Payment[]>(mockPayments)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [methodFilter, setMethodFilter] = useState<string>('all')
  const [dateFilter, setDateFilter] = useState<string>('all')
  const [isAddPaymentModalOpen, setIsAddPaymentModalOpen] = useState(false)

  useEffect(() => {
    let filtered = payments

    if (searchTerm) {
      filtered = filtered.filter(
        (payment) =>
          payment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          payment.studentEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
          payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          payment.course.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter((payment) => payment.status === statusFilter)
    }

    if (methodFilter !== 'all') {
      filtered = filtered.filter((payment) => payment.paymentMethod === methodFilter)
    }

    setFilteredPayments(filtered)
  }, [payments, searchTerm, statusFilter, methodFilter])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      case 'refunded':
        return 'bg-purple-100 text-purple-800'
      case 'partial':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />
      case 'refunded':
        return <RefreshCw className="w-4 h-4 text-purple-500" />
      case 'partial':
        return <AlertCircle className="w-4 h-4 text-blue-500" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />
    }
  }

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'card':
        return <CreditCard className="w-4 h-4" />
      case 'upi':
        return <Send className="w-4 h-4" />
      case 'bank_transfer':
        return <FileText className="w-4 h-4" />
      case 'wallet':
        return <DollarSign className="w-4 h-4" />
      default:
        return <CreditCard className="w-4 h-4" />
    }
  }

  const totalRevenue = payments
    .filter((p) => p.status === 'completed')
    .reduce((acc, payment) => acc + payment.amount, 0)

  const pendingAmount = payments
    .filter((p) => p.status === 'pending')
    .reduce((acc, payment) => acc + payment.amount, 0)

  const refundedAmount = payments
    .filter((p) => p.status === 'refunded')
    .reduce((acc, payment) => acc + (payment.refundAmount || 0), 0)

  const statsData = [
    {
      label: 'Total Revenue',
      value: `₹${(totalRevenue / 100000).toFixed(1)}L`,
      icon: TrendingUp,
      color: 'bg-green-100 text-green-600',
      trend: '+12% this month',
    },
    {
      label: 'Pending Payments',
      value: payments.filter((p) => p.status === 'pending').length,
      icon: Clock,
      color: 'bg-yellow-100 text-yellow-600',
      trend: `₹${(pendingAmount / 1000).toFixed(0)}K pending`,
    },
    {
      label: 'Success Rate',
      value: `${Math.round((payments.filter((p) => p.status === 'completed').length / payments.length) * 100)}%`,
      icon: CheckCircle,
      color: 'bg-blue-100 text-blue-600',
      trend: '+5% from last month',
    },
    {
      label: 'Total Transactions',
      value: payments.length,
      icon: CreditCard,
      color: 'bg-purple-100 text-purple-600',
      trend: '+8 this week',
    },
  ]

  return (
    <AdminLayout>
      <div className="p-6 space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Payment Management</h1>
            <p className="text-gray-600 mt-2">
              Track payments, refunds, and financial transactions
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" className="text-gray-700 border-gray-300">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" className="text-gray-700 border-gray-300">
              <RefreshCw className="w-4 h-4 mr-2" />
              Sync
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => setIsAddPaymentModalOpen(true)}
            >
              <Send className="w-4 h-4 mr-2" />
              Add Payment
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
                  placeholder="Search by student name, email, transaction ID, or course..."
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
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
                <option value="refunded">Refunded</option>
                <option value="partial">Partial</option>
              </select>
              <select
                value={methodFilter}
                onChange={(e) => setMethodFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Methods</option>
                <option value="card">Credit/Debit Card</option>
                <option value="upi">UPI</option>
                <option value="bank_transfer">Bank Transfer</option>
                <option value="wallet">Wallet</option>
              </select>
            </div>
          </div>
        </div>

        {/* Payments Table */}
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
                    Transaction
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student & Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount & Method
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {payment.transactionId}
                        </div>
                        {payment.installmentNumber && (
                          <div className="text-xs text-gray-500">
                            Installment {payment.installmentNumber} of {payment.totalInstallments}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {payment.studentName}
                        </div>
                        <div className="text-sm text-gray-500">{payment.course}</div>
                        <div className="text-xs text-gray-400">{payment.studentEmail}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          ₹{payment.amount.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          {getMethodIcon(payment.paymentMethod)}
                          <span className="ml-2 capitalize">
                            {payment.paymentMethod.replace('_', ' ')}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(payment.status)}
                        <span
                          className={`ml-2 inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                            payment.status
                          )}`}
                        >
                          {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                        </span>
                      </div>
                      {payment.status === 'refunded' && payment.refundAmount && (
                        <div className="text-xs text-gray-500 mt-1">
                          Refunded: ₹{payment.refundAmount.toLocaleString()}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm text-gray-900">
                          {new Date(payment.paymentDate).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(payment.paymentDate).toLocaleTimeString()}
                        </div>
                        {payment.dueDate && payment.status === 'pending' && (
                          <div className="text-xs text-red-600 mt-1">
                            Due: {new Date(payment.dueDate).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <Download className="w-4 h-4" />
                        </button>
                        {payment.status === 'failed' && (
                          <button className="text-green-600 hover:text-green-900">
                            <RefreshCw className="w-4 h-4" />
                          </button>
                        )}
                        {payment.status === 'completed' && (
                          <button className="text-purple-600 hover:text-purple-900">
                            <RefreshCw className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredPayments.length === 0 && (
            <div className="text-center py-12">
              <CreditCard className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No payments found</h3>
              <p className="mt-1 text-sm text-gray-500">No payments match your current filters.</p>
            </div>
          )}
        </motion.div>
      </div>

      <Modal
        open={isAddPaymentModalOpen}
        onOpenChange={setIsAddPaymentModalOpen}
        title="Add Manual Payment"
        description="Record a payment received offline or outside the system."
        size="xl"
      >
        <AddPaymentForm
          onSuccess={() => {
            setIsAddPaymentModalOpen(false)
            window.location.reload()
          }}
          onCancel={() => setIsAddPaymentModalOpen(false)}
        />
      </Modal>
    </AdminLayout>
  )
}
