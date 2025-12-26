'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select'
import { EmptyState } from '@/components/ui/EmptyState'
import { DoubtStatsWidget } from '@/components/student/DoubtStatsWidget'
import { DoubtTicketCard } from '@/components/student/DoubtTicketCard'
import { CreateDoubtModal } from '@/components/student/CreateDoubtModal'
import { Plus, Search, Filter, MessageCircle, RefreshCw } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'

interface DoubtStats {
  total: number
  active: number
  resolved: number
  avgResponseTime: number | null
  resolutionRate: number
  unreadMessages: number
}

interface Doubt {
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

export default function StudentDoubtsPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth()
  const router = useRouter()

  const [stats, setStats] = useState<DoubtStats | null>(null)
  const [doubts, setDoubts] = useState<Doubt[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login')
      return
    }

    if (isAuthenticated) {
      fetchData()
    }
  }, [isAuthenticated, authLoading, router, statusFilter, priorityFilter, searchQuery])

  const fetchData = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const params = new URLSearchParams()
      if (statusFilter) params.append('status', statusFilter)
      if (priorityFilter) params.append('priority', priorityFilter)
      if (searchQuery) params.append('search', searchQuery)

      const [doubtsRes, statsRes] = await Promise.all([
        fetch(`/api/student/doubts?${params.toString()}`),
        fetch('/api/student/doubts/stats'),
      ])

      const doubtsData = await doubtsRes.json()
      const statsData = await statsRes.json()

      if (!doubtsRes.ok) {
        throw new Error(doubtsData.error || 'Failed to fetch doubts')
      }

      if (!statsRes.ok) {
        throw new Error(statsData.error || 'Failed to fetch stats')
      }

      setDoubts(doubtsData.doubts || [])
      setStats(statsData.stats || null)
    } catch (err) {
      console.error('Error fetching data:', err)
      setError(err instanceof Error ? err.message : 'Failed to load doubts')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDoubtCreated = () => {
    fetchData()
  }

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
      <CreateDoubtModal
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
        onSuccess={handleDoubtCreated}
      />

      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2">
                <MessageCircle className="w-8 h-8 text-blue-600" />
                Ask Your Doubts
              </h1>
              <p className="text-gray-600 mt-1">Get personalized help from expert instructors</p>
            </div>
            <Button onClick={() => setShowCreateModal(true)} size="lg">
              <Plus className="w-5 h-5 mr-2" />
              Ask a Question
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {stats && (
          <div className="mb-8">
            <DoubtStatsWidget stats={stats} />
          </div>
        )}

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
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="min-w-[150px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Status</SelectItem>
                <SelectItem value="OPEN">Open</SelectItem>
                <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                <SelectItem value="ANSWERED">Answered</SelectItem>
                <SelectItem value="RESOLVED">Resolved</SelectItem>
                <SelectItem value="CLOSED">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="min-w-[150px]">
                <SelectValue placeholder="All Priorities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Priorities</SelectItem>
                <SelectItem value="LOW">Low</SelectItem>
                <SelectItem value="MEDIUM">Medium</SelectItem>
                <SelectItem value="HIGH">High</SelectItem>
                <SelectItem value="URGENT">Urgent</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={fetchData} size="sm">
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {doubts.length === 0 ? (
          <EmptyState
            icon={MessageCircle}
            title="No doubts yet"
            description={
              searchQuery || statusFilter || priorityFilter
                ? 'No doubts match your filters. Try adjusting your search criteria.'
                : 'Start your learning journey by asking your first question. Our expert instructors are here to help!'
            }
            primaryAction={
              searchQuery || statusFilter || priorityFilter
                ? undefined
                : {
                    label: 'Ask Your First Question',
                    onClick: () => setShowCreateModal(true),
                  }
            }
            size="lg"
            variant="default"
          />
        ) : (
          <div className="space-y-4">
            {doubts.map((doubt) => (
              <DoubtTicketCard key={doubt.id} doubt={doubt} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
