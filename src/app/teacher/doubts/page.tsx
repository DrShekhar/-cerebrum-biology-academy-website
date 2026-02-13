'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent } from '@/components/ui/Card'
import { DoubtStatusBadge, DoubtPriorityBadge } from '@/components/student/DoubtStatusBadge'
import { Search, RefreshCw, MessageCircle, User, Eye, Clock } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { cn } from '@/lib/utils'

interface Doubt {
  id: string
  subject: string
  description: string
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
  status: 'OPEN' | 'IN_PROGRESS' | 'ANSWERED' | 'RESOLVED' | 'CLOSED'
  student: {
    name: string
    email: string
  }
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
  messageCount: number
}

export default function TeacherDoubtsPage() {
  const { isAuthenticated, isLoading: authLoading, user } = useAuth()
  const router = useRouter()

  const [doubts, setDoubts] = useState<Doubt[]>([])
  const [stats, setStats] = useState<Record<string, number>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('')
  const [assignedFilter, setAssignedFilter] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/sign-in')
      return
    }

    if (isAuthenticated && (user?.role === 'TEACHER' || user?.role === 'ADMIN')) {
      fetchDoubts()
    } else if (!authLoading && user?.role !== 'TEACHER' && user?.role !== 'ADMIN') {
      router.push('/student/doubts')
    }
  }, [
    isAuthenticated,
    authLoading,
    user,
    router,
    statusFilter,
    priorityFilter,
    assignedFilter,
    searchQuery,
  ])

  const fetchDoubts = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const params = new URLSearchParams()
      if (statusFilter) params.append('status', statusFilter)
      if (priorityFilter) params.append('priority', priorityFilter)
      if (assignedFilter) params.append('assigned', assignedFilter)
      if (searchQuery) params.append('search', searchQuery)

      const response = await fetch(`/api/teacher/doubts?${params.toString()}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch doubts')
      }

      setDoubts(data.doubts || [])
      setStats(data.stats || {})
    } catch (err) {
      console.error('Error fetching doubts:', err)
      setError(err instanceof Error ? err.message : 'Failed to load doubts')
    } finally {
      setIsLoading(false)
    }
  }

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-24 bg-gray-200 rounded"></div>
              ))}
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2">
                <MessageCircle className="w-8 h-8 text-purple-600" />
                Student Doubts
              </h1>
              <p className="text-gray-600 mt-1">Help students with their questions</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          {[
            {
              label: 'Total',
              value: Object.values(stats).reduce((a, b) => a + b, 0),
              color: 'bg-blue-100 text-blue-800',
            },
            { label: 'Open', value: stats.OPEN || 0, color: 'bg-gray-100 text-gray-800' },
            {
              label: 'In Progress',
              value: stats.IN_PROGRESS || 0,
              color: 'bg-yellow-100 text-yellow-800',
            },
            {
              label: 'Answered',
              value: stats.ANSWERED || 0,
              color: 'bg-purple-100 text-purple-800',
            },
            { label: 'Resolved', value: stats.RESOLVED || 0, color: 'bg-green-100 text-green-800' },
          ].map((stat, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className={cn('text-3xl font-bold', stat.color.split(' ')[1])}>{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search doubts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <select
              value={assignedFilter}
              onChange={(e) => setAssignedFilter(e.target.value)}
              className="min-w-[120px] sm:min-w-[150px] px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[44px] text-sm"
            >
              <option value="">All Doubts</option>
              <option value="me">Assigned to Me</option>
              <option value="unassigned">Unassigned</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="min-w-[120px] sm:min-w-[150px] px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[44px] text-sm"
            >
              <option value="">All Status</option>
              <option value="OPEN">Open</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="ANSWERED">Answered</option>
              <option value="RESOLVED">Resolved</option>
            </select>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="min-w-[120px] sm:min-w-[150px] px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[44px] text-sm"
            >
              <option value="">All Priorities</option>
              <option value="URGENT">Urgent</option>
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </select>
            <Button variant="outline" onClick={fetchDoubts} size="sm">
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {doubts.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No doubts found</h3>
              <p className="text-gray-600">
                {searchQuery || statusFilter || priorityFilter || assignedFilter
                  ? 'Try adjusting your filters'
                  : 'No student doubts at the moment'}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {doubts.map((doubt) => (
              <Link key={doubt.id} href={`/student/doubts/${doubt.id}`}>
                <Card className="hover:shadow-lg transition-all cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <DoubtPriorityBadge priority={doubt.priority} />
                            {doubt.category && (
                              <div
                                className={cn(
                                  'px-2 py-1 rounded text-xs font-medium',
                                  doubt.category.color || 'bg-gray-100 text-gray-700'
                                )}
                              >
                                {doubt.category.name}
                              </div>
                            )}
                            {!doubt.instructor && (
                              <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-medium">
                                Unassigned
                              </span>
                            )}
                          </div>
                          <h3 className="font-semibold text-gray-900 text-lg mb-1 line-clamp-1">
                            {doubt.subject}
                          </h3>
                          <p className="text-sm text-gray-600 line-clamp-2">{doubt.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <User className="w-4 h-4" />
                              <span>{doubt.student.name}</span>
                            </div>
                          </div>
                        </div>
                        <DoubtStatusBadge status={doubt.status} />
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-500 pt-2 border-t">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span>{doubt.viewCount}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4" />
                            <span>{doubt.messageCount}</span>
                          </div>
                          {doubt.instructor && (
                            <div className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              <span className="text-xs">{doubt.instructor.name}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span className="text-xs">
                            {formatDistanceToNow(new Date(doubt.lastMessageAt), {
                              addSuffix: true,
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
