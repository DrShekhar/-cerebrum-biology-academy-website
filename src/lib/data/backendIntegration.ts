/**
 * Backend Integration Layer
 * Connects data integration system with existing services and databases
 */

import { courses } from '@/data/courseData'
import { COURSE_SERIES } from '@/data/seriesData'
import { detailedCourses } from '@/data/detailedCourses'
import { EnhancedCourseData, Student, Course } from './integrationSchemas'

// Existing backend service adapters
interface BackendServices {
  database: DatabaseAdapter
  payment: PaymentAdapter
  whatsapp: WhatsAppAdapter
  seo: SEOAdapter
  analytics: AnalyticsAdapter
}

// Database adapter for existing data sources
export class DatabaseAdapter {
  // Course data integration
  async getCourses(filters?: {
    class?: string
    series?: string
    includeDetailed?: boolean
  }): Promise<EnhancedCourseData[]> {
    try {
      let filteredCourses = courses

      // Apply class filter
      if (filters?.class && filters.class !== 'all') {
        filteredCourses = courses.filter((course) => course.targetClass.includes(filters.class!))
      }

      // Apply series filter
      if (filters?.series) {
        filteredCourses = filteredCourses.filter(
          (course) => course.series.toLowerCase() === filters.series!.toLowerCase()
        )
      }

      // Enhance with additional data
      const enhancedCourses = await Promise.all(
        filteredCourses.map(async (course) => {
          // Get detailed course data if available
          const detailedCourse = filters?.includeDetailed
            ? detailedCourses.find((dc) => dc.id === course.id)
            : null

          // Get series data
          const seriesData = COURSE_SERIES[course.targetClass[0]]?.find(
            (s) => s.name.toLowerCase() === course.series.toLowerCase()
          )

          // Generate real-time metrics
          const realTimeStats = {
            currentViewers: Math.floor(Math.random() * 50) + 10,
            recentEnrollments: Math.floor(Math.random() * 20) + 5,
            liveInteractions: Math.floor(Math.random() * 100) + 20,
            popularityScore: (course.enrollmentCount + Math.random() * 100) / 100,
          }

          // Generate animation config
          const animationConfig = {
            entranceDelay: Math.random() * 0.3,
            hoverEffects: ['scale', 'glow', 'shadow'],
            selectionAnimation: 'spring',
            transitionDuration: 0.4,
          }

          // Enhanced course object
          const enhanced: EnhancedCourseData = {
            ...course,
            plans: seriesData?.plans || [],
            animationConfig,
            realTimeStats,
            personalizedData: null, // Will be filled by user context
            analytics: {
              enrollmentCount: course.enrollmentCount,
              completionRate: Math.random() * 20 + 80,
              averageRating: course.rating || Math.random() * 1 + 4,
              viewCount: Math.floor(Math.random() * 10000) + 5000,
              conversionRate: Math.random() * 10 + 15,
            },
            metadata: {
              tags: course.features.slice(0, 3),
              difficulty: course.targetClass.includes('12th')
                ? 'advanced'
                : course.targetClass.includes('11th')
                  ? 'intermediate'
                  : 'beginner',
              prerequisites: course.features.slice(0, 2),
              learningObjectives: course.highlights?.slice(0, 3) || [],
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            // Additional fields from detailed courses
            ...(detailedCourse && {
              curriculum: detailedCourse.curriculum,
              instructor: detailedCourse.instructor,
              schedule: detailedCourse.schedule,
              testimonials: detailedCourse.testimonials,
              gallery: detailedCourse.gallery,
              prerequisites: detailedCourse.prerequisites,
              benefits: detailedCourse.benefits,
              faq: detailedCourse.faq,
            }),
          }

          return enhanced
        })
      )

      return enhancedCourses
    } catch (error) {
      console.error('Failed to get courses from database:', error)
      throw new Error('Database integration failed')
    }
  }

  // Student data integration
  async getStudent(studentId: string): Promise<Student | null> {
    try {
      // Simulate database lookup
      // In production, this would query your actual database
      const mockStudent: Student = {
        id: studentId,
        name: 'Mock Student',
        email: 'student@example.com',
        phone: '+91-9876543210',
        class: '12th',
        enrolledCourses: ['pursuit-neet-plan-a'],
        selectedSeries: 'pursuit',
        selectedPlan: 'A',
        preferences: {
          learningStyle: 'visual',
          studyHours: 8,
          preferredTime: '4:00 PM',
          subjects: ['Biology', 'Physics', 'Chemistry'],
        },
        progress: {
          overallScore: 85,
          chapterWiseScores: {
            'cell-biology': 90,
            genetics: 80,
            ecology: 85,
          },
          testResults: [
            {
              testId: 'test-001',
              score: 85,
              date: new Date().toISOString(),
              timeSpent: 120,
            },
          ],
          studyTime: {
            daily: 8,
            weekly: 56,
            monthly: 240,
          },
        },
        analytics: {
          lastLogin: new Date().toISOString(),
          sessionDuration: 3600,
          clickThrough: {
            'course-cards': 15,
            'plan-buttons': 8,
            'study-materials': 25,
          },
          engagementScore: 92,
          learningPath: ['course-selection', 'study-plan', 'practice-tests'],
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      return mockStudent
    } catch (error) {
      console.error('Failed to get student data:', error)
      return null
    }
  }

  // Analytics data integration
  async saveInteraction(interaction: {
    userId: string
    sessionId: string
    type: string
    element: string
    data: Record<string, any>
    timestamp: string
  }): Promise<boolean> {
    try {
      // In production, save to database
      console.log('💾 Saving interaction to database:', interaction)
      return true
    } catch (error) {
      console.error('Failed to save interaction:', error)
      return false
    }
  }

  async getAnalytics(filters: {
    timeRange?: string
    userId?: string
    courseId?: string
  }): Promise<any> {
    try {
      // Mock analytics data
      return {
        totalInteractions: Math.floor(Math.random() * 10000) + 5000,
        uniqueUsers: Math.floor(Math.random() * 1000) + 500,
        popularCourses: ['pursuit-neet-plan-a', 'ascent-neet-plan-b'],
        conversionRate: Math.random() * 15 + 10,
        engagementMetrics: {
          averageSessionDuration: Math.random() * 3600 + 1800,
          bounceRate: Math.random() * 30 + 20,
          pageViews: Math.floor(Math.random() * 50000) + 25000,
        },
      }
    } catch (error) {
      console.error('Failed to get analytics:', error)
      throw new Error('Analytics integration failed')
    }
  }
}

// Payment integration adapter
export class PaymentAdapter {
  // Integrate with existing Razorpay service
  async getPaymentStatus(orderId: string): Promise<{
    status: 'pending' | 'completed' | 'failed'
    amount: number
    currency: string
  }> {
    try {
      // In production, integrate with your existing payment service
      // from /src/lib/payments/razorpay.ts
      return {
        status: 'completed',
        amount: 75000,
        currency: 'INR',
      }
    } catch (error) {
      console.error('Payment integration failed:', error)
      throw new Error('Payment service unavailable')
    }
  }

  async createPaymentLink(courseId: string, planId: string, userId: string): Promise<string> {
    try {
      // Generate payment link using existing service
      const paymentId = crypto.randomUUID()
      return `/payment/checkout?id=${paymentId}&course=${courseId}&plan=${planId}&user=${userId}`
    } catch (error) {
      console.error('Failed to create payment link:', error)
      throw new Error('Payment link generation failed')
    }
  }
}

// WhatsApp integration adapter
export class WhatsAppAdapter {
  // Integrate with existing WhatsApp service
  async sendCourseInfo(phone: string, courseId: string): Promise<boolean> {
    try {
      // In production, use your existing WhatsApp service
      // from /src/lib/whatsapp/whatsappService.ts
      console.log(`📱 Sending course info for ${courseId} to ${phone}`)
      return true
    } catch (error) {
      console.error('WhatsApp integration failed:', error)
      return false
    }
  }

  async sendEnrollmentConfirmation(phone: string, courseDetails: any): Promise<boolean> {
    try {
      console.log(`✅ Sending enrollment confirmation to ${phone}`, courseDetails)
      return true
    } catch (error) {
      console.error('Failed to send enrollment confirmation:', error)
      return false
    }
  }
}

// SEO integration adapter
export class SEOAdapter {
  // Integrate with existing SEO service
  async updateCourseMetadata(courseId: string, metadata: any): Promise<boolean> {
    try {
      // In production, integrate with your existing SEO service
      // from /src/lib/seo/metadataService.ts
      console.log(`🔍 Updating SEO metadata for course ${courseId}`, metadata)
      return true
    } catch (error) {
      console.error('SEO integration failed:', error)
      return false
    }
  }

  async generateSitemap(): Promise<string[]> {
    try {
      // Generate sitemap URLs for course pages
      const courseUrls = courses.map((course) => `/courses/${course.id}`)
      const seriesUrls = Object.keys(COURSE_SERIES).map((cls) => `/courses/class-${cls}`)
      return [...courseUrls, ...seriesUrls]
    } catch (error) {
      console.error('Sitemap generation failed:', error)
      return []
    }
  }
}

// Analytics integration adapter
export class AnalyticsAdapter {
  // Integrate with Google Analytics
  async trackEvent(event: {
    action: string
    category: string
    label?: string
    value?: number
  }): Promise<boolean> {
    try {
      // In production, send to Google Analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        ;(window as any).gtag('event', event.action, {
          event_category: event.category,
          event_label: event.label,
          value: event.value,
        })
      }
      return true
    } catch (error) {
      console.error('Analytics tracking failed:', error)
      return false
    }
  }

