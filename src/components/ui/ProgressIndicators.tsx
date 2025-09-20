'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckIcon } from '@heroicons/react/24/solid'

interface ScrollProgressBarProps {
  className?: string
  color?: 'emerald' | 'blue' | 'purple'
  height?: number
}

export function ScrollProgressBar({
  className = '',
  color = 'emerald',
  height = 3,
}: ScrollProgressBarProps) {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', updateScrollProgress)
    updateScrollProgress()

    return () => window.removeEventListener('scroll', updateScrollProgress)
  }, [])

  const gradients = {
    emerald: 'from-emerald-500 to-emerald-600',
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
  }

  return (
    <div
      className={`fixed top-0 left-0 z-50 bg-gradient-to-r ${gradients[color]} transition-all duration-150 ${className}`}
      style={{
        width: `${scrollProgress}%`,
        height: `${height}px`,
      }}
    />
  )
}

interface FormStep {
  id: string
  label: string
  description?: string
}

interface FormStepsProps {
  steps: FormStep[]
  currentStep: number
  completedSteps?: number[]
  className?: string
  variant?: 'circular' | 'linear'
  size?: 'sm' | 'md' | 'lg'
  showLabels?: boolean
}

export function FormSteps({
  steps,
  currentStep,
  completedSteps = [],
  className = '',
  variant = 'circular',
  size = 'md',
  showLabels = true,
}: FormStepsProps) {
  const sizes = {
    sm: { circle: 'w-6 h-6', text: 'text-xs', spacing: 'gap-2' },
    md: { circle: 'w-8 h-8', text: 'text-sm', spacing: 'gap-4' },
    lg: { circle: 'w-10 h-10', text: 'text-base', spacing: 'gap-6' },
  }

  const sizeClasses = sizes[size]

  if (variant === 'linear') {
    return (
      <div className={`w-full ${className}`}>
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => {
            const isCompleted = completedSteps.includes(index)
            const isActive = index === currentStep
            const isAccessible = index <= currentStep || isCompleted

            return (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center">
                  <div
                    className={`
                      ${sizeClasses.circle} rounded-full flex items-center justify-center font-semibold
                      transition-all duration-300 ${sizeClasses.text}
                      ${
                        isCompleted
                          ? 'bg-emerald-500 text-white'
                          : isActive
                            ? 'bg-blue-500 text-white ring-4 ring-blue-500/20'
                            : isAccessible
                              ? 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                              : 'bg-slate-100 text-slate-400'
                      }
                    `}
                  >
                    {isCompleted ? <CheckIcon className="w-4 h-4" /> : <span>{index + 1}</span>}
                  </div>
                  {showLabels && (
                    <div className="text-center mt-2">
                      <div
                        className={`font-medium ${sizeClasses.text} ${
                          isActive
                            ? 'text-blue-600'
                            : isCompleted
                              ? 'text-emerald-600'
                              : 'text-slate-600'
                        }`}
                      >
                        {step.label}
                      </div>
                      {step.description && (
                        <div className="text-xs text-slate-500 mt-1 max-w-20">
                          {step.description}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className="flex-1 mx-2">
                    <div className="h-px bg-slate-200 relative">
                      <motion.div
                        className="h-full bg-emerald-500"
                        initial={{ width: 0 }}
                        animate={{
                          width: completedSteps.includes(index) ? '100%' : '0%',
                        }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      />
                    </div>
                  </div>
                )}
              </React.Fragment>
            )
          })}
        </div>

        {/* Progress percentage */}
        <div className="text-center text-sm text-slate-600">
          Step {currentStep + 1} of {steps.length}
          <span className="text-slate-400 ml-2">
            ({Math.round((currentStep / (steps.length - 1)) * 100)}% complete)
          </span>
        </div>
      </div>
    )
  }

  // Circular variant (original)
  return (
    <div className={`flex justify-between items-center ${sizeClasses.spacing} ${className}`}>
      {steps.map((step, index) => {
        const isCompleted = completedSteps.includes(index)
        const isActive = index === currentStep

        return (
          <div key={step.id} className="flex flex-col items-center">
            <motion.div
              className={`
                ${sizeClasses.circle} rounded-full flex items-center justify-center font-semibold
                transition-all duration-300 ${sizeClasses.text}
                ${
                  isCompleted
                    ? 'bg-emerald-500 text-white'
                    : isActive
                      ? 'bg-blue-500 text-white ring-4 ring-blue-500/20'
                      : 'bg-slate-300 text-slate-600'
                }
              `}
              whileHover={{ scale: isActive ? 1.05 : 1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isCompleted ? <CheckIcon className="w-4 h-4" /> : <span>{index + 1}</span>}
            </motion.div>
            {showLabels && (
              <div className="text-center mt-2">
                <div
                  className={`font-medium ${sizeClasses.text} ${
                    isActive ? 'text-blue-600' : isCompleted ? 'text-emerald-600' : 'text-slate-600'
                  }`}
                >
                  {step.label}
                </div>
                {step.description && (
                  <div className="text-xs text-slate-500 mt-1">{step.description}</div>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

// Specialized quiz progress component
interface QuizProgressProps {
  totalSteps: number
  currentStep: number
  completedSteps?: number[]
  className?: string
}

export function QuizProgress({
  totalSteps,
  currentStep,
  completedSteps = [],
  className = '',
}: QuizProgressProps) {
  const progress = (currentStep / (totalSteps - 1)) * 100

  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-center mb-2 text-sm text-slate-600">
        <span>
          Question {currentStep + 1} of {totalSteps}
        </span>
        <span>{Math.round(progress)}% complete</span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-2">
        <motion.div
          className="bg-gradient-to-r from-emerald-500 to-blue-500 h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

// Enrollment form progress
interface EnrollmentProgressProps {
  currentStep: 'personal' | 'course' | 'payment' | 'confirmation'
  completedSteps?: string[]
  className?: string
}

export function EnrollmentProgress({
  currentStep,
  completedSteps = [],
  className = '',
}: EnrollmentProgressProps) {
  const steps: FormStep[] = [
    { id: 'personal', label: 'Personal Info', description: 'Basic details' },
    { id: 'course', label: 'Course Selection', description: 'Choose your course' },
    { id: 'payment', label: 'Payment', description: 'Secure checkout' },
    { id: 'confirmation', label: 'Confirmation', description: 'All done!' },
  ]

  const currentStepIndex = steps.findIndex((step) => step.id === currentStep)
  const completedStepIndices = completedSteps
    .map((stepId) => steps.findIndex((step) => step.id === stepId))
    .filter((index) => index !== -1)

  return (
    <FormSteps
      steps={steps}
      currentStep={currentStepIndex}
      completedSteps={completedStepIndices}
      variant="linear"
      size="md"
      className={className}
    />
  )
}
