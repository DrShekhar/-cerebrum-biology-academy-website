'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Textarea } from '@/components/ui/Textarea'
import { Send, User, CheckCheck, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'
import { useAuth } from '@/contexts/AuthContext'

interface Message {
  id: string
  message: string
  messageType: 'TEXT' | 'IMAGE' | 'FILE' | 'VOICE' | 'VIDEO'
  attachments: string[]
  sender: {
    id: string
    name: string
    email: string
    role: string
  }
  isRead: boolean
  readAt: string | null
  createdAt: string
}

interface DoubtMessagesViewProps {
  doubtId: string
  messages: Message[]
  onMessageSent?: (message: Message) => void
  disabled?: boolean
}

export function DoubtMessagesView({
  doubtId,
  messages,
  onMessageSent,
  disabled = false,
}: DoubtMessagesViewProps) {
  const { user } = useAuth()
  const [newMessage, setNewMessage] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!newMessage.trim() || isSending) return

    setError(null)
    setIsSending(true)

    try {
      const response = await fetch(`/api/student/doubts/${doubtId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: newMessage.trim(),
          messageType: 'TEXT',
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message')
      }

      setNewMessage('')
      onMessageSent?.(data.message)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message')
    } finally {
      setIsSending(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((message, index) => {
            const isCurrentUser = message.sender.id === user?.id
            const isInstructor =
              message.sender.role === 'TEACHER' || message.sender.role === 'ADMIN'
            const showDateDivider =
              index === 0 ||
              new Date(message.createdAt).toDateString() !==
                new Date(messages[index - 1].createdAt).toDateString()

            return (
              <React.Fragment key={message.id}>
                {showDateDivider && (
                  <div className="flex items-center justify-center my-4">
                    <span className="px-3 py-1 bg-white text-gray-600 text-xs rounded-full border">
                      {new Date(message.createdAt).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                )}

                <div className={cn('flex gap-3', isCurrentUser ? 'flex-row-reverse' : 'flex-row')}>
                  <div
                    className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
                      isInstructor ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'
                    )}
                  >
                    <User className="w-4 h-4" />
                  </div>

                  <div
                    className={cn(
                      'flex flex-col max-w-[75%]',
                      isCurrentUser ? 'items-end' : 'items-start'
                    )}
                  >
                    <div
                      className={cn(
                        'rounded-2xl px-4 py-2',
                        isCurrentUser
                          ? 'bg-blue-600 text-white'
                          : isInstructor
                            ? 'bg-purple-100 text-purple-900'
                            : 'bg-white text-gray-900'
                      )}
                    >
                      {!isCurrentUser && (
                        <p className="text-xs font-semibold mb-1 opacity-75">
                          {message.sender.name}
                          {isInstructor && (
                            <span className="ml-1 px-1.5 py-0.5 bg-purple-200 text-purple-800 rounded text-[10px]">
                              Instructor
                            </span>
                          )}
                        </p>
                      )}
                      <p className="text-sm whitespace-pre-wrap break-words">{message.message}</p>
                    </div>

                    <div
                      className={cn(
                        'flex items-center gap-2 mt-1 text-xs',
                        isCurrentUser ? 'flex-row-reverse' : 'flex-row'
                      )}
                    >
                      <span className="text-gray-500">
                        {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
                      </span>
                      {isCurrentUser && (
                        <span className="text-gray-400">
                          {message.isRead ? (
                            <CheckCheck className="w-3 h-3 text-blue-500" />
                          ) : (
                            <Check className="w-3 h-3" />
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </React.Fragment>
            )
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {error && (
        <div className="px-4 py-2 bg-red-50 border-t border-red-200">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <Card className="border-t rounded-none">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <Textarea
              placeholder={
                disabled
                  ? 'This doubt is closed'
                  : 'Type your message... (Shift+Enter for new line)'
              }
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={disabled || isSending}
              rows={2}
              className="flex-1 resize-none"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!newMessage.trim() || disabled || isSending}
              loading={isSending}
              size="lg"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Press Enter to send, Shift+Enter for new line
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
