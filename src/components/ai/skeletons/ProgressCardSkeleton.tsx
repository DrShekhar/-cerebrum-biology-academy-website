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

export function ProgressCardSkeleton() {
  return (
    <div
      className="relative overflow-hidden rounded-2xl p-4 sm:p-6 lg:p-8 backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl"
      role="status"
      aria-label="Loading progress card"
    >
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4 sm:mb-6 lg:mb-8">
          <div className="flex-1 min-w-0 pr-3 sm:pr-4">
            <div
              className="h-5 sm:h-6 rounded w-32 sm:w-40 mb-2 animate-fadeInUp"
              style={{
                background: shimmerGradient,
                backgroundSize: '200% 100%',
              }}
            />
            <div
              className="h-3 sm:h-4 rounded w-24 sm:w-32 animate-fadeInUp"
              style={{
                background: shimmerGradient,
                backgroundSize: '200% 100%',
              }}
            />
          </div>

          <div
            className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl animate-fadeInUp"
            style={{
              background: shimmerGradient,
              backgroundSize: '200% 100%',
            }}
          />
        </div>

        <div className="flex items-center justify-between mb-4 sm:mb-6 lg:mb-8">
          <div className="flex-1 min-w-0">
            <div
              className="h-10 sm:h-12 lg:h-14 rounded w-32 sm:w-40 mb-3 animate-fadeInUp"
              style={{
                background: shimmerGradient,
                backgroundSize: '200% 100%',
              }}
            />
            <div
              className="h-4 sm:h-5 rounded w-28 sm:w-36 animate-fadeInUp"
              style={{
                background: shimmerGradient,
                backgroundSize: '200% 100%',
              }}
            />
          </div>

          <div
            className="ml-3 sm:ml-4 lg:ml-6 w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full animate-fadeInUp"
            style={{
              background: shimmerGradient,
              backgroundSize: '200% 100%',
            }}
          />
        </div>

        <div className="mt-4 sm:mt-6 pt-4 sm:pt-5 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div
              className="h-2 sm:h-3 rounded-full flex-1 mr-2 animate-fadeInUp"
              style={{
                background: shimmerGradient,
                backgroundSize: '200% 100%',
              }}
            />
          </div>
        </div>
      </div>
      <span className="sr-only">Loading progress card...</span>
    </div>
  )
}

export function ProgressCardsGridSkeleton() {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8"
      role="status"
      aria-label="Loading progress cards"
    >
      {[1, 2, 3, 4].map((i) => (
        <ProgressCardSkeleton key={i} />
      ))}
      <span className="sr-only">Loading progress data...</span>
    </div>
  )
}

export default ProgressCardSkeleton
