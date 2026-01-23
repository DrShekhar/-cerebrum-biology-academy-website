'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Clock } from 'lucide-react'

export type FormDataRecord = Record<string, unknown>

export interface FormStep<T extends FormDataRecord = FormDataRecord> {
  id: string
  title: string
  description?: string
  component: React.ComponentType<StepComponentProps<T>>
  validation?: (data: T) => { isValid: boolean; errors?: string[] }
  skippable?: boolean
}

export interface StepComponentProps<T extends FormDataRecord = FormDataRecord> {
  data: T
  onNext: (stepData: Partial<T>) => void
  onPrevious?: () => void
  isLoading?: boolean
  errors?: string[]
}

interface MultiStepFormProps<T extends FormDataRecord = FormDataRecord> {
  steps: FormStep<T>[]
  onComplete: (data: T) => Promise<void>
  onStepChange?: (currentStep: number, totalSteps: number) => void
  autoSave?: boolean
  autoSaveKey?: string
  className?: string
  showProgressIndicator?: boolean
  allowBackNavigation?: boolean
}

export const MultiStepForm = <T extends FormDataRecord = FormDataRecord>({
  steps,
  onComplete,
  onStepChange,
  autoSave = true,
  autoSaveKey = 'multiStepFormData',
  className = '',
  showProgressIndicator = true,
  allowBackNavigation = true,
}: MultiStepFormProps<T>) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<T>({} as T)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const [savedProgress, setSavedProgress] = useState(false)

  // Load saved progress on mount
  useEffect(() => {
    if (autoSave && typeof window !== 'undefined') {
      const saved = localStorage.getItem(autoSaveKey)
      if (saved) {
        try {
          const parsed = JSON.parse(saved) as { data: T; step: number; timestamp: number }
          // Only restore if saved within last 24 hours
          if (Date.now() - parsed.timestamp < 24 * 60 * 60 * 1000) {
            setFormData(parsed.data)
            setCurrentStep(Math.min(parsed.step, steps.length - 1))
          }
        } catch (error) {
          console.error('Failed to restore form data:', error)
        }
      }
    }
  }, [autoSave, autoSaveKey, steps.length])

  // Auto-save progress
  useEffect(() => {
    if (autoSave && typeof window !== 'undefined') {
      const saveProgress = () => {
        const progressData = {
          data: formData,
          step: currentStep,
          timestamp: Date.now(),
        }
        localStorage.setItem(autoSaveKey, JSON.stringify(progressData))
        setSavedProgress(true)
        setTimeout(() => setSavedProgress(false), 2000)
      }

      const timer = setTimeout(saveProgress, 1000)
      return () => clearTimeout(timer)
    }
  }, [formData, currentStep, autoSave, autoSaveKey])

  // Notify parent of step changes
  useEffect(() => {
    onStepChange?.(currentStep, steps.length)
  }, [currentStep, steps.length, onStepChange])

  const handleNext = async (stepData: Partial<T>) => {
    setIsLoading(true)
    setErrors([])

    const updatedData = { ...formData, ...stepData } as T

    // Validate current step
    const currentStepConfig = steps[currentStep]
    if (currentStepConfig.validation) {
      const validation = currentStepConfig.validation(updatedData)
      if (!validation.isValid) {
        setErrors(validation.errors || ['Please fix the errors and try again'])
        setIsLoading(false)
        return
      }
    }

    setFormData(updatedData)

    try {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1)
      } else {
        await onComplete(updatedData)
        // Clear saved progress on successful completion
        if (autoSave && typeof window !== 'undefined') {
          localStorage.removeItem(autoSaveKey)
        }
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setErrors(['An error occurred. Please try again.'])
    } finally {
      setIsLoading(false)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0 && allowBackNavigation) {
      setCurrentStep(currentStep - 1)
      setErrors([])
    }
  }

  const handleSkip = () => {
    const currentStepConfig = steps[currentStep]
    if (currentStepConfig.skippable && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
      setErrors([])
    }
  }

  const getStepStatus = (stepIndex: number) => {
    if (stepIndex < currentStep) return 'completed'
    if (stepIndex === currentStep) return 'current'
    return 'pending'
  }

  const currentStepConfig = steps[currentStep]
  const StepComponent = currentStepConfig.component

  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      {/* Progress Indicator */}
      {showProgressIndicator && (
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const status = getStepStatus(index)
              return (
                <div
                  key={step.id}
                  className={`flex items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}
                >
                  <div
                    className={`relative flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                      status === 'completed'
                        ? 'bg-green-600 border-green-600 text-white'
                        : status === 'current'
                          ? 'bg-blue-600 border-blue-600 text-white'
                          : 'bg-white border-gray-300 text-gray-500'
                    }`}
                  >
                    {status === 'completed' ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <span className="text-sm font-medium">{index + 1}</span>
                    )}
                  </div>

                  <div className="ml-3">
                    <p
                      className={`text-sm font-medium ${
                        status === 'completed' || status === 'current'
                          ? 'text-gray-900'
                          : 'text-gray-500'
                      }`}
                    >
                      {step.title}
                    </p>
                    {step.description && (
                      <p className="text-xs text-gray-500">{step.description}</p>
                    )}
                  </div>

                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-4 ${
                        status === 'completed' ? 'bg-green-600' : 'bg-gray-300'
                      }`}
                    />
                  )}
                </div>
              )
            })}
          </div>

          {/* Progress bar */}
          <div className="mt-6 h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-blue-600 rounded-full"
              initial={{ width: 0 }}
              animate={{
                width: `${((currentStep + 1) / steps.length) * 100}%`,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      )}

      {/* Auto-save indicator */}
      {savedProgress && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mb-4 flex items-center justify-center text-sm text-green-600"
        >
          <Clock className="w-4 h-4 mr-1" />
          Progress saved automatically
        </motion.div>
      )}

      {/* Error display */}
      {errors.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4"
        >
          <div className="text-red-800">
            <h3 className="font-medium mb-2">Please fix the following errors:</h3>
            <ul className="list-disc list-inside space-y-1">
              {errors.map((error, index) => (
                <li key={index} className="text-sm">
                  {error}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* Current Step Content */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">{currentStepConfig.title}</h2>
          {currentStepConfig.description && (
            <p className="mt-1 text-sm text-gray-600">{currentStepConfig.description}</p>
          )}
        </div>

        <div className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <StepComponent
                data={formData}
                onNext={handleNext}
                onPrevious={allowBackNavigation ? handlePrevious : undefined}
                isLoading={isLoading}
                errors={errors}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {allowBackNavigation && currentStep > 0 && (
              <button
                type="button"
                onClick={handlePrevious}
                disabled={isLoading}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              >
                Previous
              </button>
            )}

            {currentStepConfig.skippable && currentStep < steps.length - 1 && (
              <button
                type="button"
                onClick={handleSkip}
                disabled={isLoading}
                className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50"
              >
                Skip this step
              </button>
            )}
          </div>

          <div className="text-sm text-gray-500">
            Step {currentStep + 1} of {steps.length}
          </div>
        </div>
      </div>
    </div>
  )
}

