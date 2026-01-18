'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  CreditCard,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Clock,
  IndianRupee,
  User,
  Receipt,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Filter,
} from 'lucide-react'

interface ChildPayment {
  id: string
  childId: string
  childName: string
  courseName: string
  amount: number
  dueDate: string | null
  paidAt: string | null
  status: 'paid' | 'pending' | 'overdue' | 'partial'
  paymentMethod: string | null
  transactionId: string | null
  installmentNumber: number | null
  totalInstallments: number | null
}

interface Child {
  id: string
  name: string
}

interface ChildSummary {
  childId: string
  childName: string
  totalPaid: number
  totalPending: number
  totalOverdue: number
}

interface PaymentSummary {
  totalPaid: number
  totalPending: number
  totalOverdue: number
  nextDueDate: string | null
  nextDueAmount: number | null
  byChild: ChildSummary[]
}

export default function ParentPaymentsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const [payments, setPayments] = useState<ChildPayment[]>([])
  const [upcomingDues, setUpcomingDues] = useState<ChildPayment[]>([])
  const [summary, setSummary] = useState<PaymentSummary | null>(null)
  const [children, setChildren] = useState<Child[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [childFilter, setChildFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [activeTab, setActiveTab] = useState<'history' | 'upcoming'>('upcoming')
  const [expandedPayment, setExpandedPayment] = useState<string | null>(null)

  const fetchPayments = useCallback(async () => {
    try {
      setLoading(true)
      const queryParams = new URLSearchParams()
      if (childFilter !== 'all') queryParams.set('childId', childFilter)
      if (statusFilter !== 'all') queryParams.set('status', statusFilter)

      const response = await fetch(`/api/parent/payments?${queryParams.toString()}`)
      const data = await response.json()

      if (data.success) {
        setPayments(data.data.payments)
        setUpcomingDues(data.data.upcomingDues)
        setSummary(data.data.summary)
        setChildren(data.data.children)
        setError(null)
      } else {
        setError(data.error || 'Failed to fetch payment data')
      }
    } catch {
      setError('Failed to load payment data')
    } finally {
      setLoading(false)
    }
  }, [childFilter, statusFilter])

  useEffect(() => {
    if (status === 'authenticated') {
      fetchPayments()
    }
  }, [status, fetchPayments])

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-'
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'paid':
        return {
          bg: 'bg-green-100',
          text: 'text-green-700',
          border: 'border-green-200',
          icon: CheckCircle2,
          label: 'Paid',
        }
      case 'overdue':
        return {
          bg: 'bg-red-100',
          text: 'text-red-700',
          border: 'border-red-200',
          icon: AlertCircle,
          label: 'Overdue',
        }
      case 'partial':
        return {
          bg: 'bg-yellow-100',
          text: 'text-yellow-700',
          border: 'border-yellow-200',
          icon: Clock,
          label: 'Partial',
        }
      case 'pending':
      default:
        return {
          bg: 'bg-orange-100',
          text: 'text-orange-700',
          border: 'border-orange-200',
          icon: Clock,
          label: 'Pending',
        }
    }
  }

  const getDaysUntilDue = (dueDate: string | null) => {
    if (!dueDate) return null
    const due = new Date(dueDate)
    const now = new Date()
    const diffTime = due.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto" />
          <p className="mt-4 text-gray-600">Loading payment data...</p>
        </div>
      </div>
    )
  }

  if (status === 'unauthenticated') {
    router.push('/login')
    return null
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-red-700 mb-2">Error Loading Payments</h2>
            <p className="text-red-600">{error}</p>
            <button
              onClick={() => router.push('/parent/dashboard')}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/parent/dashboard')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Payments & Fees</h1>
              <p className="text-sm text-gray-500">Track fee payments and upcoming dues</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Summary Cards */}
        {summary && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-lg font-bold text-green-600">{formatCurrency(summary.totalPaid)}</p>
                  <p className="text-xs text-gray-500">Total Paid</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Clock className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-lg font-bold text-orange-600">{formatCurrency(summary.totalPending)}</p>
                  <p className="text-xs text-gray-500">Pending</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-lg font-bold text-red-600">{formatCurrency(summary.totalOverdue)}</p>
                  <p className="text-xs text-gray-500">Overdue</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  {summary.nextDueDate ? (
                    <>
                      <p className="text-lg font-bold text-blue-600">{formatCurrency(summary.nextDueAmount || 0)}</p>
                      <p className="text-xs text-gray-500">Due {formatDate(summary.nextDueDate)}</p>
                    </>
                  ) : (
                    <>
                      <p className="text-lg font-bold text-gray-600">-</p>
                      <p className="text-xs text-gray-500">No upcoming</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Overdue Alert */}
        {summary && summary.totalOverdue > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-700">Payment Overdue</h3>
                <p className="text-sm text-red-600 mt-1">
                  You have {formatCurrency(summary.totalOverdue)} in overdue payments. Please clear
                  dues immediately to avoid service interruption.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tabs & Filters */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'upcoming'
                  ? 'text-teal-600 border-b-2 border-teal-600 bg-teal-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Upcoming Dues ({upcomingDues.length})</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'history'
                  ? 'text-teal-600 border-b-2 border-teal-600 bg-teal-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Receipt className="h-4 w-4" />
                <span>Payment History</span>
              </div>
            </button>
          </div>

          {/* Filters */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="h-4 w-4 text-gray-500" />
              {children.length > 1 && (
                <select
                  value={childFilter}
                  onChange={(e) => setChildFilter(e.target.value)}
                  className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                >
                  <option value="all">All Children</option>
                  {children.map((child) => (
                    <option key={child.id} value={child.id}>
                      {child.name}
                    </option>
                  ))}
                </select>
              )}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="all">All Status</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
          </div>

          <div className="p-4">
            {/* Upcoming Dues Tab */}
            {activeTab === 'upcoming' && (
              <div>
                {upcomingDues.length === 0 ? (
                  <div className="text-center py-12">
                    <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">All Clear!</h3>
                    <p className="text-gray-500">No upcoming payment dues</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {upcomingDues.map((due) => {
                      const statusConfig = getStatusConfig(due.status)
                      const daysUntilDue = getDaysUntilDue(due.dueDate)
                      const StatusIcon = statusConfig.icon

                      return (
                        <div
                          key={due.id}
                          className={`border rounded-xl p-4 ${statusConfig.border} ${
                            due.status === 'overdue' ? 'bg-red-50' : 'bg-white'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-3">
                              <div className={`p-2 rounded-lg ${statusConfig.bg}`}>
                                <StatusIcon className={`h-5 w-5 ${statusConfig.text}`} />
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-900">{due.courseName}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                  <User className="h-3.5 w-3.5 text-gray-400" />
                                  <span className="text-sm text-gray-500">{due.childName}</span>
                                </div>
                                {due.installmentNumber && (
                                  <p className="text-xs text-gray-400 mt-1">
                                    Installment #{due.installmentNumber}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-xl font-bold text-gray-900">
                                {formatCurrency(due.amount)}
                              </p>
                              <p className={`text-sm ${statusConfig.text}`}>
                                {due.status === 'overdue' ? (
                                  <span className="font-medium">
                                    Overdue by {Math.abs(daysUntilDue || 0)} days
                                  </span>
                                ) : daysUntilDue !== null && daysUntilDue <= 7 ? (
                                  <span className="text-orange-600">
                                    Due in {daysUntilDue} day{daysUntilDue !== 1 ? 's' : ''}
                                  </span>
                                ) : (
                                  <span className="text-gray-500">Due {formatDate(due.dueDate)}</span>
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Payment History Tab */}
            {activeTab === 'history' && (
              <div>
                {payments.length === 0 ? (
                  <div className="text-center py-12">
                    <CreditCard className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No payment history found</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {payments.map((payment) => {
                      const statusConfig = getStatusConfig(payment.status)
                      const isExpanded = expandedPayment === payment.id
                      const StatusIcon = statusConfig.icon

                      return (
                        <div
                          key={payment.id}
                          className={`border rounded-xl overflow-hidden ${statusConfig.border}`}
                        >
                          <div
                            className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                            onClick={() => setExpandedPayment(isExpanded ? null : payment.id)}
                          >
                            <div className="flex items-center justify-between gap-4">
                              <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${statusConfig.bg}`}>
                                  <StatusIcon className={`h-5 w-5 ${statusConfig.text}`} />
                                </div>
                                <div>
                                  <h3 className="font-semibold text-gray-900">{payment.courseName}</h3>
                                  <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <User className="h-3.5 w-3.5" />
                                    <span>{payment.childName}</span>
                                    <span>•</span>
                                    <span>
                                      {payment.status === 'paid'
                                        ? `Paid ${formatDate(payment.paidAt)}`
                                        : `Due ${formatDate(payment.dueDate)}`}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="text-right">
                                  <p className="font-bold text-gray-900">
                                    {formatCurrency(payment.amount)}
                                  </p>
                                  <span
                                    className={`text-xs font-medium px-2 py-0.5 rounded ${statusConfig.bg} ${statusConfig.text}`}
                                  >
                                    {statusConfig.label}
                                  </span>
                                </div>
                                {isExpanded ? (
                                  <ChevronUp className="h-5 w-5 text-gray-400" />
                                ) : (
                                  <ChevronDown className="h-5 w-5 text-gray-400" />
                                )}
                              </div>
                            </div>
                          </div>

                          {isExpanded && (
                            <div className="border-t border-gray-100 p-4 bg-gray-50">
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                {payment.transactionId && (
                                  <div>
                                    <p className="text-gray-500">Transaction ID</p>
                                    <p className="font-mono text-gray-900">{payment.transactionId}</p>
                                  </div>
                                )}
                                {payment.paymentMethod && (
                                  <div>
                                    <p className="text-gray-500">Payment Method</p>
                                    <p className="text-gray-900">{payment.paymentMethod}</p>
                                  </div>
                                )}
                                {payment.installmentNumber && (
                                  <div>
                                    <p className="text-gray-500">Installment</p>
                                    <p className="text-gray-900">
                                      #{payment.installmentNumber}
                                      {payment.totalInstallments && ` of ${payment.totalInstallments}`}
                                    </p>
                                  </div>
                                )}
                                <div>
                                  <p className="text-gray-500">
                                    {payment.status === 'paid' ? 'Paid On' : 'Due Date'}
                                  </p>
                                  <p className="text-gray-900">
                                    {formatDate(payment.status === 'paid' ? payment.paidAt : payment.dueDate)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Per-Child Summary */}
        {summary && summary.byChild.length > 1 && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-4">Payment Summary by Child</h3>
            <div className="space-y-3">
              {summary.byChild.map((child) => (
                <div key={child.childId} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center">
                      <User className="h-4 w-4 text-teal-600" />
                    </div>
                    <span className="font-medium text-gray-900">{child.childName}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-green-600">
                      <IndianRupee className="h-3 w-3 inline" />
                      {child.totalPaid.toLocaleString('en-IN')} paid
                    </span>
                    {child.totalPending > 0 && (
                      <span className="text-orange-600">
                        <IndianRupee className="h-3 w-3 inline" />
                        {child.totalPending.toLocaleString('en-IN')} pending
                      </span>
                    )}
                    {child.totalOverdue > 0 && (
                      <span className="text-red-600">
                        <IndianRupee className="h-3 w-3 inline" />
                        {child.totalOverdue.toLocaleString('en-IN')} overdue
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
