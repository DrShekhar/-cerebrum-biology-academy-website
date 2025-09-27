'use client'

import { useState, useCallback, useEffect } from 'react'

export interface FeedbackData {
  id: string
  userId: string
  sessionId: string
  timestamp: number
  feedbackType:
    | 'rating'
    | 'survey'
    | 'suggestion'
    | 'bug_report'
    | 'exit_feedback'
    | 'step_feedback'
    | 'feature_request'
  context: {
    step?: number
    stepName?: string
    page: string
    userAgent: string
    viewport: { width: number; height: number }
  }
  data: Record<string, any>
  metadata?: Record<string, any>
}

export interface FeedbackQuestion {
  id: string
  type:
    | 'rating'
    | 'text'
    | 'multiple_choice'
    | 'checkbox'
    | 'scale'
    | 'emoji'
    | 'net_promoter_score'
  question: string
  required: boolean
  options?: string[]
  scale?: { min: number; max: number; labels?: string[] }
  placeholder?: string
  validation?: {
    minLength?: number
    maxLength?: number
    pattern?: string
  }
}

export interface FeedbackSurvey {
  id: string
  title: string
  description: string
  trigger: {
    type: 'step_completion' | 'time_spent' | 'exit_intent' | 'manual' | 'error_occurrence'
    value?: any
  }
  questions: FeedbackQuestion[]
  style: {
    position: 'modal' | 'slide_in' | 'inline' | 'floating'
    theme: 'light' | 'dark' | 'brand'
    size: 'small' | 'medium' | 'large'
  }
  targeting: {
    steps?: number[]
    userSegments?: string[]
    sampleRate: number
  }
}

// Pre-defined surveys for NEET course selection
export const COURSE_SELECTOR_SURVEYS: FeedbackSurvey[] = [
  {
    id: 'step_completion_feedback',
    title: 'How was this step?',
    description: 'Help us improve your experience',
    trigger: { type: 'step_completion' },
    questions: [
      {
        id: 'step_difficulty',
        type: 'scale',
        question: 'How easy was it to complete this step?',
        required: true,
        scale: {
          min: 1,
          max: 5,
          labels: ['Very Difficult', 'Difficult', 'Neutral', 'Easy', 'Very Easy'],
        },
      },
      {
        id: 'step_clarity',
        type: 'scale',
        question: 'How clear were the instructions?',
        required: true,
        scale: {
          min: 1,
          max: 5,
          labels: ['Very Unclear', 'Unclear', 'Neutral', 'Clear', 'Very Clear'],
        },
      },
      {
        id: 'step_suggestions',
        type: 'text',
        question: 'Any suggestions to improve this step?',
        required: false,
        placeholder: 'Share your thoughts...',
        validation: { maxLength: 500 },
      },
    ],
    style: { position: 'slide_in', theme: 'light', size: 'medium' },
    targeting: { sampleRate: 0.3 },
  },

  {
    id: 'course_recommendation_feedback',
    title: 'Course Recommendations Feedback',
    description: 'How relevant are these course suggestions?',
    trigger: { type: 'step_completion', value: 6 },
    questions: [
      {
        id: 'relevance_rating',
        type: 'scale',
        question: 'How relevant are these course recommendations to your needs?',
        required: true,
        scale: { min: 1, max: 10 },
      },
      {
        id: 'missing_courses',
        type: 'text',
        question: 'Are there any specific courses or features missing that you were looking for?',
        required: false,
        placeholder: 'Describe what you were looking for...',
        validation: { maxLength: 300 },
      },
      {
        id: 'decision_factors',
        type: 'checkbox',
        question: 'What factors are most important in your course selection?',
        required: true,
        options: [
          'Course content and curriculum',
          'Instructor quality',
          'Price and payment options',
          'Study schedule flexibility',
          'Success rate and track record',
          'Student support services',
          'Location convenience',
          'Technology and learning platform',
        ],
      },
    ],
    style: { position: 'modal', theme: 'brand', size: 'large' },
    targeting: { steps: [6], sampleRate: 0.8 },
  },

  {
    id: 'exit_intent_feedback',
    title: 'Before you go...',
    description: 'Help us understand what we could improve',
    trigger: { type: 'exit_intent' },
    questions: [
      {
        id: 'exit_reason',
        type: 'multiple_choice',
        question: "What's the main reason you're leaving?",
        required: true,
        options: [
          'Process is too long',
          'Information requested is too personal',
          "Courses don't match my needs",
          'Prices are too high',
          'Technical issues',
          'Need to discuss with family',
          'Just browsing for now',
          'Other',
        ],
      },
      {
        id: 'return_likelihood',
        type: 'scale',
        question: 'How likely are you to return and complete the process?',
        required: true,
        scale: {
          min: 1,
          max: 5,
          labels: ['Very Unlikely', 'Unlikely', 'Neutral', 'Likely', 'Very Likely'],
        },
      },
      {
        id: 'improvement_suggestion',
        type: 'text',
        question: 'What would make you more likely to complete the course selection?',
        required: false,
        placeholder: 'Your suggestions...',
        validation: { maxLength: 300 },
      },
    ],
    style: { position: 'modal', theme: 'light', size: 'medium' },
    targeting: { sampleRate: 0.6 },
  },

  {
    id: 'nps_survey',
    title: 'Quick Question',
    description: 'We value your opinion',
    trigger: { type: 'step_completion', value: 7 },
    questions: [
      {
        id: 'nps_score',
        type: 'net_promoter_score',
        question:
          'How likely are you to recommend our course selection process to a friend or colleague?',
        required: true,
        scale: { min: 0, max: 10 },
      },
      {
        id: 'nps_reason',
        type: 'text',
        question: "What's the primary reason for your score?",
        required: false,
        placeholder: 'Tell us why...',
        validation: { maxLength: 200 },
      },
    ],
    style: { position: 'floating', theme: 'brand', size: 'small' },
    targeting: { steps: [7], sampleRate: 0.5 },
  },

  {
    id: 'technical_feedback',
    title: 'Technical Issue Report',
    description: 'Help us fix any problems you encountered',
    trigger: { type: 'error_occurrence' },
    questions: [
      {
        id: 'error_description',
        type: 'text',
        question: 'Please describe what happened when the error occurred',
        required: true,
        placeholder: 'Describe the issue...',
        validation: { minLength: 10, maxLength: 500 },
      },
      {
        id: 'error_frequency',
        type: 'multiple_choice',
        question: 'How often does this error occur?',
        required: true,
        options: ['First time', 'Occasionally', 'Frequently', 'Every time I try'],
      },
      {
        id: 'browser_info',
        type: 'text',
        question: 'What browser and device are you using?',
        required: false,
        placeholder: 'e.g., Chrome on iPhone, Safari on Mac...',
      },
    ],
    style: { position: 'modal', theme: 'light', size: 'medium' },
    targeting: { sampleRate: 1.0 },
  },
]

