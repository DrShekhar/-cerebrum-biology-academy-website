// Comprehensive Analytics Strategy for NEET Coaching Platform
// Focus: Actionable insights that drive enrollment growth and student success

export interface AnalyticsEvent {
  name: string
  category: 'user_engagement' | 'conversion' | 'retention' | 'revenue' | 'product'
  properties: Record<string, any>
  timestamp: number
  userId?: string
  sessionId: string
  source?: string
  medium?: string
  campaign?: string
}

export interface KPIMetric {
  id: string
  name: string
  description: string
  formula: string
  target: number
  current: number
  trend: 'up' | 'down' | 'stable'
  category: 'growth' | 'engagement' | 'revenue' | 'quality'
  actionThreshold: number
  alertConditions: string[]
}

export interface InsightGeneration {
  type: 'opportunity' | 'risk' | 'anomaly' | 'trend'
  priority: 'critical' | 'high' | 'medium' | 'low'
  title: string
  description: string
  impact: string
  recommendations: string[]
  dataPoints: any[]
  confidence: number // 0-100
}

// Core Analytics Events for NEET Platform
export const NEETAnalyticsEvents = {
  // User Acquisition Events
  USER_LANDED: 'user_landed',
  COURSE_VIEWED: 'course_viewed',
  PRICE_CHECKED: 'price_checked',
  DEMO_REQUESTED: 'demo_requested',
  BROCHURE_DOWNLOADED: 'brochure_downloaded',

  // Engagement Events
  VIDEO_PLAYED: 'video_played',
  CONTENT_SHARED: 'content_shared',
  QUIZ_ATTEMPTED: 'quiz_attempted',
  DOUBT_ASKED: 'doubt_asked',
  PEER_INTERACTION: 'peer_interaction',

  // Conversion Events
  FORM_STARTED: 'form_started',
  FORM_COMPLETED: 'form_completed',
  PAYMENT_INITIATED: 'payment_initiated',
  PAYMENT_COMPLETED: 'payment_completed',
  ENROLLMENT_CONFIRMED: 'enrollment_confirmed',

  // Retention Events
  CLASS_ATTENDED: 'class_attended',
  ASSIGNMENT_SUBMITTED: 'assignment_submitted',
  LOGIN_STREAK: 'login_streak',
  COURSE_COMPLETED: 'course_completed',
  REFERRAL_MADE: 'referral_made',

  // Revenue Events
  UPSELL_VIEWED: 'upsell_viewed',
  ADDON_PURCHASED: 'addon_purchased',
  RENEWAL_COMPLETED: 'renewal_completed',
  REFUND_REQUESTED: 'refund_requested',
}

