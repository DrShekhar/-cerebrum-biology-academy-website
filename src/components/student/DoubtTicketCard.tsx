import React from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { DoubtStatusBadge, DoubtPriorityBadge } from './DoubtStatusBadge'
import { MessageCircle, Eye, Clock, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'

interface DoubtTicketCardProps {
  doubt: {
    id: string
    subject: string
    description: string
    priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
    status: 'OPEN' | 'IN_PROGRESS' | 'ANSWERED' | 'RESOLVED' | 'CLOSED'
    category?: {
      name: string
      icon?: string
      color?: string
    } | null
    instructor?: {
      name: string
    } | null
    tags: string[]
    viewCount: number
    createdAt: string
    lastMessageAt: string
    hasUnreadMessages?: boolean
    messageCount?: number
  }
  onClick?: () => void
  className?: string
}

export function DoubtTicketCard({ doubt, onClick, className }: DoubtTicketCardProps) {
  const timeAgo = formatDistanceToNow(new Date(doubt.lastMessageAt), { addSuffix: true })

  return (
    <Link href={`/student/doubts/${doubt.id}`}>
      <Card
        className={cn(
          'hover:shadow-lg transition-all cursor-pointer',
          doubt.hasUnreadMessages && 'border-l-4 border-l-blue-500',
          className
        )}
        onClick={onClick}
      >
        <CardContent className="p-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  {doubt.category && (
                    <div
                      className={cn(
                        'px-2 py-1 rounded text-xs font-medium',
                        doubt.category.color || 'bg-gray-100 text-gray-700'
                      )}
                    >
                      {doubt.category.icon && <span className="mr-1">{doubt.category.icon}</span>}
                      {doubt.category.name}
                    </div>
                  )}
                  <DoubtPriorityBadge priority={doubt.priority} />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-1 line-clamp-1">
                  {doubt.subject}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">{doubt.description}</p>
              </div>
              <DoubtStatusBadge status={doubt.status} />
            </div>

            {doubt.tags && doubt.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {doubt.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
                {doubt.tags.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    +{doubt.tags.length - 3} more
                  </span>
                )}
              </div>
            )}

            <div className="flex items-center justify-between text-sm text-gray-500 pt-2 border-t">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{doubt.viewCount}</span>
                </div>
                {doubt.messageCount !== undefined && (
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>{doubt.messageCount}</span>
                    {doubt.hasUnreadMessages && (
                      <span className="w-2 h-2 bg-blue-500 rounded-full ml-1"></span>
                    )}
                  </div>
                )}
                {doubt.instructor && (
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span className="text-xs">{doubt.instructor.name}</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span className="text-xs">{timeAgo}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
