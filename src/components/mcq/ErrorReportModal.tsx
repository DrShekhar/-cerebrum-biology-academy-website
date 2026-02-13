'use client'

import { useState } from 'react'
import type { MCQQuestion } from '@/lib/mcq/types'
import type { ErrorReportType } from '@/generated/prisma'

interface ErrorReportModalProps {
  isOpen: boolean
  onClose: () => void
  question: MCQQuestion
  freeUserId: string
  onSuccess?: () => void
}

const ERROR_TYPES: { value: ErrorReportType; label: string; description: string }[] = [
  {
    value: 'WRONG_ANSWER',
    label: 'Wrong Answer',
    description: 'The marked correct answer is incorrect',
  },
  {
    value: 'AMBIGUOUS',
    label: 'Ambiguous Question',
    description: 'Multiple answers could be correct',
  },
  {
    value: 'OUTDATED',
    label: 'Outdated Information',
    description: 'The content is no longer accurate',
  },
  { value: 'TYPO', label: 'Typo/Grammar', description: 'Spelling or grammar errors' },
  { value: 'INCOMPLETE', label: 'Incomplete', description: 'Missing important information' },
  { value: 'OTHER', label: 'Other', description: 'Other issues not listed above' },
]

type SubmitState = 'idle' | 'submitting' | 'success' | 'error'

export function ErrorReportModal({
  isOpen,
  onClose,
  question,
  freeUserId,
  onSuccess,
}: ErrorReportModalProps) {
  const [reportType, setReportType] = useState<ErrorReportType>('WRONG_ANSWER')
  const [suggestedAnswer, setSuggestedAnswer] = useState<'A' | 'B' | 'C' | 'D' | ''>('')
  const [explanation, setExplanation] = useState('')
  const [evidence, setEvidence] = useState('')
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (explanation.length < 20) {
      setError('Explanation must be at least 20 characters')
      return
    }

    setSubmitState('submitting')
    setError(null)

    try {
      const response = await fetch('/api/mcq/report-error', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: question.source === 'official' ? question.id : null,
          communityQuestionId: question.source === 'community' ? question.id : null,
          reportType,
          currentAnswer: question.correctAnswer,
          suggestedAnswer: suggestedAnswer || null,
          explanation,
          evidence: evidence || null,
          freeUserId,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit report')
      }

      setSubmitState('success')
      onSuccess?.()
    } catch (err) {
      setSubmitState('error')
      setError(err instanceof Error ? err.message : 'Failed to submit report')
    }
  }

  const resetForm = () => {
    setReportType('WRONG_ANSWER')
    setSuggestedAnswer('')
    setExplanation('')
    setEvidence('')
    setSubmitState('idle')
    setError(null)
    onClose()
  }

  return (
<>
{isOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50 animate-fadeInUp"
          />

          {/* Modal */}
          <div
            className="fixed inset-x-4 top-[10%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-lg bg-white rounded-2xl shadow-2xl z-50 max-h-[80vh] overflow-y-auto animate-fadeInUp"
          >
            {submitState === 'success' ? (
              <div className="p-8 text-center">
                <div className="text-6xl mb-4">✅</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Report Submitted!</h2>
                <p className="text-gray-600 mb-6">
                  Thank you for helping us improve. We&apos;ll review your report and may award you
                  50 XP if it&apos;s accepted.
                </p>
                <button
                  onClick={resetForm}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="p-6 border-b">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                      <span className="text-2xl">🚨</span>
                      Report an Error
                    </h2>
                    <button
                      onClick={onClose}
                      className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {/* Question Preview */}
                <div className="p-4 bg-gray-50 border-b">
                  <p className="text-sm text-gray-500 mb-1">Question being reported:</p>
                  <p className="text-gray-800 line-clamp-3">{question.question}</p>
                  <p className="text-sm text-gray-600 mt-2">
                    Current answer: <span className="font-bold">{question.correctAnswer}</span>
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                  {/* Error Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Error Type <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {ERROR_TYPES.map((type) => (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => setReportType(type.value)}
                          className={`p-3 rounded-lg text-left border-2 transition-colors ${
                            reportType === type.value
                              ? 'border-red-500 bg-red-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <p className="font-medium text-sm text-gray-800">{type.label}</p>
                          <p className="text-xs text-gray-500">{type.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Suggested Answer (if wrong answer) */}
                  {reportType === 'WRONG_ANSWER' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        What should the correct answer be?
                      </label>
                      <div className="flex gap-2">
                        {(['A', 'B', 'C', 'D'] as const).map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => setSuggestedAnswer(option)}
                            disabled={option === question.correctAnswer}
                            className={`flex-1 py-2 rounded-lg font-bold transition-colors ${
                              option === question.correctAnswer
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : suggestedAnswer === option
                                  ? 'bg-green-600 text-white'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {option}
                            {option === question.correctAnswer && ' (current)'}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Explanation */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Why is this incorrect? <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={explanation}
                      onChange={(e) => setExplanation(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="Explain why you think there's an error..."
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {explanation.length}/20 min characters
                    </p>
                  </div>

                  {/* Evidence */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Evidence/Source (Optional)
                    </label>
                    <input
                      type="text"
                      value={evidence}
                      onChange={(e) => setEvidence(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                      placeholder="e.g., NCERT Page 45, Chapter 3"
                    />
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                      {error}
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitState === 'submitting'}
                      className="flex-1 py-3 px-4 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors disabled:opacity-50"
                    >
                      {submitState === 'submitting' ? 'Submitting...' : 'Submit Report'}
                    </button>
                  </div>
                </form>

                {/* Info Footer */}
                <div className="p-4 bg-gray-50 border-t">
                  <p className="text-xs text-gray-500 text-center">
                    Valid reports earn 50 XP. Our team reviews all reports within 24-48 hours.
                  </p>
                </div>
              </>
            )}
          </div>
        </>
      )}
</>
)
}
