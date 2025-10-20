'use client'

import React from 'react'
import { Trophy, Medal, Award, TrendingUp, TrendingDown } from 'lucide-react'
import type { Leaderboard } from '@/lib/types/analytics'

interface LeaderboardWidgetProps {
  leaderboard: Leaderboard
  currentUser?: { id: string; name?: string }
}

export function LeaderboardWidget({ leaderboard, currentUser }: LeaderboardWidgetProps) {
  const userPosition = leaderboard.userPosition

  return (
    <div className="space-y-4">
      {/* Leaderboard Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-gray-900">
          {leaderboard.type === 'global' ? 'Global' :
           leaderboard.type === 'grade' ? 'Grade' :
           leaderboard.type === 'subject' ? 'Subject' : 'Topic'} Leaderboard
        </h3>
        <span className="text-sm text-gray-500 capitalize">
          {leaderboard.period}
        </span>
      </div>

      {/* User's Position (if not in top 10) */}
      {userPosition && userPosition.rank > 10 && (
        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                {userPosition.rank}
              </div>
              <div>
                <span className="font-medium text-blue-900">You</span>
                <div className="text-sm text-blue-700">
                  {userPosition.testsCompleted} tests • {userPosition.score.toFixed(1)}%
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {userPosition.change > 0 && (
                <TrendingUp className="w-4 h-4 text-green-600" />
              )}
              {userPosition.change < 0 && (
                <TrendingDown className="w-4 h-4 text-red-600" />
              )}
              <span className="text-sm text-blue-700">
                {userPosition.badgeCount} badges
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Top 10 Leaderboard */}
      <div className="space-y-2">
        {leaderboard.entries.slice(0, 10).map((entry, index) => {
          const isCurrentUser = currentUser && entry.userId === currentUser.id

          return (
            <div
              key={entry.userId}
              className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                isCurrentUser
                  ? 'bg-blue-50 border border-blue-200'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Rank Badge */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  entry.rank === 1
                    ? 'bg-yellow-500 text-white'
                    : entry.rank === 2
                    ? 'bg-gray-400 text-white'
                    : entry.rank === 3
                    ? 'bg-amber-600 text-white'
                    : isCurrentUser
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}>
                  {entry.rank}
                </div>

                {/* Rank Icon for top 3 */}
                {entry.rank <= 3 && (
                  <div className="ml-1">
                    {entry.rank === 1 && <Trophy className="w-5 h-5 text-yellow-500" />}
                    {entry.rank === 2 && <Medal className="w-5 h-5 text-gray-400" />}
                    {entry.rank === 3 && <Award className="w-5 h-5 text-amber-600" />}
                  </div>
                )}

                {/* User Info */}
                <div>
                  <span className={`font-medium ${
                    isCurrentUser ? 'text-blue-900' : 'text-gray-900'
                  }`}>
                    {isCurrentUser ? 'You' : entry.name}
                  </span>
                  <div className="text-sm text-gray-600">
                    {entry.testsCompleted} tests • {Math.round(entry.averageTime / 60)}m avg
                  </div>
                </div>
              </div>

              {/* Score and Stats */}
              <div className="text-right">
                <div className={`font-bold ${
                  isCurrentUser ? 'text-blue-900' : 'text-gray-900'
                }`}>
                  {entry.score.toFixed(1)}%
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  {entry.badgeCount > 0 && (
                    <span className="flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      {entry.badgeCount}
                    </span>
                  )}
                  {entry.streakDays > 0 && (
                    <span className="flex items-center gap-1">
                      🔥 {entry.streakDays}
                    </span>
                  )}
                  {entry.change !== 0 && (
                    <span className={`flex items-center gap-1 ${
                      entry.change > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {entry.change > 0 ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      {Math.abs(entry.change)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Leaderboard Stats */}
      <div className="pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-gray-900">
              {leaderboard.totalParticipants}
            </div>
            <div className="text-sm text-gray-600">Total Participants</div>
          </div>
          <div>
            <div className="text-lg font-bold text-gray-900">
              {userPosition ? userPosition.rank : '-'}
            </div>
            <div className="text-sm text-gray-600">Your Rank</div>
          </div>
        </div>

        {/* Percentile Info */}
        {userPosition && leaderboard.totalParticipants > 0 && (
          <div className="mt-3 p-2 bg-gray-50 rounded text-center">
            <div className="text-sm text-gray-600">
              You're performing better than{' '}
              <span className="font-medium text-gray-900">
                {Math.round(((leaderboard.totalParticipants - userPosition.rank) / leaderboard.totalParticipants) * 100)}%
              </span>{' '}
              of students
            </div>
          </div>
        )}
      </div>

      {/* Period Selector or Info */}
      <div className="flex justify-center">
        <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
          {['daily', 'weekly', 'monthly', 'allTime'].map(period => (
            <button
              key={period}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                leaderboard.period === period
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {period === 'allTime' ? 'All Time' : period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}