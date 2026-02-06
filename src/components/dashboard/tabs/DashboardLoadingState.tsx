'use client'

import React from 'react'
import { Brain } from 'lucide-react'
import { ProgressCardSkeleton } from '@/components/ai/skeletons/ProgressCardSkeleton'
import { MetricCardSkeleton } from '@/components/ai/skeletons/MetricsSkeleton'

export function DashboardLoadingState() {
  return (
    <div role="status" aria-busy="true" aria-label="Loading dashboard data" className="min-h-screen bg-gradient-to-br from-navy-50 via-green-50 to-gold-50 pb-20 md:pb-0">
      <div className="bg-white shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#4a5d4a] rounded-xl flex items-center justify-center flex-shrink-0 animate-pulse">
              <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-lg sm:text-2xl font-bold text-gray-900">
                Loading your dashboard...
              </h1>
              <p className="text-xs sm:text-sm text-gray-600">Please wait</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8 space-y-4 sm:space-y-8">
        <ProgressCardSkeleton />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          <MetricCardSkeleton />
          <MetricCardSkeleton />
          <MetricCardSkeleton />
          <MetricCardSkeleton />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
          <ProgressCardSkeleton />
          <ProgressCardSkeleton />
        </div>
      </div>
    </div>
  )
}
