'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

// ============================================
// TYPES
// ============================================

interface Achiever {
  id: string
  studentId: string
  studentName: string
  achievement: string
  description: string | null
  category: string
  score: number | null
  rank: number | null
  badgeUrl: string | null
  photoUrl: string | null
  courseId: string | null
  period: string | null
  featuredFrom: string | null
  featuredUntil: string | null
  viewCount: number
  nominationCount: number
  isFeatured: boolean
  createdAt: string
}

interface Nomination {
  id: string
  achieverId: string
  nominationType: string
  reason: string | null
  isApproved: boolean
  createdAt: string
  achiever: {
    id: string
    studentName: string
    achievement: string
    category: string
  }
}

interface Filters {
  categories: string[]
  periods: string[]
}

// ============================================
// CONFIG
// ============================================

const categoryConfig: Record<string, { icon: string; color: string; bgColor: string }> = {
  ACADEMIC: { icon: '📚', color: 'text-blue-700', bgColor: 'bg-blue-100' },
  SPORTS: { icon: '🏆', color: 'text-green-700', bgColor: 'bg-green-100' },
  ARTS: { icon: '🎨', color: 'text-purple-700', bgColor: 'bg-purple-100' },
  SCIENCE: { icon: '🔬', color: 'text-cyan-700', bgColor: 'bg-cyan-100' },
  LEADERSHIP: { icon: '⭐', color: 'text-yellow-700', bgColor: 'bg-yellow-100' },
  COMMUNITY: { icon: '🤝', color: 'text-pink-700', bgColor: 'bg-pink-100' },
  INNOVATION: { icon: '💡', color: 'text-orange-700', bgColor: 'bg-orange-100' },
  OTHER: { icon: '🏅', color: 'text-gray-700', bgColor: 'bg-gray-100' },
}

const defaultCategoryConfig = { icon: '🏅', color: 'text-gray-700', bgColor: 'bg-gray-100' }

// ============================================
// HELPER FUNCTIONS
// ============================================

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

function getRankSuffix(rank: number): string {
  if (rank % 100 >= 11 && rank % 100 <= 13) return 'th'
  switch (rank % 10) {
    case 1:
      return 'st'
    case 2:
      return 'nd'
    case 3:
      return 'rd'
    default:
      return 'th'
  }
}

// ============================================
// NOMINATION MODAL
// ============================================

interface NominationModalProps {
  achiever: Achiever
  onClose: () => void
  onNominate: (reason: string) => Promise<void>
}