// Key Performance Indicators for NEET Coaching
export const NEETKPIs: KPIMetric[] = [
  {
    id: 'enrollment_conversion_rate',
    name: 'Enrollment Conversion Rate',
    description: 'Percentage of website visitors who complete enrollment',
    formula: '(Enrollments / Unique Visitors) * 100',
    target: 2.5,
    current: 0,
    trend: 'up',
    category: 'growth',
    actionThreshold: 2.0,
    alertConditions: ['< 1.5%', 'declining for 3+ days'],
  },
  {
    id: 'demo_to_enrollment',
    name: 'Demo to Enrollment Rate',
    description: 'Percentage of demo attendees who enroll',
    formula: '(Enrollments / Demo Attendees) * 100',
    target: 35,
    current: 0,
    trend: 'up',
    category: 'growth',
    actionThreshold: 30,
    alertConditions: ['< 25%', 'declining trend for 5+ days'],
  },
  {
    id: 'student_acquisition_cost',
    name: 'Student Acquisition Cost (SAC)',
    description: 'Average cost to acquire one paying student',
    formula: 'Total Marketing Spend / New Students Acquired',
    target: 2500,
    current: 0,
    trend: 'down',
    category: 'growth',
    actionThreshold: 3000,
    alertConditions: ['> ₹3500', 'increasing for 7+ days'],
  },
  {
    id: 'student_lifetime_value',
    name: 'Student Lifetime Value (SLV)',
    description: 'Total revenue generated from an average student',
    formula: 'Average Course Fee * Average Courses per Student * Retention Rate',
    target: 25000,
    current: 0,
    trend: 'up',
    category: 'revenue',
    actionThreshold: 20000,
    alertConditions: ['< ₹20000', 'declining for 30+ days'],
  },
  {
    id: 'class_attendance_rate',
    name: 'Average Class Attendance',
    description: 'Percentage of enrolled students attending live classes',
    formula: '(Total Attendees / Total Enrolled Students) * 100',
    target: 85,
    current: 0,
    trend: 'stable',
    category: 'engagement',
    actionThreshold: 80,
    alertConditions: ['< 75%', 'declining for 7+ days'],
  },
  {
    id: 'monthly_retention_rate',
    name: 'Monthly Retention Rate',
    description: 'Percentage of students still active after 30 days',
    formula: '(Active Students Month 2 / Enrolled Students Month 1) * 100',
    target: 90,
    current: 0,
    trend: 'up',
    category: 'engagement',
    actionThreshold: 85,
    alertConditions: ['< 80%', 'declining trend'],
  },
  {
    id: 'neet_score_improvement',
    name: 'Average NEET Score Improvement',
    description: 'Average improvement in NEET mock test scores',
    formula: '(Latest Score - Initial Score) / Students',
    target: 50,
    current: 0,
    trend: 'up',
    category: 'quality',
    actionThreshold: 40,
    alertConditions: ['< 30 points', 'no improvement for 60+ days'],
  },
  {
    id: 'revenue_per_student',
    name: 'Revenue per Student per Month',
    description: 'Average monthly revenue generated per student',
    formula: 'Total Monthly Revenue / Active Students',
    target: 3500,
    current: 0,
    trend: 'up',
    category: 'revenue',
    actionThreshold: 3000,
    alertConditions: ['< ₹2500', 'declining for 14+ days'],
  },
  {
    id: 'whatsapp_engagement_rate',
    name: 'WhatsApp Engagement Rate',
    description: 'Percentage of WhatsApp messages that get responses',
    formula: '(WhatsApp Responses / WhatsApp Messages Sent) * 100',
    target: 60,
    current: 0,
    trend: 'stable',
    category: 'engagement',
    actionThreshold: 50,
    alertConditions: ['< 40%', 'declining for 5+ days'],
  },
  {
    id: 'referral_rate',
    name: 'Student Referral Rate',
    description: 'Percentage of students who refer others',
    formula: '(Students Who Referred / Total Students) * 100',
    target: 15,
    current: 0,
    trend: 'up',
    category: 'growth',
    actionThreshold: 10,
    alertConditions: ['< 8%', 'no referrals for 30+ days'],
  },
]

// Analytics Implementation Class
export class NEETAnalyticsEngine {
  private events: AnalyticsEvent[] = []
  private insights: InsightGeneration[] = []

  // Track user events with contextual data
  trackEvent(eventName: string, properties: Record<string, any> = {}, userId?: string): void {
    const event: AnalyticsEvent = {
      name: eventName,
      category: this.categorizeEvent(eventName),
      properties: {
        ...properties,
        timestamp: Date.now(),
        page_url: typeof window !== 'undefined' ? window.location.href : '',
        user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
        screen_resolution: typeof screen !== 'undefined' ? `${screen.width}x${screen.height}` : '',
        is_mobile: this.isMobileDevice(),
        ...this.getUTMParameters(),
      },
      timestamp: Date.now(),
      userId,
      sessionId: this.getSessionId(),
      source: this.getTrafficSource(),
      medium: this.getTrafficMedium(),
      campaign: this.getCampaignInfo(),
    }

    this.events.push(event)
    this.processEventForInsights(event)

    // Send to external analytics services
    this.sendToGoogleAnalytics(event)
    this.sendToCustomBackend(event)
  }

  // Real-time insight generation
  private processEventForInsights(event: AnalyticsEvent): void {
    // Check for conversion opportunities
    if (event.name === NEETAnalyticsEvents.COURSE_VIEWED) {
      this.checkCourseViewToDemo(event)
    }

    // Monitor payment abandonment
    if (event.name === NEETAnalyticsEvents.PAYMENT_INITIATED) {
      this.monitorPaymentCompletion(event)
    }

    // Track engagement anomalies
    if (event.name === NEETAnalyticsEvents.CLASS_ATTENDED) {
      this.checkAttendancePatterns(event)
    }

    // Identify referral opportunities
    if (event.name === NEETAnalyticsEvents.COURSE_COMPLETED) {
      this.triggerReferralOutreach(event)
    }
  }

