'use client'

import { useState } from 'react'
import {
  DollarSign,
  Calendar,
  CheckCircle2,
  Clock,
  Send,
  User,
  ChevronRight,
  CreditCard,
  AlertTriangle,
} from 'lucide-react'
import { format, isPast, differenceInDays } from 'date-fns'

export interface PaymentInstallment {
  id: string
  installmentNumber: number
  dueDate: Date | string
  amount: number
  status: 'PENDING' | 'OVERDUE' | 'PAID' | 'CANCELLED'
  remindersSent?: {
    '7_days'?: string
    '3_days'?: string
    '1_day'?: string
    overdue?: string
    manual?: string
  }
  feePlan: {
    id: string
    courseName: string
    lead: {
      id: string
      studentName: string
      phone: string
      email: string
    }
  }
}

interface MobilePaymentViewProps {
  payments: PaymentInstallment[]
  onPaymentClick: (payment: PaymentInstallment) => void
  onMarkAsPaid: (payment: PaymentInstallment) => void
  onSendReminder: (payment: PaymentInstallment) => void
  onCallClick: (payment: PaymentInstallment) => void
}

const statusColors = {
  PAID: 'bg-green-600',
  PENDING: 'bg-blue-500',
  OVERDUE: 'bg-red-500',
  CANCELLED: 'bg-gray-500',
}

const statusLabels = {
  PAID: 'Paid',
  PENDING: 'Pending',
  OVERDUE: 'Overdue',
  CANCELLED: 'Cancelled',
}

