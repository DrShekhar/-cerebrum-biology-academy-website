/**
 * Product Agent
 *
 * AI-powered product intelligence agent that provides:
 * 1. Personalized course recommendations based on lead/student profile
 * 2. Intelligent offer and pricing suggestions
 * 3. Upsell/cross-sell recommendations for enrolled students
 *
 * Uses actual courses from the database instead of hardcoded catalog.
 */

import { BaseAgent, AgentContext, AgentResponse, getLeadContext } from './base'
import { prisma } from '@/lib/prisma'
import { AgentType } from '@/generated/prisma'

// Course interface matching database schema
interface DatabaseCourse {
  id: string
  name: string
  description: string | null
  type: string
  class: string
  duration: number
  totalFees: number
  syllabus: unknown
  features: unknown
  isActive: boolean
}

// Helper function to fetch active courses from database
async function fetchCourseCatalog(): Promise<DatabaseCourse[]> {
  const courses = await prisma.courses.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' },
  })
  return courses
}

// Helper function to format course for AI prompt
function formatCourseForPrompt(course: DatabaseCourse): object {
  const features = Array.isArray(course.features) ? course.features : []
  return {
    id: course.id,
    name: course.name,
    description: course.description,
    type: course.type,
    targetClass: course.class,
    durationMonths: course.duration,
    price: course.totalFees,
    features: features,
  }
}

// Build recommendation prompt dynamically with actual courses
function buildRecommendationPrompt(courses: DatabaseCourse[]): string {
  const formattedCourses = courses.map(formatCourseForPrompt)

  return `You are an AI Product Recommendation Agent for Cerebrum Biology Academy, a premier NEET biology coaching institute in India.

Your role is to analyze student/lead profiles and recommend the most suitable courses from our catalog.

COURSE CATALOG (from database):
${JSON.stringify(formattedCourses, null, 2)}

MATCHING CRITERIA (score each 0-100):
1. CLASS MATCH (30 pts): Does the course target their current class?
2. EXAM ALIGNMENT (20 pts): Does it match their target exam (NEET/Foundation)?
3. PREPARATION LEVEL (15 pts): Is the difficulty appropriate?
4. BUDGET FIT (15 pts): Is the price within their expected budget?
5. TIMING (10 pts): Is it the right time of year for this course?
6. INTEREST SIGNALS (10 pts): Does their browsing/inquiry history suggest interest?

IMPORTANT CONTEXT:
- Target audience: Tier 2/3 city students in India
- NEET exam is in May each year
- Most students prefer EMI/installment options
- Parents are usually the decision makers for payment

Respond in JSON format:
{
  "recommendations": [
    {
      "courseId": "<course-id from catalog>",
      "courseName": "<name>",
      "matchScore": <0-100>,
      "matchReasons": ["<reason1>", "<reason2>", ...],
      "whyThisCourse": "<1-2 sentence personalized explanation>",
      "suggestedDiscount": <0-25>,
      "urgencyMessage": "<optional urgency/scarcity message>"
    }
  ],
  "primaryRecommendation": "<course-id of top pick>",
  "alternativesReason": "<why the other courses are also good options>"
}`
}

const OFFER_PROMPT = `You are an AI Offer Generation Agent for Cerebrum Biology Academy.

Your role is to create personalized, compelling offers for leads based on their profile and stage in the sales funnel.

PRICING GUIDELINES:
- Maximum discount: 25% (only for very hot leads in negotiation stage)
- Typical discounts by stage:
  - NEW_LEAD: 5-8% early bird
  - DEMO_COMPLETED: 10-12% limited time
  - NEGOTIATING: 15-20% special deal
  - PAYMENT_PLAN_CREATED: 5% extra for full payment

PAYMENT PLAN OPTIONS:
- FULL: One-time payment (extra 5% off)
- QUARTERLY: 4 installments (standard price)
- MONTHLY: 10-12 installments (+5% convenience fee)

OFFER VALIDITY:
- NEW_LEAD: 7 days
- DEMO_COMPLETED: 5 days
- NEGOTIATING: 3 days (urgency)

Respond in JSON format:
{
  "discountType": "PERCENTAGE" | "FIXED_AMOUNT",
  "discountValue": <number>,
  "discountReason": "<why this discount>",
  "finalPrice": <number>,
  "validityDays": <number>,
  "paymentPlanOptions": [
    {
      "type": "FULL" | "QUARTERLY" | "MONTHLY",
      "installments": <number>,
      "perInstallment": <number>,
      "savings": <number if any>
    }
  ],
  "personalizedMessage": "<compelling offer message for WhatsApp/email>",
  "urgencyTriggers": ["<trigger1>", "<trigger2>"],
  "objectionHandlers": {
    "<common objection>": "<response>"
  }
}`

