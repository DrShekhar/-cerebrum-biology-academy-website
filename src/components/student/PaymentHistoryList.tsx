/**
 * Payment History List Component
 * Displays list of all payments with filtering and search capabilities
 */

import React, { useState, useEffect } from 'react'
import { PaymentHistoryCard } from './PaymentHistoryCard'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { EmptyState } from '@/components/ui/EmptyState'
import { Search, Filter, Download, X, CreditCard } from 'lucide-react'
import { showToast } from '@/lib/toast'
import { cn } from '@/lib/utils'
import type { StudentPayment, FeePayment, PaymentFilter } from '@/types/payment'

interface PaymentHistoryListProps {
  className?: string
}

export function PaymentHistoryList({ className }: PaymentHistoryListProps) {
  const [payments, setPayments] = useState<(StudentPayment | FeePayment)[]>([])
  const [filteredPayments, setFilteredPayments] = useState<(StudentPayment | FeePayment)[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)

  const [filters, setFilters] = useState<PaymentFilter>({
    status: 'ALL',
    searchQuery: '',
    paymentMethod: 'ALL',
  })

  useEffect(() => {
    fetchPayments()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [filters, payments])

  const fetchPayments = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/student/payments')
      const data = await response.json()

      if (data.success) {
        setPayments(data.data.payments)
        setFilteredPayments(data.data.payments)
      } else {
        showToast.error(data.error || 'Failed to fetch payments')
      }
    } catch (error) {
      console.error('Error fetching payments:', error)
      showToast.error('Failed to load payment history')
    } finally {
      setIsLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = [...payments]

    if (filters.status && filters.status !== 'ALL') {
      filtered = filtered.filter((p) => p.status === filters.status)
    }

    if (filters.paymentMethod && filters.paymentMethod !== 'ALL') {
      filtered = filtered.filter((p) => p.paymentMethod === filters.paymentMethod)
    }

    if (filters.searchQuery && filters.searchQuery.trim()) {
      const query = filters.searchQuery.toLowerCase()
      filtered = filtered.filter((p) => {
        const isStudentPayment = 'enrollmentId' in p
        const isFeePayment = 'feePlanId' in p

        const courseName = isStudentPayment
          ? p.enrollment?.course?.name?.toLowerCase()
          : isFeePayment
            ? p.feePlan?.courseName?.toLowerCase()
            : ''

        const transactionId = isStudentPayment
          ? p.transactionId?.toLowerCase() || p.razorpayPaymentId?.toLowerCase()
          : isFeePayment
            ? p.razorpayPaymentId?.toLowerCase()
            : ''

        return courseName?.includes(query) || transactionId?.includes(query)
      })
    }

    if (filters.dateFrom) {
      filtered = filtered.filter((p) => new Date(p.createdAt) >= new Date(filters.dateFrom!))
    }

    if (filters.dateTo) {
      filtered = filtered.filter((p) => new Date(p.createdAt) <= new Date(filters.dateTo!))
    }

    setFilteredPayments(filtered)
  }

  const handleFilterChange = (key: keyof PaymentFilter, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      status: 'ALL',
      searchQuery: '',
      paymentMethod: 'ALL',
    })
  }

  const hasActiveFilters =
    filters.status !== 'ALL' ||
    filters.paymentMethod !== 'ALL' ||
    filters.searchQuery ||
    filters.dateFrom ||
    filters.dateTo

  const exportToCSV = () => {
    try {
      const csvHeaders = ['Date', 'Course', 'Amount', 'Status', 'Payment Method', 'Transaction ID']
      const csvData = filteredPayments.map((p) => {
        const isStudentPayment = 'enrollmentId' in p
        const isFeePayment = 'feePlanId' in p

        const courseName = isStudentPayment
          ? p.enrollment?.course?.name
          : isFeePayment
            ? p.feePlan?.courseName
            : 'Course'

        const transactionId = isStudentPayment
          ? p.transactionId || p.razorpayPaymentId
          : isFeePayment
            ? p.razorpayPaymentId
            : ''

        return [
          new Date(p.createdAt).toLocaleDateString('en-IN'),
          courseName,
          Number(p.amount),
          p.status,
          p.paymentMethod,
          transactionId || '',
        ]
      })

      const csv = [csvHeaders, ...csvData].map((row) => row.join(',')).join('\n')
      const blob = new Blob([csv], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `payment-history-${new Date().toISOString().split('T')[0]}.csv`
      a.click()
      window.URL.revokeObjectURL(url)

      showToast.success('Payment history exported successfully')
    } catch (error) {
      console.error('Error exporting CSV:', error)
      showToast.error('Failed to export payment history')
    }
  }

  if (isLoading) {
    return (
      <div className={className}>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-32 bg-gray-200 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={cn('space-y-6', className)}>
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex-1 w-full sm:max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by course or transaction ID..."
              value={filters.searchQuery}
              onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="gap-2"
          >
            <Filter className="w-4 h-4" />
            Filters
            {hasActiveFilters && (
              <span className="ml-1 px-1.5 py-0.5 bg-blue-100 text-blue-700 text-xs font-bold rounded">
                Active
              </span>
            )}
          </Button>

          {filteredPayments.length > 0 && (
            <Button variant="outline" size="sm" onClick={exportToCSV} className="gap-2">
              <Download className="w-4 h-4" />
              Export CSV
            </Button>
          )}
        </div>
      </div>

      {showFilters && (
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Filters</h3>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1">
                <X className="w-4 h-4" />
                Clear All
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="ALL">All Statuses</option>
                <option value="COMPLETED">Completed</option>
                <option value="PAID">Paid</option>
                <option value="PENDING">Pending</option>
                <option value="PROCESSING">Processing</option>
                <option value="FAILED">Failed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
              <select
                value={filters.paymentMethod}
                onChange={(e) => handleFilterChange('paymentMethod', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="ALL">All Methods</option>
                <option value="RAZORPAY_UPI">UPI</option>
                <option value="RAZORPAY_CARD">Card</option>
                <option value="RAZORPAY_NETBANKING">Net Banking</option>
                <option value="RAZORPAY_WALLET">Wallet</option>
                <option value="CASH">Cash</option>
                <option value="BANK_TRANSFER">Bank Transfer</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
              <Input
                type="date"
                value={filters.dateFrom?.toString().split('T')[0] || ''}
                onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
              <Input
                type="date"
                value={filters.dateTo?.toString().split('T')[0] || ''}
                onChange={(e) => handleFilterChange('dateTo', e.target.value)}
              />
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {filteredPayments.length > 0 ? (
          filteredPayments.map((payment, index) => (
            <PaymentHistoryCard key={payment.id} payment={payment} index={index} />
          ))
        ) : (
          <EmptyState
            icon={CreditCard}
            title={hasActiveFilters ? 'No payments match your filters' : 'No payment history found'}
            description={
              hasActiveFilters
                ? 'Try adjusting your filters or search criteria'
                : 'Your payment transactions will appear here once you make a payment'
            }
            primaryAction={
              hasActiveFilters
                ? {
                    label: 'Clear Filters',
                    onClick: clearFilters,
                  }
                : undefined
            }
            size="lg"
            variant="default"
          />
        )}
      </div>

      {filteredPayments.length > 0 && (
        <div className="text-center text-sm text-gray-600">
          Showing {filteredPayments.length} of {payments.length} payment
          {payments.length !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  )
}
