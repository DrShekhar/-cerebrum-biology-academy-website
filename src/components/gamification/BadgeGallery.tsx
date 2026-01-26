'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Star, Lock, X, Sparkles, Filter } from 'lucide-react'

type BadgeRarity = 'COMMON' | 'UNCOMMON' | 'RARE' | 'EPIC' | 'LEGENDARY'
type BadgeCategory = 'STREAKS' | 'MCQ_MASTERY' | 'TEST_PERFORMANCE' | 'CONSISTENCY' | 'SPECIAL'

interface Badge {
  id: string
  name: string
  description: string
  icon: string
  category: BadgeCategory
  rarity: BadgeRarity
  xpReward: number
  isEarned: boolean
  earnedAt: string | null
  progress: number
  maxProgress: number
  requirement: string
}

interface BadgeGalleryProps {
  badges: Badge[]
  earnedCount: number
  totalCount: number
  className?: string
}

const RARITY_CONFIG: Record<
  BadgeRarity,
  {
    name: string
    bgGradient: string
    borderColor: string
    textColor: string
    glowColor: string
  }
> = {
  COMMON: {
    name: 'Common',
    bgGradient: 'from-gray-100 to-gray-200',
    borderColor: 'border-gray-300',
    textColor: 'text-gray-600',
    glowColor: 'shadow-gray-300/50',
  },
  UNCOMMON: {
    name: 'Uncommon',
    bgGradient: 'from-green-100 to-emerald-200',
    borderColor: 'border-green-400',
    textColor: 'text-green-700',
    glowColor: 'shadow-green-400/50',
  },
  RARE: {
    name: 'Rare',
    bgGradient: 'from-blue-100 to-cyan-200',
    borderColor: 'border-blue-500',
    textColor: 'text-blue-700',
    glowColor: 'shadow-blue-500/50',
  },
  EPIC: {
    name: 'Epic',
    bgGradient: 'from-purple-100 to-violet-200',
    borderColor: 'border-purple-500',
    textColor: 'text-purple-700',
    glowColor: 'shadow-purple-500/50',
  },
  LEGENDARY: {
    name: 'Legendary',
    bgGradient: 'from-yellow-100 via-orange-100 to-red-100',
    borderColor: 'border-yellow-500',
    textColor: 'text-yellow-700',
    glowColor: 'shadow-yellow-500/50',
  },
}

const CATEGORY_LABELS: Record<BadgeCategory, string> = {
  STREAKS: 'Streaks',
  MCQ_MASTERY: 'MCQ Mastery',
  TEST_PERFORMANCE: 'Test Performance',
  CONSISTENCY: 'Consistency',
  SPECIAL: 'Special',
}