  // Generate actionable insights
  generateDailyInsights(): InsightGeneration[] {
    const insights: InsightGeneration[] = []

    // Analyze conversion funnel performance
    insights.push(...this.analyzeFunnelPerformance())

    // Identify high-value user segments
    insights.push(...this.identifyHighValueSegments())

    // Detect retention risks
    insights.push(...this.detectRetentionRisks())

    // Find revenue optimization opportunities
    insights.push(...this.findRevenueOpportunities())

    // WhatsApp engagement analysis
    insights.push(...this.analyzeWhatsAppEngagement())

    return insights.sort((a, b) => this.priorityScore(b) - this.priorityScore(a))
  }

  private analyzeFunnelPerformance(): InsightGeneration[] {
    const insights: InsightGeneration[] = []

    // Example: Low demo-to-enrollment conversion
    const demoEvents = this.events.filter((e) => e.name === NEETAnalyticsEvents.DEMO_REQUESTED)
    const enrollmentEvents = this.events.filter(
      (e) => e.name === NEETAnalyticsEvents.ENROLLMENT_CONFIRMED
    )

    if (demoEvents.length > 0) {
      const conversionRate = (enrollmentEvents.length / demoEvents.length) * 100

      if (conversionRate < 25) {
        insights.push({
          type: 'opportunity',
          priority: 'high',
          title: 'Low Demo-to-Enrollment Conversion',
          description: `Demo conversion rate is ${conversionRate.toFixed(1)}%, below target of 35%`,
          impact: `Potential ${Math.round(((35 - conversionRate) * demoEvents.length) / 100)} additional enrollments`,
          recommendations: [
            'Improve demo class content and engagement',
            'Follow up within 2 hours of demo completion',
            'Offer limited-time enrollment discount during demo',
            'Collect parent contact information during demo',
          ],
          dataPoints: [
            { metric: 'Demo Requests', value: demoEvents.length },
            { metric: 'Enrollments', value: enrollmentEvents.length },
            { metric: 'Conversion Rate', value: `${conversionRate.toFixed(1)}%` },
          ],
          confidence: 85,
        })
      }
    }

    return insights
  }

  private identifyHighValueSegments(): InsightGeneration[] {
    const insights: InsightGeneration[] = []

    // Analyze user behavior patterns to identify high-converting segments
    const courseViewers = this.groupEventsByProperty(
      NEETAnalyticsEvents.COURSE_VIEWED,
      'course_type'
    )

    for (const [courseType, events] of Object.entries(courseViewers)) {
      const conversionRate = this.calculateConversionRate(
        events,
        NEETAnalyticsEvents.ENROLLMENT_CONFIRMED
      )

      if (conversionRate > 40) {
        // High-converting course type
        insights.push({
          type: 'opportunity',
          priority: 'medium',
          title: `High-Converting Segment: ${courseType}`,
          description: `${courseType} course viewers convert at ${conversionRate.toFixed(1)}%`,
          impact: 'Focus marketing spend on this high-performing segment',
          recommendations: [
            `Increase ad spend for ${courseType} courses`,
            'Create lookalike audiences based on these users',
            'Develop more content targeting this segment',
            'A/B test specific messaging for this audience',
          ],
          dataPoints: [
            { metric: 'Course Views', value: events.length },
            { metric: 'Conversion Rate', value: `${conversionRate.toFixed(1)}%` },
          ],
          confidence: 78,
        })
      }
    }

    return insights
  }

  private detectRetentionRisks(): InsightGeneration[] {
    const insights: InsightGeneration[] = []

    // Identify students at risk of dropping out
    const attendanceEvents = this.events.filter(
      (e) => e.name === NEETAnalyticsEvents.CLASS_ATTENDED
    )
    const userAttendance = this.groupEventsByProperty(attendanceEvents, 'userId')

    let atRiskStudents = 0

    for (const [userId, events] of Object.entries(userAttendance)) {
      const recentEvents = events.filter(
        (e) => Date.now() - e.timestamp < 7 * 24 * 60 * 60 * 1000 // Last 7 days
      )

      if (recentEvents.length < 2) {
        // Less than 2 classes in past week
        atRiskStudents++
      }
    }

    if (atRiskStudents > 0) {
      insights.push({
        type: 'risk',
        priority: 'high',
        title: 'Students at Risk of Dropping Out',
        description: `${atRiskStudents} students have low recent attendance`,
        impact: `Potential revenue loss of ₹${atRiskStudents * 15000}`,
        recommendations: [
          'Send personalized WhatsApp messages to at-risk students',
          'Offer one-on-one counseling sessions',
          'Provide recorded class access for missed sessions',
          'Assign peer study buddies for motivation',
        ],
        dataPoints: [
          { metric: 'At-Risk Students', value: atRiskStudents },
          { metric: 'Revenue at Risk', value: `₹${atRiskStudents * 15000}` },
        ],
        confidence: 92,
      })
    }

    return insights
  }

