'use client'

import { useState, useEffect } from 'react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import type { ErrorReportRecord } from '@/lib/mcq/types'

type StatusFilter = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'ALL'

interface ReportWithQuestion extends Partial<ErrorReportRecord> {
  communityQuestion?: {
    question: string
    options: string[]
    correctAnswer: string
    explanation?: string
  }
  officialQuestion?: {
    question: string
    options: string[]
    correctAnswer: string
    explanation?: string
  }
}

export default function ErrorReportsPage() {
  const [reports, setReports] = useState<ReportWithQuestion[]>([])
  const [selectedReport, setSelectedReport] = useState<ReportWithQuestion | null>(null)
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('PENDING')
  const [stats, setStats] = useState<Record<string, number>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [actionState, setActionState] = useState<'idle' | 'loading'>('idle')
  const [resolution, setResolution] = useState('')
  const [updatedAnswer, setUpdatedAnswer] = useState<'A' | 'B' | 'C' | 'D' | ''>('')

  useEffect(() => {
    fetchReports()
  }, [statusFilter])

  const fetchReports = async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams({
        status: statusFilter === 'ALL' ? 'PENDING' : statusFilter,
        limit: '50',
      })

      const response = await fetch(`/api/admin/mcq/error-reports?${params}`)
      if (response.ok) {
        const data = await response.json()
        setReports(data.reports)
        setStats(data.stats)
      }
    } catch (error) {
      console.error('Error fetching reports:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAction = async (action: 'accept' | 'reject' | 'duplicate') => {
    if (!selectedReport) return

    setActionState('loading')

    try {
      const response = await fetch('/api/admin/mcq/error-reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reportId: selectedReport.id,
          action,
          resolution: resolution || undefined,
          updatedAnswer: action === 'accept' && updatedAnswer ? updatedAnswer : undefined,
        }),
      })

      if (response.ok) {
        setSelectedReport(null)
        setResolution('')
        setUpdatedAnswer('')
        fetchReports()
      } else {
        const data = await response.json()
        alert(data.error || 'Action failed')
      }
    } catch (error) {
      console.error('Action error:', error)
      alert('Action failed')
    } finally {
      setActionState('idle')
    }
  }

  const getReportTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      WRONG_ANSWER: 'Wrong Answer',
      AMBIGUOUS: 'Ambiguous',
      OUTDATED: 'Outdated',
      TYPO: 'Typo/Grammar',
      INCOMPLETE: 'Incomplete',
      OTHER: 'Other',
    }
    return labels[type] || type
  }

  const getQuestion = (report: ReportWithQuestion) => {
    return report.communityQuestion || report.officialQuestion
  }

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Error Reports</h1>
            <p className="text-gray-600">Review reported errors in MCQ answers</p>
          </div>
          <button
            onClick={fetchReports}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Refresh
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-md p-4">
            <p className="text-3xl font-bold text-yellow-600">{stats.PENDING || 0}</p>
            <p className="text-sm text-gray-500">Pending</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4">
            <p className="text-3xl font-bold text-blue-600">{stats.UNDER_REVIEW || 0}</p>
            <p className="text-sm text-gray-500">Under Review</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4">
            <p className="text-3xl font-bold text-green-600">{stats.ACCEPTED || 0}</p>
            <p className="text-sm text-gray-500">Accepted</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4">
            <p className="text-3xl font-bold text-red-600">{stats.REJECTED || 0}</p>
            <p className="text-sm text-gray-500">Rejected</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          {(['PENDING', 'ACCEPTED', 'REJECTED'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                statusFilter === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-2 gap-6">
          {/* Reports List */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-4 border-b bg-gray-50">
              <h2 className="font-bold text-gray-800">Reports ({reports.length})</h2>
            </div>
            <div className="divide-y max-h-[600px] overflow-y-auto">
              {isLoading ? (
                <div className="p-8 text-center text-gray-500">Loading...</div>
              ) : reports.length === 0 ? (
                <div className="p-8 text-center text-gray-500">No reports to review</div>
              ) : (
                reports.map((report) => (
                  <button
                    key={report.id}
                    onClick={() => setSelectedReport(report)}
                    className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                      selectedReport?.id === report.id ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                            report.reportType === 'WRONG_ANSWER'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {getReportTypeLabel(report.reportType || '')}
                        </span>
                        <p className="text-gray-800 text-sm mt-1 line-clamp-2">
                          {report.explanation}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-gray-500">
                        Current: {report.currentAnswer}
                        {report.suggestedAnswer && ` → Suggested: ${report.suggestedAnswer}`}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      By {report.reporterName} •{' '}
                      {report.createdAt
                        ? new Date(report.createdAt).toLocaleDateString()
                        : 'Unknown'}
                    </p>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Report Detail */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {selectedReport ? (
              <>
                <div className="p-4 border-b bg-gray-50">
                  <h2 className="font-bold text-gray-800">Report Details</h2>
                </div>
                <div className="p-4 space-y-4 max-h-[600px] overflow-y-auto">
                  {/* Original Question */}
                  {getQuestion(selectedReport) && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm font-medium text-gray-500 mb-2">Original Question</p>
                      <p className="text-gray-800">{getQuestion(selectedReport)?.question}</p>
                      <div className="mt-2 space-y-1">
                        {(getQuestion(selectedReport)?.options as string[])?.map((opt, i) => (
                          <div
                            key={i}
                            className={`p-2 rounded text-sm ${
                              ['A', 'B', 'C', 'D'][i] === getQuestion(selectedReport)?.correctAnswer
                                ? 'bg-green-100'
                                : 'bg-white'
                            }`}
                          >
                            <span className="font-bold">{['A', 'B', 'C', 'D'][i]}.</span> {opt}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Report Info */}
                  <div>
                    <p className="text-sm font-medium text-gray-500">Report Type</p>
                    <p className="text-gray-800">
                      {getReportTypeLabel(selectedReport.reportType || '')}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500">Current Answer</p>
                    <p className="text-gray-800 font-bold">{selectedReport.currentAnswer}</p>
                  </div>

                  {selectedReport.suggestedAnswer && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Suggested Answer</p>
                      <p className="text-green-600 font-bold">{selectedReport.suggestedAnswer}</p>
                    </div>
                  )}

                  <div>
                    <p className="text-sm font-medium text-gray-500">Explanation</p>
                    <p className="text-gray-700">{selectedReport.explanation}</p>
                  </div>

                  {selectedReport.evidence && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Evidence</p>
                      <p className="text-gray-700">{selectedReport.evidence}</p>
                    </div>
                  )}

                  {/* Reporter Info */}
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm font-medium text-gray-500 mb-1">Reported By</p>
                    <p className="text-gray-800">{selectedReport.reporterName}</p>
                    {selectedReport.reporterPhone && (
                      <p className="text-sm text-gray-600">{selectedReport.reporterPhone}</p>
                    )}
                  </div>

                  {/* Actions */}
                  {selectedReport.status === 'PENDING' && (
                    <div className="border-t pt-4 space-y-4">
                      {selectedReport.reportType === 'WRONG_ANSWER' && (
                        <div>
                          <label className="text-sm font-medium text-gray-500">
                            Update Correct Answer To
                          </label>
                          <div className="flex gap-2 mt-1">
                            {(['A', 'B', 'C', 'D'] as const).map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => setUpdatedAnswer(opt)}
                                className={`flex-1 py-2 rounded-lg font-bold ${
                                  updatedAnswer === opt
                                    ? 'bg-green-500 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Resolution Notes
                        </label>
                        <textarea
                          value={resolution}
                          onChange={(e) => setResolution(e.target.value)}
                          rows={2}
                          className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"
                          placeholder="Optional notes..."
                        />
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAction('accept')}
                          disabled={actionState === 'loading'}
                          className="flex-1 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50"
                        >
                          Accept (+50 XP)
                        </button>
                        <button
                          onClick={() => handleAction('reject')}
                          disabled={actionState === 'loading'}
                          className="flex-1 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 disabled:opacity-50"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => handleAction('duplicate')}
                          disabled={actionState === 'loading'}
                          className="py-2 px-4 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 disabled:opacity-50"
                        >
                          Duplicate
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Resolution */}
                  {selectedReport.resolution && (
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-sm font-medium text-blue-800">Resolution</p>
                      <p className="text-blue-700">{selectedReport.resolution}</p>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="p-8 text-center text-gray-500">Select a report to review</div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
