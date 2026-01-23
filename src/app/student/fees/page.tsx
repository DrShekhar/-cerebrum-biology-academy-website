'use client'

export const dynamic = 'force-dynamic'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { EmptyState } from '@/components/ui/EmptyState'
import { useAuth } from '@/contexts/AuthContext'
import { motion } from 'framer-motion'
import { showToast } from '@/lib/toast'
import { cn } from '@/lib/utils'
import {
  Wallet,
  Calendar,
  AlertCircle,
  Clock,
  CheckCircle,
  CreditCard,
  HelpCircle,
  Send,
  Phone,
  Mail,
  Gift,
  ArrowLeft,
  Percent,
  IndianRupee,
  AlertTriangle,
  BadgeCheck,
} from 'lucide-react'
import Link from 'next/link'
import { format, isBefore, addDays } from 'date-fns'

interface FeePlan {
  id: string
  courseName: string
  totalFee: number
  amountPaid: number
  amountDue: number
  planType: string
  status: string
}

interface Installment {
  id: string
  feePlanId: string
  installmentNumber: number
  amount: number
  dueDate: string
  status: string
  paidAt: string | null
  paidAmount: number | null
  fee_plans?: FeePlan
}

interface PaymentSummary {
  totalPaid: number
  totalPending: number
  totalOverdue: number
  completedPayments: number
  pendingPayments: number
  overduePayments: number
  nextPaymentDue: Installment | null
}

type EnquiryCategory = 'INSTALLMENT' | 'SCHOLARSHIP' | 'REFUND' | 'PAYMENT_ISSUE' | 'OTHER'

const enquiryCategories: { value: EnquiryCategory; label: string; description: string }[] = [
  { value: 'INSTALLMENT', label: 'Installment Query', description: 'Questions about payment schedule' },
  { value: 'SCHOLARSHIP', label: 'Scholarship', description: 'Apply or enquire about scholarships' },
  { value: 'REFUND', label: 'Refund Request', description: 'Request refund or cancellation' },
  { value: 'PAYMENT_ISSUE', label: 'Payment Issue', description: 'Problem with a payment' },
  { value: 'OTHER', label: 'Other', description: 'General fee enquiry' },
]

const scholarships = [
  { title: 'Merit Scholarship', discount: 'Up to 25%', criteria: 'Based on previous academic performance' },
  { title: 'Early Bird Discount', discount: 'Up to 15%', criteria: 'Register 2 months before course start' },
  { title: 'Sibling Discount', discount: 'Up to 10%', criteria: 'Multiple enrollments from same family' },
  { title: 'Referral Bonus', discount: 'Up to 5%', criteria: 'Refer a friend and both get discount' },
]

