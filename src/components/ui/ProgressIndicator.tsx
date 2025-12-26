'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, X, CheckCircle2, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ProgressIndicatorProps {
  current: number
  total: number
  percentage?: number
  status?: string
  estimatedTime?: number
  onCancel?: () => void
  cancelable?: boolean
  mode?: 'determinate' | 'indeterminate'
  variant?: 'linear' | 'circular' | 'compact'
  size?: 'sm' | 'md' | 'lg'
  color?: 'blue' | 'emerald' | 'purple' | 'amber'
  showPercentage?: boolean
  showSteps?: boolean
  showEstimatedTime?: boolean
  className?: string
  error?: string
  success?: boolean
}

export function ProgressIndicator({
  current,
  total,
  percentage,
  status = 'Processing...',
  estimatedTime,
  onCancel,
  cancelable = true,
  mode = 'determinate',
  variant = 'linear',
  size = 'md',
  color = 'blue',
  showPercentage = true,
  showSteps = true,
  showEstimatedTime = true,
  className = '',
  error,
  success = false,
}: ProgressIndicatorProps) {
  const calculatedPercentage = percentage ?? (current / total) * 100

  const colorClasses = {
    blue: {
      bg: 'bg-blue-500',
      text: 'text-blue-600',
      ring: 'ring-blue-500/20',
      border: 'border-blue-500',
    },
    emerald: {
      bg: 'bg-green-600',
      text: 'text-green-600',
      ring: 'ring-green-600/20',
      border: 'border-green-600',
    },
    purple: {
      bg: 'bg-purple-500',
      text: 'text-purple-600',
      ring: 'ring-purple-500/20',
      border: 'border-purple-500',
    },
    amber: {
      bg: 'bg-amber-500',
      text: 'text-amber-600',
      ring: 'ring-amber-500/20',
      border: 'border-amber-500',
    },
  }

  const sizeClasses = {
    sm: {
      container: 'text-sm',
      progress: 'h-1.5',
      circle: 'w-8 h-8',
      text: 'text-xs',
    },
    md: {
      container: 'text-base',
      progress: 'h-2.5',
      circle: 'w-12 h-12',
      text: 'text-sm',
    },
    lg: {
      container: 'text-lg',
      progress: 'h-3',
      circle: 'w-16 h-16',
      text: 'text-base',
    },
  }

  const colors = colorClasses[color]
  const sizes = sizeClasses[size]

  const formatTime = (seconds?: number) => {
    if (!seconds) return null
    if (seconds < 60) return `${seconds}s`
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}m ${remainingSeconds}s`
  }

  if (variant === 'circular') {
    return (
      <div className={cn('flex flex-col items-center justify-center gap-4', className)}>
        <div className="relative">
          <svg className={cn(sizes.circle)} viewBox="0 0 100 100">
            <circle
              className="text-slate-200"
              strokeWidth="8"
              stroke="currentColor"
              fill="transparent"
              r="42"
              cx="50"
              cy="50"
            />
            <motion.circle
              className={colors.text}
              strokeWidth="8"
              strokeDasharray={264}
              strokeDashoffset={264 - (264 * calculatedPercentage) / 100}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="42"
              cx="50"
              cy="50"
              initial={{ strokeDashoffset: 264 }}
              animate={{
                strokeDashoffset:
                  mode === 'determinate' ? 264 - (264 * calculatedPercentage) / 100 : 264,
                rotate: mode === 'indeterminate' ? 360 : 0,
              }}
              transition={{
                strokeDashoffset: { duration: 0.5, ease: 'easeInOut' },
                rotate:
                  mode === 'indeterminate' ? { duration: 2, repeat: Infinity, ease: 'linear' } : {},
              }}
              style={{
                transformOrigin: '50% 50%',
                transform: 'rotate(-90deg)',
              }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            {error ? (
              <AlertCircle
                className={cn('w-6 h-6 text-red-500', sizes.circle === 'w-8 h-8' && 'w-4 h-4')}
              />
            ) : success ? (
              <CheckCircle2
                className={cn('w-6 h-6 text-green-600', sizes.circle === 'w-8 h-8' && 'w-4 h-4')}
              />
            ) : (
              <span className={cn('font-semibold', colors.text, sizes.text)}>
                {Math.round(calculatedPercentage)}%
              </span>
            )}
          </div>
        </div>

        <div className="text-center max-w-xs">
          <motion.p
            className={cn('font-medium', error ? 'text-red-600' : colors.text, sizes.container)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={status}
          >
            {error || status}
          </motion.p>

          {showSteps && !error && (
            <p className={cn('text-slate-500 mt-1', sizes.text)}>
              Step {current} of {total}
            </p>
          )}

          {showEstimatedTime && estimatedTime && !error && !success && (
            <p className={cn('text-slate-400 mt-1', sizes.text)}>
              About {formatTime(estimatedTime)} remaining
            </p>
          )}
        </div>

        {cancelable && onCancel && !error && !success && (
          <button
            onClick={onCancel}
            className={cn(
              'px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100',
              'rounded-lg transition-colors font-medium',
              sizes.text
            )}
          >
            Cancel
          </button>
        )}
      </div>
    )
  }

  if (variant === 'compact') {
    return (
      <div className={cn('flex items-center gap-3', className)}>
        {mode === 'indeterminate' ? (
          <Loader2 className={cn('animate-spin', colors.text, 'w-5 h-5')} />
        ) : (
          <div className={cn('relative', sizes.circle)}>
            <svg className="w-full h-full -rotate-90" viewBox="0 0 32 32">
              <circle
                className="text-slate-200"
                strokeWidth="3"
                stroke="currentColor"
                fill="transparent"
                r="14"
                cx="16"
                cy="16"
              />
              <motion.circle
                className={colors.text}
                strokeWidth="3"
                strokeDasharray={88}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="14"
                cx="16"
                cy="16"
                initial={{ strokeDashoffset: 88 }}
                animate={{ strokeDashoffset: 88 - (88 * calculatedPercentage) / 100 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={cn('font-semibold text-xs', colors.text)}>
                {Math.round(calculatedPercentage)}%
              </span>
            </div>
          </div>
        )}

        <div className="flex-1 min-w-0">
          <p
            className={cn('font-medium truncate', error ? 'text-red-600' : colors.text, sizes.text)}
          >
            {error || status}
          </p>
          {showSteps && !error && (
            <p className="text-slate-500 text-xs">
              {current}/{total}
            </p>
          )}
        </div>

        {cancelable && onCancel && !error && !success && (
          <button
            onClick={onCancel}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded transition-colors"
            aria-label="Cancel"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    )
  }

  return (
    <div className={cn('w-full space-y-3', className)}>
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <motion.p
            className={cn(
              'font-medium truncate',
              error ? 'text-red-600' : colors.text,
              sizes.container
            )}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            key={status}
          >
            {error ? (
              <span className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                {error}
              </span>
            ) : success ? (
              <span className="flex items-center gap-2 text-green-600">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                Complete!
              </span>
            ) : (
              status
            )}
          </motion.p>

          <div className={cn('flex items-center gap-4 mt-1', sizes.text)}>
            {showSteps && !error && (
              <span className="text-slate-500">
                Step {current} of {total}
              </span>
            )}

            {showPercentage && mode === 'determinate' && !error && (
              <span className={cn('font-semibold', colors.text)}>
                {Math.round(calculatedPercentage)}%
              </span>
            )}

            {showEstimatedTime && estimatedTime && !error && !success && (
              <span className="text-slate-400">{formatTime(estimatedTime)} remaining</span>
            )}
          </div>
        </div>

        {cancelable && onCancel && !error && !success && (
          <button
            onClick={onCancel}
            className={cn(
              'ml-4 px-3 py-1.5 text-slate-600 hover:text-slate-900',
              'hover:bg-slate-100 rounded-lg transition-colors font-medium flex-shrink-0',
              sizes.text
            )}
          >
            Cancel
          </button>
        )}
      </div>

      <div className="relative">
        <div className={cn('w-full bg-slate-200 rounded-full overflow-hidden', sizes.progress)}>
          {mode === 'indeterminate' ? (
            <motion.div
              className={cn('h-full rounded-full', colors.bg)}
              initial={{ x: '-100%', width: '40%' }}
              animate={{
                x: ['0%', '250%'],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ) : (
            <motion.div
              className={cn('h-full rounded-full', colors.bg)}
              initial={{ width: 0 }}
              animate={{ width: `${calculatedPercentage}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          )}
        </div>

        {success && (
          <motion.div
            className={cn('absolute inset-0 rounded-full', colors.bg)}
            initial={{ scaleX: calculatedPercentage / 100 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.3 }}
            style={{ transformOrigin: 'left' }}
          />
        )}
      </div>
    </div>
  )
}

export default ProgressIndicator
