'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  RotateCcw,
  Search,
  Download,
  RefreshCw,
  Eye,
  CreditCard,
  Send,
  FileText,
  DollarSign,
  TrendingDown,
  Clock,
} from 'lucide-react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { Button } from '@/components/ui/Button'

interface Payment {
  id: string
  amount: number
  status: string
  paymentMethod: string
  transactionId: string | null
  refundAmount: number | null
  refundReason: string | null
  refundedAt: string | null
  createdAt: string
  users: { id: string; name: string; email: string; phone: string | null }
  enrollments: { id: string; courses: { id: string; name: string } } | null
}

export default function RefundsPage() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [stats, setStats] = useState({ totalRefunds: 0, totalRefunded: 0 })

  const fetchPayments = useCallback(async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({ status: 'refunded', limit: '100' })
      if (searchTerm) params.set('search', searchTerm)
      const res = await fetch(`/api/admin/payments?${params}`)
      const json = await res.json()
      if (json.success) {
        setPayments(json.data.payments)
        setStats({
          totalRefunds: json.data.stats.refundedCount || json.data.pagination.total,
          totalRefunded: json.data.stats.totalRefunded || 0,
        })
      }
    } catch (error) {
      console.error('Failed to fetch refunds:', error)
    } finally {
      setLoading(false)
    }
  }, [searchTerm])

  useEffect(() => {
    fetchPayments()
  }, [fetchPayments])

  const getMethodIcon = (method: string) => {
    const m = method.toLowerCase()
    if (m.includes('card')) return <CreditCard className="w-4 h-4" />
    if (m.includes('upi')) return <Send className="w-4 h-4" />
    if (m.includes('bank') || m.includes('transfer')) return <FileText className="w-4 h-4" />
    return <DollarSign className="w-4 h-4" />
  }

  const formatMethod = (method: string) =>
    method
      .replace('RAZORPAY_', '')
      .replace(/_/g, ' ')
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase())

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount)

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Refunds</h1>
            <p className="text-gray-600 mt-1">
              Track refund requests, processed refunds, and refund history
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" className="text-gray-700 border-gray-300">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button
              variant="outline"
              className="text-gray-700 border-gray-300"
              onClick={fetchPayments}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Refunds</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalRefunds}</p>
              </div>
              <div className="h-12 w-12 rounded-lg flex items-center justify-center bg-purple-100 text-purple-600">
                <RotateCcw className="h-6 w-6" />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Refunded</p>
                <p className="text-2xl font-bold text-purple-600">
                  {formatCurrency(stats.totalRefunded)}
                </p>
              </div>
              <div className="h-12 w-12 rounded-lg flex items-center justify-center bg-red-100 text-red-600">
                <TrendingDown className="h-6 w-6" />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Processing Time</p>
                <p className="text-2xl font-bold text-gray-900">2-3 days</p>
                <p className="text-xs text-gray-500 mt-1">Razorpay standard</p>
              </div>
              <div className="h-12 w-12 rounded-lg flex items-center justify-center bg-blue-100 text-blue-600">
                <Clock className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by student name, email, or transaction ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-500">Loading refunds...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Course
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Original Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Refund Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reason
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Refund Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {payments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {payment.users.name}
                        </div>
                        <div className="text-xs text-gray-500">{payment.users.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {payment.enrollments?.courses?.name || 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 line-through">
                          {formatCurrency(payment.amount)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-purple-600">
                          {formatCurrency(payment.refundAmount || 0)}
                        </div>
                        {payment.refundAmount && payment.refundAmount < payment.amount && (
                          <div className="text-xs text-gray-500">Partial refund</div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600 max-w-[200px] truncate">
                          {payment.refundReason || 'No reason provided'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {payment.refundedAt
                            ? new Date(payment.refundedAt).toLocaleDateString('en-IN')
                            : 'Processing'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button className="text-blue-600 hover:text-blue-900" title="View details">
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {!loading && payments.length === 0 && (
            <div className="text-center py-12">
              <RotateCcw className="mx-auto h-12 w-12 text-gray-300" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No refunds</h3>
              <p className="mt-1 text-sm text-gray-500">No refunds have been processed yet.</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
