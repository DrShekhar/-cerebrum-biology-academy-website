import { useState, useCallback, useEffect, useMemo } from 'react'
import { useLocalStorage } from './useLocalStorage'

export interface CourseSelectionData {
  goals: {
    targetScore: number
    preferredRank: number
    focusAreas: string[]
    timelinePreference: string
    motivationLevel: number
    previousAttempts: number
  }
  budget: {
    maxAmount: number
    paymentPreference: string
    scholarshipInterest: boolean
    familyIncome?: string
    financialFlexibility: string
    priorityFactors: string[]
  }
  timeAvailability: {
    hoursPerDay: number
    preferredSchedule: string[]
    flexibilityLevel: string
    weekendAvailability: boolean
    studyBreaks: boolean
    vacationPlanning: string
  }
  location: {
    city: string
    state: string
    preferredMode: string
    transportAccess: boolean
    homeStudyEnvironment: number
    travelDistance: number
  }
  learningStyle: {
    preferredMethods: string[]
    difficultyPreference: string
    supportLevel: string
    assessmentFrequency: string
    groupOrIndividual: string
    feedbackStyle: string
  }
  weakAreas: {
    subjects: { [key: string]: number }
    priorityTopics: string[]
    improvementGoals: string[]
    selfAssessment: { [key: string]: number }
    targetImprovement: { [key: string]: number }
  }
  personalInfo: {
    name?: string
    email?: string
    phone?: string
    educationLevel: string
    schoolBoard: string
    currentClass?: string
  }
  selectedCourse?: any
  pricing?: any
  recommendations?: any[]
}

interface ValidationRule {
  field: string
  validator: (value: any) => boolean
  message: string
  required?: boolean
}

interface StepValidation {
  [stepIndex: number]: ValidationRule[]
}

const INITIAL_DATA: CourseSelectionData = {
  goals: {
    targetScore: 0,
    preferredRank: 0,
    focusAreas: [],
    timelinePreference: '',
    motivationLevel: 5,
    previousAttempts: 0,
  },
  budget: {
    maxAmount: 0,
    paymentPreference: '',
    scholarshipInterest: false,
    financialFlexibility: '',
    priorityFactors: [],
  },
  timeAvailability: {
    hoursPerDay: 0,
    preferredSchedule: [],
    flexibilityLevel: '',
    weekendAvailability: false,
    studyBreaks: false,
    vacationPlanning: '',
  },
  location: {
    city: '',
    state: '',
    preferredMode: '',
    transportAccess: false,
    homeStudyEnvironment: 3,
    travelDistance: 0,
  },
  learningStyle: {
    preferredMethods: [],
    difficultyPreference: '',
    supportLevel: '',
    assessmentFrequency: '',
    groupOrIndividual: '',
    feedbackStyle: '',
  },
  weakAreas: {
    subjects: {},
    priorityTopics: [],
    improvementGoals: [],
    selfAssessment: {},
    targetImprovement: {},
  },
  personalInfo: {
    educationLevel: '',
    schoolBoard: '',
    currentClass: '',
  },
}

