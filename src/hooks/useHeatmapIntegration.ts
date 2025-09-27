import { useEffect, useCallback, useRef } from 'react'
import { useHeatmapTracking, HeatmapConfiguration } from '../lib/heatmap/heatmapTracking'

interface HeatmapIntegrationConfig extends Partial<HeatmapConfiguration> {
  trackCourseSelector: boolean
  trackFormFields: boolean
  trackButtonClicks: boolean
  trackNavigationElements: boolean
  trackPricingInteractions: boolean
}

const COURSE_SELECTOR_CONFIG: HeatmapIntegrationConfig = {
  enableClickTracking: true,
  enableHoverTracking: true,
  enableScrollTracking: true,
  enableFormTracking: true,
  enableMouseMovement: false, // High volume, disabled by default
  sampleRate: 1.0, // Track all interactions for course selector
  hoverThreshold: 800, // Shorter threshold for course selector interactions
  mouseMoveThrottle: 200,
  trackCourseSelector: true,
  trackFormFields: true,
  trackButtonClicks: true,
  trackNavigationElements: true,
  trackPricingInteractions: true,
  includeSelectors: [
    // Course selector specific elements
    '.course-wizard-container',
    '.wizard-step',
    '.step-content',
    '.step-navigation',
    '.progress-bar',

    // Form elements
    '.form-field',
    '.form-input',
    '.form-select',
    '.form-checkbox',
    '.form-radio',

    // Interactive elements
    'button',
    'a[href]',
    '.btn',
    '.button',
    '.clickable',
    '[role="button"]',

    // Course recommendations
    '.course-card',
    '.course-recommendation',
    '.pricing-option',
    '.payment-plan',

    // Navigation elements
    '.nav-item',
    '.breadcrumb',
    '.step-indicator',

    // Call-to-action elements
    '.cta-button',
    '.consultation-button',
    '.enrollment-button',

    // Trust indicators
    '.testimonial',
    '.review',
    '.success-story',
    '.social-proof',
  ],
  excludeSelectors: [
    '.no-track',
    '[data-no-track]',
    '.heatmap-controls',
    '.analytics-dashboard',
    'script',
    'style',
    'meta',
    'link',
    '.debug-panel',
  ],
}