const UPSELL_PROMPT = `You are an AI Upsell Agent for Cerebrum Biology Academy.

Your role is to identify upgrade and cross-sell opportunities for existing students.

UPSELL OPPORTUNITIES:
1. Foundation → NEET course transition (Class 10 → 11)
2. Test Series add-on for any enrolled student
3. Crash Course supplement before exams
4. Next year's course enrollment (Class 11 → 12)
5. Sibling referral programs

TIMING CONSIDERATIONS:
- Best time for upsell: 75% course completion
- Exam season (Jan-May): Crash course, test series
- New academic year (April-June): Next course enrollment

Respond in JSON format:
{
  "upsellOpportunities": [
    {
      "courseId": "<course-id>",
      "courseName": "<name>",
      "upsellType": "UPGRADE" | "ADD_ON" | "NEXT_COURSE" | "SIBLING",
      "relevanceScore": <0-100>,
      "reason": "<why this is a good upsell>",
      "idealTiming": "<when to approach>",
      "suggestedDiscount": <0-15>,
      "pitchMessage": "<personalized pitch>"
    }
  ],
  "primaryUpsell": "<course-id of best opportunity>",
  "approachStrategy": "<how to introduce the upsell>"
}`

export interface CourseRecommendation {
  courseId: string
  courseName: string
  matchScore: number
  matchReasons: string[]
  whyThisCourse: string
  suggestedDiscount: number
  urgencyMessage?: string
  price: number
  finalPrice: number
}

export interface OfferSuggestion {
  discountType: 'PERCENTAGE' | 'FIXED_AMOUNT'
  discountValue: number
  discountReason: string
  finalPrice: number
  validityDays: number
  paymentPlanOptions: {
    type: 'FULL' | 'QUARTERLY' | 'MONTHLY'
    installments: number
    perInstallment: number
    savings?: number
  }[]
  personalizedMessage: string
  urgencyTriggers: string[]
  objectionHandlers: Record<string, string>
}

export interface UpsellOpportunity {
  courseId: string
  courseName: string
  upsellType: 'UPGRADE' | 'ADD_ON' | 'NEXT_COURSE' | 'SIBLING'
  relevanceScore: number
  reason: string
  idealTiming: string
  suggestedDiscount: number
  pitchMessage: string
}

export class ProductAgent extends BaseAgent {
  private coursesCache: DatabaseCourse[] | null = null

  constructor() {
    // Initialize with a basic prompt - will be updated dynamically with actual courses
    super(
      AgentType.PRODUCT_AGENT,
      'You are an AI Product Recommendation Agent for Cerebrum Biology Academy.'
    )
  }

  // Fetch and cache courses from database
  private async getCourses(): Promise<DatabaseCourse[]> {
    if (!this.coursesCache) {
      this.coursesCache = await fetchCourseCatalog()
    }
    return this.coursesCache
  }

  async execute(context: AgentContext): Promise<AgentResponse> {
    const action = context.metadata?.action as string

    switch (action) {
      case 'recommend':
        return this.recommendCourses(context)
      case 'offer':
        return this.generateOffer(context)
      case 'upsell':
        return this.analyzeUpsell(context)
      default:
        return this.recommendCourses(context)
    }
  }