  private findRevenueOpportunities(): InsightGeneration[] {
    const insights: InsightGeneration[] = []

    // Identify upselling opportunities
    const completedCourses = this.events.filter(
      (e) => e.name === NEETAnalyticsEvents.COURSE_COMPLETED
    )

    if (completedCourses.length > 0) {
      insights.push({
        type: 'opportunity',
        priority: 'medium',
        title: 'Upselling to Course Completers',
        description: `${completedCourses.length} students completed courses and may be interested in advanced programs`,
        impact: `Potential revenue of ₹${completedCourses.length * 20000}`,
        recommendations: [
          'Offer advanced NEET preparation courses',
          'Introduce AIIMS/JIPMER specific modules',
          'Create premium mentorship programs',
          'Provide post-NEET counseling services',
        ],
        dataPoints: [
          { metric: 'Course Completers', value: completedCourses.length },
          { metric: 'Upsell Potential', value: `₹${completedCourses.length * 20000}` },
        ],
        confidence: 70,
      })
    }

    return insights
  }

  private analyzeWhatsAppEngagement(): InsightGeneration[] {
    const insights: InsightGeneration[] = []

    // WhatsApp-specific insights for Indian market
    const whatsappEvents = this.events.filter(
      (e) => e.properties.source === 'whatsapp' || e.properties.channel === 'whatsapp'
    )

    if (whatsappEvents.length > 0) {
      const conversionRate = this.calculateConversionRate(
        whatsappEvents,
        NEETAnalyticsEvents.ENROLLMENT_CONFIRMED
      )

      insights.push({
        type: 'trend',
        priority: 'medium',
        title: 'WhatsApp Channel Performance',
        description: `WhatsApp users convert at ${conversionRate.toFixed(1)}%`,
        impact: conversionRate > 30 ? 'High-performing channel' : 'Optimization needed',
        recommendations:
          conversionRate > 30
            ? [
                'Increase WhatsApp marketing investment',
                'Create WhatsApp-specific content',
                'Implement WhatsApp business API',
                'Train team on WhatsApp best practices',
              ]
            : [
                'Improve WhatsApp message personalization',
                'Optimize response time to < 5 minutes',
                'Create engaging multimedia content',
                'Implement chatbot for instant responses',
              ],
        dataPoints: [
          { metric: 'WhatsApp Interactions', value: whatsappEvents.length },
          { metric: 'Conversion Rate', value: `${conversionRate.toFixed(1)}%` },
        ],
        confidence: 85,
      })
    }

    return insights
  }

  // Helper methods
  private categorizeEvent(eventName: string): AnalyticsEvent['category'] {
    const categories = {
      user_engagement: [NEETAnalyticsEvents.VIDEO_PLAYED, NEETAnalyticsEvents.QUIZ_ATTEMPTED],
      conversion: [NEETAnalyticsEvents.DEMO_REQUESTED, NEETAnalyticsEvents.ENROLLMENT_CONFIRMED],
      retention: [NEETAnalyticsEvents.CLASS_ATTENDED, NEETAnalyticsEvents.LOGIN_STREAK],
      revenue: [NEETAnalyticsEvents.PAYMENT_COMPLETED, NEETAnalyticsEvents.ADDON_PURCHASED],
      product: [NEETAnalyticsEvents.DOUBT_ASKED, NEETAnalyticsEvents.ASSIGNMENT_SUBMITTED],
    }

    for (const [category, events] of Object.entries(categories)) {
      if (events.includes(eventName)) {
        return category as AnalyticsEvent['category']
      }
    }

    return 'user_engagement'
  }

