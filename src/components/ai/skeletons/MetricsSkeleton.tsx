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

export function MetricCardSkeleton() {
  return (
    <div
      className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
      role="status"
      aria-label="Loading metric card"
    >
      <div className="flex items-center justify-between mb-4">
        <div
          className="w-10 h-10 rounded-lg animate-fadeInUp"
          style={{
            background: shimmerGradient,
            backgroundSize: '200% 100%',
          }}
        />
        <div className="flex items-center space-x-1">
          <div
            className="w-3 h-3 rounded animate-fadeInUp"
            style={{
              background: shimmerGradient,
              backgroundSize: '200% 100%',
            }}
          />
          <div
            className="h-4 rounded w-12 animate-fadeInUp"
            style={{
              background: shimmerGradient,
              backgroundSize: '200% 100%',
            }}
          />
        </div>
      </div>

      <div
        className="h-4 rounded w-32 mb-1 animate-fadeInUp"
        style={{
          background: shimmerGradient,
          backgroundSize: '200% 100%',
        }}
      />
      <div
        className="h-8 rounded w-24 mb-1 animate-fadeInUp"
        style={{
          background: shimmerGradient,
          backgroundSize: '200% 100%',
        }}
      />
      <div
        className="h-3 rounded w-28 animate-fadeInUp"
        style={{
          background: shimmerGradient,
          backgroundSize: '200% 100%',
        }}
      />
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export function SystemHealthSkeleton() {
  return (
    <div
      className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
      role="status"
      aria-label="Loading system health"
    >
      <div className="flex items-center mb-4">
        <div
          className="w-5 h-5 rounded mr-2 animate-fadeInUp"
          style={{
            background: shimmerGradient,
            backgroundSize: '200% 100%',
          }}
        />
        <div
          className="h-6 rounded w-32 animate-fadeInUp"
          style={{
            background: shimmerGradient,
            backgroundSize: '200% 100%',
          }}
        />
      </div>
      <div className="space-y-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex-1">
              <div
                className="h-4 rounded w-32 mb-1 animate-fadeInUp"
                style={{
                  background: shimmerGradient,
                  backgroundSize: '200% 100%',
                }}
              />
              <div className="flex items-center space-x-2 mt-1">
                <div
                  className="w-24 h-2 rounded-full animate-fadeInUp"
                  style={{
                    background: shimmerGradient,
                    backgroundSize: '200% 100%',
                  }}
                />
                <div
                  className="h-3 rounded w-12 animate-fadeInUp"
                  style={{
                    background: shimmerGradient,
                    backgroundSize: '200% 100%',
                  }}
                />
              </div>
            </div>
            <div
              className="w-2 h-2 rounded-full animate-fadeInUp"
              style={{
                background: shimmerGradient,
                backgroundSize: '200% 100%',
              }}
            />
          </div>
        ))}
      </div>
      <span className="sr-only">Loading system health...</span>
    </div>
  )
}

export function RealTimeMetricsSkeleton() {
  return (
    <div className="space-y-6" role="status" aria-label="Loading real-time metrics">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div
            className="h-5 rounded w-24 animate-fadeInUp"
            style={{
              background: shimmerGradient,
              backgroundSize: '200% 100%',
            }}
          />
          <div
            className="h-4 rounded w-32 animate-fadeInUp"
            style={{
              background: shimmerGradient,
              backgroundSize: '200% 100%',
            }}
          />
        </div>
        <div className="flex items-center space-x-3">
          <div
            className="h-10 rounded-lg w-32 animate-fadeInUp"
            style={{
              background: shimmerGradient,
              backgroundSize: '200% 100%',
            }}
          />
          <div
            className="h-10 rounded-lg w-40 animate-fadeInUp"
            style={{
              background: shimmerGradient,
              backgroundSize: '200% 100%',
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <MetricCardSkeleton key={i} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SystemHealthSkeleton />
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div
              className="h-6 rounded w-40 mb-4 animate-fadeInUp"
              style={{
                background: shimmerGradient,
                backgroundSize: '200% 100%',
              }}
            />
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div
                    className="w-4 h-4 rounded flex-shrink-0 mt-0.5 animate-fadeInUp"
                    style={{
                      background: shimmerGradient,
                      backgroundSize: '200% 100%',
                    }}
                  />
                  <div className="flex-1 min-w-0 space-y-2">
                    <div
                      className="h-4 rounded w-24 animate-fadeInUp"
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
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <span className="sr-only">Loading real-time metrics...</span>
    </div>
  )
}

export default RealTimeMetricsSkeleton
