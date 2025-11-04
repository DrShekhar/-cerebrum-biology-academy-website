'use client'

import React from 'react'
import { motion } from 'framer-motion'

const shimmerAnimation = {
  backgroundPosition: ['200% 0', '-200% 0'],
  transition: {
    duration: 2,
    ease: 'linear' as const,
    repeat: Infinity,
  },
}

const shimmerGradient = 'linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%)'

export function AnalyticsChartSkeleton() {
  return (
    <div
      className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
      role="status"
      aria-label="Loading analytics chart"
    >
      <motion.div
        className="h-6 rounded w-48 mb-6"
        style={{
          background: shimmerGradient,
          backgroundSize: '200% 100%',
        }}
        animate={shimmerAnimation}
      />
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center space-x-3">
            <motion.div
              className="h-4 rounded w-24"
              style={{
                background: shimmerGradient,
                backgroundSize: '200% 100%',
              }}
              animate={shimmerAnimation}
            />
            <motion.div
              className="h-4 rounded flex-1"
              style={{
                background: shimmerGradient,
                backgroundSize: '200% 100%',
              }}
              animate={shimmerAnimation}
            />
          </div>
        ))}
      </div>
      <span className="sr-only">Loading chart...</span>
    </div>
  )
}

export function AnalyticsMetricSkeleton() {
  return (
    <div
      className="bg-white p-4 rounded-xl border text-center"
      role="status"
      aria-label="Loading metric"
    >
      <motion.div
        className="h-8 rounded w-16 mx-auto mb-2"
        style={{
          background: shimmerGradient,
          backgroundSize: '200% 100%',
        }}
        animate={shimmerAnimation}
      />
      <motion.div
        className="h-3 rounded w-20 mx-auto"
        style={{
          background: shimmerGradient,
          backgroundSize: '200% 100%',
        }}
        animate={shimmerAnimation}
      />
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export function AnalyticsDashboardSkeleton() {
  return (
    <div className="space-y-6" role="status" aria-label="Loading analytics dashboard">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <motion.div
            className="w-12 h-12 rounded-xl"
            style={{
              background: shimmerGradient,
              backgroundSize: '200% 100%',
            }}
            animate={shimmerAnimation}
          />
          <motion.div
            className="h-8 rounded w-48"
            style={{
              background: shimmerGradient,
              backgroundSize: '200% 100%',
            }}
            animate={shimmerAnimation}
          />
        </div>
        <motion.div
          className="h-4 rounded w-96 mx-auto"
          style={{
            background: shimmerGradient,
            backgroundSize: '200% 100%',
          }}
          animate={shimmerAnimation}
        />
      </div>

      <div className="bg-white rounded-xl p-6 border">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <motion.div
              className="h-10 rounded-lg w-48"
              style={{
                background: shimmerGradient,
                backgroundSize: '200% 100%',
              }}
              animate={shimmerAnimation}
            />
            <motion.div
              className="h-10 rounded-lg w-40"
              style={{
                background: shimmerGradient,
                backgroundSize: '200% 100%',
              }}
              animate={shimmerAnimation}
            />
          </div>
          <div className="flex items-center gap-2">
            <motion.div
              className="h-10 rounded-lg w-24"
              style={{
                background: shimmerGradient,
                backgroundSize: '200% 100%',
              }}
              animate={shimmerAnimation}
            />
            <motion.div
              className="h-10 rounded-lg w-24"
              style={{
                background: shimmerGradient,
                backgroundSize: '200% 100%',
              }}
              animate={shimmerAnimation}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <AnalyticsMetricSkeleton key={i} />
        ))}
      </div>

      <div className="flex justify-center">
        <div className="flex bg-gray-100 rounded-xl p-1 gap-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <motion.div
              key={i}
              className="h-12 rounded-lg w-32"
              style={{
                background: shimmerGradient,
                backgroundSize: '200% 100%',
              }}
              animate={shimmerAnimation}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsChartSkeleton />
        <AnalyticsChartSkeleton />
      </div>
      <span className="sr-only">Loading analytics dashboard...</span>
    </div>
  )
}

export default AnalyticsDashboardSkeleton
