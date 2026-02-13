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

export function PredictionCardSkeleton() {
  return (
    <div
      className="backdrop-blur-lg bg-white/20 rounded-xl p-4 sm:p-6 border border-white/30 shadow-lg"
      role="status"
      aria-label="Loading prediction card"
    >
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div
          className="w-5 h-5 sm:w-6 sm:h-6 rounded animate-fadeInUp"
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
        className="h-4 rounded w-full mb-2 sm:mb-3 animate-fadeInUp"
        style={{
          background: shimmerGradient,
          backgroundSize: '200% 100%',
        }}
      />
      <div
        className="h-8 sm:h-10 rounded w-24 sm:w-32 mb-3 animate-fadeInUp"
        style={{
          background: shimmerGradient,
          backgroundSize: '200% 100%',
        }}
      />
      <div className="w-full bg-gray-200 rounded-full h-2 sm:h-2.5">
        <div
          className="h-2 sm:h-2.5 rounded-full w-3/4 animate-fadeInUp"
          style={{
            background: shimmerGradient,
            backgroundSize: '200% 100%',
          }}
        />
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export function PredictionsSkeleton() {
  return (
    <div
      className="backdrop-blur-xl bg-white/10 rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/20 shadow-xl"
      role="status"
      aria-label="Loading AI predictions"
    >
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <div className="flex items-center">
          <div
            className="w-5 h-5 rounded mr-2 sm:mr-3 animate-fadeInUp"
            style={{
              background: shimmerGradient,
              backgroundSize: '200% 100%',
            }}
          />
          <div
            className="h-6 sm:h-7 rounded w-32 sm:w-40 animate-fadeInUp"
            style={{
              background: shimmerGradient,
              backgroundSize: '200% 100%',
            }}
          />
        </div>
        <div
          className="h-5 rounded w-20 animate-fadeInUp"
          style={{
            background: shimmerGradient,
            backgroundSize: '200% 100%',
          }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {[1, 2, 3].map((i) => (
          <PredictionCardSkeleton key={i} />
        ))}
      </div>

      <div className="mt-6 sm:mt-8 flex flex-wrap gap-2 sm:gap-3">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-10 sm:h-12 rounded-lg w-32 sm:w-40 animate-fadeInUp"
            style={{
              background: shimmerGradient,
              backgroundSize: '200% 100%',
            }}
          />
        ))}
      </div>
      <span className="sr-only">Loading AI predictions...</span>
    </div>
  )
}

export default PredictionsSkeleton
