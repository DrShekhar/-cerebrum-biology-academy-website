'use client'

import React from 'react'

export function MetricCardSkeleton() {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl border border-gray-200 shadow-lg animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
          <div className="h-8 bg-gray-300 rounded w-16 mb-2"></div>
          <div className="h-3 bg-gray-300 rounded w-32"></div>
        </div>
        <div className="w-12 h-12 bg-gray-300 rounded-xl"></div>
      </div>
    </div>
  )
}

export function ActivityCardSkeleton() {
  return (
    <div className="flex items-start space-x-3 p-3 bg-white/60 rounded-lg border border-gray-200 animate-pulse">
      <div className="w-8 h-8 bg-gray-300 rounded-lg"></div>
      <div className="flex-1 min-w-0">
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-3 bg-gray-300 rounded w-16"></div>
      </div>
    </div>
  )
}

export function ChartSkeleton() {
  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg animate-pulse">
      <div className="h-6 bg-gray-300 rounded w-48 mb-6"></div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="text-center">
            <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-3"></div>
            <div className="h-4 bg-gray-300 rounded w-20 mx-auto"></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <MetricCardSkeleton key={i} />
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white/60 rounded-2xl p-6 border border-gray-200 h-96 animate-pulse">
            <div className="h-6 bg-gray-300 rounded w-32 mb-6"></div>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-16 bg-gray-300 rounded"></div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <ActivityCardSkeleton key={i} />
          ))}
        </div>
      </div>

      {/* Chart */}
      <ChartSkeleton />
    </div>
  )
}
