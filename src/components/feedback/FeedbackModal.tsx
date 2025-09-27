'use client'

import React, { useState, useCallback } from 'react'
import { FeedbackSurvey, FeedbackQuestion } from '../../lib/feedback/feedbackCollection'

interface FeedbackModalProps {
  survey: FeedbackSurvey | null
  isOpen: boolean
  onSubmit: (surveyId: string, responses: Record<string, any>) => void
  onDismiss: () => void
}

export function FeedbackModal({ survey, isOpen, onSubmit, onDismiss }: FeedbackModalProps) {
  const [responses, setResponses] = useState<Record<string, any>>({})
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!survey || !isOpen) return null

  const currentQuestion = survey.questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === survey.questions.length - 1
  const canProceed = !currentQuestion.required || responses[currentQuestion.id] !== undefined

  const handleResponseChange = (questionId: string, value: any) => {
    setResponses((prev) => ({ ...prev, [questionId]: value }))
  }

  const handleNext = () => {
    if (!isLastQuestion) {
      setCurrentQuestionIndex((prev) => prev + 1)
    } else {
      handleSubmit()
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
    }
  }

  const handleSubmit = async () => {
    if (isSubmitting) return

    setIsSubmitting(true)
    await onSubmit(survey.id, responses)
    setIsSubmitting(false)

    // Reset state
    setResponses({})
    setCurrentQuestionIndex(0)
  }

  const progress = ((currentQuestionIndex + 1) / survey.questions.length) * 100

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onDismiss} />

      {/* Modal */}
      <div
        className={`relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 ${
          survey.style.size === 'small'
            ? 'max-w-sm'
            : survey.style.size === 'large'
              ? 'max-w-2xl'
              : 'max-w-md'
        }`}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{survey.title}</h3>
              {survey.description && (
                <p className="text-sm text-gray-600 mt-1">{survey.description}</p>
              )}
            </div>
            <button
              onClick={onDismiss}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>
                Question {currentQuestionIndex + 1} of {survey.questions.length}
              </span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div
                className="bg-blue-500 h-1 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Question Content */}
        <div className="px-6 py-6">
          <QuestionRenderer
            question={currentQuestion}
            value={responses[currentQuestion.id]}
            onChange={(value) => handleResponseChange(currentQuestion.id, value)}
          />
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <div className="flex space-x-3">
            <button onClick={onDismiss} className="px-4 py-2 text-gray-600 hover:text-gray-800">
              Skip
            </button>
            <button
              onClick={handleNext}
              disabled={!canProceed || isSubmitting}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : isLastQuestion ? 'Submit' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

interface QuestionRendererProps {
  question: FeedbackQuestion
  value: any
  onChange: (value: any) => void
}

function QuestionRenderer({ question, value, onChange }: QuestionRendererProps) {
  const handleChange = useCallback(
    (newValue: any) => {
      onChange(newValue)
    },
    [onChange]
  )

  switch (question.type) {
    case 'rating':
    case 'scale':
      return <ScaleQuestion question={question} value={value} onChange={handleChange} />

    case 'text':
      return <TextQuestion question={question} value={value} onChange={handleChange} />

    case 'multiple_choice':
      return <MultipleChoiceQuestion question={question} value={value} onChange={handleChange} />

    case 'checkbox':
      return <CheckboxQuestion question={question} value={value} onChange={handleChange} />

    case 'emoji':
      return <EmojiQuestion question={question} value={value} onChange={handleChange} />

    case 'net_promoter_score':
      return <NPSQuestion question={question} value={value} onChange={handleChange} />

    default:
      return <div>Unsupported question type</div>
  }
}

