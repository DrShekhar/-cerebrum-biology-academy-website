'use client'

import React from 'react'
import { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

export interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  primaryAction?: {
    label: string
    href?: string
    onClick?: () => void
  }
  secondaryAction?: {
    label: string
    href?: string
    onClick?: () => void
  }
  illustration?: 'default' | 'search' | 'test' | 'chat' | 'progress'
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'info' | 'success' | 'warning'
  className?: string
  animate?: boolean
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  primaryAction,
  secondaryAction,
  illustration = 'default',
  size = 'md',
  variant = 'default',
  className = '',
  animate = true,
}: EmptyStateProps) {
  const sizeClasses = {
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-16',
  }

  const iconSizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20',
  }

  const iconContainerSizeClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-5',
  }

  const titleSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  }

  const variantStyles = {
    default: {
      bg: 'bg-gray-100',
      iconColor: 'text-gray-500',
    },
    info: {
      bg: 'bg-blue-100',
      iconColor: 'text-blue-500',
    },
    success: {
      bg: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    warning: {
      bg: 'bg-orange-100',
      iconColor: 'text-orange-500',
    },
  }

  const styles = variantStyles[variant]

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut' as const,
      },
    },
  }

  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.3,
        delay: 0.1,
      },
    },
  }

  const EmptyStateContent = (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center',
        sizeClasses[size],
        className
      )}
    >
      <motion.div
        className={cn(
          'inline-flex items-center justify-center rounded-full mb-4',
          styles.bg,
          iconContainerSizeClasses[size]
        )}
        variants={animate ? iconVariants : undefined}
        initial={animate ? 'hidden' : undefined}
        animate={animate ? 'visible' : undefined}
      >
        <Icon className={cn(styles.iconColor, iconSizeClasses[size])} />
      </motion.div>

      <h3 className={cn('font-semibold text-gray-900 mb-2', titleSizeClasses[size])}>{title}</h3>

      <p className="text-gray-600 mb-6 max-w-md text-sm md:text-base">{description}</p>

      {(primaryAction || secondaryAction) && (
        <div className="flex flex-col sm:flex-row gap-3 items-center">
          {primaryAction && (
            <>
              {primaryAction.href ? (
                <Link href={primaryAction.href}>
                  <Button variant="primary" size="lg" animate={false}>
                    {primaryAction.label}
                  </Button>
                </Link>
              ) : (
                <Button variant="primary" size="lg" onClick={primaryAction.onClick} animate={false}>
                  {primaryAction.label}
                </Button>
              )}
            </>
          )}

          {secondaryAction && (
            <>
              {secondaryAction.href ? (
                <Link href={secondaryAction.href}>
                  <Button variant="secondary" size="lg" animate={false}>
                    {secondaryAction.label}
                  </Button>
                </Link>
              ) : (
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={secondaryAction.onClick}
                  animate={false}
                >
                  {secondaryAction.label}
                </Button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )

  if (animate) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full"
      >
        {EmptyStateContent}
      </motion.div>
    )
  }

  return <div className="w-full">{EmptyStateContent}</div>
}