const STEP_VALIDATIONS: StepValidation = {
  0: [
    // Goals
    {
      field: 'goals.targetScore',
      validator: (v) => v > 0,
      message: 'Target score is required',
      required: true,
    },
    {
      field: 'goals.preferredRank',
      validator: (v) => v > 0,
      message: 'Preferred rank is required',
      required: true,
    },
    {
      field: 'goals.focusAreas',
      validator: (v) => Array.isArray(v) && v.length > 0,
      message: 'Select at least one focus area',
      required: true,
    },
    {
      field: 'goals.timelinePreference',
      validator: (v) => !!v,
      message: 'Timeline preference is required',
      required: true,
    },
  ],
  1: [
    // Budget
    {
      field: 'budget.maxAmount',
      validator: (v) => v > 0,
      message: 'Budget amount is required',
      required: true,
    },
    {
      field: 'budget.paymentPreference',
      validator: (v) => !!v,
      message: 'Payment preference is required',
      required: true,
    },
  ],
  2: [
    // Time Availability
    {
      field: 'timeAvailability.hoursPerDay',
      validator: (v) => v > 0,
      message: 'Study hours per day is required',
      required: true,
    },
    {
      field: 'timeAvailability.preferredSchedule',
      validator: (v) => Array.isArray(v) && v.length > 0,
      message: 'Select preferred schedule',
      required: true,
    },
    {
      field: 'timeAvailability.flexibilityLevel',
      validator: (v) => !!v,
      message: 'Flexibility level is required',
      required: true,
    },
  ],
  3: [
    // Location
    { field: 'location.city', validator: (v) => !!v, message: 'City is required', required: true },
    {
      field: 'location.state',
      validator: (v) => !!v,
      message: 'State is required',
      required: true,
    },
    {
      field: 'location.preferredMode',
      validator: (v) => !!v,
      message: 'Learning mode is required',
      required: true,
    },
  ],
  4: [
    // Learning Style
    {
      field: 'learningStyle.preferredMethods',
      validator: (v) => Array.isArray(v) && v.length > 0,
      message: 'Select learning methods',
      required: true,
    },
    {
      field: 'learningStyle.difficultyPreference',
      validator: (v) => !!v,
      message: 'Difficulty preference is required',
      required: true,
    },
    {
      field: 'learningStyle.supportLevel',
      validator: (v) => !!v,
      message: 'Support level is required',
      required: true,
    },
  ],
  5: [
    // Weak Areas
    {
      field: 'weakAreas.subjects',
      validator: (v) => v && Object.keys(v).length > 0,
      message: 'Rate at least one subject',
      required: true,
    },
    {
      field: 'weakAreas.priorityTopics',
      validator: (v) => Array.isArray(v) && v.length > 0,
      message: 'Select priority topics',
      required: true,
    },
  ],
  6: [
    // Recommendations
    { field: 'selectedCourse', validator: (v) => !!v, message: 'Select a course', required: true },
  ],
  7: [
    // Pricing (optional)
    {
      field: 'pricing.selectedPlan',
      validator: (v) => !!v,
      message: 'Select a payment plan',
      required: false,
    },
  ],
}

