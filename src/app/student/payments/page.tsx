/**
 * Student Payments Page
 * Comprehensive payment history and invoice management for students
 */

'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { PaymentHistoryList } from '@/components/student/PaymentHistoryList'
import { UpcomingPaymentsWidget } from '@/components/student/UpcomingPaymentsWidget'
import { EmptyState } from '@/components/ui/EmptyState'
import { useAuth } from '@/contexts/AuthContext'
import {
  TrendingUp,
  Clock,
  AlertCircle,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Receipt,
  FileText,
} from 'lucide-react'
import { showToast } from '@/lib/toast'
import { cn } from '@/lib/utils'
import type { PaymentSummary, PaymentStats } from '@/types/payment'
import Link from 'next/link'

export default function StudentPaymentsPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth()
  const [summary, setSummary] = useState<PaymentSummary | null>(null)
  const [stats, setStats] = useState<PaymentStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchPaymentData()
    }
  }, [isAuthenticated, user])

  const fetchPaymentData = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/student/payments')
      const data = await response.json()

      if (data.success) {
        setSummary(data.data.summary)
        setStats(data.data.stats)
      } else {
        showToast.error(data.error || 'Failed to fetch payment data')
      }
    } catch (error) {
      console.error('Error fetching payment data:', error)
      showToast.error('Failed to load payment information')
    } finally {
      setIsLoading(false)
    }
  }

  if (authLoading || isLoading) {
    return <LoadingSkeleton />
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-8">
            <EmptyState
              icon={AlertCircle}
              title="Authentication Required"
              description="Please sign in to view your payment history and manage invoices."
              primaryAction={{
                label: 'Sign In',
                href: '/sign-in',
              }}
              size="lg"
              variant="warning"
            />
          </CardContent>
        </Card>
      </div>
    )
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount)
  }

  const formatDate = (date: Date | string | null) => {
    if (!date) return 'N/A'
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment History</h1>
              <p className="text-gray-600">
                View your payment transactions, download invoices, and track upcoming installments
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/student/dashboard">
                <Button variant="outline" size="sm">
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </div>

          {summary && stats && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Paid"
                value={formatCurrency(summary.totalPaid)}
                icon={<Wallet className="w-5 h-5" />}
                color="text-green-600 bg-green-50"
                trend={stats.paymentCount > 0 ? 'up' : undefined}
                trendValue={`${stats.paymentCount} payment${stats.paymentCount !== 1 ? 's' : ''}`}
              />

              <StatCard
                title="Pending Payments"
                value={formatCurrency(summary.totalPending)}
                icon={<Clock className="w-5 h-5" />}
                color="text-orange-600 bg-orange-50"
                trend={summary.pendingPayments > 0 ? 'neutral' : undefined}
                trendValue={`${summary.pendingPayments} pending`}
              />

              <StatCard
                title="Overdue Amount"
                value={formatCurrency(summary.totalOverdue)}
                icon={<AlertCircle className="w-5 h-5" />}
                color="text-red-600 bg-red-50"
                trend={summary.overduePayments > 0 ? 'down' : undefined}
                trendValue={`${summary.overduePayments} overdue`}
              />

              <StatCard
                title="Last Payment"
                value={stats.lastPaymentDate ? formatDate(stats.lastPaymentDate) : 'No payments'}
                icon={<Calendar className="w-5 h-5" />}
                color="text-blue-600 bg-blue-50"
                trend={undefined}
                trendValue={
                  stats.lastPaymentDate ? formatCurrency(stats.averagePayment) + ' avg' : undefined
                }
              />
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Receipt className="w-5 h-5" />
                    All Transactions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <PaymentHistoryList />
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <UpcomingPaymentsWidget maxItems={5} showViewAll={false} />

              {stats && stats.paymentCount > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Payment Statistics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Total Spent</span>
                        <span className="font-semibold text-gray-900">
                          {formatCurrency(stats.totalPaid)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Average Payment</span>
                        <span className="font-semibold text-gray-900">
                          {formatCurrency(stats.averagePayment)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Total Transactions</span>
                        <span className="font-semibold text-gray-900">{stats.paymentCount}</span>
                      </div>

                      {summary && summary.completedPayments > 0 && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Success Rate</span>
                          <span className="font-semibold text-green-600">
                            {(
                              (summary.completedPayments /
                                (summary.completedPayments + summary.pendingPayments)) *
                              100
                            ).toFixed(0)}
                            %
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t">
                      <div className="text-sm text-gray-600 mb-3">Payment Progress</div>
                      <div className="relative pt-1">
                        <div className="flex mb-2 items-center justify-between">
                          <div>
                            <span className="text-xs font-semibold inline-block text-blue-600">
                              {stats.totalPaid > 0 &&
                                (
                                  (stats.totalPaid / (stats.totalPaid + stats.totalPending)) *
                                  100
                                ).toFixed(0)}
                              % Complete
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-semibold inline-block text-gray-600">
                              {formatCurrency(stats.totalPending)} remaining
                            </span>
                          </div>
                        </div>
                        <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                          <div
                            style={{
                              width: `${(stats.totalPaid / (stats.totalPaid + stats.totalPending)) * 100}%`,
                            }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600 transition-all duration-500"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card className="bg-indigo-500 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <FileText className="w-8 h-8 opacity-80" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
                  <p className="text-sm opacity-90 mb-4">
                    Have questions about your payments or need assistance with invoices?
                  </p>
                  <Button variant="secondary" size="sm" className="w-full">
                    Contact Support
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({
  title,
  value,
  icon,
  color,
  trend,
  trendValue,
}: {
  title: string
  value: string
  icon: React.ReactNode
  color: string
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
}) {
  return (
    <div
     className="animate-fadeInUp">
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-1">{title}</p>
              <p className="text-2xl font-bold text-gray-900 mb-2">{value}</p>
              {trendValue && (
                <div className="flex items-center gap-1 text-sm">
                  {trend === 'up' && <ArrowUpRight className="w-4 h-4 text-green-600" />}
                  {trend === 'down' && <ArrowDownRight className="w-4 h-4 text-red-600" />}
                  <span
                    className={cn(
                      'text-xs',
                      trend === 'up'
                        ? 'text-green-600'
                        : trend === 'down'
                          ? 'text-red-600'
                          : 'text-gray-600'
                    )}
                  >
                    {trendValue}
                  </span>
                </div>
              )}
            </div>
            <div className={cn('p-3 rounded-lg', color)}>{icon}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="h-12 bg-gray-200 rounded mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="animate-pulse bg-white rounded-lg shadow p-6">
                <div className="h-64 bg-gray-200 rounded"></div>
              </div>
            </div>
            <div>
              <div className="animate-pulse bg-white rounded-lg shadow p-6">
                <div className="h-96 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
