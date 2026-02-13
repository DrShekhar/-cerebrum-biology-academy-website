'use client'

import React, { useState } from 'react'
import {
  Flame,
  Shield,
  Snowflake,
  AlertTriangle,
  Clock,
  Zap,
  TrendingUp,
  Award,
} from 'lucide-react'

interface StreakStatus {
  currentStreak: number
  longestStreak: number
  isAtRisk: boolean
  isProtected: boolean
  protectedUntil: string | null
  freezesAvailable: number
  freezesUsedThisWeek: number
  canRecover: boolean
  recoveryDeadline: string | null
  recoveryXpCost: number | null
  lastActivity: string | null
}

interface StreakProtectionWidgetProps {
  status: StreakStatus
  maxFreezesPerWeek: number
  onUseFreeze?: () => Promise<void>
  onRecoverStreak?: () => Promise<void>
  isLoading?: boolean
  className?: string
}

export function StreakProtectionWidget({
  status,
  maxFreezesPerWeek,
  onUseFreeze,
  onRecoverStreak,
  isLoading = false,
  className = '',
}: StreakProtectionWidgetProps) {
  const [showFreezeModal, setShowFreezeModal] = useState(false)
  const [showRecoveryModal, setShowRecoveryModal] = useState(false)

  const getTimeRemaining = (deadline: string) => {
    const diff = new Date(deadline).getTime() - Date.now()
    if (diff <= 0) return 'Expired'
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    return `${hours}h ${minutes}m`
  }

  const getStreakColor = () => {
    if (status.isProtected) return 'from-blue-500 to-cyan-600'
    if (status.isAtRisk) return 'from-red-500 to-orange-600'
    if (status.currentStreak >= 7) return 'from-orange-500 to-yellow-500'
    return 'from-orange-600 to-red-500'
  }

  return (
    <div
      className={`bg-gradient-to-br ${getStreakColor()} rounded-xl shadow-lg p-6 text-white ${className}`}
    >
      {/* Header with Streak Count */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold flex items-center">
            {status.isProtected ? (
              <>
                <Shield className="w-5 h-5 mr-2" />
                Protected Streak
              </>
            ) : status.isAtRisk ? (
              <>
                <AlertTriangle className="w-5 h-5 mr-2" />
                Streak at Risk!
              </>
            ) : (
              <>
                <Flame className="w-5 h-5 mr-2" />
                Study Streak
              </>
            )}
          </h3>
          <p className="text-white/80 text-sm mt-1">
            {status.isProtected
              ? 'Your streak is safe until tomorrow'
              : status.isAtRisk
                ? 'Practice now to save your streak!'
                : 'Keep the momentum going!'}
          </p>
        </div>
        <div
          className="flex items-center space-x-1 animate-fadeInUp"
        >
          <span className="text-5xl font-bold">{status.currentStreak}</span>
          {status.isProtected ? (
            <Shield className="w-8 h-8 text-cyan-200" />
          ) : (
            <Flame
              className={`w-8 h-8 ${status.currentStreak > 0 ? 'text-yellow-300' : 'text-white/50'}`}
            />
          )}
        </div>
      </div>

      {/* Protection Status Banner */}
      {status.isProtected && status.protectedUntil && (
        <div
          className="bg-white/20 rounded-lg p-3 mb-4 flex items-center justify-between animate-fadeInUp"
        >
          <div className="flex items-center space-x-2">
            <Snowflake className="w-5 h-5 text-cyan-200" />
            <span className="text-sm font-medium">Freeze Active</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{getTimeRemaining(status.protectedUntil)} remaining</span>
          </div>
        </div>
      )}

      {/* Recovery Banner */}
      {status.canRecover && status.recoveryDeadline && (
        <div
          className="bg-yellow-500/30 border border-yellow-400/50 rounded-lg p-3 mb-4 animate-fadeInUp"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <AlertTriangle className="w-5 h-5 text-yellow-200" />
                <span className="font-medium">Streak Recovery Available!</span>
              </div>
              <p className="text-sm text-white/80">
                Recover your streak for {status.recoveryXpCost} XP
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-white/80">Time left:</div>
              <div className="font-bold">{getTimeRemaining(status.recoveryDeadline)}</div>
            </div>
          </div>
          <button
            onClick={() => setShowRecoveryModal(true)}
            disabled={isLoading}
            className="mt-3 w-full bg-yellow-400 hover:bg-yellow-300 text-yellow-900 font-bold py-2 px-4 rounded-lg transition-all flex items-center justify-center space-x-2"
          >
            <Zap className="w-4 h-4" />
            <span>Recover Streak ({status.recoveryXpCost} XP)</span>
          </button>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-white/15 rounded-lg p-3 backdrop-blur-sm text-center">
          <TrendingUp className="w-4 h-4 mx-auto mb-1 text-white/80" />
          <div className="text-xl font-bold">{status.currentStreak}</div>
          <div className="text-xs text-white/70">Current</div>
        </div>
        <div className="bg-white/15 rounded-lg p-3 backdrop-blur-sm text-center">
          <Award className="w-4 h-4 mx-auto mb-1 text-white/80" />
          <div className="text-xl font-bold">{status.longestStreak}</div>
          <div className="text-xs text-white/70">Best</div>
        </div>
        <div className="bg-white/15 rounded-lg p-3 backdrop-blur-sm text-center">
          <Snowflake className="w-4 h-4 mx-auto mb-1 text-white/80" />
          <div className="text-xl font-bold">{status.freezesAvailable}</div>
          <div className="text-xs text-white/70">Freezes</div>
        </div>
      </div>

      {/* Freeze Button */}
      {!status.isProtected && status.currentStreak > 0 && status.freezesAvailable > 0 && (
        <button
          onClick={() => setShowFreezeModal(true)}
          disabled={isLoading}
          className="w-full bg-white/20 hover:bg-white/30 border border-white/30 rounded-lg py-3 px-4 font-medium transition-all flex items-center justify-center space-x-2"
        >
          <Snowflake className="w-5 h-5" />
          <span>Use Streak Freeze</span>
          <span className="text-sm text-white/70">({status.freezesAvailable} left)</span>
        </button>
      )}

      {/* Freeze Count Indicator */}
      <div className="mt-4 flex items-center justify-center space-x-2">
        <span className="text-xs text-white/60">Weekly Freezes:</span>
        <div className="flex space-x-1">
          {Array.from({ length: maxFreezesPerWeek }).map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${
                i < status.freezesAvailable ? 'bg-cyan-300' : 'bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Freeze Modal */}
{showFreezeModal && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fadeInUp"
            onClick={() => setShowFreezeModal(false)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-fadeInUp"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Snowflake className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Use Streak Freeze?</h3>
                <p className="text-gray-600 mb-6">
                  This will protect your {status.currentStreak}-day streak until tomorrow. You have{' '}
                  {status.freezesAvailable} freeze{status.freezesAvailable !== 1 ? 's' : ''} left
                  this week.
                </p>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowFreezeModal(false)}
                    className="flex-1 py-3 px-4 border border-gray-200 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={async () => {
                      await onUseFreeze?.()
                      setShowFreezeModal(false)
                    }}
                    disabled={isLoading}
                    className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center space-x-2"
                  >
                    <Snowflake className="w-4 h-4" />
                    <span>Activate</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
{/* Recovery Modal */}
{showRecoveryModal && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fadeInUp"
            onClick={() => setShowRecoveryModal(false)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-fadeInUp"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Flame className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Recover Your Streak?</h3>
                <p className="text-gray-600 mb-4">
                  Spend{' '}
                  <span className="font-bold text-yellow-600">{status.recoveryXpCost} XP</span> to
                  restore your streak.
                </p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
                  <div className="flex items-center justify-center space-x-2 text-yellow-800">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      Offer expires in{' '}
                      {status.recoveryDeadline ? getTimeRemaining(status.recoveryDeadline) : 'soon'}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowRecoveryModal(false)}
                    className="flex-1 py-3 px-4 border border-gray-200 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={async () => {
                      await onRecoverStreak?.()
                      setShowRecoveryModal(false)
                    }}
                    disabled={isLoading}
                    className="flex-1 py-3 px-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center space-x-2"
                  >
                    <Zap className="w-4 h-4" />
                    <span>Recover</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
</div>
  )
}
