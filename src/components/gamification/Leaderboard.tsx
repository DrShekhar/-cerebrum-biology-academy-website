'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Trophy,
  Medal,
  Crown,
  TrendingUp,
  TrendingDown,
  Minus,
  Users,
  Globe,
  Calendar,
  ChevronDown,
  Flame,
  Zap,
} from 'lucide-react'

type LeaderboardScope = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'ALL_TIME'
type LeaderboardType = 'CLASS' | 'BATCH' | 'GLOBAL'

interface LeaderboardEntry {
  rank: number
  previousRank: number | null
  userId: string
  userName: string
  userAvatar: string | null
  xp: number
  level: number
  streakDays: number
  isCurrentUser: boolean
}

interface LeaderboardProps {
  entries: LeaderboardEntry[]
  currentUserEntry?: LeaderboardEntry | null
  scope: LeaderboardScope
  type: LeaderboardType
  onScopeChange?: (scope: LeaderboardScope) => void
  onTypeChange?: (type: LeaderboardType) => void
  isLoading?: boolean
  className?: string
}

const SCOPE_LABELS: Record<LeaderboardScope, string> = {
  DAILY: 'Today',
  WEEKLY: 'This Week',
  MONTHLY: 'This Month',
  ALL_TIME: 'All Time',
}

const TYPE_CONFIG: Record<LeaderboardType, {
  label: string
  icon: React.ComponentType<{ className?: string }>
}> = {
  CLASS: { label: 'Class', icon: Users },
  BATCH: { label: 'Batch', icon: Users },
  GLOBAL: { label: 'Global', icon: Globe },
}

function getRankChange(current: number, previous: number | null): {
  direction: 'up' | 'down' | 'same'
  amount: number
} {
  if (previous === null) return { direction: 'same', amount: 0 }
  const diff = previous - current
  if (diff > 0) return { direction: 'up', amount: diff }
  if (diff < 0) return { direction: 'down', amount: Math.abs(diff) }
  return { direction: 'same', amount: 0 }
}

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) {
    return (
      <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
        <Crown className="w-5 h-5 text-white" />
      </div>
    )
  }
  if (rank === 2) {
    return (
      <div className="w-10 h-10 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center shadow-lg">
        <Medal className="w-5 h-5 text-white" />
      </div>
    )
  }
  if (rank === 3) {
    return (
      <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full flex items-center justify-center shadow-lg">
        <Medal className="w-5 h-5 text-white" />
      </div>
    )
  }
  return (
    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
      <span className="text-sm font-bold text-gray-600">{rank}</span>
    </div>
  )
}

