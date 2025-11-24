/**
 * Upcoming Payments Widget Component
 * Displays upcoming and overdue installments for students
 */

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { PaymentStatusBadge } from './PaymentStatusBadge'
import { Calendar, AlertCircle, Clock, CreditCard, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { showToast } from '@/lib/toast'
import { cn } from '@/lib/utils'
import type { PaymentInstallment } from '@/types/payment'
import Link from 'next/link'

interface UpcomingPaymentsWidgetProps {
  className?: string
  maxItems?: number
  showViewAll?: boolean
}

export function UpcomingPaymentsWidget({
  className,
  maxItems = 3,
  showViewAll = true,
}: UpcomingPaymentsWidgetProps) {
  const [upcoming, setUpcoming] = useState<PaymentInstallment[]>([])
  const [overdue, setOverdue] = useState<PaymentInstallment[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchUpcomingPayments()
  }, [])

  const fetchUpcomingPayments = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/student/payments/upcoming')
      const data = await response.json()

      if (data.success) {
        setUpcoming(data.data.upcoming)
        setOverdue(data.data.overdue)
      } else {
        showToast.error(data.error || 'Failed to fetch upcoming payments')
      }
    } catch (error) {
      console.error('Error fetching upcoming payments:', error)
      showToast.error('Failed to load upcoming payments')
    } finally {
      setIsLoading(false)
    }
  }

  const allPayments = [...overdue, ...upcoming].slice(0, maxItems)

  const getDaysUntilDue = (dueDate: Date | string) => {
    const due = new Date(dueDate)
    const now = new Date()
    const diffTime = due.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const formatDueDate = (dueDate: Date | string) => {
    return new Date(dueDate).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount)
  }

  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Upcoming Payments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-20 bg-gray-200 rounded-lg"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (allPayments.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Upcoming Payments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-gray-600 text-sm">No upcoming payments</p>
            <p className="text-gray-500 text-xs mt-1">You are all caught up!</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Upcoming Payments
            {overdue.length > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-800 text-xs font-bold rounded-full">
                {overdue.length} overdue
              </span>
            )}
          </CardTitle>
          {showViewAll && allPayments.length > 0 && (
            <Link href="/student/payments">
              <Button variant="ghost" size="sm" className="gap-1">
                View All
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {allPayments.map((payment, index) => {
            const daysUntil = getDaysUntilDue(payment.dueDate)
            const isOverdue = daysUntil < 0

            return (
              <motion.div
                key={payment.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={cn(
                  'p-4 rounded-lg border transition-all hover:shadow-md',
                  isOverdue
                    ? 'bg-red-50 border-red-200'
                    : daysUntil <= 7
                      ? 'bg-orange-50 border-orange-200'
                      : 'bg-white border-gray-200'
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {isOverdue && <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />}
                      <h4 className="font-semibold text-gray-900 text-sm truncate">
                        {payment.feePlan?.courseName || 'Course Payment'}
                      </h4>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Due: {formatDueDate(payment.dueDate)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <PaymentStatusBadge
                        status={isOverdue ? 'OVERDUE' : payment.status}
                        size="sm"
                      />
                      {!isOverdue && daysUntil <= 7 && (
                        <span className="text-xs text-orange-700 font-medium">
                          {daysUntil === 0
                            ? 'Due Today'
                            : daysUntil === 1
                              ? 'Due Tomorrow'
                              : `${daysUntil} days left`}
                        </span>
                      )}
                      {isOverdue && (
                        <span className="text-xs text-red-700 font-medium">
                          {Math.abs(daysUntil)} days overdue
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-lg font-bold text-gray-900">
                      {formatAmount(Number(payment.amount))}
                    </p>
                    <p className="text-xs text-gray-500">Installment {payment.installmentNumber}</p>
                  </div>
                </div>

                {payment.paymentLink && (
                  <div className="mt-3 pt-3 border-t">
                    <Button
                      variant={isOverdue ? 'destructive' : 'primary'}
                      size="sm"
                      className="w-full"
                      onClick={() => window.open(payment.paymentLink!, '_blank')}
                    >
                      {isOverdue ? 'Pay Now (Overdue)' : 'Pay Now'}
                    </Button>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