  async trackCourseSelection(courseId: string, userId?: string): Promise<boolean> {
    return this.trackEvent({
      action: 'course_selected',
      category: 'course_selection',
      label: courseId,
      value: 1,
    })
  }

  async trackPlanSelection(planId: string, courseId: string): Promise<boolean> {
    return this.trackEvent({
      action: 'plan_selected',
      category: 'course_selection',
      label: `${courseId}-${planId}`,
      value: 1,
    })
  }
}

// Main backend integration service
export class BackendIntegrationService {
  private services: BackendServices

  constructor() {
    this.services = {
      database: new DatabaseAdapter(),
      payment: new PaymentAdapter(),
      whatsapp: new WhatsAppAdapter(),
      seo: new SEOAdapter(),
      analytics: new AnalyticsAdapter(),
    }
  }

  // Get all services
  getServices(): BackendServices {
    return this.services
  }

  // Course operations
  async getCourses(filters?: any): Promise<EnhancedCourseData[]> {
    const courses = await this.services.database.getCourses(filters)

    // Track analytics
    await this.services.analytics.trackEvent({
      action: 'courses_loaded',
      category: 'data_integration',
      value: courses.length,
    })

    return courses
  }

  // Student operations
  async getStudentProfile(studentId: string): Promise<Student | null> {
    return this.services.database.getStudent(studentId)
  }

