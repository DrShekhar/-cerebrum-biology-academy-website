import { useEffect, useCallback, useRef } from 'react'
import { useFunnelAnalytics } from './useFunnelAnalytics'

interface StepMapping {
  wizardStep: number
  funnelStepId: string
  metadata?: Record<string, any>
}

// Map wizard steps to funnel analysis points
const WIZARD_FUNNEL_MAPPING: StepMapping[] = [
  { wizardStep: 0, funnelStepId: 'course_selector_initiation' },
  { wizardStep: 1, funnelStepId: 'personal_info_step' },
  { wizardStep: 2, funnelStepId: 'academic_background_step' },
  { wizardStep: 3, funnelStepId: 'goals_aspirations_step' },
  { wizardStep: 4, funnelStepId: 'study_preferences_step' },
  { wizardStep: 5, funnelStepId: 'budget_planning_step' },
  { wizardStep: 6, funnelStepId: 'course_recommendations_view' },
  { wizardStep: 7, funnelStepId: 'course_selection_final' },
]

export function useFunnelIntegration(
  currentStep: number,
  formData: Record<string, any>,
  userId: string
) {
  const { trackStepEntry, trackStepCompletion, trackStepExit } = useFunnelAnalytics(userId)
  const previousStep = useRef<number>(-1)
  const stepStartTime = useRef<number>(0)

  // Track step transitions
  useEffect(() => {
    if (currentStep !== previousStep.current) {
      const mapping = WIZARD_FUNNEL_MAPPING.find((m) => m.wizardStep === currentStep)
      const previousMapping = WIZARD_FUNNEL_MAPPING.find(
        (m) => m.wizardStep === previousStep.current
      )

      // Complete previous step if it exists
      if (previousMapping && previousStep.current >= 0) {
        const metadata = {
          timeSpent: Date.now() - stepStartTime.current,
          formData: extractRelevantFormData(previousStep.current, formData),
          completionRate: calculateStepCompletionRate(previousStep.current, formData),
        }
        trackStepCompletion(previousMapping.funnelStepId, metadata)
      }

      // Start new step
      if (mapping) {
        stepStartTime.current = Date.now()
        const metadata = {
          entryMethod: previousStep.current < currentStep ? 'forward' : 'backward',
          formProgress: calculateOverallProgress(formData),
          deviceType: getDeviceType(),
          browserInfo: getBrowserInfo(),
        }
        trackStepEntry(mapping.funnelStepId, metadata)
      }

      previousStep.current = currentStep
    }
  }, [currentStep, trackStepEntry, trackStepCompletion, formData])

  // Track step exit on unmount or navigation
  useEffect(() => {
    return () => {
      const mapping = WIZARD_FUNNEL_MAPPING.find((m) => m.wizardStep === currentStep)
      if (mapping) {
        const metadata = {
          timeSpent: Date.now() - stepStartTime.current,
          exitReason: 'navigation',
          formData: extractRelevantFormData(currentStep, formData),
        }
        trackStepExit(mapping.funnelStepId, 'navigation', metadata)
      }
    }
  }, [])

  // Track specific interaction events
  const trackInteraction = useCallback(
    (
      interactionType:
        | 'field_focus'
        | 'field_blur'
        | 'validation_error'
        | 'help_viewed'
        | 'retry_attempt',
      details: Record<string, any>
    ) => {
      const mapping = WIZARD_FUNNEL_MAPPING.find((m) => m.wizardStep === currentStep)
      if (mapping) {
        // Send interaction event to analytics
        if (typeof window !== 'undefined' && 'gtag' in window) {
          const gtag = (window as any).gtag
          gtag('event', 'funnel_interaction', {
            step_id: mapping.funnelStepId,
            interaction_type: interactionType,
            ...details,
          })
        }
      }
    },
    [currentStep]
  )

  // Track error events
  const trackError = useCallback(
    (
      errorType: 'validation' | 'network' | 'timeout' | 'system',
      errorDetails: Record<string, any>
    ) => {
      const mapping = WIZARD_FUNNEL_MAPPING.find((m) => m.wizardStep === currentStep)
      if (mapping) {
        const metadata = {
          errorType,
          errorDetails,
          formState: formData,
          timestamp: Date.now(),
        }
        trackStepExit(mapping.funnelStepId, 'error', metadata)
      }
    },
    [currentStep, formData, trackStepExit]
  )

  return {
    trackInteraction,
    trackError,
  }
}

