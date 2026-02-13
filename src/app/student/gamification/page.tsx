'use client'

import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Trophy, Flame, Target, Users, Crown, Sparkles, Star, Zap } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

import {
  XPProgressCard,
  StreakWidget,
  StreakProtectionWidget,
  BadgeGallery,
  GoalProgressCard,
  NotificationPopover,
  Leaderboard,
  useGamification,
  useStreak,
  useBadges,
  useNotifications,
  useLeaderboard,
  useGoals,
} from '@/components/gamification'

type LeaderboardScope = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'ALL_TIME'
type LeaderboardType = 'CLASS' | 'BATCH' | 'GLOBAL'

export default function GamificationDashboard() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth()
  const [activeTab, setActiveTab] = useState<'overview' | 'badges' | 'leaderboard' | 'goals'>(
    'overview'
  )

  const {
    gamification,
    isLoading: gamificationLoading,
    error: gamificationError,
  } = useGamification()
  const { status: streakStatus, config: streakConfig, useFreeze, recoverStreak } = useStreak()
  const {
    earned: earnedBadges,
    inProgress: inProgressBadges,
    available: availableBadges,
    showcased,
    toggleShowcase,
    completionPercentage,
    totalBadges,
    earnedCount,
  } = useBadges()
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications({ limit: 5 })
  const { leaderboard, setPeriod } = useLeaderboard({ limit: 10 })
  const { dailyGoals, weeklyGoals, summary: goalSummary } = useGoals()

  // Leaderboard state for type switching
  const [leaderboardType, setLeaderboardType] = useState<LeaderboardType>('GLOBAL')

  const isLoading = authLoading || gamificationLoading

  // Combine all badges for BadgeGallery
  const allBadges = useMemo(() => {
    return [...earnedBadges, ...inProgressBadges, ...availableBadges]
  }, [earnedBadges, inProgressBadges, availableBadges])

  // Combine all goals for GoalProgressCard
  const allGoals = useMemo(() => {
    const daily = dailyGoals.map((item) => item.goal)
    const weekly = weeklyGoals.map((item) => item.goal)
    return [...daily, ...weekly]
  }, [dailyGoals, weeklyGoals])

  // Transform leaderboard entries to match component interface
  const leaderboardEntries = useMemo(() => {
    if (!leaderboard?.entries) return []
    return leaderboard.entries.map((entry) => ({
      rank: entry.rank,
      previousRank: entry.previousRank ?? null,
      userId: entry.userId || entry.freeUserId || '',
      userName: entry.name,
      userAvatar: entry.avatarUrl || null,
      xp: entry.xp,
      level: entry.level || 1,
      streakDays: 0, // Not available in current hook
      isCurrentUser: entry.isCurrentUser || false,
    }))
  }, [leaderboard?.entries])

  // Find current user's leaderboard entry
  const currentUserLeaderboardEntry = useMemo(() => {
    return leaderboardEntries.find((entry) => entry.isCurrentUser) || null
  }, [leaderboardEntries])

  if (isLoading) {
    return <LoadingSkeleton />
  }

  if (gamificationError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Unable to Load Gamification
            </h3>
            <p className="text-gray-600 mb-4">{gamificationError}</p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'badges', label: 'Badges', icon: <Trophy className="w-4 h-4" /> },
    { id: 'leaderboard', label: 'Leaderboard', icon: <Users className="w-4 h-4" /> },
    { id: 'goals', label: 'Goals', icon: <Target className="w-4 h-4" /> },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
                <Crown className="w-8 h-8 text-yellow-400" />
                Achievements & Progress
              </h1>
              <p className="text-slate-300 mt-2">
                Track your learning journey, earn badges, and compete with others
              </p>
            </div>

            {/* Notification Bell */}
            <div className="flex items-center gap-3">
              <NotificationPopover
                notifications={notifications}
                unreadCount={unreadCount}
                onMarkAsRead={markAsRead}
                onMarkAllAsRead={markAllAsRead}
              />
              <Link href="/student/dashboard">
                <Button variant="outline" className="text-white border-white/30 hover:bg-white/10">
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick Stats Bar */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <QuickStatBadge
              icon={<Star className="w-5 h-5" />}
              label="Level"
              value={gamification?.currentLevel || 1}
              color="bg-yellow-500"
            />
            <QuickStatBadge
              icon={<Zap className="w-5 h-5" />}
              label="Total XP"
              value={gamification?.totalPoints?.toLocaleString() || '0'}
              color="bg-blue-500"
            />
            <QuickStatBadge
              icon={<Flame className="w-5 h-5" />}
              label="Streak"
              value={`${streakStatus?.currentStreak || 0} days`}
              color="bg-orange-500"
            />
            <QuickStatBadge
              icon={<Trophy className="w-5 h-5" />}
              label="Badges"
              value={`${earnedCount}/${totalBadges}`}
              color="bg-purple-500"
            />
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 overflow-x-auto py-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors',
                  activeTab === tab.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                )}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <OverviewTab
            gamification={gamification}
            streakStatus={streakStatus}
            streakConfig={streakConfig}
            useFreeze={useFreeze}
            recoverStreak={recoverStreak}
            showcased={showcased}
            allGoals={allGoals}
            goalSummary={goalSummary}
            leaderboardEntries={leaderboardEntries}
            currentUserLeaderboardEntry={currentUserLeaderboardEntry}
            leaderboardScope={(leaderboard?.period || 'WEEKLY') as LeaderboardScope}
            leaderboardType={leaderboardType}
          />
        )}

        {activeTab === 'badges' && (
          <BadgesTab
            allBadges={allBadges}
            earnedCount={earnedCount}
            totalBadges={totalBadges}
            completionPercentage={completionPercentage}
          />
        )}

        {activeTab === 'leaderboard' && (
          <LeaderboardTab
            entries={leaderboardEntries}
            currentUserEntry={currentUserLeaderboardEntry}
            scope={(leaderboard?.period || 'WEEKLY') as LeaderboardScope}
            type={leaderboardType}
            onScopeChange={(scope) => setPeriod(scope)}
            onTypeChange={setLeaderboardType}
          />
        )}

        {activeTab === 'goals' && (
          <GoalsTab
            allGoals={allGoals}
            currentStreakDays={streakStatus?.currentStreak || 0}
            goalSummary={goalSummary}
          />
        )}
      </div>
    </div>
  )
}