function ScaleQuestion({ question, value, onChange }: QuestionRendererProps) {
  const scale = question.scale || { min: 1, max: 5 }
  const scaleValues = Array.from({ length: scale.max - scale.min + 1 }, (_, i) => scale.min + i)

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-4">
        {question.question}
        {question.required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          {scaleValues.map((scaleValue) => (
            <button
              key={scaleValue}
              onClick={() => onChange(scaleValue)}
              className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-medium transition-all ${
                value === scaleValue
                  ? 'border-blue-500 bg-blue-500 text-white'
                  : 'border-gray-300 text-gray-700 hover:border-blue-300 hover:bg-blue-50'
              }`}
            >
              {scaleValue}
            </button>
          ))}
        </div>

        {scale.labels && scale.labels.length >= 2 && (
          <div className="flex justify-between text-xs text-gray-500">
            <span>{scale.labels[0]}</span>
            <span>{scale.labels[scale.labels.length - 1]}</span>
          </div>
        )}
      </div>
    </div>
  )
}

function TextQuestion({ question, value, onChange }: QuestionRendererProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {question.question}
        {question.required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <textarea
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={question.placeholder}
        rows={4}
        maxLength={question.validation?.maxLength}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />

      {question.validation?.maxLength && (
        <div className="text-xs text-gray-500 mt-1 text-right">
          {(value || '').length} / {question.validation.maxLength}
        </div>
      )}
    </div>
  )
}

function MultipleChoiceQuestion({ question, value, onChange }: QuestionRendererProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-4">
        {question.question}
        {question.required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div className="space-y-2">
        {question.options?.map((option, index) => (
          <button
            key={index}
            onClick={() => onChange(option)}
            className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${
              value === option
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}

function CheckboxQuestion({ question, value, onChange }: QuestionRendererProps) {
  const selectedValues = Array.isArray(value) ? value : []

  const handleToggle = (option: string) => {
    const newValues = selectedValues.includes(option)
      ? selectedValues.filter((v) => v !== option)
      : [...selectedValues, option]
    onChange(newValues)
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-4">
        {question.question}
        {question.required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div className="space-y-2">
        {question.options?.map((option, index) => (
          <label key={index} className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedValues.includes(option)}
              onChange={() => handleToggle(option)}
              className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-gray-700">{option}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

function EmojiQuestion({ question, value, onChange }: QuestionRendererProps) {
  const emojis = ['😞', '😐', '🙂', '😊', '😍']
  const labels = ['Very Unhappy', 'Unhappy', 'Neutral', 'Happy', 'Very Happy']

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-4">
        {question.question}
        {question.required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div className="flex justify-center space-x-4">
        {emojis.map((emoji, index) => (
          <button
            key={index}
            onClick={() => onChange(index + 1)}
            className={`text-4xl p-3 rounded-full transition-all ${
              value === index + 1 ? 'bg-blue-100 scale-110' : 'hover:bg-gray-100 hover:scale-105'
            }`}
            title={labels[index]}
          >
            {emoji}
          </button>
        ))}
      </div>

      {value && <p className="text-center text-sm text-gray-600 mt-2">{labels[value - 1]}</p>}
    </div>
  )
}

function NPSQuestion({ question, value, onChange }: QuestionRendererProps) {
  const npsValues = Array.from({ length: 11 }, (_, i) => i)

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-4">
        {question.question}
        {question.required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div className="space-y-3">
        <div className="grid grid-cols-11 gap-1">
          {npsValues.map((npsValue) => (
            <button
              key={npsValue}
              onClick={() => onChange(npsValue)}
              className={`aspect-square flex items-center justify-center text-sm font-medium rounded transition-all ${
                value === npsValue
                  ? 'bg-blue-500 text-white'
                  : 'border border-gray-300 text-gray-700 hover:border-blue-300 hover:bg-blue-50'
              }`}
            >
              {npsValue}
            </button>
          ))}
        </div>

        <div className="flex justify-between text-xs text-gray-500">
          <span>Not likely at all</span>
          <span>Extremely likely</span>
        </div>
      </div>
    </div>
  )
}

// Quick feedback floating widget
export function QuickFeedbackWidget({
  onSubmit,
  className = '',
}: {
  onSubmit: (type: 'rating' | 'suggestion' | 'bug_report', data: Record<string, any>) => void
  className?: string
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [feedbackType, setFeedbackType] = useState<'rating' | 'suggestion' | 'bug_report'>('rating')
  const [rating, setRating] = useState<number>(0)
  const [comment, setComment] = useState('')

  const handleSubmit = () => {
    if (feedbackType === 'rating' && rating === 0) return
    if ((feedbackType === 'suggestion' || feedbackType === 'bug_report') && !comment.trim()) return

    const data =
      feedbackType === 'rating' ? { rating, comment: comment.trim() } : { comment: comment.trim() }

    onSubmit(feedbackType, data)

    // Reset form
    setRating(0)
    setComment('')
    setIsOpen(false)
  }

  return (
    <div className={`fixed bottom-4 right-4 z-40 ${className}`}>
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-500 text-white rounded-full p-3 shadow-lg hover:bg-blue-600 transition-colors"
          title="Give Feedback"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 8h10m0 0V18a2 2 0 01-2 2H9a2 2 0 01-2-2V8m5 0V3"
            />
          </svg>
        </button>
      ) : (
        <div className="bg-white rounded-lg shadow-xl p-4 w-80 border">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-semibold">Quick Feedback</h4>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            {/* Feedback Type Selector */}
            <div className="flex space-x-2">
              {[
                { key: 'rating', label: 'Rate' },
                { key: 'suggestion', label: 'Suggest' },
                { key: 'bug_report', label: 'Report Bug' },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setFeedbackType(key as any)}
                  className={`px-3 py-1 text-sm rounded ${
                    feedbackType === key
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Rating Input */}
            {feedbackType === 'rating' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How would you rate your experience?
                </label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className={`text-2xl ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Comment Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {feedbackType === 'rating'
                  ? 'Additional comments (optional)'
                  : feedbackType === 'suggestion'
                    ? 'Your suggestion'
                    : 'Describe the issue'}
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder={
                  feedbackType === 'rating'
                    ? 'Tell us more...'
                    : feedbackType === 'suggestion'
                      ? 'How can we improve?'
                      : 'What went wrong?'
                }
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={
                (feedbackType === 'rating' && rating === 0) ||
                ((feedbackType === 'suggestion' || feedbackType === 'bug_report') &&
                  !comment.trim())
              }
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Submit Feedback
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