  private groupEventsByProperty(
    events: AnalyticsEvent[] | string,
    property: string
  ): Record<string, AnalyticsEvent[]> {
    let eventList: AnalyticsEvent[]

    if (typeof events === 'string') {
      eventList = this.events.filter((e) => e.name === events)
    } else {
      eventList = events
    }

    return eventList.reduce(
      (groups, event) => {
        const key = event.properties[property] || 'unknown'
        groups[key] = groups[key] || []
        groups[key].push(event)
        return groups
      },
      {} as Record<string, AnalyticsEvent[]>
    )
  }

  private calculateConversionRate(sourceEvents: AnalyticsEvent[], targetEvent: string): number {
    if (sourceEvents.length === 0) return 0

    const userIds = sourceEvents.map((e) => e.userId).filter(Boolean)
    const convertedUsers = this.events
      .filter((e) => e.name === targetEvent && userIds.includes(e.userId))
      .map((e) => e.userId)

    const uniqueConvertedUsers = [...new Set(convertedUsers)]
    return (uniqueConvertedUsers.length / userIds.length) * 100
  }

  private priorityScore(insight: InsightGeneration): number {
    const priorityWeights = { critical: 100, high: 75, medium: 50, low: 25 }
    const typeWeights = { risk: 1.2, opportunity: 1.0, anomaly: 0.8, trend: 0.6 }

    return (
      priorityWeights[insight.priority] * typeWeights[insight.type] * (insight.confidence / 100)
    )
  }

  // External integrations
  private sendToGoogleAnalytics(event: AnalyticsEvent): void {
    if (typeof gtag !== 'undefined') {
      gtag('event', event.name, {
        event_category: event.category,
        custom_parameters: event.properties,
      })
    }
  }

  private sendToCustomBackend(event: AnalyticsEvent): void {
    // Send to your analytics backend
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
    }).catch((error) => console.error('Analytics tracking failed:', error))
  }

  // Utility methods
  private getSessionId(): string {
    return sessionStorage.getItem('sessionId') || 'session_' + Date.now()
  }

  private isMobileDevice(): boolean {
    return (
      typeof navigator !== 'undefined' && /Mobile|Android|iPhone|iPad/.test(navigator.userAgent)
    )
  }

  private getUTMParameters(): Record<string, string> {
    if (typeof window === 'undefined') return {}

    const urlParams = new URLSearchParams(window.location.search)
    return {
      utm_source: urlParams.get('utm_source') || '',
      utm_medium: urlParams.get('utm_medium') || '',
      utm_campaign: urlParams.get('utm_campaign') || '',
      utm_content: urlParams.get('utm_content') || '',
    }
  }

  private getTrafficSource(): string {
    if (typeof document === 'undefined') return 'direct'

    const referrer = document.referrer
    if (!referrer) return 'direct'
    if (referrer.includes('google.com')) return 'google'
    if (referrer.includes('facebook.com')) return 'facebook'
    if (referrer.includes('whatsapp.com')) return 'whatsapp'
    return 'referral'
  }

  private getTrafficMedium(): string {
    const urlParams =
      typeof window !== 'undefined'
        ? new URLSearchParams(window.location.search)
        : new URLSearchParams()

    return urlParams.get('utm_medium') || 'organic'
  }

  private getCampaignInfo(): string {
    const urlParams =
      typeof window !== 'undefined'
        ? new URLSearchParams(window.location.search)
        : new URLSearchParams()

    return urlParams.get('utm_campaign') || ''
  }

  // Monitoring methods for specific patterns
  private checkCourseViewToDemo(event: AnalyticsEvent): void {
    // Implement logic to trigger demo booking prompts
  }

  private monitorPaymentCompletion(event: AnalyticsEvent): void {
    // Set up monitoring for payment abandonment
    setTimeout(
      () => {
        const completionEvent = this.events.find(
          (e) =>
            e.name === NEETAnalyticsEvents.PAYMENT_COMPLETED &&
            e.userId === event.userId &&
            e.timestamp > event.timestamp
        )

        if (!completionEvent) {
          // Trigger abandonment recovery workflow
          this.triggerPaymentRecovery(event.userId!)
        }
      },
      30 * 60 * 1000
    ) // 30 minutes
  }

  private checkAttendancePatterns(event: AnalyticsEvent): void {
    // Monitor for declining attendance patterns
  }

  private triggerReferralOutreach(event: AnalyticsEvent): void {
    // Initiate referral program outreach
  }

  private triggerPaymentRecovery(userId: string): void {
    // Implement payment recovery workflow
  }
}

// Export singleton instance
export const analyticsEngine = new NEETAnalyticsEngine()
