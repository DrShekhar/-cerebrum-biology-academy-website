'use client'

import React, { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import {
  TrophyIcon,
  FireIcon,
  StarIcon,
  BoltIcon,
  AcademicCapIcon,
  UserGroupIcon,
  CheckCircleIcon,
  ClockIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline'
import { TrophyIcon as TrophySolidIcon } from '@heroicons/react/24/solid'

interface Achievement {
  id: string
  type: string
  title: string
  description: string
  icon: string
  points: number
  currentProgress: number
  targetProgress: number
  isCompleted: boolean
  earnedAt?: Date
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary'
}

interface UserProgress {
  totalPoints: number
  studyStreak: number
  level: number
  xpToNextLevel: number
  totalXP: number
  rank: number
  achievements: Achievement[]
  dailyGoal: {
    target: number
    completed: number
    streak: number
  }
}

interface GamificationSystemProps {
  className?: string
  userId?: string
}

const GamificationSystem = ({ className, userId }: GamificationSystemProps) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'achievements' | 'leaderboard'>(
    'overview'
  )

  // Sample user progress data
  const userProgress: UserProgress = {
    totalPoints: 2847,
    studyStreak: 12,
    level: 8,
    xpToNextLevel: 453,
    totalXP: 5547,
    rank: 23,
    achievements: [
      {
        id: '1',
        type: 'FIRST_TEST',
        title: 'First Steps',
        description: 'Complete your first practice test',
        icon: '🎯',
        points: 100,
        currentProgress: 1,
        targetProgress: 1,
        isCompleted: true,
        earnedAt: new Date('2024-01-15'),
        rarity: 'Common',
      },
      {
        id: '2',
        type: 'STREAK_7_DAYS',
        title: 'Week Warrior',
        description: 'Study for 7 days in a row',
        icon: '🔥',
        points: 250,
        currentProgress: 7,
        targetProgress: 7,
        isCompleted: true,
        earnedAt: new Date('2024-01-20'),
        rarity: 'Rare',
      },
      {
        id: '3',
        type: 'STREAK_30_DAYS',
        title: 'Study Master',
        description: 'Maintain a 30-day study streak',
        icon: '⚡',
        points: 500,
        currentProgress: 12,
        targetProgress: 30,
        isCompleted: false,
        rarity: 'Epic',
      },
      {
        id: '4',
        type: 'PERFECTIONIST',
        title: 'Perfect Score',
        description: 'Score 100% on any test',
        icon: '⭐',
        points: 300,
        currentProgress: 0,
        targetProgress: 1,
        isCompleted: false,
        rarity: 'Rare',
      },
      {
        id: '5',
        type: 'TOPIC_MASTER',
        title: 'Cell Biology Expert',
        description: 'Master all Cell Biology topics',
        icon: '🧬',
        points: 400,
        currentProgress: 8,
        targetProgress: 12,
        isCompleted: false,
        rarity: 'Epic',
      },
    ],
    dailyGoal: {
      target: 5, // 5 questions per day
      completed: 3,
      streak: 12,
    },
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common':
        return 'from-gray-400 to-gray-500'
      case 'Rare':
        return 'from-blue-400 to-blue-600'
      case 'Epic':
        return 'from-purple-400 to-purple-600'
      case 'Legendary':
        return 'from-yellow-400 to-yellow-600'
      default:
        return 'from-gray-400 to-gray-500'
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500'
    if (progress >= 60) return 'bg-yellow-500'
    if (progress >= 40) return 'bg-orange-500'
    return 'bg-red-500'
  }

  const sampleLeaderboard = [
    { rank: 1, name: 'Aarav K.', points: 8950, avatar: '👑' },
    { rank: 2, name: 'Priya S.', points: 7823, avatar: '🥈' },
    { rank: 3, name: 'Rohan M.', points: 6741, avatar: '🥉' },
    { rank: 4, name: 'Ananya R.', points: 5982, avatar: '📚' },
    { rank: 5, name: 'Vikram J.', points: 5647, avatar: '🎯' },
    // ... current user
    { rank: 23, name: 'You', points: userProgress.totalPoints, avatar: '✨', isCurrentUser: true },
  ]

  return (
    <div className={cn('max-w-6xl mx-auto', className)}>
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 text-white rounded-xl p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Your Learning Journey</h1>
            <p className="text-lg opacity-90">
              Level {userProgress.level} • Rank #{userProgress.rank}
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{userProgress.totalPoints.toLocaleString()}</div>
            <div className="text-sm opacity-90">Total Points</div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <FireIcon className="h-6 w-6 mx-auto mb-2" />
            <div className="text-2xl font-bold">{userProgress.studyStreak}</div>
            <div className="text-sm opacity-90">Day Streak</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <TrophyIcon className="h-6 w-6 mx-auto mb-2" />
            <div className="text-2xl font-bold">
              {userProgress.achievements.filter((a) => a.isCompleted).length}
            </div>
            <div className="text-sm opacity-90">Achievements</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <ChartBarIcon className="h-6 w-6 mx-auto mb-2" />
            <div className="text-2xl font-bold">#{userProgress.rank}</div>
            <div className="text-sm opacity-90">Global Rank</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <StarIcon className="h-6 w-6 mx-auto mb-2" />
            <div className="text-2xl font-bold">{userProgress.level}</div>
            <div className="text-sm opacity-90">Level</div>
          </div>
        </div>

        {/* Level Progress */}
        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span>Level {userProgress.level}</span>
            <span>
              {userProgress.xpToNextLevel} XP to Level {userProgress.level + 1}
            </span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${((1000 - userProgress.xpToNextLevel) / 1000) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-2 mb-8">
        {['overview', 'achievements', 'leaderboard'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={cn(
              'px-6 py-3 rounded-lg font-medium transition-all capitalize',
              activeTab === tab
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50 shadow-md'
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'overview' && (
        <div className="grid md:grid-cols-2 gap-8">
          {/* Daily Goal */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircleIcon className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Daily Goal</h3>
                <p className="text-gray-600">
                  Complete {userProgress.dailyGoal.target} practice questions
                </p>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Progress</span>
                <span>
                  {userProgress.dailyGoal.completed}/{userProgress.dailyGoal.target}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={cn(
                    'h-3 rounded-full transition-all duration-500',
                    getProgressColor(
                      (userProgress.dailyGoal.completed / userProgress.dailyGoal.target) * 100
                    )
                  )}
                  style={{
                    width: `${Math.min((userProgress.dailyGoal.completed / userProgress.dailyGoal.target) * 100, 100)}%`,
                  }}
                ></div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <FireIcon className="h-5 w-5 text-orange-600" />
                <span className="font-medium text-orange-800">Streak Bonus</span>
              </div>
              <p className="text-sm text-orange-700">
                {userProgress.dailyGoal.streak} days in a row! Keep it up for bonus XP.
              </p>
            </div>
          </div>

          {/* Recent Achievements */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <TrophyIcon className="h-6 w-6 text-yellow-600" />
              Recent Achievements
            </h3>

            <div className="space-y-4">
              {userProgress.achievements
                .filter((a) => a.isCompleted)
                .slice(0, 3)
                .map((achievement) => (
                  <div
                    key={achievement.id}
                    className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <div className="font-medium">{achievement.title}</div>
                      <div className="text-sm text-gray-600">{achievement.description}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-yellow-600">+{achievement.points}</div>
                      <div className="text-xs text-gray-500">XP</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Study Insights */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-6">Study Insights</h3>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Best subject</span>
                <span className="font-medium">Cell Biology (92%)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Average study time</span>
                <span className="font-medium">45 min/day</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total questions solved</span>
                <span className="font-medium">1,247</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Success rate</span>
                <span className="font-medium text-green-600">78%</span>
              </div>
            </div>
          </div>

          {/* Next Milestones */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-6">Next Milestones</h3>

            <div className="space-y-4">
              {userProgress.achievements
                .filter((a) => !a.isCompleted)
                .slice(0, 3)
                .map((achievement) => (
                  <div key={achievement.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-xl opacity-60">{achievement.icon}</div>
                      <div className="flex-1">
                        <div className="font-medium">{achievement.title}</div>
                        <div className="text-sm text-gray-600">{achievement.description}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-blue-600">{achievement.points}</div>
                        <div className="text-xs text-gray-500">XP</div>
                      </div>
                    </div>

                    <div className="mb-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Progress</span>
                        <span>
                          {achievement.currentProgress}/{achievement.targetProgress}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                          style={{
                            width: `${(achievement.currentProgress / achievement.targetProgress) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'achievements' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userProgress.achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={cn(
                'rounded-xl shadow-lg p-6 transition-all duration-300',
                achievement.isCompleted
                  ? 'bg-gradient-to-br from-white to-yellow-50 border-2 border-yellow-200 hover:shadow-xl'
                  : 'bg-white border-2 border-gray-200 hover:border-gray-300'
              )}
            >
              <div className="text-center mb-4">
                <div
                  className={cn(
                    'w-16 h-16 mx-auto rounded-full flex items-center justify-center text-2xl mb-3',
                    achievement.isCompleted
                      ? `bg-gradient-to-r ${getRarityColor(achievement.rarity)}`
                      : 'bg-gray-100'
                  )}
                >
                  {achievement.icon}
                </div>

                <h3
                  className={cn(
                    'text-lg font-bold mb-2',
                    achievement.isCompleted ? 'text-gray-900' : 'text-gray-500'
                  )}
                >
                  {achievement.title}
                </h3>

                <p
                  className={cn(
                    'text-sm mb-3',
                    achievement.isCompleted ? 'text-gray-700' : 'text-gray-500'
                  )}
                >
                  {achievement.description}
                </p>

                <div className="flex items-center justify-center gap-2 mb-3">
                  <span
                    className={cn(
                      'text-xs px-2 py-1 rounded-full font-medium',
                      achievement.rarity === 'Common' && 'bg-gray-100 text-gray-700',
                      achievement.rarity === 'Rare' && 'bg-blue-100 text-blue-700',
                      achievement.rarity === 'Epic' && 'bg-purple-100 text-purple-700',
                      achievement.rarity === 'Legendary' && 'bg-yellow-100 text-yellow-700'
                    )}
                  >
                    {achievement.rarity}
                  </span>
                  <span className="font-bold text-yellow-600">+{achievement.points} XP</span>
                </div>
              </div>

              {!achievement.isCompleted ? (
                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span>Progress</span>
                    <span>
                      {achievement.currentProgress}/{achievement.targetProgress}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${(achievement.currentProgress / achievement.targetProgress) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 text-green-600">
                    <CheckCircleIcon className="h-5 w-5" />
                    <span className="font-medium">Completed</span>
                  </div>
                  {achievement.earnedAt && (
                    <div className="text-xs text-gray-500 mt-1">
                      {achievement.earnedAt.toLocaleDateString()}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'leaderboard' && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">Global Leaderboard</h3>
            <div className="text-sm text-gray-600">Updated every hour</div>
          </div>

          <div className="space-y-3">
            {sampleLeaderboard.map((user, index) => (
              <div
                key={index}
                className={cn(
                  'flex items-center gap-4 p-4 rounded-lg transition-all',
                  user.isCurrentUser
                    ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 shadow-md'
                    : 'bg-gray-50 hover:bg-gray-100'
                )}
              >
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center font-bold',
                    user.rank === 1 && 'bg-yellow-100 text-yellow-800',
                    user.rank === 2 && 'bg-gray-100 text-gray-800',
                    user.rank === 3 && 'bg-orange-100 text-orange-800',
                    user.rank > 3 && 'bg-blue-100 text-blue-800'
                  )}
                >
                  {user.rank}
                </div>

                <div className="text-2xl">{user.avatar}</div>

                <div className="flex-1">
                  <div
                    className={cn(
                      'font-medium',
                      user.isCurrentUser ? 'text-blue-800' : 'text-gray-900'
                    )}
                  >
                    {user.name}
                    {user.isCurrentUser && (
                      <span className="ml-2 text-xs bg-blue-600 text-white px-2 py-1 rounded-full">
                        YOU
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-bold text-lg">{user.points.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">points</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg">
            <h4 className="font-medium mb-2">🎯 Climb the Ranks!</h4>
            <p className="text-sm text-gray-700">
              Complete daily challenges, maintain study streaks, and score high on tests to earn
              more points and climb the leaderboard!
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default GamificationSystem
