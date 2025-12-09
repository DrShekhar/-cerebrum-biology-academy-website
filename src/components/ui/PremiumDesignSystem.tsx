'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'

// Premium Glassmorphism Card Component
interface PremiumCardProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'hover' | 'premium' | 'luxury'
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export function PremiumCard({
  children,
  className,
  variant = 'default',
  size = 'md',
}: PremiumCardProps) {
  const sizeClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-12',
  }

  const variantClasses = {
    default: 'bg-white/70 backdrop-blur-xl border border-white/20',
    hover:
      'bg-white/80 backdrop-blur-xl border border-white/30 hover:bg-white/90 hover:border-white/40',
    premium:
      'bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-2xl border border-white/30 shadow-2xl',
    luxury:
      'bg-gradient-to-br from-white/90 via-white/80 to-white/70 backdrop-blur-3xl border border-white/40 shadow-3xl',
  }

  return (
    <motion.div
      className={cn(
        'rounded-2xl transition-all duration-300',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      whileHover={{ y: -2, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  )
}

// Premium Button with Advanced Interactions
interface PremiumButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'luxury' | 'medical'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  disabled?: boolean
}

export function PremiumButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className,
  disabled = false,
}: PremiumButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  const sizeClasses = {
    sm: 'px-3 sm:px-4 py-2 text-xs sm:text-sm',
    md: 'px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base',
    lg: 'px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg',
    xl: 'px-6 sm:px-8 md:px-12 py-4 sm:py-5 md:py-6 text-sm sm:text-base md:text-lg lg:text-xl',
  }

  const variantClasses = {
    primary:
      'bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white shadow-lg shadow-blue-500/25',
    secondary:
      'bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 text-white shadow-lg shadow-gray-500/25',
    luxury:
      'bg-gradient-to-r from-purple-600 via-indigo-700 to-blue-800 text-white shadow-lg shadow-purple-500/25',
    medical:
      'bg-gradient-to-r from-green-600 via-teal-700 to-blue-800 text-white shadow-lg shadow-green-500/25',
  }

  return (
    <motion.button
      className={cn(
        'relative overflow-hidden rounded-xl font-semibold transition-all duration-300',
        'focus:outline-none focus:ring-4 focus:ring-opacity-50',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      onClick={onClick}
      disabled={disabled}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onTapStart={() => setIsPressed(true)}
      onTap={() => setIsPressed(false)}
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Shimmer Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: '-100%' }}
        animate={isHovered ? { x: '100%' } : { x: '-100%' }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      />

      {/* Ripple Effect */}
      <AnimatePresence>
        {isPressed && (
          <motion.div
            className="absolute inset-0 bg-white/20 rounded-xl"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 1.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
        )}
      </AnimatePresence>

      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}

// Sophisticated Statistics Counter
interface PremiumStatProps {
  value: number
  label: string
  prefix?: string
  suffix?: string
  decimals?: number
  duration?: number
  className?: string
}

export function PremiumStat({
  value,
  label,
  prefix = '',
  suffix = '',
  decimals = 0,
  duration = 2000,
  className,
}: PremiumStatProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    const element = document.getElementById(`stat-${label}`)
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [label])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number
    const startValue = 0
    const endValue = value

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3)
      const currentValue = startValue + (endValue - startValue) * easeOutCubic

      setDisplayValue(currentValue)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isVisible, value, duration])

  return (
    <motion.div
      id={`stat-${label}`}
      className={cn('text-center', className)}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        {prefix}
        {displayValue.toFixed(decimals)}
        {suffix}
      </div>
      <div className="text-sm text-gray-600 mt-1 font-medium">{label}</div>
    </motion.div>
  )
}

// Premium Loading Skeleton
interface PremiumSkeletonProps {
  lines?: number
  className?: string
  variant?: 'text' | 'card' | 'image' | 'button'
}

