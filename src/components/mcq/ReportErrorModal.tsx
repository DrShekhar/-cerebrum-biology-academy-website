'use client'

import { useState } from 'react'
import { X, AlertTriangle, Loader2, CheckCircle } from 'lucide-react'

interface ReportErrorModalProps {
  questionId: string
  freeUserId: string | null
  currentAnswer: string
  onClose: () => void
}

const ERROR_TYPES = [
  { value: 'WRONG_ANSWER', label: 'Wrong Answer Marked' },
  { value: 'WRONG_EXPLANATION', label: 'Incorrect Explanation' },
  { value: 'TYPO', label: 'Typo/Spelling Error' },
  { value: 'AMBIGUOUS', label: 'Ambiguous Question' },
  { value: 'DUPLICATE', label: 'Duplicate Question' },
  { value: 'OUTDATED_INFO', label: 'Outdated Information' },
] as const

export function ReportErrorModal({
  questionId,
  freeUserId,
  currentAnswer,
  onClose,
}: ReportErrorModalProps) {
  const [reportType, setReportType] = useState<string>('')
  const [suggestedAnswer, setSuggestedAnswer] = useState<string>('')
  const [explanation, setExplanation] = useState('')
  const [evidence, setEvidence] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!reportType) {
      setError('Please select an error type')
      return
    }

    if (!explanation || explanation.length < 20) {
      setError('Please provide a detailed explanation (at least 20 characters)')
      return
    }

    if (!freeUserId) {
      setError('Please sign in to report errors')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/mcq/report-error', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId,
          reportType,
          currentAnswer,
          suggestedAnswer: suggestedAnswer || undefined,
          explanation,
          evidence: evidence || undefined,
          freeUserId,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit report')
      }

      setIsSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit report')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Report an Error</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        {isSubmitted ? (
          <div className="p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Thank You!</h3>
            <p className="text-gray-600 mb-4">
              Your report has been submitted. Our team will review it and make corrections if
              needed.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            {/* Error Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Error Type <span className="text-red-500">*</span>
              </label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              >
                <option value="">Select error type...</option>
                {ERROR_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Current Answer Display */}
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">Current marked answer:</p>
              <p className="font-medium text-gray-800">{currentAnswer}</p>
            </div>

            {/* Suggested Answer */}
            {(reportType === 'WRONG_ANSWER' || reportType === 'AMBIGUOUS') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Suggested Correct Answer
                </label>
                <div className="flex gap-2">
                  {['A', 'B', 'C', 'D'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setSuggestedAnswer(opt)}
                      className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                        suggestedAnswer === opt
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Explanation */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Explain the Error <span className="text-red-500">*</span>
              </label>
              <textarea
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
                rows={3}
                minLength={20}
                placeholder="Please describe what's wrong with this question..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                required
              />
              <p className="text-xs text-gray-400 mt-1">
                {explanation.length}/20 characters minimum
              </p>
            </div>

            {/* Evidence */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Reference/Source (optional)
              </label>
              <input
                type="text"
                value={evidence}
                onChange={(e) => setEvidence(e.target.value)}
                placeholder="NCERT page number, textbook reference, etc."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !reportType || explanation.length < 20}
                className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Report'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