class FeedbackCollector {
  private feedbackData: FeedbackData[] = []
  private activeSurveys: Map<string, FeedbackSurvey> = new Map()
  private userId: string
  private sessionId: string
  private dismissedSurveys: Set<string> = new Set()

  constructor(userId: string, sessionId: string) {
    this.userId = userId
    this.sessionId = sessionId
    this.loadSurveys()
  }

  private loadSurveys(): void {
    COURSE_SELECTOR_SURVEYS.forEach((survey) => {
      this.activeSurveys.set(survey.id, survey)
    })
  }

  shouldShowSurvey(
    surveyId: string,
    context: { step?: number; timeSpent?: number; errorOccurred?: boolean }
  ): boolean {
    const survey = this.activeSurveys.get(surveyId)
    if (!survey || this.dismissedSurveys.has(surveyId)) return false

    // Check sample rate
    if (Math.random() > survey.targeting.sampleRate) return false

    // Check targeting criteria
    if (survey.targeting.steps && context.step !== undefined) {
      if (!survey.targeting.steps.includes(context.step)) return false
    }

    // Check trigger conditions
    switch (survey.trigger.type) {
      case 'step_completion':
        return context.step === survey.trigger.value || survey.trigger.value === undefined

      case 'time_spent':
        return context.timeSpent !== undefined && context.timeSpent >= (survey.trigger.value || 0)

      case 'error_occurrence':
        return context.errorOccurred === true

      case 'manual':
        return true

      default:
        return false
    }
  }

  submitFeedback(
    surveyId: string,
    responses: Record<string, any>,
    context?: { step?: number; stepName?: string }
  ): void {
    const feedbackData: FeedbackData = {
      id: this.generateId(),
      userId: this.userId,
      sessionId: this.sessionId,
      timestamp: Date.now(),
      feedbackType: 'survey',
      context: {
        step: context?.step,
        stepName: context?.stepName,
        page: typeof window !== 'undefined' ? window.location.href : '',
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
        viewport:
          typeof window !== 'undefined'
            ? { width: window.innerWidth, height: window.innerHeight }
            : { width: 0, height: 0 },
      },
      data: {
        surveyId,
        responses,
      },
      metadata: {
        surveyTitle: this.activeSurveys.get(surveyId)?.title,
        completionTime: Date.now(),
      },
    }

    this.feedbackData.push(feedbackData)
    this.sendToServer(feedbackData)
  }

