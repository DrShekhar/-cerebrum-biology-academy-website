'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Check, Loader2, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface Step {
  id: string
  label: string
  description?: string
  status?: 'pending' | 'in-progress' | 'completed' | 'error'
  error?: string
}

export interface StepIndicatorProps {
  steps: Step[]
  currentStep: number
  orientation?: 'horizontal' | 'vertical'
  size?: 'sm' | 'md' | 'lg'
  color?: 'blue' | 'emerald' | 'purple' | 'amber'
  variant?: 'numbered' | 'icon' | 'minimal'
  showConnectors?: boolean
  animated?: boolean
  className?: string
  onStepClick?: (index: number) => void
  clickable?: boolean
}

export function StepIndicator({
  steps,
  currentStep,
  orientation = 'horizontal',
  size = 'md',
  color = 'blue',
  variant = 'numbered',
  showConnectors = true,
  animated = true,
  className = '',
  onStepClick,
  clickable = false,
}: StepIndicatorProps) {
  const colorClasses = {
    blue: {
      active: 'bg-blue-500 text-white border-blue-500',
      completed: 'bg-blue-500 text-white border-blue-500',
      pending: 'bg-slate-100 text-slate-400 border-slate-300',
      error: 'bg-red-500 text-white border-red-500',
      connector: 'bg-blue-500',
      text: 'text-blue-600',
    },
    emerald: {
      active: 'bg-emerald-500 text-white border-emerald-500',
      completed: 'bg-emerald-500 text-white border-emerald-500',
      pending: 'bg-slate-100 text-slate-400 border-slate-300',
      error: 'bg-red-500 text-white border-red-500',
      connector: 'bg-emerald-500',
      text: 'text-emerald-600',
    },
    purple: {
      active: 'bg-purple-500 text-white border-purple-500',
      completed: 'bg-purple-500 text-white border-purple-500',
      pending: 'bg-slate-100 text-slate-400 border-slate-300',
      error: 'bg-red-500 text-white border-red-500',
      connector: 'bg-purple-500',
      text: 'text-purple-600',
    },
    amber: {
      active: 'bg-amber-500 text-white border-amber-500',
      completed: 'bg-amber-500 text-white border-amber-500',
      pending: 'bg-slate-100 text-slate-400 border-slate-300',
      error: 'bg-red-500 text-white border-red-500',
      connector: 'bg-amber-500',
      text: 'text-amber-600',
    },
  }

  const sizeClasses = {
    sm: {
      circle: 'w-6 h-6 text-xs',
      text: 'text-xs',
      spacing: orientation === 'horizontal' ? 'gap-2' : 'gap-3',
      connector: orientation === 'horizontal' ? 'h-0.5' : 'w-0.5',
    },
    md: {
      circle: 'w-8 h-8 text-sm',
      text: 'text-sm',
      spacing: orientation === 'horizontal' ? 'gap-4' : 'gap-4',
      connector: orientation === 'horizontal' ? 'h-1' : 'w-1',
    },
    lg: {
      circle: 'w-10 h-10 text-base',
      text: 'text-base',
      spacing: orientation === 'horizontal' ? 'gap-6' : 'gap-6',
      connector: orientation === 'horizontal' ? 'h-1.5' : 'w-1.5',
    },
  }

  const colors = colorClasses[color]
  const sizes = sizeClasses[size]

  const getStepStatus = (index: number): Step['status'] => {
    const step = steps[index]
    if (step.status) return step.status
    if (index < currentStep) return 'completed'
    if (index === currentStep) return 'in-progress'
    return 'pending'
  }

  const renderStepContent = (step: Step, index: number) => {
    const status = getStepStatus(index)
    const isClickable =
      clickable && onStepClick && (status === 'completed' || status === 'in-progress')

    const circleClasses = cn(
      'rounded-full flex items-center justify-center font-semibold border-2 transition-all duration-300',
      sizes.circle,
      {
        [colors.active]: status === 'in-progress',
        [colors.completed]: status === 'completed',
        [colors.pending]: status === 'pending',
        [colors.error]: status === 'error',
        'ring-4 ring-offset-2': status === 'in-progress',
        'cursor-pointer hover:scale-105': isClickable,
      }
    )

    const getIcon = () => {
      if (status === 'error') return <AlertCircle className="w-4 h-4" />
      if (status === 'in-progress' && variant === 'icon')
        return <Loader2 className="w-4 h-4 animate-spin" />
      if (status === 'completed') return <Check className="w-4 h-4" />
      if (variant === 'icon') return null
      return <span>{index + 1}</span>
    }

    const containerClasses = cn(
      'flex items-center',
      orientation === 'vertical' ? 'flex-col' : 'flex-row',
      sizes.spacing
    )

    const StepWrapper = animated ? motion.div : 'div'

    return (
      <div
        key={step.id}
        className={cn(
          'flex items-start',
          orientation === 'vertical' ? 'flex-row gap-3' : 'flex-col items-center gap-2'
        )}
      >
        <div className={containerClasses}>
          <StepWrapper
            className={circleClasses}
            onClick={() => isClickable && onStepClick?.(index)}
            {...(animated && {
              initial: { scale: 0.8, opacity: 0 },
              animate: { scale: 1, opacity: 1 },
              transition: { delay: index * 0.1 },
            })}
          >
            {getIcon()}
          </StepWrapper>
        </div>

        <div className={cn('flex-1', orientation === 'vertical' ? '' : 'text-center')}>
          <motion.p
            className={cn('font-medium', sizes.text, {
              [colors.text]: status === 'in-progress',
              'text-emerald-600': status === 'completed',
              'text-slate-500': status === 'pending',
              'text-red-600': status === 'error',
            })}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.1 }}
          >
            {step.label}
          </motion.p>

          {step.description && (
            <motion.p
              className={cn('text-slate-500 mt-1', size === 'sm' ? 'text-xs' : 'text-xs')}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.2 }}
            >
              {step.description}
            </motion.p>
          )}

          {step.error && status === 'error' && (
            <motion.p
              className={cn('text-red-500 mt-1', size === 'sm' ? 'text-xs' : 'text-xs')}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {step.error}
            </motion.p>
          )}
        </div>
      </div>
    )
  }

  const renderConnector = (index: number) => {
    if (!showConnectors || index === steps.length - 1) return null

    const currentStatus = getStepStatus(index)
    const isCompleted = currentStatus === 'completed'

    if (orientation === 'horizontal') {
      return (
        <div className={cn('flex-1 mx-2 relative', size === 'sm' ? 'min-w-8' : 'min-w-12')}>
          <div className={cn('bg-slate-200 rounded-full', sizes.connector)}>
            <motion.div
              className={cn('rounded-full', colors.connector, sizes.connector)}
              initial={{ width: '0%' }}
              animate={{ width: isCompleted ? '100%' : '0%' }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
          </div>
        </div>
      )
    }

    return (
      <div
        className={cn('ml-4 my-1 relative', size === 'sm' ? 'h-6' : size === 'md' ? 'h-8' : 'h-10')}
      >
        <div className={cn('bg-slate-200 rounded-full h-full', sizes.connector)}>
          <motion.div
            className={cn('rounded-full', colors.connector, sizes.connector)}
            initial={{ height: '0%' }}
            animate={{ height: isCompleted ? '100%' : '0%' }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </div>
      </div>
    )
  }

  if (orientation === 'vertical') {
    return (
      <div className={cn('flex flex-col', className)}>
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            {renderStepContent(step, index)}
            {renderConnector(index)}
          </React.Fragment>
        ))}
      </div>
    )
  }

  return (
    <div className={cn('flex items-center w-full', className)}>
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          {renderStepContent(step, index)}
          {renderConnector(index)}
        </React.Fragment>
      ))}
    </div>
  )
}

export default StepIndicator
