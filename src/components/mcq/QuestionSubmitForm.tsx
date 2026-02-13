'use client'

import { useState } from 'react'
import { BIOLOGY_TOPICS, BIOLOGY_CHAPTERS, PYQ_YEARS, type BiologyTopic } from '@/lib/mcq/types'
import type { DifficultyLevel } from '@/generated/prisma'

interface QuestionSubmitFormProps {
  freeUserId: string
  onSuccess?: () => void
  onRequireLogin?: () => void
}

interface FormData {
  question: string
  optionA: string
  optionB: string
  optionC: string
  optionD: string
  correctAnswer: 'A' | 'B' | 'C' | 'D'
  explanation: string
  topic: BiologyTopic | ''
  chapter: string
  difficulty: DifficultyLevel
  isPYQ: boolean
  pyqYear: number | null
  source: string
}

type SubmitState = 'idle' | 'submitting' | 'success' | 'error'

export function QuestionSubmitForm({
  freeUserId,
  onSuccess,
  onRequireLogin,
}: QuestionSubmitFormProps) {
  const [formData, setFormData] = useState<FormData>({
    question: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctAnswer: 'A',
    explanation: '',
    topic: '',
    chapter: '',
    difficulty: 'MEDIUM',
    isPYQ: false,
    pyqYear: null,
    source: '',
  })

  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [error, setError] = useState<string | null>(null)
  const [step, setStep] = useState(1)

  const chapters = formData.topic ? BIOLOGY_CHAPTERS[formData.topic as BiologyTopic] || [] : []

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const validateStep1 = () => {
    if (formData.question.length < 20) {
      setError('Question must be at least 20 characters')
      return false
    }
    if (!formData.optionA || !formData.optionB || !formData.optionC || !formData.optionD) {
      setError('All four options are required')
      return false
    }
    setError(null)
    return true
  }

  const validateStep2 = () => {
    if (formData.explanation.length < 30) {
      setError('Explanation must be at least 30 characters')
      return false
    }
    if (!formData.topic) {
      setError('Please select a topic')
      return false
    }
    setError(null)
    return true
  }

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2)
    }
  }

  const handleBack = () => {
    setStep(1)
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!freeUserId) {
      onRequireLogin?.()
      return
    }

    if (!validateStep2()) return

    setSubmitState('submitting')
    setError(null)

    try {
      const response = await fetch('/api/mcq/community/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: formData.question,
          options: [formData.optionA, formData.optionB, formData.optionC, formData.optionD],
          correctAnswer: formData.correctAnswer,
          explanation: formData.explanation,
          topic: formData.topic,
          chapter: formData.chapter || undefined,
          difficulty: formData.difficulty,
          isPYQ: formData.isPYQ,
          pyqYear: formData.isPYQ ? formData.pyqYear : undefined,
          source: formData.source || undefined,
          freeUserId,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit question')
      }

      setSubmitState('success')
      onSuccess?.()
    } catch (err) {
      setSubmitState('error')
      setError(err instanceof Error ? err.message : 'Failed to submit question')
    }
  }

  const resetForm = () => {
    setFormData({
      question: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      correctAnswer: 'A',
      explanation: '',
      topic: '',
      chapter: '',
      difficulty: 'MEDIUM',
      isPYQ: false,
      pyqYear: null,
      source: '',
    })
    setStep(1)
    setSubmitState('idle')
    setError(null)
  }

  // Success state
  if (submitState === 'success') {
    return (
      <div
        className="bg-white rounded-2xl shadow-lg p-8 text-center animate-fadeInUp"
      >
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Question Submitted!</h2>
        <p className="text-gray-600 mb-6">
          Your question has been submitted for review. You&apos;ll earn 100 XP when it gets
          approved!
        </p>
        <div className="bg-blue-50 rounded-xl p-4 mb-6">
          <p className="text-blue-700 text-sm">
            Our AI will pre-screen your question, and then a moderator will review it. This usually
            takes 24-48 hours.
          </p>
        </div>
        <button
          onClick={resetForm}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
        >
          Submit Another Question
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-green-600 p-6 text-white">
        <h2 className="text-2xl font-bold flex items-center gap-3">
          <span className="text-3xl">✍️</span>
          Contribute a Question
        </h2>
        <p className="text-green-100 mt-1">Help fellow NEET aspirants by adding quality MCQs</p>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center gap-2 p-4 bg-gray-50 border-b">
        <div
          className={`flex items-center gap-2 ${step >= 1 ? 'text-green-600' : 'text-gray-400'}`}
        >
          <span
            className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
              step >= 1 ? 'bg-green-600 text-white' : 'bg-gray-200'
            }`}
          >
            1
          </span>
          <span className="text-sm font-medium">Question</span>
        </div>
        <div className="flex-1 h-0.5 bg-gray-200">
          <div className={`h-full transition-all ${step >= 2 ? 'w-full bg-green-600' : 'w-0'}`} />
        </div>
        <div
          className={`flex items-center gap-2 ${step >= 2 ? 'text-green-600' : 'text-gray-400'}`}
        >
          <span
            className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
              step >= 2 ? 'bg-green-600 text-white' : 'bg-gray-200'
            }`}
          >
            2
          </span>
          <span className="text-sm font-medium">Details</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
{step === 1 ? (
            <div
              key="step1"
              className="space-y-6 animate-fadeInUp"
            >
              {/* Question */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Question <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="question"
                  value={formData.question}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-600 focus:border-green-600"
                  placeholder="Enter your NEET Biology question here..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.question.length}/20 min characters
                </p>
              </div>

              {/* Options */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Options <span className="text-red-500">*</span>
                </label>
                {(['A', 'B', 'C', 'D'] as const).map((option) => (
                  <div key={option} className="flex items-center gap-3">
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        formData.correctAnswer === option
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {option}
                    </span>
                    <input
                      type="text"
                      name={`option${option}`}
                      value={formData[`option${option}` as keyof FormData] as string}
                      onChange={handleChange}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600"
                      placeholder={`Option ${option}`}
                    />
                    <button
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, correctAnswer: option }))}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        formData.correctAnswer === option
                          ? 'bg-green-100 text-green-700 border border-green-300'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {formData.correctAnswer === option ? 'Correct' : 'Set Correct'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div
              key="step2"
              className="space-y-6 animate-fadeInUp"
            >
              {/* Explanation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Explanation <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="explanation"
                  value={formData.explanation}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-600 focus:border-green-600"
                  placeholder="Explain why the correct answer is right and why others are wrong..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.explanation.length}/30 min characters
                </p>
              </div>

              {/* Topic & Chapter */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Topic <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="topic"
                    value={formData.topic}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        topic: e.target.value as BiologyTopic,
                        chapter: '',
                      }))
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600"
                  >
                    <option value="">Select Topic</option>
                    {BIOLOGY_TOPICS.map((topic) => (
                      <option key={topic} value={topic}>
                        {topic}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Chapter</label>
                  <select
                    name="chapter"
                    value={formData.chapter}
                    onChange={handleChange}
                    disabled={!formData.topic}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 disabled:bg-gray-100"
                  >
                    <option value="">Select Chapter</option>
                    {chapters.map((chapter) => (
                      <option key={chapter} value={chapter}>
                        {chapter}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Difficulty */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                <div className="flex gap-3">
                  {(['EASY', 'MEDIUM', 'HARD'] as const).map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, difficulty: level }))}
                      className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                        formData.difficulty === level
                          ? level === 'EASY'
                            ? 'bg-green-100 text-green-700 border border-green-300'
                            : level === 'HARD'
                              ? 'bg-red-100 text-red-700 border border-red-300'
                              : 'bg-yellow-100 text-yellow-700 border border-yellow-300'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* PYQ Toggle */}
              <div className="flex items-center justify-between p-4 bg-amber-50 rounded-xl">
                <div>
                  <p className="font-medium text-gray-800">Is this a Previous Year Question?</p>
                  <p className="text-sm text-gray-500">Mark if from NEET/AIPMT exam</p>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, isPYQ: !prev.isPYQ }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    formData.isPYQ ? 'bg-amber-500' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      formData.isPYQ ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {formData.isPYQ && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">PYQ Year</label>
                  <select
                    name="pyqYear"
                    value={formData.pyqYear || ''}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        pyqYear: e.target.value ? parseInt(e.target.value) : null,
                      }))
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600"
                  >
                    <option value="">Select Year</option>
                    {PYQ_YEARS.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Source Reference */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Source Reference (Optional)
                </label>
                <input
                  type="text"
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600"
                  placeholder="e.g., NCERT Chapter 5, Page 87"
                />
              </div>
            </div>
          )}
{/* Error Message */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-6 pt-6 border-t">
          {step === 2 ? (
            <button
              type="button"
              onClick={handleBack}
              className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium"
            >
              Back
            </button>
          ) : (
            <div />
          )}

          {step === 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors"
            >
              Next: Add Details
            </button>
          ) : (
            <button
              type="submit"
              disabled={submitState === 'submitting'}
              className="px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitState === 'submitting' ? 'Submitting...' : 'Submit Question'}
            </button>
          )}
        </div>
      </form>

      {/* Info Footer */}
      <div className="bg-gray-50 p-4 border-t">
        <div className="flex items-start gap-3">
          <span className="text-xl">💡</span>
          <div className="text-sm text-gray-600">
            <p className="font-medium text-gray-800 mb-1">Submission Guidelines:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Questions must be relevant to NEET Biology syllabus</li>
              <li>Include a clear, educational explanation</li>
              <li>Avoid duplicate or copied questions</li>
              <li>Earn 100 XP when your question is approved!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
