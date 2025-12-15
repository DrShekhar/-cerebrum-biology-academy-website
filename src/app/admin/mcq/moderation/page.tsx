'use client'

import { useState, useEffect } from 'react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import type { CommunityQuestion } from '@/lib/mcq/types'

type StatusFilter = 'PENDING' | 'APPROVED' | 'REJECTED' | 'ALL'

export default function ModerationPage() {
  const [questions, setQuestions] = useState<Partial<CommunityQuestion>[]>([])
  const [selectedQuestion, setSelectedQuestion] = useState<Partial<CommunityQuestion> | null>(null)
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('PENDING')
  const [stats, setStats] = useState<Record<string, number>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [actionState, setActionState] = useState<'idle' | 'loading'>('idle')
  const [rejectionReason, setRejectionReason] = useState('')
  const [reviewNotes, setReviewNotes] = useState('')

  useEffect(() => {
    fetchQuestions()
  }, [statusFilter])

  const fetchQuestions = async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams({
        status: statusFilter === 'ALL' ? 'PENDING' : statusFilter,
        limit: '50',
      })

      const response = await fetch(`/api/admin/mcq/moderation?${params}`)
      if (response.ok) {
        const data = await response.json()
        setQuestions(data.questions)
        setStats(data.stats)
      }
    } catch (error) {
      console.error('Error fetching questions:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAction = async (action: 'approve' | 'reject' | 'request_revision') => {
    if (!selectedQuestion) return

    if (action === 'reject' && !rejectionReason) {
      alert('Please provide a rejection reason')
      return
    }

    setActionState('loading')

    try {
      const response = await fetch('/api/admin/mcq/moderation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: selectedQuestion.id,
          action,
          reviewNotes: reviewNotes || undefined,
          rejectionReason: action === 'reject' ? rejectionReason : undefined,
        }),
      })

      if (response.ok) {
        setSelectedQuestion(null)
        setRejectionReason('')
        setReviewNotes('')
        fetchQuestions()
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return 'bg-green-100 text-green-700'
      case 'REJECTED':
        return 'bg-red-100 text-red-700'
      case 'AI_APPROVED':
        return 'bg-blue-100 text-blue-700'
      case 'AI_REJECTED':
        return 'bg-orange-100 text-orange-700'
      case 'PENDING':
        return 'bg-gray-100 text-gray-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getAIScoreColor = (score: number | null | undefined) => {
    if (!score) return 'text-gray-400'
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">MCQ Moderation Queue</h1>
            <p className="text-gray-600">Review and approve community-submitted questions</p>
          </div>
          <button
            onClick={fetchQuestions}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Refresh
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-md p-4">
            <p className="text-3xl font-bold text-yellow-600">{stats.PENDING || 0}</p>
            <p className="text-sm text-gray-500">Pending Review</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4">
            <p className="text-3xl font-bold text-blue-600">
              {(stats.AI_APPROVED || 0) + (stats.AI_REJECTED || 0)}
            </p>
            <p className="text-sm text-gray-500">AI Screened</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4">
            <p className="text-3xl font-bold text-green-600">{stats.APPROVED || 0}</p>
            <p className="text-sm text-gray-500">Approved</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4">
            <p className="text-3xl font-bold text-red-600">{stats.REJECTED || 0}</p>
            <p className="text-sm text-gray-500">Rejected</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          {(['PENDING', 'APPROVED', 'REJECTED'] as const).map((status) => (
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
          {/* Question List */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-4 border-b bg-gray-50">
              <h2 className="font-bold text-gray-800">Questions ({questions.length})</h2>
            </div>
            <div className="divide-y max-h-[600px] overflow-y-auto">
              {isLoading ? (
                <div className="p-8 text-center text-gray-500">Loading...</div>
              ) : questions.length === 0 ? (
                <div className="p-8 text-center text-gray-500">No questions to review</div>
              ) : (
                questions.map((q) => (
                  <button
                    key={q.id}
                    onClick={() => setSelectedQuestion(q)}
                    className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                      selectedQuestion?.id === q.id ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-gray-800 line-clamp-2 flex-1">{q.question}</p>
                      {q.aiScore && (
                        <span className={`text-sm font-bold ${getAIScoreColor(q.aiScore)}`}>
                          {q.aiScore}%
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-gray-500">{q.topic}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(q.status || '')}`}
                      >
                        {q.status?.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      By {q.submitterName} •{' '}
                      {q.createdAt ? new Date(q.createdAt).toLocaleDateString() : 'Unknown'}
                    </p>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Question Detail */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {selectedQuestion ? (
              <>
                <div className="p-4 border-b bg-gray-50">
                  <h2 className="font-bold text-gray-800">Question Details</h2>
                </div>
                <div className="p-4 space-y-4 max-h-[600px] overflow-y-auto">
                  {/* Question */}
                  <div>
                    <label className="text-sm font-medium text-gray-500">Question</label>
                    <p className="text-gray-800 mt-1">{selectedQuestion.question}</p>
                  </div>

                  {/* Options */}
                  <div>
                    <label className="text-sm font-medium text-gray-500">Options</label>
                    <div className="mt-1 space-y-2">
                      {(selectedQuestion.options as string[])?.map((option, i) => (
                        <div
                          key={i}
                          className={`p-2 rounded-lg ${
                            ['A', 'B', 'C', 'D'][i] === selectedQuestion.correctAnswer
                              ? 'bg-green-100 border border-green-300'
                              : 'bg-gray-50'
                          }`}
                        >
                          <span className="font-bold mr-2">{['A', 'B', 'C', 'D'][i]}.</span>
                          {option}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Explanation */}
                  <div>
                    <label className="text-sm font-medium text-gray-500">Explanation</label>
                    <p className="text-gray-700 mt-1 text-sm">{selectedQuestion.explanation}</p>
                  </div>

                  {/* Meta */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Topic</label>
                      <p className="text-gray-800">{selectedQuestion.topic}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Difficulty</label>
                      <p className="text-gray-800">{selectedQuestion.difficulty}</p>
                    </div>
                  </div>

                  {/* AI Analysis */}
                  {selectedQuestion.aiScore && (
                    <div className="bg-blue-50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-blue-800">AI Analysis</span>
                        <span className={`font-bold ${getAIScoreColor(selectedQuestion.aiScore)}`}>
                          {selectedQuestion.aiScore}%
                        </span>
                      </div>
                      {selectedQuestion.aiAnalysis && (
                        <pre className="text-xs text-blue-700 whitespace-pre-wrap">
                          {JSON.stringify(selectedQuestion.aiAnalysis, null, 2)}
                        </pre>
                      )}
                    </div>
                  )}

                  {/* Submitter Info */}
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm font-medium text-gray-500 mb-1">Submitted By</p>
                    <p className="text-gray-800">{selectedQuestion.submitterName}</p>
                    {selectedQuestion.submitterPhone && (
                      <p className="text-sm text-gray-600">{selectedQuestion.submitterPhone}</p>
                    )}
                  </div>

                  {/* Actions */}
                  {selectedQuestion.status !== 'APPROVED' &&
                    selectedQuestion.status !== 'REJECTED' && (
                      <div className="border-t pt-4 space-y-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500">Review Notes</label>
                          <textarea
                            value={reviewNotes}
                            onChange={(e) => setReviewNotes(e.target.value)}
                            rows={2}
                            className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"
                            placeholder="Optional notes..."
                          />
                        </div>

                        <div>
                          <label className="text-sm font-medium text-gray-500">
                            Rejection Reason (if rejecting)
                          </label>
                          <textarea
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                            rows={2}
                            className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"
                            placeholder="Required for rejection..."
                          />
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => handleAction('approve')}
                            disabled={actionState === 'loading'}
                            className="flex-1 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleAction('reject')}
                            disabled={actionState === 'loading'}
                            className="flex-1 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 disabled:opacity-50"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    )}
                </div>
              </>
            ) : (
              <div className="p-8 text-center text-gray-500">Select a question to review</div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
