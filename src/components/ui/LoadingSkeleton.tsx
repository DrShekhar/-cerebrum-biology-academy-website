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

export function MetricCardSkeleton() {
  return (
    <div
      className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl border border-gray-200 shadow-lg"
      role="status"
      aria-label="Loading metric card"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <motion.div
            className="h-4 rounded w-24 mb-2"
            style={{
              background: shimmerGradient,
              backgroundSize: '200% 100%',
            }}
            animate={shimmerAnimation}
          />
          <motion.div
            className="h-8 rounded w-16 mb-2"
            style={{
              background: shimmerGradient,
              backgroundSize: '200% 100%',
            }}
            animate={shimmerAnimation}
          />
          <motion.div
            className="h-3 rounded w-32"
            style={{
              background: shimmerGradient,
              backgroundSize: '200% 100%',
            }}
            animate={shimmerAnimation}
          />
        </div>
        <motion.div
          className="w-12 h-12 rounded-xl"
          style={{
            background: shimmerGradient,
            backgroundSize: '200% 100%',
          }}
          animate={shimmerAnimation}
        />
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export function ActivityCardSkeleton() {
  return (
    <div
      className="flex items-start space-x-3 p-3 bg-white/60 rounded-lg border border-gray-200"
      role="status"
      aria-label="Loading activity card"
    >
      <motion.div
        className="w-8 h-8 rounded-lg"
        style={{
          background: shimmerGradient,
          backgroundSize: '200% 100%',
        }}
        animate={shimmerAnimation}
      />
      <div className="flex-1 min-w-0">
        <motion.div
          className="h-4 rounded w-3/4 mb-2"
          style={{
            background: shimmerGradient,
            backgroundSize: '200% 100%',
          }}
          animate={shimmerAnimation}
        />
        <motion.div
          className="h-3 rounded w-full mb-2"
          style={{
            background: shimmerGradient,
            backgroundSize: '200% 100%',
          }}
          animate={shimmerAnimation}
        />
        <motion.div
          className="h-3 rounded w-16"
          style={{
            background: shimmerGradient,
            backgroundSize: '200% 100%',
          }}
          animate={shimmerAnimation}
        />
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export function ChartSkeleton() {
  return (
    <div
      className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg"
      role="status"
      aria-label="Loading chart"
    >
      <motion.div
        className="h-6 rounded w-48 mb-6"
        style={{
          background: shimmerGradient,
          backgroundSize: '200% 100%',
        }}
        animate={shimmerAnimation}
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="text-center">
            <motion.div
              className="w-20 h-20 rounded-full mx-auto mb-3"
              style={{
                background: shimmerGradient,
                backgroundSize: '200% 100%',
              }}
              animate={shimmerAnimation}
            />
            <motion.div
              className="h-4 rounded w-20 mx-auto"
              style={{
                background: shimmerGradient,
                backgroundSize: '200% 100%',
              }}
              animate={shimmerAnimation}
            />
          </div>
        ))}
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export function ChatSkeleton() {
  return (
    <div className="space-y-4 p-4" role="status" aria-label="Loading chat messages">
      {[1, 2, 3].map((i) => (
        <div key={i} className={`flex ${i % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
          <div
            className={`max-w-[70%] p-3 rounded-lg ${i % 2 === 0 ? 'bg-blue-100' : 'bg-gray-100'}`}
          >
            <motion.div
              className="h-4 rounded w-48 mb-2"
              style={{
                background: shimmerGradient,
                backgroundSize: '200% 100%',
              }}
              animate={shimmerAnimation}
            />
            <motion.div
              className="h-4 rounded w-32"
              style={{
                background: shimmerGradient,
                backgroundSize: '200% 100%',
              }}
              animate={shimmerAnimation}
            />
          </div>
        </div>
      ))}
      <span className="sr-only">Loading messages...</span>
    </div>
  )
}

export function TestGenerationSkeleton() {
  return (
    <div className="space-y-6 p-6" role="status" aria-label="Generating test">
      <motion.div
        className="h-8 rounded w-64 mb-4"
        style={{
          background: shimmerGradient,
          backgroundSize: '200% 100%',
        }}
        animate={shimmerAnimation}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white/60 rounded-xl p-4 border border-gray-200">
            <motion.div
              className="h-6 rounded w-32 mb-3"
              style={{
                background: shimmerGradient,
                backgroundSize: '200% 100%',
              }}
              animate={shimmerAnimation}
            />
            <motion.div
              className="h-4 rounded w-full mb-2"
              style={{
                background: shimmerGradient,
                backgroundSize: '200% 100%',
              }}
              animate={shimmerAnimation}
            />
            <motion.div
              className="h-4 rounded w-3/4"
              style={{
                background: shimmerGradient,
                backgroundSize: '200% 100%',
              }}
              animate={shimmerAnimation}
            />
          </div>
        ))}
      </div>
      <span className="sr-only">Generating test questions...</span>
    </div>
  )
}

export function CardSkeleton() {
  return (
    <div
      className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200 shadow-lg"
      role="status"
      aria-label="Loading card"
    >
      <motion.div
        className="h-6 rounded w-3/4 mb-4"
        style={{
          background: shimmerGradient,
          backgroundSize: '200% 100%',
        }}
        animate={shimmerAnimation}
      />
      <motion.div
        className="h-4 rounded w-full mb-2"
        style={{
          background: shimmerGradient,
          backgroundSize: '200% 100%',
        }}
        animate={shimmerAnimation}
      />
      <motion.div
        className="h-4 rounded w-5/6 mb-2"
        style={{
          background: shimmerGradient,
          backgroundSize: '200% 100%',
        }}
        animate={shimmerAnimation}
      />
      <motion.div
        className="h-4 rounded w-2/3"
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

export function DashboardSkeleton() {
  return (
    <div className="space-y-8" role="status" aria-label="Loading dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <MetricCardSkeleton key={i} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white/60 rounded-2xl p-6 border border-gray-200 h-96">
            <motion.div
              className="h-6 rounded w-32 mb-6"
              style={{
                background: shimmerGradient,
                backgroundSize: '200% 100%',
              }}
              animate={shimmerAnimation}
            />
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="h-16 rounded"
                  style={{
                    background: shimmerGradient,
                    backgroundSize: '200% 100%',
                  }}
                  animate={shimmerAnimation}
                />
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

      <ChartSkeleton />
      <span className="sr-only">Loading dashboard data...</span>
    </div>
  )
}
