'use client'

import { useState, useMemo, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import {
  CreditCard,
  Download,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  RefreshCw,
  Send,
  FileText,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { AddPaymentForm } from '@/components/admin/AddPaymentForm'
import { formatPaiseToINR } from '@/lib/utils'
import { useAdminResource } from '@/hooks/useAdminResource'
import { StatCard, FilterBar, FilterSelect, DataTable } from '@/components/admin/kit'
import type { DataTableColumn } from '@/components/admin/kit'

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

interface PaymentsPayload {
  payments: PaymentRecord[]
  stats: PaymentStats
}

const STATUS_OPTIONS = [
  { value: 'all', label: 'All Status' },
  { value: 'completed', label: 'Completed' },
  { value: 'pending', label: 'Pending' },
  { value: 'failed', label: 'Failed' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'refunded', label: 'Refunded' },
]

const METHOD_OPTIONS = [
  { value: 'all', label: 'All Methods' },
  { value: 'RAZORPAY_CARD', label: 'Card' },
  { value: 'RAZORPAY_UPI', label: 'UPI' },
  { value: 'BANK_TRANSFER', label: 'Bank Transfer' },
  { value: 'CASH', label: 'Cash' },
  { value: 'CHEQUE', label: 'Cheque' },
]

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
  method
    .replace('RAZORPAY_', '')
    .replace(/_/g, ' ')
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase())

// All amounts here come from the `payments` table, which stores integer paise.
const formatCurrency = (paise: number) => formatPaiseToINR(paise)

function PaymentsPageInner() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || 'all')
  const [methodFilter, setMethodFilter] = useState('all')
  const [isAddPaymentModalOpen, setIsAddPaymentModalOpen] = useState(false)

  const { data, loading, error, refetch } = useAdminResource<PaymentsPayload>(
    '/api/admin/payments',
    {
      limit: '100',
      status: statusFilter !== 'all' ? statusFilter : undefined,
      method: methodFilter !== 'all' ? methodFilter : undefined,
      search: searchTerm || undefined,
    }
  )

  const payments = data?.payments || []
  const stats = data?.stats || null

  const setStatus = (value: string) => {
    setStatusFilter(value)
    // Keep the URL shareable (/admin/payments?status=pending) without reload.
    const params = new URLSearchParams(searchParams.toString())
    if (value === 'all') params.delete('status')
    else params.set('status', value)
    router.replace(`/admin/payments${params.size ? `?${params}` : ''}`, { scroll: false })
  }

  const exportCSV = () => {
    const headers = [
      'Transaction',
      'Student',
      'Email',
      'Course',
      'Amount (INR)',
      'Method',
      'Status',
      'Refunded (INR)',
      'Date',
    ]
    const rows = payments.map((p) => [
      p.transactionId || p.razorpayPaymentId || p.id,
      p.users.name,
      p.users.email,
      p.enrollments?.courses?.name || '',
      (p.amount / 100).toFixed(2),
      formatMethod(p.paymentMethod),
      p.status,
      p.refundAmount ? (p.refundAmount / 100).toFixed(2) : '',
      new Date(p.createdAt).toLocaleString('en-IN'),
    ])
    const csv = [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `cerebrum-payments-${new Date().toISOString().split('T')[0]}.csv`
    link.click()
    URL.revokeObjectURL(link.href)
  }

  const completedCount = stats?.statusCounts?.COMPLETED?.count || 0
  const pendingCount = stats?.statusCounts?.PENDING?.count || 0
  const pendingAmount = stats?.statusCounts?.PENDING?.amount || 0
  const successRate = stats?.totalCount ? Math.round((completedCount / stats.totalCount) * 100) : 0

  const columns = useMemo<DataTableColumn<PaymentRecord>[]>(
    () => [
      {
        key: 'transaction',
        header: 'Transaction',
        render: (p) => (
          <div>
            <div className="text-sm font-medium text-gray-900">
              {p.transactionId || p.razorpayPaymentId || p.id.slice(0, 12)}
            </div>
            {p.installmentNumber && (
              <div className="text-xs text-gray-500">
                Installment {p.installmentNumber} of {p.totalInstallments}
              </div>
            )}
          </div>
        ),
      },
      {
        key: 'student',
        header: 'Student & Course',
        render: (p) => (
          <div>
            <div className="text-sm font-medium text-gray-900">{p.users.name}</div>
            <div className="text-sm text-gray-500">{p.enrollments?.courses?.name || 'N/A'}</div>
            <div className="text-xs text-gray-400">{p.users.email}</div>
          </div>
        ),
      },
      {
        key: 'amount',
        header: 'Amount & Method',
        render: (p) => (
          <div>
            <div className="text-sm font-medium text-gray-900">{formatCurrency(p.amount)}</div>
            <div className="text-sm text-gray-500 flex items-center">
              {getMethodIcon(p.paymentMethod)}
              <span className="ml-2">{formatMethod(p.paymentMethod)}</span>
            </div>
          </div>
        ),
      },
      {
        key: 'status',
        header: 'Status',
        render: (p) => (
          <div>
            <div className="flex items-center">
              {getStatusIcon(p.status)}
              <span
                className={`ml-2 inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(p.status)}`}
              >
                {p.status.charAt(0) + p.status.slice(1).toLowerCase()}
              </span>
            </div>
            {p.refundAmount && p.refundAmount > 0 ? (
              <div className="text-xs text-purple-600 mt-1">
                Refunded: {formatCurrency(p.refundAmount)}
                {p.refundReason ? ` — ${p.refundReason}` : ''}
              </div>
            ) : null}
          </div>
        ),
      },
      {
        key: 'date',
        header: 'Date',
        render: (p) => (
          <div>
            <div className="text-sm text-gray-900">
              {new Date(p.createdAt).toLocaleDateString('en-IN')}
            </div>
            <div className="text-xs text-gray-500">
              {new Date(p.createdAt).toLocaleTimeString('en-IN')}
            </div>
          </div>
        ),
      },
    ],
    []
  )

  return (
    <>
      <div className="p-6 space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Payment Management</h1>
            <p className="text-gray-600 mt-2">
              Track payments, refunds, and financial transactions
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" className="text-gray-700 border-gray-300" onClick={exportCSV}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button
              variant="outline"
              className="text-gray-700 border-gray-300"
              onClick={() => refetch()}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
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

        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard
              label="Total Revenue"
              value={formatCurrency(stats.totalRevenue || 0)}
              icon={TrendingUp}
              color="bg-green-100 text-green-600"
              sub={
                stats.totalRefunded ? `${formatCurrency(stats.totalRefunded)} refunded` : undefined
              }
            />
            <StatCard
              label="Pending Payments"
              value={pendingCount}
              icon={Clock}
              color="bg-yellow-100 text-yellow-600"
              sub={`${formatCurrency(pendingAmount)} pending`}
            />
            <StatCard
              label="Success Rate"
              value={`${successRate}%`}
              icon={CheckCircle}
              color="bg-blue-100 text-blue-600"
            />
            <StatCard
              label="Total Transactions"
              value={stats.totalCount || 0}
              icon={CreditCard}
              color="bg-purple-100 text-purple-600"
            />
          </div>
        )}

        <FilterBar
          search={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder="Search by student name, email, transaction ID, or course..."
        >
          <FilterSelect
            value={statusFilter}
            onChange={setStatus}
            options={STATUS_OPTIONS}
            ariaLabel="Filter by status"
          />
          <FilterSelect
            value={methodFilter}
            onChange={setMethodFilter}
            options={METHOD_OPTIONS}
            ariaLabel="Filter by method"
          />
        </FilterBar>

        <DataTable
          columns={columns}
          rows={payments}
          rowKey={(p) => p.id}
          loading={loading}
          error={error}
          onRetry={refetch}
          emptyIcon={CreditCard}
          emptyTitle="No payments found"
          emptyText="No payments match your current filters."
        />
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
            refetch()
          }}
          onCancel={() => setIsAddPaymentModalOpen(false)}
        />
      </Modal>
    </>
  )
}

export default function PaymentsPage() {
  return (
    <Suspense fallback={null}>
      <PaymentsPageInner />
    </Suspense>
  )
}
