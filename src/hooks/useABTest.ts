import { useState, useEffect, useCallback, useMemo } from 'react'

export interface ABTestVariant {
  id: string
  name: string
  weight: number
  isControl: boolean
  configuration?: { [key: string]: any }
}

export interface ABTestConfig {
  testId: string
  name: string
  description: string
  variants: ABTestVariant[]
  enabled: boolean
  startDate?: Date
  endDate?: Date
  targetAudience?: {
    percentage: number
    conditions?: { [key: string]: any }
  }
  metrics: string[]
  hypothesis: string
}

export interface ABTestResult {
  testId: string
  variant: ABTestVariant
  isControlGroup: boolean
  userBucket: string
  assignmentTime: Date
  metadata: {
    userId: string
    sessionId: string
    userAgent?: string
    location?: string
  }
}

interface ABTestStorage {
  assignments: { [testId: string]: ABTestResult }
  metrics: { [testId: string]: { [metric: string]: number } }
  lastUpdate: string
}

const AB_TESTS: { [testId: string]: ABTestConfig } = {
  'course-wizard-layout': {
    testId: 'course-wizard-layout',
    name: 'Course Wizard Layout Optimization',
    description: 'Testing different layouts for the course selection wizard',
    variants: [
      {
        id: 'control',
        name: 'Control - Standard Layout',
        weight: 50,
        isControl: true,
        configuration: {
          layout: 'default',
          progressBar: 'standard',
          cardStyle: 'minimal',
        },
      },
      {
        id: 'compact',
        name: 'Compact Layout',
        weight: 25,
        isControl: false,
        configuration: {
          layout: 'compact',
          progressBar: 'minimal',
          cardStyle: 'condensed',
        },
      },
      {
        id: 'detailed',
        name: 'Detailed Layout',
        weight: 25,
        isControl: false,
        configuration: {
          layout: 'detailed',
          progressBar: 'enhanced',
          cardStyle: 'expanded',
        },
      },
    ],
    enabled: true,
    startDate: new Date('2025-01-01'),
    endDate: new Date('2025-12-31'),
    targetAudience: {
      percentage: 100,
      conditions: {
        newUser: true,
      },
    },
    metrics: ['completion_rate', 'time_to_complete', 'conversion_rate', 'abandon_rate'],
    hypothesis:
      'A more detailed layout will increase completion rates but may increase time to complete',
  },
  'pricing-display': {
    testId: 'pricing-display',
    name: 'Pricing Display Optimization',
    description: 'Testing different pricing display formats',
    variants: [
      {
        id: 'control',
        name: 'Standard Pricing',
        weight: 50,
        isControl: true,
        configuration: {
          showDiscount: true,
          highlightSavings: false,
          comparisonTable: false,
        },
      },
      {
        id: 'savings-focused',
        name: 'Savings Focused',
        weight: 50,
        isControl: false,
        configuration: {
          showDiscount: true,
          highlightSavings: true,
          comparisonTable: true,
        },
      },
    ],
    enabled: true,
    targetAudience: {
      percentage: 80,
    },
    metrics: ['conversion_rate', 'price_engagement', 'plan_selection_rate'],
    hypothesis: 'Highlighting savings will increase conversion rates',
  },
  'step-navigation': {
    testId: 'step-navigation',
    name: 'Step Navigation UX',
    description: 'Testing different navigation patterns in the wizard',
    variants: [
      {
        id: 'control',
        name: 'Linear Navigation',
        weight: 60,
        isControl: true,
        configuration: {
          allowBacktrack: true,
          showProgress: true,
          skipOptional: false,
        },
      },
      {
        id: 'flexible',
        name: 'Flexible Navigation',
        weight: 40,
        isControl: false,
        configuration: {
          allowBacktrack: true,
          showProgress: true,
          skipOptional: true,
          jumpToStep: true,
        },
      },
    ],
    enabled: true,
    targetAudience: {
      percentage: 70,
    },
    metrics: ['step_completion_rate', 'user_satisfaction', 'error_rate'],
    hypothesis: 'Flexible navigation will improve user satisfaction but may increase error rates',
  },
  'recommendation-algorithm': {
    testId: 'recommendation-algorithm',
    name: 'Course Recommendation Algorithm',
    description: 'Testing different recommendation algorithms',
    variants: [
      {
        id: 'control',
        name: 'Rule-based Algorithm',
        weight: 50,
        isControl: true,
        configuration: {
          algorithm: 'rule-based',
          weights: { budget: 40, goals: 30, time: 20, location: 10 },
        },
      },
      {
        id: 'ml-enhanced',
        name: 'ML-Enhanced Algorithm',
        weight: 50,
        isControl: false,
        configuration: {
          algorithm: 'ml-enhanced',
          weights: { budget: 35, goals: 35, time: 15, location: 15 },
          mlFeatures: ['user_behavior', 'similar_profiles', 'success_prediction'],
        },
      },
    ],
    enabled: false, // Disabled for now
    metrics: ['recommendation_accuracy', 'user_satisfaction', 'conversion_rate'],
    hypothesis: 'ML-enhanced recommendations will improve accuracy and user satisfaction',
  },
}