export function useHeatmapIntegration(
  userId: string,
  currentStep: number,
  isEnabled: boolean = true,
  config: Partial<HeatmapIntegrationConfig> = {}
) {
  const finalConfig = { ...COURSE_SELECTOR_CONFIG, ...config }
  const stepRef = useRef(currentStep)

  const { isTracking, startTracking, stopTracking, getDataPoints, exportData } = useHeatmapTracking(
    userId,
    isEnabled,
    finalConfig
  )

  // Track step changes for better context
  useEffect(() => {
    if (currentStep !== stepRef.current) {
      // Add step context to page metadata
      if (typeof window !== 'undefined') {
        const event = new CustomEvent('heatmap-context-change', {
          detail: {
            previousStep: stepRef.current,
            currentStep: currentStep,
            stepName: getStepName(currentStep),
            timestamp: Date.now(),
          },
        })
        window.dispatchEvent(event)
      }
      stepRef.current = currentStep
    }
  }, [currentStep])

  // Enhanced tracking for specific course selector interactions
  const trackCourseSelection = useCallback(
    (courseId: string, courseName: string) => {
      if (!isTracking) return

      // Send custom event for course selection
      if (typeof window !== 'undefined') {
        const event = new CustomEvent('heatmap-course-selection', {
          detail: {
            courseId,
            courseName,
            step: currentStep,
            timestamp: Date.now(),
          },
        })
        window.dispatchEvent(event)
      }
    },
    [isTracking, currentStep]
  )

  const trackFormFieldInteraction = useCallback(
    (
      fieldName: string,
      fieldType: string,
      interactionType: 'focus' | 'blur' | 'change' | 'error'
    ) => {
      if (!isTracking || !finalConfig.trackFormFields) return

      if (typeof window !== 'undefined') {
        const event = new CustomEvent('heatmap-form-interaction', {
          detail: {
            fieldName,
            fieldType,
            interactionType,
            step: currentStep,
            stepName: getStepName(currentStep),
            timestamp: Date.now(),
          },
        })
        window.dispatchEvent(event)
      }
    },
    [isTracking, finalConfig.trackFormFields, currentStep]
  )

  const trackButtonClick = useCallback(
    (
      buttonId: string,
      buttonText: string,
      buttonType: 'primary' | 'secondary' | 'navigation' | 'cta'
    ) => {
      if (!isTracking || !finalConfig.trackButtonClicks) return

      if (typeof window !== 'undefined') {
        const event = new CustomEvent('heatmap-button-click', {
          detail: {
            buttonId,
            buttonText,
            buttonType,
            step: currentStep,
            stepName: getStepName(currentStep),
            timestamp: Date.now(),
          },
        })
        window.dispatchEvent(event)
      }
    },
    [isTracking, finalConfig.trackButtonClicks, currentStep]
  )

  const trackPricingInteraction = useCallback(
    (priceOptionId: string, action: 'view' | 'select' | 'compare' | 'customize') => {
      if (!isTracking || !finalConfig.trackPricingInteractions) return

      if (typeof window !== 'undefined') {
        const event = new CustomEvent('heatmap-pricing-interaction', {
          detail: {
            priceOptionId,
            action,
            step: currentStep,
            timestamp: Date.now(),
          },
        })
        window.dispatchEvent(event)
      }
    },
    [isTracking, finalConfig.trackPricingInteractions, currentStep]
  )

  const trackNavigationEvent = useCallback(
    (navigationType: 'next' | 'previous' | 'skip' | 'jump', fromStep: number, toStep: number) => {
      if (!isTracking || !finalConfig.trackNavigationElements) return

      if (typeof window !== 'undefined') {
        const event = new CustomEvent('heatmap-navigation', {
          detail: {
            navigationType,
            fromStep,
            toStep,
            fromStepName: getStepName(fromStep),
            toStepName: getStepName(toStep),
            timestamp: Date.now(),
          },
        })
        window.dispatchEvent(event)
      }
    },
    [isTracking, finalConfig.trackNavigationElements]
  )

  // Auto-track common course selector patterns
  useEffect(() => {
    if (!isTracking) return

    // Track wizard step completion time
    const stepStartTime = Date.now()

    return () => {
      const stepDuration = Date.now() - stepStartTime
      if (typeof window !== 'undefined') {
        const event = new CustomEvent('heatmap-step-duration', {
          detail: {
            step: currentStep,
            stepName: getStepName(currentStep),
            duration: stepDuration,
            timestamp: Date.now(),
          },
        })
        window.dispatchEvent(event)
      }
    }
  }, [currentStep, isTracking])

  // Generate heatmap report for current session
  const generateReport = useCallback(() => {
    const dataPoints = getDataPoints()

    const report = {
      sessionInfo: {
        userId,
        currentStep,
        stepName: getStepName(currentStep),
        isTracking,
        dataPointsCollected: dataPoints.length,
      },
      stepBreakdown: generateStepBreakdown(dataPoints),
      interactionSummary: generateInteractionSummary(dataPoints),
      hotspots: identifyHotspots(dataPoints),
      recommendations: generateRecommendations(dataPoints, currentStep),
    }

    return report
  }, [userId, currentStep, isTracking, getDataPoints])

  return {
    isTracking,
    startTracking,
    stopTracking,
    trackCourseSelection,
    trackFormFieldInteraction,
    trackButtonClick,
    trackPricingInteraction,
    trackNavigationEvent,
    getDataPoints,
    exportData,
    generateReport,
  }
}

// Helper functions
function getStepName(step: number): string {
  const stepNames = [
    'Landing Page',
    'Personal Information',
    'Academic Background',
    'Goals & Aspirations',
    'Study Preferences',
    'Budget Planning',
    'Course Recommendations',
    'Final Selection',
  ]
  return stepNames[step] || `Step ${step}`
}