export function BadgeGallery({
  badges,
  earnedCount,
  totalCount,
  className = '',
}: BadgeGalleryProps) {
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null)
  const [filterRarity, setFilterRarity] = useState<BadgeRarity | 'ALL'>('ALL')
  const [filterCategory, setFilterCategory] = useState<BadgeCategory | 'ALL'>('ALL')
  const [showEarnedOnly, setShowEarnedOnly] = useState(false)

  const filteredBadges = badges.filter((badge) => {
    if (filterRarity !== 'ALL' && badge.rarity !== filterRarity) return false
    if (filterCategory !== 'ALL' && badge.category !== filterCategory) return false
    if (showEarnedOnly && !badge.isEarned) return false
    return true
  })

  const completionRate = totalCount > 0 ? Math.round((earnedCount / totalCount) * 100) : 0

  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold flex items-center">
              <Trophy className="w-6 h-6 mr-2" />
              Badge Collection
            </h3>
            <p className="text-white/90 text-sm mt-1">
              {earnedCount} of {totalCount} badges unlocked
            </p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">{completionRate}%</div>
            <div className="text-xs text-white/80">Complete</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="w-full bg-white/30 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${completionRate}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="bg-white h-3 rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="p-4 border-b border-gray-100 bg-gray-50">
        <div className="flex flex-wrap gap-2 items-center">
          <Filter className="w-4 h-4 text-gray-500" />

          {/* Rarity Filter */}
          <select
            value={filterRarity}
            onChange={(e) => setFilterRarity(e.target.value as BadgeRarity | 'ALL')}
            className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
          >
            <option value="ALL">All Rarities</option>
            {Object.entries(RARITY_CONFIG).map(([key, config]) => (
              <option key={key} value={key}>
                {config.name}
              </option>
            ))}
          </select>

          {/* Category Filter */}
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value as BadgeCategory | 'ALL')}
            className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
          >
            <option value="ALL">All Categories</option>
            {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>

          {/* Earned Only Toggle */}
          <label className="flex items-center space-x-2 text-sm text-gray-600 ml-auto">
            <input
              type="checkbox"
              checked={showEarnedOnly}
              onChange={(e) => setShowEarnedOnly(e.target.checked)}
              className="w-4 h-4 text-yellow-500 rounded focus:ring-yellow-400"
            />
            <span>Earned only</span>
          </label>
        </div>
      </div>

      {/* Badge Grid */}
      <div className="p-6">
        {filteredBadges.length === 0 ? (
          <div className="text-center py-12">
            <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 font-medium">No badges found</p>
            <p className="text-sm text-gray-500 mt-2">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
            {filteredBadges.map((badge, index) => {
              const rarityConfig = RARITY_CONFIG[badge.rarity]
              return (
                <motion.button
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedBadge(badge)}
                  className={`relative p-3 rounded-xl border-2 transition-all hover:scale-105 ${
                    badge.isEarned
                      ? `bg-gradient-to-br ${rarityConfig.bgGradient} ${rarityConfig.borderColor} shadow-lg ${rarityConfig.glowColor}`
                      : 'bg-gray-100 border-gray-200 opacity-60'
                  }`}
                >
                  {/* Legendary shimmer effect */}
                  {badge.isEarned && badge.rarity === 'LEGENDARY' && (
                    <div className="absolute inset-0 rounded-xl overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                    </div>
                  )}

                  {/* Badge Icon */}
                  <div className="relative text-4xl mb-2 text-center">
                    {badge.isEarned ? badge.icon : '🔒'}
                  </div>

                  {/* Badge Name (truncated) */}
                  <div
                    className={`text-xs font-medium text-center truncate ${
                      badge.isEarned ? rarityConfig.textColor : 'text-gray-500'
                    }`}
                  >
                    {badge.name}
                  </div>

                  {/* Progress indicator for locked badges */}
                  {!badge.isEarned && badge.progress > 0 && (
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-1">
                        <div
                          className="bg-gray-400 h-1 rounded-full"
                          style={{ width: `${(badge.progress / badge.maxProgress) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Rarity indicator dot */}
                  <div
                    className={`absolute top-1 right-1 w-2 h-2 rounded-full ${
                      badge.isEarned
                        ? badge.rarity === 'LEGENDARY'
                          ? 'bg-yellow-500'
                          : badge.rarity === 'EPIC'
                            ? 'bg-purple-500'
                            : badge.rarity === 'RARE'
                              ? 'bg-blue-500'
                              : badge.rarity === 'UNCOMMON'
                                ? 'bg-green-500'
                                : 'bg-gray-400'
                        : 'bg-gray-300'
                    }`}
                  />
                </motion.button>
              )
            })}
          </div>
        )}
      </div>

      {/* Badge Detail Modal */}
      <AnimatePresence>
        {selectedBadge && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedBadge(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl"
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedBadge(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Badge Display */}
              <div className="text-center">
                <div
                  className={`w-24 h-24 mx-auto rounded-2xl flex items-center justify-center text-5xl mb-4 ${
                    selectedBadge.isEarned
                      ? `bg-gradient-to-br ${RARITY_CONFIG[selectedBadge.rarity].bgGradient} border-2 ${RARITY_CONFIG[selectedBadge.rarity].borderColor} shadow-lg`
                      : 'bg-gray-100 border-2 border-gray-200'
                  }`}
                >
                  {selectedBadge.isEarned ? selectedBadge.icon : '🔒'}
                </div>

                {/* Rarity Badge */}
                <div
                  className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold mb-3 ${`bg-gradient-to-r ${RARITY_CONFIG[selectedBadge.rarity].bgGradient} ${RARITY_CONFIG[selectedBadge.rarity].textColor}`}`}
                >
                  <Sparkles className="w-3 h-3" />
                  <span>{RARITY_CONFIG[selectedBadge.rarity].name}</span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedBadge.name}</h3>
                <p className="text-gray-600 mb-4">{selectedBadge.description}</p>

                {/* Category */}
                <div className="text-sm text-gray-500 mb-4">
                  Category: {CATEGORY_LABELS[selectedBadge.category]}
                </div>

                {/* XP Reward */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-center space-x-2 text-yellow-700">
                    <Star className="w-5 h-5" />
                    <span className="font-bold text-lg">{selectedBadge.xpReward} XP</span>
                  </div>
                </div>

                {/* Earned Info or Progress */}
                {selectedBadge.isEarned ? (
                  <div className="flex items-center justify-center space-x-2 text-green-600">
                    <Trophy className="w-5 h-5" />
                    <span className="font-medium">
                      Earned{' '}
                      {selectedBadge.earnedAt
                        ? new Date(selectedBadge.earnedAt).toLocaleDateString()
                        : 'recently'}
                    </span>
                  </div>
                ) : (
                  <div>
                    <div className="text-sm text-gray-600 mb-2">
                      <Lock className="w-4 h-4 inline mr-1" />
                      {selectedBadge.requirement}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all"
                        style={{
                          width: `${(selectedBadge.progress / selectedBadge.maxProgress) * 100}%`,
                        }}
                      />
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {selectedBadge.progress} / {selectedBadge.maxProgress}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add shimmer animation styles */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  )
}
