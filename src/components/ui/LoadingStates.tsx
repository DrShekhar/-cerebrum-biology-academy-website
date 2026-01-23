'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { BookOpen } from 'lucide-react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'cerebrum' | 'success' | 'minimal'
  className?: string
}

// Simple loading spinner
export function LoadingSpinner({
  size = 'md',
  variant = 'cerebrum',
  className = '',
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.div
        className={`${sizeClasses[size]} border-4 border-purple-600 border-t-transparent rounded-full`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  )
}

// Simple skeleton loader
export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`bg-gray-200 animate-pulse rounded ${className}`} />
}

// Simple progress bar
export function ProgressBar({
  progress,
  className = '',
}: {
  progress: number
  className?: string
}) {
  return (
    <div className={`w-full ${className}`}>
      <div className="w-full h-2 bg-purple-50 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

// SIMPLIFIED page loader - NO TIMEOUT TRAPS
export function CerebrumPageLoader({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-20 h-20 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl mx-auto mb-6"
        >
          <BookOpen className="w-10 h-10 text-white" />
        </motion.div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">Cerebrum Biology Academy</h1>
        <p className="text-gray-600 mb-4">{message}</p>
        <LoadingSpinner size="lg" />

        {/* ALWAYS show navigation */}
        <div className="mt-8 space-y-3">
          <a
            href="/"
            className="inline-block px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
          >
            🏠 Go to Homepage
          </a>
          <div>
            <button
              onClick={() => window.history.back()}
              className="text-sm text-gray-500 hover:text-gray-700 underline"
            >
              ← Go back
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Simple video skeleton
export function VideoSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden ${className}`}>
      <div className="aspect-video bg-gray-200 animate-pulse" />
      <div className="p-4 space-y-3">
        <div className="h-5 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
      </div>
    </div>
  )
}

// Simple course skeleton
export function CourseSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden ${className}`}>
      <div className="h-32 bg-gray-200 animate-pulse" />
      <div className="p-6 space-y-4">
        <div className="h-5 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
        <div className="h-10 bg-gray-200 rounded-lg animate-pulse" />
      </div>
    </div>
  )
}

// Export all components
export const LoadingStates = {
  courseSkeleton: CourseSkeleton,
  spinner: LoadingSpinner,
  skeleton: Skeleton,
  progressBar: ProgressBar,
  pageLoader: CerebrumPageLoader,
  videoSkeleton: VideoSkeleton,
}
