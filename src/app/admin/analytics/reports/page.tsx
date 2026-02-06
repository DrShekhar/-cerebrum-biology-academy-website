'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import {
  FileText,
  Download,
  Calendar,
  DollarSign,
  Users,
  TrendingUp,
  BookOpen,
  BarChart3,
  Loader2,
} from 'lucide-react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { Button } from '@/components/ui/Button'

interface ReportConfig {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  color: string
  endpoint: string
  params: Record<string, string>
}

export default function ReportsPage() {
  const [generating, setGenerating] = useState<string | null>(null)
  const [dateFrom, setDateFrom] = useState(() => {
    const d = new Date()
    d.setMonth(d.getMonth() - 1)
    return d.toISOString().split('T')[0]
  })
  const [dateTo, setDateTo] = useState(() => new Date().toISOString().split('T')[0])

  const reports: ReportConfig[] = [
    {
      id: 'revenue',
      name: 'Revenue Report',
      description: 'Total revenue, payment methods breakdown, installment tracking',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'bg-green-100 text-green-600',
      endpoint: '/api/admin/payments',
      params: { status: 'completed' },
    },
    {
      id: 'students',
      name: 'Student Report',
      description: 'New registrations, active students, enrollment trends',
      icon: <Users className="w-6 h-6" />,
      color: 'bg-blue-100 text-blue-600',
      endpoint: '/api/admin/students',
      params: {},
    },
    {
      id: 'courses',
      name: 'Course Performance',
      description: 'Enrollments per course, completion rates, popular courses',
      icon: <BookOpen className="w-6 h-6" />,
      color: 'bg-purple-100 text-purple-600',
      endpoint: '/api/admin/courses',
      params: {},
    },
    {
      id: 'marketing',
      name: 'Marketing Report',
      description: 'Campaign performance, WhatsApp clicks, lead sources',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'bg-orange-100 text-orange-600',
      endpoint: '/api/admin/marketing',
      params: { type: 'automation' },
    },
    {
      id: 'analytics',
      name: 'Traffic & Analytics',
      description: 'Page views, session data, device breakdown, top pages',
      icon: <BarChart3 className="w-6 h-6" />,
      color: 'bg-red-100 text-red-600',
      endpoint: '/api/admin/analytics',
      params: { timeframe: '30d' },
    },
    {
      id: 'payments-all',
      name: 'All Payments',
      description: 'Complete payment history with all statuses and methods',
      icon: <FileText className="w-6 h-6" />,
      color: 'bg-yellow-100 text-yellow-700',
      endpoint: '/api/admin/payments',
      params: { limit: '1000' },
    },
  ]

  const downloadReport = async (report: ReportConfig) => {
    try {
      setGenerating(report.id)
      const params = new URLSearchParams(report.params)
      const res = await fetch(`${report.endpoint}?${params}`)
      const json = await res.json()

      if (!json.success) {
        alert('Failed to generate report')
        return
      }

      const data = json.data
      let csv = ''
      let rows: Record<string, unknown>[] = []

      if (report.id === 'revenue' || report.id === 'payments-all') {
        rows = (data.payments || []).map((p: Record<string, unknown>) => ({
          ID: p.id,
          Student: (p as { users?: { name?: string } }).users?.name || '',
          Email: (p as { users?: { email?: string } }).users?.email || '',
          Amount: p.amount,
          Status: p.status,
          Method: p.paymentMethod,
          TransactionID: p.transactionId || '',
          Date: p.createdAt,
        }))
      } else if (report.id === 'students') {
        rows = (data.students || []).map((s: Record<string, unknown>) => ({
          ID: s.id,
          Name: s.name,
          Email: s.email,
          Phone: s.phone || '',
          Role: s.role,
          Tier: s.coachingTier || '',
          Joined: s.createdAt,
          LastActive: s.lastActiveAt || '',
        }))
      } else if (report.id === 'courses') {
        rows = (data.courses || []).map((c: Record<string, unknown>) => ({
          ID: c.id,
          Name: c.name,
          Type: c.type,
          Active: c.isActive,
          Duration: c.duration,
          Fees: c.totalFees,
          Enrollments: (c as { _count?: { enrollments?: number } })._count?.enrollments || 0,
        }))
      } else {
        csv = JSON.stringify(data, null, 2)
        const blob = new Blob([csv], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${report.id}-report-${dateFrom}-to-${dateTo}.json`
        a.click()
        URL.revokeObjectURL(url)
        return
      }

      if (rows.length > 0) {
        const headers = Object.keys(rows[0])
        csv = headers.join(',') + '\n'
        rows.forEach((row) => {
          csv +=
            headers
              .map((h) => {
                const val = String(row[h] ?? '')
                return val.includes(',') ? `"${val}"` : val
              })
              .join(',') + '\n'
        })
      }

      const blob = new Blob([csv], { type: 'text/csv' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${report.id}-report-${dateFrom}-to-${dateTo}.csv`
      a.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Report generation failed:', error)
      alert('Failed to generate report. Please try again.')
    } finally {
      setGenerating(null)
    }
  }

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
            <p className="text-gray-600 mt-1">Generate and download reports for your academy</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Date Range</h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
            <span className="text-gray-500">to</span>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report) => (
            <div
              key={report.id}
              className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${report.color}`}>
                  {report.icon}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{report.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{report.description}</p>
              <Button
                variant="outline"
                className="w-full text-gray-700 border-gray-300"
                onClick={() => downloadReport(report)}
                disabled={generating === report.id}
              >
                {generating === report.id ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Download Report
                  </>
                )}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}