function generateStepBreakdown(dataPoints: any[]): Record<string, any> {
  return dataPoints.reduce((acc, point) => {
    const step = point.page?.step || 'unknown'
    if (!acc[step]) {
      acc[step] = {
        totalInteractions: 0,
        clickCount: 0,
        hoverCount: 0,
        scrollCount: 0,
        formInteractions: 0,
        uniqueElements: new Set(),
      }
    }

    acc[step].totalInteractions++

    switch (point.eventType) {
      case 'click':
        acc[step].clickCount++
        break
      case 'hover':
        acc[step].hoverCount++
        break
      case 'scroll':
        acc[step].scrollCount++
        break
      case 'focus':
      case 'blur':
      case 'form_interaction':
        acc[step].formInteractions++
        break
    }

    if (point.elementId || point.elementClass) {
      acc[step].uniqueElements.add(point.elementId || point.elementClass)
    }

    return acc
  }, {})
}

function generateInteractionSummary(dataPoints: any[]): Record<string, any> {
  const summary = {
    totalInteractions: dataPoints.length,
    eventTypes: {} as Record<string, number>,
    topElements: {} as Record<string, number>,
    timeSpent: 0,
  }

  dataPoints.forEach((point) => {
    // Count event types
    summary.eventTypes[point.eventType] = (summary.eventTypes[point.eventType] || 0) + 1

    // Count element interactions
    const elementKey = point.elementId || point.elementClass || point.elementTag
    if (elementKey) {
      summary.topElements[elementKey] = (summary.topElements[elementKey] || 0) + 1
    }
  })

  // Calculate time spent
  if (dataPoints.length > 1) {
    const sortedPoints = dataPoints.sort((a, b) => a.timestamp - b.timestamp)
    summary.timeSpent = sortedPoints[sortedPoints.length - 1].timestamp - sortedPoints[0].timestamp
  }

  return summary
}

function identifyHotspots(
  dataPoints: any[]
): Array<{ element: string; interactions: number; types: string[] }> {
  const elementMap = dataPoints.reduce(
    (acc, point) => {
      const elementKey = point.elementId || point.elementClass || point.elementTag || 'unknown'

      if (!acc[elementKey]) {
        acc[elementKey] = {
          interactions: 0,
          types: new Set(),
        }
      }

      acc[elementKey].interactions++
      acc[elementKey].types.add(point.eventType)

      return acc
    },
    {} as Record<string, any>
  )

  return Object.entries(elementMap)
    .map(([element, data]) => ({
      element,
      interactions: data.interactions,
      types: Array.from(data.types),
    }))
    .sort((a, b) => b.interactions - a.interactions)
    .slice(0, 10) // Top 10 hotspots
}

function generateRecommendations(dataPoints: any[], currentStep: number): string[] {
  const recommendations: string[] = []
  const summary = generateInteractionSummary(dataPoints)

  // Low interaction recommendations
  if (summary.totalInteractions < 10) {
    recommendations.push('Consider adding more interactive elements to engage users')
  }

  // High scroll activity
  const scrollPercentage = (summary.eventTypes.scroll || 0) / summary.totalInteractions
  if (scrollPercentage > 0.4) {
    recommendations.push(
      'High scroll activity detected - consider reducing page length or improving content layout'
    )
  }

  // Low form interaction
  const formPercentage =
    ((summary.eventTypes.focus || 0) + (summary.eventTypes.form_interaction || 0)) /
    summary.totalInteractions
  if (formPercentage < 0.2 && currentStep > 0) {
    recommendations.push(
      'Low form interaction - consider improving form usability or adding help text'
    )
  }

  // Step-specific recommendations
  if (currentStep === 1 && summary.eventTypes.click < 3) {
    recommendations.push(
      'Personal info step has low click activity - users may be hesitant to share information'
    )
  }

  if (currentStep === 6 && summary.eventTypes.hover < 5) {
    recommendations.push(
      'Course recommendations step has low hover activity - consider improving course presentation'
    )
  }

  return recommendations
}
