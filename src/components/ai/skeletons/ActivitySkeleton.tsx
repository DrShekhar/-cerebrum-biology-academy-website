'use client'

import React from 'react'
const shimmerAnimation = {
  backgroundPosition: ['200% 0', '-200% 0'],
  transition: {
    duration: 2,
    ease: 'linear' as const,
    repeat: Infinity,
  },
}

const shimmerGradient = 'linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%)'

export function ActivityItemSkeleton() {
  return (
    <div
      className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 backdrop-blur-lg bg-white/20 rounded-lg border border-white/30"
      role="status"
      aria-label="Loading activity item"
    >
      <div
        className="w-8 h-8 rounded-lg flex-shrink-0 animate-fadeInUp"
        style={{
          background: shimmerGradient,
          backgroundSize: '200% 100%',
        }}
      />
      <div className="flex-1 min-w-0 space-y-2">
        <div
          className="h-4 rounded w-3/4 animate-fadeInUp"
          style={{
            background: shimmerGradient,
            backgroundSize: '200% 100%',
          }}
        />
        <div
          className="h-3 rounded w-full animate-fadeInUp"
          style={{
            background: shimmerGradient,
            backgroundSize: '200% 100%',
          }}
        />
        <div
          className="h-3 rounded w-20 animate-fadeInUp"
          style={{
            background: shimmerGradient,
            backgroundSize: '200% 100%',
          }}
        />
      </div>
      <div
        className="w-4 h-4 rounded-full flex-shrink-0 mt-1 animate-fadeInUp"
        style={{
          background: shimmerGradient,
          backgroundSize: '200% 100%',
        }}
      />
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export function ActivityFeedSkeleton() {
  return (
    <div
      className="backdrop-blur-xl bg-white/10 rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/20 shadow-xl"
      role="status"
      aria-label="Loading activity feed"
    >
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <div
          className="h-6 sm:h-7 rounded w-40 sm:w-48 animate-fadeInUp"
          style={{
            background: shimmerGradient,
            backgroundSize: '200% 100%',
          }}
        />
        <div
          className="h-5 rounded w-16 animate-fadeInUp"
          style={{
            background: shimmerGradient,
            backgroundSize: '200% 100%',
          }}
        />
      </div>

      <div className="space-y-3 sm:space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <ActivityItemSkeleton key={i} />
        ))}
      </div>
      <span className="sr-only">Loading activity feed...</span>
    </div>
  )
}

export function LiveActivitySkeleton() {
  return (
    <div
      className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
      role="status"
      aria-label="Loading live activity"
    >
      <div className="flex items-center mb-4">
        <div
          className="h-5 rounded w-32 mr-2 animate-fadeInUp"
          style={{
            background: shimmerGradient,
            backgroundSize: '200% 100%',
          }}
        />
      </div>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg animate-fadeInUp">
            <div
              className="w-4 h-4 rounded flex-shrink-0 mt-0.5 animate-fadeInUp"
              style={{
                background: shimmerGradient,
                backgroundSize: '200% 100%',
              }}
            />
            <div className="flex-1 min-w-0 space-y-2">
              <div className="flex items-center justify-between">
                <div
                  className="h-4 rounded w-24 animate-fadeInUp"
                  style={{
                    background: shimmerGradient,
                    backgroundSize: '200% 100%',
                  }}
                />
                <div
                  className="h-3 rounded w-16 animate-fadeInUp"
                  style={{
                    background: shimmerGradient,
                    backgroundSize: '200% 100%',
                  }}
                />
              </div>
              <div
                className="h-3 rounded w-full animate-fadeInUp"
                style={{
                  background: shimmerGradient,
                  backgroundSize: '200% 100%',
                }}
              />
              <div
                className="h-3 rounded w-3/4 animate-fadeInUp"
                style={{
                  background: shimmerGradient,
                  backgroundSize: '200% 100%',
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <span className="sr-only">Loading live activity...</span>
    </div>
  )
}

export default ActivityFeedSkeleton