const STORAGE_KEY = 'ab_test_data'

export const useABTest = (testId: string) => {
  const [testResult, setTestResult] = useState<ABTestResult | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const testConfig = useMemo(() => AB_TESTS[testId], [testId])

  // Generate deterministic user bucket based on user ID and test ID
  const generateUserBucket = useCallback((userId: string, testId: string): string => {
    const hash = userId + testId
    let hashCode = 0
    for (let i = 0; i < hash.length; i++) {
      const char = hash.charCodeAt(i)
      hashCode = (hashCode << 5) - hashCode + char
      hashCode = hashCode & hashCode // Convert to 32bit integer
    }
    return (Math.abs(hashCode) % 100).toString()
  }, [])

  // Select variant based on user bucket and variant weights
  const selectVariant = useCallback((bucket: string, config: ABTestConfig): ABTestVariant => {
    const bucketNumber = parseInt(bucket, 10)
    let cumulativeWeight = 0

    for (const variant of config.variants) {
      cumulativeWeight += variant.weight
      if (bucketNumber < cumulativeWeight) {
        return variant
      }
    }

    // Fallback to control variant
    return config.variants.find((v) => v.isControl) || config.variants[0]
  }, [])

  // Check if user meets target audience criteria
  const meetsTargetAudience = useCallback(
    (config: ABTestConfig, userAttributes: any = {}): boolean => {
      if (!config.targetAudience) return true

      // Check percentage eligibility
      const userId =
        userAttributes.userId || localStorage.getItem('analytics_user_id') || 'anonymous'
      const userBucket = generateUserBucket(userId, 'audience_' + config.testId)
      const bucketNumber = parseInt(userBucket, 10)

      if (bucketNumber >= config.targetAudience.percentage) {
        return false
      }

      // Check additional conditions
      if (config.targetAudience.conditions) {
        for (const [key, value] of Object.entries(config.targetAudience.conditions)) {
          if (userAttributes[key] !== value) {
            return false
          }
        }
      }

      return true
    },
    [generateUserBucket]
  )

  // Load or initialize test assignment
  useEffect(() => {
    if (!testConfig) {
      setError(`Test configuration not found for testId: ${testId}`)
      setIsLoading(false)
      return
    }

    if (!testConfig.enabled) {
      setError(`Test is disabled: ${testId}`)
      setIsLoading(false)
      return
    }

    // Check if test is within date range
    const now = new Date()
    if (testConfig.startDate && now < testConfig.startDate) {
      setError(`Test has not started yet: ${testId}`)
      setIsLoading(false)
      return
    }

    if (testConfig.endDate && now > testConfig.endDate) {
      setError(`Test has ended: ${testId}`)
      setIsLoading(false)
      return
    }

    try {
      // Get stored data
      const storedData = localStorage.getItem(STORAGE_KEY)
      const storage: ABTestStorage = storedData
        ? JSON.parse(storedData)
        : {
            assignments: {},
            metrics: {},
            lastUpdate: new Date().toISOString(),
          }

      // Check for existing assignment
      if (storage.assignments[testId]) {
        setTestResult(storage.assignments[testId])
        setIsLoading(false)
        return
      }

      // Generate new assignment
      const userId =
        localStorage.getItem('analytics_user_id') ||
        `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

      // Check target audience eligibility
      const userAttributes = {
        userId,
        newUser: !localStorage.getItem('returning_user'),
        // Add more attributes as needed
      }

      if (!meetsTargetAudience(testConfig, userAttributes)) {
        setError(`User does not meet target audience criteria for test: ${testId}`)
        setIsLoading(false)
        return
      }

      const userBucket = generateUserBucket(userId, testId)
      const selectedVariant = selectVariant(userBucket, testConfig)

      const newResult: ABTestResult = {
        testId,
        variant: selectedVariant,
        isControlGroup: selectedVariant.isControl,
        userBucket,
        assignmentTime: new Date(),
        metadata: {
          userId,
          sessionId,
          userAgent: navigator.userAgent,
          location: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
      }

      // Store assignment
      storage.assignments[testId] = newResult
      storage.lastUpdate = new Date().toISOString()
      localStorage.setItem(STORAGE_KEY, JSON.stringify(storage))

      setTestResult(newResult)

      // Track assignment event
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'ab_test_assignment', {
          test_id: testId,
          variant_id: selectedVariant.id,
          variant_name: selectedVariant.name,
          is_control: selectedVariant.isControl,
          user_bucket: userBucket,
        })
      }
    } catch (err) {
      setError(`Failed to initialize A/B test: ${err}`)
    } finally {
      setIsLoading(false)
    }
  }, [testId, testConfig, generateUserBucket, selectVariant, meetsTargetAudience])

  // Track metric for current test
  const trackMetric = useCallback(
    (metricName: string, value: number = 1) => {
      if (!testResult || !testConfig.metrics.includes(metricName)) {
        return
      }

      try {
        const storedData = localStorage.getItem(STORAGE_KEY)
        const storage: ABTestStorage = storedData
          ? JSON.parse(storedData)
          : {
              assignments: {},
              metrics: {},
              lastUpdate: new Date().toISOString(),
            }

        if (!storage.metrics[testId]) {
          storage.metrics[testId] = {}
        }

        if (!storage.metrics[testId][metricName]) {
          storage.metrics[testId][metricName] = 0
        }

        storage.metrics[testId][metricName] += value
        storage.lastUpdate = new Date().toISOString()
        localStorage.setItem(STORAGE_KEY, JSON.stringify(storage))

        // Track in analytics
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'ab_test_metric', {
            test_id: testId,
            variant_id: testResult.variant.id,
            metric_name: metricName,
            metric_value: value,
            cumulative_value: storage.metrics[testId][metricName],
          })
        }
      } catch (err) {
        console.error('Failed to track A/B test metric:', err)
      }
    },
    [testId, testResult, testConfig]
  )

  // Get variant configuration value
  const getConfig = useCallback(
    (key: string, defaultValue?: any) => {
      if (!testResult?.variant.configuration) return defaultValue
      return testResult.variant.configuration[key] ?? defaultValue
    },
    [testResult]
  )

  // Get all stored test data for debugging
  const getTestData = useCallback(() => {
    try {
      const storedData = localStorage.getItem(STORAGE_KEY)
      return storedData ? JSON.parse(storedData) : null
    } catch {
      return null
    }
  }, [])

  // Clear test data (for debugging)
  const clearTestData = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setTestResult(null)
  }, [])

  return {
    // Core test data
    variant: testResult?.variant.id || 'control',
    variantName: testResult?.variant.name || 'Control',
    isControlGroup: testResult?.isControlGroup ?? true,
    configuration: testResult?.variant.configuration || {},

    // State
    isLoading,
    error,
    testResult,
    testConfig,

    // Methods
    trackMetric,
    getConfig,
    getTestData,
    clearTestData,

    // Convenience methods
    isVariant: (variantId: string) => testResult?.variant.id === variantId,
    hasConfig: (key: string) => testResult?.variant.configuration?.[key] !== undefined,
  }
}

// Hook for managing multiple A/B tests
 
export const useABTests = (testIds: string[]) => {
  // Note: This assumes testIds array is stable (same length/order) between renders
  const tests = testIds.reduce(
    (acc, testId) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks -- Dynamic hook pattern for multiple tests
      acc[testId] = useABTest(testId)
      return acc
    },
    {} as { [testId: string]: ReturnType<typeof useABTest> }
  )

  const isLoading = Object.values(tests).some((test) => test.isLoading)
  const hasErrors = Object.values(tests).some((test) => test.error)

  const trackMetricForTest = useCallback(
    (testId: string, metricName: string, value?: number) => {
      if (tests[testId]) {
        tests[testId].trackMetric(metricName, value)
      }
    },
    [tests]
  )

  return {
    tests,
    isLoading,
    hasErrors,
    trackMetricForTest,
    getVariant: (testId: string) => tests[testId]?.variant || 'control',
    isControlGroup: (testId: string) => tests[testId]?.isControlGroup ?? true,
    getConfig: (testId: string, key: string, defaultValue?: any) =>
      tests[testId]?.getConfig(key, defaultValue) ?? defaultValue,
  }
}

// Hook for A/B test analytics
export const useABTestAnalytics = () => {
  const getAllTestData = useCallback(() => {
    try {
      const storedData = localStorage.getItem(STORAGE_KEY)
      return storedData ? JSON.parse(storedData) : null
    } catch {
      return null
    }
  }, [])

  const getTestMetrics = useCallback(
    (testId: string) => {
      const data = getAllTestData()
      return data?.metrics[testId] || {}
    },
    [getAllTestData]
  )

  const exportTestData = useCallback(() => {
    const data = getAllTestData()
    if (!data) return null

    return {
      exported_at: new Date().toISOString(),
      tests: Object.keys(AB_TESTS).map((testId) => ({
        config: AB_TESTS[testId],
        assignment: data.assignments[testId] || null,
        metrics: data.metrics[testId] || {},
      })),
    }
  }, [getAllTestData])

  return {
    getAllTestData,
    getTestMetrics,
    exportTestData,
    availableTests: Object.keys(AB_TESTS),
  }
}
