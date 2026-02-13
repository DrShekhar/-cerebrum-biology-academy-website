/**
 * Payment History Card Component
 * Displays individual payment details in a card format
 */

import React from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { PaymentStatusBadge } from './PaymentStatusBadge'
import { InvoiceDownloadButton } from './InvoiceDownloadButton'
import { Calendar, CreditCard, FileText, Hash, Building2 } from 'lucide-react'
import type { StudentPayment, FeePayment } from '@/types/payment'

interface PaymentHistoryCardProps {
  payment: StudentPayment | FeePayment
  index?: number
}

export function PaymentHistoryCard({ payment, index = 0 }: PaymentHistoryCardProps) {
  const isStudentPayment = 'enrollmentId' in payment
  const isFeePayment = 'feePlanId' in payment

  const getCourseName = () => {
    if (isStudentPayment && payment.enrollment?.course) {
      return payment.enrollment.course.name
    }
    if (isFeePayment && payment.feePlan) {
      return payment.feePlan.courseName
    }
    return 'Course'
  }

  const getCourseType = () => {
    if (isStudentPayment && payment.enrollment?.course) {
      return payment.enrollment.course.type
    }
    if (isFeePayment && payment.feePlan) {
      return payment.feePlan.planType
    }
    return null
  }

  const getPaymentDate = () => {
    if (isStudentPayment) {
      return payment.completedAt || payment.createdAt
    }
    if (isFeePayment) {
      return payment.paidAt || payment.createdAt
    }
    return (payment as StudentPayment).createdAt
  }

  const getTransactionId = () => {
    if (isStudentPayment) {
      return payment.transactionId || payment.razorpayPaymentId
    }
    if (isFeePayment) {
      return payment.razorpayPaymentId
    }
    return null
  }

  const getPaymentMethod = () => {
    return payment.paymentMethod
  }

  const getAmount = () => {
    return Number(payment.amount)
  }

  const formattedAmount = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: isStudentPayment ? payment.currency : 'INR',
  }).format(getAmount())

  const formattedDate = new Date(getPaymentDate()).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  const formattedTime = new Date(getPaymentDate()).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  })

  const isCompleted = payment.status === 'COMPLETED' || payment.status === 'PAID'

  return (
    <div
     className="animate-fadeInUp">
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1 space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Building2 className="w-5 h-5 text-blue-600" />
                    <h3 className="font-semibold text-gray-900 text-lg">{getCourseName()}</h3>
                  </div>
                  {getCourseType() && (
                    <p className="text-sm text-gray-600 ml-7">{getCourseType()}</p>
                  )}
                </div>
                <PaymentStatusBadge status={payment.status} size="md" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 ml-7">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">
                    {formattedDate} at {formattedTime}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <CreditCard className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">
                    {getPaymentMethod()?.replace('RAZORPAY_', '').replace('_', ' ')}
                  </span>
                </div>

                {getTransactionId() && (
                  <div className="flex items-center gap-2 text-sm sm:col-span-2">
                    <Hash className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600 font-mono text-xs">{getTransactionId()}</span>
                  </div>
                )}

                {isStudentPayment && payment.installmentNumber && payment.totalInstallments && (
                  <div className="flex items-center gap-2 text-sm">
                    <FileText className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">
                      Installment {payment.installmentNumber} of {payment.totalInstallments}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:border-l md:pl-6">
              <div className="text-left sm:text-right">
                <p className="text-sm text-gray-600 mb-1">Amount</p>
                <p className="text-2xl font-bold text-gray-900">{formattedAmount}</p>
              </div>

              {isCompleted && (
                <InvoiceDownloadButton
                  paymentId={payment.id}
                  variant="outline"
                  size="sm"
                  showLabel={false}
                  className="sm:flex-col"
                />
              )}
            </div>
          </div>

          {payment.status === 'FAILED' && isStudentPayment && payment.failureReason && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">
                <strong>Failure Reason:</strong> {payment.failureReason}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
