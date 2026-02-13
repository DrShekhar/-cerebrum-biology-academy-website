/**
 * ARIA Sales Agent - Chat Message Area
 * Renders conversation messages with streaming support
 */

'use client'

import { useEffect, useRef } from 'react'
import { Bot, User, Sparkles } from 'lucide-react'
import type { AriaMessage, Language } from '@/lib/aria/types'
import { getTranslation } from '@/lib/aria/translations'

interface AriaChatProps {
  messages: AriaMessage[]
  isStreaming: boolean
  language: Language
  onQuickActionClick?: (action: string) => void
}

function MessageBubble({
  message,
  language,
  onQuickActionClick,
}: {
  message: AriaMessage
  language: Language
  onQuickActionClick?: (action: string) => void
}) {
  const isBot = message.sender === 'bot'
  const isStreaming = message.metadata?.isStreaming

  return (
    <div
      className={`flex gap-2 ${isBot ? 'justify-start' : 'justify-end'}`}
    >
      {isBot && (
        <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-green-500">
          <Bot className="h-4 w-4 text-white" />
        </div>
      )}

      <div className={`max-w-[85%] space-y-2`}>
        <div
          className={`rounded-2xl px-3 py-2 text-sm ${
            isBot
              ? 'rounded-tl-sm bg-slate-100 text-slate-800'
              : 'rounded-tr-sm bg-green-500 text-white'
          }`}
        >
          <div className="whitespace-pre-wrap break-words">
            {message.text || (
              <span className="inline-flex items-center gap-1 text-slate-400">
                <span
                 className="animate-fadeInUp">
                  <Sparkles className="h-3 w-3" />
                </span>
                {getTranslation('thinking', language)}
              </span>
            )}
          </div>

          {isStreaming && message.text && (
            <span
              className="ml-0.5 inline-block h-3 w-0.5 bg-slate-400 animate-fadeInUp"
            />
          )}
        </div>

        {/* Quick Actions */}
        {isBot && message.quickActions && message.quickActions.length > 0 && !isStreaming && (
          <div className="flex flex-wrap gap-1.5">
            {message.quickActions.map((action, i) => (
              <button
                key={i}
                onClick={() => onQuickActionClick?.(action)}
                className="rounded-full border border-green-200 bg-white px-2.5 py-1 text-xs text-green-700 transition-all hover:border-green-400 hover:bg-green-50"
              >
                {action}
              </button>
            ))}
          </div>
        )}
      </div>

      {!isBot && (
        <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-slate-200">
          <User className="h-4 w-4 text-slate-600" />
        </div>
      )}
    </div>
  )
}

function TypingIndicator({ language }: { language: Language }) {
  return (
    <div
      className="flex items-center gap-2 animate-fadeInUp"
    >
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-500">
        <Bot className="h-4 w-4 text-white" />
      </div>
      <div className="rounded-2xl rounded-tl-sm bg-slate-100 px-3 py-2">
        <div className="flex items-center gap-1">
          <div
            className="h-2 w-2 rounded-full bg-slate-400 animate-fadeInUp"
          />
          <div
            className="h-2 w-2 rounded-full bg-slate-400 animate-fadeInUp"
          />
          <div
            className="h-2 w-2 rounded-full bg-slate-400 animate-fadeInUp"
          />
        </div>
      </div>
    </div>
  )
}

export function AriaChat({ messages, isStreaming, language, onQuickActionClick }: AriaChatProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const shouldAutoScroll = useRef(true)

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (containerRef.current && shouldAutoScroll.current) {
      const container = containerRef.current
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [messages, isStreaming])

  // Detect if user has scrolled up (disable auto-scroll)
  const handleScroll = () => {
    if (!containerRef.current) return
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 50
    shouldAutoScroll.current = isAtBottom
  }

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="flex-1 space-y-3 overflow-y-auto px-3 py-4"
      style={{ scrollBehavior: 'smooth' }}
    >
{messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            language={language}
            onQuickActionClick={onQuickActionClick}
          />
        ))}

        {/* Show typing indicator only when streaming with no text yet */}
        {isStreaming &&
          messages.length > 0 &&
          messages[messages.length - 1].sender === 'bot' &&
          !messages[messages.length - 1].text && <TypingIndicator language={language} />}
{/* Empty state */}
      {messages.length === 0 && (
        <div className="flex h-full flex-col items-center justify-center text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-500">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <p className="text-sm text-slate-500">
            {language === 'hi'
              ? 'नमस्ते! मैं ARIA हूं। आपकी मदद के लिए तैयार!'
              : "Hi! I'm ARIA. Ready to help you!"}
          </p>
        </div>
      )}
    </div>
  )
}
