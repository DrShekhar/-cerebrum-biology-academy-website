'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Loader2,
  Target,
  DollarSign,
  Clock,
  Users,
  Book,
  MapPin,
  TrendingUp,
} from 'lucide-react'

import { useCourseSelectorState } from '@/hooks/useCourseSelectorState'
import { useAnalytics } from '@/hooks/useAnalytics'
import { useABTest } from '@/hooks/useABTest'
import { useCourseAPI } from '@/hooks/useCourseAPI'
import { usePricingCalculator } from '@/hooks/usePricingCalculator'

// TODO: These wizard components need to be implemented
// import { WizardProgressIndicator } from './wizard/WizardProgressIndicator'
// import { GoalsSelectionStep } from './wizard/steps/GoalsSelectionStep'
// import { BudgetPreferenceStep } from './wizard/steps/BudgetPreferenceStep'
// import { TimeAvailabilityStep } from './wizard/steps/TimeAvailabilityStep'
// import { LocationPreferenceStep } from './wizard/steps/LocationPreferenceStep'
// import { LearningStyleStep } from './wizard/steps/LearningStyleStep'
// import { WeakAreasAssessmentStep } from './wizard/steps/WeakAreasAssessmentStep'
// import { CourseRecommendationsStep } from './wizard/steps/CourseRecommendationsStep'
// import { PricingCalculatorStep } from './wizard/steps/PricingCalculatorStep'
// import { FinalConfirmationStep } from './wizard/steps/FinalConfirmationStep'

export interface WizardStepProps {
  data: any
  onUpdate: (data: any) => void
  onNext: () => void
  onPrev: () => void
  isValid: boolean
  variant?: 'default' | 'compact' | 'detailed'
}

export interface WizardStep {
  id: string
  title: string
  description: string
  component: React.ComponentType<WizardStepProps>
  icon: React.ReactNode
  validation?: (data: any) => boolean
  optional?: boolean
  completionWeight: number
}

// Placeholder components until wizard steps are implemented
const PlaceholderStep: React.FC<WizardStepProps> = ({ data, onUpdate, onNext, onPrev }) => (
  <div className="p-8 text-center">
    <p className="text-gray-600 mb-4">This step component needs to be implemented.</p>
    <button onClick={onNext} className="px-4 py-2 bg-emerald-600 text-white rounded">
      Continue
    </button>
  </div>
)

const WizardProgressIndicator: React.FC<any> = () => <div />
const GoalsSelectionStep = PlaceholderStep
const BudgetPreferenceStep = PlaceholderStep
const TimeAvailabilityStep = PlaceholderStep
const LocationPreferenceStep = PlaceholderStep
const LearningStyleStep = PlaceholderStep
const WeakAreasAssessmentStep = PlaceholderStep
const CourseRecommendationsStep = PlaceholderStep
const PricingCalculatorStep = PlaceholderStep
const FinalConfirmationStep = PlaceholderStep

export interface CourseSelectionData {
  goals: {
    targetScore: number
    preferredRank: number
    focusAreas: string[]
    timelinePreference: string
  }
  budget: {
    maxAmount: number
    paymentPreference: string
    scholarshipInterest: boolean
    familyIncome?: string
  }
  timeAvailability: {
    hoursPerDay: number
    preferredSchedule: string[]
    flexibilityLevel: string
    weekendAvailability: boolean
  }
  location: {
    city: string
    state: string
    preferredMode: string
    transportAccess: boolean
  }
  learningStyle: {
    preferredMethods: string[]
    difficultyPreference: string
    supportLevel: string
    assessmentFrequency: string
  }
  weakAreas: {
    subjects: { [key: string]: number }
    priorityTopics: string[]
    improvementGoals: string[]
  }
  selectedCourse?: any
  pricing?: any
}

