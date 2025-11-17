import React from 'react'
import { cn } from '@/lib/utils'

/**
 * Base Skeleton Component
 *
 * A flexible skeleton loader component with animation variants and shapes.
 * Use this as the foundation for all loading states.
 *
 * @example
 * ```tsx
 * <Skeleton className="h-4 w-full" />
 * <Skeleton variant="circular" className="h-12 w-12" />
 * <Skeleton variant="rectangular" className="h-32" />
 * ```
 */

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Animation variant
   * @default 'pulse'
   */
  variant?: 'pulse' | 'wave' | 'none'

  /**
   * Shape of the skeleton
   * @default 'rounded'
   */
  shape?: 'rounded' | 'circular' | 'rectangular' | 'pill'

  /**
   * Number of lines to render (for text skeletons)
   */
  lines?: number

  /**
   * Spacing between lines (in Tailwind units)
   * @default 2
   */
  lineSpacing?: number
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant = 'pulse', shape = 'rounded', lines, lineSpacing = 2, ...props }, ref) => {
    const baseStyles = 'bg-gray-200 dark:bg-gray-700'

    const animations = {
      pulse: 'animate-pulse',
      wave: 'animate-shimmer bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700',
      none: '',
    }

    const shapes = {
      rounded: 'rounded-md',
      circular: 'rounded-full',
      rectangular: 'rounded-none',
      pill: 'rounded-full',
    }

    // Handle multiple lines
    if (lines && lines > 1) {
      return (
        <div className={cn('space-y-' + lineSpacing, className)} ref={ref} {...props}>
          {Array.from({ length: lines }).map((_, index) => (
            <div
              key={index}
              className={cn(
                baseStyles,
                animations[variant],
                shapes[shape],
                'h-4',
                // Last line is typically shorter
                index === lines - 1 && 'w-4/5'
              )}
            />
          ))}
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(baseStyles, animations[variant], shapes[shape], className)}
        {...props}
      />
    )
  }
)

Skeleton.displayName = 'Skeleton'

export { Skeleton }

// Predefined skeleton components for common use cases

export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return <Skeleton lines={lines} className={cn('w-full', className)} />
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn('rounded-lg border border-gray-200 p-4 dark:border-gray-700', className)}>
      <Skeleton className="mb-4 h-6 w-3/4" />
      <Skeleton lines={3} className="mb-4" />
      <div className="flex gap-2">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-20" />
      </div>
    </div>
  )
}

export function SkeletonAvatar({
  size = 'md',
  className,
}: {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}) {
  const sizes = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  }

  return <Skeleton shape="circular" className={cn(sizes[size], className)} />
}

export function SkeletonButton({ className }: { className?: string }) {
  return <Skeleton className={cn('h-10 w-24', className)} />
}

export function SkeletonInput({ className }: { className?: string }) {
  return <Skeleton className={cn('h-10 w-full rounded-md', className)} />
}

export function SkeletonImage({
  aspectRatio = 'video',
  className,
}: {
  aspectRatio?: 'square' | 'video' | 'portrait' | 'wide'
  className?: string
}) {
  const ratios = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    wide: 'aspect-[21/9]',
  }

  return <Skeleton className={cn('w-full', ratios[aspectRatio], className)} />
}

export function SkeletonTable({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) {
  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="flex gap-4 border-b border-gray-200 pb-2 dark:border-gray-700">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={`header-${i}`} className="h-4 flex-1" />
        ))}
      </div>

      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={`row-${rowIndex}`} className="flex gap-4 py-2">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton key={`cell-${rowIndex}-${colIndex}`} className="h-4 flex-1" />
          ))}
        </div>
      ))}
    </div>
  )
}

export function SkeletonList({
  items = 5,
  showAvatar = false,
}: {
  items?: number
  showAvatar?: boolean
}) {
  return (
    <div className="space-y-3">
      {Array.from({ length: items }).map((_, index) => (
        <div key={index} className="flex items-center gap-3">
          {showAvatar && <SkeletonAvatar size="md" />}
          <div className="flex-1">
            <Skeleton className="mb-2 h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function SkeletonForm({ fields = 4 }: { fields?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: fields }).map((_, index) => (
        <div key={index} className="space-y-2">
          <Skeleton className="h-4 w-24" /> {/* Label */}
          <SkeletonInput />
        </div>
      ))}
      <div className="flex gap-2 pt-4">
        <SkeletonButton className="w-32" />
        <SkeletonButton className="w-24" />
      </div>
    </div>
  )
}
