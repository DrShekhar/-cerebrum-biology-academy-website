'use client'

import { memo } from 'react'

interface SuggestedQuestionsProps {
  questions: string[]
  onQuestionClick: (question: string) => void
  disabled?: boolean
}

export const SuggestedQuestions = memo(function SuggestedQuestions({
  questions,
  onQuestionClick,
  disabled = false,
}: SuggestedQuestionsProps) {
  if (questions.length === 0) return null

  return (
    <div className="w-full animate-fade-in" role="region" aria-label="Suggested questions">
      <div className="mb-3 flex items-center gap-2 px-1">
        <svg
          className="h-4 w-4 text-primary-500 dark:text-primary-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Try asking:</h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {questions.map((question) => (
          <button
            key={`question-${question.slice(0, 30).replace(/\s+/g, '-').toLowerCase()}`}
            onClick={() => onQuestionClick(question)}
            disabled={disabled}
            className="group flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-left text-sm text-gray-700 shadow-mobile-card transition-colors hover:border-primary-500 hover:bg-primary-50 hover:text-primary-700 hover:shadow-md active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-primary-400 dark:hover:bg-primary-950 dark:hover:text-primary-300"
            aria-label={`Ask: ${question}`}
            type="button"
          >
            <svg
              className="h-4 w-4 shrink-0 text-gray-400 transition-colors group-hover:text-primary-500 dark:text-gray-500 dark:group-hover:text-primary-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="line-clamp-2">{question}</span>
          </button>
        ))}
      </div>
    </div>
  )
})
