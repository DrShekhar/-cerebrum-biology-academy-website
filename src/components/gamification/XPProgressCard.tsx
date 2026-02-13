'use client'

import React from 'react'
import { Zap, TrendingUp, Star } from 'lucide-react'

interface XPProgressCardProps {
  totalPoints: number
  currentLevel: number
  xpInCurrentLevel: number
  xpNeededForNextLevel: number
  levelProgress: number
  className?: string
}

export function XPProgressCard({
  totalPoints,
  currentLevel,
  xpInCurrentLevel,
  xpNeededForNextLevel,
  levelProgress,
  className = '',
}: XPProgressCardProps) {
  return (
    <div
      className={`bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl shadow-lg p-6 text-white ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold flex items-center">
            <Zap className="w-5 h-5 mr-2" />
            Level Progress
          </h3>
          <p className="text-purple-200 text-sm mt-1">Keep learning to level up!</p>
        </div>
        <div className="text-right">
          <div className="text-4xl font-bold">{currentLevel}</div>
          <div className="text-xs text-purple-200">Current Level</div>
        </div>
      </div>

      {/* XP Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="font-medium">XP Progress</span>
          <span className="text-purple-200">
            {xpInCurrentLevel} / {xpNeededForNextLevel} XP
          </span>
        </div>
        <div className="w-full bg-purple-800 bg-opacity-50 rounded-full h-4 overflow-hidden">
          <div
            className="bg-gradient-to-r from-yellow-400 to-yellow-200 h-4 rounded-full flex items-center justify-end px-2 animate-fadeInUp"
          >
            {levelProgress > 10 && (
              <span className="text-xs font-bold text-purple-900">{levelProgress}%</span>
            )}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white bg-opacity-10 rounded-lg p-3 backdrop-blur-sm">
          <div className="flex items-center space-x-2 mb-1">
            <Star className="w-4 h-4 text-yellow-300" />
            <span className="text-xs text-purple-200 font-medium">Total XP</span>
          </div>
          <div className="text-2xl font-bold">{totalPoints.toLocaleString()}</div>
        </div>

        <div className="bg-white bg-opacity-10 rounded-lg p-3 backdrop-blur-sm">
          <div className="flex items-center space-x-2 mb-1">
            <TrendingUp className="w-4 h-4 text-green-300" />
            <span className="text-xs text-purple-200 font-medium">Next Level</span>
          </div>
          <div className="text-2xl font-bold">{currentLevel + 1}</div>
        </div>
      </div>

      {/* XP to Next Level */}
      <div className="mt-4 text-center">
        <div className="text-sm text-purple-200">
          {xpNeededForNextLevel - xpInCurrentLevel} XP needed to reach Level {currentLevel + 1}
        </div>
        {levelProgress >= 75 && (
          <div
            className="mt-2 inline-flex items-center space-x-1 bg-yellow-400 text-purple-900 px-3 py-1 rounded-full text-xs font-bold animate-fadeInUp"
          >
            <Zap className="w-3 h-3" />
            <span>Almost there! Keep going!</span>
          </div>
        )}
      </div>
    </div>
  )
}
