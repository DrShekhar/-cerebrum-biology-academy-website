'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Play, Award, Users, Clock, CheckCircle } from 'lucide-react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'cerebrum' | 'success' | 'minimal'
  className?: string
}

interface SkeletonProps {
  className?: string
  variant?: 'text' | 'avatar' | 'card' | 'video' | 'course'
  animate?: boolean
}

interface ProgressBarProps {
  progress: number
  variant?: 'default' | 'cerebrum' | 'success'
  showPercentage?: boolean
  label?: string
  className?: string
}

// Cerebrum-branded loading spinner
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

  const variants = {
    default: 'text-blue-600',
    cerebrum: 'text-purple-600',
    success: 'text-emerald-600',
    minimal: 'text-gray-400',
  }

  if (variant === 'cerebrum') {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div className="relative">
          {/* Outer ring */}
          <motion.div
            className={`${sizeClasses[size]} border-4 border-purple-200 rounded-full`}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />

          {/* Inner spinning element with Cerebrum branding */}
          <motion.div
            className={`absolute inset-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center`}
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          >
            <BookOpen
              className={`${size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-3 h-3' : size === 'lg' ? 'w-4 h-4' : 'w-6 h-6'} text-white`}
            />
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.div
        className={`${sizeClasses[size]} border-4 border-current border-t-transparent rounded-full ${variants[variant]}`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  )
}

// Cerebrum-branded skeleton loader
export function Skeleton({ className = '', variant = 'text', animate = true }: SkeletonProps) {
  const baseClasses = animate
    ? 'bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-pulse'
    : 'bg-gray-200'

  const variants = {
    text: `h-4 rounded ${baseClasses}`,
    avatar: `w-12 h-12 rounded-full ${baseClasses}`,
    card: `h-32 rounded-lg ${baseClasses}`,
    video: `aspect-video rounded-lg ${baseClasses}`,
    course: `h-48 rounded-xl ${baseClasses}`,
  }

  if (variant === 'course') {
    return (
      <div className={`p-6 border border-gray-200 rounded-xl ${className}`}>
        <div className={`${variants.video} mb-4`} />
        <div className="space-y-3">
          <div className="h-6 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
          <div className="flex items-center space-x-4">
            <div className="h-3 bg-gray-200 rounded w-16 animate-pulse" />
            <div className="h-3 bg-gray-200 rounded w-20 animate-pulse" />
          </div>
        </div>
      </div>
    )
  }

  return <div className={`${variants[variant]} ${className}`} />
}