export function PremiumSkeleton({ lines = 3, className, variant = 'text' }: PremiumSkeletonProps) {
  const variants = {
    text: 'h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded',
    card: 'h-32 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 rounded-xl',
    image: 'h-48 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 rounded-lg',
    button: 'h-12 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-xl',
  }

  if (variant !== 'text') {
    return (
      <div className={cn(variants[variant], className)}>
        <motion.div
          className="w-full h-full bg-gradient-to-r from-transparent via-white/60 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    )
  }

  return (
    <div className={cn('space-y-3', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className={cn(variants.text, i === lines - 1 ? 'w-3/4' : 'w-full')}>
          <motion.div
            className="w-full h-full bg-gradient-to-r from-transparent via-white/60 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.1,
            }}
          />
        </div>
      ))}
    </div>
  )
}

// Premium Tooltip Component
interface PremiumTooltipProps {
  children: React.ReactNode
  content: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  className?: string
}

export function PremiumTooltip({
  children,
  content,
  position = 'top',
  className,
}: PremiumTooltipProps) {
  const [isVisible, setIsVisible] = useState(false)

  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
  }

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className={cn(
              'absolute z-50 px-3 py-2 text-sm text-white bg-gray-900/90 backdrop-blur-sm rounded-lg shadow-lg',
              'whitespace-nowrap pointer-events-none',
              positionClasses[position],
              className
            )}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
          >
            {content}
            {/* Arrow */}
            <div
              className={cn(
                'absolute w-2 h-2 bg-gray-900/90 transform rotate-45',
                position === 'top' && 'top-full left-1/2 -translate-x-1/2 -mt-1',
                position === 'bottom' && 'bottom-full left-1/2 -translate-x-1/2 -mb-1',
                position === 'left' && 'left-full top-1/2 -translate-y-1/2 -ml-1',
                position === 'right' && 'right-full top-1/2 -translate-y-1/2 -mr-1'
              )}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Animated Counter Component
interface AnimatedCounterProps {
  value: number
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
}

export function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  duration = 2000,
  className,
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    const element = document.getElementById(`counter-${value}`)
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [value])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number
    const startValue = 0
    const endValue = value

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3)
      const currentValue = startValue + (endValue - startValue) * easeOutCubic

      setDisplayValue(Math.floor(currentValue))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isVisible, value, duration])

  return (
    <span id={`counter-${value}`} className={className}>
      {prefix}
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  )
}

// Premium Progress Indicator
interface PremiumProgressProps {
  value: number
  max?: number
  label?: string
  showPercentage?: boolean
  variant?: 'linear' | 'circular'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function PremiumProgress({
  value,
  max = 100,
  label,
  showPercentage = true,
  variant = 'linear',
  size = 'md',
  className,
}: PremiumProgressProps) {
  const percentage = Math.min((value / max) * 100, 100)

  const sizeClasses = {
    sm: variant === 'linear' ? 'h-2' : 'w-12 h-12',
    md: variant === 'linear' ? 'h-3' : 'w-16 h-16',
    lg: variant === 'linear' ? 'h-4' : 'w-20 h-20',
  }

  if (variant === 'circular') {
    const circumference = 2 * Math.PI * 45
    const strokeDashoffset = circumference - (percentage / 100) * circumference

    return (
      <div className={cn('relative inline-flex items-center justify-center', className)}>
        <svg className={cn(sizeClasses[size], 'transform -rotate-90')}>
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            stroke="currentColor"
            strokeWidth="6"
            fill="transparent"
            className="text-gray-200"
          />
          <motion.circle
            cx="50%"
            cy="50%"
            r="45%"
            stroke="url(#progressGradient)"
            strokeWidth="6"
            fill="transparent"
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            style={{
              strokeDasharray: circumference,
            }}
          />
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
        </svg>
        {showPercentage && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-bold">{Math.round(percentage)}%</span>
          </div>
        )}
        {label && (
          <div className="absolute top-full mt-2 text-center">
            <span className="text-sm text-gray-600">{label}</span>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={cn('w-full', className)}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-2">
          {label && <span className="text-sm text-gray-600">{label}</span>}
          {showPercentage && <span className="text-sm font-medium">{Math.round(percentage)}%</span>}
        </div>
      )}
      <div className={cn('w-full bg-gray-200 rounded-full overflow-hidden', sizeClasses[size])}>
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
