'use client'

import { memo, useState, useRef, useEffect, KeyboardEvent, ChangeEvent } from 'react'

interface ChatInputProps {
  onSendMessage: (message: string) => void
  isLoading: boolean
  placeholder?: string
  maxLength?: number
}

export const ChatInput = memo(function ChatInput({
  onSendMessage,
  isLoading,
  placeholder = 'Ask your biology question...',
  maxLength = 1000,
}: ChatInputProps) {
  const [message, setMessage] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = () => {
    const trimmedMessage = message.trim()
    if (trimmedMessage && !isLoading) {
      onSendMessage(trimmedMessage)
      setMessage('')
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }

  useEffect(() => {
    if (!isLoading && textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [isLoading])

  const remainingChars = maxLength - message.length
  const isNearLimit = remainingChars < 100

  return (
    <div className="border-t border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
      <div className="mx-auto max-w-4xl">
        <div className="relative flex items-end gap-2">
          <div className="relative flex-1">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              disabled={isLoading}
              maxLength={maxLength}
              rows={1}
              className="max-h-32 w-full resize-none rounded-2xl border border-gray-300 bg-white px-4 py-3 pr-12 text-sm text-gray-900 placeholder-gray-500 shadow-mobile-card transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:border-primary-400 dark:focus:ring-primary-400"
              aria-label="Message input"
              aria-describedby="char-count"
            />
            {isNearLimit && (
              <span
                id="char-count"
                className={`absolute bottom-2 right-14 text-xs ${
                  remainingChars < 0
                    ? 'text-red-500'
                    : remainingChars < 50
                      ? 'text-saffron-500'
                      : 'text-gray-400'
                }`}
                aria-live="polite"
              >
                {remainingChars}
              </span>
            )}
          </div>

          <button
            onClick={handleSubmit}
            disabled={!message.trim() || isLoading || remainingChars < 0}
            className="flex min-h-[44px] min-w-[44px] h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-mobile-button transition-all hover:shadow-md active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-mobile-button touch-manipulation"
            aria-label="Send message"
            type="button"
          >
            {isLoading ? (
              <svg
                className="h-5 w-5 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : (
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            )}
          </button>
        </div>

        <div className="mt-2 flex items-center justify-between px-1 text-xs text-gray-500 dark:text-gray-400">
          <span>Press Enter to send, Shift + Enter for new line</span>
        </div>
      </div>
    </div>
  )
})