// Cerebrum-branded progress bar
export function ProgressBar({
  progress,
  variant = 'cerebrum',
  showPercentage = true,
  label,
  className = '',
}: ProgressBarProps) {
  const variants = {
    default: {
      bg: 'bg-blue-50',
      fill: 'from-blue-500 to-blue-600',
    },
    cerebrum: {
      bg: 'bg-purple-50',
      fill: 'from-purple-600 to-indigo-600',
    },
    success: {
      bg: 'bg-emerald-50',
      fill: 'from-emerald-500 to-green-600',
    },
  }

  const currentVariant = variants[variant]

  return (
    <div className={`w-full ${className}`}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-2">
          {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
          {showPercentage && <span className="text-sm text-gray-500">{Math.round(progress)}%</span>}
        </div>
      )}

      <div className={`w-full h-2 ${currentVariant.bg} rounded-full overflow-hidden`}>
        <motion.div
          className={`h-full bg-gradient-to-r ${currentVariant.fill} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

// Cerebrum-branded loading screen for page transitions
export function CerebrumPageLoader({
  message = 'Loading Cerebrum Biology Academy...',
  timeout = 10000, // 10 seconds default timeout
  showBackButton = true,
}: {
  message?: string
  timeout?: number
  showBackButton?: boolean
}) {
  const [showError, setShowError] = React.useState(false)
  const [showTimeout, setShowTimeout] = React.useState(false)

  React.useEffect(() => {
    // Show timeout message after specified duration
    const timer = setTimeout(() => {
      setShowTimeout(true)
    }, timeout)

    return () => clearTimeout(timer)
  }, [timeout])

  const handleGoBack = () => {
    if (typeof window !== 'undefined') {
      window.history.back()
    }
  }

  const handleGoHome = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/'
    }
  }

  const handleRetry = () => {
    if (typeof window !== 'undefined') {
      window.location.reload()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md w-full">
        {/* Cerebrum Logo Animation */}
        <motion.div
          className="mb-8 flex justify-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative">
            <motion.div
              className="w-20 h-20 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl"
              animate={{ rotateY: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <BookOpen className="w-10 h-10 text-white" />
            </motion.div>

            {/* Orbiting elements */}
            {[Award, Users, Play].map((Icon, index) => (
              <motion.div
                key={index}
                className="absolute w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
                animate={{
                  x: [0, 40 * Math.cos((index * 120 * Math.PI) / 180)],
                  y: [0, 40 * Math.sin((index * 120 * Math.PI) / 180)],
                  rotate: 360,
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.5,
                  ease: 'linear',
                }}
              >
                <Icon className="w-4 h-4 text-purple-600" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Brand Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Cerebrum Biology Academy</h1>
          <p className="text-lg text-gray-600">NEET Biology Excellence</p>
        </motion.div>

        {/* Loading Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-8"
        >
          <p className="text-gray-500 mb-4">{message}</p>
          <LoadingSpinner size="lg" variant="cerebrum" />
        </motion.div>

        {/* Success Indicators */}
        {!showTimeout && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="grid grid-cols-3 gap-6 text-center"
          >
            <div>
              <div className="text-2xl font-bold text-purple-600 mb-1">94.2%</div>
              <div className="text-xs text-gray-500">Success Rate</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-indigo-600 mb-1">2,847+</div>
              <div className="text-xs text-gray-500">Selections</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600 mb-1">10K+</div>
              <div className="text-xs text-gray-500">Students</div>
            </div>
          </motion.div>
        )}

        {/* Timeout Message and Navigation Options */}
        {showTimeout && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-6 bg-white rounded-xl shadow-lg border border-gray-200"
          >
            <div className="mb-6">
              <p className="text-lg font-semibold text-gray-800 mb-2">
                Taking longer than expected...
              </p>
              <p className="text-sm text-gray-600">
                The page is taking a while to load. You can try refreshing or return to the
                homepage.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleRetry}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                🔄 Retry
              </button>
              <button
                onClick={handleGoBack}
                className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
              >
                ← Go Back
              </button>
              <button
                onClick={handleGoHome}
                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                🏠 Home
              </button>
            </div>
          </motion.div>
        )}

        {/* Always show back button at bottom */}
        {showBackButton && !showTimeout && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mt-8"
          >
            <button
              onClick={handleGoBack}
              className="text-sm text-gray-500 hover:text-gray-700 underline transition-colors"
            >
              ← Go back
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

// Cerebrum-branded skeleton for video components
export function VideoSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden ${className}`}>
      {/* Video thumbnail skeleton */}
      <div className="aspect-video bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-pulse relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <Play className="w-8 h-8 text-white/40" />
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        <div className="h-5 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
            <div className="h-3 bg-gray-200 rounded w-20 animate-pulse" />
          </div>
          <div className="h-3 bg-gray-200 rounded w-16 animate-pulse" />
        </div>
      </div>
    </div>
  )
}