// Helper functions
function extractRelevantFormData(step: number, formData: Record<string, any>): Record<string, any> {
  switch (step) {
    case 1: // Personal Info
      return {
        hasName: !!formData.fullName,
        hasEmail: !!formData.email,
        hasPhone: !!formData.phone,
        hasLocation: !!formData.city && !!formData.state,
        fieldsCompleted: [
          formData.fullName,
          formData.email,
          formData.phone,
          formData.city,
          formData.state,
        ].filter(Boolean).length,
      }

    case 2: // Academic Background
      return {
        hasClass: !!formData.currentClass,
        hasBoard: !!formData.board,
        hasSubjects: !!formData.subjects?.length,
        hasPerformance: !!formData.academicPerformance,
        previousAttempts: formData.previousNEETAttempts || 0,
        fieldsCompleted: [
          formData.currentClass,
          formData.board,
          formData.subjects,
          formData.academicPerformance,
        ].filter(Boolean).length,
      }

    case 3: // Goals & Aspirations
      return {
        hasTargetScore: !!formData.targetScore,
        hasColleges: !!formData.preferredColleges?.length,
        hasSpecialization: !!formData.medicalSpecialization,
        hasTimeline: !!formData.preparationTimeline,
        ambitionLevel:
          formData.targetScore > 600 ? 'high' : formData.targetScore > 500 ? 'medium' : 'low',
      }

    case 4: // Study Preferences
      return {
        hasLearningStyle: !!formData.learningStyle,
        hasSchedule: !!formData.studySchedule,
        hasLocation: !!formData.preferredLocation,
        wantsOnline: formData.onlinePreference === 'yes',
        intensityLevel: formData.studyIntensity,
      }

    case 5: // Budget Planning
      return {
        hasBudget: !!formData.budget,
        hasPaymentPlan: !!formData.paymentPlan,
        budgetRange: formData.budget,
        scholarshipInterest: formData.scholarshipInterest === 'yes',
        financialFlexibility:
          formData.budget > 100000 ? 'high' : formData.budget > 50000 ? 'medium' : 'low',
      }

    default:
      return {}
  }
}

function calculateStepCompletionRate(step: number, formData: Record<string, any>): number {
  const relevantData = extractRelevantFormData(step, formData)
  const totalFields = Object.keys(relevantData).length
  const completedFields = Object.values(relevantData).filter(Boolean).length
  return totalFields > 0 ? (completedFields / totalFields) * 100 : 0
}

function calculateOverallProgress(formData: Record<string, any>): number {
  const totalSteps = WIZARD_FUNNEL_MAPPING.length
  let completedSteps = 0

  for (let i = 0; i < totalSteps; i++) {
    const completionRate = calculateStepCompletionRate(i, formData)
    if (completionRate > 80) completedSteps++
  }

  return (completedSteps / totalSteps) * 100
}

function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  if (typeof window === 'undefined') return 'desktop'

  const width = window.innerWidth
  if (width < 768) return 'mobile'
  if (width < 1024) return 'tablet'
  return 'desktop'
}

function getBrowserInfo(): Record<string, any> {
  if (typeof window === 'undefined') return {}

  return {
    userAgent: navigator.userAgent,
    language: navigator.language,
    cookieEnabled: navigator.cookieEnabled,
    onLine: navigator.onLine,
    platform: navigator.platform,
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
  }
}
