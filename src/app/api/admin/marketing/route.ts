import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { MarketingCampaign, AbandonedCart } from '@/lib/admin-schema'

// GET /api/admin/marketing - Get marketing campaigns and automation data
export async function GET(request: NextRequest) {
  try {
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
    const body = await request.json()
    const {
      name,
      type,
      objective,
      targetAudience,
      content,
      scheduledAt,
      frequency,
      endDate
    } = body

    if (!name || !type || !objective || !targetAudience) {
      return NextResponse.json(
        { success: false, error: 'Missing required campaign fields' },
        { status: 400 }
      )
    }

    const campaignId = db.id()
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
        cost: 0
      },
      createdBy: 'admin', // Would be actual admin ID in production
      createdAt: now,
      updatedAt: now
    }

    // Save campaign to database
    await db.transact([
      db.tx.marketingCampaigns[campaignId].update(newCampaign)
    ])

    // If scheduled for immediate send, trigger execution
    if (!scheduledAt || scheduledAt <= now) {
      await executeCampaign(campaignId)
    }

    return NextResponse.json({
      success: true,
      data: newCampaign
    }, { status: 201 })

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
  const whereConditions: any = {}
  if (status) whereConditions.status = status

  const campaigns = await db.query({
    marketingCampaigns: {
      $: {
        where: whereConditions,
        order: { createdAt: 'desc' },
        limit,
        offset: (page - 1) * limit
      }
    },
    totalCount: {
      $: { where: whereConditions }
    }
  })

  return NextResponse.json({
    success: true,
    data: {
      campaigns: campaigns.marketingCampaigns,
      pagination: {
        page,
        limit,
        total: campaigns.totalCount.length,
        pages: Math.ceil(campaigns.totalCount.length / limit)
      }
    }
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
        offset: (page - 1) * limit
      },
      user: {} // Join with user data
    },
    totalCount: {
      $: { where: { recovered: false } }
    }
  })

  // Calculate recovery opportunities
  const recoveryOpportunities = calculateRecoveryOpportunities(abandonedCarts.abandonedCarts)

  return NextResponse.json({
    success: true,
    data: {
      abandonedCarts: abandonedCarts.abandonedCarts,
      recoveryOpportunities,
      pagination: {
        page,
        limit,
        total: abandonedCarts.totalCount.length,
        pages: Math.ceil(abandonedCarts.totalCount.length / limit)
      }
    }
  })
}

// Helper function to get automation metrics
async function getAutomationMetrics() {
  const now = Date.now()
  const last30Days = now - (30 * 24 * 60 * 60 * 1000)

  // Query various automation data
  const [campaigns, abandonedCarts, demoBookings, enrollments] = await Promise.all([
    db.query({
      marketingCampaigns: {
        $: { where: { createdAt: { $gte: last30Days } } }
      }
    }),
    db.query({
      abandonedCarts: {
        $: { where: { abandonedAt: { $gte: last30Days } } }
      }
    }),
    db.query({
      demoBookings: {
        $: { where: { createdAt: { $gte: last30Days } } }
      }
    }),
    db.query({
      enrollments: {
        $: { where: { enrollmentDate: { $gte: last30Days } } }
      }
    })
  ])

  const automationMetrics = {
    campaigns: {
      total: campaigns.marketingCampaigns.length,
      active: campaigns.marketingCampaigns.filter((c: any) => c.status === 'active').length,
      totalSent: campaigns.marketingCampaigns.reduce((sum: number, c: any) => sum + c.metrics.sent, 0),
      totalConverted: campaigns.marketingCampaigns.reduce((sum: number, c: any) => sum + c.metrics.converted, 0)
    },
    abandonedCarts: {
      total: abandonedCarts.abandonedCarts.length,
      recovered: abandonedCarts.abandonedCarts.filter((cart: any) => cart.recovered).length,
      totalValue: abandonedCarts.abandonedCarts.reduce((sum: number, cart: any) => sum + cart.totalAmount, 0),
      recoveredValue: abandonedCarts.abandonedCarts
        .filter((cart: any) => cart.recovered)
        .reduce((sum: number, cart: any) => sum + (cart.finalPurchaseAmount || 0), 0)
    },
    whatsappEngagement: {
      demoBookingConversions: demoBookings.demoBookings.filter((demo: any) => 
        demo.source === 'whatsapp' && demo.convertedToEnrollment
      ).length,
      totalWhatsappLeads: demoBookings.demoBookings.filter((demo: any) => 
        demo.source === 'whatsapp'
      ).length
    },
    overallPerformance: {
      conversionRate: calculateOverallConversionRate(demoBookings.demoBookings, enrollments.enrollments),
      averageTimeToConversion: calculateAverageTimeToConversion(demoBookings.demoBookings, enrollments.enrollments),
      customerLifetimeValue: calculateCLV(enrollments.enrollments)
    }
  }

  return NextResponse.json({
    success: true,
    data: automationMetrics
  })
}