  submitQuickFeedback(
    type: 'rating' | 'suggestion' | 'bug_report',
    data: Record<string, any>,
    context?: { step?: number; stepName?: string }
  ): void {
    const feedbackData: FeedbackData = {
      id: this.generateId(),
      userId: this.userId,
      sessionId: this.sessionId,
      timestamp: Date.now(),
      feedbackType: type,
      context: {
        step: context?.step,
        stepName: context?.stepName,
        page: typeof window !== 'undefined' ? window.location.href : '',
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
        viewport:
          typeof window !== 'undefined'
            ? { width: window.innerWidth, height: window.innerHeight }
            : { width: 0, height: 0 },
      },
      data,
    }

    this.feedbackData.push(feedbackData)
    this.sendToServer(feedbackData)
  }

  dismissSurvey(surveyId: string): void {
    this.dismissedSurveys.add(surveyId)

    // Track dismissal
    this.submitQuickFeedback('suggestion', {
      action: 'survey_dismissed',
      surveyId,
      reason: 'user_dismissed',
    })
  }

  private async sendToServer(feedbackData: FeedbackData): Promise<void> {
    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedbackData),
      })
    } catch (error) {
      console.warn('Failed to send feedback to server:', error)
    }
  }

  private generateId(): string {
    return `feedback_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  getSurvey(surveyId: string): FeedbackSurvey | undefined {
    return this.activeSurveys.get(surveyId)
  }

  getAllFeedback(): FeedbackData[] {
    return [...this.feedbackData]
  }
}

// React hook for feedback collection
export function useFeedbackCollection(userId: string, currentStep: number) {
  const [collector] = useState(
    () =>
      new FeedbackCollector(
        userId,
        `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      )
  )

  const [activeSurvey, setActiveSurvey] = useState<FeedbackSurvey | null>(null)
  const [stepStartTime] = useState(() => Date.now())

  // Check for surveys on step completion
  useEffect(() => {
    const checkSurveys = () => {
      const timeSpent = Date.now() - stepStartTime

      COURSE_SELECTOR_SURVEYS.forEach((survey) => {
        if (collector.shouldShowSurvey(survey.id, { step: currentStep, timeSpent })) {
          setActiveSurvey(survey)
        }
      })
    }

    // Small delay to ensure step is fully loaded
    const timer = setTimeout(checkSurveys, 1000)
    return () => clearTimeout(timer)
  }, [currentStep, collector, stepStartTime])

  const submitSurveyResponse = useCallback(
    (surveyId: string, responses: Record<string, any>) => {
      collector.submitFeedback(surveyId, responses, {
        step: currentStep,
        stepName: getStepName(currentStep),
      })
      setActiveSurvey(null)
    },
    [collector, currentStep]
  )

  const submitQuickFeedback = useCallback(
    (type: 'rating' | 'suggestion' | 'bug_report', data: Record<string, any>) => {
      collector.submitQuickFeedback(type, data, {
        step: currentStep,
        stepName: getStepName(currentStep),
      })
    },
    [collector, currentStep]
  )

  const dismissSurvey = useCallback(() => {
    if (activeSurvey) {
      collector.dismissSurvey(activeSurvey.id)
      setActiveSurvey(null)
    }
  }, [activeSurvey, collector])

  const triggerExitFeedback = useCallback(() => {
    const exitSurvey = COURSE_SELECTOR_SURVEYS.find((s) => s.trigger.type === 'exit_intent')
    if (exitSurvey && collector.shouldShowSurvey(exitSurvey.id, {})) {
      setActiveSurvey(exitSurvey)
    }
  }, [collector])

  const triggerErrorFeedback = useCallback(() => {
    const errorSurvey = COURSE_SELECTOR_SURVEYS.find((s) => s.trigger.type === 'error_occurrence')
    if (errorSurvey && collector.shouldShowSurvey(errorSurvey.id, { errorOccurred: true })) {
      setActiveSurvey(errorSurvey)
    }
  }, [collector])

  return {
    activeSurvey,
    submitSurveyResponse,
    submitQuickFeedback,
    dismissSurvey,
    triggerExitFeedback,
    triggerErrorFeedback,
    getAllFeedback: collector.getAllFeedback.bind(collector),
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

// Feedback analysis utilities
export class FeedbackAnalyzer {
  static analyzeFeedbackData(feedbackData: FeedbackData[]): {
    summary: Record<string, any>
    stepAnalysis: Record<string, any>
    sentimentAnalysis: Record<string, any>
    recommendations: string[]
  } {
    const summary = this.generateSummary(feedbackData)
    const stepAnalysis = this.analyzeByStep(feedbackData)
    const sentimentAnalysis = this.analyzeSentiment(feedbackData)
    const recommendations = this.generateRecommendations(feedbackData)

    return {
      summary,
      stepAnalysis,
      sentimentAnalysis,
      recommendations,
    }
  }

  private static generateSummary(feedbackData: FeedbackData[]): Record<string, any> {
    const totalFeedback = feedbackData.length
    const uniqueUsers = new Set(feedbackData.map((f) => f.userId)).size

    const feedbackTypes = feedbackData.reduce(
      (acc, feedback) => {
        acc[feedback.feedbackType] = (acc[feedback.feedbackType] || 0) + 1
        return acc
      },
      {} as Record<string, number>
    )

    const avgRatings = this.calculateAverageRatings(feedbackData)

    return {
      totalFeedback,
      uniqueUsers,
      feedbackTypes,
      avgRatings,
      responseRate: totalFeedback / Math.max(uniqueUsers * 2, 1), // Estimated response rate
    }
  }

  private static analyzeByStep(feedbackData: FeedbackData[]): Record<string, any> {
    return feedbackData.reduce(
      (acc, feedback) => {
        const step = feedback.context.step?.toString() || 'unknown'

        if (!acc[step]) {
          acc[step] = {
            totalFeedback: 0,
            ratings: [],
            suggestions: [],
            issues: [],
          }
        }

        acc[step].totalFeedback++

        // Extract ratings and text feedback
        if (feedback.data.responses) {
          Object.entries(feedback.data.responses).forEach(([key, value]) => {
            if (typeof value === 'number' && value >= 1 && value <= 10) {
              acc[step].ratings.push(value)
            } else if (typeof value === 'string' && value.length > 10) {
              if (key.includes('suggestion') || key.includes('improve')) {
                acc[step].suggestions.push(value)
              } else if (key.includes('issue') || key.includes('problem')) {
                acc[step].issues.push(value)
              }
            }
          })
        }

        return acc
      },
      {} as Record<string, any>
    )
  }

  private static analyzeSentiment(feedbackData: FeedbackData[]): Record<string, any> {
    // Simple sentiment analysis based on ratings and keywords
    const sentiments = { positive: 0, neutral: 0, negative: 0 }
    const keywords = {
      positive: ['easy', 'clear', 'helpful', 'good', 'great', 'excellent', 'love', 'like'],
      negative: ['difficult', 'confusing', 'unclear', 'bad', 'terrible', 'hate', 'dislike', 'slow'],
    }

    feedbackData.forEach((feedback) => {
      if (feedback.data.responses) {
        Object.values(feedback.data.responses).forEach((value) => {
          if (typeof value === 'number') {
            if (value >= 7) sentiments.positive++
            else if (value >= 4) sentiments.neutral++
            else sentiments.negative++
          } else if (typeof value === 'string') {
            const text = value.toLowerCase()
            const positiveMatches = keywords.positive.filter((word) => text.includes(word)).length
            const negativeMatches = keywords.negative.filter((word) => text.includes(word)).length

            if (positiveMatches > negativeMatches) sentiments.positive++
            else if (negativeMatches > positiveMatches) sentiments.negative++
            else sentiments.neutral++
          }
        })
      }
    })

    return sentiments
  }

  private static calculateAverageRatings(feedbackData: FeedbackData[]): Record<string, number> {
    const ratings: Record<string, number[]> = {}

    feedbackData.forEach((feedback) => {
      if (feedback.data.responses) {
        Object.entries(feedback.data.responses).forEach(([key, value]) => {
          if (typeof value === 'number' && value >= 1 && value <= 10) {
            if (!ratings[key]) ratings[key] = []
            ratings[key].push(value)
          }
        })
      }
    })

    return Object.entries(ratings).reduce(
      (acc, [key, values]) => {
        acc[key] = values.reduce((sum, val) => sum + val, 0) / values.length
        return acc
      },
      {} as Record<string, number>
    )
  }

  private static generateRecommendations(feedbackData: FeedbackData[]): string[] {
    const recommendations: string[] = []
    const stepAnalysis = this.analyzeByStep(feedbackData)
    const avgRatings = this.calculateAverageRatings(feedbackData)

    // Low rating recommendations
    Object.entries(avgRatings).forEach(([metric, rating]) => {
      if (rating < 3) {
        recommendations.push(
          `Critical: ${metric} has very low ratings (${rating.toFixed(1)}/10) - immediate attention needed`
        )
      } else if (rating < 4) {
        recommendations.push(
          `${metric} ratings are below average (${rating.toFixed(1)}/10) - consider improvements`
        )
      }
    })

    // Step-specific recommendations
    Object.entries(stepAnalysis).forEach(([step, data]: [string, any]) => {
      const avgStepRating =
        data.ratings.length > 0
          ? data.ratings.reduce((a: number, b: number) => a + b, 0) / data.ratings.length
          : 0

      if (avgStepRating < 3) {
        recommendations.push(
          `Step ${step} needs urgent improvement - average rating: ${avgStepRating.toFixed(1)}`
        )
      }

      if (data.issues.length > data.suggestions.length * 2) {
        recommendations.push(`Step ${step} has many reported issues - review user complaints`)
      }
    })

    return recommendations
  }
}
