import { NextRequest, NextResponse } from 'next/server'
import { adminDb as db } from '@/lib/db-admin'
import type { MarketingCampaign } from '@/lib/admin-schema'
import { requireAdminAuth } from '@/lib/auth'

// Type definitions for marketing data
// Note: CampaignRecord is a standalone interface to avoid status type conflicts with MarketingCampaign
interface CampaignRecord {
  id: string
  name: string
  type: 'whatsapp' | 'sms' | 'email' | 'facebook' | 'google' | 'mixed'
  status: 'draft' | 'scheduled' | 'active' | 'paused' | 'completed' | 'failed'
  metrics: {
    sent: number
    delivered: number
    opened: number
    clicked: number
    converted: number
    unsubscribed: number
    cost: number
  }
}

interface AbandonedCartRecord {
  id: string
  userId: string
  totalAmount: number
  abandonedAt: number
  recovered: boolean
  finalPurchaseAmount?: number
  user?: UserRecord
}

interface DemoBookingRecord {
  id: string
  userId: string
  source: string
  createdAt: number
  convertedToEnrollment: boolean
  conversionDate?: number
}

interface EnrollmentRecord {
  id: string
  userId: string
  enrollmentDate: number
  finalAmount: number
}

interface UserRecord {
  id: string
  email: string
  phone?: string
  profile?: {
    currentClass?: string
    city?: string
  }
}

interface TargetAudienceCriteria {
  demographics: {
    class: ('10th' | '11th' | '12th' | 'Dropper')[]
    city?: string[]
    state?: string[]
    score_range?: { min: number; max: number }
  }
  behavior: {
    enrollment_status?: ('enrolled' | 'demo_taken' | 'lead' | 'inactive')[]
    last_activity_days?: number
    course_interest?: string[]
  }
  customSegment?: string
}

interface PeriodMetrics {
  enrollments: number
  demoBookings: number
  newUsers: number
  conversionRate: number
}

interface CampaignExecutionResult {
  sent: number
  delivered: number
  failed: number
}

// Use a more flexible type for InstantDB query conditions
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type WhereConditions = Record<string, any>

// GET /api/admin/marketing - Get marketing campaigns and automation data
export async function GET(request: NextRequest) {
  try {
    await requireAdminAuth()

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') // 'campaigns', 'abandoned-carts', 'automation'
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    switch (type) {
      case 'campaigns':
        return await getCampaigns(status, page, limit)
      case 'abandoned-carts':
        return await getAbandonedCarts(page, limit)
      case 'automation':
        return await getAutomationMetrics()
      default:
        return await getMarketingOverview()
    }
  } catch (error) {
    console.error('Marketing API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch marketing data' },
      { status: 500 }
    )
  }
}