function SwipeablePaymentCard({
  payment,
  onPaymentClick,
  onMarkAsPaid,
  onSendReminder,
  onCallClick,
}: {
  payment: PaymentInstallment
  onPaymentClick: (payment: PaymentInstallment) => void
  onMarkAsPaid: (payment: PaymentInstallment) => void
  onSendReminder: (payment: PaymentInstallment) => void
  onCallClick: (payment: PaymentInstallment) => void
}) {
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null)

  const dueDate = new Date(payment.dueDate)
  const isOverdue = isPast(dueDate) && payment.status === 'PENDING'
  const daysUntilDue = differenceInDays(dueDate, new Date())

  return (
    <div className="relative overflow-hidden">
      {/* Background action hints */}
      <div className="absolute inset-0 flex items-center justify-between px-6">
        <div className="flex items-center gap-2 text-white">
          <CheckCircle2 className="w-5 h-5" />
          <span className="font-medium">Mark Paid</span>
        </div>
        <div className="flex items-center gap-2 text-white">
          <span className="font-medium">Call</span>
          <CreditCard className="w-5 h-5" />
        </div>
      </div>

      {/* Card */}
      <div
        className={`relative bg-white rounded-lg shadow-sm border-2 p-4 ${
          isOverdue ? 'border-red-500' : 'border-gray-200'
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          {/* Left: Payment info */}
          <div className="flex-1 min-w-0" onClick={() => onPaymentClick(payment)}>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-gray-900 truncate">
                {payment.feePlan.lead.studentName}
              </h3>
              {isOverdue && (
                <div className="bg-red-100 rounded-full p-1">
                  <AlertTriangle className="w-3 h-3 text-red-600" />
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-gray-400" />
              <span className="font-bold text-lg text-gray-900">
                ₹{payment.amount.toLocaleString('en-IN')}
              </span>
              <span
                className={`${statusColors[payment.status]} text-white text-xs font-medium px-2 py-0.5 rounded-full`}
              >
                {statusLabels[payment.status]}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
              <User className="w-3.5 h-3.5" />
              <span className="truncate">{payment.feePlan.courseName}</span>
            </div>

            <div className="flex items-center gap-2 text-sm mb-2">
              <Calendar className="w-3.5 h-3.5 text-gray-400" />
              <span className={isOverdue ? 'text-red-600 font-medium' : 'text-gray-600'}>
                Due {format(dueDate, 'MMM dd, yyyy')}
              </span>
              {!isOverdue && daysUntilDue <= 7 && (
                <span className="text-xs text-orange-600 font-medium">
                  ({daysUntilDue} {daysUntilDue === 1 ? 'day' : 'days'} left)
                </span>
              )}
              {isOverdue && (
                <span className="text-xs text-red-600 font-medium">
                  (Overdue by {Math.abs(daysUntilDue)}{' '}
                  {Math.abs(daysUntilDue) === 1 ? 'day' : 'days'})
                </span>
              )}
            </div>

            {/* Reminder status */}
            {payment.remindersSent && Object.keys(payment.remindersSent).length > 0 && (
              <div className="flex items-center gap-1 text-xs text-gray-500 mt-2">
                <Clock className="w-3 h-3" />
                <span>Reminders sent: {Object.keys(payment.remindersSent).length}</span>
              </div>
            )}

            {/* Installment number */}
            <div className="text-xs text-gray-400 mt-1">
              Installment #{payment.installmentNumber}
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex flex-col gap-2 flex-shrink-0">
            {payment.status !== 'PAID' && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onSendReminder(payment)
                }}
                className="p-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            )}
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function MobilePaymentView({
  payments,
  onPaymentClick,
  onMarkAsPaid,
  onSendReminder,
  onCallClick,
}: MobilePaymentViewProps) {
  const [groupBy, setGroupBy] = useState<'status' | 'student'>('status')

  // Group payments
  const groupedPayments =
    groupBy === 'status'
      ? payments.reduce(
          (acc, payment) => {
            if (!acc[payment.status]) acc[payment.status] = []
            acc[payment.status].push(payment)
            return acc
          },
          {} as Record<string, PaymentInstallment[]>
        )
      : payments.reduce(
          (acc, payment) => {
            const studentName = payment.feePlan.lead.studentName
            if (!acc[studentName]) acc[studentName] = []
            acc[studentName].push(payment)
            return acc
          },
          {} as Record<string, PaymentInstallment[]>
        )

  // Calculate stats
  const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0)
  const paidAmount = payments
    .filter((p) => p.status === 'PAID')
    .reduce((sum, p) => sum + p.amount, 0)
  const overdueAmount = payments
    .filter((p) => p.status === 'OVERDUE')
    .reduce((sum, p) => sum + p.amount, 0)
  const overdueCount = payments.filter((p) => p.status === 'OVERDUE').length

  return (
    <div className="h-full overflow-hidden flex flex-col">
      {/* Stats */}
      <div className="sticky top-0 z-10 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs opacity-90">Total Outstanding</p>
            <p className="text-xl font-bold">
              ₹{(totalAmount - paidAmount).toLocaleString('en-IN')}
            </p>
          </div>
          <div>
            <p className="text-xs opacity-90">Overdue</p>
            <p className="text-xl font-bold text-red-200">
              ₹{overdueAmount.toLocaleString('en-IN')}
            </p>
            {overdueCount > 0 && <p className="text-xs opacity-75">{overdueCount} payments</p>}
          </div>
        </div>
      </div>

      {/* Group toggle */}
      <div className="sticky top-20 z-10 bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Group by:</span>
          <button
            onClick={() => setGroupBy('status')}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
              groupBy === 'status'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Status
          </button>
          <button
            onClick={() => setGroupBy('student')}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
              groupBy === 'student'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Student
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">Swipe right to mark paid, swipe left to call</p>
      </div>

      {/* Grouped lists */}
      <div className="flex-1 overflow-y-auto">
        {Object.entries(groupedPayments).map(([group, groupPayments]) => (
          <div key={group} className="mb-4">
            <div className="sticky top-0 bg-gray-50 px-4 py-2 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">
                  {groupBy === 'status' ? statusLabels[group as keyof typeof statusLabels] : group}
                </h3>
                <div className="text-sm text-gray-500">
                  <span className="font-medium">{groupPayments.length}</span>
                  <span className="mx-1">•</span>
                  <span>
                    ₹{groupPayments.reduce((sum, p) => sum + p.amount, 0).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            <div className="px-4 py-2 space-y-2">
              {groupPayments.map((payment) => (
                <SwipeablePaymentCard
                  key={payment.id}
                  payment={payment}
                  onPaymentClick={onPaymentClick}
                  onMarkAsPaid={onMarkAsPaid}
                  onSendReminder={onSendReminder}
                  onCallClick={onCallClick}
                />
              ))}
            </div>
          </div>
        ))}

        {payments.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <DollarSign className="w-12 h-12 text-gray-400 mb-3" />
            <p className="text-gray-600 font-medium">No payments found</p>
            <p className="text-sm text-gray-500 mt-1">All payments are up to date</p>
          </div>
        )}
      </div>
    </div>
  )
}