  async recommendCourses(context: AgentContext): Promise<AgentResponse> {
    try {
      this.log(
        'info',
        `Generating course recommendations for: ${context.leadId || context.metadata?.userId}`
      )

      // Fetch actual courses from database
      const courses = await this.getCourses()

      if (courses.length === 0) {
        return {
          success: false,
          message: 'No active courses found in database',
          error: 'NO_COURSES',
        }
      }

      // Update system prompt with actual course catalog
      this.systemPrompt = buildRecommendationPrompt(courses)

      let profileData: Record<string, unknown> = {}

      if (context.leadId) {
        const leadData = await getLeadContext(context.leadId)
        if (leadData) {
          profileData = {
            type: 'lead',
            name: leadData.name,
            courseInterest: leadData.courseInterest,
            stage: leadData.stage,
            source: leadData.source,
            score: leadData.score,
            activities: leadData.recentActivities,
            communications: leadData.recentCommunications,
          }
        }
      }

      if (context.metadata?.profile && typeof context.metadata.profile === 'object') {
        profileData = { ...profileData, ...(context.metadata.profile as Record<string, unknown>) }
      }

      const userMessage = `Please recommend courses for this student/lead:

PROFILE:
${JSON.stringify(profileData, null, 2)}

ADDITIONAL CONTEXT:
- Current month: ${new Date().toLocaleString('en-US', { month: 'long' })}
- NEET exam is typically in May
- Budget preference: ${context.metadata?.budget || 'not specified'}

Provide your top 3-4 course recommendations with match scores and reasons.`

      const response = await this.chat([{ role: 'user', content: userMessage }])
      const result = this.parseJSON<{
        recommendations: Array<{
          courseId: string
          courseName: string
          matchScore: number
          matchReasons: string[]
          whyThisCourse: string
          suggestedDiscount: number
          urgencyMessage?: string
        }>
        primaryRecommendation: string
        alternativesReason: string
      }>(response)

      if (!result) {
        return {
          success: false,
          message: 'Failed to parse recommendations',
          error: 'PARSE_ERROR',
        }
      }

      // Map recommendations with actual course prices from database
      const recommendations: CourseRecommendation[] = result.recommendations.map((rec) => {
        const course = courses.find((c) => c.id === rec.courseId)
        const price = course?.totalFees || 0
        const discount = Math.min(rec.suggestedDiscount, 25)
        const finalPrice = Math.round(price * (1 - discount / 100))

        return {
          ...rec,
          price,
          finalPrice,
          suggestedDiscount: discount,
        }
      })

      if (context.leadId) {
        await this.saveRecommendations(context.leadId, undefined, recommendations)
      }

      this.log('info', `Generated ${recommendations.length} recommendations`)

      return {
        success: true,
        message: `Found ${recommendations.length} course recommendations`,
        data: {
          recommendations,
          primaryRecommendation: result.primaryRecommendation,
          alternativesReason: result.alternativesReason,
        },
        action: 'no_action',
        nextSteps: [
          'Present recommendations to lead',
          'Book demo for primary recommendation',
          'Generate personalized offer if interested',
        ],
      }
    } catch (error) {
      this.log('error', 'Course recommendation failed', error)
      return {
        success: false,
        message: 'Course recommendation failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  async generateOffer(context: AgentContext): Promise<AgentResponse> {
    if (!context.leadId) {
      return {
        success: false,
        message: 'Lead ID is required for offer generation',
        error: 'MISSING_LEAD_ID',
      }
    }

    const courseId = context.metadata?.courseId as string
    if (!courseId) {
      return {
        success: false,
        message: 'Course ID is required for offer generation',
        error: 'MISSING_COURSE_ID',
      }
    }

    try {
      this.log('info', `Generating offer for lead ${context.leadId}, course ${courseId}`)

      const leadData = await getLeadContext(context.leadId)
      if (!leadData) {
        return {
          success: false,
          message: 'Lead not found',
          error: 'LEAD_NOT_FOUND',
        }
      }

      // Fetch course from database
      const course = await prisma.courses.findUnique({
        where: { id: courseId },
      })

      if (!course) {
        return {
          success: false,
          message: 'Course not found in database',
          error: 'COURSE_NOT_FOUND',
        }
      }

      this.systemPrompt = OFFER_PROMPT

      const features = Array.isArray(course.features) ? course.features : []
      const durationText = `${course.duration} months`

      const userMessage = `Generate a personalized offer for this lead:

LEAD PROFILE:
- Name: ${leadData.name}
- Stage: ${leadData.stage}
- Score: ${leadData.score || 'Not scored'}
- Source: ${leadData.source}
- Course Interest: ${leadData.courseInterest}

SELECTED COURSE:
- Name: ${course.name}
- Description: ${course.description || 'N/A'}
- Type: ${course.type}
- Target Class: ${course.class}
- Original Price: ₹${course.totalFees.toLocaleString('en-IN')}
- Duration: ${durationText}
- Features: ${features.join(', ') || 'Standard features'}

URGENCY CONTEXT:
- Urgency level: ${context.metadata?.urgency || 'medium'}
- Current month: ${new Date().toLocaleString('en-US', { month: 'long' })}

Create a compelling offer with appropriate discount and payment options.`

      const response = await this.chat([{ role: 'user', content: userMessage }])
      const result = this.parseJSON<OfferSuggestion>(response)

      if (!result) {
        return {
          success: false,
          message: 'Failed to parse offer',
          error: 'PARSE_ERROR',
        }
      }

      result.discountValue = Math.min(result.discountValue, 25)
      result.finalPrice = Math.round(course.totalFees * (1 - result.discountValue / 100))

      this.log(
        'info',
        `Generated offer: ${result.discountValue}% off, final price ₹${result.finalPrice}`
      )

      return {
        success: true,
        message: `Offer generated: ${result.discountValue}% discount`,
        data: {
          offer: result,
          course: {
            id: course.id,
            name: course.name,
            originalPrice: course.totalFees,
          },
        },
        action: 'no_action',
        nextSteps: [
          'Send offer via WhatsApp',
          'Follow up within 24 hours',
          'Be ready to handle objections',
        ],
      }
    } catch (error) {
      this.log('error', 'Offer generation failed', error)
      return {
        success: false,
        message: 'Offer generation failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  async analyzeUpsell(context: AgentContext): Promise<AgentResponse> {
    const userId = context.metadata?.userId as string
    if (!userId) {
      return {
        success: false,
        message: 'User ID is required for upsell analysis',
        error: 'MISSING_USER_ID',
      }
    }

    try {
      this.log('info', `Analyzing upsell opportunities for user ${userId}`)

      const user = await prisma.users.findUnique({
        where: { id: userId },
        include: {
          enrollments: {
            include: {
              courses: true,
            },
          },
        },
      })

      if (!user) {
        return {
          success: false,
          message: 'User not found',
          error: 'USER_NOT_FOUND',
        }
      }

      // Fetch actual courses from database for upsell recommendations
      const courses = await this.getCourses()
      const formattedCourses = courses.map(formatCourseForPrompt)

      this.systemPrompt = UPSELL_PROMPT

      const enrollmentData = user.enrollments.map((e) => ({
        courseId: e.courseId,
        courseName: e.courses.name,
        status: e.status,
        progress: e.currentProgress,
        startDate: e.startDate,
        endDate: e.endDate,
      }))

      const userMessage = `Analyze upsell opportunities for this student:

STUDENT PROFILE:
- Name: ${user.name}
- Email: ${user.email}

CURRENT ENROLLMENTS:
${JSON.stringify(enrollmentData, null, 2)}

AVAILABLE COURSES FOR UPSELL (from database):
${JSON.stringify(formattedCourses, null, 2)}

CURRENT CONTEXT:
- Current month: ${new Date().toLocaleString('en-US', { month: 'long' })}
- NEET exam is in May

Identify the best upsell/cross-sell opportunities for this student.`

      const response = await this.chat([{ role: 'user', content: userMessage }])
      const result = this.parseJSON<{
        upsellOpportunities: UpsellOpportunity[]
        primaryUpsell: string
        approachStrategy: string
      }>(response)

      if (!result) {
        return {
          success: false,
          message: 'Failed to parse upsell analysis',
          error: 'PARSE_ERROR',
        }
      }

      this.log('info', `Found ${result.upsellOpportunities.length} upsell opportunities`)

      return {
        success: true,
        message: `Found ${result.upsellOpportunities.length} upsell opportunities`,
        data: result,
        action: 'no_action',
        nextSteps: [
          'Wait for optimal timing',
          'Prepare personalized pitch',
          'Consider sibling/referral angles',
        ],
      }
    } catch (error) {
      this.log('error', 'Upsell analysis failed', error)
      return {
        success: false,
        message: 'Upsell analysis failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  private async saveRecommendations(
    leadId: string | undefined,
    userId: string | undefined,
    recommendations: CourseRecommendation[]
  ): Promise<void> {
    try {
      for (const rec of recommendations) {
        await prisma.product_recommendations.create({
          data: {
            leadId,
            userId,
            courseId: rec.courseId,
            matchScore: rec.matchScore,
            matchReasons: rec.matchReasons,
            offerSuggestion: {
              suggestedDiscount: rec.suggestedDiscount,
              finalPrice: rec.finalPrice,
              urgencyMessage: rec.urgencyMessage,
            },
            source: 'AGENT',
          },
        })
      }
    } catch (error) {
      this.log('error', 'Failed to save recommendations', error)
    }
  }
}
