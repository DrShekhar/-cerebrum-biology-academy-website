'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
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
  Calculator,
  TrendingUp,
  Clock,
  Filter,
  Download,
  Loader2,
  X,
  IndianRupee,
} from 'lucide-react'
import { format, isPast, isToday, differenceInDays } from 'date-fns'
import { showToast } from '@/lib/toast'

// ─── Types ───────────────────────────────────────────────────────────────────

interface PaymentInstallment {
  id: string
  installmentNumber: number
  amount: number
  dueDate: string
  status: 'PENDING' | 'PAID' | 'OVERDUE' | 'PARTIAL'
  paidAt: string | null
  paidAmount: number | null
  feePlan: {
    id: string
    courseName: string
    totalFee: number
    amountPaid: number
    amountDue: number
    lead: {
      id: string
      studentName: string
      phone: string
      email: string | null
      stage: string
    }
  }
}

// ─── EMI Calculator Component ────────────────────────────────────────────────

function EMICalculator({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [totalFee, setTotalFee] = useState<string>('90000')
  const [downPayment, setDownPayment] = useState<string>('20000')
  const [installments, setInstallments] = useState<number>(6)
  const [startDate, setStartDate] = useState(format(new Date(), 'yyyy-MM-dd'))

  const calculations = useMemo(() => {
    const total = Number(totalFee) || 0
    const down = Number(downPayment) || 0
    const remaining = Math.max(total - down, 0)
    const emiAmount = installments > 0 ? Math.ceil(remaining / installments) : 0

    const schedule = Array.from({ length: installments }, (_, i) => {
      const date = new Date(startDate)
      date.setMonth(date.getMonth() + i + 1)
      return {
        number: i + 1,
        amount: i === installments - 1
          ? remaining - emiAmount * (installments - 1) // Last EMI adjusts for rounding
          : emiAmount,
        date: format(date, 'MMM d, yyyy'),
      }
    })

    return { total, down, remaining, emiAmount, schedule }
  }, [totalFee, downPayment, installments, startDate])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-indigo-600" />
              <h2 className="text-xl font-bold text-gray-900">EMI Calculator</h2>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* Inputs */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Total Course Fee (₹)</label>
              <input
                type="number"
                value={totalFee}
                onChange={(e) => setTotalFee(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Down Payment (₹)</label>
              <input
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Number of EMIs</label>
              <div className="flex gap-2">
                {[3, 4, 6, 9, 12].map((n) => (
                  <button
                    key={n}
                    onClick={() => setInstallments(n)}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${
                      installments === n
                        ? 'bg-indigo-50 border-indigo-300 text-indigo-700'
                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>
          </div>

          {/* Result Summary */}
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl p-5 text-white">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-indigo-200 text-xs">Down Payment</p>
                <p className="text-xl font-bold">₹{calculations.down.toLocaleString('en-IN')}</p>
              </div>
              <div>
                <p className="text-indigo-200 text-xs">Monthly EMI</p>
                <p className="text-2xl font-bold">₹{calculations.emiAmount.toLocaleString('en-IN')}</p>
              </div>
              <div>
                <p className="text-indigo-200 text-xs">Total Amount</p>
                <p className="text-xl font-bold">₹{calculations.total.toLocaleString('en-IN')}</p>
              </div>
            </div>
          </div>

          {/* EMI Schedule */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Payment Schedule</h3>
            <div className="bg-gray-50 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">EMI #</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Due Date</th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 bg-green-50">
                    <td className="px-4 py-2 text-sm text-gray-700">Advance</td>
                    <td className="px-4 py-2 text-sm text-gray-700">At Registration</td>
                    <td className="px-4 py-2 text-sm text-gray-900 font-medium text-right">
                      ₹{calculations.down.toLocaleString('en-IN')}
                    </td>
                  </tr>
                  {calculations.schedule.map((emi) => (
                    <tr key={emi.number} className="border-b border-gray-100">
                      <td className="px-4 py-2 text-sm text-gray-700">EMI {emi.number}</td>
                      <td className="px-4 py-2 text-sm text-gray-700">{emi.date}</td>
                      <td className="px-4 py-2 text-sm text-gray-900 font-medium text-right">
                        ₹{emi.amount.toLocaleString('en-IN')}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-indigo-50 font-bold">
                    <td className="px-4 py-2 text-sm text-indigo-700" colSpan={2}>Total</td>
                    <td className="px-4 py-2 text-sm text-indigo-700 text-right">
                      ₹{calculations.total.toLocaleString('en-IN')}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Main Payments Page ──────────────────────────────────────────────────────

export default function PaymentsPageV2() {
  const [payments, setPayments] = useState<PaymentInstallment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<string>('ALL')
  const [showEMI, setShowEMI] = useState(false)
  const [marking, setMarking] = useState<string | null>(null)
  const [sending, setSending] = useState<string | null>(null)

  useEffect(() => {
    fetchPayments()
  }, [statusFilter])

  async function fetchPayments() {
    try {
      setLoading(true)
      setError(null)
      const url = statusFilter === 'ALL'
        ? '/api/counselor/payments'
        : `/api/counselor/payments?status=${statusFilter}`
      const res = await fetch(url, { credentials: 'include' })
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      setPayments(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load')
    } finally {
      setLoading(false)
    }
  }

  async function handleMarkPaid(payment: PaymentInstallment) {
    if (payment.status === 'PAID') return
    if (!confirm(`Mark ₹${payment.amount.toLocaleString('en-IN')} from ${payment.feePlan.lead.studentName} as paid?`)) return

    try {
      setMarking(payment.id)
      const res = await fetch(`/api/counselor/payments/${payment.id}/mark-paid`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ paidAmount: payment.amount, paymentMethod: 'RAZORPAY_UPI' }),
      })
      if (!res.ok) throw new Error('Failed')
      showToast.success('Payment marked as paid!')
      fetchPayments()
    } catch {
      showToast.error('Failed to mark payment')
    } finally {
      setMarking(null)
    }
  }

  async function handleSendReminder(payment: PaymentInstallment) {
    if (payment.status === 'PAID') return
    if (!confirm(`Send reminder to ${payment.feePlan.lead.studentName}?`)) return

    try {
      setSending(payment.id)
      const res = await fetch('/api/counselor/payments/reminders/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          installmentId: payment.id,
          channels: ['whatsapp'],
        }),
      })
      if (!res.ok) throw new Error('Failed')
      showToast.success('Reminder sent!')
    } catch {
      showToast.error('Failed to send reminder')
    } finally {
      setSending(null)
    }
  }

  // Computed stats
  const stats = useMemo(() => {
    const total = payments.reduce((sum, p) => sum + Number(p.amount), 0)
    const paid = payments.filter((p) => p.status === 'PAID').reduce((sum, p) => sum + Number(p.paidAmount || p.amount), 0)
    const pending = payments.filter((p) => p.status === 'PENDING').reduce((sum, p) => sum + Number(p.amount), 0)
    const overdue = payments.filter((p) => p.status === 'OVERDUE' || (p.status === 'PENDING' && isPast(new Date(p.dueDate)))).reduce((sum, p) => sum + Number(p.amount), 0)
    const overdueCount = payments.filter((p) => p.status === 'OVERDUE' || (p.status === 'PENDING' && isPast(new Date(p.dueDate)))).length
    const dueThisWeek = payments.filter((p) => {
      if (p.status === 'PAID') return false
      const days = differenceInDays(new Date(p.dueDate), new Date())
      return days >= 0 && days <= 7
    }).length
    return { total, paid, pending, overdue, overdueCount, dueThisWeek }
  }, [payments])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payments</h1>
          <p className="text-gray-600 mt-1">Track installments, send reminders, and manage collections</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowEMI(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-medium transition-colors"
          >
            <Calculator className="w-4 h-4" /> EMI Calculator
          </button>
          <button
            onClick={fetchPayments}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-medium transition-colors"
          >
            <RefreshCw className="w-4 h-4" /> Refresh
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-blue-600" />
            </div>
          </div>
          <p className="text-xs text-gray-500">Total Expected</p>
          <p className="text-xl font-bold text-gray-900">₹{(stats.total / 1000).toFixed(0)}K</p>
        </div>

        <div className="bg-white rounded-xl border border-green-200 p-5">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-9 h-9 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-green-600" />
            </div>
          </div>
          <p className="text-xs text-gray-500">Collected</p>
          <p className="text-xl font-bold text-green-600">₹{(stats.paid / 1000).toFixed(0)}K</p>
        </div>

        <div className="bg-white rounded-xl border border-red-200 p-5">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-9 h-9 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-4 h-4 text-red-600" />
            </div>
          </div>
          <p className="text-xs text-red-500">Overdue</p>
          <p className="text-xl font-bold text-red-600">₹{(stats.overdue / 1000).toFixed(0)}K</p>
          <p className="text-[10px] text-red-400 mt-0.5">{stats.overdueCount} installments</p>
        </div>

        <div className="bg-white rounded-xl border border-amber-200 p-5">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-9 h-9 bg-amber-100 rounded-lg flex items-center justify-center">
              <Clock className="w-4 h-4 text-amber-600" />
            </div>
          </div>
          <p className="text-xs text-gray-500">Due This Week</p>
          <p className="text-xl font-bold text-amber-600">{stats.dueThisWeek}</p>
          <p className="text-[10px] text-gray-400 mt-0.5">installments</p>
        </div>
      </div>

      {/* Collection Progress */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-700">Collection Rate</h3>
          <span className="text-sm font-bold text-indigo-600">
            {stats.total > 0 ? Math.round((stats.paid / stats.total) * 100) : 0}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-700"
            style={{ width: `${stats.total > 0 ? (stats.paid / stats.total) * 100 : 0}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>₹{stats.paid.toLocaleString('en-IN')} collected</span>
          <span>₹{(stats.total - stats.paid).toLocaleString('en-IN')} remaining</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        {[
          { value: 'ALL', label: 'All' },
          { value: 'OVERDUE', label: `Overdue (${stats.overdueCount})`, color: 'text-red-600' },
          { value: 'PENDING', label: 'Pending' },
          { value: 'PAID', label: 'Paid' },
        ].map((f) => (
          <button
            key={f.value}
            onClick={() => setStatusFilter(f.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              statusFilter === f.value
                ? 'bg-indigo-600 text-white'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Payments Grid */}
      {error ? (
        <div className="bg-red-50 rounded-xl border border-red-200 p-6 text-center">
          <p className="text-red-700">{error}</p>
          <button onClick={fetchPayments} className="mt-2 text-sm text-red-600 underline">
            Try again
          </button>
        </div>
      ) : payments.length === 0 ? (
        <div className="bg-gray-50 rounded-xl p-12 text-center">
          <CreditCard className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No payments found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {payments.map((payment) => {
            const isOverdue = payment.status !== 'PAID' && isPast(new Date(payment.dueDate))
            const daysUntilDue = differenceInDays(new Date(payment.dueDate), new Date())

            return (
              <div
                key={payment.id}
                className={`bg-white rounded-xl border-2 p-5 transition-all hover:shadow-md ${
                  payment.status === 'PAID'
                    ? 'border-green-200'
                    : isOverdue
                      ? 'border-red-300 bg-red-50/30'
                      : daysUntilDue <= 3
                        ? 'border-amber-300'
                        : 'border-gray-200'
                }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <Link href={`/counselor/leads/${payment.feePlan.lead.id}`} className="hover:text-indigo-600">
                    <h3 className="font-semibold text-gray-900">{payment.feePlan.lead.studentName}</h3>
                    <p className="text-xs text-gray-500">{payment.feePlan.courseName}</p>
                  </Link>
                  <span
                    className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                      payment.status === 'PAID'
                        ? 'bg-green-100 text-green-700'
                        : isOverdue
                          ? 'bg-red-100 text-red-700'
                          : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {isOverdue && payment.status !== 'PAID' ? 'OVERDUE' : payment.status}
                  </span>
                </div>

                {/* Amount */}
                <p className="text-2xl font-bold text-gray-900 mb-1">
                  ₹{Number(payment.amount).toLocaleString('en-IN')}
                </p>
                <p className="text-xs text-gray-500 mb-3">
                  EMI #{payment.installmentNumber} •{' '}
                  {isOverdue
                    ? `${Math.abs(daysUntilDue)} days overdue`
                    : isToday(new Date(payment.dueDate))
                      ? 'Due today'
                      : `Due ${format(new Date(payment.dueDate), 'MMM d, yyyy')}`}
                </p>

                {/* Actions */}
                {payment.status !== 'PAID' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleMarkPaid(payment)}
                      disabled={marking === payment.id}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-medium disabled:opacity-50 transition-colors"
                    >
                      {marking === payment.id ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <CheckCircle className="w-3.5 h-3.5" />
                      )}
                      Mark Paid
                    </button>
                    <button
                      onClick={() => handleSendReminder(payment)}
                      disabled={sending === payment.id}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-medium disabled:opacity-50 transition-colors"
                    >
                      {sending === payment.id ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Send className="w-3.5 h-3.5" />
                      )}
                      Remind
                    </button>
                    <a
                      href={`https://wa.me/91${payment.feePlan.lead.phone?.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-[#166534] hover:bg-[#14532d] text-white rounded-lg transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}

                {payment.status === 'PAID' && (
                  <div className="flex items-center gap-2 py-2 bg-green-50 rounded-lg justify-center">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-700 font-medium">
                      Paid {payment.paidAt ? format(new Date(payment.paidAt), 'MMM d') : ''}
                    </span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      <EMICalculator isOpen={showEMI} onClose={() => setShowEMI(false)} />
    </div>
  )
}

// Missing import used in JSX
function MessageSquare(props: any) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}
