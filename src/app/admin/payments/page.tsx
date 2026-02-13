'use client'

import { useState, useEffect, useCallback } from 'react'
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

interface PaymentRecord {
  id: string
  amount: number
  status: string
  paymentMethod: string
  transactionId: string | null
  razorpayPaymentId: string | null
  installmentNumber: number | null
  totalInstallments: number | null
  refundAmount: number | null
  refundReason: string | null
  createdAt: string
  completedAt: string | null
  users: { id: string; name: string; email: string; phone: string | null }
  enrollments: { id: string; courses: { id: string; name: string } } | null
}

interface PaymentStats {
  totalRevenue: number
  totalRefunded: number
  totalCount: number
  statusCounts: Record<string, { count: number; amount: number }>
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState<PaymentRecord[]>([])
  const [stats, setStats] = useState<PaymentStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [methodFilter, setMethodFilter] = useState('all')
  const [isAddPaymentModalOpen, setIsAddPaymentModalOpen] = useState(false)

  const fetchPayments = useCallback(async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({ limit: '100' })
      if (statusFilter !== 'all') params.set('status', statusFilter)
      if (methodFilter !== 'all') params.set('method', methodFilter)
      if (searchTerm) params.set('search', searchTerm)
      const res = await fetch(`/api/admin/payments?${params}`)
      const json = await res.json()
      if (json.success) {
        setPayments(json.data.payments)
        setStats(json.data.stats)
      }
    } catch (error) {
      console.error('Failed to fetch payments:', error)
    } finally {
      setLoading(false)
    }
  }, [statusFilter, methodFilter, searchTerm])

  useEffect(() => {
    fetchPayments()
  }, [fetchPayments])

  const getStatusColor = (status: string) => {
    const s = status.toLowerCase()
    if (s === 'completed') return 'bg-green-100 text-green-800'
    if (s === 'pending') return 'bg-yellow-100 text-yellow-800'
    if (s === 'failed') return 'bg-red-100 text-red-800'
    if (s === 'cancelled') return 'bg-purple-100 text-purple-800'
    return 'bg-gray-100 text-gray-800'
  }

  const getStatusIcon = (status: string) => {
    const s = status.toLowerCase()
    if (s === 'completed') return <CheckCircle className="w-4 h-4 text-green-600" />
    if (s === 'pending') return <Clock className="w-4 h-4 text-yellow-500" />
    if (s === 'failed') return <XCircle className="w-4 h-4 text-red-500" />
    if (s === 'cancelled') return <RefreshCw className="w-4 h-4 text-purple-500" />
    return <AlertCircle className="w-4 h-4 text-gray-500" />
  }

  const getMethodIcon = (method: string) => {
    const m = method.toLowerCase()
    if (m.includes('card')) return <CreditCard className="w-4 h-4" />
    if (m.includes('upi')) return <Send className="w-4 h-4" />
    if (m.includes('bank') || m.includes('transfer')) return <FileText className="w-4 h-4" />
    return <DollarSign className="w-4 h-4" />
  }

  const formatMethod = (method: string) =>
    method.replace('RAZORPAY_', '').replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount)

  const completedCount = stats?.statusCounts?.COMPLETED?.count || 0
  const pendingCount = stats?.statusCounts?.PENDING?.count || 0
  const pendingAmount = stats?.statusCounts?.PENDING?.amount || 0
  const successRate = stats?.totalCount ? Math.round((completedCount / stats.totalCount) * 100) : 0

  const statsData = [
    {
      label: 'Total Revenue',
      value: formatCurrency(stats?.totalRevenue || 0),
      icon: TrendingUp,
      color: 'bg-green-100 text-green-600',
    },
    {
      label: 'Pending Payments',
      value: pendingCount,
      icon: Clock,
      color: 'bg-yellow-100 text-yellow-600',
      sub: `${formatCurrency(pendingAmount)} pending`,
    },
    {
      label: 'Success Rate',
      value: `${successRate}%`,
      icon: CheckCircle,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      label: 'Total Transactions',
      value: stats?.totalCount || 0,
      icon: CreditCard,
      color: 'bg-purple-100 text-purple-600',
    },
  ]

  return (
    <AdminLayout>
      <div className="p-6 space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Payment Management</h1>
            <p className="text-gray-600 mt-2">Track payments, refunds, and financial transactions</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" className="text-gray-700 border-gray-300">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" className="text-gray-700 border-gray-300" onClick={fetchPayments}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Sync
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setIsAddPaymentModalOpen(true)}>
              <Send className="w-4 h-4 mr-2" />
              Add Payment
            </Button>
          </div>
        </div>

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
                  {stat.sub && <p className="text-xs text-gray-500 mt-1">{stat.sub}</p>}
                </div>
                <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

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
                <option value="cancelled">Cancelled</option>
              </select>
              <select
                value={methodFilter}
                onChange={(e) => setMethodFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Methods</option>
                <option value="RAZORPAY_CARD">Card</option>
                <option value="RAZORPAY_UPI">UPI</option>
                <option value="BANK_TRANSFER">Bank Transfer</option>
                <option value="CASH">Cash</option>
                <option value="CHEQUE">Cheque</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-500">Loading payments...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student & Course</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount & Method</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {payments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {payment.transactionId || payment.razorpayPaymentId || payment.id.slice(0, 12)}
                        </div>
                        {payment.installmentNumber && (
                          <div className="text-xs text-gray-500">
                            Installment {payment.installmentNumber} of {payment.totalInstallments}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{payment.users.name}</div>
                        <div className="text-sm text-gray-500">{payment.enrollments?.courses?.name || 'N/A'}</div>
                        <div className="text-xs text-gray-400">{payment.users.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{formatCurrency(payment.amount)}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          {getMethodIcon(payment.paymentMethod)}
                          <span className="ml-2">{formatMethod(payment.paymentMethod)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getStatusIcon(payment.status)}
                          <span className={`ml-2 inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(payment.status)}`}>
                            {payment.status.charAt(0) + payment.status.slice(1).toLowerCase()}
                          </span>
                        </div>
                        {payment.refundAmount && payment.refundAmount > 0 && (
                          <div className="text-xs text-purple-600 mt-1">Refunded: {formatCurrency(payment.refundAmount)}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{new Date(payment.createdAt).toLocaleDateString('en-IN')}</div>
                        <div className="text-xs text-gray-500">{new Date(payment.createdAt).toLocaleTimeString('en-IN')}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button className="text-blue-600 hover:text-blue-900"><Eye className="w-4 h-4" /></button>
                          <button className="text-gray-600 hover:text-gray-900"><Download className="w-4 h-4" /></button>
                          {payment.status === 'FAILED' && (
                            <button className="text-green-600 hover:text-green-900"><RefreshCw className="w-4 h-4" /></button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {!loading && payments.length === 0 && (
            <div className="text-center py-12">
              <CreditCard className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No payments found</h3>
              <p className="mt-1 text-sm text-gray-500">No payments match your current filters.</p>
            </div>
          )}
        </div>
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
            fetchPayments()
          }}
          onCancel={() => setIsAddPaymentModalOpen(false)}
        />
      </Modal>
    </AdminLayout>
  )
}