// Tab Components

function OverviewTab({
  gamification,
  streakStatus,
  streakConfig,
  useFreeze,
  recoverStreak,
  showcased,
  allGoals,
  goalSummary,
  leaderboardEntries,
  currentUserLeaderboardEntry,
  leaderboardScope,
  leaderboardType,
}: {
  gamification: any
  streakStatus: any
  streakConfig: any
  useFreeze: () => Promise<any>
  recoverStreak: () => Promise<any>
  showcased: any[]
  allGoals: any[]
  goalSummary: any
  leaderboardEntries: any[]
  currentUserLeaderboardEntry: any
  leaderboardScope: LeaderboardScope
  leaderboardType: LeaderboardType
}) {
  // Create streak milestone from gamification data
  const streakMilestone = gamification?.streak?.nextMilestone || { days: 7, reward: 100 }

  return (
    <div className="space-y-8">
      {/* XP & Level Progress */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Experience & Level</h2>
        <XPProgressCard
          totalPoints={gamification?.totalPoints || 0}
          currentLevel={gamification?.currentLevel || 1}
          xpInCurrentLevel={gamification?.xpInCurrentLevel || 0}
          xpNeededForNextLevel={gamification?.xpNeededForNextLevel || 100}
          levelProgress={gamification?.levelProgress || 0}
        />
      </section>

      {/* Streak Section */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Learning Streak</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StreakWidget
            studyStreak={streakStatus?.currentStreak || 0}
            longestStreak={streakStatus?.longestStreak || 0}
            streakMilestone={streakMilestone}
          />
          {streakStatus && streakConfig && (
            <StreakProtectionWidget
              status={streakStatus}
              maxFreezesPerWeek={streakConfig.maxFreezesPerWeek}
              onUseFreeze={useFreeze}
              onRecoverStreak={recoverStreak}
            />
          )}
        </div>
      </section>

      {/* Showcased Badges */}
      {showcased.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Showcased Badges</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {showcased.map((badge) => (
              <BadgeCard key={badge.id} badge={badge} />
            ))}
          </div>
        </section>
      )}

      {/* Goals Preview */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Today's Goals</h2>
          <span className="text-sm text-gray-600">
            {goalSummary?.completedToday || 0} of {goalSummary?.totalGoals || allGoals.length}{' '}
            completed
          </span>
        </div>
        {allGoals.length > 0 ? (
          <GoalProgressCard
            goals={allGoals.slice(0, 4)}
            currentStreakDays={streakStatus?.currentStreak || 0}
          />
        ) : (
          <Card>
            <CardContent className="p-6 text-center">
              <Target className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">
                No goals set yet. Complete activities to unlock goals!
              </p>
            </CardContent>
          </Card>
        )}
      </section>

      {/* Leaderboard Preview */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Leaderboard</h2>
        </div>
        <Leaderboard
          entries={leaderboardEntries.slice(0, 5)}
          currentUserEntry={currentUserLeaderboardEntry}
          scope={leaderboardScope}
          type={leaderboardType}
        />
      </section>
    </div>
  )
}

function BadgesTab({
  allBadges,
  earnedCount,
  totalBadges,
  completionPercentage,
}: {
  allBadges: any[]
  earnedCount: number
  totalBadges: number
  completionPercentage: number
}) {
  return (
    <div className="space-y-8">
      {/* Progress Overview */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Badge Collection Progress</h3>
              <p className="text-gray-600 mt-1">
                You've earned {earnedCount} badges ({Math.round(completionPercentage)}% complete)
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-purple-600">
                {Math.round(completionPercentage)}%
              </div>
              <p className="text-sm text-gray-500">Collection Complete</p>
            </div>
          </div>
          <div className="mt-4 h-3 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${completionPercentage}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"
            />
          </div>
        </CardContent>
      </Card>

      {/* Badge Gallery */}
      <BadgeGallery badges={allBadges} earnedCount={earnedCount} totalCount={totalBadges} />
    </div>
  )
}

function LeaderboardTab({
  entries,
  currentUserEntry,
  scope,
  type,
  onScopeChange,
  onTypeChange,
}: {
  entries: any[]
  currentUserEntry: any
  scope: LeaderboardScope
  type: LeaderboardType
  onScopeChange: (scope: LeaderboardScope) => void
  onTypeChange: (type: LeaderboardType) => void
}) {
  return (
    <div className="space-y-6">
      {/* Full Leaderboard */}
      <Leaderboard
        entries={entries}
        currentUserEntry={currentUserEntry}
        scope={scope}
        type={type}
        onScopeChange={onScopeChange}
        onTypeChange={onTypeChange}
      />
    </div>
  )
}

function GoalsTab({
  allGoals,
  currentStreakDays,
  goalSummary,
}: {
  allGoals: any[]
  currentStreakDays: number
  goalSummary: any
}) {
  return (
    <div className="space-y-8">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-green-600">
              {goalSummary?.completedToday || 0}
            </div>
            <p className="text-sm text-gray-600 mt-1">Completed Today</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-blue-600">{goalSummary?.dailyStreak || 0}</div>
            <p className="text-sm text-gray-600 mt-1">Goal Streak (Days)</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-purple-600">
              {goalSummary?.totalXpFromGoals?.toLocaleString() || 0}
            </div>
            <p className="text-sm text-gray-600 mt-1">XP from Goals</p>
          </CardContent>
        </Card>
      </div>

      {/* Goals Card */}
      {allGoals.length > 0 ? (
        <GoalProgressCard goals={allGoals} currentStreakDays={currentStreakDays} />
      ) : (
        <Card>
          <CardContent className="p-6 text-center">
            <Target className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">No goals set. Complete activities to unlock goals!</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// Helper Components

function QuickStatBadge({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode
  label: string
  value: string | number
  color: string
}) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center gap-3">
      <div
        className={cn('w-10 h-10 rounded-lg flex items-center justify-center text-white', color)}
      >
        {icon}
      </div>
      <div>
        <p className="text-xs text-slate-300">{label}</p>
        <p className="text-lg font-bold text-white">{value}</p>
      </div>
    </div>
  )
}

function BadgeCard({ badge }: { badge: any }) {
  const rarityColors = {
    COMMON: 'from-gray-400 to-gray-500',
    UNCOMMON: 'from-green-400 to-green-500',
    RARE: 'from-blue-400 to-blue-500',
    EPIC: 'from-purple-400 to-purple-500',
    LEGENDARY: 'from-yellow-400 to-orange-500',
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'w-12 h-12 rounded-full bg-gradient-to-br flex items-center justify-center text-2xl',
              rarityColors[badge.rarity as keyof typeof rarityColors] || rarityColors.COMMON
            )}
          >
            {badge.icon || '🏆'}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-gray-900 truncate">{badge.name}</h4>
            <p className="text-xs text-gray-500 truncate">{badge.description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-white/20 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-white/20 rounded w-1/2"></div>
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-20 bg-white/10 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-48 bg-gray-200 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
