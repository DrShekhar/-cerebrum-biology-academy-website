'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Users,
  DollarSign,
  TrendingUp,
  Link2,
  ArrowRight,
  Clock,
  CheckCircle,
  AlertCircle,
  UserPlus,
  Calendar,
  Target,
  Activity,
} from 'lucide-react'

interface DashboardData {
  consultant: {
    id: string
    displayName: string
    consultantCode: string
    commissionRate: number
    isActive: boolean
  }
  summary: {
    totalReferrals: number
    successfulReferrals: number
    conversionRate: number
    totalCommission: number
    paidCommission: number
    pendingCommission: number
    pipelineValue: number
    activeLinks: number
    statusCounts: {
      newLead: number
      demoScheduled: number
      demoCompleted: number
      offerSent: number
      paymentPending: number
      enrolled: number
      lost: number
    }
  }
  recentReferrals: Array<{
    id: string
    studentName: string
    phone: string
    status: string
    statusLabel: string
    courseInterest: string | null
    createdAt: string
    commissionEarned: number | null
  }>
  pendingCommissions: Array<{
    id: string
    amount: number
    referral: { studentName: string; phone: string }
    createdAt: string
  }>
  activeLinks: Array<{
    id: string
    code: string
    name: string
    clickCount: number
    conversionCount: number
    conversionRate: number
  }>
  monthlyTrend: Array<{
    month: string
    year: number
    newLeads: number
    enrolled: number
    commission: number
  }>
}

