'use client'

import { memo } from 'react'

interface MessageBubbleProps {
  content: string
  isUser: boolean
  timestamp: Date
  ncertReferences?: string[]
  relatedTopics?: string[]
  confidence?: number
  tokensUsed?: number
}

export const MessageBubble = memo(function MessageBubble({
  content,
  isUser,
  timestamp,
  ncertReferences,
  relatedTopics,
  confidence,
  tokensUsed,
}: MessageBubbleProps) {
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(date)
  }

  return (
    <div
      className={`flex w-full animate-fade-in ${isUser ? 'justify-end' : 'justify-start'}`}
      role="article"
      aria-label={`${isUser ? 'Your' : 'AI Tutor'} message`}
    >
      <div className={`flex max-w-[85%] gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
            isUser
              ? 'bg-gradient-to-br from-primary-500 to-primary-600'
              : 'bg-gradient-to-br from-saffron-500 to-saffron-600'
          }`}
          aria-hidden="true"
        >
          <span className="text-sm font-semibold text-white">{isUser ? 'Y' : 'AI'}</span>
        </div>

        <div className="flex flex-col gap-1">
          <div
            className={`rounded-2xl px-4 py-3 shadow-mobile-card ${
              isUser
                ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white'
                : 'bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100'
            }`}
          >
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <div className="whitespace-pre-wrap break-words">{content}</div>
            </div>

            {!isUser && ncertReferences && ncertReferences.length > 0 && (
              <div className="mt-3 rounded-lg border border-saffron-200 bg-saffron-50 p-3 dark:border-saffron-800 dark:bg-saffron-950">
                <div className="mb-1 flex items-center gap-2">
                  <svg
                    className="h-4 w-4 text-saffron-600 dark:text-saffron-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                  <h4 className="text-xs font-semibold uppercase tracking-wide text-saffron-800 dark:text-saffron-300">
                    NCERT References
                  </h4>
                </div>
                <ul className="ml-5 space-y-1 text-xs text-saffron-700 dark:text-saffron-400">
                  {ncertReferences.map((ref, index) => (
                    <li key={index} className="list-disc">
                      {ref}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {!isUser && relatedTopics && relatedTopics.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {relatedTopics.map((topic, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center rounded-full bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-200"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 px-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {formatTime(timestamp)}
            </span>
            {!isUser && confidence !== undefined && (
              <span className="text-xs text-gray-400 dark:text-gray-500">
                {confidence}% confidence
              </span>
            )}
            {!isUser && tokensUsed !== undefined && (
              <span className="text-xs text-gray-400 dark:text-gray-500">{tokensUsed} tokens</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
})