const CourseWizardContainer: React.FC = () => {
  const {
    currentStep,
    setCurrentStep,
    selectionData,
    updateSelectionData,
    resetWizard,
    completionPercentage,
    isStepValid,
    getValidationErrors,
  } = useCourseSelectorState()

  const { trackEvent, trackStepCompletion, trackAbandon } = useAnalytics()
  const { variant, isControlGroup } = useABTest('course-wizard-layout')
  const { courses, loading: coursesLoading, error: coursesError, fetchCourses } = useCourseAPI()
  const {
    calculatePricing,
    getPricingBreakdown,
    getDiscountEligibility,
    loading: pricingLoading,
  } = usePricingCalculator()

  const [wizardState, setWizardState] = useState<{
    isLoading: boolean
    error: string | null
    startTime: Date
    stepStartTimes: { [stepId: string]: Date }
  }>({
    isLoading: false,
    error: null,
    startTime: new Date(),
    stepStartTimes: {},
  })

  const wizardSteps: WizardStep[] = useMemo(
    () => [
      {
        id: 'goals',
        title: 'Learning Goals',
        description: 'Define your NEET preparation objectives',
        component: GoalsSelectionStep,
        icon: <Target className="w-5 h-5" />,
        validation: (data) => data?.goals?.targetScore && data?.goals?.preferredRank,
        completionWeight: 20,
      },
      {
        id: 'budget',
        title: 'Budget Planning',
        description: 'Set your investment preferences',
        component: BudgetPreferenceStep,
        icon: <DollarSign className="w-5 h-5" />,
        validation: (data) => data?.budget?.maxAmount && data?.budget?.paymentPreference,
        completionWeight: 15,
      },
      {
        id: 'time',
        title: 'Time Availability',
        description: 'Plan your study schedule',
        component: TimeAvailabilityStep,
        icon: <Clock className="w-5 h-5" />,
        validation: (data) =>
          data?.timeAvailability?.hoursPerDay && data?.timeAvailability?.preferredSchedule?.length,
        completionWeight: 10,
      },
      {
        id: 'location',
        title: 'Location & Mode',
        description: 'Choose your learning environment',
        component: LocationPreferenceStep,
        icon: <MapPin className="w-5 h-5" />,
        validation: (data) => data?.location?.city && data?.location?.preferredMode,
        completionWeight: 10,
      },
      {
        id: 'learning-style',
        title: 'Learning Style',
        description: 'Personalize your learning approach',
        component: LearningStyleStep,
        icon: <Users className="w-5 h-5" />,
        validation: (data) =>
          data?.learningStyle?.preferredMethods?.length &&
          data?.learningStyle?.difficultyPreference,
        completionWeight: 15,
      },
      {
        id: 'weak-areas',
        title: 'Areas of Focus',
        description: 'Identify improvement opportunities',
        component: WeakAreasAssessmentStep,
        icon: <TrendingUp className="w-5 h-5" />,
        validation: (data) =>
          data?.weakAreas?.subjects && Object.keys(data?.weakAreas?.subjects).length,
        completionWeight: 10,
      },
      {
        id: 'recommendations',
        title: 'Course Recommendations',
        description: 'Discover perfect courses for you',
        component: CourseRecommendationsStep,
        icon: <Book className="w-5 h-5" />,
        validation: (data) => data?.selectedCourse,
        completionWeight: 15,
      },
      {
        id: 'pricing',
        title: 'Pricing & Payment',
        description: 'Customize your payment plan',
        component: PricingCalculatorStep,
        icon: <DollarSign className="w-5 h-5" />,
        validation: (data) => data?.pricing?.selectedPlan,
        optional: true,
        completionWeight: 5,
      },
    ],
    []
  )

  const currentStepData = useMemo(() => {
    return wizardSteps[currentStep] || wizardSteps[0]
  }, [currentStep, wizardSteps])

  const isLastStep = currentStep === wizardSteps.length - 1

  useEffect(() => {
    trackEvent('wizard_started', {
      variant,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
    })

    setWizardState((prev) => ({
      ...prev,
      stepStartTimes: { [currentStepData.id]: new Date() },
    }))

    return () => {
      trackAbandon('wizard', {
        step: currentStepData.id,
        completionPercentage,
        timeSpent: Date.now() - wizardState.startTime.getTime(),
      })
    }
  }, [])

  useEffect(() => {
    const stepStartTime = new Date()
    setWizardState((prev) => ({
      ...prev,
      stepStartTimes: { ...prev.stepStartTimes, [currentStepData.id]: stepStartTime },
    }))

    trackEvent('step_viewed', {
      stepId: currentStepData.id,
      stepNumber: currentStep + 1,
      timestamp: stepStartTime.toISOString(),
    })
  }, [currentStep, currentStepData.id])

  useEffect(() => {
    if (currentStep === wizardSteps.findIndex((step) => step.id === 'recommendations')) {
      fetchCourses(selectionData)
    }
  }, [currentStep, selectionData])

  const handleNext = useCallback(async () => {
    const stepStartTime = wizardState.stepStartTimes[currentStepData.id]
    const timeSpent = stepStartTime ? Date.now() - stepStartTime.getTime() : 0

    if (!isStepValid(currentStep)) {
      trackEvent('validation_error', {
        stepId: currentStepData.id,
        errors: getValidationErrors(currentStep),
      })
      return
    }

    trackStepCompletion(currentStepData.id, {
      timeSpent,
      completionPercentage: completionPercentage + currentStepData.completionWeight,
      data: selectionData,
    })

    if (currentStep === wizardSteps.findIndex((step) => step.id === 'budget')) {
      setWizardState((prev) => ({ ...prev, isLoading: true }))
      try {
        const pricing = await calculatePricing(selectionData)
        updateSelectionData('pricing', pricing)
      } catch (error) {
        console.error('Pricing calculation failed:', error)
      } finally {
        setWizardState((prev) => ({ ...prev, isLoading: false }))
      }
    }

    if (isLastStep) {
      trackEvent('wizard_completed', {
        totalTimeSpent: Date.now() - wizardState.startTime.getTime(),
        finalData: selectionData,
        variant,
      })
    } else {
      setCurrentStep(currentStep + 1)
    }
  }, [
    currentStep,
    currentStepData,
    isStepValid,
    isLastStep,
    selectionData,
    wizardState,
    completionPercentage,
  ])

  const handlePrev = useCallback(() => {
    if (currentStep > 0) {
      trackEvent('step_back', {
        fromStep: currentStepData.id,
        toStep: wizardSteps[currentStep - 1].id,
      })
      setCurrentStep(currentStep - 1)
    }
  }, [currentStep, currentStepData.id])

  const handleDataUpdate = useCallback(
    (stepKey: string, data: any) => {
      updateSelectionData(stepKey, data)

      trackEvent('data_updated', {
        stepId: currentStepData.id,
        field: stepKey,
        hasValue: !!data,
      })
    },
    [currentStepData.id, updateSelectionData]
  )

  const StepComponent = currentStepData.component

  if (wizardState.error) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Something went wrong</h2>
        <p className="text-gray-600 mb-6">{wizardState.error}</p>
        <button
          onClick={() => {
            setWizardState((prev) => ({ ...prev, error: null }))
            resetWizard()
          }}
          className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
        >
          Start Over
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Progress Header */}
        <div className="mb-8">
          <WizardProgressIndicator
            steps={wizardSteps}
            currentStep={currentStep}
            completionPercentage={completionPercentage}
            variant={variant}
          />
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Step Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-blue-600 p-6 text-white">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                {currentStepData.icon}
              </div>
              <div>
                <h1 className="text-2xl font-bold">{currentStepData.title}</h1>
                <p className="text-emerald-100 mt-1">{currentStepData.description}</p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm text-emerald-100">
              <span>
                Step {currentStep + 1} of {wizardSteps.length}
              </span>
              {currentStepData.optional && (
                <span className="px-3 py-1 bg-white/20 rounded-full">Optional</span>
              )}
            </div>
          </div>

          {/* Step Content */}
          <div className="p-6 lg:p-8">
            {wizardState.isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
                <span className="ml-3 text-gray-600">Processing your preferences...</span>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStepData.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <StepComponent
                    data={selectionData}
                    onUpdate={handleDataUpdate}
                    onNext={handleNext}
                    onPrev={handlePrev}
                    isValid={isStepValid(currentStep)}
                    variant={variant}
                  />
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          {/* Navigation Footer */}
          <div className="bg-gray-50 px-6 py-4 lg:px-8 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <button
                onClick={handlePrev}
                disabled={currentStep === 0}
                className="flex items-center gap-2 px-6 py-3 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>

              <div className="flex items-center gap-4">
                {!isStepValid(currentStep) && (
                  <div className="flex items-center gap-2 text-amber-600">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">Please complete required fields</span>
                  </div>
                )}

                {currentStepData.optional && (
                  <button
                    onClick={handleNext}
                    className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                  >
                    Skip this step
                  </button>
                )}

                <button
                  onClick={handleNext}
                  disabled={!isStepValid(currentStep) && !currentStepData.optional}
                  className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLastStep ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Complete Setup
                    </>
                  ) : (
                    <>
                      Continue
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        {variant === 'detailed' && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Data Security</h3>
              <p className="text-sm text-gray-600">Your information is encrypted and secure</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Save Progress</h3>
              <p className="text-sm text-gray-600">Your selections are automatically saved</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Expert Support</h3>
              <p className="text-sm text-gray-600">Get help from our counselors anytime</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CourseWizardContainer
