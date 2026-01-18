'use client'

// Force dynamic rendering to prevent auth issues during static build
export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { MobilePaymentView, PaymentInstallment } from '@/components/counselor/MobilePaymentView'
import { BottomSheet } from '@/components/counselor/BottomSheet'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import {
  DollarSign,
  Calendar,
  User,
  Phone,
  Mail,
  RefreshCw,
  CheckCircle,
  Send,
  CreditCard,
  AlertCircle,
} from 'lucide-react'
import { format } from 'date-fns'

export default function PaymentsPage() {
  const router = useRouter()
  const isMobile = useMediaQuery('(max-width: 768px)')

  const [payments, setPayments] = useState<PaymentInstallment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedPayment, setSelectedPayment] = useState<PaymentInstallment | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PENDING' | 'OVERDUE' | 'PAID'>('ALL')
  const [marking, setMarking] = useState(false)
  const [sending, setSending] = useState(false)

  useEffect(() => {
    fetchPayments()
  }, [statusFilter])

  const fetchPayments = async () => {
    try {
      setLoading(true)
      setError(null)

      const url =
        statusFilter === 'ALL'
          ? '/api/counselor/payments'
          : `/api/counselor/payments?status=${statusFilter}`

      const response = await fetch(url, {
        credentials: 'include',
      })
      if (!response.ok) throw new Error('Failed to fetch payments')

      const data = await response.json()
      setPayments(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch payments')
    } finally {
      setLoading(false)
    }
  }

  const handlePaymentClick = (payment: PaymentInstallment) => {
    setSelectedPayment(payment)
    setShowDetails(true)
  }

  const handleMarkAsPaid = async (payment: PaymentInstallment) => {
    if (payment.status === 'PAID') {
      alert('Payment is already marked as paid')
      return
    }

    const confirmed = confirm(
      `Mark payment of ₹${payment.amount.toLocaleString('en-IN')} from ${payment.feePlan.lead.studentName} as paid?`
    )

    if (!confirmed) return

    try {
      setMarking(true)

      const response = await fetch(`/api/counselor/payments/${payment.id}/mark-paid`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          paidAmount: payment.amount,
          paymentMethod: 'RAZORPAY_UPI',
        }),
      })

      if (!response.ok) throw new Error('Failed to mark payment as paid')

      alert('Payment marked as paid successfully!')
      fetchPayments()
    } catch (error) {
      alert(
        'Failed to mark payment as paid: ' +
          (error instanceof Error ? error.message : 'Unknown error')
      )
    } finally {
      setMarking(false)
    }
  }

  const handleSendReminder = async (payment: PaymentInstallment) => {
    if (payment.status === 'PAID') {
      alert('Cannot send reminder for paid payment')
      return
    }

    const confirmed = confirm(`Send payment reminder to ${payment.feePlan.lead.studentName}?`)

    if (!confirmed) return

    try {
      setSending(true)

      const response = await fetch('/api/counselor/payments/reminders/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          installmentId: payment.id,
          channels: ['email', 'whatsapp', 'sms'],
        }),
      })

      if (!response.ok) throw new Error('Failed to send reminder')

      alert('Payment reminder sent successfully!')
      fetchPayments()
    } catch (error) {
      alert(
        'Failed to send reminder: ' + (error instanceof Error ? error.message : 'Unknown error')
      )
    } finally {
      setSending(false)
    }
  }

  const handleCallClick = (payment: PaymentInstallment) => {
    window.location.href = `tel:${payment.feePlan.lead.phone}`
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 text-indigo-600 animate-spin mx-auto mb-2" />
          <p className="text-gray-600">Loading payments...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-2" />
          <p className="text-gray-900 font-medium mb-2">Error loading payments</p>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchPayments}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Desktop Header */}
      {!isMobile && (
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Payment Management</h1>
              <p className="text-sm text-gray-600 mt-1">Track and manage student payments</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                {(['ALL', 'PENDING', 'OVERDUE', 'PAID'] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      statusFilter === status
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {status === 'ALL' ? 'All' : status.charAt(0) + status.slice(1).toLowerCase()}
                  </button>
                ))}
              </div>

              <button
                onClick={fetchPayments}
                disabled={loading}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Filter Bar */}
      {isMobile && (
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center gap-2 overflow-x-auto">
            {(['ALL', 'PENDING', 'OVERDUE', 'PAID'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  statusFilter === status ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                {status === 'ALL' ? 'All' : status.charAt(0) + status.slice(1).toLowerCase()}
              </button>
            ))}
            <button
              onClick={fetchPayments}
              disabled={loading}
              className="p-1.5 text-gray-600 hover:text-gray-900 rounded-lg"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {isMobile ? (
          <MobilePaymentView
            payments={payments}
            onPaymentClick={handlePaymentClick}
            onMarkAsPaid={handleMarkAsPaid}
            onSendReminder={handleSendReminder}
            onCallClick={handleCallClick}
          />
        ) : (
          <div className="h-full p-6 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {payments.map((payment) => (
                <div
                  key={payment.id}
                  onClick={() => handlePaymentClick(payment)}
                  className="bg-white rounded-lg border-2 border-gray-200 p-4 hover:border-indigo-300 cursor-pointer transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">
                      {payment.feePlan.lead.studentName}
                    </h3>
                    <span
                      className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                        payment.status === 'PAID'
                          ? 'bg-green-100 text-green-700'
                          : payment.status === 'OVERDUE'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {payment.status}
                    </span>
                  </div>

                  <p className="text-2xl font-bold text-gray-900 mb-2">
                    ₹{payment.amount.toLocaleString('en-IN')}
                  </p>

                  <p className="text-sm text-gray-600 mb-3">{payment.feePlan.courseName}</p>

                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    Due {format(new Date(payment.dueDate), 'MMM dd, yyyy')}
                  </div>
                </div>
              ))}
            </div>

            {payments.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full">
                <DollarSign className="w-16 h-16 text-gray-300 mb-4" />
                <p className="text-gray-600 font-medium">No payments found</p>
                <p className="text-sm text-gray-500 mt-1">Try adjusting your filters</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Payment Details Bottom Sheet */}
      <BottomSheet
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        title="Payment Details"
        snapPoints={[90]}
      >
        {selectedPayment && (
          <div className="p-6">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {selectedPayment.feePlan.lead.studentName}
              </h3>
              <p className="text-sm text-gray-600">{selectedPayment.feePlan.courseName}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 mb-1">Amount Due</p>
              <p className="text-3xl font-bold text-gray-900">
                ₹{selectedPayment.amount.toLocaleString('en-IN')}
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Due Date</p>
                  <p className="font-medium text-gray-900">
                    {format(new Date(selectedPayment.dueDate), 'MMMM dd, yyyy')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Student Name</p>
                  <p className="font-medium text-gray-900">
                    {selectedPayment.feePlan.lead.studentName}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-medium text-gray-900">{selectedPayment.feePlan.lead.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium text-gray-900 text-sm">
                    {selectedPayment.feePlan.lead.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Installment</p>
                  <p className="font-medium text-gray-900">#{selectedPayment.installmentNumber}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              {selectedPayment.status !== 'PAID' && (
                <>
                  <button
                    onClick={() => {
                      setShowDetails(false)
                      handleMarkAsPaid(selectedPayment)
                    }}
                    disabled={marking}
                    className="flex-1 bg-green-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    {marking ? 'Marking...' : 'Mark as Paid'}
                  </button>

                  <button
                    onClick={() => {
                      setShowDetails(false)
                      handleSendReminder(selectedPayment)
                    }}
                    disabled={sending}
                    className="flex-1 bg-indigo-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    {sending ? 'Sending...' : 'Send Reminder'}
                  </button>
                </>
              )}

              {selectedPayment.status === 'PAID' && (
                <div className="w-full text-center py-3 bg-green-50 text-green-700 rounded-lg font-medium">
                  Payment Completed
                </div>
              )}
            </div>
          </div>
        )}
      </BottomSheet>
    </div>
  )
}