// Helper function to get marketing overview
async function getMarketingOverview() {
  const now = Date.now()
  const last7Days = now - (7 * 24 * 60 * 60 * 1000)
  const last30Days = now - (30 * 24 * 60 * 60 * 1000)

  // Get overview data
  const [recentCampaigns, recentCarts, weeklyMetrics, monthlyMetrics] = await Promise.all([
    db.query({
      marketingCampaigns: {
        $: {
          order: { createdAt: 'desc' },
          limit: 5
        }
      }
    }),
    db.query({
      abandonedCarts: {
        $: {
          where: { recovered: false },
          order: { abandonedAt: 'desc' },
          limit: 10
        }
      }
    }),
    getMetricsForPeriod(last7Days, now),
    getMetricsForPeriod(last30Days, now)
  ])

  const overview = {
    recentCampaigns: recentCampaigns.marketingCampaigns,
    urgentAbandonedCarts: recentCarts.abandonedCarts,
    weeklyPerformance: weeklyMetrics,
    monthlyPerformance: monthlyMetrics,
    recommendations: generateMarketingRecommendations(weeklyMetrics, monthlyMetrics)
  }

  return NextResponse.json({
    success: true,
    data: overview
  })
}

// Campaign execution function
async function executeCampaign(campaignId: string) {
  try {
    // Get campaign details
    const campaignData = await db.query({
      marketingCampaigns: {
        $: { where: { id: campaignId } }
      }
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
          delivered: executionResults.delivered
        },
        updatedAt: Date.now()
      })
    ])

    return executionResults

  } catch (error) {
    console.error('Campaign execution error:', error)
    
    // Update campaign status to failed
    await db.transact([
      db.tx.marketingCampaigns[campaignId].update({
        status: 'failed',
        updatedAt: Date.now()
      })
    ])
    
    throw error
  }
}

// Helper functions for campaign execution
async function getTargetAudience(criteria: any) {
  // Build complex query based on targeting criteria
  const whereConditions: any = {}

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
      $: { where: whereConditions }
    }
  })

  return users.users
}

async function executeWhatsAppCampaign(campaign: MarketingCampaign, targetUsers: any[]) {
  // WhatsApp API integration
  console.log(`Executing WhatsApp campaign: ${campaign.name}`)
  
  // Mock execution results
  return {
    sent: targetUsers.length,
    delivered: Math.floor(targetUsers.length * 0.95), // 95% delivery rate
    failed: Math.floor(targetUsers.length * 0.05)
  }
}

async function executeSMSCampaign(campaign: MarketingCampaign, targetUsers: any[]) {
  // SMS API integration
  console.log(`Executing SMS campaign: ${campaign.name}`)
  
  return {
    sent: targetUsers.length,
    delivered: Math.floor(targetUsers.length * 0.92), // 92% delivery rate
    failed: Math.floor(targetUsers.length * 0.08)
  }
}

async function executeEmailCampaign(campaign: MarketingCampaign, targetUsers: any[]) {
  // Email API integration
  console.log(`Executing Email campaign: ${campaign.name}`)
  
  return {
    sent: targetUsers.length,
    delivered: Math.floor(targetUsers.length * 0.98), // 98% delivery rate
    failed: Math.floor(targetUsers.length * 0.02)
  }
}

// Helper calculation functions
function calculateRecoveryOpportunities(carts: any[]) {
  const highValue = carts.filter(cart => cart.totalAmount > 10000).length
  const recentAbandonment = carts.filter(cart => 
    Date.now() - cart.abandonedAt < (24 * 60 * 60 * 1000)
  ).length
  
  return {
    highValue,
    recentAbandonment,
    totalPotentialRevenue: carts.reduce((sum, cart) => sum + cart.totalAmount, 0)
  }
}

function calculateOverallConversionRate(demos: any[], enrollments: any[]) {
  if (demos.length === 0) return 0
  const converted = demos.filter(demo => demo.convertedToEnrollment).length
  return (converted / demos.length) * 100
}

function calculateAverageTimeToConversion(demos: any[], enrollments: any[]) {
  const convertedDemos = demos.filter(demo => demo.convertedToEnrollment && demo.conversionDate)
  if (convertedDemos.length === 0) return 0
  
  const totalTime = convertedDemos.reduce((sum, demo) => 
    sum + (demo.conversionDate - demo.createdAt), 0
  )
  
  return totalTime / convertedDemos.length / (24 * 60 * 60 * 1000) // Days
}

function calculateCLV(enrollments: any[]) {
  // Simplified CLV calculation
  const totalRevenue = enrollments.reduce((sum, enrollment) => 
    sum + (enrollment.finalAmount || 0), 0
  )
  
  return enrollments.length > 0 ? totalRevenue / enrollments.length : 0
}

async function getMetricsForPeriod(startTime: number, endTime: number) {
  // Get metrics for specific time period
  const data = await db.query({
    enrollments: {
      $: { where: { enrollmentDate: { $gte: startTime, $lte: endTime } } }
    },
    demoBookings: {
      $: { where: { createdAt: { $gte: startTime, $lte: endTime } } }
    },
    users: {
      $: { where: { createdAt: { $gte: startTime, $lte: endTime } } }
    }
  })

  return {
    enrollments: data.enrollments.length,
    demoBookings: data.demoBookings.length,
    newUsers: data.users.length,
    conversionRate: data.demoBookings.length > 0 ? 
      (data.enrollments.length / data.demoBookings.length) * 100 : 0
  }
}

function generateMarketingRecommendations(weeklyMetrics: any, monthlyMetrics: any) {
  const recommendations = []

  if (weeklyMetrics.conversionRate < monthlyMetrics.conversionRate) {
    recommendations.push({
      type: 'conversion',
      priority: 'high',
      message: 'Conversion rate has decreased. Consider running retargeting campaigns.'
    })
  }

  if (weeklyMetrics.demoBookings < (monthlyMetrics.demoBookings / 4)) {
    recommendations.push({
      type: 'lead_generation',
      priority: 'medium',
      message: 'Demo bookings are below average. Increase lead generation activities.'
    })
  }

  return recommendations
}