const statusColors: Record<string, { bg: string; text: string; dot: string }> = {
  NEW_LEAD: { bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-500' },
  DEMO_SCHEDULED: { bg: 'bg-purple-100', text: 'text-purple-700', dot: 'bg-purple-500' },
  DEMO_COMPLETED: { bg: 'bg-indigo-100', text: 'text-indigo-700', dot: 'bg-indigo-500' },
  OFFER_SENT: { bg: 'bg-orange-100', text: 'text-orange-700', dot: 'bg-orange-500' },
  PAYMENT_PENDING: { bg: 'bg-yellow-100', text: 'text-yellow-700', dot: 'bg-yellow-500' },
  ENROLLED: { bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-500' },
  LOST: { bg: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-500' },
}

export default function ConsultantDashboard() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/consultant/dashboard')
      const result = await response.json()

      if (!result.success) {
        setError(result.error || 'Failed to load dashboard')
        return
      }

      setData(result.data)
    } catch {
      setError('Failed to connect to server')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-64"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-80 bg-gray-200 rounded-xl"></div>
          <div className="h-80 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-red-700 mb-2">Error Loading Dashboard</h2>
        <p className="text-red-600">{error}</p>
        <button
          onClick={() => {
            setLoading(true)
            setError(null)
            fetchDashboardData()
          }}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    )
  }

  if (!data) return null

  const { consultant, summary, recentReferrals, pendingCommissions, activeLinks, monthlyTrend } = data

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {consultant.displayName}
          </h1>
          <p className="text-gray-600 mt-1">
            Consultant Code: <span className="font-mono font-semibold">{consultant.consultantCode}</span>
            {' • '}
            Commission Rate: <span className="font-semibold text-teal-600">{consultant.commissionRate}%</span>
          </p>
        </div>
        <Link
          href="/consultant/leads/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
        >
          <UserPlus className="w-4 h-4" />
          Add New Lead
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Leads</p>
              <p className="text-2xl font-bold text-gray-900">{summary.totalReferrals}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Enrolled</p>
              <p className="text-2xl font-bold text-gray-900">{summary.successfulReferrals}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-teal-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Conversion</p>
              <p className="text-2xl font-bold text-gray-900">{summary.conversionRate}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Earned</p>
              <p className="text-2xl font-bold text-gray-900">
                ₹{summary.totalCommission.toLocaleString('en-IN')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Commission Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-5 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Paid Commission</p>
              <p className="text-3xl font-bold mt-1">
                ₹{summary.paidCommission.toLocaleString('en-IN')}
              </p>
            </div>
            <CheckCircle className="w-10 h-10 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-5 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Pending Payout</p>
              <p className="text-3xl font-bold mt-1">
                ₹{summary.pendingCommission.toLocaleString('en-IN')}
              </p>
            </div>
            <Clock className="w-10 h-10 text-orange-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-5 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Pipeline Value</p>
              <p className="text-3xl font-bold mt-1">
                ₹{summary.pipelineValue.toLocaleString('en-IN')}
              </p>
            </div>
            <Target className="w-10 h-10 text-purple-200" />
          </div>
        </div>
      </div>

      {/* Pipeline Stats */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Lead Pipeline</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {[
            { label: 'New', value: summary.statusCounts.newLead, color: 'blue' },
            { label: 'Demo Scheduled', value: summary.statusCounts.demoScheduled, color: 'purple' },
            { label: 'Demo Done', value: summary.statusCounts.demoCompleted, color: 'indigo' },
            { label: 'Offer Sent', value: summary.statusCounts.offerSent, color: 'orange' },
            { label: 'Payment Pending', value: summary.statusCounts.paymentPending, color: 'yellow' },
            { label: 'Enrolled', value: summary.statusCounts.enrolled, color: 'green' },
            { label: 'Lost', value: summary.statusCounts.lost, color: 'red' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className={`text-3xl font-bold text-${stat.color}-600`}
                style={{ color: `var(--${stat.color}-600, inherit)` }}
              >
                {stat.value}
              </div>
              <div className="text-xs text-gray-600 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recent Leads</h2>
            <Link
              href="/consultant/leads"
              className="text-sm text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {recentReferrals.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No leads yet. Add your first lead to get started!</p>
              </div>
            ) : (
              recentReferrals.slice(0, 5).map((lead) => {
                const colors = statusColors[lead.status] || statusColors.NEW_LEAD
                return (
                  <Link
                    key={lead.id}
                    href={`/consultant/leads/${lead.id}`}
                    className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 font-semibold">
                        {lead.studentName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{lead.studentName}</p>
                        <p className="text-sm text-gray-500">{lead.phone}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`}></span>
                        {lead.statusLabel}
                      </span>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </Link>
                )
              })
            )}
          </div>
        </div>

        {/* Pending Commissions & Links */}
        <div className="space-y-6">
          {/* Pending Commissions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Pending Commissions</h2>
              <Link
                href="/consultant/commissions"
                className="text-sm text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1"
              >
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="divide-y divide-gray-100">
              {pendingCommissions.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  <DollarSign className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>No pending commissions</p>
                </div>
              ) : (
                pendingCommissions.slice(0, 3).map((commission) => (
                  <div key={commission.id} className="flex items-center justify-between p-4">
                    <div>
                      <p className="font-medium text-gray-900">
                        {commission.referral.studentName}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(commission.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-orange-600">
                        ₹{commission.amount.toLocaleString('en-IN')}
                      </p>
                      <span className="text-xs text-orange-500 bg-orange-50 px-2 py-0.5 rounded">
                        Pending
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Active Referral Links */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Top Referral Links</h2>
              <Link
                href="/consultant/links"
                className="text-sm text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1"
              >
                Manage <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="divide-y divide-gray-100">
              {activeLinks.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  <Link2 className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>No referral links yet</p>
                  <Link
                    href="/consultant/links/new"
                    className="text-teal-600 hover:text-teal-700 text-sm font-medium mt-2 inline-block"
                  >
                    Create your first link
                  </Link>
                </div>
              ) : (
                activeLinks.slice(0, 3).map((link) => (
                  <div key={link.id} className="flex items-center justify-between p-4">
                    <div>
                      <p className="font-medium text-gray-900">{link.name}</p>
                      <p className="text-sm text-gray-500 font-mono">/ref/{link.code}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">{link.clickCount}</span> clicks
                      </p>
                      <p className="text-xs text-teal-600">
                        {link.conversionRate}% conversion
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Trend */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Monthly Performance</h2>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {monthlyTrend.map((month, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-600">
                {month.month} {month.year !== new Date().getFullYear() && month.year}
              </p>
              <div className="mt-2 space-y-1">
                <div className="flex items-center justify-center gap-1">
                  <Users className="w-3 h-3 text-blue-500" />
                  <span className="text-sm font-semibold">{month.newLeads}</span>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  <span className="text-sm font-semibold">{month.enrolled}</span>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <Activity className="w-3 h-3 text-yellow-500" />
                  <span className="text-sm font-semibold">
                    ₹{(month.commission / 1000).toFixed(0)}k
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link
          href="/consultant/leads/new"
          className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-teal-200 hover:shadow-md transition-all"
        >
          <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
            <UserPlus className="w-5 h-5 text-teal-600" />
          </div>
          <span className="font-medium text-gray-900">Add Lead</span>
        </Link>

        <Link
          href="/consultant/links/new"
          className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-teal-200 hover:shadow-md transition-all"
        >
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <Link2 className="w-5 h-5 text-purple-600" />
          </div>
          <span className="font-medium text-gray-900">Create Link</span>
        </Link>

        <Link
          href="/consultant/leads?status=new_lead"
          className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-teal-200 hover:shadow-md transition-all"
        >
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Users className="w-5 h-5 text-blue-600" />
          </div>
          <span className="font-medium text-gray-900">New Leads</span>
        </Link>

        <Link
          href="/consultant/commissions?status=pending"
          className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-teal-200 hover:shadow-md transition-all"
        >
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
            <Calendar className="w-5 h-5 text-orange-600" />
          </div>
          <span className="font-medium text-gray-900">Pending Payouts</span>
        </Link>
      </div>
    </div>
  )
}
