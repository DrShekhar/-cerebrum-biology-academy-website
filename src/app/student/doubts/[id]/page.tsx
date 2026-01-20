'use client'

// Force dynamic rendering to prevent auth issues during static build
export const dynamic = 'force-dynamic'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { DoubtStatusBadge, DoubtPriorityBadge } from '@/components/student/DoubtStatusBadge'
import { DoubtMessagesView } from '@/components/student/DoubtMessagesView'
import {
  ArrowLeft,
  CheckCircle,
  Eye,
  Calendar,
  User,
  BookOpen,
  Tag,
  Star,
  AlertCircle,
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { Modal } from '@/components/ui/Modal'
import { Textarea } from '@/components/ui/Textarea'
import { Label } from '@/components/ui/Label'
import { cn } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'

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

interface Doubt {
  id: string
  subject: string
  description: string
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
  status: 'OPEN' | 'IN_PROGRESS' | 'ANSWERED' | 'RESOLVED' | 'CLOSED'
  student: {
    id: string
    name: string
    email: string
  }
  instructor?: {
    id: string
    name: string
    email: string
    role: string
  } | null
  category?: {
    name: string
    icon?: string
    color?: string
  } | null
  course?: {
    name: string
  } | null
  chapter?: {
    title: string
  } | null
  topic?: {
    title: string
  } | null
  tags: string[]
  attachments: string[]
  viewCount: number
  responseTime: number | null
  resolvedAt: string | null
  studentRating: number | null
  studentFeedback: string | null
  lastMessageAt: string
  createdAt: string
  updatedAt: string
  messages: Message[]
}

export default function DoubtDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { isAuthenticated, isLoading: authLoading, user } = useAuth()

  const [doubt, setDoubt] = useState<Doubt | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showResolveModal, setShowResolveModal] = useState(false)
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [isResolving, setIsResolving] = useState(false)

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/sign-in')
      return
    }

    if (isAuthenticated && params.id) {
      fetchDoubt()
    }
  }, [isAuthenticated, authLoading, params.id, router])

  const fetchDoubt = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch(`/api/student/doubts/${params.id}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch doubt')
      }

      setDoubt(data.doubt)
    } catch (err) {
      console.error('Error fetching doubt:', err)
      setError(err instanceof Error ? err.message : 'Failed to load doubt')
    } finally {
      setIsLoading(false)
    }
  }

  const handleResolve = async () => {
    if (!rating || !doubt) return

    setIsResolving(true)

    try {
      const response = await fetch(`/api/student/doubts/${doubt.id}/resolve`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rating,
          feedback: feedback.trim() || undefined,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to resolve doubt')
      }

      setShowResolveModal(false)
      fetchDoubt()
    } catch (err) {
      console.error('Error resolving doubt:', err)
      setError(err instanceof Error ? err.message : 'Failed to resolve doubt')
    } finally {
      setIsResolving(false)
    }
  }

  const handleMessageSent = (message: Message) => {
    if (doubt) {
      setDoubt({
        ...doubt,
        messages: [...doubt.messages, message],
      })
    }
  }

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-96 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !doubt) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Doubt</h2>
            <p className="text-gray-600 mb-6">{error || 'Doubt not found'}</p>
            <Button onClick={() => router.push('/student/doubts')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Doubts
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const canResolve =
    doubt.status !== 'RESOLVED' && doubt.status !== 'CLOSED' && doubt.status !== 'OPEN'

  return (
    <div className="min-h-screen bg-gray-50">
      <Modal
        open={showResolveModal}
        onOpenChange={setShowResolveModal}
        title="Mark as Resolved"
        description="Rate the response and provide feedback (optional)"
      >
        <div className="space-y-4">
          <div>
            <Label>Rating *</Label>
            <div className="flex gap-2 mt-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  className={cn(
                    'p-2 rounded-lg transition-colors',
                    rating >= value ? 'text-yellow-500' : 'text-gray-300 hover:text-yellow-300'
                  )}
                >
                  <Star className="w-8 h-8 fill-current" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="feedback">Feedback (optional)</Label>
            <Textarea
              id="feedback"
              placeholder="Share your experience..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={4}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setShowResolveModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleResolve} disabled={!rating || isResolving} loading={isResolving}>
              Mark as Resolved
            </Button>
          </div>
        </div>
      </Modal>

      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => router.push('/student/doubts')} size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="h-6 w-px bg-gray-300"></div>
            <DoubtStatusBadge status={doubt.status} />
            <DoubtPriorityBadge priority={doubt.priority} />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-2xl">{doubt.subject}</CardTitle>
                <p className="text-sm text-gray-600 mt-2">{doubt.description}</p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Asked {formatDistanceToNow(new Date(doubt.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{doubt.viewCount} views</span>
                  </div>
                  {doubt.responseTime && (
                    <div className="flex items-center gap-1">
                      <span>Response time: {Math.round(doubt.responseTime)} min</span>
                    </div>
                  )}
                </div>

                {doubt.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {doubt.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle>Discussion</CardTitle>
              </CardHeader>
              <div className="flex-1 overflow-hidden">
                <DoubtMessagesView
                  doubtId={doubt.id}
                  messages={doubt.messages}
                  onMessageSent={handleMessageSent}
                  disabled={doubt.status === 'CLOSED'}
                />
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            {canResolve && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Got your answer?</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Mark this doubt as resolved if you're satisfied with the response.
                  </p>
                  <Button onClick={() => setShowResolveModal(true)} className="w-full">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark as Resolved
                  </Button>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {doubt.category && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Category</p>
                    <div
                      className={cn(
                        'inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium',
                        doubt.category.color || 'bg-gray-100 text-gray-700'
                      )}
                    >
                      {doubt.category.icon && <span>{doubt.category.icon}</span>}
                      {doubt.category.name}
                    </div>
                  </div>
                )}

                {doubt.course && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Course</p>
                    <p className="font-medium">{doubt.course.name}</p>
                  </div>
                )}

                {doubt.chapter && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Chapter</p>
                    <p className="font-medium">{doubt.chapter.title}</p>
                  </div>
                )}

                {doubt.topic && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Topic</p>
                    <p className="font-medium">{doubt.topic.title}</p>
                  </div>
                )}

                {doubt.instructor && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Instructor</p>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                        <User className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{doubt.instructor.name}</p>
                        <p className="text-xs text-gray-500">{doubt.instructor.role}</p>
                      </div>
                    </div>
                  </div>
                )}

                {doubt.studentRating && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Your Rating</p>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <Star
                          key={value}
                          className={cn(
                            'w-4 h-4',
                            doubt.studentRating && value <= doubt.studentRating
                              ? 'text-yellow-500 fill-yellow-500'
                              : 'text-gray-300'
                          )}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
