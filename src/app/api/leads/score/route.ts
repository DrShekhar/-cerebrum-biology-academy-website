import { NextRequest, NextResponse } from 'next/server'
import {
  updateLeadScore,
  updateAllLeadScores,
  calculateLeadScore,
  getLeadPriority,
  getRecommendedAction,
} from '@/lib/leads/leadScoring'
import { prisma } from '@/lib/prisma'

/**
 * GET /api/leads/score?leadId=xxx
 * Get lead score and breakdown
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const leadId = searchParams.get('leadId')

    if (!leadId) {
      // Return top scored leads if no specific lead requested
      const topLeads = await prisma.leads.findMany({
        where: { score: { not: null } },
        orderBy: { score: 'desc' },
        take: 20,
        select: {
          id: true,
          studentName: true,
          email: true,
          phone: true,
          courseInterest: true,
          stage: true,
          score: true,
          scoreUpdatedAt: true,
          scoreBreakdown: true,
          createdAt: true,
          demo_bookings: {
            select: {
              id: true,
              status: true,
              demoCompleted: true,
            },
          },
        },
      })

      return NextResponse.json({
        success: true,
        leads: topLeads.map((lead) => ({
          ...lead,
          priority: lead.score ? getLeadPriority(lead.score) : 'COLD',
          recommendation: lead.score
            ? getRecommendedAction(lead.score, lead.stage, !!lead.demo_bookings)
            : null,
        })),
      })
    }

    // Get specific lead score
    const breakdown = await calculateLeadScore(leadId)
    const lead = await prisma.leads.findUnique({
      where: { id: leadId },
      select: {
        id: true,
        studentName: true,
        stage: true,
        demo_bookings: { select: { id: true } },
      },
    })

    return NextResponse.json({
      success: true,
      leadId,
      score: breakdown.total,
      breakdown,
      priority: getLeadPriority(breakdown.total),
      recommendation: getRecommendedAction(
        breakdown.total,
        lead?.stage || 'NEW_LEAD',
        !!lead?.demo_bookings
      ),
    })
  } catch (error) {
    console.error('Lead score GET error:', error)
    return NextResponse.json(
      { error: 'Failed to get lead score', details: String(error) },
      { status: 500 }
    )
  }
}

/**
 * POST /api/leads/score
 * Update lead score(s)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, leadId } = body

    switch (action) {
      case 'update_single':
        if (!leadId) {
          return NextResponse.json({ error: 'leadId required' }, { status: 400 })
        }
        const score = await updateLeadScore(leadId)
        const breakdown = await calculateLeadScore(leadId)
        return NextResponse.json({
          success: true,
          leadId,
          score,
          priority: getLeadPriority(score),
          breakdown,
        })

      case 'update_all':
        const result = await updateAllLeadScores()
        return NextResponse.json({
          success: true,
          ...result,
          message: `Updated ${result.updated} leads, ${result.errors} errors`,
        })

      default:
        return NextResponse.json(
          { error: 'Invalid action. Use: update_single or update_all' },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('Lead score POST error:', error)
    return NextResponse.json(
      { error: 'Failed to update lead score', details: String(error) },
      { status: 500 }
    )
  }
}
