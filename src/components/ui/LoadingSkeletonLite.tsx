'use client'

import React from 'react'

/**
 * CSS-only loading skeleton - ZERO JavaScript animation dependencies
 * Use this instead of LoadingSkeleton for better performance
 * framer-motion version pulls ~40kb into critical path
 */

const shimmerStyle = {
  background: 'linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%)',
  backgroundSize: '200% 100%',
  animation: 'shimmer 2s linear infinite',
} as const

// Add CSS keyframes via style tag (only once)
const ShimmerStyles = () => (
  <style jsx global>{`
    @keyframes shimmer {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
  `}</style>
)

export function LoadingSkeleton({ className = '' }: { className?: string }) {
  return (
    <>
      <ShimmerStyles />
      <div
        className={`rounded ${className}`}
        style={shimmerStyle}
        role="status"
        aria-label="Loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </>
  )
}

export function TextSkeleton({ lines = 3, className = '' }: { lines?: number; className?: string }) {
  return (
    <>
      <ShimmerStyles />
      <div className={`space-y-2 ${className}`} role="status" aria-label="Loading text">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className="h-4 rounded"
            style={{
              ...shimmerStyle,
              width: i === lines - 1 ? '60%' : '100%',
            }}
          />
        ))}
        <span className="sr-only">Loading...</span>
      </div>
    </>
  )
}

export function CardSkeletonLite({ className = '' }: { className?: string }) {
  return (
    <>
      <ShimmerStyles />
      <div
        className={`bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200 shadow-lg ${className}`}
        role="status"
        aria-label="Loading card"
      >
        <div className="h-6 rounded w-3/4 mb-4" style={shimmerStyle} />
        <div className="h-4 rounded w-full mb-2" style={shimmerStyle} />
        <div className="h-4 rounded w-5/6 mb-2" style={shimmerStyle} />
        <div className="h-4 rounded w-2/3" style={shimmerStyle} />
        <span className="sr-only">Loading...</span>
      </div>
    </>
  )
}

export function SectionSkeletonLite({ className = '' }: { className?: string }) {
  return (
    <>
      <ShimmerStyles />
      <div className={`py-12 ${className}`} role="status" aria-label="Loading section">
        <div className="max-w-7xl mx-auto px-4">
          {/* Section title skeleton */}
          <div className="text-center mb-8">
            <div className="h-8 rounded w-64 mx-auto mb-4" style={shimmerStyle} />
            <div className="h-4 rounded w-96 mx-auto max-w-full" style={shimmerStyle} />
          </div>
          {/* Cards grid skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-lg">
                <div className="h-6 rounded w-3/4 mb-3" style={shimmerStyle} />
                <div className="h-4 rounded w-full mb-2" style={shimmerStyle} />
                <div className="h-4 rounded w-5/6" style={shimmerStyle} />
              </div>
            ))}
          </div>
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    </>
  )
}

export function HeroSkeletonLite() {
  return (
    <>
      <ShimmerStyles />
      <div
        className="min-h-[60vh] bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center"
        role="status"
        aria-label="Loading hero"
      >
        <div className="text-center px-4 w-full max-w-4xl">
          <div className="h-12 rounded w-3/4 mx-auto mb-6" style={{ ...shimmerStyle, opacity: 0.3 }} />
          <div className="h-6 rounded w-1/2 mx-auto mb-8" style={{ ...shimmerStyle, opacity: 0.3 }} />
          <div className="flex justify-center gap-4">
            <div className="h-12 rounded-lg w-32" style={{ ...shimmerStyle, opacity: 0.3 }} />
            <div className="h-12 rounded-lg w-32" style={{ ...shimmerStyle, opacity: 0.3 }} />
          </div>
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    </>
  )
}

// Simple inline skeleton for minimal bundle impact
export function InlineSkeleton({ width = '100%', height = '1rem' }: { width?: string; height?: string }) {
  return (
    <>
      <ShimmerStyles />
      <span
        className="inline-block rounded"
        style={{ ...shimmerStyle, width, height }}
        role="status"
        aria-label="Loading"
      >
        <span className="sr-only">Loading...</span>
      </span>
    </>
  )
}
