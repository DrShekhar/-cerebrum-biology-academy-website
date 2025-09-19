'use client'

import { ABTestingService } from './abTestingService'

export interface ConversionGoal {
  id: string
  name: string
  description: string
  type:
    | 'page_view'
    | 'button_click'
    | 'form_submit'
    | 'phone_call'
    | 'demo_booking'
    | 'enrollment'
    | 'payment'
  value: number // Monetary value of this conversion
  selector?: string // CSS selector for DOM elements
  url?: string // URL pattern for page views
  event?: string // Custom event name
}

export interface ConversionEvent {
  goalId: string
  testId: string
  variantId: string
  userId: string
  value: number
  timestamp: string
  metadata?: Record<string, any>
}

export interface ConversionFunnel {
  id: string
  name: string
  steps: ConversionGoal[]
  dropoffAnalysis: boolean
}

class ConversionTracker {
  private static readonly GOALS: Record<string, ConversionGoal> = {
    homepage_view: {
      id: 'homepage_view',
      name: 'Homepage View',
      description: 'User views the homepage',
      type: 'page_view',
      value: 1,
      url: '/',
    },
    demo_booking_click: {
      id: 'demo_booking_click',
      name: 'Demo Booking Button Click',
      description: 'User clicks Book Free Demo button',
      type: 'button_click',
      value: 25,
      selector: '[data-track="demo-booking"]',
    },
    demo_form_submit: {
      id: 'demo_form_submit',
      name: 'Demo Form Submission',
      description: 'User submits demo booking form',
      type: 'form_submit',
      value: 100,
      selector: 'form[data-track="demo-form"]',
    },
    phone_call_click: {
      id: 'phone_call_click',
      name: 'Phone Call Click',
      description: 'User clicks phone number to call',
      type: 'button_click',
      value: 75,
      selector: '[data-track="phone-call"]',
    },
    pricing_page_view: {
      id: 'pricing_page_view',
      name: 'Pricing Page View',
      description: 'User views pricing/courses page',
      type: 'page_view',
      value: 5,
      url: '/courses',
    },
    enrollment_click: {
      id: 'enrollment_click',
      name: 'Enrollment Button Click',
      description: 'User clicks enrollment button',
      type: 'button_click',
      value: 200,
      selector: '[data-track="enrollment"]',
    },
    payment_started: {
      id: 'payment_started',
      name: 'Payment Process Started',
      description: 'User initiates payment process',
      type: 'form_submit',
      value: 500,
      event: 'payment_started',
    },
    payment_completed: {
      id: 'payment_completed',
      name: 'Payment Completed',
      description: 'User successfully completes payment',
      type: 'payment',
      value: 1000,
      event: 'payment_completed',
    },
    brochure_download: {
      id: 'brochure_download',
      name: 'Brochure Download',
      description: 'User downloads course brochure',
      type: 'button_click',
      value: 10,
      selector: '[data-track="brochure-download"]',
    },
    social_share: {
      id: 'social_share',
      name: 'Social Media Share',
      description: 'User shares content on social media',
      type: 'button_click',
      value: 5,
      selector: '[data-track="social-share"]',
    },
  }

  private static readonly FUNNELS: Record<string, ConversionFunnel> = {
    demo_funnel: {
      id: 'demo_funnel',
      name: 'Demo Booking Funnel',
      dropoffAnalysis: true,
      steps: [
        ConversionTracker.GOALS.homepage_view,
        ConversionTracker.GOALS.demo_booking_click,
        ConversionTracker.GOALS.demo_form_submit,
      ],
    },
    enrollment_funnel: {
      id: 'enrollment_funnel',
      name: 'Enrollment Funnel',
      dropoffAnalysis: true,
      steps: [
        ConversionTracker.GOALS.homepage_view,
        ConversionTracker.GOALS.pricing_page_view,
        ConversionTracker.GOALS.enrollment_click,
        ConversionTracker.GOALS.payment_started,
        ConversionTracker.GOALS.payment_completed,
      ],
    },
  }

  static initialize(): void {
    if (typeof window === 'undefined') return

    // Set up DOM event listeners for trackable elements
    this.setupClickTracking()
    this.setupFormTracking()
    this.setupPageViewTracking()

    console.log('🎯 Conversion tracking initialized')
  }