// POST /api/admin/marketing - Create new marketing campaign
export async function POST(request: NextRequest) {
  try {
    await requireAdminAuth()

    const body = await request.json()
    const { name, type, objective, targetAudience, content, scheduledAt, frequency, endDate } = body

    if (!name || !type || !objective || !targetAudience) {
      return NextResponse.json(
        { success: false, error: 'Missing required campaign fields' },
        { status: 400 }
      )
    }

    const campaignId = crypto.randomUUID()
    const now = Date.now()

    const newCampaign: MarketingCampaign = {
      id: campaignId,
      name,
      type,
      status: scheduledAt ? 'scheduled' : 'draft',
      objective,
      targetAudience,
      content,
      scheduledAt,
      frequency,
      endDate,
      metrics: {
        sent: 0,
        delivered: 0,
        opened: 0,
        clicked: 0,
        converted: 0,
        unsubscribed: 0,
        cost: 0,
      },
      createdBy: 'admin', // Would be actual admin ID in production
      createdAt: now,
      updatedAt: now,
    }

    // Save campaign to database
    await db.transact([db.tx.marketingCampaigns[campaignId].update(newCampaign)])

    // If scheduled for immediate send, trigger execution
    if (!scheduledAt || scheduledAt <= now) {
      await executeCampaign(campaignId)
    }

    return NextResponse.json(
      {
        success: true,
        data: newCampaign,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Create campaign error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create campaign' },
      { status: 500 }
    )
  }
}

// Helper function to get campaigns
async function getCampaigns(status: string | null, page: number, limit: number) {
  const whereConditions: WhereConditions = {}
  if (status) whereConditions.status = status

  const campaigns = await db.query({
    marketingCampaigns: {
      $: {
        where: whereConditions,
        order: { createdAt: 'desc' },
        limit,
        offset: (page - 1) * limit,
      },
    },
    totalCount: {
      $: { where: whereConditions },
    },
  })

  return NextResponse.json({
    success: true,
    data: {
      campaigns: campaigns.marketingCampaigns,
      pagination: {
        page,
        limit,
        total: campaigns.totalCount.length,
        pages: Math.ceil(campaigns.totalCount.length / limit),
      },
    },
  })
}

// Helper function to get abandoned carts
async function getAbandonedCarts(page: number, limit: number) {
  const abandonedCarts = await db.query({
    abandonedCarts: {
      $: {
        where: { recovered: false },
        order: { abandonedAt: 'desc' },
        limit,
        offset: (page - 1) * limit,
      },
      user: {}, // Join with user data
    },
    totalCount: {
      $: { where: { recovered: false } },
    },
  })

  // Calculate recovery opportunities
  const recoveryOpportunities = calculateRecoveryOpportunities(
    abandonedCarts.abandonedCarts as unknown as AbandonedCartRecord[]
  )

  return NextResponse.json({
    success: true,
    data: {
      abandonedCarts: abandonedCarts.abandonedCarts,
      recoveryOpportunities,
      pagination: {
        page,
        limit,
        total: abandonedCarts.totalCount.length,
        pages: Math.ceil(abandonedCarts.totalCount.length / limit),
      },
    },
  })
}

// Helper function to get automation metrics
async function getAutomationMetrics() {
  const now = Date.now()
  const last30Days = now - 30 * 24 * 60 * 60 * 1000

  // Query various automation data
  const [campaigns, abandonedCarts, demoBookings, enrollments] = await Promise.all([
    db.query({
      marketingCampaigns: {
        $: { where: { createdAt: { $gte: last30Days } } },
      },
    }),
    db.query({
      abandonedCarts: {
        $: { where: { abandonedAt: { $gte: last30Days } } },
      },
    }),
    db.query({
      demoBookings: {
        $: { where: { createdAt: { $gte: last30Days } } },
      },
    }),
    db.query({
      enrollments: {
        $: { where: { enrollmentDate: { $gte: last30Days } } },
      },
    }),
  ])

  const campaignRecords = campaigns.marketingCampaigns as CampaignRecord[]
  const cartRecords = abandonedCarts.abandonedCarts as AbandonedCartRecord[]
  const demoRecords = demoBookings.demoBookings as DemoBookingRecord[]
  const enrollmentRecords = enrollments.enrollments as EnrollmentRecord[]

  const automationMetrics = {
    campaigns: {
      total: campaignRecords.length,
      active: campaignRecords.filter((c) => c.status === 'active').length,
      totalSent: campaignRecords.reduce((sum, c) => sum + c.metrics.sent, 0),
      totalConverted: campaignRecords.reduce((sum, c) => sum + c.metrics.converted, 0),
    },
    abandonedCarts: {
      total: cartRecords.length,
      recovered: cartRecords.filter((cart) => cart.recovered).length,
      totalValue: cartRecords.reduce((sum, cart) => sum + cart.totalAmount, 0),
      recoveredValue: cartRecords
        .filter((cart) => cart.recovered)
        .reduce((sum, cart) => sum + (cart.finalPurchaseAmount || 0), 0),
    },
    whatsappEngagement: {
      demoBookingConversions: demoRecords.filter(
        (demo) => demo.source === 'whatsapp' && demo.convertedToEnrollment
      ).length,
      totalWhatsappLeads: demoRecords.filter((demo) => demo.source === 'whatsapp').length,
    },
    overallPerformance: {
      conversionRate: calculateOverallConversionRate(demoRecords, enrollmentRecords),
      averageTimeToConversion: calculateAverageTimeToConversion(demoRecords, enrollmentRecords),
      customerLifetimeValue: calculateCLV(enrollmentRecords),
    },
  }

  return NextResponse.json({
    success: true,
    data: automationMetrics,
  })
}

// Helper function to get marketing overview
async function getMarketingOverview() {
  const now = Date.now()
  const last7Days = now - 7 * 24 * 60 * 60 * 1000
  const last30Days = now - 30 * 24 * 60 * 60 * 1000

  // Get overview data
  const [recentCampaigns, recentCarts, weeklyMetrics, monthlyMetrics] = await Promise.all([
    db.query({
      marketingCampaigns: {
        $: {
          order: { createdAt: 'desc' },
          limit: 5,
        },
      },
    }),
    db.query({
      abandonedCarts: {
        $: {
          where: { recovered: false },
          order: { abandonedAt: 'desc' },
          limit: 10,
        },
      },
    }),
    getMetricsForPeriod(last7Days, now),
    getMetricsForPeriod(last30Days, now),
  ])

  const overview = {
    recentCampaigns: recentCampaigns.marketingCampaigns,
    urgentAbandonedCarts: recentCarts.abandonedCarts,
    weeklyPerformance: weeklyMetrics,
    monthlyPerformance: monthlyMetrics,
    recommendations: generateMarketingRecommendations(weeklyMetrics, monthlyMetrics),
  }

  return NextResponse.json({
    success: true,
    data: overview,
  })
}

// Campaign execution function
async function executeCampaign(campaignId: string) {
  try {
    // Get campaign details
    const campaignData = await db.query({
      marketingCampaigns: {
        $: { where: { id: campaignId } },
      },
    })

    if (campaignData.marketingCampaigns.length === 0) {
      throw new Error('Campaign not found')
    }

    const campaign = campaignData.marketingCampaigns[0] as MarketingCampaign

    // Get target audience based on criteria
    const targetUsers = await getTargetAudience(campaign.targetAudience)

    // Execute campaign based on type
    let executionResults
    switch (campaign.type) {
      case 'whatsapp':
        executionResults = await executeWhatsAppCampaign(campaign, targetUsers)
        break
      case 'sms':
        executionResults = await executeSMSCampaign(campaign, targetUsers)
        break
      case 'email':
        executionResults = await executeEmailCampaign(campaign, targetUsers)
        break
      default:
        throw new Error(`Unsupported campaign type: ${campaign.type}`)
    }

    // Update campaign metrics
    await db.transact([
      db.tx.marketingCampaigns[campaignId].update({
        status: 'active',
        metrics: {
          ...campaign.metrics,
          sent: executionResults.sent,
          delivered: executionResults.delivered,
        },
        updatedAt: Date.now(),
      }),
    ])

    return executionResults
  } catch (error) {
    console.error('Campaign execution error:', error)

    // Update campaign status to failed
    await db.transact([
      db.tx.marketingCampaigns[campaignId].update({
        status: 'failed',
        updatedAt: Date.now(),
      }),
    ])

    throw error
  }
}

// Helper functions for campaign execution
async function getTargetAudience(criteria: TargetAudienceCriteria): Promise<UserRecord[]> {
  // Build complex query based on targeting criteria
  const whereConditions: WhereConditions = {}

  if (criteria.demographics?.class) {
    whereConditions['profile.currentClass'] = { $in: criteria.demographics.class }
  }

  if (criteria.demographics?.city) {
    whereConditions['profile.city'] = { $in: criteria.demographics.city }
  }

  if (criteria.behavior?.enrollment_status) {
    // Complex query logic for enrollment status
  }

  const users = await db.query({
    users: {
      $: { where: whereConditions },
    },
  })

  return users.users as UserRecord[]
}

async function executeWhatsAppCampaign(
  campaign: MarketingCampaign,
  targetUsers: UserRecord[]
): Promise<CampaignExecutionResult> {
  // WhatsApp API integration
  console.log(`Executing WhatsApp campaign: ${campaign.name}`)

  // Mock execution results
  return {
    sent: targetUsers.length,
    delivered: Math.floor(targetUsers.length * 0.95), // 95% delivery rate
    failed: Math.floor(targetUsers.length * 0.05),
  }
}

async function executeSMSCampaign(
  campaign: MarketingCampaign,
  targetUsers: UserRecord[]
): Promise<CampaignExecutionResult> {
  // SMS API integration
  console.log(`Executing SMS campaign: ${campaign.name}`)

  return {
    sent: targetUsers.length,
    delivered: Math.floor(targetUsers.length * 0.92), // 92% delivery rate
    failed: Math.floor(targetUsers.length * 0.08),
  }
}

async function executeEmailCampaign(
  campaign: MarketingCampaign,
  targetUsers: UserRecord[]
): Promise<CampaignExecutionResult> {
  // Email API integration
  console.log(`Executing Email campaign: ${campaign.name}`)

  return {
    sent: targetUsers.length,
    delivered: Math.floor(targetUsers.length * 0.98), // 98% delivery rate
    failed: Math.floor(targetUsers.length * 0.02),
  }
}

// Helper calculation functions
interface RecoveryOpportunities {
  highValue: number
  recentAbandonment: number
  totalPotentialRevenue: number
}

function calculateRecoveryOpportunities(carts: AbandonedCartRecord[]): RecoveryOpportunities {
  const highValue = carts.filter((cart) => cart.totalAmount > 10000).length
  const recentAbandonment = carts.filter(
    (cart) => Date.now() - cart.abandonedAt < 24 * 60 * 60 * 1000
  ).length

  return {
    highValue,
    recentAbandonment,
    totalPotentialRevenue: carts.reduce((sum, cart) => sum + cart.totalAmount, 0),
  }
}

function calculateOverallConversionRate(
  demos: DemoBookingRecord[],
  _enrollments: EnrollmentRecord[]
): number {
  if (demos.length === 0) return 0
  const converted = demos.filter((demo) => demo.convertedToEnrollment).length
  return (converted / demos.length) * 100
}

function calculateAverageTimeToConversion(
  demos: DemoBookingRecord[],
  _enrollments: EnrollmentRecord[]
): number {
  const convertedDemos = demos.filter((demo) => demo.convertedToEnrollment && demo.conversionDate)
  if (convertedDemos.length === 0) return 0

  const totalTime = convertedDemos.reduce(
    (sum, demo) => sum + ((demo.conversionDate || 0) - demo.createdAt),
    0
  )

  return totalTime / convertedDemos.length / (24 * 60 * 60 * 1000) // Days
}

function calculateCLV(enrollments: EnrollmentRecord[]): number {
  // Simplified CLV calculation
  const totalRevenue = enrollments.reduce(
    (sum, enrollment) => sum + (enrollment.finalAmount || 0),
    0
  )

  return enrollments.length > 0 ? totalRevenue / enrollments.length : 0
}

async function getMetricsForPeriod(startTime: number, endTime: number): Promise<PeriodMetrics> {
  // Get metrics for specific time period
  const data = await db.query({
    enrollments: {
      $: { where: { enrollmentDate: { $gte: startTime, $lte: endTime } } },
    },
    demoBookings: {
      $: { where: { createdAt: { $gte: startTime, $lte: endTime } } },
    },
    users: {
      $: { where: { createdAt: { $gte: startTime, $lte: endTime } } },
    },
  })

  return {
    enrollments: data.enrollments.length,
    demoBookings: data.demoBookings.length,
    newUsers: data.users.length,
    conversionRate:
      data.demoBookings.length > 0 ? (data.enrollments.length / data.demoBookings.length) * 100 : 0,
  }
}

interface MarketingRecommendation {
  type: 'conversion' | 'lead_generation'
  priority: 'high' | 'medium' | 'low'
  message: string
}

function generateMarketingRecommendations(
  weeklyMetrics: PeriodMetrics,
  monthlyMetrics: PeriodMetrics
): MarketingRecommendation[] {
  const recommendations: MarketingRecommendation[] = []

  if (weeklyMetrics.conversionRate < monthlyMetrics.conversionRate) {
    recommendations.push({
      type: 'conversion',
      priority: 'high',
      message: 'Conversion rate has decreased. Consider running retargeting campaigns.',
    })
  }

  if (weeklyMetrics.demoBookings < monthlyMetrics.demoBookings / 4) {
    recommendations.push({
      type: 'lead_generation',
      priority: 'medium',
      message: 'Demo bookings are below average. Increase lead generation activities.',
    })
  }

  return recommendations
}
