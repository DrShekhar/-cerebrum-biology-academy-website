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

interface Filters {
  categories: string[]
  periods: string[]
}

interface WallOfAchieversProps {
  className?: string
  showFeaturedOnly?: boolean
  limit?: number
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

function formatDate(dateString: string | null): string {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-IN', {
    month: 'short',
    year: 'numeric',
  })
}

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
// FEATURED ACHIEVER CARD
// ============================================

interface FeaturedAchieverCardProps {
  achiever: Achiever
}

function FeaturedAchieverCard({ achiever }: FeaturedAchieverCardProps) {
  const config = categoryConfig[achiever.category] || defaultCategoryConfig

  return (
    <div className="relative bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 rounded-xl border-2 border-yellow-300 p-6 shadow-lg">
      {/* Featured Badge */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow">
        ⭐ FEATURED
      </div>

      <div className="flex flex-col items-center text-center pt-2">
        {/* Photo/Avatar */}
        <div className="relative mb-4">
          {achiever.photoUrl ? (
            <Image
              src={achiever.photoUrl}
              alt={achiever.studentName}
              width={96}
              height={96}
              className="w-24 h-24 rounded-full object-cover border-4 border-yellow-300 shadow-md"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center text-white text-2xl font-bold border-4 border-yellow-300 shadow-md">
              {getInitials(achiever.studentName)}
            </div>
          )}
          {/* Badge */}
          {achiever.badgeUrl ? (
            <Image
              src={achiever.badgeUrl}
              alt="Badge"
              width={32}
              height={32}
              className="absolute -bottom-1 -right-1 w-8 h-8"
            />
          ) : (
            <span className="absolute -bottom-1 -right-1 text-2xl">{config.icon}</span>
          )}
        </div>

        {/* Name */}
        <h3 className="text-lg font-bold text-gray-900">{achiever.studentName}</h3>

        {/* Achievement */}
        <p className="text-amber-700 font-semibold mt-1">{achiever.achievement}</p>

        {/* Description */}
        {achiever.description && (
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">{achiever.description}</p>
        )}

        {/* Stats Row */}
        <div className="flex items-center justify-center gap-4 mt-4">
          {achiever.rank && (
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600">
                {achiever.rank}
                <sup className="text-sm">{getRankSuffix(achiever.rank)}</sup>
              </div>
              <div className="text-xs text-gray-500">Rank</div>
            </div>
          )}
          {achiever.score !== null && (
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600">{achiever.score}%</div>
              <div className="text-xs text-gray-500">Score</div>
            </div>
          )}
          {achiever.nominationCount > 0 && (
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600">{achiever.nominationCount}</div>
              <div className="text-xs text-gray-500">Nominations</div>
            </div>
          )}
        </div>

        {/* Category & Period */}
        <div className="flex items-center gap-2 mt-4">
          <span
            className={cn('px-2 py-0.5 rounded-full text-xs font-medium', config.bgColor, config.color)}
          >
            {config.icon} {achiever.category}
          </span>
          {achiever.period && (
            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
              {achiever.period}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

// ============================================
// ACHIEVER CARD
// ============================================

interface AchieverCardProps {
  achiever: Achiever
}

function AchieverCard({ achiever }: AchieverCardProps) {
  const config = categoryConfig[achiever.category] || defaultCategoryConfig

  return (
    <div
      className={cn(
        'relative bg-white rounded-lg border p-4 transition-all hover:shadow-md',
        achiever.isFeatured && 'border-yellow-300 bg-yellow-50/30'
      )}
    >
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
          <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
            <div className="flex items-center gap-3">
              {achiever.rank && (
                <span className="font-medium">
                  Rank #{achiever.rank}
                </span>
              )}
              {achiever.score !== null && (
                <span className="font-medium text-green-600">{achiever.score}%</span>
              )}
              {achiever.nominationCount > 0 && (
                <span>👍 {achiever.nominationCount}</span>
              )}
            </div>
            {achiever.period && <span>{achiever.period}</span>}
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================
// MAIN COMPONENT
// ============================================

export function WallOfAchievers({ className, showFeaturedOnly = false, limit = 20 }: WallOfAchieversProps) {
  const [achievers, setAchievers] = useState<Achiever[]>([])
  const [filters, setFilters] = useState<Filters>({ categories: [], periods: [] })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null)
  const [offset, setOffset] = useState(0)
  const [hasMore, setHasMore] = useState(false)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    fetchAchievers()
  }, [selectedCategory, selectedPeriod, showFeaturedOnly])

  async function fetchAchievers(loadMore = false) {
    try {
      if (!loadMore) {
        setIsLoading(true)
        setOffset(0)
      }
      setError(null)

      const params = new URLSearchParams()
      params.set('limit', String(limit))
      params.set('offset', String(loadMore ? offset + limit : 0))
      if (selectedCategory) params.set('category', selectedCategory)
      if (selectedPeriod) params.set('period', selectedPeriod)
      if (showFeaturedOnly) params.set('featured', 'true')

      const response = await fetch(`/api/wall-of-achievers?${params.toString()}`)
      const data = await response.json()

      if (data.success) {
        if (loadMore) {
          setAchievers((prev) => [...prev, ...data.data.achievers])
          setOffset((prev) => prev + limit)
        } else {
          setAchievers(data.data.achievers)
          setOffset(0)
        }
        setFilters(data.data.filters)
        setTotal(data.data.pagination.total)
        setHasMore(data.data.pagination.hasMore)
      } else {
        setError(data.error || 'Failed to fetch achievers')
      }
    } catch (err) {
      console.error('Error fetching achievers:', err)
      setError('Failed to load achievers')
    } finally {
      setIsLoading(false)
    }
  }

  const featuredAchievers = achievers.filter((a) => a.isFeatured)
  const regularAchievers = showFeaturedOnly ? achievers : achievers.filter((a) => !a.isFeatured)

  return (
    <div className={cn('', className)}>
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">🏆 Wall of Achievers</h1>
        <p className="text-gray-600 mt-2">Celebrating excellence and outstanding achievements</p>
      </div>

      {/* Filters */}
      {!showFeaturedOnly && (filters.categories.length > 0 || filters.periods.length > 0) && (
        <div className="mb-6 space-y-3">
          {/* Category Filter */}
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
                All Categories
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
                        : cn(config.bgColor, config.color, 'hover:opacity-80')
                    )}
                  >
                    {config.icon} {cat}
                  </button>
                )
              })}
            </div>
          )}

          {/* Period Filter */}
          {filters.periods.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedPeriod(null)}
                className={cn(
                  'px-3 py-1.5 rounded-full text-sm font-medium transition-all',
                  !selectedPeriod
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                )}
              >
                All Periods
              </button>
              {filters.periods.map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={cn(
                    'px-3 py-1.5 rounded-full text-sm font-medium transition-all',
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
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-gray-100 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-500">{error}</p>
          <button
            onClick={() => fetchAchievers()}
            className="mt-2 text-sm text-blue-600 hover:underline"
          >
            Try again
          </button>
        </div>
      ) : achievers.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <span className="text-5xl mb-4 block">🏆</span>
          <p className="text-gray-500 text-lg">No achievers found</p>
          <p className="text-gray-400 text-sm mt-1">
            {selectedCategory || selectedPeriod
              ? 'Try changing your filters'
              : 'Achievers will appear here once added'}
          </p>
        </div>
      ) : (
        <>
          {/* Featured Section */}
          {featuredAchievers.length > 0 && !showFeaturedOnly && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>⭐</span> Featured Achievers
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {featuredAchievers.map((achiever) => (
                  <FeaturedAchieverCard key={achiever.id} achiever={achiever} />
                ))}
              </div>
            </div>
          )}

          {/* Regular Achievers */}
          {regularAchievers.length > 0 && (
            <div>
              {!showFeaturedOnly && featuredAchievers.length > 0 && (
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>🏅</span> All Achievers
                </h2>
              )}
              <div className="space-y-3">
                {regularAchievers.map((achiever) => (
                  <AchieverCard key={achiever.id} achiever={achiever} />
                ))}
              </div>
            </div>
          )}

          {/* Load More */}
          {hasMore && (
            <div className="text-center mt-6">
              <button
                onClick={() => fetchAchievers(true)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Load More ({achievers.length} of {total})
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default WallOfAchievers