function NominationModal({ achiever, onClose, onNominate }: NominationModalProps) {
  const [reason, setReason] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await onNominate(reason)
      onClose()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl">
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          Nominate {achiever.studentName}
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          for &quot;{achiever.achievement}&quot;
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Why do you think they deserve recognition? (optional)
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={3}
              placeholder="Share your thoughts..."
            />
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : '👍 Nominate'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ============================================
// ACHIEVER CARD (with nomination)
// ============================================

interface AchieverCardProps {
  achiever: Achiever
  hasNominated: boolean
  onNominate: () => void
}

function AchieverCard({ achiever, hasNominated, onNominate }: AchieverCardProps) {
  const config = categoryConfig[achiever.category] || defaultCategoryConfig

  return (
    <div
      className={cn(
        'relative bg-white rounded-lg border p-4 transition-all hover:shadow-md',
        achiever.isFeatured && 'border-yellow-300 bg-yellow-50/30'
      )}
    >
      {achiever.isFeatured && (
        <span className="absolute -top-2 left-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded-full">
          ⭐ Featured
        </span>
      )}

      <div className="flex items-start gap-3">
        {/* Photo/Avatar */}
        <div className="relative flex-shrink-0">
          {achiever.photoUrl ? (
            <Image
              src={achiever.photoUrl}
              alt={achiever.studentName}
              width={56}
              height={56}
              className="w-14 h-14 rounded-full object-cover border-2 border-gray-200"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold border-2 border-gray-200">
              {getInitials(achiever.studentName)}
            </div>
          )}
          {achiever.rank && achiever.rank <= 3 && (
            <span className="absolute -top-1 -right-1 text-lg">
              {achiever.rank === 1 ? '🥇' : achiever.rank === 2 ? '🥈' : '🥉'}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-gray-900">{achiever.studentName}</h3>
              <p className="text-sm text-blue-600 font-medium">{achiever.achievement}</p>
            </div>
            <span
              className={cn(
                'flex-shrink-0 px-2 py-0.5 rounded-full text-xs font-medium',
                config.bgColor,
                config.color
              )}
            >
              {config.icon}
            </span>
          </div>

          {achiever.description && (
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{achiever.description}</p>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-3 text-xs text-gray-500">
              {achiever.rank && (
                <span className="font-medium">
                  #{achiever.rank}
                  <sup>{getRankSuffix(achiever.rank)}</sup>
                </span>
              )}
              {achiever.score !== null && (
                <span className="font-medium text-green-600">{achiever.score}%</span>
              )}
              <span>👍 {achiever.nominationCount}</span>
            </div>

            <button
              onClick={onNominate}
              disabled={hasNominated}
              className={cn(
                'px-3 py-1 rounded-full text-xs font-medium transition-all',
                hasNominated
                  ? 'bg-green-100 text-green-700 cursor-not-allowed'
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              )}
            >
              {hasNominated ? '✓ Nominated' : '👍 Nominate'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================
// MAIN PAGE COMPONENT
// ============================================

export default function StudentWallOfAchieversPage() {
  const [achievers, setAchievers] = useState<Achiever[]>([])
  const [filters, setFilters] = useState<Filters>({ categories: [], periods: [] })
  const [myNominations, setMyNominations] = useState<Set<string>>(new Set())
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null)
  const [nominatingAchiever, setNominatingAchiever] = useState<Achiever | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  useEffect(() => {
    fetchData()
  }, [selectedCategory, selectedPeriod])

  async function fetchData() {
    try {
      setIsLoading(true)
      setError(null)

      // Fetch achievers and nominations in parallel
      const params = new URLSearchParams()
      params.set('limit', '50')
      if (selectedCategory) params.set('category', selectedCategory)
      if (selectedPeriod) params.set('period', selectedPeriod)

      const [achieversRes, nominationsRes] = await Promise.all([
        fetch(`/api/wall-of-achievers?${params.toString()}`),
        fetch('/api/wall-of-achievers/nominate'),
      ])

      const achieversData = await achieversRes.json()
      const nominationsData = await nominationsRes.json()

      if (achieversData.success) {
        setAchievers(achieversData.data.achievers)
        setFilters(achieversData.data.filters)
      } else {
        setError(achieversData.error || 'Failed to fetch achievers')
      }

      if (nominationsData.success) {
        const nominatedIds = new Set<string>(
          nominationsData.data.map((n: Nomination) => n.achieverId)
        )
        setMyNominations(nominatedIds)
      }
    } catch (err) {
      console.error('Error fetching data:', err)
      setError('Failed to load data')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleNominate(reason: string) {
    if (!nominatingAchiever) return

    try {
      const response = await fetch('/api/wall-of-achievers/nominate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          achieverId: nominatingAchiever.id,
          reason,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setMyNominations((prev) => {
          const newSet = new Set(prev)
          newSet.add(nominatingAchiever.id)
          return newSet
        })
        setSuccessMessage(`You nominated ${nominatingAchiever.studentName}!`)
        setTimeout(() => setSuccessMessage(null), 3000)

        // Update nomination count locally
        setAchievers((prev) =>
          prev.map((a) =>
            a.id === nominatingAchiever.id
              ? { ...a, nominationCount: a.nominationCount + 1 }
              : a
          )
        )
      } else {
        setError(data.error || 'Failed to submit nomination')
        setTimeout(() => setError(null), 3000)
      }
    } catch (err) {
      console.error('Error nominating:', err)
      setError('Failed to submit nomination')
      setTimeout(() => setError(null), 3000)
    }
  }

  const featuredAchievers = achievers.filter((a) => a.isFeatured)
  const regularAchievers = achievers.filter((a) => !a.isFeatured)

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">🏆 Wall of Achievers</h1>
        <p className="text-sm text-gray-600 mt-1">
          Celebrate your peers! Nominate students who inspire you.
        </p>
      </div>

      {/* Success/Error Messages */}
      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm text-center">
          {successMessage}
        </div>
      )}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm text-center">
          {error}
        </div>
      )}

      {/* Filters */}
      {(filters.categories.length > 0 || filters.periods.length > 0) && (
        <div className="mb-6 space-y-3">
          {filters.categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={cn(
                  'px-3 py-1.5 rounded-full text-sm font-medium transition-all',
                  !selectedCategory
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                )}
              >
                All
              </button>
              {filters.categories.map((cat) => {
                const config = categoryConfig[cat] || defaultCategoryConfig
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      'px-3 py-1.5 rounded-full text-sm font-medium transition-all',
                      selectedCategory === cat
                        ? 'bg-blue-600 text-white'
                        : cn(config.bgColor, config.color)
                    )}
                  >
                    {config.icon} {cat}
                  </button>
                )
              })}
            </div>
          )}

          {filters.periods.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {filters.periods.map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(selectedPeriod === period ? null : period)}
                  className={cn(
                    'px-3 py-1 rounded-full text-xs font-medium transition-all',
                    selectedPeriod === period
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  )}
                >
                  {period}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Content */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-gray-100 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : achievers.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <span className="text-5xl mb-4 block">🏆</span>
          <p className="text-gray-500 text-lg">No achievers found</p>
          <p className="text-gray-400 text-sm mt-1">
            Achievers will appear here once recognized
          </p>
        </div>
      ) : (
        <>
          {/* Featured Section */}
          {featuredAchievers.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span>⭐</span> Featured
              </h2>
              <div className="space-y-3">
                {featuredAchievers.map((achiever) => (
                  <AchieverCard
                    key={achiever.id}
                    achiever={achiever}
                    hasNominated={myNominations.has(achiever.id)}
                    onNominate={() => setNominatingAchiever(achiever)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* All Achievers */}
          {regularAchievers.length > 0 && (
            <div>
              {featuredAchievers.length > 0 && (
                <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span>🏅</span> All Achievers
                </h2>
              )}
              <div className="space-y-3">
                {regularAchievers.map((achiever) => (
                  <AchieverCard
                    key={achiever.id}
                    achiever={achiever}
                    hasNominated={myNominations.has(achiever.id)}
                    onNominate={() => setNominatingAchiever(achiever)}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Nomination Modal */}
      {nominatingAchiever && (
        <NominationModal
          achiever={nominatingAchiever}
          onClose={() => setNominatingAchiever(null)}
          onNominate={handleNominate}
        />
      )}
    </div>
  )
}