export default function StudentFeesPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth()
  const router = useRouter()

  const [summary, setSummary] = useState<PaymentSummary | null>(null)
  const [installments, setInstallments] = useState<Installment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'overview' | 'schedule' | 'enquiry'>('overview')

  const [enquiryCategory, setEnquiryCategory] = useState<EnquiryCategory | null>(null)
  const [enquirySubject, setEnquirySubject] = useState('')
  const [enquiryMessage, setEnquiryMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/sign-in')
      return
    }

    if (isAuthenticated && user) {
      fetchFeeData()
    }
  }, [isAuthenticated, authLoading, user, router])

  const fetchFeeData = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/student/payments')
      const data = await response.json()

      if (data.success) {
        setSummary(data.data.summary)
        setInstallments(data.data.installments || [])
      } else {
        showToast.error(data.error || 'Failed to fetch fee data')
      }
    } catch (error) {
      console.error('Error fetching fee data:', error)
      showToast.error('Failed to load fee information')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmitEnquiry = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!enquiryCategory || !enquirySubject.trim() || !enquiryMessage.trim()) {
      showToast.error('Please fill in all fields')
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'FEE_ENQUIRY',
          category: enquiryCategory,
          subject: enquirySubject.trim(),
          message: enquiryMessage.trim(),
          metadata: {
            totalPending: summary?.totalPending || 0,
            totalOverdue: summary?.totalOverdue || 0,
          },
        }),
      })

      const data = await response.json()

      if (data.success) {
        showToast.success('Your enquiry has been submitted. Our team will contact you soon.')
        setEnquiryCategory(null)
        setEnquirySubject('')
        setEnquiryMessage('')
      } else {
        throw new Error(data.error || 'Failed to submit enquiry')
      }
    } catch (error) {
      console.error('Error submitting enquiry:', error)
      showToast.error('Failed to submit enquiry. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getInstallmentStatus = (installment: Installment) => {
    const dueDate = new Date(installment.dueDate)
    const now = new Date()

    if (installment.status === 'PAID' || installment.status === 'COMPLETED') {
      return { label: 'Paid', color: 'bg-green-100 text-green-700', icon: CheckCircle }
    }
    if (installment.status === 'OVERDUE' || isBefore(dueDate, now)) {
      return { label: 'Overdue', color: 'bg-red-100 text-red-700', icon: AlertTriangle }
    }
    if (isBefore(dueDate, addDays(now, 7))) {
      return { label: 'Due Soon', color: 'bg-yellow-100 text-yellow-700', icon: Clock }
    }
    return { label: 'Upcoming', color: 'bg-blue-100 text-blue-700', icon: Calendar }
  }

  const groupedInstallments = installments.reduce(
    (acc, inst) => {
      const planName = inst.fee_plans?.courseName || 'Course Fee'
      if (!acc[planName]) {
        acc[planName] = {
          plan: inst.fee_plans,
          installments: [],
        }
      }
      acc[planName].installments.push(inst)
      return acc
    },
    {} as Record<string, { plan?: FeePlan; installments: Installment[] }>
  )

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
              description="Please sign in to view your fee details."
              primaryAction={{ label: 'Sign In', href: '/sign-in' }}
              size="lg"
              variant="warning"
            />
          </CardContent>
        </Card>
      </div>
    )
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Wallet },
    { id: 'schedule', label: 'Payment Schedule', icon: Calendar },
    { id: 'enquiry', label: 'Fee Enquiry', icon: HelpCircle },
  ] as const

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Button variant="ghost" size="sm" onClick={() => router.push('/student/dashboard')}>
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Dashboard
                </Button>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Fee Details & Enquiry</h1>
              <p className="text-gray-600 mt-1">
                View your fee structure, payment schedule, and raise enquiries
              </p>
            </div>
            <Link href="/student/payments">
              <Button variant="outline">
                <CreditCard className="w-4 h-4 mr-2" />
                Payment History
              </Button>
            </Link>
          </div>

          <div className="flex gap-2 border-b border-gray-200 overflow-x-auto pb-px">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap',
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {summary && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <StatCard
                    title="Total Paid"
                    value={formatCurrency(summary.totalPaid)}
                    icon={<BadgeCheck className="w-5 h-5" />}
                    color="text-green-600 bg-green-50"
                  />
                  <StatCard
                    title="Pending Amount"
                    value={formatCurrency(summary.totalPending)}
                    icon={<Clock className="w-5 h-5" />}
                    color="text-orange-600 bg-orange-50"
                  />
                  <StatCard
                    title="Overdue Amount"
                    value={formatCurrency(summary.totalOverdue)}
                    icon={<AlertCircle className="w-5 h-5" />}
                    color="text-red-600 bg-red-50"
                    highlight={summary.totalOverdue > 0}
                  />
                  <StatCard
                    title="Next Due"
                    value={
                      summary.nextPaymentDue
                        ? format(new Date(summary.nextPaymentDue.dueDate), 'MMM d')
                        : 'None'
                    }
                    subtitle={
                      summary.nextPaymentDue ? formatCurrency(summary.nextPaymentDue.amount) : ''
                    }
                    icon={<Calendar className="w-5 h-5" />}
                    color="text-blue-600 bg-blue-50"
                  />
                </div>
              )}

              {summary?.totalOverdue && summary.totalOverdue > 0 ? (
                <Card className="border-red-200 bg-red-50">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-red-800">Overdue Payment Alert</h3>
                        <p className="text-sm text-red-700 mt-1">
                          You have {formatCurrency(summary.totalOverdue)} in overdue payments. Please
                          clear these to avoid any service interruption.
                        </p>
                        <div className="mt-3 flex gap-2">
                          <Link href="/student/payments">
                            <Button size="sm" className="bg-red-600 hover:bg-red-700">
                              Pay Now
                            </Button>
                          </Link>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-300 text-red-700"
                            onClick={() => setActiveTab('enquiry')}
                          >
                            Request Extension
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : null}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Gift className="w-5 h-5 text-purple-600" />
                      Available Scholarships & Discounts
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {scholarships.map((scholarship, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <h4 className="font-medium text-gray-900">{scholarship.title}</h4>
                          <p className="text-sm text-gray-500">{scholarship.criteria}</p>
                        </div>
                        <span className="text-sm font-semibold text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                          {scholarship.discount}
                        </span>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      className="w-full mt-2"
                      onClick={() => {
                        setEnquiryCategory('SCHOLARSHIP')
                        setActiveTab('enquiry')
                      }}
                    >
                      Apply for Scholarship
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <CreditCard className="w-5 h-5 text-blue-600" />
                      Payment Methods
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: 'UPI/GPay', icon: '📱' },
                        { label: 'Credit Card', icon: '💳' },
                        { label: 'Debit Card', icon: '💳' },
                        { label: 'Net Banking', icon: '🏦' },
                        { label: 'Bank Transfer', icon: '🔄' },
                        { label: 'EMI Available', icon: '📅' },
                      ].map((method) => (
                        <div
                          key={method.label}
                          className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg text-sm"
                        >
                          <span>{method.icon}</span>
                          <span className="text-gray-700">{method.label}</span>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-2 text-green-700">
                        <Percent className="w-4 h-4" />
                        <span className="text-sm font-medium">0% Processing Fee on all payments</span>
                      </div>
                    </div>
                    <Link href="/student/payments">
                      <Button className="w-full">
                        <IndianRupee className="w-4 h-4 mr-2" />
                        Make a Payment
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Need Help with Fees?</h3>
                      <p className="text-blue-100">
                        Our counselors are available to discuss payment plans and financial assistance.
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <a href="tel:+918826444334">
                        <Button variant="secondary" size="sm">
                          <Phone className="w-4 h-4 mr-2" />
                          Call Now
                        </Button>
                      </a>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-white text-white hover:bg-white/20"
                        onClick={() => setActiveTab('enquiry')}
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Send Enquiry
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === 'schedule' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {Object.keys(groupedInstallments).length === 0 ? (
                <Card>
                  <CardContent className="p-8">
                    <EmptyState
                      icon={Calendar}
                      title="No Payment Schedule"
                      description="You don't have any active fee plans yet. Once enrolled, your payment schedule will appear here."
                      primaryAction={{ label: 'View Courses', href: '/courses' }}
                      size="lg"
                    />
                  </CardContent>
                </Card>
              ) : (
                Object.entries(groupedInstallments).map(([planName, { plan, installments: planInstallments }]) => (
                  <Card key={planName}>
                    <CardHeader>
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <CardTitle className="text-lg">{planName}</CardTitle>
                        {plan && (
                          <div className="flex items-center gap-4 text-sm">
                            <span className="text-gray-500">
                              Total: <span className="font-semibold text-gray-900">{formatCurrency(plan.totalFee)}</span>
                            </span>
                            <span className="text-green-600">
                              Paid: {formatCurrency(plan.amountPaid)}
                            </span>
                            <span className="text-orange-600">
                              Due: {formatCurrency(plan.amountDue)}
                            </span>
                          </div>
                        )}
                      </div>
                      {plan && (
                        <div className="mt-3">
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-green-500 transition-all duration-500"
                              style={{
                                width: `${(plan.amountPaid / plan.totalFee) * 100}%`,
                              }}
                            />
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {((plan.amountPaid / plan.totalFee) * 100).toFixed(0)}% paid
                          </p>
                        </div>
                      )}
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {planInstallments
                          .sort((a, b) => a.installmentNumber - b.installmentNumber)
                          .map((installment) => {
                            const status = getInstallmentStatus(installment)
                            const StatusIcon = status.icon
                            return (
                              <div
                                key={installment.id}
                                className={cn(
                                  'flex items-center justify-between p-4 rounded-lg border',
                                  installment.status === 'OVERDUE' ||
                                  (installment.status === 'PENDING' && isBefore(new Date(installment.dueDate), new Date()))
                                    ? 'border-red-200 bg-red-50'
                                    : 'border-gray-200 bg-gray-50'
                                )}
                              >
                                <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                                    <span className="font-semibold text-gray-700">
                                      {installment.installmentNumber}
                                    </span>
                                  </div>
                                  <div>
                                    <p className="font-medium text-gray-900">
                                      Installment {installment.installmentNumber}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                      Due: {format(new Date(installment.dueDate), 'MMM d, yyyy')}
                                      {installment.paidAt && (
                                        <span className="ml-2 text-green-600">
                                          • Paid {format(new Date(installment.paidAt), 'MMM d')}
                                        </span>
                                      )}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-4">
                                  <span className="font-semibold text-gray-900">
                                    {formatCurrency(installment.amount)}
                                  </span>
                                  <span
                                    className={cn(
                                      'flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium',
                                      status.color
                                    )}
                                  >
                                    <StatusIcon className="w-3 h-3" />
                                    {status.label}
                                  </span>
                                </div>
                              </div>
                            )
                          })}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </motion.div>
          )}

          {activeTab === 'enquiry' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <HelpCircle className="w-5 h-5 text-blue-600" />
                      Submit Fee Enquiry
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmitEnquiry} className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          What is your enquiry about?
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {enquiryCategories.map((cat) => (
                            <button
                              key={cat.value}
                              type="button"
                              onClick={() => setEnquiryCategory(cat.value)}
                              className={cn(
                                'p-4 rounded-lg border-2 text-left transition-all',
                                enquiryCategory === cat.value
                                  ? 'border-blue-500 bg-blue-50'
                                  : 'border-gray-200 hover:border-gray-300'
                              )}
                            >
                              <p className="font-medium text-gray-900">{cat.label}</p>
                              <p className="text-sm text-gray-500">{cat.description}</p>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                          Subject
                        </label>
                        <Input
                          id="subject"
                          value={enquirySubject}
                          onChange={(e) => setEnquirySubject(e.target.value)}
                          placeholder="Brief description of your enquiry"
                          maxLength={100}
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                          Message
                        </label>
                        <Textarea
                          id="message"
                          value={enquiryMessage}
                          onChange={(e) => setEnquiryMessage(e.target.value)}
                          placeholder="Please provide details about your enquiry..."
                          rows={5}
                          maxLength={1000}
                        />
                        <p className="text-xs text-gray-500 mt-1">{enquiryMessage.length}/1000 characters</p>
                      </div>

                      <div className="flex justify-end gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setEnquiryCategory(null)
                            setEnquirySubject('')
                            setEnquiryMessage('')
                          }}
                        >
                          Clear
                        </Button>
                        <Button
                          type="submit"
                          disabled={isSubmitting || !enquiryCategory || !enquirySubject.trim() || !enquiryMessage.trim()}
                        >
                          {isSubmitting ? (
                            'Submitting...'
                          ) : (
                            <>
                              <Send className="w-4 h-4 mr-2" />
                              Submit Enquiry
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Contact</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <a
                      href="tel:+918826444334"
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <Phone className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Call Fee Helpline</p>
                        <p className="text-sm text-gray-500">+91 88264 44334</p>
                      </div>
                    </a>
                    <a
                      href="mailto:fees@cerebrumbiology.com"
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Mail className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Email Support</p>
                        <p className="text-sm text-gray-500">fees@cerebrumbiology.com</p>
                      </div>
                    </a>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">FAQs</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { q: 'Can I pay in installments?', a: 'Yes, flexible EMI options available.' },
                      { q: 'What if I miss a payment?', a: 'Contact us for extension options.' },
                      { q: 'Are scholarships available?', a: 'Yes, merit and need-based scholarships.' },
                      { q: 'Is there a refund policy?', a: 'Yes, pro-rata refund within 30 days.' },
                    ].map((faq, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <p className="font-medium text-gray-900 text-sm">{faq.q}</p>
                        <p className="text-sm text-gray-500 mt-1">{faq.a}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

function StatCard({
  title,
  value,
  subtitle,
  icon,
  color,
  highlight,
}: {
  title: string
  value: string
  subtitle?: string
  icon: React.ReactNode
  color: string
  highlight?: boolean
}) {
  return (
    <Card className={cn(highlight && 'border-red-200')}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-gray-600">{title}</p>
            <p className={cn('text-xl font-bold mt-1', highlight && 'text-red-600')}>{value}</p>
            {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
          </div>
          <div className={cn('p-2 rounded-lg', color)}>{icon}</div>
        </div>
      </CardContent>
    </Card>
  )
}

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse bg-white rounded-lg shadow p-4">
                <div className="h-12 bg-gray-200 rounded mb-2"></div>
                <div className="h-6 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="animate-pulse bg-white rounded-lg shadow p-6">
              <div className="h-48 bg-gray-200 rounded"></div>
            </div>
            <div className="animate-pulse bg-white rounded-lg shadow p-6">
              <div className="h-48 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
