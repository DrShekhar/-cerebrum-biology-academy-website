/**
 * ARIA Sales Agent - Chat Message Area
 * Renders conversation messages with streaming support
 */

'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
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
                <motion.span
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Sparkles className="h-3 w-3" />
                </motion.span>
                {getTranslation('thinking', language)}
              </span>
            )}
          </div>

          {isStreaming && message.text && (
            <motion.span
              className="ml-0.5 inline-block h-3 w-0.5 bg-slate-400"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
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
    </motion.div>
  )
}

function TypingIndicator({ language }: { language: Language }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-center gap-2"
    >
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-500">
        <Bot className="h-4 w-4 text-white" />
      </div>
      <div className="rounded-2xl rounded-tl-sm bg-slate-100 px-3 py-2">
        <div className="flex items-center gap-1">
          <motion.div
            className="h-2 w-2 rounded-full bg-slate-400"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
          />
          <motion.div
            className="h-2 w-2 rounded-full bg-slate-400"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
          />
          <motion.div
            className="h-2 w-2 rounded-full bg-slate-400"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
          />
        </div>
      </div>
    </motion.div>
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
      <AnimatePresence mode="popLayout">
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
      </AnimatePresence>

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