// Cerebrum-branded course card skeleton
export function CourseSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden ${className}`}>
      {/* Header */}
      <div className="h-32 bg-gradient-to-r from-purple-100 via-indigo-100 to-blue-100 bg-[length:200%_100%] animate-pulse relative">
        <div className="absolute top-4 left-4">
          <div className="w-8 h-8 bg-white/40 rounded-lg animate-pulse" />
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="h-6 bg-white/40 rounded animate-pulse mb-2" />
          <div className="h-4 bg-white/40 rounded w-2/3 animate-pulse" />
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-5 bg-gray-200 rounded w-1/3 animate-pulse" />
          <div className="h-5 bg-gray-200 rounded w-1/4 animate-pulse" />
        </div>

        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
        </div>

        <div className="flex items-center space-x-4 pt-2">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-gray-300" />
            <div className="h-3 bg-gray-200 rounded w-12 animate-pulse" />
          </div>
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-gray-300" />
            <div className="h-3 bg-gray-200 rounded w-16 animate-pulse" />
          </div>
        </div>

        <div className="h-10 bg-gray-200 rounded-lg animate-pulse" />
      </div>
    </div>
  )
}

// Smart Button Loading States
interface SmartButtonProps {
  children: React.ReactNode
  isLoading?: boolean
  loadingText?: string
  successText?: string
  isSuccess?: boolean
  onClick?: () => void
  className?: string
  variant?: 'primary' | 'secondary' | 'success' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

export function SmartButton({
  children,
  isLoading = false,
  loadingText = 'Processing...',
  successText = '✓ Success!',
  isSuccess = false,
  onClick,
  className = '',
  variant = 'primary',
  size = 'md',
  disabled = false,
}: SmartButtonProps) {
  const variants = {
    primary: 'bg-purple-600 hover:bg-purple-700 text-white',
    secondary: 'bg-slate-600 hover:bg-slate-700 text-white',
    success: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  const isDisabled = isLoading || disabled

  return (
    <motion.button
      onClick={onClick}
      disabled={isDisabled}
      className={`
        relative overflow-hidden rounded-lg font-medium transition-all duration-200
        ${variants[variant]} ${sizes[size]}
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg active:scale-95'}
        ${className}
      `}
      whileTap={!isDisabled ? { scale: 0.98 } : {}}
    >
      <motion.div
        className="flex items-center justify-center space-x-2"
        animate={{
          opacity: isLoading ? 0.8 : 1,
          scale: isSuccess ? [1, 1.05, 1] : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        {isLoading && (
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
          />
        )}
        {isSuccess && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', bounce: 0.5 }}
            className="w-4 h-4 flex items-center justify-center"
          >
            <CheckCircle className="w-4 h-4" />
          </motion.div>
        )}
        <span>{isLoading ? loadingText : isSuccess ? successText : children}</span>
      </motion.div>

      {/* Success pulse effect */}
      {isSuccess && (
        <motion.div
          className="absolute inset-0 bg-white/20 rounded-lg"
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 1.1, opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      )}
    </motion.button>
  )
}

// Enhanced Success Feedback Component
interface SuccessFeedbackProps {
  isVisible: boolean
  message?: string
  description?: string
  onComplete?: () => void
  duration?: number
  variant?: 'default' | 'cerebrum' | 'inline'
  className?: string
}

export function SuccessFeedback({
  isVisible,
  message = 'Success!',
  description,
  onComplete,
  duration = 3000,
  variant = 'cerebrum',
  className = '',
}: SuccessFeedbackProps) {
  React.useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onComplete?.()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [isVisible, duration, onComplete])

  if (!isVisible) return null

  if (variant === 'inline') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: -10 }}
        className={`
          inline-flex items-center space-x-2 bg-emerald-100 text-emerald-800
          px-4 py-2 rounded-lg border border-emerald-200 font-medium
          ${className}
        `}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: 'spring', bounce: 0.5 }}
        >
          <CheckCircle className="w-4 h-4" />
        </motion.div>
        <span>{message}</span>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`
        fixed top-4 right-4 bg-white rounded-xl shadow-2xl border border-emerald-200
        p-6 max-w-sm z-50 ${className}
      `}
    >
      <div className="flex items-start space-x-3">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', bounce: 0.6 }}
          className="flex-shrink-0"
        >
          <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
          </div>
        </motion.div>
        <div className="flex-1">
          <motion.h3
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-sm font-semibold text-gray-900"
          >
            {message}
          </motion.h3>
          {description && (
            <motion.p
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="text-sm text-gray-600 mt-1"
            >
              {description}
            </motion.p>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <motion.div
        className="mt-4 h-1 bg-emerald-100 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          className="h-full bg-emerald-500"
          initial={{ width: '100%' }}
          animate={{ width: '0%' }}
          transition={{ duration: duration / 1000, ease: 'linear' }}
        />
      </motion.div>
    </motion.div>
  )
}

// Loading overlay for forms and interactive elements
export function LoadingOverlay({
  isVisible,
  message = 'Processing...',
  variant = 'cerebrum',
}: {
  isVisible: boolean
  message?: string
  variant?: 'default' | 'cerebrum' | 'success'
}) {
  if (!isVisible) return null

  const variants = {
    default: 'from-blue-600/90 to-indigo-600/90',
    cerebrum: 'from-purple-600/90 to-indigo-600/90',
    success: 'from-emerald-600/90 to-green-600/90',
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 bg-gradient-to-br ${variants[variant]} backdrop-blur-sm z-50 flex items-center justify-center`}
    >
      <div className="text-center text-white">
        <LoadingSpinner size="xl" variant="minimal" className="mb-4" />
        <p className="text-lg font-medium">{message}</p>
        <p className="text-sm opacity-80 mt-2">Cerebrum Biology Academy</p>
      </div>
    </motion.div>
  )
}

// Smart Loading States Export (matches user's request format)
export const LoadingStates = {
  // Skeleton screens for content
  courseSkeleton: CourseSkeleton,

  // Button loading states
  buttonLoading: SmartButton,

  // Success feedback
  showSuccess: SuccessFeedback,

  // Additional utilities
  spinner: LoadingSpinner,
  skeleton: Skeleton,
  progressBar: ProgressBar,
  pageLoader: CerebrumPageLoader,
  videoSkeleton: VideoSkeleton,
  loadingOverlay: LoadingOverlay,
}
