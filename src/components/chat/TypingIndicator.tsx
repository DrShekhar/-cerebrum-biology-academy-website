'use client'

import { memo } from 'react'

export const TypingIndicator = memo(function TypingIndicator() {
  return (
    <div
      className="flex w-full animate-fade-in justify-start"
      role="status"
      aria-label="AI is typing"
    >
      <div className="flex max-w-[85%] gap-2">
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-saffron-500 to-saffron-600"
          aria-hidden="true"
        >
          <span className="text-sm font-semibold text-white">AI</span>
        </div>

        <div className="flex flex-col gap-1">
          <div className="rounded-2xl bg-white px-4 py-3 shadow-mobile-card dark:bg-gray-800">
            <div className="flex gap-1">
              <div
                className="h-2 w-2 animate-bounce rounded-full bg-gray-400 dark:bg-gray-500"
                style={{ animationDelay: '0ms' }}
              />
              <div
                className="h-2 w-2 animate-bounce rounded-full bg-gray-400 dark:bg-gray-500"
                style={{ animationDelay: '150ms' }}
              />
              <div
                className="h-2 w-2 animate-bounce rounded-full bg-gray-400 dark:bg-gray-500"
                style={{ animationDelay: '300ms' }}
              />
            </div>
          </div>
          <span className="px-2 text-xs text-gray-500 dark:text-gray-400">
            AI Tutor is thinking...
          </span>
        </div>
      </div>
    </div>
  )
})