export const useCourseSelectorState = () => {
  const [storedData, setStoredData] = useLocalStorage<CourseSelectionData>(
    'course-selector-data',
    INITIAL_DATA
  )
  const [currentStep, setCurrentStep] = useState(0)
  const [selectionData, setSelectionData] = useState<CourseSelectionData>(storedData)
  const [validationErrors, setValidationErrors] = useState<{ [stepIndex: number]: string[] }>({})
  const [isDataLoaded, setIsDataLoaded] = useState(false)

  useEffect(() => {
    setIsDataLoaded(true)
  }, [])

  useEffect(() => {
    if (isDataLoaded) {
      setStoredData(selectionData)
    }
  }, [selectionData, setStoredData, isDataLoaded])

  const updateSelectionData = useCallback(
    (key: string, value: any) => {
      setSelectionData((prev) => {
        if (key.includes('.')) {
          const keys = key.split('.')
          const newData = { ...prev }
          let current: any = newData

          for (let i = 0; i < keys.length - 1; i++) {
            if (!current[keys[i]]) {
              current[keys[i]] = {}
            }
            current = current[keys[i]]
          }

          current[keys[keys.length - 1]] = value
          return newData
        } else {
          return {
            ...prev,
            [key]: value,
          }
        }
      })

      clearStepValidationErrors(currentStep)
    },
    [currentStep]
  )

  const getNestedValue = useCallback((obj: any, path: string): any => {
    return path.split('.').reduce((current, key) => current?.[key], obj)
  }, [])

  const validateStep = useCallback(
    (stepIndex: number): { isValid: boolean; errors: string[] } => {
      const rules = STEP_VALIDATIONS[stepIndex] || []
      const errors: string[] = []

      for (const rule of rules) {
        const value = getNestedValue(selectionData, rule.field)

        if (rule.required && !rule.validator(value)) {
          errors.push(rule.message)
        }
      }

      return { isValid: errors.length === 0, errors }
    },
    [selectionData, getNestedValue]
  )

  const isStepValid = useCallback(
    (stepIndex: number): boolean => {
      return validateStep(stepIndex).isValid
    },
    [validateStep]
  )

  const getValidationErrors = useCallback(
    (stepIndex: number): string[] => {
      return validateStep(stepIndex).errors
    },
    [validateStep]
  )

  const clearStepValidationErrors = useCallback((stepIndex: number) => {
    setValidationErrors((prev) => ({
      ...prev,
      [stepIndex]: [],
    }))
  }, [])

  const completionPercentage = useMemo(() => {
    const stepWeights = [20, 15, 10, 10, 15, 10, 15, 5] // Total = 100
    let completed = 0

    for (let i = 0; i <= currentStep; i++) {
      if (isStepValid(i)) {
        completed += stepWeights[i] || 0
      }
    }

    return Math.min(completed, 100)
  }, [currentStep, isStepValid])

  const getStepCompletionStatus = useCallback(() => {
    const totalSteps = Object.keys(STEP_VALIDATIONS).length
    const validSteps = Array.from({ length: totalSteps }, (_, i) => i).filter((i) => isStepValid(i))

    return {
      completed: validSteps.length,
      total: totalSteps,
      percentage: (validSteps.length / totalSteps) * 100,
    }
  }, [isStepValid])

  const canProceedToStep = useCallback(
    (targetStep: number): boolean => {
      for (let i = 0; i < targetStep; i++) {
        const rules = STEP_VALIDATIONS[i]
        if (rules && rules.some((rule) => rule.required)) {
          if (!isStepValid(i)) {
            return false
          }
        }
      }
      return true
    },
    [isStepValid]
  )

  const jumpToStep = useCallback(
    (targetStep: number) => {
      if (canProceedToStep(targetStep)) {
        setCurrentStep(targetStep)
      }
    },
    [canProceedToStep]
  )

  const resetWizard = useCallback(() => {
    setSelectionData(INITIAL_DATA)
    setCurrentStep(0)
    setValidationErrors({})
    setStoredData(INITIAL_DATA)
  }, [setStoredData])

  const getRecommendationScore = useCallback((): number => {
    const factors = {
      goalsClarity:
        selectionData.goals.targetScore > 0 && selectionData.goals.preferredRank > 0 ? 1 : 0,
      budgetSet: selectionData.budget.maxAmount > 0 ? 1 : 0,
      timeCommitment: selectionData.timeAvailability.hoursPerDay > 0 ? 1 : 0,
      learningStyleDefined: selectionData.learningStyle.preferredMethods.length > 0 ? 1 : 0,
      weakAreasIdentified: Object.keys(selectionData.weakAreas.subjects).length > 0 ? 1 : 0,
    }

    const totalFactors = Object.keys(factors).length
    const completedFactors = Object.values(factors).reduce((sum, value) => sum + value, 0)

    return (completedFactors / totalFactors) * 100
  }, [selectionData])

  const exportData = useCallback((): string => {
    return JSON.stringify(
      {
        data: selectionData,
        metadata: {
          currentStep,
          completionPercentage,
          exportDate: new Date().toISOString(),
          version: '1.0',
        },
      },
      null,
      2
    )
  }, [selectionData, currentStep, completionPercentage])

  const importData = useCallback((jsonData: string): boolean => {
    try {
      const parsed = JSON.parse(jsonData)
      if (parsed.data && typeof parsed.data === 'object') {
        setSelectionData({ ...INITIAL_DATA, ...parsed.data })
        if (parsed.metadata?.currentStep !== undefined) {
          setCurrentStep(parsed.metadata.currentStep)
        }
        return true
      }
      return false
    } catch {
      return false
    }
  }, [])

  const getDataSummary = useCallback(() => {
    return {
      profile: {
        hasGoals: !!selectionData.goals.targetScore,
        hasBudget: !!selectionData.budget.maxAmount,
        hasTimePreference: !!selectionData.timeAvailability.hoursPerDay,
        hasLocation: !!selectionData.location.city,
        hasLearningStyle: selectionData.learningStyle.preferredMethods.length > 0,
        hasWeakAreas: Object.keys(selectionData.weakAreas.subjects).length > 0,
      },
      completeness: completionPercentage,
      readyForRecommendations: getRecommendationScore() >= 80,
    }
  }, [selectionData, completionPercentage, getRecommendationScore])

  return {
    currentStep,
    setCurrentStep,
    selectionData,
    updateSelectionData,
    isStepValid,
    getValidationErrors,
    completionPercentage,
    resetWizard,
    jumpToStep,
    canProceedToStep,
    getStepCompletionStatus,
    getRecommendationScore,
    exportData,
    importData,
    getDataSummary,
    validationErrors,
    isDataLoaded,
  }
}