  private static setupClickTracking(): void {
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement
      if (!target) return

      // Find trackable element (could be parent element)
      const trackableElement = target.closest('[data-track]')
      if (!trackableElement) return

      const trackingId = trackableElement.getAttribute('data-track')
      if (!trackingId) return

      // Find matching conversion goal
      const goal = Object.values(this.GOALS).find(
        (g) => g.selector && trackableElement.matches(g.selector)
      )

      if (goal) {
        this.trackConversion(goal.id, goal.value, {
          element: trackingId,
          text: trackableElement.textContent?.trim(),
          href: trackableElement.getAttribute('href'),
          coordinates: { x: event.clientX, y: event.clientY },
        })
      }
    })
  }

  private static setupFormTracking(): void {
    document.addEventListener('submit', (event) => {
      const form = event.target as HTMLFormElement
      if (!form.hasAttribute('data-track')) return

      const trackingId = form.getAttribute('data-track')

      // Find matching conversion goal
      const goal = Object.values(this.GOALS).find(
        (g) => g.type === 'form_submit' && g.selector && form.matches(g.selector)
      )

      if (goal) {
        // Get form data for analysis
        const formData = new FormData(form)
        const formDataObject: Record<string, any> = {}
        formData.forEach((value, key) => {
          formDataObject[key] = value
        })

        this.trackConversion(goal.id, goal.value, {
          form: trackingId,
          formData: formDataObject,
          url: window.location.href,
        })
      }
    })
  }

  private static setupPageViewTracking(): void {
    // Track initial page view
    this.trackPageView()

    // Track SPA navigation (if using client-side routing)
    let lastUrl = window.location.href
    const observer = new MutationObserver(() => {
      if (window.location.href !== lastUrl) {
        lastUrl = window.location.href
        this.trackPageView()
      }
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })
  }

  private static trackPageView(): void {
    const currentPath = window.location.pathname

    // Find matching page view goals
    const pageGoals = Object.values(this.GOALS).filter(
      (goal) => goal.type === 'page_view' && goal.url && currentPath.includes(goal.url)
    )

    pageGoals.forEach((goal) => {
      this.trackConversion(goal.id, goal.value, {
        path: currentPath,
        url: window.location.href,
        referrer: document.referrer,
        title: document.title,
      })
    })
  }

  static trackConversion(goalId: string, value?: number, metadata?: Record<string, any>): void {
    const goal = this.GOALS[goalId]
    if (!goal) {
      console.warn(`Unknown conversion goal: ${goalId}`)
      return
    }

    const conversionValue = value || goal.value

    // Track for all active A/B tests
    const activeTests = ABTestingService.getAllActiveTests()

    activeTests.forEach((test) => {
      const assignment = ABTestingService.getTestAssignment(test.id)
      if (!assignment) return

      // Create conversion event
      const conversionEvent: ConversionEvent = {
        goalId,
        testId: test.id,
        variantId: assignment.variantId,
        userId: assignment.userId,
        value: conversionValue,
        timestamp: new Date().toISOString(),
        metadata: {
          goalName: goal.name,
          goalType: goal.type,
          ...metadata,
        },
      }

      // Track in A/B testing service
      ABTestingService.trackEvent({
        userId: assignment.userId,
        testId: test.id,
        variantId: assignment.variantId,
        eventType: 'conversion',
        eventValue: conversionValue,
        timestamp: new Date().toISOString(),
        metadata: {
          conversionGoal: goalId,
          ...metadata,
        },
      })

      // Store conversion event
      this.storeConversionEvent(conversionEvent)

      console.log(
        `🎯 Conversion tracked: ${goal.name} (${conversionValue} points) for test ${test.id}`
      )
    })
  }

  private static storeConversionEvent(event: ConversionEvent): void {
    try {
      const stored = localStorage.getItem('cerebrum_conversions') || '[]'
      const conversions: ConversionEvent[] = JSON.parse(stored)

      conversions.push(event)

      // Keep only last 500 conversions
      if (conversions.length > 500) {
        conversions.splice(0, conversions.length - 500)
      }

      localStorage.setItem('cerebrum_conversions', JSON.stringify(conversions))
    } catch (error) {
      console.error('Failed to store conversion event:', error)
    }
  }

  static getConversionEvents(testId?: string, goalId?: string): ConversionEvent[] {
    try {
      const stored = localStorage.getItem('cerebrum_conversions') || '[]'
      let conversions: ConversionEvent[] = JSON.parse(stored)

      if (testId) {
        conversions = conversions.filter((c) => c.testId === testId)
      }

      if (goalId) {
        conversions = conversions.filter((c) => c.goalId === goalId)
      }

      return conversions
    } catch {
      return []
    }
  }

  static getFunnelAnalysis(funnelId: string): {
    funnel: ConversionFunnel
    stepData: Array<{
      goal: ConversionGoal
      users: number
      conversions: number
      conversionRate: number
      dropoffRate: number
    }>
    totalConversionRate: number
  } {
    const funnel = this.FUNNELS[funnelId]
    if (!funnel) {
      throw new Error(`Unknown funnel: ${funnelId}`)
    }

    const allConversions = this.getConversionEvents()
    const stepData = funnel.steps.map((goal, index) => {
      const goalConversions = allConversions.filter((c) => c.goalId === goal.id)
      const uniqueUsers = new Set(goalConversions.map((c) => c.userId)).size

      let conversionRate = 0
      let dropoffRate = 0

      if (index === 0) {
        // First step - use total users who hit this goal
        conversionRate = 100
      } else {
        // Calculate conversion from previous step
        const previousGoal = funnel.steps[index - 1]
        const previousConversions = allConversions.filter((c) => c.goalId === previousGoal.id)
        const previousUsers = new Set(previousConversions.map((c) => c.userId)).size

        conversionRate = previousUsers > 0 ? (uniqueUsers / previousUsers) * 100 : 0
        dropoffRate = 100 - conversionRate
      }

      return {
        goal,
        users: uniqueUsers,
        conversions: goalConversions.length,
        conversionRate,
        dropoffRate,
      }
    })

    // Calculate total funnel conversion rate
    const firstStepUsers = stepData[0]?.users || 0
    const lastStepUsers = stepData[stepData.length - 1]?.users || 0
    const totalConversionRate = firstStepUsers > 0 ? (lastStepUsers / firstStepUsers) * 100 : 0

    return {
      funnel,
      stepData,
      totalConversionRate,
    }
  }

  static getConversionGoals(): ConversionGoal[] {
    return Object.values(this.GOALS)
  }

  static getFunnels(): ConversionFunnel[] {
    return Object.values(this.FUNNELS)
  }

  // Manual tracking methods for custom events
  static trackDemoBooking(): void {
    this.trackConversion('demo_form_submit')
  }

  static trackPhoneCall(): void {
    this.trackConversion('phone_call_click')
  }

  static trackEnrollment(): void {
    this.trackConversion('enrollment_click')
  }

  static trackPaymentStarted(amount?: number): void {
    this.trackConversion('payment_started', amount)
  }

  static trackPaymentCompleted(amount: number): void {
    this.trackConversion('payment_completed', amount, { paymentAmount: amount })
  }

  static trackBrochureDownload(brochureType?: string): void {
    this.trackConversion('brochure_download', undefined, { brochureType })
  }

  static trackSocialShare(platform: string): void {
    this.trackConversion('social_share', undefined, { platform })
  }

  static trackWhatsAppClick(): void {
    this.trackConversion('whatsapp_click')
  }

  static trackLeadGeneration(source: string, data: any): void {
    this.trackConversion('lead_generation', undefined, { source, ...data })
  }

  static trackEngagement(type: string, data?: any): void {
    this.trackConversion('engagement', undefined, { type, ...data })
  }

  static trackChatInteraction(): void {
    this.trackConversion('chat_interaction')
  }

  static trackDownload(resource: string): void {
    this.trackConversion('download', undefined, { resource })
  }

  // Analytics helpers
  static getConversionRate(goalId: string, testId?: string): number {
    const allEvents = ABTestingService.exportData().events
    const conversions = allEvents.filter(
      (e) =>
        e.eventType === 'conversion' &&
        e.metadata?.conversionGoal === goalId &&
        (!testId || e.testId === testId)
    )

    const views = allEvents.filter(
      (e) => e.eventType === 'view' && (!testId || e.testId === testId)
    )

    return views.length > 0 ? (conversions.length / views.length) * 100 : 0
  }

  static getConversionValue(testId?: string): number {
    const conversions = this.getConversionEvents(testId)
    return conversions.reduce((total, conversion) => total + conversion.value, 0)
  }
}

export { ConversionTracker }