function LeaderboardRow({ entry, index }: { entry: LeaderboardEntry; index: number }) {
  const rankChange = getRankChange(entry.rank, entry.previousRank)

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`flex items-center p-4 ${
        entry.isCurrentUser
          ? 'bg-gradient-to-r from-purple-50 to-indigo-50 border-l-4 border-purple-500'
          : index % 2 === 0
          ? 'bg-white'
          : 'bg-gray-50'
      }`}
    >
      {/* Rank */}
      <div className="flex-shrink-0 w-16 flex items-center space-x-2">
        <RankBadge rank={entry.rank} />
      </div>

      {/* Rank Change Indicator */}
      <div className="flex-shrink-0 w-8">
        {rankChange.direction === 'up' && (
          <div className="flex items-center text-green-600">
            <TrendingUp className="w-4 h-4" />
            <span className="text-xs font-medium">{rankChange.amount}</span>
          </div>
        )}
        {rankChange.direction === 'down' && (
          <div className="flex items-center text-red-600">
            <TrendingDown className="w-4 h-4" />
            <span className="text-xs font-medium">{rankChange.amount}</span>
          </div>
        )}
        {rankChange.direction === 'same' && (
          <div className="flex items-center text-gray-400">
            <Minus className="w-4 h-4" />
          </div>
        )}
      </div>

      {/* User Info */}
      <div className="flex-1 flex items-center space-x-3 min-w-0">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {entry.userAvatar ? (
            <Image
              src={entry.userAvatar}
              alt={entry.userName}
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
              {entry.userName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* Name and Level */}
        <div className="min-w-0">
          <div className="flex items-center space-x-2">
            <span className={`font-semibold truncate ${entry.isCurrentUser ? 'text-purple-700' : 'text-gray-900'}`}>
              {entry.userName}
              {entry.isCurrentUser && <span className="text-purple-500 ml-1">(You)</span>}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>Level {entry.level}</span>
            {entry.streakDays > 0 && (
              <span className="flex items-center text-orange-500">
                <Flame className="w-3 h-3 mr-0.5" />
                {entry.streakDays}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* XP */}
      <div className="flex-shrink-0 text-right">
        <div className="flex items-center space-x-1 text-yellow-600 font-bold">
          <Zap className="w-4 h-4" />
          <span>{entry.xp.toLocaleString()}</span>
        </div>
        <div className="text-xs text-gray-500">XP</div>
      </div>
    </motion.div>
  )
}

export function Leaderboard({
  entries,
  currentUserEntry,
  scope,
  type,
  onScopeChange,
  onTypeChange,
  isLoading = false,
  className = '',
}: LeaderboardProps) {
  const [showScopeDropdown, setShowScopeDropdown] = useState(false)
  const [showTypeDropdown, setShowTypeDropdown] = useState(false)

  const TypeIcon = TYPE_CONFIG[type].icon

  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 p-4 sm:p-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-lg sm:text-xl font-bold flex items-center">
              <Trophy className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
              Leaderboard
            </h3>
            <p className="text-white/90 text-xs sm:text-sm mt-1">
              Compete with others and climb the ranks
            </p>
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-2 self-end sm:self-auto">
            {/* Type Filter */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowTypeDropdown(!showTypeDropdown)
                  setShowScopeDropdown(false)
                }}
                className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                <TypeIcon className="w-4 h-4" />
                <span>{TYPE_CONFIG[type].label}</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              <AnimatePresence>
                {showTypeDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-10"
                  >
                    {Object.entries(TYPE_CONFIG).map(([key, config]) => {
                      const Icon = config.icon
                      return (
                        <button
                          key={key}
                          onClick={() => {
                            onTypeChange?.(key as LeaderboardType)
                            setShowTypeDropdown(false)
                          }}
                          className={`w-full flex items-center space-x-2 px-4 py-2 text-sm hover:bg-gray-50 ${
                            type === key ? 'bg-purple-50 text-purple-700' : 'text-gray-700'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span>{config.label}</span>
                        </button>
                      )
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Scope Filter */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowScopeDropdown(!showScopeDropdown)
                  setShowTypeDropdown(false)
                }}
                className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                <Calendar className="w-4 h-4" />
                <span>{SCOPE_LABELS[scope]}</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              <AnimatePresence>
                {showScopeDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-10"
                  >
                    {Object.entries(SCOPE_LABELS).map(([key, label]) => (
                      <button
                        key={key}
                        onClick={() => {
                          onScopeChange?.(key as LeaderboardScope)
                          setShowScopeDropdown(false)
                        }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                          scope === key ? 'bg-purple-50 text-purple-700' : 'text-gray-700'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard List */}
      <div className="divide-y divide-gray-100">
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-yellow-500 border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-gray-500">Loading leaderboard...</p>
          </div>
        ) : entries.length === 0 ? (
          <div className="p-8 text-center">
            <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 font-medium">No entries yet</p>
            <p className="text-sm text-gray-400 mt-1">
              Be the first to earn XP and claim the top spot!
            </p>
          </div>
        ) : (
          <>
            {/* Top 3 Podium */}
            {entries.length >= 3 && (
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-4 sm:p-6">
                <div className="flex items-end justify-center space-x-2 sm:space-x-4">
                  {/* 2nd Place */}
                  {entries[1] && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-center"
                    >
                      <div className="relative">
                        {entries[1].userAvatar ? (
                          <Image
                            src={entries[1].userAvatar}
                            alt={entries[1].userName}
                            width={64}
                            height={64}
                            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 sm:border-4 border-gray-300 mx-auto"
                          />
                        ) : (
                          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-xl border-2 sm:border-4 border-gray-300 mx-auto">
                            {entries[1].userName.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gray-300 text-white w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-xs font-bold">
                          2
                        </div>
                      </div>
                      <div className="mt-3 font-semibold text-gray-700 truncate max-w-[60px] sm:max-w-[80px] text-xs sm:text-sm">
                        {entries[1].userName}
                      </div>
                      <div className="text-xs sm:text-sm text-yellow-600 font-medium">
                        {entries[1].xp.toLocaleString()} XP
                      </div>
                      <div className="h-12 w-12 sm:h-16 sm:w-16 bg-gray-300 rounded-t-lg mt-2 mx-auto" />
                    </motion.div>
                  )}

                  {/* 1st Place */}
                  {entries[0] && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-center"
                    >
                      <div className="relative">
                        <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500 absolute -top-5 sm:-top-6 left-1/2 -translate-x-1/2" />
                        {entries[0].userAvatar ? (
                          <Image
                            src={entries[0].userAvatar}
                            alt={entries[0].userName}
                            width={80}
                            height={80}
                            className="w-14 h-14 sm:w-20 sm:h-20 rounded-full object-cover border-2 sm:border-4 border-yellow-400 mx-auto"
                          />
                        ) : (
                          <div className="w-14 h-14 sm:w-20 sm:h-20 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-2xl border-2 sm:border-4 border-yellow-400 mx-auto">
                            {entries[0].userName.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-yellow-500 text-white w-5 h-5 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">
                          1
                        </div>
                      </div>
                      <div className="mt-3 font-bold text-gray-900 truncate max-w-[70px] sm:max-w-[100px] text-xs sm:text-sm">
                        {entries[0].userName}
                      </div>
                      <div className="text-xs sm:text-sm text-yellow-600 font-bold">
                        {entries[0].xp.toLocaleString()} XP
                      </div>
                      <div className="h-16 w-14 sm:h-24 sm:w-20 bg-yellow-400 rounded-t-lg mt-2 mx-auto" />
                    </motion.div>
                  )}

                  {/* 3rd Place */}
                  {entries[2] && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-center"
                    >
                      <div className="relative">
                        {entries[2].userAvatar ? (
                          <Image
                            src={entries[2].userAvatar}
                            alt={entries[2].userName}
                            width={56}
                            height={56}
                            className="w-10 h-10 sm:w-14 sm:h-14 rounded-full object-cover border-2 sm:border-4 border-amber-600 mx-auto"
                          />
                        ) : (
                          <div className="w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-lg border-2 sm:border-4 border-amber-600 mx-auto">
                            {entries[2].userName.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-amber-600 text-white w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold">
                          3
                        </div>
                      </div>
                      <div className="mt-3 font-semibold text-gray-700 truncate max-w-[50px] sm:max-w-[70px] text-xs sm:text-sm">
                        {entries[2].userName}
                      </div>
                      <div className="text-xs sm:text-sm text-yellow-600 font-medium">
                        {entries[2].xp.toLocaleString()} XP
                      </div>
                      <div className="h-8 w-10 sm:h-12 sm:w-14 bg-amber-600 rounded-t-lg mt-2 mx-auto" />
                    </motion.div>
                  )}
                </div>
              </div>
            )}

            {/* Remaining Entries */}
            <div>
              {entries.slice(3).map((entry, index) => (
                <LeaderboardRow key={entry.userId} entry={entry} index={index} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Current User Footer (if not in top list) */}
      {currentUserEntry && currentUserEntry.rank > 10 && (
        <div className="border-t-2 border-purple-200 bg-purple-50">
          <LeaderboardRow entry={currentUserEntry} index={0} />
        </div>
      )}
    </div>
  )
}
