'use client'

import React from 'react'
import { Brain, RefreshCw } from 'lucide-react'

interface DashboardHeaderProps {
  userName?: string
  lastUpdated: string
  isRefreshing: boolean
  onRefresh: () => void
}

export function DashboardHeader({
  userName,
  lastUpdated,
  isRefreshing,
  onRefresh,
}: DashboardHeaderProps) {
  return (
    <div className="bg-white shadow-lg border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#4a5d4a] rounded-xl flex items-center justify-center flex-shrink-0">
              <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-lg sm:text-2xl font-bold text-gray-900 truncate">
                Welcome, {userName || 'Student'}! 🎓
              </h1>
              <p className="text-xs sm:text-sm text-gray-600">
                {lastUpdated ? `Last updated: ${lastUpdated}` : 'Your NEET Biology Dashboard'}
              </p>
            </div>
          </div>
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            aria-label="Refresh dashboard"
            className="p-2 sm:p-2.5 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex-shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-center touch-action-manipulation active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            <RefreshCw
              className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-600 ${isRefreshing ? 'animate-spin' : ''}`}
            />
          </button>
        </div>
      </div>
    </div>
  )
}