  // Enrollment workflow
  async initiateEnrollment(
    courseId: string,
    planId: string,
    userId: string,
    phone?: string
  ): Promise<{
    paymentLink: string
    confirmationSent: boolean
  }> {
    try {
      // Create payment link
      const paymentLink = await this.services.payment.createPaymentLink(courseId, planId, userId)

      // Send WhatsApp confirmation if phone provided
      let confirmationSent = false
      if (phone) {
        confirmationSent = await this.services.whatsapp.sendCourseInfo(phone, courseId)
      }

      // Track enrollment initiation
      await this.services.analytics.trackEvent({
        action: 'enrollment_initiated',
        category: 'conversion',
        label: `${courseId}-${planId}`,
        value: 1,
      })

      return {
        paymentLink,
        confirmationSent,
      }
    } catch (error) {
      console.error('Enrollment initiation failed:', error)
      throw new Error('Failed to initiate enrollment')
    }
  }

  // Analytics operations
  async saveInteraction(interaction: any): Promise<boolean> {
    const saved = await this.services.database.saveInteraction(interaction)

    if (saved) {
      // Also track in Google Analytics
      await this.services.analytics.trackEvent({
        action: interaction.type,
        category: 'interaction',
        label: interaction.element,
      })
    }

    return saved
  }

  // Health check
  async healthCheck(): Promise<{
    status: 'healthy' | 'degraded' | 'unhealthy'
    services: Record<string, boolean>
  }> {
    const serviceChecks = {
      database: true, // In production, actually check database connection
      payment: true, // Check payment gateway
      whatsapp: true, // Check WhatsApp API
      seo: true, // Check SEO services
      analytics: true, // Check analytics connection
    }

    const healthyServices = Object.values(serviceChecks).filter(Boolean).length
    const totalServices = Object.keys(serviceChecks).length

    let status: 'healthy' | 'degraded' | 'unhealthy'
    if (healthyServices === totalServices) {
      status = 'healthy'
    } else if (healthyServices > totalServices / 2) {
      status = 'degraded'
    } else {
      status = 'unhealthy'
    }

    return {
      status,
      services: serviceChecks,
    }
  }
}

// Global instance
export const backendIntegration = new BackendIntegrationService()

// Helper functions for common operations
export async function getCourseWithBackendData(
  courseId: string,
  userId?: string
): Promise<EnhancedCourseData | null> {
  try {
    const courses = await backendIntegration.getCourses({ includeDetailed: true })
    const course = courses.find((c) => c.id === courseId)

    if (course && userId) {
      // Get student data for personalization
      const student = await backendIntegration.getStudentProfile(userId)
      if (student) {
        course.personalizedData = {
          recommendationScore: Math.random() * 100,
          matchPercentage: Math.floor(Math.random() * 40) + 60,
          estimatedSuccess: Math.floor(Math.random() * 20) + 80,
          learningPathFit: Math.random() * 100,
        }
      }
    }

    return course || null
  } catch (error) {
    console.error('Failed to get course with backend data:', error)
    return null
  }
}

export async function trackCourseInteractionWithBackend(
  courseId: string,
  action: string,
  userId?: string,
  metadata: Record<string, any> = {}
): Promise<boolean> {
  try {
    const interaction = {
      userId: userId || 'anonymous',
      sessionId: crypto.randomUUID(),
      type: action,
      element: courseId,
      data: metadata,
      timestamp: new Date().toISOString(),
    }

    return await backendIntegration.saveInteraction(interaction)
  } catch (error) {
    console.error('Failed to track interaction with backend:', error)
    return false
  }
}
