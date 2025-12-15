'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Leaderboard as LeaderboardType, LeaderboardEntry } from '@/lib/mcq/types'
import type { LeaderboardPeriod } from '@/generated/prisma'

interface LeaderboardProps {
  freeUserId?: string
  compact?: boolean
  onRequireLogin?: () => void
}

const periodLabels: Record<LeaderboardPeriod, string> = {
  DAILY: 'Today',
  WEEKLY: 'This Week',
  MONTHLY: 'This Month',
  ALL_TIME: 'All Time',
}

export function Leaderboard({ freeUserId, compact = false, onRequireLogin }: LeaderboardProps) {
  const [period, setPeriod] = useState<LeaderboardPeriod>('WEEKLY')
  const [leaderboard, setLeaderboard] = useState<LeaderboardType | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchLeaderboard()
  }, [period, freeUserId])

  const fetchLeaderboard = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams({
        period,
        limit: compact ? '10' : '50',
      })

      if (freeUserId) {
        params.append('freeUserId', freeUserId)
      }

      const response = await fetch(`/api/mcq/leaderboard?${params}`)

      if (!response.ok) {
        throw new Error('Failed to fetch leaderboard')
      }

      const data = await response.json()
      setLeaderboard(data)
    } catch (err) {
      setError('Failed to load leaderboard')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return '🥇'
      case 2:
        return '🥈'
      case 3:
        return '🥉'
      default:
        return null
    }
  }

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-100 to-yellow-50 border-yellow-300'
      case 2:
        return 'bg-gradient-to-r from-gray-100 to-gray-50 border-gray-300'
      case 3:
        return 'bg-gradient-to-r from-orange-100 to-orange-50 border-orange-300'
      default:
        return 'bg-white border-gray-200'
    }
  }

  if (compact) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <span className="text-xl">🏆</span>
            Leaderboard
          </h3>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value as LeaderboardPeriod)}
            className="text-sm border rounded-lg px-2 py-1 text-gray-600"
          >
            {Object.entries(periodLabels).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {isLoading ? (
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-10 bg-gray-100 rounded animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <p className="text-red-500 text-sm">{error}</p>
        ) : (
          <div className="space-y-2">
            {leaderboard?.entries.slice(0, 5).map((entry) => (
              <div
                key={entry.rank}
                className={`flex items-center justify-between p-2 rounded-lg border ${
                  entry.isCurrentUser ? 'bg-blue-50 border-blue-300' : getRankColor(entry.rank)
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 text-center font-bold text-sm">
                    {getRankBadge(entry.rank) || `#${entry.rank}`}
                  </span>
                  <span className="text-sm font-medium truncate max-w-[100px]">
                    {entry.name}
                    {entry.isCurrentUser && <span className="text-blue-600 ml-1">(You)</span>}
                  </span>
                </div>
                <span className="text-sm font-bold text-blue-600">{entry.xp} XP</span>
              </div>
            ))}

            {leaderboard?.currentUserRank && leaderboard.currentUserRank > 5 && (
              <div className="text-center text-sm text-gray-500 py-2">
                Your rank: #{leaderboard.currentUserRank}
              </div>
            )}

            {!freeUserId && (
              <button
                onClick={onRequireLogin}
                className="w-full mt-2 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Register to appear on leaderboard
              </button>
            )}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
        <h2 className="text-2xl font-bold flex items-center gap-3">
          <span className="text-3xl">🏆</span>
          MCQ Champions
        </h2>
        <p className="text-blue-100 mt-1">Compete with fellow NEET aspirants</p>

        {/* Period Tabs */}
        <div className="flex gap-2 mt-4">
          {(Object.entries(periodLabels) as [LeaderboardPeriod, string][]).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setPeriod(key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                period === key
                  ? 'bg-white text-blue-600'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Bar */}
      {leaderboard && (
        <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 border-b">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-800">{leaderboard.totalParticipants}</p>
            <p className="text-xs text-gray-500">Participants</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{leaderboard.entries[0]?.xp || 0}</p>
            <p className="text-xs text-gray-500">Top XP</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {leaderboard.currentUserRank ? `#${leaderboard.currentUserRank}` : '-'}
            </p>
            <p className="text-xs text-gray-500">Your Rank</p>
          </div>
        </div>
      )}

      {/* Leaderboard List */}
      <div className="p-4">
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-500">{error}</p>
            <button onClick={fetchLeaderboard} className="mt-2 text-blue-600 hover:underline">
              Try again
            </button>
          </div>
        ) : leaderboard?.entries.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-4xl mb-2">🎯</p>
            <p className="text-gray-600">No participants yet for this period.</p>
            <p className="text-gray-500 text-sm">
              Be the first to practice and claim the top spot!
            </p>
          </div>
        ) : (
          <AnimatePresence>
            <div className="space-y-3">
              {leaderboard?.entries.map((entry, index) => (
                <LeaderboardRow
                  key={entry.rank}
                  entry={entry}
                  index={index}
                  getRankBadge={getRankBadge}
                  getRankColor={getRankColor}
                />
              ))}
            </div>
          </AnimatePresence>
        )}

        {!freeUserId && (
          <div className="mt-6 p-4 bg-blue-50 rounded-xl text-center">
            <p className="text-gray-700 mb-2">Register to appear on the leaderboard!</p>
            <button
              onClick={onRequireLogin}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Register Now
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function LeaderboardRow({
  entry,
  index,
  getRankBadge,
  getRankColor,
}: {
  entry: LeaderboardEntry
  index: number
  getRankBadge: (rank: number) => string | null
  getRankColor: (rank: number) => string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`flex items-center gap-4 p-4 rounded-xl border ${
        entry.isCurrentUser
          ? 'bg-blue-50 border-blue-300 ring-2 ring-blue-200'
          : getRankColor(entry.rank)
      }`}
    >
      {/* Rank */}
      <div className="w-12 text-center">
        {getRankBadge(entry.rank) ? (
          <span className="text-2xl">{getRankBadge(entry.rank)}</span>
        ) : (
          <span className="text-lg font-bold text-gray-500">#{entry.rank}</span>
        )}
      </div>

      {/* Avatar & Name */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold">
            {entry.name.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="font-medium text-gray-800 truncate">
              {entry.name}
              {entry.isCurrentUser && (
                <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                  You
                </span>
              )}
            </p>
            <p className="text-xs text-gray-500">{entry.questionsAnswered} questions</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="text-right">
        <p className="font-bold text-blue-600">{entry.xp.toLocaleString()} XP</p>
        <p className="text-xs text-gray-500">{entry.accuracy}% accuracy</p>
      </div>
    </motion.div>
  )
}

// Widget version for sidebar
export function LeaderboardWidget({ freeUserId, onRequireLogin }: LeaderboardProps) {
  return <Leaderboard freeUserId={freeUserId} compact onRequireLogin={onRequireLogin} />
}
